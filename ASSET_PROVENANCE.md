# Asset Provenance

This repo should not vendor scholarly papers as static PDFs. Use canonical paper URLs instead: DOI pages, arXiv abstract pages, publisher pages, official proceedings pages, or author/institution pages.

## 2026-08-28 PDF Audit

- Removed `static/pdfs/` from the site source: 38 local PDFs, about 69 MB.
- Replaced every site link to `/pdfs/...` with a canonical external paper page in `docs/learning-selection-interaction/interaction-evolved-learned-cooperation/research-log/mindmap.md`.
- No local scholarly PDFs remain after this audit.

This audit covered bundled scholarly PDFs, which were the dominant unclear third-party assets in `static/`. It does not assert that every image, video, or replay-data file is original; those should be reviewed separately when changed.

## Policy

Keep `static/` for assets the site actually renders: site diagrams, generated figures, replay data, videos, favicon/logo files, and `CNAME`.

Before adding a third-party asset directly to `static/`, document:

- source URL
- license or reuse basis
- why linking externally is not enough
- where the asset is used on the site
