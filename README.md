# UWT Trail Finder

A trail finder for UW Tacoma students. Trails near campus come up one at a time as swipe cards, each with a clear difficulty badge. Swipe right to save a hike, left to skip it.

Built by Saeed Esparza and Vaughn DeTray for TCSS 490, Artifact 4 ("For Someone Else").

- Plan: [PLAN.md](PLAN.md)
- Shared log: [LOG.md](LOG.md)
- Agent instructions: [CLAUDE.md](CLAUDE.md)
- Trail data and sources: [data/trails.json](data/trails.json), [data/SOURCES.md](data/SOURCES.md), [data/SCHEMA.md](data/SCHEMA.md)

## Try it

Live site: https://saeedesparza.github.io/uwt-trail-finder/ (GitHub Pages, deployed from `main`).

To run it on your own computer:

```
python3 -m http.server
```

Then open http://localhost:8000. To check the trail data, run `python3 tests/check_data.py`.

Drive times are estimates. Each card has a Directions button that opens a maps app with the real time.
