---
id: deer-stag-hunt-continuous
title: A Replicated Stag Hunt
sidebar_position: 8
slug: /learning-selection-interaction/predpreygrass-continuous/deer-stag-hunt
---

# A Replicated Stag Hunt

The [stag hunt line](/learning-selection-interaction/predpreygrass-continuous/stag-hunt) of the continuous [PredPreyGrass](/learning-selection-interaction/predpreygrass-continuous) world gave both coexistence and cooperation above chance only once: in a single training run, in a world where a fat rabbit could be caught only by two hunters touching it together and where hunters could also call. Did that result depend on the calls, or on one lucky run? This page reports a replication set in advance: the same world without calls, renamed to deer, trained three times from scratch. The result held in all three runs. A second set of three runs then changed one rule, so that only touching a deer counts, and the result held again; in that world hunters also began to pair up on large young deer, where a partner pays but is not required, the stag hunt in its strict sense, and a control world in which a partner never pays for a young deer suggests that this pairing follows the payoff. The code, the pre-registrations and every number below are in the [`deer_stag_hunt`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/deer_stag_hunt) module of the PredPreyGrass repository ([RESULTS.md](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/continuous_space/deer_stag_hunt/RESULTS.md), sections 1, 2 and 5).

## Key findings

- **The result replicated.** By the verdict rule set before training (all tests met in at least 2 of 3 runs), it replicated: two runs met all three tests at iteration 1000, and the third met the two cooperation tests but kept hunters and deer together in 43 of 50 episodes, short of the 45 required.
- **Cooperation above chance in every run.** Hunters approached adult deer with another hunter near 15 to 23% more often than their time near other hunters gives by chance, and more often than they approached fawns. The 95% interval was above zero in all three runs, at every checkpoint measured.
- **Calls were not needed.** The world that first showed this pattern also let hunters call. Without calls, and with the inputs and output that came with them removed, the pattern held.
- **The effect is small.** At iteration 1000, adults were 1 to 4% of the deer hunters caught and gave 3 to 8% of their energy from deer; most food was still young deer caught alone.
- **It weakened late in two runs.** From iteration 500 to 1000, adult catches fell by 84% in one run and 53% in another. At iteration 500 all three runs would have met all tests. Why is not known.
- **It held when only touching counts.** In three further runs where a hunter merely near a young deer gets nothing, all three met every test: hunters and deer coexisted in 50 of 50 episodes in each run, and adults were approached with a partner near 12 to 21% more often than chance.
- **A first sign of the strict stag hunt.** In that world a large young deer can be caught alone, by chance, or by two hunters for certain, and a partner pays more. Hunters approached the largest young deer with a partner near slightly above chance and teamed up on them nearly as often as on adults, in 2 of 3 runs by tests set in advance; in the original world they did neither. The tests were set after a look at earlier checkpoints, and the margins are small.
- **A control world points to the payoff.** In a control world where one hunter catches any young deer for certain, so a partner never pays for one, hunters no longer approached the largest young deer with a partner near above chance, and teamed up on them at under a third of the adult level, in all 3 runs by a rule set in advance. Partnering still rose with the deer's size there, so looks or place may explain part of the rise; the margins are a few percentage points.

## The world

Hunters, standing for humans, and deer share an 800 by 800 continuous torus with clustered grass. Each species learns one shared PPO policy (Schulman et al., 2017), rewarded only for births. Deer eat grass and grow; what a deer is worth, and who can catch it, depends on its energy:

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Deer</th><th>Energy</th><th>Hunter alone (no other hunter within 64 units)</th><th>Another hunter within 64 units of the deer</th><th>Stag hunt role</th></tr>
    </thead>
    <tbody>
      <tr><td>Fawn</td><td>2 or less</td><td>always caught</td><td>always caught, but shared by every hunter within 64 (the others need not touch it)</td><td>the hare</td></tr>
      <tr><td>Middle</td><td>between 2 and 5</td><td>caught with a chance falling from 1 to 0 as the deer grows</td><td>always caught, shared as for a fawn</td><td>in between</td></tr>
      <tr><td>Adult</td><td>5 or more</td><td>never caught</td><td>caught only if two or more hunters touch it within one decision (8 physics steps), shared by those who touched it alone</td><td>the stag</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 1:</strong> Catching rules of the original world (run_1 to run_3). A second experiment replaced them with a rule in which only touching counts (Display 6). A failed attempt costs each hunter that touched the deer a wait of one decision. A hunter gains half its share of the deer's energy, so two hunters sharing an adult each get more than a fawn gives one.</figcaption>
