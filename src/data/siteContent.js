export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Partners', href: '/partners' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Blog', href: '/blog' },
];

export const heroStats = [
  { value: '100+', label: 'Businesses' },
  { value: '\u20B917Cr+', label: 'Collected Monthly' },
  { value: '1000s', label: 'Reminders Sent' },
];

export const painPoints = [
  {
    stat: '2 Hours Daily',
    description: 'Spent calling customers, chasing payments, following up again and again.',
  },
  {
    stat: '>15% Cash',
    description: 'Stuck in receivables. Invoices overdue, but supplier payments still due.',
  },
  {
    stat: 'Tied to Counter',
    description: 'Your business data lives in Tally on your desktop. If you\'re not there, nothing moves.',
  },
  {
    stat: 'Manual Everything',
    description: 'Creating invoices manually. Matching payments manually. Making vouchers manually.',
  },
];

export const coreFeatures = [
  {
    id: 'pdf-import',
    label: 'Import from PDF',
    title: 'Turn a supplier PDF into a purchase entry',
    description: 'A supplier sends the bill on WhatsApp or email. Open it in Takkada and the app reads the line items, quantities, GST, and amounts for you. You check the details, pick the supplier, and the purchase voucher posts into Tally. No typing the bill out line by line.',
    screenshot: '/assets/screenshots/home-screen.png',
    secondaryScreenshot: '/assets/screenshots/invoice-detail.png',
  },
  {
    id: 'outstanding-tracking',
    label: 'Outstanding Tracking',
    title: 'See Every Rupee Owed To You',
    description: 'Get a complete view of all receivables across every customer. See who owes what, what\'s overdue, and what\'s coming due, all synced from Tally in real time.',
    screenshot: '/assets/screenshots/party-list.png',
  },
  {
    id: 'smart-reminders',
    label: 'Smart Reminders',
    title: 'Automated Payment Reminders',
    description: 'Set up multi-stage payment reminders that go out automatically via WhatsApp. Configure pre-due nudges and post-due follow-ups. Control the timing, frequency, and escalation, with zero manual chasing.',
    screenshot: '/assets/screenshots/payment-reminders.png',
  },
  {
    id: 'digital-collection',
    label: 'Digital Collection',
    title: 'Collect Payments Digitally',
    description: 'Send payment links directly from invoices. Customers view pending invoices, select what to pay, and complete payment via UPI, cards, or net banking. Auto-reconciliation updates your Tally instantly.',
    screenshot: '/assets/screenshots/invoice-detail.png',
  },
  {
    id: 'auto-reconciliation',
    label: 'Auto Reconciliation',
    title: 'Payments Reconcile Themselves',
    description: 'When a customer pays through Takkada, the payment is automatically matched to the correct invoice and updated in your Tally. No manual voucher creation. No screenshot matching.',
    screenshot: '/assets/screenshots/settlement.png',
  },
  {
    id: 'reports',
    label: 'Reports',
    title: 'Your whole financial year, the moment you open the app',
    description: 'Sales, purchases, receipts, and payments for this financial year, totalled at a glance. Tap Outstanding by Age to see who owes you and how overdue, ready to call or send a reminder. Tap Customer Analytics to find the customers who have gone quiet.',
    screenshot: '/assets/screenshots/reports-screen.png',
  },
];

export const tallyFeatures = [
  {
    icon: 'refresh',
    title: 'Two-Way Sync',
    description: 'Every invoice created in Tally appears in Takkada. Every payment recorded in Takkada updates in Tally.',
  },
  {
    icon: 'zap',
    title: 'No Manual Exports',
    description: 'No CSV files. No copy-paste. Data flows automatically between Takkada and Tally in real-time.',
  },
  {
    icon: 'check',
    title: 'Auto Reconciliation',
    description: 'Payments are matched to invoices and vouchers are created in Tally automatically.',
  },
  {
    icon: 'shield',
    title: 'Always Accurate',
    description: 'Your Tally books stay perfectly updated. No mismatches. No missing entries.',
  },
];

