---
id: mindmap
title: Mindmap
sidebar_position: 5
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
- 🧍 CMA-ES - [Completely Derandomized Self-Adaptation in Evolution Strategies](https://direct.mit.edu/evco/article/9/2/159/892/Completely-Derandomized-Self-Adaptation-in) - Hansen & Ostermeier (2001)
- 🧍 OpenAI Evolution Strategies - [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](https://arxiv.org/abs/1703.03864) - Salimans et al. (2017)
- 🧍 NEAT - [Evolving Neural Networks through Augmenting Topologies](https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf) - Stanley & Miikkulainen (2002)
- 🧍 HyperNEAT - [A Hypercube-Based Encoding for Evolving Large-Scale Neural Networks](https://direct.mit.edu/artl/article-abstract/15/2/185/2634) - Stanley, D'Ambrosio & Gauci (2009)
- 🧍 Novelty Search - [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://www.cs.swarthmore.edu/~meeden/DevelopmentalRobotics/lehman_ecj11.pdf) - Lehman & Stanley (2011)
- 🧍 Quality Diversity (MAP-Elites) - [Illuminating Search Spaces by Mapping Elites](https://arxiv.org/abs/1504.04909) - Mouret & Clune (2015)
- 👥 rtNEAT (multi-agent) - [Real-Time Neuroevolution in the NERO Video Game](https://www.cse.unr.edu/~bdbryant/papers/stanley-2005-tec.pdf) - Stanley, Bryant & Miikkulainen (2005)
- 👥 Kin Selection - [The Genetical Evolution of Social Behaviour I and II](https://www.discovermagazine.com/health/the-genetical-evolution-of-social-behaviour-i) - Hamilton (1964)
- 👥 Evolutionary Game Theory - [Evolutionarily Stable Strategies and Game Dynamics](http://dklevine.com/archive/refs4457.pdf) - Taylor & Jonker (1978)
- 👥 Axelrod-style tournaments - [The Evolution of Cooperation](https://websites.umich.edu/~axe/research/Axelrod%20and%20Hamilton%20EC%201981.pdf) - Axelrod & Hamilton (1981)
- 👥 [Inherited Predispositions](/learning-selection-interaction/theory#what-can-evolve) - trust priors selected across generations

## [Nurture](/learning-selection-interaction/theory#fast-timescale--learning)
- Life-time Learning
  - Behavior is acquired within a lifetime from experience and feedback
  - Individual
    - Q-learning - [Learning from Delayed Rewards](http://www.cs.rhul.ac.uk/~chrisw/new_thesis.pdf) - Watkins (1989)
    - Temporal-Difference Learning - [Learning to Predict by the Methods of Temporal Differences](https://link.springer.com/article/10.1007/BF00115009) - Sutton (1988)
    - Policy gradients (REINFORCE) - [Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://link.springer.com/article/10.1007/BF00992696) - Williams (1992)
    - Policy gradients (PPO) - [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347) - Schulman et al. (2017)
    - Actor-Critic - [Actor-Critic Algorithms](https://proceedings.neurips.cc/paper/1999/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html) - Konda & Tsitsiklis (2000)
    - Backpropagation - [Learning representations by back-propagating errors](https://www.nature.com/articles/323533a0) - Rumelhart, Hinton & Williams (1986)
    - Deep Q-Networks - [Human-level control through deep reinforcement learning](https://www.nature.com/articles/nature14236) - Mnih et al. (2015)
    - Bayesian Updating - [A Bayesian Framework for Reinforcement Learning](https://dl.acm.org/doi/10.5555/645529.658114) - Strens (2000)
  - Multi-Agent
    - Independent Q-learning - [Multi-Agent Reinforcement Learning: Independent versus Cooperative Agents](https://www.sciencedirect.com/science/chapter/monograph/abs/pii/B9781558603073500496) - Tan (1993)
    - MADDPG - [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275) - Lowe et al. (2017)
    - Self-Play - [Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm](https://arxiv.org/abs/1712.01815) - Silver et al. (2017)
    - Sequential Social Dilemmas - [Multi-agent Reinforcement Learning in Sequential Social Dilemmas](https://arxiv.org/abs/1702.03037) - Leibo et al. (2017)
    - Opponent modeling - [Opponent Modeling in Deep Reinforcement Learning](https://arxiv.org/abs/1609.05559) - He et al. (2016)
    - Opponent-Learning Awareness (LOLA) - [Learning with Opponent-Learning Awareness](https://ifaamas.org/Proceedings/aamas2018/pdfs/p122.pdf) - Foerster et al. (2018)
    - Emergent Communication - [Learning to Communicate with Deep Multi-Agent Reinforcement Learning](https://arxiv.org/abs/1605.06676) - Foerster et al. (2016)
    - Direct Reciprocity - [The Evolution of Reciprocal Altruism](https://www.journals.uchicago.edu/doi/10.1086/406755) - Trivers (1971)
    - Reputation tracking - [Evolution of indirect reciprocity by image scoring](https://www.nature.com/articles/31225) - Nowak & Sigmund (1998)
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
  - 🧮 [The Evolution of Cultural Evolution](https://xcelab.net/rmpubs/henrich%20mcelreath%20EA%202003.pdf) - Henrich & McElreath (2003)

## Nature & Nurture Hybrids
- Cut across both the Nature and Nurture branches above
- [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- 🧍 The original Baldwin Effect proposal - [A New Factor in Evolution](https://brocku.ca/MeadProject/Baldwin/Baldwin_1896_h.html) - Baldwin (1896)
- 🧍 Genetic Assimilation - [Genetic Assimilation of an Acquired Character](https://onlinelibrary.wiley.com/doi/10.1111/j.1558-5646.1953.tb00070.x) - Waddington (1953)
- 🧍 The Baldwin Effect on a fixed target - [How Learning Can Guide Evolution](https://www.cs.toronto.edu/~hinton/absps/evolution.htm) - Hinton & Nowlan (1987)
- 🧍 Evolved plasticity for single-agent tasks - [Born to Learn: the Inspiration, Progress, and Future of Evolved Plastic Artificial Neural Networks](https://arxiv.org/abs/1703.10371) - Soltoggio, Stanley & Risi (2018)
- 🧍 Meta-Learning (MAML) - [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://arxiv.org/abs/1703.03400) - Finn, Abbeel & Levine (2017)
- 👥 Evolved trust priors and plasticity in interacting populations - [Interactions between Learning and Evolution](http://www2.hawaii.edu/~nreed/ics606/papers/Ackley91learningEvolution.pdf) - Ackley & Littman (1991)
- 👥 Full deep-dive: [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
- 👥 [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
  - Lifetime learning (fast) coupled with generational evolution (slow)
  - 📖 [Evolution and Learning: The Baldwin Effect Reconsidered](https://www.researchgate.net/publication/272161432_Evolution_and_Learning_The_Baldwin_Effect_Reconsidered) - Weber & Depew (book)
  - 📖 [Interactions between Learning and Evolution: The Outstanding Strategy Generated by the Baldwin Effect](https://www.sciencedirect.com/science/article/abs/pii/S0303264704000565) - Arita & Suzuki (2000)
  - 🧮 [How Learning Can Change the Course of Evolution](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0219502) - PLOS ONE (2019)
  - 🧮 [Evolving Self-taught Neural Networks: The Baldwin Effect and the Emergence of Intelligence](https://arxiv.org/pdf/1906.08854) - arXiv (2019)
  - 🧮 [Meta-Learning by the Baldwin Effect](https://arxiv.org/pdf/1806.07917) - arXiv (2018)
  - 🧮 [Embodied Intelligence via Learning and Evolution](https://arxiv.org/pdf/2102.02202) - arXiv (2021)
  - 🧮 [Learning to Acquire Novel Cognitive Tasks with Evolution, Plasticity and Meta-Meta-Learning](https://arxiv.org/pdf/2112.08588) - arXiv (2021)
  - 🧮 [LaSER: How Learning Can Guide the Evolution of Equations](https://www.arxiv.org/pdf/2505.17309v1) - arXiv (2025)
`;

# Mindmap

A visual, foldable overview of the concepts covered on the [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) page. **Nature vs Nurture** (plus a **Hybrids** branch) is the top-level split. Within Nurture, algorithms are grouped under **Life-time Learning** (behavior acquired within an agent's own lifetime, whether alone or amid other learning agents) and **Cultural Inheritance** (behavior transmitted across generations); Life-time Learning further splits into **Individual** and **Multi-Agent** contexts. In Nature and Hybrids, each algorithm is instead tagged 🧍 individual-level or 👥 multi-agent / social. Each reference is tagged 📖 core / foundational or 🧮 computational / formal / simulation. Click a node's circle to expand or collapse its branch, click its label to jump to that section, and drag or scroll to pan and zoom.

<InteractionMindmap markdown={natureNurtureOutline} height="720px" />
