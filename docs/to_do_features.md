---
id: to_do features
title: To do features
sidebar_position: 100
---
## PredPreyGrass observation-space improvements

Investigate whether agents need **derived internal-state and ecological-context features** in addition to the current raw observations.

Current setup:

```text
local grid + own/other energy → movement
```

Agents currently have to learn by trial and error that:

```text
energy < starvation threshold → danger
energy > reproduction threshold → reproduction opportunity
nearby allies + combined energy → possible group kill
nearby prey → chase value
grass density direction → foraging opportunity
enemy pressure direction → escape/flee pressure
```

Possible improvement:

```text
local grid + raw energy + derived drives/context → movement
```

Start with minimal biologically plausible derived features:

```text
hunger_pressure
reproductive_readiness
danger_pressure
social_pressure / isolation
```

Avoid adding overly engineered features too early, such as:

```text
can_kill_this_prey = true
best_escape_direction = north
best_grass_direction = east
```

Reason:

```text
Raw observation:
    more open-ended, less biased, harder to learn

Derived internal drives:
    more sample-efficient, biologically plausible, still not too hand-designed

Detailed affordances:
    faster learning perhaps, but more assumptions injected
```

Suggested experiment order:

```text
1. Baseline:
   local grid + energy → movement

2. Drive-conditioned version:
   local grid + energy + hunger/reproduction/danger/social pressure → movement

3. Optional later:
   add ecological affordance features such as kill feasibility, grass gradient, escape availability

4. Compare:
   episode_len_mean
   all-types-survive-to-horizon rate
   predator/prey extinction timing
   birth/death rates
   group-hunt events
   population stability
   lineage persistence
```

Main principle:

```text
Keep the action space movement-only.
Make behavior richer by improving what the agent observes,
not by adding explicit actions like eat, reproduce, or attack.
```

Yes — this can be **very useful** for your Darwinian/Baldwinian two-timescale approach.

The key idea is:

```text id="1cmlo4"
Fast timescale / Nurture:
    agents learn movement behavior during their lifetime

Slow timescale / Nature:
    evolution selects the inherited structures that make learning easier or more adaptive
```

Derived observation features such as:

```text id="7l7ac0"
hunger_pressure
reproductive_readiness
danger_pressure
social_pressure
ally_support
local_food_density
```

can become part of the **evolvable interface** between biology and learning.

## Why this fits the Baldwinian idea

The Baldwin effect is about how **learning within a lifetime can influence evolutionary selection**. In computational terms: agents learn during evaluation, but what gets selected is not necessarily the learned behavior itself; rather, selection favors inherited traits that make useful learning easier. Reviews of the Baldwin effect describe this as adaptive learning affecting the direction or speed of evolution, although the exact effect can be accelerating or constraining depending on the setup. ([PMC][1])

For PredPreyGrass, that maps very nicely:

```text id="b2lhs4"
Inherited/evolved:
    observation structure
    drive thresholds
    hunger sensitivity
    danger sensitivity
    social sensitivity
    reproduction threshold interpretation
    initial policy biases / architecture

Learned during lifetime:
    actual movement policy
    when to approach prey
    when to avoid danger
    when to stay near allies
    when to forage
```

So your agents would not inherit “hunt this way” directly. Instead, they may inherit a better **learning scaffold**.

Example:

```text id="dhj7ti"
Lineage A:
    sees only raw energy

Lineage B:
    sees hunger_pressure and danger_pressure

Lineage C:
    sees hunger_pressure, danger_pressure, and social_pressure
```

Then PPO learning happens inside each lineage. If Lineage C learns stable pack hunting and population survival faster, evolution may select Lineage C. That is very Baldwinian.

## The clean two-timescale architecture

You can frame it like this:

```text id="x7samg"
Outer loop: Darwinian / Baldwinian selection
    mutate inherited traits
    train each variant for some number of PPO iterations
    evaluate survival/reproduction/cooperation/population stability
    keep successful variants

Inner loop: reinforcement learning
    given inherited observation structure and drive parameters
    learn movement-only behavior
```

So the inner loop remains:

```text id="4yx6ic"
observation → movement
```

but the outer loop evolves what kind of observation/drive system the agent is born with.

## What exactly can evolve?

You do not have to evolve only neural network weights. You can evolve the **biological interpretation layer**.

For example:

