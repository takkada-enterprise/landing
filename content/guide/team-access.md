---
slug: team-access
title: How to add your team and set their access
meta_title: How to add your team and set their access in Takkada
meta_description: Invite staff, pick a role, and control exactly which registers, parties, godowns and voucher types each person can see and create.
featureKey: team_access_controls
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Manage team
  - Add user
  - Add team member
  - Phone number *
  - What can they do?
  - Admin
  - Everything, plus can add and remove team members.
  - Full access
  - Everything, including delete.
  - Sales
  - Raise sales bills, orders, challans and receipts. No purchases or reports.
  - View only
  - See everything, change nothing.
  - Custom
  - Admin access required
  - Only business admins can add or manage team members. Ask your business admin if you need access.
  - Member Permissions
  - Customise
  - Registers
  - One level per register. Delete is only ever granted by Full.
  - None
  - View
  - Create & edit
  - Full (incl. delete)
  - Parties
  - All parties
  - Only some
  - Voucher Type Scope
  - Restrict this member to selected voucher types
  - Godown Scope
  - Restrict this member to selected godowns
  - Feature access
  - Reports
  - Smart Reminders
  - Save Permissions
  - Reset to Full Access
  - Permissions cannot be edited for pending users.
quoteSources:
  Manage team:
    - lib/screens/settings/team_settings_screen.dart
  Add user:
    - lib/screens/manage_team_screen.dart
  Add team member:
    - lib/widgets/invite_team_member_modal.dart
  Phone number *:
    - lib/widgets/invite_team_member_modal.dart
  What can they do?:
    - lib/widgets/invite_team_member_modal.dart
  Admin:
    - lib/widgets/invite_team_member_modal.dart
  Everything, plus can add and remove team members.:
    - lib/widgets/invite_team_member_modal.dart
  Full access:
    - lib/models/member_access_presets.dart
  Everything, including delete.:
    - lib/models/member_access_presets.dart
  Sales:
    - lib/models/member_access_presets.dart
  Raise sales bills, orders, challans and receipts. No purchases or reports.:
    - lib/models/member_access_presets.dart
  View only:
    - lib/models/member_access_presets.dart
  See everything, change nothing.:
    - lib/models/member_access_presets.dart
  Custom:
    - lib/models/member_access_presets.dart
  Admin access required:
    - lib/screens/manage_team_screen.dart
  Only business admins can add or manage team members. Ask your business admin if you need access.:
    - lib/screens/manage_team_screen.dart
  Member Permissions:
    - lib/screens/member_permissions_screen.dart
  Customise:
    - lib/screens/member_permissions_screen.dart
  Registers:
    - lib/widgets/member_permissions/register_permissions_section.dart
  One level per register. Delete is only ever granted by Full.:
    - lib/widgets/member_permissions/register_permissions_section.dart
  None:
    - lib/models/member_access_presets.dart
  View:
    - lib/models/member_access_presets.dart
  Create & edit:
    - lib/models/member_access_presets.dart
  Full (incl. delete):
    - lib/models/member_access_presets.dart
  Parties:
    - lib/widgets/member_permissions/ledger_scope_section.dart
  All parties:
    - lib/widgets/member_permissions/ledger_scope_section.dart
  Only some:
    - lib/widgets/member_permissions/ledger_scope_section.dart
  Voucher Type Scope:
    - lib/widgets/member_permissions/voucher_type_scope_section.dart
  Restrict this member to selected voucher types:
    - lib/widgets/member_permissions/voucher_type_scope_section.dart
  Godown Scope:
    - lib/widgets/member_permissions/godown_scope_section.dart
  Restrict this member to selected godowns:
    - lib/widgets/member_permissions/godown_scope_section.dart
  Feature access:
    - lib/screens/member_permissions_screen.dart
  Reports:
    - lib/screens/member_permissions_screen.dart
  Smart Reminders:
    - lib/screens/member_permissions_screen.dart
  Save Permissions:
    - lib/screens/member_permissions_screen.dart
  Reset to Full Access:
    - lib/screens/member_permissions_screen.dart
  Permissions cannot be edited for pending users.:
    - lib/screens/member_permissions_screen.dart
relatedGuides:
  - home
  - party-ledger
  - sales-orders
  - bills-and-outstanding
sections:
  - id: invite-someone
    featureKeys: [team_access_controls]
    settings: {}
    permission: company-admin
  - id: roles
    featureKeys: [team_access_controls]
    settings: {}
    permission: company-admin
  - id: registers-and-scopes
    featureKeys: [team_access_controls]
    settings: {}
    permission: company-admin
images: []
---

Takkada lets several people work on the same business without all of them seeing
the same things. You invite a person, choose what they can do, and adjust it
later. This guide explains the roles, the register levels and the scopes — and
the two distinctions that catch people out.

## Before you start

