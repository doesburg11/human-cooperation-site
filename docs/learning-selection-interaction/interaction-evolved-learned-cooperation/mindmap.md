---
id: mindmap
title: Mindmap
sidebar_position: 5
slug: /learning-selection-interaction/interaction-evolved-learned-cooperation/mindmap
---

import InteractionMindmap from '@site/src/components/InteractionMindmap';

export const mindmapOutline = `
# Two-Timescale Cooperation

## [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
- *Learning timescale* <<< *Evolutionary timescale*
- Couples fast behavioral adaptation with slow population change

## [Fast and Slow Dynamics](/learning-selection-interaction/theory#fast-and-slow-dynamics)
- [**Fast: Learning**](/learning-selection-interaction/theory#fast-timescale--learning)
  - Policy updates within a lifetime
  - Donation-game payoffs
- [**Slow: Evolution**](/learning-selection-interaction/theory#slow-timescale--evolution)
  - Population frequency dynamics
  - Fitness from lifetime payoff

## [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- **Baldwinian** - inherit learning aptitude, not the learned behavior
- **Lamarckian** - inherit the acquired trait itself

## [The Baldwin Effect](/learning-selection-interaction/theory#the-baldwin-effect)
- Learning rescues cooperative genotypes
- [New selection pressures from learning](/learning-selection-interaction/theory#learning-creates-new-selection-pressures)
  - Lower learning rates suffice once behavior is partly encoded
  - Discrimination thresholds loosen as defectors become rarer
- Distinct from Waddington's *genetic assimilation*
- Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)

## [Interaction Regimes](/learning-selection-interaction/theory#interaction-regimes)
- Learning accelerates evolution
- Learning masks selection
- Learning opposes evolution
- Coevolution of learning ability

## [Manifestation in Simulations](/learning-selection-interaction/theory#manifestation-in-the-simulation-suite)
- Local, ring-structured interaction
- Within-generation learning (trust or Q-values)
- Between-generation reproduction on accumulated payoff

## [What Can Evolve](/learning-selection-interaction/theory#what-can-evolve)
- Trust priors
- RL parameters - \`alpha\`, \`epsilon\`, \`gamma\`
- Social-cognitive parameters

## [Testable Predictions](/learning-selection-interaction/theory#testable-predictions)
- Repeated interaction raises cooperation
- Selection favors partner discrimination
- Reputation helps with strangers

## [Relation to Classical Theories](/learning-selection-interaction/theory#relation-to-classical-theories)
- Classical evolution: fixed strategies, selection only
- Pure RL: learning only, no generational dynamics
- This framework unifies both

## [Related Work](/learning-selection-interaction/theory#related-work-closest-by-axis)
- Reciprocal altruism theory
  - Trivers (1971); Axelrod & Hamilton (1981)
- Network reciprocity theory
  - Nowak (2006); Ohtsuki et al. (2006)
- Multi-agent reinforcement learning
  - Claus & Boutilier (1998); Eccles et al. (2019)
- [Adjacent computational environments](/learning-selection-interaction/theory#adjacent-computational-environments)

## [Simulation Companion](/learning-selection-interaction/simulations)
- Two-Timescale Simulations - model-by-model results

## [Summary](/learning-selection-interaction/theory#summary)
- Couples fast and slow adaptation
- Enables the Baldwin effect
- Explains emergence, stabilization, and collapse of cooperation

## [References](/learning-selection-interaction/theory#references)
- Hinton & Nowlan (1987)
- Waddington (1953)
- Alexander (2018) diagram
`;

# Mindmap

A visual, foldable overview of the concepts covered on the [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) page. Click a node's circle to expand or collapse its branch, click its label to jump to that section, and drag or scroll to pan and zoom.

<InteractionMindmap markdown={mindmapOutline} height="720px" />
