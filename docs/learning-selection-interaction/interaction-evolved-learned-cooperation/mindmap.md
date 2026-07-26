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

export const natureNurtureOutline = `
# Nature vs Nurture

## [Nature](/learning-selection-interaction/theory#slow-timescale--evolution)
- *Evolutionary timescale* - population-level change across generations
- [Slow: Evolution](/learning-selection-interaction/theory#slow-timescale--evolution)
  - Population frequency dynamics
  - Fitness from lifetime payoff

### [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve)
- Trust priors - \`trust_prior\`
- RL parameters - \`alpha\`, \`epsilon\`, \`gamma\`
- Social-cognitive parameters

### [Baldwinian Inheritance](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- Inherit learning aptitude, not the learned behavior
- [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
  - Learning rescues cooperative genotypes
  - New selection pressures loosen thresholds over generations

### Darwinian Baseline
- Heritable traits vary and are filtered by reproductive success
- No within-lifetime learning required

## [Nurture](/learning-selection-interaction/theory#fast-timescale--learning)
- *Learning timescale* - behavioral adaptation within a lifetime
- [Fast: Learning](/learning-selection-interaction/theory#fast-timescale--learning)
  - Policy updates within a lifetime
  - Donation-game payoffs

### Environmental Shaping
- Partner history and local interaction context
- Discrimination between cooperators and defectors

### Learning Mechanisms
- Trust updating
- Q-learning
- Reputation and social-cognitive cues

### [Lamarckian Analogue](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- Acquired trait itself is inherited
- Artificial analogue - copied policy weights or checkpoint state
`;

# Nature vs Nurture Mindmap

The same concepts, reorganized around the classic nature-versus-nurture framing: evolutionary predispositions under **Nature**, within-lifetime learning under **Nurture**.

<InteractionMindmap markdown={natureNurtureOutline} height="720px" />

export const algorithmicSolutionsOutline = `
# Algorithmic Solutions

## Nature
- Evolutionary, innate mechanisms encode a solution before any lifetime experience
- [Slow: Evolution](/learning-selection-interaction/theory#slow-timescale--evolution)

### Genetic Algorithms
- Holland (1975) - *Adaptation in Natural and Artificial Systems*
- Encoded population - selection, crossover, mutation

### Evolution Strategies
- Rechenberg & Schwefel (1960s-70s) - mutation-driven parameter search
- CMA-ES - Hansen & Ostermeier (2001), covariance-matrix adaptation

### Neuroevolution
- NEAT - Stanley & Miikkulainen (2002), evolves topology and weights jointly
- HyperNEAT - Stanley, D'Ambrosio & Gauci (2009), indirect encoding for scale

### Evolutionary Game Theory
- Replicator dynamics - Taylor & Jonker (1978)
- Maynard Smith (1982) - *Evolution and the Theory of Games*

## Nurture
- Behavior is acquired within a lifetime from experience and feedback
- [Fast: Learning](/learning-selection-interaction/theory#fast-timescale--learning)

### Reinforcement Learning
- Q-learning - Watkins (1989)
- Policy gradients - REINFORCE (Williams, 1992), PPO (Schulman et al., 2017)

### Supervised / Deep Learning
- Backpropagation - Rumelhart, Hinton & Williams (1986)
- Deep Q-Networks - Mnih et al. (2015)

### Multi-Agent Learning
- Independent Q-learning - Tan (1993)
- MADDPG - Lowe et al. (2017)

### Bayesian Updating
- Bayesian reinforcement learning - belief updating over unknown environments
- [Trust priors](/learning-selection-interaction/theory#what-can-evolve) - updated online from interaction history

## Nature & Nurture
- Hybrid algorithms let evolution and learning shape one another
- [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)

### The Baldwin Effect
- Hinton & Nowlan (1987) - learning smooths a rugged fitness landscape
- Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)

### Evolved Plasticity
- Evolving learning rules or hyperparameters rather than fixed weights - Soltoggio, Stanley & Risi (2018)
- [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve) - \`alpha\`, \`epsilon\`, \`gamma\`

### Evolution Strategies + RL Hybrids
- Evolved Policy Gradients - Houthooft et al. (2018)
- Evolution-guided policy gradient (CERL/ERL) - Khadka & Tumer (2018)

### Meta-Learning
- MAML - Finn, Abbeel & Levine (2017), a learned prior that adapts fast within a lifetime
- Learned optimizers - Andrychowicz et al. (2016)

### Open-Ended Coevolution
- POET - Wang et al. (2019), coevolving environments and agents together
`;

# Algorithmic Solutions Mindmap

Algorithms that computational and evolutionary biology, and machine learning, treat as the standard toolkit for each side of the nature-versus-nurture divide, plus the hybrid methods that combine both.

<InteractionMindmap markdown={algorithmicSolutionsOutline} height="720px" />

export const individualSocialOutline = `
# Individual vs Social

## Individual (Single-Agent)
- Optimizes against a fixed environment or reward signal - no adapting opponents

### Nature
- Genetic Algorithms / Evolution Strategies tuning a solo controller
- CMA-ES - Hansen & Ostermeier (2001)

### Nurture
- Single-agent RL - Q-learning (Watkins, 1989), DQN (Mnih et al., 2015)
- Supervised / Deep Learning - Backpropagation (Rumelhart, Hinton & Williams, 1986)

### Nature & Nurture
- Baldwin Effect on a fixed target - Hinton & Nowlan (1987)
- Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
- Evolved plasticity for single-agent tasks - Soltoggio, Stanley & Risi (2018)

## Social (Multi-Agent)
- Faces other adapting agents - game-theoretic, non-stationary

### Nature
- Evolutionary Game Theory - replicator dynamics (Taylor & Jonker, 1978)
- Axelrod-style tournaments - Axelrod & Hamilton (1981)
- [Slow: Evolution](/learning-selection-interaction/theory#slow-timescale--evolution)

### Nurture
- Multi-Agent RL - Independent Q-learning (Tan, 1993), MADDPG (Lowe et al., 2017)
- Opponent modeling and reputation tracking
- [Fast: Learning](/learning-selection-interaction/theory#fast-timescale--learning)

### Nature & Nurture
- Evolved trust priors and plasticity in interacting populations
- [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
- [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve) - \`trust_prior\`, \`alpha\`, \`epsilon\`, \`gamma\`
`;

# Individual vs Social Mindmap

A fourth axis, orthogonal to nature-versus-nurture: whether the algorithm optimizes against a fixed environment (**Individual**) or against other adapting agents (**Social**). Each side is further split by how the solution is acquired, closing the loop with the earlier Algorithmic Solutions mindmap.

<InteractionMindmap markdown={individualSocialOutline} height="720px" />
