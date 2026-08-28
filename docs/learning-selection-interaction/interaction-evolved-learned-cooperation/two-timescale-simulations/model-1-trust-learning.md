---
id: simulations-model-1-trust-learning
title: Model 1 - Trust Learning
sidebar_position: 2
slug: /learning-selection-interaction/simulations/model-1
---

# Model 1 - Trust Learning

Model 1 ([`two_timescale_reciprocity.py`](https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/two_timescale_reciprocity.py)) is the baseline two-timescale model: agents update a scalar trust value per partner within a lifetime, and evolution selects on the inherited parameters that shape that learning.

## Key findings

- In one-shot interaction, cooperation collapses to zero. Selection drives `trust_prior` strongly negative (−0.86) — innate suspicion is favored because unconditional cooperators are exploited with no chance to learn.
- In repeated interaction (80 rounds), cooperation stabilises near 98% within ~40 generations.
- `responsiveness` is the decisive evolved trait (~2.46 in repeated play): agents who amplify learned trust sharply reward cooperators and punish defectors, locking in the reciprocal equilibrium.
- `learning_rate` stays low (~0.19) in both conditions — fast forgetting is not favored because stable trust relationships are valuable.
- The two timescales reinforce each other: evolution shapes the parameters that make learning effective, and learning produces the cooperation signal that selection acts on.

## Learning during a lifetime

Each agent tracks partner-specific trust:

```python
learned_trust[i, j]
```

The decision score combines inherited tendency and learned partner history:

```python
score_i = trust_prior[i] + responsiveness[i] * learned_trust[i, j]
cooperate_i = score_i > 0.0
```

The trust update rule follows a Rescorla–Wagner style prediction-error update — see [Appendix: Rescorla–Wagner style learning](/learning-selection-interaction/simulations/appendices#rescorlawagner-style-learning).

## Evolution between generations

Agents reproduce proportional to lifetime payoff. Offspring inherit and mutate:

- `trust_prior`
- `learning_rate`
- `responsiveness`

## Payoff structure

Donation-game defaults:

- `benefit = 3.0`
- `cost = 1.0`

For ecological interpretation of why benefit can exceed cost in this abstraction, see [Appendix: Ecological realism of benefit > cost](./appendices#ecological-realism-of-benefit--cost).

For one-shot versus repeated scenario rationale, see [Appendix: Why compare one-shot and repeated interaction?](./appendices#why-compare-one-shot-and-repeated-interaction).

> **Cooperation theory context:** For how this model relates to direct/network reciprocity and which mechanisms are out of scope, see [Appendix: Cooperation mechanisms and model scope](/learning-selection-interaction/simulations/appendices#cooperation-mechanisms-and-model-scope).

## Results summary

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
        <th>Metric</th>
        <th>One-shot (<code>rounds=1</code>)</th>
        <th>Repeated (<code>rounds=80</code>)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Final cooperation rate</td>
        <td>0.000</td>
        <td><strong>0.979</strong></td>
      </tr>
      <tr>
        <td>Final mean payoff</td>
        <td>0.000</td>
        <td><strong>313.300</strong></td>
      </tr>
      <tr>
        <td>Final trust prior</td>
        <td>−0.864</td>
        <td>1.447</td>
      </tr>
      <tr>
        <td>Final learning rate</td>
        <td>0.095</td>
        <td>0.186</td>
      </tr>
      <tr>
        <td>Final responsiveness</td>
        <td>1.126</td>
        <td>2.459</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Evolved parameter values and cooperation outcomes for Model 1 (Trust Learning) under one-shot and repeated interaction.</figcaption>
</figure>

### One-shot interaction

Without repeated contact, agents cannot learn who cooperates. Reciprocity never gets off the ground and cooperation collapses to zero.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/one_shot_cooperation.png" width="70%" alt="One-shot cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Model 1 cooperation trajectory in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/one_shot_traits.png" width="70%" alt="One-shot traits"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Model 1 evolved trait trajectories in one-shot interaction.</figcaption>
</figure>

### Repeated interaction

With 80 rounds per generation, cooperation stabilises near full (~98%).

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/repeated_cooperation.png" width="70%" alt="Repeated cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Model 1 cooperation trajectory in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/repeated_traits.png" width="70%" alt="Repeated traits"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Model 1 evolved trait trajectories in repeated interaction.</figcaption>
</figure>

## Summary

**In one-shot interaction, cooperation collapses to zero.** Evolution responds by driving `trust_prior` negative (−0.86): selection favors innate suspicion because unconditional cooperators are exploited. `responsiveness` stays moderate but is effectively irrelevant when there is nothing useful to learn in a single round.

**In repeated interaction, cooperation stabilises near 98%.** `trust_prior` rises to ~1.45 — selection favors agents who start out cooperative, because unconditional cooperators seed mutual cooperation with neighbors. `responsiveness` rises strongly to ~2.46 — agents who amplify what they have learned become sharply conditional, strongly rewarding cooperators and punishing defectors, reinforcing the reciprocal equilibrium.

**The dip around generation 45–55 is a classic invasion event.** A defector lineage briefly spreads, trust collapses, and cooperation crashes. The population recovers because reciprocators with high `responsiveness` re-establish cooperation faster than defectors can spread.

**The two timescales reinforce each other in the repeated case.** Learning makes cooperation individually rational *within* a lifetime. Evolution then favors the inherited traits (`trust_prior`, `responsiveness`) that make that learning work most effectively. In the one-shot case, the fast timescale provides no useful signal, so evolution strips away cooperative predispositions entirely.

