---
id: interaction-evolved-learned-cooperation
title: Interaction Evolved-Learned Cooperation
sidebar_position: 1
slug: /learning-selection-interaction/theory
---

# Interaction Evolved-Learned Cooperation

## A Two-Timescale Theory of Cooperation

Cooperation can emerge through two different adaptive processes:

- Learning within lifetimes (behavioral plasticity, reinforcement learning)
- Selection across generations (evolutionary dynamics)

These processes operate on entirely different timescales:

`Learning timescale <<< Evolutionary timescale`

In natural systems they interact. The two-timescale simulation family in this section provides a controlled framework where both processes can be analyzed together.

---

## Fast and Slow Dynamics

### Fast timescale — learning

Agents update their policy during their lifetime to increase expected reward.

$$
\pi_{t+1} \leftarrow \pi_t + \alpha \nabla_\pi \mathbb{E}[R]
$$

Where:

- $s$ = social state (partner history, local interaction context),
- $a$ = action (cooperate or defect),
- $R$ = interaction reward/payoff,
- $\alpha$ = learning rate.

In this simulation family, reward is defined by donation-game payoffs and partner-specific interaction outcomes.

---

### Slow timescale — evolution

Population composition changes across generations:

frequency_next = (fitness / mean_fitness) * frequency

Fitness is the payoff accumulated over a lifetime of interactions under the learned policy:

$$
\text{fitness}(\pi^*) = \sum_{t=1}^{T} R_t\!\left(s_t,\, \pi^*(s_t)\right)
$$

Where $\pi^*$ is the policy the agent has learned by the end of its lifetime and $T$ is the number of interactions per generation. Agents that learned to cooperate with reliable partners and defect against exploiters accumulate higher payoffs and therefore reproduce more.

Evolution therefore selects based on learning outcomes.

---

## Baldwinian and Lamarckian Interaction

The key distinction is what crosses the generational boundary.

In a **Baldwinian** interaction, agents learn useful behavior during life, but the learned behavior itself is not inherited. Selection instead favors inherited traits that make the useful behavior easier, faster, or cheaper to learn. Learning affects fitness; fitness changes which learning-supporting traits persist. See [The Baldwin Effect](/learning-selection-interaction/baldwin-effect) for the full history, mechanism, and computational demonstrations behind this idea.

In a **Lamarckian** interaction, acquired characteristics are inherited directly. In biological evolution this means the learned or acquired trait itself is passed to offspring. In artificial learning systems, a Lamarckian analogue appears when a trained policy, learned neural-network weights, or acquired hyperparameter state is copied into descendants or replacement populations.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <img
    src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/lamarck-darwin-baldwin-waddington.svg"
    alt="Diagram comparing Lamarckian inheritance, Darwinian evolution, the Baldwin effect, and Waddington's genetic assimilation"
    style={{ display: 'block', width: '100%', height: 'auto' }}
  />
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Lamarckian inheritance passes acquired change directly, while the Baldwin effect lets learned behavior guide selection without direct inheritance of that learned behavior. Image by Ian Alexander, CC BY-SA 4.0.</figcaption>
</figure>

For the simulation family on this page, the intended mechanism is mainly Baldwinian: within-lifetime learning affects reproductive success, but descendants inherit learning-relevant settings rather than the final learned policy.

In artificial systems, the same distinction depends on whether descendants receive only inherited settings that affect learnability, or whether they directly receive the acquired policy state produced by learning.

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
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Project interpretation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Baldwinian</td>
        <td>Behavior or policy improves through experience.</td>
        <td>Parameters that support learning, not the acquired behavior itself.</td>
        <td>Main framing for this two-timescale cooperation page.</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>Lamarckian</td>
        <td>Behavior, policy weights, or acquired parameter state changes through experience.</td>
        <td>The acquired state itself is copied into descendants or replacement populations.</td>
        <td>Artificial analogue when trained policies, learned weights, or checkpoint state are copied forward.</td>
      </tr>
      <tr>
        <td>Darwinian selection without learning</td>
        <td>No within-lifetime policy learning is required.</td>
        <td>Heritable traits vary and are filtered by reproductive success.</td>
        <td>Useful baseline, but too limited for learned cooperation.</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> The distinction depends on what is transmitted across generations.</figcaption>
</figure>

---

## The Baldwin Effect

The Baldwin effect describes how learning changes evolutionary trajectories without requiring inheritance of learned behavior: agents that can learn a beneficial behavior survive long enough to reproduce even before their genes encode that behavior directly, and over generations genetic variants that make the behavior easier to learn accumulate. The mechanism is Darwinian throughout — no acquired traits are inherited. See [The Baldwin Effect](/learning-selection-interaction/baldwin-effect) for the full history, the step-by-step mechanism, the Hinton and Nowlan (1987) computational demonstration and its extensions, and common misconceptions.

Applied to cooperation specifically:

