---
id: emergent-cooperation-continuous
title: Searching for Emergent Cooperation
sidebar_position: 5
slug: /learning-selection-interaction/predpreygrass-continuous/emergent-cooperation
---

# Searching for Emergent Cooperation

Can predators and prey in the continuous [PredPreyGrass](/learning-selection-interaction/predpreygrass-continuous) world develop cooperation out of individual self-interest, with no reward for cooperating? Starting from Hahn et al.'s foraging swarms (2020), five candidates were tested in turn: prey swarming, predators holding back when prey are scarce, group hunting, a shared carcass, and large prey that a lone predator cannot catch. The only reward was always the same: +10 for each birth. The code and every number below are in the [`foraging_swarms`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/foraging_swarms) module of the PredPreyGrass repository.

## Key findings

- **No evidence of learned cooperation was found.** Where having a partner paid, it paid about as much for policies that had never trained under the rule: training added no measurable coordination.
- **Prey grouping does not depend on seeing other prey.** Prey that could not see other prey grouped and aligned *more* than prey that could, in all three runs, which points to shared responses to grass and predators rather than social information. One possible reading: prey use the sight of each other to keep their distance.
- **Joint pursuit looks like competition.** When a second predator heads for the same prey, the prey is caught more often, but in counterfactual replays with that predator stopped, the focal predator's own catch chance *rises*: the second predator adds its own catches without helping the first.
- **Rules that make cooperation pay did not lead to learned coordination.** Sharing a catch's energy among nearby predators, or requiring a helper to catch large prey, changed who was fed, but trained predators did not coordinate more than predators untrained for the rule.
- **Controls separate learned behaviour from imposed rules:** counterfactual replays from copied world states with a placebo for the hunting effects, and policies run under a rule they were never trained for in the sharing and large-prey tests.

## The question and the safeguards

In Hahn et al.'s foraging task (2020), agents rewarded every step for staying near a target that most of them could not see learned to orient themselves to their neighbours, and agents trained without their neighbours' movement received lower rewards. Their earlier predator-escape study (Hahn et al., 2019) found swarming that turned out to be selfish: in some arena sizes the learned swarming formed a Nash equilibrium although a simple flee-from-the-predator policy survived longer (Hahn et al., 2020b). Ritz et al. (2021) found two forms of cooperation among selfish predators: not hunting the last prey, and group hunting when the catch is shared and lone predators rarely succeed.

PredPreyGrass differs in the ways that matter here: the only reward is a birth, grass is visible about half the time, and predators can see only up to three nearby prey. The same environment, trained with PPO, one shared policy per species, was used throughout; all agents act on their current observation only, without memory.

Two kinds of control separate learned behaviour from what the environment imposes:

- **Counterfactual replay.** At a moment where a second predator heads for the same prey, the whole world is copied and the same decision replayed with that predator stopped, following each branch for three decisions with the same random seed. The difference in outcomes is the second predator's causal effect, with no selection of easy prey. Each replay reproduced the real outcome (0 mismatches in tens of thousands), and a placebo (stopping a nearby predator that was *not* heading for the prey) gave effects near zero.
- **Untrained policies under the rule.** A new rule is switched on at test time for policies trained without it. Whatever those policies show is the effect of the rule, not of learning.

## Prey swarming

Each animal sees its three nearest prey and one nearest predator, each with position and velocity. Prey were trained in three versions: seeing other prey's positions and velocities (A, the existing runs), positions only (B), or nothing about other prey (C).

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Prey see other prey's</th><th>Runs</th><th>Clark-Evans R (below 1: clustered)</th><th>Alignment minus shuffled</th><th>Prey in groups of 3 or more, minus random</th></tr>
    </thead>
    <tbody>
      <tr><td>positions and velocities (A)</td><td>2</td><td>0.92–0.93</td><td>0.18–0.19</td><td>0.07–0.08</td></tr>
      <tr><td>positions only (B)</td><td>3</td><td>0.92–0.93</td><td>0.20–0.21</td><td>0.08–0.09</td></tr>
      <tr><td>nothing (C)</td><td>3</td><td>0.81–0.82</td><td>0.29–0.32</td><td>0.19–0.20</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 1:</strong> Prey grouping at iteration 2,000, 50 episodes per run (ranges over runs). Prey that cannot see each other cluster and align more, in all three runs and from early in training.</figcaption>
</figure>

