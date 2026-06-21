---
title: "How to Access Tally on Mobile: A Step-by-Step Guide"
slug: "how-to-access-tally-on-mobile-step-by-step"
meta_title: "How to Access Tally on Mobile: Step-by-Step Setup"
meta_description: "How to access Tally on mobile: the four real bridges from your phone to the office Tally machine, what each one costs, and which fits a distributor's day."
primary_keyword: "how to access tally on mobile"
date: "2026-06-14"
updated: "2026-06-21"
author: "founder"
category: "How-To"
excerpt: "A Guwahati FMCG distributor leaves the office at 9 AM and does not see his Tally screen again until night. By the time he checks a party's ₹1,40,000 outstanding, the salesman has already given fresh credit. Here is how to put that Tally data on the phone, step by step, across the four ways that actually work."
---

How to access Tally on mobile is the wrong question if you expect to download Tally from the Play Store and log in, because Tally Prime is a Windows desktop product and the company file sits on one office machine. Accessing Tally on mobile always means building a bridge from your phone to that machine, and there are four. A remote-desktop app like AnyDesk mirrors the office screen. The official Tally.NET remote feature gives browser access meant for auditors. A read-only companion app shows ledgers, stock, and outstanding. A read-and-write companion app lets you create a voucher, send a payment link, and clear the 9 PM reconciliation from the field. A read bridge shows you numbers. A write bridge lets you act on them. For a distributor whose day runs across 18 to 30 retail parties on a route, that difference decides whether the phone is a window or a workspace. This guide walks each bridge in order, from the simplest screen-mirror to the full mobile layer.

## Key Highlights

- How to access Tally on mobile comes down to four bridges to the office machine: remote desktop, the official Tally.NET remote feature, a read-only companion app, and a read-and-write companion app
- Tally Prime ships no native mobile client, so every method on this list connects a phone to the Windows machine where your Tally data file lives, usually through the Tally XML gateway
- Only the read-and-write bridge lets a distributor create a voucher, send a payment link, and clear the 9 PM reconciliation from the field; the other three are view or screen-mirror tools

## In This Article

- What "how to access Tally on mobile" actually means
- Step 1: pick the right bridge for your day
- Step 2: set up remote desktop access
- Step 3: turn on the official Tally remote feature
- Step 4: connect a read-only companion app
- Step 5: move to a read-and-write companion app
- A side-by-side comparison of the four methods
- Frequently Asked Questions

## How to Access Tally on Mobile: What It Actually Means

How to access Tally on mobile is the wrong question if you expect to download "Tally" from the Play Store and log in. Tally Prime is a Windows desktop product. The company file sits on one machine at your office, and there is no official app that runs Tally itself on a phone. So accessing Tally on mobile always means building a bridge from your phone to that office machine, and the four bridges differ in what they let you do once connected.

A read bridge shows you numbers. A write bridge lets you act on them. For a distributor whose day runs across 18 to 30 retail parties on a route, that difference decides whether the phone is a window or a workspace. The rest of this guide walks each bridge in order, from the simplest screen-mirror to the full mobile layer, so you can match the method to how money actually moves in your business. For the background on why no native client exists, the longer explainer on [running Tally on mobile](/blog/tally-on-mobile/) is worth a read first.

## Step 1: Pick the Right Bridge for Your Day

Before you install anything, decide what you need the phone to do:

- **Just check numbers** (outstanding, ledger, stock): a read-only companion app or remote desktop is enough
- **Create vouchers and collect payments from the field**: you need a read-and-write companion app
- **Give a CA or auditor temporary access**: the official Tally.NET remote feature is built for exactly this

Picking first saves you from installing three tools and using none. A family-run distributor who only wants to answer "what does this party owe" has a very different setup from a collections-heavy distributor running e-invoices from the counter.

## Step 2: Set Up Remote Desktop Access

This is the oldest way to access Tally on mobile and needs no new licence.

1. Install a remote desktop client (AnyDesk or TeamViewer) on the office Windows machine that runs Tally
2. Install the same app on your phone and pair the two with the device ID and password
3. Leave the office PC powered on and signed in to Tally
4. Connect from the phone and drive the desktop Tally screen with touch

It works for a quick look. It breaks the moment the network thins out. A 2G zone on a Barpeta route will not render full Tally screens fast enough to be usable, and every column becomes a zoom-and-pan on a 6-inch display. Treat this as a backup, not a daily tool.

## Step 3: Turn On the Official Tally Remote Feature

Tally Prime has a built-in remote access feature over Tally.NET, mainly for auditors and CAs.

1. On the office machine, open the company and enable Tally.NET features in the company's security settings
2. Create a Tally.NET user and assign a security level
3. Share those credentials with the remote person, who logs in through their own Tally installation or a browser

