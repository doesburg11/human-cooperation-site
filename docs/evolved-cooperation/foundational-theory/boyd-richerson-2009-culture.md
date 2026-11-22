---
id: boyd-richerson-2009-culture
title: The Boyd & Richerson (2009) Culture Replication
sidebar_position: 3
slug: /evolved-cooperation/boyd-richerson-2009-culture
---

import GithubLink from '@site/src/components/GithubLink';

# The Boyd & Richerson (2009) Culture Replication

<GithubLink href="https://github.com/doesburg11/BoydRicherson2009" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Ordinary group-selection theory has a well-known problem: migration between groups usually erases the between-group variation that selection needs something to act on. Boyd & Richerson (2009), "Culture and the Evolution of Human Cooperation" (<em>Phil. Trans. R. Soc. B</em>), ask why human societies nonetheless differ from each other far more than other primate groups do, and answer with a single ratio: culture can sustain a much lower migration/selection ratio than genetics ever could, preserving exactly the standing variation between groups that <a href="/evolved-cooperation/group-selection">group selection</a> requires as its raw material.</div>

## 2. The mechanism: a tug-of-war between two forces

The model is a 256-subpopulation torus, each site holding a value on 3 frequency-dependent cultural traits. Two forces pull in opposite directions every generation:

- **Selection (`s`)** — each trait is frequency-dependent: whichever variant a subpopulation already has more of gets pulled further toward that side. This force *creates and preserves* differences between neighboring subpopulations.
- **Migration (`m`)** — a fraction of each subpopulation is replaced by immigrants from its 4 nearest neighbors each generation, pulling each subpopulation toward whatever its neighbors have. This force *erases* those differences.

Which force wins is decided entirely by the ratio `m/s`: high `m/s` homogenizes the whole population into one shared culture; low `m/s` preserves a lasting patchwork of different local norms. Genetics is stuck near `m/s ≈ 25` (fast dispersal, weak selection) — enough to homogenize primate groups before real differences can build up. Culture, the paper argues, gets both a faster effective `s` (rapid social learning) and a lower effective `m` (migrants tend to assimilate to local norms rather than diluting them), letting it sustain a far lower ratio.

## 3. This site's replication

A from-scratch, independently reviewed reproduction of the paper's illustrative Section 3(b)-(c) model, with no author-released code to check against, is available in the [BoydRicherson2009](https://github.com/doesburg11/BoydRicherson2009) repository's `culture_human_cooperation/` module.

## 4. Result: reproduces, plus an independently confirmed refinement

The three panels reproduce the paper's qualitative regimes, with a disclosed clustering gap at `m/s = 0.1`: `m/s = 5` (migration-dominant) converges to a single trait combination everywhere; `m/s = 0.1` (selection-dominant, the paper's own literal ratio) produces visibly more spatial clustering, though a real, disclosed gap remains — the best of 30 seeds tried at this ratio still clusters somewhat less tightly than the paper's own published figure; `m/s = 0.5` (balanced) shows the same "mostly homogeneous, one clean domain boundary" structure as the paper's middle panel, though the boundary's shape and orientation aren't claimed to match exactly.

Beyond reproducing the published panels, the replication found a refinement the paper doesn't report: in this implementation the paper's stated boundary for homogenization (`m ≥ s`) does not act as a sharp threshold. Across 20 random seeds per ratio (20,000 generations), the share of runs that fully homogenized fell steadily as `m/s` fell — 20/20 at `m/s = 5`, 11/20 at 2, 9/20 at 1, 6/20 at 0.5 and 0/20 at 0.1 — and an independent review (Codex) running its own 20-seed sweep found the same split at `m/s` 2 and 1. So at the paper's own boundary, `m/s = 1`, whether a population homogenizes is close to a coin flip that depends on the starting condition. For seed 0, `m/s = 1` still had not homogenized after 300,000 generations, 15× the figure's run length, and repeated runs show a numerically stationary state (residual 0.0) rather than slow convergence.

This supports the paper's qualitative claim, that less migration relative to selection preserves more variation between groups, through the distribution of outcomes across seeds. It does not pin down where the threshold lies: the paper publishes no exact recursion, so the replication uses the simplest standard bistable selection map and stepping-stone migration, and another reasonable choice could place the boundary elsewhere.

## References

- Boyd, R., & Richerson, P. J. (2009). "Culture and the Evolution of Human Cooperation." *Philosophical Transactions of the Royal Society B*, 364, 3281–3288. https://doi.org/10.1098/rstb.2009.0134
