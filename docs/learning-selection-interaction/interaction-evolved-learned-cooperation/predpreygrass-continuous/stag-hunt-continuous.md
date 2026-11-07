---
id: stag-hunt-continuous
title: The Stag Hunt and Restraint
sidebar_position: 7
slug: /learning-selection-interaction/predpreygrass-continuous/stag-hunt
---

# The Stag Hunt and Restraint

Can hunters in the continuous [PredPreyGrass](/learning-selection-interaction/predpreygrass-continuous) world learn a stag hunt: live on small prey alone, but hunt together for more? Hunters stand for humans, share one PPO policy, and are rewarded only for births. The aim was a world where hunters and prey keep coexisting (at least 45 of 50 evaluated episodes) and hunting shows cooperation above chance. About 30 runs over two modules, one seed each, reached both only once, in a final world where a fat rabbit can be caught only by two hunters together (below). The code and every number below are in the [`stag_hunt_continuous`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/stag_hunt_continuous) and [`stag_hunt_rule_prey`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/stag_hunt_rule_prey) modules of the PredPreyGrass repository.

## Key findings

- **Group hunting is easy to learn where it pays.** With mammoths that only a party can kill, hunters arrived at mammoths together 2.7 to 3.6 times as often as chance, and mammoths became 87 to 92% of their food.
- **Restraint was never learned.** In every world where hunters could overrun their prey, they did: none of the 50 evaluated episodes kept all species in any of the trained mammoth arms with rule-following prey.
- **Changing the prey moved the failure, not removed it.** Scarcer food, a larger world, faster prey, burrows, seasons, spaced births, lean and fat rabbits, and rabbits that evolve each either let hunters overrun the prey or left them starving. Where coexistence held, cooperation was at or near chance.
- **Coordination appeared once a partner was required.** When fat rabbits could be caught only by two hunters touching them together, hunters and rabbits coexisted in 49 of 50 episodes and hunters approached fat rabbits with a partner near more often than chance (16% against 13%; lean rabbits 10%). Calls the hunters could make never acquired a detectable use.
- **One reading, not tested:** leaving prey for later is a commons dilemma of its own, a second cooperation problem on top of the stag hunt, and a births reward gives an individual hunter no reason to hold back.

## Two modules

In the first module, `stag_hunt_continuous`, hunters, rabbits and mammoths all learned with the same network. Over 20 calibration rounds the results lay along one trade-off: worlds with strong group hunting boomed and lost a prey species, and every brake that kept the prey also removed the hunters' interest in mammoths. The best mix (30 of 50 coexisting, mammoths 46% of food, joint arrivals 1.3x chance) moved to the stable side with more training.

Prey that learn as fast as human hunters are hard to defend, since prey adapt over generations and hunters within a lifetime. The second module, `stag_hunt_rule_prey`, therefore gave the prey fixed rules (flee a hunter in view, else go to food, else wander), so that only hunters learn.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>World</th><th>Coexisting (of 50)</th><th>Cooperation</th></tr>
    </thead>
    <tbody>
      <tr><td>Rabbits only, learning prey (round 1a)</td><td>49</td><td>no stag option in this world</td></tr>
      <tr><td>Mammoths, learning prey (best rounds)</td><td>39 to 50</td><td>joint arrivals at most 1.3x chance</td></tr>
      <tr><td>Mammoths, rule-following prey (3 arms rewarded for births)</td><td>0</td><td>joint arrivals 2.7 to 3.6x chance</td></tr>
      <tr><td>Rabbits only, lean and fat</td><td><strong>46</strong></td><td>approaches to fat rabbits with a partner below chance</td></tr>
      <tr><td>Same, trained twice as long</td><td>29</td><td>unchanged</td></tr>
      <tr><td>Same, rabbits evolving</td><td>18 (hunters starving in 22)</td><td>below chance</td></tr>
      <tr><td>Lean and fat, rabbits learning, hunters see rabbit energy</td><td><strong>46</strong></td><td>fat approaches with a partner at chance (24% against 25%)</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 1:</strong> The main worlds of the stag hunt line, one training run each, 50 evaluated episodes per row.</figcaption>
</figure>

## Lean and fat rabbits

