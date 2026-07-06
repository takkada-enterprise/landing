import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Download, Menu, X } from 'lucide-react';
import CTAButton from './components/CTAButton';
import WhatsAppCTA from './components/WhatsAppCTA';
import PhoneModal from './components/PhoneModal';
import { PhoneModalProvider, usePhoneModal } from './context/PhoneModalContext';
import { navLinks, footerColumns, contactInfo } from './data/siteContent';
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
          <img src="/assets/screenshots/takkada-logo.png" alt="Takkada" className="nav-logo-img" />
        </Link>
        <nav className="nav-links desktop-only">
          {navLinks.map((l) => (
            <NavHashLink key={l.label} href={l.href}>{l.label}</NavHashLink>
          ))}
        </nav>
        <div className="nav-actions desktop-only">
          <NavHashLink href="#tally" className="nav-connector-link">
            <Download size={16} /> Tally Connector
          </NavHashLink>
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
        <NavHashLink href="#tally" className="mobile-connector-link" onClick={() => setMenuOpen(false)}>
          <Download size={18} /> Tally Connector
        </NavHashLink>
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
              <img src="/assets/screenshots/takkada-logo.png" alt="Takkada" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">Get Paid On Time. Automatically.</p>
            <p className="footer-company">{contactInfo.company}</p>
            <p className="footer-contact tabular-nums">{contactInfo.phone}</p>
            <p className="footer-contact">{contactInfo.email}</p>
          </div>
          <div className="footer-columns">
            {footerColumns.map((col) => (
              <div key={col.title} className="footer-col">
                <p className="footer-col-title">{col.title}</p>
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

function ModalMount() {
  const { open, setOpen, options } = usePhoneModal();
  return (
    <PhoneModal
      isOpen={open}
      onClose={() => setOpen(false)}
      title={options.title}
      subtitle={options.subtitle}
      submitLabel={options.submitLabel}
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
