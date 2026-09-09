---
id: evidence-so-far
title: Evidence So Far
description: A status overview of the current evidence for the site's claims about human cooperation and competition, including confirmed results, non-replications, null results, demonstrations, and open questions.
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

The ecological model pages — [Cooperative Hunting](/evolved-cooperation/cooperative-hunting), [Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma), and [Retained Benefit](/evolved-cooperation/retained-benefit) — plus the foundational replication [Spatial Altruism](/evolved-cooperation/spatial-altruism), are best read as mechanism demonstrations. They show how spatial structure, ecological feedback, costs, benefits, and local interaction can change cooperative dynamics, but they are not yet the final evidential core of the human argument.

## Null Results

The site deliberately preserves null results because they narrow the problem.

The clearest null history is in [PredPreyGrass](/learning-selection-interaction/predpreygrass). Trials 1-10 under the shared-policy architecture were null or inconclusive for selection-driven drift, despite testing multiple heritable traits and running statistical replications. The later Trial 12 result suggests that the earlier nulls were pointing at a structural limitation: the genome needs a direct channel into individual behavior for selection-driven behavioral evolution to become visible.

The [PPO Study](/learned-cooperation/repeated-prisoners-dilemma/ppo-study) is also a limiting result. Under the reported two-sided tests with Holm correction across 40 comparisons, no `(horizon, player)` result was significant at `alpha = 0.05` in the shown run.

Several cooperation mechanisms also have built-in limits. Direct reciprocity can maintain cooperation once reciprocal behavior is common, but it does not reliably originate cooperation from a defector-dominated population without a foothold or scaffold. Indirect reciprocity depends on a reputation system that itself has to bootstrap. Network reciprocity and group selection can be stochastic rather than automatic.

## Non-Replications

Two of this site's foundational replications don't hold up — not "no significant effect," but outright opposite-direction or blocked results. Both sit on the same underlying environment, which is itself informative.

[Hughes et al. (2018)](/learned-cooperation/hughes2018)'s headline Cleanup claim — that advantageous inequity aversion (guilt) raises collective cooperation over an unmodified baseline — does not reproduce here. Baseline beat the guilt-shaped condition in 6 of 6 individual seed comparisons across two materially different environment configurations, the opposite of the paper's own Fig. 3A. Under-training, miscalibration, and seed noise were each checked directly and ruled out as the explanation; a genuine scale effect or an unidentified environment gap remain open, undecided possibilities. The same paper's Harvest condition is separately inconclusive rather than a clean failure.

[McKee et al. (2023)](/learned-cooperation/mckee2023)'s reputation claim can't be tested at all here: training collapses to near-zero cleaning in both the identifiable and anonymous conditions before reputation dynamics could ever matter. A control run with the reputation mechanism entirely disabled collapses the same way, so reputation shaping isn't the cause — the environment's punishment beam is a plausible, unconfirmed hypothesis instead.

