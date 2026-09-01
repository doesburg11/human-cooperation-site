---
id: spatial-altruism
title: Spatial Altruism
sidebar_position: 2
slug: /evolved-cooperation/spatial-altruism
---

import SpatialAltruismReplay from '@site/src/components/SpatialAltruismReplay';
import GithubLink from '@site/src/components/GithubLink';

Spatial Altruism is this site's foundational replication of Mitteldorf & Wilson's (2000) population-viscosity model. It asks a deceptively simple question: **how can an altruistic inherited trait survive when selfish competitors enjoy the same local benefit without paying the altruist cost?**

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/spatial_altruism" />

The page is easiest to read as a sequence: first the baseline case in which selfishness wins, then the local update rule that produces that result, then the harsher setting in which altruist clusters can survive better.

## The Puzzle

If altruists help their neighborhood but selfish individuals get that help for free, selfishness should appear to have the direct advantage.

That is the starting puzzle of the model:

- altruists produce a shared local benefit,
- altruists alone pay the direct cost of producing it,
- selfish individuals can exploit that benefit without contributing.

So under ordinary dense conditions, selfish competitors should tend to win. Spatial Altruism asks whether that conclusion changes once reproduction is local and empty space becomes an active ecological competitor.

## What Kind Of Model This Is

This is a patch-based evolutionary model of **selection on inherited types**, not a model of planning, reasoning, or within-lifetime learning.

It represents a spatial population in which:

- each grid cell is either empty or occupied by one individual,
- occupied cells come in two inherited types: altruist or selfish,
- reproduction is represented by a local replacement lottery for space,
- the composition of the population changes across generations.

One useful intuition is to imagine local plants, colonies, or lineages "seeding" for nearby space. Each occupied site contributes reproductive pressure toward itself and its neighbors, and the next occupant of each site is determined by a local genetic lottery. That setup is enough to generate the two comparisons that organize the page: the baseline outcome in Display 1 and the harsher empty-space regime in Display 2.

## Display 1: The Baseline Result

Each patch has one of three visible states in the figures on this page and in the sampled browser replay:

- altruist: dark burgundy-red
- selfish: blue
- empty: light beige

Display 1 is the baseline run. It uses the same initial population mix as Display 2 and the replay below, but it does not give empty space any extra competitive help in the local lottery. The point of starting here is simple: in this baseline version, selfishness wins.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflow: 'hidden', border: '1px solid #D6E4F5' }}>
    <div className="blue-banner">
      <div className="blue-banner-title">Spatial Altruism</div>
      <div className="blue-banner-subtitle">Baseline steady-state case with harshness = 0 and disease = 0</div>
    </div>
    <img
      src="/evolved-cooperation/spatial-altruism/spatial-altruism-overview-default-body.png"
      alt="Baseline spatial altruism overview showing initial and later patch states together with population counts over time."
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Baseline steady-state run with no extra competitive help for empty space, showing selfish takeover.</figcaption>
</figure>

Two things are worth noticing immediately in Display 1:

- empty space disappears almost immediately,
- selfish patches steadily drive altruists to extinction.

That is the baseline story. If the main contest is just altruists versus selfish free-riders, selfishness takes over. In this baseline run, altruists start at `999` patches but fall to `81` by step `100` and to `0` by step `150`, while selfish patches rise to `2601`, the entire `51 × 51` world. The next step is to see how one update works, because that makes clear why the baseline behaves this way and why Display 2 behaves differently.

## How One Update Works

Before introducing the exact notation later on, it helps to understand what one generation does.

1. A focal site looks at a plus-shaped neighborhood of five sites: itself, up, down, left, and right.
2. The number of nearby altruists determines how much local social benefit is available at that focal site.
3. Each site in that neighborhood receives a fitness value: altruists pay a cost, selfish individuals do not, and empty sites may or may not receive their own competitive weight depending on the version of the model.
4. Those fitness values are added by type to form a local lottery for who occupies the focal site next.
5. In the Display 2 version, the void also receives an extra bonus term that makes emptiness more likely even when nearby occupied sites are strong.
6. The next occupant of the focal site is sampled from those lottery weights.

