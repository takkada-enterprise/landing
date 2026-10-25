// AI agent page (2026-10-25). Same engine and same contract as the other
// batches; read the header of src/data/featurePages.js first.
//
// The search phrase is one Google India autocompletes for "ai for tally prime",
// "tally prime ai" and "ai agent for tally" on 2026-10-25. The FAQs take the
// neighbouring completions: "how to connect tally with chatgpt", "tally mcp
// server", "claude tally connector".
//
// Copy is grounded in the prod MCP server (supabase-functions origin/main,
// supabase/functions/_shared/mcp/, 37 tools; the same 37 listed by the live
// mcp.takkada.com connector on 2026-10-25). Every write tool returns a preview
// and a confirmation token and does nothing until confirm_write; undo_write
// cancels, never deletes. Tools behind other add-ons say so here: purchase
// bill import needs Import from PDF (Copilot), e-invoice and e-way bill need
// Assurance, collection calls need AI calling, reorder needs Stock Control.
//
// ChatGPT: the live /ai-assistant setup guide still says the ChatGPT app is
// under review, so this page says the same and names Claude as the way in
// today. Change both pages together when the listing goes live.
//
// Claims discipline: the AI assistant is a separately billed add-on (partner
// price list, "AI integration"), so planPointer names the entry plan and the
// note sends the reader to a partner. No rupee figures in this file.
//
// The screens are drawn chat illustrations, not captures. Each carries an
// honest unproven-backlog record in content/image-provenance.json.