- **Without learning**, a genotype predisposed to cooperate has low fitness unless partners are also cooperative, which is rare in a defector-dominated population — cooperative genotypes are eliminated before they can spread. This is the needle-in-a-haystack landscape Hinton and Nowlan describe.
- **With learning**, an agent with even a weak cooperative predisposition can learn to discriminate — cooperating with cooperators, withholding from defectors — and accumulate net positive payoff even in a mixed population. Learning rescues cooperative genotypes that selection alone would eliminate, turning the fitness cliff into a slope evolution can climb.

This is distinct from Waddington's *genetic assimilation*, where a trait becomes fully encoded and developmentally canalized — the Baldwin effect produces *facilitation* of learning rather than necessarily replacing it.

### Learning creates new selection pressures

A learned cooperative strategy, once widespread in the population, creates selection pressure for genetic variants that achieve the same behavior at lower cost:

- lower learning rates suffice when the behavior is already partially encoded
- initial cooperation biases can be set more aggressively when the social environment has become reliably cooperative
- discrimination thresholds can loosen as defectors become rarer

This feedback loop — learning expands what is reachable; evolution consolidates what learning discovered — is the core dynamic this simulation family is designed to capture.

---

## Interaction Regimes

Learning and evolution can interact in different ways:

1. Learning accelerates evolution  
   Plasticity enables rapid discovery of cooperation that selection stabilizes.

2. Learning masks selection  
   If all agents learn equally well, fitness differences shrink.

3. Learning opposes evolution  
   Short-term learned defection may increase individual reward but reduce population fitness.

4. Coevolution of learning ability  
   Selection may favor faster or more robust learners.

---

## Manifestation in the Simulation Suite

In the integrated two-timescale cooperation simulations:

- interactions are local by default (ring structure)
- agents update behavior within generation (trust or Q-values)
- agents reproduce between generations based on accumulated payoff

This creates a Baldwin-style pathway:

1. Agents learn partner-contingent cooperation during life
2. Learners with better long-run payoff leave more offspring
3. Offspring inherit parameter settings that make successful learning more likely, not the completed learned policy

Cooperation shifts from:

context-dependent learning alone -> learning supported by evolved predispositions

This differs from a Lamarckian artificial-learning setup, where a trained policy or acquired policy weights are copied directly into later agents or replacement populations.

---

## What Can Evolve

Selection can act on:

- trust predispositions (`trust_prior`)
- social responsiveness to experience
- reinforcement-learning parameters (`alpha`, `epsilon`, `gamma`, bias)
- social-cognitive parameters (reputation weighting, rejection threshold, forgiveness)

This leads to cooperation-friendly learning phenotypes rather than fixed cooperative strategies.

---

## Testable Predictions

The two-timescale framework generates testable predictions:

- Populations with repeated interaction should evolve higher cooperation than one-shot regimes.
- Selection should favor parameter combinations that improve partner discrimination.
- In stranger-rich environments, reputation-mediated mechanisms should outperform pure partner-memory mechanisms.
- Different learning rules (trust update vs Q-learning) should produce different cooperation-payoff trade-offs.

All of these are testable within the integrated model family.

---

## Relation to Classical Theories

Classical evolutionary models:
- fixed strategies
- cooperation via selection only

Pure reinforcement learning models:
- cooperation within lifetimes
- no generational dynamics

This framework unifies both:

Cooperation = f(learning dynamics, evolutionary dynamics)

---

## Related Work (Closest by Axis)

No single landmark paper fully matches this integrated setup across all dimensions (reciprocal cooperation, local interaction structure, reinforcement learning, and between-generation selection over learning parameters). The most relevant work falls into three overlapping groups: reciprocal altruism theory, network reciprocity theory, and modern multi-agent learning studies of social dilemmas.

