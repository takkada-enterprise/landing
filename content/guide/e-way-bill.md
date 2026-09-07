---
slug: e-way-bill
title: How to generate an e-way bill
meta_title: How to generate an e-way bill in Takkada
meta_description: Enter your portal credentials and transport details, generate an e-way bill against a sales invoice, and read the number, validity and vehicle it comes back with.
featureKey: einvoice_ewaybill_mobile
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - E-Way Bill
  - Generate E-Way Bill
  - Enter GST portal credentials and transport details
  - Credentials
  - Transport Details
  - Need help getting your credentials?
  - View e-WayBill Guide
  - From Pincode (Business)
  - To Pincode (Party)
  - From Pincode (on e-invoice)
  - To Pincode (on e-invoice)
  - Distance (km)
  - Calculate
  - Distance is calculated automatically by the GST portal from your e-invoice.
  - Vehicle Number
  - Please enter vehicle number for road transport
  - Please enter both pincodes to calculate distance
  - E-way bill generated successfully
  - Failed to generate e-way bill
  - Waiting for Tally to record this invoice
  - E-Way Bill Number
  - Generated On
  - Valid Until
  - Transport Mode
  - Vehicle No.
  - Transporter
  - Distance
  - Cancel GST doc
  - The invoice stays in your books and is NOT cancelled.
  - Invoices with e-invoice or e-way bill cannot be cancelled here.
quoteSources:
  E-Way Bill:
    - lib/screens/einvoice_details_screen.dart
  Generate E-Way Bill:
    - lib/screens/generate_e_way_bill_screen.dart
  Enter GST portal credentials and transport details:
    - lib/screens/generate_e_way_bill_screen.dart
  Credentials:
    - lib/screens/generate_e_way_bill_screen.dart
  Transport Details:
    - lib/screens/generate_e_way_bill_screen.dart
  Need help getting your credentials?:
    - lib/screens/generate_e_way_bill_screen.dart
  View e-WayBill Guide:
    - lib/screens/generate_e_way_bill_screen.dart
  From Pincode (Business):
    - lib/screens/generate_e_way_bill_screen.dart
  To Pincode (Party):
    - lib/screens/generate_e_way_bill_screen.dart
  From Pincode (on e-invoice):
    - lib/screens/generate_e_way_bill_screen.dart
  To Pincode (on e-invoice):
    - lib/screens/generate_e_way_bill_screen.dart
  Distance (km):
    - lib/screens/generate_e_way_bill_screen.dart
  Calculate:
    - lib/screens/generate_e_way_bill_screen.dart
  Distance is calculated automatically by the GST portal from your e-invoice.:
    - lib/screens/generate_e_way_bill_screen.dart
  Vehicle Number:
    - lib/screens/generate_e_way_bill_screen.dart
  Please enter vehicle number for road transport:
    - lib/screens/generate_e_way_bill_screen.dart
  Please enter both pincodes to calculate distance:
    - lib/screens/generate_e_way_bill_screen.dart
  E-way bill generated successfully:
    - lib/screens/generate_e_way_bill_screen.dart
  Failed to generate e-way bill:
    - lib/screens/generate_e_way_bill_screen.dart
  Waiting for Tally to record this invoice:
    - lib/utils/gst_compliance_action_gates.dart
  E-Way Bill Number:
    - lib/screens/einvoice_details_screen.dart
  Generated On:
    - lib/screens/einvoice_details_screen.dart
  Valid Until:
    - lib/screens/einvoice_details_screen.dart
  Transport Mode:
    - lib/screens/einvoice_details_screen.dart
  Vehicle No.:
    - lib/screens/einvoice_details_screen.dart
  Transporter:
    - lib/screens/einvoice_details_screen.dart
  Distance:
    - lib/screens/einvoice_details_screen.dart
  Cancel GST doc:
    - lib/screens/sales_invoice_detail_screen.dart
  The invoice stays in your books and is NOT cancelled.:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  Invoices with e-invoice or e-way bill cannot be cancelled here.:
    - lib/screens/sales_invoice_detail_screen.dart
relatedGuides:
  - e-invoice
  - sales-invoice
  - dispatch
  - tally-sync
sections:
  - id: transport-details
    featureKeys: [einvoice_ewaybill_mobile]
    settings: {}
    permission: sales-invoice-view
  - id: generate
    featureKeys: [einvoice_ewaybill_mobile]
    settings: {}
    permission: sales-invoice-view
  - id: after-generation
    featureKeys: [einvoice_ewaybill_mobile]
    settings: {}
    permission: sales-invoice-view
images: []
---

An e-way bill is the document that travels with the goods. It is raised on the
government portal against an invoice, and it records where the consignment is
going, how far, and in which vehicle. Takkada raises it for you from a saved
sales invoice and keeps the result on that invoice.

