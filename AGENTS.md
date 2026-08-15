# Repository Instructions

## House Style

Follow `HOUSE_STYLE.md` for docs presentation conventions, including display formatting, captions, spacing, and references.

## Documentation Reference Style

Follow the `## References` rules in `HOUSE_STYLE.md` for docs pages.

## Cross-Repo Mapping

- This repository (`human-cooperation-site`) is the website/documentation layer for canonical code implemented in sibling repos including `EvolvedCooperation` and `LearnedCooperation`.
- The public site `https://humanbehaviorpatterns.org/` must stay faithful to the canonical Python implementations in those source repos.
- Required code-backed mappings:
  - `spatial_altruism` page/section in this repo <-> `spatial_altruism/` in `EvolvedCooperation`
  - `cooperative_hunting` page/section in this repo <-> `cooperative_hunting/` in `EvolvedCooperation`
  - `docs/learned-cooperation/repeated-prisoners-dilemma/ppo-study.md` in this repo <-> `LearnedCooperation/`
  - `docs/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass.md` and `.../darwin-baldwin-trial-log.md` in this repo <-> `predpreygrass/evolutionary/` (canonical trial log: `predpreygrass/evolutionary/RESULTS.md`) and `predpreygrass/non_evolutionary/drive_conditioned_environment/` in `PredPreyGrass`
- The higher-level learned-cooperation pages `docs/learned-cooperation/learned-cooperation.md`, `docs/learned-cooperation/prisoners-dilemma/prisoners-dilemma.md`, and `docs/learned-cooperation/repeated-prisoners-dilemma/repeated-prisoners-dilemma.md` provide conceptual framing around the `LearnedCooperation` repeated Prisoner's Dilemma experiment family and should stay consistent with concrete claims made there.
- The Darwin/Baldwin Trial Log summarizes `PredPreyGrass/predpreygrass/evolutionary/RESULTS.md`; when that file's trial log changes (new trial, a trial's verdict changes, replication completes), update the trial-log page's ledger table and Key findings to match.
- When modifying a code-backed page/section here, check whether the corresponding Python implementation or README in the source repo also needs an update.
- When an implementation changes in `EvolvedCooperation` or `LearnedCooperation`, update the matching page here if the behavior, assumptions, or interpretation changed.

## Archive Move Rule

When moving a docs section into `docs/archive/...`, always move its related static assets into the matching archive image path as well.

Pattern:

- docs path: `docs/<section>/...` -> `docs/archive/<section>/...`
- image path: `static/img/<section>/...` -> `static/img/archive/<section>/...`

After moving, update all image references in moved docs to the new `/img/archive/...` paths.

Also preserve old URLs:

- keep or generate redirects from `/<section>/...` to `/archive/<section>/...`
- update any legacy static redirect pages (for example `static/cooperation/...`) to point directly to the new archive route instead of the old route
- update internal doc links to use the new canonical `/archive/...` path where appropriate
