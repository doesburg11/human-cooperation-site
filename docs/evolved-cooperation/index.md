---
id: evolved-cooperation
title: Evolved Cooperation
sidebar_position: 1
slug: /evolved-cooperation
---

import EvolvedCooperationCaseStudiesTable from '@site/src/components/EvolvedCooperationCaseStudiesTable';

## Cooperation Across Generations

Evolved cooperation refers to cooperative behavior that becomes more common **through natural selection across generations**, rather than through adaptation during a single lifetime.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}><strong style={{ color: '#0F3368' }}>Working definition.</strong> Evolved cooperation concerns the spread and maintenance of cooperative traits through differential survival and reproduction across generations, rather than through within-lifetime learning alone.</p>
</div>

In this framework, populations:

- contain heritable variation in behavior,
- differ in survival and reproductive success,
- pass on traits associated with higher fitness.

This process corresponds to **evolutionary dynamics** in biology and to **selection over inherited behavioral tendencies** in population-level models.

---

## From Adaptive Policies to Inherited Strategies

Classical evolutionary models treat cooperation as a trait or strategy that can spread when it improves reproductive success under specific ecological and social conditions.

Evolved cooperation differs fundamentally from learned cooperation:

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Learned cooperation</th>
          <th>Evolved cooperation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Policy changes within lifetime</td>
          <td>Strategy frequencies change across generations</td>
        </tr>
        <tr>
          <td>Learning acts across interactions</td>
          <td>Selection acts across generations</td>
        </tr>
        <tr>
          <td>Reward shapes behavior</td>
          <td>Fitness shapes trait prevalence</td>
        </tr>
        <tr>
          <td>Adaptation is individual-level</td>
          <td>Adaptation is population-level</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Learned cooperation and evolved cooperation compared.</figcaption>
</figure>

Thus, cooperation can persist even when individuals are not explicitly "trying" to cooperate, provided cooperative traits are favored by selection.

---

## Evolutionary Dynamics as a Model of Selection

Evolutionary models describe how cooperative and defective strategies change in frequency over time under selection pressure.

Key ingredients include:

- heritability of behavioral tendencies,
- differential reproductive success,
- ecological constraints on survival,
- interaction structure (who meets whom).

Because fitness depends on interactions with other individuals, the evolutionary problem is inherently social.

This creates:

- frequency-dependent selection,
- coexistence of strategies,
- evolutionary cycling,
- context-dependent stable equilibria.

---

## Evolved Cooperation in Social Dilemmas

Evolutionary game theory shows that:

- Cooperation can spread when it yields higher inclusive or long-term fitness
- It can be undermined by defectors exploiting cooperators
- Stability often depends on structure, repeated interaction, or assortment
- Population composition changes the payoffs of each strategy

Key mechanisms include:

### Kin Selection
Cooperation evolves when helping relatives increases inclusive fitness.

### Direct and Indirect Reciprocity
Cooperation can be favored when repeated interactions or reputation make future benefits likely.

### Spatial and Network Structure
Limited mixing can protect cooperative clusters from exploitation.

These mechanisms explain how cooperation can evolve without requiring centralized control.

---

## Sequential and Ecological Contexts

In natural systems, cooperation is often embedded in **sequences of actions** and changing environments rather than one-shot interactions.

This introduces:

- delayed fitness consequences,
- ecological feedback,
- population-level outcomes emerging from local interactions.

Such settings are better captured by ecological and evolutionary simulations than by static matrix games alone.

---

## Evolved Cooperation in Model Systems

Different model systems expose different mechanisms by which cooperative tendencies may be favored by selection across generations.

Examples on this site include:

- local altruism in a spatial patch lattice ([Spatial Altruism](/evolved-cooperation/spatial-altruism)),
- an inherited investment in coordinated hunting ([Cooperative Hunting](/evolved-cooperation/cooperative-hunting)),
- inherited same-versus-other response rules in local games ([Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma)),
- a cooperation trait whose benefit is routed partly back to cooperators ([Retained Benefit](/evolved-cooperation/retained-benefit)),
- helping guided by an inherited cue of shared descent (the ethnocentrism model on the [Kin Selection](/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model) page).

In this view, cooperation is not only a behavioral pattern but also a target of **selection on underlying traits**.

---

## Instability and Evolutionary Social Dilemmas

Selected cooperation is also often fragile.

Populations can face:

