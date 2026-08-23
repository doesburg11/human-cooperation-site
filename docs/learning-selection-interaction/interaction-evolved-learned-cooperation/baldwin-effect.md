---
id: baldwin-effect
title: The Baldwin Effect
sidebar_position: 8
slug: /learning-selection-interaction/baldwin-effect
---

import BaldwinNeedleHaystack from '@site/src/components/BaldwinNeedleHaystack';
import BeyondBaldwinDiagram from '@site/src/components/BeyondBaldwinDiagram';

# The Baldwin Effect

## 1. The core idea in one sentence

An organism's ability to *learn* or *adapt within its own lifetime* can change which genes are favored by natural selection over subsequent generations — even though nothing the organism learns is ever written back into its DNA.

This sounds paradoxical at first. Learning is not inherited. So how could learning possibly steer evolution? The answer, first proposed by psychologist James Mark Baldwin in 1896, is that learning doesn't need to be inherited to matter — it only needs to change *who survives to reproduce*.

One caution before going further, expanded on in §11: this idea is considerably more prominent in computer science than in evolutionary biology, and that asymmetry is not an accident.

## 2. A short history

The idea has been independently proposed several times, which is itself informative — it's the kind of insight that falls out naturally once you take both development and selection seriously.

- **1896 — James Mark Baldwin.** In *"A New Factor in Evolution,"* Baldwin named the phenomenon "organic selection." He was responding to a puzzle in Darwin's own writing: Darwin had used examples like flying squirrels and flightless beetles to argue that *changes in habit* could reshape an organism's anatomy over generations — which looked suspiciously like Lamarckism (the inheritance of acquired characteristics), a mechanism most Darwinists rejected. Baldwin's resolution: the habit itself isn't inherited, but the habit changes which genetic variants are advantageous, and *that* selection pressure is passed down in the ordinary neo-Darwinian way. Conwy Lloyd Morgan published a closely related proposal the same year.
- **1942 — Julian Huxley** promoted the idea as part of the Modern Synthesis, arguing it had been unfairly neglected.
- **1953 — George Gaylord Simpson** gave the phenomenon its now-standard name, "the Baldwin effect," while also expressing skepticism that it occurred often or could be proven.
- **1963 — Ernst Mayr** raised two objections. The first: Baldwin's argument was framed in terms of a single genotype, when what's actually exposed to selection is a phenotypically variable *population*. The second, and more damaging: plasticity may *mask* fitness differences rather than expose them, slowing genetic change rather than accelerating it (see §10).
- **1987 — Geoffrey Hinton and Steven Nowlan**, working in early neural network research rather than biology, built a small computational model (described below) that demonstrated the effect cleanly and connected it explicitly to Baldwin's 1896 proposal — this paper is the reason the Baldwin effect is now a staple reference in evolutionary computation and artificial life research.
- **2007 — Erica Crispo** disentangled the Baldwin effect from Waddington's genetic assimilation, arguing the two are routinely conflated despite making opposite predictions about plasticity itself.
- **2009 — Alexander Badyaev** provided empirical evidence from the house finch's colonization of North America — one of the few field-based (not simulated) demonstrations.

## 3. The mechanism, step by step

The Baldwin effect requires three ingredients working together:

1. **Phenotypic plasticity.** Individuals can adjust their traits or behavior during their own lifetime in response to the environment — through learning, physiological acclimation, or developmental flexibility.
2. **A fitness benefit from that adjustment.** The individuals who successfully adapt survive and reproduce more than those who don't.
3. **Heritable variation in the *capacity* to adapt.** Some genotypes make the adjustment easier, faster, or more likely to succeed than others.

Given all three, here's what happens over generations:

- In generation 1, most individuals only survive because they can *learn* the right behavior — it isn't innate yet. Learning is effortful, slow, and unreliable; many individuals fail to learn it in time and die before reproducing.
- Individuals whose genotype happens to make that learning slightly easier — faster, more reliable, requiring less trial and error — have a survival edge purely because they reach the adaptive behavior sooner.
- Over many generations, selection accumulates in favor of genotypes that make the trait easier to acquire.
- Eventually the trait can become so easy to acquire that it emerges automatically, with little or no learning required at all — it looks as if it has become "instinctive" or innate.

