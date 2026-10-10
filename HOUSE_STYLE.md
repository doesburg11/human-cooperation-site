# House Style Guide

This document defines a portable house style for research-oriented websites, documentation, and GitHub README pages.

It is based on the current front page of this repository, especially:

- the deep blue top banner
- the comparison table with a dark blue header
- the alternating blue-tinted table rows

## Style Direction

The site should feel:

- academic
- calm
- structured
- trustworthy
- visually led by shades of blue

The visual language should stay content-first. Blue is used to organize attention, not to overwhelm the page.

The style should remain usable in:

- Docusaurus pages
- plain Markdown documents
- GitHub README files
- other repositories with no dependency on this repo's file structure

## Core Palette

The main brand color should be the deep blue already used in the homepage top banner and table header.

<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '22%' }} />
      <col style={{ width: '18%' }} />
      <col style={{ width: '60%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Token</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Value</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Primary blue</td>
        <td><code>#0F3368</code></td>
        <td>top bar, table headers, major section accents</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Secondary blue</td>
        <td><code>#1C4B8F</code></td>
        <td>links, buttons, secondary accents</td>
      </tr>
      <tr>
        <td>Soft blue</td>
        <td><code>#78AAE6</code></td>
        <td>highlights, diagrams, subtle accents</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Pale blue surface</td>
        <td><code>#EAF2FB</code></td>
        <td>callouts, panels, gentle backgrounds</td>
      </tr>
      <tr>
        <td>Blue border</td>
        <td><code>#D6E4F5</code></td>
        <td>table borders, panel outlines</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Table stripe</td>
        <td><code>rgba(120, 170, 230, 0.16)</code></td>
        <td>alternating table rows</td>
      </tr>
      <tr>
        <td>White</td>
        <td><code>#FFFFFF</code></td>
        <td>text on dark blue surfaces</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Body text</td>
        <td><code>#1F2D3D</code></td>
        <td>main reading text</td>
      </tr>
    </tbody>
  </table>
</div>

## Top Bar And Hero Style

- The top navigation bar should use `#0F3368` as the primary background.
- Logo and title text on dark blue should be white.
- The bar should stay simple and solid rather than decorative.
- Avoid introducing unrelated accent colors into the header.
- Hero and section banners should follow the same pattern: strong blue field, white text, clean composition.
- When a generated display image uses a blue top banner, left-align the title block inside that banner rather than centering it.
- Use one full-width blue banner at the top of the display rather than a short inset strip.
- Keep the title and subtitle stacked as one left-aligned block, using the same left inset on both lines.
- Keep the subtitle inside the blue banner in white rather than placing it below the bar in body-text color.
- Keep banner height and internal padding consistent across generated display images so the subtitle does not crowd either the title above or the panel titles below.
- Banner titles and subtitles in generated display images should have enough vertical padding that they do not crowd the panel titles below.
- If a logo or emblem overlays the left edge of a blue banner, increase the title-block inset enough to keep the text clear of that overlay.

### Display Blue Banner Format

Use this as the default banner format for generated display images that follow the same treatment as Display 5 on the front page.

- If a docs page embeds a figure as a plain `<img>` pointing to a `.png`, any visible blue header bar is part of that raster asset rather than separate page chrome.
- Do not try to enforce banner house style by incrementally retouching an already-edited PNG header. Rebuild the full banner from the original source image in one pass, or move the banner treatment into MDX/HTML or SVG.
- When exact banner padding, title/subtitle spacing, and alignment need to match house style precisely, prefer an external HTML/CSS banner wrapper or an SVG/box-layout implementation over manual raster text edits.

- Background color: `#0F3368`
- Text color: `#FFFFFF`
- Banner width: full canvas width
- Banner minimum height reference: `150px` on a `1400px` wide export; scale proportionally on other canvas sizes
- Let banner height grow when the subtitle wraps or the header copy needs more vertical space; preserve padding rather than compressing the text block
- Internal padding reference for box-layout implementations: `30px 70px 30px 70px` (top right bottom left)
- Horizontal safe area reference: `70px` from both the left and right edges
- Vertical gap reference between title and subtitle blocks: `18px`
- When exact top and bottom padding matters in SVG, prefer a box-layout implementation such as `foreignObject` rather than relying on raw text baselines
- Title style: bold, `30px`, left-aligned
- Subtitle style: regular, `20px`, left-aligned
- Keep title and subtitle on the same left edge rather than offsetting one relative to the other
- Keep the banner visually flat: no gradient, shadow, border, or rounded corners
- Keep the subtitle to one line where possible; if it wraps, preserve the same left inset and add height rather than compressing the line spacing
- If a logo or emblem overlaps the left edge, move both text lines right together rather than changing their alignment independently

Default SVG structure:

```svg
<rect class="header" x="0" y="0" width="1400" height="{headerHeight}" />
<foreignObject x="0" y="0" width="1400" height="{headerHeight}">
  <div xmlns="http://www.w3.org/1999/xhtml" class="header-copy">
    <div class="header-title">Display title</div>
    <div class="header-subtitle">One-line explanatory subtitle.</div>
  </div>
</foreignObject>
```

Set `headerHeight` to at least `150` and increase it whenever the subtitle wraps or the title/subtitle block would otherwise violate the top or bottom padding.

For narrower chart displays around `900px` wide, do not reuse the large-display type scale unchanged. Use a compact variant so the banner stays subordinate to the chart body.

Compact chart-display variant reference:

- Banner minimum height reference: `100px` on a `900px` wide export
- Internal padding reference: `20px 45px 20px 45px` (top right bottom left)
- Vertical gap reference between title and subtitle blocks: `12px`
- Title style: bold, `20px`, left-aligned
- Subtitle style: regular, `14px`, left-aligned
- Use this compact variant when the figure body uses text around `18px` to `20px` and the large-display `30px` / `20px` banner would dominate the composition

Default banner typography styles:

```css
.header {
  fill: #0f3368;
}

.header-title {
  fill: #ffffff;
  font-family: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.4;
}

.header-subtitle {
  fill: #ffffff;
  font-family: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
}
```

Equivalent CSS box-layout pattern:

```css
min-height: 150px;
padding: 30px 70px 30px 70px;
gap: 18px;
```

Recommended `foreignObject` content styles for exact padding:

```css
.header-copy {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 150px;
  padding: 30px 70px 30px 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
  color: #ffffff;
  font-family: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
}

.header-title {
  font-size: 30px;
  font-weight: 700;
  line-height: 1.4;
}

.header-subtitle {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
}
```

For GitHub README usage, where an actual top bar usually does not exist:

- use a banner image, table header, or opening callout to carry the same blue identity
- keep the first visible visual element anchored in the primary blue
- use white text on dark blue only when rendered inside an image, badge, or HTML block that GitHub supports

## Table Style

Tables are part of the site's identity and should follow the front-page comparison table.

- Header row background: `#0F3368`
- Header text: white
- Header text alignment: left
- Body rows: alternate between white and `rgba(120, 170, 230, 0.16)`
- Borders: subtle and cool, using `#D6E4F5`
- Keep tables readable and editorial, not spreadsheet-heavy
- Prefer concise row labels and consistent padding

Recommended table behavior:

- full width when comparing concepts
- fixed layout when columns should align predictably
- modest padding such as `0.75rem 1rem`

### Docs-page table rule (enforced)

On docs pages, every table is a display: a `site-table` with light-blue
alternating rows (`site-table--striped`) inside a figure with a
`Display N:` caption, numbered in sequence with the page's other displays.
Plain Markdown pipe tables are not used on docs pages, because they bypass
this styling. A table that colours its own cells (by status or result) may
leave out `site-table--striped`, since row stripes would clash.
`scripts/check_tables.js` enforces this rule as the first step of
`npm run build` (and so of the deploy workflow); `npm run check-tables`
runs it on its own.

```mdx
<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Column</th><th>Column</th></tr>
    </thead>
    <tbody>
      <tr><td>Value</td><td>Value</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display N:</strong> Caption text.</figcaption>
</figure>
```

Optional classes: `site-table--bordered` (ruled cells), `site-table--wide`
(horizontal scroll for many or long columns), and a `<colgroup>` with column
widths. Inside the table, write HTML rather than Markdown (`<a href>`,
`<strong>`, `<code>`, `<em>`), and escape `<`, `>` and `&` in text.

For GitHub README pages:

- standard Markdown tables are preferred for compatibility
- if alternating row backgrounds are not supported, preserve the style through a strong blue header row and concise column structure
- do not rely on custom CSS being available

## Display Captions

- Use `Display N:` for all visual elements, including images, diagrams, charts, and tables.
- Keep captions short, sentence-style, and descriptive.
- Use the same `figcaption` formatting for all displays on a page.
- Default caption format: `<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display N:</strong> Caption text.</figcaption>`
- Center captions by default, keep `Display N:` in bold, and end caption text with a period.

## Display Spacing

- Use consistent spacing below display figures before the following paragraph or section.
- Default figure format: `<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>`
- Keep caption spacing consistent with `marginTop: '0.6rem'`.
- Treat this as the default for all display figures unless a page has a specific reason to differ.

## References

- Every docs page should end with a `## References` section.
- Place the `## References` section at the end of the page.
- Use the references section for source material rather than inline bibliography-style links in normal prose, unless inline citations are explicitly requested.
- When a page makes a source-specific empirical, historical, or textual claim, include full references in the end-of-page section.
- Match the reference style already used across the docs: author, year, title, venue or publisher, and direct link or DOI where available.
- If a page does not cite any external source, keep the `## References` heading and add `- No external references cited.`

## Typography

- Use a clean sans-serif stack consistent with the current site and Docusaurus defaults.
- Keep typography plain, readable, and professional rather than expressive.
- Headings should use the blue palette, preferably the primary blue for major headings.
- Body text should remain dark and neutral for long-form reading.
- Use bold for emphasis sparingly and structurally.

## Page Layout

- Default page background should stay white or near-white.
- Blue should provide hierarchy through headers, tables, links, and callouts.
- Leave enough whitespace around figures and sections.
- Figures should remain centered and clearly captioned.
- Cards and callouts should use pale blue backgrounds instead of saturated fills.
- Cards, panels, callouts, and other display surfaces should use sharp corners.
- Avoid rounded containers for data displays, figure frames, dashboards, and callout backgrounds.

## Working Definitions

When a page needs a **working definition**, use the same two-part pattern already established in the docs:

- first, add one normal sentence above the box that gives broad contextual framing
- then add a pale-blue callout box containing a bold `Working definition.` label followed by the concise definition
- use the standard callout colors: background `#EAF2FB`, border `#D6E4F5`, label color `#0F3368`, body text `#1F2D3D`
- keep the box visually plain and sharp-cornered, matching the site callout style
- do not add a working-definition box by default on every page; use it when explicitly requested or when the page clearly needs that framing device

Recommended Docusaurus/MDX pattern:

```mdx
Broad contextual sentence introducing the concept in plain prose.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Working definition.</strong> Concise operational definition goes here.
  </p>
</div>
```

## Links, Buttons, And UI Accents

- Links should use the secondary blue and darken on hover.
- Buttons should use the primary blue with white text.
- Hover and focus states should stay within the same blue family.
- Avoid green, purple, or bright multi-color accents unless the content itself requires them.
- Buttons, pills, inputs, and control surfaces should use sharp corners rather than rounded shapes.
- When CSS is available, prefer `border-radius: 0` for buttons, panels, inputs, and display containers.

For GitHub README pages:

- use blue shields, badges, or linked images instead of CSS-styled buttons
- prefer simple Markdown links over custom HTML unless HTML is clearly needed

## Content Tone In Design

The site is closer to a research publication than a marketing page.

- prefer clarity over decoration
- prefer diagrams, figures, and tables over ornamental UI
- prefer restrained blue emphasis over many competing colors
- prefer consistency across docs pages

The same tone should hold across repositories:

- serious rather than promotional
- structured rather than decorative
- transferable rather than tied to one implementation stack

## Portability Rules

This house style must be usable outside this repository.

- Do not depend on repo-specific relative paths inside the guide.
- Do not require Docusaurus-only components for the style to make sense.
- When examples are given, prefer plain Markdown or generic CSS.
- If a design element only works in one platform, provide a portable fallback.
- Prefer reusable color tokens and layout rules over references to specific files.

## GitHub README Compatibility

When this style is applied in a GitHub README:

- use plain Markdown first
- use tables as the main structured visual device
- use banner images when a strong header treatment is needed
- assume custom CSS is unavailable
- assume layout control is limited

This means the core identity should survive even in a minimal environment:

- deep blue primary color
- white or near-white background
- structured tables
- restrained, publication-like presentation

## Implementation Starter For CSS-Based Sites

When the style is applied in CSS, use blue theme tokens instead of the current default green Docusaurus tokens.

```css
:root {
  --ifm-color-primary: #0f3368;
  --ifm-color-primary-dark: #0c2c5a;
  --ifm-color-primary-darker: #0b2953;
  --ifm-color-primary-darkest: #092145;
  --ifm-color-primary-light: #16407d;
  --ifm-color-primary-lighter: #1c4b8f;
  --ifm-color-primary-lightest: #2a60ad;

  --site-blue-strong: #0f3368;
  --site-blue-mid: #1c4b8f;
  --site-blue-soft: #78aae6;
  --site-blue-surface: #eaf2fb;
  --site-blue-row: rgba(120, 170, 230, 0.16);
  --site-blue-border: #d6e4f5;
  --site-body-text: #1f2d3d;
}

.navbar {
  background: var(--site-blue-strong);
}

table thead th {
  background: var(--site-blue-strong);
  color: #fff;
  text-align: left;
}

table tbody tr:nth-child(even) {
  background: var(--site-blue-row);
}

.button,
.card,
.panel,
input,
select,
textarea {
  border-radius: 0;
}
```

## Practical Rule

If a new page, component, or table does not look like it belongs next to the current front page, it should be revised until it matches this blue, structured, publication-style visual language.

---

## Simulation and experiment page structure

Every simulation page and experiment page must follow this section order:

```
1. Front matter (id, title, sidebar_position, slug)
2. Page title (H1)
3. One-line description of what the script does
4. Key findings        ← short bullets, placed BEFORE the technical description
5. Model-specific technical sections
   - Learning during a lifetime
   - Evolution between generations
   - Extra sections as needed (new parameters, payoff structure, etc.)
6. Results summary     ← table + plots
   - One-shot interaction (if applicable)
   - Repeated interaction (if applicable)
7. Summary             ← elaborate prose conclusions, placed AFTER results
```

### Key findings

- Placed **immediately after the page intro**, before any technical description.
- Short scannable bullet list — typically 3–6 bullets.
- Each bullet states a concrete result in plain language, with numbers included.
- No sub-bullets. No hedging qualifiers like "appears to suggest".
- Example:

```markdown
## Key findings

- Cooperation collapses to zero in one-shot interaction; selection drives `trust_prior` strongly negative (−0.86).
- In repeated interaction, cooperation stabilises near 98% within ~40 generations.
- `responsiveness` is the key evolved trait: high responsiveness makes reciprocity sharp and stable.
- The two timescales reinforce each other: learning needs evolution to shape its parameters, and evolution needs learning to produce the cooperation signal it selects on.
```

### Summary

- Placed at the **end of the page**, after all results and plots.
- Elaborate prose — typically 3–6 bold-lead sentences followed by explanation.
- Explains *why* the results look the way they do, not just *what* they are.
- Connects results to human psychology or evolutionary biology where appropriate.
- Uses bold lead sentences for scanability:

```markdown
## Summary

**Cooperation rate is lower than in the basic Q-learning model (0.38 vs 0.56).** This is not a failure...

**Forgiveness evolves to be high (0.76) in the repeated case.** Agents that recover quickly...
```

### Appendix cross-references

- Place appendix links inline in the relevant technical section, not in a separate list at the bottom.
- Pattern: `see [Appendix: Name](/path#anchor)`.

### Figures

- All figures use JSX `<figure>` with `<figcaption>`.
- Caption format: `**Display N:** Short description of what is shown.`
- Width: `70%` for single-model plots, `80%` for multi-model comparison plots.

### Tables

- Tables follow the docs-page table rule below: never plain Markdown pipe syntax.
- Metric names match the script output exactly (e.g. `Final cooperation rate`).
- Bold the winning value per row where a comparison is meaningful.

### Tone

- Precise and direct. State what happened, then explain why.
- Avoid hedging ("appears to", "might suggest").
- Human/evolutionary implications are welcome but kept clearly separate from the numerical results.
