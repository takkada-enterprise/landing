---
slug: connect-tally
title: How to connect your Tally company
meta_title: "Connect Tally to Takkada and finish the first sync"
meta_description: "Step by step: install the Takkada Windows client on the PC that runs Tally, link it to your account, pick the right company and finish the first sync."
featureKey: tally_sync_dashboard
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Connect Your Tally"
  - "Download the Takkada Windows Client to sync your Tally data"
  - "Scan to Download"
  - "Download Windows Client"
  - "Install on Your PC"
  - "Run the installer on the computer with Tally"
  - "Link Your Account"
  - "Enter your phone number in the loader to connect"
  - "Choose which Tally companies to sync"
  - "installed the loader"
  - "Loader not yet connected. Please install and run the Windows client."
  - "Waiting for Your PC"
  - "Please open the Takkada Windows Client on your computer and sign in with your phone number."
  - "Having trouble?"
  - "Connection Troubleshooting"
  - "3. Make sure Tally is on the same network"
  - "5. Check that Tally has XML port enabled (9000)"
  - "Got it"
  - "Select Companies"
  - "Which companies do you want to sync?"
  - "Select All"
  - "Deselect All"
  - "Selected companies will appear in your Takkada app"
  - "Syncing Your Data"
  - "This may take a few minutes..."
  - "Ready to Go!"
  - "Go to Home"
quoteSources:
  "Connect Your Tally": [lib/screens/connect_tally_screen.dart]
  "Download the Takkada Windows Client to sync your Tally data": [lib/screens/connect_tally_screen.dart]
  "Scan to Download": [lib/screens/connect_tally_screen.dart]
  "Download Windows Client": [lib/screens/connect_tally_screen.dart]
  "Install on Your PC": [lib/screens/connect_tally_screen.dart]
  "Run the installer on the computer with Tally": [lib/screens/connect_tally_screen.dart]
  "Link Your Account": [lib/screens/connect_tally_screen.dart]
  "Enter your phone number in the loader to connect": [lib/screens/connect_tally_screen.dart]
  "Choose which Tally companies to sync": [lib/screens/connect_tally_screen.dart]
  "installed the loader": [lib/screens/connect_tally_screen.dart]
  "Loader not yet connected. Please install and run the Windows client.": [lib/screens/connect_tally_screen.dart]
  "Waiting for Your PC": [lib/screens/waiting_for_companies_screen.dart]
  "Please open the Takkada Windows Client on your computer and sign in with your phone number.": [lib/screens/waiting_for_companies_screen.dart]
  "Having trouble?": [lib/screens/waiting_for_companies_screen.dart]
  "Connection Troubleshooting": [lib/screens/waiting_for_companies_screen.dart]
  "3. Make sure Tally is on the same network": [lib/screens/waiting_for_companies_screen.dart]
  "5. Check that Tally has XML port enabled (9000)": [lib/screens/waiting_for_companies_screen.dart]
  "Got it": [lib/screens/waiting_for_companies_screen.dart]
  "Select Companies": [lib/screens/connect_tally_screen.dart, lib/screens/select_companies_screen.dart]
  "Which companies do you want to sync?": [lib/screens/select_companies_screen.dart]
  "Select All": [lib/screens/select_companies_screen.dart]
  "Deselect All": [lib/screens/select_companies_screen.dart]
  "Selected companies will appear in your Takkada app": [lib/screens/select_companies_screen.dart]
  "Syncing Your Data": [lib/screens/sync_progress_screen.dart]
  "This may take a few minutes...": [lib/screens/sync_progress_screen.dart]
  "Ready to Go!": [lib/screens/sync_progress_screen.dart]
  "Go to Home": [lib/screens/sync_progress_screen.dart]
relatedGuides:
  - tally-sync
  - ledger-mapping
  - home
  - sales-invoice
  - team-access
sections:
  - id: before-you-start
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: account-owner
  - id: install-the-windows-client
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: account-owner
  - id: pick-the-right-business
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: account-owner
  - id: the-first-sync
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: account-owner
  - id: when-something-goes-wrong
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: account-owner
images: []
---

Takkada reads your books out of the Tally you already run. It does that through a small Windows program that sits on the computer where Tally is installed. This guide takes you from a fresh account to a finished first sync, so that your parties, items and balances show up in the app.

You only do this once per computer. After that the program runs quietly in the background and keeps the app up to date.

## Before you start

- **A Windows PC with Tally on it.** The program has to be installed on the same computer that runs Tally, not on your phone.
- **Tally open on that PC.** The program reads from a running Tally, so Tally must be open with your company loaded when you sync.
- **Tally's XML port switched on.** Tally has a setting that lets other programs talk to it, on port 9000. If your Tally was set up by an accountant, ask them to confirm it is enabled. The app repeats this in its own troubleshooting list: **"5. Check that Tally has XML port enabled (9000)"**.
- **The same network.** If Tally runs on a different machine to the one you install on, they must be able to see each other — **"3. Make sure Tally is on the same network"**.
- **Your phone number.** The Windows program asks for the same phone number you signed into the app with. That is what links the two.
- **The right person doing it.** This is account setup, done by the owner. Staff members you invite later do not repeat it.

