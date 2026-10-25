---
title: "How to Use a Barcode Scanner in Tally Prime: USB Gun, Bluetooth or Phone"
meta_title: "How to Use a Barcode Scanner in Tally Prime | Takkada"
slug: "barcode-scanner-in-tally-prime"
meta_description: "Use a barcode scanner in Tally Prime: plug in a USB gun, scan at Name of Item, and see why the quantity is still typed. Phone and Bluetooth options too."
primary_keyword: "barcode scanner in Tally Prime"
date: "2026-10-25"
updated: "2026-10-25"
author: "harsh"
category: "How-To"
excerpt: "There is no switch to turn on. A USB barcode gun types into Tally like a keyboard. Here is how to set it up, what happens on a scan, and when a phone does the job better."
---

A barcode scanner in Tally Prime works because a USB barcode gun behaves like a keyboard. Plug it in, open a voucher, put the cursor on Name of Item and scan: the gun types the code and presses Enter, and Tally selects the stock item whose alias holds that code. There is no setting inside Tally to enable, which is why people searching for one never find it. The same alias method worked on Tally ERP 9. What the gun does not do is fill the quantity. One scan finds one item, so a counter clerk billing 24 pieces still types 24, and on a wholesale bill of 40 lines that typing is most of the work. If the codes are not in the aliases yet, start with our post on [how to create and print barcode in Tally Prime](/blog/how-to-print-barcode-in-tally-prime). Below is the setup, the three checks that fix most problems, and the phone and Bluetooth options for staff who are away from the Tally desk.

## Setting up a USB barcode gun

1. Plug the gun into the computer that runs Tally. Most guns need no driver.
2. Open Notepad and scan any pack. The full code should appear, followed by a new line.
3. If the code appears but the cursor does not move to a new line, the gun is not sending Enter. Its manual has a setup barcode that adds Enter after each scan. Scan it once.
4. Open a sales voucher in Tally, go to Name of Item and scan.

## What happens on each scan

Tally reads the typed code, finds the stock item with that alias and fills the item name. The cursor moves on and waits for the quantity, then the rate. If no item has that alias, Tally shows its list of items instead, which usually means the alias was never saved for that item.

## Which scanner for which job

| Scanner | Reads | Works with | Best for |
|---|---|---|---|
| USB laser or CCD gun | Line barcodes | Any computer | The billing desk |
| USB 2D imager gun | Line barcodes and QR | Any computer | Desks that also see QR codes |
| Bluetooth gun | Depends on the model | Phone, tablet or computer | The godown floor |
| Phone camera | Line barcodes and QR | A scanning app | Staff on the move |

A contact CCD gun has to touch the sticker and reads bars up to about the width of its window, so very wide codes need a laser or imager gun.

## The three checks that fix most problems

- **Cursor in the wrong box.** A scan into the quantity field types a 13-digit number as the quantity. Train staff to check where the cursor is first.
- **Caps Lock is on.** Some guns type letters in the wrong case when Caps Lock is on, so a code with letters stops matching its alias.
- **Two items with the same alias.** The scan cannot tell them apart. Correct one of them.

## When the scanning moves off the desk

A USB gun ties scanning to the computer running Tally. The godown loading a truck, or a salesman counting stock at a shop, needs scanning on a phone.

With [barcode labels for Tally Prime](/barcode-in-tally-prime), Takkada scans into sales invoices, purchases, delivery challans, GRNs and stock journals with the phone camera or a Bluetooth gun, and a USB gun does the same on the computer. If the camera cannot start, the screen still takes a gun or a typed code. The stickers carry the box quantity, so one scan adds the whole box, and the bill reaches Tally as a normal voucher. Nothing is installed inside Tally.

## Frequently Asked Questions

**Q: How do I enable the barcode scanner in Tally Prime?**

A: There is nothing to enable. A USB gun types like a keyboard, so it works as soon as the stock item aliases hold the codes and the cursor sits on Name of Item.

**Q: Will any USB barcode scanner work with Tally?**

A: Any gun that works as a keyboard, which is how most USB guns ship. Test it in Notepad first: if the code appears with a new line after it, it will work in Tally.

**Q: Why does my scanner put the code in the wrong field?**

A: The cursor was in that field when you scanned. Move it to Name of Item first, and check the gun sends Enter after each code.

**Q: Can a barcode scan fill the quantity in Tally?**

A: No, with the alias method the scan picks the item and the quantity is typed. A sticker that carries the box quantity in its code is how one scan adds a whole box.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up scanning with you against one of your purchase bills.
