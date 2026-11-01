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
| Marcus | Mechanical Engineering | Car | Yes | Finding hikes in the first place | The same swipe cards as Ivan; doesn't care about weather |
| Aramis | Computer Science | Car | No | Finding easy, beginner-friendly hikes | Clear difficulty markers |

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
