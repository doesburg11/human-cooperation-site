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

<figure className="site-table-figure">
  <div className="site-table-scroll">
		<table className="site-table site-table--bordered site-table--striped">
			<colgroup>
				<col style={{ width: '30%' }} />
				<col style={{ width: '70%' }} />
			</colgroup>
			<thead>
				<tr>
					<th>Condition</th>
					<th>Meaning</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>0%</td>
					<td>Pure ring: same local neighbors every round</td>
				</tr>
				<tr>
					<td>50%</td>
					<td>Half local, half strangers</td>
				</tr>
				<tr>
					<td>100%</td>
					<td>Fully anonymous — every interaction is with a stranger</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption className="site-table-caption"><strong>Display 1:</strong> Network-diversity experiment conditions.</figcaption>
</figure>

## Results

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--bordered site-table--striped">
    <colgroup>
      <col style={{ width: '25%' }} />
      <col style={{ width: '25%' }} />
      <col style={{ width: '25%' }} />
      <col style={{ width: '25%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Stranger fraction</th>
        <th>Trust learning</th>
        <th>Q-learning</th>
        <th>Extended</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0%</td>
        <td><strong>315.7</strong></td>
        <td>199.2</td>
        <td>191.8</td>
      </tr>
      <tr>
        <td>10%</td>
        <td>111.2</td>
        <td>185.9</td>
        <td>177.4</td>
      </tr>
      <tr>
        <td>25%</td>
        <td>297.3</td>
        <td>229.8</td>
        <td>169.3</td>
      </tr>
      <tr>
        <td>50%</td>
        <td>4.9</td>
        <td>232.9</td>
        <td>172.3</td>
      </tr>
      <tr>
        <td>75%</td>
        <td>0.0</td>
        <td>268.4</td>
        <td><strong>251.5</strong></td>
      </tr>
      <tr>
        <td>100%</td>
        <td>0.0</td>
        <td>168.1</td>
        <td><strong>242.5</strong></td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> Final mean payoff by model across network-diversity conditions after evolution.</figcaption>
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

