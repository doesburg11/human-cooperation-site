---
id: hinton-nowlan-1987
title: The Hinton & Nowlan (1987) Algorithm
sidebar_position: 9
slug: /learning-selection-interaction/hinton-nowlan-1987
---

import BaldwinNeedleHaystack from '@site/src/components/BaldwinNeedleHaystack';
import GithubLink from '@site/src/components/GithubLink';

# The Hinton & Nowlan (1987) Algorithm

<GithubLink href="https://github.com/doesburg11/HintonNowlan1987" />

## 1. The question the paper asks

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Geoffrey Hinton and Steven Nowlan's *"How Learning Can Guide Evolution"* (1987) asks the question that gives the [Baldwin effect](/learning-selection-interaction/baldwin-effect) its modern computational footing: if a fitness landscape is so unforgiving that a genetic search has no gradient to climb at all — a single needle in an astronomically large haystack — can within-lifetime learning manufacture a gradient where none exists, purely by changing which genotypes survive to reproduce?</div>

The paper answers with the smallest model that can make the point unambiguously: a flat bit-string genome, an all-or-nothing fitness function, and learning reduced to its most minimal possible form — blind, undirected guessing. There's no neural network, no environment, no agent behavior for the result to hide behind; everything interesting follows purely from how spare the setup is.

## 2. The genome and the needle-in-a-haystack landscape

Each individual's genome is a string of 20 genes, each taking one of three values:

| Symbol | Meaning |
|---|---|
| `1` | correct allele, fixed by genetics — "innate knowledge" |
| `0` | incorrect allele, fixed by genetics |
| `?` | plastic allele — left undetermined, resolved by learning during the individual's life |

Of the 2²⁰ possible phenotypes (each gene read out as correct or incorrect), exactly **one** — all 20 genes correct — receives high fitness. Every other phenotype, including one that is wrong on a single gene, receives the same low baseline fitness. There is no partial credit for being close: a genome with 19 of 20 genes correct scores identically to one with none correct, so a pure genetic search — no learning at all — has no slope to follow. It has to land on the exact answer by chance, in a space of over a million possibilities.

## 3. The learning mechanism: blind guessing, not directed search

This is what makes the model a clean test of the *general* principle rather than a demonstration tied to some particular learning algorithm. Within its lifetime, an individual with any fixed-incorrect (`0`) gene can never express the correct phenotype, no matter how much it learns — that gene is wrong forever. But an individual whose non-plastic genes are all correct has a real, calculable shot: it can try random 0/1 settings for its `?` genes, up to roughly 1,000 trials, and if any trial happens to land on all-correct, that setting is adopted (learned) for the rest of its life.

With *k* plastic genes remaining, each trial succeeds with probability 0.5^k, independently. Fitness is then a function of how many trials it took to succeed:

- succeeds on trial 1 (few or no plastic genes needed) → fitness at or near the maximum of 20
- succeeds late in the 1,000-trial budget → fitness barely above baseline
- never succeeds within the budget → fitness = 1, the same baseline as a fixed-wrong genome

## 4. Why this manufactures a gradient

This is the mechanism's entire payoff, worth stating precisely: **genomes with fewer plastic genes remaining are more likely to solve the puzzle quickly, so genomes closer to the answer score higher on average — smoothly, not in an all-or-nothing spike.** A genome three genes away from the answer (k=3 remaining) has a 1-in-8 chance per trial and will typically succeed within a handful of tries; a genome ten genes away has roughly a 1-in-1,024 chance per trial and will usually exhaust its budget without success. Expected fitness climbs continuously as k falls, even though the underlying phenotype-level fitness function never stopped being all-or-nothing. Learning is what turns that spike into a slope selection can climb one step at a time.

<BaldwinNeedleHaystack />

## 5. The algorithm: Holland's GA, with one twist in the fitness function

The reproduction machinery is a standard generational genetic algorithm — fitness-proportionate (roulette-wheel) selection, single-point crossover, and per-gene mutation, exactly as described in Holland's *Adaptation in Natural and Artificial Systems* (1975). Hinton & Nowlan didn't invent a new algorithm; their contribution is the plastic-allele fitness landscape laid on top of it, which is what turns an otherwise hopeless needle-in-a-haystack search into something Holland's GA can make visible progress on.

1. **Initialize** a population of 1,000 individuals. Each gene is independently correct with probability 0.25, incorrect with probability 0.25, and plastic with probability ≈0.5.
2. **Evaluate fitness** of every individual through the learning process above.
3. **Select** parents by fitness-proportionate selection.
4. **Crossover**: single-point crossover between parent pairs.
5. **Mutate**: each gene independently has a small probability of becoming a random allele (correct/incorrect/plastic).
6. **Repeat** for 50 generations, tracking the population-wide proportion of correct, incorrect, and plastic alleles at each step.

## 6. The headline finding

Running this for 50 generations produces a specific, reproducible trajectory:

