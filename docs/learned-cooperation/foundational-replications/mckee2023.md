---
id: mckee2023
title: The McKee et al. (2023) Reputation Replication
sidebar_position: 3
slug: /learned-cooperation/mckee2023
---

import GithubLink from '@site/src/components/GithubLink';

# The McKee et al. (2023) Reputation Replication

<GithubLink href="https://github.com/doesburg11/SequentialSocialDilemmas" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>McKee, Hughes, Zhu, Chadwick, Koster, Castañeda, Beattie, Graepel, Botvinick & Leibo (2023), *A Multi-Agent Reinforcement Learning Model of Reputation and Cooperation in Human Groups*, asks whether an intrinsic motivation for <strong>reputation</strong> — an aversion to having a worse standing than the group average — can, on its own, produce the same group coordination strategies that DeepMind's human participants showed when they could see each other's contributions (an <strong>identifiable</strong> condition) versus when they couldn't (<strong>anonymous</strong>).</div>

This is the **learned, reinforcement-learning analog of indirect reciprocity** — see [Indirect Reciprocity](/evolved-cooperation/indirect-reciprocity) for the evolutionary/analytical version of the same underlying idea (cooperation sustained by reputation rather than repeated one-on-one encounters), built with a Moran-process engine instead of deep RL. The paper's specific claim: identifiable agents, motivated purely by an intrinsic reputation term added to their reward, should show *higher* cooperation, *less* territorial division of the shared resource, and *more* turn-taking than anonymous agents — group-coordination strategies that emerge from reputation-seeking alone, with no other change to the environment or training setup.

It reuses the same **Cleanup** public-goods environment central to [Hughes et al. (2018)](/learned-cooperation/hughes2018) — a river that needs cleaning, an orchard whose regrowth depends on it — with an added reputation reward term and a manipulation of what each agent can observe about the group's contributions.

## 2. The mechanism

Each agent's reward is its ordinary Cleanup reward plus a reputation term:

```
r_i = −α · max(c̄ − c_self, 0) − β · max(c_self − c̄, 0)
```

where `c_self` is the agent's own smoothed record of recent contributions (cleaning actions) and `c̄` is the group's mean. Falling behind the group average costs the larger `α`; exceeding it costs the smaller `β` — the term mostly punishes free-riding, with a lighter penalty for over-contributing. In the **identifiable** condition this term is added to reward as above; in **anonymous**, contributions are still tracked (for the metrics below) but the term is withheld entirely.

Two metrics from the paper's own supplementary information are computed post-hoc from rollout trajectories to test the claim directly:

- **Territoriality** — whether the same group members tend to visit the same river locations (low) or whether agents stake out disjoint "territories" (high). The paper predicts identifiability *lowers* this.
- **Turn-taking** — a recency-weighted score over the sequence of agents entering the river. The paper predicts identifiability *raises* this, and that it's positively associated with collective return.

## 3. This site's replication

An implementation of the reputation mechanism and both metrics, layered on top of the [SequentialSocialDilemmas](https://github.com/doesburg11/SequentialSocialDilemmas) repository's Cleanup environment (an engineering port of the original open-source SSD codebase to Ray RLlib's current API stack — see that repository's own README for how it relates to [Leibo2017](/learned-cooperation/leibo2017) and [Hughes2018](/learned-cooperation/hughes2018)), is available there under `cleanup_reputation`.

## 4. Status: training collapses before reputation can matter

<div style={{ backgroundColor: '#FBEAEA', border: '1px solid #F5D6D6', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This experiment does not currently produce meaningful cleaning behavior in <strong>either</strong> condition, so it cannot test the paper's identifiable-vs-anonymous claim at all. A 6-run comparison (identifiable/anonymous × 3 seeds, PPO, 5 agents, 10M steps each) ends with near-zero return and near-zero successful cleaning across the board — split into two distinct patterns: total avoidance of the river (4 of 6 runs) versus agents occupying the river almost the entire episode without ever cleaning it (the other 2).</div>

Before this experiment could even be run, four real bugs in the underlying training/rollout pipeline had to be found and fixed — the pipeline had only ever been smoke-tested (random-policy only) before, never trained to completion. A control run of plain Cleanup, with the reputation mechanism entirely disabled, collapses the same way — so reputation shaping is not what's causing the failure. The environment's own punishment/sanctioning beam (firing costs the firer a small penalty; *being hit* costs the target a much larger one, roughly 50× an apple's reward) is a plausible explanation — an untrained, near-random policy would fire and get hit constantly, and that overwhelming penalty signal is a plausible route into a degenerate "never engage" policy before any cleaning behavior can be discovered — but this remains an unconfirmed hypothesis: no fire/hit telemetry was collected, and no ablation with the beam disabled has been run.

This means the same underlying environment — Cleanup, with a punishment beam — has now failed to support a working baseline for two independent reward-shaping mechanisms built on top of it: [Hughes et al. (2018)](/learned-cooperation/hughes2018)'s inequity aversion (a different, simpler Cleanup variant without this punishment beam, which *did* learn to clean but still didn't reproduce the paper's headline comparison) and this reputation mechanism (which doesn't get far enough to clean at all). That's consistent with, though doesn't prove, a more basic lesson: layering a social-cognitive reward mechanism on an environment that a plain policy struggles to solve in the first place is unlikely to produce a fair test of that mechanism's claim.

## References

- McKee, K. R., Hughes, E., Zhu, T. O., Chadwick, M. J., Koster, R., Castañeda, A. G., Beattie, C., Graepel, T., Botvinick, M., & Leibo, J. Z. (2023). "A Multi-Agent Reinforcement Learning Model of Reputation and Cooperation in Human Groups." arXiv:2103.04982.
- Hughes, E., et al. (2018). "Inequity Aversion Improves Cooperation in Intertemporal Social Dilemmas." *NeurIPS 2018*.
- Nowak, M. A., & Sigmund, K. (1998). "Evolution of Indirect Reciprocity by Image Scoring." *Nature*, 393, 573–577.
