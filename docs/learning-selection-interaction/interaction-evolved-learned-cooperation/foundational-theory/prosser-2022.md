---
id: prosser-2022
title: The Prosser (2022) Models
sidebar_position: 13
slug: /learning-selection-interaction/prosser-2022
---

# The Prosser (2022) Models

Source code: [Prosser2022](https://github.com/doesburg11/Prosser2022) repository.

## 1. The question the thesis asks

Nearly every prior model of the Baldwin effect — [Hinton & Nowlan (1987)](/learning-selection-interaction/hinton-nowlan-1987) included, and [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991) too — treats behavioural or genetic traits as independent: each locus, each weight, is mutated and potentially assimilated on its own. David Prosser's 2022 PhD thesis, *The Interaction Between Lifetime Learning and Evolution* (University of Southampton), asks what changes when learning instead acts on *correlated groups* of traits, with the correlation structure itself evolving alongside the traits it links.

The thesis tests this question through two different causal mechanisms rather than one, because "learning acts on correlated traits" can mean genuinely different things depending on *what* learning is allowed to touch:

- **Correlated Behaviours (CB)** — learning directly re-tests combinations of innate behaviours together, biased by their evolving genetic correlation.
- **Environment Selection (ES)** — learning never touches behaviour directly; it only selects which of several candidate environments the individual develops in, indirectly changing which selection pressure acts on its genetically-determined behaviour.

Both, the thesis argues, relax the classical necessary conditions for genetic assimilation — a cost of learning, a correlation between genotype-space and phenotype-space movement, a stable learnt target — that models like Hinton & Nowlan's depend on. Whether that relaxation looks the same for both mechanisms is the thesis's central empirical question.

## 2. The shared substrate

Both models are built on the same underlying object and evaluated against the same pair of synthetic landscapes.

**The correlation matrix.** A population-mean correlation matrix `B` (n×n, one entry per pair of traits) is mutated under a strong-selection-weak-mutation (SSWM) regime: one mutation is tested at a time and kept only if it doesn't reduce fitness. This is what "the correlation structure evolves" means concretely — `B` itself is heritable material, not a fixed analysis artifact computed after the fact.

**Two fitness landscapes**, both borrowed from prior evolvability literature:

| Landscape | Structure | Optima |
|---|---|---|
| **Modular Constraints (MC)** | `m` blocks of `k` traits; strong (1.0) connections within a block, weak signed connections (`p`) between blocks depending on whether the blocks' targets agree | Local optima wherever a block is internally resolved but disagrees with other blocks; exactly **two** global optima (the target phenotype and its sign-flipped complement) |
| **Concentric Squares (CS)** | Target is an image of alternating-sign concentric square rings; connections are purely local (each cell's 4 grid neighbours) | No explicit block hierarchy — a counterpoint to MC's clean modular structure |

**Fitness function:** `w(p) = p·C·pᵀ` — quadratic in the phenotype `p`, so it rewards correctly-signed *combinations* of traits acting together, not any single trait in isolation. `C` is the landscape's constraints matrix (MC's block structure or CS's local grid). This is what makes both landscapes genuinely multi-peaked rather than Hinton & Nowlan's single spike: a block (or ring) can lock onto either sign of its own local optimum independently of its neighbours, creating real local optima a single-trait search can get stuck in.

## 3. Model A: Correlated Behaviours (CB)

`B` starts as the **identity matrix** — no correlation beyond a trait with itself. Each generation, `n` mutations are tested (not `n²` — the thesis notes this is roughly 100× fewer fitness evaluations than the ESDP model it builds on, from Watson, Mills & Buckley 2011).

**The learning rule.** Within a lifetime, learning runs `η` trial-and-error steps. Each trial picks a random focal behaviour `c`; every other behaviour `y` whose correlation with `c` exceeds a random threshold has its sign flipped to match `c` ("trait flipping"), scaled by the correlation strength. With learning, a trial's change is kept only if it's fitter than what came before; without learning, every trial's change is kept unconditionally — so the no-learning control still *expresses* correlated behaviours, it simply never discards a worse combination once tried.

**Why correlation matters here:** as `B` strengthens through evolution, learning naturally scales up from flipping single behaviours to flipping whole correlated blocks at once. That's what lets it escape local optima that trial-and-error on independent traits, one at a time, cannot — a block stuck on the wrong internal sign can be flipped as a unit rather than needing each of its `k` traits to independently mutate the right way.

**Headline effect: the Baldwin Optimizing Effect.** With learning, evolution *reliably* reaches the global fitness optimum. Without it, only local optima are found, and not consistently — fitness wanders across a wide range run to run rather than converging.

## 4. Model B: Environment Selection (ES)

`B` starts at **zero** — complete absence of correlation. Each generation, `n²` mutations are tested, a substantially more expensive search than CB's `n`.

**The learning rule.** Learning never modifies behaviour. Instead, it samples `m` candidate environments and picks whichever one — once the genetically-determined behaviour has developed within it, via `η` steps of `p ← (1−τ)p + tanh(pB)` — yields the highest fitness. Without learning, only one candidate environment is available (`m = 1`), so there's nothing to select among.

**Why the usual assimilation test doesn't apply.** Genetic correlations and learning operate in genuinely different spaces here — a correlation matrix versus an environment vector — so the standard move of comparing genotype and learnt-phenotype configurations directly, which is how genetic assimilation is normally detected, has no natural analogue. The thesis instead treats the *shrinking diversity of phenotypes* produced over evolutionary time as the relevant signal that learning's influence has been absorbed into the genome.

**Headline effect: the Baldwin Expediting Effect.** Learning accelerates evolution — reaching high fitness markedly faster — but does not guarantee optimality. Evolution alone eventually gets there too on this landscape, just more slowly and less reliably.

## 5. Why the classical assimilation conditions aren't required

The textbook account of genetic assimilation (see [The Baldwin Effect, §10](/learning-selection-interaction/baldwin-effect#10-the-counter-hypothesis-the-mayr-effect) on the Mayr effect, and Mayley's cost argument) treats three ingredients as more or less necessary: a fitness cost to learning, a correlation between movement in genotype-space and movement in phenotype-space, and a stable target for the learnt trait to be assimilated toward. Both CB and ES depart from at least one of these — CB's no-learning control keeps every trial unconditionally, which is not what a "cost of learning" framing predicts should matter; ES's learning acts in a space (environment choice) structurally decoupled from the genotype it's supposedly informing. Both still show a learning–evolution interaction. The correlation structure itself, evolving as heritable material in its own right, is doing the work the classical conditions were assumed to be necessary for.

## 6. Why Optimizing differs from Expediting: a causal-space distinction

This is the thesis's sharpest finding, and it's worth stating precisely because it's easy to read the two effects as different strengths of the same thing rather than genuinely different mechanisms.

- **CB is direct.** Learning acts on the *same object* evolution modifies — correlated combinations of behaviour. When learning discovers a better combination, that discovery and the evolving correlation structure are operating on identical ground. This tight coupling is what produces a hard **Optimizing Effect**: in this site's own replication (§9 below), the CB model landed on the exact global optimum every time it was tried, not just a fitness improvement.
- **ES is indirect.** Learning acts on a *different object* — which environment to occupy — than what evolution modifies — the behaviour weights themselves. The two are connected only through the fitness consequences of development within a chosen environment, not through any shared representation. That looser coupling is what produces a softer **Expediting Effect**: faster progress, without a guarantee that evolution alone couldn't eventually match it.

Whether a given learning mechanism engages the *same* representation evolution is searching, or only an indirect proxy for it, predicts which of these two regimes to expect — a distinction with direct implications for how any future learning-plus-evolution architecture is designed, not just for reading Prosser's own results.

## 7. Why this is a meaningfully different demonstration than Hinton & Nowlan or Ackley & Littman

All three sit in the same lineage, but each isolates something the others can't:

- Hinton & Nowlan's genome is a flat 20-bit string over an all-or-nothing single-optimum landscape — no local optima exist at all, only the one spike and a featureless plain. Ackley & Littman's genome specifies two neural networks (goal and policy) embedded in a spatial ecology. Prosser's genome is neither a raw bit-string nor a network — it's a correlation matrix over traits, tested against landscapes (MC, CS) engineered to contain genuine local optima a naive search can get trapped in.
- This is the first model in the lineage where escaping a local optimum, not merely finding a gradient where none existed, is the thing learning has to accomplish — Hinton & Nowlan's landscape has no local optima to escape, and Ackley & Littman's ecology doesn't isolate the question in landscape terms at all.
- Because the thesis publishes every equation it uses, this replication is implemented directly from the thesis's own numbered equations (§4.1, §5.3, §6.2–6.3, §7.2–7.3) rather than reconstructed from a verbal description — a higher-fidelity starting point than Ackley & Littman (1991), which leaves most of its own constants unpublished.
- The repository's own account of its lineage makes the connection explicit: Hinton & Nowlan is "the theoretical precursor both this thesis and Ackley & Littman build on," and Ackley & Littman's per-agent genome/network architecture is "originally motivated by" this thesis's correlation-structure question.

## 8. This site's from-scratch replication

A from-scratch Python replication of both models — Correlated Behaviours and Environment Selection, against the Modular Constraints landscape — is available in the [Prosser2022](https://github.com/doesburg11/Prosser2022) repository.

**What's matched vs. simplified.** Every mutation rule, learning-trial rule, and fitness function is implemented directly from the thesis's numbered equations. One genuine correction was made during implementation: the thesis's Modular-Constraints target-phenotype formula is written with 1-indexed notation but only produces the alternating block structure described in the text (and its Figure 4.1) when implemented 0-indexed — confirmed with a dedicated test before anything was built on top of it. Not implemented: the thesis's noise-in-fitness experiments (§5.3.4's `ψ` term), the `rHN-G` connection-density variant beyond the basic version, and the Environment Selection model's analysis of which correlation type (within-block vs. between-block) learning favours over evolutionary time.

**Results at reduced scale** (the thesis itself runs up to 250,000 generations, 30 seeds, at `n=100`/`n=60`; this replication validates the qualitative finding at a scale that runs in seconds to minutes rather than hours):

| Model | With learning | Without learning | Global optimum |
|---|---|---|---|
| Correlated Behaviours (`n=25`, 4000 generations) | **130.00 (exact)** | 4.96 | 130.0 |
| Environment Selection (`n=12`, 1500 generations) | 47.68 | 23.92 | 48.96 |

Correlated Behaviours converges to and holds the exact global optimum; its no-learning control never stabilizes and ends well below it — a clean reproduction of the thesis's Optimizing Effect. Environment Selection's learning condition reaches a high-fitness plateau markedly faster and more consistently than its control, without a hard optimality guarantee either way — the Expediting Effect. Both figures were independently confirmed by re-running the same configurations through the packaged CLI entry points (`run_cb.py`, `run_es.py`) rather than only the underlying library functions, with a passing 27/27 test suite at the time.

**Where this points next.** The repository's own results notes flag the open question directly: if the correlation-structure idea is tested against the [PredPreyGrass ERL Baldwin genome](/learning-selection-interaction/darwin-baldwin-trial-log), which of these two causal routes — CB's direct engagement or ES's indirect one — it structurally resembles should predict how strong an effect to expect. That test hasn't been run; this repository is a faithful, standalone replication baseline, not yet a component of the PredPreyGrass work.

## References

- Prosser, D. (2022). *The Interaction Between Lifetime Learning and Evolution.* PhD thesis, University of Southampton, School of Electronics and Computer Science.
- Watson, R. A., Mills, R., & Buckley, C. L. (2011). "Global adaptation in networks of selfish components: Emergent associative memory at the system scale." *Artificial Life*, 17(3), 147–166.
- Kounios, L., Clune, J., Kouvaris, K., Wagner, G. P., Pavlicev, M., Weinreich, D. M., & Watson, R. A. (2016). "Resolving the paradox of evolvability with learning theory: How evolution learns to improve evolvability on rugged fitness landscapes." arXiv:1612.05955.
- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1(3), 495–502.
- Ackley, D. H., & Littman, M. L. (1991). "Interactions Between Learning and Evolution." In C. G. Langton, C. Taylor, J. D. Farmer, & S. Rasmussen (Eds.), *Artificial Life II*, 487–509. Addison-Wesley.