</figure>

The rule for young deer is a sharing rule, kept from the earlier world: a hunter nearby makes the catch certain but takes a share without touching the deer. So the value of a partner grows with the deer's size. Near a fawn a partner costs half the meal; for a middle deer above energy 3.5 a partner gives more in expectation than hunting alone (at energy 4.5, 1.1 each against 0.4 alone); for an adult a partner is required, and the partner has to arrive in time. A lone hunter can live on fawns. The rule makes a partner necessary for an adult, so what is tested is coordination where the task requires two, not the full stag hunt, in which a lone hunter could also take the large prey.

Hunters see up to four other hunters and two deer, with the deer's energy, in a 150° cone of 200 units. Deer see three hunters and three deer in a 240° cone of 267 units, and are faster (top speed 6 against 5). Hunters breed at energy 12 and deer at 7. An episode lasts 8000 physics steps.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/deer-stag-hunt-arena.gif" alt="Display 2: Animation of 25 seconds of an episode with trained policies: hunters with spears move among deer of three sizes on a light blue torus; adult deer have antlers, fawns are small with white spots; grey and blue view cones show what one deer and one hunter see" width="400" />
  <figcaption className="site-table-caption"><strong>Display 2:</strong> A stretch of an evaluated episode of run_2's final policies (seed 0). Adult deer, catchable only by two hunters together, have antlers; fawns are small with white spots; middle deer are plain.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/deer-stag-hunt-population.png" alt="Display 3: Line chart of the same episode over 8000 physics steps: deer numbers swing between about 10 and 67, with fawns, middle and adult deer each swinging between about 1 and 32; hunters rise slowly from 6 to about 13 and end at 9; both species are alive at the end" width="480" />
  <figcaption className="site-table-caption"><strong>Display 3:</strong> Populations over the whole episode of Display 2. Both species are alive at the end, as in 49 of run_2's 50 evaluated episodes. In this episode hunters caught 636 young deer and 26 adults.</figcaption>
</figure>

## What was tested

Three runs (`run_1`, `run_2`, `run_3`) trained from scratch for 1000 iterations each, differing only by chance. Each final checkpoint was tested on:

1. **Coexistence:** hunters and deer both alive at the end of at least 45 of 50 evaluated episodes.
2. **Cooperation:** approaches to adults have another hunter within 64 units more often than approaches to fawns, and more often than chance. Chance is the share of all hunter time spent with another hunter that near (20 evaluated episodes).
3. **Above the earlier world:** adult share divided by chance above 0.90, the value of the stag hunt line's lean-and-fat world, where a fat rabbit needed a party nearby but not two touches.

The tests, the verdict rule and the hard stop (no change to the world after the runs) were written down before training. Checkpoints 250 and 500 were recorded as well, but were not tests.

