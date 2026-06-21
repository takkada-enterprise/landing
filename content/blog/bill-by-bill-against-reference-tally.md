---
title: "Bill-by-Bill in Tally: What \"Against Reference\" Means"
slug: "bill-by-bill-against-reference-tally"
meta_title: "Bill by Bill Tally: Against Reference Explained"
meta_description: "Bill by bill tally explained: what \"Against Reference\" means, the four reference types, and how matching a receipt to one invoice keeps a party ledger clean."
primary_keyword: "bill by bill tally"
date: "2026-06-21"
author: "founder"
category: "Tally Mobile"
excerpt: "A Guwahati FMCG distributor receives ₹50,000 from a retailer who owes ₹2,15,000 across six invoices. Marked \"On Account,\" that money floats unmatched and the ledger lies. Tagged \"Against Reference\" to invoice #1182, the right bill closes and outstanding reads true."
---

## Key Highlights

- Bill-by-bill accounting in Tally tracks outstanding by individual invoice reference instead of a single running party balance, so a ₹2,15,000 outstanding can be read as six specific unpaid bills, not one blur
- Tally offers exactly four reference types when a receipt or payment is entered: New Reference, Against Reference, Advance, and On Account; "Against Reference" is the one that matches a receipt to a specific existing invoice
- Takkada collects on UPI at 0% MDR on UPI collections, no transaction cap, no monthly fee, and tags each receipt against the correct bill so the Tally ledger stays clean without the 9 PM manual matching

## In This Article

- What bill by bill tally means in plain terms
- The four reference types and what each one does
- What "Against Reference" actually does to a party ledger
- Why the wrong reference type creates a messy ledger
- How a clean bill-by-bill ledger gets read and collected
- Frequently Asked Questions

## What Bill by Bill Tally Means for a Distributor

Bill by bill tally is the method of tracking a party's outstanding by each individual invoice reference rather than as one lump party balance. When you enable "Maintain Balances bill-by-bill" on a ledger in Tally, every invoice you raise gets its own reference name and its own outstanding clock. A receipt then settles against one or more of those specific bills, not against a vague party total.

Without bill-by-bill, a retailer's ledger shows one number. "Sharma Stores owes ₹2,15,000." With bill-by-bill on, that same ₹2,15,000 breaks into the actual bills behind it: invoice #1178 ₹42,000 from 12 May, #1182 ₹50,000 from 18 May, and four more. That breakup is the difference between a number you trust and a number you argue about on the phone.

A Guwahati FMCG distributor put it plainly: "Retailer bolta hai paisa de diya, par kis bill ka? Bill-by-bill on rahega toh pata chalta hai exact." The goods move on credit, the payments come back in chunks, and the only way to know which bill is still open is to keep the ledger at the bill level. That is what bill by bill tally is for.

## The Four Reference Types in Tally

The moment you record a receipt or payment against a bill-by-bill ledger, Tally asks one question: what kind of reference is this? There are exactly four answers, and picking the right one is the whole job.

| Reference type | What it does | When to use it |
|---|---|---|
| **New Reference** | Opens a fresh outstanding bill in the party's ledger | Raising a new invoice, or a fresh amount the party now owes |
| **Against Reference** | Matches this receipt or payment to a specific existing bill and closes (or part-closes) it | A retailer pays for invoice #1182; tag the ₹50,000 against #1182 |
| **Advance** | Records money received before any invoice exists for it | Retailer sends ₹30,000 before you have raised the bill |
| **On Account** | Parks the amount against the party with no specific bill attached | Amount received but you genuinely cannot yet say which bill it settles |

New Reference creates the debt. Against Reference clears it. Advance handles money that arrives early. On Account is the holding pen for anything you cannot place. The cleanliness of every party ledger in your Tally comes down to how disciplined you are about choosing between these four every single time money moves.

## What "Against Reference" Actually Does

Against Reference is the reference type that does the real reconciliation work. When you mark a receipt "Against Reference" and pick invoice #1182, Tally pulls up that exact outstanding bill and applies the money to it. If the receipt equals the bill, the bill closes and drops out of the outstanding list. If the receipt is smaller, the bill stays open for the remainder. If it is larger, the extra spills to whatever you tag next.

Take the Guwahati example. Sharma Stores owes ₹2,15,000 across six bills. A ₹50,000 receipt lands. Tagged Against Reference to invoice #1182 (which was ₹50,000), bill #1182 closes cleanly. The outstanding drops to ₹1,65,000 and the remaining five bills are still individually visible with their own dates. The ledger now tells the truth: which bills are paid, which are open, and how old the open ones are.

This is also what makes ageing work. A receivables ageing report, a 30/60/90 bucket, an overdue alert, all of it depends on each open bill carrying its own date. Against Reference is what preserves that. Match the money to the right bill and the ageing stays accurate. This is the same matching logic behind [reliable Tally payment reconciliation on mobile](/blog/tally-payment-reconciliation-on-mobile/), where each receipt is pinned to the invoice it actually settles.