export const featureGrid = [
  { title: 'Multiple Voucher Types', description: 'Sales, Purchase, Payment & more', icon: 'fileText' },
  { title: 'Two-Way Tally Sync', description: 'Real-time data sync both ways', icon: 'refresh' },
  { title: 'E-Invoices & eWay Bills', description: 'GST-compliant generation on mobile', icon: 'fileCheck' },
  { title: 'Auto Reconciliation', description: 'Payments update instantly in Tally', icon: 'check' },
  { title: 'Direct Bank Settlement', description: 'Attach & manage bank accounts easily', icon: 'building' },
  { title: 'Smart Reminders', description: 'Custom pre & post due follow-ups', icon: 'bell' },
  { title: 'Payment Links', description: 'Collect directly from invoices with one tap', icon: 'link' },
  { title: 'Share PDFs', description: 'Share vouchers & ledgers to all parties', icon: 'share' },
];

export const advancedFeatures = [
  {
    id: 'e-invoicing',
    title: 'E-Way Bill & E-Invoicing',
    description: 'Generate GST-compliant E-Way Bills and E-Invoices directly from your mobile phone. Syncs two ways with Tally.',
    screenshot: '/assets/screenshots/einvoice-eway.png',
  },
  {
    id: 'rbac',
    title: 'Complete Access Control',
    description: 'Define what each team member can view, create, update, or delete across sales, purchases, and receipts. Restrict ledger visibility and limit stock groups by role.',
    screenshot: '/assets/screenshots/rbac.png',
    secondaryScreenshot: '/assets/screenshots/ledger-rbac.png',
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Setup',
    description: 'Download the app, complete your KYC. Account activates in 24 hours.',
  },
  {
    step: '02',
    title: 'Tally Integration',
    description: 'Download the Windows Client, follow the instructions, sync and verify your data.',
  },
  {
    step: '03',
    title: 'Start Collecting',
    description: 'Payment Gateway activates in 4-7 days. Start collecting payments and turn on automatic reminders.',
  },
];

export const testimonials = [
  {
    quote: 'Before Takkada, I couldn\'t take a single leave. I had to be at the counter to check payments, make vouchers, update Tally. Now it\'s completely stress-free. Everything happens automatically.',
    name: 'Priya Agarwal',
    role: 'FMCG Distributor, Pune',
  },
];

export const pricing = {
  plans: [
    {
      plan: 'View Only',
      price: '\u20B92,700',
      period: '/year + GST',
      description: 'See your receivables. Send reminders. Nothing else.',
      features: [
        'Real-time receivables dashboard from Tally',
        'Overdue party list and outstanding summary',
        'Send payment reminders via WhatsApp',
        '1 user included',
      ],
    },
    {
      plan: 'Voucher Model',
      price: '\u20B94,500',
      period: '/year + GST',
      description: 'Create vouchers and share invoices from your phone.',
      features: [
        'Everything in View Only, plus:',
        'Create sales, purchase, receipt vouchers from mobile',
        'Share invoice PDFs to customers via WhatsApp',
        'Works when the Tally laptop is off',
      ],
    },
    {
      plan: 'Collections Model',
      price: '\u20B96,480',
      period: '/year + GST',
      description: 'Collect payments digitally. Auto-reconcile into Tally.',
      features: [
        'Everything in Voucher Model, plus:',
        'UPI payment links on every invoice. Zero MDR.',
        'Payments auto-reconcile into Tally instantly',
        'E-Invoice and E-Way Bill from your phone',
        'Auto Invoice Dispatch and Import from PDF available as add-ons',
      ],
    },
    {
      plan: 'Full Access',
      price: '\u20B97,999',
      period: '/year + GST',
      description: 'Every Tally invoice on WhatsApp the moment it is created. Import from PDF included.',
      badge: 'Most Popular',
      features: [
        'Everything in Collections Model, plus:',
        'Import from PDF. Turn supplier bills into purchase entries',
        'Auto Invoice Dispatch. Every Tally invoice fires on WhatsApp automatically',
        'Role-based access for field salesman teams',
        'Per-user ledger and stock group controls',
      ],
      highlighted: true,
    },
  ],
  addons: [
    { label: 'Import from PDF', price: '\u20B94,000 / year', note: 'Add-on for Collections plan' },
    { label: 'Auto Invoice Dispatch', price: '\u20B91,500 / year', note: 'Add-on for Collections plan only' },
    { label: 'WhatsApp 8,000-message pack', price: '\u20B92,000 / year' },
    { label: 'Extra user', price: '\u20B93,000 / user / year' },
    { label: 'Extra business', price: '\u20B91,000 / business / year', note: 'Collections & Full Access only' },
  ],
};