```text id="hclalv"
hunger_threshold
danger_radius
social_radius
grass_density_radius
reproduction_pressure_scaling
enemy_pressure_scaling
ally_pressure_scaling
whether a drive channel is enabled or disabled
observation range
movement speed variant
energy cost
initial policy seed / architecture
```

This is very interesting for your project because it lets evolution discover which “motivational systems” are useful.

For example:

```text id="x7xuep"
Variant 1:
    hunger-sensitive, weakly social

Variant 2:
    danger-sensitive, strongly social

Variant 3:
    reproduction-sensitive, low danger sensitivity

Variant 4:
    raw-energy only, no derived drives
```

Then you can ask:

```text id="h57hsp"
Which inherited drive structure produces better lifetime learning?
Which drive structure supports stable predator-prey coexistence?
Which drive structure supports group hunting?
Which drive structure supports longer lineage persistence?
```

That is exactly in line with your Nature/Nurture framing.

## Darwinian vs Baldwinian in your model

You can separate them like this:

### Pure Darwinian version

```text id="rpfs9d"
Evolution selects inherited traits based on fitness.
Little or no within-lifetime learning.
```

Example:

```text id="vwf8k1"
mutate drive parameters
evaluate behavior
select variants with more reproduction/survival
```

This tests what can be selected directly.

### Baldwinian version

```text id="80dfyo"
Each variant learns during its lifetime.
Selection uses post-learning fitness.
But learned weights are not directly inherited.
```

Example:

```text id="0ihy35"
variant is born with hunger/danger/social drive settings
variant trains with PPO for N iterations
evaluate learned behavior
select variants whose inherited setup made learning successful
offspring inherit drive settings, not the learned final policy
```

This tests whether evolution can favor **learnability**.

### Lamarckian version, optional comparison

```text id="tliyxr"
Learned policy weights are inherited directly.
```

This is less biologically realistic, but useful as a computational benchmark.

## Why this may help your project

It gives your two-timescale process a much cleaner experimental object.

Instead of saying:

```text id="r4w7mi"
evolution selects policies
```

you can say:

```text id="cwh48y"
evolution selects motivational/perceptual scaffolds
learning fills in the movement behavior
```

That is a stronger biological model.

It also connects to hierarchical RL. Temporal abstraction in RL is often used to represent behavior at multiple levels, where higher-level structures organize lower-level actions over time. Sutton, Precup, and Singh’s options framework is a classic example of this kind of temporal abstraction. ([www-anw.cs.umass.edu][2])

For PredPreyGrass, the hierarchy could eventually become:

```text id="ptg6ar"
Evolution:
    selects drive systems and learning biases

High-level learned mode:
    forage / flee / group / reproduce-oriented movement

Low-level learned policy:
    concrete movement direction
```

But you do not need to start with full hierarchy. The first step is simpler:

```text id="p2vmu6"
evolve observation/drive parameters
train movement policy with PPO
select variants by ecological fitness
```

## Best experiment design

I would add this to your roadmap:

```text id="jxep6t"
Experiment: Baldwinian observation-drive evolution

Goal:
    Test whether evolved internal-drive features improve lifetime learning
    and population-level stability.

Inner loop:
    PPO learns movement-only behavior using:
        local grid
        raw energy
        derived drive channels

Outer loop:
    mutate/select drive parameters:
        hunger scaling
        danger scaling
        social-radius
        reproduction-readiness scaling
        enabled/disabled drive channels

Fitness:
    all-types-survive-to-horizon rate
    reproduction success
    lineage persistence
    predator/prey coexistence
    group-hunt events
    population stability
```

The most important conceptual payoff is this:

```text id="9uz2c9"
Raw observation asks:
    Can learning discover useful behavior from scratch?

Derived drives ask:
    Can evolution produce perceptual/motivational systems
    that make useful learning easier?
```

That is very close to your Darwinian/Baldwinian approach.

[1]: https://pmc.ncbi.nlm.nih.gov/articles/PMC3423563/?utm_source=chatgpt.com "How Adaptive Learning Affects Evolution: Reviewing Theory ..."
[2]: https://www-anw.cs.umass.edu/~barto/courses/cs687/Sutton-Precup-Singh-AIJ99.pdf?utm_source=chatgpt.com "A framework for temporal abstraction in reinforcement ..."


