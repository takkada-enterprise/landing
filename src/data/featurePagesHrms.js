// Staff and Payroll (2026-11-10): the HRMS add-on, live on prod in app
// 2.1.326 and switched on per company. One hub page and four spokes. Same
// engine and same contract as the other batches; read the header of
// src/data/featurePages.js first.
//
// Every capability sentence traces to a claims sheet under
// docs/seo/feature-pages-hrms/<slug>-claims.md, copied from the HRMS claims
// table compiled 2026-11-10 against takkada origin/main 73ac89bbd (2.1.326+351)
// and prod (SELECT only). Anything a sheet lists under "Cannot say" stays off
// these pages: no WhatsApp payslips (held on prod), no "files PF/ESI for you"
// (no real portal upload yet), no "posted in Tally" (no payroll journal proven
// in a real Tally yet), no "CA-verified" (most statutory rate rows are not).
// The add-on price is not decided and never prints, so each planPointer names
// the entry plan and the note sends the reader to a partner or to us.
//
// Screens: stage captures of book co7088 with made-up staff, under an operator
// exception (see their manifest rows): trials and demo co143 do not get the
// staff_payroll add-on, so there is no demo company to capture it from.
//
// Copy angle: the reader keeps attendance in a register, salary in Excel and
// has the accountant type the journal into Tally. Each page says what that
// month takes today and what is left once the add-on works it out in the same
// app as the Tally books. Statutory figures are always "worked out for your
// CA to check".

const CA_SENTENCE =
  'The PF, ESI, professional tax, labour welfare fund and income-tax rates in the app are worked out from the rates it holds and are not yet checked by a CA; have your CA check the figures before you pay or upload them.';

const PLAN_POINTER = {
  plan: 'Momentum',
  note: 'Staff and Payroll is an add-on, priced by your partner. Ask them for the add-on price, or message us and we will switch it on for your company.',
};

const SHARED = {
  author: 'founder',
  datePublished: '2026-11-10',
  updated: '2026-11-10',
  planPointer: PLAN_POINTER,
  priority: 0.8,
};

const POST = {
  pillar: {
    slug: 'payroll-for-tally-users-what-to-look-for',
    title: 'Payroll for Tally Users: What to Look For in a Staff App (2026)',
  },
  perDay: {
    slug: 'per-day-salary-calculation-26-or-30-days',
    title: 'Per Day Salary Calculation: 26 Days, 30 Days or the Calendar Month?',
  },
  salaryEntry: {
    slug: 'salary-entry-in-tally-prime-with-pf-esi',
    title: 'Salary Entry in Tally Prime with PF and ESI, with a Worked Example',
  },
  advance: {
    slug: 'staff-advance-entry-in-tally',
    title: 'Staff Advance Entry in Tally: Which Group, the Journal and Recovery',
  },
  vetanParchi: {
    slug: 'vetan-parchi-kaise-banaye',
    title: 'वेतन पर्ची कैसे बनाएं: हिंदी फॉर्मेट, ज़रूरी लाइनें और नमूना',
  },
  dailyWage: {
    slug: 'daily-wage-salary-calculation-sundays-holidays',
    title: 'Daily Wage Salary Calculation with Sundays, Holidays and Leave',
  },
  salaryKaise: {
    slug: 'salary-kaise-calculate-kare',
    title: 'Salary Kaise Calculate Kare: Monthly, Daily Aur Piece Rate Staff',
  },
  ecrKaise: {
    slug: 'pf-ecr-file-kaise-banaye',
    title: 'EPFO Ke Liye PF ECR File Kaise Banaye: Steps Aur Aam Galtiyan',
  },
  form130: {
    slug: 'form-130-form-138-salary-tds-2026',
    title: 'Form 130 and Form 138: What Replaced Form 16 and Form 24Q in 2026',
  },
};

