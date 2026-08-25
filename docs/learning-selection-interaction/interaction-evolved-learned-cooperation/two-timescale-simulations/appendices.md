---
id: simulations-appendices
title: Appendices
sidebar_position: 6
slug: /learning-selection-interaction/simulations/appendices
---

# Appendices

## Ecological realism of benefit > cost

*Applies to: all three models.*

The donation game uses `benefit = 3.0` and `cost = 1.0`. This does not imply free energy. It captures settings where social coordination or information transfer produces synergistic gains.

For pure resource transfer, conservation constraints imply `b <= c`. But for alarm signaling, collective defense, and division of labor, effective social benefit can exceed individual cost.

## The ring network

*Applies to: all three models. Neighbor count differs per model (see table below).*

All three models are embedded in a ring topology with repeated local encounters.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '40%' }} />
				<col style={{ width: '60%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Neighbors per agent</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 1</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>8 (4 left, 4 right)</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 2</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>2 (left and right)</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 3</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>2 (left and right)</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Ring-neighborhood sizes across the three simulation models.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/ring_network_visual.png" width="70%" alt="Ring network diagram"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Ring-lattice visualization used to communicate local repeated interactions.</figcaption>
</figure>

The ring is used because it provides repeated local interaction while minimizing additional geometric effects that are stronger on 2D lattices.

## Why compare one-shot and repeated interaction?

*Applies to: Model 1 only. Models 2 and 3 run repeated interaction only.*

Model 1 runs both:

- `lifetime_rounds = 1` (one-shot dominant)
- `lifetime_rounds = 80` (repeated interaction)

This isolates whether cooperation emerges from actual partner-history learning or from static predispositions alone.

## Cooperation mechanisms and model scope

*Applies to: all three models (with differences noted below).*

### Included

- Direct reciprocity (partner-specific learning)
- Network reciprocity (local repeated interaction)

### Out of scope

#### Kin selection

Agents do not know who their relatives are. Kin selection is not implemented in any model.

#### Population-wide indirect reciprocity

**Included in Model 3 (local form):** Agents can observe a partner's reputation score and adjust behavior accordingly.

**Not included (population-wide form):** Reputation does not spread across the entire population; only local observation.

#### Group selection

Groups do not reproduce or die as units. All selection acts on individual payoff.

## Strategic and psychological interpretation

*Applies to: Models 1 and 2 (direct comparison); Model 3 noted where relevant.*

Trust-learning tends toward high cooperation rates in repeated settings, but can be exploitable.

Q-learning tends to cooperate less often while earning more by preserving strategic selectivity and accounting for future relationship value.

The broader interpretation is that adaptive human cooperation resembles selective, future-oriented reciprocity rather than unconditional cooperation.

## Rescorla–Wagner style learning

*Applies to: Model 1 only.*

Model 1 (`two_timescale_reciprocity.py`) describes its trust update as "Rescorla–Wagner style". This appendix explains what that means.

### The Rescorla–Wagner model

The Rescorla–Wagner model (1972) is a mathematical rule for **classical conditioning**: it describes how the strength of a learned association changes after each trial.

The core update rule is:

$$\Delta V = \alpha \beta (\lambda - V)$$

Where:

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '50%' }} />
      <col style={{ width: '50%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Symbol</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$V$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Current associative strength (the learned prediction)</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$\lambda$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Maximum possible conditioning (the actual outcome)</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$(\lambda - V)$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>Prediction error</strong> — how surprised the learner is</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$\alpha$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Salience of the conditioned stimulus (learning rate)</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$\beta$</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Salience of the unconditioned stimulus (learning rate)</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Rescorla–Wagner model notation: symbols and their meanings.</figcaption>
</figure>

**Key insight:** learning only occurs when the outcome is unexpected. If $V = \lambda$, the prediction error is zero and the association does not change. Surprise drives learning; confirmation does not.

### How this maps onto Model 1

In Model 1, the trust update is:

```python
learned_trust[i, j] += alpha_i * (target_for_i - learned_trust[i, j])
```

This is structurally identical to the Rescorla–Wagner rule:

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '50%' }} />
      <col style={{ width: '50%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Model 1 term</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Rescorla–Wagner equivalent</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>learned_trust[i, j]</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$V$ — current learned prediction</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>target_for_i</code> (+1 or −1)</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$\lambda$ — actual observed outcome</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>target - learned_trust</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$(\lambda - V)$ — prediction error</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>alpha_i</code></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>$\alpha\beta$ — learning rate</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Mapping between Rescorla–Wagner terms and their Model 1 (Trust Learning) equivalents.</figcaption>
</figure>

The agent updates its trust in partner `j` in proportion to how surprised it was by `j`'s behavior. If the agent already expected cooperation and got it, trust barely moves. If the agent was betrayed unexpectedly, trust drops sharply.

### Relationship to reinforcement learning

The Rescorla–Wagner rule is the conceptual ancestor of the **TD (temporal-difference) prediction error** used in modern reinforcement learning:

$$Q \leftarrow Q + \alpha\,(r - Q)$$

The key difference is that Rescorla–Wagner describes learning about a *stimulus* (what to expect from a partner), whereas Q-learning describes learning about *actions* (what to do). Model 1 uses the simpler, stimulus-learning form; Models 2 and 3 upgrade to full action-value learning.

### Reference

Rescorla, R. A., & Wagner, A. R. (1972). A theory of Pavlovian conditioning: Variations in the effectiveness of reinforcement and nonreinforcement. In A. H. Black & W. F. Prokasy (Eds.), *Classical conditioning II: Current research and theory* (pp. 64–99). Appleton-Century-Crofts.