The model is spatial because each focal site repeats that process using only its own plus-shaped neighborhood:

- the focal patch itself,
- the patch above,
- the patch below,
- the patch to the left,
- the patch to the right.

So each local calculation uses exactly `5` patches.

Display 1 and Display 2 use this same local update structure. The difference is that Display 1 leaves empty-space pressure turned off, while Display 2 turns it on strongly.

## Why Display 2 Changes The Outcome

Display 2 changes one part of the selection environment: empty space becomes an active competitor in the local lottery.

Two terms do that work:

- `harshness` gives empty patches their own baseline competitive weight
- `disease` adds extra lottery mass favoring emptiness on top of that baseline

That changes the question. In Display 1, the main issue is whether altruists or selfish free-riders win in a dense mixed world. In Display 2, the question becomes:

**Which inherited type survives and regrows better when local neighborhoods are repeatedly thinned out by the void?**

In the Display 2 setting, the answer is: altruist clusters survive that ecological filter better than selfish free-riders.

The logic is:

- selfish patches benefit from altruists only when altruists are nearby
- selfish patches do not help maintain those beneficial neighborhoods
- altruist clusters, by contrast, support one another's local fitness
- when the void expands, selfish patches lose the support structure they were exploiting
- clustered altruists are better able to hold or recolonize the remaining occupied pockets

This is why `harshness` and `disease` do not reward altruism directly. They reward whatever survives best against the void, and under these settings that favors clustered altruists.

The contrast is strong in the canonical code-backed counterfactuals for this same Display 2 parameterization:

- with `disease = 0.0`, altruists are extinct by step `200`
- with `harshness = 0.0`, altruists are also extinct by step `200`
- with both present in the Display 2 run, altruists survive and eventually dominate the remaining occupied sites

Display 2 shows that altered selection environment.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflow: 'hidden', border: '1px solid #D6E4F5' }}>
    <div className="blue-banner">
      <div className="blue-banner-title">Spatial Altruism</div>
      <div className="blue-banner-subtitle">Frozen website-demo case with harshness = 0.96 and disease = 0.213</div>
    </div>
    <img
      src="/evolved-cooperation/spatial-altruism/spatial-altruism-overview-harshness-disease-body.png"
      alt="Spatial altruism overview with harshness and disease showing initial and later patch states together with population counts over time."
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Steady-state run with strong empty-space competition (<code>harshness = 0.96</code> and <code>disease = 0.213</code>), showing altruist survival under strong void pressure.</figcaption>
</figure>

## Reading Display 2

Display 2 is a specific seeded run, not a schematic sketch. It uses the same initial population mix as Display 1, but under much stronger empty-space pressure. The main settings are:

- initial `altruistic_probability = 0.39`
- initial `selfish_probability = 0.39`
- `benefit_from_altruism = 0.468`
- `cost_of_altruism = 0.156`
- `harshness = 0.96`
- `disease = 0.213`
- `seed = 1`

The trajectory in the chart is easiest to read in three phases.

### Phase 1: selfish patches lead in dense mixed regions

At the beginning, selfish patches exploit altruist-produced benefit without paying the altruist cost. In this run, altruists start at `999` patches and selfish patches at `1033`, but by step `25` altruists have fallen to `516` while selfish patches remain higher at `860`.

### Phase 2: the void expands and occupancy collapses

Then the empty state begins winning many local lotteries. `harshness = 0.96` makes empty sites almost as competitive as occupied ones even before the extra void term is added, and `disease = 0.213` pushes the lottery further toward emptiness. That is why the beige region spreads so rapidly and why the empty-patch curve rises from `569` initially to `1684` by step `50`, then to `1929` by step `100`.

### Phase 3: altruists survive better in the sparse regime

Once empty space dominates, selfish patches lose the altruist neighbors they were exploiting. Altruist clusters, by contrast, still support one another locally. So even though altruists lost ground early, they become the majority among the remaining occupied patches later on. In this run, altruists are only about `37.5%` of occupied patches at step `25`, but about `59.4%` by step `100`, `76.6%` by step `150`, and `87.8%` by step `200`.