- invasion by defectors,
- shifting ecological conditions,
- tradeoffs between short-term and long-term fitness,
- dependence on population density and assortment.

This leads to:

- cycles between cooperation and defection,
- polymorphic populations,
- collapses of cooperative regimes after environmental change.

Studying these instabilities is central to understanding when selection can sustain cooperation.

---

## Relation to Learned Cooperation

Selected cooperation operates on a **slower timescale** than learning within lifetimes.

This creates several possibilities:

- Evolution can shape the capacity to learn cooperative behavior.
- Learning can alter ecological conditions and therefore selection pressures.
- Plasticity can mediate the interaction between immediate adaptation and long-term evolution.

Ecological systems like [PredPreyGrass](/learning-selection-interaction/predpreygrass) provide one way to study both timescales together, while simpler spatial models isolate the selection logic more cleanly.

---

## Research Questions

The study of selected cooperation in the current model systems focuses on:

- Under what ecological conditions does cooperation spread through selection?
- How stable are cooperative traits against invasion by defectors?
- When do cooperative and defective strategies coexist evolutionarily?
- How does population structure affect evolutionary outcomes?
- How does plasticity influence the evolution of cooperation?

---

## Summary

Evolved cooperation is:

- a population-level adaptive process,
- driven by differential reproduction and survival,
- capable of stabilizing coordination under the right ecological and social conditions,
- often fragile when exploitative strategies can invade.

Understanding its dynamics is essential for explaining the **nature** component of cooperation and how it interacts with lifetime learning.

Across these model systems, evolved cooperation forms the **nature component** of a two-timescale theory of cooperation.

---

## What the Models Show So Far

As of November 2026. Each result holds only for the model and settings it was run with; the linked pages give the
controls and caveats.

- **Origin is harder than maintenance.** In the [Nowak Mechanisms](/evolved-cooperation/nowak-mechanisms) models,
  several mechanisms maintain cooperation once it is common, but fewer spread it from rare. Kin selection was the
  most biologically robust initiator tested, because its precondition, offspring staying near their parents, comes
  with local reproduction itself.
- **That spread was mostly weak altruism.** In the kin-selection model a helper keeps part of its own benefit, so
  helping has no net direct cost; help with a real net cost to the helper failed there. In a later variant with
  overlapping generations, costly help to neighbours did spread when offspring settled locally, at benefit-to-cost
  ratios of 12 and 24; at 12 it failed under global-competitor replacement. This is consistent with kin selection through viscosity, but was not separated
  from network reciprocity ([Kin Selection](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed)).
- **Ethnocentrism tracked descent.** In a Python port of the Ethnocentrism model, the share of ethnocentric agents
  (who help only their own colour) fell from 75.5% to 12.9% when colour no longer passed from parent to offspring
  (how often help was given hardly changed, 77% vs 76% of meetings), and a
  Hamilton's-rule prediction made in advance got the direction of change in helper share right in all 8
  conditions far from the threshold and in 6 of 8 close to it, with none reversed
  ([Kin cues](/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model)).
