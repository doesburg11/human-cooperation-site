---
id: related-research-predpreygrass
title: Related Research
sidebar_position: 6
slug: /learning-selection-interaction/related-research-predpreygrass
---

import InteractionMindmap from '@site/src/components/InteractionMindmap';

export const natureNurtureOutline = `
# Algorithmic Solutions

## [Nature](/learning-selection-interaction/theory#slow-timescale--evolution)
- Evolutionary, innate mechanisms encode a solution before any lifetime experience
- Individual
  - Genetic Algorithms
    - [Adaptation in Natural and Artificial Systems](https://mitpress.mit.edu/9780262581110/adaptation-in-natural-and-artificial-systems/) - Holland (1975)
  - Evolution Strategies
    - Evolutionsstrategie: Optimierung technischer Systeme nach Prinzipien der biologischen Evolution - Rechenberg (1973)
    - Numerische Optimierung von Computer-Modellen mittels der Evolutionsstrategie - Schwefel (1977)
  - CMA-ES
    - [Completely Derandomized Self-Adaptation in Evolution Strategies](https://doi.org/10.1162/106365601750190398) - Hansen & Ostermeier (2001)
  - OpenAI Evolution Strategies
    - [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](https://arxiv.org/abs/1703.03864) - Salimans et al. (2017)
  - NEAT
    - [Evolving Neural Networks through Augmenting Topologies](https://doi.org/10.1162/106365602320169811) - Stanley & Miikkulainen (2002)
  - HyperNEAT
    - [A Hypercube-Based Encoding for Evolving Large-Scale Neural Networks](https://direct.mit.edu/artl/article-abstract/15/2/185/2634) - Stanley, D'Ambrosio & Gauci (2009)
  - Novelty Search
    - [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://doi.org/10.1162/EVCO_a_00025) - Lehman & Stanley (2011)
  - Quality Diversity (MAP-Elites)
    - [Illuminating Search Spaces by Mapping Elites](https://arxiv.org/abs/1504.04909) - Mouret & Clune (2015)
- Multi-Agent
  - rtNEAT
    - [Real-Time Neuroevolution in the NERO Video Game](https://doi.org/10.1109/TEVC.2005.856210) - Stanley, Bryant & Miikkulainen (2005)
  - Kin Selection
    - [The Genetical Evolution of Social Behaviour I](https://doi.org/10.1016/0022-5193(64)90038-4) and [II](https://doi.org/10.1016/0022-5193(64)90039-6) - Hamilton (1964)
  - Evolutionary Game Theory
    - [Evolutionarily Stable Strategies and Game Dynamics](http://dklevine.com/archive/refs4457.pdf) - Taylor & Jonker (1978)
  - Axelrod-style tournaments
    - [The Evolution of Cooperation](https://doi.org/10.1126/science.7466396) - Axelrod & Hamilton (1981)
  - Inherited Predispositions
    - [Trust priors](/learning-selection-interaction/theory#what-can-evolve) selected across generations

## [Nurture](/learning-selection-interaction/theory#fast-timescale--learning)
- Life-time Learning
  - Behavior is acquired within a lifetime from experience and feedback
  - Operant Conditioning
    - [The Behavior of Organisms: An Experimental Analysis](https://www.bfskinner.org/wp-content/uploads/2016/02/BoO.pdf) - Skinner (1938)
  - Rescorla-Wagner Model
    - A Theory of Pavlovian Conditioning: Variations in the Effectiveness of Reinforcement and Nonreinforcement - Rescorla & Wagner (1972)
  - Individual
    - Q-learning
      - [Learning from Delayed Rewards](https://www.cs.rhul.ac.uk/~chrisw/thesis.html) - Watkins (1989)
    - Temporal-Difference Learning
      - [Learning to Predict by the Methods of Temporal Differences](https://doi.org/10.1007/BF00115009) - Sutton (1988)
    - Policy gradients (REINFORCE)
      - [Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning](https://link.springer.com/article/10.1007/BF00992696) - Williams (1992)
    - Policy gradients (PPO)
      - [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347) - Schulman et al. (2017)
    - Actor-Critic
      - [Actor-Critic Algorithms](https://proceedings.neurips.cc/paper/1999/hash/6449f44a102fde848669bdd9eb6b76fa-Abstract.html) - Konda & Tsitsiklis (2000)
    - Backpropagation
      - [Learning representations by back-propagating errors](https://doi.org/10.1038/323533a0) - Rumelhart, Hinton & Williams (1986)
    - Deep Q-Networks
      - [Human-level control through deep reinforcement learning](https://doi.org/10.1038/nature14236) - Mnih et al. (2015)
    - Bayesian Updating
      - [A Bayesian Framework for Reinforcement Learning](https://www.semanticscholar.org/paper/A-Bayesian-Framework-for-Reinforcement-Learning-Strens/48cce5ee49facf75eeb12832c387452424b645dd) - Strens (2000)
  - Multi-Agent
    - Independent Q-learning
      - [Multi-Agent Reinforcement Learning: Independent versus Cooperative Agents](https://doi.org/10.1016/B978-1-55860-307-3.50049-6) - Tan (1993)
    - MADDPG
      - [Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments](https://arxiv.org/abs/1706.02275) - Lowe et al. (2017)
    - Self-Play
      - [Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm](https://arxiv.org/abs/1712.01815) - Silver et al. (2017)
    - Sequential Social Dilemmas
      - [Multi-agent Reinforcement Learning in Sequential Social Dilemmas](https://arxiv.org/abs/1702.03037) - Leibo et al. (2017)
    - Opponent modeling
      - [Opponent Modeling in Deep Reinforcement Learning](https://arxiv.org/abs/1609.05559) - He et al. (2016)
    - Opponent-Learning Awareness (LOLA)
      - [Learning with Opponent-Learning Awareness](https://arxiv.org/abs/1709.04326) - Foerster et al. (2018)
    - Emergent Communication
      - [Learning to Communicate with Deep Multi-Agent Reinforcement Learning](https://arxiv.org/abs/1605.06676) - Foerster et al. (2016)
    - Direct Reciprocity
      - [The Evolution of Reciprocal Altruism](https://doi.org/10.1086/406755) - Trivers (1971)
    - Reputation tracking
      - [Evolution of indirect reciprocity by image scoring](https://doi.org/10.1038/30918) - Nowak & Sigmund (1998)
    - Trust updating
      - [Trust priors](/learning-selection-interaction/theory#what-can-evolve) updated online from interaction history
- Cultural Inheritance
  - Social transmission of behavior across generations, without genetic change
  - [Cultural Transmission and Evolution: A Quantitative Approach](https://press.princeton.edu/books/paperback/9780691082837/cultural-transmission-and-evolution) - Cavalli-Sforza & Feldman (1981)
  - [Culture and the Evolutionary Process](https://press.uchicago.edu/ucp/books/book/chicago/C/bo5970597.html) - Boyd & Richerson (1985)
  - [Not by Genes Alone: How Culture Transformed Human Evolution](https://press.uchicago.edu/ucp/books/book/chicago/N/bo3615170.html) - Richerson & Boyd (2005)
  - [The Cultural Origins of Human Cognition](https://www.hup.harvard.edu/books/9780674005822) - Tomasello (1999)
  - [The Secret of Our Success](https://press.princeton.edu/books/paperback/9780691178431/the-secret-of-our-success) - Henrich (2015)
  - [Does Biology Constrain Culture?](https://www.cognitionandculture.net/wp-content/uploads/Rogers-AA-90-819.pdf) - Rogers (1988), source of Rogers' Paradox
  - [An Evolutionary Model of Social Learning: The Effects of Spatial and Temporal Variation](https://www.researchgate.net/publication/233820578_An_evolutionary_model_of_social_learning_The_effects_of_spatial_and_temporal_variation) - Boyd & Richerson (1988)
  - [The Evolution of Conformist Transmission and the Emergence of Between-Group Differences](https://www.sciencedirect.com/science/article/abs/pii/S109051389800018X) - Henrich & Boyd (1998)
  - [The Evolution of Cultural Evolution](https://doi.org/10.1002/evan.10110) - Henrich & McElreath (2003)
  - [Culture-gene coevolution, norm-psychology and the emergence of human prosociality](https://doi.org/10.1016/j.tics.2011.03.003) - Chudek & Henrich (2011)
  - [Cultural group selection plays an essential role in explaining human cooperation: A sketch of the evidence](https://doi.org/10.1017/S0140525X1400106X) - Richerson et al. (2016)
  - [Cultural Evolution: How Darwinian Theory Can Explain Human Culture and Synthesize the Social Sciences](https://press.uchicago.edu/ucp/books/book/chicago/C/bo8787504.html) - Mesoudi (2011)
- Developmental & Epigenetic Inheritance
  - Non-genetic biological carryover from parent to offspring: maternal effects, prenatal environment, environmentally-induced marks on gene expression that outlive one lifetime without changing the DNA sequence
  - Conceptual/literature only - not currently modeled computationally in this project's simulations
  - [Epigenetic Inheritance and Evolution: The Lamarckian Dimension](https://academic.oup.com/book/35924) - Jablonka & Lamb (1995)
  - [Epigenetic programming by maternal behavior](https://doi.org/10.1038/nn1276) - Weaver et al. (2004), maternal care shifts DNA methylation of the glucocorticoid receptor gene in offspring
  - [Transgenerational response to nutrition, early life circumstances and longevity](https://doi.org/10.1038/sj.ejhg.5201832) - Kaati, Bygren, Pembrey & Sjöström (2007), the Överkalix cohort data
  - See also [Epigenetic Inheritance](/learning-selection-interaction/baldwin-effect#13-related-but-distinct-other-bridges-between-nature-and-nurture) as one of the Baldwin effect's neighboring bridge mechanisms
- Material & Economic Inheritance
  - Non-behavioral transmission of property, wealth, and built environment across generations: land, livestock, infrastructure, discretionary bequests
  - Conceptual/literature only - not currently modeled computationally in this project's simulations
  - [Intergenerational Wealth Transmission and the Dynamics of Inequality in Small-Scale Societies](https://doi.org/10.1126/science.1178336) - Borgerhoff Mulder et al. (2009), distinguishes embodied, material, and relational wealth
  - [Production Systems, Inheritance, and Inequality in Premodern Societies](https://doi.org/10.1086/649029) - Smith, Borgerhoff Mulder, Bowles et al. (2010), breaks inheritance down by foraging, horticultural, pastoral, and agricultural production systems
  - [The Inheritance of Inequality](https://doi.org/10.1257/089533002760278686) - Bowles & Gintis (2002), the economics-side mechanisms behind intergenerational wealth transmission
  - Overlaps with [Niche Construction](/learning-selection-interaction/baldwin-effect#13-related-but-distinct-other-bridges-between-nature-and-nurture) - the general ecological version of the same idea, environment modification rather than property specifically

## Nature & Nurture Hybrids
- Cut across both the Nature and Nurture branches above
- [Baldwinian vs Lamarckian](/learning-selection-interaction/theory#baldwinian-and-lamarckian-interaction)
- Individual
  - The original Baldwin Effect proposal
    - [A New Factor in Evolution](https://doi.org/10.1086/276408) - Baldwin (1896)
  - Genetic Assimilation
    - [Genetic Assimilation of an Acquired Character](https://doi.org/10.2307/2405747) - Waddington (1953)
  - The Baldwin Effect on a fixed target
    - [How Learning Can Guide Evolution](https://www.cs.toronto.edu/~hinton/absps/evolution.htm) - Hinton & Nowlan (1987)
  - Evolved plasticity for single-agent tasks
    - [Born to Learn: the Inspiration, Progress, and Future of Evolved Plastic Artificial Neural Networks](https://arxiv.org/abs/1703.10371) - Soltoggio, Stanley & Risi (2018)
  - Meta-Learning (MAML)
    - [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://proceedings.mlr.press/v70/finn17a.html) - Finn, Abbeel & Levine (2017)
- Multi-Agent
  - Evolved trust priors and plasticity in interacting populations
    - [Interactions between Learning and Evolution](https://www.semanticscholar.org/paper/Interactions-between-learning-and-evolution-Ackley-Littman/675be3c1f8a57015a91be5cd191a8d262a9061fb) - Ackley & Littman (1991)
  - Full deep-dive
    - [The Baldwin Effect](/learning-selection-interaction/baldwin-effect)
  - [Two-Timescale Theory](/learning-selection-interaction/theory#a-two-timescale-theory-of-cooperation)
    - Lifetime learning (fast) coupled with generational evolution (slow)
    - [Evolution and Learning: The Baldwin Effect Reconsidered](https://direct.mit.edu/books/edited-volume/2826/Evolution-and-LearningThe-Baldwin-Effect) - Weber & Depew (book)
    - [Interactions between Learning and Evolution: The Outstanding Strategy Generated by the Baldwin Effect](https://doi.org/10.7551/mitpress/1432.003.0027) - Arita & Suzuki (2000)
    - [How Learning Can Change the Course of Evolution](https://doi.org/10.1371/journal.pone.0219502) - Aguilar, Bennati & Helbing (2019)
    - [Evolving Self-taught Neural Networks: The Baldwin Effect and the Emergence of Intelligence](https://arxiv.org/abs/1906.08854) - Le (2019)
    - [Meta-Learning by the Baldwin Effect](https://doi.org/10.1145/3205651.3208249) - Fernando et al. (2018)
    - [Embodied Intelligence via Learning and Evolution](https://doi.org/10.1038/s41467-021-25874-z) - Gupta et al. (2021)
    - [Learning to Acquire Novel Cognitive Tasks with Evolution, Plasticity and Meta-Meta-Learning](https://proceedings.mlr.press/v202/miconi23a.html) - Miconi (2021)
    - [LaSER: How Learning Can Guide the Evolution of Equations](https://arxiv.org/abs/2505.17309) - Le & Bongard (2025)
`;

