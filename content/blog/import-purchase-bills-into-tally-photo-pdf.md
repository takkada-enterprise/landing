---
title: "Import Purchase Bills into Tally from a Photo or PDF"
slug: "import-purchase-bills-into-tally-photo-pdf"
meta_description: "Import purchase bills into Tally from a photo or PDF. Takkada reads the supplier, items and GST, you check each line, then save it as a purchase voucher."
primary_keyword: "import purchase bills into tally"
date: "2026-10-11"
author: "harsh"
category: "Autopilot"
excerpt: "Supplier bills arrive as PDFs and WhatsApp photos, and someone types them into Tally every evening. Here is how the photo becomes a purchase entry you check before it is saved."
---

To import purchase bills into Tally from a photo or PDF, you photograph the supplier's bill or pick the PDF in Takkada, and the supplier, invoice number, line items, quantities, rates and GST are read off it for you. You then match the supplier and each line to your own Tally masters, check the draft purchase voucher, and save it. Nothing is saved on its own: the reading is a suggestion, and the app says so on its help screen, so every party, item and amount passes in front of you before the entry exists. Once you save, the purchase voucher goes to Tally the same way any entry made in the app does. The bill can be a PDF, a JPG or a PNG up to 5 MB, and large photos are shrunk automatically. This guide covers the whole flow, what gets read, what you still check by hand, and which other documents the same Import Automation add-on handles, from customer orders to bank statements.

## Where the evening goes today

A distributor buying from 15 or 20 principals gets a steady stream of purchase bills. Some come as PDFs on email, most as photos on WhatsApp, and a few as paper with the delivery. Each one has to become a purchase voucher in Tally: supplier, bill number, date, every item line, the GST split, and any freight or discount. On a heavy day that is two hours of typing for whoever handles payables, and a single wrong rate shows up weeks later as a supplier ledger that does not match.

## How a bill becomes an entry

Tap **Import** on the home screen, or **Import from PDF or photo** in the Purchase register. Choose **Take a photo**, **Choose from gallery** or **Choose a file**. Takkada shows "Reading your document…", which usually takes about ten seconds, and then a short summary of what it read so you can confirm it is the right bill.

Then come three screens:

1. **Match Supplier.** Suggested matches are listed with a High, Medium or Low confidence label. You can search by name or GSTIN, or create a new supplier.
2. **Map Line Items.** Each line on the bill is mapped to one of your stock items. Suggestions appear, a line mapped on an earlier bill from the same supplier shows "Remembered from a past invoice", and part numbers can match on their own. A unit that is not a Tally unit is flagged so you can fix it.
3. **Review Purchase Voucher.** Supplier invoice number and date, purchase ledger, voucher type and number, payment due terms, items, MRP if printed, additional charges and round off. Then **Save Purchase Voucher**.

## The checks that catch mistakes

If the items add up to a different total from the one printed on the bill, the review screen says so: "These items add up to ₹X. The bill says ₹Y. Check the items before you save." If a purchase invoice from that supplier with the same reference already exists, the screen says so and the save button stays off, so the same bill forwarded twice on WhatsApp does not land twice. When the reading is weak, a banner asks you to double-check the supplier and each line before continuing.

## The same flow for other documents

The [Import purchase from PDF](/import-purchase-from-pdf) page shows the purchase side in detail. The same add-on also reads customer orders into sales orders, issued sales invoices, purchase orders, and bank statements in CSV, XLS or XLSX. The posts in this series take each one in turn, from [order photos for wholesalers](/blog/order-import-whatsapp-photos-wholesalers) to [bank statement imports](/blog/bank-statement-import-tally-distributors).

## Frequently Asked Questions

**Q: Does an imported bill go into Tally without anyone checking it?**

A: No. You match the supplier, map the items and review the voucher, and nothing is created until you tap Save Purchase Voucher.

**Q: Which file types can I import?**

A: PDF, JPG or PNG, up to 5 MB. You can take a photo, pick one from the gallery or choose a file.

**Q: Will it remember my item names next time?**

A: Yes. After a successful import, the item you mapped a supplier's line to is suggested again on that supplier's next bill. Prices are never remembered; the new bill's figures are used.

**Q: Can I import a bank statement the same way?**

A: Bank statements are imported from Bank & Cash as a CSV, XLS or XLSX file, then reviewed line by line before posting.

## See it on your own bills

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with one supplier bill and we will show you the import on your Tally data.
