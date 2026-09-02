---
id: ackley-littman-1994
title: The Ackley & Littman (1994) Algorithm
sidebar_position: 1
slug: /evolved-cooperation/ackley-littman-1994
---

import GithubLink from '@site/src/components/GithubLink';

# The Ackley & Littman (1994) Algorithm

<GithubLink href="https://github.com/doesburg11/AckleyLittman1994" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes a from-scratch replication of Ackley &amp; Littman (1994), in the sibling <a href="https://github.com/doesburg11/AckleyLittman1994">AckleyLittman1994</a> repository.</div>

## 1. The question the paper asks

David Ackley and Michael Littman's follow-up to their own 1991 paper, *"Altruism in the Evolution of Communication"* (1994), asks a different question than [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991) did. That paper was about the interaction of learning and evolution. This one drops learning entirely and asks something else: **can costly, initially arbitrary signaling evolve and stabilize even when it provides no direct benefit to the signaler?**

Genuine communication is a puzzle for Darwinian evolution precisely because a costly, honest signal looks like it should be selected *against* — the signaler pays a price (attention from a predator, energy, lost opportunity) for information that benefits someone else. Existing computational models of the time sidestepped the puzzle by building the payoff in directly: reward the speaker whenever a listener acts correctly on their signal, so "truthful speech" and "right action" simply rain fitness down on both parties by construction. Ackley & Littman set out to show the harder result: that altruistic signaling can emerge *without* any such built-in reward, from initially arbitrary genes, using only a structural fact about populations — that communication tends to reach nearby individuals, and nearby individuals tend to be relatives.

## 2. Individual level: a genome-grown network, and no learning at all

Where 1991's agents carried two separate networks (an inherited *goal* and a lifetime-*learned* policy), this paper's agents have neither learning nor that split. Each individual is a single 32-unit linear-threshold network, entirely and permanently specified by a 448-bit genome, via an indirect, graph-traversal-style **developmental process** rather than a direct weight encoding:

- The genome's 405 synaptic-specification bits are read sequentially as fifty 8-bit connection specifiers (a 5-bit unit index plus a 3-bit weight specifier), operating a "current unit" pointer that starts in **source mode** at a genetically specified unit. Two of the eight weight-specifier values are mode-shift codes — one retargets the current unit and re-enters source mode, the other does the same for destination mode (except when the target is an input unit, where it does nothing, since growing an incoming connection into a unit whose value is always overwritten by the environment would be meaningless). The other six values each grow one new connection, in source or destination mode, at one of six fixed symmetric weights.
- The remaining 19 initial-state bits set each computed unit's starting value fresh at the beginning of every trial; 24 unused "pseudo genes" pad the genome to its full specified length so crossover operates over the whole thing, without ever being decoded into anything.
- Behavior is then completely fixed for that individual's entire life. There is no plasticity in this paper at all — a deliberate contrast with 1991, isolating a different question entirely: not what learning contributes, but what pure evolution plus population *structure* can do on its own.

## 3. Local level: a day in the life of a subpopulation

The environment ("World AL," reused and renamed from 1991, but restructured for this paper) is organized in three nested levels: individual, local, and global. The local level is a single subpopulation of 8 individuals living in a shared, partially-connected environment:

- Each individual lives in its own horizontal **track**, divided into 4 locations (L, 1, 2, R). Tracks block vision between individuals but let non-localized *sound* pass over — any individual may speak on any of 6 audio channels each step, and hear the sum of everything spoken by the whole subpopulation on the previous step.
- A **day** consists of 36 trials: the 9 possible combinations of a Pred/Food/nothing stimulus at each of the two track ends (L and R), repeated 4 times each. A Latin-square location-assignment scheme guarantees every individual starts at each of the 4 locations exactly once per stimulus pair, regardless of randomness — which makes a subpopulation's aggregate behavioral score, absent any actual communication, a fully deterministic function of the stimuli.
- Each trial runs 3 steps; an individual may move toward L or R (at a cost) and/or speak, and is scored at the trial's end from a fixed score-vector table keyed by final location and which stimuli were present.
- At day's end, a **local reproduction** may occur: individuals ranked by score, two parents drawn uniformly from the top half, one offspring produced by crossover, and one of the 8 killed uniformly at random and replaced.

The paper states one number precisely enough to check independently: an individual that never moves at all — by far the most probable outcome of a random genome — scores **exactly -696** over a full day. That number falls out purely from the fixed score-vector table and the Latin-square location-coverage guarantee, with nothing tuned to hit it, which makes it a genuine correctness check rather than a fitted result.

## 4. Global level: the paper's actual experimental variable

