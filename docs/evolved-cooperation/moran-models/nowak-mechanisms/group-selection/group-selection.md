---
id: group-selection
title: Group Selection
sidebar_position: 5
slug: /evolved-cooperation/group-selection
---

import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/group_selection" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Group selection adds a second level of selection on top of individual competition. Groups whose members cooperate more produce higher average fitness, and periodically the most successful group is copied into the least successful group — selection acts on groups as well as on individuals.</div>

## How It Is Implemented Here

Sites are partitioned into a fixed number of groups at initialisation. Within each step, individual Moran replacement proceeds normally based on individual fitness scores. Every `group_selection_interval` steps a **between-group event** fires: the group with the highest mean fitness is copied into the group with the lowest mean fitness, replacing all traits and lineage labels in the sink group with randomly sampled copies from the source group.

This implements a two-level selection process:

- **Within-group**: individual Moran replacement based on individual scores
- **Between-group**: periodic copying of the best group into the worst group

## Key Parameters

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--bordered site-table--striped">
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Default</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>group_count</code></td>
        <td><code>8</code></td>
        <td>Number of groups the population is divided into</td>
      </tr>
      <tr>
        <td><code>group_selection_interval</code></td>
        <td><code>25</code></td>
        <td>Steps between between-group selection events</td>
      </tr>
      <tr>
        <td><code>group_selection_mode</code></td>
        <td><code>"copy_best_group_into_worst_group"</code></td>
        <td>Between-group replacement rule</td>
      </tr>
      <tr>
        <td><code>B_plus_scale</code></td>
        <td><code>1.0</code></td>
        <td>Scales cooperative benefit produced per unit trait</td>
      </tr>
      <tr>
        <td><code>C_scale</code></td>
        <td><code>0.2</code></td>
        <td>Private cost per unit trait</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Key parameters controlling group partitioning and between-group selection.</figcaption>
</figure>

## Simulation Results

Proof-of-mechanism runs on a 24×24 grid, 5 seeds and 1000 steps each ([`utils/proof_of_mechanism.py`](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/group_selection/utils/proof_of_mechanism.py)); these hold only at the settings tested:

- **Maintenance:** started common, cooperation stayed high in 5/5 seeds (mean trait 0.950), with a von Neumann neighbourhood and a between-group event every 25 steps.
- **Spread from rare:** 2/5 seeds (mean trait 0.548); outcomes varied across seeds.
- **Without spatial clustering:** with a Moore neighbourhood (k = 8, above b/c = 5), cooperation failed and ended near zero in 5/5 seeds, both without group events (mean trait 0.010) and with them (0.012). On this grid and at these settings, group events did not make up for the loss of spatial assortment.
- **Without group events:** in an earlier run of the proof, on the von Neumann grid with group events switched off, cooperation started common was maintained in 5/5 seeds (mean trait 0.916). So group events were not needed for maintenance here, and on this grid group selection is entangled with network structure.
- **Self-routing test (2026-11-26).** Benefits here are routed uniformly over a producer and its four neighbours, so a helper gets one fifth of its own benefit back, which at b = 1 and c = 0.2 exactly covers its cost. A pre-registered rerun of the low-start comparison (8 seeds, 250 steps, nine benefit-cost cells) with the producer removed from its own routing and nothing else changed, group events included: in the four cells where helping had risen, it fell in every run (0/32 successes; mean change −0.10 to −0.11). The spread from a low start was weak altruism; group events did not carry costly cooperation at these settings. At b/c 24 one run of eight reached the criterion. Details: [RESULTS.md](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/RESULTS.md).

## Ecological Counterpart

The EvolvedCooperation repository also has an [ecological version](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/group_selection), with births, deaths, energy budgets and sexual reproduction. Groups split when they grow too large and are absorbed when they shrink, and cooperation acts through probabilistic conflicts between groups: the group with the higher mean helping trait tends to win, its adults gain energy, and part of the losing group emigrates or dies. Starting from rare helpers, 10 of its 11 scenario checks passed (5 seeds, 500 steps each). The proof reports a threshold-based invasion frequency (the share of agents above a helping threshold), population size and Qst, the share of trait variance that lies between groups; in the baseline the invasion frequency rose by 0.24, with Qst 0.13.

The failed check is the informative one. With conflicts switched off, the invasion frequency rose further (+0.32), but the population fell from about 249 to 41: the winners' energy bonus was the main source of population growth, so conflict also kept the population alive. The repository attributes that rise to same-group mating (probability 0.65), which preferentially pairs helpers within their group, a channel that works without any competition between groups and could not be removed without restructuring the demography; that attribution was not tested separately, and because the rise is measured by invasion frequency (see below), it does not by itself show that helpers spread. The ecological model therefore does not isolate group selection: its documented confound is assortative mating together with conflict-dependent demography. Because it also uses blending inheritance and a threshold measure, the invasion frequency may partly count intermediate offspring, as the repository showed for the ecological network-reciprocity model, where the mean trait stayed flat in a control whose invasion frequency still rose; the proof here does not report the mean trait, so that inflation was not tested.

Measured against the site's [definition of kin selection](/evolved-cooperation/kin-selection-progress), neither model is a kin-selection test: relatedness is not measured, and the tests were not designed to separate benefit to relatives from benefit to the helper or its group. Neither has a place in that page's stepwise table.

## Python Module Layout

```text
moran_models/nowak_mechanisms/group_selection/
  __init__.py
  group_selection_model.py
  group_selection_pygame_ui.py
  config/
    group_selection_config.py
  utils/
    proof_of_mechanism.py
  data/                       # proof-of-mechanism CSVs
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.group_selection_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.group_selection_pygame_ui
```

Proof scenarios:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.utils.proof_of_mechanism
```

## See Also

- [Spatial Altruism](/evolved-cooperation/spatial-altruism) — Mitteldorf & Wilson (2000) explicitly frame their spatial viscosity model as a group-selection argument, not a network-reciprocity one, and one of the two authors, David Sloan Wilson, is among the field's most prominent group-selection theorists. Their harsher, variable-density variants let patches dominated by altruists sustain a higher local population density than patches dominated by non-altruists — the same between-group-productivity logic this page formalizes through its own periodic best-group-into-worst-group event. The mechanism is realized very differently, though: this page partitions sites into a fixed number of discrete groups from the outset, while Mitteldorf & Wilson never define an explicit group boundary at all — patches emerge and dissolve continuously as a byproduct of the same spatial lottery that drives individual-level competition, so "group" membership there is implicit and constantly shifting rather than a fixed partition.
- [The Boyd & Richerson (2009) Culture Replication](/evolved-cooperation/boyd-richerson-2009-culture) — a *cultural* group-selection argument rather than a genetic one: the same tug-of-war between local adaptation and migration that this page's periodic best-group-into-worst-group event formalizes for a fixed number of discrete groups, but running on cultural traits across a 256-subpopulation torus, where culture's faster effective selection and lower effective migration let far more between-group variation survive than genetics ever could.

## References

- Nowak, M. A., Tarnita, C. E., & Wilson, E. O. (2010). *The evolution of eusociality*. *Nature*, 466, 1057–1062. https://doi.org/10.1038/nature09205
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
