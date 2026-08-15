---
id: darwin-baldwin-trial-log
title: Darwin/Baldwin Trial Log
sidebar_position: 3
slug: /learning-selection-interaction/darwin-baldwin-trial-log
---

# Darwin/Baldwin Trial Log

Eleven trials in [PredPreyGrass](/learning-selection-interaction/predpreygrass) test whether within-lifetime PPO learning and between-generation genome selection can jointly produce a real, selection-driven Baldwin loop in a predator-prey ecology — not just sustainable coexistence, but a heritable trait that drifts because of selection rather than chance.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}>
    <strong style={{ color: '#0F3368' }}>Working definition.</strong> A trial counts as a working Darwin/Baldwin loop only if it clears all three criteria together: (1) <strong>sustainability</strong> — populations coexist without frequent mid-episode collapse; (2) <strong>coevolution</strong> — stable predator-prey coexistence, neither species chronically crashing or eliminating the other; (3) <strong>selection-driven drift</strong> — the evolving trait shows genuine directional change that survives a head-to-head statistical comparison against a neutral-drift control (mutation active, reproduction decoupled from the trait), not just an eyeballed trend in a genome-mean plot.
  </p>
</div>

## Key findings

- Two independently-mechanised traits (`metabolic_rate`, `offspring_investment_fraction`), each tested with a full 3-seed real-vs-neutral-control replication (Mann-Whitney U), came back null on selection-driven drift.
- Sustainability and predator-prey coexistence — criteria 1 and 2 of 3 — are solved and stable across nearly every trait tried; only criterion 3 has failed repeatedly.
- One trait (nuptial-gift donation rate) shows a dramatic real fitness landscape at its extremes — 0 vs. 34.5 reproduction events per 60 iterations at donation rate 0.0 vs. 1.0 — but replication stopped early after an intermediate founder value produced too few reproductions to test drift.
- A deliberately extreme positive-control trait (a 16x efficiency gradient) produced a weak but real predator-only signal, pointing at population size and mutation rate — not trait design or effect size — as the likely bottleneck.
- The single-shared-policy-per-species architecture used in ten of eleven trials has no mechanism for an individual's genome to shape its own behavior directly; a structurally different per-agent architecture (Trial 11) is testing that gap for the first time.

## Why this page exists

