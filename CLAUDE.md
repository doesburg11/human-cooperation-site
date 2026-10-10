# Claude Code instructions

Follow `AGENTS.md` (cross-repo mapping, archive moves) and `HOUSE_STYLE.md`
(page layout) for every change to this site.

Rules that are easy to miss:

- **Tables:** every table on a docs page is a display: a `site-table` with
  light-blue alternating rows (`site-table--striped`) and a `Display N:`
  caption, numbered with the page's other displays. Never use Markdown pipe
  tables on docs pages. Template and details: `HOUSE_STYLE.md`, "Docs-page
  table rule (enforced)".
- **Figures:** every image, diagram and chart is a `Display N:` figure with
  a centered `figcaption`.
- **References:** every docs page ends with a `## References` section.
- **Before pushing:** run `npm run build`. It starts with
  `scripts/check_tables.js` and fails on any table that breaks the rule.
  Pushing to `main` deploys the public site.
