---
id: model-library
title: Model Library
description: A complete catalog of every simulation model on the site, organized by family, with what each one tests and a link to explore it.
slug: /model-library
---

# Model Library

[Evidence So Far](/evidence-so-far) tracks how confident the site is in each result. This page is the complementary map: every simulation model on the site, organized by family, with what each one tests and a link to go read it. Use it to find a specific model rather than to judge how conclusive it is.

## How to Read This Page

Each table has an **Adaptation** column that says what kind of process the model runs:

- **Evolution** — selection on an inherited trait or strategy across generations, with no within-lifetime learning.
- **Learning** — within-lifetime adaptation only, with no evolutionary component.
- **Evolution + Learning** — both act together, which is the site's central two-timescale claim.

## Nowak Mechanisms

Five thin wrappers over a shared Moran-process engine, one per classical mechanism for the evolution of cooperation identified in Nowak (2006).

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '13%' }} />
        <col style={{ width: '23%' }} />
        <col style={{ width: '44%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Model</th>
          <th>Adaptation</th>
          <th>What it demonstrates</th>
          <th>Explore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Kin Selection</td>
          <td>Evolution</td>
          <td>Cooperation spreads when benefit routed to relatives, weighted by relatedness, exceeds its private cost — Hamilton's rule <code>rB &gt; C</code>.</td>
          <td><a href="/evolved-cooperation/kin-selection">Kin Selection</a></td>
        </tr>
        <tr>
          <td>Direct Reciprocity</td>
          <td>Evolution</td>
          <td>Cooperation sustained by repeated encounters: a cooperator can reward or punish the same partner next round, but only if they meet again.</td>
          <td><a href="/evolved-cooperation/direct-reciprocity">Direct Reciprocity</a></td>
        </tr>
        <tr>
          <td>Indirect Reciprocity</td>
          <td>Evolution</td>
          <td>Cooperation sustained by reputation: agents help others whose public reputation signals they are good cooperators, without needing repeated encounters.</td>
          <td><a href="/evolved-cooperation/indirect-reciprocity">Indirect Reciprocity</a></td>
        </tr>
        <tr>
          <td>Network Reciprocity</td>
          <td>Evolution</td>
          <td>Cooperation sustained by spatial structure: local-neighborhood interaction lets cooperator clusters form and shield each other from exploitation.</td>
          <td><a href="/evolved-cooperation/network-reciprocity">Network Reciprocity</a></td>
        </tr>
        <tr>
          <td>Group Selection</td>
          <td>Evolution</td>
          <td>A second level of selection on top of individual competition: the most successful group is periodically copied into the least successful group.</td>
          <td><a href="/evolved-cooperation/group-selection">Group Selection</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> The five Nowak mechanisms, all built on the shared <a href="/evolved-cooperation/interaction-kernel">Interaction Kernel</a> routing engine.</figcaption>
</figure>

## Ecological Models

Four case studies that embed a cooperation problem inside a spatial, ecological setting rather than an abstract Moran process.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '13%' }} />
        <col style={{ width: '23%' }} />
        <col style={{ width: '44%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Model</th>
          <th>Adaptation</th>
          <th>What it demonstrates</th>
          <th>Explore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Spatial Altruism</td>
          <td>Evolution</td>
          <td>The minimal case study: whether an altruistic inherited type can survive local exploitation once reproduction is local and empty space is a competitor.</td>
          <td><a href="/evolved-cooperation/spatial-altruism">Spatial Altruism</a></td>
        </tr>
        <tr>
          <td>Cooperative Hunting</td>
          <td>Evolution</td>
          <td>Whether an inherited, continuously-valued hunt-investment trait can spread when it costs the individual predator but pays off only through successful shared hunts.</td>
          <td><a href="/evolved-cooperation/cooperative-hunting">Cooperative Hunting</a></td>
        </tr>
        <tr>
          <td>Spatial Prisoner's Dilemma</td>
          <td>Evolution</td>
          <td>What inherited response rules spread when agents repeatedly play a local Prisoner's Dilemma and reproduce into nearby empty cells using accumulated energy.</td>
          <td><a href="/evolved-cooperation/spatial-prisoners-dilemma">Spatial Prisoner's Dilemma</a></td>
        </tr>
        <tr>
          <td>Retained Benefit</td>
          <td>Evolution</td>
          <td>The most abstract case study: strips away mechanism-specific structure to ask how much of the value cooperation creates has to be routed back to cooperators for it to spread.</td>
          <td><a href="/evolved-cooperation/retained-benefit">Retained Benefit</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> Ecological evolved-cooperation case studies, each with a browser replay.</figcaption>
</figure>

## Learning × Selection Interaction Models

The models that test the site's central claim directly: that within-lifetime learning and between-generation selection can work better together than either alone.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '13%' }} />
        <col style={{ width: '23%' }} />
        <col style={{ width: '44%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Model</th>
          <th>Adaptation</th>
          <th>What it demonstrates</th>
          <th>Explore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PredPreyGrass</td>
          <td>Evolution + Learning</td>
          <td>A richer predator-prey-grass ecology used to test whether the genome needs a direct channel into individual behavior for selection-driven behavioral evolution to become visible.</td>
          <td><a href="/learning-selection-interaction/predpreygrass">PredPreyGrass</a></td>
        </tr>
        <tr>
          <td>Model 1: Trust Learning</td>
          <td>Evolution + Learning</td>
          <td>Baseline two-timescale model: agents learn a scalar trust value per partner within a lifetime, and evolution selects the inherited parameters that shape that learning.</td>
          <td><a href="/learning-selection-interaction/simulations/model-1">Model 1</a></td>
        </tr>
        <tr>
          <td>Model 2: Q-learning</td>
          <td>Evolution + Learning</td>
          <td>Same two-timescale framework as Model 1, but with action-value (Q-learning) reinforcement learning replacing scalar trust.</td>
          <td><a href="/learning-selection-interaction/simulations/model-2">Model 2</a></td>
        </tr>
        <tr>
          <td>Model 3: Extended</td>
          <td>Evolution + Learning</td>
          <td>Adds reputation, partner choice, and forgiveness on top of Q-learning, shifting the outcome toward conditional cooperation with active monitoring.</td>
          <td><a href="/learning-selection-interaction/simulations/model-3">Model 3</a></td>
        </tr>
        <tr>
          <td>Network Diversity Experiment</td>
          <td>Evolution + Learning</td>
          <td>Not a new model — runs Models 1 through 3 under systematically varied network conditions to test when partner-memory alone stops being enough.</td>
          <td><a href="/learning-selection-interaction/simulations/network-diversity">Network Diversity</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 3:</strong> The two-timescale simulation family plus PredPreyGrass, this site's largest evolution-and-learning case studies.</figcaption>
</figure>

## Learned Cooperation Models

The [Prisoner's Dilemma](/learned-cooperation/prisoners-dilemma) and [Repeated Prisoner's Dilemma](/learned-cooperation/repeated-prisoners-dilemma) pages set up the game-theoretic background; the PPO Study is the model that actually runs it.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '13%' }} />
        <col style={{ width: '23%' }} />
        <col style={{ width: '44%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Model</th>
          <th>Adaptation</th>
          <th>What it demonstrates</th>
          <th>Explore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PPO Study</td>
          <td>Learning</td>
          <td>Two independently trained PPO agents repeatedly play a Prisoner's Dilemma, testing whether learned behavior converges to persistent defection, cooperative conventions, or mixed horizon-dependent patterns.</td>
          <td><a href="/learned-cooperation/repeated-prisoners-dilemma/ppo-study">PPO Study</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 4:</strong> The learned-cooperation model, with no evolutionary component.</figcaption>
</figure>

## Foundational Replications

From-scratch replications of the papers that established the two-timescale claim this site builds on.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '17%' }} />
        <col style={{ width: '23%' }} />
        <col style={{ width: '40%' }} />
        <col style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Model</th>
          <th>Adaptation</th>
          <th>What it demonstrates</th>
          <th>Explore</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ackley &amp; Littman (1991)</td>
          <td>Evolution + Learning</td>
          <td>A neural-network-controlled creature that senses, moves, eats, fights, and reproduces, testing whether combining an evolving genome with within-lifetime reinforcement learning beats either alone. This site's strongest confirmed result.</td>
          <td><a href="/learning-selection-interaction/ackley-littman-1991">Ackley &amp; Littman (1991)</a></td>
        </tr>
        <tr>
          <td>Hinton &amp; Nowlan (1987)</td>
          <td>Evolution + Learning</td>
          <td>The needle-in-a-haystack landscape that gave the Baldwin effect its modern computational footing: whether within-lifetime learning can manufacture a gradient where genetic search alone has none. Includes an interactive demo.</td>
          <td><a href="/learning-selection-interaction/hinton-nowlan-1987">Hinton &amp; Nowlan (1987)</a></td>
        </tr>
        <tr>
          <td>Prosser (2022)</td>
          <td>Evolution + Learning</td>
          <td>Tests what changes when learning acts on genetically correlated groups of traits, with the correlation structure itself evolving, instead of on independent single loci.</td>
          <td><a href="/learning-selection-interaction/prosser-2022">Prosser (2022)</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 5:</strong> Replications this site's two-timescale claim is built on. See <a href="/learning-selection-interaction/baldwin-effect">The Baldwin Effect</a> for the underlying concept.</figcaption>
</figure>
