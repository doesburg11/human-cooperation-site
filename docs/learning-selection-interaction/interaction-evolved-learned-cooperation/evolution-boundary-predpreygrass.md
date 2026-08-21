---
id: evolution-boundary-predpreygrass
title: What Counts as Evolution in PredPreyGrass?
sidebar_position: 4
slug: /learning-selection-interaction/evolution-boundary-predpreygrass
---

# What Counts as Evolution in PredPreyGrass?

Populations can change over time for more than one reason, and it matters which one is doing the work. This page draws a precise line between three kinds of change that can look similar from the outside — ecological population dynamics, within-lifetime learning, and true Darwinian selection — and uses it to say exactly what each PredPreyGrass variant implements.

## Three axes of Darwinian selection

Darwinian evolution is not one thing. It can act on three distinct kinds of heritable variation, each answering a different question:

- **Morphological (physiological) evolution** asks *what is this organism?* — heritable variation in body-defining traits: how costly it is to exist and act, how far it can sense, what it can physically do.
- **Behavioral evolution** asks *given the same body, what does it choose to do?* — heritable variation in strategy, holding morphology constant.
- **Life-history evolution** asks *when should this organism spend its resources?* — heritable variation in the timing of survival, growth, and reproduction, usually expressed as parameters rather than moment-to-moment decisions.

A crucial distinction cuts across all three: **learning modifies behavior within a lifetime; evolution modifies which variants are inherited.** Learning alone is not evolution unless the resulting variation is itself heritable.

### The same variable can belong to different axes

Energy-related parameters are a useful test case, because the same kind of variable can fall on either side depending on what role it plays. A parameter that sets the ongoing cost of existing or acting — how much energy an agent burns just by being alive each step — is morphological: it describes the physiology of the body. A parameter that gates *when* reproduction happens — an energy threshold that must be crossed before an agent can reproduce — is life-history: it regulates timing and allocation, not the cost of existing. In PredPreyGrass's [base environment](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/base_environment), `energy_loss_per_step_predator` and `energy_loss_per_step_prey` are morphological in this sense, while `predator_creation_energy_threshold` and `prey_creation_energy_threshold` are life-history (values current at time of writing — check [`config_env.py`](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/base_environment/config_env.py) for the current numbers). Notably, reproduction in the base environment is a pure energy-threshold rule with no separate cooldown timer and no aging mechanic — an agent can reproduce again as soon as it re-crosses the threshold.

## What each PredPreyGrass variant actually implements

Applying these axes to the codebase gives three clearly different tiers, corresponding to three families of experiment already on this site:

**The plain [base environment](/learning-selection-interaction/predpreygrass) implements ecology with learning, and nothing more.** Predators and prey die (by starvation or predation) and reproduce, producing genuine demographic selection — not every agent survives, not every agent reproduces, population composition changes over time. But every parameter is fixed and shared across the whole species: nothing varies between individual predators, so there is no heritable variation for selection to act on beyond who simply survives. Behavioral adaptation happens entirely through PPO updating a shared policy; offspring immediately use whatever the current shared policy is. Strategy changes because it is learned, not because it is inherited — no strategy can go extinct as a strategy, because there is no space of competing strategies to begin with.

**The `eco_evolutionary` family adds morphological evolution on top of that.** As described on [the PredPreyGrass page](/learning-selection-interaction/predpreygrass), a speed genome becomes a heritable, mutating body parameter: offspring inherit a mutated version of their parent's speed value. That is real morphological selection — different bodies with different movement costs compete, and speed values that work well become more common. The learned policy, however, is still shared and PPO-updated across the whole species, exactly as in the base environment. So this tier is ecology, plus learning, plus morphological evolution — but still not what the next section calls behavioral evolution, because the *policy* itself is not what's being inherited or selected between.

An earlier, simpler module (a discrete two-class version — agents were either a "slow" type, moving within a 9-position Moore neighborhood, or a "fast" type, moving within an extended 25-position range, with a 5% chance of switching class on reproduction) produced a clean empirical example of what morphological selection looks like in practice, before the current continuous speed genome superseded it.

<figure style={{ textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/mutating-agents/action-spaces.png" alt="Display 1: Comparison of the movement range available to a slow agent (9-position Moore neighborhood) and a fast agent (25-position extended Moore neighborhood)" width="600" />
  <figcaption><strong>Display 1:</strong> Movement range available to a "slow" versus a "fast" agent in the discrete two-class predecessor to the current speed genome.</figcaption>
</figure>

Starting from an all-slow population, both predators and prey drifted toward the fast phenotype through mutation and differential reproductive success alone — no reward was ever given for speed itself, only for reproducing. Prey shifted first; predators followed once fast prey had become common enough to make chasing them with a slow body unproductive:

<figure style={{ textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/mutating-agents/red-queen-population-shift.png" alt="Display 2: Percentage of high-speed agents over training steps, showing prey (blue) shifting to the fast phenotype starting around step 50 and reaching near 100%, followed by predators (red) beginning their shift around step 300 and catching up by step 800" width="600" />
  <figcaption><strong>Display 2:</strong> Share of high-speed agents over training steps: prey shift first, predators follow — a Red Queen dynamic in which each side is adapting to keep up with the other, not to get ahead in absolute terms (Van Valen, 1973).</figcaption>
</figure>

**Crossing into true behavioral (policy) evolution requires something further.** The [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log) documents this distinction empirically, without originally framing it this way: ten trials (1-10) under the shared-policy architecture came back null or inconclusive on selection-driven drift, across six differently-mechanised heritable traits and two full statistical replications. Trial 12 changed one thing — giving each agent its own genome-initialized network instead of a policy shared across the species — and produced the track's first statistically decisive positive result (p < 0.00001 against every degraded condition). In the terms of this page, Trials 1-10 never left the "ecology + learning + morphological evolution" tier, no matter which trait was varied, because the policy itself stayed shared. Trial 12 crossed into genuine behavioral evolution: policy identity became heritable, and differential reproduction could change which policy variants persisted.

## A litmus test

One question distinguishes ecology-with-learning from genuine behavioral evolution, regardless of which specific traits or mechanisms are involved:

> Can two agents with the same body but different policies compete, reproduce, and change their relative frequencies over time?

If no, the system has ecology and possibly learning and morphological evolution, but not behavioral evolution — strategy changes because agents learn, not because better strategies out-reproduce worse ones. If yes, the system crosses into the territory that genetic algorithms and Population-Based Training occupy by design: selection acting directly on strategies, not just on the bodies that carry them. Mutation is not required to cross this boundary — heritable variation and differential reproduction are sufficient on their own.

None of this is a criticism of the base environment or the `eco_evolutionary` family — they implement real, non-trivial forms of selection, just not all three kinds at once. The value of drawing the line precisely is that it explains, in advance, why a shared-policy architecture structurally cannot show a behavioral-evolution signal no matter how the trait is designed — and why Trial 12 needed to change the architecture, not just try an eleventh trait.

---

## References

- Van Valen, L. (1973). *A new evolutionary law*. *Evolutionary Theory*, 1, 1-30.