## Results

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Run</th><th>Coexisting (of 50)</th><th>Chance</th><th>Fawn share</th><th>Adult share</th><th>Adult ÷ chance</th><th>Adult − chance, 95% interval</th><th>Tests met</th></tr>
    </thead>
    <tbody>
      <tr><td>run_1</td><td>43</td><td>0.074</td><td>0.058</td><td>0.089</td><td>1.20</td><td>[0.002, 0.028]</td><td>2, 3</td></tr>
      <tr><td>run_2</td><td>49</td><td>0.155</td><td>0.117</td><td>0.190</td><td>1.23</td><td>[0.024, 0.045]</td><td>1, 2, 3</td></tr>
      <tr><td>run_3</td><td>50</td><td>0.125</td><td>0.095</td><td>0.144</td><td>1.15</td><td>[0.010, 0.027]</td><td>1, 2, 3</td></tr>
      <tr><td>With calls (earlier, one run)</td><td>49</td><td>0.132</td><td></td><td>0.155</td><td>1.18</td><td></td><td></td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 4:</strong> Final checkpoints (iteration 1000). A share is the fraction of approaches with another hunter within 64 units. Verdict: replicated. In run_1's 7 failed episodes the hunters died out.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/deer-stag-hunt-results.png" alt="Display 5: Two charts over training iterations 250, 500 and 1000 for three runs. Left: adult share with a partner near minus chance, in percentage points with 95% intervals; all nine points lie between 1.5 and 4.5, all intervals above zero, run_1's lowest at iteration 1000 at 0.2. Right: adults caught in 50 episodes; run_1 falls from 1757 to 1481 to 243, run_2 goes from 1043 to 1298 to 1130, run_3 from 1393 to 1491 to 706" style={{ display: 'block', width: '100%', height: 'auto' }} />
  <figcaption className="site-table-caption"><strong>Display 5:</strong> Left: how much more often adults were approached with a partner near than chance, with bootstrap 95% intervals over episodes. Right: adults caught over 50 evaluated episodes. At iterations 250 and 500 all three runs coexisted in 50 of 50 episodes.</figcaption>
</figure>

Cooperation above chance was there early and stayed: at iterations 250 and 500 all three runs coexisted in every episode, with adult ÷ chance between 1.17 and 1.25. What changed late was how much hunting of adults there was. In run_1, adult catches fell from 1481 to 243 between iterations 500 and 1000, hunter births fell from 1042 to 439, and 7 episodes lost all hunters; in run_3 adult catches halved. Approaches to adults still had a partner near more often than chance, but there were fewer of them. This experiment did not test why.

## Only touching counts

In the world above, a hunter near a young deer shares it without touching it. That rule is not needed for a stag hunt, gives hunters a share for nothing, and builds in part of the fawn comparison. A second experiment, written down before training like the first, changed only that rule:

- every touch is a solo attempt: a fawn is always caught, a middle deer with a chance falling from 1 at energy 2 to 0 at energy 5, an adult never; the catch goes to the toucher alone;
- two or more hunters touching a deer within one decision catch it whatever its size, and share it between them only;
- a hunter merely near gets nothing.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Deer</th><th>Energy</th><th>One hunter touches it</th><th>Two or more hunters touch it within one decision</th><th>A hunter near but not touching</th></tr>
    </thead>
    <tbody>
      <tr><td>Fawn</td><td>2 or less</td><td>always caught, all for the toucher</td><td>caught, shared by the touchers</td><td>gets nothing</td></tr>
      <tr><td>Middle</td><td>between 2 and 5</td><td>caught with a chance falling from 1 to 0 as the deer grows, all for the toucher</td><td>caught, shared by the touchers</td><td>gets nothing</td></tr>
      <tr><td>Adult</td><td>5 or more</td><td>never caught</td><td>caught, shared by the touchers</td><td>gets nothing</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 6:</strong> Catching rules of the touch rule (touch_1 to touch_3). Distance to other hunters plays no part: a deer is caught together only when two or more hunters touch it within one decision (8 physics steps). A failed attempt costs the toucher a wait of one decision, as before.</figcaption>
</figure>

Adults are caught exactly as before. Three new runs (`touch_1`, `touch_2`, `touch_3`) were trained from scratch and tested as before, with the same verdict rule and the same hard stop. The cooperation tests kept the same measure too: an approach with another hunter within 64 units of the deer. Under the touch rule that distance plays no part in catching; it measures only where the hunters are, and was kept so that the two experiments compare directly. The measure that fits the touch rule, two hunters touching the deer together, comes in the next part.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Run</th><th>Coexisting (of 50)</th><th>Chance</th><th>Fawn share</th><th>Adult share</th><th>Adult ÷ chance</th><th>Adult − chance, 95% interval</th><th>Tests met</th></tr>
    </thead>
    <tbody>
      <tr><td>touch_1</td><td>50</td><td>0.132</td><td>0.093</td><td>0.148</td><td>1.12</td><td>[0.006, 0.026]</td><td>1, 2, 3</td></tr>
      <tr><td>touch_2</td><td>50</td><td>0.142</td><td>0.099</td><td>0.171</td><td>1.21</td><td>[0.023, 0.036]</td><td>1, 2, 3</td></tr>
      <tr><td>touch_3</td><td>50</td><td>0.082</td><td>0.054</td><td>0.095</td><td>1.15</td><td>[0.004, 0.021]</td><td>1, 2, 3</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 7:</strong> Touch rule, final checkpoints (iteration 1000), same tests as Display 4. Verdict: replicated, in all three runs. All three runs coexisted in 50 of 50 episodes at iterations 250 and 500 too.</figcaption>
