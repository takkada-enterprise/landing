# Claims sheet: `recovery-dashboard` batch (plan 2026-10-11-001, Task 4)

Checked 2026-10-11 against prod and takkada `origin/main` (e80468be, the release that is live) plus supabase-functions `origin/main` and live prod function bodies.

- Prod entitlement: `select feature_key, status, count(*) from company_feature_entitlements where feature_key='recovery_followups' group by 1,2;` returned **29 active** (107 inactive). The feature is live on prod, so the batch proceeds. The count is never quoted in copy.
- Plan gating: `lib/models/plan_tier.dart` lists `recovery_followups` under the Enterprise tier; otherwise it is a per-company add-on (DB key `recovery_followups`). Without it, Mark followed up only hides the party on that phone for a few days (`bills_followup_helper.dart`, `receivables_ageing_screen.dart:842–860`).
- Use in prod (never quoted): 599 member-logged follow-ups in the last 30 days; 278 promises on record. Daily briefs are built every day (271 brief rows in the last 3 days; cron `recovery-daily-brief` 03:07 UTC).

## Can say

Each line names the file on takkada `origin/main` (or supabase-functions `origin/main` / live prod) that proves it.

**Where a follow-up is logged**
- From the **Collections** report (Reports → Collections, "Who owes you, and how many days each customer takes to pay.") and **Bills Receivable**, the party action **Mark followed up** (`reports_hub_screen.dart:215–229`, `receivables_ageing_screen.dart:590–595`, `bills_outstanding_screen.dart:680–684`). On a phone, tap the party to open its page; **Mark followed-up** sits beside Call and WhatsApp chat (`bills_party_page_screen.dart:1812–1817`). On a wide screen the action panel groups it under **Follow-up** (`receivables_ageing_screen.dart:1414–1425`).
- The same reports sit inside **Collect → Recovery** as the **Parties** and **Bills** tabs (`collect_tab_body.dart:942` `collectRecoverySegmentLabel = 'Recovery'`; `recovery_hub_screen.dart:367–371`).
- With the Recovery key on, Mark followed up opens the **Log follow-up** sheet (`log_followup_sheet.dart:325`).

**The Log follow-up sheet** (`log_followup_sheet.dart`)
- "How did you reach them?": Call, WhatsApp, In person, Other (`party_followup.dart` `FollowupChannel`).
- "What happened?": Will pay, No answer, Wrong number, Disputes amount, Refused, Other (`FollowupOutcome`).
- "Promise to pay (optional)": **Amount ₹** and **By date**. Both or neither: "Add both a promise amount and a date, or neither" (`:161`, `:386–415`).
- "Next follow-up (optional)" date, and "Note (optional)" (`:425–444`). Dates can be picked from today up to a year ahead (`:212–214`).
- A new promise replaces the party's open promise for checking (prod `log_party_followup`: "A new promise supersedes the party's existing open one"; superseded promises are excluded from `v_party_promise_status`). The old entry stays in the history.
- Button reads **Save follow-up**, or **Save follow-up + promise** when a promise is filled (`:454`). Snackbar: "Follow-up logged for <party>" / "Follow-up + promise logged for <party>".
- **Already tried**: the sheet shows the party's last 5 entries, each naming who logged it, the outcome and the time, with the note on its own line (`:91`, `:217–250`). AI call entries carry an **AI** tag (consistent with the ai-calling batch).
- After logging, the party drops off the Collections list for a few days, with a "(n hidden)" count and a toggle to show them (`receivables_ageing_screen.dart:234–241`, `:813`).
- No signal: "No connection — follow-up saved on this device and will sync when …"; the queue replays when the app comes back to the foreground (`party_followup_service.dart:22–35`, `:103–108`). A server refusal is not queued: "Follow-up not saved. Please try again."
- The log lives on the server, so every phone in the team sees the same history (`party_followup_service.dart:14–17`).

