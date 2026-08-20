---
id: predpreygrass
title: PredPreyGrass
sidebar_position: 2
slug: /learning-selection-interaction/predpreygrass
---

# PredPreyGrass

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the conceptual mapping. For the actual trial-by-trial results — what has been tried, what worked, and what remains open — see the <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Darwin/Baldwin Trial Log</a>.</div>

## What Is PredPreyGrass?

The [Predator-Prey-Grass project](https://github.com/doesburg11/PredPreyGrass) studies multi-agent behavior in a simple, closed grid world. It only partially applies to modern humans, but it can shed light on ancestral human behavior: for most of *Homo sapiens*' history — the hunter-gatherer period, until roughly 10,000 years ago — humans could be predator or prey depending on context, and grass stands in for the limited resources available further down the food chain.

The environment is trained with [multi-agent reinforcement learning](https://en.wikipedia.org/wiki/Multi-agent_reinforcement_learning) using [Proximal Policy Optimization (PPO)](https://en.wikipedia.org/wiki/Proximal_policy_optimization). Predators (red) and Prey (blue) both expend energy moving around the grid and replenish it by eating: Prey eat Grass (green), and Predators eat Prey that land on the same cell. In the base configuration, agents get all their energy this way — in real ecosystems, [ecological efficiency](https://en.wikipedia.org/wiki/Ecological_efficiency) between trophic levels is closer to 10%, not 100%, but the simplification keeps the environment tractable.

Predators die of starvation when their energy reaches zero; Prey die of starvation or of being eaten. Both reproduce asexually once their energy crosses a threshold, and offspring spawn near their parent. Grass regrows at the same spot after being eaten — it is treated as part of the environment rather than as a learning agent. Predator and Prey are trained independently, each learning movement strategies from partial observations of the grid. In the base configuration, agents are rewarded only for reproducing — a deliberately sparse signal that tests whether the ecosystem can sustain itself on survival and reproduction alone, without any additional reward shaping.

<figure style={{ textAlign: 'center' }}>
  <video controls style={{ width: '100%', height: 'auto' }}>
    <source src="/videos/predpreygrass.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> A trained Predator, Prey, Grass environment.</figcaption>
</figure>

That covers the mechanics. For a closer look at the energy economics behind them — why passive decay, not movement or reproduction, is what actually forces the population to compete for a scarce resource — see [Energy and Entropy in PredPreyGrass](/learning-selection-interaction/predpreygrass-energy-entropy). The rest of this page builds on the mechanics to ask a different question: what crosses the generational boundary between parent and offspring, and what that implies about Darwinian, Baldwinian, and Lamarckian dynamics.

## A Concrete Eco-Evolutionary Analogue

PredPreyGrass gives a concrete simulation analogue for the general distinction between Darwinian selection, Baldwinian interaction, and artificial Lamarckian inheritance.

The general distinction is still the same: what matters is what crosses the generational boundary.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img
    src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/lamarck-darwin-baldwin-waddington.svg"
    alt="Diagram comparing Lamarckian inheritance, Darwinian evolution, the Baldwin effect, and Waddington's genetic assimilation"
    style={{ display: 'block', width: '100%', height: 'auto' }}
  />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> Lamarckian inheritance passes acquired change directly, while the Baldwin effect lets learned behavior guide selection without direct inheritance of that learned behavior. Image by Ian Alexander, CC BY-SA 4.0.</figcaption>
</figure>

In `predpreygrass.eco_evolutionary`, the active heritable trait is a speed genome. Offspring inherit the parent's speed genome with bounded mutation. The learned PPO policy weights are not part of the inherited genome in the base experiment.

In `predpreygrass.eco_evolutionary_cadence`, speed controls movement frequency rather than movement distance. The policy can observe both the agent's speed and whether movement is available on the current step. This makes the Baldwinian mechanism especially explicit: inherited speed changes the body-environment interface, learning can condition behavior on that inherited trait, and ecological success determines which genomes reproduce.

<figure style={{ margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', overflow: 'hidden' }}>
    <div className="blue-banner">
      <div className="blue-banner-title">Baldwinian Loop in PredPreyGrass Eco-Evolution</div>
      <div className="blue-banner-subtitle">Learning changes ecological success; reproduction transmits mutated speed genomes, not acquired policy weights.</div>
    </div>
    <img
      src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-baldwinian-loop.svg"
      alt="Diagram of the PredPreyGrass Baldwinian loop where inherited speed genomes shape movement, learned policy behavior affects ecological fitness, and offspring inherit mutated genomes rather than acquired policy weights"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> PredPreyGrass as a Baldwinian loop: inherited speed genomes shape movement mechanics, learned behavior changes ecological success, and offspring inherit mutated genomes rather than acquired policy weights.</figcaption>
</figure>

## Interpretation

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '22%' }} />
      <col style={{ width: '28%' }} />
      <col style={{ width: '28%' }} />
      <col style={{ width: '22%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Mechanism</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>What is learned during life</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>What is inherited</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>PredPreyGrass interpretation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Baldwinian</td>
        <td>Behavior or policy improves through experience.</td>
        <td>Parameters that support learning, not the acquired behavior itself.</td>
        <td>Best fit for the base eco-evolutionary speed-genome experiments.</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Lamarckian</td>
        <td>Behavior, policy weights, or acquired parameter state changes through experience.</td>
        <td>The acquired state itself is copied into descendants or replacement populations.</td>
        <td>Closest fit for variants with policy cloning, continued weights, or PBT-style copying.</td>
      </tr>
      <tr>
        <td>Darwinian selection without learning</td>
        <td>No within-lifetime policy learning is required.</td>
        <td>Heritable traits vary and are filtered by reproductive success.</td>
        <td>Baseline when speed affects movement and fitness, but policy behavior is blind to the genome.</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> PredPreyGrass changes interpretation depending on whether only the genome is inherited or learned policy state is copied forward.</figcaption>
</figure>
