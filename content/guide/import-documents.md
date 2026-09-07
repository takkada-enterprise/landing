---
slug: import-documents
title: How to import documents
meta_title: How to import documents in Takkada
meta_description: Send a bill or an order into Takkada as a PDF or a photo, tell it what the document is, match the party and the items, review and create.
featureKey: document_import
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Import a document
  - What is this document?
  - Takkada reads it differently depending on what it is.
  - Purchase invoice
  - Sales invoice
  - Sales order
  - Purchase order
  - A bill you've received from a supplier
  - An order a customer has placed with you
  - Choose invoice
  - PDF, JPG or PNG, up to 5 MB. Large photos are shrunk automatically.
  - Reading your document…
  - Usually about 10 seconds. You can leave this screen — we will keep going.
  - What we read
  - Yes, continue
  - Try again
  - Enter it myself
  - Match Supplier
  - Who was this invoice billed to?
  - Search by name or GSTIN
  - Suggested matches
  - Create new supplier
  - Create new customer
  - Continue
  - Select or create a supplier to continue
  - Select or create a customer to continue
  - Map Line Items
  - Unmapped Item
  - Continue to review
  - Review Purchase Voucher
  - Save Purchase Voucher
  - Nothing imported yet.
  - Discard import
  - Your documents
  - Import this one again
  - Import failed. Please try again.
  - A purchase invoice with this supplier reference already exists.
quoteSources:
  Import a document:
    - lib/screens/document_import/import_history_screen.dart
  What is this document?:
    - lib/screens/document_import/document_kind_chooser_screen.dart
  Takkada reads it differently depending on what it is.:
    - lib/screens/document_import/document_kind_chooser_screen.dart
  Purchase invoice:
    - lib/models/import_document_kind.dart
  Sales invoice:
    - lib/models/import_document_kind.dart
  Sales order:
    - lib/models/import_document_kind.dart
  Purchase order:
    - lib/models/import_document_kind.dart
  A bill you've received from a supplier:
    - lib/models/import_document_kind.dart
  An order a customer has placed with you:
    - lib/models/import_document_kind.dart
  Choose invoice:
    - lib/screens/purchase_invoice_import/upload_purchase_invoice_pdf_screen.dart
  PDF, JPG or PNG, up to 5 MB. Large photos are shrunk automatically.:
    - lib/screens/purchase_invoice_import/upload_purchase_invoice_pdf_screen.dart
  Reading your document…:
    - lib/screens/document_import/import_shared_document_screen.dart
  Usually about 10 seconds. You can leave this screen — we will keep going.:
    - lib/screens/document_import/import_shared_document_screen.dart
  What we read:
    - lib/screens/document_import/import_shared_document_screen.dart
  Yes, continue:
    - lib/screens/document_import/import_shared_document_screen.dart
  Try again:
    - lib/screens/document_import/import_shared_document_screen.dart
  Enter it myself:
    - lib/screens/document_import/import_shared_document_screen.dart
  Match Supplier:
    - lib/screens/purchase_invoice_import/resolve_supplier_screen.dart
  Who was this invoice billed to?:
    - lib/screens/sales_invoice_import/resolve_customer_screen.dart
  Search by name or GSTIN:
    - lib/screens/purchase_invoice_import/resolve_supplier_screen.dart
  Suggested matches:
    - lib/screens/purchase_invoice_import/resolve_supplier_screen.dart
  Create new supplier:
    - lib/screens/purchase_invoice_import/resolve_supplier_screen.dart
  Create new customer:
    - lib/screens/sales_invoice_import/resolve_customer_screen.dart
  Continue:
    - lib/screens/purchase_invoice_import/resolve_supplier_screen.dart
  Select or create a supplier to continue:
    - lib/screens/purchase_invoice_import/resolve_supplier_screen.dart
  Select or create a customer to continue:
    - lib/screens/sales_invoice_import/resolve_customer_screen.dart
  Map Line Items:
    - lib/screens/purchase_invoice_import/resolve_lines_screen.dart
  Unmapped Item:
    - lib/screens/purchase_invoice_import/review_imported_purchase_invoice_screen.dart
  Continue to review:
    - lib/screens/purchase_invoice_import/resolve_lines_screen.dart
  Review Purchase Voucher:
    - lib/screens/purchase_invoice_import/review_imported_purchase_invoice_screen.dart
  Save Purchase Voucher:
    - lib/screens/purchase_invoice_import/review_imported_purchase_invoice_screen.dart
  Nothing imported yet.:
    - lib/screens/document_import/import_history_screen.dart
  Discard import:
    - lib/screens/document_import/import_history_screen.dart
  Your documents:
    - lib/screens/document_import/batch_import_queue_screen.dart
  Import this one again:
    - lib/screens/document_import/batch_import_queue_screen.dart
  Import failed. Please try again.:
    - lib/screens/document_import/import_shared_document_screen.dart
  A purchase invoice with this supplier reference already exists.:
    - lib/screens/purchase_invoice_import/review_imported_purchase_invoice_screen.dart
relatedGuides:
  - purchase-invoice
  - sales-invoice
  - sales-orders
  - ledger-mapping
