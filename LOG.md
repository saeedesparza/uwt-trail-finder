- **Plan and docs PR:** Updated the ownership table and CLAUDE.md to match what happened, noted how the schedule played out in PLAN.md, and added run instructions to the README.
# Shared Log

What we planned and what changed. Newest at the bottom. Every merged PR adds a line here.

## 2026-11-01

- **Team formed:** Saeed Esparza and Vaughn DeTray.
- **Audience chosen:** UW Tacoma students who want to hike. This builds on Saeed's earlier "Trail Finder" portfolio idea, refocused on students and on reaching trails by bus.
- **Plan written** (PLAN.md): static site; Vaughn owns trail data, Saeed owns the UI; branch per task, PRs reviewed and merged by the other person.
- **Shared CLAUDE.md written** so both of our Claude Code agents work from the same plan and ownership rules.
- **Next:** interview at least 3 UWT students and write `data/SCHEMA.md` together.

## 2026-11-01: Student interviews

Saeed talked to three UWT students. We asked each one how they get around, whether they hike now, what stops them, and what they'd want from the app.

| Student | Major / year | Gets around by | Hikes now? | What stops them | What they want |
|---|---|---|---|---|---|
| Ivan | Electrical Engineering, junior | Car | Yes | Doesn't know which trails are best given the weather | Hikes that come up one at a time as Tinder-style swipe cards, not a list to filter |
| Marcus | Mechanical Engineering, junior | Car | Yes | Finding hikes in the first place | The same swipe cards as Ivan; doesn't care about weather |
| Aramis | Computer Science, junior | Car | No | Finding easy, beginner-friendly hikes | Clear difficulty markers |

**What we learned:**
- **Swipe cards** came up twice without us suggesting it. Both people who hike want to be shown options, not to search.
- **Everyone drives.** Nobody we talked to needs a bus, so transit was a guess on our part that these interviews didn't back up.
- **Difficulty matters most to the person who doesn't hike yet.** A beginner needs to see "easy" before anything else, or they won't start.
- **Weather** mattered to 1 of 3.

**Plan changes** (see PLAN.md):
- Swipe cards are now the main view, and the filters move into a small settings panel.
- Difficulty is a big color-coded badge on every card, and there's a "beginner-friendly" filter.
- Transit is no longer a main filter. It's an optional field on each trail.
- Weather is a stretch goal: today's forecast on the card, if there's time after the core works.

## 2026-11-08: Week 2 build

- **Where things stood:** On Nov 8 `main` had the plan, the log, and the interview notes, but no schema, trail data, or app code. Vaughn wrote the week 2 pieces and opened them as three PRs, in order, for Saeed to review and merge.
- **Schema PR:** Added `data/SCHEMA.md`. It lists every field, sets the difficulty rule (hard over 2,000 ft of gain, moderate over 600 ft of gain or over 5.5 miles, easy otherwise), and says plainly that drive time is an estimate.
- **Trail data and app PR:** Added 18 real trails within about 90 minutes of UWT in `data/trails.json`, with a source for each in `data/SOURCES.md` and a checker in `tests/check_data.py`. Every length, elevation gain, pass, and coordinate comes from the trail's Washington Trails Association page, read on Nov 8. Dash Point State Park (no route length or gain listed) and Mount Peak (trail closed since Oct 13) were left out. Also added the app: swipe cards with a color-coded difficulty badge, a beginner-friendly toggle, filters for difficulty, drive time, and length, a saved list kept in the browser, and a Directions button that opens a maps app with the live drive time.
- **Ownership note:** `index.html`, `styles.css`, and `app.js` belong to Saeed in the plan, but they were not on `main`, so Vaughn wrote the first version. Saeed reviews it in the trail data and app PR and owns it from the merge on.
- **How it was built and tested:** Vaughn worked with a Claude chat session to read the trail pages and write the schema, data, and app. The app was tested in a real browser: mouse and touch swipes, the Save and Skip buttons, arrow keys, every filter, saved trails after a reload, small phone screens, and a failed data load. 58 checks passed. The data checker was run against deliberately broken data and caught each problem.
- **Not verified:** Drive times are estimates, not measured, so every trail has `drive_minutes_checked: false`. Difficulty is calculated, not WTA's rating. Weather (the stretch goal) was not built.
