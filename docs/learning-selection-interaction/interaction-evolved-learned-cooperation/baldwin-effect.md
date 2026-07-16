---
id: baldwin-effect
title: The Baldwin Effect
sidebar_position: 3
slug: /learning-selection-interaction/baldwin-effect
---

# The Baldwin Effect

## 1. The core idea in one sentence

An organism's ability to *learn* or *adapt within its own lifetime* can change which genes are favored by natural selection over subsequent generations — even though nothing the organism learns is ever written back into its DNA.

This sounds paradoxical at first. Learning is not inherited. So how could learning possibly steer evolution? The answer, first proposed by psychologist James Mark Baldwin in 1896, is that learning doesn't need to be inherited to matter — it only needs to change *who survives to reproduce*.

## 2. A short history

The idea has been independently proposed several times, which is itself informative — it's the kind of insight that falls out naturally once you take both development and selection seriously.

- **1896 — James Mark Baldwin.** In *"A New Factor in Evolution,"* Baldwin named the phenomenon "organic selection." He was responding to a puzzle in Darwin's own writing: Darwin had used examples like flying squirrels and flightless beetles to argue that *changes in habit* could reshape an organism's anatomy over generations — which looked suspiciously like Lamarckism (the inheritance of acquired characteristics), a mechanism most Darwinists rejected. Baldwin's resolution: the habit itself isn't inherited, but the habit changes which genetic variants are advantageous, and *that* selection pressure is passed down in the ordinary neo-Darwinian way.
- **1942 — Julian Huxley** promoted the idea as part of the Modern Synthesis, arguing it had been unfairly neglected.
- **1953 — George Gaylord Simpson** gave the phenomenon its now-standard name, "the Baldwin effect," while also expressing skepticism that it occurred often or could be proven.
- **1963 — Ernst Mayr** raised a serious objection: Baldwin's argument was framed in terms of a single genotype, when what's actually exposed to selection is a phenotypically variable *population*.
- **1987 — Geoffrey Hinton and Steven Nowlan**, working in early neural network research rather than biology, built a small computational model (described below) that demonstrated the effect cleanly and connected it explicitly to Baldwin's 1896 proposal — this paper is the reason the Baldwin effect is now a staple reference in evolutionary computation and artificial life research.
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

The clearest illustration of the effect isn't biological at all — it's a small artificial model designed specifically to make the logic transparent.

**The setup:**
- A genome is a string of 20 genes. Each gene can take one of three values: `1` (a connection is present), `0` (a connection is absent), or `?` (undetermined — left to be resolved by learning).
- There is exactly **one correct configuration** out of 2²⁰ possible genomes, and it's dramatically fitter than everything else — a fitness "needle in a haystack."
- Genes fixed at `1` or `0` are hard-wired. Genes marked `?` are resolved by the simplest possible learning mechanism: blind guessing. On each of a fixed number of trials within its lifetime, the individual tries a random setting for its `?` genes. If a trial happens to land on the single correct configuration, the setting is frozen (learned); otherwise it keeps changing.

**Why this reveals the effect:** with an all-or-nothing fitness landscape and no learning, evolution has almost nothing to search on — nearly every genome scores the same low fitness, and only the one exact match stands out. There's no gradient to climb. But with `?` alleles in the mix, a genome that gets *most* of its genes right (with a few `?`s left over) has a real chance of stumbling onto the correct combination through blind guessing within its own lifetime. That chance is a small but real fitness signal, and it varies smoothly with how close the genome already is — turning the impossible spike into a landscape evolution can actually climb. Hinton and Nowlan showed that populations with this learning mechanism found good solutions far faster, across generations, than populations without it.

