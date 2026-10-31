import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ChevronDown, Menu, X } from 'lucide-react';
import WhatsAppCTA from './components/WhatsAppCTA';
import DemoTryCTA from './components/DemoTryCTA';
import PhoneModal from './components/PhoneModal';
import { PhoneModalProvider, usePhoneModal } from './context/PhoneModalContext';
import { navLinks, footerColumns, contactInfo } from './data/siteContent';
import { FEATURE_PAGES, featurePagePath } from './data/featurePages';
import { menuFeatureGroups } from './data/featureGroups';
import { organizationSchema, webSiteSchema } from './data/schema';
import './ui/nav.css';
import './ui/footer.css';

const MOBILE_MENU_ID = 'mobile-menu';
const FEATURES_PANEL_ID = 'nav-features-panel';

// Hover has to be forgiving in both directions. Opening on the first pixel of
// contact makes the panel flash at anyone sweeping the pointer across the nav;
// closing on the first pixel of exit makes the diagonal from "Features" down
// to the panel impossible to walk.
const OPEN_INTENT_MS = 130;
const CLOSE_DELAY_MS = 240;

// Every feature page, under the same headings the hub files them under, so the
// menu and the hub cannot drift (Ronak, 2026-09-20). footerLabel rather than
// llms.title: this is a menu.
const FEATURE_MENU = menuFeatureGroups(FEATURE_PAGES).map((group) => ({
  id: group.id,
  title: group.title,
  items: group.pages.map((page) => ({ label: page.footerLabel, path: featurePagePath(page) })),
}));

const LOGO = '/assets/screenshots/takkada-logo.webp';
// One footer track per group; a group past ten links spans two (.ui-footer-group--wide).
const footerGroups = footerColumns.reduce((n, c) => n + (c.links.length > 10 ? 2 : 1), 0);

function hashTargetFrom(href) {
  if (!href || !href.startsWith('#')) return null;
  return href;
}

