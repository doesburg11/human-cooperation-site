---
id: related-research-predpreygrass
title: Related Research
sidebar_position: 6
slug: /learning-selection-interaction/related-research-predpreygrass
---

# Related Research

Research at the intersection of multi-agent reinforcement learning (MARL), agent-based ecology, and artificial life spans several largely separate literatures. [PredPreyGrass](/learning-selection-interaction/predpreygrass) builds on foundations from all three, but differs from each individually by combining multi-trophic resource dynamics, energy-based metabolism, lineage-aware reproduction, and mutation-driven variation within one multi-agent RL environment. This page summarizes the most relevant work across those literatures and where PredPreyGrass sits relative to it.

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

<figure style={{ margin: '0 0 2rem' }}>
<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', minWidth: '900px', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '22%' }} />
      <col style={{ width: '13%' }} />
      <col style={{ width: '13%' }} />
      <col style={{ width: '13%' }} />
      <col style={{ width: '13%' }} />
      <col style={{ width: '13%' }} />
      <col style={{ width: '13%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Dimension</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>PredPreyGrass</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>VMAS</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Melting Pot</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>NetLogo</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>POET</th>
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
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
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
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
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
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
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
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
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
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Positioning of PredPreyGrass relative to related multi-agent and ecological modeling environments.</figcaption>
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
