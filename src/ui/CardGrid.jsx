import { Children } from 'react';

// Column count from item count, so no grid ends on a lone card (audit 3):
// 1 → 1, 2 → 2, multiples of 3 → 3, other even → 2, other odd → 3 with a lead.
export function gridCols(n) {
  if (n <= 2) return Math.max(n, 1);
  if (n % 3 === 0) return 3;
  return n % 2 === 0 ? 2 : 3;
}

// A 3-up grid whose count does not divide by 3 widens its first card ("lead"),
// so 5 lays out 2+3 and 7 lays out 2+3+2. A caller's explicit `cols` wins.
export default function CardGrid({ cols, children }) {
  const n = Children.toArray(children).length;
  const c = cols ?? gridCols(n);
  return <div className={`ui-grid ui-grid--${c}${c === 3 && n % 3 !== 0 ? ' ui-grid--lead' : ''}`}>{children}</div>;
}
