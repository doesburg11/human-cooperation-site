---
id: simulations-index
title: Two-Timescale Simulations
sidebar_position: 1
slug: /learning-selection-interaction/simulations
---

# Two-Timescale Simulations

These pages document the simulation suite implemented in the companion repository and summarize what each model contributes.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
	<p style={{ margin: '0' }}>
		<strong style={{ color: '#0F3368' }}>Working definition.</strong> These simulations test how within-lifetime learning and between-generation selection jointly shape cooperation under controlled social interaction structures.
	</p>
</div>

The common architecture is:

1. Fast timescale: learning within lifetimes
2. Slow timescale: selection across generations
3. Shared topology: all three models place agents on a **ring network** — see [Appendix: The ring network](/learning-selection-interaction/simulations/appendices#the-ring-network) for the rationale and per-model neighbor counts.

## Model progression

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '8%' }} />
				<col style={{ width: '30%' }} />
				<col style={{ width: '31%' }} />
				<col style={{ width: '31%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>#</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Script</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Learning mechanism</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Extra social features</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>1</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>two_timescale_reciprocity.py</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Simple trust update (Rescorla-Wagner style)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>None</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>2</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>two_timescale_q_learning.py</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Q-learning (action-value learning)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>None</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>3</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>two_timescale_extended.py</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Q-learning</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Reputation, partner choice, forgiveness</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Three-model progression in learning and social complexity.</figcaption>
</figure>

## Navigate the simulation docs

- [Model 1: Trust Learning](/learning-selection-interaction/simulations/model-1)
- [Model 2: Q-learning](/learning-selection-interaction/simulations/model-2)
- [Model 3: Extended (reputation, partner choice, forgiveness)](/learning-selection-interaction/simulations/model-3)
- [Network diversity experiment](/learning-selection-interaction/simulations/network-diversity)
- [Appendices](/learning-selection-interaction/simulations/appendices)

## Core takeaway

Across all three models, cooperation is not a fixed trait. It is an adaptive outcome that depends on interaction structure, learning dynamics, and selective pressures acting over generations.

For which cooperation mechanisms are included and which are out of scope, see [Appendix: Cooperation mechanisms and model scope](/learning-selection-interaction/simulations/appendices#cooperation-mechanisms-and-model-scope).

---

## What the theory page predicts — and what these simulations test

The [theory page](/learning-selection-interaction/theory) sets out a broader conceptual framework than any single simulation can cover. The table below maps each theoretical concept to its status in this simulation suite.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
		<table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
			<colgroup>
				<col style={{ width: '32%' }} />
				<col style={{ width: '18%' }} />
				<col style={{ width: '50%' }} />
			</colgroup>
			<thead>
				<tr>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Theoretical concept</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Status</th>
					<th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Notes</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Fast timescale — learning within lifetimes</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Implemented</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>All three models. Trust update (Model 1), Q-learning (Models 2–3).</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Slow timescale — selection across generations</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Implemented</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>All three models. Payoff-proportional reproduction with mutation.</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Selection on learning parameters</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Implemented</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Evolution acts on <code>trust_prior</code>, <code>learning_rate</code>, <code>responsiveness</code>, <code>alpha</code>, <code>epsilon</code>, <code>gamma</code>, <code>initial_q_bias</code>, and social parameters.</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Fitness landscape smoothing by learning</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Demonstrated</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Agents discover cooperation during life, raising their fitness and guiding selection toward cooperation-friendly parameters.</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Interaction regimes (learning accelerates / masks / opposes evolution)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>⚠️ Partial</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>The one-shot vs repeated comparison tests the accelerating and masking regimes. The opposing regime (short-term defection winning) appears transiently as invasion events but is not isolated experimentally.</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Baldwin effect — steps 1 &amp; 2 (plasticity enables cooperation; selection favors learnability)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Demonstrated</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Agents that learn cooperation reproduce more; selection shifts the population toward parameter combinations that make learning succeed faster and more robustly.</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Baldwin effect — step 3 (genetic assimilation: learned behavior becomes innate)</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>❌ Not implemented</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Offspring always start with reset memories. Cooperation is never directly encoded in genes — it must be relearned every generation. Assimilation would require heritable memory or a genetically fixed cooperative action.</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Testable prediction: repeated interaction → higher cooperation than one-shot</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Confirmed</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>All three models show markedly higher cooperation under repeated interaction.</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Testable prediction: selection favors partner-discrimination parameters</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Confirmed</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><code>responsiveness</code> and <code>rejection_threshold</code> evolve upward under repeated interaction.</td>
				</tr>
				<tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Testable prediction: reputation mechanisms outperform partner-memory in stranger-rich environments</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Confirmed</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Network diversity experiment shows the extended model dominates above ~50% stranger fraction.</td>
				</tr>
				<tr>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Testable prediction: trust learning vs Q-learning produce different cooperation–payoff trade-offs</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>✅ Confirmed</td>
					<td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Trust learning maximises cooperation rate; Q-learning maximises payoff by retaining exploration.</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Theory–simulation correspondence.</figcaption>
</figure>