Two other tracks on this site — the [Moran-model implementation of Nowak's five mechanisms](/evolved-cooperation/nowak-mechanisms) and the [abstract two-timescale simulations](/learning-selection-interaction/simulations) — each demonstrate a clean, replicated, positive result for their respective claims. This track has not, after eleven trials. That gap is itself the finding this page documents: not a hidden success story, but an open, actively-worked research problem, logged trial by trial rather than smoothed over.

All work described here lives under [`predpreygrass/evolutionary/`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary) in the sibling [PredPreyGrass](https://github.com/doesburg11/PredPreyGrass) repository. The authoritative, continuously-updated version of this log is that repository's own [`RESULTS.md`](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/evolutionary/RESULTS.md) — this page is a curated summary of it, not a replacement.

## Trial-by-trial ledger

| # | Module | Trait tested | Verdict | Note |
|---|---|---|---|---|
| 1 | [`eco_evolutionary_cadence`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_cadence) | Movement-frequency ("speed") genome | **Rejected** | Predators extinct in 30/30 sampled seeds — the mechanic itself, not tuning, structurally prevented predator sustainability. |
| 2 | `eco_evolutionary_investment` (R1–R3) | Offspring-investment fraction | **Paused** | R1's early drift signal (both species) was never checked against a neutral-drift control before an unrelated checkpoint-resume bug stalled the run. |
| 3 | [`eco_evolutionary_metabolic_rate`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_metabolic_rate) | Sub-linear food→energy efficiency | **Null** | Full 3-seed real-vs-control replication (Mann-Whitney U), both species, at two gradient steepnesses; individual-level correlation also flat. This is where the trial series' rigorous replication methodology was built. |
| 4 | [`eco_evolutionary_investment`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_investment) (R4–R7), resumed | Offspring-investment fraction | **Null** | R6 (fixed-genome sweep) confirmed a real fitness gradient exists; R7, the actual selection test, found real-vs-control drift statistically indistinguishable (Mann-Whitney p = 0.5–0.65). |
| 5 | [`eco_evolutionary_cooperation`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_cooperation) | Cooperation rate | **Null (pilot only)** | Paused after a pilot-level null rather than fully replicated. |
| 6 | `eco_evolutionary_investment`, ~2x population | Offspring-investment fraction at larger population | **Inconclusive** | Predator: no signal. Prey: the strongest possible n=3 directional separation, not decisive on its own — the first hint that population size matters. |
| 7 | [`eco_evolutionary_metabolic_code`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_metabolic_code) | CORRECT/WRONG/PLASTIC combinatorial genome, modeled on Hinton & Nowlan (1987) | **Null** | Reversed on the headline metric in both species after full 3-seed replication — the cleanest null of the series; purpose-built to fix two structural gaps identified after Trial 3. |
| — | Reward-density comparison (5 [`project_reward_shaping`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/project_reward_shaping) modules) | Sparse vs. dense/shaped reward | **Sparse wins** | Sparse reward beat all four denser variants on reproduction rate, population balance, and extinction avoidance. Also surfaced and fixed two silent RLlib data-integrity bugs present in Trials 1–7 — see [Two structural findings](#two-structural-findings-that-outlast-any-single-trial) below. |
| 8 | [`eco_evolutionary_nuptial_gift`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_nuptial_gift) | Obligate male nuptial-gift donation rate | **Dramatic effect, replication stopped early** | 0 vs. 34.5 reproduction events/60 iterations at donation rate 0.0 vs. 1.0 — the sharpest fitness landscape of any trait tried. But an intermediate founder value (0.5) produced only 18.6 reproduction events over a full 1000-iteration run, too few to test drift; stopped by explicit decision rather than completed. |
| 9 | [`eco_evolutionary_cultural_plasticity`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_cultural_plasticity) | Dual-inheritance social-learning propensity | **Null** | Flat across all 3 real seeds (plasticity stayed within ~1 founder-std of its starting value); stopped before the neutral-control replication. |
| 10 | [`eco_evolutionary_cultural_plasticity_seasonal`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_cultural_plasticity_seasonal) | Same trait, cyclical target dialect (Rogers'-Paradox follow-up) | **In progress** | Tests whether a *changing* environment — rather than Trial 9's static local-majority game — gives social learning a real fitness advantage, per Rogers (1988). |
| 11 | [`eco_evolutionary_metabolic_rate_positive_control`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_metabolic_rate_positive_control) | Deliberately extreme (16x) efficiency gradient | **Weak signal, predator only** | Rules out "the pipeline can't detect selection at all." Rules out "effect size is the only bottleneck" — a 16x gradient should dominate fast if it were. Points at population size / mutation rate as the binding constraint instead. |
| 12 | [`eco_evolutionary_erl_baldwin`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_erl_baldwin) | Per-agent genome-network architecture, replicating Ackley & Littman (1991) | **Too early** | One short smoke run only (predator extinction, expected per the original paper). The first trial to test whether genome can shape behavior *individually* at all — every prior trial shares one policy per species. |

## Two structural findings that outlast any single trial

**A shared-policy blind spot runs through Trials 1–9.** Every one of those trials uses a single PPO policy shared across an entire species; the genome is a side-channel scalar the policy never observes directly. It can only ever act on genome differences indirectly, through population-level energy economics. Whether that architecture can support a detectable Baldwin signal at all was never tested until Trial 11 — a genuinely open, still-untested hypothesis, not a diagnosed cause of the earlier nulls.

**A silent identity-conflation bug touched Trials 1–7.** While investigating reward density, two RLlib data-integrity bugs were found: a termination-reporting timing bug, and an agent-ID reuse bug that — combined with the first — silently stitched two unrelated individuals' trajectories into one fabricated episode roughly 75% of the time an agent was born. Both were fixed in three new `base_environment_*` reward-shaping modules and later in `base_environment` itself, but **never verified or fixed in any `eco_evolutionary_*` module** except `eco_evolutionary_nuptial_gift`, which had its own independent fix. Whether this materially affected Trials 1–7's null results is unconfirmed — but it is a real, previously-unknown confound in that history, not a hypothetical one.

**Population size and mutation rate are the recurring suspect, not trait design.** Trial 6 (larger population) and Trial 10 (extreme gradient) are two independent lines of evidence pointing the same direction: Trial 10's predator/prey split is the clearest version of this — predator reproduction is tightly bottlenecked on scarce, effortful catches, where a real efficiency advantage compounds visibly; prey reproduction runs on locally-abundant grass, where the same edge barely shows up. A trait's fitness leverage may be real and still be undetectable if too few individuals reproduce per generation for an advantage to compound into visible drift.

## What's next

- **Finish Trial 9's replication** — seeds 43/44 plus the 3-seed neutral-control run — to get the real Rogers'-Paradox comparison rather than a single-seed read.
- **Run Trial 11's long horizon** (100k–1M+ steps, multiple seeds) once initial survival odds are tuned, and read genetic-assimilation trajectories via functional-constraint analysis — a detection method that doesn't compete with the population-size noise floor Trial 10 diagnosed.
- **Isolate population size as its own single-variable pilot** — the planned, not-yet-launched follow-up to Trial 10's mutation-rate isolation, since Trial 6 and Trial 10 both point at scale rather than trait design as the binding constraint.
- **Drive-conditioned observations, partially built.** A separate, non-evolutionary module — [`drive_conditioned_environment`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/drive_conditioned_environment) — hands the PPO policy pre-computed, biologically-interpretable pressure signals (`hunger_pressure`, `reproductive_readiness`, `prey_opportunity`, `predator_danger_pressure`, `grass_opportunity`) as extra observation channels, instead of making it re-derive those from raw pixels. It is implemented and numerically verified, but the baseline-vs-drive-conditioned comparison that would show whether it actually helps has not been run yet. The further, *evolutionary* extension this was originally designed for — evolving which drive channels are enabled, or how strongly each is scaled, as a heritable trait the shared policy can then condition on — has not been started. That extension would target the shared-policy blind spot above directly, without requiring Trial 11's full per-agent rebuild.

## Summary

**Two of the site's three tracks have delivered a clean, replicated positive result; this one has not, and that gap is the actual open problem.** The [Moran-model implementation of Nowak's five mechanisms](/evolved-cooperation/nowak-mechanisms) and the [abstract two-timescale ring-network simulations](/learning-selection-interaction/simulations) each demonstrate a real, testable, repeatedly-confirmed effect. PredPreyGrass has not, after eleven trials spanning six differently-mechanised traits, two independent full statistical replications, and a structural-bug-fixing detour.

**This is consistent with the site's own methodology, not a contradiction of it.** The [landing page](/) frames a deliberate trade-off between minimal generative models (few assumptions, easier to prove something clean) and behaviorally-anchored models (richer, harder to prove anything about in isolation). The Moran and ring-network models sit firmly in the first category — small state spaces, few free parameters, results provable in tens of seeds. PredPreyGrass sits in the second — full ecological energy economics, PPO-trained policies, satiation dynamics, population dynamics all entangled at once. The abstraction that makes the first category tractable to prove is exactly what PredPreyGrass trades away for ecological realism. That trade is a plausible reason the signal is *harder to find*, not evidence that it doesn't exist.

**Eleven trials, two independently-mechanised traits under full statistical replication, both null, is a stronger signal than any single result — but it points at scale, not theory.** The clearest counter-evidence against "the mechanism just doesn't exist here" is Trial 10: a deliberately overwhelming 16x fitness gradient still only produced a weak, predator-only signal. If the architecture or the underlying theory were simply wrong, an overwhelming gradient should have failed completely, not partially succeeded exactly where reproduction is most tightly resource-bottlenecked.

**The Baldwin effect itself is not in question — see [The Baldwin Effect](/learning-selection-interaction/baldwin-effect) and its [worked example](/learning-selection-interaction/baldwin-effect#7-a-worked-example-modeling-the-baldwin-effect-in-multi-agent-rl) for the theoretical case, and [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory) for why the abstract simulation suite already confirms it in a simpler setting.** What remains open is narrower and more tractable: whether this specific ecological implementation has enough reproducing individuals, or enough of a direct genome-to-behavior channel, for that same effect to become statistically visible.

## References

- Baldwin, J. M. (1896). "A New Factor in Evolution." *The American Naturalist*, 30(354), 441–451.
- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1, 495–502.
- Ackley, D., & Littman, M. (1991). "Interactions between learning and evolution." In *Artificial Life II*, 487–509.
- Ng, A. Y., Harada, D., & Russell, S. (1999). "Policy Invariance Under Reward Transformations: Theory and Application to Reward Shaping." *Proceedings of the 16th International Conference on Machine Learning (ICML)*.
- Wolpert, D. H., & Tumer, K. (1999). "An Introduction to Collective Intelligence." NASA Ames Research Center Technical Report.
- Rogers, A. R. (1988). "Does biology constrain culture?" *American Anthropologist*, 90(4), 819–831.
- Boyd, R., & Richerson, P. J. (1995). "Why does culture increase human adaptability?" *Ethology and Sociobiology*, 16(2), 125–143.
- Enquist, M., Eriksson, K., & Ghirlanda, S. (2007). "Critical Social Learning: A Solution to Rogers's Paradox of Nonadaptive Culture." *American Anthropologist*, 109(4), 727–734.
- Foerster, J., Farquhar, G., Afouras, T., Nardelli, N., & Whiteson, S. (2018). "Counterfactual Multi-Agent Policy Gradients." *Proceedings of the AAAI Conference on Artificial Intelligence*, 32(1).
- [PredPreyGrass repository](https://github.com/doesburg11/PredPreyGrass) — canonical code and the live [`evolutionary/RESULTS.md`](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/evolutionary/RESULTS.md) trial log this page summarizes.
