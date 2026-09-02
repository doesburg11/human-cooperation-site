---
id: ackley-littman-1991
title: The Ackley & Littman (1991) Algorithm
sidebar_position: 11
slug: /learning-selection-interaction/ackley-littman-1991
---

import GithubLink from '@site/src/components/GithubLink';

# The Ackley & Littman (1991) Algorithm

<GithubLink href="https://github.com/doesburg11/AckleyLittman1991" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>David Ackley and Michael Littman's *"Interactions Between Learning and Evolution"* (1991) asks a concrete version of the question the [Baldwin effect](/learning-selection-interaction/baldwin-effect) raises abstractly: if you give artificial agents **both** a genome that evolves across generations **and** a reinforcement-learning mechanism that adapts within a single lifetime, does the combination outperform either mechanism alone — or pure chance?</div>

Hinton & Nowlan's 1987 model (see [The Hinton & Nowlan (1987) Algorithm](/learning-selection-interaction/hinton-nowlan-1987)) had already answered a narrower version of this with a bit-string "needle in a haystack" landscape and blind-guess learning. Ackley & Littman replace that abstraction with something much closer to a real agent: a neural-network-controlled creature that senses a 2D world, moves, eats, fights, and reproduces, with reinforcement learning driven by its own internally generated signal rather than an externally supplied reward.

## 2. World AL: the environment

The paper's artificial world — "World AL" — is a **100×100 non-toroidal grid** (the edges are walls, not wraparound) populated by two structurally different kinds of creature:

- **Agents** — the single *adaptive* species. Omnivorous: they eat plants, dead agents, and dead carnivores. Every agent carries a genome and a learning mechanism (below).
- **Carnivores** — a permanently *non-adaptive* species. No genome, no network, no learning — a hard-coded finite-state rule that seeks out the nearest visible agent and attacks it. Carnivores exist purely as selection pressure on the agent population; a new one spawns automatically every 200 steps, regardless of how many currently exist.

The grid also contains three static or semi-static features:

- **Plants** — the agents' food supply, growing back over time up to a crowding limit, with a reseed floor of 50 plants so the world never runs out entirely.
- **Trees** — shelter. One agent can occupy a tree at a time; carnivores cannot climb into a tree or attack an agent sheltered inside one.
- **Walls** — permanent obstacles; colliding with one damages the agent that walked into it.

Agents sense **4 cells in each of the four compass directions**; carnivores sense **6** — carnivores are deliberately given a longer perceptual range than their prey. Each agent's observation vector encodes what it can see in each direction, whether it is currently sheltered in a tree, and its own health and energy.

**Actions** are the same four-directional move set for both species, with the effect of an action determined entirely by what occupies the target cell: entering an empty cell, eating a plant or corpse, climbing into a tree, taking damage from a wall, or attacking whatever creature is there. Carnivores are structurally incapable of targeting a wall or an occupied tree — the rule is enforced by what the world allows them to attempt, not by a choice they make.