/** @type {import('./featurePages').FeaturePage[]} */
export const HRMS_PAGES = [
  {
    ...SHARED,
    slug: 'staff-attendance-salary-app',
    searchPhrase: 'Staff attendance and salary app',
    overline: 'STAFF AND PAYROLL',
    headline: 'Attendance in the morning, every salary worked out by month end, and the entry ready for Tally.',
    subheadline:
      'Most shops and godowns still keep attendance in a register, work salary out in Excel and have the accountant type it into Tally. The Staff and Payroll add-on runs that month inside the same Takkada app you already use for your Tally books.',
    answerPoints: [
      "Today's attendance for the whole team in one tap",
      'Every salary worked out from attendance, overtime, fines and advances',
      'Payslips in English and Hindi, with the working on each line',
      'One balanced salary entry made for Tally each month',
    ],
    answer:
      "A staff attendance and salary app keeps attendance, leave and pay for your team in one place. Takkada's Staff and Payroll add-on marks the day's attendance in one tap, works out every salary from attendance, overtime, fines and advances, shows the working on each payslip in English or Hindi, and makes the month's salary entry for Tally.",
    waContext: 'feature-staff-attendance-salary-app',
    waMessage:
      'Hi, we keep staff attendance in a register and salary in Excel. Can you show me the Takkada Staff and Payroll add-on and switch it on for our company?',
    seo: {
      title: 'Staff Attendance and Salary App for Businesses on Tally',
      description:
        'Staff attendance and salary app for Tally users: one-tap attendance, leave, salary with overtime and fines, Hindi payslips, advances and the Tally entry.',
    },
    llms: {
      section: 'Features',
      title: 'Staff attendance and salary app',
      summary:
        'Staff and Payroll add-on for businesses on Tally: one-tap daily attendance with in and out times, leave asked and approved from the phone, monthly, daily, hourly and piece-rate pay, late fines and overtime, salary worked out with the working on every payslip line, payslips in English and Hindi as PDF, staff advances and loans with EMI, staff bills paid back or added to salary, PF ECR and ESI files prepared for upload, TDS worked out for your CA, and one balanced salary entry made for Tally each month.',
    },
    footerLabel: 'Staff and payroll',
    hero: { screen: 'hrms-attendance-today' },
    useCases: {
      heading: 'Made for owners who pay staff every month',
      cases: [
        {
          who: 'A trader with 12 people across shop and godown',
          today: 'Attendance in a register, salary added up in Excel on the 1st, and the accountant types the journal into Tally.',
          with: 'Attendance marked in one tap each morning, salary worked out on the last day, and the Tally entry made from the same figures.',
        },
        {
          who: 'A small factory with daily-wage and piece-rate workers',
          today: 'Days and pieces counted from slips, and every wage worked out by hand.',
          with: 'Pieces entered each day at your rate, and daily staff paid for the days worked and their paid leave.',
        },
        {
          who: 'A distributor with salesmen and drivers who take advances',
          today: 'Advances in a notebook, recovered from memory, and petrol bills in a drawer.',
          with: 'Advances taken back from salary on their own, and staff bills approved and paid back or added to salary.',
        },
      ],
      stops: [
        'Totalling the attendance register at month end',
        'Working out overtime and fines on a calculator',
        'Writing payslips by hand',
        'Remembering who still owes an advance',
        'Typing the salary journal into Tally',
      ],
    },
    walkthroughHeading: 'One month of staff and salary, from the first morning to the Tally entry',
    walkthrough: [
      {
        icon: 'CheckCheck',
        title: 'Today, for everyone, in one tap',
        body:
          'Mark all present, then change the few who are absent, on half day, on paid leave, on the weekly off or on a holiday. Set the weekly off, holidays and the time work starts once in settings.',
        screen: 'hrms-attendance-today',
      },
      {
        icon: 'Clock',
        title: 'In and out times, overtime worked out',
        body:
          'Add in and out times where they matter and the overtime is worked out from them, at your overtime rate, with a higher rate for work on the weekly off if you set one.',
        screen: 'hrms-attendance-in-out',
      },
      {
        icon: 'CalendarClock',
        title: 'Leave asked for from the staff phone',
        body:
          'Staff ask for leave from their own phone. You approve or reject it with a note, approved leave goes into salary as paid leave, and both sides see how much leave is left.',
        screen: 'hrms-leave-request',
      },
      {
        icon: 'Wallet',
        title: 'Salary with the working on every line',
        body:
          "The month's salary is worked out from attendance, overtime, fines, bonus, advances and deductions, and each line shows how it was reached. See salary so far at any point and confirm it on the last day to lock the month.",
        screen: 'hrms-payslip-english',
      },
      {
        icon: 'BookOpen',
        title: 'Payslips in English and Hindi',
        body:
          'Every payslip opens in English or Hindi and downloads as a PDF. Staff see their own slips in the Takkada app and are told when one is ready.',
        screen: 'hrms-payslip-hindi',
      },
      {
        icon: 'Wallet',
        title: 'Advances and staff bills',
        body:
          'Give an advance and take it back from the next salary or in monthly parts, and approve a staff bill to the right Tally expense ledger, paid now or with salary.',
        screen: 'hrms-approve-bill-with-salary',
      },
      {
        icon: 'BarChart3',
        title: 'Staff loans with an EMI table',
        body:
          'Give a staff loan with an EMI, with interest if you want, and see every EMI with its interest and the balance left. The salary run takes back the EMI that is due.',
        screen: 'hrms-loan-emi',
      },
      {
        icon: 'ShieldCheck',
        title: 'Each person sees only their own pay',
        body:
          'Staff open their own attendance, leave, payslips and ledger in the Takkada app. Nobody can open another person\'s salary.',
        screen: 'hrms-my-pay',
      },
      {
        icon: 'FileCheck2',
        title: 'Government files and the Tally entry',
        body:
          "PF ECR and ESI files are prepared from confirmed salary for you or your CA to upload, and one balanced salary entry is made for Tally and sent through Takkada's Tally connector.",
        screen: 'hrms-salary-run-tally-entry',
      },
    ],
    comparison: {
      heading: 'A month of staff and salary, in a register and Tally alone, and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Register, Excel and Tally',
      rows: [
        {
          feature: 'Attendance',
          takkada: 'One tap for the whole team each morning, in and out times where you need them.',
          others: 'A register filled in by hand and totalled at month end.',
        },
        {
          feature: 'Leave',
          takkada: 'Asked for from the staff phone, approved with a note, counted into salary as paid leave.',
          others: 'Asked for by word of mouth and remembered at salary time.',
        },
        {
          feature: 'Salary working',
          takkada: 'Worked out from attendance, overtime, fines and advances, with the working on each line.',
          others: 'An Excel sheet with days, overtime and advances typed in.',
        },
        {
          feature: 'Payslips',
          takkada: "English or Hindi PDF for every person, and each person's own slips in the Takkada app.",
          others: 'Written or typed one by one.',
        },
        {
          feature: 'Advances and loans',
          takkada: 'Taken back from salary on their own, with an EMI table for loans.',
          others: 'A notebook of who took what.',
        },
        {
          feature: 'The Tally entry',
          takkada: "One balanced salary entry made for Tally each month, sent through Takkada's Tally connector.",
          others: 'Typed into Tally by the accountant from the Excel sheet.',
        },
      ],
      disclaimer: CA_SENTENCE,
    },
    faqs: [
      {
        q: 'Can staff mark their own attendance from their phone?',
        a: 'Yes. Staff can punch in and out from the Takkada app with a selfie and their location, and you check any punch that looks doubtful before it counts. The app does not match faces; the photo and the place are there for you to look at.',
      },
      {
        q: "How does the app work out each person's salary?",
        a: "It takes the month's attendance, overtime, late and early fines, bonus, advances and deductions, and works out every line with the working shown on the payslip. You choose whether a month counts as the calendar month, 30 days or 26 days, see salary so far at any point, and confirm it on the last day to lock the month.",
      },
      {
        q: "Can staff see each other's salary?",
        a: 'No. Each staff member sees only their own attendance, leave, payslips and ledger in the Takkada app, and nobody can open another person\'s salary. The owner and the people you allow see the whole team.',
      },
      {
        q: 'How do staff get their payslip?',
        a: 'Staff get their payslip in the Takkada app and are told when it is ready. You can also open any payslip in English or Hindi and download it as a PDF to hand over or keep on file.',
      },
      {
        q: 'Does it work for daily-wage, hourly and piece-rate workers?',
        a: 'Yes. Each person can be paid monthly, daily, hourly or by pieces made. Daily-wage staff are paid for the days they work and their paid leave, and piece-rate pay is worked out from the pieces entered each day at your rate per piece.',
      },
      {
        q: 'Can I run salary from a computer instead of the phone?',
        a: 'Yes. The owner and the accountant can run attendance, salary, bills and government files from the Takkada web and desktop app, and staff use the Takkada app on their phone. Everything is the same set of books.',
      },
      {
        q: 'How much does the Staff and Payroll add-on cost?',
        a: 'It is an add-on on top of a Takkada plan, priced by your partner, and it is switched on for each company separately. Ask your partner for the add-on price, or message us on WhatsApp and we will switch it on for your books.',
      },
    ],
    relatedPosts: [POST.pillar, POST.perDay, POST.salaryEntry],
  },

  {
    ...SHARED,
    slug: 'payroll-software-tally',
    searchPhrase: 'Payroll software for Tally',
    overline: 'PAYROLL FOR TALLY',
    headline: "The month's salary worked out on the phone, and one balanced entry made for your Tally.",
    subheadline:
      'Running payroll in Tally alone means pay heads, attendance entries and a payroll voucher on the office computer, or an Excel sheet and a journal typed in by hand. The Staff and Payroll add-on works the salary out from the attendance your staff and managers mark, and makes the entry for the Tally you already keep.',
    answerPoints: [
      'Salary worked out from attendance, overtime, fines and advances',
      'Your own Tally ledgers for salary, PF, ESI, PT and advances, or new ones made for you',
      'One balanced salary entry each month, plus entries for advances, loans and bill paybacks',
      'A Waiting for Tally mark until each entry reaches Tally',
    ],
    answer:
      "Payroll software for Tally works out staff salaries and gives your Tally the accounting entry. Takkada's Staff and Payroll add-on calculates each salary from attendance, overtime, fines and advances, lets you pick your own Tally ledgers, and makes one balanced salary entry each month, sent through Takkada's Tally connector, with entries for advances, loans and staff bills too.",
    waContext: 'feature-payroll-software-tally',
    waMessage:
      'Hi, our accountant types the salary journal into Tally every month. Can you show me how Takkada makes the salary entry for Tally?',
    seo: {
      title: 'Payroll Software for Tally: Salary, Advances and Bills',
      description:
        'Payroll software for Tally users: salary worked out from attendance on the phone, then one balanced salary entry made for Tally with your own ledgers.',
    },
    llms: {
      section: 'Features',
      title: 'Payroll software for Tally',
      summary:
        "Payroll on the phone for businesses on Tally: salary worked out from attendance, overtime, fines and advances; pick your own Tally ledgers for salary, PF, ESI, PT and advances or let the app create them; one balanced salary entry each month plus entries for advances, loans and staff bill paybacks, sent through Takkada's Tally connector, with a Waiting for Tally mark until each entry arrives.",
    },
    footerLabel: 'Payroll for Tally',
    hero: { screen: 'hrms-salary-run-tally-entry' },
    useCases: {
      heading: 'Made for businesses whose books are in Tally',
      cases: [
        {
          who: 'An owner whose accountant comes in twice a month',
          today: "Salary added up in Excel, and the journal typed into Tally on the accountant's next visit.",
          with: 'The salary entry made from the confirmed month, shown line by line for the accountant to check.',
        },
        {
          who: "A business that tried Tally's payroll and stopped",
          today: 'Pay heads and attendance entries had to be kept on the office computer, so the register came back.',
          with: "Attendance marked on the phone, salary worked out, and the salary entry made for the same company's Tally books.",
        },
        {
          who: 'A distributor whose salesmen take advances against salary',
          today: 'Advance payments in Tally, and the recovery worked out by hand at month end.',
          with: "Advances and loan EMIs taken back in the salary run and shown in the month's entry.",
        },
      ],
      stops: [
        'Typing the salary journal line by line',
        'Matching the Excel total to the Tally entry',
        'Working out advance recovery by hand',
        'Creating PF, ESI and PT ledgers one by one',
      ],
    },
    walkthroughHeading: 'From confirmed salary to the entry for Tally',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: "This month's draft, last month locked",
        body:
          "The Salary page shows this month's draft for everyone and the months already confirmed. Open salary so far at any time and confirm on the last day. The owner and the accountant can run it from the phone or from a computer.",
        screen: 'hrms-salary-months-desktop',
      },
      {
        icon: 'ListChecks',
        title: 'Your ledgers, or new ones',
        body:
          'Pick the Tally ledgers you already use for salary, PF, ESI, professional tax and advances, or let the app create them. The same ledger choice comes up when you approve a staff bill, where you pick the Tally expense ledger it goes to.',
        screen: 'hrms-approve-bill-with-salary',
      },
      {
        icon: 'FileCheck2',
        title: 'One balanced entry for the month',
        body:
          "The confirmed month becomes one salary entry for Tally, debit and credit shown balanced before it is sent through Takkada's Tally connector. The app shows Waiting for Tally until it arrives.",
        screen: 'hrms-salary-run-tally-entry',
      },
      {
        icon: 'Wallet',
        title: 'Advances and loans in the same books',
        body:
          'Advances and loans get their own entries, and the salary run takes back what is due, with the EMI, interest and balance left for every loan.',
        screen: 'hrms-loan-emi',
      },
    ],
    comparison: {
      heading: 'Salary in Tally alone, and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Attendance',
          takkada: 'Marked on the phone each morning by a manager, or punched in by staff.',
          others: 'Attendance entries kept on the office computer, or a paper register.',
        },
        {
          feature: 'Salary working',
          takkada: 'Worked out from attendance, overtime, fines and advances, line by line.',
          others: 'Pay heads set up once, or an Excel sheet each month.',
        },
        {
          feature: 'The salary entry',
          takkada: "One balanced entry made for Tally each month and sent through Takkada's Tally connector.",
          others: 'A payroll voucher or journal entered at the office.',
        },
        {
          feature: 'Advances and loans',
          takkada: 'Recovered in the salary run, with an EMI table for loans.',
          others: 'Recovery worked out and entered by hand.',
        },
        {
          feature: 'Staff bills',
          takkada: 'Approved to a Tally expense ledger, paid now or with salary.',
          others: 'Collected as paper, entered as a payment later.',
        },
        {
          feature: 'Staff self-service',
          takkada: 'Staff see their own payslips, attendance, leave and ledger.',
          others: 'Payslips printed or sent from the office.',
        },
      ],
      disclaimer: `${CA_SENTENCE} TallyPrime has its own payroll with pay heads, attendance vouchers and payroll vouchers. Takkada does not use Tally's pay heads; it makes the salary entry as an accounting voucher in the ledgers you pick.`,
    },
    faqs: [
      {
        q: "Do I need to switch on Tally's payroll feature?",
        a: "No. The Staff and Payroll add-on works the salary out in Takkada and makes the salary entry as an accounting voucher in the ledgers you pick, so Tally's pay heads and payroll vouchers are not needed. If you already use Tally payroll, talk to your accountant before running both.",
      },
      {
        q: 'Under which ledgers does the salary entry go?',
        a: 'You choose. Pick the Tally ledgers you already use for salary, PF, ESI, professional tax and staff advances, or let the app create new ones, and every entry uses that choice from then on.',
      },
      {
        q: 'How does the salary reach Tally?',
        a: "Once you confirm the month, the app makes one balanced salary entry and sends it through Takkada's Tally connector, the same way Takkada sends invoices and receipts. Until it arrives the salary month shows Waiting for Tally.",
      },
      {
        q: 'Do staff advances and loans get a Tally entry too?',
        a: 'Yes. Giving an advance or loan, and paying back a staff bill, each make their own entry for Tally, and the salary run takes back the advance or EMI that is due that month.',
      },
      {
        q: 'Can my accountant check the entry before it goes?',
        a: 'Yes. The Tally entry is shown on the salary month with every debit and credit line and a balanced mark, so your accountant can read it before you confirm. Statutory lines are worked out from the rates in the app, for your CA to check.',
      },
    ],
    relatedPosts: [POST.salaryEntry, POST.advance, POST.pillar],
  },

  {
    ...SHARED,
    slug: 'salary-slip-in-hindi',
    searchPhrase: 'Salary slip in Hindi',
    overline: 'HINDI PAYSLIPS',
    headline: "Every payslip in Hindi or English, from the same month's figures, with the working on each line.",
    subheadline:
      'Staff who read Hindi more easily than English still get slips in English, or none at all. With the Staff and Payroll add-on each payslip opens in either language and downloads as a PDF.',
    answerPoints: [
      'One tap switches a payslip between English and Hindi',
      'Each line shows its working, such as days absent or overtime hours',
      'Download any slip as a PDF',
      'Staff see their own slips in the Takkada app',
    ],
    answer:
      "A salary slip in Hindi lets staff read their own pay in the language they use every day. Takkada's Staff and Payroll add-on makes every payslip in English and Hindi from the same month's figures, shows the working on each line, and downloads it as a PDF. Staff also see their slips in the Takkada app.",
    waContext: 'feature-salary-slip-in-hindi',
    waMessage: 'Hi, our staff want salary slips in Hindi. Can you show me a Hindi payslip from Takkada?',
    seo: {
      title: 'Salary Slip in Hindi: Payslip PDF for Every Staff Member',
      description:
        "Salary slip in Hindi and English for every staff member, from the same month's figures, with the working on each line and a PDF to download.",
    },
    llms: {
      section: 'Features',
      title: 'Salary slip in Hindi',
      summary:
        "Payslips in English and Hindi from the Staff and Payroll add-on: the same month's figures in either language, the working on each line (days absent, overtime, PF, professional tax, advance recovered), a PDF to download, and each staff member's own slips in the Takkada app.",
    },
    footerLabel: 'Hindi payslips',
    hero: { screen: 'hrms-payslip-hindi' },
    useCases: {
      heading: 'Made for teams who read Hindi first',
      cases: [
        {
          who: 'A godown with packers and loading staff',
          today: 'Salary paid in cash, and a slip only when someone asks, in English.',
          with: 'A Hindi slip for each person, with paid days and deductions spelled out.',
        },
        {
          who: 'A shop whose staff ask how the salary was cut',
          today: 'The owner explains the deductions at the counter on salary day.',
          with: 'Each line of the slip shows its working, so the question is answered on paper.',
        },
        {
          who: 'A business that needs slips on file',
          today: 'Slips typed in Word one by one.',
          with: 'A PDF of every slip, in English for the file and Hindi for the person.',
        },
      ],
      stops: [
        'Typing slips one by one',
        'Explaining every deduction at the counter',
        'Keeping two versions of the same slip',
      ],
    },
    walkthroughHeading: 'One payslip, two languages',
    walkthrough: [
      {
        icon: 'BookOpen',
        title: 'The working on every line',
        body:
          'Salary after absent days, overtime, PF, professional tax and advance recovered each show how the figure was reached.',
        screen: 'hrms-payslip-english',
      },
      {
        icon: 'Share2',
        title: 'Switch to Hindi',
        body:
          'The same slip in Hindi, with वेतन, ओवरटाइम, पीएफ, व्यवसाय कर and एडवांस वसूली lines. A few words, such as state names, stay in English.',
        screen: 'hrms-payslip-hindi',
      },
      {
        icon: 'Wallet',
        title: 'Daily-wage slips too',
        body:
          "A daily-wage worker's slip in Hindi shows paid days times the day rate, bonus, ESI and advance recovered.",
        screen: 'hrms-payslip-hindi-daily-wage',
      },
      {
        icon: 'MessageCircle',
        title: 'Staff are told when it is ready',
        body: 'Staff get their payslip in the Takkada app and a notification when it is ready.',
        screen: 'hrms-staff-notifications',
      },
    ],
    comparison: {
      heading: 'Hindi payslips, by hand and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Word or Excel and Tally',
      rows: [
        {
          feature: 'Language',
          takkada: 'English or Hindi, one tap apart, from the same figures.',
          others: 'Usually English, with a Hindi version typed separately.',
        },
        {
          feature: 'The working',
          takkada: 'Each line shows how it was reached.',
          others: 'Totals only.',
        },
        {
          feature: 'Daily-wage staff',
          takkada: 'Paid days times the day rate shown on the slip.',
          others: 'Worked out separately, often not written down.',
        },
        {
          feature: 'Getting it to staff',
          takkada: 'Staff see it in the Takkada app, with a PDF to download.',
          others: 'Printed or sent from the office.',
        },
      ],
      disclaimer: CA_SENTENCE,
    },
    faqs: [
      {
        q: 'What does each line on a Hindi salary slip mean?',
        a: 'वेतन is the salary for the days paid, ओवरटाइम is overtime pay, पीएफ is the provident fund cut, व्यवसाय कर is professional tax and एडवांस वसूली is the advance taken back. कुल देय is the net amount paid to the person.',
      },
      {
        q: 'Can I make a salary slip in Hindi without typing it?',
        a: "Yes. Once the month's salary is worked out in the Staff and Payroll add-on, every payslip can be switched to Hindi and downloaded as a PDF, so nothing is typed twice.",
      },
      {
        q: 'Is the Hindi slip fully in Hindi?',
        a: 'Almost. The labels and lines are in Hindi, while a few words, such as the state name, still appear in English. The figures are the same as on the English slip.',
      },
      {
        q: 'Can staff open their own payslip?',
        a: 'Yes. Staff see their own payslips in the Takkada app and get a notification when a new one is ready. Each person sees only their own pay.',
      },
      {
        q: 'Does it make slips for daily-wage workers?',
        a: "Yes. A daily-wage worker's slip shows the paid days times the day rate, then any bonus, ESI and advance taken back, in English or Hindi.",
      },
    ],
    relatedPosts: [POST.vetanParchi, POST.perDay, POST.pillar],
  },

  {
    ...SHARED,
    slug: 'daily-wage-salary-app',
    searchPhrase: 'Daily wage salary app',
    overline: 'DAILY, PIECE AND HOURLY PAY',
    headline: 'Pay by the day, the hour or the piece, worked out from the days and pieces your team actually puts in.',
    subheadline:
      'Daily and piece-rate pay is usually counted from slips and a notebook, then added up at the end of the week or month. The Staff and Payroll add-on keeps the days and pieces as they happen and works the pay out from your rates.',
    answerPoints: [
      'Monthly, daily, hourly or piece-rate pay per person',
      'Daily-wage staff paid for days worked and paid leave',
      'Pieces entered each day at your rate per piece',
      'Advances taken back and slips in English or Hindi',
    ],
    answer:
      "A daily wage salary app works out pay from the days, hours or pieces each worker actually puts in. Takkada's Staff and Payroll add-on pays daily-wage staff for days worked and paid leave, works out piece-rate pay from the pieces entered each day, adds overtime, takes back advances, and makes each payslip in English or Hindi.",
    waContext: 'feature-daily-wage-salary-app',
    waMessage:
      'Hi, we pay some staff by the day and some by pieces. Can you show me how Takkada works out their pay?',
    seo: {
      title: 'Daily Wage Salary App: Daily, Piece-Rate and Hourly Pay',
      description:
        'Daily wage salary app for shops, godowns and workshops: pay by the day, by the hour or by pieces made, with overtime, advances and Hindi payslips.',
    },
    llms: {
      section: 'Features',
      title: 'Daily wage salary app',
      summary:
        'Daily-wage, hourly and piece-rate pay in the Staff and Payroll add-on: daily staff paid for days worked plus paid leave (Sundays and holidays not paid for daily wage), pieces entered each day at a rate per piece, overtime at your rate, advances taken back from pay, and payslips in English or Hindi.',
    },
    footerLabel: 'Daily wage pay',
    hero: { screen: 'hrms-piece-rate-staff' },
    useCases: {
      heading: 'Made for teams paid by the day or the piece',
      cases: [
        {
          who: 'A workshop with piece-rate operators',
          today: 'Pieces written on a slip at the machine and totalled on Saturday.',
          with: 'Pieces entered each day by work type, and pay worked out at your rate.',
        },
        {
          who: 'A godown with daily-wage loading staff',
          today: 'Days counted from the register, with Sundays and holidays argued over.',
          with: 'Paid days counted from attendance: the days worked and paid leave.',
        },
        {
          who: 'A business with a mix of monthly and daily staff',
          today: 'Two notebooks and two ways of counting.',
          with: 'Each person on monthly, daily, hourly or piece pay in the same salary run.',
        },
      ],
      stops: [
        'Totalling piece slips by hand',
        'Counting paid days from the register',
        'Working out advance recovery from weekly pay',
      ],
    },
    walkthroughHeading: "From the day's work to the payslip",
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Choose how each person is paid',
        body:
          'Monthly, daily, hourly or by pieces, with the overtime rate and the deductions that apply to that person.',
        screen: 'hrms-add-staff-pay-type',
      },
      {
        icon: 'PackageCheck',
        title: 'Pieces entered each day',
        body: 'Enter the pieces made each day by work type, and pay is worked out from your rate per piece.',
        screen: 'hrms-piece-rate-staff',
      },
      {
        icon: 'CalendarClock',
        title: 'Paid days, counted for you',
        body:
          'Daily-wage staff are paid for the days they work and their paid leave, and Sundays and holidays are not paid for daily wage.',
        screen: 'hrms-daily-wage-line',
      },
      {
        icon: 'Wallet',
        title: 'Advances taken back from pay',
        body: 'Give an advance and take it back from the next pay or in parts.',
        screen: 'hrms-salary-advance',
      },
      {
        icon: 'BookOpen',
        title: 'A slip in Hindi',
        body: 'The daily-wage slip shows paid days times the day rate, in English or Hindi.',
        screen: 'hrms-payslip-hindi-daily-wage',
      },
    ],
    comparison: {
      heading: 'Daily and piece pay, from slips and a notebook, and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Slips, notebook and Tally',
      rows: [
        {
          feature: 'Pieces',
          takkada: 'Entered each day by work type at your rate.',
          others: 'Written on slips and totalled at week end.',
        },
        {
          feature: 'Paid days',
          takkada: 'Days worked plus paid leave, from attendance.',
          others: 'Counted from the register.',
        },
        {
          feature: 'Overtime',
          takkada: 'Worked out from in and out times at your rate.',
          others: 'Added by hand, if at all.',
        },
        {
          feature: 'Advances',
          takkada: 'Taken back from pay on their own.',
          others: 'Remembered and deducted by hand.',
        },
        {
          feature: 'Payslip',
          takkada: 'English or Hindi, with the working on each line.',
          others: 'Usually none.',
        },
      ],
      disclaimer: `${CA_SENTENCE} Whether a weekly off or holiday is paid for daily-rated workers can depend on your state's rules and your agreement with them; check with your CA. If you pay for it, put that person on monthly pay.`,
    },
    faqs: [
      {
        q: "How is a daily-wage worker's salary worked out?",
        a: 'The app counts the days the person worked plus any approved paid leave and multiplies by the day rate. Sundays and holidays are not paid for daily wage, and overtime, bonus and advances are added or taken back on top.',
      },
      {
        q: 'How do I pay piece-rate workers?',
        a: 'Set a rate per piece for each work type and enter the pieces each person makes every day. Pay for the month is worked out from those entries and shown on the slip.',
      },
      {
        q: 'Can one business have monthly and daily staff together?',
        a: "Yes. Each person is paid monthly, daily, hourly or by pieces, and all of them come into the same month's salary run and the same salary entry for Tally.",
      },
      {
        q: 'Can I give a daily-wage worker an advance?',
        a: 'Yes. Give the advance from cash or bank and take it back from the next pay in full or in equal parts each month. The slip shows the amount taken back.',
      },
      {
        q: 'Do daily-wage workers get a payslip?',
        a: 'Yes. Every person gets a payslip in English or Hindi that shows paid days times the day rate, any overtime and bonus, and what was taken back.',
      },
    ],
    relatedPosts: [POST.dailyWage, POST.salaryKaise, POST.perDay],
  },

  {
    ...SHARED,
    slug: 'pf-ecr-esi-file-from-salary',
    searchPhrase: 'PF ECR file',
    overline: 'GOVERNMENT FILES',
    headline: "The month's PF ECR file and ESI sheet, prepared from confirmed salary for you or your CA to upload.",
    subheadline:
      "Every month someone copies each person's wages and days into the EPFO and ESIC formats by hand. The Staff and Payroll add-on prepares those files from the salary you confirmed, and works out professional tax, labour welfare fund and TDS on salary for your CA to check.",
    answerPoints: [
      'PF ECR file and ESI sheet from confirmed salary',
      'PF with the pension split, ESI, PT and LWF on every slip',
      'TDS on salary worked out, new or old regime, for your CA to check',
      'Quarterly TDS statement data (Form 138) for your CA',
    ],
    answer:
      "A PF ECR file is the monthly return an employer uploads on the EPFO site with each member's wages. Takkada's Staff and Payroll add-on prepares the ECR file and the ESI sheet from confirmed salary for you or your CA to upload, and works out professional tax, labour welfare fund and TDS on salary for your CA to check.",
    waContext: 'feature-pf-ecr-esi-file-from-salary',
    waMessage:
      'Hi, my CA makes our PF ECR and ESI files by hand every month. Can you show me what Takkada prepares?',
    seo: {
      title: 'PF ECR File and ESI Sheet, Prepared from Monthly Salary',
      description:
        'PF ECR file and ESI sheet prepared from confirmed salary for you or your CA to upload, with PT, LWF and TDS on salary worked out for your CA to check.',
    },
    llms: {
      section: 'Features',
      title: 'PF ECR file and ESI sheet from salary',
      summary:
        'Government files in the Staff and Payroll add-on: the monthly PF ECR text file and ESI sheet prepared from confirmed salary for the owner or CA to upload on the EPFO and ESIC sites (the app does not upload them), PF with the pension split, ESI, professional tax and labour welfare fund on every slip, TDS on salary under the new or old regime, staff tax declarations, TDS challans, and quarterly Form 138 data for the CA. Rates are worked out from the app\'s tables and are not yet CA-checked.',
    },
    footerLabel: 'PF and ESI files',
    hero: { screen: 'hrms-government-files' },
    useCases: {
      heading: 'Made for employers who pay PF and ESI',
      cases: [
        {
          who: 'A business whose CA files PF and ESI',
          today: 'Wages and days sent to the CA on WhatsApp, then typed again into the formats.',
          with: 'The ECR file and ESI sheet prepared from the confirmed month and handed to the CA.',
        },
        {
          who: 'An owner who uploads PF himself',
          today: 'The ECR built in Excel and fixed after every upload error.',
          with: 'The ECR text file prepared from the same figures as the payslips.',
        },
        {
          who: 'A business with staff in the tax bracket',
          today: 'Declarations collected on paper in March, and tax worked out once a year.',
          with: 'Declarations sent from the staff phone, and TDS worked out every month.',
        },
      ],
      stops: [
        'Retyping wages into the ECR format',
        'Totalling ESI by hand',
        'Collecting tax declarations on paper',
        'Building the quarterly TDS data from scratch',
      ],
    },
    walkthroughHeading: 'From confirmed salary to the files your CA needs',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'PF ECR and ESI, prepared',
        body:
          "The Government files screen prepares the month's PF ECR text file and ESI sheet from confirmed salary, with PT and LWF totals. The screen tells you to upload them on the EPFO and ESIC sites, because the app does not send them. If the ESIC site asks for .xls, save the sheet in that format.",
        screen: 'hrms-government-files',
      },
      {
        icon: 'ShieldCheck',
        title: 'Every cut on the slip',
        body:
          'PF with the pension (EPS) split, ESI, professional tax and labour welfare fund are cut from pay and shown on the slip, worked out from the rates in the app for your CA to check.',
        screen: 'hrms-payslip-netpay-pf',
      },
      {
        icon: 'Send',
        title: 'Tax declarations from the staff phone',
        body:
          'Staff send their 80C, 80D and home loan declarations from their phone. You check and accept them, and TDS on salary is worked out every month under the new or old regime, for your CA to check.',
        screen: 'hrms-tax-declaration-review',
      },
      {
        icon: 'Wallet',
        title: 'Challans and the quarter',
        body:
          'Record each TDS challan from the bank receipt. Each quarter the app prepares the TDS statement data for your CA: a text file for Q1 to Q3 and an Excel sheet for Q4.',
        screen: 'hrms-tds-challan',
      },
    ],
    comparison: {
      heading: 'Monthly government files, by hand and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Excel and Tally',
      rows: [
        {
          feature: 'PF ECR',
          takkada: 'Text file prepared from confirmed salary, for you or your CA to upload.',
          others: 'Built in Excel from the salary sheet.',
        },
        {
          feature: 'ESI',
          takkada: 'Sheet prepared from the same figures.',
          others: 'Typed into the ESIC format.',
        },
        {
          feature: 'PT and LWF',
          takkada: 'Cut on every slip and totalled for the month.',
          others: 'Worked out separately.',
        },
        {
          feature: 'TDS on salary',
          takkada: 'Worked out every month, new or old regime, for your CA to check.',
          others: 'Worked out once a year, often in March.',
        },
        {
          feature: 'Quarterly TDS data',
          takkada: 'Text file for Q1 to Q3, Excel for Q4, for your CA.',
          others: 'Collected by the CA from scratch.',
        },
      ],
      disclaimer: `${CA_SENTENCE} Uploading is done by you or your CA on the EPFO and ESIC sites; the app does not upload or file anything. Form 130 (earlier Form 16) is issued from TRACES; the app gives a yearly Salary and tax statement PDF with the figures behind it.`,
    },
    faqs: [
      {
        q: 'What is a PF ECR file?',
        a: "The ECR (electronic challan cum return) is the monthly file an employer uploads on the EPFO site, listing each member's wages and PF and pension contribution. The Staff and Payroll add-on prepares it as a text file from the salary you confirmed.",
      },
      {
        q: 'Does the app upload PF and ESI for me?',
        a: 'No. It prepares the PF ECR file and the ESI sheet for you or your CA to upload on the EPFO and ESIC sites, and the screen says so. Uploading and paying stay with you.',
      },
      {
        q: 'Are the PF, ESI and PT rates in the app correct?',
        a: 'The app works them out from the rates it holds and shows every line on the slip so your CA can check it. The ESI rates have been checked; the PF wage-ceiling option, professional tax and labour welfare fund rates are not yet CA-checked, and the app says so on screen.',
      },
      {
        q: "Which states' professional tax does it cover?",
        a: 'It holds professional tax for Maharashtra, Karnataka, West Bengal, Gujarat, Telangana, Andhra Pradesh and Assam, and labour welfare fund for Maharashtra and Karnataka. These rates are not yet CA-checked, so have your CA check the first month.',
      },
      {
        q: 'Does it make Form 16?',
        a: 'No. Form 16 is now Form 130 and is issued from TRACES. The app gives each staff member a yearly Salary and tax statement PDF and prepares the quarterly TDS data (Form 138, earlier Form 24Q) for your CA.',
      },
    ],
    relatedPosts: [POST.ecrKaise, POST.form130, POST.salaryEntry],
  },
];
