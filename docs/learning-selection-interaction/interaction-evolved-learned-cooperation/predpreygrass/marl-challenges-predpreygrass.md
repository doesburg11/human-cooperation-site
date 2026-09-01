---
id: marl-challenges-predpreygrass
title: Challenges of Multi-Agent Reinforcement Learning in PredPreyGrass
sidebar_position: 5
slug: /learning-selection-interaction/marl-challenges-predpreygrass
---

# Challenges of Multi-Agent Reinforcement Learning in PredPreyGrass

Multi-agent reinforcement learning is a promising tool for studying emergent behavior, but it is genuinely harder than single-agent RL, not just a bigger version of it. Building [PredPreyGrass](/learning-selection-interaction/predpreygrass) surfaces most of the field's core difficulties in a concrete form.

## What makes it hard

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <colgroup>
      <col style={{ width: '26%' }} />
      <col style={{ width: '74%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Challenge</th>
        <th>What it means in PredPreyGrass</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Non-stationarity</strong></td>
        <td>Every agent's behavior shifts the effective environment for every other agent. A predator policy that works against today's prey population may fail once prey adapt in response — there is no fixed target to converge to.</td>
      </tr>
      <tr>
        <td><strong>Scalability</strong></td>
        <td>The joint action space grows with population size, and with it the coordination problem — especially once multiple agent types (e.g. different speeds) are introduced.</td>
      </tr>
      <tr>
        <td><strong>Credit assignment</strong></td>
        <td>When prey survive, was it their evasion or a predator's mistake? When a hunt succeeds, which predator's approach was decisive? Poor credit assignment can teach agents the wrong lesson from the right outcome.</td>
      </tr>
      <tr>
        <td><strong>Coordination and equilibria</strong></td>
        <td>Predators may need to corner prey jointly; prey may benefit from clustering or dispersing as a group. The system can also settle into suboptimal equilibria — predators chasing grass instead of prey, or prey overgrazing until they starve themselves.</td>
      </tr>
      <tr>
        <td><strong>Exploration</strong></td>
        <td>Random movement rarely produces a coordinated hunt or a successful evasion often enough to learn from. Useful experience is rare by default, not just hard to exploit once found.</td>
      </tr>
      <tr>
        <td><strong>Partial observability</strong></td>
        <td>Each agent sees only a local window. Formally, this makes the environment a Dec-POMDP (decentralized partially observable Markov decision process) — a class of problems that is computationally hard in general, because no single agent has access to the full state that determines everyone's outcomes.</td>
      </tr>
      <tr>
        <td><strong>No explicit communication</strong></td>
        <td>There is no signaling channel — no "prey spotted" call, no alarm. Any coordination that emerges has to happen implicitly, through movement patterns other agents can observe and react to.</td>
      </tr>
      <tr>
        <td><strong>Stability</strong></td>
        <td>Predator-prey population counts naturally resemble Lotka-Volterra oscillations, and training can collapse outright if one population goes extinct — predators starving out, prey overpopulating, or grass being grazed faster than it regenerates.</td>
      </tr>
      <tr>
        <td><strong>Evaluation</strong></td>
        <td>Episode reward alone does not capture what actually matters here — ecosystem persistence. Population balance, survival rates, and the diversity of strategies in play are better signals of whether a run is actually working.</td>
      </tr>
      <tr>
        <td><strong>Open-endedness</strong></td>
        <td>Predators get faster, prey evolve better evasion, grass pressure shifts as a result, and the cycle continues — a Red Queen dynamic (Van Valen, 1973) in which standing still relative to an adapting opponent is itself a form of falling behind. The challenge is sustaining that ongoing adaptation without it collapsing into stagnation or extinction.</td>
      </tr>
    </tbody>
  </table>
</div>
</figure>

## Reward design: sparse, and why magnitude matters

Rewards are the supervised part of an otherwise unsupervised-looking learning loop: whatever the designer chooses to reward is what gets optimized, which is a source of bias by construction. PredPreyGrass's [base configuration](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/base_environment/config_env.py) tries to minimize that bias by keeping the reward as sparse as possible: both predators and prey are rewarded only for reproducing, with no reward for eating, moving, or simply surviving a step. Chasing, evading, and foraging all emerge as instrumental behavior — an agent has to do those things to reach reproduction, not because any of them are directly rewarded. The [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log) later tested this design choice directly, comparing sparse rewards against four denser, shaped alternatives, and sparse rewards won on reproduction rate, population balance, and extinction avoidance.

Sparse is not the same as small, though. In early experiments, raising the reproduction reward from 1.0 to 10.0 — with nothing else changed — was the difference between populations that survived and adapted, and populations that consistently collapsed. With PPO's reward normalization and advantage clipping, a signal of 1.0 for a rare event gets lost in the variance of an episode; 10.0 was large enough to produce a gradient update worth learning from. The base configuration's current [`reproduction_reward_predator`](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/base_environment/config_env.py) and `reproduction_reward_prey` are both `10.0` (values current at time of writing). The general point generalizes beyond this environment: in a sparse-reward setting, the magnitude of the rare positive signal is not a free parameter — too small, and it is invisible to the optimizer no matter how correct the sparsity choice was.

## Agent activation order

A detail that is easy to overlook: the order in which agents take their turn can materially change a simulation's outcome, not just its runtime (Comer, 2014). Most multi-agent algorithms handle simultaneous stepping — all agents act at once — far more easily than strictly sequential stepping, which is much harder to reason about and to parallelize. This is a general property of agent-based and multi-agent systems, not specific to PredPreyGrass, but it is a design choice worth stating explicitly rather than leaving implicit, since a fixed versus random activation order is exactly the kind of detail that silently shapes emergent outcomes.

## Centralized versus decentralized training

An early version of PredPreyGrass, built on [PettingZoo](https://pettingzoo.farama.org/) and Stable-Baselines3, trained predators and prey through a single, unified network — because SB3, like most single-agent RL libraries, was not originally designed for multiple independently-acting agents. That earlier setup is preserved as a [legacy repository](https://github.com/doesburg11/PredPreyGrass-pettingzoo-legacy) for comparison. The current [base environment](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/base_environment) instead trains predators and prey as separate, decentralized policies using RLlib, letting each species specialize rather than sharing one network across fundamentally different roles. That specialization is not free: because concurrent agents are now genuinely part of the environment rather than folded into one combined "super-agent," the effective environment complexity — and with it, training time — increases substantially compared to the centralized setup.

## What counts as a solution here

Shoham, Powers, and Grenager's (2007) landmark paper on multi-agent learning identifies multiple distinct research agendas — computational, descriptive, normative, and two prescriptive variants (cooperative and non-cooperative) — and argues that much confusion in the field comes from not being explicit about which one a given project is pursuing. This project's PredPreyGrass work follows the *descriptive* agenda: the goal is to use MARL to model, and so describe, real behavior, with as few built-in assumptions as possible, rather than to prescribe what agents ought to do.

That choice has a consequence for what "solving" PredPreyGrass even means. There is no single end state in which every agent simultaneously reaches an individually optimal outcome — an equilibrium concept like a Nash equilibrium is not the right target for an open-ended, co-evolving population. A more fitting target is a *process* concept: not a static state but an ongoing dynamic that keeps ecological and behavioral change alive rather than converging to stasis. Concretely, that dynamic holds when three conditions are met together over an extended period: **ecological persistence** — no major agent type goes permanently extinct; **behavioral turnover** — the population's strategies keep changing rather than settling; and **mutual responsiveness** — each population's adaptation measurably reshapes the fitness landscape the other population faces, which is what prevents the whole system from settling into a fixed point in the first place.

---

## References

- Comer, K. W. (2014). *Who Goes First? An Examination of the Impact of Activation on Outcome Behavior in Agent-Based Models* [Doctoral dissertation, George Mason University]. http://complexityexplorer.s3.amazonaws.com/Mesa+ABM/Comer_gmu_0883E_10539.pdf
- Shoham, Y., Powers, R., & Grenager, T. (2007). *If multi-agent learning is the answer, what is the question?* *Artificial Intelligence*, 171(1), 365-377. https://doi.org/10.1016/j.artint.2006.02.006
- Van Valen, L. (1973). *A new evolutionary law*. *Evolutionary Theory*, 1, 1-30.