sections:
  - id: choose-a-kind
    featureKeys: [document_import]
    settings: {}
    permission: kind-specific-create
  - id: upload
    featureKeys: [document_import]
    settings: {}
    permission: kind-specific-create
  - id: resolve-and-review
    featureKeys: [document_import]
    settings: {}
    permission: kind-specific-create
images: []
---

You can hand Takkada a bill or an order as a PDF or a photograph and let it read
the details out, instead of typing them. You then check what it read, match the
party and the items to your own Tally records, and create the document. Nothing
reaches your books until you press through to the end.

## Before you start

- Document import has to be available on your business.
- You also need the right to create the kind of document you are importing. The
  two are checked together: your business has to have import, and you have to be
  allowed to raise that document. If either is missing, that kind is simply not
  offered — which is better than an upload that gets refused afterwards.
- Have the document ready as a PDF or a clear photo. The upload screen states
  the limits:
  "PDF, JPG or PNG, up to 5 MB. Large photos are shrunk automatically."
- Reading a document creates nothing by itself. You always confirm before
  anything is saved.

## Choose what the document is

If more than one kind is open to you, Takkada asks first. The screen is headed
"What is this document?" and explains why:
"Takkada reads it differently depending on what it is."

The kinds are:

- **"Purchase invoice"** — "A bill you've received from a supplier".
- **"Sales invoice"** — a bill you issued to a customer.
- **"Sales order"** — "An order a customer has placed with you".
- **"Purchase order"** — an order you placed with a supplier.

You are only shown the kinds you can actually use, so your list may be shorter
than this one. If only one applies to you, the question is skipped.

Takkada also guesses. When it can tell from the GST number printed on the page
which side of the deal you are on, it says so and asks you to confirm rather
than deciding silently.

## Upload the document

1. Open Import and tap "Import a document".
2. Pick the kind, if you are asked.
3. Tap "Choose invoice" and pick the file, or take a photograph.
4. You get "Reading your document…" and the note
   "Usually about 10 seconds. You can leave this screen — we will keep going."
   Leaving the screen does not cancel it.
5. Under "What we read", check the summary — the document number and the number
   of line items it found.
6. Tap "Yes, continue" if it looks right.

If the reading has gone wrong, you get two ways out: "Try again" with a better
photograph, or "Enter it myself" to pick the type and key it in by hand.

You can also share a document into Takkada from WhatsApp or your files app, and
it starts at the same place.

## Match the party

The document names a supplier or a customer; your books have their own records.
This step joins the two.

1. On a purchase, the screen is "Match Supplier". On a sale, it asks
   "Who was this invoice billed to?".
2. Look at "Suggested matches" first — Takkada proposes the closest records it
   already has.
3. If nothing fits, search with "Search by name or GSTIN".
4. Still nothing? Use "Create new supplier" or "Create new customer" to make the
   record now.
5. Tap "Continue" to carry the matched party into the next screen. Until you have
   picked or made one the button does nothing, and the screen says
   "Select or create a supplier to continue" — "Select or create a customer to
   continue" on a sale — in its place.

Match carefully. A bill matched to the wrong party lands in the wrong ledger and
has to be corrected afterwards.

## Match the items

1. The next screen is "Map Line Items".
2. Each line off the document is shown beside the item in your books it will be
   posted to.
3. Where Takkada is unsure, nothing has been chosen for you. Pick the right item
   yourself — especially where two of your items have similar names.
4. Check the units and the quantities.
5. Tap "Continue to review".

Two lines pointing at the same item is allowed, and the screen tells you when it
happens so you can confirm that is what the document really says.

## Review and create

1. The last screen shows the whole document — for a purchase it is headed
   "Review Purchase Voucher".
2. Check the party, the reference number and date, the ledger, the voucher type,
   the items and the totals.
3. Fix anything that is wrong. This is your last chance before it becomes a real
   document.
4. Save — on a purchase, "Save Purchase Voucher".

The document is now in your books and follows the ordinary route from there,
including reaching Tally.

## Picking up where you left off

Imports are not lost when you walk away.

- The import history lists everything you have started. Before your first one it
  says "Nothing imported yet."
- Tap any half-finished import to carry on from where it stopped.
- "Discard import" throws one away when you do not want it.
- If you send several documents at once, "Your documents" lists the batch as
  each one finishes reading. Nothing is saved to your books until you open each
  one and press through.
- A document that could not be read offers "Import this one again".

## When it does not look right

**The import option is not there.** Either the business does not have document
import, or you do not have the right to create that kind of document. An admin
can check both.

**Only one kind is offered and it is not the one you want.** You are only shown
kinds you may create. Ask your admin for the register right you need.

**It says "Import failed. Please try again."** Usually a poor photograph or a
file over the size limit. Retry with a PDF or a sharper picture; if it keeps
failing, use "Enter it myself".

**The reading is wrong in one or two places.** Do not start again. Correct it on
the review screen — that screen is authoritative, not the extraction.

**An item shows as "Unmapped Item".** It was not matched to anything in your
books. Go back to the line mapping and pick the right item, or create it.

**Saving is refused with
"A purchase invoice with this supplier reference already exists."** You have
imported that supplier bill before. Find the existing one rather than making a
second.

**Refreshing the page lost the import.** Refreshing a browser loses an import
that is in progress. Start the upload again; the app says so and offers to
reopen it.

**The document saved but a later step did not finish.** Your document is safe.
Open it from its register and complete anything that is outstanding.
