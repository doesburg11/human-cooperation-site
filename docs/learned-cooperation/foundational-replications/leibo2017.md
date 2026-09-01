---
id: leibo2017
title: The Leibo et al. (2017) Sequential Social Dilemmas
sidebar_position: 1
slug: /learned-cooperation/leibo2017
---

# The Leibo et al. (2017) Sequential Social Dilemmas

Source code: [Leibo2017](https://github.com/doesburg11/Leibo2017) repository.

## 1. The question the paper asks

Matrix games like Prisoner's Dilemma have guided social-dilemma research for decades, but they force cooperate/defect into a single, atomic, one-shot choice. Real social dilemmas — over-fishing a commons, sharing space with a rival forager — unfold over many time steps in a shared environment, and whether an individual is "cooperating" at all has to be inferred from a whole trajectory of spatial behavior, not read off a payoff table. Leibo, Zambaldi, Lanctot, Marecki & Graepel (2017), *Multi-agent Reinforcement Learning in Sequential Social Dilemmas* (AAMAS 2017), ask what happens when independent reinforcement learners are dropped into environments with this structure, and whether the resulting policies still behave like a classical matrix-game dilemma once you look at them the right way.

Their answer: yes, but only in aggregate. A **Sequential Social Dilemma (SSD)** is a partially-observable Markov game that, when you empirically extract the payoffs induced by "cooperative" versus "defecting" *policies* — not actions — satisfies the same inequalities that define a matrix-game social dilemma (mutual cooperation beats mutual defection, beats being exploited, etc.). The Markov game itself is richer than the matrix game it reduces to, and that extra richness — specifically, how *hard* cooperation or defection are to actually implement, not just their payoff values — turns out to change which social outcomes are easy to learn.

## 2. Two environments, deliberately structured to disagree

The paper's central empirical move is choosing two Markov games that reduce to the *same* matrix game (Prisoner's Dilemma) under the classical analysis, then showing they behave oppositely once their sequential structure is taken into account.

- **Gathering.** Two players collect apples (+1 reward, removed on pickup, respawning after a fixed delay) in a shared map. Either player can fire a beam; two hits tag a rival, removing them from the game for a fixed number of steps. Tagging gives no reward — its only function is eliminating a competitor. Defection here means "aggressive": frequent tagging to reduce a rival's access to apples.
- **Wolfpack.** Two wolves chase a prey. A wolf that touches the prey alone gets a small reward; if its partner is also within a capture radius when that happens, both get a substantially larger reward instead. Cooperation here means active pack coordination — finding the prey together, or waiting for a partner before closing in — rather than solo opportunism.

The punchline: in Gathering, **cooperative policies are easier to learn** (they only need to track apples, largely ignoring the rival), while defection requires the harder skill of aiming a beam at a moving target. In Wolfpack it's reversed — **solo, lone-wolf capture is the easy default**, while joint capture requires the harder skill of coordinating with a partner. Manipulating network capacity makes this concrete: larger networks make Gathering agents *more* aggressive (defection is the thing that needed more capacity to learn) but make Wolfpack agents *more* cooperative (coordination was the thing that needed it) — the opposite direction, from the same manipulation, in environments that look identical under matrix-game analysis alone.

## 3. Independent DQN as the learning mechanism

Both games are trained with two fully independent deep Q-learners (Sec. 3.1) — each with its own small network (a two-hidden-layer, 32-unit-by-default MLP over an agent-centered, orientation-dependent RGB crop of the map), its own size-capped and constantly-refreshed replay buffer, and no communication or shared parameters. Each agent treats the other purely as a (slowly) non-stationary part of the environment — deliberately the simplest possible multi-agent learning rule, chosen so that whatever social structure emerges is attributable to the environment's own incentive structure, not to any built-in coordination mechanism.

## 4. Recovering a matrix game from a Markov game

To check that Gathering and Wolfpack really are SSDs and not just "games where sometimes people are mean to each other," the paper runs an **empirical game-theoretic analysis (EGTA)**: train policy pools under environment settings pushed toward one behavioral extreme (e.g. high apple abundance / low conflict-cost, or high capture-radius / high group-bonus) to get a cooperative pool Π<sup>C</sup>, and the opposite extreme to get a defecting pool Π<sup>D</sup>. Sampling pairs from Π<sup>C</sup>×Π<sup>C</sup>, Π<sup>D</sup>×Π<sup>D</sup>, and the two mixed combinations, then averaging returns, produces an empirical payoff matrix (R, P, S, T) — mutual-cooperation, mutual-defection, sucker, and temptation payoffs. Classifying that matrix by `fear = P − S` and `greed = T − R` sorts it into Prisoner's Dilemma, Chicken, Stag Hunt, or a non-dilemma outcome, using exactly the inequalities that define a *matrix* social dilemma — just applied to policies sampled from a *Markov* game rather than to atomic actions.

## 5. Why this belongs beside the Baldwin-effect replications, but in its own category

The [Foundational Replications](/learning-selection-interaction/ackley-littman-1991) under Learning × Selection Interaction Models — Hinton & Nowlan, Ackley & Littman, Prosser — all study how within-lifetime learning interacts with genetic evolution across generations. Leibo et al. (2017) has no evolutionary component at all: both learners exist for the whole run, nothing is selected or reproduced, and the entire phenomenon of interest — cooperation emerging or failing to emerge — plays out purely through learning within a single population of two. That's precisely why it's filed as a sibling **Foundational Replications** category here, under **Learned Cooperation Models** rather than under the learning × selection section: it's a foundational, from-scratch-replicated result about learning-driven cooperation on its own terms, the same relationship Hinton & Nowlan / Ackley & Littman / Prosser have to the evolution × learning question.

## 6. This site's from-scratch replication

A from-scratch replication of both environments, the paper's own independent-DQN method, and all three of its named experiments (the Fig. 4 abundance/conflict-cost and radius/group-bonus sweeps, the Fig. 5–6 EGTA classification, and the Fig. 7 hyperparameter ablations) is available in the [Leibo2017](https://github.com/doesburg11/Leibo2017) repository, alongside an optional Ray RLlib backend for training the same environments with a standard library's algorithms as a cross-check.

**What's matched vs. necessarily adapted.** The action space (8 agent-centered actions), the `(3, 16, 21)` agent-centered observation shape, the default network size, the epsilon-greedy schedule, the growing/refreshed replay buffer, and the Q-learning update rule are all implemented exactly as the paper states them. What the paper simply doesn't publish — the exact map layout (only Fig. 3's small illustrative screenshot exists), the learning rate, whether a target network is used, and Wolfpack's prey behavior (never specified at all, and had to be tuned so a scripted stand-in prey is neither trivially caught nor impossible for epsilon-greedy exploration to ever catch by chance) — is reconstructed and explicitly flagged as such in the repository's own README, rather than presented as verified.

**Status.** The environments, independent-DQN agents, and all three experiment scripts are built and pass an automated test suite (including a caught-and-fixed observation-rotation bug and a tag-cooldown off-by-one), and every script has been run end-to-end at small smoke-test scale to confirm the training pipeline itself is correct. No run has yet been taken to the paper's own scale (40,000,000 steps per swept condition) to produce a converged, publishable Fig. 4/6/7-style result — that's tracked as open work, not yet claimed here.

## References

- Leibo, J. Z., Zambaldi, V., Lanctot, M., Marecki, J., & Graepel, T. (2017). "Multi-agent Reinforcement Learning in Sequential Social Dilemmas." *Proceedings of AAMAS 2017*.
- Mnih, V., et al. (2015). "Human-level control through deep reinforcement learning." *Nature*, 518(7540), 529–533.
