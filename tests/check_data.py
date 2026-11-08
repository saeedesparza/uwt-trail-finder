"""Checks data/trails.json against data/SCHEMA.md. Run from the repo root: python3 tests/check_data.py"""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIELDS = {
    "id": str, "name": str, "area": str, "difficulty": str, "length_miles": (int, float),
    "length_type": str, "elevation_gain_ft": (int, float), "highest_point_ft": (int, float),
    "drive_minutes": int, "drive_minutes_checked": bool, "pass_needed": str, "dogs": str,
    "best_season": (str, type(None)), "notes": (str, type(None)), "lat": (int, float),
    "lng": (int, float), "url": str, "data_checked": str,
}
errors = []

def err(trail, msg):
    errors.append(f"{trail}: {msg}")

def expected_difficulty(gain, miles):
    if gain > 2000:
        return "hard"
    if gain > 600 or miles > 5.5:
        return "moderate"
    return "easy"

with open(os.path.join(ROOT, "data", "trails.json"), encoding="utf-8") as f:
    trails = json.load(f)
if not isinstance(trails, list):
    sys.exit("trails.json must be an array")

ids = set()
for t in trails:
    name = t.get("id", "?")
    for key, typ in FIELDS.items():
        if key not in t:
            err(name, f"missing field {key}")
        elif isinstance(t[key], bool) and typ is not bool:
            err(name, f"{key} has the wrong type")
        elif not isinstance(t[key], typ):
            err(name, f"{key} has the wrong type")
    extra = set(t) - set(FIELDS) - {"transit", "transit_checked"}
    if extra:
        err(name, f"unknown fields {sorted(extra)}")
    if any(e.startswith(name + ":") for e in errors):
        continue
    if t["id"] in ids:
        err(name, "duplicate id")
    ids.add(t["id"])
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", t["id"]):
        err(name, "id must be lowercase and hyphenated")
    if t["difficulty"] not in ("easy", "moderate", "hard"):
        err(name, "bad difficulty")
    elif t["difficulty"] != expected_difficulty(t["elevation_gain_ft"], t["length_miles"]):
        err(name, "difficulty does not follow the rule in SCHEMA.md")
    if t["length_type"] not in ("roundtrip", "one-way"):
        err(name, "bad length_type")
    if t["dogs"] not in ("on leash", "not allowed", "unknown"):
        err(name, "bad dogs value")
    if not (0 < t["length_miles"] < 50):
        err(name, "length out of range")
    if not (0 <= t["elevation_gain_ft"] < 10000):
        err(name, "elevation gain out of range")
    if t["highest_point_ft"] <= 0:
        err(name, "highest point out of range")
    if not (0 < t["drive_minutes"] <= 90):
        err(name, "drive_minutes must be 1 to 90")
    if not (46.5 < t["lat"] < 48.2 and -123.3 < t["lng"] < -121.0):
        err(name, "coordinates are outside the expected area")
    if not t["url"].startswith("https://"):
        err(name, "url must be https")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", t["data_checked"]):
        err(name, "data_checked must be YYYY-MM-DD")

sources = open(os.path.join(ROOT, "data", "SOURCES.md"), encoding="utf-8").read()
for t in trails:
    if t.get("url") and t["url"] not in sources:
        err(t.get("id", "?"), "url is not listed in data/SOURCES.md")

if not 15 <= len(trails) <= 25:
    errors.append(f"expected 15 to 25 trails, found {len(trails)}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"OK: {len(trails)} trails pass all checks")