- Only a business admin can add, remove or change team members. Everyone else
  sees "Admin access required", with the line
  "Only business admins can add or manage team members. Ask your business admin if you need access."
- You need the person's mobile number. That is what the invite goes to and what
  they sign in with.
- Access is per business. Someone you add to one business is not on your others.
- **A full-access member is not automatically a company admin.** Admin is a
  separate choice; full access is only a level of access to the work.

## Invite someone

1. Open Settings, then Team, then "Manage team".
2. Tap "Add user". The sheet is headed "Add team member".
3. Enter their name if you like — it is optional — and their
   "Phone number *", which is not.
4. Under "What can they do?", pick one of the four choices below.
5. Tap Add Member, then send them the invite link that appears.
6. They sign up with that number, and the access you chose is applied for them
   on the spot.

Choosing the access on the invite is what saves you a second visit. You do not
have to wait for them to accept and then go and tick boxes.

## The four choices on the invite

- **"Admin"** — "Everything, plus can add and remove team members." Give this
  only to people you would trust with the business itself.
- **"Full access"** — "Everything, including delete." Every register at the
  highest level, but no power over the team.
- **"Sales"** — the app describes it as
  "Raise sales bills, orders, challans and receipts. No purchases or reports."
  The usual choice for a salesman.
- **"View only"** — "See everything, change nothing." Good for an accountant or
  an owner who only wants to look.

There is a fifth word you will see later, "Custom". You cannot pick it. It is
what the screen reports back once you have edited something by hand.

## Change what someone can do

1. Open "Manage team" and tap the person.
2. The "Member Permissions" screen opens on their current role.
3. To change the role wholesale, pick a different one.
4. To go finer, open "Customise".
5. Change what you need, then tap "Save Permissions".

"Reset to Full Access" puts everything back to the highest level in one step. It
asks first, because it is a grant, not a reset to nothing.

You cannot edit somebody who has not signed up yet: the screen says
"Permissions cannot be edited for pending users." Choose their access on the
invite instead, or wait for them to accept.

## Registers: reading is not the same as creating

"Registers" is the heart of the screen — one row per document type: sales bills,
purchase bills, receipts, payments, credit notes, debit notes, orders, challans
and the rest. Each row takes one of four levels:

- **"None"** — they cannot see this register at all.
- **"View"** — they can read it and nothing more.
- **"Create & edit"** — they can raise and change documents.
- **"Full (incl. delete)"** — they can also delete.

The screen states the rule itself:
"One level per register. Delete is only ever granted by Full."

This is the distinction people trip over. Being allowed to open a screen is not
being allowed to create its documents. A person on "View" for sales bills can
open the sales register, read every invoice and open any one of them — and the
button that makes a new invoice will refuse, naming the right they are missing.
That is working as intended, not a bug.

## Scopes: which records, not which screens

Under the register levels sit the scopes. A scope narrows *what data* a level
applies to.

**Parties.** The choice is "All parties" or "Only some". On "Only some" you tick
the parties, or whole ledger groups, this person may see. Everything else simply
does not appear for them. One important consequence: parties created afterwards
are **not** added automatically. A restricted person will not see a new customer
until you give it to them.

**"Voucher Type Scope".** Turn on
"Restrict this member to selected voucher types" to limit someone to certain
document types — for example one branch's invoice type but not another's. It
applies to what they can raise and what they can see in registers, search and
reports. Tick nothing and they see no vouchers at all; the screen warns you
before it saves that.

**"Godown Scope".** Turn on "Restrict this member to selected godowns" to limit
them to certain stock locations. It covers godown stock reports, stock journals
and delivery challans. The same warning applies: restricted with nothing ticked
means no godown data at all.

Stock groups have their own scope, set independently of the party scope.

## Feature access

"Feature access" holds the switches that are not registers:

- **"Reports"** lets this member open the Reports tab and see company-wide
  totals. With it off, the tab explains itself rather than disappearing.
- **"Smart Reminders"** lets them send reminders to customers and see who has
  been reminded.

These are separate from the registers on purpose. Somebody can be allowed to
raise invoices and still not be allowed to see what the business earns.

## When it does not look right

**You cannot open the team screen.** You are not an admin of this business. The
screen says so and names who to ask.

**The person you invited cannot sign in.** They must use the same mobile number
you invited. Resend the link if it has expired.

**They accepted but see nothing.** Open their permissions and check the register
levels and the party scope together. A restricted party scope with nothing
ticked, or every register on "None", produces an app that loads and shows an
empty business.

**They can see a screen but every action refuses.** They are on "View" for that
register. Move them to "Create & edit".

**A new customer is invisible to one person.** Their party scope is
"Only some", and the new party has not been added to it.

**A voucher type went missing from someone's list.** If it was renamed in Tally,
the old assignment no longer matches. Re-assign the current name; the screen
flags this for you.

**Someone with full access cannot add staff.** That is correct. Full access is
not admin. Change their role to "Admin" if that is what you meant.