*(This model has also drawn methodological criticism — some analyses argue its specific population size and trial-budget parameters were chosen in ways that flatter the effect, and that the advantage shrinks or vanishes under more realistic, resource-bounded assumptions. It remains the field's standard illustration, but not an uncontested one.)*

### Computational demonstrations beyond Hinton-Nowlan

Hinton & Nowlan (1987) is the field's standard reference, but it isn't the only simulation to demonstrate the effect — and its abstract, single-optimum fitness landscape is a long way from a population of RL-capable agents in an ecology. Later work extends the model in several directions:

- **Ackley & Littman (1991)** evolved populations of neural-network-controlled agents in an artificial environment, where each agent combined a fixed, genetically-specified network with a reinforcement-learning component. Populations with both learning and evolution together outperformed either mechanism alone — a structural match for a genome-plus-shared-policy setup rather than Hinton & Nowlan's abstract bit-string landscape.
- **Mayley (1996)** built a simulation specifically to test when learning speeds up versus dampens genetic assimilation, showing the outcome depends on the balance between the fitness benefit of learning and its cost — a more nuanced result than Hinton & Nowlan's clean-cut demonstration, and directly relevant to the "learning masks selection" caveat in §8 below.
- **Arita & Suzuki (2000)** used the Iterated Prisoner's Dilemma to show plasticity-driven strategies first spreading through a population and then being replaced by a modest, evolutionarily stabilized level of plasticity — one of the few models in this line to study a *changing* environment rather than the fixed single-optimum landscape Hinton & Nowlan and most successors assume.
- **Watson & Wiles (2002)** modeled genetic assimilation explicitly, rather than the Baldwin effect in general, in a neural-network setting — useful given Crispo's point (§8 below) that the two are often conflated even though genetic assimilation is only one specific outcome the Baldwin effect can produce.
- **Dopazo, Gordon, Perazzo & Risau-Gusman (2001)** extended Hinton & Nowlan's model to perceptrons with a mix of rigid (genetically fixed) and learnable synapses, and found a **halting effect**: past a certain point, learning *hindered* rather than stimulated the transcription of environmental information into the genome — the opposite of the standard Baldwin-effect prediction. A useful reminder that the computational literature isn't uniformly supportive of the effect.

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

## 7. A worked example: modeling the Baldwin effect in multi-agent RL

To make this concrete, consider a predator–prey simulation where agents are trained with reinforcement learning (PPO) *and* carry a heritable genetic trait — say, a **metabolic rate** that scales how efficiently an agent converts food into energy, and how much energy it burns per step just staying alive.

**The genotype:** each agent inherits a `metabolic_rate` value from its parent, with small random mutations at each reproduction event.

**The OE loop:** the agent's RL policy — shared across its species, trained continuously via PPO — determines its actual foraging and hunting behavior. This is the "lifetime learning" layer. Crucially, the genome is never shown to the policy directly; it only ever expresses itself through the energy economics of every step the agent takes.

**Two directions of feedback, and this is the interesting part:**

- **Darwin direction:** as the policy gets better at foraging, some metabolic rates become more advantageous than others — an agent that burns energy fast needs to be very good at finding food to break even, so once the policy is competent, high-metabolism agents either thrive or starve much more sharply than before. This changes which genomes get selected across generations.
- **Baldwin direction:** the reverse leg — does the *resulting* shift in the population's genetic makeup then feed back and change what the shared policy needs to learn? This is the harder direction to demonstrate, because it requires showing that genome state causally shapes subsequent learning outcomes, not just that learning outcomes shape genome selection.

In practice, running this kind of experiment surfaces exactly the difficulties the Baldwin effect's critics (Mayr, above) predicted: the signal is often weak until the policy is already competent, population crashes destroy usable data, and a population that starts near its fitness equilibrium may show no visible drift at all — even while selection pressure is technically present the whole time. Demonstrating a *complete*, causally verified Baldwin/Darwin loop — not just a plausible correlation — turns out to be a genuinely hard empirical bar to clear, in silico as much as in biology.

This loop is exactly what the site's [PredPreyGrass](/learning-selection-interaction/predpreygrass) simulations are built to probe: agents inherit a speed genome, a shared PPO policy supplies the lifetime learning layer, and ecological success determines which genomes reproduce.

## 8. Common misconceptions, addressed directly

- **"The Baldwin effect is just Lamarckism with extra steps."** No — see §4 above. The mechanism is entirely selectionist; nothing acquired is ever transmitted.
- **"If a trait becomes innate, that proves the Baldwin effect happened."** Not on its own. A trait becoming more heritable and less dependent on learning over generations — a process called **genetic assimilation** — is a strong signature of the Baldwin effect, but the Baldwin effect is a broader category, and the two shouldn't be conflated. Genetic assimilation is one specific type of "genetic accommodation," which the Baldwin effect also includes.
- **"Learning always speeds up evolution."** Not necessarily. If a policy or developmental system becomes *too* good at compensating for a poor genotype, it can actually mask genetic differences from selection rather than amplify them — reducing rather than increasing the fitness gap between genotypes. Whether learning accelerates or dampens genetic change depends on the balance between how much fitness advantage genetic differences confer versus how much plasticity can paper over them.

## References

- Baldwin, J. M. (1896). "A New Factor in Evolution." *The American Naturalist*, 30(354), 441–451.
- Simpson, G. G. (1953). "The Baldwin Effect." *Evolution*, 7(2), 110–117.
- Mayr, E. (1963). *Animal Species and Evolution*. Harvard University Press.
- Hinton, G. E., & Nowlan, S. J. (1987). "How Learning Can Guide Evolution." *Complex Systems*, 1, 495–502.
- Ackley, D., & Littman, M. (1991). "Interactions between learning and evolution." In *Artificial Life II*, 487–509.
- Mayley, G. (1996). "Landscapes, Learning Costs, and Genetic Assimilation." *Evolutionary Computation*, 4(3), 213–234.
- Arita, T., & Suzuki, R. (2000). "Interactions between learning and evolution: the outstanding strategy generated by the Baldwin effect." *Artificial Life VII*, 196–205.
- Dopazo, H., Gordon, M. B., Perazzo, R., & Risau-Gusman, S. (2001). "A Model for the Interaction of Learning and Evolution." *Bulletin of Mathematical Biology*, 63(1), 117–134.
- Watson, R. A., & Wiles, J. (2002). "The Rise and Fall of Learning: A Neural Network Model of the Genetic Assimilation of Acquired Traits." *Proceedings of the 2002 Congress on Evolutionary Computation (CEC)*, 600–605.
- Badyaev, A. V. (2009). "Evolutionary significance of phenotypic accommodation in novel environments: an empirical test of the Baldwin effect." *Philosophical Transactions of the Royal Society B*, 364(1520), 1125–1141.
- Crispo, E. (2007). "The Baldwin effect and genetic assimilation: revisiting two mechanisms of evolutionary change mediated by phenotypic plasticity." *Evolution*, 61(11), 2469–2479.
- Wikipedia contributors. ["Baldwin effect."](https://en.wikipedia.org/wiki/Baldwin_effect) *Wikipedia, The Free Encyclopedia*.
- Wikipedia contributors. ["Phenotype."](https://en.wikipedia.org/wiki/Phenotype) *Wikipedia, The Free Encyclopedia*.
