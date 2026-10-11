# Claims sheet: `ai-calling` batch (plan 2026-10-11-001, Task 2)

Checked 2026-10-11 against prod and takkada `origin/main` (e80468be, the release that is live).

- Prod entitlement: `select count(*) from company_feature_entitlements where feature_key='ai_calling' and status='active';` returned **1**. The feature is live on prod for an entitled company, so the batch proceeds. The count is never quoted in copy.
- Plan gating: `lib/models/plan_tier.dart` lists `ai_calling` under the Enterprise tier; otherwise it is a per-company add-on (`company_feature_access.dart`, DB key `ai_calling`).

## Can say

Each line names the file on takkada `origin/main` (or supabase-functions `origin/main`) that proves it.

**Where it starts**
- The calls start from **Send reminders now** (row subtitle "Chase selected customers straight away"), opened from Payment Reminders settings (`payment_reminders_settings_screen.dart:1061`, route `/payment-reminders/send-now`).
- Send reminders now sits behind Smart Reminders (payment reminders) access; it shows "Smart Reminders paused" when WhatsApp credits run out (`send_reminders_now_screen.dart:740–790`, `reminder_gating.dart`). So AI calling needs both Smart Reminders and the `ai_calling` key.
- The screen lists only parties with an overdue amount over ₹1 (a party who owes money but has nothing overdue is not listed; empty state "No overdue parties"), with the overdue total, the number of overdue bills and the age of the oldest overdue bill (`manual_reminder_target.dart`: `totalOverdue`, `overdueInvoiceCount`, `oldestOverdueDays`). The overdue total comes from the same source as Bills Receivable, so the two overdue figures agree. Say "every party with an overdue amount", never "every party that owes money".
- Search parties, filter by Tally ledger group, **Select all** (only rows already loaded) (`send_reminders_now_screen.dart`, `groupName` chips, "Select all (N)").
- Rows without a mobile number show "No mobile number saved" and are disabled; "Reminders off" and "Reminded today" chips (`send_reminders_now_screen.dart:1038–1053`).
- The same ticked list drives two buttons: **Send now** (WhatsApp) and **Call with AI**. Call with AI shows only for a company with AI calling switched on (`send_reminders_now_screen.dart:1162–1176`).
- Tapping Call with AI opens a confirm sheet titled "Call N parties with AI", button **Call now** (`send_reminders_confirm_sheet.dart:73–120`). The cost is stated on that sheet before every tap (the rate itself is Must-not-say).
- After confirming: "Setting up N calls…", then a summary "Queued N calls" with one named line per party that was not queued, and the footer "The AI calls these parties shortly. What they say lands on the party as a follow-up." (`send_reminders_now_screen.dart:505–600`).
- A party is not called, and the owner is told why, for: no phone number on the ledger, asked not to be called, a call already queued, nothing overdue, not in the user's ledger scope, monthly AI call limit reached ("call them yourself") (`ai_call_result.dart` `copy`).

**What the call knows** (supabase-functions `origin/main` `_shared/angoor.ts`, the input form `prepare_ai_call_requests` builds)
- Your business name, the party's name, the total amount due, a summary of the bills, days overdue and due date, the last payment, and the party's previous promise (date and amount) if there was one. The language, tone and callback number come from the owner's settings.