# Related Research

## Mindmap

A visual, foldable overview of the concepts covered on the [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) page. **Nature vs Nurture** (plus a **Hybrids** branch) is the top-level split. Nature, Life-time Learning, and Hybrids each split further into **Individual** and **Multi-Agent** contexts; Cultural Inheritance, Developmental & Epigenetic Inheritance, and Material & Economic Inheritance round out Nurture beyond learning — these three are conceptual/literature branches rather than algorithms this project currently models. Every named concept or algorithm is its own node, with the paper or book behind it nested directly beneath it (shown in white, underlined) rather than packed onto one line. Click a node's circle to expand or collapse its branch, click its label to jump to that section, and drag or scroll to pan and zoom.

<InteractionMindmap markdown={natureNurtureOutline} height="720px" />

---

## PredPreyGrass in the literature

Research at the intersection of multi-agent reinforcement learning (MARL), agent-based ecology, and artificial life spans several largely separate literatures. [PredPreyGrass](/learning-selection-interaction/predpreygrass) builds on foundations from all three, but differs from each individually by combining multi-trophic resource dynamics, energy-based metabolism, lineage-aware reproduction, and mutation-driven variation within one multi-agent RL environment. This section summarizes the most relevant work across those literatures and where PredPreyGrass sits relative to it.

