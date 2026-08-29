---
id: group-selection
title: Group Selection
sidebar_position: 5
slug: /evolved-cooperation/group-selection
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the <code>moran_models/nowak_mechanisms/group_selection/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

Group selection adds a second level of selection on top of individual competition. Groups whose members cooperate more produce higher average fitness, and periodically the most successful group is copied into the least successful group — selection acts on groups as well as on individuals.

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

## Python Module Layout

```text
moran_models/nowak_mechanisms/group_selection/
  __init__.py
  group_selection_model.py
  group_selection_pygame_ui.py
  config/
    group_selection_config.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.group_selection_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.group_selection.group_selection_pygame_ui
```

## See Also

- [Spatial Altruism](/evolved-cooperation/spatial-altruism) — Mitteldorf & Wilson (2000) explicitly frame their spatial viscosity model as a group-selection argument, not a network-reciprocity one, and one of the two authors, David Sloan Wilson, is among the field's most prominent group-selection theorists. Their harsher, variable-density variants let patches dominated by altruists sustain a higher local population density than patches dominated by non-altruists — the same between-group-productivity logic this page formalizes through its own periodic best-group-into-worst-group event. The mechanism is realized very differently, though: this page partitions sites into a fixed number of discrete groups from the outset, while Mitteldorf & Wilson never define an explicit group boundary at all — patches emerge and dissolve continuously as a byproduct of the same spatial lottery that drives individual-level competition, so "group" membership there is implicit and constantly shifting rather than a fixed partition.

## References

- Nowak, M. A., Tarnita, C. E., & Wilson, E. O. (2010). *The evolution of eusociality*. *Nature*, 466, 1057–1062. https://doi.org/10.1038/nature09205
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