Within this project, Model 1 maps most directly to direct reciprocity and network reciprocity theory, Model 2 maps most directly to learned reciprocity in multi-agent reinforcement learning, and Model 3 extends that line toward reputation, partner choice, and socially mediated cooperation with strangers.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
<div style={{ width: '100%', overflowX: 'auto' }}>
  <table style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
    <colgroup>
      <col style={{ width: '38%' }} />
      <col style={{ width: '24%' }} />
      <col style={{ width: '38%' }} />
    </colgroup>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Work</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Closest axis to this simulation family</th>
        <th style={{ backgroundColor: '#0f3368', color: '#ffffff', textAlign: 'left' }}>Main gap vs this simulation family</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://doi.org/10.1086/406755">
            Trivers (1971), <em>The Evolution of Reciprocal Altruism</em>
          </a>
        </td>
        <td>Foundational logic of repeated reciprocal cooperation</td>
        <td>Verbal evolutionary theory rather than an explicit learning-plus-selection simulation</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://doi.org/10.1126/science.7466396">
            Axelrod and Hamilton (1981), <em>The Evolution of Cooperation</em>
          </a>
        </td>
        <td>Repeated-interaction conditions under which reciprocity can stabilize cooperation</td>
        <td>Strategy tournament framework rather than agents that learn within life and evolve between generations</td>
      </tr>
      <tr>
        <td>
          <a href="https://doi.org/10.1126/science.1133755">
            Nowak (2006), <em>Five Rules for the Evolution of Cooperation</em>
          </a>
        </td>
        <td>Direct reciprocity, indirect reciprocity, and network reciprocity as a unifying framework</td>
        <td>Analytic synthesis rather than a concrete parameter-evolution simulation</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://doi.org/10.1038/nature04605">
            Ohtsuki et al. (2006), <em>A Simple Rule for the Evolution of Cooperation on Graphs and Social Networks</em>
          </a>
        </td>
        <td>Why local interaction structure can protect cooperation</td>
        <td>Graph-theoretic selection result rather than within-lifetime partner learning</td>
      </tr>
      <tr>
        <td>
          <a href="https://www.cs.toronto.edu/~cebly/Papers/multirl-abs.html">
            Claus and Boutilier (1998), <em>The Dynamics of Reinforcement Learning in Cooperative Multiagent Systems</em>
          </a>
        </td>
        <td>Foundational emergence of cooperation in multi-agent reinforcement learning</td>
        <td>Small, abstract cooperative games with no explicit generational inheritance of learning traits</td>
      </tr>
      <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
        <td>
          <a href="https://arxiv.org/abs/1903.08082">
            Eccles et al. (2019), <em>Learning Reciprocity in Complex Sequential Social Dilemmas</em>
          </a>
        </td>
        <td>Reciprocity under temporal and social complexity in learned agents</td>
        <td>No explicit reproduction-selection loop over inherited social-learning parameters</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Related work positioned by proximity to this simulation family along key conceptual axes.</figcaption>
</figure>

Taken together, these works capture the core logic behind the present simulation family: reciprocal altruism, repeated interaction, local network structure, and partner-contingent learning. The distinctive contribution here is that these ingredients are combined in a single two-timescale setup where learning unfolds within life and learning parameters themselves evolve across generations.

### Adjacent computational environments

Some broader MARL and artificial-society papers remain relevant as neighboring context, but they are no longer the primary fit for this page's argument:

- <a href="https://arxiv.org/abs/1702.03037">Leibo et al. (2017), <em>Multi-agent Reinforcement Learning in Sequential Social Dilemmas</em></a> for sequential social-dilemma structure
- <a href="https://arxiv.org/abs/1812.07019">Leibo et al. (2018), <em>Malthusian Reinforcement Learning</em></a> for ecology-linked population dynamics
- <a href="https://ojs.aaai.org/index.php/AAAI/article/view/11771">Zheng et al. (2018), <em>MAgent</em></a> and <a href="https://arxiv.org/abs/1903.00784">Suarez et al. (2019), <em>Neural MMO</em></a> for large-scale multi-agent environments
- <a href="https://arxiv.org/abs/2107.06857">Leibo et al. (2021), <em>Melting Pot</em></a> for broad evaluation of social behaviors

These works are best understood here as adjacent environment or benchmark context, not as the closest direct precedents for the trust-learning, Q-learning, and extended reciprocity models documented in this section.

---

## Simulation Companion

The concrete two-timescale experiments documented for this site are available in two companion tracks, one abstract and one ecological:

- [Two-Timescale Simulations](/learning-selection-interaction/simulations) — abstract ring-network models (trust learning, Q-learning, extended social mechanisms), the network-diversity experiment, and focused appendices. This track confirms the theory above cleanly: see its own theory-simulation correspondence table.
- [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log) — the same two-timescale question asked inside a full predator-prey ecology (PredPreyGrass) rather than an abstract donation game. Twelve trials in, this track has its first confirmed positive result — but only after trading its original shared-policy architecture for a per-agent one; read there for the ten nulls that preceded it and why the architecture change is what worked.

---

## Summary

The interaction between learning and selection:

- couples fast behavioral adaptation with slow population change
- enables the Baldwin effect
- allows plasticity to guide evolution
- explains how cooperation emerges, stabilizes, or collapses

This interaction forms the core mechanism linking nurture and nature in the integrated two-timescale cooperation simulations.

---

## References

- <a href="https://www.cs.toronto.edu/~hinton/absps/evolution.pdf">Hinton, G.E. & Nowlan, S.J. (1987). <em>How Learning Can Guide Evolution.</em> Complex Systems, 1(3), 495–502.</a>
- <a href="https://doi.org/10.1111/j.1558-5646.1953.tb00070.x">Waddington, C.H. (1953). <em>Genetic Assimilation of an Acquired Character.</em> Evolution, 7(2), 118–126.</a>
- <a href="https://commons.wikimedia.org/wiki/File:Lamarck_Compared_to_Darwin,_Baldwin,_Waddington.svg">Alexander, I. (2018). <em>Lamarck Compared to Darwin, Baldwin, Waddington.svg.</em> Wikimedia Commons. CC BY-SA 4.0.</a>

For the primary sources on Baldwin's original proposal, its history, and later computational demonstrations, see the references on [The Baldwin Effect](/learning-selection-interaction/baldwin-effect).
