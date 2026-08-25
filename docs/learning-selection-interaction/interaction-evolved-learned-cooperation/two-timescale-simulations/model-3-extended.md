---
id: simulations-model-3-extended
title: Model 3 - Extended (Reputation, Partner Choice, Forgiveness)
sidebar_position: 4
slug: /learning-selection-interaction/simulations/model-3
---

# Model 3 - Extended

Model 3 ([`two_timescale_extended.py`](https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/two_timescale_extended.py)) adds three social mechanisms on top of Q-learning: reputation, partner choice (interaction refusal), and forgiveness after betrayal.

## Key findings

- Cooperation rate is lower than in Model 2 (0.38 vs 0.56) — not a failure, but a shift to *conditional cooperation with active monitoring*.
- The rejection threshold evolves to be lenient (−0.69), meaning agents rarely exclude partners. But when they do, excluded agents lose further reputation, which compounds.
- Forgiveness evolves high (0.76 in repeated play) — agents that recover quickly from betrayals maintain more cooperative relationships over time.
- Reputation weight evolves modest (0.38) — public reputation is used as a weak prior for strangers; personal Q-history takes over once direct experience exists.
- Initial Q-bias goes negative (−0.52) in repeated play — agents are calibrated suspicious of strangers, relying on reputation to shift that prior upward for well-reputed partners.

## Learning during a lifetime

Agents still update partner-specific Q-values, but now also:

- **Reputation**: after each interaction both agents update a publicly visible reputation score for their partner. Other agents read this score before meeting a stranger.
- **Partner choice**: before accepting an interaction, an agent checks the partner's reputation against its evolved `rejection_threshold`. If the partner falls below it, the interaction is refused — the partner earns no payoff and loses further reputation.
- **Forgiveness**: after a betrayal the Q-value for the defecting partner is penalised. Each subsequent round the penalty decays toward zero at a rate set by the evolved `forgiveness_rate`, allowing the relationship to recover.

## Evolution between generations

Agents inherit Model 2 parameters plus three social parameters:

- `rejection_threshold`
- `forgiveness_rate`
- `reputation_weight`

### How the social parameters interact

- **Reputation** alone has no teeth unless agents can act on it.
- **Partner choice** gives reputation teeth: agents below the rejection threshold receive no benefit and lose further reputation.
- **Forgiveness** prevents partner choice from leading to permanent exclusion. Agents who start cooperating again gradually recover their Q-value relationship with a betrayed partner.

Together they form a coherent social-cognitive system: *assess strangers by reputation, exclude persistent defectors, repair relationships with those who reform.*

## Results summary

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Metric</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>One-shot</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Repeated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final cooperation rate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.450</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>0.380</strong></td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final mean payoff</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>4.100</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>288.120</strong></td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final exploration rate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.717</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.073</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final learning rate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.353</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.514</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final discount factor</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.395</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.581</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final initial Q-bias</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1.222</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>−0.519</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final rejection threshold</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>−0.539</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>−0.687</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final forgiveness rate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.595</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.761</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final reputation weight</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.522</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.381</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final mean reputation</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.023</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.016</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Evolved parameter values and cooperation outcomes for Model 3 (Extended) under one-shot and repeated interaction.</figcaption>
</figure>

### One-shot interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_one_shot_cooperation.png" width="70%" alt="Extended model one-shot cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Model 3 cooperation trajectory in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_one_shot_ql_params.png" width="70%" alt="Extended model one-shot Q-learning parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Model 3 evolved Q-learning parameters in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_one_shot_social_params.png" width="70%" alt="Extended model one-shot social parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Model 3 evolved social parameters in one-shot interaction.</figcaption>
</figure>

### Repeated interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_repeated_cooperation.png" width="70%" alt="Extended model repeated cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Model 3 cooperation trajectory in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_repeated_ql_params.png" width="70%" alt="Extended model repeated Q-learning parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Model 3 evolved Q-learning parameters in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ext_repeated_social_params.png" width="70%" alt="Extended model repeated social parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Model 3 evolved social parameters in repeated interaction.</figcaption>
</figure>

## Summary

**Cooperation rate is lower than in the basic Q-learning model (0.38 vs 0.56).** This is not a failure of the model — it is a meaningful result. The rejection threshold evolves to be quite lenient (−0.69), meaning agents rarely exclude partners. But when they do, excluded agents lose reputation, which compounds. The resulting equilibrium is *conditional cooperation with active monitoring*, not unconditional cooperation.

**Forgiveness evolves to be high (0.76) in the repeated case.** Agents that recover quickly from betrayals maintain more cooperative relationships over time. This matches the human pattern: we forgive persistent partners faster than strangers, because the long-term value of the relationship outweighs the cost of a single defection.

**Reputation weight evolves to be modest (0.38).** Agents use public reputation as a weak prior for unknowns, but rely more on personal Q-learning history once they have direct experience. This mirrors how humans use social proof: it matters most when we have *no* personal experience with someone.

**Initial Q-bias goes negative (−0.52) in repeated play.** Agents start slightly pessimistic about new partners, but rely on their evolved `reputation_weight` to shift that prior upward for well-reputed strangers. This is *calibrated suspicion* — not naive trust, not paranoid rejection.

**The extended model sacrifices some payoff compared to basic Q-learning because partner rejection has a cost** — rejected interactions yield zero for both parties. But it gains robustness: defectors are excluded before they can extract many benefits. The three mechanisms form a coherent social-cognitive system that mirrors how human cooperation scales beyond small trusted groups.

