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

<figure className="site-table-figure">
  <div className="site-table-scroll">
		<table className="site-table site-table--bordered site-table--striped">
			<colgroup>
				<col style={{ width: '8%' }} />
				<col style={{ width: '30%' }} />
				<col style={{ width: '31%' }} />
				<col style={{ width: '31%' }} />
			</colgroup>
			<thead>
				<tr>
					<th>#</th>
					<th>Script</th>
					<th>Learning mechanism</th>
					<th>Extra social features</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td><a href="https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/two_timescale_reciprocity.py">two_timescale_reciprocity.py</a></td>
					<td>Simple trust update (Rescorla-Wagner style)</td>
					<td>None</td>
				</tr>
				<tr>
					<td>2</td>
					<td><a href="https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/two_timescale_q_learning.py">two_timescale_q_learning.py</a></td>
					<td>Q-learning (action-value learning)</td>
					<td>None</td>
				</tr>
				<tr>
					<td>3</td>
					<td><a href="https://github.com/doesburg11/EvolvedAndLearnedCooperation/blob/main/two_timescale_extended.py">two_timescale_extended.py</a></td>
					<td>Q-learning</td>
					<td>Reputation, partner choice, forgiveness</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption className="site-table-caption"><strong>Display 1:</strong> Three-model progression in learning and social complexity.</figcaption>
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

<figure className="site-table-figure">
  <div className="site-table-scroll">
		<table className="site-table site-table--bordered site-table--striped">
			<colgroup>
				<col style={{ width: '32%' }} />
				<col style={{ width: '18%' }} />
				<col style={{ width: '50%' }} />
			</colgroup>
			<thead>
				<tr>
					<th>Theoretical concept</th>
					<th>Status</th>
					<th>Notes</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Fast timescale — learning within lifetimes</td>
					<td>✅ Implemented</td>
					<td>All three models. Trust update (Model 1), Q-learning (Models 2–3).</td>
				</tr>
				<tr>
					<td>Slow timescale — selection across generations</td>
					<td>✅ Implemented</td>
					<td>All three models. Payoff-proportional reproduction with mutation.</td>
				</tr>
				<tr>
					<td>Selection on learning parameters</td>
					<td>✅ Implemented</td>
					<td>Evolution acts on <code>trust_prior</code>, <code>learning_rate</code>, <code>responsiveness</code>, <code>alpha</code>, <code>epsilon</code>, <code>gamma</code>, <code>initial_q_bias</code>, and social parameters.</td>
				</tr>
				<tr>
					<td>Fitness landscape smoothing by learning</td>
					<td>✅ Demonstrated</td>
					<td>Agents discover cooperation during life, raising their fitness and guiding selection toward cooperation-friendly parameters.</td>
				</tr>
				<tr>
					<td>Interaction regimes (learning accelerates / masks / opposes evolution)</td>
					<td>⚠️ Partial</td>
					<td>The one-shot vs repeated comparison tests the accelerating and masking regimes. The opposing regime (short-term defection winning) appears transiently as invasion events but is not isolated experimentally.</td>
				</tr>
				<tr>
					<td>Baldwin effect — steps 1 &amp; 2 (plasticity enables cooperation; selection favors learnability)</td>
					<td>✅ Demonstrated</td>
					<td>Agents that learn cooperation reproduce more; selection shifts the population toward parameter combinations that make learning succeed faster and more robustly.</td>
				</tr>
				<tr>
					<td>Baldwin effect — step 3 (genetic assimilation: learned behavior becomes innate)</td>
					<td>❌ Not implemented</td>
					<td>Offspring always start with reset memories. Cooperation is never directly encoded in genes — it must be relearned every generation. Assimilation would require heritable memory or a genetically fixed cooperative action.</td>
				</tr>
				<tr>
					<td>Testable prediction: repeated interaction → higher cooperation than one-shot</td>
					<td>✅ Confirmed</td>
					<td>All three models show markedly higher cooperation under repeated interaction.</td>
				</tr>
				<tr>
					<td>Testable prediction: selection favors partner-discrimination parameters</td>
					<td>✅ Confirmed</td>
					<td><code>responsiveness</code> and <code>rejection_threshold</code> evolve upward under repeated interaction.</td>
				</tr>
				<tr>
					<td>Testable prediction: reputation mechanisms outperform partner-memory in stranger-rich environments</td>
					<td>✅ Confirmed</td>
					<td>Network diversity experiment shows the extended model dominates above ~50% stranger fraction.</td>
				</tr>
				<tr>
					<td>Testable prediction: trust learning vs Q-learning produce different cooperation–payoff trade-offs</td>
					<td>✅ Confirmed</td>
					<td>Trust learning maximises cooperation rate; Q-learning maximises payoff by retaining exploration.</td>
				</tr>
			</tbody>
		</table>
	</div>
	<figcaption className="site-table-caption"><strong>Display 2:</strong> Theory–simulation correspondence.</figcaption>
</figure>