The philosopher Daniel Dennett summarized the logic memorably: species can be said to "pretest" the value of different designs through individual exploration, and if a winning configuration is found this way, it creates a new selection pressure favoring genotypes closer to that configuration.

### Important: this is *not* Lamarckism

It's easy to mistake this for the inheritance of acquired characteristics, because the end result — a learned behavior becoming innate — looks exactly like what Lamarck proposed. The mechanism is entirely different, though:

- **Lamarckism** claims the *specific thing an individual learned* is transmitted to its offspring's genes.
- **The Baldwin effect** claims nothing of the sort. What's inherited is not the learned content — it's a genetic predisposition that happens to make the same learning easier for the next generation, arrived at purely through ordinary selection on existing genetic variation.

No information ever crosses from phenotype back into genotype. The loop closes entirely through differential survival and reproduction — standard natural selection, just applied to the capacity for adaptation rather than to a fixed trait.

## 4. The classic computational demonstration: Hinton & Nowlan (1987)

The clearest illustration of the effect isn't biological at all — it's a small artificial model designed specifically to make the logic transparent. A from-scratch reimplementation of this exact simulation is available in the [HintonNowlan1987](https://github.com/doesburg11/HintonNowlan1987) repository.

**The setup:**
- A genome is a string of 20 genes. Each gene can take one of three values: `1` (a connection is present), `0` (a connection is absent), or `?` (undetermined — left to be resolved by learning).
- There is exactly **one correct configuration** out of 2²⁰ possible genomes, and it's dramatically fitter than everything else — a fitness "needle in a haystack."
- Genes fixed at `1` or `0` are hard-wired. Genes marked `?` are resolved by the simplest possible learning mechanism: blind guessing. On each of a fixed number of trials within its lifetime, the individual tries a random setting for its `?` genes. If a trial happens to land on the single correct configuration, the setting is frozen (learned); otherwise it keeps changing.

**Why this reveals the effect:** with an all-or-nothing fitness landscape and no learning, evolution has almost nothing to search on — nearly every genome scores the same low fitness, and only the one exact match stands out. There's no gradient to climb. But with `?` alleles in the mix, a genome that gets *most* of its genes right (with a few `?`s left over) has a real chance of stumbling onto the correct combination through blind guessing within its own lifetime. That chance is a small but real fitness signal, and it varies smoothly with how close the genome already is — turning the impossible spike into a landscape evolution can actually climb. Hinton and Nowlan showed that populations with this learning mechanism found good solutions far faster, across generations, than populations without it.

*(This model has also drawn methodological criticism — some analyses argue its specific population size and trial-budget parameters were chosen in ways that flatter the effect, and that the advantage shrinks or vanishes under more realistic, resource-bounded assumptions. It remains the field's standard illustration, but not an uncontested one.)*

That reimplementation reproduces the paper's result: incorrect alleles collapse to near zero, correct alleles rise from ~25% to ~75%, and plastic alleles decline but persist at roughly 24% rather than disappearing entirely.

<BaldwinNeedleHaystack />

### Computational demonstrations beyond Hinton-Nowlan

Hinton & Nowlan (1987) is the field's standard reference, but it isn't the only simulation to demonstrate the effect — and its abstract, single-optimum fitness landscape is a long way from a population of RL-capable agents in an ecology. Later work extends the model in several directions:

- **[Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991)** evolved populations of neural-network-controlled agents in an artificial environment, where each agent combined a fixed, genetically-specified network with a reinforcement-learning component. Populations with both learning and evolution together outperformed either mechanism alone — a structural match for a genome-plus-shared-policy setup rather than Hinton & Nowlan's abstract bit-string landscape.
- **Mayley (1996)** built a simulation specifically to test when learning speeds up versus dampens genetic assimilation, showing the outcome depends on the balance between the fitness benefit of learning and its cost — a more nuanced result than Hinton & Nowlan's clean-cut demonstration, and directly relevant to the "learning masks selection" caveat in §10 below.
- **Arita & Suzuki (2000)** used the Iterated Prisoner's Dilemma to show plasticity-driven strategies first spreading through a population and then being replaced by a modest, evolutionarily stabilized level of plasticity — one of the few models in this line to study a *changing* environment rather than the fixed single-optimum landscape Hinton & Nowlan and most successors assume.
- **Watson & Wiles (2002)** modeled genetic assimilation explicitly, rather than the Baldwin effect in general, in a neural-network setting — useful given Crispo's point (§12 below) that the two are often conflated even though genetic assimilation is only one specific outcome the Baldwin effect can produce.
- **Dopazo, Gordon, Perazzo & Risau-Gusman (2001)** extended Hinton & Nowlan's model to perceptrons with a mix of rigid (genetically fixed) and learnable synapses, and found a **halting effect**: past a certain point, learning *hindered* rather than stimulated the transcription of environmental information into the genome — the opposite of the standard Baldwin-effect prediction. A useful reminder that the computational literature isn't uniformly supportive of the effect.

A further extension worth noting is **Suzuki & Arita's** later work on spatial locality, which found that cooperative populations emerge more readily through the Baldwin effect as interaction becomes more local rather than random — connecting this line directly to the evolution of cooperation.

## 5. The genotype–phenotype relation

To see exactly *where* in an organism's construction the Baldwin effect operates, it helps to be precise about what a phenotype actually is.

**Genotype** is an organism's hereditary information — its genes. **Phenotype** is the set of all its observable characteristics: morphology, physiology, biochemistry, and behavior. The naive way to relate them is:

> genotype (G) + environment (E) → phenotype (P)

But this is too passive. A genotype doesn't sit in an environment and simply get read off against it like a lookup table — it only ever interacts with the environment through a living, developing organism. Wikipedia's phenotype article puts the more accurate version this way:

> genotype (G) + organism & environment interactions (OE) → phenotype (P)

The **OE** term is doing real work here. It's not "environment" as a static backdrop — it's the *active, ongoing interaction* between the developing organism and its surroundings. This single term covers an enormous range of processes:

- **Non-agentic developmental plasticity** — no decision-making involved at all. The plant *Hieracium umbellatum* develops bushy growth with broad leaves on rocky Swedish cliffs, but grows prostrate with narrow leaves in sand dunes, from *identical* genotypes — purely a developmental response to habitat.
- **Physiological acclimation** — UV exposure increasing melanin production, temperature affecting gene expression.
- **Learned behavior** — an animal acquiring a new foraging strategy, predator-avoidance tactic, or social behavior within its lifetime.

The Baldwin effect specifically concerns this last category: the *behavioral, learned* slice of OE. It's the part of phenotype construction where an agent, not just a developing body, is exploring options and being reinforced (or not) by outcomes.

## 6. Where reinforcement learning fits — and where it doesn't

This is worth being precise about, because the analogy is genuinely illuminating but easy to overstate.

**Reinforcement learning (RL)** is a computational framework where an *agent* takes *actions* in an *environment*, receives *observations* and a *reward signal*, and updates a *policy* to improve its expected cumulative reward over time. Structurally, this maps well onto the **behavioral subset of OE**: an agent probing its environment, adjusting its behavior based on what happens, within its own lifetime — exactly the ingredient the Baldwin effect depends on.

**But it would be a mistake to think of RL as "OE minus the reward."** Two things push back on that framing:

1. **Biological learning is usually reward-driven too.** Trial-and-error learning in animals runs on reinforcement signals — hunger, pain, and dopaminergic reward-prediction-error are the biological originals that inspired the RL reward hypothesis in the first place. Strip the reward out of RL and you don't get closer to how animals learn; you get further away, landing on something closer to undirected random behavior — which is actually closer to what Hinton & Nowlan modeled (blind guessing, not reward-driven optimization) than to real animal learning.
2. **OE is broader than anything RL can represent.** The plasticity examples above — a plant's growth form, UV-triggered pigmentation — have no agent, no action, no policy. RL is a model of *agentic, behavioral* adaptation specifically; it says nothing about the large fraction of phenotypic plasticity that isn't behavioral at all.

So the more accurate statement is: **RL is a reasonable formal model of the agentic, reward-driven slice of organism–environment interaction — which is precisely the slice the Baldwin effect operates on for behavioral traits.** The reward function isn't an add-on to subtract for a "purer" biological analogy — it's the RL analogue of the fitness-linked reinforcement signals (hunger, pain, dopamine) that make biological learning directional in the first place.

This is exactly why the Baldwin effect has become a natural framework in multi-agent reinforcement learning research: pair a genome (heritable parameters shaping an agent's physiology or starting conditions) with a shared or evolving RL policy (the "lifetime learning" layer), and you have a direct computational instantiation of the same G + OE → P loop biology describes.

### A caveat rarely stated: the reward function is itself evolved

In biology, reward is not given — it is an evolved proxy. Hunger, pain, curiosity and social approval are signals natural selection tuned precisely *because* fitness itself is too sparse and too delayed to learn from directly. An animal does not receive reinforcement for the abstract fact of reproducing; it receives it for eating, for warmth, for mating — proximate correlates of fitness that are dense enough to support learning.

Nearly every computational model hand-designs its reward function instead, which quietly moves a large piece of the adaptation out of the model and into the modeller. Making the reward function heritable and mutable would be a substantially more faithful model of the nature/nurture relationship — and would directly address the sparse-signal problems that simulations in this area routinely encounter.

## 7. Four things that are not the same

These are habitually conflated, and the distinctions determine whether a given setup *can* exhibit the Baldwin effect at all:

- **Genetic algorithm (GA)** — an optimization method. Population, fitness, selection, mutation, crossover. No lifetime, no learning.
- **Neuroevolution** — a GA whose genome *is* a neural network. The network evaluated is the network inherited; genotype and phenotype collapse into a single object.
- **NEAT** — neuroevolution with three biologically serious additions: *innovation numbers* that let crossover align genes by ancestry rather than by position (a homology mechanism, which is exactly what meiotic recombination does), *speciation* that shelters structural innovations from immediate competition, and *complexification* from minimal starting topologies. HyperNEAT adds indirect encoding via CPPNs — the only genuine *development* in this list, where a compact genome specifies a rule from which a large phenotype is constructed.
- **Multi-agent reinforcement learning (MARL)** — a learning method, with no genome and no inheritance.

**The Baldwin effect is none of these — it is a phenomenon**, not a method. It requires two genuinely separated timescales: slow generational change in an inherited genome, and fast within-lifetime adaptation that is *not* inherited. Plain GA has no learning. Plain neuroevolution has no lifetime distinct from the evolved object. Plain MARL has no genome. Each is individually incapable of producing the effect.

It appears only when a genome layer and a learning layer are combined **and kept architecturally distinct** — the learned adjustment must never be written back into the genome. Write it back and you have a memetic or Lamarckian algorithm: often better optimization, but no longer this phenomenon.

Two further observations. NEAT extended with adaptive Hebbian synapses has been built and tested (Stanley, Bryant & Miikkulainen 2003); there, both plastic and non-plastic networks reached maximum fitness on the test domain, and synaptic strengths were inherited — so the study demonstrates that plasticity *can* be carried, not that a Baldwin effect occurred. And there is a real tension in NEAT more generally: complexification solves the multi-gene coadaptation problem by a *different* route, growing the search space incrementally rather than smoothing a fixed one. NEAT may therefore make the Baldwin effect less *necessary* rather than more available.

## 8. A worked example: modeling the Baldwin effect in multi-agent RL

To make this concrete, consider a predator–prey simulation where agents are trained with reinforcement learning (PPO) *and* carry a heritable genetic trait — say, a **metabolic rate** that scales how efficiently an agent converts food into energy, and how much energy it burns per step just staying alive.

**The genotype:** each agent inherits a `metabolic_rate` value from its parent, with small random mutations at each reproduction event.

**The OE loop:** the agent's RL policy — shared across its species, trained continuously via PPO — determines its actual foraging and hunting behavior. This is the "lifetime learning" layer. Crucially, the genome is never shown to the policy directly; it only ever expresses itself through the energy economics of every step the agent takes.

**Two directions of feedback, and this is the interesting part:**

- **Darwin direction:** as the policy gets better at foraging, some metabolic rates become more advantageous than others — an agent that burns energy fast needs to be very good at finding food to break even, so once the policy is competent, high-metabolism agents either thrive or starve much more sharply than before. This changes which genomes get selected across generations.
- **Baldwin direction:** the reverse leg — does the *resulting* shift in the population's genetic makeup then feed back and change what the shared policy needs to learn? This is the harder direction to demonstrate, because it requires showing that genome state causally shapes subsequent learning outcomes, not just that learning outcomes shape genome selection.

In practice, running this kind of experiment surfaces exactly the difficulties the Baldwin effect's critics (Mayr, above) predicted: the signal is often weak until the policy is already competent, population crashes destroy usable data, and a population that starts near its fitness equilibrium may show no visible drift at all — even while selection pressure is technically present the whole time. Demonstrating a *complete*, causally verified Baldwin/Darwin loop — not just a plausible correlation — turns out to be a genuinely hard empirical bar to clear, in silico as much as in biology.

This loop is exactly what the site's [PredPreyGrass](/learning-selection-interaction/predpreygrass) simulations are built to probe: agents inherit a speed genome, a shared PPO policy supplies the lifetime learning layer, and ecological success determines which genomes reproduce.

The metabolic-rate scenario above is not hypothetical — it has been run for real, with a full neutral-drift control. The result: null, under the shared-PPO-policy architecture described in the previous paragraph. See the [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log) for that trial and the ten others that shared this architecture — and for the twelfth trial, which replaced it with a per-agent genome-and-network design and produced the track's first statistically decisive positive result (p < 0.00001 for combined evolution-and-learning against every degraded alternative).

## 9. Why demonstrating it is hard

Worth stating plainly, since simulation results in this area are easy to over-read.

The **forward direction** — learning quality reshaping which genotypes are selected — is comparatively easy to observe. The **reverse leg** is the hard one: showing that the resulting genetic shift feeds back and changes what must be learned. A correlation between the two across a training run is weak evidence, because both series typically trend with overall training progress; a shared confound is at least as good an explanation as a causal loop.

Distinguishing a genuine bidirectional loop from a shared confound requires **intervention**, not observation:

- **Freeze the genome.** Run an identical experiment with mutation disabled and show the effect disappears.
- **Transplant the genome.** From a common policy checkpoint, continue one branch with the evolved genome distribution and one reset to the founder distribution, and show that learning outcomes diverge.
- **Look for temporal precedence.** In a lagged cross-correlation, causal influence should show one series *leading* the other, after detrending both.

Two further practical traps are worth naming. A population founded at its fitness optimum will show no directional drift even while selection pressure is present throughout — there is simply nothing to correct, and the absence of movement is not the absence of selection. And the selective signal may only be strong within a narrow window: early on, an incompetent policy makes all genotypes fare alike; later, the trait converges on a neutral point and the gradient exhausts itself.

## 10. The counter-hypothesis: the Mayr effect

Any honest treatment must give the opposing prediction equal weight, because it is not a fringe objection.

Mayr's argument, now sometimes labelled the **Mayr effect**, is that plasticity **masks** genetic variation and therefore *slows* gene-level evolution. If an organism can behaviorally compensate for a suboptimal genotype, then genotypes stop differing in fitness, and selection has nothing to act on. There is no advantage in changing the genotype when the individual can simply adjust itself.

The logic is sound, and it is the exact mirror image of Baldwin's. Whether plasticity accelerates or retards genetic change is therefore **not settled by principle** — it depends on the balance between how much fitness advantage genetic differences confer and how completely plasticity papers over them. Mayley (1996) made the same point computationally: genetic assimilation requires learning to carry a **cost**. Where plasticity is free, there is no pressure to make anything innate, and the trait stays plastic indefinitely.

Recent modelling work putting both hypotheses into a single framework — with genetic drift, variable population size, competition, mutation and demography — finds that *intermediate* levels of plasticity best favour evolutionary rescue. Not maximal plasticity, and not none.

That shape recurs across this literature with striking regularity. Arita & Suzuki found populations settling on a modest rather than maximal level of plasticity. Cumulative culture requires transmission fidelity in an intermediate band — too lossy and improvements are lost faster than they accumulate, too faithful and there is no selective filter. Adaptation through a second channel appears to have interior optima fairly generally.

**A practical corollary for simulation designers:** making a genome trait visible to the policy's observation space is not unambiguously helpful. It strengthens the Baldwin direction by letting the policy condition its behaviour on genotype, but it simultaneously strengthens the Mayr direction by improving compensation. Which effect dominates is an empirical question, and the answer is not knowable in advance.

## 11. Status in evolutionary biology: contested and marginal

The Baldwin effect is far more prominent in computer science than in the field it purports to describe. This is worth stating clearly rather than glossing over.

**In mainstream evolutionary biology it is marginal.** Mayr and Dobzhansky were openly hostile, recommending the concept be discarded altogether. Several influential evolutionary biology textbooks — Ridley, Futuyma, Barton et al. — omit Baldwin entirely. And critically, there is **no clear empirical evidence** for the Baldwin effect specifically. The mechanism is coherent and undisputed as a *possibility*; what is lacking is demonstrated cases in nature.

**The surrounding question is very much alive.** Plasticity-led evolution is central to the Extended Evolutionary Synthesis debate — West-Eberhard, Pigliucci and Laland arguing for a larger causal role for plasticity, Futuyma and others pushing back. Whether plasticity and its evolutionary consequences are fully integrated into contemporary evolutionary theory remains genuinely open.

**But the terminology has moved on.** Following West-Eberhard and Crispo, **genetic accommodation** is the modern umbrella term, **genetic assimilation** is one specific type of it (an adaptive *decrease* in plasticity, i.e. canalization), and the Baldwin effect is defined in relation to accommodation rather than standing as an independent mechanism. A working biologist today is more likely to write "plasticity-first evolution" than "Baldwin effect."

**The disciplinary asymmetry is documented and pointed.** The tension among evolutionary biologists is unmatched by evolutionary computationalists, cognitive scientists and evolutionary psychologists, who invoke the effect as a major evolutionary force behind the emergence of mind and of language. One review makes the charge explicit in its title, arguing that the speeding-up-of-evolution result has "computational roots" and is largely an artifact of the assumptions computational models happen to make.

Taken together with the methodological criticism of Hinton & Nowlan's parameter choices and the halting effect found by Dopazo et al., a consistent pattern emerges: **the computational evidence is comparatively strong, the biological evidence is thin, and the two communities have drifted apart on how much that matters.** Anyone building simulations in this space should hold both facts at once — which is an argument for doing the work carefully, not for abandoning it.

## 12. Common misconceptions, addressed directly

- **"The Baldwin effect is just Lamarckism with extra steps."** No — see §3 above. The mechanism is entirely selectionist; nothing acquired is ever transmitted.
- **"If a trait becomes innate, that proves the Baldwin effect happened."** Not on its own. A trait becoming more heritable and less dependent on learning over generations — a process called **genetic assimilation** — is a strong signature, but the two shouldn't be conflated. Genetic assimilation is one specific type of "genetic accommodation," and per Crispo the two make *opposite* predictions about plasticity itself: the Baldwin effect tends to leave plasticity unchanged or increase it, while genetic assimilation specifically decreases it.
- **"Learning always speeds up evolution."** Not necessarily — see §10. If a policy or developmental system becomes *too* good at compensating for a poor genotype, it masks genetic differences from selection rather than amplifying them.
- **"A simulation with agents that learn and reproduce demonstrates the effect."** Only if three conditions hold: genome and learning layer are architecturally separate, learned adjustments are genuinely lost at death rather than inherited, and — the hard part — the genome shift can be shown *causally* to have altered subsequent learning outcomes, rather than merely correlating with them. See §9.

## 13. Related but distinct: other bridges between nature and nurture

The Baldwin effect connects nature and nurture on one specific axis: the evolutionary timescale. Several other bridges exist, and for *human* behavior in particular the Baldwin effect is probably not the most promising of them.

- **Gene–culture coevolution (dual inheritance theory).** Culture treated as a second inheritance system with its own transmission rules — vertical, oblique, horizontal — its own selection, and its own rate. This has the clean empirical case the Baldwin effect lacks: **lactase persistence**, where a cultural practice (dairying) created a selection pressure that measurably shifted allele frequencies within a few thousand years. Nurture steering nature, demonstrated.
- **Cultural evolution and iterated learning.** Linguistic structure emerges from repeated transmission through a **learning bottleneck**, with no genetic change and no individual insight required. This may actually *preempt* the Baldwin effect for language: cultural change is far too fast for genetic assimilation to track, so language plausibly adapts to brains rather than brains adapting to language.
- **Niche construction.** Organisms modify their environments, and those modifications become selection pressures on themselves and their descendants — "ecological inheritance" as a third channel alongside genes and culture. Any simulation where agents deplete or reshape a resource they also depend on already contains this.
- **Evolved inductive biases.** On this view the genome encodes not behavior but a *wiring rule* — a learning architecture with strong priors. Nature is the inductive bias; nurture is the data. Computationally this is meta-learning: an outer loop shaping what the inner loop finds easy to acquire. It has the same two-timescale structure as the Baldwin effect, but the object of selection is the *learning system* rather than a behavioral trait.

Two further mechanisms belong in this family and aren't reflected in the bullets above: **genetic accommodation** (West-Eberhard, 2003), which generalizes genetic assimilation into selection that can just as easily *increase* plasticity as remove it — the Baldwin effect is the special case where it happens to hit zero; and **epigenetic inheritance** (Jablonka & Lamb, 1995), a third timescale of environmentally-induced marks on gene expression that outlive one lifetime without changing the DNA sequence. The diagram below places all six mechanisms — Baldwin included — on one map, showing which generalize it, which run in parallel through a different channel, and which invert its logic outright.

<BeyondBaldwinDiagram />

A structural note for anyone modelling these. Cultural transmission is **lossy**, and the loss is generative rather than merely degrading. A learner observes a finite sample of behavior, cannot see the reasoning behind it, and reconstructs the rest using their own inductive biases. That bottleneck acts as a *filter* selecting for whatever is learnable from partial data — which is exactly what structure provides. Remove the bottleneck and the pressure vanishes: lossless transmission preserves unstructured systems just as happily as structured ones. A model in which every agent shares one set of parameters therefore cannot exhibit cultural emergence — not because the transmission channel is weak, but because it is perfect, and there is no filter for anything to be selected through.

## References

**Primary theoretical sources**

- Baldwin, J. M. (1896). "A New Factor in Evolution." *The American Naturalist*, 30(354), 441–451 & 536–553.
- Morgan, C. L. (1896). "On modification and variation." *Science*, 4(99), 733–740.
- Waddington, C. H. (1942). "Canalization of development and the inheritance of acquired characters." *Nature*, 150(3811), 563–565.
- Simpson, G. G. (1953). "The Baldwin Effect." *Evolution*, 7(2), 110–117.
- Mayr, E. (1963). *Animal Species and Evolution*. Harvard University Press.
- West-Eberhard, M. J. (2003). *Developmental Plasticity and Evolution*. Oxford University Press.
- Crispo, E. (2007). "The Baldwin effect and genetic assimilation: revisiting two mechanisms of evolutionary change mediated by phenotypic plasticity." *Evolution*, 61(11), 2469–2479. *(Conceptual review — contains no simulations. The reference for disentangling the Baldwin effect, genetic assimilation and genetic accommodation.)*

**Computational demonstrations**

- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1, 495–502.
- Ackley, D., & Littman, M. (1991). "Interactions between learning and evolution." In *Artificial Life II*, 487–509.
- Mayley, G. (1996). "Landscapes, Learning Costs, and Genetic Assimilation." *Evolutionary Computation*, 4(3), 213–234.
- Turney, P. (1996). "Myths and Legends of the Baldwin Effect." *ICML-96 Workshop on Evolutionary Computing and Machine Learning*. *(On the conflation of the effect with mere synergy in evolutionary computation.)*
- Watson, R. A., & Pollack, J. B. (1999). "How symbiosis can guide evolution." *ECAL*, 29–38.
- Arita, T., & Suzuki, R. (2000). "Interactions between learning and evolution: the outstanding strategy generated by the Baldwin effect." *Artificial Life VII*, 196–205.
- Dopazo, H., Gordon, M. B., Perazzo, R., & Risau-Gusman, S. (2001). "A Model for the Interaction of Learning and Evolution." *Bulletin of Mathematical Biology*, 63(1), 117–134.
- Watson, R. A., & Wiles, J. (2002). "The Rise and Fall of Learning: A Neural Network Model of the Genetic Assimilation of Acquired Traits." *CEC 2002*, 600–605.
- Stanley, K. O., & Miikkulainen, R. (2002). "Evolving Neural Networks Through Augmenting Topologies." *Evolutionary Computation*, 10(2), 99–127.
- Stanley, K. O., Bryant, B. D., & Miikkulainen, R. (2003). "Evolving Adaptive Neural Networks with and without Adaptive Synapses." *CEC 2003*, 2557–2564.
- Suzuki, R., & Arita, T. (2004). "Interactions between learning and evolution: the outstanding strategy generated by the Baldwin effect." *BioSystems*. *(Extends the IPD work with spatial locality.)*
- Houghton, C. (2024). "Cooperation as well as learning: A commentary on 'How learning can guide evolution' by Hinton and Nowlan." arXiv:2409.15609. *(Note: contains no learning mechanism — cooperation substitutes for it rather than interacting with it.)*
- Houghton, C. (2025). "Cooperation guides evolution in a minimal model of biological evolution." arXiv:2504.05096.

**Empirical**

- Waddington, C. H. (1953). "Genetic assimilation of an acquired character." *Evolution*, 7(2), 118–126.
- Mery, F., & Kawecki, T. J. (2004). "The effect of learning on experimental evolution of resource preference in *Drosophila melanogaster*." *Evolution*, 58(4), 757–767.
- Badyaev, A. V. (2009). "Evolutionary significance of phenotypic accommodation in novel environments: an empirical test of the Baldwin effect." *Philosophical Transactions of the Royal Society B*, 364(1520), 1125–1141.

**Critical perspectives**

- Santos, M., Szathmáry, E., & Fontanari, J. F. (2015). "Phenotypic plasticity, the Baldwin effect, and the speeding up of evolution: the computational roots of an illusion." *Journal of Theoretical Biology*. Preprint: arXiv:1411.6843.
- Futuyma, D. J. (2021). On the Extended Evolutionary Synthesis debate.

**Bridges between nature and nurture**

- Cavalli-Sforza, L. L., & Feldman, M. W. (1981). *Cultural Transmission and Evolution: A Quantitative Approach*. Princeton University Press.
- Boyd, R., & Richerson, P. J. (1985). *Culture and the Evolutionary Process*. University of Chicago Press.
- Rogers, A. R. (1988). "Does biology constrain culture?" *American Anthropologist*, 90(4), 819–831.
- Kirby, S. (2002). "Natural language from artificial life." *Artificial Life*, 8, 185–215.
- Odling-Smee, F. J., Laland, K. N., & Feldman, M. W. (2003). *Niche Construction: The Neglected Process in Evolution*. Princeton University Press.
- Henrich, J. (2016). *The Secret of Our Success*. Princeton University Press.
- Zador, A. (2019). "A critique of pure learning and what artificial neural networks can learn from animal brains." *Nature Communications*, 10, 3770.

**Reference works**

- Weber, B. H., & Depew, D. J., eds. (2003). *Evolution and Learning: The Baldwin Effect Reconsidered*. MIT Press.
- Wikipedia contributors. ["Baldwin effect."](https://en.wikipedia.org/wiki/Baldwin_effect) *Wikipedia, The Free Encyclopedia*.
- Wikipedia contributors. ["Phenotype."](https://en.wikipedia.org/wiki/Phenotype) *Wikipedia, The Free Encyclopedia*.
