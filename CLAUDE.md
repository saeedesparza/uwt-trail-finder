# CLAUDE.md: UWT Trail Finder

Two people work on this repo, each with their own Claude Code agent. **Agents don't talk to each other.** This file and PLAN.md are how you know what the other half is doing. Read PLAN.md before starting any task.

## The project

A static trail finder for UW Tacoma students (HTML, CSS, vanilla JS, no build step, no backend, no frameworks). It deploys to GitHub Pages from `main`. It has to work well on a phone.

## Ownership: check before you edit

- **Vaughn** owns `data/trails.json` and `data/SOURCES.md`.
- **Saeed** owns `index.html`, `styles.css`, and `app.js`. Vaughn wrote the first version on Nov 8 (see LOG.md), and Saeed owns the files from that merge on.
- **Shared** (change only in a small PR of its own): `PLAN.md`, `LOG.md`, `CLAUDE.md`, `data/SCHEMA.md`.

Ask your human which of them you're working for. Only edit files that person owns. If the task needs a change somewhere else, stop and say so. Don't make the change yourself.

## Workflow rules

1. Never commit to `main`. Run `git pull origin main` first, then create a branch named `<name>/<task>`.
2. Keep each branch to one task. Rebase on `main` before opening a PR.
3. Open a PR with `gh pr create`. Never merge your own human's PR; the other person merges.
4. Add one line to LOG.md describing the change, in the same PR.
5. Treat `data/SCHEMA.md` as the contract. Don't change the data shape on your own. If it has to change, propose it in a separate PR.

## Data rules

- Every trail must be real and must have a source link in `data/SOURCES.md`. Never invent trails, distances, elevation, or bus routes. If a fact can't be verified, leave the field empty and flag it.
- Transit info (route numbers, stops) changes, so record the date it was checked.

## Checks before a PR

- Run `python3 tests/check_data.py` from the repo root. It checks `data/trails.json` against `data/SCHEMA.md` and `data/SOURCES.md`.
- To try the app, run `python3 -m http.server` and open http://localhost:8000. Opening `index.html` as a file will not load the data.
