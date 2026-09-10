---
id: foerster2018
title: The Foerster et al. (2018) LOLA Replication
sidebar_position: 1
slug: /learned-cooperation/foerster2018
---

import GithubLink from '@site/src/components/GithubLink';

# The Foerster et al. (2018) LOLA Replication

<GithubLink href="https://github.com/doesburg11/Foerster2018" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>The [PPO case study](/learned-cooperation/repeated-prisoners-dilemma/ppo-study) above found that independent reinforcement learners on the repeated Prisoner's Dilemma mostly rediscover all-defect, with cooperation surviving only in fragile, horizon-dependent pockets. Foerster, Chen, Al-Shedivat, Whiteson, Abbeel & Mordatch (2018), *Learning with Opponent-Learning Awareness* (AAMAS 2018), ask why: is defection simply what repeated matrix games produce under learning, or is it an artifact of each agent treating the other as a fixed, non-learning part of its environment? What changes if an agent's own update explicitly accounts for the fact that its opponent is about to take a learning step too?</div>

Their answer: a single additional term is enough. A **naive learner (NL)** does plain gradient ascent on its own expected return and, paired against another NL on the Iterated Prisoner's Dilemma (IPD), reliably converges to mutual defection — the same failure mode the PPO study above finds under an unrelated learning algorithm on the same game. **LOLA (Learning with Opponent-Learning Awareness)** instead differentiates its own expected return *through* a one-step lookahead of the opponent's anticipated gradient update — a genuinely second-order term, since it requires the gradient of a gradient. Two LOLA agents playing each other discover tit-for-tat-like reciprocity purely out of self-interest, with no communication, no built-in fairness notion, and no change to the payoff matrix.

## 2. The mechanism: differentiating through the opponent's own update

Both update rules act on the same closed-form quantity: because a memory-one strategy loses no generality against a memory-one opponent in these games, each agent's exact discounted value is available analytically as the solution of a small linear system over the four joint-outcome states, rather than needing to be estimated. The naive update is plain gradient ascent on that value, $\theta_{i+1} = \theta_i + \delta \nabla_\theta V(\theta_i)$. LOLA's update adds a correction term built from $\nabla_{\theta_1}\nabla_{\theta_2} V_2$ — the mixed second derivative of the *opponent's* value with respect to both agents' parameters — which is what lets a LOLA agent's own gradient step account for how its move will shape the opponent's next move, rather than treating that opponent as static.

The paper also derives a policy-gradient (REINFORCE) version of the same two update rules for when neither agent can evaluate the value function or its gradients exactly — the realistic deep-RL setting — trading the exact method's precision for the noise of score-function estimation from sampled rollouts.

## 3. Two repeated matrix games, one memory-one policy class

Both experiments reused here are dyadic **repeated matrix games**: the Iterated Prisoner's Dilemma and Iterated Matching Pennies, each agent's policy fully specified by 5 probabilities (cooperate/heads at the empty start state, plus one probability per joint-outcome state from the previous round: CC, CD, DC, DD). This is the same memory-one strategy representation classical direct-reciprocity theory uses for Tit-for-Tat, and the paper leans on Press & Dyson (2012)'s zero-determinant-strategy result to justify that a memory-one strategy loses nothing against a memory-one opponent — the same justification this repository's [Direct Reciprocity](/evolved-cooperation/direct-reciprocity) page's evolutionary treatment ultimately rests on too.

## 4. Relation to direct reciprocity

This is the **learned, gradient-based analog of direct reciprocity** — see [Direct Reciprocity](/evolved-cooperation/direct-reciprocity) for the evolutionary/analytical version of the same underlying idea (repeated dyadic interaction with memory sustaining reciprocal cooperation), built there with population-level replicator/Moran dynamics instead of individual learning. The classical treatment asks which strategies survive selection in a population; LOLA asks whether reciprocity emerges from a single pair of self-interested learners, with no population and no selection at all. Both answers turn out to require an extra ingredient beyond "the game is repeated": the evolutionary version needs reciprocal strategies to be able to invade and resist invasion, and the learned version needs something functionally equivalent to LOLA's opponent-anticipation term — plain repeated interaction under naive gradient ascent, run here on the identical game, still collapses to permanent defection.

## 5. This site's from-scratch replication

A from-scratch reproduction of both the exact-gradient and policy-gradient methods, using an independent PyTorch autograd implementation with no dependency on the paper authors' own released code (consulted read-only, afterward, only to cross-check hyperparameters), is available in the [Foerster2018](https://github.com/doesburg11/Foerster2018) repository. It's a sibling to [Leibo2017](/learned-cooperation/leibo2017) and [Hughes2018](/learned-cooperation/hughes2018) in build philosophy — from scratch, honest about gaps — though it sits earlier in the same learned-cooperation lineage: a repeated matrix game rather than a spatial Markov game, and the paper this whole site's [Repeated Prisoner's Dilemma](/learned-cooperation/repeated-prisoners-dilemma) discussion is really pointing at.

**What's matched vs. simplified.** The game definitions, the memory-one policy parameterization, the exact value function's role in both update rules, and the paper's own $\gamma$ values are all matched directly from the paper's text. The exact-gradient IPD experiment's step size ($\delta=\eta=0.5$) was corrected mid-project to the value the paper's own Table 4 caption states, after cross-checking against the paper authors' released code narrowed down the right value — see the repository's README for that whole investigation. The policy-gradient version's baseline is a simpler batch-mean/leave-one-out baseline rather than the paper's own learned critic, which is the main suspected cause of its noisier results.

**Status.** On Iterated Matching Pennies, the reproduction is strong: LOLA converges to the Nash equilibrium with near-zero variance while NL cycles with high variance, closely matching the paper's own reported standard deviations. On the IPD under exact gradients, the qualitative story reproduces cleanly — NL-vs-NL converges to mutual defection, LOLA-vs-LOLA converges toward mutual cooperation, and LOLA exploits NL when paired against it — and the symmetric self-play numbers land close to the paper's own. The one piece that doesn't fully close: the asymmetric LOLA-vs-NL exploitation effect is real and correctly directioned here, but smaller in magnitude than the paper's own Table 4 reports, and the policy-gradient version's version of the same asymmetric result is noisier still and only partially, inconsistently reproduces it. None of this is hidden — the repository's README documents the exact numbers, what was cross-checked against the paper authors' own code, and what remains an open gap.

## References

- Foerster, J., Chen, R. Y., Al-Shedivat, M., Whiteson, S., Abbeel, P., & Mordatch, I. (2018). "Learning with Opponent-Learning Awareness." *Proceedings of the 17th International Conference on Autonomous Agents and MultiAgent Systems* (AAMAS 2018), 122–130.
- Press, W. H., & Dyson, F. J. (2012). "Iterated Prisoner's Dilemma contains strategies that dominate any evolutionary opponent." *PNAS*, 109(26), 10409–10413.
- Axelrod, R., & Hamilton, W. D. (1981). "The Evolution of Cooperation." *Science*, 211(4489), 1390–1396.
