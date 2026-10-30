import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SCREENS } from '../../data/screens';
import { Band, Pill, SectionHead, Card, CardGrid, Shot, AltRow, QuoteBand, CloseBand } from '..';

const R = ({ children }) => (
  <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</MemoryRouter>
);
const mount = (ui) => render(<R>{ui}</R>).container;

describe('src/ui primitives', () => {
  it('Pill renders its label alone, no arrow disc, with the tone class', () => {
    const a = mount(<Pill to="/demo">Try the demo</Pill>).querySelector('a.ui-pill.ui-pill--accent[href="/demo"]');
    expect(a.textContent).toBe('Try the demo');
    expect(a.querySelector('.ui-pill-arrow')).toBeNull();
  });

  it('Pill renders an <a> for href and a button for onClick alone', () => {
    const c = mount(<><Pill href="https://wa.me/1" tone="ghost">Chat</Pill><Pill onClick={vi.fn()}>Open</Pill></>);
    expect(c.querySelector('a.ui-pill.ui-pill--ghost[href="https://wa.me/1"]')).toBeTruthy();
    expect(c.querySelector('button.ui-pill.ui-pill--accent[type="button"]').textContent).toBe('Open');
  });

  it('Band sets the tone class and wraps children in ui-max', () => {
    const c = mount(<Band tone="tint" id="x"><p>hi</p></Band>);
    const s = c.querySelector('section#x.ui-band.ui-band--tint');
    expect(s).toBeTruthy();
    expect(s.firstElementChild.className).toBe('ui-max');
    expect(s.querySelector('.ui-max > p').textContent).toBe('hi');
  });

  it('SectionHead renders title and lead on the left axis', () => {
    const c = mount(<SectionHead title="Tally stays in charge." lead="A lead." />);
    const h = c.querySelector('header.ui-section-head');
    expect(h).toBeTruthy();
    expect(h.className).toBe('ui-section-head');
    expect(h.querySelector('h2.ui-section-title').textContent).toBe('Tally stays in charge.');
    expect(h.querySelector('p.ui-section-lead').textContent).toBe('A lead.');
    const bare = mount(<SectionHead title="T" />);
    expect(bare.querySelector('p.ui-section-lead')).toBeNull();
  });

  it('Card with `to` is one Link holding title, line and media', () => {
    const c = mount(
      <Card title="Outstanding" line="Who owes what." to="/outstanding-receivables-on-mobile">
        <Shot screen="home" sizes="200px" />
      </Card>
    );
    const a = c.querySelector('a.ui-card[href="/outstanding-receivables-on-mobile"]');
    expect(a.querySelector('h3.ui-card-title').textContent).toBe('Outstanding');
    expect(a.querySelector('p.ui-card-line').textContent).toBe('Who owes what.');
    expect(a.querySelector('.ui-card-media > img')).toBeTruthy();
  });

  it('Card without children has no media box; className passes through', () => {
    const c = mount(<Card title="T" line="L" className="features-hub-card" />);
    const card = c.querySelector('article.ui-card.features-hub-card');
    expect(card).toBeTruthy();
    expect(card.querySelector('.ui-card-media')).toBeNull();
  });

  it('CardGrid sets the column class', () => {
    expect(mount(<CardGrid cols={4}><div /></CardGrid>).querySelector('div.ui-grid.ui-grid--4')).toBeTruthy();
  });

  it('Shot renders the registry image whole', () => {
    const s = SCREENS['home'];
    const img = render(<Shot screen="home" sizes="360px" />).container.querySelector('img.ui-shot');
    for (const [attr, val] of [['src', s.src], ['srcset', s.srcSet], ['alt', s.alt], ['width', String(s.width)], ['height', String(s.height)], ['loading', 'lazy'], ['sizes', '360px']]) expect(img.getAttribute(attr), attr).toBe(val);
    expect(img.getAttribute('data-screen')).toBe('home');
    expect(img.getAttribute('decoding')).toBe('async');
    expect(render(<Shot screen="home" sizes="360px" eager />).container.querySelector('img').getAttribute('loading')).toBe('eager');
    expect(() => render(<Shot screen="nope" />)).toThrow();
  });

  it('AltRow flips with the flag', () => {
    const plain = mount(<AltRow title="T" line="L"><span /></AltRow>);
    expect(plain.querySelector('.ui-altrow')).toBeTruthy();
    expect(plain.querySelector('.ui-altrow--flip')).toBeNull();
    expect(plain.querySelector('.ui-altrow-media > span')).toBeTruthy();
    const flipped = mount(<AltRow title="T" line="L" flip><span /></AltRow>);
    expect(flipped.querySelector('.ui-altrow.ui-altrow--flip')).toBeTruthy();
  });

  it('QuoteBand and CloseBand carry quote, name, accent em and a Pill', () => {
    const q = mount(
      <QuoteBand id="testimonial" quote="Stress-free." name="Rajesh Sharma" role="FMCG Distributor, Pune" note="100+ businesses" cta={{ to: '/#pricing', label: 'See pricing' }} />
    );
    const fig = q.querySelector('figure#testimonial.ui-quote');
    expect(fig.querySelector('blockquote').textContent).toBe('Stress-free.');
    const cap = fig.querySelector('figcaption').textContent;
    expect(cap).toContain('Rajesh Sharma');
    expect(cap).toContain('FMCG Distributor, Pune');
    expect(fig.querySelector('p.ui-quote-note').textContent).toBe('100+ businesses');
    expect(fig.querySelector('a.ui-pill.ui-pill--ghost')).toBeTruthy();

    const c = mount(<CloseBand id="close" title="See your Tally on your phone." cta={{ to: '/demo', label: 'Try the demo' }} />);
    const band = c.querySelector('section#close.ui-band.ui-band--band.ui-close');
    expect(band.querySelector('h2.ui-close-title').textContent).toBe('See your Tally on your phone.');
    expect(band.querySelector('h2 em')).toBeNull();
    expect(band.querySelector('a.ui-pill[href="/demo"]')).toBeTruthy();
  });
});