So Display 2 is not showing altruism becoming intrinsically stronger than selfishness. It is showing the selection environment changing. In a dense mixed world selfishness wins locally; in a harsh, void-dominated world clustered altruists survive the ecological filter better.

## Interactive Replay

The browser replay below is based on sampled frames from the same `steady_state` configuration shown in Display 2. Those frames, the two static culling heatmaps further down this page, and the Culling Experiment numbers are all generated by the canonical implementation, which lives in the [EvolvedCooperation](https://github.com/doesburg11/EvolvedCooperation) repository:

- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/spatial_altruism)
- [Core model](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_altruism/altruism_model.py)

<SpatialAltruismReplay />

## Formal Ingredients

The story above is enough to follow the main argument of the page. The definitions below give the exact implementation and notation used by the underlying model.

### Local Benefit Rule

The altruism benefit at one patch is:

`altruism_benefit = benefit_from_altruism × (benefit_out_self + sum_of_neighbor_benefit_out) / 5`

Variable meanings:

- `altruism_benefit`: total social benefit currently available at the focal patch
- `benefit_from_altruism`: strength of the positive externality produced by altruists
- `benefit_out_self`: `1` if the focal patch is altruist, otherwise `0`
- `sum_of_neighbor_benefit_out`: number of altruist contributors in the four-neighbor set
- `5`: the focal patch plus its four neighbors

This means altruists create a benefit that is local and shared.

### Fitness Rule

Fitness depends on patch type:

- altruist patch: `fitness = (1 - cost_of_altruism) + altruism_benefit`
- selfish patch: `fitness = 1 + altruism_benefit`
- empty patch: `fitness = harshness`

Variable meanings:

- `fitness`: the reproductive weight a patch contributes to nearby lotteries
- `cost_of_altruism`: private cost paid only by altruist patches
- `harshness`: baseline weight assigned to empty patches

This is the core social dilemma:

- altruists help the neighborhood,
- selfish patches enjoy that help too,
- but only altruists pay the direct cost.

### Neighborhood Lottery

After each patch computes its fitness, the focal patch collects three local totals:

- `alt_fitness`: summed fitness contributed by altruist patches in the focal plus-neighborhood
- `self_fitness`: summed fitness contributed by selfish patches in the focal plus-neighborhood
- `harsh_fitness`: summed fitness contributed by empty patches in the focal plus-neighborhood

The local competition neighborhood is always the same five-site plus shape, but the empty-site term depends on the model variant.

For `steady_state`:

- `alt_weight = alt_fitness / fitness_sum`
- `self_weight = self_fitness / fitness_sum`
- `harsh_weight = (harsh_fitness + disease) / fitness_sum`
- `fitness_sum = alt_fitness + self_fitness + harsh_fitness + disease`

For `uniform_culling` and `compact_swath`:

- `alt_weight = alt_fitness / fitness_sum`
- `self_weight = self_fitness / fitness_sum`
- `harsh_weight = harsh_fitness / fitness_sum`
- `fitness_sum = alt_fitness + self_fitness + harsh_fitness`

Variable meanings:

- `alt_weight`: probability mass for the next patch becoming altruist
- `self_weight`: probability mass for the next patch becoming selfish
- `harsh_weight`: probability mass for the next patch becoming empty
- `disease`: extra void lottery mass `xi` used only in `steady_state`; the culling variants set `disease = 0.0`

The next generation at each patch is then sampled from those weights:

- altruist if the draw lands in `alt_weight`
- selfish if the draw lands in `self_weight`
- empty otherwise

Both still figures on this page and the replay use that same plain `steady_state` rule. The difference is parameterization:

- Display 1 shows the baseline case with no extra competitive help for empty space
- Display 2 and the replay use the same initial population mix under strong `harshness` and `disease`

The culling figures later on the page describe an extension of the model, not the mechanism shown in these steady-state displays.

## Why This Is A Foundational Replication, Not An Ecological Models Case Study

