---
id: predpreygrass-continuous
title: PredPreyGrassContinuous
sidebar_position: 4
slug: /learning-selection-interaction/predpreygrass-continuous
---

# PredPreyGrassContinuous

A continuous-space counterpart of [PredPreyGrass](/learning-selection-interaction/predpreygrass): the same predator–prey–grass ecosystem, with energy, reproduction and a sparse reward for births, rebuilt in an arena where animals move with physics instead of hopping between grid cells. The code is in the [PredPreyGrassContinuous repository](https://github.com/doesburg11/PredPreyGrassContinuous), and every training run is recorded in its experiment logs.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-continuous/snapshot-add-walls.png" alt="Display 1: An 800 by 800 arena with square wall blocks, grass patches, predators drawn as hunters and prey drawn as antelopes; a blue view cone of one predator and a grey view cone of one prey are cut off where walls block the view" width="560" />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Trained predators (hunters) and prey (antelopes) among walls and grass; the shaded cones show what one predator (blue) and one prey (grey) can see, cut off where walls block the view.</figcaption>
</figure>

## Key findings

- In every tournament of the first ecosystems (static grass, moving grass, predators seeing grass), prey kept adapting for thousands of iterations while predators stopped improving after a few hundred: newer prey were harder to catch in 96–98% of pairs, newer predators caught more in only 32–55%.
- The predators' plateau sat at energy break-even, about 8 catches per predator per 1,000 physics steps, in every run and with scripted pursuit strategies alike.
- Letting predators see grass, as they can in PredPreyGrass, raised their catch rate by 34% against the same prey, but only once: they reached the new ceiling within 400 iterations, and the prey caught up.
- An energy cost that grows with speed, natural on paper, let predators wait almost for free and wiped out the prey; with a fixed cost per step, the same world gave the healthiest ecosystem so far, with both species alive at the end of 11 of 20 episodes.
- Making a catch a contest between the summed energy of nearby predators and the prey's energy produced, for the first time, both species improving through the second half of training (82% and 72% of tournament pairs), with predators as the struggling species.

## From grid to continuous space

The environment is built on [Aquarium](https://github.com/michaelkoelle/marl-aquarium), a physics-based predator–prey environment, and trained with [Proximal Policy Optimization (PPO)](https://en.wikipedia.org/wiki/Proximal_policy_optimization), one shared policy per species, using RLlib. Animals have position, velocity and limited acceleration and turning; a predator catches a prey when their bodies touch. Each animal sees through a view cone (predators 150°, prey 240°) and observes the nearest animals and grass patch in it, relative to itself.

The PredPreyGrass rules are carried over as directly as the change of space allows:

| PredPreyGrass (grid) | PredPreyGrassContinuous |
|---|---|
| 25 × 25 grid, one cell per step | 800 × 800 arena; one grid cell ≈ 32 units ≈ 8 physics steps |
| 1,000-step episodes | 8,000 physics steps; one decision lasts 8 physics steps |
| Energy decay, gain from grass and prey | The same energy units, per-step rates divided by 8 |
| Reproduction at an energy threshold | The same thresholds; the offspring is paid from the parent's energy |
| Reward only for reproducing (+10) | The same sparse reward |
| Grass regrows in place | Grass grows in clusters that drift by seed dispersal and die back when overgrazed |

## Extensions, step by step

The repository adds one mechanism at a time, each in its own module, so every change can be compared with the world before it:

| Module | Adds |
|---|---|
| `add_grass` | Grass patches that prey eat and that regrow |
| `add_energy` | Metabolic energy, food, starvation |
| `add_reproduction` | Births at an energy threshold, the +10 birth reward, moving grass clusters, predators that see grass |
| `add_walls` | Walls that block movement and sight; actions at full speed, half speed or stopped |
| `add_group_hunting` | Every animal's energy visible to others; catches as a contest between hunters and prey |

### Movement energy

With speed actions, an animal can stop and wait, which made it natural to charge energy for movement. For animals on land, metabolic power rises roughly linearly with running speed (Taylor, Heglund and Maloiy, 1982), so the movement cost was made linear in speed, on top of a resting cost. This turned out to favour the predators decisively: a waiting predator paid only half the old cost, starved far less, and the prey died out every time. With a fixed cost per step, as in PredPreyGrass, predators starve unless they hunt, which keeps their numbers in check.

### Group hunting

In the group-hunting module, a predator that touches a prey attacks, and succeeds with probability

$$
P(\text{catch}) = \frac{S^\gamma}{S^\gamma + (w E)^\gamma}
$$

where $S$ is the summed energy of all predators near the prey, $E$ the prey's energy, $w$ the prey's strength and $\gamma$ the steepness: a contest success function (Tullock, 1980). A successful catch is shared equally among the hunters, and a failed attacker must wait before attacking the same prey again. Nothing forces cooperation: a lone predator can still catch, just less often. With $\gamma = 2$, teaming up pays against strong, well-fed prey and not against weak ones, so predators would have to learn when to hunt together.

## Results summary

| Experiment | Outcome after training |
|---|---|
| Moving grass, predators blind to grass (3,000 iterations) | Both species alive at the end in 8 of 20 episodes |
| Predators see grass (4,000 iterations) | 10 of 20; catch risk 2.93 prey per prey per 1,000 steps |
| Walls, speed-dependent movement cost (3,000) | 0 of 20; prey extinct, catch risk 8.13 |
| Walls, fixed cost (3,000) | 1 of 20; catch risk 5.62 |
| No walls, speed actions, fixed cost (3,000) | **11 of 20**; catch risk 3.02 |
| Every animal's energy visible (1,000) | 0 of 20; catch risk 7.51, against 4.84 without |
| Group hunting, catch shared, half energy per catch (first 1,000 of 3,000) | Predators extinct in 20 of 20; catch risk 0.82; both species still improving |

Tournaments, in which every predator checkpoint plays every prey checkpoint, separate adaptation from chance: if newer prey are harder to catch for a fixed predator, the prey are adapting, and vice versa. Co-adaptation needs both shares clearly above 50%.

| Experiment | Newer prey harder to catch | Newer predators catch more |
|---|---:|---:|
| Predators see grass (4,000 iterations) | 96% | 43% |
| Walls, fixed cost (3,000) | 83% | 60% |
| No walls, speed actions, fixed cost (3,000) | 89% | 55% |
| Group hunting, second half of the first 1,000 iterations | 72% | **82%** |

## Summary

**The prey were always the faster learners.** In every world without group hunting, prey kept refining their escape for thousands of iterations, while predators settled at the catch rate that just pays for their metabolism. More predator information (grass, the energy of others) or more prey difficulty (faster prey, walls) shifted where that plateau lay, but did not give predators anything to keep improving.

**Small rule changes move the balance more than learning does.** A movement cost that grows with speed, physically reasonable on its own, made waiting nearly free and tipped every run towards prey extinction; the same world with a fixed cost gave the healthiest ecosystem. Which species wins is set first by the energy economics, and only then by what the policies learn.

**Group hunting gives predators a skill that can grow.** When a catch depends on how much strength predators bring together, a single lunge is no longer enough, and the predators' catch rate kept rising through training while the prey also improved: the first sign of an arms race in these experiments. In the most recent run the predators are still too weak to survive, and they mostly hunt alone; whether they come to hunt together as they grow stronger is the open question.

## References

- Kölle, M., Erpelding, Y., Ritz, F., Phan, T., Illium, S., & Linnhoff-Popien, C. (2024). *Aquarium: A comprehensive framework for exploring predator-prey dynamics through multi-agent reinforcement learning algorithms*. arXiv:2401.07056. https://arxiv.org/abs/2401.07056
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A., & Klimov, O. (2017). *Proximal policy optimization algorithms*. arXiv:1707.06347. https://arxiv.org/abs/1707.06347
- Taylor, C. R., Heglund, N. C., & Maloiy, G. M. O. (1982). *Energetics and mechanics of terrestrial locomotion. I. Metabolic energy consumption as a function of speed and body size in birds and mammals*. *Journal of Experimental Biology*, 97, 1–21. https://doi.org/10.1242/jeb.97.1.1
- Tullock, G. (1980). *Efficient rent seeking*. In J. M. Buchanan, R. D. Tollison, & G. Tullock (Eds.), *Toward a theory of the rent-seeking society* (pp. 97–112). Texas A&M University Press.
- doesburg11. *PredPreyGrassContinuous* (code and experiment logs). GitHub. https://github.com/doesburg11/PredPreyGrassContinuous