This guide describes what the app does. **Whether a particular consignment needs
an e-way bill is a question of law, and it depends on rules Takkada does not
decide.** Nothing on this page tells you whether you must raise one. Ask your
accountant or check the official portal.

What the app decides is narrower and worth knowing: Takkada offers the e-way
bill button only on invoices with a total **above ₹50,000**, strictly above, so
an invoice of exactly ₹50,000 is not offered one. That is the app's own rule for
what to put on screen. It is not a statement about your legal obligation, in
either direction.

## Before you start

- The e-invoice and e-way bill feature has to be on for your business.
- You need your own login for the government e-way bill portal. Takkada cannot
  create one. The screen offers "Need help getting your credentials?" and
  "View e-WayBill Guide" if you do not have one yet.
- The invoice must be saved, and above the amount at which the app offers the
  action.
- You need the vehicle number before you start, if the goods are going by road.
- Generating an e-way bill and generating an e-invoice are two separate acts.
  Doing one does not do the other.

## Generate the e-way bill

1. Open the saved sales invoice.
2. Tap "E-Way Bill". The screen "Generate E-Way Bill" opens with
   "Enter GST portal credentials and transport details".
3. Under "Credentials", enter your portal username and password. You can save
   them securely so you do not type them next time.
4. Under "Transport Details", check the pincodes. They are pre-filled from your
   business address and the party's address, and you can edit them.
5. Set the distance. See the next section — this differs depending on whether
   the invoice already has an e-invoice.
6. Enter the "Vehicle Number".
7. Tap Generate E-Way Bill and wait without closing the screen.
8. On success you get "E-way bill generated successfully".

## Distance, and when you enter it

There are two shapes of this screen.

**On an invoice that already has an e-invoice**, the pincode fields read
"From Pincode (on e-invoice)" and "To Pincode (on e-invoice)", and the screen
tells you
"Distance is calculated automatically by the GST portal from your e-invoice."
You do not type a distance.

**On an invoice without one**, you get "From Pincode (Business)" and
"To Pincode (Party)" and a "Distance (km)" box. Fill the distance yourself, or
tap "Calculate" and let the portal work it out from the two pincodes. If either
pincode is blank you get "Please enter both pincodes to calculate distance".

## When a vehicle number applies

For goods moving by road, the vehicle number is required. Leave it empty and the
app stops you before anything is sent, with
"Please enter vehicle number for road transport".

Consignments recorded through a stock journal can carry a transport mode other
than road; on those, the vehicle number is only demanded when the mode is road,
and the details already recorded on the journal are used. For an ordinary sales
invoice, the app submits the consignment as road transport with a regular
vehicle, so a vehicle number is always needed.

## Read the result

Open the compliance details on the invoice:

- **"E-Way Bill Number"** — the number the portal issued.
- **"Generated On"** and **"Valid Until"** — when it was raised and how long it
  is good for. The validity comes from the portal, not from Takkada.
- **"Transport Mode"**, **"Vehicle No."**, **"Transporter"** and **"Distance"** —
  what was actually submitted.

The screen marks an expired bill as expired rather than letting it look current.

## Cancelling

Use "Cancel GST doc" on the invoice. The sheet states
"The invoice stays in your books and is NOT cancelled." Pick a reason, confirm,
and the e-way bill is cancelled while your invoice stays exactly as it was. If
the invoice also carries an e-invoice, both can be cancelled together.

The portal sets its own limit on how long after generation a bill may be
cancelled. Takkada passes your request on; it cannot widen that window.

## A successful invoice is not successful compliance

This is the mistake worth guarding against. Saving an invoice, registering an
e-invoice and raising an e-way bill are three separate things, and each can
succeed or fail on its own. An invoice sitting in your books, printed and sent,
proves nothing about whether an e-way bill exists for that consignment. Before
the goods leave, open the invoice and check that the e-way bill number is
actually there.

## When it does not look right

**There is no e-way bill button.** Three ordinary reasons: the feature is not on
for your business, the invoice total is at or below the amount the app requires,
or the invoice already has an e-way bill.

**The button is there but will not press, and says
"Waiting for Tally to record this invoice".** Some businesses are set up so the
invoice has to reach their Tally first. It clears by itself; wait and try again.

**It says "Failed to generate e-way bill".** Read the message. A long message is
usually the portal objecting to the consignment's details, not to your login.
Check the pincodes, the distance and the vehicle number.

**The distance box will not accept anything.** You are on an invoice that
already has an e-invoice, where the portal works the distance out itself.

**You cannot cancel or edit the invoice any more.** Once a GST document exists,
the app says
"Invoices with e-invoice or e-way bill cannot be cancelled here." Cancel the GST
document first.
