import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ArrowRight, ChevronDown, Download, Menu, X } from 'lucide-react';
import CTAButton from './components/CTAButton';
import WhatsAppCTA from './components/WhatsAppCTA';
import PhoneModal from './components/PhoneModal';
import { PhoneModalProvider, usePhoneModal } from './context/PhoneModalContext';
import { navLinks, footerColumns, contactInfo, appLinks } from './data/siteContent';
import { FEATURE_PAGES, featurePagePath } from './data/featurePages';
import { leadFeaturePages } from './data/featureGroups';
import { organizationSchema, webSiteSchema } from './data/schema';

const MOBILE_MENU_ID = 'mobile-menu';
const FEATURES_PANEL_ID = 'nav-features-panel';

// Hover has to be forgiving in both directions. Opening on the first pixel of
// contact makes the panel flash at anyone sweeping the pointer across the nav
// on their way to Book a Demo; closing on the first pixel of exit makes the
// diagonal from "Features" down to the panel impossible to walk.
const OPEN_INTENT_MS = 130;
const CLOSE_DELAY_MS = 240;

// Derived from the same export the hub's lead tier and the footer column read,
// so the three surfaces cannot drift. footerLabel rather than llms.title: this
// is a menu, and "Payment collection on Tally" beside "Tally on mobile" reads
// as a paragraph, not a list.
const LEAD_FEATURES = leadFeaturePages(FEATURE_PAGES).map((page) => ({
  label: page.footerLabel,
  path: featurePagePath(page),
}));

function hashTargetFrom(href) {
  if (!href || !href.startsWith('#')) return null;
  return href;
}

function useScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
}

