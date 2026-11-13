import { readFile } from 'node:fs/promises';

const contentPath = new URL('../src/data/content.ts', import.meta.url);
const source = await readFile(contentPath, 'utf8');
const forbidden = /TODO|DRAFT/g;
const matches = source.match(forbidden);

if (matches) {
  console.error(`Content validation failed: ${matches.length} forbidden placeholder(s) found in src/data/content.ts.`);
  process.exit(1);
}

console.log('Content validation passed.');
