---
id: indirect-reciprocity
title: Indirect Reciprocity
sidebar_position: 3
slug: /evolved-cooperation/indirect-reciprocity
---

import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/indirect_reciprocity" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Indirect reciprocity is cooperation sustained by reputation. Rather than requiring repeated encounters with the same individual, an agent helps others whose public reputation signals that they are good cooperators — "I help you because others are watching."</div>

## How It Is Implemented Here

Each site carries a **public reputation** score. The positive routing kernel is biased toward higher-reputation recipients:

$$
K^+_{j \to i} \propto \text{bias} + \text{reputation}_i^{\,\text{exponent}}
$$

with row normalization applied afterward. After each step, the reputation of surviving sites is updated from observed helping output:

$$
\text{rep}_i \leftarrow (1 - \omega) \times \text{rep}_{\text{parent}} + \omega \times \frac{B^+_{\text{parent}}}{\text{B\_plus\_scale}}
$$

where $\omega$ is the observation weight. Agents that help more accumulate higher reputation, which causes them to receive more routed benefit — sustaining cooperation through the public reputation channel.

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
        <td><code>reputation_default</code></td>
        <td><code>0.5</code></td>
        <td>Initial reputation for all sites</td>
      </tr>
      <tr>
        <td><code>reputation_observation_weight</code></td>
        <td><code>0.35</code></td>
        <td>How quickly reputation tracks recent helping</td>
      </tr>
      <tr>
        <td><code>reputation_kernel_bias</code></td>
        <td><code>0.10</code></td>
        <td>Minimum routing weight regardless of reputation</td>
      </tr>
      <tr>
        <td><code>reputation_kernel_exponent</code></td>
        <td><code>1.0</code></td>
        <td>Curvature of reputation-to-weight mapping</td>
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
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Key parameters controlling reputation dynamics and routing in the indirect reciprocity model.</figcaption>
</figure>

## Simulation Results

The results depend strongly on how the mechanism is implemented. All of the following hold only at the settings tested; the cross-mechanism summary is on [Nowak Mechanisms](/evolved-cooperation/nowak-mechanisms#spread-vs-maintenance).

- **Continuous reputation routing on the grid (the model above).** From a low start it met the emergence criterion (final mean trait at least 0.50 and a gain of at least 0.05) in all 9 tested benefit-cost cells (8 seeds each, 250 steps). But the grid itself supplies network-reciprocity clustering: with reputation routing switched off, cooperation still succeeded in 5/5 seeds, so this model does not isolate indirect reciprocity.
- **Self-routing test (2026-11-26).** In those runs a producer also routed part of its benefit to itself, weighted by its own reputation. A pre-registered rerun with the producer removed from its own routing and nothing else changed: helping still spread from a low start in 8 of 9 cells (66 of 72 runs), always somewhat less than with the self-route. On the same grid, uniform routing without the self-route (network reciprocity) spread in none of its cells, so the earlier reputation-off control most likely relied on the helper's own return, while the spread here is carried by help flowing towards high-reputation neighbours. The reputation signal is still perfect and free (a site's reputation tracks its own helping), so the stricter binary model below remains the reference under limited information. Details: [RESULTS.md](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/RESULTS.md).
- **Binary reputation in a well-mixed population** ([`well_mixed_binary/`](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary)). A donor helps only when it observes the recipient (with probability q) and the recipient's reputation passes a threshold, with no spatial structure. Started common, cooperation was maintained in 5/5 seeds (mean trait 0.873, with observation probability q = 0.80 above c/b = 0.20). Without reputation-gated help, maintenance dropped to 2/5. From rare it spread in 0/5 seeds, at q = 0.80 and at q = 0.05: rare cooperators help defectors, who start with a neutral reputation and return little or no help, so the cooperators pay the cost and are eliminated before reputations can separate the two. In this model indirect reciprocity is a maintenance mechanism, not an origin mechanism.

## Ecological Counterpart

The EvolvedCooperation repository also has an [ecological version](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/indirect_reciprocity): a well-mixed population with births, deaths, energy budgets and sexual reproduction, public reputation scores, help routed to observed agents above a reputation threshold, and mate choice weighted by reputation. Starting from 10% rare helpers, it passed all 10 of its scenario checks (5 seeds, 500 steps each; four of them are controls that pass when cooperation does not spread); in the baseline the frequency of high helpers rose by 0.63 and the mean helping trait by 0.04.

Its ablations located the effect in mate choice, not in routed help. With help routed at random but reputation-weighted mate choice kept, the high-helper frequency rose by 0.85; with mate choice random but reputation-gated help kept, it fell by 0.05. Under random mate choice, blending inheritance pulls the offspring of rare helpers toward the resident mean, below the reputation threshold within one generation, so the help advantage does not carry over; reputation-weighted mate choice keeps helpers pairing with helpers and preserves high-trait lineages. In this model the spread therefore runs through reputation-based assortative mating, a reproductive channel, rather than through the help-for-reputation route that defines indirect reciprocity in Nowak's sense.

Measured against the site's [definition of kin selection](/evolved-cooperation/kin-selection-progress), none of these models is a kin-selection test: help is directed by reputation, not by descent, and relatedness is not measured. The ecological model's reputation-weighted mating preserves high-trait lineages, but that works through mate choice, not through help to relatives. None of them has a place in that page's stepwise table.

## Python Module Layout

```text
moran_models/nowak_mechanisms/indirect_reciprocity/
  __init__.py
  indirect_reciprocity_model.py
  indirect_reciprocity_pygame_ui.py
  config/
    indirect_reciprocity_config.py
  well_mixed_binary/          # binary reputation, no spatial structure
    __init__.py
    indirect_reciprocity_binary_model.py
    config/
      indirect_reciprocity_binary_config.py
    utils/
      proof_of_mechanism.py
    data/                     # proof-of-mechanism CSVs
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.indirect_reciprocity.indirect_reciprocity_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.indirect_reciprocity.indirect_reciprocity_pygame_ui
```

Proof scenarios for the well-mixed binary model:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.indirect_reciprocity.well_mixed_binary.utils.proof_of_mechanism
```

## See Also

- [Indirect Reciprocity: Definition and Progress](/evolved-cooperation/indirect-reciprocity-progress): a stepwise ladder from Nowak's threshold model towards an ecological model, one pre-registered ingredient per rung, each against a shuffled-reputation control (the baseline rung 1 and the indirect-reciprocity rungs 2 to 3b met so far; rung 4a met only after a separately agreed rebase to a higher consultation probability, both attempts on the original setting having failed).
- [The McKee et al. (2023) Reputation Replication](/learned-cooperation/mckee2023) — the learned, deep-reinforcement-learning analog of this same mechanism: instead of a Moran process rewarding cooperators with a better public reputation, agents get an intrinsic reward penalty for falling behind the group's contribution average. Training currently collapses before that mechanism can be tested, in a public-goods environment ([Hughes et al. 2018](/learned-cooperation/hughes2018)'s Cleanup) that has separately failed to reproduce a different reward-shaping mechanism's headline claim — see [Evidence So Far](/evidence-so-far#non-replications).

## References

- Nowak, M. A., & Sigmund, K. (1998). *Evolution of indirect reciprocity by image scoring*. *Nature*, 393, 573–577. https://doi.org/10.1038/31225
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
