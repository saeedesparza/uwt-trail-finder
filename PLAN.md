# Plan

## Who it's for

UW Tacoma students who want to go hiking but don't know the area, and many of whom don't have a car. Before building, we'll ask at least 3 UWT students (classmates, a club, or a friend group) what stops them from hiking now and what they'd want from an app like this. Their answers go in LOG.md, and we'll change this plan if they need something different.

## What we're building

A static web app (HTML, CSS, vanilla JS, no build step) hosted on GitHub Pages.

- A list of 15–25 real trails within about 90 minutes of UWT
- Filters: distance from campus (drive time), difficulty, trail length, and **reachable by Pierce Transit / Sound Transit** (yes/no + which route)
- A short card for each trail: length, elevation gain, what to bring, best season, and a link to the trail's official page
- Works on a phone, since that's where students will use it

**Out of scope for Nov 8:** user accounts, reviews, live maps, and any backend.

## Who owns what

| Area | Owner | Files |
|---|---|---|
| Trail data and research (trails, transit routes, sources) | Vaughn | `data/trails.json`, `data/SOURCES.md` |
| UI: layout, filters, trail cards, mobile styling | Saeed | `index.html`, `styles.css`, `app.js` |
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
| Tue Nov 3 | Student interviews done; schema agreed; sample data in |
| Thu Nov 5 | Real trail data + working filters merged; live on GitHub Pages |
| Sat Nov 7 | Show it to the students we interviewed; fix what they flag |
| Sun Nov 8 | Handover done; portfolio cards filled in; submitted on Canvas |