## Why the Wrong Reference Type Creates a Messy Ledger

The most common mistake is reaching for "On Account" because it is the fastest. The accountant is busy, the retailer paid something, so the receipt goes On Account and the work is "done." It is not done. That ₹50,000 now sits against the party with no bill attached, and all six original bills stay fully open in the outstanding report.

The result is a ledger that lies in two directions at once. The total party balance is correct (₹50,000 did come in), but the bill-level outstanding is wrong (it still shows ₹2,15,000 of open bills when only ₹1,65,000 is actually open). Now nobody knows which bill to chase. The ageing report is overstated. The reminder you send quotes a bill the retailer already paid, and you lose credibility on the call.

The Advance type has its own trap. Money tagged Advance never offsets a real bill until someone goes back and re-tags it Against Reference. Distributors who let advances pile up end up with retailers who "have credit" on the books and open invoices on the same books, at the same time. The cure is the same in every case: when you can identify the bill, use Against Reference. On Account and Advance are for the genuine cannot-place-it-yet cases only, and they should be cleared, not parked forever.

This is exactly where manual reconciliation breaks down. A UPI payment arrives with a UTR but no invoice number attached, so the safe-looking move is On Account, and the ledger quietly drifts. [Auto-reconciliation back into Tally](/blog/auto-reconciliation-tally/) closes that gap by matching the incoming amount to the open bill and writing the receipt Against Reference, not On Account.

## How a Clean Bill-by-Bill Ledger Gets Collected

A correctly maintained bill-by-bill ledger is not just tidy accounting. It is the foundation of getting paid. When every open bill carries its own reference, date, and amount, the collection process becomes specific instead of vague.

Specific looks like this. Instead of "Sharma Stores, ₹2,15,000 baaki hai," the reminder reads "Invoice #1178 for ₹42,000, due 11 June, pay here." The retailer knows exactly which bill, sees the amount they agree with, and taps a link. The distributor's clerk sends a [UPI payment link wired to the Tally invoice](/blog/payment-link-tally-integration/) for that specific bill, so when the money comes back it can be tagged Against Reference to that same bill automatically.

That closing of the loop is what a mobile layer on top of Tally adds. The invoice goes out on WhatsApp with a payment link the moment it is created in Tally. The retailer pays on UPI. The receipt comes back, matched to the right open bill, and the bill-by-bill ledger updates itself. No accountant sitting at 9 PM trying to remember which ₹50,000 settled which invoice. The reference discipline that keeps a party ledger honest is handled at the point the money moves, not reconstructed afterward.

## Frequently Asked Questions

**Q: What is bill by bill in Tally?**

A: Bill by bill tally is a setting on a ledger ("Maintain Balances bill-by-bill") that tracks outstanding by each individual invoice instead of as one running party balance. With it on, a ₹2,15,000 outstanding is visible as the specific bills behind it, each with its own date and amount, so receipts can be matched to the exact invoice they settle.

**Q: What does "Against Reference" mean in Tally?**

A: Against Reference is one of Tally's four reference types. It matches a receipt or payment to a specific existing outstanding bill and closes it (fully, if the amounts match) or part-closes it. It is how you tell Tally "this ₹50,000 is for invoice #1182," which keeps the bill-level outstanding and the ageing report accurate.

**Q: What is the difference between New Reference and Against Reference?**

A: New Reference opens a fresh outstanding bill in the party's ledger, which is what happens when you raise a new invoice. Against Reference settles money against a bill that already exists. New Reference creates the debt; Against Reference clears it.

**Q: What does "On Account" mean and when should I use it?**

A: On Account parks a received amount against the party without attaching it to any specific bill. It should be used only when you genuinely cannot yet identify which bill the money settles. Using it as a shortcut leaves all the original bills open and overstates your outstanding, so On Account amounts should always be re-tagged Against Reference once the bill is known.

**Q: How do I keep my Tally party ledger clean?**

A: Maintain ledgers bill-by-bill, raise each invoice as a New Reference, and settle every receipt Against Reference to the specific bill it pays. Reserve Advance and On Account for the rare cases where no bill can be matched yet, and clear those promptly. The cleaner the matching, the more accurate your receivables ageing.

**Q: Can I match receipts to invoices automatically without entering Tally?**

A: Yes. A Tally-native mobile layer can capture a UPI receipt, match it to the correct open bill, and write it back into Tally as an Against Reference entry, so the bill-by-bill ledger updates without manual end-of-day matching. This is how distributors close the collection loop without adding accounting headcount.

Takkada is the only Tally-native distributor collection app in India with genuine 0% MDR on UPI, and it tags every receipt against the right bill so your bill-by-bill ledger stays clean on its own. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