## RL-based predator-prey systems

Predator-prey interaction has long served as a testbed for emergent multi-agent behavior. Park, Lee, Kim, Ahn, and Park (2021) introduced a grid-world predator-prey system in which predators and prey alternately train approximate best-response policies, producing oscillatory population dynamics reminiscent of Lotka-Volterra cycles and simple spatial self-organization — but without resource flow, energy metabolism, reproduction, or evolutionary processes. Wang, Cheng, and Wang (2019, 2020) developed DQN-based predator-prey environments in which both species learn under adversarial reward structures, demonstrating co-adaptation and fluctuating population trajectories, but with fixed population sizes and no trophic base, starvation, or reproduction. PettingZoo's *Pursuit* environment and OpenAI's Multi-Agent Particle Environment (*simple_tag*) similarly frame predator-prey interaction as a pursuit-evasion problem without ecological structure, metabolism, or population turnover.

The Vectorized Multi-Agent Simulator (VMAS), from Bettini, Kortvelesy, Blumenkamp, and Prorok (2022), provides fast, differentiable, PyTorch-based multi-agent physics tasks — including pursuit-evasion scenarios — for MARL benchmarking, emphasizing batched simulation speed and gradient-based policy learning over ecological realism: it has no trophic structure, resource metabolism, reproduction, or mutation-driven lineage change, making it complementary to PredPreyGrass rather than overlapping with it.

