---
id: highlights
title: Highlights
description: The site's strongest results and hardest-won findings in one place, ranked, each linked back to the full evidence and trial history behind it.
slug: /highlights
---

# Highlights

[Evidence So Far](/evidence-so-far) is the full audit: every track, honestly labeled as confirmed, demonstration, null, or non-replication. This page is shorter and more selective — the results and findings worth knowing about even if you read nothing else, in roughly descending order of how load-bearing they are for the site's central claim. Read it as a map into the deeper pages, not as a substitute for their caveats.

## 1. Combined evolution and learning beat every alternative

The [Ackley & Littman (1991) replication and its Trial 12 extension](/learning-selection-interaction/darwin-baldwin-trial-log) ran a full 500-run comparative study — 5 conditions × 100 seeds × a 1,000,000-step ceiling, matching the original paper's own scale. Combined evolution-and-learning beat evolution alone, learning alone, no adaptation, and pure random behavior, **p < 0.00001 against all four** (Mann-Whitney U, n = 100 per condition). This is the site's own designated [Main Result](/evidence-so-far#main-result) — the cleanest evidence for the two-timescale claim everything else on the site builds toward.

It came after ten straight null or inconclusive trials (1–10) under a shared-policy architecture where the genome could only act on behavior indirectly. Trial 12 changed the architecture — giving each agent its own genome-conditioned network — not the trait, and that's what finally made the effect visible. The nulls weren't wasted motion; they correctly diagnosed the actual limitation.

## 2. A hand-designed strategy beats the project's own literal fitness reward

[Trial 13](/learning-selection-interaction/darwin-baldwin-trial-log#trial-by-trial-ledger), run in the project's richer flagship predator-prey-grass ecology, is the most thoroughly diagnosed single result in the trial history. A cautious, predator-avoiding strategy beats a reckless one decisively once the two compete for the same resources (complete exclusion within ~27 generations, reversed in 0 of 10 seeds) — and beats flagship's own "+10 on reproduction" reward signal too, 27 of 30 seeds, p = 0.000008. The honest caveat that makes this a finding rather than a trophy: the winning strategy was hand-designed, not evolved. A follow-up with a stronger pooled learner let evolution discover something like it on its own, but only in 3 of 30 seeds (10%) — real and reproducible, but rare, pointing at founder-effect luck rather than a fixable bottleneck.

## 3. Two foundational-replication successes, hard-won

- [Leibo et al. (2017)](/learned-cooperation/leibo2017): independent DQN learners in Gathering and Wolfpack produce policies whose induced payoffs satisfy the classical dilemma inequalities — reproduced at reduced scale (not yet the paper's own 40M-step training budget).
- [Foerster et al. (2018)](/learned-cooperation/foerster2018): tracking down the authors' own reference implementation surfaced the paper's real Table 4 delta (0.5), closing half of an asymmetric-pairing gap that a from-scratch build alone had left open — alongside a genuine bug caught in the REINFORCE baseline along the way.

## 4. Boyd & Richerson (2009) — confirmed, with an independent refinement

Both replications — [Culture](/evolved-cooperation/boyd-richerson-2009-culture) and [Voting With Your Feet](/evolved-cooperation/boyd-richerson-2009-voting-with-feet) — reproduce their source paper's claims: cultural group selection survives a far lower migration/selection ratio than genetics, and payoff-biased migration spreads group-beneficial behavior. Culture also adds an independently confirmed refinement to the paper's own homogenization threshold; Voting With Your Feet adds a welfare check the original paper doesn't run, showing that spreading the behavior label doesn't reliably raise welfare.

## 5. Two honest non-replications

[Hughes et al. (2018)](/learned-cooperation/hughes2018)'s headline Cleanup claim — that inequity aversion raises cooperation — does not reproduce: baseline beat the guilt-shaped condition in 6 of 6 seed comparisons, the opposite of the paper's own figure. Under-training, miscalibration, and seed noise were each checked directly and ruled out. [McKee et al. (2023)](/learned-cooperation/mckee2023)'s reputation claim can't even be tested here — training collapses to near-zero cleaning before reputation dynamics could matter, in both conditions, including with the mechanism disabled entirely. Both papers share the Cleanup environment, which is itself a pattern worth taking seriously.

## 6. A decisively closed-out null result

The [reward-density comparison](/learning-selection-interaction/darwin-baldwin-trial-log#trial-by-trial-ledger) tested sparse vs. dense/shaped reward across five sibling PredPreyGrass modules. Sparse reward won outright on reproduction rate, population balance, and extinction avoidance against all four denser variants — a rare case of a null-hypothesis-style question getting a clean, fully replicated, ranked answer instead of an ambiguous one. The same investigation also surfaced and fixed two silent RLlib data-integrity bugs that had been present since Trial 1.

## 7. Reusable infrastructure: the drift-vs-selection tool

Built to resolve one ambiguous Trial 13 result, the project's Hunt (2006)/Lande (1976) drift-vs-selection model-fitting tool turned into standing infrastructure — now wired into six modules. It confirms prior null verdicts with a formal statistical test rather than an eyeballed trend, and along the way caught a real directory-matching bug and flagged an unresolved anomaly in the nuptial-gift module.

## Where this leaves the argument

None of this adds up to a finished human-specific model of cooperation and competition — see [Evidence So Far](/evidence-so-far#open-questions) for what's still open. What it does show is a two-timescale mechanism (evolution across generations, learning within lifetimes) that reliably outperforms either half alone once the architecture gives the genome a real channel into behavior, plus a research process willing to spend a dozen trials chasing down *why* a result was null instead of settling for the null.
