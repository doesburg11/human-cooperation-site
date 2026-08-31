---
id: mindmap
title: Mindmap
sidebar_position: 10
slug: /learning-selection-interaction/interaction-evolved-learned-cooperation/mindmap
---

import InteractionMindmap from '@site/src/components/InteractionMindmap';

export const natureNurtureOutline = `
# Algorithmic Solutions

## [Nature](/learning-selection-interaction/theory#slow-timescale--evolution)
- Evolutionary, innate mechanisms encode a solution before any lifetime experience
- 🧍 Genetic Algorithms - [Adaptation in Natural and Artificial Systems](https://mitpress.mit.edu/9780262581110/adaptation-in-natural-and-artificial-systems/) - Holland (1975)
- 🧍 Evolution Strategies - Evolutionsstrategie: Optimierung technischer Systeme nach Prinzipien der biologischen Evolution - Rechenberg (1973)
- 🧍 Evolution Strategies - Numerische Optimierung von Computer-Modellen mittels der Evolutionsstrategie - Schwefel (1977)
- 🧍 CMA-ES - [Completely Derandomized Self-Adaptation in Evolution Strategies](https://doi.org/10.1162/106365601750190398) - Hansen & Ostermeier (2001)
- 🧍 OpenAI Evolution Strategies - [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](https://arxiv.org/abs/1703.03864) - Salimans et al. (2017)
- 🧍 NEAT - [Evolving Neural Networks through Augmenting Topologies](https://doi.org/10.1162/106365602320169811) - Stanley & Miikkulainen (2002)
- 🧍 HyperNEAT - [A Hypercube-Based Encoding for Evolving Large-Scale Neural Networks](https://direct.mit.edu/artl/article-abstract/15/2/185/2634) - Stanley, D'Ambrosio & Gauci (2009)
- 🧍 Novelty Search - [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://doi.org/10.1162/EVCO_a_00025) - Lehman & Stanley (2011)
- 🧍 Quality Diversity (MAP-Elites) - [Illuminating Search Spaces by Mapping Elites](https://arxiv.org/abs/1504.04909) - Mouret & Clune (2015)
- 👥 rtNEAT (multi-agent) - [Real-Time Neuroevolution in the NERO Video Game](https://doi.org/10.1109/TEVC.2005.856210) - Stanley, Bryant & Miikkulainen (2005)
- 👥 Kin Selection - [The Genetical Evolution of Social Behaviour I](https://doi.org/10.1016/0022-5193(64)90038-4) and [II](https://doi.org/10.1016/0022-5193(64)90039-6) - Hamilton (1964)
- 👥 Evolutionary Game Theory - [Evolutionarily Stable Strategies and Game Dynamics](http://dklevine.com/archive/refs4457.pdf) - Taylor & Jonker (1978)
- 👥 Axelrod-style tournaments - [The Evolution of Cooperation](https://doi.org/10.1126/science.7466396) - Axelrod & Hamilton (1981)
- 👥 [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve) - trust priors selected across generations

## [Nurture](/learning-selection-interaction/theory#fast-timescale--learning)
- Life-time Learning
  - Behavior is acquired within a lifetime from experience and feedback
  - 📖 Operant Conditioning - [The Behavior of Organisms: An Experimental Analysis](https://www.bfskinner.org/wp-content/uploads/2016/02/BoO.pdf) - Skinner (1938)
  - 📖 Rescorla-Wagner Model - A Theory of Pavlovian Conditioning: Variations in the Effectiveness of Reinforcement and Nonreinforcement - Rescorla & Wagner (1972)
  - Individual
    - Q-learning - [Learning from Delayed Rewards](https://www.cs.rhul.ac.uk/~chrisw/thesis.html) - Watkins (1989)
    - Temporal-Difference Learning - [Learning to Predict by the Methods of Temporal Differences](https://doi.org/10.1007/BF00115009) - Sutton (1988)
    - Policy gradients (REINFORCE) - [Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://link.springer.com/article/10.1007/BF00992696) - Williams (1992)
    - Policy gradients (PPO) - [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347) - Schulman et al. (2017)
    - Actor-Critic - [Actor-Critic Algorithms](https://proceedings.neurips.cc/paper/1999/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html) - Konda & Tsitsiklis (2000)
    - Backpropagation - [Learning representations by back-propagating errors](https://doi.org/10.1038/323533a0) - Rumelhart, Hinton & Williams (1986)
    - Deep Q-Networks - [Human-level control through deep reinforcement learning](https://doi.org/10.1038/nature14236) - Mnih et al. (2015)
    - Bayesian Updating - [A Bayesian Framework for Reinforcement Learning](https://doi.org/10.5555/645529.658114) - Strens (2000)
  - Multi-Agent
    - Independent Q-learning - [Multi-Agent Reinforcement Learning: Independent versus Cooperative Agents](https://doi.org/10.1016/B978-1-55860-307-3.50049-6) - Tan (1993)
    - MADDPG - [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275) - Lowe et al. (2017)
    - Self-Play - [Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm](https://arxiv.org/abs/1712.01815) - Silver et al. (2017)
    - Sequential Social Dilemmas - [Multi-agent Reinforcement Learning in Sequential Social Dilemmas](https://arxiv.org/abs/1702.03037) - Leibo et al. (2017)
    - Opponent modeling - [Opponent Modeling in Deep Reinforcement Learning](https://arxiv.org/abs/1609.05559) - He et al. (2016)
    - Opponent-Learning Awareness (LOLA) - [Learning with Opponent-Learning Awareness](https://arxiv.org/abs/1709.04326) - Foerster et al. (2018)
    - Emergent Communication - [Learning to Communicate with Deep Multi-Agent Reinforcement Learning](https://arxiv.org/abs/1605.06676) - Foerster et al. (2016)
    - Direct Reciprocity - [The Evolution of Reciprocal Altruism](https://doi.org/10.1086/406755) - Trivers (1971)
    - Reputation tracking - [Evolution of indirect reciprocity by image scoring](https://doi.org/10.1038/30918) - Nowak & Sigmund (1998)
    - Trust updating - [Trust priors](/learning-selection-interaction/theory#what-can-evolve) updated online from interaction history
- Cultural Inheritance
  - Social transmission of behavior across generations, without genetic change
  - 📖 [Cultural Transmission and Evolution: A Quantitative Approach](https://press.princeton.edu/books/paperback/9780691082837/cultural-transmission-and-evolution) - Cavalli-Sforza & Feldman (1981)
  - 📖 [Culture and the Evolutionary Process](https://press.uchicago.edu/ucp/books/book/chicago/C/bo5970597.html) - Boyd & Richerson (1985)
  - 📖 [Not by Genes Alone: How Culture Transformed Human Evolution](https://press.uchicago.edu/ucp/books/book/chicago/N/bo3615170.html) - Richerson & Boyd (2005)
  - 📖 [The Cultural Origins of Human Cognition](https://www.hup.harvard.edu/books/9780674005822) - Tomasello (1999)
  - 📖 [The Secret of Our Success](https://press.princeton.edu/books/paperback/9780691178431/the-secret-of-our-success) - Henrich (2015)
  - 🧮 [Does Biology Constrain Culture?](https://www.cognitionandculture.net/wp-content/uploads/Rogers-AA-90-819.pdf) - Rogers (1988), source of Rogers' Paradox
  - 🧮 [An Evolutionary Model of Social Learning: The Effects of Spatial and Temporal Variation](https://www.researchgate.net/publication/233820578_An_evolutionary_model_of_social_learning_The_effects_of_spatial_and_temporal_variation) - Boyd & Richerson (1988)
  - 🧮 [The Evolution of Conformist Transmission and the Emergence of Between-Group Differences](https://www.sciencedirect.com/science/article/abs/pii/S109051389800018X) - Henrich & Boyd (1998)
  - 🧮 [The Evolution of Cultural Evolution](https://doi.org/10.1002/evan.10110) - Henrich & McElreath (2003)
  - 🧮 [Culture-gene coevolution, norm-psychology and the emergence of human prosociality](https://doi.org/10.1016/j.tics.2011.03.003) - Chudek & Henrich (2011)
  - 📖 [Cultural group selection plays an essential role in explaining human cooperation: A sketch of the evidence](https://doi.org/10.1017/S0140525X1400106X) - Richerson et al. (2016)
  - 📖 [Cultural Evolution: How Darwinian Theory Can Explain Human Culture and Synthesize the Social Sciences](https://press.uchicago.edu/ucp/books/book/chicago/C/bo8787504.html) - Mesoudi (2011)
- Developmental & Epigenetic Inheritance
  - Non-genetic biological carryover from parent to offspring: maternal effects, prenatal environment, environmentally-induced marks on gene expression that outlive one lifetime without changing the DNA sequence
  - Conceptual/literature only - not currently modeled computationally in this project's simulations
  - 📖 [Epigenetic Inheritance and Evolution: The Lamarckian Dimension](https://academic.oup.com/book/35924) - Jablonka & Lamb (1995)
  - 🧮 [Epigenetic programming by maternal behavior](https://doi.org/10.1038/nn1276) - Weaver et al. (2004), maternal care shifts DNA methylation of the glucocorticoid receptor gene in offspring
  - 🧮 [Transgenerational response to nutrition, early life circumstances and longevity](https://doi.org/10.1038/sj.ejhg.5201832) - Kaati, Bygren, Pembrey & Sjöström (2007), the Överkalix cohort data
  - See also [Epigenetic Inheritance](/learning-selection-interaction/baldwin-effect#13-related-but-distinct-other-bridges-between-nature-and-nurture) as one of the Baldwin effect's neighboring bridge mechanisms
- Material & Economic Inheritance
  - Non-behavioral transmission of property, wealth, and built environment across generations: land, livestock, infrastructure, discretionary bequests
  - Conceptual/literature only - not currently modeled computationally in this project's simulations
  - 📖 [Intergenerational Wealth Transmission and the Dynamics of Inequality in Small-Scale Societies](https://doi.org/10.1126/science.1178336) - Borgerhoff Mulder et al. (2009), distinguishes embodied, material, and relational wealth
  - 🧮 [Production Systems, Inheritance, and Inequality in Premodern Societies](https://doi.org/10.1086/649029) - Smith, Borgerhoff Mulder, Bowles et al. (2010), breaks inheritance down by foraging, horticultural, pastoral, and agricultural production systems
  - 📖 [The Inheritance of Inequality](https://doi.org/10.1257/089533002760278686) - Bowles & Gintis (2002), the economics-side mechanisms behind intergenerational wealth transmission
  - Overlaps with [Niche Construction](/learning-selection-interaction/baldwin-effect#13-related-but-distinct-other-bridges-between-nature-and-nurture) - the general ecological version of the same idea, environment modification rather than property specifically

## Nature & Nurture Hybrids
- Cut across both the Nature and Nurture branches above
- [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- 🧍 The original Baldwin Effect proposal - [A New Factor in Evolution](https://doi.org/10.1086/276408) - Baldwin (1896)
- 🧍 Genetic Assimilation - [Genetic Assimilation of an Acquired Character](https://doi.org/10.2307/2405747) - Waddington (1953)
- 🧍 The Baldwin Effect on a fixed target - [How Learning Can Guide Evolution](https://www.cs.toronto.edu/~hinton/absps/evolution.htm) - Hinton & Nowlan (1987)
- 🧍 Evolved plasticity for single-agent tasks - [Born to Learn: the Inspiration, Progress, and Future of Evolved Plastic Artificial Neural Networks](https://arxiv.org/abs/1703.10371) - Soltoggio, Stanley & Risi (2018)
- 🧍 Meta-Learning (MAML) - [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://proceedings.mlr.press/v70/finn17a.html) - Finn, Abbeel & Levine (2017)
- 👥 Evolved trust priors and plasticity in interacting populations - [Interactions between Learning and Evolution](https://www.semanticscholar.org/paper/Interactions-between-learning-and-evolution-Ackley-Littman/675be3c1f8a57015a91be5cd191a8d262a9061fb) - Ackley & Littman (1991)
- 👥 Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
- 👥 [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
  - Lifetime learning (fast) coupled with generational evolution (slow)
  - 📖 [Evolution and Learning: The Baldwin Effect Reconsidered](https://direct.mit.edu/books/edited-volume/2826/Evolution-and-LearningThe-Baldwin-Effect) - Weber & Depew (book)
  - 📖 [Interactions between Learning and Evolution: The Outstanding Strategy Generated by the Baldwin Effect](https://doi.org/10.7551/mitpress/1432.003.0027) - Arita & Suzuki (2000)
  - 🧮 [How Learning Can Change the Course of Evolution](https://doi.org/10.1371/journal.pone.0219502) - Aguilar, Bennati & Helbing (2019)
  - 🧮 [Evolving Self-taught Neural Networks: The Baldwin Effect and the Emergence of Intelligence](https://arxiv.org/abs/1906.08854) - Le (2019)
  - 🧮 [Meta-Learning by the Baldwin Effect](https://doi.org/10.1145/3205651.3208249) - Fernando et al. (2018)
  - 🧮 [Embodied Intelligence via Learning and Evolution](https://doi.org/10.1038/s41467-021-25874-z) - Gupta et al. (2021)
  - 🧮 [Learning to Acquire Novel Cognitive Tasks with Evolution, Plasticity and Meta-Meta-Learning](https://proceedings.mlr.press/v202/miconi23a.html) - Miconi (2021)
  - 🧮 [LaSER: How Learning Can Guide the Evolution of Equations](https://arxiv.org/abs/2505.17309) - Le & Bongard (2025)
`;

# Mindmap

A visual, foldable overview of the concepts covered on the [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) page. **Nature vs Nurture** (plus a **Hybrids** branch) is the top-level split. Within Nurture, algorithms are grouped under **Life-time Learning** (behavior acquired within an agent's own lifetime, whether alone or amid other learning agents) and **Cultural Inheritance** (behavior transmitted across generations); Life-time Learning further splits into **Individual** and **Multi-Agent** contexts. Two further branches, **Developmental & Epigenetic Inheritance** and **Material & Economic Inheritance**, round out Nurture beyond learning and culture — these are conceptual/literature branches rather than algorithms this project currently models. In Nature and Hybrids, each algorithm is instead tagged 🧍 individual-level or 👥 multi-agent / social. Each reference is tagged 📖 core / foundational or 🧮 computational / formal / simulation. Click a node's circle to expand or collapse its branch, click its label to jump to that section, and drag or scroll to pan and zoom.

<InteractionMindmap markdown={natureNurtureOutline} height="720px" />