**What comes back (write-back)**
- Each AI call is logged as a follow-up against the party, marked **AI** on the timeline; an automatic re-call is marked **AI · auto** (`party_followup.dart` `source` = `ai_call` / `ai_recall`; `log_followup_sheet.dart` `_aiTag`).
- The follow-up carries an outcome from the same list your team uses: Will pay, No answer, Wrong number, Disputes amount, Refused, Other (`party_followup.dart` `FollowupOutcome`; mapping in supabase-functions `20261036060000_ai_call_recordings_and_outcome_vocab.sql`).
- A promise to pay is recorded as amount plus date together, and only when both are given (same migration, "Promise is all-or-nothing"; `PromiseStatus` open → Promised).
- A callback date and time asked for by the party becomes the next follow-up date (same migration, `callback_datetime` → `next_followup_on`).
- The note holds what the party said, plus dispute reason, disputed invoice, who picked up, a claimed payment date and reference when given (same migration, `v_note_parts`).
- A party who asks not to be called again is not called again (`party_ai_call_optout`; app copy "Asked not to be called").
- Where each piece shows: the party's timeline ("Already tried") prints author · outcome · time, the note, the AI tag and Play recording (`log_followup_sheet.dart:233–300`). The promise prints as "Promised ₹X by <date>" with its status (Promised, Paid, Missed, Part paid) and the next follow-up as "Next: <date>" on the Recovery dashboard's **History** tab (`recovery_history_tab.dart:368–430`), which is one card per party showing only the newest entry's promise, not a row-by-row trail. Say "shows the latest promise". Do not say the promise amount prints on the per-party timeline.
- **Play recording** on an AI call row; "Recording not available yet" before it is ready (`log_followup_sheet.dart:292–322`). Say the recording plays once it is ready. Never "every call has a recording" or "every time": unanswered calls have none, and a promise exists only when given.
- "No answer" may appear in the outcome list (the code backs it), but do not claim an unanswered call shows up as a No answer row: on prod no AI follow-up with no_answer has been written yet.
- With the Recovery dashboard on, the result lands on the party's follow-up timeline. Without it, it shows on the party's bills page under **AI call results** (`send_reminders_now_screen.dart:594–597`, `bills_party_page_screen.dart:1826`).

**Owner settings** (screen "AI calling", Payment Reminders → AI calling, subtitle "Automatic re-calls, calling hours, language and limits"; `ai_calling_settings_screen.dart`, defaults in `reminder_config.dart` `AiCallSettings`)
- **Call again when a promise is missed**: "If a party does not pay what they promised, the AI calls them again". On by default; **Days after the promised date** (default 1, 0–30).
- The same automatic sweep also tries again, on the next open calling day, a party whose last AI call ended without an answer or with no promise date (outcome no_answer, spoke_will_pay or other with no promise). Same delay, calling window, monthly cap and the same toggle. Refused, Disputes amount and Wrong number are not re-tried (supabase-functions `20261036050000_ai_recall_retries_no_answer_and_no_promise_date.sql`; live prod `prepare_ai_recall_requests` contains `retry_calls`). Word it as "tries again on the next calling day when a party did not pick up or gave no date"; never as a visible "No answer" row.
- If the party asks for details during the call, their open bills are sent to them on WhatsApp once and a note is logged, "Details sent on WhatsApp after the AI call" (`complete_ai_call_request` → `enqueue_ai_call_details_share`, supabase-functions `20261035100100…:928`). Call with AI does not send a WhatsApp reminder on its own.
- Calling hours: **Start calling from** / **Stop calling at** (default 10:00 to 18:00).
- **Calling days**: Mon to Sun chips (default Mon to Sat).
- **Max AI calls per party per month** (default 4, range 1–31).
- **Language** dropdown: Hindi (default), English, Assamese, Bengali, Odia, Marathi, Gujarati, Punjabi, Tamil, Telugu, Kannada, Malayalam. One language per company setting.
- **Tone**: Polite (default) or Firm.
- **Number the party should call back (optional)**: blank uses the owner's number.

## Must not say

- The per-minute rate or any ₹ figure for calls, the add-on or a plan. (The app shows a rate on the confirm sheet; it stays out of the blog.)
- The calling vendor's name, or any internal tool name.
- Any language beyond the twelve in the dropdown. Do not say the AI picks the language per party or switches language mid-call; the language is one company setting.
- That the AI calls automatically on its own from day one of overdue. Every first call starts from a person ticking parties and tapping Call with AI; the automatic calls are only the follow-ups above (missed promise, no answer, no date). Never write "the only automatic call is the re-call". Never mention a same-day retry a couple of hours later (stage only).
- That the AI collects money, takes a payment on the call, or sends a payment link on the call. (The one WhatsApp after a call is the details share above, only when the party asks.)
- That it writes anything back into Tally. The result is a follow-up in the app.
- Call counts, connection rates, recovery percentages, "N companies use this", customer names, testimonials.
- Sentiment, escalation, payment mode, or any other output not listed under Can say.
- That the AI negotiates, waives interest, offers discounts or settles disputes. It records a dispute in the note.
- Primary keywords already owned by existing posts: `AI collection calls` (`how-ai-collection-calls-work`) and `payment follow up call` (`payment-follow-up-calls-for-distributors`). New keywords are trade- or task-qualified long tails and are never the bare phrase.
