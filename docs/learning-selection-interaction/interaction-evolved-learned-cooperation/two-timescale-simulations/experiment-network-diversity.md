---
id: simulations-experiment-network-diversity
title: Experiment - Network Diversity
sidebar_position: 5
slug: /learning-selection-interaction/simulations/network-diversity
---

# Experiment - Network Diversity

This is not a new model — no new agent architecture is introduced. It takes all three existing models and runs them under systematically varied network conditions via [`experiment_network_diversity.py`](https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/experiment_network_diversity.py), testing when simple partner-memory mechanisms stop being sufficient and social infrastructure mechanisms start to dominate.

## Key findings

- Trust learning collapses completely at high stranger exposure (0.0 payoff at 75–100% strangers) — without repeated contact it has nothing to learn.
- Q-learning is robust at intermediate stranger fractions (peak payoff 268 at 75%) but drops back at 100%.
- The extended model is the only one that holds payoff above 240 at 100% strangers — reputation provides an effective prior for first encounters with unknown partners.
- **Crossover is between 50% and 75% stranger encounters.** Below that, trust learning with its simpler mechanism can win; above that, social infrastructure becomes indispensable.
- This mirrors the transition in human evolutionary history from small stable bands (direct reciprocity suffices) to anonymous market societies (reputation systems required).

## Hypothesis

In stable local neighborhoods, personal experience should be enough for cooperation. As `stranger_fraction` increases, reputation and partner choice should become more important, and the extended model should outperform simpler models.

## Design

The manipulated variable is `stranger_fraction`: the probability that each interaction slot is filled by a randomly chosen agent rather than the fixed ring neighbor.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '30%' }} />
				<col style={{ width: '70%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Condition</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Meaning</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0%</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Pure ring: same local neighbors every round</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>50%</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Half local, half strangers</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>100%</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Fully anonymous — every interaction is with a stranger</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Network-diversity experiment conditions.</figcaption>
</figure>

## Results

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
    <colgroup>
      <col style={{ width: '25%' }} />
      <col style={{ width: '25%' }} />
      <col style={{ width: '25%' }} />
      <col style={{ width: '25%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Stranger fraction</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Trust learning</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Q-learning</th>
        <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Extended</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0%</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>315.7</strong></td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>199.2</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>191.8</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>10%</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>111.2</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>185.9</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>177.4</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>25%</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>297.3</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>229.8</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>169.3</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>50%</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>4.9</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>232.9</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>172.3</td>
      </tr>
      <tr>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>75%</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.0</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>268.4</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>251.5</strong></td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>100%</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>0.0</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>168.1</td>
        <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><strong>242.5</strong></td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Final mean payoff by model across network-diversity conditions after evolution.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<img src="/img/learning-selection-interaction/simulations/experiment_network_diversity.png" width="80%" alt="Payoff versus stranger exposure across models"/>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Final payoff as stranger exposure increases across all three models.</figcaption>
</figure>

## Summary

**Trust learning collapses completely at high stranger exposure (0.0 payoff at 75–100%).** Without repeated contact with the same partners, agents cannot build the personal trust that drives cooperation. In a fully anonymous market, trust learning is helpless.

**Q-learning is robust at intermediate stranger fractions (peak 268 at 75%), but drops back at 100%.** Q-learning agents exploit the discount factor well when they meet a mix of regulars and strangers, but in a fully random environment they can't build partner-specific Q-histories either.

**The extended model is the only one that holds payoff above 240 at 100% strangers.** Reputation provides an effective prior for unknown partners — agents cooperate with well-reputed strangers and exclude poorly-reputed ones *before* any personal interaction. Partner choice is actionable *because* reputation travels ahead of the agent. This is exactly the mechanism that allows humans to trade with, lend to, and cooperate with people they have never met.

**The crossover point is between 50% and 75% stranger encounters.** Below that, trust learning with its simpler mechanism can win because personal history is sufficient. Above that, the extended model's social infrastructure becomes indispensable.

**This directly mirrors the transition in human evolutionary history.** Small stable bands (~50 people, same faces for life) → direct reciprocity and trust learning suffice. Villages, trading networks, cities (many strangers) → reputation systems, social exclusion, and forgiveness become necessary. Modern anonymous markets (completely novel partners) → reputation infrastructure (reviews, credit scores, brands, legal systems) is what makes cooperation possible at all. The simulation shows these mechanisms are not cultural add-ons — they are *evolved adaptations* to the problem of cooperating with strangers.