export const faqItems = [
  {
    question: 'How does Takkada sync with Tally?',
    answer: 'Takkada uses a lightweight Windows connector that runs alongside your Tally installation. It syncs data in real-time \u2014 any invoice created in Tally automatically appears in Takkada, and any payment collected through Takkada is automatically recorded back in Tally.',
  },
  {
    question: 'Do I need to change how I use Tally?',
    answer: 'Not at all. You continue using Tally exactly as you do today. Takkada works alongside Tally and syncs data automatically. There is no change to your existing workflow.',
  },
  {
    question: 'What payment methods can my customers use?',
    answer: 'Customers can pay via UPI (free), Debit Cards (free), Credit Cards (1.82%), and Net Banking (B2B rates). We also support surcharge mode if you want to pass payment costs to your customers.',
  },
  {
    question: 'How long does setup take?',
    answer: 'The app setup and KYC takes about 24 hours for account activation. Tally integration is same-day. Payment gateway activation takes 4-7 business days. You can start using the tracking and reminder features immediately.',
  },
  {
    question: 'Can I control what my employees see?',
    answer: 'Yes. Takkada has full role-based access control. You can define what each team member can view, create, update, or delete across sales, purchases, and receipts. You can also restrict which ledgers and stock groups are visible to each user.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a personalized demo where we show you exactly how Takkada works with your business data. Book a demo to get started.',
  },
];

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Import from PDF', href: '#pdf-import' },
      { label: 'Tally Connector', href: '#tally' },
      { label: 'Payment Collection', href: '#digital-collection' },
      { label: 'Smart Reminders', href: '#smart-reminders' },
      { label: 'E-Invoicing', href: '#e-invoicing' },
      { label: 'RBAC', href: '#rbac' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', page: 'about-us' },
      { label: 'Contact Us', page: 'contact-us' },
      { label: 'Partners', page: 'partners' },
      { label: 'Blog', page: 'blog' },
      { label: 'Privacy Policy', page: 'privacy-policy' },
      { label: 'Terms & Conditions', page: 'terms-and-conditions' },
      { label: 'Refund Policy', page: 'refund-policy' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/takkada/' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61577621565711' },
      { label: 'Email Us', href: 'mailto:admin@paysaathi.com' },
    ],
  },
];

// Real, verified count of store reviews for aggregateRating. Leave null until
// the actual App Store + Play Store review counts are confirmed. While this is
// null the schema generator omits aggregateRating entirely, so no fabricated
// rating count is ever emitted. To enable it, set this to the real combined
// count (ratingValue is a true 5 across both stores).
export const appRatingCount = null;

export const appLinks = {
  download: 'https://onelink.to/zs6yp4',
  playStore: 'https://play.google.com/store/apps/details?id=com.paysaathi.takkadaapp',
  appStore: 'https://apps.apple.com/in/app/takkada/id6755435132',
  tallyConnector: 'https://paysaathi-desktop-autoupdate.s3.ap-south-1.amazonaws.com/releases/takkada-setup.exe',
  bookDemo: 'https://calendar.notion.so/meet/ronakmalu/takkada',
};

export const comparisonSection = {
  overline: 'WHY TAKKADA',
  heading: "What you get that others don't",
  rows: [
    {
      feature: 'Mobile Tally view',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Automated reminders',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Invoice / ledger sharing',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Mobile data entry / voucher workflows',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'E-invoice + e-way bill from mobile',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: true,
    },
    {
      feature: 'Invoice-linked payment collection',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Auto-reconciliation into Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Auto invoice dispatch from Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'PDF/OCR — scan purchase invoices into Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
  ],
  disclaimer:
    'Feature details for Biz Analyst and Livekeeping are based on the pricing pages reviewed on April 26, 2026. Verify on their product pages before using this in sales materials.',
};

export const contactInfo = {
  company: 'Pay Saathi Innovations LLP',
  phone: '+91 94359 77777',
  email: 'admin@paysaathi.com',
  website: 'www.takkada.com',
};