This is genuinely useful for giving your CA temporary visibility into the books without handing over the office PC. As a daily distributor tool on a phone it falls short, because the interface is still the desktop interface, only slower over a mobile connection.

## Step 4: Connect a Read-Only Companion App

Read-only companion apps are where most distributors first get a real mobile experience.

1. Install the vendor's small connector or agent on the office Tally machine
2. The connector reads your Tally data over the Tally XML gateway, a built-in channel Tally uses to share data with other programs, and syncs a copy to the app's cloud
3. Install the phone app, log in, and your outstanding, ledger, day book, stock, and top parties appear on the phone

You can view everything and create nothing. A sale made in the field still waits for the accountant to type it into the office machine that night. For owners who only need visibility, this is often enough for years. If you want to see exactly which numbers belong on a phone, the breakdown of the [best Tally app for receivables](/blog/best-tally-app-for-receivables-2026/) maps the read-only view against what collections-heavy distributors actually reach for.

## Step 5: Move to a Read-and-Write Companion App

This is the bridge that changes the day, not just the view.

1. Install the connector on the office Tally machine, same as the read-only setup
2. The sync now runs both ways, not just out. Writes you make on the phone post back to Tally
3. On the phone you create the sales invoice, log the cash or UPI receipt, send a WhatsApp payment link, and when the money lands it matches the invoice and posts a receipt voucher automatically

The two-way flow is the hard part, and it is worth understanding how it works under the hood. The explainer on [bidirectional Tally sync](/blog/bidirectional-tally-sync-explained/) covers how a write made at a counter in Dibrugarh ends up as a clean voucher in the office Tally without a double entry. This is also the only bridge that deletes the 9 PM reconciliation session, because the matching happens through the day instead of in one batch at night.

## A Side-by-Side Comparison of the Four Methods

| What you need | Remote desktop | Tally.NET remote | Read-only companion | Read + write companion |
|---|---|---|---|---|
| View ledger, outstanding, stock | Usable on 4G, hard on 2G | Yes, slow | Yes | Yes |
| Create invoice from the phone | Painful | Painful | No | Yes |
| Send WhatsApp payment reminder | No | No | Some do | Yes |
| Generate a UPI payment link | No | No | No | Usually yes |
| Auto-reconcile UPI into Tally | No | No | No | Yes on some |
| Works on a thin 2G connection | Fails | Fails | Cached views | Cached views, queued writes |
| Extra Tally licence needed | No | No | No | No |

If your whole need is a number on a screen, stop at Step 4. If you run collections from the field, Step 5 is the only bridge that holds up. Distributors juggling more than one company should also look at how a [multi-business Tally mobile app](/blog/multi-business-tally-mobile-app/) keeps several firms on one phone without re-logging in each time.

## Frequently Asked Questions

**Q: How to access Tally on mobile for free?**

A: The cheapest way to access Tally on mobile is a remote desktop app like AnyDesk on a personal-use basis, which mirrors the office screen to your phone at no licence cost. It is fine for a quick check but unusable on weak networks and never lets you work properly from a small screen. For anything beyond viewing, a companion app is the practical route.

**Q: Do I need a separate Tally licence to access Tally on mobile?**

A: No. None of the four bridges requires an extra Tally licence. Remote desktop and companion apps connect to your existing Tally installation, and the official Tally.NET remote feature is included in Tally Prime. You only pay for the bridge tool itself, if it is a paid companion app.

**Q: Can I create an invoice on the phone, or only view data?**

A: That depends on the bridge. Remote desktop and read-only companion apps are view-first; creating a voucher is either painful or impossible. A read-and-write companion app lets you create the invoice on the phone and posts it back into Tally on the office machine.

**Q: Is my Tally data safe when I access it on mobile?**

A: Companion apps move a working slice of your Tally data through a sync service to the phone. Ask any vendor three things before you connect: which India region the data is stored in, who on their side can read it, and what the deletion policy is when you stop. Remote desktop keeps the data on the office PC and only streams the screen.

**Q: What happens when the office PC is switched off?**

A: Remote desktop and the Tally.NET remote feature stop working entirely, because they need the live machine. A companion app keeps cached data viewable, and any writes you make on the phone queue up and post to Tally once the PC is back online and sync reconnects.

**Q: Does running Tally in the cloud change how I access it on mobile?**

A: Hosting Tally on a cloud Windows desktop keeps the always-on machine running so remote and companion bridges never go dark. It is still the same Tally Windows product, so you still need one of these four bridges for a real phone experience. The piece on [Tally cloud](/blog/tally-cloud/) explains what cloud hosting does and does not solve.

Takkada is a Tally-native mobile layer that lets distributors create invoices, send WhatsApp reminders, and collect on UPI at 0% MDR, all from the phone with auto-reconciliation back into Tally. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
