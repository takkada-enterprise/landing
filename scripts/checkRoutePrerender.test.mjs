import { describe, expect, it } from 'vitest';

import { inspectRoutes, outputPathFor } from './checkRoutePrerender.mjs';

const SHELL = '<div id="root"></div>';
const REAL = '<div id="root"><h1>Real</h1></div>';

describe('checkRoutePrerender', () => {
  it('maps routes to the files vite-react-ssg actually writes', () => {
    expect(outputPathFor('/')).toBe('dist/index.html');
    expect(outputPathFor('/salesman-app-tally')).toBe('dist/salesman-app-tally/index.html');
  });

  it('passes when every route rendered real markup', () => {
    const routes = [{ path: '/' }, { path: '/salesman-app-tally' }];
    expect(inspectRoutes(routes, () => REAL)).toEqual({ absent: [], shells: [] });
  });

  it('names a feature landing page that shipped as a client-rendered shell', () => {
    // The regression the existing guards could not see: blog and /features fine,
    // every revenue page empty.
    const routes = [{ path: '/features' }, { path: '/salesman-app-tally' }];
    const { shells } = inspectRoutes(routes, (f) => (f.includes('features') ? REAL : SHELL));
    expect(shells).toEqual(['/salesman-app-tally']);
  });

  it('names a route that produced no file', () => {
    const { absent } = inspectRoutes([{ path: '/gone' }], () => null);
    expect(absent).toEqual(['/gone']);
  });
});
