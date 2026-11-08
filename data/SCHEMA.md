# Trail data schema

`data/trails.json` is an array of trail objects. This file is the contract between the data and the app. Change it only with both people agreeing, in a PR of its own, and log the change.

## Fields

Every field below is present on every trail. Where a fact could not be verified, the value is `null` (never a guess).

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Unique, lowercase, hyphenated. Used for saving trails in the browser. |
| `name` | string | Trail name as the source page gives it. |
| `area` | string | Area or region, as the source page gives it. |
| `difficulty` | `"easy"`, `"moderate"`, or `"hard"` | Derived from length and elevation gain by the rule below. |
| `length_miles` | number | Trail length in miles. |
| `length_type` | `"roundtrip"` or `"one-way"` | How the length is counted. All trails in this file are roundtrip. |
| `elevation_gain_ft` | number | Elevation gain in feet. |
| `highest_point_ft` | number | Highest point in feet. |
| `drive_minutes` | integer | Approximate drive time from UW Tacoma to the trailhead in minutes, without heavy traffic. |
| `drive_minutes_checked` | boolean | `true` once someone has checked the number against a maps app. |
| `pass_needed` | string | The pass or fee the source page lists. `"None"` if none. |
| `dogs` | `"on leash"`, `"not allowed"`, or `"unknown"` | Dog rule from the source page. |
| `best_season` | string or `null` | Only filled in when the source page says something about seasons. |
| `notes` | string or `null` | Short notes the source page supports: closures, gates, warnings. |
| `lat`, `lng` | number | Trailhead coordinates from the source page. |
| `url` | string | Link to the trail page the numbers came from. |
| `data_checked` | string | Date the source page was read, `YYYY-MM-DD`. |

## Optional fields

| Field | Type | Meaning |
|---|---|---|
| `transit` | string | Bus route info. Not used in this file. If added, also add `transit_checked` with a date, because routes change. |

## Difficulty rule

Difficulty is calculated, not copied from the source, so every trail is rated the same way:

- **hard**: elevation gain over 2,000 ft
- **moderate**: elevation gain over 600 ft, or length over 5.5 miles
- **easy**: everything else

The app treats "beginner-friendly" as `difficulty == "easy"`.

## Drive time

`drive_minutes` is an estimate from UW Tacoma, not a measured value. The app labels it with `~` and gives every trail a "Directions" link that opens a maps app with the live drive time. When someone checks a trail's time, update the number and set `drive_minutes_checked` to `true`.