function NavHashLink({ href, children, onClick, className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = hashTargetFrom(href);

  if (!hash) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    if (location.pathname === '/') {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `/${hash}`);
    } else {
      navigate(`/${hash}`);
    }
  };
  return (
    <a href={`/${hash}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

// "Features" stays an ordinary link to the hub and a sibling chevron owns the
// panel. Merging them into one button would have taken the hub's link out of
// the top menu on every page, which is the crawlable parent the hub exists to
// be, and would have left touch users with no way to reach the hub itself.
//
// The panel is always in the DOM. Closed, `inert` plus the CSS visibility step
// keep its links out of the tab order and the accessibility tree, but a
// crawler reads the HTML regardless — so every page of the site now carries
// the eight lead-feature links, which is part of what pays for the footer's
// long tail being curated down.
//
// Deliberately NOT opening on focus of the chevron: Escape closes the panel and
// returns focus here, which would immediately reopen it. Enter or Space opens,
// the same contract FAQItem.jsx keeps.
function NavFeaturesDisclosure({ label, href, open, setOpen }) {
  const wrapRef = useRef(null);
  const toggleRef = useRef(null);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const schedule = (next, delay) => {
    clearTimer();
    timerRef.current = window.setTimeout(() => setOpen(next), delay);
  };

  useEffect(() => clearTimer, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      clearTimer();
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (e) => {
      if (wrapRef.current?.contains(e.target)) return;
      clearTimer();
      setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={wrapRef}
      className={`nav-features${open ? ' open' : ''}`}
      onMouseEnter={() => schedule(true, OPEN_INTENT_MS)}
      onMouseLeave={() => schedule(false, CLOSE_DELAY_MS)}
    >
      <Link to={href} className="nav-features-link">{label}</Link>
      <button
        type="button"
        ref={toggleRef}
        className="nav-features-toggle"
        aria-expanded={open}
        aria-controls={FEATURES_PANEL_ID}
        aria-label={`${label} menu`}
        onClick={() => {
          clearTimer();
          setOpen(!open);
        }}
      >
        <ChevronDown size={15} strokeWidth={2.4} aria-hidden="true" />
      </button>
      <div id={FEATURES_PANEL_ID} className="nav-features-panel" inert={!open}>
        <div className="nav-features-list">
          {LEAD_FEATURES.map((feature) => (
            <Link key={feature.path} to={feature.path}>{feature.label}</Link>
          ))}
        </div>
        <Link to={href} className="nav-features-all">
          All features <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function SiteHeader({ menuOpen, setMenuOpen, scrolled, menuButtonRef, featuresOpen, setFeaturesOpen }) {
  const { setOpen } = usePhoneModal();
  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          {/* 360x128 WebP, not the 1172px PNG: this renders at 107x38 and sits
              on every page, where the PNG cost 133KB of the throttled mobile
              pipe the hero image needs. width/height reserve the box. */}
          <img
            src="/assets/screenshots/takkada-logo.webp"
            alt="Takkada"
            className="nav-logo-img"
            width="107"
            height="38"
          />
        </Link>
        <nav className="nav-links desktop-only">
          {navLinks.map((l) =>
            l.disclosure === 'features' ? (
              <NavFeaturesDisclosure
                key={l.label}
                label={l.label}
                href={l.href}
                open={featuresOpen}
                setOpen={setFeaturesOpen}
              />
            ) : (
              <NavHashLink key={l.label} href={l.href}>{l.label}</NavHashLink>
            )
          )}
        </nav>
        {/* Two primary actions, both conversations. The connector download used
            to sit here as a third pill, which made a Windows installer look
            like a peer of "Book a Demo" to someone who had never heard of
            Takkada. It keeps its place in the footer's Product column and in
            the mobile menu, where the people who actually want it look. */}
        <div className="nav-actions desktop-only">
          <CTAButton variant="secondary" type="button" onClick={() => setOpen(true)}>Book a Demo</CTAButton>
          <WhatsAppCTA context="header" />
        </div>
        <button
          type="button"
          className="mobile-menu-btn"
          ref={menuButtonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

// The overlay is `position: fixed; inset: 0` at every width and is never
// unmounted, so without `inert` its links sat in the tab order of every page
// on the site, desktop included, where the menu cannot even be opened. `inert`
// takes them out of the tab order and the accessibility tree; the CSS
// visibility step does the same for the paint. Dialog semantics follow
// PhoneModal.jsx: labelled, modal, Escape closes, focus moves in on open and
// returns to the toggle on close.
function MobileMenu({ menuOpen, setMenuOpen, menuButtonRef }) {
  const { setOpen } = usePhoneModal();
  const overlayRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (menuOpen) {
      overlayRef.current?.querySelector('a, button')?.focus();
    } else if (wasOpen.current) {
      // Only on a real close. Without the wasOpen guard every mount would
      // steal focus to the hamburger before the visitor had touched anything.
      menuButtonRef?.current?.focus();
    }
    wasOpen.current = menuOpen;
  }, [menuOpen, menuButtonRef]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <div
      id={MOBILE_MENU_ID}
      ref={overlayRef}
      className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
      role={menuOpen ? 'dialog' : undefined}
      aria-modal={menuOpen ? 'true' : undefined}
      aria-label={menuOpen ? 'Menu' : undefined}
      inert={!menuOpen}
    >
      <nav className="mobile-nav-links">
        {navLinks.map((l) => (
          <NavHashLink key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </NavHashLink>
        ))}
        <a
          href={appLinks.tallyConnector}
          className="mobile-connector-link"
          download
          onClick={() => setMenuOpen(false)}
        >
          <Download size={18} /> Tally Connector
        </a>
        <WhatsAppCTA context="header" fullWidth onClick={() => setMenuOpen(false)} />
        <CTAButton
          variant="secondary"
          type="button"
          fullWidth
          onClick={() => { setMenuOpen(false); setOpen(true); }}
        >
          Book a Demo
        </CTAButton>
      </nav>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src="/assets/screenshots/takkada-logo.webp"
                alt="Takkada"
                className="footer-logo-img"
                width="118"
                height="42"
                loading="lazy"
              />
            </Link>
            <p className="footer-tagline">Get Paid On Time. Automatically.</p>
            <p className="footer-company">{contactInfo.company}</p>
            <p className="footer-contact tabular-nums">{contactInfo.phone}</p>
            <p className="footer-contact">{contactInfo.email}</p>
          </div>
          <div className="footer-columns">
            {footerColumns.map((col) => (
              // The Features column is generated from FEATURE_PAGES, so it grows
              // every time a landing page ships. Past ten links a single list
              // makes the footer badly lopsided, so a long column spans the grid
              // and flows its links into sub-columns instead.
              <div
                key={col.title}
                className={`footer-col${col.links.length > 10 ? ' footer-col-wide' : ''}`}
              >
                <p className="footer-col-title">{col.title}</p>
                <div className="footer-col-links">
                {col.links.map((link) => {
                  if (link.page) {
                    return (
                      <Link to={`/${link.page}`} key={link.label}>{link.label}</Link>
                    );
                  }
                  if (link.href && link.href.startsWith('#')) {
                    return (
                      <NavHashLink key={link.label} href={link.href}>{link.label}</NavHashLink>
                    );
                  }
                  return (
                    <a href={link.href} key={link.label}>{link.label}</a>
                  );
                })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 {contactInfo.company}. All rights reserved.</p>
          <p className="footer-site">{contactInfo.website}</p>
        </div>
      </div>
    </footer>
  );
}

// Sticky WhatsApp bar for phones: appears once the visitor scrolls past the
// hero so the one conversion action is always a thumb-reach away. Hidden on
// desktop (CSS) and while the mobile menu is open.
function StickyMobileCTA({ menuOpen }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`mobile-cta-bar${show && !menuOpen ? ' visible' : ''}`} aria-hidden={!show}>
      <WhatsAppCTA context="sticky-bar" fullWidth />
    </div>
  );
}

function ModalMount() {
  const { open, setOpen, options } = usePhoneModal();
  // Spread, do not enumerate. This listed three named props until 2026-08-04,
  // which meant openWith({ destination }) was accepted by the context, stored,
  // and then silently dropped here. The demo CTA would have opened the calendar
  // with no error anywhere.
  return (
    <PhoneModal
      {...options}
      isOpen={open}
      onClose={() => setOpen(false)}
    />
  );
}

function LayoutInner() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);

  useScrollToHash();

  // Any route change closes the menu, not just a tap on one of its links.
  // Browser back and forward used to leave the overlay open over the new page
  // with `lock-scroll` still on the body, so the page could not be scrolled and
  // nothing on screen explained why. The per-link closers below stay: on the
  // homepage NavHashLink scrolls with history.replaceState, which never moves
  // the router location, so this effect would not fire for the Pricing anchor.
  useEffect(() => {
    setMenuOpen(false);
    setFeaturesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('lock-scroll', menuOpen);
    return () => document.body.classList.remove('lock-scroll');
  }, [menuOpen]);

  const forceLightNav = location.pathname.startsWith('/blog');

  return (
    <div className="site-root">
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(webSiteSchema())}</script>
      </Head>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled || forceLightNav}
        menuButtonRef={menuButtonRef}
        featuresOpen={featuresOpen}
        setFeaturesOpen={setFeaturesOpen}
      />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} menuButtonRef={menuButtonRef} />
      <Outlet />
      <SiteFooter />
      <StickyMobileCTA menuOpen={menuOpen} />
      <ModalMount />
    </div>
  );
}

function Layout() {
  return (
    <PhoneModalProvider>
      <LayoutInner />
    </PhoneModalProvider>
  );
}

export default Layout;
