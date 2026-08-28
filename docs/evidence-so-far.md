---
id: evidence-so-far
title: Evidence So Far
description: A status overview of the current evidence for the site's claims about human cooperation and competition, including confirmed results, null results, demonstrations, and open questions.
sidebar_position: 3
slug: /evidence-so-far
---

# Evidence So Far

This page is the status overview for the site. It separates confirmed results from model demonstrations, null results, and open questions, so the argument can be read without treating every model page as equally conclusive.

The current bottom line is this: the site has strong computational evidence for the core two-timescale claim that evolution across generations and learning within lifetimes can work better together than either process alone. It also has cooperation-specific model evidence that reciprocity, reputation, partner choice, spatial structure, and selection can sustain or spread cooperation under defined conditions.

What it does not yet have is a complete human-specific model of cooperation and competition. The current evidence supports mechanism-level claims that are relevant to human behavior, not a finished account of language, norms, institutions, moral psychology, culture, or identity.

## Main Result

The strongest result is the Ackley & Littman style survival replication and its PredPreyGrass Trial 12 extension: combined evolution and learning outperform evolution alone, learning alone, no adaptation, and random behavior.

In Trial 12, the full comparative study used five conditions, 100 seeds per condition, and a 1,000,000-step ceiling. The combined evolution-and-learning condition beat all four degraded alternatives with `p < 0.00001` in each comparison (Mann-Whitney U, `n = 100` per condition).

This matters because the site's human claim is not "nature alone" or "nurture alone." The claim is that inherited tendencies and lifetime learning can form a coupled adaptive system. Trial 12 is the cleanest current evidence for that coupled system.

There is an important limit: this result concerns survival behavior in a predator-prey ecology, not cooperation specifically. It supports the two-timescale mechanism that the human cooperation argument depends on; it does not, by itself, demonstrate human cooperation.

Read next:

- [Interaction Evolved-Learned Cooperation](/learning-selection-interaction/theory)
- [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991)
- [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log)

## Cooperation Results

The cooperation-specific results are strongest in the smaller, more controlled models.

The [Two-Timescale Simulations](/learning-selection-interaction/simulations) show that cooperation depends on interaction structure, learning rules, and selection acting across generations:

- [Model 1: Trust Learning](/learning-selection-interaction/simulations/model-1) shows cooperation collapse in one-shot interaction, but repeated interaction stabilizes cooperation near 98%.
- [Model 2: Q-learning](/learning-selection-interaction/simulations/model-2) shows higher repeated-interaction payoff with more strategic exploration and a lower final cooperation rate.
- [Model 3: Extended](/learning-selection-interaction/simulations/model-3) adds reputation, partner choice, and forgiveness, shifting the model toward conditional cooperation with active monitoring.

The [Nowak Mechanisms](/evolved-cooperation/nowak-mechanisms) pages provide proof-of-mechanism simulations for classical evolutionary routes to cooperation. Their main lesson is not simply that cooperation can persist. It is that origin and maintenance are different problems. A mechanism can maintain cooperation once it is common while still failing to produce cooperation from rare.

The ecological model pages, including [Spatial Altruism](/evolved-cooperation/spatial-altruism), [Cooperative Hunting](/evolved-cooperation/cooperative-hunting), [Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma), and [Retained Benefit](/evolved-cooperation/retained-benefit), are best read as mechanism demonstrations. They show how spatial structure, ecological feedback, costs, benefits, and local interaction can change cooperative dynamics, but they are not yet the final evidential core of the human argument.

## Null Results

The site deliberately preserves null results because they narrow the problem.

The clearest null history is in [PredPreyGrass](/learning-selection-interaction/predpreygrass). Trials 1-10 under the shared-policy architecture were null or inconclusive for selection-driven drift, despite testing multiple heritable traits and running statistical replications. The later Trial 12 result suggests that the earlier nulls were pointing at a structural limitation: the genome needs a direct channel into individual behavior for selection-driven behavioral evolution to become visible.

The [PPO Study](/learned-cooperation/repeated-prisoners-dilemma/ppo-study) is also a limiting result. Under the reported two-sided tests with Holm correction across 40 comparisons, no `(horizon, player)` result was significant at `alpha = 0.05` in the shown run.

Several cooperation mechanisms also have built-in limits. Direct reciprocity can maintain cooperation once reciprocal behavior is common, but it does not reliably originate cooperation from a defector-dominated population without a foothold or scaffold. Indirect reciprocity depends on a reputation system that itself has to bootstrap. Network reciprocity and group selection can be stochastic rather than automatic.

## Open Questions

The main open question is how to move from mechanism tests to models that are explicitly about human cooperation and competition.

Concrete next questions include:

- Can the shared-policy PredPreyGrass architecture be given a direct heritable behavioral channel without losing the advantages of the richer ecological environment?
- What explains Trial 12's remaining discrepancy with the original Ackley & Littman result, where evolution-alone beats luck here but not in the original paper?
- Does the deeper longitudinal genetic-assimilation result from Ackley & Littman also reproduce in the current implementation?
- Does the partially built drive-conditioned observation system improve learning, and can it support an evolutionary extension?
- Which mechanism-level results still hold when explicitly human layers are added, such as social learning, norms, institutions, language, punishment, group identity, and moral cognition?

## How to Read the Evidence

Use these labels when moving through the site:

- **Confirmed result** means the result survived a specified statistical comparison or a focused control test.
- **Demonstration** means the model shows a mechanism clearly, but the page should not be read as a broad replicated claim.
- **Null result** means the tested design did not produce a reliable directional result under the reported conditions.
- **Open question** means the issue is identified but not yet resolved by the current simulations.

## Experiment Map

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', minWidth: '920px', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '20%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '15%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Track</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Current status</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>What it shows</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Main limitation</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Read next</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Ackley &amp; Littman replication / Trial 12</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Confirmed</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Evolution plus learning beats either alone in the reported survival task.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strongest for two-timescale adaptation, not cooperation specifically.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/learning-selection-interaction/theory">Theory</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Abstract two-timescale simulations</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Confirmed / model-specific</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Cooperation changes with repeated interaction, learning rules, selection, reputation, partner choice, and forgiveness.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Abstract donation-game setting on simplified interaction networks.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/learning-selection-interaction/simulations">Simulations</a></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Nowak mechanisms</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Proof-of-mechanism</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Classical cooperation mechanisms can maintain, spread, or fail under clearly separated conditions.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mechanism isolation is not the same as a full human explanation.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/nowak-mechanisms">Nowak Mechanisms</a></td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Ecological evolved-cooperation models</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Demonstrations</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Spatial and ecological constraints can change cooperation, altruism, hunting, and benefit-retention dynamics.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Useful model behavior, but not yet a replicated human-evidence layer.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation">Evolved Cooperation</a></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Repeated Prisoner's Dilemma PPO</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Null / limiting</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>The shown PPO sweep did not produce Holm-significant cooperation results.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Narrow reported setup; not a general impossibility result.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/learned-cooperation/repeated-prisoners-dilemma/ppo-study">PPO Study</a></td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>PredPreyGrass shared-policy trials</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Null / inconclusive</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Trials 1-10 did not show reliable selection-driven drift under the shared-policy design.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Genome influenced behavior only indirectly, through population-level economics.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/learning-selection-interaction/evolution-boundary-predpreygrass">Evolution Boundary</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Current status of the site's main evidence tracks.</figcaption>
</figure>
