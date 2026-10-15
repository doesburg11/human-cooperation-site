---
id: predpreygrass-continuous
title: PredPreyGrassContinuous
sidebar_position: 4
slug: /learning-selection-interaction/predpreygrass-continuous
---

# PredPreyGrassContinuous

A continuous-space counterpart of [PredPreyGrass](/learning-selection-interaction/predpreygrass): the same predator–prey–grass ecosystem, with energy, reproduction and a sparse reward for births, rebuilt in an arena where animals move with physics instead of hopping between grid cells. The code is in the [PredPreyGrassContinuous repository](https://github.com/doesburg11/PredPreyGrassContinuous), and every training run is recorded in its experiment logs.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/arena-no-walls.gif" alt="Display 1: Animation of an 800 by 800 arena in which predators drawn as hunters chase prey drawn as antelopes, which graze clusters of grass; a blue view cone of one predator and a grey view cone of one prey move with them and wrap across the arena's edges" width="480" />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> About 240 decisions of trained predators (hunters) and prey (antelopes) in the healthiest ecosystem so far, with speed actions and a fixed energy cost; the shaded cones show what one predator (blue) and one prey (grey) can see.</figcaption>
</figure>

## Key findings

- In every tournament of the first ecosystems (static grass, moving grass, predators seeing grass), prey kept adapting for thousands of iterations while predators stopped improving after a few hundred: newer prey were harder to catch in 96–98% of pairs, newer predators caught more in only 32–55%.
- The predators' plateau sat at energy break-even, about 8 catches per predator per 1,000 physics steps, in every run and with scripted pursuit strategies alike.
- Letting predators see grass, as they can in PredPreyGrass, raised their catch rate by 34% against the same prey, but only once: they reached the new ceiling within 400 iterations, and the prey caught up.
- A movement cost favours whichever species moves least. Predators, which wait more, starved less as the share of the cost paid for movement rose, and coexistence fell from 40 of 50 episodes (no movement cost) to 33, 11 and 1 of 50 at 10%, 25% and 50%. Running animals spend 80–90% of their energy on movement (Taylor, Heglund and Maloiy, 1982).
- With such a realistic movement cost, predators became ambushers: stopped about half the time, mostly at the grass, lunging at prey that came to eat. Faster prey hardly helped, since against an ambush, speed matters less than seeing the danger in time.
- Spreading the same grass over 20 small clusters instead of 5 large ones broke the ambush (coexistence 43 against 31 of 50, reproduced in two repeat runs with 44 and 42 of 50) and produced the longest arms race: both species improved against each other for about 2,000 iterations while staying evenly matched, then levelled off with both alive in 40 of 50 episodes. Two runs trained from scratch in the same world reached the same state (37 and 41 of 50). In a larger tournament test of three further runs, both species improved against each other in all three, and predators were still improving at 3,000 iterations in all of them. Two runs without the simulation's implementation quirks kept the arms race, with predators catching about half as often.
- Making a catch a contest between the summed energy of nearby predators and the prey's energy produced the first arms race: over 1,500 iterations newer predators beat older ones in 88% of tournament pairs and newer prey in 78%. It did not last: the predators, now the struggling species, then degraded (30%), although they attacked together more and more often (20% of attacks, against 7% by chance). With a little more energy per catch, the predators stayed viable and made 64% of their catches in groups, but both species stopped improving after about 1,800 iterations, and the predators teamed up more often in general rather than specifically against the strong prey for which it pays.

## From grid to continuous space

The environment is built on [Aquarium](https://github.com/michaelkoelle/marl-aquarium), a physics-based predator–prey environment, and trained with [Proximal Policy Optimization (PPO)](https://en.wikipedia.org/wiki/Proximal_policy_optimization), one shared policy per species, using RLlib. Animals have position, velocity and limited acceleration and turning; a predator catches a prey when their bodies touch. Each animal sees through a view cone (predators 150°, prey 240°) and observes the nearest animals and grass patch in it, relative to itself.

The PredPreyGrass rules are carried over as directly as the change of space allows:

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr>
        <th>PredPreyGrass (grid)</th>
        <th>PredPreyGrassContinuous</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>25 × 25 grid, one cell per step</td>
        <td>800 × 800 arena; one grid cell ≈ 32 units ≈ 8 physics steps</td>
      </tr>
      <tr>
        <td>1,000-step episodes</td>
        <td>8,000 physics steps; one decision lasts 8 physics steps</td>
      </tr>
      <tr>
        <td>Energy decay, gain from grass and prey</td>
        <td>The same energy units, per-step rates divided by 8</td>
      </tr>
      <tr>
        <td>Reproduction at an energy threshold</td>
        <td>The same thresholds; the offspring is paid from the parent's energy</td>
      </tr>
      <tr>
        <td>Reward only for reproducing (+10)</td>
        <td>The same sparse reward</td>
      </tr>
      <tr>
        <td>Grass regrows in place</td>
        <td>Grass grows in clusters that drift by seed dispersal and die back when overgrazed</td>
      </tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 2:</strong> How the PredPreyGrass grid rules carry over to the continuous arena.</figcaption>
</figure>

## Extensions, step by step

The repository adds one mechanism at a time, each in its own module, so every change can be compared with the world before it:

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr>
        <th>Module</th>
        <th>Adds</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>add_grass</code></td>
        <td>Grass patches that prey eat and that regrow</td>
      </tr>
      <tr>
        <td><code>add_energy</code></td>
        <td>Metabolic energy, food, starvation</td>
      </tr>
      <tr>
        <td><code>add_reproduction</code></td>
        <td>Births at an energy threshold, the +10 birth reward, moving grass clusters, predators that see grass</td>
      </tr>
      <tr>
        <td><code>add_walls</code></td>
        <td>Walls that block movement and sight; actions at full speed, half speed or stopped</td>
      </tr>
      <tr>
        <td><code>add_group_hunting</code></td>
        <td>Every animal's energy visible to others; catches as a contest between hunters and prey</td>
      </tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 3:</strong> The repository's modules, each adding one mechanism to the one before.</figcaption>
</figure>

### Movement energy

With speed actions, an animal can stop and wait, which made it natural to charge energy for movement. For animals on land, metabolic power rises roughly linearly with running speed (Taylor, Heglund and Maloiy, 1982), so the movement cost was made linear in speed, on top of a resting cost. The share of the cost paid for movement turned out to decide which species wins. A series of runs, each continuing the same trained policies, raised that share step by step: the more of the cost depended on movement, the more the predators gained, because they move slower than prey on average and wait at the grass, so the same behaviour simply became cheaper for them. Prey, which have to run to escape, saved little. Taylor, Heglund and Maloiy's measurements put the realistic share for a running animal at about 80–90% (running costs roughly 5 to 10 times as much as resting), far above the shares where the prey already collapsed. A realistic movement cost therefore only works together with other features of a realistic ecology, which the results below explore.

### Group hunting

In the group-hunting module, a predator that touches a prey attacks, and succeeds with probability

$$
P(\text{catch}) = \frac{S^\gamma}{S^\gamma + (w E)^\gamma}
$$

where $S$ is the summed energy of all predators near the prey, $E$ the prey's energy, $w$ the prey's strength and $\gamma$ the steepness: a contest success function (Tullock, 1980). A successful catch is shared equally among the hunters, and a failed attacker must wait before attacking the same prey again. Nothing forces cooperation: a lone predator can still catch, just less often. With $\gamma = 2$, teaming up pays against strong, well-fed prey and not against weak ones, so predators would have to learn when to hunt together.

## Results summary

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr>
        <th>Experiment</th>
        <th>Outcome after training</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Moving grass, predators blind to grass (3,000 iterations)</td>
        <td>Both species alive at the end in 8 of 20 episodes</td>
      </tr>
      <tr>
        <td>Predators see grass (4,000 iterations)</td>
        <td>10 of 20; catch risk 2.93 prey per prey per 1,000 steps</td>
      </tr>
      <tr>
        <td>Walls, speed-dependent movement cost (3,000)</td>
        <td>0 of 20; prey extinct, catch risk 8.13</td>
      </tr>
      <tr>
        <td>Walls, fixed cost (3,000)</td>
        <td>1 of 20; catch risk 5.62</td>
      </tr>
      <tr>
        <td>No walls, speed actions, fixed cost (3,000)</td>
        <td>11 of 20; catch risk 3.02</td>
      </tr>
      <tr>
        <td>The same, continued to 4,000</td>
        <td><strong>17 of 20</strong>; catch risk 2.57</td>
      </tr>
      <tr>
        <td>The same, continued to 4,000 with a gentle movement cost</td>
        <td>14 of 20; catch risk 2.76</td>
      </tr>
      <tr>
        <td>Every animal's energy visible (1,000)</td>
        <td>0 of 20; catch risk 7.51, against 4.84 without</td>
      </tr>
      <tr>
        <td>Group hunting, catch shared, half energy per catch (3,000)</td>
        <td>Predators extinct in 20 of 20; catch risk 0.68; predators best at iteration 1,500</td>
      </tr>
      <tr>
        <td>Group hunting, three quarters of the energy per catch (3,000)</td>
        <td>Prey extinct in 20 of 20; catch risk 5.29; 64% of catches made in groups</td>
      </tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 4:</strong> Outcome of each experiment's final check: 20 evaluation episodes of the final model; catch risk is prey caught per prey per 1,000 physics steps.</figcaption>
</figure>

Tournaments, in which every predator checkpoint plays every prey checkpoint, separate adaptation from chance: if newer prey are harder to catch for a fixed predator, the prey are adapting, and vice versa. Co-adaptation needs both shares clearly above 50%.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr>
        <th>Experiment</th>
        <th>Newer prey harder to catch</th>
        <th>Newer predators catch more</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Predators see grass (4,000 iterations)</td>
        <td>96%</td>
        <td>43%</td>
      </tr>
      <tr>
        <td>Walls, fixed cost (3,000)</td>
        <td>83%</td>
        <td>60%</td>
      </tr>
      <tr>
        <td>No walls, speed actions, fixed cost (3,000)</td>
        <td>89%</td>
        <td>55%</td>
      </tr>
      <tr>
        <td>Group hunting, iterations 300–1,800</td>
        <td>78%</td>
        <td><strong>88%</strong></td>
      </tr>
      <tr>
        <td>Group hunting, iterations 1,800–2,990</td>
        <td>48%</td>
        <td>30%</td>
      </tr>
      <tr>
        <td>Group hunting, three quarters energy, iterations 300–1,800</td>
        <td>73%</td>
        <td>74%</td>
      </tr>
      <tr>
        <td>Group hunting, three quarters energy, iterations 1,800–2,990</td>
        <td>54%</td>
        <td>48%</td>
      </tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 5:</strong> Share of tournament pairs in which the newer checkpoint does better against a fixed opponent; co-adaptation needs both clearly above 50%.</figcaption>
</figure>

### Did the predators learn to team up against strong prey?

Teaming up pays only against well-fed prey, so purposeful cooperation would show as more company at attacks on strong prey. Predators also gather near grass, where prey are well fed, so the same link can arise without cooperation. The trained group hunters (three quarters energy per catch) were therefore compared with a control: predators never trained with group hunting, played in the same world, 20 episodes each.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <colgroup>
      <col style={{ width: '52%' }} />
      <col style={{ width: '24%' }} />
      <col style={{ width: '24%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Attacks with a second predator within 64 units</th>
        <th>Trained group hunters</th>
        <th>Control</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>All attacks</td>
        <td><strong>49%</strong></td>
        <td>34%</td>
      </tr>
      <tr>
        <td>Against the weakest quarter of prey</td>
        <td>42%</td>
        <td>27%</td>
      </tr>
      <tr>
        <td>Against the best-fed quarter of prey</td>
        <td>56%</td>
        <td>42%</td>
      </tr>
      <tr>
        <td>Increase per unit of prey energy (log-odds)</td>
        <td>+0.14</td>
        <td>+0.15</td>
      </tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 6:</strong> Company at attacks by trained group hunters and by predators never trained with group hunting, in the same world, corrected for the number of living predators.</figcaption>
</figure>

Both groups attack well-fed prey with company more often, and by the same amount, so that link comes from where predators and well-fed prey meet. The trained predators have learned to hunt in company more often overall, by about 15 percentage points, but not selectively against the prey for which it pays.

### Realistic movement costs: ambush and spread-out food

With 75% of the cost from movement, predators stopped about half the time, mostly at the grass, and lunged at prey that came to eat: 87% of catches happened with the predator running, 70% near grass. Prey 10% or 20% faster than predators did not stop this. Spreading the same 100 grass patches over 20 small clusters instead of 5 large ones did, because predators can no longer wait at all the food. All runs below continue already trained policies for 1,000 iterations without walls: the first six from the healthiest earlier ecosystem, the last two, side by side, from the run with 75% and prey speed 6.0. Final checks use 50 episodes.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <colgroup>
      <col style={{ width: '22%' }} />
      <col style={{ width: '14%' }} />
      <col style={{ width: '20%' }} />
      <col style={{ width: '14%' }} />
      <col style={{ width: '15%' }} />
      <col style={{ width: '15%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Share of cost from movement</th>
        <th>Prey top speed</th>
        <th>Grass</th>
        <th>Both alive</th>
        <th>Prey extinct</th>
        <th>Predators extinct</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>0%</td><td>5</td><td>5 clusters</td><td>40 of 50</td><td>7</td><td>3</td></tr>
      <tr><td>10%</td><td>5</td><td>5 clusters</td><td>33 of 50</td><td>12</td><td>5</td></tr>
      <tr><td>25%</td><td>5</td><td>5 clusters</td><td>11 of 50</td><td>37</td><td>2</td></tr>
      <tr><td>50%</td><td>5</td><td>5 clusters</td><td>1 of 50</td><td>49</td><td>0</td></tr>
      <tr><td>25%</td><td>5.5</td><td>5 clusters</td><td>15 of 50</td><td>0</td><td>35</td></tr>
      <tr><td>75%</td><td>5.5</td><td>5 clusters</td><td>21 of 50</td><td>29</td><td>0</td></tr>
      <tr><td>75%</td><td>6.0</td><td>5 clusters</td><td>31 of 50</td><td>19</td><td>0</td></tr>
      <tr><td>75%</td><td>6.0</td><td><strong>20 clusters</strong></td><td><strong>43 of 50</strong></td><td>6</td><td>1</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 7:</strong> Final checks with 50 episodes as the movement cost, the prey's top speed (predators: 5) and the spread of the grass change; the last two rows differ only in the grass.</figcaption>
</figure>

Two repeats of the 20-cluster run, from the same start but with new training randomness, reproduced it closely: both species alive in 44 and 42 of 50 episodes, against 43 in the first run and 31 in the control; pooled 129 of 150 against 31 of 50, very unlikely by chance (p < 0.001). In all three, predators waited less and away from the grass, and both species improved against each other in the tournaments. Two further runs trained the same world from scratch, without any inherited policies, for 3,000 iterations: they reached the same state (both species alive in 37 and 41 of 50 episodes) with the same behaviour and the same pattern of mutual improvement followed by a plateau.

Continued for another 2,000 iterations, the world with spread-out grass gave the longest arms race in these experiments. A tournament over all 3,000 iterations shows both species improving against each other for about 2,000 iterations, the predators by about 70% in catch effectiveness and the prey by about 40% in escape, while each checkpoint against its training partner stayed level. After about 2,200 iterations neither side improved further.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr>
        <th>Checkpoints</th>
        <th>Newer prey harder to catch</th>
        <th>Newer predators catch more</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>200–800</td><td><strong>96%</strong></td><td><strong>79%</strong></td></tr>
      <tr><td>1,200–2,000</td><td><strong>70%</strong></td><td><strong>82%</strong></td></tr>
      <tr><td>2,200–2,990</td><td>36%</td><td>40%</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 8:</strong> Share of tournament pairs in which the newer checkpoint does better, in the world with a realistic movement cost, faster prey and spread-out grass, over 3,000 iterations of training; both species alive in 40 of 50 final-check episodes at the end.</figcaption>
</figure>

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/arms-race.png" alt="Display 9: Line chart over 3,000 training iterations: predators' catch risk against all prey rises from 2.1 to about 3.5, prey's catch risk against all predators falls from 4.4 to about 2.7, and each checkpoint against its own training partner stays around 3 to 4; after about 2,200 iterations all three level off" style={{ display: 'block', width: '100%', height: 'auto' }} />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 9:</strong> The arms race over 3,000 iterations: each checkpoint's predators against all prey (orange, rising as they get better at hunting), its prey against all predators (blue, falling as they get better at escaping), and the checkpoint against its own training partner (green, roughly flat: still evenly matched); shaded, the plateau after about 2,200 iterations.</figcaption>
</figure>

### The arms race in three more runs

To check whether this arms race belongs to the world or to one lucky training run, the same world was trained from scratch three more times, for at least 3,000 iterations each. These runs used a standalone version of the environment that reproduces the original decision for decision ([`base_environment_continuous`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/base_environment_continuous) in the PredPreyGrass repository). In each run, ten checkpoints (every 300 iterations up to 2,990) played against each other, 100 episodes per matchup with the same seeds: 30,000 episodes in all, ten times as many per matchup as the tournaments above.

The same directional pattern appeared in all three runs. Newer prey were harder for a fixed predator to catch in 90%, 96% and 69% of comparisons, and newer predators caught fixed prey better in 80%, 72% and 72%, all well above the 50% expected without a trend. With this larger test, late training (iterations 2,100–2,990) looks less flat than in Display 8: predators were still improving in all three runs, and prey in two. In the third run, the prey made most of their gain by iteration 600 and showed no clear improvement after that. Whether this difference comes from that run's training setup (twice as many parallel simulation workers) or is ordinary variation between runs cannot be told from three runs. Improvement against past opponents is what an arms race predicts, but on its own it does not show that each species' progress is driven by the other's.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/arms-race-three-runs.png" alt="Display 10: Top, three heatmaps of catch risk for every predator checkpoint against every prey checkpoint from iteration 300 to 2,990, one per run; in the first two, risk rises for newer predators and falls for newer prey, while in the third it changes little for prey after iteration 600. Bottom, improvement shares with 95% intervals for prey and predators in each run, all above 50% over all checkpoints; in late training, one run's prey interval includes 50%" style={{ display: 'block', width: '100%', height: 'auto' }} />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 10:</strong> The arms race in three runs trained from scratch (BE-01, BE-02, BE-03). Top: catch risk (prey caught per prey alive per 1,000 physics steps) of every predator checkpoint against every prey checkpoint; darker downwards means newer predators catch more, lighter to the right means newer prey escape more. Bottom: share of comparisons in which the newer checkpoint does better against a fixed opponent, with paired-seed bootstrap 95% intervals; the dashed line marks 50%, no trend. The intervals describe each run, not the variation between runs.</figcaption>
</figure>

### Without the simulation's quirks

The environment reproduces the original Aquarium-based simulation exactly, including eight implementation quirks that are not meant as rules of the world. The most consequential: animals move one after another, so later ones react to positions already updated in the same step; a prey bumping into another prey cannot steer during that step, while predators can; only the first animal touched counts in a crowd; and a stopping animal's view cone swings to an arbitrary direction. Each quirk can now be switched off. Two further runs (BE-04 and BE-05) trained the same world from scratch with all of them fixed, in the same way as BE-01 and BE-02.

The arms race remained: over all checkpoints, newer prey evaded fixed predators better in 84% and 97% of comparisons and newer predators caught fixed prey better in 83% in both runs. Late in training, BE-05 still improved strongly in both species, while BE-04 was the only one of the five runs in which neither species clearly did. The balance of the ecosystem shifted towards the prey: in the final checks, predators caught about half as often (catch risk 1.7–1.9 against 3.2–3.7), prey were almost twice as numerous (27–29 against 15–17), and both species survived the full episode in 93 of 100 episodes against 115 of 150 in the three earlier runs. Predators occasionally died out (5 of 100 episodes, never before), while their behaviour hardly changed: they still stopped about half the time and waited near grass as often.

These runs were also trained with a different software version and setup than BE-01 and BE-02, and two runs per world are few, so whether the quirks cause this shift, and which one, is not yet established. Switching the quirks off one at a time, under otherwise identical training, can settle it.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/arms-race-quirks-fixed.png" alt="Display 11: Top, five heatmaps of catch risk for every predator checkpoint against every prey checkpoint, three runs in the exact environment and two with every quirk fixed; the two fixed runs are lighter overall, meaning lower catch risk. Bottom, improvement shares with 95% intervals for prey and predators in each of the five runs; over all checkpoints all lie well above 50%, in late training BE-04's intervals for both species reach below 50% while BE-05's lie well above it" style={{ display: 'block', width: '100%', height: 'auto' }} />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 11:</strong> The arms race with and without the simulation's quirks: three runs in the exact environment (BE-01 to BE-03) and two with every quirk fixed (BE-04, BE-05), each trained from scratch. Top: catch risk of every predator checkpoint against every prey checkpoint, on a common scale. Bottom: share of comparisons in which the newer checkpoint does better against a fixed opponent, with paired-seed bootstrap 95% intervals; the dashed line marks 50%, no trend.</figcaption>
</figure>

## Population dynamics within an episode

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/predator-prey-single-step.png" alt="Display 12: Exact predator and prey counts over 8,002 simulation steps, with predators ranging from 2 to 12 on the orange left axis and prey from 1 to 46 on the blue right axis" style={{ display: 'block', width: '100%', height: 'auto' }} />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 12:</strong> A new evaluation rollout of the add_reproduction run of 7 October 2026 at 09:38, checkpoint 990, seed 0. Counts include the initial state and every subsequent physics step, without averaging. Predators use the orange left axis; prey use the blue right axis. The scales differ, so line heights and crossings do not indicate equal populations.</figcaption>
</figure>

The populations show irregular predator–prey oscillations resembling a
Lotka–Volterra pattern: prey can grow when food is available and predator
numbers are low, while predator growth follows successful feeding. Near the
end of this episode, prey peak around step 7,000 and predators around step
7,500. Grass availability, energy reserves, starvation and threshold-based
reproduction modify the feedback; this single rollout does not establish a
classical Lotka–Volterra cycle.

Prey turn over much faster than predators. The saved first evaluation episode
for this checkpoint recorded 458 prey births and 449 catches, compared with
36 predator births and 35 predator starvation deaths. Prey feed directly on
grass; predators receive 50% of a caught prey's energy and reproduce at an
energy threshold of 12, versus 8 for prey. Energy reserves delay predator
starvation after prey decline. Predator counts therefore change less often,
even while individual predators are replaced. They still range from 2 to 12
in the plotted rollout, compared with 1 to 46 prey: a sixfold predator change,
so their smaller absolute swings should not be mistaken for constant numbers.

## Summary

**The prey were always the faster learners, until the ecology changed.** In the first worlds, prey kept refining their escape for thousands of iterations, while predators settled at the catch rate that just pays for their metabolism. More predator information (grass, the energy of others) or harder prey (faster prey, walls) shifted where that plateau lay, but did not give predators anything to keep improving.

**The ecology decides more than the learning does.** Whether the two species keep improving against each other was set mainly by the energy economics and the layout of the food. A movement cost favours the slower species: predators that wait at the grass pay less, starve less and wipe out the prey. Where food is concentrated in a few places, waiting there is enough; where it is spread out, predators have to hunt.

**A realistic combination produced the longest arms race.** Realistic movement costs, food spread over the landscape and prey a little faster than their predators together gave the healthiest and most dynamic ecosystem: both species improved against each other for about 2,000 iterations while staying evenly matched, the Red Queen pattern, before levelling off. This mirrors ecology, where ambush predators thrive at waterholes and much less in open grazing land.

**Group hunting gives predators a skill that can grow, for a while.** When a catch depends on how much strength predators bring together, a single lunge is no longer enough, and predators did learn to attack together, but in general rather than specifically against the strong prey for which it pays; how much energy a catch yields decided whether predators boomed, collapsed or reached a standoff.

**Open questions.** Most results come from a single training run. The central one is the exception: the world with realistic movement costs, faster prey and spread-out food gave the same healthy state in five runs, three from the same starting point and two trained from scratch, each with both species improving against each other before levelling off. In the first run the best race levelled off after about 2,200 iterations, but in a larger test of three further runs predators were still improving at 3,000 iterations in all three and prey in two, so whether and when it levels off is not settled. If it does: memory, cooperation among prey, or persistence hunting, in which predators wear prey down over long chases, are candidates for keeping it going.

## References

- Kölle, M., Erpelding, Y., Ritz, F., Phan, T., Illium, S., & Linnhoff-Popien, C. (2024). *Aquarium: A comprehensive framework for exploring predator-prey dynamics through multi-agent reinforcement learning algorithms*. arXiv:2401.07056. https://arxiv.org/abs/2401.07056
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- Taylor, C. R., Heglund, N. C., & Maloiy, G. M. O. (1982). *Energetics and mechanics of terrestrial locomotion. I. Metabolic energy consumption as a function of speed and body size in birds and mammals*. *Journal of Experimental Biology*, 97, 1–21. https://doi.org/10.1242/jeb.97.1.1
- Tullock, G. (1980). *Efficient rent seeking*. In J. M. Buchanan, R. D. Tollison, & G. Tullock (Eds.), *Toward a theory of the rent-seeking society* (pp. 97–112). Texas A&M University Press.
- doesburg11. *PredPreyGrassContinuous* (code and experiment logs). GitHub. https://github.com/doesburg11/PredPreyGrassContinuous