To make the stag hunt as simple as possible, the mammoths were removed and the rabbits split by condition: a lone hunter always catches a lean rabbit, but its chance falls to zero for a fat one, while two hunters close together always catch it and share it. In this world hunters and rabbits coexisted in 46 of 50 episodes, the first world with rule-following prey to meet the coexistence target (with learning prey, hunters and rabbits alone had coexisted in 49 of 50, and two mammoth rounds in 47 and 50, all without a cooperation signal). But hunters approached fat rabbits with a partner nearby no more often than their time near other hunters would give by chance (31% against 33%), so the stag hunt was not being played. Trained twice as long, they ate the rabbits out more often (29 of 50) with cooperation unchanged.

In these rule-prey runs the hunters could see where rabbits were but not their energy, so they could not tell fat from lean. A last run fixed this and let rabbits learn as well, in the world of round 1a. Hunters and rabbits coexisted in 46 of 50 episodes. Hunters approached lean rabbits with a partner near less often than chance (17%), but fat ones only at chance (24% against 25%): they seem to have learned which rabbits a lone hunter can take, not to bring a partner for the ones it cannot. The test set in advance for cooperation failed.

## Catching together, and calls

Three follow-ups came after. Bigger fat rabbits (breeding only at higher energy) never bred: they were eaten before they grew. With rabbits born leaner and breeding sooner, hunters and rabbits coexisted in 46 of 50 episodes, but fat rabbits were approached with a partner near slightly *less* often than chance (13% against 15%).

The last world added two things human group hunters have: a way to recruit, and a share only for those who take part. Hunters could call, an action with no built-in meaning that other hunters within range hear; and a fat rabbit was caught only once two hunters had each touched it within one decision, shared between them alone. Four tests were set in advance. Hunters and rabbits coexisted in 49 of 50 episodes; hunters approached fat rabbits with a partner near more often than chance (16% against 13%, lean rabbits 10%, fat above lean in all 20 measured episodes) and more than in the previous world; but a partner did not arrive more often after a call than after silence. Replaying the trained hunters with calls silenced left the pattern unchanged, so there is no evidence the calls mattered.

This is the only world in the line that met both coexistence and cooperation above chance. It has two limits. The rule makes a partner necessary for a fat rabbit, so what appeared is coordination where the task requires two, not the stag hunt in its own sense, where a lone hunter could also succeed and partners are sought for a larger share; that version, tested in the worlds above, never showed it. And calls and the catching rule were changed together in one run, so their effects cannot be separated, although the silenced replay points to what hunters already see of each other rather than to calls.

## Rabbits that evolve

In every run so far hunters adapted and the prey did not. In the last run each rabbit carried two heritable genes, its flee distance and the energy at which it breeds, passed on with small mutations, alongside a reference run whose genes were carried but had no effect. Three tests were set in advance, and all three failed: coexistence 18 of 50, gene differences from the reference not distinguishable from drift (p = 0.12 and 0.63), and no cooperation. Exploratory, from 14 lineages: lineages whose rabbits bred late, and so stayed fat and out of a lone hunter's reach, starved the hunters, who did not switch to hunting them in pairs.

## What this does and does not show

Every comparison rests on one training run per world, so these are patterns across runs, not confirmed results. They are consistent with a simple account: hunting together is learned readily when a party is needed for a large reward, but not overharvesting a shared, renewing food source is not, because an individual hunter rewarded for its own births gains nothing by holding back. If that is right, the obstacle is the second dilemma, restraint, which no change to the prey would remove.

Human societies face that second dilemma too, and Ostrom's work on common-pool resources describes how they solve it. One mechanism remains on record as untested here: selection between groups, using the training setup's separate worlds, in which worlds whose hunters ate out their prey are replaced by copies of worlds that kept it.

## References

- Skyrms, B. (2004). *The stag hunt and the evolution of social structure*. Cambridge University Press. https://doi.org/10.1017/CBO9781139165228
- Ostrom, E. (1990). *Governing the commons: The evolution of institutions for collective action*. Cambridge University Press. https://doi.org/10.1017/CBO9780511807763
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- doesburg11. *PredPreyGrass*, `stag_hunt_continuous` and `stag_hunt_rule_prey` modules (code, measurements and results). GitHub. https://github.com/doesburg11/PredPreyGrass