More recently, Moreira, Wydmuch, Zawalski, Kwiatkowski, and Jaśkowski (2024) showed that predators trained jointly with PPO can spontaneously adopt complementary roles — chaser versus ambusher — in a collaborative-hunting task. That is an important step toward biologically plausible multi-agent coordination, but the task is episodic and non-evolutionary, with no resource layer, trophic cascade, or multi-generational dynamics. PredPreyGrass instead lets cooperative or competitive behavior emerge inside a continuously evolving ecological-evolutionary system, rather than a fixed episodic task.

## Agent-based ecological and evolutionary models

Agent-based ecology has modeled predator-prey-resource systems extensively. The NetLogo *Wolf-Sheep Predation* model (Wilensky, 1997) incorporates energy budgets, reproduction, starvation, and a renewable grass layer, and general agent-based modeling practice for this kind of system is well documented (Railsback & Grimm, 2011). These models capture real ecological mechanics, but agents follow fixed behavioral rules rather than learning policies; extensions with simple genetic evolution typically evolve fixed behavioral parameters rather than learned policies. Toolkits such as Repast (North, Collier, & Vos, 2006) support richer spatial and demographic dynamics in the same style — population cycles, trophic cascades, niche competition — again without reinforcement learning or multi-policy coevolution. PredPreyGrass is closest in spirit to this line of work, but departs from it by letting behavioral strategies be *learned* through deep MARL, while reproduction and mutation separately drive population-level evolutionary change across generations.

