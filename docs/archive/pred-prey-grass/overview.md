---
id: overview-ppg
title: Predator-Prey-Grass Project
sidebar_position: 1
---

The **Predator-Prey-Grass project**([PredPreyGrass](https://github.com/doesburg11/PredPreyGrass)) aims to investigate behavior of multiple agents in a simple closed grid world. Although only partially applicable to modern humans, this could shed light to ancestral human behavior. In the hunter-gatherer period of Homo Sapiens, until roughly 10,000 years ago a common setting, humans could be as well be predators as prey. Moreover, the limited availability of grass could be regarded as a proxy for the limited resources for humans down the food chain.

To implement this, a [multi-agent reinforcement learning (MARL)](https://en.wikipedia.org/wiki/Multi-agent_reinforcement_learning) environment is trained using a [Proximal Policy Optimization (PPO)](https://en.wikipedia.org/wiki/Proximal_policy_optimization). Learning agents Predators (red) and Prey (blue) both expend energy moving around, and replenish it by eating. Prey eat Grass (green), and Predators eat Prey if they end up on the same grid cell. In the base case for simplicity, the agents obtain all energy from the eaten Prey of Grass. However, in reality this is much less because the [ecological efficiency](https://en.wikipedia.org/wiki/Ecological_efficiency) is only around 10% in most cases, and certainly not 100%.

Predators die of starvation when their energy is zero, Prey die either of starvation or when being eaten by a Predator. The agents asexually reproduce when energy levels of learning agents rise above a certain threshold by eating. Learning agents, learn to execute movement actions based on their partial observations of the environment to maximize cumulative reward.


<figure style={{ textAlign: 'center' }}>
  <video controls style={{ width: '100%', height: 'auto' }}>
    <source src="/videos/predpreygrass.mp4" type="video/mp4" />
    Your browser does not support the video tag.
    <figcaption><strong>Display 1:</strong> Behavior visibility</figcaption>
  </video>
  <figcaption><strong>Display 1:</strong> A trained Predator, Prey, Grass environment</figcaption>
</figure>


## Features of the [base environment](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/base_environment)

* At startup Predator, Prey and Grass are randomly positioned on the gridworld.

* Predators and Prey are independently (decentralized) trained via their respective [RLlib policy module](https://docs.ray.io/en/master/rllib/rl-modules.html).:

  * **Predators** (red)
  * **Prey** (blue)

* **Energy-Based Life Cycle**: Movement, hunting, and grazing consume energy—agents must act to balance survival, reproduction, and exploration.

  * Predator and Prey **learn movement strategies** based on their **partial observations**.
  * Both expend **energy** as they move around the grid and **replenish energy by eating**:

    * **Prey** eat **Grass** (green) by moving onto a grass-occupied cell.
    * **Predators** eat **Prey** by moving onto the same grid cell.

  * **Survival conditions**:

    * Both Predator and Prey must act to prevent starvation (when energy runs out).
    * Prey must act to prevent being eaten by a Predator

  * **Reproduction conditions**:

      * Both Predators and Prey reproduce **asexually** when their energy exceeds a threshold.
      * New agents are spawned near their parent.
- **Sparse rewards**: agents only receive a reward when reproducing in the base configuration. However, this can be expanded with other rewards in the [environment configuration](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/base_environment/config_env.py). The sparse rewards configuration is to show that the ecological system is able to sustain with this minimalstic optimized incentive for both Predators and Prey.

* Grass gradually regenerates at the same spot after being eaten by Prey. Grass, as a non-learning agent, is being regarded by the model as part of the environment, not as an actor.
