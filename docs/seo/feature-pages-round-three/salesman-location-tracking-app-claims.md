# Claims sheet: Live Tracking (`live_tracking`)

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). Backend read from supabase-functions origin/main b08b6fab plus live prod functions and cron. Line refs are `git -C /Users/ronak/Desktop/PaySaathi/takkada/takkada show origin/main:<path> | grep -n`, paths under `lib/`. No Live Tracking file differs between takkada origin/main and origin/stage, and no live-tracking migration is stage-only, so everything below is live.

## Gating

- One paid add-on, key `live_tracking`, in no plan tier, operator-granted (`models/company_feature_access.dart:153-158`).
- It is the premium tier of the **Field team** card and **includes Check-in / Check-out** (Field Visits): the app treats `field_visits` as on when `live_tracking` is on (`services/field_visits_access_service.dart:53-58`; `config/addon_catalog.dart:291-301`), and the prod gate `is_company_feature_enabled` carries the same alias (live body references `live_tracking`; migration `20261048100100_field_visits_implied_by_live_tracking.sql`).
- Add-on pitch: "Everything in Check-in / Check-out, plus a live map: where each salesman is, the route he took today, km travelled and his phone battery. Android phones only." (`config/addon_catalog.dart:207-212`).
- **iOS: not at all.** `LiveTrackingAccessService.isEnabled` returns false on iOS, which removes every Live Tracking surface (Start day, Team Map row, the Team screen's map action, the member "View team location" card, the route guard) from the iPhone app (`services/live_tracking_access_service.dart:13-20`, `:51-58`).
- **Recording (Start day) is Android only**: the card shows for a non-owner staff member, on an Android phone, in a company with the add-on (`widgets/live_tracking/start_day_card.dart:10-17`).
- **Team Map viewing works on Android and in a web browser** ("Web is allowed — reading a map needs no GPS") (`utils/live_tracking_route_guard.dart:9-10`; `live_tracking_access_service.dart:51-55`; route `config/app_router.dart:2200-2224`). It does not open in the iPhone app. A browser on any device counts as web, but browser login needs the separate Web view switch.
- Who sees the Team Map: full access, or a member given **View team location** (`models/member_access_models.dart:369-371`; `utils/live_tracking_route_guard.dart:12-24`). The server re-checks membership, the add-on and that permission on every read (`services/live_tracking/live_tracking_reads.dart:182-183`).
- Off: the Team Map route sends the user to Home (`live_tracking_route_guard.dart:7`, `:16-26`).
- Prod, 2026-11-05: `live_tracking` active on **8** companies (90 inactive). 195 duty days across 6 companies, 191 of them in the last 30 days, 19,602 location pings, latest day today. Use this only to know it works; never quote it.

## Can say

**The salesman's phone (Android)**
- A **Start your day** card on Home: "Tap Start day when you go out for work. Your location is shared only until you tap End day." Buttons **Start day** / **End day** (`widgets/live_tracking/start_day_card.dart:118-121`, `:145`, `:152`).
- Before the first start, a consent screen, "Share your location during work": location and battery level; the owner and staff they allow can see it; only between Start day and End day; a notification stays on the phone the whole time (`start_day_card.dart:219-267`; buttons Cancel / Agree `:275`, `:283`).
- On duty: "On duty since 9:40 AM" and "Your location is shared every 5 min while on duty. Tap End day when you finish work." (`start_day_card.dart:110-116`).
- **End day** asks "End your day?" "Your location will stop being shared." (`start_day_card.dart:76-85`), then "Day ended. You covered 23.4 km." (`services/live_tracking/duty_day_service.dart:526-527`).
- A ping goes every N minutes (company setting, default 5) **or every 200 m**, whichever comes first. Below 15% battery it drops to one every 15 min (`services/live_tracking/location_ping_stream.dart:20-28`, `:39-41`).
- No signal: pings queue on the phone and upload later. Pings older than 48 hours are thrown away, not back-filled (`services/live_tracking/ping_outbox.dart:73-87`).
- If the phone closes the app, reopening it restarts tracking and says when it had stopped (`duty_day_service.dart:621-623`, `:661`).
- A **Keep tracking on all day** help sheet with battery-saver steps for Xiaomi/Redmi/Poco, Vivo/iQOO, Oppo/Realme/OnePlus and Samsung (`start_day_card.dart:297-321`, `:336`).
- Sign-out on a shared phone stops tracking and clears that salesman's queued trail (`duty_day_service.dart:544-552`).

**The owner's Team Map**
- Home row **Team Map**, "See where your team is right now" (`screens/home_screen.dart:808-823`). Screen title **Team Map** (`screens/live_tracking/team_map_screen.dart:297`).
- A map with a pin per person on duty; a pin turns the warning colour when that phone has gone quiet (`team_map_screen.dart:333-375`). Empty: "Nobody on duty is sharing a location." (`:342`).
- Three lists: **On duty**, **Day ended**, **Never started today** (`team_map_screen.dart:403-405`). Each row: "Last seen 4 min ago · Battery 62% · 12.3 km today", or "Stopped reporting at 2:10 PM" in warning colour, or "Ended at 7:45 PM (automatic)", or "Did not start the day" (`:497-533`, `:537-542`).
- "Stopped reporting" means an open day with no ping for over 20 minutes (`services/live_tracking/live_tracking_reads.dart:57-59`).
- Refreshes every 60 seconds (`team_map_screen.dart:106-108`, `:116`).
- Full access sets **Auto-stop time** ("Days still open end automatically at 8:00 PM", default 20:00) and **Location every** 2, 5, 10 or 15 min ("More often uses more battery. Phones low on battery share every 15 min.") (`team_map_screen.dart:216-220`, `:242-256`, `:380-401`; `live_tracking_reads.dart:22-24`). Prod cron `live-tracking-auto-stop` runs every 15 min.
- Admins are not tracked; the map lists "Admins — not tracked (N)" with "Live tracking follows staff, not admins…" and **Manage team** (`team_map_screen.dart:86-87`, `:432-453`).

**The route (Salesman's day)**
- Tapping a person opens **Salesman's day** for today (`team_map_screen.dart:282-292`): the day's route on a map, split wherever pings are more than 20 min apart ("No location from 1:10 PM…"), red dots for pings that were not clean, a pin per check-in, plus visits, orders and receipts (`screens/field_visits/salesman_day_screen.dart:49-53`, `:340-341`, `:414`, `:457-477`; `live_tracking_reads.dart:164-168`).
- The map part shows only where Live Tracking is allowed (never on iPhone) (`salesman_day_screen.dart:52-53`, `:152`).
- "Locations older than 90 days are not kept." (`salesman_day_screen.dart:46`, `:334`; prod cron `live-tracking-purge`, interval 90 days).

**Tally**
- Nothing. Live Tracking writes no voucher and nothing to Tally. Orders and receipts shown on Salesman's day are the usual ones, "Includes entries made in Tally." (`salesman_day_screen.dart:476-477`).

## Cannot say / do not claim

- **No iPhone.** Neither recording nor the Team Map in the iPhone app. Do not say "every phone" (that wording belongs to Check-in / Check-out, `addon_catalog.dart:200-205`).
- **No tracking outside the duty window.** Nothing before Start day or after End day / auto-stop. Do not say "24x7" or "always on".
- **Owners and admins are not tracked**; only non-owner staff get Start day.
- **Not real-time to the second.** Pings every 2 to 15 min (or 200 m), map refresh every 60 s.
- **No geofence alerts, no push alerts when someone stops reporting, no history beyond 90 days, no route optimisation, no attendance or payroll export.**
- **It cannot stop a phone killing the app.** Some phones need the battery-saver steps; say the app restarts tracking when reopened.
- **It is not separate from Field Visits.** The feature_definitions text "separate from Field Visits" is contradicted by code: Live Tracking includes Check-in / Check-out. Say "includes check-in and check-out".
- The definition's "km travelled" holds: per day, shown on the map rows and at End day.

## Screen captures

- `live-tracking-map`: the Team Map (`team_map_screen.dart`) on Android or web: map with two or three person pins (one in warning colour), the Auto-stop time and Location every rows (full access view), then On duty rows reading "Last seen 3 min ago · Battery 64% · 18.2 km today" and one "Stopped reporting at …", a Day ended row with "(automatic)". The demo company has seeded live-tracking data (prod cron `demo-live-tracking`), so capture from demo, never a customer.

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada**: the day view's orders and receipts include entries made in Tally ("Includes entries made in Tally.", `screens/field_visits/salesman_day_screen.dart:477`); Stopped reporting after 20 minutes (`live_tracking_reads.dart:57-59`); km per day and at End day (`duty_day_service.dart:526-527`); writes nothing to Tally.

**Tally alone (basis)**: Tally keeps the orders and receipts once keyed and has no location record; the page says Tally "was never meant to record where a salesman went". Phone call, travel claim and "found out when he does not pick up" are the reader's day.
