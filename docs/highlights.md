---
id: highlights
title: Highlights
description: The site's strongest results and hardest-won findings in one place, ranked, each linked back to the full evidence and trial history behind it.
slug: /highlights
---

# Highlights

[Evidence So Far](/evidence-so-far) is the full audit: every track, honestly labeled as confirmed, demonstration, null, or non-replication. This page is shorter and more selective — the results and findings worth knowing about even if you read nothing else, in roughly descending order of how load-bearing they are for the site's central claim. Read it as a map into the deeper pages, not as a substitute for their caveats.

## 1. Combined evolution and learning beat every alternative

The [Ackley & Littman (1991) replication and its Trial 12 extension](/learning-selection-interaction/darwin-baldwin-trial-log) ran a full 500-run comparative study — 5 conditions × 100 seeds × a 1,000,000-step ceiling, matching the original paper's own scale. Combined evolution-and-learning beat evolution alone, learning alone, no adaptation, and pure random behavior, **p < 0.00001 against all four** (Mann-Whitney U, n = 100 per condition). This is the site's own designated [Main Result](/evidence-so-far#main-result) — evidence that the two mechanisms can improve population survival together in this task. It does not directly establish cooperation or explain human behavior.

It came after ten straight null or inconclusive trials (1–10) under a shared-policy architecture where the genome could only act on behavior indirectly. Trial 12 changed the architecture — giving each agent its own genome-conditioned network — not the trait, and that's what finally made the effect visible. The nulls weren't wasted motion; they correctly diagnosed the actual limitation.

## 2. Learning changes the direction a gene evolves

In [Trial 15](/learning-selection-interaction/predpreygrass-continuous/evolving-bodies), animals in the continuous PredPreyGrass world carry heritable body genes (top speed, view distance, field of view) and share one learning policy per species. Branched from one run, predator speed rose in all six runs where the predator policy kept learning and fell in all six where it was frozen (+0.18 on the gene's log scale, 95% CI +0.14 to +0.22, exact p = 0.005, a contrast fixed in advance), and from a second branch point the contrast was +0.19 (p = 0.005). The likely route: with speeds set by hand, extra speed paid about twice as much under the policies predators had learned. Where Trial 12 shows that evolution and learning together outperform either, Trial 15 shows the Baldwin-style link itself: learning steering which way a body trait evolves. The caveats: both branch points come from one training run, the learned policies differ from the frozen one in more than their use of speed, the learning is shared across a species rather than individual, and no arms race in bodies between predators and prey appeared.

## 3. Ethnocentrism falls when its marker stops tracking descent, and a Hamilton's-rule prediction held

In a Python port of the [Ethnocentrism model](/evolved-cooperation/kin-selection#kin-cues-the-ethnocentrism-model) (Hammond & Axelrod 2006), agents inherit a colour and two helping rules, one for neighbours of their own colour and one for other colours; ethnocentrics, who help only their own colour, become about three quarters of the population. Six pre-registered experiments asked whether that in-group helping works through kinship. When colour no longer passed from parent to offspring, the share of ethnocentric agents fell from 75.5% to 12.9% (how often help was given hardly changed, 77% vs 76% of meetings), and it stayed 43 points lower when the own-colour meeting share was matched. Shuffling positions, which reduced the relatedness among interacting neighbours to the random-mixing level, coincided with cooperation falling from 75.6% to 11.0% of meetings. A Hamilton's-rule prediction made in advance from measured relatedness got the direction of change in helper share right in all 8 conditions far from the threshold and in 6 of 8 close to it, with none reversed. The caveats: this is one lattice model, in which kin selection and network reciprocity describe the same process, and the experiments narrow other differences between conditions rather than removing them.

The hard-won part sits beside it. In the site's [Moran kin-selection model](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed), the spread from rare turned out to be weak altruism: helpers kept part of their own benefit, and help with a real net cost failed. Costly help spread in a later variant with overlapping generations, at benefit-to-cost ratios of 12 and 24 with local settlement, and failed at 12 under global-competitor replacement. With more ecology the result is partial. By the site's [broad definition](/evolved-cooperation/kin-selection#what-counts-as-kin-selection-here), a stepwise rebuild found costly care for one's own young spreading through the energy, starvation and limited-food steps, which the site counts as kin selection through parental care, but not yet once births went into free space, and costly help to non-offspring relatives was not carried into the ecological steps; an earlier ecological model could not separate helping from population survival. Establishing kin selection in a full ecological setting remains the goal ([From the Moran model to an ecological model](/evolved-cooperation/kin-selection#from-the-moran-model-to-an-ecological-model)).

## 4. Cooperation spread most reliably when helping paid the helper back

A pre-registered sweep of the [Retained Benefit](/evolved-cooperation/retained-benefit#a-pre-registered-sweep-of-the-retained-fraction) model varied how much of a cooperator's benefit is kept for itself and its own lineage, at three benefit-to-cost ratios, against a neutral control with no benefit and no cost (330 swept runs plus 10 neutral runs). All four registered predictions were met: at the model's demo ratio (b/c = 3), cooperation fell below neutral without retention (0.090 against 0.190) and rose to 0.792 with full retention, and at b/c = 8 it rose at every retained fraction, including none, because there the helper's own share already exceeded its cost. In an exploratory look, where the rise started broadly tracked whether a lone helper's own share of its benefit covers its cost.

In plain terms, and together with the kin-selection results above: cooperation spread most reliably when helping paid the helper back (weak altruism), while genuinely costly help to others, where the helper ends up worse off, spread only under narrow conditions such as close relatives as neighbours and a benefit far larger than the cost. For humans that is compatible with, but not evidence for, the idea that some cooperation began where helping benefited the helper, its offspring or close kin; large-scale sacrificial cooperation may depend on reputation, norms, institutions and culture, none of which these models include. The caveats: one abstract model for the sweep, a design that cannot separate the helper's own share from benefit to relatives, and results consistent with retention being needed rather than proof that it is. The fuller plain-language reading is on the [Evolved Cooperation](/evolved-cooperation#in-plain-terms) page.

## 5. A hand-designed strategy beats the project's own literal fitness reward

[Trial 13](/learning-selection-interaction/darwin-baldwin-trial-log#trial-by-trial-ledger), run in the project's richer flagship predator-prey-grass ecology, is the most thoroughly diagnosed single result in the trial history. A cautious, predator-avoiding strategy beats a reckless one decisively once the two compete for the same resources (complete exclusion within ~27 generations, reversed in 0 of 10 seeds) — and beats flagship's own "+10 on reproduction" reward signal too, 27 of 30 seeds, p = 0.000008. The honest caveat that makes this a finding rather than a trophy: the winning strategy was hand-designed, not evolved. A follow-up with a stronger pooled learner let evolution discover something like it on its own, but only in 3 of 30 seeds (10%) — real and reproducible, but rare, pointing at founder-effect luck rather than a fixable bottleneck.

## 6. Two foundational-replication successes, hard-won

- [Leibo et al. (2017)](/learned-cooperation/leibo2017): independent DQN learners in Gathering and Wolfpack produce policies whose induced payoffs satisfy the classical dilemma inequalities — reproduced at reduced scale (not yet the paper's own 40M-step training budget).
- [Foerster et al. (2018)](/learned-cooperation/foerster2018): tracking down the authors' own reference implementation surfaced the paper's real Table 4 delta (0.5), closing half of an asymmetric-pairing gap that a from-scratch build alone had left open — alongside a genuine bug caught in the REINFORCE baseline along the way.

## 7. Boyd & Richerson (2009) — confirmed, with an independent refinement

Both replications — [Culture](/evolved-cooperation/boyd-richerson-2009-culture) and [Voting With Your Feet](/evolved-cooperation/boyd-richerson-2009-voting-with-feet) — reproduce their source paper's claims: cultural group selection survives a far lower migration/selection ratio than genetics, and payoff-biased migration spreads group-beneficial behavior. Culture also adds an independently confirmed refinement to the paper's own homogenization threshold; Voting With Your Feet adds a welfare check the original paper doesn't run, showing that spreading the behavior label doesn't reliably raise welfare.

## 8. Two honest non-replications

[Hughes et al. (2018)](/learned-cooperation/hughes2018)'s headline Cleanup claim — that inequity aversion raises cooperation — does not reproduce: baseline beat the guilt-shaped condition in 6 of 6 seed comparisons, the opposite of the paper's own figure. Under-training, miscalibration, and seed noise were each checked directly and ruled out. [McKee et al. (2023)](/learned-cooperation/mckee2023)'s reputation claim can't even be tested here — training collapses to near-zero cleaning before reputation dynamics could matter, in both conditions, including with the mechanism disabled entirely. Both papers share the Cleanup environment, which is itself a pattern worth taking seriously.

## 9. Sparse rewards lead the tested shaping variants

The [reward-density comparison](/learning-selection-interaction/darwin-baldwin-trial-log#trial-by-trial-ledger) tested sparse reproduction-only rewards against four shaping variants across five sibling PredPreyGrass modules. Sparse gave the highest reproduction rates; pure dense reward was the only variant with an observed extinction at a fully trained checkpoint.

Each condition had **one training run**, followed by three evaluation seeds. These evaluation seeds do not constitute independent training replication. The finding supports retaining sparse rewards as the working baseline in this setting; it does not establish that dense rewards generally harm learning or that shaping cannot outperform sparse rewards. Reward frequency, objective alignment and credit assignment remain proposed explanations requiring controlled tests. The investigation also identified and fixed two RLlib data-integrity bugs.

## 10. Reusable infrastructure: the drift-vs-selection tool

Built to resolve one ambiguous Trial 13 result, the project's Hunt (2006)/Lande (1976) drift-vs-selection model-fitting tool turned into standing infrastructure — now wired into six modules. It confirms prior null verdicts with a formal statistical test rather than an eyeballed trend, and along the way caught a real directory-matching bug and flagged an unresolved anomaly in the nuptial-gift module.

## Where this leaves the argument

None of this adds up to a finished human-specific model of cooperation and competition — see [Evidence So Far](/evidence-so-far#open-questions) for what's still open. What the survival comparison shows is that evolution and lifetime learning together outperform either alone in the tested World AL task. It supports investigating their interaction in cooperation models; it does not establish that this architecture is necessary or sufficient for human cooperation. Trial 15 adds the other direction of the link: learning, here one policy shared by a species and trained across generations rather than within lifetimes, changing the course of evolution, from two starting points of one training run, consistent with learned behavior making a faster body pay. On the cooperation side, the clearest evolutionary result so far is narrower: in one lattice model, ethnocentrism was much more common when an inherited colour marker tracked descent, and breaking that link sharply reduced it, though the design did not isolate relatedness from every other difference.

## References

- Hammond, R. A., and Axelrod, R. (2006). *The evolution of ethnocentrism*. *Journal of Conflict Resolution*, 50(6), 926–936. https://doi.org/10.1177/0022002706293470
- van Doesburg, P. (2026). *PredPreyGrass: reward-shaping investigation, methodology and results*. Project documentation. https://github.com/doesburg11/PredPreyGrass/blob/2563a083bb3feb6401b3830a6c89f293859b0f33/predpreygrass/non_evolutionary/discrete_space/project_reward_shaping/README.md