Seeing neighbours' movement made no measurable difference (B against A), and seeing other prey did not measurably help prey find grass: after losing sight of it, prey in all three versions got back to it at similar rates. The grouping that exists does not seem to depend on social information. One possible reading, not tested directly: prey that see each other avoid crowding at the same grass, a separation rule rather than cohesion.

## Restraint and group hunting

Predators were checked for the two behaviours Ritz et al. found. **Restraint** was not found: with fewer prey alive, predators chased about as hard and caught as often; they did stop more often, but the hungriest stopped most, which points to saving energy (most of the energy cost is movement) rather than sparing prey. Unlike Ritz et al.'s predators, these cannot see how many prey are left.

At first sight there was **group hunting**: when a second predator headed for the same prey, the prey was caught by anyone in 0.33 of encounters against 0.19 alone, and even the first predator caught it a little more often. The counterfactual replays showed no causal benefit to the focal predator; both predators going for the same easy prey is one plausible explanation of the association:

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Run</th><th>Prey caught by anyone</th><th>… by the second predator</th><th>… by the focal predator</th><th>Placebo (focal)</th></tr>
    </thead>
    <tbody>
      <tr><td>A (first run)</td><td>+0.063</td><td>+0.072</td><td>−0.009</td><td>+0.006</td></tr>
      <tr><td>A (second run)</td><td>+0.061</td><td>+0.077</td><td>−0.016</td><td>−0.002</td></tr>
      <tr><td>A (first run, iteration 600)</td><td>+0.064</td><td>+0.078</td><td>−0.014</td><td>+0.004</td></tr>
      <tr><td>B (first run)</td><td>+0.047</td><td>+0.065</td><td>−0.018</td><td>−0.004</td></tr>
      <tr><td>C (first run)</td><td>+0.050</td><td>+0.061</td><td>−0.011</td><td>+0.000</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 2:</strong> Effect of a second predator heading for the same prey (factual minus that predator stopped), within three decisions, about 1,900 replays per run. The focal predator's intervals (95%, over episodes) all lie below zero; the placebo's include it.</figcaption>
</figure>

The second predator adds only its own catches and slightly lowers the first predator's: no synergy was detected. In this world the first predator to touch a prey gets all its energy, and the result is consistent with scramble competition.

## A shared carcass

To give hunting together a payoff, a catch's energy was split among the catcher and every predator within 96 units (two runs; two more with slower predators as well, to make lone catches harder).

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Predators</th><th>World</th><th>Second predator's effect on the focal predator being fed</th><th>Catch risk</th><th>Prey alive</th></tr>
    </thead>
    <tbody>
      <tr><td>Trained without sharing (2 runs)</td><td>no sharing</td><td>−0.012, −0.001</td><td>2.06, 2.15</td><td>26, 24</td></tr>
      <tr><td>Trained without sharing (2 runs)</td><td>sharing at test time</td><td>+0.054, +0.055</td><td>–</td><td>–</td></tr>
      <tr><td>Trained with sharing (4 runs)</td><td>sharing</td><td>+0.049 to +0.062</td><td>1.21–1.93</td><td>28–38</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 3:</strong> The shared carcass. A second predator now raises the focal predator's chance of being fed, by a similar amount whether or not the predators trained with sharing: no evidence that training added coordination. Catch risk is prey caught per prey alive per 1,000 physics steps.</figcaption>
</figure>

Predators trained with sharing did not group more and pursued jointly slightly less often. All four sharing runs had fewer catches and more prey alive than the two baseline runs (one-sided p = 0.07 for four runs against two, the smallest these numbers allow; two of the four also had slower predators). Sharing makes being *near* a catch pay, not *helping* with it, and lone predators still caught about 19% of the prey they met.

## Large prey that a lone predator cannot catch

Finally, prey with energy 6 or more could only be caught if a second predator was within 128 units, the energy shared between them. Trained from scratch, predators never reproduce under such a rule (with the only reward a birth, there is then nothing to learn from), and stricter versions wiped out even trained predators, so this mild version was trained for 1,000 iterations starting from the trained predators and prey (K), against the same start in the unchanged world (W).

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Policies</th><th>Coexisting (of 50)</th><th>Joint pursuit of large minus small prey</th><th>Second predator's effect on the focal predator being fed</th></tr>
    </thead>
    <tbody>
      <tr><td>Untrained for the rule, in the large-prey world</td><td>18, 17</td><td>+0.007, +0.006</td><td>+0.002, +0.000</td></tr>
      <tr><td>Trained with the rule (K)</td><td>45, 34</td><td>+0.013, +0.001</td><td>+0.007, +0.011</td></tr>
      <tr><td>Trained in the unchanged world (W)</td><td>42, 45</td><td>+0.037, +0.044</td><td>−0.015, −0.021</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 4:</strong> Large prey (energy 6 or more) that need a second predator within 128 units, two runs per row. Joint pursuit: another predator's chosen action heads for the same prey.</figcaption>
