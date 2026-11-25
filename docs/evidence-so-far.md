---
id: evidence-so-far
title: Evidence So Far
description: A status overview of the current evidence for the site's claims about human cooperation and competition, including confirmed results, non-replications, null results, demonstrations, and open questions.
sidebar_position: 3
slug: /evidence-so-far
---

# Evidence So Far

This page is the status overview for the site. It separates confirmed results from model demonstrations, null results, and open questions, so the argument can be read without treating every model page as equally conclusive.

The current bottom line is this: the site has strong computational evidence for the core two-timescale claim that evolution across generations and learning within lifetimes can work better together than either process alone. It also has cooperation-specific model evidence that reciprocity, reputation, partner choice, spatial structure, and selection can sustain or spread cooperation under defined conditions.

What it does not yet have is a complete human-specific model of cooperation and competition. The current evidence supports mechanism-level claims that are relevant to human behavior, not a finished account of language, norms, institutions, moral psychology, culture, or identity.

## Main Result

The strongest result is the Ackley & Littman style survival replication and its PredPreyGrass Trial 12 extension: combined evolution and learning outperform evolution alone, learning alone, no adaptation, and random behavior.

In Trial 12, the full comparative study used five conditions, 100 seeds per condition, and a 1,000,000-step ceiling. The combined evolution-and-learning condition beat all four degraded alternatives with `p < 0.00001` in each comparison (Mann-Whitney U, `n = 100` per condition).

This matters because the site's human claim is not "nature alone" or "nurture alone." The claim is that inherited tendencies and lifetime learning can form a coupled adaptive system. Trial 12 is the cleanest current evidence for that coupled system.