/** @type {import('./featurePages').FeaturePage[]} */
export const AI_AGENT = [
  {
    slug: 'ai-agent-for-tally-prime',
    searchPhrase: 'AI agent for Tally Prime',
    overline: 'AI ASSISTANT',
    headline: 'An AI agent for Tally Prime that answers from your books and waits for your confirm.',
    subheadline:
      'You want to know who to call before ten, what came in yesterday, and whether that supplier bill is posted. Ask Claude in plain words, and the answer comes from your own Tally books.',
    // 53 words.
    answer:
      'Takkada works as an AI agent for Tally Prime inside Claude. Ask who owes you, what sold, or what is due today, and it reads your synced Tally books. Ask it to send a reminder, record a receipt or post a supplier bill, and it shows a preview first. Nothing happens until you reply confirm.',
    waContext: 'feature-ai-agent-for-tally-prime',
    waMessage:
      'Hi, I want to ask my Tally books questions from Claude or ChatGPT and send reminders from there. Can you show me how the Takkada AI assistant works?',
    seo: {
      title: 'AI Agent for Tally Prime: Ask, Remind, Post by Chat',
      description:
        'Connect Tally Prime to Claude through Takkada. Ask who owes you, get the morning collections brief, send reminders and post bills, each only after you confirm.',
    },
    llms: {
      section: 'Features',
      title: 'AI agent for Tally Prime (Claude connector)',
      summary:
        'A Takkada connector for Claude, with ChatGPT under review. Reads the synced Tally books: receivables and payables with ageing, party statements, daybook, registers, trial balance, P&L and balance sheet, stock, item-wise party history and the daily collections brief. Proposes writes (receipts, payments, journals, sales and purchase invoices, orders, parties, items, purchase bill and bank statement import, e-invoice, e-way bill, WhatsApp reminders, payment links, ledger statements) that run only after the user confirms; entries can be undone by cancellation. Business admins only, on the AI assistant add-on.',
    },
    footerLabel: 'AI agent for Tally',
    hero: { screen: 'ai-chat-owes' },
    author: 'founder',
    datePublished: '2026-10-25',
    updated: '2026-10-25',
    walkthroughHeading: 'Four things owners ask it before lunch',
    walkthrough: [
      {
        icon: 'MessageCircle',
        title: 'Ask who owes you, in your own words',
        body:
          '"Who owes more than 1 lakh and has not paid in 30 days?" comes back as a list of parties with the amount, the oldest bill and how many days it is late. Narrow it to one party, or ask for their full ledger statement with the items on each bill.',
        screen: 'ai-chat-owes',
      },
      {
        icon: 'CalendarClock',
        title: 'The morning collections brief',
        body:
          'Ask what is on for today and it reads the brief the app builds each night: payments promised for today, promises missed, follow-ups due, dealers to chase and what came in yesterday.',
        screen: 'ai-chat-brief',
      },
      {
        icon: 'Send',
        title: 'Remind on WhatsApp, after you say confirm',
        body:
          'Ask it to remind one party or every overdue party. You see who gets the message, the amount and who is left out because they already paid. Reply confirm and it goes out on WhatsApp and lands in the Reminders history. Payment links and ledger statements go the same way.',
        screen: 'ai-chat-remind',
      },
      {
        icon: 'FileCheck2',
        title: 'A supplier bill photo becomes a purchase entry',
        body:
          'Share the bill and say post it. The supplier and every item are matched against your books and the total is checked against the printed one. You see the preview, reply confirm, and it reaches Tally through the Takkada desktop connector. Say undo and it is cancelled, never deleted.',
        screen: 'ai-chat-bill',
      },
    ],
    comparison: {
      heading: 'Asking the books by chat, against asking the accountant',
      othersLabel: 'Tally Prime on its own',
      rows: [
        {
          feature: 'Who owes me, and since when',
          takkada: 'Ask in a sentence from your phone or laptop; the answer names each party, bill and day count.',
          others: 'Open Bills Receivable at the office machine, or call the accountant.',
        },
        {
          feature: 'Chasing a payment',
          takkada: 'Say "remind them with a pay link", check the preview, reply confirm.',
          others: 'Export the statement, then send it from WhatsApp by hand.',
        },
        {
          feature: 'Posting a supplier bill',
          takkada: 'Share the photo or PDF, check the matched preview, reply confirm.',
          others: 'Type each line into a purchase voucher.',
        },
        {
          feature: 'Where you can ask from',
          takkada: 'Anywhere Claude runs: phone, laptop, a shop counter in another town.',
          others: 'The computer running Tally, or remote access into it.',
        },
      ],
      disclaimer:
        'Comparison describes Tally Prime without an add-on. Answers are as of your last Tally sync. Purchase bill import needs Import from PDF, e-invoice and e-way bill need the Assurance plan, AI calls need AI calling, and reorder lists need Stock Control.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'The AI assistant is an add-on on every plan, starting here. Ask your partner for the add-on price.',
    },
    faqs: [
      {
        q: 'How do I connect Tally with ChatGPT or Claude?',
        a: 'Tally does not connect to an AI on its own. Takkada keeps a copy of your books in step with Tally, and that copy is what the assistant reads. In Claude, add Takkada as a custom connector and sign in with your Takkada mobile number and a one-time code. The Takkada app is under review for ChatGPT’s app directory. Step-by-step setup is on our AI assistant guide.',
      },
      {
        q: 'Is there a Tally MCP server?',
        a: 'Yes, through Takkada. MCP is the standard Claude and ChatGPT use to plug into outside tools, and the Takkada MCP server gives them your synced Tally books plus actions: entries, reminders, payment links, statements, e-invoice and e-way bill. Nothing is installed inside Tally, so your TDLs and partner customisations stay as they are.',
      },
      {
        q: 'Can the AI change my books without asking me?',
        a: 'No. Every entry and every WhatsApp message is shown to you as a preview first, and nothing is saved or sent until you reply confirm. An entry the assistant made can be undone: it is cancelled, the cancellation reaches Tally too, and nothing is deleted. Only the business admin of a company can connect it.',
      },
      {
        q: 'Can I ask in Hindi or Gujarati?',
        a: 'Claude reads and replies in Hindi, Gujarati and other Indian languages, so you can ask "Sharma ji ka kitna baaki hai?" and get the answer in Hindi. Party and item names come back exactly as they are written in your Tally.',
      },
      {
        q: 'Does it work when the office computer is off?',
        a: 'Yes for questions. The assistant reads the copy Takkada keeps, which is as fresh as the last sync from the office computer, and every answer says when that was. Entries you confirm wait in Takkada and reach Tally the next time the desktop connector runs.',
      },
      {
        q: 'Does Takkada store my chats or train an AI on my books?',
        a: 'Takkada records which action was asked for, when, and whether it worked, for security and support. It does not store your conversation, and the assistant sees only what it fetched to answer the question you asked, for the companies you administer.',
      },
    ],
    relatedPosts: [
      {
        slug: 'does-takkada-change-my-tally',
        title: 'Does Takkada Change or Touch My Tally Data?',
      },
      {
        slug: 'how-to-check-party-outstanding-tally-mobile',
        title: 'How to Check Party Outstanding in Tally on Mobile',
      },
      {
        slug: 'import-purchase-bills-into-tally-photo-pdf',
        title: 'Import Purchase Bills into Tally from a Photo or PDF',
      },
    ],
    priority: 0.8,
  },
];
