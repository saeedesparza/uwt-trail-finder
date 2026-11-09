# Plan

## Who it's for

UW Tacoma students who want to hike but have trouble finding a trail that suits them, from people who already hike to complete beginners. We interviewed three UWT students (Ivan, Marcus, and Aramis; their answers are in LOG.md). The plan below is built on what they told us.

## What we're building

A static web app (HTML, CSS, vanilla JS, no build step) hosted on GitHub Pages.

- **Swipe cards are the main view.** Trails come up one at a time; swipe right to save, left to skip. Ivan and Marcus both asked for this.
- **Difficulty first.** Every card shows a big color-coded difficulty badge (easy / moderate / hard), and there's a "beginner-friendly" filter. This is for Aramis, who doesn't hike yet.
- Each card also shows drive time from UWT, length, elevation gain, best season, and a link to the trail's official page.
- A small settings panel filters which cards appear: difficulty, max drive time, and max length.
- A "saved" list of the trails you swiped right on, stored in the browser.
- 15–25 real trails within about 90 minutes of UWT.
- Works on a phone, since that's where students will use it.

**Stretch goal:** today's weather on each card from Open-Meteo (free, no key needed), for Ivan. Only once everything above works.

**Dropped from the main features:** filtering by bus. All three students drive. Trails can still list transit as an optional field.

**Out of scope for Nov 8:** user accounts, reviews, live maps, and any backend.

## Who owns what

| Area | Owner | Files |
|---|---|---|
| Trail data and research (trails, difficulty ratings, drive times, sources) | Vaughn | `data/trails.json`, `data/SOURCES.md` |
| UI: swipe cards, settings panel, saved list, mobile styling | Saeed (first version written by Vaughn on Nov 8, see LOG.md) | `index.html`, `styles.css`, `app.js` |
| Data format (the contract between the two halves) | Both, agreed together | `data/SCHEMA.md` |
| Plan, log, agent instructions | Both | `PLAN.md`, `LOG.md`, `CLAUDE.md` |

You only edit files you own. If you need a change in the other person's files, open an issue or ask in a PR comment.

## Data contract

`data/trails.json` is an array of trail objects. Both halves code against `data/SCHEMA.md`. Until Vaughn's real data lands, Saeed builds against 3 sample trails in that same format. Changing the schema needs both of us to agree, and the change gets logged.

## How we avoid collisions

- `main` is protected by agreement: nobody commits to it directly.
- One branch per task, named `<name>/<task>` (e.g. `saeed/filters`, `vaughn/trail-data`).
- Every change goes in through a pull request. **The other person reviews and merges it.** Nobody merges their own PR.
- Pull `main` before starting a task and rebase before opening a PR.
- Shared files (`PLAN.md`, `LOG.md`, `CLAUDE.md`, `data/SCHEMA.md`) get their own small PRs, never bundled with feature work.
- Every merged PR adds a line to LOG.md.

## Schedule

| Date | Milestone |
|---|---|
| Sun Nov 1 | Plan, log, and CLAUDE.md written; checkpoint card on portfolios |
| Sun Nov 1 | Student interviews done (Ivan, Marcus, Aramis); plan updated |
| Tue Nov 3 | Schema agreed; sample data in; swipe cards working on sample data |
| Thu Nov 5 | Real trail data + settings panel + saved list merged; live on GitHub Pages |
| Sat Nov 7 | Show it to Ivan, Marcus, and Aramis; fix what they flag; weather if time allows |
| Sun Nov 8 | Handover done; portfolio cards filled in; submitted on Canvas |

## How the schedule went

The table above is the plan we wrote on Nov 1. On `main`, the schema, the trail data, and the app all arrived on Nov 8, so the Nov 3 and Nov 5 milestones landed on the final day. The student check moved from Nov 7 to Nov 8. Weather was not built. See LOG.md for the details.
