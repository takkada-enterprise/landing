// Keyboard shortcuts for the Desktop Entry add-on, as published on
// /keyboard-shortcuts. Every row names where the app binds it (`src`), and
// src/data/__tests__/desktop-shortcuts.test.js reads that app file to prove the
// key is still bound there. Change a key in the app and that test fails here.
//
// Checked against the app's prod branch (takkada main e80468be, 2026-10-09
// build) and driven in a release build on 2026-10-11. The app's keys were
// identical on stage that day. Only add a key once it is on the prod branch.
//
// Windows and Mac differ only for the move-around keys (Alt on Windows, Control
// on a Mac) and for Alt on a bill (Option on a Mac). Ctrl is Control on both.

const SHELL = 'lib/desktop/keyboard/desktop_shortcuts.dart';
const ENTRY = 'lib/desktop/entry/entry_bindings.dart';
const REGISTER = 'lib/desktop/records/register/desktop_register_workspace.dart';

const shell = (label, key, mod) => ({ file: SHELL, label, key, mod: `DesktopShortcutModifier.${mod}` });
const entry = (label, key, mod) => ({ file: ENTRY, label, key, mod: `EntryModifier.${mod}` });
const register = (snippet) => ({ file: REGISTER, snippet });

export const SHORTCUTS_CHECKED_ON = '2026-10-11';