Section 2.3 is where the paper's real content lives. A single subpopulation converges almost immediately to a degenerate, low-scoring strategy and stops changing — as the authors put it, "the tiny group converges, genetically, in a flash, usually with very poor behavioral scores." To get anywhere interesting, many subpopulations have to evolve at once, with individuals occasionally moving between them. That's the global level: a **128×128 torus** of these local subpopulations — 131,072 individuals in total — with two mechanisms, usable alone or combined, for letting individuals cross between cells.

<figure style={{ margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', overflow: 'hidden' }}>
    <div className="blue-banner">
      <div className="blue-banner-title">Summary of World AL's global level</div>
      <div className="blue-banner-subtitle">Ackley &amp; Littman's (1994) Section 2.3: the 128×128 torus grid of local-level subpopulations, wind migration, and festival reproduction with its phase-shifted quad grouping.</div>
    </div>
    <img
      src="/img/evolved-cooperation/ackley-littman-1994/global-level-summary.svg"
      alt="Display 1: Three-panel summary of the global level — a torus grid of subpopulations with one quad (2x2 block) highlighted; wind migration, showing one individual per cell moving downwind into the exact slot its destination's own emigrant just vacated; and festival reproduction, showing a 32-individual quad tournament plus the four-phase quad-grouping shift that lets every cell eventually partner with all eight of its neighbors."
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> The global level (Section 2.3) — the grid, wind migration, and festival reproduction with its phase-shifted quad grouping.</figcaption>
</figure>

**Wind** is simple migration. On a windy day (its own periodic schedule — e.g. every 5th day), after that day's normal scoring: one global compass direction is drawn uniformly from the 8 possibilities, then independently in every cell one individual is picked uniformly at random to emigrate. All selected individuals move downwind simultaneously, and each immigrant lands in the *exact* slot its destination cell's own emigrant just vacated — a synchronized, population-preserving swap, not a sequential process and not an addition.

**Festival** combines migration with reproduction. On a festival day (its own periodic schedule — e.g. every 2nd day), instead of each cell reproducing locally, the grid's 4,096 non-overlapping 2×2 quads each hold their own tournament: the 32 individuals across the quad's 4 cells are ranked together by that day's score, two parents are drawn uniformly from the top quarter, one offspring is produced by crossover, and one of the 32 is killed uniformly at random and replaced — in whichever cell it happened to live in. On successive festival days, the quad grouping itself is **phase-shifted** — the same technique used for the Margolus neighborhood in block cellular automata — so that after 4 festivals, any given cell has been grouped, in some quad, with all 8 of its neighbors.

Both mechanisms exist for the same reason: to make **communication range** (who hears you) and **breeding range** (who you might reproduce with) *mostly, but not always,* the same population. That partial correlation is the entire mechanism the paper's kin-selection argument rests on.

## 5. Why "mostly, not always" — the theoretical payoff

If communication range and breeding range coincided perfectly, a subpopulation would converge to whatever it started with and never explore further — exactly the degenerate, single-cell failure mode the global level exists to avoid. If they were uncorrelated instead, an individual's costly signal would benefit strangers as often as kin, and ordinary kin selection (Hamilton's rule: help a relative in proportion to relatedness) would have nothing to grab onto — a costly signal that helps random strangers just as often as kin is a pure loss for the signaler's genes, and should be selected against. Migration that's frequent enough to prevent premature convergence, but structured enough that most of an individual's neighbors are still recent relatives, is what lets an initially arbitrary, costly signal get an actual kin-selected foothold — "you'll be talking to family" most of the time, which is enough for the signal's benefit to redound, on average, to the signaler's own genetic line.

The paper is equally about the other side of that coin: **communicating subpopulations are chronically exploitable.** A non-communicating or actively deceptive genotype that happens to invade a communicating group can free-ride on the signal (or worse, exploit it) without paying the signaling cost — an "information parasite." Whether communicators can hold territory against these parasites, and for how long, turned out to depend heavily on *which* migration mechanism was in play.

## 6. Three case studies

The paper reports three long single runs at the full 128×128/131,072-individual scale — their own runs took, in their words, "multiples of weeks" of wall-clock time even on a dedicated parallel machine:

- **Case 1 — wind-only** (every 5th day windy, run 13,110 days): cautiously communicating subpopulations repeatedly emerge and expand, but are never able to hold more than a handful of cells at once — self-reliant, non-communicating "cheater" genotypes (scoring around -12, the best a non-communicator can do) keep re-invading and squeezing them out. Under pure wind, "you'll be talking to strangers" often enough that kin altruism has a hard time stabilizing.
- **Case 2 — wind and festival together** (festival every 2nd day, wind every 10th, run 14,580 days): festival's more localized, group-cohesive migration gives communicators noticeably more staying power — for a stretch around day 3,000-5,000, the population-wide *average* behavioral score briefly exceeds -12, meaning the typical subpopulation was, on balance, benefiting from communication. Still an ongoing back-and-forth between competing communicating and non-communicating lineages, not a stable endpoint.
- **Case 3 — festival-only** (festival every 2nd day, no wind, run 99,980 days): the longest run, with the richest reported dynamics — successive waves of distinct communicating "species" (identified by their behavioral score) rise, spread, get invaded by disruptive non-communicators, and are periodically displaced by newly evolved variants, an ongoing arms race rather than convergence to one dominant strategy.

None of the three cases ends in a fixed, stable population of communicators. The paper's own framing for this is a real long-term evolutionary social dilemma: communication is a genuine, recurring adaptation, and it is also permanently exploitable, and which effect wins locally keeps shifting.

## 7. Why this is a different kind of demonstration than Ackley & Littman (1991) or Hinton & Nowlan (1987)

It's easy to assume a same-authors sequel demonstrates the same phenomenon at greater scale. It doesn't:

- [Hinton & Nowlan (1987)](/learning-selection-interaction/hinton-nowlan-1987) and [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991) are both about the [Baldwin effect](/learning-selection-interaction/baldwin-effect) — lifetime learning smoothing a fitness landscape that pure evolution struggles to search. This paper's individuals have **no learning or plasticity whatsoever**; behavior is fully and permanently fixed by the genome's developmental process.
- The adaptive lever here is entirely different: not an individual capacity (learning), but a **population-structure** parameter — how migration correlates communication range with breeding range. The question shifts from "what does learning contribute?" to "what can spatial structure alone make possible?"
- Where 1991 varied a single population's internal mechanism (evolution vs. learning vs. both), this paper holds the individual level and local level fixed and varies the **global** level instead — the three case studies are a controlled comparison of *migration regimes*, not of *adaptive mechanisms*.

That's why this page is filed under **Evolved Cooperation** rather than alongside its same-authors predecessor: the adaptive mechanism under study is pure selection acting on population structure, not learning. Readers arriving from [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991) should treat this as a related but structurally distinct sequel — same authors, same "World AL" lineage, a genuinely different question, and a useful contrast for this site's own replication work: what changes when you strip lifetime learning out of the picture entirely and vary reproductive and migratory structure instead.

## 8. This site's from-scratch replication

A ground-up rebuild of the paper's individual, local, and global levels — matching every exact numeric constant it publishes (the 448-bit genome layout, the 36-trials-per-day structure, the -696 never-moving score, the 128×128/131,072-individual grid scale, the 4,096-quad festival partition) — is available in the [AckleyLittman1994](https://github.com/doesburg11/AckleyLittman1994) repository.

**Local level**: 25/25 unit tests passing, including a direct, independent validation against the paper's own stated number — a never-moving individual scores exactly -696 over a full day, computed purely from the score-vector table and the Latin-square location-coverage scheme, with nothing fitted to reach it.

**Global level**: the grid, wind migration, and festival reproduction (with its phase-shifted quad grouping) are implemented and validated with 31/31 tests, including deterministic checks that don't just run the mechanism but assert the specific properties that would only hold if it were implemented correctly — that wind migration is an exact, identity-tracked, population-preserving permutation; that a quad's parent pool is provably restricted to the top quarter; and that a given cell's quad-partners across the 4-phase cycle exactly equal its 8 Moore neighbors, matching the paper's own stated Margolus-neighborhood coverage guarantee.

Since even a modest-scale run is dominated by 131,072 individuals' worth of per-day scoring, the per-cell scoring step (independent by construction, since each cell owns its own random-number stream) is parallelized across worker processes — measured at a 7.7× wall-clock speedup on a 32-core machine, with byte-identical output to a single-threaded run confirming the parallelization changes nothing about the result.

As of this writing, Case 1 (wind-only) is running at the paper's full published scale; Cases 2 and 3 have not yet been launched, pending Case 1's outcome and a decision on the wall-clock budget for the much longer festival-based cases. See the repository's `RESULTS.md` for current status and validation detail.

## References

- Ackley, D. H., & Littman, M. L. (1994). "Altruism in the Evolution of Communication." In R. A. Brooks & P. Maes (Eds.), *Artificial Life IV*, 40–48. MIT Press.
- Ackley, D. H., & Littman, M. L. (1991). "Interactions Between Learning and Evolution." In C. G. Langton, C. Taylor, J. D. Farmer, & S. Rasmussen (Eds.), *Artificial Life II*, 487–509. Addison-Wesley.
- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1(3), 495–502.
