# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Cross-Repo Mapping

This repo builds `https://humanbehaviorpatterns.org/` and serves as the
documentation/presentation layer for canonical Python models and experiments
implemented in sibling repos including `EvolvedCooperation` and
`LearnedCooperation`.

Current required code-backed mappings:

- `spatial_altruism` page/section here <-> `spatial_altruism/` in
  `EvolvedCooperation`
- `cooperative_hunting` page/section here <-> `cooperative_hunting/` in
  `EvolvedCooperation`
- `docs/learned-cooperation/repeated-prisoners-dilemma/ppo-study.md` here <->
  `LearnedCooperation/`
- `docs/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass.md`
  and `.../darwin-baldwin-trial-log.md` here <-> `predpreygrass/evolutionary/`
  (trial log, canonical source `predpreygrass/evolutionary/RESULTS.md`) and
  `predpreygrass/non_evolutionary/drive_conditioned_environment/` in
  `PredPreyGrass`

The higher-level learned-cooperation pages also frame the
`LearnedCooperation` repeated Prisoner's Dilemma experiment family:

- `docs/learned-cooperation/learned-cooperation.md`
- `docs/learned-cooperation/prisoners-dilemma/prisoners-dilemma.md`
- `docs/learned-cooperation/repeated-prisoners-dilemma/repeated-prisoners-dilemma.md`

When an implementation changes in a source repo, review and update the matching
page here. When the website explanation changes here, keep it faithful to the
Python implementation there.

## Installation

```bash
npm install
```

CI uses `npm ci` for reproducible installs from `package-lock.json`.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and creates the archive redirects used by the site.

## Deployment

Deployment is handled by GitHub Actions when changes are pushed to `main`.

The workflow lives at `.github/workflows/deploy-to-github-pages.yml`. It uses Node 24, installs dependencies with `npm ci`, builds with `npm run build`, verifies `build/CNAME`, uploads `build/` as a GitHub Pages artifact, and deploys it with `actions/deploy-pages`.

Check deployment status in GitHub under `Actions` -> `Deploy Site To GitHub Pages`.

## Acknowledgments

Developed with AI coding assistance from [Claude](https://claude.com/claude-code) (Anthropic), which does the implementation, with [Codex](https://openai.com/codex) (OpenAI) acting as an independent second opinion, peer-reviewing Claude's nontrivial code changes.
