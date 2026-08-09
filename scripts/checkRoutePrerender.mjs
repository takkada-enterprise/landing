// checkRoutePrerender — every registered route must ship real HTML.
//
// checkBlogPrerender covers dist/blog/*. checkFeaturesHub covers dist/features.
// Between them that is 2 of the 41 routes in routeMetadata, and the 26 feature
// landing pages — the ones the whole /features hub exists to promote — had no
// prerender guard at all. A router or vite-react-ssg regression that empties
// #root would take out every one of them while both existing guards reported
// OK, because neither looks at those URLs.
//
// This is the general form: iterate the route registry, assert each route
// produced a file and that the file is not a client-rendered shell. Adding a
// route to siteMetadata.js enrols it automatically, which is the property the
// per-page guards do not have.
//
// It deliberately checks only the shell condition. What makes a given page
// correct beyond that (the hub's 26 cards, a post's prose) stays with the
// specific guard that knows the page.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { routeMetadata } from '../src/data/siteMetadata.js';
import { hasEmptyRoot } from './checkBlogPrerender.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Where vite-react-ssg writes a route: '/' -> dist/index.html, '/x' -> dist/x/index.html. */
export function outputPathFor(routePath) {
  return routePath === '/' ? 'dist/index.html' : `dist${routePath}/index.html`;
}

export function inspectRoutes(routes, readPage) {
  const absent = [];
  const shells = [];
  for (const { path } of routes) {
    const html = readPage(outputPathFor(path));
    if (html === null) absent.push(path);
    else if (hasEmptyRoot(html)) shells.push(path);
  }
  return { absent, shells };
}

function main() {
  const readPage = (rel) => {
    const file = resolve(repoRoot, rel);
    return existsSync(file) ? readFileSync(file, 'utf-8') : null;
  };

  const { absent, shells } = inspectRoutes(routeMetadata, readPage);

  for (const path of absent) {
    process.stderr.write(`checkRoutePrerender: ${path} produced no HTML at all\n`);
  }
  for (const path of shells) {
    process.stderr.write(`checkRoutePrerender: ${path} prerendered as an empty shell\n`);
  }
  if (absent.length > 0 || shells.length > 0) process.exit(1);

  process.stdout.write(`checkRoutePrerender: OK (${routeMetadata.length} routes server-rendered)\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