This model belongs under Evolved Cooperation because it studies cooperation through inherited variation and selection across generations, same as [Cooperative Hunting](/evolved-cooperation/cooperative-hunting), [Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma), and [Retained Benefit](/evolved-cooperation/retained-benefit) in the site's Ecological Models set. But it is filed separately, under Foundational Replications, alongside [Ackley & Littman (1994)](/evolved-cooperation/ackley-littman-1994), rather than grouped with those three.

The distinction is what the page is actually doing:

- the three Ecological Models pages are original scenarios built for this site, each inspired by the literature but not pinned to reproducing one paper's exact equations
- this page is a faithful implementation of one specific, named historical paper — Mitteldorf & Wilson (2000) — down to its exact fitness formulas, its exact three canonical variants (`steady_state`, `uniform_culling`, `compact_swath`), and its own parameter names (`harshness` for `eta`, `disease` for `xi`, both traceable to the NetLogo *Altruism* model this paper's authors' own curriculum unit produced)

There is no material model addition here beyond what the paper itself already specifies. The "Culling Variants" and "Culling Experiment" sections below extend the site's own analysis of the paper's own disturbance variants; they do not add a new mechanism the paper didn't already describe. That is precisely what "foundational replication" means on this site, and why this page moved out of Ecological Models once that became clear.

## Culling Variants

The repository now implements the full three-variant Mitteldorf-Wilson set:

- `steady_state`: void competition with continuous empty-patch lottery mass
- `uniform_culling`: scheduled random evacuation of a fixed share of sites
- `compact_swath`: scheduled clearing of one contiguous square region

The replay above remains a sampled `steady_state` run matching Display 2, but the underlying Python module also includes both disturbance variants.

## Culling Experiment

A first culling-only sweep compared `uniform_culling` and `compact_swath` under the following settings:

- `benefit_from_altruism` from `0.00` to `1.00` in steps of `0.05`
- `cost_of_altruism` from `0.00` to `0.35` in steps of `0.05`
- fixed `harshness = 0.96`
- disturbance interval `50`
- disturbance fractions `0.25` and `0.50`
- initial `altruistic_probability = 0.39`
- initial `selfish_probability = 0.39`
- `disease = 0.0` because both runs use culling variants rather than the steady-state void-lottery term
- `5` replicates per parameter set
- outcomes scored at step `1000`

Headline outcome:

- both culling variants produced coexistence regions
- `uniform_culling` was more robust overall than `compact_swath`
- the strongest gap appeared at disturbance fraction `0.50`

Measured summary from that sweep:

- mean coexistence probability was about `0.089` for `uniform_culling` and `0.057` for `compact_swath`
- mean occupied fraction was about `0.509` for `uniform_culling` and `0.400` for `compact_swath`
- at disturbance fraction `0.50`, `uniform_culling` still reached coexistence probability `1.0`, while `compact_swath` peaked at `0.8`

## Static Culling Heatmaps

The next figures fix `harshness = 0.96`, disturbance interval `50`, and disturbance fraction `0.50`. They compare the two disturbance variants over the `benefit_from_altruism` and `cost_of_altruism` plane.

### Coexistence Probability

![Uniform culling coexistence probability](/evolved-cooperation/spatial-altruism/culling_uniform_fraction_050_coexist_prob.png)

`uniform_culling` still shows parameter cells with coexistence probability `1.0` at disturbance fraction `0.50`.

![Compact swath coexistence probability](/evolved-cooperation/spatial-altruism/culling_compact_swath_fraction_050_coexist_prob.png)

`compact_swath` retains coexistence in a narrower region and does not reach `1.0` at the same disturbance level in this sweep.

### Occupied Fraction

![Uniform culling occupied fraction](/evolved-cooperation/spatial-altruism/culling_uniform_fraction_050_occupied_avg.png)

Under the same disturbance settings, `uniform_culling` preserves substantially more occupied space on average.

![Compact swath occupied fraction](/evolved-cooperation/spatial-altruism/culling_compact_swath_fraction_050_occupied_avg.png)

