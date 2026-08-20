---
id: predpreygrass
title: PredPreyGrass
sidebar_position: 2
slug: /learning-selection-interaction/predpreygrass
---

# PredPreyGrass

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the conceptual mapping. For the actual trial-by-trial results — what has been tried, what worked, and what remains open — see the <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Darwin/Baldwin Trial Log</a>.</div>

## A Concrete Eco-Evolutionary Analogue

PredPreyGrass gives a concrete simulation analogue for the general distinction between Darwinian selection, Baldwinian interaction, and artificial Lamarckian inheritance.

The general distinction is still the same: what matters is what crosses the generational boundary.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img
    src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/lamarck-darwin-baldwin-waddington.svg"
    alt="Diagram comparing Lamarckian inheritance, Darwinian evolution, the Baldwin effect, and Waddington's genetic assimilation"
    style={{ display: 'block', width: '100%', height: 'auto' }}
  />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Lamarckian inheritance passes acquired change directly, while the Baldwin effect lets learned behavior guide selection without direct inheritance of that learned behavior. Image by Ian Alexander, CC BY-SA 4.0.</figcaption>
</figure>

In `predpreygrass.eco_evolutionary`, the active heritable trait is a speed genome. Offspring inherit the parent's speed genome with bounded mutation. The learned PPO policy weights are not part of the inherited genome in the base experiment.

In `predpreygrass.eco_evolutionary_cadence`, speed controls movement frequency rather than movement distance. The policy can observe both the agent's speed and whether movement is available on the current step. This makes the Baldwinian mechanism especially explicit: inherited speed changes the body-environment interface, learning can condition behavior on that inherited trait, and ecological success determines which genomes reproduce.

<figure style={{ margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', padding: '20px 45px', color: '#FFFFFF', textAlign: 'left', fontFamily: 'IBM Plex Sans, Avenir Next, Segoe UI, sans-serif' }}>
      <div style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.3 }}>Baldwinian Loop in PredPreyGrass Eco-Evolution</div>
      <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 400, lineHeight: 1.4 }}>Learning changes ecological success; reproduction transmits mutated speed genomes, not acquired policy weights.</div>
    </div>
    <img
      src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/predpreygrass-baldwinian-loop.svg"
      alt="Diagram of the PredPreyGrass Baldwinian loop where inherited speed genomes shape movement, learned policy behavior affects ecological fitness, and offspring inherit mutated genomes rather than acquired policy weights"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> PredPreyGrass as a Baldwinian loop: inherited speed genomes shape movement mechanics, learned behavior changes ecological success, and offspring inherit mutated genomes rather than acquired policy weights.</figcaption>
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
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> PredPreyGrass changes interpretation depending on whether only the genome is inherited or learned policy state is copied forward.</figcaption>
</figure>
