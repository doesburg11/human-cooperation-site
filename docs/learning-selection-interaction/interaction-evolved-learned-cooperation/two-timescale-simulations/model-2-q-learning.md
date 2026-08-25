---
id: simulations-model-2-q-learning
title: Model 2 - Q-learning
sidebar_position: 3
slug: /learning-selection-interaction/simulations/model-2
---

# Model 2 - Q-learning

Model 2 ([`two_timescale_q_learning.py`](https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/two_timescale_q_learning.py)) keeps the same two-timescale framework as Model 1 but replaces scalar trust with action-value learning, giving agents a more principled reinforcement-learning algorithm.

## Key findings

- Repeated-interaction payoff rises to **611** — nearly double Model 1's 313 — because Q-learning agents explicitly price in the future value of a cooperative relationship via the discount factor.
- Repeated cooperation rate is lower than Model 1 (0.56 vs 0.98). Q-learning agents keep exploring (ε ~0.11 at convergence), occasionally defecting to probe partners.
- In one-shot interaction, Q-learning achieves 0.445 cooperation — far above Model 1's zero — because `initial_q_bias` can encode a standing cooperative prior without needing learned history.
- **Trust learning maximises cooperation rate; Q-learning maximises payoff** by retaining strategic exploration and leveraging future relationship value.

## Learning during a lifetime

Each agent stores partner-specific Q-values for both actions:

```python
Q[i, j, COOPERATE]
Q[i, j, DEFECT]
```

Updates follow temporal-difference learning:

```text
new Q = old Q + alpha * (reward + gamma * max future Q - old Q)
```

Action selection is epsilon-greedy: with probability ε the agent tries a random action, otherwise it picks the higher Q-value for that partner.

## Evolution between generations

Agents inherit and mutate four RL parameters:

- `exploration_rate` (`epsilon`)
- `learning_rate` (`alpha`)
- `discount_factor` (`gamma`)
- `initial_q_bias`

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
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.445</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>0.560</strong></td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final mean payoff</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>8.150</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>611.350</strong></td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final exploration rate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.581</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.109</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final learning rate</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.353</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.180</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final discount factor</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.621</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.360</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Final initial Q-bias</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>−0.509</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.889</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Evolved parameter values and cooperation outcomes for Model 2 (Q-Learning) under one-shot and repeated interaction.</figcaption>
</figure>

### One-shot interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_one_shot_cooperation.png" width="70%" alt="Q-learning one-shot cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Model 2 cooperation trajectory in one-shot interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_one_shot_parameters.png" width="70%" alt="Q-learning one-shot parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Model 2 evolved Q-learning parameters in one-shot interaction.</figcaption>
</figure>

### Repeated interaction

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_repeated_cooperation.png" width="70%" alt="Q-learning repeated cooperation"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Model 2 cooperation trajectory in repeated interaction.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/q_repeated_parameters.png" width="70%" alt="Q-learning repeated parameters"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Model 2 evolved Q-learning parameters in repeated interaction.</figcaption>
</figure>

## Summary

**With proper Q-learning, repeated-interaction payoff rises to 611 — nearly double Model 1's 313.** Q-learning agents discount the *long-term value of the cooperative relationship*, not just a single round, making cooperation even more individually rational over time.

**Repeated cooperation rate is lower (0.56 vs 0.98).** Q-learning agents maintain higher exploration (ε = 0.11) even late in evolution, occasionally defecting to probe partners. The trust-learning model converges to near-universal cooperation because its deterministic threshold eventually locks in high `responsiveness`. The trade-off is real: trust learning maximises cooperation rate; Q-learning maximises payoff.

**Q-learning agents stay strategically selective.** They never fully stop exploring — they defect not randomly, but informationally, probing whether a partner is still worth cooperating with. Because γ > 0, they also know a good cooperative relationship has compounding future value, so they actively protect it. Q-learning agents detect and punish defectors faster, value long-term relationships more accurately, and don't blindly cooperate with everyone.

**Humans are probably closer to the Q-learning model than the trust model.** We don't cooperate unconditionally even with close partners; we maintain low-level vigilance in trusted relationships; we discount the future more heavily in unstable environments and cooperate more when the future feels secure. The high payoff of Q-learning reflects an evolutionary logic: strategic, selective cooperation with future-orientation outperforms both pure defection and unconditional cooperation.

For a deeper analysis of what this trade-off means for human psychology, see [Appendix: Strategic and psychological interpretation](./appendices#strategic-and-psychological-interpretation).

