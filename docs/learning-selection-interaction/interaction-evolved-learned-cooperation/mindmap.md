---
id: mindmap
title: Mindmap
sidebar_position: 5
slug: /learning-selection-interaction/interaction-evolved-learned-cooperation/mindmap
---

import InteractionMindmap from '@site/src/components/InteractionMindmap';

export const natureNurtureIndividualMultiOutline = `
# Algorithmic Solutions

## [Nature](/learning-selection-interaction/theory#slow-timescale--evolution)
- Evolutionary, innate mechanisms encode a solution before any lifetime experience
- [Slow: Evolution](/learning-selection-interaction/theory#slow-timescale--evolution)

### Individual
- Genetic Algorithms - Holland (1975)
- Evolution Strategies - Rechenberg & Schwefel (1960s-70s); CMA-ES - Hansen & Ostermeier (2001)
- Neuroevolution - NEAT (Stanley & Miikkulainen, 2002), HyperNEAT (Stanley, D'Ambrosio & Gauci, 2009)

### Multi-Agent
- Evolutionary Game Theory - replicator dynamics (Taylor & Jonker, 1978)
- Axelrod-style tournaments - Axelrod & Hamilton (1981)
- [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve) - trust priors selected across generations

## [Nurture](/learning-selection-interaction/theory#fast-timescale--learning)
- Behavior is acquired within a lifetime from experience and feedback
- [Fast: Learning](/learning-selection-interaction/theory#fast-timescale--learning)

### Individual
- Reinforcement Learning - Q-learning (Watkins, 1989), Policy gradients (Williams, 1992; Schulman et al., 2017)
- Supervised / Deep Learning - Backpropagation (Rumelhart, Hinton & Williams, 1986), DQN (Mnih et al., 2015)
- Bayesian Updating - belief updating over unknown environments - Strens (2000)

### Multi-Agent
- Multi-Agent RL - Independent Q-learning (Tan, 1993), MADDPG (Lowe et al., 2017)
- Sequential Social Dilemmas - Leibo et al. (2017)
- Opponent modeling and reputation tracking - He et al. (2016); Nowak & Sigmund (1998)
- Trust updating - [Trust priors](/learning-selection-interaction/theory#what-can-evolve) updated online from interaction history

## Nature & Nurture Hybrids
- Cut across both the Nature and Nurture branches above
- [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)

### Individual
- The Baldwin Effect on a fixed target - Hinton & Nowlan (1987)
- Evolved plasticity for single-agent tasks - Soltoggio, Stanley & Risi (2018)
- Meta-Learning - MAML (Finn, Abbeel & Levine, 2017)

### Multi-Agent
- Evolved trust priors and plasticity in interacting populations - Ackley & Littman (1991)
- [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
- Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
`;

# Mindmap

A visual, foldable overview of the concepts covered on the [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) page. **Nature vs Nurture** is the top-level split, with **Individual vs Multi-Agent** nested beneath each side. Click a node's circle to expand or collapse its branch, click its label to jump to that section, and drag or scroll to pan and zoom.

<InteractionMindmap markdown={natureNurtureIndividualMultiOutline} height="720px" />