<figure style={{ margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', overflow: 'hidden' }}>
    <div className="blue-banner">
      <div className="blue-banner-title">Summary of World AL</div>
      <div className="blue-banner-subtitle">Ackley &amp; Littman's (1991) environment: entities, a landscape closeup, and each agent's seven-value observation vector.</div>
    </div>
    <img
      src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/ackley-littman-1991/world-al-summary.svg"
      alt="Display 1: Three-panel recreation of Figure 4 — world entities (walls, trees, plants, carnivores, agents), a closeup grid view of the southwest corner showing how those entities are arranged, and the seven-value observation vector each agent receives (visual detection north/south/east/west, in-tree status, health, energy, plus a constant bias unit), with a unit-value legend showing how magnitude is encoded as dot size"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Recreated from Ackley &amp; Littman's (1991) Figure 4 — world entities, an example landscape closeup, and the per-agent observation vector, redrawn for legibility rather than copied pixel-for-pixel.</figcaption>
</figure>

## 3. Agent architecture: two networks, two very different fates

The central architectural idea is that **each agent carries two separate single-layer networks**, and the two are treated completely differently by the algorithm:

| Network | What it does | Where it comes from | What happens to it |
|---|---|---|---|
| **Evaluation network** | Maps the agent's observation to a scalar "goodness" value — its own internal sense of how good its current situation is | Fully genetically specified | Fixed for the agent's entire life; never touched by learning |
| **Action network** | Maps the observation to action probabilities — what the agent actually does | Genetically specified *initial* weights | A live copy is made at birth and adjusted every step by reinforcement learning |

This split is the whole point. The evaluation network is the genetically inherited **goal** — an innate, unlearnable sense of what "good" looks like. The action network is the **behavior** — how to act on that goal — and it is exactly the part evolution leaves unfinished, handing it to lifetime learning to fill in.

## 4. The learning rule: reinforcement from the agent's own goal, not an external reward

Ackley & Littman's agents never receive a reward signal from the environment. Instead, the reinforcement signal is generated entirely from the agent's own evaluation network, one step to the next:

> **R(t) = E(t) − E(t−1)**

In words: *am I better off now than I was a moment ago, by my own inherited sense of what "better" means?* If the evaluation score just rose, the action that was just taken gets reinforced; if it fell, that action gets discouraged.

The paper's own learning algorithm for applying this signal is **CRBP** (Complementary Reinforcement Back-Propagation) — a stochastic, threshold-based variant of backpropagation with separate learning rates for positive and negative reinforcement (η₊ and η₋), so the two directions can be tuned independently. The mechanism is: sample an action from the network's output probabilities, observe the resulting change in evaluation score, then nudge the action network's weights toward that action if the reinforcement was positive and away from it if negative — a form of complementary reinforcement learning that predates, and is structurally close to, the modern REINFORCE policy-gradient family.

## 5. The evolutionary layer: what gets inherited

At the genome level, each agent's evaluation-network and action-network weights are the heritable material, encoded in the paper as **redundant 4-bit-per-weight bit strings** rather than raw real numbers — a form of genetic redundancy intended to smooth the fitness landscape, in the same spirit as Hinton & Nowlan's `?` alleles. Reproduction between agents combines and mutates these bit strings in the usual genetic-algorithm way: crossover between two parents' genomes, followed by random mutation.

The critical architectural rule, and the one that makes this a genuine test of the Baldwin effect rather than Lamarckism, is:

**Reproduction copies the genome record — never the live, learning-adjusted action network.**

Whatever an agent's action network has learned during its life is discarded at death. Only the pre-learning genome (its *initial* action-network weights, plus the never-touched evaluation network) is passed on, subject to crossover and mutation. No information from the phenotype's lifetime experience ever crosses back into the genotype — the loop closes entirely through differential survival and reproduction, exactly as [the Baldwin effect requires](/learning-selection-interaction/baldwin-effect#3-the-mechanism-step-by-step).

## 6. The five conditions of the comparative study

To isolate what evolution and learning each contribute, the paper (and later replications of it) run the same world under five strategies that switch each mechanism on or off independently:

- **ERL** — evolution **and** learning combined: the full mechanism described above.
- **E** — evolution only: genomes evolve across generations, but the action network is never adjusted within a lifetime.
- **L** — learning only: every agent starts from the same fixed genome (no heritable variation), and only within-lifetime reinforcement learning operates.
- **F** — fixed: neither evolution nor learning. Agents behave according to a static, unadapted network for the entire run.
- **B** — behave randomly: pure chance, agents choose actions with no learning and no meaningful evolved structure. The luck baseline.

Survival time under this comparative design is the paper's headline dependent variable — how long a population can persist in a world with permanent, growing predation pressure.

## 7. The headline finding, and why it was surprising

**Combined evolution-and-learning (ERL) produced far more long-surviving populations than evolution alone, learning alone, or no adaptation at all.** That part matches the expected story. What was surprising, by the paper's own account, is that **evolution alone did badly** — considerably worse than learning alone.

Ackley & Littman's explanation is the paper's most quoted insight, because it reframes what genes and learning are each good at:

> It is much easier to genetically specify a compact **goal** — a single evaluation-network weight amounting to "food is good," "carnivores are bad" — than to specify the full **behavior** needed to act correctly on that goal, which requires many correctly-tuned action-network weights working together.

In short: **genes encode *what to want*; learning fills in *how to get it*.** A genome that only has to encode a goal is searching a small, forgiving space. A genome that has to encode a complete, correct behavior policy directly — as the evolution-only condition requires, since nothing adjusts it during life — is searching a much larger and less forgiving one, and evolution alone struggles to find it before the population is wiped out by carnivores.

## 8. Two further findings beyond the basic Baldwin effect

The paper goes past demonstrating the effect and probes *how* it shows up mechanistically, using a technique it introduces for the purpose.

**Functional-constraint analysis.** For each genome site (each weight, in each network), the paper tracks how much that site's value changes across a lineage over many generations. A site under strong selective pressure gets *purged* of mutation — its value stays nearly constant across descendants, because deviating from it is costly. A site that doesn't matter for fitness drifts freely instead. Tracking this separately for evaluation-network sites versus action-network sites over the course of a run revealed a shift: **early** in a run, evaluation-network sites were the constrained ones — the learned goal was doing the fitness-relevant work. **Later**, action-network sites became constrained instead — the behavior itself had been genetically assimilated, meaning agents were now approaching food (or avoiding carnivores) instinctively, without needing to learn it each generation. That shift, measured directly rather than inferred, is a functional-constraint signature of genetic assimilation — the Baldwin effect caught in the act.

**Shielding.** A second, subtler phenomenon the paper identifies: when an innate ability is critical enough that agents effectively *must* be born with it already working — instinctive predator-avoidance is the paper's example — the corresponding evaluation-network genes for that domain stop mattering for fitness at all, because the action network reflexively avoids danger regardless of what the evaluation network says about it. Those evaluation-network sites can then drift freely; some agents can genuinely evolve to prefer the sight of a carnivore, by their own internal evaluation score, while remaining just as fit as agents that correctly regard carnivores as bad — because their hard-wired action network never gives that preference a chance to matter. Shielding is a Baldwin-effect side-consequence that a purely genotype-level analysis would never surface, and one Hinton & Nowlan's simpler model has no room to produce.

## 9. Why this is a meaningfully different demonstration than Hinton & Nowlan

Both papers demonstrate the same underlying phenomenon, but the differences matter for anyone deciding which one to model after:

- Hinton & Nowlan's genome is a flat bit-string mapped directly onto a single-optimum fitness landscape, with learning reduced to blind guessing. Ackley & Littman's genome specifies **two functionally distinct neural networks** — a goal and a policy — situated inside an actual spatial ecology with predation, food scarcity, and shelter.
- Learning in Hinton & Nowlan is undirected trial-and-error with a binary hit/miss outcome. Learning in Ackley & Littman is a genuine reinforcement-learning rule, driven by a continuously varying, agent-generated evaluation signal — structurally much closer to how biological learning (hunger, pain, dopaminergic reward-prediction-error) actually works.
- Ackley & Littman's five-condition design (ERL/E/L/F/B) isolates evolution's and learning's separate contributions explicitly, rather than comparing only "with learning" against "without."
- The functional-constraint and shielding analyses give the Baldwin effect a *measurable*, lineage-level genetic signature, rather than leaving genetic assimilation as something inferred only from aggregate population fitness curves.

This is why, in the wider literature on computational demonstrations of the Baldwin effect (see [The Baldwin Effect, §4](/learning-selection-interaction/baldwin-effect#computational-demonstrations-beyond-hinton-nowlan)), Ackley & Littman (1991) is treated as the model that moves the phenomenon from an abstract search-landscape toy into something structurally closer to an evolving population of RL-capable agents in an ecology — precisely the direction this site's own [PredPreyGrass](/learning-selection-interaction/predpreygrass) work continues.

## 10. This site's from-scratch replication

A ground-up rebuild of World AL and the ERL architecture described above — matching every exact numeric constant the paper actually publishes (grid size, sensing ranges, carnivore spawn interval, plant reseed floor) and clearly marking every constant the paper only describes qualitatively — is available in the [AckleyLittman1991](https://github.com/doesburg11/AckleyLittman1991) repository. Run at the paper's own comparative-study scale (5 conditions × 100 seeds × 1,000,000-step ceiling), it reproduces the paper's central result with real statistical power: combined evolution-and-learning significantly beat evolution alone, learning alone, no adaptation, and pure random behavior (p < 0.00001 against all four, Mann-Whitney U, n = 100 seeds per condition), and internally reproduces the paper's own "surprising" finding that learning-alone beats evolution-alone.

That replication's learning rule is a standard REINFORCE policy-gradient update rather than the paper's exact CRBP backpropagation scheme, and its genome is real-valued weights with Gaussian mutation rather than the paper's redundant 4-bit-per-weight bit-string — documented simplifications, not attempts to improve on the original design.

The same architecture — an evolved evaluation network paired with a live-learned action network, reproduction reading only from the genome record — was then carried, with further adaptation, into this project's own predator-prey ecology as Trial 12 of the [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log): the first trial in that log to produce a statistically decisive positive result after eleven prior trials on a different, shared-policy architecture came back null.

## References

- Ackley, D. H., & Littman, M. L. (1991). "Interactions Between Learning and Evolution." In C. G. Langton, C. Taylor, J. D. Farmer, & S. Rasmussen (Eds.), *Artificial Life II*, 487–509. Addison-Wesley.
- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1(3), 495–502.
- Baldwin, J. M. (1896). "A New Factor in Evolution." *The American Naturalist*, 30(354), 441–451 & 536–553.
