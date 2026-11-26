---
id: network-reciprocity
title: Network Reciprocity
sidebar_position: 4
slug: /evolved-cooperation/network-reciprocity
---

import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/network_reciprocity" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Network reciprocity is cooperation sustained by population structure. When interactions are restricted to a local neighborhood rather than the whole population, cooperators can form clusters that shield each other from exploitation by defectors — the network does the work that memory or reputation does in reciprocity models.</div>

## How It Is Implemented Here

The positive routing kernel is **uniform over local grid neighbors** with no additional bias. The mechanism relies entirely on the spatial grid structure: the von Neumann or Moore neighborhood restricts who receives cooperative benefit and who competes for reproduction. Cooperator clusters that form through local reproduction maintain higher average fitness within the cluster than the surrounding population, allowing the cluster to expand.

There is no memory, reputation, or lineage bias — the only structural ingredient is the local neighborhood.

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
        <td><code>positive_kernel_mode</code></td>
        <td><code>"uniform"</code></td>
        <td>Uniform routing over local neighbors</td>
      </tr>
      <tr>
        <td><code>initial_identity_count</code></td>
        <td><code>1</code></td>
        <td>Number of distinct initial lineage identities</td>
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
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Key parameters controlling spatial routing and payoff scaling in the network reciprocity model.</figcaption>
</figure>

## Simulation Results

Proof-of-mechanism runs on a 24×24 grid, 5 seeds and 1000 steps each ([`utils/proof_of_mechanism.py`](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/network_reciprocity/utils/proof_of_mechanism.py)); these hold only at the settings tested:

- **Maintenance:** started common, cooperation stayed high in 5/5 seeds (mean trait 0.928) with a von Neumann neighbourhood (k = 4) and b/c = 5, above Nowak's condition b/c > k.
- **Spread from rare:** 2/5 seeds (mean trait 0.536). Outcomes varied across seeds, consistent with stochastic cluster formation.
- **Below the condition:** with b/c = 2.5 < k = 4, cooperation started at 90% and collapsed, surviving in 0/5 seeds (mean trait 0.012). With the same b/c = 5 but a Moore neighbourhood (k = 8), it collapsed too (0/5, mean trait 0.009): raising the number of neighbours, without changing payoffs, was enough to break it.
- **Self-routing test (2026-11-26).** In this engine a producer's benefit is shared over itself and its neighbours, so a helper gets one fifth of its own benefit back (one ninth with a Moore neighbourhood). At b = 1 and c = 0.2 that return exactly covers its cost; in the below-condition case and with a Moore neighbourhood it does not. A pre-registered rerun of the low-start comparison (8 seeds, 250 steps, nine benefit-cost cells) with the producer removed from its own routing and nothing else changed: in the four cells where helping had risen, it fell in every run (0/32 successes; mean change about −0.11). So the spread from a low start reported here was weak altruism, not costly cooperation. Even at b/c 16 and 24, helping without the self-route rose only slowly (no run reached the criterion in 250 steps). Details: [RESULTS.md](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/RESULTS.md).

## Network Reciprocity And Kin Selection

On a lattice where offspring are placed next to their parents, neighbours are often relatives, so network reciprocity and kin selection by viscosity work through the same clustering of helpers. The site's later tests could not separate them. In a separate kin-selection test series with a different wrapper ([later tests](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed)), uniform local routing plus local replacement, network reciprocity in that limited sense, spread in 3/20 runs at 1000 steps but 20/20 at 3000. That shows short runs can undercount eventual spread in that implementation; it does not establish that this wrapper would reach 20/20. In those runs the helper kept a share of its own benefit equal to its cost, so that spread was weak altruism: step 1 of the kin-selection [stepwise table](/evolved-cooperation/kin-selection-progress), a warm-up, not kin selection by the site's definition. Costly help to neighbours spread with local replacement (at b/c 12 and 24) and failed at b/c 12 under global-competitor replacement, a result consistent with kin selection by viscosity that was not separated from network reciprocity (step 2 of the kin-selection [stepwise table](/evolved-cooperation/kin-selection-progress), on a full grid without ecology). In the lattice [ethnocentrism model](/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model), the two are effectively descriptions of the same spatial-assortment process.

## Ecological Counterpart

The EvolvedCooperation repository also has an [ecological version](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/network_reciprocity) in continuous space, with births, deaths, energy budgets and sexual reproduction, benefits delivered to neighbours within a radius, and offspring placed near their mother. Starting from 10% rare helpers, it passed its 10 scenario checks (5 seeds, 500 steps each; three are controls that pass when cooperation does not spread). The effect was modest: in the baseline the mean helping trait rose by 0.013 and the frequency of high helpers by 0.19. The repository notes that in this model the high-helper frequency is inflated by blending inheritance in short runs, and treats mean-trait change as the reliable signal.

Its ablations pointed to offspring placement. With offspring placed at random, the mean trait fell (−0.021). With benefits spread uniformly over the whole population instead of to spatial neighbours, the high-helper frequency still rose by 0.13, but on the reliable measure, the mean trait, it was flat (+0.001 against +0.013 in the baseline), so spreading benefits uniformly removed most of the small rise. With 5 seeds and no statistical test, these runs do not establish whether local benefit routing is needed. Measured against the site's definition of kin selection, this model is step 8 of the [stepwise table](/evolved-cooperation/kin-selection-progress): costly help with no return to the helper, but no tracked relatedness and too small a rise to count.

## Python Module Layout

```text
moran_models/nowak_mechanisms/network_reciprocity/
  __init__.py
  network_reciprocity_model.py
  network_reciprocity_pygame_ui.py
  config/
    network_reciprocity_config.py
  utils/
    proof_of_mechanism.py
  data/                       # proof-of-mechanism CSVs
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.network_reciprocity.network_reciprocity_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.network_reciprocity.network_reciprocity_pygame_ui
```

Proof scenarios:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.network_reciprocity.utils.proof_of_mechanism
```

## See Also

- [Spatial Altruism](/evolved-cooperation/spatial-altruism) — a concrete historical model, Mitteldorf & Wilson (2000), that is *mechanically* the closest real-world relative of this page: a lattice, purely local interaction, no memory or reputation. That page's own "See Also" section goes further and argues the paper's authors actually frame their result as a Group Selection argument (patches of altruists sustaining higher density than patches of non-altruists), not a network-reciprocity one — worth reading if the mechanical similarity here seems too tidy.

## References

- Ohtsuki, H., Hauert, C., Lieberman, E., & Nowak, M. A. (2006). *A simple rule for the evolution of cooperation on graphs and social networks*. *Nature*, 441, 502–505. https://doi.org/10.1038/nature04605
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
