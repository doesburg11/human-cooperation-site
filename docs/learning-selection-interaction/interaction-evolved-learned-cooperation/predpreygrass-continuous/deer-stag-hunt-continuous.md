---
id: deer-stag-hunt-continuous
title: A Replicated Stag Hunt
sidebar_position: 8
slug: /learning-selection-interaction/predpreygrass-continuous/deer-stag-hunt
---

# A Replicated Stag Hunt

The [stag hunt line](/learning-selection-interaction/predpreygrass-continuous/stag-hunt) of the continuous [PredPreyGrass](/learning-selection-interaction/predpreygrass-continuous) world gave both coexistence and cooperation above chance only once: in a single training run, in a world where a fat rabbit could be caught only by two hunters touching it together and where hunters could also call. Did that result depend on the calls, or on one lucky run? This page reports a replication set in advance: the same world without calls, renamed to deer, trained three times from scratch. The result held in all three runs. The code, the pre-registration and every number below are in the [`deer_stag_hunt`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/deer_stag_hunt) module of the PredPreyGrass repository ([RESULTS.md](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/continuous_space/deer_stag_hunt/RESULTS.md), section 1).

## Key findings

- **The result replicated.** By the verdict rule set before training (all tests met in at least 2 of 3 runs), it replicated: two runs met all three tests at iteration 1000, and the third met the two cooperation tests but kept hunters and deer together in 43 of 50 episodes, short of the 45 required.
- **Cooperation above chance in every run.** Hunters approached adult deer with another hunter near 15 to 23% more often than their time near other hunters gives by chance, and more often than they approached fawns. The 95% interval was above zero in all three runs, at every checkpoint measured.
- **Calls were not needed.** The world that first showed this pattern also let hunters call. Without calls, and with the inputs and output that came with them removed, the pattern held.
- **The effect is small.** At iteration 1000, adults were 1 to 4% of the deer hunters caught and gave 3 to 8% of their energy from deer; most food was still young deer caught alone.
- **It weakened late in two runs.** From iteration 500 to 1000, adult catches fell by 84% in one run and 53% in another. At iteration 500 all three runs would have met all tests. Why is not known.

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
<figcaption className="site-table-caption"><strong>Display 1:</strong> Catching rules. A failed attempt costs each hunter that touched the deer a wait of one decision. A hunter gains half its share of the deer's energy, so two hunters sharing an adult each get more than a fawn gives one.</figcaption>
</figure>

The rule for young deer is a sharing rule, kept from the earlier world: a hunter nearby makes the catch certain but takes a share without touching the deer. So the value of a partner grows with the deer's size. Near a fawn a partner costs half the meal; for a middle deer above energy 3.5 a partner gives more in expectation than hunting alone (at energy 4.5, 1.1 each against 0.4 alone); for an adult a partner is required, and the partner has to arrive in time. A lone hunter can live on fawns. The rule makes a partner necessary for an adult, so what is tested is coordination where the task requires two, not the full stag hunt, in which a lone hunter could also take the large prey.

Hunters see up to four other hunters and two deer, with the deer's energy, in a 150° cone of 200 units. Deer see three hunters and three deer in a 240° cone of 267 units, and are faster (top speed 6 against 5). Hunters breed at energy 12 and deer at 7. An episode lasts 8000 physics steps.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/deer-stag-hunt-arena.gif" alt="Display 2: Animation of 25 seconds of an episode with trained policies: hunters with spears move among deer of three sizes on a light blue torus; adult deer are ringed in orange; grey and blue view cones show what one deer and one hunter see" width="400" />
  <figcaption className="site-table-caption"><strong>Display 2:</strong> A stretch of an evaluated episode of run_2's final policies (seed 0). Adult deer, catchable only by two hunters together, are ringed.</figcaption>
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

## What this does and does not show

Within this world, hunters learned to approach the prey that needs two with another hunter nearby more often than chance, in three runs out of three, and calls were not needed for it. That makes this the one replicated cooperation result in the stag hunt line.

It has clear limits:

- **A partner is required by rule.** This is coordination where the task demands two, not the stag hunt in its strict sense, where hunters choose a partner for a bigger share although alone they could also succeed. That version never showed cooperation in the earlier worlds.
- **The measure is an approach with a partner near, not proof that hunters seek a partner.** Hunters may meet near adults for other reasons, such as shared grass areas or deer herds; the chance baseline removes only part of that.
- **The fawn comparison is partly built in.** A partner near a fawn takes half of it, so hunters have a reason to keep away from others near fawns, which lowers the fawn share. The comparison with chance does not have this bias, and adults were above chance in all three runs, but part of the gap between adults and fawns may come from avoiding sharing rather than seeking partners.
- **The effect is small and fragile.** Adults stayed a small part of the hunters' diet, and in two runs catching them declined late in training.
- **Three runs show variation, not a population estimate.** Learning is one PPO policy shared by all hunters, not individual learning within a lifetime.

## References

- Skyrms, B. (2004). *The stag hunt and the evolution of social structure*. Cambridge University Press. https://doi.org/10.1017/CBO9781139165228
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- doesburg11. *PredPreyGrass*, `deer_stag_hunt` module (code, pre-registration and results). GitHub. https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/continuous_space/deer_stag_hunt
