---
id: predpreygrass-energy-entropy
title: Energy and Entropy in PredPreyGrass
sidebar_position: 3
slug: /learning-selection-interaction/predpreygrass-energy-entropy
---

# Energy and Entropy in PredPreyGrass

Energy flows through the simulated ecosystem from grass to prey to predator, and — as in any real physical system — that flow is one-directional. Energy is never recycled, only degraded, in line with the second law of thermodynamics. This page explains how that plays out in the current implementation of the [base environment](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/base_environment).

<figure style={{ textAlign: 'center' }}>
  <img src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-energy-entropy/entropy-reservoir.jpg" alt="Display 1: Energy flowing from the sun into grass, then prey, then a local entropy reservoir, with a separate global entropy reservoir accumulating heat and waste losses from the whole grid" width="700" />
  <figcaption><strong>Display 1:</strong> Energy flows from the sun through grass and prey, with losses accumulating in an entropy reservoir at each step.</figcaption>
</figure>

## Energy input: the sun, via grass

The sun is the only external energy source. In the simulation this is modeled indirectly: grass regenerates a small, fixed amount of energy every step, currently `energy_gain_per_step_grass = 0.04` in [`config_env.py`](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/base_environment/config_env.py) (values here reflect the codebase at the time of writing — check the source for the current numbers). This regeneration is the sole point where new usable energy enters the system; everything downstream can only redistribute or lose it.

## Real-world trophic efficiency, for context

Energy transfer between real trophic levels is never close to 100% efficient — most of it is lost to respiration, movement, and heat before it reaches the next level up the food chain. Lindeman's (1942) classic analysis is the origin of the commonly cited "ten percent rule":

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <colgroup>
      <col style={{ width: '24%' }} />
      <col style={{ width: '24%' }} />
      <col style={{ width: '52%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Energy transfer</th>
        <th>Typical efficiency</th>
        <th>Why so much is lost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Sun → Grass</td>
        <td>~1-2%</td>
        <td>Only a small fraction of solar energy converts into plant biomass.</td>
      </tr>
      <tr>
        <td>Grass → Prey</td>
        <td>~10-30%</td>
        <td>Most of the energy in grass is lost to digestion, heat, and movement.</td>
      </tr>
      <tr>
        <td>Prey → Predator</td>
        <td>~10-20%</td>
        <td>Predators also spend energy hunting and processing prey.</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> Real-world trophic transfer efficiency (Lindeman, 1942).</figcaption>
</figure>

PredPreyGrass does not model the sun-to-grass step directly, and it does not currently apply a separate transfer-efficiency discount when prey eat grass or predators eat prey — an agent simply receives the eaten agent's or grass patch's energy. The realism instead comes from a different mechanism: constant, unrecoverable energy decay every step, described next.

## How the simulation actually models entropy increase

Two mechanisms currently drive entropy increase in the base environment:

**Passive per-step decay.** Every agent loses a fixed amount of energy each step just for existing: `energy_loss_per_step_predator = 0.15`, `energy_loss_per_step_prey = 0.05`. This energy is not transferred anywhere — it is simply gone, the simulation's direct analogue of heat loss and basal metabolism.

**Starvation.** An agent whose energy reaches zero dies, and any energy it was holding leaves the system unless another agent had already consumed it first.

Two mechanisms that a full thermodynamic story might lead you to expect turn out *not* to apply in the current codebase, and it's worth being explicit about that rather than assuming symmetry with the real world:

- **Movement is currently energy-free.** The base environment defines a movement-cost hook, but it is stubbed to always return zero — agents do not pay energy to move in the base configuration.
- **Reproduction is a lossless split, not a cost.** A parent transfers a fixed initial-energy amount to its offspring (`initial_energy_predator = 5.0`, `initial_energy_prey = 3.0`) with no extra loss in transit. The parent separately earns a reproduction reward (`10.0` for both species) that shapes the learning signal, but that reward is not drawn from the energy pool.

## Why the population still can't grow without limit

Even without movement or reproduction costs, passive per-step decay means every living agent is a standing energy liability: it must eat again before its accumulated decay kills it. The only source that offsets this drain is grass regeneration, which is itself capped at a small fixed amount per step. That cap is the real bottleneck: it sets a ceiling on how much new energy can enter the system at all, two trophic levels below predators, and everything downstream — prey population, predator population, how large either can grow — is bounded by it.

This is also why food chains stay short in both the simulation and in nature: each additional trophic level inherits a shrinking energy budget, and at some point the budget can no longer support another link.

## Implications

Selection in this environment operates on exactly the same logic developed elsewhere on this site: [behavior as a cost-benefit investment](/nature-nurture-human-behavior#behavior-as-a-cost-benefit-investment). Passive decay is a fixed, unavoidable cost that every agent pays every step regardless of what it does. Movement and foraging choices are the investment side of the ledger — an agent that finds grass or prey efficiently outpaces its own decay and can reach the reproduction threshold; one that doesn't, starves. Because decay is constant and energy income is capped by grass regeneration, PredPreyGrass gives natural selection a genuinely scarce resource to select over, without needing to build in any explicit cost for movement or reproduction at all.

---

## References

- Lindeman, R. L. (1942). *The trophic-dynamic aspect of ecology*. *Ecology*, 23(4), 399-417. https://doi.org/10.2307/1930126
