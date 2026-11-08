(function () {
  "use strict";

  var DATA_URL = "data/trails.json";
  var SAVED_KEY = "uwt-trail-finder:saved:v1";
  var SETTINGS_KEY = "uwt-trail-finder:settings:v1";
  var UWT_ADDRESS = "1900 Commerce St, Tacoma, WA 98402";
  var SWIPE_DISTANCE = 100;
  var LEAVE_MS = 230;
  var LENGTH_ANY = 12;

  var DEFAULTS = { beginner: false, easy: true, moderate: true, hard: true, maxDrive: 90, maxLength: LENGTH_ANY };

  var trails = [];
  var byId = {};
  var saved = [];
  var seen = {};
  var settings = copy(DEFAULTS);
  var busy = false;
  var lastAction = "";
  var loadFailed = false;

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    deck: $("deck"), status: $("status"), actions: $("actions"), skip: $("skip"), save: $("save"),
    tabDiscover: $("tab-discover"), tabSaved: $("tab-saved"), savedCount: $("saved-count"),
    viewDiscover: $("view-discover"), viewSaved: $("view-saved"),
    savedList: $("saved-list"), savedEmpty: $("saved-empty"),
    beginner: $("beginner"), easy: $("f-easy"), moderate: $("f-moderate"), hard: $("f-hard"),
    maxDrive: $("max-drive"), maxDriveOut: $("max-drive-out"),
    maxLength: $("max-length"), maxLengthOut: $("max-length-out"),
    reset: $("reset-filters")
  };

  // ---------- small helpers ----------

  function copy(o) {
    var c = {};
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) c[k] = o[k];
    return c;
  }

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function fmt(n) {
    return Number(n).toLocaleString("en-US");
  }

  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function mapsUrl(t) {
    return "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(UWT_ADDRESS) +
      "&destination=" + encodeURIComponent(t.lat + "," + t.lng) + "&travelmode=driving";
  }

  // Storage can throw (private windows, blocked cookies), so the app also works without it.
  function readStore(key) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* keep going with in-memory state */ }
  }

  function loadState() {
    var s = readStore(SETTINGS_KEY);
    if (s && typeof s === "object") {
      settings.beginner = s.beginner === true;
      settings.easy = s.easy !== false;
      settings.moderate = s.moderate !== false;
      settings.hard = s.hard !== false;
      var d = Number(s.maxDrive), l = Number(s.maxLength);
      if (d >= 15 && d <= 90) settings.maxDrive = d;
      if (l >= 2 && l <= LENGTH_ANY) settings.maxLength = l;
    }
    var sv = readStore(SAVED_KEY);
    saved = Array.isArray(sv) ? sv.filter(function (x) { return typeof x === "string"; }) : [];
  }

  function persistSettings() { writeStore(SETTINGS_KEY, settings); }
  function persistSaved() { writeStore(SAVED_KEY, saved); }

  // ---------- filtering ----------

  function matches(t) {
    var okDiff = settings.beginner ? t.difficulty === "easy" : settings[t.difficulty] === true;
    if (!okDiff) return false;
    if (t.drive_minutes > settings.maxDrive) return false;
    if (settings.maxLength < LENGTH_ANY && t.length_miles > settings.maxLength) return false;
    return true;
  }

  function filtered() { return trails.filter(matches); }
  function deck() { return filtered().filter(function (t) { return !seen[t.id]; }); }

  // ---------- card rendering ----------

  function dogsText(d) {
    if (d === "on leash") return "On leash";
    if (d === "not allowed") return "Not allowed";
    return "Not listed";
  }

  function buildCard(t, isTop) {
    var card = el("article", "card" + (isTop ? "" : " is-next"));
    card.setAttribute("data-id", t.id);
    if (isTop) card.setAttribute("aria-label", t.name);
    else card.setAttribute("aria-hidden", "true");

    var body = el("div", "card-body");
    var row = el("div", "badge-row");
    row.appendChild(el("span", "difficulty " + t.difficulty, t.difficulty));
    if (t.difficulty === "easy") row.appendChild(el("span", "beginner-tag", "Beginner-friendly"));
    body.appendChild(row);

    body.appendChild(el("h2", null, t.name));
    body.appendChild(el("p", "area", t.area));

    var stats = el("div", "stats");
    [
      [fmt(t.length_miles) + " mi", t.length_type],
      [fmt(t.elevation_gain_ft) + " ft", "elevation gain"],
      ["~" + t.drive_minutes + " min", "drive from UWT"]
    ].forEach(function (s) {
      var box = el("div", "stat");
      box.appendChild(el("span", "v", s[0]));
      box.appendChild(el("span", "l", s[1]));
      stats.appendChild(box);
    });
    body.appendChild(stats);

    var facts = el("ul", "facts");
    [
      ["Pass", t.pass_needed],
      ["Dogs", dogsText(t.dogs)],
      ["Season", t.best_season ? cap(t.best_season) : "Not listed on the trail page"],
      ["Highest point", fmt(t.highest_point_ft) + " ft"]
    ].forEach(function (f) {
      var li = el("li");
      li.appendChild(el("b", null, f[0] + ": "));
      li.appendChild(document.createTextNode(f[1]));
      facts.appendChild(li);
    });
    body.appendChild(facts);

    if (t.notes) body.appendChild(el("p", "note", t.notes));
    card.appendChild(body);

    var links = el("div", "links");
    if (typeof t.url === "string" && /^https:\/\//.test(t.url)) {
      var a = el("a", null, "Trail page");
      a.href = t.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      links.appendChild(a);
    }
    var dir = el("a", null, "Directions");
    dir.href = mapsUrl(t); dir.target = "_blank"; dir.rel = "noopener noreferrer";
    links.appendChild(dir);
    card.appendChild(links);

    if (isTop) {
      card.appendChild(el("span", "stamp save", "SAVE"));
      card.appendChild(el("span", "stamp skip", "SKIP"));
      attachDrag(card, t);
    }
    return card;
  }

  function buildMessage(title, body, buttons) {
    var box = el("div", "done");
    box.appendChild(el("h2", null, title));
    if (body) box.appendChild(el("p", null, body));
    buttons.forEach(function (b) {
      var btn = el("button", "btn" + (b.secondary ? " secondary" : ""), b.label);
      btn.type = "button";
      btn.addEventListener("click", b.onClick);
      box.appendChild(btn);
    });
    return box;
  }

  function renderDiscover() {
    els.deck.textContent = "";
    var all = filtered();
    var d = deck();

    if (loadFailed) {
      els.deck.appendChild(buildMessage("Could not load the trails", "Check your connection and try again.", [{ label: "Try again", onClick: load }]));
      els.status.textContent = "";
    } else if (all.length === 0) {
      els.deck.appendChild(buildMessage("No trails match these filters", "Loosen a filter to see more hikes.", [{ label: "Reset filters", onClick: resetFilters }]));
      els.status.textContent = lastAction;
    } else if (d.length === 0) {
      els.deck.appendChild(buildMessage(
        "You have seen all " + all.length + " trails",
        saved.length ? "You saved " + saved.length + "." : "You did not save any yet.",
        [
          { label: "See saved trails", onClick: function () { showView("saved"); } },
          { label: "Start over", secondary: true, onClick: startOver }
        ]
      ));
      els.status.textContent = lastAction;
    } else {
      if (d[1]) els.deck.appendChild(buildCard(d[1], false));
      els.deck.appendChild(buildCard(d[0], true));
      els.status.textContent = (lastAction ? lastAction + " " : "") + d.length + (d.length === 1 ? " trail left." : " trails left.");
    }

    var hasCard = !loadFailed && d.length > 0;
    els.skip.disabled = !hasCard;
    els.save.disabled = !hasCard;
    els.actions.hidden = !hasCard;
  }

  function renderSaved() {
    els.savedList.textContent = "";
    var items = saved.map(function (id) { return byId[id]; }).filter(Boolean);
    els.savedEmpty.hidden = items.length > 0;
    items.forEach(function (t) {
      var li = el("li", "saved-item");
      var top = el("div", "row");
      top.appendChild(el("span", "difficulty " + t.difficulty, t.difficulty));
      top.appendChild(el("h3", null, t.name));
      li.appendChild(top);
      li.appendChild(el("div", "meta", fmt(t.length_miles) + " mi " + t.length_type + " · " + fmt(t.elevation_gain_ft) + " ft gain · ~" + t.drive_minutes + " min drive · " + t.pass_needed));
      var row = el("div", "row");
      if (typeof t.url === "string" && /^https:\/\//.test(t.url)) {
        var a = el("a", null, "Trail page");
        a.href = t.url; a.target = "_blank"; a.rel = "noopener noreferrer";
        row.appendChild(a);
      }
      var dir = el("a", null, "Directions");
      dir.href = mapsUrl(t); dir.target = "_blank"; dir.rel = "noopener noreferrer";
      row.appendChild(dir);
      var rm = el("button", "remove", "Remove");
      rm.type = "button";
      rm.setAttribute("aria-label", "Remove " + t.name + " from saved");
      rm.addEventListener("click", function () { removeSaved(t.id); });
      row.appendChild(rm);
      li.appendChild(row);
      els.savedList.appendChild(li);
    });
  }

  function renderCount() {
    var n = saved.filter(function (id) { return byId[id]; }).length;
    els.savedCount.textContent = String(n);
  }

  function renderAll() {
    renderDiscover();
    renderSaved();
    renderCount();
  }

  // ---------- actions ----------

  function saveTrail(id) {
    if (saved.indexOf(id) === -1) saved.push(id);
    persistSaved();
  }

  function removeSaved(id) {
    saved = saved.filter(function (x) { return x !== id; });
    persistSaved();
    renderSaved();
    renderCount();
  }

  function startOver() {
    var ids = filtered().map(function (t) { return t.id; });
    ids.forEach(function (id) { delete seen[id]; });
    lastAction = "";
    renderDiscover();
  }

  function commit(direction) {
    if (busy) return;
    var d = deck();
    if (!d.length) return;
    var t = d[0];
    var card = els.deck.querySelector(".card:not(.is-next)");
    busy = true;
    if (card) {
      card.classList.remove("is-dragging", "is-returning");
      card.classList.add("is-leaving");
      card.style.transform = "translateX(" + (direction === "right" ? 600 : -600) + "px) rotate(" + (direction === "right" ? 20 : -20) + "deg)";
    }
    window.setTimeout(function () {
      if (direction === "right") {
        saveTrail(t.id);
        lastAction = "Saved " + t.name + ".";
      } else {
        lastAction = "Skipped " + t.name + ".";
      }
      seen[t.id] = true;
      busy = false;
      renderAll();
    }, card ? LEAVE_MS : 0);
  }

  function attachDrag(card, t) {
    var startX = null, startY = 0, dx = 0, pointerId = null;
    var stampSave = card.querySelector(".stamp.save");
    var stampSkip = card.querySelector(".stamp.skip");

    function stamps() {
      var p = Math.min(Math.abs(dx) / SWIPE_DISTANCE, 1);
      stampSave.style.opacity = dx > 0 ? p : 0;
      stampSkip.style.opacity = dx < 0 ? p : 0;
    }

    card.addEventListener("pointerdown", function (e) {
      if (busy || (e.button !== undefined && e.button !== 0)) return;
      if (e.target.closest && e.target.closest("a, button")) return;
      startX = e.clientX; startY = e.clientY; dx = 0; pointerId = e.pointerId;
      card.classList.remove("is-returning");
      card.classList.add("is-dragging");
      try { card.setPointerCapture(e.pointerId); } catch (err) { /* not fatal */ }
    });

    card.addEventListener("pointermove", function (e) {
      if (startX === null || e.pointerId !== pointerId) return;
      dx = e.clientX - startX;
      card.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 20) + "deg)";
      stamps();
    });

    function finish(e, cancelled) {
      if (startX === null || (e && e.pointerId !== pointerId)) return;
      var moved = dx;
      startX = null;
      card.classList.remove("is-dragging");
      if (!cancelled && Math.abs(moved) >= SWIPE_DISTANCE) {
        commit(moved > 0 ? "right" : "left");
      } else {
        card.classList.add("is-returning");
        card.style.transform = "";
        dx = 0;
        stamps();
      }
    }
    card.addEventListener("pointerup", function (e) { finish(e, false); });
    card.addEventListener("pointercancel", function (e) { finish(e, true); });
  }

  // ---------- views and filters ----------

  function showView(name) {
    var discover = name === "discover";
    els.viewDiscover.hidden = !discover;
    els.viewSaved.hidden = discover;
    els.tabDiscover.classList.toggle("is-active", discover);
    els.tabSaved.classList.toggle("is-active", !discover);
    els.tabDiscover.setAttribute("aria-pressed", String(discover));
    els.tabSaved.setAttribute("aria-pressed", String(!discover));
    if (!discover) renderSaved();
  }

  function syncControls() {
    els.beginner.checked = settings.beginner;
    els.easy.checked = settings.beginner ? true : settings.easy;
    els.moderate.checked = settings.beginner ? false : settings.moderate;
    els.hard.checked = settings.beginner ? false : settings.hard;
    els.easy.disabled = els.moderate.disabled = els.hard.disabled = settings.beginner;
    els.maxDrive.value = String(settings.maxDrive);
    els.maxDriveOut.textContent = settings.maxDrive + " min";
    els.maxLength.value = String(settings.maxLength);
    els.maxLengthOut.textContent = settings.maxLength >= LENGTH_ANY ? "any" : settings.maxLength + " mi";
  }

  function filtersChanged() {
    persistSettings();
    syncControls();
    lastAction = "";
    renderDiscover();
  }

  function resetFilters() {
    settings = copy(DEFAULTS);
    filtersChanged();
  }

  function wire() {
    els.tabDiscover.addEventListener("click", function () { showView("discover"); });
    els.tabSaved.addEventListener("click", function () { showView("saved"); });
    els.skip.addEventListener("click", function () { commit("left"); });
    els.save.addEventListener("click", function () { commit("right"); });
    els.reset.addEventListener("click", resetFilters);

    els.beginner.addEventListener("change", function () { settings.beginner = els.beginner.checked; filtersChanged(); });
    ["easy", "moderate", "hard"].forEach(function (k) {
      els[k].addEventListener("change", function () { settings[k] = els[k].checked; filtersChanged(); });
    });
    els.maxDrive.addEventListener("input", function () { settings.maxDrive = Number(els.maxDrive.value); filtersChanged(); });
    els.maxLength.addEventListener("input", function () { settings.maxLength = Number(els.maxLength.value); filtersChanged(); });

    document.addEventListener("keydown", function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (els.viewDiscover.hidden) return;
      var tag = e.target && e.target.tagName;
      // Arrow keys belong to sliders and menus; checkboxes do not use them, so swiping still works after ticking one.
      if (tag === "SELECT" || tag === "TEXTAREA") return;
      if (tag === "INPUT" && e.target.type !== "checkbox") return;
      if (e.key === "ArrowRight") { e.preventDefault(); commit("right"); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); commit("left"); }
    });
  }

  // ---------- loading ----------

  function load() {
    loadFailed = false;
    els.status.textContent = "Loading trails...";
    els.actions.hidden = true;
    return fetch(DATA_URL, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!Array.isArray(data) || data.length === 0) throw new Error("No trails in data file");
        trails = data.filter(function (t) { return t && typeof t.id === "string"; });
        trails.sort(function (a, b) { return a.drive_minutes - b.drive_minutes; });
        byId = {};
        trails.forEach(function (t) { byId[t.id] = t; });
        saved = saved.filter(function (id) { return byId[id]; });
        persistSaved();
        renderAll();
      })
      .catch(function () {
        loadFailed = true;
        renderAll();
      });
  }

  loadState();
  syncControls();
  wire();
  load();
})();
