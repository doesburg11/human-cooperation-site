---
id: hughes2018
title: The Hughes et al. (2018) Inequity Aversion Replication
sidebar_position: 2
slug: /learned-cooperation/hughes2018
---

import GithubLink from '@site/src/components/GithubLink';

# The Hughes et al. (2018) Inequity Aversion Replication

<GithubLink href="https://github.com/doesburg11/Hughes2018" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>[Leibo et al. (2017)](/learned-cooperation/leibo2017) showed that independent reinforcement learners dropped into a spatial social dilemma don't automatically cooperate — the environment's own structure decides whether cooperation or defection is the easy default. Hughes, Leibo, Phillips, Tuyls, Dueñez-Guzmán, Castañeda, Dunning, Zhu, McKee, Koster, Roff & Graepel (2018), *Inequity Aversion Improves Cooperation in Intertemporal Social Dilemmas* (NeurIPS 2018), ask whether giving agents an *intrinsic* motivation — an aversion to unequal outcomes, borrowed from behavioral-economics models of human fairness preferences — can push that default toward cooperation, without any change to the extrinsic reward structure itself.</div>

Their answer, in the paper: yes, and the mechanism matters in a specific, asymmetric way. An agent with **disadvantageous inequity aversion** feels bad about earning *less* than its groupmates (envy); one with **advantageous inequity aversion** feels bad about earning *more* (guilt). The paper's headline claim is that guilt — the advantageous term — is what actually drives cooperation up in **Cleanup**, a public-goods dilemma where apples only regrow if someone cleans a shared river that yields no reward itself. In **Harvest**, a tragedy-of-the-commons dilemma with no such division-of-labor structure, both terms contribute more symmetrically.

## 2. The mechanism: subjective reward, not objective reward

Each agent's actual training reward is not its raw extrinsic payoff `r_e` (apples eaten) but a modified subjective reward:

```
r_i = r_e^i − (α / (n−1)) · Σ max(r_e^j − r_e^i, 0) − (β / (n−1)) · Σ max(r_e^i − r_e^j, 0)
```

where the first sum (weighted by `α`) is the *disadvantageous* term — penalizing falling behind the group — and the second (weighted by `β`) is the *advantageous* term — penalizing exceeding it. Critically, this comparison is computed over each agent's own **temporally smoothed** trace of past extrinsic rewards, not the instantaneous per-step payoff — the paper's "intertemporal" framing: an agent compares its own recent trajectory to its groupmates', not this single step's payoff to this single step's payoff.

## 3. Two environments, one mechanism, opposite predicted roles

- **Cleanup.** Apples give reward; a shared river accumulates waste over time and stops producing apples once fully polluted. Cleaning the river costs an agent foraging time and yields no reward itself — a genuine public good. The paper's Fig. 3A claims **advantageous** inequity aversion (guilt) alone — not disadvantageous, not both — is what raises collective return over an unmodified baseline here, because guilt is what makes an agent willing to accept the personally costly, group-beneficial act of cleaning.
- **Harvest.** Apples regrow faster wherever more apples already stand nearby, so over-harvesting collapses local regrowth for everyone, the harvester included. There's no division of labor to protect — cooperation here just means restraint — so the paper's Fig. 4 finds a more symmetric picture, with contributions from both the disadvantageous and advantageous terms.

## 4. This site's from-scratch replication

A from-scratch reproduction of both environments and the inequity-aversion reward mechanism, with an independent actor-critic training loop (no dependency on any other author's or repository's code), is available in the [Hughes2018](https://github.com/doesburg11/Hughes2018) repository. It's a sibling to [Leibo2017](/learned-cooperation/leibo2017) in build philosophy (from-scratch, paper text only) and shares its environment family with the [SequentialSocialDilemmas](https://github.com/doesburg11/SequentialSocialDilemmas) engineering port, which includes a simpler, opt-in version of the same inequity-aversion mechanism and hosts [this site's McKee et al. (2023) reputation experiment](/learned-cooperation/mckee2023).

**What's matched vs. simplified.** Cross-checked directly against DeepMind's own dmlab2d reference implementation and Eugene Vinitsky's independent open-source port, both environments' core mechanics (apple respawn probability, action space, observation window) are confirmed to match the paper. The subjective-reward formula above is implemented exactly as published, including the intertemporal smoothing.

## 5. Status: does not currently reproduce the paper's headline claim

<div style={{ backgroundColor: '#FBEAEA', border: '1px solid #F5D6D6', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}><strong>Cleanup:</strong> at the scale tested here, <code>advantageous_only</code> (guilt) does <strong>not</strong> beat an unmodified <code>baseline</code> on collective return — the opposite of the paper's Fig. 3A. This isn't a single inconclusive run: across two materially different environment configurations and repeated multi-seed comparisons, baseline beat <code>advantageous_only</code> in 6 of 6 individual seed comparisons. <code>disadvantageous_only</code> (envy) does collapse cooperation, consistent with the paper. <strong>Harvest:</strong> mean collective return is a near-tie across all three conditions at 3 seeds — inconclusive, though <code>disadvantageous_only</code> is notably more consistent seed-to-seed than the other two, suggestively (not confirmed) in line with the paper's own Fig. 4 story.</div>

What's been ruled out as the explanation: under-training, beta miscalibration, and seed noise were each tested directly and don't account for the gap. What hasn't been ruled out: this could be a genuine scale effect (the paper trains at a scale this from-scratch reproduction doesn't attempt to match), an unidentified environment-fidelity gap despite the cross-checks above, or a real limit on how far the mechanism generalizes outside DeepMind's own training setup. The investigation was deliberately stopped at this point and documented as the honest current state, rather than pursued indefinitely — see the repository's own README for the full multi-round comparison data.

## References

- Hughes, E., Leibo, J. Z., Phillips, M., Tuyls, K., Dueñez-Guzmán, E., Castañeda, A. G., Dunning, I., Zhu, T., McKee, K. R., Koster, R., Roff, H., & Graepel, T. (2018). "Inequity Aversion Improves Cooperation in Intertemporal Social Dilemmas." *Advances in Neural Information Processing Systems 31* (NeurIPS 2018).
- Leibo, J. Z., Zambaldi, V., Lanctot, M., Marecki, J., & Graepel, T. (2017). "Multi-agent Reinforcement Learning in Sequential Social Dilemmas." *Proceedings of AAMAS 2017*.