- **Incorrect alleles collapse almost to zero** by around generation 15 — a fixed-wrong gene dooms an individual no matter how well it learns, so selection purges it fast and early.
- **Correct alleles rise** from ~25% at initialization to ~75% by the end of the run, driven entirely by the fitness gradient learning creates around the single correct genotype.
- **Plastic alleles decline but never disappear**, settling at roughly 24% rather than trending toward zero. This is the paper's central and most quoted finding: learning smooths the landscape enough for evolution to make real progress, but genetic assimilation — genes taking over what learning used to do — is only ever partial.
- **Mean population fitness** climbs from 1 to roughly 19 over the run, while **best-individual fitness** reaches the maximum of 20 as soon as one low-plasticity, high-fitness individual appears for selection to amplify — typically around generation 15.

## 7. Why this is a genuine Baldwin effect, not Lamarckism

The architectural rule that makes this a real test of Baldwin's proposal, rather than the inheritance of acquired characteristics, is easy to state and easy to miss: **nothing learned during a lifetime is ever written back into the genome.** An individual that succeeds in learning its plastic genes' correct settings does not pass those settings on — it passes on the same genome it was born with (`1`, `0`, `?` at each locus), subject only to ordinary crossover and mutation. What's inherited is never the *answer* an individual found; it's a genetic predisposition — fewer plastic genes, more of them already fixed correct — that happens to make the same answer easier for its offspring to find on their own. The loop closes entirely through differential survival and reproduction, exactly as [the Baldwin effect requires](/learning-selection-interaction/baldwin-effect#3-the-mechanism-step-by-step).

## 8. A model built to be extreme — and criticized for it

Hinton & Nowlan's landscape is deliberately the harshest possible case: truly zero partial credit anywhere except the single optimum. That's what makes the result unambiguous, but it's also the model's most criticized feature. Some later analyses argue that the paper's specific population size (1,000) and learning-trial budget (~1,000) were chosen in a region of parameter space that flatters the effect, and that the advantage shrinks — or vanishes — under smaller populations or tighter, more resource-realistic learning budgets. It remains the field's standard illustration of the Baldwin effect precisely because it isolates the mechanism so cleanly, but it is not an uncontested demonstration, and its numeric parameters shouldn't be read as biologically calibrated.

## 9. Why this is a meaningfully different demonstration than Ackley & Littman

Both this paper and [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991) demonstrate the same underlying phenomenon, but from opposite ends of the abstraction spectrum:

- Hinton & Nowlan's genome is a flat 20-bit string mapped directly onto a single-optimum landscape. Ackley & Littman's genome specifies two functionally distinct neural networks embedded in an actual spatial ecology with predation, food scarcity, and shelter.
- Learning here is undirected trial-and-error with a binary hit/miss outcome per trial — the simplest possible learning rule, chosen specifically to show the effect doesn't depend on anything sophisticated. Ackley & Littman's learning is a genuine reinforcement-learning rule driven by a continuously varying, agent-generated evaluation signal.
- This model has, in effect, one condition: learning is either in the loop (plastic genes present) or not, and the contrast is implicit in the fitness formula itself. Ackley & Littman's five-condition design (ERL/E/L/F/B) isolates evolution's and learning's separate contributions explicitly.
- Nothing here is spatial, social, or behavioral — it's a pure demonstration of gradient manufacture. Ackley & Littman add functional-constraint and shielding analyses that give the effect a measurable, lineage-level genetic signature within a population of agents that actually move, eat, and fight.

The two papers are usually cited together for exactly this reason: Hinton & Nowlan proves the logic works in its purest, least contestable form; Ackley & Littman shows the same logic survives being embedded in something structurally much closer to an evolving population of situated, behaving creatures.

## 10. This site's from-scratch replication

A from-scratch Python reimplementation of this exact model — matching the paper's population size, generation count, gene count, and initialization probabilities — is available in the [HintonNowlan1987](https://github.com/doesburg11/HintonNowlan1987) repository. It reproduces the paper's reported trajectory: incorrect alleles collapse to near zero by generation 15, correct alleles rise from ~25% to ~75%, and plastic alleles decline but persist at roughly 24% rather than disappearing — matching Hinton & Nowlan's own published figures.

One implementation choice worth flagging: fitness evaluation is vectorized using a closed-form geometric-distribution calculation rather than literally simulating up to 1,000 random guesses per individual per generation — statistically equivalent to the paper's procedure and substantially faster to run, not a change to the underlying algorithm.

The interactive figure in §4 above runs the same 20-locus lock and the same learning-vs-no-learning contrast live in the browser — at a smaller population size chosen for real-time responsiveness — rather than replaying a pre-rendered plot.

## References

- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1(3), 495–502.
- Holland, J. H. (1975). *Adaptation in Natural and Artificial Systems*. University of Michigan Press.
- Baldwin, J. M. (1896). "A New Factor in Evolution." *The American Naturalist*, 30(354), 441–451 & 536–553.
- Santos, M., Szathmáry, E., & Fontanari, J. F. (2015). "Phenotypic plasticity, the Baldwin effect, and the speeding up of evolution: the computational roots of an illusion." *Journal of Theoretical Biology*. Preprint: arXiv:1411.6843.
- Ackley, D. H., & Littman, M. L. (1991). "Interactions Between Learning and Evolution." In C. G. Langton, C. Taylor, J. D. Farmer, & S. Rasmussen (Eds.), *Artificial Life II*, 487–509. Addison-Wesley.