</figure>

So the sharing rule for young deer was not needed for this result. The limits carry over: adults were 1.5 to 3.2% of the deer caught, and adult catches again fell between iterations 500 and 1000, by 25 to 44%, though no run lost its hunters.

### Pairing where a partner pays but is not required

Under the touch rule, a middle deer is a small stag hunt of its own. A hunter can try it alone and catch it with a chance that falls as the deer grows, or two hunters can take it for certain and split it. Per hunter, alone pays more below energy 3.5 and a partner pays more above it. Nothing forces a partner, so this is the stag hunt in its strict sense, which no earlier world of this line had shown.

After a first look at earlier checkpoints of touch_1 and touch_2, three tests were written down before the final checkpoints existed. In each run: (A) the share of approaches with a partner near rises from middle deer of energy 2 to 3.5 to those of energy 4 to 5; (B) for the largest middle deer (energy 4.5 to 5) it is above chance; (C) two hunters touch middle deer of energy 4 to 5 together at least half as often as they do adults. The pattern counts as shown if all three hold in at least 2 of the 3 runs.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/deer-stag-hunt-energy.png" alt="Display 8: Two line charts over deer energy, from fawn through six middle-deer bands to adult, three blue lines for the touch-rule runs and three orange lines for the original-rule runs. Left: share of approaches with a partner near divided by chance; all lines dip to about 0.4 to 0.7 for small middle deer and rise with energy; the blue lines cross chance at energy 4.5 to 5, at 1.09 to 1.15, while the orange lines stay at 0.81 to 0.91 there; at adults all lines are at 1.09 to 1.23. Right: joint touches divided by joint touches on adults; the blue lines rise steadily from about 0.1 to about 1.0 at energy 4.5 to 5; the orange lines stay below 0.4 until adults" style={{ display: 'block', width: '100%', height: 'auto' }} />
  <figcaption className="site-table-caption"><strong>Display 8:</strong> Partnering by the deer's energy at the approach, final checkpoints, 40 evaluated episodes per run. Blue: touch rule (touch_1 to touch_3); orange: the original world (run_1 to run_3). Shaded: middle deer for which a partner pays more than hunting alone.</figcaption>
</figure>

**Verdict: pattern shown.** touch_2 and touch_3 met all three tests; touch_1 met A and C and missed B narrowly (its 95% interval for near share minus chance was −0.001 to +0.025). touch_3, the one run nobody had looked at before the tests were set, met all three. Under the original rule all three runs failed B and C: there the largest middle deer stayed below chance, and joint touches on them were about a quarter of the adult level.

This is consistent with hunters pairing up where a partner pays without being required. It is not proof of choosing by payoff. The crossing of chance comes near energy 4.5, not at the break-even of 3.5. Large middle deer differ from adults only by a little energy, so they may share places with adults, or hunters may simply treat them like adults; a joint-touch level close to the adult one would look the same either way. A control world separates these explanations (next part).

### A control world: when a partner never pays