Both experiments reuse the Cleanup environment (in different implementations) that [Hughes et al. (2018)](/learned-cooperation/hughes2018) also uses. That two independent reward-shaping mechanisms, built by different implementations of the same underlying public-goods environment, have now each failed to produce a clean test of their respective paper's claim is a pattern worth taking seriously on its own, separate from either individual result: an environment a plain policy struggles to solve is unlikely to give any mechanism layered on top of it a fair test.

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

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped site-table--evidence-map">
      <thead>
        <tr>
          <th>Track</th>
          <th>Current status</th>
          <th>What it shows</th>
          <th>Main limitation</th>
          <th>Read next</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ackley &amp; Littman replication / Trial 12</td>
          <td>Confirmed</td>
          <td>Evolution plus learning beats either alone in the reported survival task.</td>
          <td>Strongest for two-timescale adaptation, not cooperation specifically.</td>
          <td><a href="/learning-selection-interaction/theory">Theory</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
        <tr>
          <td>Abstract two-timescale simulations</td>
          <td>Confirmed / model-specific</td>
          <td>Cooperation changes with repeated interaction, learning rules, selection, reputation, partner choice, and forgiveness.</td>
          <td>Abstract donation-game setting on simplified interaction networks.</td>
          <td><a href="/learning-selection-interaction/simulations">Simulations</a></td>
        </tr>
        <tr>
          <td>Nowak mechanisms</td>
          <td>Proof-of-mechanism</td>
          <td>Classical cooperation mechanisms can maintain, spread, or fail under clearly separated conditions.</td>
          <td>Mechanism isolation is not the same as a full human explanation.</td>
          <td><a href="/evolved-cooperation/nowak-mechanisms">Nowak Mechanisms</a></td>
        </tr>
        <tr>
          <td>Ecological evolved-cooperation models</td>
          <td>Demonstrations</td>
          <td>Spatial and ecological constraints can change cooperation, altruism, hunting, and benefit-retention dynamics.</td>
          <td>Useful model behavior, but not yet a replicated human-evidence layer.</td>
          <td><a href="/evolved-cooperation">Evolved Cooperation</a></td>
        </tr>
        <tr>
          <td>Repeated Prisoner's Dilemma PPO</td>
          <td>Null / limiting</td>
          <td>The shown PPO sweep did not produce Holm-significant cooperation results.</td>
          <td>Narrow reported setup; not a general impossibility result.</td>
          <td><a href="/learned-cooperation/repeated-prisoners-dilemma/ppo-study">PPO Study</a></td>
        </tr>
        <tr>
          <td>PredPreyGrass shared-policy trials</td>
          <td>Null / inconclusive</td>
          <td>Trials 1-10 did not show reliable selection-driven drift under the shared-policy design.</td>
          <td>Genome influenced behavior only indirectly, through population-level economics.</td>
          <td><a href="/learning-selection-interaction/evolution-boundary-predpreygrass">Evolution Boundary</a>, <a href="/learning-selection-interaction/darwin-baldwin-trial-log">Trial Log</a></td>
        </tr>
        <tr>
          <td>Leibo et al. (2017) replication</td>
          <td>Reproduced (reduced scale)</td>
          <td>Independent DQN learners in Gathering and Wolfpack produce policies whose induced payoffs satisfy classical dilemma inequalities.</td>
          <td>No run yet at the paper's own 40M-step training scale.</td>
          <td><a href="/learned-cooperation/leibo2017">Leibo et al. (2017)</a></td>
        </tr>
        <tr>
          <td>Hughes et al. (2018) replication</td>
          <td>Non-replication</td>
          <td>Cleanup's headline guilt-raises-cooperation claim does not reproduce; baseline beat the guilt-shaped condition in 6 of 6 seed comparisons.</td>
          <td>Under-training, miscalibration, and seed noise ruled out; a scale effect or fidelity gap remain undecided.</td>
          <td><a href="/learned-cooperation/hughes2018">Hughes et al. (2018)</a></td>
        </tr>
        <tr>
          <td>McKee et al. (2023) / reputation</td>
          <td>Blocked — training collapse</td>
          <td>Training collapses to near-zero cleaning in both conditions before reputation dynamics can matter; the claim can't yet be tested.</td>
          <td>Punishment-beam hypothesis for the collapse is plausible but unconfirmed — no ablation run.</td>
          <td><a href="/learned-cooperation/mckee2023">McKee et al. (2023)</a></td>
        </tr>
        <tr>
          <td>Boyd &amp; Richerson (2009) replications</td>
          <td>Confirmed</td>
          <td>Cultural group selection sustained by a low migration/selection ratio; payoff-biased migration spreads group-beneficial behavior.</td>
          <td>Voting-with-feet's own welfare check shows spreading the behavior label doesn't reliably raise welfare.</td>
          <td><a href="/evolved-cooperation/boyd-richerson-2009-culture">Culture</a>, <a href="/evolved-cooperation/boyd-richerson-2009-voting-with-feet">Voting With Your Feet</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Current status of the site's main evidence tracks.</figcaption>
</figure>