## Install the Windows client

When your account has no Tally connected yet, the app opens on a screen headed **"Connect Your Tally"**, with the line **"Download the Takkada Windows Client to sync your Tally data"** underneath. It lists four steps, and there is a square marked **"Scan to Download"** if you would rather get the installer onto the PC by scanning with your phone.

1. On the PC, tap or click **"Download Windows Client"** to get the installer.
2. Install it. The app's own step is called **"Install on Your PC"** and tells you to **"Run the installer on the computer with Tally"**.
3. Open the program once it is installed. The step called **"Link Your Account"** explains what to do: **"Enter your phone number in the loader to connect"**. Type the same number you use for the app.
4. Go back to your phone. The app moves on by itself once the PC connects. If it does not, tap the refresh button at the bottom — its label says you have **installed the loader** — to check again.

While the app is waiting it shows a screen headed **"Waiting for Your PC"** with the instruction **"Please open the Takkada Windows Client on your computer and sign in with your phone number."** It advances on its own the moment the connection is made, so you can leave it open.

## Pick the right business

Once the PC is connected, the app reads the list of companies in your Tally and shows a screen called **"Select Companies"**, asking **"Which companies do you want to sync?"**

1. Read each company name carefully. This is the step people get wrong.
2. Tap the ones you want in the app. The count under the heading tells you how many are selected.
3. **"Select All"** and **"Deselect All"** are there if you keep many companies.
4. Confirm with the button at the bottom, which names how many companies you chose.

The screen tells you what the choice means: **"Selected companies will appear in your Takkada app"**. That is the whole effect — a company you do not select is simply not brought in.

Take the extra minute here. If you tick a company that belongs to a different business, its parties and balances mix into the app alongside the ones you meant, and untangling that afterwards is not something you can do from your phone. If you keep two firms, connect them as two separate businesses and switch between them in the app.

## The first sync

After you confirm, the app shows **"Syncing Your Data"** and warns that **"This may take a few minutes..."** — a full set of books takes longer than a small one, and the first sync is always the slowest because everything is new.

When it finishes you see **"Ready to Go!"** and a **"Go to Home"** button. Tap it and you are in the app with your own data.

Do not close Tally or shut the PC down while the first sync is running.

## What to do next

1. Check that your party names and balances look right on the home screen.
2. Set up **Ledger Mapping** before you make your first bill, so the app knows which Tally account each tax and charge belongs to. See [How to map your Tally ledgers](/guide/ledger-mapping).
3. Bookmark the Tally sync screen. That is where you check on the connection from then on — see [How to check and fix Tally sync](/guide/tally-sync).

## What changes for different people and settings

- **Only the account owner does this.** Staff you invite later sign in and see the business that is already connected; they never install anything.
- **Nothing here is per-user.** The connection belongs to the business, so one PC serves everyone on the team.
- **Making bills is a separate permission.** Being connected to Tally does not by itself let a team member create invoices or receipts. Those rights are set per member — see [How to add your team and set their access](/guide/team-access).
- **The Tally sync screen is a separate feature.** If the sync dashboard is not switched on for your business, you can still be connected, but you will not have the screen that reports on it.

## When something goes wrong

**You tapped the refresh button and got "Loader not yet connected. Please install and run the Windows client."** The app cannot see the PC. Check that the installer actually finished, that the program is open on the PC, and that you typed the same phone number in it as you use in the app.

**The waiting screen never advances.** On that screen there is a **"Having trouble?"** link. It opens a checklist headed **"Connection Troubleshooting"** that walks through the five usual causes: the client not installed, Tally not open, the two machines not on the same network, the phone number not entered in the client, and Tally's XML port not enabled. Work down it in order and tap **"Got it"** when you are done.

**Tally is open but nothing comes across.** The commonest cause is the XML port. In Tally, the setting that lets another program connect on port 9000 has to be on. Your accountant or whoever installed Tally will know where it lives in your version.

**Your company list is empty or missing a company.** The program shows the companies that Tally itself has open or knows about. Open the missing company in Tally on that PC and check again.

**You picked the wrong company.** Stop before you start entering anything, and contact support. Do not carry on billing in a business that holds another firm's books.

**The first sync seems stuck.** Leave it — a large book genuinely takes several minutes. If it is still going much later, check that Tally is still open on the PC and that the machine has not gone to sleep. The Tally sync screen will tell you what the connection is doing once you are inside the app.

## Related guides

- [How to check and fix Tally sync](/guide/tally-sync)
- [How to map your Tally ledgers](/guide/ledger-mapping)
- [How to find your way around Takkada](/guide/home)
- [How to make a sales invoice](/guide/sales-invoice)
