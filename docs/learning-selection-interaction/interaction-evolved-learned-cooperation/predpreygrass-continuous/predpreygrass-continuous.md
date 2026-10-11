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
- An energy cost that grows with speed, natural on paper, let predators wait almost for free and wiped out the prey; with a fixed cost per step, the same world gave the healthiest ecosystem so far, with both species alive at the end of 11 of 20 episodes after 3,000 iterations and 14–17 of 20 after 4,000. A gentle movement cost, making standing still 10% cheaper instead of 50%, changed nothing.
- Making a catch a contest between the summed energy of nearby predators and the prey's energy produced the first arms race: over 1,500 iterations newer predators beat older ones in 88% of tournament pairs and newer prey in 78%. It did not last: the predators, now the struggling species, then degraded (30%), although they attacked together more and more often (20% of attacks, against 7% by chance). With a little more energy per catch, the predators stayed viable and made 64% of their catches in groups, but both species stopped improving after about 1,800 iterations.

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

With speed actions, an animal can stop and wait, which made it natural to charge energy for movement. For animals on land, metabolic power rises roughly linearly with running speed (Taylor, Heglund and Maloiy, 1982), so the movement cost was made linear in speed, on top of a resting cost. This turned out to favour the predators decisively: a waiting predator paid only half the old cost, starved far less, and the prey died out every time. With a fixed cost per step, as in PredPreyGrass, predators starve unless they hunt, which keeps their numbers in check. A gentle version, in which standing still saves only 10%, left the ecosystem unchanged against a control run started from the same trained policies, and is now the default.

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

## Summary

**The prey were always the faster learners.** In every world without group hunting, prey kept refining their escape for thousands of iterations, while predators settled at the catch rate that just pays for their metabolism. More predator information (grass, the energy of others) or more prey difficulty (faster prey, walls) shifted where that plateau lay, but did not give predators anything to keep improving.

**Small rule changes move the balance more than learning does.** A movement cost that grows with speed, physically reasonable on its own, made waiting nearly free and tipped every run towards prey extinction; the same world with a fixed cost gave the healthiest ecosystem, and a much gentler movement cost kept it healthy. Which species wins is set first by the energy economics, and only then by what the policies learn.

**Group hunting gives predators a skill that can grow, for a while.** When a catch depends on how much strength predators bring together, a single lunge is no longer enough. For 1,500 iterations the predators' catch rate rose while the prey also improved: the first arms race in these experiments. Then the predators, too weak to survive, degraded: their policy became more random again as their births, the only reward, grew rarer, even as they attacked together more and more often. With a little more energy per catch the predators stayed viable and most of their catches became group catches, but the race settled into a stable standoff after about 1,800 iterations. Turning group hunting into a lasting arms race is the open question.

## References

- Kölle, M., Erpelding, Y., Ritz, F., Phan, T., Illium, S., & Linnhoff-Popien, C. (2024). *Aquarium: A comprehensive framework for exploring predator-prey dynamics through multi-agent reinforcement learning algorithms*. arXiv:2401.07056. https://arxiv.org/abs/2401.07056
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- Taylor, C. R., Heglund, N. C., & Maloiy, G. M. O. (1982). *Energetics and mechanics of terrestrial locomotion. I. Metabolic energy consumption as a function of speed and body size in birds and mammals*. *Journal of Experimental Biology*, 97, 1–21. https://doi.org/10.1242/jeb.97.1.1
- Tullock, G. (1980). *Efficient rent seeking*. In J. M. Buchanan, R. D. Tollison, & G. Tullock (Eds.), *Toward a theory of the rent-seeking society* (pp. 97–112). Texas A&M University Press.
- doesburg11. *PredPreyGrassContinuous* (code and experiment logs). GitHub. https://github.com/doesburg11/PredPreyGrassContinuous
