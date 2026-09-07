---
slug: home
title: How to find your way around Takkada
meta_title: How to find your way around Takkada
meta_description: Choose which business you are working on, read the Home tiles, understand why a tile is locked, and find help inside the app.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Select Business
  - TOTAL RECEIVABLE
  - TOTAL PAYABLE
  - QUICK ACTIONS
  - RECENT ACTIVITY
  - Locked
  - Edit registers
  - Ask your business owner to grant register access.
  - You do not have permission to open this register.
  - Customize Home screen
  - Choose which registers show on Home
  - Settings
  - Help & support
quoteSources:
  Select Business:
    - lib/screens/home_screen.dart
  TOTAL RECEIVABLE:
    - lib/screens/home_screen.dart
  TOTAL PAYABLE:
    - lib/screens/home_screen.dart
  QUICK ACTIONS:
    - lib/screens/home_screen.dart
  RECENT ACTIVITY:
    - lib/screens/home_screen.dart
  Locked:
    - lib/widgets/feature_lock_presentation.dart
  Edit registers:
    - lib/screens/home_screen.dart
  Ask your business owner to grant register access.:
    - lib/screens/home_screen.dart
  You do not have permission to open this register.:
    - lib/screens/home_screen.dart
  Customize Home screen:
    - lib/screens/settings/app_preferences_screen.dart
  Choose which registers show on Home:
    - lib/screens/settings/app_preferences_screen.dart
  Settings:
    - lib/screens/settings_screen.dart
  Help & support:
    - lib/config/settings_catalog.dart
relatedGuides:
  - bills-and-outstanding
  - party-ledger
  - team-access
  - sales-orders
sections:
  - id: choose-a-business
    featureKeys: []
    settings: {}
    permission: none
  - id: read-home
    featureKeys: []
    settings: {}
    permission: none
  - id: locked-tiles
    featureKeys: []
    settings: {}
    permission: none
images: []
---

Home is the first screen you see after signing in. It shows one business at a
time: what that business is owed, what it owes, and shortcuts into the work you
do most. This short guide explains how to move around it.

## Before you start

- You must be signed in and have at least one business set up.
- Everything on Home belongs to the business you have selected. Switch the
  business and every figure and tile changes with it.
- Home shows you only what your access allows. If a colleague's Home looks
  different from yours, that is normal.

## Choose which business you are working on

1. Tap the business name at the top of Home.
2. Pick the business you want from "Select Business".
3. Home reloads with that business's figures.

If you belong to several businesses, always check the name at the top before
you record anything. Every screen in the app follows this choice.

## Read the Home screen

- The money cards at the top show "TOTAL RECEIVABLE" — what customers owe you —
  and "TOTAL PAYABLE", what you owe suppliers. Tap either one to open the
  matching list.
- Under "QUICK ACTIONS" sit the tiles for your day-to-day work: registers,
  reminders, imports, dispatch and so on.
- "RECENT ACTIVITY" lists the latest entries in this business, so you can see
  what has just happened without opening a report.
- The search box at the top searches parties, invoices and items across the
  business.

You can change which registers appear. Open Settings, then App preferences, then
"Customize Home screen" — described there as
"Choose which registers show on Home". On Home itself, "Edit registers" takes
you to the same place.

## Why a tile is locked

A tile can look different for three separate reasons, and they are worth telling
apart.

- **Locked.** The tile is on your Home with a lock on it and shows "Locked".
  The business does not currently have that feature switched on. Tapping it
  explains what it is; it does not start the feature.
- **Not there at all.** Some features are simply absent from Home when the
  business does not have them. There is no teaser and nothing to tap.
- **There, but not for you.** The feature is on for the business, but your own
  access does not include it. Opening a register you are not allowed to see
  gives "You do not have permission to open this register.", and the register
  editor tells you to "Ask your business owner to grant register access."

The first is a business-level decision. The third is your admin's decision about
you. In both cases the person who can change it is an admin of the business, not
you.

## Where to find help

- Settings has a "Help & support" entry with the ways to reach the team.
- These public guides cover the same procedures and are open to anyone, whether
  or not they are signed in.

## When it does not look right

**Home shows no figures.** Either no business is selected, or the business has
not finished its first sync. Check the business name at the top first.

**The figures look stale.** Home reads what has synced. Pull down to refresh,
and if it stays behind, check the Tally sync screen.

**A tile you used yesterday has gone.** Either the business was switched, or an
admin changed your access. Check the business name before anything else.
