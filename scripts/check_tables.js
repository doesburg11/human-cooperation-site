#!/usr/bin/env node
// Enforce the house-style table rule (HOUSE_STYLE.md, "Table Style" and
// "Display Captions") on every docs page, so a page that breaks it fails
// `npm run build` locally and in the deploy workflow:
//
//   1. No Markdown pipe tables: they bypass the site-table styling.
//   2. Every <table> uses className="site-table ..." and sits inside a
//      <figure> whose <figcaption> starts with "Display N:".
//   3. Every site table has light-blue alternating rows (site-table--striped),
//      except tables that colour their own cells (a <td style={{ backgroundColor
//      ... }}>), where row stripes would clash with the cell colours.
//
// Template:
//
//   <figure className="site-table-figure">
//     <div className="site-table-scroll">
//     <table className="site-table site-table--striped">
//       <thead><tr><th>…</th></tr></thead>
//       <tbody><tr><td>…</td></tr></tbody>
//     </table>
//   </div>
//   <figcaption className="site-table-caption"><strong>Display N:</strong> Caption.</figcaption>
//   </figure>

const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs');

function docsFiles(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return docsFiles(full);
    return /\.mdx?$/.test(entry.name) ? [full] : [];
  });
}

// Blank out fenced code blocks (keeping line numbers), so examples of
// tables inside code are not checked.
function withoutCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, (block) => block.replace(/[^\n]/g, ' '));
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function check(file) {
  const text = withoutCode(fs.readFileSync(file, 'utf8'));
  const problems = [];
  const lines = text.split('\n');
  for (let i = 0; i + 1 < lines.length; i++) {
    if (/^\s*\|/.test(lines[i]) && /^\s*\|[-:| ]+\|\s*$/.test(lines[i + 1])) {
      problems.push([i + 1, 'Markdown pipe table: use the site-table template']);
    }
  }
  const tables = /<table\b([^>]*)>([\s\S]*?)<\/table>/g;
  let match;
  while ((match = tables.exec(text)) !== null) {
    const line = lineOf(text, match.index);
    const attributes = match[1];
    const body = match[2];
    const classes = (attributes.match(/className="([^"]*)"/) || [, ''])[1].split(/\s+/);
    if (!classes.includes('site-table')) {
      problems.push([line, 'table without className="site-table ..."']);
    }
    const colorsCells = /<td[^>]*style=\{\{[^}]*backgroundColor/.test(body);
    if (classes.includes('site-table') && !classes.includes('site-table--striped') && !colorsCells) {
      problems.push([line, 'table without light-blue alternating rows (site-table--striped)']);
    }
    const figureStart = text.lastIndexOf('<figure', match.index);
    const figureEnd = text.indexOf('</figure>', match.index);
    const enclosed =
      figureStart !== -1 &&
      figureEnd !== -1 &&
      text.lastIndexOf('</figure>', match.index) < figureStart;
    const figure = enclosed ? text.slice(figureStart, figureEnd) : '';
    if (!/<figcaption[^>]*>\s*(<strong>)?\s*Display \d+:/.test(figure)) {
      problems.push([line, 'table without a <figcaption> starting with "Display N:"']);
    }
  }
  return problems.map(([line, message]) => `${path.relative(process.cwd(), file)}:${line}: ${message}`);
}

const problems = docsFiles(DOCS).flatMap(check);
if (problems.length) {
  console.error('Table house-style check failed (see scripts/check_tables.js):');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log('Table house-style check passed.');