// A whole page sliding past is the largest motion the site makes, and it is the
// one thing prefers-reduced-motion is most often set to stop. matchMedia is
// guarded twice over: the SSG render has no window at all, and jsdom has a
// window without matchMedia unless a test stubs one in.
function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
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
      // The same jump as useScrollToHash, reached by clicking a nav anchor
      // while already on the homepage, so it answers the same preference.
      if (el)
        el.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
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
// panel, so the hub keeps its crawlable parent in the top menu and touch users
// can still reach it. The panel is always in the DOM; closed, `inert` plus the
// CSS visibility step keep its links out of the tab order and the
// accessibility tree, while a crawler still reads them on every page.
//
// Deliberately NOT opening on focus of the chevron: Escape closes the panel and
// returns focus here, which would immediately reopen it.
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
      className={`ui-nav-features${open ? ' open' : ''}`}
      onMouseEnter={() => schedule(true, OPEN_INTENT_MS)}
      onMouseLeave={() => schedule(false, CLOSE_DELAY_MS)}
    >
      <Link to={href} className="ui-nav-link ui-nav-features-link">{label}</Link>
      <button
        type="button"
        ref={toggleRef}
        className="ui-nav-features-toggle"
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
      <div id={FEATURES_PANEL_ID} className="ui-nav-features-panel" inert={!open}>
        <div className="ui-nav-features-list">
          {FEATURE_MENU.map((group) => (
            <div key={group.id} className="ui-nav-features-group">
              <h3>{group.title}</h3>
              {group.items.map((feature) => (
                <Link key={feature.path} to={feature.path}>{feature.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <Link to={href} className="ui-nav-features-all">
          All features
        </Link>
      </div>
    </div>
  );
}

function NavLogo({ onClick }) {
  return (
    <Link to="/" className="ui-nav-logo" onClick={onClick}>
      {/* 360x128 WebP, not the 1172px PNG: it renders at 107x38 on every
          page. width/height reserve the box. */}
      <img src={LOGO} alt="Takkada" width="107" height="38" />
    </Link>
  );
}

// One set of links and pills serves every width. From 900px up the sheet is
// the bar's right-hand side; under 900px it is a full-height sheet behind the
// burger, opened as a modal dialog (labelled, Escape closes, focus moves in on
// open and back to the burger on close).
function SiteHeader({ menuOpen, setMenuOpen, scrolled, featuresOpen, setFeaturesOpen }) {
  const location = useLocation();
  const burgerRef = useRef(null);
  const sheetRef = useRef(null);
  const wasOpen = useRef(false);
  const isAutoRecon = location.pathname === '/auto-reconciliation-tally' || location.pathname === '/reconciliation';

  useEffect(() => {
    if (menuOpen) {
      sheetRef.current?.querySelector('a, button')?.focus();
    } else if (wasOpen.current) {
      // Only on a real close, or every mount would steal focus to the burger.
      burgerRef.current?.focus();
    }
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  if (isAutoRecon) {
    return (
      <header className={`ui-nav ui-nav--minimal${scrolled ? ' scrolled' : ''}`}>
        <div className="ui-nav-inner">
          <NavLogo />
          <WhatsAppCTA context="icp-auto-reconciliation" />
        </div>
      </header>
    );
  }

  const close = () => setMenuOpen(false);

  return (
    <header className={`ui-nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="ui-nav-inner">
        <NavLogo onClick={close} />
        <div
          id={MOBILE_MENU_ID}
          ref={sheetRef}
          className="ui-nav-sheet"
          role={menuOpen ? 'dialog' : undefined}
          aria-modal={menuOpen ? 'true' : undefined}
          aria-label={menuOpen ? 'Menu' : undefined}
        >
          <nav className="ui-nav-links" aria-label="Main">
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
                <NavHashLink key={l.label} href={l.href} className="ui-nav-link" onClick={close}>
                  {l.label}
                </NavHashLink>
              )
            )}
          </nav>
          <div className="ui-nav-actions">
            <DemoTryCTA context="header" tone="ghost" onClick={close} />
            <WhatsAppCTA context="header" tone="ghost" onClick={close} />
          </div>
        </div>
        <button
          type="button"
          className="ui-nav-burger"
          ref={burgerRef}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function FooterLink({ link }) {
  if (link.page) return <Link to={`/${link.page}`}>{link.label}</Link>;
  if (link.href && link.href.startsWith('#')) return <NavHashLink href={link.href}>{link.label}</NavHashLink>;
  // `download` is passed through rather than assumed from the href: the
  // Connect column's mailto and social links share this branch.
  return <a href={link.href} download={link.download}>{link.label}</a>;
}

function FooterLogo() {
  return (
    <Link to="/" className="ui-footer-logo">
      <img src={LOGO} alt="Takkada" width="118" height="42" loading="lazy" />
    </Link>
  );
}

const year = () => new Date().getFullYear();

function SiteFooter() {
  const location = useLocation();
  const isAutoRecon = location.pathname === '/auto-reconciliation-tally' || location.pathname === '/reconciliation';

  if (isAutoRecon) {
    return (
      <footer className="ui-footer ui-footer--minimal">
        <div className="ui-max ui-footer-bottom">
          <FooterLogo />
          <p className="tabular-nums">&copy; {year()} {contactInfo.company}. All rights reserved.</p>
          <nav className="ui-footer-legal" aria-label="Legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link to="/refund-policy">Refund Policy</Link>
            <Link to="/contact-us">Contact</Link>
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="ui-footer">
      <div className="ui-max">
        <div className="ui-footer-top" style={{ '--footer-groups': footerGroups }}>
          <div className="ui-footer-brand">
            <FooterLogo />
            <p className="ui-footer-tagline">Your Tally, in your pocket.</p>
            <div className="ui-footer-badges">
              <div className="ui-footer-badge">
                <img
                  src="/assets/badges/dpiit-startup-india.png"
                  alt="DPIIT Recognized Startup India"
                  loading="lazy"
                  width="97"
                  height="36"
                />
                <span>DPIIT Recognized Startup India Company</span>
              </div>
              <a href="https://www.indietools.app/products/takkada" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.indietools.app/badges/listed-on-indietools-light.png"
                  alt="Listed on IndieTools"
                  className="ui-footer-badge-img"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          {footerColumns.map((col) => (
            // The Features column grows with every feature page; past ten links
            // it spans two grid columns and flows into sub-columns.
            <div key={col.title} className={`ui-footer-group${col.links.length > 10 ? ' ui-footer-group--wide' : ''}`}>
              <p className="ui-footer-title">{col.title}</p>
              <ul className="ui-footer-col">
                {col.links.map((link) => (
                  <li key={link.label}><FooterLink link={link} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="ui-footer-contact">
          {contactInfo.company} ·{' '}
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="tabular-nums">{contactInfo.phone}</a> ·{' '}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </p>
        <div className="ui-footer-bottom">
          <p className="tabular-nums">&copy; {year()} {contactInfo.company}. All rights reserved.</p>
          <p>{contactInfo.website}</p>
        </div>
      </div>
    </footer>
  );
}

// Sticky WhatsApp bar for phones: appears once the visitor scrolls past the
// hero so the one conversion action is always a thumb-reach away. Hidden on
// desktop (CSS) and while the sheet is open.
function StickyMobileCTA({ menuOpen }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    let ticking = false;
    const update = () => {
      const next = window.scrollY > 560;
      setShow((prev) => (prev !== next ? next : prev));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`ui-nav-sticky${show && !menuOpen ? ' visible' : ''}`} aria-hidden={!show}>
      <WhatsAppCTA context="sticky-bar" tone="accent" />
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
    let ticking = false;
    const update = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev !== next ? next : prev));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('lock-scroll', menuOpen);
    return () => document.body.classList.remove('lock-scroll');
  }, [menuOpen]);

  return (
    <div className="site-root">
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(webSiteSchema())}</script>
      </Head>
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        featuresOpen={featuresOpen}
        setFeaturesOpen={setFeaturesOpen}
      />
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
