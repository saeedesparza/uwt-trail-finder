# Sources

Every length, elevation gain, high point, pass, dog rule, and trailhead coordinate in `trails.json` comes from the trail's page on Washington Trails Association (WTA), read on 2026-11-08, not from memory or another app. The exceptions (difficulty, drive time, and a few notes) are listed below. The WTA page is the "official page" link on each card; it names the land manager and pass for each trail.

## What came from where

| Trail | Page | Length, gain, high point | Trailhead (lat, lng) |
|---|---|---|---|
| Point Defiance Park | https://www.wta.org/go-hiking/hikes/point-defiance-park | 5.0 mi roundtrip, 200 ft gain, 300 ft high | 47.305, -122.5168 |
| Chambers Bay Loop | https://www.wta.org/go-hiking/hikes/chambers-bay-loop | 3.25 mi roundtrip, 315 ft gain, 234 ft high | 47.2117, -122.5696 |
| Billy Frank Jr. Nisqually National Wildlife Refuge | https://www.wta.org/go-hiking/hikes/nisqually-nwr | 5.0 mi roundtrip, 10 ft gain, 10 ft high | 47.0726, -122.7138 |
| Mima Mounds | https://www.wta.org/go-hiking/hikes/mima-mounds | 2.75 mi roundtrip, 10 ft gain, 225 ft high | 46.9051, -123.048 |
| Discovery Park Loop Trail | https://www.wta.org/go-hiking/hikes/discovery-park-loop-trail | 2.8 mi roundtrip, 140 ft gain, 325 ft high | 47.6576, -122.4065 |
| Coal Creek Falls | https://www.wta.org/go-hiking/hikes/coal-creek-falls | 2.5 mi roundtrip, 416 ft gain, 1,066 ft high | 47.5348, -122.1288 |
| Poo Poo Point (Chirico Trail) | https://www.wta.org/go-hiking/hikes/poo-poo-point-chirico-trail | 3.8 mi roundtrip, 1,760 ft gain, 1,850 ft high | 47.5, -122.0219 |
| West Tiger 3 | https://www.wta.org/go-hiking/hikes/west-tiger-3 | 5.0 mi roundtrip, 2,100 ft gain, 2,525 ft high | 47.5296, -121.9956 |
| Rattlesnake Ledge | https://www.wta.org/go-hiking/hikes/rattlesnake-ledge | 4.0 mi roundtrip, 1,160 ft gain, 2,078 ft high | 47.4347, -121.7687 |
| Little Si | https://www.wta.org/go-hiking/hikes/little-si | 3.7 mi roundtrip, 1,300 ft gain, 1,550 ft high | 47.4867, -121.7535 |
| Twin Falls | https://www.wta.org/go-hiking/hikes/twin-falls-state-park | 2.4 mi roundtrip, 500 ft gain, 1,000 ft high | 47.4526, -121.7054 |
| Mount Si | https://www.wta.org/go-hiking/hikes/mount-si | 8.0 mi roundtrip, 3,150 ft gain, 3,900 ft high | 47.488, -121.7231 |
| Mailbox Peak | https://www.wta.org/go-hiking/hikes/mailbox-peak | 10.4 mi roundtrip, 4,000 ft gain, 4,822 ft high | 47.4675, -121.6748 |
| Talapus and Olallie Lakes | https://www.wta.org/go-hiking/hikes/talapus-and-olallie-lakes | 6.2 mi roundtrip, 1,220 ft gain, 3,780 ft high | 47.4013, -121.5184 |
| Franklin Falls | https://www.wta.org/go-hiking/hikes/franklin-falls | 2.0 mi roundtrip, 400 ft gain, 2,600 ft high | 47.4131, -121.4428 |
| Annette Lake | https://www.wta.org/go-hiking/hikes/annette-lake | 7.5 mi roundtrip, 1,800 ft gain, 3,600 ft high | 47.3928, -121.4741 |
| Skookum Flats | https://www.wta.org/go-hiking/hikes/skookum-flats | 4.6 mi roundtrip, 525 ft gain, 2,515 ft high | 47.0779, -121.5856 |
| Snow Lake | https://www.wta.org/go-hiking/hikes/snow-lake | 7.2 mi roundtrip, 1,800 ft gain, 4,400 ft high | 47.4454, -121.423 |

## What is derived or estimated (not from a source page)

- **Difficulty** is calculated from length and elevation gain with the rule in `SCHEMA.md`. It is not WTA's own rating. Change the rule in the schema if the team wants a different one.
- **Drive time** (`drive_minutes`) is an estimate of the drive from UW Tacoma without heavy traffic. It was not measured with a maps app, so every trail has `drive_minutes_checked: false`. The "Directions" button on each card opens a maps app with the live time. Check each number and flip the flag when you do.
- **Best season** is filled in only where the WTA page says something about seasons (Nisqually, Mima Mounds, Discovery Park, Coal Creek Falls, Franklin Falls). For every other trail it is `null`, because the page does not say.
- **Dogs** for West Tiger 3 is `unknown`: the page did not list a dog rule.

## Things we noticed and decided

- **Mount Si:** the stat box says 3,150 ft of gain, and the text says "3,100 feet in a little under 4 miles." We used the stat box value, 3,150. It is hard either way.
- **Skookum Flats:** the full trail is 8.5 miles one way. WTA lists the hike as 4.6 miles roundtrip, and that is what we use.
- **Point Defiance Park:** WTA lists the park as one 5.0-mile roundtrip hike with 200 ft of gain. It is a network of trails, so the card describes it that way.
- **Talapus and Olallie Lakes:** WTA posted a trailhead construction closure of Sept 21 to Oct 31. That date has passed, but check the WTA page for current status before going.
- **Nisqually:** parts of the trail close each year from October to January for waterfowl hunting, so it may be partly closed right now.

## Trails we looked at and left out

- **Dash Point State Park:** WTA gives 19 miles of trails but no length or elevation gain for a single route, so we could not rate it.
- **Mount Peak (Pinnacle Peak), Enumclaw:** WTA says the trail has been closed until further notice since 10.13.26.

## Transit

Nobody we interviewed needs a bus, so no transit info is included. If it is added later, record the date it was checked.
