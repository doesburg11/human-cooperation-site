---
id: pbt-implementation
title: Implementation
---

# Population Based Training (PBT) with the Pred-Prey-Grass Environment

This experiment uses **Population Based Training (PBT)** to explore adaptive learning dynamics in a multi-agent Predator-Prey-Grass simulation. The goal is not to converge to a single optimal policy, but to allow diverse agent types to co-evolve and adapt their hyperparameters over time in response to a dynamic environment and each other.

## 🌱 Environment: PredPreyGrass

The environment simulates interactions between:
- **Predators** of different movement speeds
- **Prey** of different movement speeds
- **Grass** as a renewable resource

Each agent group has its own policy and configuration, allowing asymmetric capabilities and behaviors. The environment is designed to support evolutionary dynamics like:
- Arms races (e.g., faster prey vs. faster predators)
- Emergent survival strategies
- Shifting population balances

## 🧪 Why Population Based Training?

Traditional RL fine-tunes a single agent or population using fixed hyperparameters. PBT offers a more dynamic and biologically inspired alternative:
- **Exploration:** Each trial (i.e., agent population) begins with slightly different hyperparameters.
- **Selection:** Periodically, poorly performing trials are **replaced (cloned)** by better-performing ones.
- **Mutation:** Cloned trials mutate their hyperparameters to explore new niches.

This encourages continual adaptation, mimicking **natural selection and evolution**.

## ⚙️ Technical Setup

- **Framework:** Ray Tune + RLlib (new API stack)
- **Algorithm:** Proximal Policy Optimization (PPO)
- **Resource Scaling:** Automatically adapts to 8 CPU or 32 CPU / 1 GPU setups
- **Parallel Trials:** 6 PBT trials run concurrently on available hardware
- **Hyperparameters Mutated:**
  - Learning rate
  - Entropy coefficient
  - Minibatch size
  - Epoch count
  - Train batch size per learner

## 📈 Metrics and Checkpoints

Each trial is evaluated on:
- `env_runners/episode_return_mean`
- Cloning is triggered every `perturbation_interval = 3` iterations
- Frequent checkpoints are saved to enable cloning

## 🧭 Experiment Goals

This experiment is part of a broader investigation into:
- **Open-ended evolution** of agent behaviors
- **Emergent adaptation** in multi-agent ecosystems
- Identifying **conditions under which diversity persists** rather than collapsing into a single dominant strategy

Ultimately, this setup provides a testbed for studying **co-evolutionary learning** and the spontaneous emergence of complex dynamics under competitive and cooperative pressures.

---



## References

- [Implementation PredPreyGrass experiment on GitHub (2025)](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/hyper_parameter_tuning/tune_population_based_training.py)
