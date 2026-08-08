import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Download, Menu, X } from 'lucide-react';
import CTAButton from './components/CTAButton';
import WhatsAppCTA from './components/WhatsAppCTA';
import PhoneModal from './components/PhoneModal';
import { PhoneModalProvider, usePhoneModal } from './context/PhoneModalContext';
import { navLinks, footerColumns, contactInfo, appLinks } from './data/siteContent';
import { organizationSchema, webSiteSchema } from './data/schema';

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

function SiteHeader({ menuOpen, setMenuOpen, scrolled }) {
  const { setOpen } = usePhoneModal();
  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
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
          {navLinks.map((l) => (
            <NavHashLink key={l.label} href={l.href}>{l.label}</NavHashLink>
          ))}
        </nav>
        <div className="nav-actions desktop-only">
          {/* Direct download — existing users grab the connector without a
              detour through the #tally section. */}
          <a href={appLinks.tallyConnector} className="nav-connector-link" download>
            <Download size={16} /> Tally Connector
          </a>
          <CTAButton variant="secondary" type="button" onClick={() => setOpen(true)}>Book a Demo</CTAButton>
          <WhatsAppCTA context="header" />
        </div>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ menuOpen, setMenuOpen }) {
  const { setOpen } = usePhoneModal();
  return (
    <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useScrollToHash();

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
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled || forceLightNav} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
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
