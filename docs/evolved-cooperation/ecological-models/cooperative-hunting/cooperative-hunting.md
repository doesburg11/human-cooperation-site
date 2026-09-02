---
id: cooperative-hunting
title: Cooperative Hunting
sidebar_position: 1
slug: /evolved-cooperation/cooperative-hunting
---

import EvolvedCooperationCaseStudiesTable from '@site/src/components/EvolvedCooperationCaseStudiesTable';
import CooperativeHuntingReplay from '@site/src/components/CooperativeHuntingReplay';
import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/cooperative_hunting" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the <code>cooperative_hunting</code> module in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

Cooperative Hunting is the more ecological evolved-cooperation case study on this site. It asks **how a costly inherited tendency to invest in group hunting can spread when each predator pays the cost privately, but the payoff arrives only through successful shared hunts.**

## The Puzzle

This model starts from a genuine tradeoff rather than a free cooperation bonus.

- predators with higher hunt-investment traits contribute more to coordinated hunts
- those same predators pay a higher private cooperation cost every predator tick
- predators with low investment avoid that cost but contribute less to coalition success
- offspring inherit the hunting-investment trait with mutation, so selection can shift the population over generations

So the central question is not whether predators can hunt together at all. It is whether natural selection inside a spatial food web can push an inherited cooperation trait upward despite its continuous private cost.

## What Kind Of Model This Is

This is a spatial predator-prey-grass ecology with **selection on an inherited continuous trait**, not a model of explicit reasoning, bargaining, or within-lifetime learning.

It represents a toroidal world in which:

- each cell contains a regrowing grass resource
- prey move, eat grass, reproduce, and can be hunted
- predators move, spend energy, hunt nearby prey, reproduce, and may starve
- each predator carries an inherited hunt-investment trait `h` in `[0, 1]`
- offspring inherit that trait with mutation, so ecological success changes the trait distribution over time

One useful intuition is to imagine each predator carrying a built-in tendency to invest in coalition hunting effort. Higher-investment predators can help make difficult hunts succeed, but they also drain more energy just by carrying that tendency. That setup is enough to turn cooperative hunting into an evolutionary problem rather than only a behavioral one.

## The Frozen Replay Setup

The browser replay on this page is a specific seeded run from the frozen website-demo configuration, not a schematic animation. It uses:

- a `60 × 60` toroidal grid
- `65` initial predators and `575` initial prey
- initial predator traits drawn from `[0.0, 0.15]`
- the `threshold_synergy` hunt rule
- minimum coalition size `2`
- formation threshold factor `0.5`
- execution threshold factor `0.8`
- maximum hunt success probability `0.95`
- cooperation cost per unit trait `0.02`
- random seed `0`

The replay samples the Python run every `50` steps across a `10,000`-step simulation. In the viewer, prey appear as blue squares, predators as red circles that darken with higher hunting investment, and grass as a beige-to-green field showing local resource availability.

## How One Tick Works

Before introducing the formal notation later on, it helps to understand what one ecological tick does.

1. Grass regrows in every cell up to the local maximum.
2. Each prey may move, pay metabolic and movement costs, eat one grass bite, and reproduce.
3. Each prey then checks for nearby predators, and hunting is resolved from the prey side.
4. Hunted prey and other dead prey are removed, and newborn prey are appended.
5. Each predator pays metabolic, movement, and cooperation costs, may reproduce, and may die from starvation.
6. The model records population and trait diagnostics for that step.

The evolutionary pressure comes from how these pieces interact. Predators need enough energy to survive and reproduce, but higher hunting investment only pays off when local coalitions can actually form and capture prey.

## Why Hunting Investment Can Rise

The active default hunt rule is `threshold_synergy`. It imposes a real coalition barrier rather than letting one predator smoothly scale up hunting success on its own.

Two conditions must be met before a hunt can proceed:

- the hunting group must contain at least `2` predators
- the group's combined effective contribution must clear a formation threshold tied to prey energy

If those conditions are met, success probability rises with additional group effort. That matters evolutionarily because:

- higher-trait predators contribute more effective hunting effort
- the default reward rule shares captured prey energy in proportion to contribution
- but the cooperation cost is always on, even in ticks without a successful hunt