**Recovery screen** (Collect → Recovery, or the Recovery shortcut; `recovery_hub_screen.dart`)
- Tabs: **Parties**, **Bills**, **Habits** (payment behaviour, needs Reports+), **Team**, **History** (`:367–371`, `:447–459`). Describe them as tabs.
- **Daily brief card** at the top, built on the server each morning (`daily_brief_card.dart`, cron `recovery-daily-brief`): sections **Promises due today**, **Follow-ups due**, **Missed promises**, **Awaiting confirmation**, **Top overdue** (`:586–616`). "All clear" on a quiet day; "Not ready yet" before today's is built; previous/next day arrows; **Share on WhatsApp** sends the brief text through the phone's share sheet (`:760`). A territory-scoped member's brief covers only their parties (`daily_brief_service.dart:44–47`).
- **Team** tab (the recovery board, `recovery_board.dart`): roll-up **Recovered**, **Still out**, **Dealers worked**, **Promises kept**; a table of members with Recovered, Outstanding and median days to collect, sortable; idle members hidden; a last line **Nobody has chased** with the count of overdue dealers and the amount (`:464–495`, `:706–735`). Tap a member, or Nobody has chased, to see those dealers with promise state and last outcome (`recovery_member_dealers_sheet.dart:299–304`). Empty state: "Nothing chased yet".
- Recovered = money that came back from a dealer after the member first contacted them (`models/recovery_board.dart:104–106`).
- **Recovery owner**: each dealer row on Parties shows who is chasing it (the person who last logged a follow-up) or "Not yet chased". Only a company admin can move a dealer to someone else ("Who is chasing this dealer?", "Move dealer") (`recovery_owner_line.dart`, `recovery_reassign_sheet.dart`).
- **History** tab: every follow-up, newest first: party, "N logs", who · channel · outcome · time, the note, "Promised ₹X by <date>", "Next: <date>". Search party, filter by team member ("Everyone" chip), "Load more" (`recovery_history_tab.dart:222–430`).

**How a missed promise shows** (prod `v_party_promise_status`; supabase-functions `20260831120000_recovery_countable_set.sql:261`)
- Once the promised date passes, the promise is checked against receipts entered in Tally for that party up to the promised date: fully covered = **Promise kept**, some = **Part paid**, none = **Promise missed**.
- If the Tally data in Takkada has not yet caught up past the promised date, the promise is held as **Awaiting confirmation** instead of being called missed.
- Missed promises are listed in the next morning's daily brief (Missed promises section) and on the Team tab's dealer lists. The Team roll-up counts **Promises kept**.

## Must not say

- Anything from the unbuilt revamp: one scrolling grouped party list, a Team/History **button**, FIFO settle, a settle/decision row, phone number or last note on the party row.
- That the History tab shows a promise as Missed or Paid. On prod every stored promise status is `open` (278 of 278); the evaluated state lives in the brief and the Team tab only.
- That a missed promise is flagged the instant the date passes, or by push notification. It shows in the next brief built after the date, and only once the Tally receipts are in.
- That the daily brief is sent automatically on WhatsApp. On prod `recovery_daily_brief_recipients` has 0 active opt-ins and there is no opt-in screen on `origin/main`; the app shares it only by hand (Share on WhatsApp).
- That a follow-up or promise is written back into Tally. It lives in Takkada.
- That Takkada calls, messages or reminds the party when a promise is missed (the AI re-call belongs to the separate AI calling add-on; link that pillar instead of claiming it here).
- That Recovered is proof the member caused the payment, or a ranking/leaderboard of staff "performance" beyond the three columns.
- Counts of companies, follow-ups or promises; recovery percentages; customer names; testimonials; prices of the add-on or plan.
- Internal names (the DB, the app framework, the sync agent, vendor names).
- Primary keywords already owned: `promise to pay tracking` (`promise-to-pay-tracking-distributors`), `vasuli dashboard` (`vasuli-ka-dashboard-mobile-par`), `payment recovery dashboard`, `daily collection brief`, `payment follow up log`, `collection team leaderboard`, `collection owner per customer`. New keywords are trade- or task-qualified long tails.
