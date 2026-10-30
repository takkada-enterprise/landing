import Seo from '../components/Seo';
import { Band, Card, CardGrid, CloseBand } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';

// Public setup guide for the Takkada AI assistant connector (MCP). Claude's and ChatGPT's app
// directories link here as the connector's documentation, so every capability below must be live
// on prod: the 23 tools the prod mcp-server lists (verified 2026-09-28 with a prod OAuth smoke).
// Tools that exist only on stage (payables, morning brief, e-invoice, quotations, PDF import) stay
// off this page until they are promoted.
//
// On the Campfire primitives (plan 2026-10-30-003, Task 7): navy hero, the
// sections in their own order as text cards, the help line as the close band.
// Motion: none.

export const MCP_SERVER_URL = 'https://mcp.takkada.com/functions/v1/mcp-server';

function AiAssistant() {
  return (
    <div className="ui-feature ui-icp ui-icp-docs">
      <Seo
        title="Connect Takkada to Claude or ChatGPT"
        description="Ask your AI assistant who owes you, what sold and what is in stock, answered from your Tally books through Takkada. Setup, permissions and safety."
        path="/ai-assistant"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'AI assistant', path: '/ai-assistant' },
          ]),
        ]}
      />

      <Band tone="band" id="hero">
        <h1 className="ui-hero-title">Ask your Tally books from Claude or ChatGPT</h1>
        <p className="ui-icp-meta tabular-nums">Setup guide &bull; Updated September 28, 2026</p>
        <p className="ui-hero-lead">
          You are on a call with a retailer and need to know what they owe, when they last paid, and which bill is oldest. With the Takkada connector you type that question into Claude or ChatGPT and the answer comes from your own books, as synced from Tally by the Takkada desktop connector.
        </p>
      </Band>

      <Band tone="white" id="setup">
        <CardGrid cols={2}>
          <Card title="Who can connect">
            <ul>
              <li>The <strong>business admin</strong> of a Takkada company. Staff and salesman logins are refused.</li>
              <li>The company needs the <strong>AI assistant add-on</strong>. Ask us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> to turn it on.</li>
              <li>You sign in with your Takkada mobile number and a one-time code. There is no password or API key to manage.</li>
            </ul>
          </Card>
          <Card title="Server URL">
            <p><code>{MCP_SERVER_URL}</code></p>
          </Card>
          <Card title="Connect in Claude">
            <ol>
              <li>In Claude (web or desktop), open <strong>Settings</strong>, then <strong>Connectors</strong>, then <strong>Add custom connector</strong>.</li>
              <li>Name it <code>Takkada</code> and paste the server URL above. Save.</li>
              <li>Click <strong>Connect</strong>. The Takkada sign-in page opens. Enter your mobile number, tap <strong>Send OTP</strong>, enter the code, then tap <strong>Approve &amp; connect</strong>.</li>
              <li>In a chat, turn the Takkada connector on and ask: &ldquo;Which of my customers owe me the most?&rdquo;</li>
            </ol>
          </Card>
          <Card title="Connect in ChatGPT">
            <p>
              The Takkada app is under review for ChatGPT&rsquo;s app directory. Once it is listed, search for Takkada in ChatGPT&rsquo;s apps and sign in the same way: mobile number, one-time code, Approve &amp; connect.
            </p>
          </Card>
        </CardGrid>
      </Band>

      <Band id="use">
        <CardGrid cols={2}>
          <Card title="What you can ask">
            <ul>
              <li>Who owes you, how much, how old each bill is, and when each customer last paid. Filters like &ldquo;more than <span className="tabular-nums" data-not-a-price>&#8377;1 lakh</span>&rdquo; or &ldquo;not paid in 30 days&rdquo; work.</li>
              <li>A customer&rsquo;s or supplier&rsquo;s ledger statement, with the items on each invoice if you want them.</li>
              <li>Sales and purchase invoices by number, party, status or date; the daybook; register totals for the year.</li>
              <li>Trial balance, profit and loss, and balance sheet.</li>
              <li>Stock on hand by item or group, and who bought or supplied an item and at what rate.</li>
              <li>Lists of whom to chase for payment and what to reorder.</li>
              <li>Whether the reminders and statements you sent were delivered.</li>
            </ul>
          </Card>
          <Card title="What it can do for you">
            <ul>
              <li><strong>Make entries:</strong> receipts, payments, contra, expenses, journals, sales and purchase invoices, orders, new parties and items, and edits to a party&rsquo;s phone, email or address.</li>
              <li><strong>Send on WhatsApp:</strong> payment reminders, payment links, and ledger statements.</li>
            </ul>
            <p>
              Every entry and every message is shown to you as a preview first. Nothing is saved or sent until you reply &ldquo;confirm&rdquo;. An entry the assistant made can be undone: it is cancelled, the cancellation reaches Tally too, and nothing is deleted. Confirmed entries reach Tally through the Takkada desktop connector, the same way entries made in the Takkada app do.
            </p>
          </Card>
          <Card title="Good questions to start with">
            <ul>
              <li>&ldquo;What does Sharma Traders owe, and when did they last pay?&rdquo;</li>
              <li>&ldquo;Which customers owe more than <span className="tabular-nums" data-not-a-price>&#8377;1 lakh</span> and haven&rsquo;t paid in 30 days?&rdquo;</li>
              <li>&ldquo;Has bill 1024 been paid?&rdquo;</li>
              <li>&ldquo;Who buys Mudguard from us, and at what rate?&rdquo;</li>
              <li>&ldquo;Which items are at zero or negative stock?&rdquo;</li>
              <li>&ldquo;Record a cash receipt of <span className="tabular-nums" data-not-a-price>&#8377;5,000</span> from Sharma Traders today.&rdquo;</li>
            </ul>
          </Card>
        </CardGrid>
      </Band>

      <Band tone="white" id="data">
        <CardGrid cols={2}>
          <Card title="Your data">
            <ul>
              <li>The assistant sees only what it fetches to answer the question you asked, and only for companies you administer.</li>
              <li>Answers are as of your last Tally sync, and every answer says when that was.</li>
              <li>Takkada records which action was requested, when, and whether it worked, for security and support. We do not store your conversation.</li>
              <li>To disconnect, remove the Takkada connector in your assistant, or write to us and we will revoke its access. See our <a href="/privacy-policy">privacy policy</a>.</li>
            </ul>
          </Card>
          <Card title="If something goes wrong">
            <ul>
              <li><strong>&ldquo;Not entitled&rdquo; or an upgrade message:</strong> that company does not have the AI assistant add-on yet.</li>
              <li><strong>&ldquo;This token was not issued to a takkada MCP connection&rdquo;:</strong> remove the connector and add it again.</li>
              <li><strong>Sign-in refused:</strong> only business admins can connect.</li>
            </ul>
          </Card>
        </CardGrid>
      </Band>

      <CloseBand id="help" title="Need help connecting?">
        <p className="ui-close-lead">
          Write to <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call <span className="tabular-nums">{contactInfo.phone}</span>.
        </p>
      </CloseBand>
    </div>
  );
}

export default AiAssistant;