export const SHORTCUT_GROUPS = [
  {
    id: 'move-around',
    title: 'Move around the app',
    blurb: 'Work from any screen.',
    rows: [
      { does: 'See every action and key for the screen you are on', win: '?', mac: '?', src: shell('Actions', 'question', 'none') },
      { does: 'Search everything', win: 'Alt + K', mac: 'Control + K', src: shell('Search everything', 'keyK', 'platform') },
      { does: 'New document: bill, order, receipt and more', win: 'Alt + N', mac: 'Control + N', src: shell('New document', 'keyN', 'platform') },
      { does: 'Dashboard', win: 'Alt + D', mac: 'Control + D', src: shell('Dashboard', 'keyD', 'platform') },
      { does: 'Sales', win: 'Alt + S', mac: 'Control + S', src: shell('Sales', 'keyS', 'platform') },
      { does: 'Purchases', win: 'Alt + U', mac: 'Control + U', src: shell('Purchases', 'keyU', 'platform') },
      { does: 'Money', win: 'Alt + M', mac: 'Control + M', src: shell('Money', 'keyM', 'platform') },
      { does: 'Receipts', win: 'Alt + R', mac: 'Control + R', src: shell('Receipts', 'keyR', 'platform') },
      { does: 'Collect', win: 'Alt + Shift + C', mac: 'Control + Shift + C', src: shell('Collect', 'keyC', 'platformShift') },
      { does: 'Parties', win: 'Alt + P', mac: 'Control + P', src: shell('Parties', 'keyP', 'platform') },
      { does: 'Payment reminders', win: 'Alt + Shift + P', mac: 'Control + Shift + P', src: shell('Payment Reminders', 'keyP', 'platformShift') },
      { does: 'Items', win: 'Alt + I', mac: 'Control + I', src: shell('Items', 'keyI', 'platform') },
      { does: 'Stock', win: 'Alt + Shift + I', mac: 'Control + Shift + I', src: shell('Stock', 'keyI', 'platformShift') },
      { does: 'Reports', win: 'Alt + E', mac: 'Control + E', src: shell('Reports', 'keyE', 'platform') },
      { does: 'GST', win: 'Alt + G', mac: 'Control + G', src: shell('GST', 'keyG', 'platform') },
      { does: 'Approvals', win: 'Alt + Shift + A', mac: 'Control + Shift + A', src: shell('Approvals', 'keyA', 'platformShift') },
      { does: 'Imports', win: 'Alt + Shift + M', mac: 'Control + Shift + M', src: shell('Imports', 'keyM', 'platformShift') },
      { does: 'Settings', win: 'Alt + ,', mac: 'Control + ,', src: shell('Settings', 'comma', 'platform') },
      { does: 'Print the document you are looking at', win: 'Shift + P', mac: 'Shift + P', src: shell('Print this document', 'keyP', 'shift') },
      { does: 'Go back', win: 'Esc', mac: 'Esc', src: shell('Back', 'escape', 'none') },
    ],
  },
  {
    id: 'make-a-bill',
    title: 'Making a bill, order or receipt',
    blurb: 'Party, date and number first, then the item lines.',
    rows: [
      { does: 'Next box, or accept what you picked', win: 'Enter', mac: 'Enter', src: entry('Next field / accept', 'enter', 'none') },
      { does: 'Previous box', win: 'Shift + Tab', mac: 'Shift + Tab', src: entry('Previous field', 'tab', 'shift') },
      { does: 'Move between cells and lines', win: 'Arrow keys', mac: 'Arrow keys', src: entry('Move between cells / rows', 'arrowLeft', 'none') },
      { does: 'Save', win: 'Ctrl + A', mac: 'Control + A', src: entry('Save (accept)', 'keyA', 'control') },
      { does: 'Change the date', win: 'F2', mac: 'F2', src: entry('Change date', 'f2', 'none') },
      { does: 'More details (narration, transport, buyer PO)', win: 'Alt + M', mac: 'Option + M', src: entry('More details', 'keyM', 'alt') },
      { does: 'Pull pending lines from an order, challan or goods receipt', win: 'Alt + O', mac: 'Option + O', src: entry('Pull pending lines from an order / challan', 'keyO', 'alt') },
      { does: 'Create a new party or item without leaving the bill', win: 'Alt + C', mac: 'Option + C', src: entry('Create party / item in place', 'keyC', 'alt') },
      { does: 'Line details: batch, godown, discounts', win: 'Ctrl + Enter', mac: 'Control + Enter', src: entry('Edit the selected master / line details', 'enter', 'control') },
      { does: 'Insert a line above', win: 'Ctrl + I', mac: 'Control + I', src: entry('Insert a line above', 'keyI', 'control') },
      { does: 'Delete the line', win: 'Ctrl + Delete', mac: 'Control + Delete', src: entry('Delete the current line', 'delete', 'control') },
      { does: "Copy this party's last invoice", win: 'Alt + 2', mac: 'Option + 2', src: entry("Copy this party's last invoice", 'digit2', 'alt') },
      { does: 'Remove the scheme from a line', win: 'Ctrl + Shift + R', mac: 'Control + Shift + R', src: entry('Remove the scheme from this line', 'keyR', 'controlShift') },
      { does: 'Close a panel or list, or step back out of the form', win: 'Esc', mac: 'Esc', src: entry('Back out one layer', 'escape', 'none') },
    ],
  },
  {
    id: 'after-saving',
    title: 'Right after you save',
    blurb: 'The saved bar at the top of the form takes these keys.',
    rows: [
      { does: 'View the saved document', win: 'Alt + V', mac: 'Option + V', src: entry('View the saved voucher', 'keyV', 'alt') },
      { does: 'Print it', win: 'Alt + P', mac: 'Option + P', src: entry('Print the saved voucher', 'keyP', 'alt') },
      { does: 'Send it', win: 'Alt + S', mac: 'Option + S', src: entry('Send the saved voucher', 'keyS', 'alt') },
      { does: 'Copy it into a new one', win: 'Alt + Shift + 2', mac: 'Option + Shift + 2', src: entry('Copy the saved voucher into a new one', 'digit2', 'altShift') },
      { does: 'Open the document it is linked to', win: 'Alt + L', mac: 'Option + L', src: entry('Open the linked document', 'keyL', 'alt') },
      { does: 'Make a delivery challan from it', win: 'Alt + H', mac: 'Option + H', src: entry('Make a challan from this document', 'keyH', 'alt') },
      { does: 'Raise a credit note against it', win: 'Alt + R', mac: 'Option + R', src: entry('Raise a credit note against this document', 'keyR', 'alt') },
      { does: 'Raise a debit note for a short goods receipt line', win: 'Alt + N', mac: 'Option + N', src: entry('Raise a debit note from this line', 'keyN', 'alt') },
      { does: 'E-invoice', win: 'Alt + I', mac: 'Option + I', src: entry('Generate the e-invoice', 'keyI', 'alt') },
      { does: 'E-way bill', win: 'Alt + W', mac: 'Option + W', src: entry('Generate the e-way bill', 'keyW', 'alt') },
      { does: 'Payment link', win: 'Alt + K', mac: 'Option + K', src: entry('Attach a payment link', 'keyK', 'alt') },
      { does: 'Cancel it', win: 'Alt + X', mac: 'Option + X', src: entry('Cancel the saved voucher', 'keyX', 'alt') },
    ],
  },
  {
    id: 'registers',
    title: 'In a list (Sales, Purchases, Money)',
    blurb: 'Pick a row with the arrow keys first.',
    rows: [
      { does: 'Next tab, for example Orders to Challans', win: 'Ctrl + Tab', mac: 'Control + Tab', src: register('SingleActivator(LogicalKeyboardKey.tab, control: true)') },
      { does: 'Previous tab', win: 'Ctrl + Shift + Tab', mac: 'Control + Shift + Tab', src: register('SingleActivator(LogicalKeyboardKey.tab, control: true, shift: true)') },
      { does: 'Jump to tab 1 to 5', win: 'Alt + 1 to 5', mac: 'Option + 1 to 5', src: register('SingleActivator(_tileDigits[i], alt: true)') },
      { does: 'Open the document the row is linked to', win: 'Alt + L', mac: 'Option + L', src: register('SingleActivator(LogicalKeyboardKey.keyL, alt: true)') },
      { does: 'Make a challan from the row', win: 'Alt + H', mac: 'Option + H', src: register("'H': RegisterChainIntent") },
      { does: 'Make an invoice from the row', win: 'Alt + I', mac: 'Option + I', src: register("'I': RegisterChainIntent") },
      { does: 'Make a goods receipt from the row', win: 'Alt + G', mac: 'Option + G', src: register("'G': RegisterChainIntent") },
      { does: 'Record a receipt or payment against the row', win: 'Alt + K', mac: 'Option + K', src: register("'K': RegisterChainIntent") },
      { does: 'Raise a credit note against the row', win: 'Alt + R', mac: 'Option + R', src: register("'R': RegisterChainIntent") },
      { does: 'Change the date range', win: 'Alt + D', mac: 'Option + D', src: register('SingleActivator(LogicalKeyboardKey.keyD, alt: true)') },
      { does: 'Export the list', win: 'Alt + E', mac: 'Option + E', src: register('SingleActivator(LogicalKeyboardKey.keyE, alt: true)') },
      { does: 'New document of this kind', win: 'Alt + N', mac: 'Control + N', src: register('SingleActivator(LogicalKeyboardKey.keyN, control: true)') },
    ],
  },
];