`compact_swath` produces a sharper occupancy collapse, consistent with a stronger recolonization bottleneck after contiguous clearing.

## Conclusions

This case study gives a conditional answer to the question of how cooperation can emerge.

- cooperation does not emerge automatically just because helping produces a shared benefit; when cooperators and free-riders are mixed together in ordinary dense conditions, the free-riders win because they get the benefit without paying the cost
- cooperation becomes more likely when the environment changes who can survive and recover; in the harsher setting on this page, empty space expands and local clusters matter more, which helps groups of cooperators persist better than isolated free-riders
- the main lesson is that cooperation here is not favored because altruism is always stronger in itself; it is favored when ecological structure makes it harder for selfish individuals to keep exploiting cooperators
- more broadly, this means the emergence of cooperation depends on context: population structure, local interaction, and environmental pressure can change whether selfishness or cooperation is selected
- the culling results point in the same direction; disturbance can sometimes preserve coexistence, and scattered clearing was more supportive of coexistence than one large contiguous cleared region in this first sweep
- this is therefore not a claim that cooperation always evolves; it is a claim that cooperation can emerge when the environment and the spatial structure protect cooperative clusters long enough for selection to favor them

## See Also: Where This Model Sits Among Nowak's Five Mechanisms

This model's relationship to Nowak's five mechanisms for the evolution of cooperation is not a single clean match. It depends on whether the question is about the *mechanics* of the implementation or about the *authors' own theoretical claim* for what those mechanics prove. Both are worth stating explicitly, because they point at different pages on this site.

Stated plainly: Spatial Altruism touches three of Nowak's five mechanisms at once, each in a different sense of "touches":

- **[Network Reciprocity](/evolved-cooperation/network-reciprocity) — an implementation match.** Read the code and this is what it looks like: a lattice, purely local interaction, no memory, no reputation, no explicit lineage tracking.
- **[Group Selection](/evolved-cooperation/group-selection) — a theoretical/rhetorical match.** The code never partitions the lattice into discrete groups, but the authors explicitly argue their result as one — altruist patches out-reproducing non-altruist patches by sustaining higher density is a between-group-productivity story, and re-opening the group-selection debate is the stated point of the paper.
- **[Kin Selection](/evolved-cooperation/kin-selection) — a mathematical match, in the plain baseline case only.** With `harshness` and `disease` both at `0`, the model's own `b > 5c` viability threshold is a direct Hamilton's-rule derivation with relatedness `r = 1/5` — no lineage tracking required, because the geometry of the five-site neighborhood does it for free.

It is not that the model "is" all three mechanisms simultaneously; it is that a single concrete model can be entered from three different angles depending on whether the question is what the code does, what the authors claim, or what the underlying math is in the simplest case. The three subsections below spell out each of those in full, with direct quotes from the paper.

### Network Reciprocity — the mechanical match

[Network Reciprocity](/evolved-cooperation/network-reciprocity) is the closest implementation-level relative. Both models share the same minimal ingredients: a lattice, purely local interaction, no memory, no reputation, no explicit lineage tracking. Cooperation, or its absence, is decided entirely by who is spatially adjacent to whom. Where they differ is scope: this page implements one specific historical model, Mitteldorf & Wilson (2000), with its own three-state lottery rule, while the Network Reciprocity page implements one of five matched, idealized routing-kernel Moran models built for direct, apples-to-apples comparison against the other four Nowak mechanisms.

### Group Selection — the authors' own claim

Mechanically similar to network reciprocity is not, however, the paper's own account of what it demonstrates. Mitteldorf & Wilson open their Discussion by directly invoking the mid-20th-century group-selection debate:

> "The academic community of evolutionists debated the character of natural selection in the 1960's and 70's, arriving at a skepticism concerning group selection that continues to inform theoretical work through the present... Perhaps the present availability of computer models is sufficient reason to re-open the group selection debate and re-examine its essential conclusions."