To tell payoff apart from place and looks, three more runs (`control_1` to `control_3`, 500 iterations) were trained in the touch world with one change, set in advance: one hunter catches any fawn or middle deer for certain. Adults still need two. A partner now never pays for a young deer, since sharing only halves a meal that is certain anyway, but the deer stand where they stood and look as they looked. If payoff drove the pairing on large middle deer, it should vanish here; if place or likeness to adults drove it, it should stay. The rule: payoff is supported if, in at least 2 of 3 runs that keep hunters and deer together (45 of 50 episodes or more), test B fails and joint touches on deer of energy 4 to 5 stay clearly below half the adult level.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Run</th><th>Coexisting (of 50)</th><th>Partner near, energy 4.5 to 5, ÷ chance</th><th>B: near − chance, 95% interval</th><th>C: joint (4 to 5) ÷ joint adult, 95% interval</th></tr>
    </thead>
    <tbody>
      <tr><td>control_1</td><td>48</td><td>0.94</td><td>[−0.026, +0.001]</td><td>0.31 [0.27, 0.35]</td></tr>
      <tr><td>control_2</td><td>49</td><td>0.90</td><td>[−0.036, −0.007]</td><td>0.28 [0.24, 0.32]</td></tr>
      <tr><td>control_3</td><td>49</td><td>0.86</td><td>[−0.043, −0.013]</td><td>0.28 [0.23, 0.32]</td></tr>
      <tr><td><em>touch_1, iteration 500</em></td><td>50</td><td>1.18</td><td>[+0.017, +0.039]</td><td>1.00 [0.91, 1.11]</td></tr>
      <tr><td><em>touch_2, iteration 500</em></td><td>50</td><td>1.13</td><td>[+0.011, +0.032]</td><td>0.89 [0.82, 0.97]</td></tr>
      <tr><td><em>touch_3, iteration 500</em></td><td>50</td><td>1.04</td><td>[−0.005, +0.013]</td><td>0.84 [0.76, 0.93]</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 9:</strong> Control world (one hunter catches any young deer for certain), final checkpoints (iteration 500), 40 evaluated episodes per run; the touch-rule runs at the same training length for comparison, in italics. Verdict: payoff supported, in all three runs. Adults, which still need two, were approached with a partner near 1.10 to 1.17 times as often as chance.</figcaption>
</figure>

**Verdict: payoff supported.** Without a payoff for a partner, hunters stayed just below chance with the largest middle deer, and teamed up on them less than a third as often as on adults, much as in the original world. So place and likeness to adults did not by themselves produce the pairing seen under the touch rule; the result is consistent with hunters pairing up more where a partner pays.

It has limits. Partnering still rose with the deer's size in the control world, even more steeply, so place or likeness may explain part of that rise; what the control lacks is the step from just below chance to above it. Hunters teamed up on adults more often in the control world, which lowers the ratio in test C from the adult side too, so test B is the cleaner comparison. The two worlds also differ in food: easy catches feed the hunters more, and they stood closer together. The verdict rests on the pattern being absent in one world, not on a direct test of the difference, and the margins are a few percentage points.

## What this does and does not show

Within this world, hunters learned to approach the prey that needs two with another hunter nearby more often than chance, in three runs out of three, and calls were not needed for it. The result held again, in three runs out of three, when only touching counts. That makes this the one replicated cooperation result in the stag hunt line.

It has clear limits:

- **For adults, a partner is required by rule.** The main result is coordination where the task demands two, not the stag hunt in its strict sense, where hunters choose a partner for a bigger share although alone they could also succeed. The pairing on large middle deer under the touch rule is the first sign of that version in this line, but it is small and its tests were informed by a look at earlier checkpoints. A control world without a payoff for a partner did not show it, which points to the payoff rather than to place or likeness to adults, though the worlds also differ in ecology.
- **The measure is an approach with a partner near, not proof that hunters seek a partner.** Hunters may meet near adults for other reasons, such as shared grass areas or deer herds; the chance baseline removes only part of that.
- **The fawn comparison is partly built in.** A partner near a fawn takes half of it, so hunters have a reason to keep away from others near fawns, which lowers the fawn share. The comparison with chance does not have this bias, and adults were above chance in all three runs, but part of the gap between adults and fawns may come from avoiding sharing rather than seeking partners. Under the touch rule a partner near a fawn takes nothing, and adults were still above fawns in all three runs.
- **The effect is small and fragile.** Adults stayed a small part of the hunters' diet, and in two runs catching them declined late in training.
- **Three runs show variation, not a population estimate.** Learning is one PPO policy shared by all hunters, not individual learning within a lifetime.

## References

- Skyrms, B. (2004). *The stag hunt and the evolution of social structure*. Cambridge University Press. https://doi.org/10.1017/CBO9781139165228
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- doesburg11. *PredPreyGrass*, `deer_stag_hunt` module (code, pre-registration and results). GitHub. https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/deer_stag_hunt
