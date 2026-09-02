---
id: spatial-prisoners-dilemma
title: Spatial Prisoner's Dilemma
sidebar_position: 2
slug: /evolved-cooperation/spatial-prisoners-dilemma
---

import EvolvedCooperationCaseStudiesTable from '@site/src/components/EvolvedCooperationCaseStudiesTable';
import SpatialPrisonersDilemmaReplay from '@site/src/components/SpatialPrisonersDilemmaReplay';
import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/spatial_prisoners_dilemma" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Spatial Prisoner's Dilemma is the local-game evolved-cooperation case study on this site. It asks **what kinds of inherited response rules spread when agents repeatedly face a local Prisoner's Dilemma, can move only when isolated, and reproduce into nearby empty cells using the energy they accumulated from those games?**</div>

Related project: [zeyus-research/FLAMEGPU2-Prisoners-Dilemma-ABM](https://github.com/zeyus-research/FLAMEGPU2-Prisoners-Dilemma-ABM).

## The Puzzle

The classic Prisoner's Dilemma makes selfish temptation obvious.

- mutual cooperation is better than mutual defection
- unilateral defection beats cooperating against a cooperator
- unconditional cooperation can therefore be exploited
- unconditional defection can destroy the mutual gain that makes cooperation attractive in the first place

This model adds three complications that matter evolutionarily.

- interactions are local rather than well mixed
- successful agents reproduce into nearby empty cells
- the default encoding lets one agent use one strategy against same-trait neighbors and another against other-trait neighbors

So the question is not just whether cooperation can ever appear in a matrix game. The question is whether local selection in a sparse spatial ecology favors unconditional defection, unconditional cooperation, or more conditional inherited rules.

## What Kind Of Model This Is

This is a spatial agent ecology with **selection on inherited discrete strategies**, not a model of reasoning, bargaining, or within-lifetime learning.

It represents a toroidal lattice in which:

- each occupied cell contains one agent and empty cells remain available for later movement or reproduction
- each agent has an inherited trait label in `0..trait_count-1`
- each agent also carries inherited response rules for Prisoner's Dilemma encounters
- energy rises or falls through local game payoffs, movement cost, reproduction cost, and cost of living
- offspring inherit the parental trait and strategy encoding, optionally with mutation

One useful intuition is to imagine a population of lineages spreading across local empty space. Game success does not matter by itself. It matters because local game success changes which lineages survive long enough to reproduce into neighboring cells.

## The Frozen Replay Setup

The browser replay below is a specific seeded run from the frozen website-demo configuration, not a schematic animation. It uses:

- a `60 × 60` toroidal grid
- `576` initial agents from `16%` initial occupancy
- a hard cap of `1800` agents from `50%` carrying-capacity occupancy
- initial energy drawn from a Gaussian with mean `50.0`, standard deviation `10.0`, and minimum `5.0`
- Prisoner's Dilemma payoffs `CC = 3.0`, `CD = -1.0`, `DC = 5.0`, `DD = 0.0`
- `4` inherited trait labels
- default same-vs-other contingent encoding with `pure_strategy = false` and `strategy_per_trait = false`
- no mutation in the frozen replay run
- random seed `0`
- `200` simulation steps sampled every `4` steps

In the viewer, empty cells are beige. Occupied cells are colored by the strategy each agent uses against same-trait neighbors:

- light blue for co-op
- rust red for defect
- deep blue for tit-for-tat
- ochre for random

That means the replay is intentionally showing one layer of the state rather than every variable at once. The underlying export also keeps each agent's trait label and separate other-trait response.

## Display 1: Frozen Overview

Display 1 gives one static read of the same frozen run used by the replay below. It combines three sampled lattice states with the full same-trait strategy history from the canonical export.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
	<div style={{ width: '100%', overflow: 'hidden', border: '1px solid #D6E4F5' }}>
		<div className="blue-banner">
			<div className="blue-banner-title">Spatial Prisoner&apos;s Dilemma</div>
			<div className="blue-banner-subtitle">Frozen website-demo case with seed = 0, same-trait strategy coloring, and snapshots at steps 0, 100, and 200</div>
		</div>
		<img
			src="/evolved-cooperation/spatial-prisoners-dilemma/spatial-prisoners-dilemma-overview-body.svg"
			alt="Static overview of the frozen spatial Prisoner's Dilemma run showing lattice snapshots at steps 0, 100, and 200 together with same-trait strategy counts over time and a summary card."
			style={{ display: 'block', width: '100%', height: 'auto' }}
		/>
	</div>
	<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Frozen website-demo overview showing rapid filling, growth of same-trait tit-for-tat, and persistence of a mixed contingent regime.</figcaption>
</figure>

Three things are easiest to see in Display 1.

- the lattice fills very quickly from the sparse start to the `1800`-agent cap
- same-trait tit-for-tat becomes the largest family by the middle of the run and stays there
- the end state remains mixed rather than collapsing to one universal rule

## How One Step Works

Before introducing the formal notation later on, it helps to understand what one update does.

1. Every agent searches its eight Moore-neighborhood cells and draws a local die roll.
2. Each neighboring pair is ordered by that roll, so one side challenges and the other responds.
3. The Prisoner's Dilemma is resolved across eight directional subrounds, with directional tit-for-tat memory slots if that strategy is active.
4. Agents that played no games pay the travel cost and may compete to move into an adjacent empty cell.
5. Agents above the reproduction threshold may compete to place offspring into adjacent empty cells.
6. Newborns are appended to the population.
7. Agents beyond the hard population cap are culled.
8. Remaining non-newborn agents pay the environmental cost of living.

The evolutionary force therefore comes from a full local ecology rather than from the payoff matrix alone. Payoffs matter because they change energy, and energy matters because it changes survival and local reproduction.

## Why Conditional Strategies Matter Here

The default encoding does not force one universal rule for all encounters. Each agent can respond one way to same-trait neighbors and another way to other-trait neighbors.

That matters because:

- repeated local contact makes reciprocal strategies meaningful rather than purely abstract
- local reproduction lets successful neighborhoods clonally spread into adjacent empty space
- fallback movement helps isolated agents search for interaction opportunities early in the run
- once the world approaches the hard cap, movement fades and local encounter success does more of the selection work

In the frozen replay, this does **not** produce universal cooperation. It produces a mixed regime in which tit-for-tat becomes the largest same-trait strategy family, but co-op, random, and defect all remain present.

## Interactive Replay

The browser replay below is based on sampled frames from that same frozen configuration.

The canonical implementation and supporting export logic live in the [EvolvedCooperation](https://github.com/doesburg11/EvolvedCooperation) repository:

- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/spatial_prisoners_dilemma)
- [Core model](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_prisoners_dilemma/spatial_prisoners_dilemma.py)
- [Frozen website-demo config](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_prisoners_dilemma/config/spatial_prisoners_dilemma_website_demo_config.py)
- [Replay exporter](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_prisoners_dilemma/utils/export_github_pages_demo.py)

<SpatialPrisonersDilemmaReplay />

## Reading The Replay

This frozen run is easiest to read in three phases.

### Phase 1: a sparse world fills very quickly

At step `0`, the run starts with `576` occupied cells and mean energy `50.564`. The initial same-trait strategy mix is already varied: `141` co-op, `130` defect, `171` tit-for-tat, and `134` random. Because the world begins sparse, many agents still have empty neighboring cells available for expansion. By step `25`, the population has already risen to `1799`, mean energy has climbed to `103.966`, and same-trait tit-for-tat has grown to `613` agents while same-trait defect reaches `312`.

### Phase 2: local interaction replaces exploration

By step `50`, the world reaches the hard cap of `1800` agents and mean energy has risen further to `141.273`. At that point, movement is almost gone because most agents no longer spend whole steps isolated from play. In the canonical history, step `50` records `5345` interaction pairs but only `1` successful move. From that point onward, most of the selection pressure comes from local game payoffs and reproduction rather than from spatial exploration.

### Phase 3: a mixed conditional regime persists

The late replay is not a march to one universal rule. By step `200`, same-trait tit-for-tat is the largest same-trait family at `626`, defect is the smallest at `299`, co-op remains at `457`, and random remains at `418`. The encoding mix also stays mostly contingent rather than collapsing to pure same-and-other symmetry: `1359` agents are contingent at step `200`, versus `441` pure encodings.

So the replay does not show cooperation simply taking over. It shows a stable local ecology in which conditional reciprocity expands strongly in same-trait encounters, but multiple inherited response rules continue to coexist.

## Formal Ingredients

The narrative above is enough to follow the core result. The definitions below give the exact implementation and notation used by the underlying model.

### State Variables

- agent `i`: position `(x_i, y_i)`, energy `E_i`, trait `t_i`, strategy vector `s_i`
- directional memory slot `m_i(d)`: remembered last response used by the neighbor previously encountered in direction `d`
- empty cells: available targets for movement and local reproduction

Interpretation:

- `t_i` is a categorical inherited trait label in `0..trait_count-1`
- `s_i` stores discrete strategies for encounters with each trait category
- under the default website-demo encoding, agents effectively store one strategy for same-trait encounters and one strategy for other-trait encounters

### Strategy Encoding

Available strategies are:

- `always_cooperate`
- `always_defect`
- `tit_for_tat`
- `random`

The frozen replay uses the default contingent encoding:

- `pure_strategy = false`
- `strategy_per_trait = false`

So each agent stores one same-trait strategy and one other-trait strategy. The summary identifier is:

<p>`strategy_id = 10 × same_trait_strategy + other_trait_strategy`</p>

That is why a strategy bin such as `20` means tit-for-tat against same-trait neighbors and co-op against other-trait neighbors.

### Encounter Rule

Each step begins with a neighborhood search over the wrapped Moore neighborhood.

- each agent draws one local roll
- the higher roll challenges and the lower roll responds
- ties are broken by higher agent ID
- each directed neighborhood edge is resolved at most once per step

If tit-for-tat is active, the remembered response in the relevant directional slot is used for the next choice against that same neighbor in that same direction.

### Payoff Rule

For one pairwise encounter, the payoff matrix is:

<p>CC = 3.0<br />CD = -1.0<br />DC = 5.0<br />DD = 0.0</p>

Interpretation:

- mutual cooperation rewards both agents
- unilateral defection gives the defector the highest single-round payoff
- the cooperator against a defector is punished
- mutual defection is the zero baseline

These payoffs are added directly to agent energy before movement, reproduction, and environmental punishment are applied.

### Movement, Reproduction, And Punishment

Demographic rules in the frozen replay are:

- only agents with zero games played that step may attempt movement
- movement costs `travel_cost = 0.5`
- reproduction requires at least `reproduce_min_energy = 100.0`
- a successful birth costs `reproduce_cost = 50.0`
- births claim adjacent empty cells competitively
- newborns skip same-step cost of living
- surviving non-newborn agents pay `cost_of_living = 1.0`
- population is truncated at the hard cap implied by `carrying_capacity_fraction = 0.5`

This is what makes the model evolutionary rather than only game-theoretic. Local lineages do not just win or lose abstract payoffs. They win or lose space.

## Why This Belongs Under Evolved Cooperation

This model belongs under evolved cooperation because the changing object is an inherited strategy distribution across generations.

- agents do not learn new policies from reward during their lifetime
- offspring inherit strategy encodings and trait labels from successful parents
- the frequency of those encodings changes through local survival and reproduction
- the result is therefore population-level selection, not within-lifetime adaptation

Compared with the learned repeated Prisoner's Dilemma pages elsewhere on the site, the key difference is the timescale. Here, cooperation changes because inherited strategies become more or less common, not because an individual agent updates a policy from experience.

Within the site's evolved-cooperation set, Spatial Prisoner's Dilemma is the clearest bridge between abstract social-dilemma logic and a sparse reproducing spatial ecology.

<EvolvedCooperationCaseStudiesTable
	currentCaseStudy="spatial-prisoners-dilemma"
	displayNumber="2"
	caption="How Spatial Prisoner's Dilemma fits among the site's evolved-cooperation case studies."
/>

## Conclusions

This case study gives a clear local-selection answer to the question of how cooperation can emerge in a spatial Prisoner's Dilemma ecology.

- cooperation does not emerge here as one universal rule; the frozen run ends in a mixed ecology rather than in pure cooperation or pure defection
- the strongest directional shift in this run is toward same-trait tit-for-tat, which rises from `171` agents at step `0` to `626` by step `200`
- unconditional defection does not dominate the frozen run even though the single-shot payoff temptation is real; same-trait defect rises early but ends as the smallest same-trait family at `299`
- contingent encodings remain the majority at the end of the run, so the model favors conditional inherited responses more than it favors collapsing same-trait and other-trait behavior into one pure rule
- the broader lesson fits the rest of this section of the site: cooperation can emerge through selection when local interaction, local reproduction, and ecological turnover make certain inherited response patterns reproductively advantageous

## References

- Axelrod, R., & Hamilton, W. D. (1981). The Evolution of Cooperation. *Science*, 211(4489), 1390-1396. https://doi.org/10.1126/science.7466396
- doesburg11. (2026). *EvolvedCooperation: spatial_prisoners_dilemma module, frozen website-demo config, and replay exporter*. GitHub. https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/spatial_prisoners_dilemma