David Sloan Wilson, the paper's second author, is one of the most prominent group-selection (multilevel-selection) theorists in evolutionary biology. The paper's specific contribution over the earlier Wilson, Pollock & Dugatkin (1992) model is exactly the move that makes it a group-selection argument rather than a pure spatial-assortment one: letting local population density vary, so that patches dominated by altruists can sustain a higher density than patches dominated by non-altruists. In the paper's own words:

> "Viscosity supports division of the lattice into patches dominated by one or the other variety. The fitness advantage which altruists confer upon their neighborhood permits those patches dominated by altruists to establish denser populations. In the competition that takes place at patch boundaries, the greater density of altruists permits them to counteract the fitness advantage of non-altruists in close proximity, and in some cases to prevail."

That is a between-group selection story — altruist "groups" (patches) out-reproducing non-altruist "groups" by sustaining higher density — layered on top of a within-group story where individual selfish patches out-compete individual altruist patches locally. It is the same logic [Group Selection](/evolved-cooperation/group-selection) formalizes on this site, just realized continuously and spatially here rather than through that page's explicit mechanism: a fixed number of discrete groups, with the best-performing group's contents periodically copied over the worst-performing group's. Mitteldorf & Wilson never partition the lattice into groups explicitly; patches emerge and dissolve as an implicit, moving consequence of the spatial lottery itself. So the kinship with Group Selection here is theoretical and rhetorical, not an implementation match — both are arguments for multilevel selection, built two different ways.

### Kin Selection — the mechanism underneath the baseline case

There is a third thread, specific to the fixed-density baseline case shown in Display 1 above, where `harshness` and `disease` are both `0`. The paper derives its `b > 5c` viability threshold directly from Hamilton's rule, using the relatedness implied by the five-site neighborhood itself:

> "For parameters b and c that are small compared to unity, the model permits altruism to emerge whenever b>5c. This happens to be the boundary between "weak" and "strong" altruism, because 1/5 of the local benefit b contributed by each altruist is enjoyed by the altruist itself."

That `1/5` is a relatedness coefficient in disguise: an altruist is one of the five participants in its own neighborhood lottery, so it always recaptures exactly `1/5` of the benefit it creates, regardless of whether any of its four neighbors happen to be relatives in a pedigree sense. Limited dispersal manufactures that recapture rate automatically — which is the textbook mechanism [Kin Selection](/evolved-cooperation/kin-selection) is built to formalize, though that page does it explicitly, through inherited lineage labels and a routing kernel that biases benefit toward same-lineage neighbors, rather than through this page's implicit, geometry-driven relatedness.

### Net result

None of these three pages is simply "the same model as this one." Spatial Altruism sits at their intersection: implemented like Network Reciprocity, argued like Group Selection, and, in its simplest baseline form, mathematically derivable from Kin Selection's own Hamilton's-rule logic. That triangulation is itself a useful lesson about Nowak's taxonomy: the five mechanisms are a pedagogical decomposition of cooperation theory, not five mutually exclusive boxes that every real model falls cleanly into.

## References

- Mitteldorf, J., & Wilson, D. S. (2000). *Population viscosity and the evolution of altruism*. *Journal of Theoretical Biology*, 204(4), 481-496. https://doi.org/10.1006/jtbi.2000.2007
- Wilensky, U. (1998). NetLogo Altruism model. http://ccl.northwestern.edu/netlogo/models/Altruism. Center for Connected Learning and Computer-Based Modeling, Northwestern University, Evanston, IL. A NetLogo implementation of the Mitteldorf & Wilson paper: *Altruism* model (`Altruism.nlogox`), *Curricular Models / BEAGLE Evolution / EACH*. https://www.netlogoweb.org/launch#https://www.netlogoweb.org/assets/modelslib/Curricular%20Models/BEAGLE%20Evolution/EACH/Altruism.nlogox
- `EvolvedCooperation`. *ecological_models/spatial_altruism* module directory. GitHub. https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/spatial_altruism
- `EvolvedCooperation`. *ecological_models/spatial_altruism/altruism_model.py*. GitHub. https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_altruism/altruism_model.py
- `EvolvedCooperation`. *ecological_models/spatial_altruism/README.md*. GitHub. https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_altruism/README.md