- **Kin selection through parental care held with part of the ecology, not yet all of it.** By the site's
  [broad definition](/evolved-cooperation/kin-selection#what-counts-as-kin-selection-here) (costly help to relatives by descent, offspring included), a stepwise
  rebuild from the Moran model found what the site counts as kin selection through parental care: costly care for one's own young spread from
  rare at every step through energy, starvation and limited food, also without local settlement, on an almost-full
  grid. It did not reach its endpoint once births went into free space, and costly help to non-offspring relatives was
  not carried into the ecological steps. The goal is to establish it in a full ecological setting, with births that
  need free space and agents that move in search of food; four of the nine steps towards it are achieved, both goal
  rows (care for own offspring and help to other relatives) are open, and no kin-selection experiment so far has agents that move in search of food.
  An earlier model with sexual reproduction and households could not separate helping from population survival
  ([stepwise table](/evolved-cooperation/kin-selection#what-counts-as-kin-selection-here)).
- **No cooperation without feedback.** Across the ecological case studies below, cooperation persists only where
  enough of the benefit it creates returns to cooperators or to copies of the cooperative rule; without that,
  selfish behaviour usually wins. The most direct test is a pre-registered sweep of the
  [Retained Benefit](/evolved-cooperation/retained-benefit#a-pre-registered-sweep-of-the-retained-fraction) model:
  at its demo ratio, cooperation fell without retention and rose to about 0.8 with full retention, and, in an
  exploratory look, where the rise started lined up descriptively with whether a helper's own share covers its cost.

Read together, and qualitatively: cooperation spread most often where local reproduction or interaction structure
created assortment (relatives as neighbours, partners or mates), and usually declined where the tests broke that link.

### In Plain Terms

In these models, **cooperation spread most reliably when helping paid the helper back.** Where the helper's own share of the good it does covered what helping cost it, cooperation usually spread; where the helper got back less than it paid, cooperation often faded, even when relatives nearby benefited. That is a pattern across the models, not proof that the helper's own return was the deciding cause: in several of them the design cannot fully separate it from the benefit to relatives or from local structure.

That distinction matters, because "cooperation" covers two quite different things:

- **Helping that pays for itself.** The helper ends up better off for helping, as with a shared hunt or feeding one's own children. Biologists call this *weak altruism*. This is what spread in the [Retained Benefit sweep](/evolved-cooperation/retained-benefit#a-pre-registered-sweep-of-the-retained-fraction) and in the [Moran kin-selection model](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed).
- **Genuine sacrifice.** The helper ends up worse off and only others gain. This is the hard puzzle. Explicitly costly help to neighbours spread only under a narrow set of tested conditions: relatives living right next to each other and a benefit 12 to 24 times the cost. Costly care for one's own young spread at every completed step of a stepwise move towards a more realistic ecology; that counts as kin selection through parental care under the site's [broad definition](/evolved-cooperation/kin-selection#what-counts-as-kin-selection-here), but it is the easier case, because the recipient is the helper's own offspring. And in the [ethnocentrism model](/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model), ethnocentrics (who help only their own colour) were much more common when colour tracked shared descent (75.5% of the population, against 12.9% with random colour), although how often help was given hardly changed; shuffling positions, which removed the excess relatedness among neighbours, went with helping falling from 76% to 11% of meetings. These comparisons do not rule out every other difference.

So, on this evidence, cooperation is easiest to establish where it reinforces itself: the helper, its offspring or close kin get the benefit back, and interaction stays local, among neighbours who are often relatives. Self-sacrificing help to others spread only under narrow conditions.

For humans, these results are compatible with a hypothesis, not evidence for it: that some cooperation began in arrangements where helping benefited the helper, close kin or offspring. They do not establish how human cooperation began. Large-scale, costly cooperation in humans may also depend on mechanisms these models do not include, such as reputation, norms, institutions and culture; which of them could move cooperation from "it pays me" to "I give even when it costs me" is a natural next question.

These are abstract models. Read this as a tentative pointer, not a settled law.

## Current Case Studies

The table below lists three ecological evolved-cooperation case studies; the spatial altruism lattice, the fourth
website-facing model, is described under [Foundational Theory](/evolved-cooperation/spatial-altruism):

<EvolvedCooperationCaseStudiesTable displayNumber="2" />

## Moran Models

Alongside the ecological models, the sibling [`EvolvedCooperation`](https://github.com/doesburg11/EvolvedCooperation)
repository has a family of fixed-population models built on [the Moran process](/evolved-cooperation/moran-process):

- [Interaction Kernel](/evolved-cooperation/interaction-kernel), a general engine that separates trait-dependent
  production, positive and negative effect routing, fitness, local selection and inheritance;
- the [Nowak Mechanisms](/evolved-cooperation/nowak-mechanisms) pages, which run kin selection, direct and indirect
  reciprocity, network reciprocity and group selection on that engine under matched assumptions.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1-16. https://doi.org/10.1016/0022-5193(64)90038-4
- Trivers, R. L. (1971). *The evolution of reciprocal altruism*. *The Quarterly Review of Biology*, 46(1), 35-57. https://doi.org/10.1086/406755
- Axelrod, R., & Hamilton, W. D. (1981). *The evolution of cooperation*. *Science*, 211(4489), 1390-1396. https://doi.org/10.1126/science.7466396
- Ohtsuki, H., Hauert, C., Lieberman, E., & Nowak, M. A. (2006). *A simple rule for the evolution of cooperation on graphs and social networks*. *Nature*, 441, 502-505. https://doi.org/10.1038/nature04605
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560-1563. https://doi.org/10.1126/science.1133755
- West, S. A., Griffin, A. S., & Gardner, A. (2007). *Evolutionary explanations for cooperation*. *Current Biology*, 17(16), R661-R672. https://doi.org/10.1016/j.cub.2007.06.004