</figure>

The predators adapted: coexistence recovered from 17–18 to 34–45 of 50 episodes, and large prey met without a second predator heading for them were caught more often (0.07 before training, 0.10–0.11 after). But they did not team up on large prey more than predators untrained for the rule, and less than in the unchanged world, where large prey draw more joint pursuit anyway; the second predator's effect moved by at most about 0.01. In these runs predators could not see a prey's energy, so they could not tell which prey needed a partner. An earlier experiment in the [PredPreyGrassContinuous](/learning-selection-interaction/predpreygrass-continuous) repository, where a catch depended on the summed energy of the attackers, found the same pattern: predators attacked together more often in general, but not specifically against the strong prey for which it pays.

## Summary

**No evidence of emergent cooperation was found in this world.** Across five tests, the benefits of a partner were about as large for policies untrained for the rule, so training added no measurable coordination. Prey grouping did not depend on social information, joint pursuit was consistent with competition, and predators adapted to sharing and to large prey without measurably coordinating.

**Why this may differ from the studies it started from.** In Hahn et al.'s foraging task, orienting to neighbours helped agents track a target that was mostly out of sight, and the reward came every step. In Ritz et al.'s study, predators saw the whole world and lone hunting rarely worked. Here, food is often in sight, a birth is the only reward, a predator sees at most three prey, and lone hunting keeps working well enough. This fits the conclusion of the swarm studies (Hahn et al., 2019; 2020b) that apparent swarming can be a selfish equilibrium rather than cooperation; whether the absence of memory in the policies also plays a role was not tested.

**Open questions.** Most comparisons rest on two or three training runs per condition, so differences between conditions are reported as patterns across runs, not formal tests. Untested levers include predators that can see which prey need a partner (trained from scratch, with a gradual onset of the rule to get past the zero-birth start), policies with memory, and environments where a lone animal almost never succeeds.

## References

- Hahn, C., Phan, T., Gabor, T., Belzner, L., & Linnhoff-Popien, C. (2019). *Emergent escape-based flocking behavior using multi-agent reinforcement learning*. In *Artificial Life Conference Proceedings* (pp. 598–605). https://doi.org/10.1162/isal_a_00226
- Hahn, C., Ritz, F., Wikidal, P., Phan, T., Gabor, T., & Linnhoff-Popien, C. (2020). *Foraging swarms using multi-agent reinforcement learning*. In *Artificial Life Conference Proceedings* (pp. 333–340). https://doi.org/10.1162/isal_a_00267
- Hahn, C., Phan, T., Feld, S., Roch, C., Ritz, F., Sedlmeier, A., Gabor, T., & Linnhoff-Popien, C. (2020b). *Nash equilibria in multi-agent swarms*. In *Proceedings of the 12th International Conference on Agents and Artificial Intelligence* (pp. 234–241). https://doi.org/10.5220/0008990802340241
- Ritz, F., Ratke, D., Phan, T., Belzner, L., & Linnhoff-Popien, C. (2021). *A sustainable ecosystem through emergent cooperation in multi-agent reinforcement learning*. In *Artificial Life Conference Proceedings* (p. 74). https://doi.org/10.1162/isal_a_00399
- Phan, T. (2023). *Emergence and resilience in multi-agent reinforcement learning* (Doctoral dissertation). LMU Munich.
- Clark, P. J., & Evans, F. C. (1954). *Distance to nearest neighbor as a measure of spatial relationships in populations*. *Ecology*, 35(4), 445–453. https://doi.org/10.2307/1931034
- Reynolds, C. W. (1987). *Flocks, herds and schools: A distributed behavioral model*. *ACM SIGGRAPH Computer Graphics*, 21(4), 25–34. https://doi.org/10.1145/37402.37406
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- doesburg11. *PredPreyGrass*, `foraging_swarms` module (code, measurements and results). GitHub. https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/foraging_swarms