So this model does not favor cooperation automatically. It favors cooperation only if the added hunting success and resulting reproductive advantage are strong enough to outweigh the private energetic cost of carrying a high-investment trait.

## Interactive Replay

The browser replay below is based on sampled frames from that same frozen `threshold_synergy` configuration.

The canonical implementation and supporting analysis live in the [EvolvedCooperation](https://github.com/doesburg11/EvolvedCooperation) repository:

- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/cooperative_hunting)
- [Active runtime](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/cooperative_hunting/cooperative_hunting.py)
- [Frozen website-demo config](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/cooperative_hunting/config/cooperative_hunting_website_demo_config.py)

<CooperativeHuntingReplay />

## Reading The Replay

This frozen run is easiest to read in three phases.

### Phase 1: predators begin low-cooperation but quickly exploit prey

At step `0`, the replay starts with `65` predators, `575` prey, and mean hunting investment `0.0874`, so the predator population begins with mostly low-investment hunters. Even so, the ecology quickly allows predators to expand. By step `500`, predators have risen to `185` while prey fall to `99`, and mean hunting investment has already increased to `0.1788`.

### Phase 2: selection keeps pushing the trait upward

The important point is that the trait does not stop rising after the first predator boom. By step `2000`, the replay still shows mean hunting investment increasing, now to `0.2286`, even as prey recover to `196`. By step `5000`, mean investment reaches `0.5386`. That is the signature of selection on the inherited trait: predators that can sustain successful coalition hunting are leaving more descendants.

### Phase 3: a high-cooperation predator regime emerges

By step `10000`, the replay ends with `200` predators, `286` prey, and mean hunting investment `0.8476`. So the outcome is not total prey elimination or a one-time transient spike. The run settles into an ecology where prey remain present, predators remain numerous, and the inherited hunting-investment trait has moved from a low-start range into a strongly cooperative regime.

The replay therefore shows cooperation emerging here as an evolutionary population shift, not as a one-off act of coordination. What changes over time is the distribution of inherited predator tendencies.

## Formal Ingredients

The narrative above is enough to follow the core result. The definitions below give the exact implementation and notation used by the underlying model.

### State Variables

- predator `i`: position `(x_i, y_i)`, energy `E_i`, hunt-investment trait `h_i`
- prey `j`: position `(x_j, y_j)`, energy `P_j`
- grass field: per-cell energy `G(x, y)`

Interpretation:

- `h_i` is a continuous inherited trait in `[0, 1]`
- higher `h_i` increases a predator's contribution to coordinated hunting
- higher `h_i` also increases its private per-tick cooperation cost

### Tick Structure

Each call to the main world-step function applies the ecology in this order:

1. Grass regrows, capped at the cell maximum.
2. Each prey may move, pay metabolic and movement costs, eat one grass bite, and reproduce.
3. Hunting is resolved from the prey side.
4. Dead prey and hunted prey are removed, and newborn prey are appended.
5. Each predator pays metabolic, movement, and cooperation costs, then may reproduce and may die from starvation.
6. Diagnostics are written into per-step histories.

Important implementation details:

- movement uses a Moore neighborhood with `dx, dy in {-1, 0, 1}`
- movement cost depends on realized Euclidean distance
- prey reproduction happens before hunting in the same tick
- newborn prey and newborn predators act only from the next tick onward
- predators committed to one successful hunt cannot be reused in a second successful hunt during that tick

### Hunt Mechanism

Common symbols:

- `h_i`: hunt-investment trait of predator `i`
- `E_i`: current energy of predator `i`
- `C_i = E_i × h_i`: effective contribution of predator `i`
- `W_g`: total coalition contribution, `sum of all C_i`
- `S_g`: unweighted sum of predator traits in the hunting group
- `P`: current prey energy
- `n_g`: number of predators in the hunting group

The active default is the `threshold_synergy` rule.

Formation conditions:

<p>n<sub>g</sub> ≥ n<sub>min</sub><br />W<sub>g</sub> ≥ P × α<sub>form</sub></p>

If both conditions hold, kill probability is:

<p>p<sub>kill</sub> = p<sub>max</sub> × σ(k × (W<sub>g</sub> − P × α<sub>exec</sub>))</p>

Variable meanings:

- `n_min`: minimum coalition size required to form a hunt
- `α_form`: formation effort factor
- `α_exec`: execution threshold factor
- `k`: steepness around the execution threshold
- `p_max`: maximum success probability
- `σ(z) = 1 / (1 + e<sup>−z</sup>)`

This rule creates a real coalition barrier rather than a smooth one-predator escalation.

### Reward Sharing And Private Cost

If a hunt succeeds, the captured prey energy is split across participating predators. The active default uses contribution-weighted sharing:

<p>reward<sub>i</sub> = P × C<sub>i</sub> / W<sub>g</sub></p>

Private cooperation cost is always on:

<p>cost<sub>i</sub> = c<sub>coop</sub> × h<sub>i</sub></p>

So the model combines a persistent individual cost with intermittent group hunting gains.

### Reproduction, Mutation, And Selection

Prey reproduce asexually when they exceed the prey birth threshold and pass a reproduction draw.

Predators also reproduce asexually, but their reproduction probability is scaled by crowding and prey availability:

<p>s<sub>pred,birth</sub> = max(0, 1 − N<sub>pred</sub> / K<sub>pred</sub>) × min(1, N<sub>prey</sub> / N<sub>prey,0</sub>)</p>

Variable meanings:

- `N_pred`: current predator count
- `N_prey`: current prey count
- `K_pred`: predator crowding soft cap
- `N_prey,0`: initial prey count
- `s_pred,birth`: predator reproduction scale

At predator birth:

- parent energy is halved
- the child inherits the parent's current trait
- the child is placed nearby
- with some probability the trait receives Gaussian mutation noise
- the trait is then clamped back into `[0, 1]`

This is where natural selection enters the model: higher-trait predators may gain more from coordinated hunts, but they also pay a continuous private cost, so trait frequencies change through ecological success and reproduction rather than within-lifetime learning.

### Diagnostics

The Python run collects:

- predator and prey population histories
- mean and variance of the predator hunt-investment trait
- trait statistics for successful hunters, reproducing parents, and dead predators
- macro energy-flow histories
- the final distribution of survivor traits

The integrated replay exposes a lighter subset of that state: the world grid, agent positions, and the cooperation-rate trajectory.

## Why This Belongs Under Evolved Cooperation

This model belongs under evolved cooperation because it studies cooperation through inherited variation and selection across generations.

Within the site's evolved-cooperation set, Cooperative Hunting is the most ecological agent-based case study.

<EvolvedCooperationCaseStudiesTable
	currentCaseStudy="cooperative-hunting"
	caption="How Cooperative Hunting fits among the site's evolved-cooperation case studies."
/>

## Conclusions

This case study gives a clear ecological answer to the question of how cooperation can emerge.

- cooperation does not emerge here because predators become nicer or more intelligent; it emerges because an inherited hunting-investment trait changes survival and reproduction inside a spatial food web
- the trait is costly at the individual level, so the result is not trivial; higher investment survives only when it helps predators participate in sufficiently successful group hunts to recover that cost
- the frozen replay shows exactly that kind of selection pressure; mean hunting investment rises from about `0.087` at the start to about `0.848` by step `10000`
- the end state is not pure collapse or simple prey extinction; predators and prey both remain present, but the predator population has shifted toward a much more cooperative inherited strategy
- prey also tend to form local clusters in the replay, but in this model that should be read as an emergent spatial consequence of local reproduction, movement, and predation pressure rather than as an explicitly modeled cooperative strategy by prey
- the broader lesson matches the rest of this section of the site: cooperation can emerge when the structure of interaction makes helping behavior reproductively advantageous despite its private cost

## References

- `EvolvedCooperation`. *cooperative_hunting* module directory. GitHub. https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/cooperative_hunting
- `EvolvedCooperation`. *cooperative_hunting/cooperative_hunting.py*. GitHub. https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/cooperative_hunting/cooperative_hunting.py
- `EvolvedCooperation`. *cooperative_hunting/config/cooperative_hunting_config.py*. GitHub. https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/cooperative_hunting/config/cooperative_hunting_config.py
- `EvolvedCooperation`. *cooperative_hunting/config/cooperative_hunting_website_demo_config.py*. GitHub. https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/cooperative_hunting/config/cooperative_hunting_website_demo_config.py
- `EvolvedCooperation`. *cooperative_hunting/README.md*. GitHub. https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/cooperative_hunting/README.md
