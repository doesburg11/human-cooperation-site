---
id: mindmap
title: Mindmap
sidebar_position: 9
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
- 🧍 CMA-ES - [Completely Derandomized Self-Adaptation in Evolution Strategies](/pdfs/hansen-ostermeier-2001-cma-es.pdf) - Hansen & Ostermeier (2001)
- 🧍 OpenAI Evolution Strategies - [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](/pdfs/salimans-2017-evolution-strategies.pdf) - Salimans et al. (2017)
- 🧍 NEAT - [Evolving Neural Networks through Augmenting Topologies](/pdfs/stanley-miikkulainen-2002-neat.pdf) - Stanley & Miikkulainen (2002)
- 🧍 HyperNEAT - [A Hypercube-Based Encoding for Evolving Large-Scale Neural Networks](https://direct.mit.edu/artl/article-abstract/15/2/185/2634) - Stanley, D'Ambrosio & Gauci (2009)
- 🧍 Novelty Search - [Abandoning Objectives: Evolution Through the Search for Novelty Alone](/pdfs/lehman-stanley-2011-novelty-search.pdf) - Lehman & Stanley (2011)
- 🧍 Quality Diversity (MAP-Elites) - [Illuminating Search Spaces by Mapping Elites](/pdfs/mouret-clune-2015-map-elites.pdf) - Mouret & Clune (2015)
- 👥 rtNEAT (multi-agent) - [Real-Time Neuroevolution in the NERO Video Game](/pdfs/stanley-bryant-miikkulainen-2005-rtneat.pdf) - Stanley, Bryant & Miikkulainen (2005)
- 👥 Kin Selection - [The Genetical Evolution of Social Behaviour I](/pdfs/hamilton-1964-genetical-evolution-social-behaviour-i.pdf) and [II](/pdfs/hamilton-1964-genetical-evolution-social-behaviour-ii.pdf) - Hamilton (1964)
- 👥 Evolutionary Game Theory - [Evolutionarily Stable Strategies and Game Dynamics](http://dklevine.com/archive/refs4457.pdf) - Taylor & Jonker (1978)
- 👥 Axelrod-style tournaments - [The Evolution of Cooperation](/pdfs/axelrod-hamilton-1981-evolution-of-cooperation.pdf) - Axelrod & Hamilton (1981)
- 👥 [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve) - trust priors selected across generations

## [Nurture](/learning-selection-interaction/theory#fast-timescale--learning)
- Life-time Learning
  - Behavior is acquired within a lifetime from experience and feedback
  - Individual
    - Q-learning - [Learning from Delayed Rewards](/pdfs/watkins-1989-learning-from-delayed-rewards.pdf) - Watkins (1989)
    - Temporal-Difference Learning - [Learning to Predict by the Methods of Temporal Differences](/pdfs/sutton-1988-temporal-differences.pdf) - Sutton (1988)
    - Policy gradients (REINFORCE) - [Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://link.springer.com/article/10.1007/BF00992696) - Williams (1992)
    - Policy gradients (PPO) - [Proximal Policy Optimization Algorithms](/pdfs/schulman-et-al-2017-ppo.pdf) - Schulman et al. (2017)
    - Actor-Critic - [Actor-Critic Algorithms](/pdfs/konda-tsitsiklis-2000-actor-critic.pdf) - Konda & Tsitsiklis (2000)
    - Backpropagation - [Learning representations by back-propagating errors](/pdfs/rumelhart-hinton-williams-1986-backprop.pdf) - Rumelhart, Hinton & Williams (1986)
    - Deep Q-Networks - [Human-level control through deep reinforcement learning](/pdfs/mnih-et-al-2015-dqn.pdf) - Mnih et al. (2015)
    - Bayesian Updating - [A Bayesian Framework for Reinforcement Learning](/pdfs/strens-2000-bayesian-rl.pdf) - Strens (2000)
  - Multi-Agent
    - Independent Q-learning - [Multi-Agent Reinforcement Learning: Independent versus Cooperative Agents](/pdfs/tan-1993-independent-cooperative-agents.pdf) - Tan (1993)
    - MADDPG - [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](/pdfs/lowe-et-al-2017-maddpg.pdf) - Lowe et al. (2017)
    - Self-Play - [Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm](/pdfs/silver-et-al-2017-alphazero.pdf) - Silver et al. (2017)
    - Sequential Social Dilemmas - [Multi-agent Reinforcement Learning in Sequential Social Dilemmas](/pdfs/leibo-et-al-2017-sequential-social-dilemmas.pdf) - Leibo et al. (2017)
    - Opponent modeling - [Opponent Modeling in Deep Reinforcement Learning](/pdfs/he-et-al-2016-opponent-modeling.pdf) - He et al. (2016)
    - Opponent-Learning Awareness (LOLA) - [Learning with Opponent-Learning Awareness](/pdfs/foerster-et-al-2018-lola.pdf) - Foerster et al. (2018)
    - Emergent Communication - [Learning to Communicate with Deep Multi-Agent Reinforcement Learning](/pdfs/foerster-et-al-2016-learning-to-communicate.pdf) - Foerster et al. (2016)
    - Direct Reciprocity - [The Evolution of Reciprocal Altruism](/pdfs/trivers-1971-reciprocal-altruism.pdf) - Trivers (1971)
    - Reputation tracking - [Evolution of indirect reciprocity by image scoring](/pdfs/nowak-sigmund-1998-image-scoring.pdf) - Nowak & Sigmund (1998)
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
  - 🧮 [The Evolution of Cultural Evolution](/pdfs/henrich-mcelreath-2003-cultural-evolution.pdf) - Henrich & McElreath (2003)

## Nature & Nurture Hybrids
- Cut across both the Nature and Nurture branches above
- [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- 🧍 The original Baldwin Effect proposal - [A New Factor in Evolution](/pdfs/baldwin-1896-new-factor-in-evolution.pdf) - Baldwin (1896)
- 🧍 Genetic Assimilation - [Genetic Assimilation of an Acquired Character](/pdfs/waddington-1953-genetic-assimilation.pdf) - Waddington (1953)
- 🧍 The Baldwin Effect on a fixed target - [How Learning Can Guide Evolution](https://www.cs.toronto.edu/~hinton/absps/evolution.htm) - Hinton & Nowlan (1987)
- 🧍 Evolved plasticity for single-agent tasks - [Born to Learn: the Inspiration, Progress, and Future of Evolved Plastic Artificial Neural Networks](/pdfs/soltoggio-stanley-risi-2018-born-to-learn.pdf) - Soltoggio, Stanley & Risi (2018)
- 🧍 Meta-Learning (MAML) - [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](/pdfs/finn-abbeel-levine-2017-maml.pdf) - Finn, Abbeel & Levine (2017)
- 👥 Evolved trust priors and plasticity in interacting populations - [Interactions between Learning and Evolution](/pdfs/ackley-littman-1991-interactions.pdf) - Ackley & Littman (1991)
- 👥 Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
- 👥 [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
  - Lifetime learning (fast) coupled with generational evolution (slow)
  - 📖 [Evolution and Learning: The Baldwin Effect Reconsidered](https://direct.mit.edu/books/edited-volume/2826/Evolution-and-LearningThe-Baldwin-Effect) - Weber & Depew (book)
  - 📖 [Interactions between Learning and Evolution: The Outstanding Strategy Generated by the Baldwin Effect](/pdfs/arita-suzuki-2000-baldwin-effect.pdf) - Arita & Suzuki (2000)
  - 🧮 [How Learning Can Change the Course of Evolution](/pdfs/plos-one-2019-learning-guide-evolution.pdf) - Aguilar, Bennati & Helbing (2019)
  - 🧮 [Evolving Self-taught Neural Networks: The Baldwin Effect and the Emergence of Intelligence](/pdfs/arxiv-2019-evolving-self-taught-neural-networks.pdf) - Le (2019)
  - 🧮 [Meta-Learning by the Baldwin Effect](/pdfs/arxiv-2018-meta-learning-baldwin-effect.pdf) - Fernando et al. (2018)
  - 🧮 [Embodied Intelligence via Learning and Evolution](/pdfs/arxiv-2021-embodied-intelligence.pdf) - Gupta et al. (2021)
  - 🧮 [Learning to Acquire Novel Cognitive Tasks with Evolution, Plasticity and Meta-Meta-Learning](/pdfs/arxiv-2021-meta-meta-learning.pdf) - Miconi (2021)
  - 🧮 [LaSER: How Learning Can Guide the Evolution of Equations](/pdfs/arxiv-2025-laser.pdf) - Le & Bongard (2025)
`;

# Mindmap

A visual, foldable overview of the concepts covered on the [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) page. **Nature vs Nurture** (plus a **Hybrids** branch) is the top-level split. Within Nurture, algorithms are grouped under **Life-time Learning** (behavior acquired within an agent's own lifetime, whether alone or amid other learning agents) and **Cultural Inheritance** (behavior transmitted across generations); Life-time Learning further splits into **Individual** and **Multi-Agent** contexts. In Nature and Hybrids, each algorithm is instead tagged 🧍 individual-level or 👥 multi-agent / social. Each reference is tagged 📖 core / foundational or 🧮 computational / formal / simulation. Click a node's circle to expand or collapse its branch, click its label to jump to that section, and drag or scroll to pan and zoom.

<InteractionMindmap markdown={natureNurtureOutline} height="720px" />