## Artificial life, digital evolution, and open-ended learning

Artificial life platforms such as Avida (Ofria & Wilke, 2004) and Tierra (Ray, 1991) model evolution in silico through reproduction, mutation, and selection acting on digital genomes, supporting lineage tracking and genuinely open-ended adaptation (Taylor et al., 2016) — but their organisms are not embodied in a spatial predator-prey environment, and behavior arises from evolved machine code rather than a trained policy. Open-ended learning systems such as POET (Ecoffet, Huizinga, Lehman, Stanley, & Clune, 2021) and DeepMind's large-scale open-ended agent work (Open-Ended Learning Team et al., 2021) pursue continual skill innovation through environment-agent co-evolution, emphasizing behavioral diversity and emergent capability — but without biological embodiment: organisms in these systems do not metabolize resources or exist within a trophic structure, and evolution happens at the level of policies or tasks rather than organisms in an ecosystem. PredPreyGrass sits between these two traditions, combining multi-generational adaptation of learned policies, mutation of heritable agent traits, and lineage-based dynamics within a fully embodied ecological system — behavioral adaptation (via RL) and evolutionary adaptation (via reproduction and mutation) proceeding simultaneously, which is uncommon in either literature on its own.

## Positioning of PredPreyGrass

Across this body of work, no single framework we are aware of combines all of: a three-level trophic ecology (grass, prey, predators); energy-based metabolism and resource flow; birth, death, reproduction, and multi-generational population turnover; mutation-driven lineage diversification; multiple co-evolving behavioral variants within a species; deep multi-agent RL for within-lifetime behavioral adaptation; and long-run, open-ended eco-evolutionary dynamics. The comparison below summarizes where PredPreyGrass sits relative to a representative sample of adjacent environments and toolkits (✓ present, — absent, ~ partial or abstracted).

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped site-table--wide">
    <colgroup>
      <col style={{ width: '20%' }} />
      <col style={{ width: '16%' }} />
      <col style={{ width: '16%' }} />
      <col style={{ width: '16%' }} />
      <col style={{ width: '16%' }} />
      <col style={{ width: '16%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Dimension</th>
        <th>PredPreyGrass</th>
        <th>VMAS</th>
        <th>Melting Pot</th>
        <th>NetLogo</th>
        <th>POET</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Primary focus</td>
        <td>Ecological dynamics + learning</td>
        <td>Scalable MARL benchmarking</td>
        <td>Social dilemmas &amp; norms</td>
        <td>Agent-based modeling</td>
        <td>Open-ended curriculum</td>
      </tr>
      <tr>
        <td>Deep multi-agent RL</td>
        <td>✓ PPO (RLlib)</td>
        <td>✓ PPO/MAPPO</td>
        <td>✓ PPO/DQN-style</td>
        <td>—</td>
        <td>~ (ES/RL hybrids)</td>
      </tr>
      <tr>
        <td>Population size</td>
        <td>Variable, endogenous</td>
        <td>Fixed</td>
        <td>Fixed</td>
        <td>Variable</td>
        <td>Fixed per environment</td>
      </tr>
      <tr>
        <td>Birth &amp; death (endogenous)</td>
        <td>✓</td>
        <td>—</td>
        <td>—</td>
        <td>✓</td>
        <td>—</td>
      </tr>
      <tr>
        <td>Energy budgets / metabolism</td>
        <td>✓ (grass → prey → predator)</td>
        <td>—</td>
        <td>~ (abstract)</td>
        <td>✓</td>
        <td>—</td>
      </tr>
      <tr>
        <td>Lineages / generations</td>
        <td>✓</td>
        <td>—</td>
        <td>—</td>
        <td>✓</td>
        <td>—</td>
      </tr>
      <tr>
        <td>Co-evolution of behavior</td>
        <td>✓</td>
        <td>—</td>
        <td>—</td>
        <td>~ (manual)</td>
        <td>✓ (env-agent)</td>
      </tr>
      <tr>
        <td>External reward shaping</td>
        <td>Minimal (sparse)</td>
        <td>Heavy</td>
        <td>Heavy</td>
        <td>None</td>
        <td>Heavy</td>
      </tr>
      <tr>
        <td>Main research question</td>
        <td><em>Which behaviors survive?</em></td>
        <td><em>How do agents coordinate?</em></td>
        <td><em>When do agents cooperate?</em></td>
        <td><em>What patterns emerge?</em></td>
        <td><em>How do skills accumulate?</em></td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Positioning of PredPreyGrass relative to related multi-agent and ecological modeling environments.</figcaption>
</figure>

---

## References

- Bettini, M., Kortvelesy, R., Blumenkamp, J., & Prorok, A. (2022). *VMAS: A Vectorized Multi-Agent Simulator for Collective Robot Learning*. The 16th International Symposium on Distributed Autonomous Robotic Systems (DARS). https://arxiv.org/abs/2207.03530
- Ecoffet, A., Huizinga, J., Lehman, J., Stanley, K. O., & Clune, J. (2021). *First return, then explore*. *Nature*, 590, 580-586. https://doi.org/10.1038/s41586-020-03157-9
- Jaderberg, M., Dalibard, V., Osindero, S., Czarnecki, W. M., Donahue, J., Razavi, A., Vinyals, O., Green, T., Dunning, I., Simonyan, K., Fernando, C., & Kavukcuoglu, K. (2017). *Population Based Training of Neural Networks*. arXiv:1711.09846. https://arxiv.org/abs/1711.09846
- Moreira, C., Wydmuch, M., Zawalski, M., Kwiatkowski, M., & Jaśkowski, W. (2024). *Collaborative hunting in artificial agents with deep reinforcement learning*. *eLife*, 13, RP85694. https://doi.org/10.7554/eLife.85694
- North, M. J., Collier, N. T., & Vos, J. R. (2006). *Experiences creating three implementations of the Repast agent modeling toolkit*. *ACM Transactions on Modeling and Computer Simulation*, 16(1), 1-25. https://doi.org/10.1145/1122012.1122013
- Ofria, C., & Wilke, C. O. (2004). *Avida: A Software Platform for Research in Computational Evolutionary Biology*. *Artificial Life*, 10(2), 191-229. https://doi.org/10.1162/106454604773563612
- Park, J., Lee, J., Kim, T., Ahn, I., & Park, J. (2021). *Co-evolution of predator-prey ecosystems by reinforcement learning agents*. *Entropy*, 23(4), 461. https://doi.org/10.3390/e23040461
- Railsback, S. F., & Grimm, V. (2011). *Agent-Based and Individual-Based Modeling: A Practical Introduction*. Princeton University Press.
- Ray, T. S. (1991). *An approach to the synthesis of life*. In C. Langton et al. (Eds.), *Artificial Life II* (pp. 371-408). Addison-Wesley.
- Taylor, T., Bedau, M. A., Channon, A., et al. (2016). *Open-Ended Evolution: Perspectives from the OEE Workshop in York*. *Artificial Life*, 22(3), 408-423. https://doi.org/10.1162/artl_a_00210
- Open-Ended Learning Team, Stooke, A., Mahajan, A., Barros, C., Deck, C., Bauer, J., Sygnowski, J., Trebacz, M., Jaderberg, M., Mathieu, M., McAleese, N., Bradley-Schmieg, N., Wong, N., Porcel, N., Raileanu, R., Hughes-Fitt, S., Dalibard, V., & Czarnecki, W. M. (2021). *Open-ended learning leads to generally capable agents*. arXiv:2107.12808. https://arxiv.org/abs/2107.12808
- Terry, J. K., Black, B., Grammel, N., et al. (2021). *PettingZoo: Gym for Multi-Agent Reinforcement Learning*. NeurIPS 2021 Track on Datasets and Benchmarks. https://pettingzoo.farama.org/
- Wang, X., Cheng, J., & Wang, L. (2019). *Deep-reinforcement-learning-based co-evolution in a predator-prey system*. *Entropy*, 21(8), 773. https://doi.org/10.3390/e21080773
- Wang, X., Cheng, J., & Wang, L. (2020). *A reinforcement learning-based predator-prey model*. *Ecological Complexity*, 42, 100815. https://doi.org/10.1016/j.ecocom.2020.100815
- Wilensky, U. (1997). *NetLogo Wolf-Sheep Predation Model*. Northwestern University Center for Connected Learning and Computer-Based Modeling. https://ccl.northwestern.edu/netlogo/models/WolfSheepPredation
