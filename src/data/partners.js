// /partners page copy (src/routes/Partners.jsx). JSX-free.
//
// CLAUDE.md §4: partners earn recurring commission on every plan sold and every
// renewal, paid by UPI on the 5th; the first three customers are done with
// them. The percentage lives in the partner agreement and is never published
// here (src/routes/__tests__/partners.test.jsx fails on any "N%" on the page).

export const PARTNER_HERO = {
  headline: 'One customer, two products, and you earn on both.',
  lead:
    'Alongside your Tally, sell Takkada and earn recurring commission on every customer, on the first sale and on every renewal. They stay on the product because their reconciliation has gone away, so the renewals keep coming.',
};

export const PARTNER_EARN = [
  {
    title: 'Recurring commission on every sale',
    line: 'You earn on the first sale and again on every renewal. The exact commercials are in your partner agreement.',
  },
  {
    title: 'Your first three customers, done with you',
    line: 'Takkada handles your first three sales end to end while you watch, so you never set one up alone.',
  },
  {
    title: 'Paid on the 5th, by UPI',
    line: 'Commission for the month reaches you by UPI on the 5th, with a statement alongside it.',
  },
];

export const partnerBenefits = [
  {
    title: 'Recurring revenue on every client onboarded',
    body: 'Earn commission on the first sale and on every renewal. Distributors stay on the product because their reconciliation is gone, so renewals happen.',
  },
  {
    title: 'Zero conflict with your Tally licence sales',
    body: 'Takkada runs on top of Tally. Your Tally licence and renewal commercials stay exactly as they are. The same client signs two cheques, you collect on both.',
  },
  {
    title: 'WhatsApp-first workflow your clients already use',
    body: 'Reminders, invoices, and payment links flow over WhatsApp. The client does not have to learn a new app to receive money.',
  },
  {
    title: 'End to end: reminders, UPI, reconciliation, GST',
    body: 'Payment reminders, UPI collection with zero MDR, auto reconciliation into Tally, and e-invoice plus e-way bill from the phone. One product covers the whole receivables loop.',
  },
];

export const clientWins = [
  'Higher collection rates from automatic reminders',
  'Auto reconciliation directly into Tally',
  'No manual follow ups, no screenshot verification',
  'T+1 settlement to the bank account',
];

export const audienceList = [
  'Tally Solution Partners and Tally Certified Partners',
  'Independent ERP resellers',
  'Practising CAs and accounting firms managing distributor clients',
  'Channel partners with an existing SMB or distributor base',
];

export const partnerFaqs = [
  {
    question: 'How does the commission structure work?',
    answer:
      'Partners earn recurring commission on every plan sold and on every renewal, paid out by the 5th of every month via UPI. The exact commercials are confirmed in your partner agreement.',
  },
  {
    question: 'Will Takkada interfere with my Tally licence renewals?',
    answer:
      'No. Takkada is a layer on top of Tally. Your client keeps their Tally licence with you, renews with you, and runs Takkada alongside. Tally is the neighbour, not the competitor.',
  },
  {
    question: 'How long does onboarding a client take?',
    answer:
      'Most distributors are live in under an hour. The Tally connector takes about 30 minutes to set up on the client machine. The mobile app takes 15 minutes for the team to learn. KYC activation finishes within 24 hours and the payment gateway in 4 to 7 working days.',
  },
  {
    question: 'Do I need technical skills to sell or set up Takkada?',
    answer:
      'No. If you can install Tally and understand a distributor’s receivables, you can sell and set up Takkada. The first 3 customers are done with you: Takkada handles those installs end to end while you observe, so you are never left figuring it out alone.',
  },
  {
    question: 'Is there a partner portal or dashboard?',
    // TODO: confirm with founder once portal scope is finalized.
    answer:
      'A partner dashboard with client status, commission tracking, and payouts is on the roadmap. Until then, you receive a monthly statement and can ping the founder directly for any client question.',
  },
];

// The close band's WhatsApp message, in the partner's voice, so the founder
// can tell a partner lead from a distributor one.
export const PARTNER_WA_MESSAGE =
  'Hi, I am a Tally partner and want to sell Takkada to my clients. How do I become a partner?';

export const PARTNER_MODAL_OPTIONS = Object.freeze({
  title: 'Talk to the founder',
  subtitle: 'Drop your number. The next screen books a 20-minute slot with Ronak.',
  submitLabel: 'Continue to calendar',
});