A second positive result, of a different kind, now holds at two branch points of one run. In [Trial 15](/learning-selection-interaction/predpreygrass-continuous/evolving-bodies), animals in the continuous PredPreyGrass world carry heritable body genes (top speed, view distance, field of view) and share one learning policy per species. Branched from one run, predator speed rose in all six runs where the predator policy kept learning and fell in all six where it was frozen (+0.18 on the gene's log scale, 95% CI +0.14 to +0.22, exact `p = 0.005`, a contrast fixed in advance); from a second branch point of the same run the contrast was +0.19 (`p = 0.005`). With speeds set by hand and the same starting prey, extra speed paid about twice as much under the learned predator policies as under the frozen one. Trial 12 shows that evolution and learning together outperform either; Trial 15 shows learning changing how a gene evolves (its direction from the first branch point, its rate from the second), the Baldwin-style link itself. Both branch points come from one training run, the learned policies differ from the frozen one in more than their use of speed, and the learning is shared across a species rather than individual.

There is an important limit: these results concern survival behavior and bodies in a predator-prey ecology, not cooperation specifically. It supports the two-timescale mechanism that the human cooperation argument depends on; it does not, by itself, demonstrate human cooperation.

Read next:

- [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory)
- [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991)
- [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log)

## Cooperation Results

The cooperation-specific results are strongest in the smaller, more controlled models.

The [Two-Timescale Simulations](/learning-selection-interaction/simulations) show that cooperation depends on interaction structure, learning rules, and selection acting across generations:

- [Model 1: Trust Learning](/learning-selection-interaction/simulations/model-1) shows cooperation collapse in one-shot interaction, but repeated interaction stabilizes cooperation near 98%.
- [Model 2: Q-learning](/learning-selection-interaction/simulations/model-2) shows higher repeated-interaction payoff with more strategic exploration and a lower final cooperation rate.
- [Model 3: Extended](/learning-selection-interaction/simulations/model-3) adds reputation, partner choice, and forgiveness, shifting the model toward conditional cooperation with active monitoring.

The [Nowak Mechanisms](/evolved-cooperation/nowak-mechanisms) pages provide proof-of-mechanism simulations for classical evolutionary routes to cooperation. Their main lesson is not simply that cooperation can persist. It is that origin and maintenance are different problems. A mechanism can maintain cooperation once it is common while still failing to produce cooperation from rare.

Kin selection was the most robust initiator among them, but with a qualification found later: in that model a helper keeps part of its own benefit, so the spread from rare was weak altruism (no net direct cost to the helper), and help with a real net cost failed. By the site's [definition of kin selection](/evolved-cooperation/kin-selection-progress), which requires a real net cost, that spread is step 1 of the stepwise table, a warm-up, not kin selection itself. With overlapping generations, costly help to neighbours did spread at benefit-to-cost ratios of 12 and 24 when offspring settled locally, and at 12 failed under global-competitor replacement (step 2; no ecology was added to it). This is consistent with kin selection through viscosity but was not separated from network reciprocity ([Kin Selection](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed)).

One of the most thoroughly tested evolved-cooperation results so far comes from a Python port of the Ethnocentrism model, tested in six pre-registered experiments including a lineage measurement ([Kin cues](/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model)). When colour no longer passed from parent to offspring, the share of ethnocentric agents fell from 75.5% to 12.9% (how often help was given hardly changed, 77% vs 76% of meetings), and it stayed 43 points lower when the own-colour meeting share was matched. Shuffling positions, which removed the excess relatedness among interacting neighbours but also changed other conditions, went with cooperation falling from 75.6% to 11.0% of meetings. A Hamilton's-rule prediction made in advance from measured relatedness got the direction of change in helper share right in all 8 conditions far from the threshold and in 6 of 8 close to it, with none reversed. In a lattice model like this, kin selection and network reciprocity describe the same process, and the experiments narrow other differences between conditions rather than removing them.

The ecological model pages — [Cooperative Hunting](/evolved-cooperation/cooperative-hunting), [Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma), and [Retained Benefit](/evolved-cooperation/retained-benefit) — plus the foundational replication [Spatial Altruism](/evolved-cooperation/spatial-altruism), are best read as mechanism demonstrations (Spatial Altruism has since also been tested against the site's kin-selection definition; see Null Results). They show how spatial structure, ecological feedback, costs, benefits, and local interaction can change cooperative dynamics, but they are not yet the final evidential core of the human argument.

One of them has since been tested directly. A pre-registered sweep of the [Retained Benefit](/evolved-cooperation/retained-benefit#a-pre-registered-sweep-of-the-retained-fraction) model varied how much of a cooperator's benefit is retained for its own lineage, at three benefit-to-cost ratios, against a neutral control with no benefit and no cost (330 swept runs plus 10 neutral runs, one-sided paired tests at p < 0.01). All four registered predictions were met. At the model's demo ratio (b/c = 3), cooperation fell below neutral without retention (0.090 against 0.190) and rose to 0.792 with full retention; at b/c = 8 it rose at every retained fraction. As registered, this is consistent with cooperation needing enough retained benefit in this model, but does not show that retention is necessary. In an exploratory look, not a registered test, where the rise started lined up descriptively with the sign of a lone helper's direct payoff (its own return minus its cost); the design does not separate that self-return from benefit to relatives. By the site's kin-selection definition the sweep therefore does not count as kin selection; it sits with step 1 of the stepwise table. The sweep also showed that the page's earlier single demo run, whose rise stayed within neutral drift, was not evidence on its own.

Read together with the kin-selection and ethnocentrism results above, the current evolved-cooperation model results suggest one pattern, in plain terms: cooperation spread most reliably when helping paid the helper back (weak altruism), while help that leaves the helper worse off spread only under narrow conditions, such as close relatives as neighbours and a benefit far larger than the cost. The exception is costly care for one's own offspring, which the site counts as kin selection through parental care: it spread at every tested step up to energy, starvation and limited food, but not yet once births needed free space. This is a pattern across abstract models, not proof that the helper's own return is the deciding cause, since several designs cannot separate it from benefit to relatives. For humans it is compatible with, but not evidence for, the idea that some cooperation began where helping benefited the helper, its offspring or close kin; large-scale sacrificial cooperation may depend on reputation, norms, institutions and culture, which these models do not include. The fuller plain-language reading is on the [Evolved Cooperation](/evolved-cooperation#in-plain-terms) page.

## Null Results

The site deliberately preserves null results because they narrow the problem.

The clearest null history is in [PredPreyGrass](/learning-selection-interaction/predpreygrass). Trials 1-10 under the shared-policy architecture were null or inconclusive for selection-driven drift, despite testing multiple heritable traits and running statistical replications. The later Trial 12 result suggests that the earlier nulls were pointing at a structural limitation: the genome needs a direct channel into individual behavior for selection-driven behavioral evolution to become visible. Trial 15 is consistent with that reading: under a shared policy again, but with genes that shape each animal's body and that the policy observes, selection on the genes was persistent and its direction or size depended on whether the policy learned.

The [PPO Study](/learned-cooperation/repeated-prisoners-dilemma/ppo-study) is also a limiting result. Under the reported two-sided tests with Holm correction across 40 comparisons, no `(horizon, player)` result was significant at `alpha = 0.05` in the shown run.

Several cooperation mechanisms also have built-in limits. Direct reciprocity can maintain cooperation once reciprocal behavior is common, but it does not reliably originate cooperation from a defector-dominated population without a foothold or scaffold. Indirect reciprocity depends on a reputation system that itself has to bootstrap. Network reciprocity and group selection can be stochastic rather than automatic.

Kin selection, in the site's [broad definition](/evolved-cooperation/kin-selection-progress) (costly help to relatives by descent, the helper's offspring included), has been shown only partly in a model with more ecology. The goal is to establish it in a full ecological setting: energy reserves, limited renewable food, starvation, births that need free space, and agents that move in search of food. Of the nine steps towards that goal in the [stepwise table](/evolved-cooperation/kin-selection-progress), four are achieved; both goal rows, care for own offspring (goal A) and help to other relatives (goal B), are not, and no kin-selection experiment so far has agents that move in search of food. In a model with sexual reproduction, households and juvenile care, helping rose from rare in some runs, but the controls could not separate that from population survival: no tested survival floor up to 0.4 kept populations without helpers alive. A stepwise rebuild from the Moran model towards ecology found that costly care for one's own young spread at every step tested through energy, starvation and limited food (steps 3 and 4), also without local settlement (kin selection through parental care, not among non-offspring relatives), and did not reach its agreed endpoint in a model with substantial empty space (step 5) before its hard stop (one version produced substantial empty space, but its main test missed the endpoint); a planned step with movement was skipped because the grid was almost full ([The Ladder in Detail](/evolved-cooperation/kin-selection-progress#the-ladder-in-detail)). A restart of that step on the parental-care base without energy (2026-11-24) also missed its endpoint: care at a benefit-to-cost ratio of 6 was still rising when the runs ended but reached the endpoint in 4 of 20 runs, and a version with the grid kept full did no better (2 of 20). Two published models were then placed against the definition. Kanwal and Gardner's (2022) own code, run unchanged, replicated their result by pre-registered criteria: with density-dependent dispersal, costly help to patch-mates stayed above Taylor's cancellation value in all 20 runs with more than one breeder per patch, although with a fixed number of breeders, no rare start and no control run it reads only as consistent with kin selection among non-offspring relatives. Mitteldorf and Wilson's (2000) empty-site model was tested from a rare start and not met ([results](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/spatial_altruism/RESULTS_KIN_TEST.md)): at the site's demo setting, harsher than any the paper tested, all-selfish populations died out even on their own, and at the nearest setting where all-selfish populations persisted on their own, costly help reached the endpoint in 0 of 50 runs while help that pays for itself spread in all 50; the tested benefit (0.468) was below the stalemate benefit the paper's Table 2 implies for that cost (roughly 0.59, interpolated, at disease 0.2), so the result does not contradict the paper. A replication of Taylor-Davies et al. (2024), a published model that is a candidate for goal A's ecology, stopped before any test because neither its stated settings nor its code's defaults kept populations alive (4 and 3 of 24).

## Non-Replications

Two of this site's foundational replications don't hold up — not "no significant effect," but outright opposite-direction or blocked results. Both sit on the same underlying environment, which is itself informative.

[Hughes et al. (2018)](/learned-cooperation/hughes2018)'s headline Cleanup claim — that advantageous inequity aversion (guilt) raises collective cooperation over an unmodified baseline — does not reproduce here. Baseline beat the guilt-shaped condition in 6 of 6 individual seed comparisons across two materially different environment configurations, the opposite of the paper's own Fig. 3A. Under-training, miscalibration, and seed noise were each checked directly and ruled out as the explanation; a genuine scale effect or an unidentified environment gap remain open, undecided possibilities. The same paper's Harvest condition is separately inconclusive rather than a clean failure.

[McKee et al. (2023)](/learned-cooperation/mckee2023)'s reputation claim can't be tested at all here: training collapses to near-zero cleaning in both the identifiable and anonymous conditions before reputation dynamics could ever matter. A control run with the reputation mechanism entirely disabled collapses the same way, so reputation shaping isn't the cause — the environment's punishment beam is a plausible, unconfirmed hypothesis instead.

Both experiments reuse the Cleanup environment (in different implementations) that [Hughes et al. (2018)](/learned-cooperation/hughes2018) also uses. That two independent reward-shaping mechanisms, built by different implementations of the same underlying public-goods environment, have now each failed to produce a clean test of their respective paper's claim is a pattern worth taking seriously on its own, separate from either individual result: an environment a plain policy struggles to solve is unlikely to give any mechanism layered on top of it a fair test.

## Open Questions

The main open question is how to move from mechanism tests to models that are explicitly about human cooperation and competition.

Concrete next questions include:

- Can the shared-policy PredPreyGrass architecture be given a direct heritable behavioral channel without losing the advantages of the richer ecological environment? Trial 15 does this for bodies, and its predator-speed effect holds from two starting points, with speed paying more under learned behavior; open is whether the two species' bodies can be made to respond to each other (so far both show the same qualitative change in vision).
- What explains Trial 12's remaining discrepancy with the original Ackley & Littman result, where evolution-alone beats luck here but not in the original paper?
- Does the deeper longitudinal genetic-assimilation result from Ackley & Littman also reproduce in the current implementation?
- Does the partially built drive-conditioned observation system improve learning, and can it support an evolutionary extension?
- Can kin selection be shown in a full ecological setting, with births that need free space and agents that move: first for care of own offspring (goal A), then for costly help to relatives other than offspring (goal B)?
- Which mechanism-level results still hold when explicitly human layers are added, such as social learning, norms, institutions, language, punishment, group identity, and moral cognition?

## How to Read the Evidence

Use these labels when moving through the site:

- **Confirmed result** means the result survived a specified statistical comparison or a focused control test.
- **Demonstration** means the model shows a mechanism clearly, but the page should not be read as a broad replicated claim.
- **Null result** means the tested design did not produce a reliable directional result under the reported conditions.
- **Open question** means the issue is identified but not yet resolved by the current simulations.

## Experiment Map

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped site-table--evidence-map">
      <thead>
        <tr>
          <th>Track</th>
          <th>Current status</th>
          <th>What it shows</th>
          <th>Main limitation</th>
          <th>Read next</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ackley &amp; Littman replication / Trial 12</td>
          <td>Confirmed</td>
          <td>Evolution plus learning beats either alone in the reported survival task.</td>
          <td>Strongest for two-timescale adaptation, not cooperation specifically.</td>
          <td><a href="/learning-selection-interaction/theory">Theory</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
        <tr>
          <td>Abstract two-timescale simulations</td>
          <td>Confirmed / model-specific</td>
          <td>Cooperation changes with repeated interaction, learning rules, selection, reputation, partner choice, and forgiveness.</td>
          <td>Abstract donation-game setting on simplified interaction networks.</td>
          <td><a href="/learning-selection-interaction/simulations">Simulations</a></td>
        </tr>
        <tr>
          <td>Nowak mechanisms</td>
          <td>Proof-of-mechanism</td>
          <td>Classical cooperation mechanisms can maintain, spread, or fail under clearly separated conditions; origin from rare is harder than maintenance, and kin selection was the most robust initiator.</td>
          <td>Mechanism isolation is not the same as a full human explanation; the kin-selection spread was weak altruism (no net cost to the helper), which the site's definition does not count as kin selection (step 1, a warm-up).</td>
          <td><a href="/evolved-cooperation/nowak-mechanisms">Nowak Mechanisms</a></td>
        </tr>
        <tr>
          <td>Ethnocentrism kin cues</td>
          <td>Confirmed (pre-registered, one model)</td>
          <td>Ethnocentrism fell sharply when colour no longer tracked descent: random colour cut it from 75.5% to 12.9%, though how often help was given hardly changed; shuffling positions, which removed excess relatedness among neighbours, went with cooperation falling from 75.6% to 11.0%; a Hamilton's-rule prediction got the direction right far from the threshold (8/8).</td>
          <td>One lattice model, where kin selection and network reciprocity coincide; near the threshold 6/8 correct and 2 unclear; other differences between conditions narrowed, not removed.</td>
          <td><a href="/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model">Kin cues</a></td>
        </tr>
        <tr>
          <td>Kin selection: Moran to ecology</td>
          <td>Mixed (pre-registered steps)</td>
          <td>Costly help to neighbours spread with local settlement (b/c 12 and 24) and failed at b/c 12 under global-competitor replacement; care for own young spread at every tested ecological step (R1-R4).</td>
          <td>The care result is kin selection through parental care (broad definition), on an almost-full grid, not among non-offspring relatives; an earlier ecological model could not separate helping from population survival; the step with substantial empty space did not reach its endpoint, nor did its 2026-11-24 restart; no kin-selection experiment has agents that move, so both goals (A and B) are still open.</td>
          <td><a href="/evolved-cooperation/kin-selection-progress">Kin Selection</a></td>
        </tr>
        <tr>
          <td>Kanwal &amp; Gardner (2022) replication</td>
          <td>Replicated (pre-registered)</td>
          <td>With density-dependent dispersal, costly help to patch-mates stayed above Taylor's cancellation value 1/<em>n</em> in 20/20 runs; slope on the dispersal rate −0.177 (paper −0.178).</td>
          <td>The authors' code with a fixed number of breeders; no rare start and no control run, so only consistent with kin selection among non-offspring relatives; one run per cell.</td>
          <td><a href="/evolved-cooperation/kin-selection-progress#external-check-kanwal-and-gardner-2022">External check</a></td>
        </tr>
        <tr>
          <td>Mitteldorf &amp; Wilson (2000) as a kin test</td>
          <td>Not met (pre-registered)</td>
          <td>From a rare start, costly help (benefit-to-cost 3) reached the endpoint in 0/50 runs at the nearest setting where all-selfish populations persist; help that pays for itself spread in 50/50.</td>
          <td>At the site's demo setting, harsher than any the paper tested, all-selfish populations die out on their own, so it could not be tested there; the tested benefit was below the paper's stalemate value for that cost; two fixed types, no mutation, 1,000 steps.</td>
          <td><a href="/evolved-cooperation/spatial-altruism">Spatial Altruism</a></td>
        </tr>
        <tr>
          <td>Retained Benefit sweep</td>
          <td>Confirmed (pre-registered, one model)</td>
          <td>In this model, cooperation was associated with how much of its benefit returned to the cooperator and its lineage: at b/c = 3 it fell below neutral without retention (0.090 vs 0.190) and rose to 0.792 with full retention; at b/c = 8 it rose at every retained fraction.</td>
          <td>One abstract lattice model; consistent with, not proof of, retention being necessary; the retained share includes the helper's own, so self-return and benefit to relatives are not separated; by the site's definition not kin selection (sits with step 1).</td>
          <td><a href="/evolved-cooperation/retained-benefit#a-pre-registered-sweep-of-the-retained-fraction">Retained Benefit</a></td>
        </tr>
        <tr>
          <td>Ecological evolved-cooperation models</td>
          <td>Demonstrations</td>
          <td>Spatial and ecological constraints can change cooperation, altruism, hunting, and benefit-retention dynamics.</td>
          <td>Useful model behavior, but not yet a replicated human-evidence layer.</td>
          <td><a href="/evolved-cooperation">Evolved Cooperation</a></td>
        </tr>
        <tr>
          <td>Repeated Prisoner's Dilemma PPO</td>
          <td>Null / limiting</td>
          <td>The shown PPO sweep did not produce Holm-significant cooperation results.</td>
          <td>Narrow reported setup; not a general impossibility result.</td>
          <td><a href="/learned-cooperation/repeated-prisoners-dilemma/ppo-study">PPO Study</a></td>
        </tr>
        <tr>
          <td>PredPreyGrass continuous traits / Trial 15</td>
          <td>Confirmed (two branch points of one training run)</td>
          <td>Whether predator behavior keeps learning changes how predator speed evolves: at the first branch point it reversed the direction, at the second it made a rise larger; at each, all six runs with learning predators exceeded all six with frozen ones.</td>
          <td>One training run; speed pays more under learned policies, but not shown to be adaptation to speed specifically; learning shared across a species, not individual; no arms race in bodies.</td>
          <td><a href="/learning-selection-interaction/predpreygrass-continuous/evolving-bodies">Learning Steers Body Evolution</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
        <tr>
          <td>PredPreyGrass stag hunt (continuous)</td>
          <td>Mostly null (one run per world)</td>
          <td>Hunters learn group hunting readily where it pays, but never restraint; only one world gave both coexistence and cooperation above chance, one where a fat rabbit needs two hunters together, and calls there gained no detectable use.</td>
          <td>One seed per world; in the one passing world a partner was required by rule, and calls and the rule were changed together; the commons-dilemma reading is untested.</td>
          <td><a href="/learning-selection-interaction/predpreygrass-continuous/stag-hunt">The Stag Hunt and Restraint</a></td>
        </tr>
        <tr>
          <td>PredPreyGrass deer stag hunt (continuous)</td>
          <td>Replicated twice (2 × 3 runs, pre-registered)</td>
          <td>Where an adult deer needs two hunters touching it together, hunters approach adults with a partner near 15-23% more often than chance in all three runs; calls are not needed; two of three runs met every test. With only touching counting, all three new runs met every test (12-21% above chance), and hunters also paired up on large young deer, where a partner pays but is not required (2 of 3 runs).</td>
          <td>For adults a partner is required by rule (coordination, not the strict stag hunt); the strict-stag-hunt sign is small, its tests were informed by interim checkpoints, and place or generalisation from adults is not ruled out; small effect; adult catches fell late in training; approach with a partner near is not proof of seeking one.</td>
          <td><a href="/learning-selection-interaction/predpreygrass-continuous/deer-stag-hunt">A Replicated Stag Hunt</a></td>
        </tr>
        <tr>
          <td>PredPreyGrass shared-policy trials</td>
          <td>Null / inconclusive</td>
          <td>Trials 1-10 did not show reliable selection-driven drift under the shared-policy design.</td>
          <td>Genome influenced behavior only indirectly, through population-level economics.</td>
          <td><a href="/learning-selection-interaction/evolution-boundary-predpreygrass">Evolution Boundary</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
        <tr>
          <td>Leibo et al. (2017) replication</td>
          <td>Reproduced (reduced scale)</td>
          <td>Independent DQN learners in Gathering and Wolfpack produce policies whose induced payoffs satisfy classical dilemma inequalities.</td>
          <td>No run yet at the paper's own 40M-step training scale.</td>
          <td><a href="/learned-cooperation/leibo2017">Leibo et al. (2017)</a></td>
        </tr>
        <tr>
          <td>Hughes et al. (2018) replication</td>
          <td>Non-replication</td>
          <td>Cleanup's headline guilt-raises-cooperation claim does not reproduce; baseline beat the guilt-shaped condition in 6 of 6 seed comparisons.</td>
          <td>Under-training, miscalibration, and seed noise ruled out; a scale effect or fidelity gap remain undecided.</td>
          <td><a href="/learned-cooperation/hughes2018">Hughes et al. (2018)</a></td>
        </tr>
        <tr>
          <td>McKee et al. (2023) / reputation</td>
          <td>Blocked — training collapse</td>
          <td>Training collapses to near-zero cleaning in both conditions before reputation dynamics can matter; the claim can't yet be tested.</td>
          <td>Punishment-beam hypothesis for the collapse is plausible but unconfirmed — no ablation run.</td>
          <td><a href="/learned-cooperation/mckee2023">McKee et al. (2023)</a></td>
        </tr>
        <tr>
          <td>Boyd &amp; Richerson (2009) replications</td>
          <td>Confirmed</td>
          <td>Cultural group selection sustained by a low migration/selection ratio; payoff-biased migration spreads group-beneficial behavior.</td>
          <td>Voting-with-feet's own welfare check shows spreading the behavior label doesn't reliably raise welfare.</td>
          <td><a href="/evolved-cooperation/boyd-richerson-2009-culture">Culture</a>, <a href="/evolved-cooperation/boyd-richerson-2009-voting-with-feet">Voting With Your Feet</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Current status of the site's main evidence tracks.</figcaption>
</figure>

## References

- Ackley, D. H., and Littman, M. L. (1991). *Interactions between learning and evolution*. In C. G. Langton, C. Taylor, J. D. Farmer, and S. Rasmussen (Eds.), *Artificial Life II*, 487–509. Addison-Wesley.
- Baldwin, J. M. (1896). *A new factor in evolution*. *The American Naturalist*, 30(354), 441–451. https://doi.org/10.1086/276408
- Boyd, R., and Richerson, P. J. (2009). *Culture and the evolution of human cooperation*. *Philosophical Transactions of the Royal Society B*, 364(1533), 3281–3288. https://doi.org/10.1098/rstb.2009.0134
- Boyd, R., and Richerson, P. J. (2009). *Voting with your feet: payoff biased migration and the evolution of group beneficial behavior*. *Journal of Theoretical Biology*, 257(2), 331–339. https://doi.org/10.1016/j.jtbi.2008.12.007
- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
- Hammond, R. A., and Axelrod, R. (2006). *The evolution of ethnocentrism*. *Journal of Conflict Resolution*, 50(6), 926–936. https://doi.org/10.1177/0022002706293470
- Hughes, E., Leibo, J. Z., Phillips, M., Tuyls, K., Dueñez-Guzmán, E., Castañeda, A. G., Dunning, I., Zhu, T., McKee, K. R., Koster, R., Roff, H., and Graepel, T. (2018). *Inequity aversion improves cooperation in intertemporal social dilemmas*. *Advances in Neural Information Processing Systems 31* (NeurIPS 2018).
- Kanwal, J., and Gardner, A. (2022). *Population viscosity promotes altruism under density-dependent dispersal*. *Proceedings of the Royal Society B: Biological Sciences*, 289(1970), 20212668. https://doi.org/10.1098/rspb.2021.2668
- Leibo, J. Z., Zambaldi, V., Lanctot, M., Marecki, J., and Graepel, T. (2017). *Multi-agent reinforcement learning in sequential social dilemmas*. *Proceedings of AAMAS 2017*, 464–473. arXiv:1702.03037
- McKee, K. R., Hughes, E., Zhu, T. O., Chadwick, M. J., Koster, R., Castañeda, A. G., Beattie, C., Graepel, T., Botvinick, M., and Leibo, J. Z. (2023). *A multi-agent reinforcement learning model of reputation and cooperation in human groups*. arXiv:2103.04982
- Mitteldorf, J., and Wilson, D. S. (2000). *Population viscosity and the evolution of altruism*. *Journal of Theoretical Biology*, 204(4), 481–496. https://doi.org/10.1006/jtbi.2000.2007
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
- Taylor, P. D. (1992). *Altruism in viscous populations — an inclusive fitness model*. *Evolutionary Ecology*, 6(4), 352–356. https://doi.org/10.1007/BF02270971
- Taylor-Davies, M., Hamon, G., Boulet, T., and Moulin-Frier, C. (2024). *Emergent kin selection of altruistic feeding via non-episodic neuroevolution*. arXiv:2411.10536. Published 2025 in *Applications of Evolutionary Computation* (Lecture Notes in Computer Science), 496–509. https://doi.org/10.1007/978-3-031-90062-4_31
- Wilensky, U. (2003). *NetLogo Ethnocentrism model*. Center for Connected Learning and Computer-Based Modeling, Northwestern University. http://ccl.northwestern.edu/netlogo/models/Ethnocentrism
