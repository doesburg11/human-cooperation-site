---
id: retained-benefit
title: Retained Benefit
sidebar_position: 3
slug: /evolved-cooperation/retained-benefit
---

import EvolvedCooperationCaseStudiesTable from '@site/src/components/EvolvedCooperationCaseStudiesTable';
import RetainedBenefitReplay from '@site/src/components/RetainedBenefitReplay';

Retained Benefit is the most abstract evolved-cooperation case study on this site. Rather than centering one specific mechanism such as patch altruism, local Prisoner's Dilemma response rules, or cooperative hunting, it evaluates a more general question: **when does cooperation spread when the decisive variable is how much of the value created by cooperation is routed back toward cooperators or their copies rather than being lost through evolutionary leakage to unrelated or weakly coupled recipients?**

Source code: [`retained_benefit` module](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/retained_benefit) in the [EvolvedCooperation](https://github.com/doesburg11/EvolvedCooperation) repository.

## Conceptual Focus

Many cooperation models embed the central evolutionary problem inside a
particular mechanism family.

- altruism models embed it in local public-good production
- reciprocity models embed it in repeated-game memory
- hunting models embed it in ecological synergy

This model removes most of that mechanism-specific structure. It asks whether
cooperation can increase when:

- cooperation creates value
- cooperation also carries a private cost
- some of that value is shared broadly
- some of it is retained by related or same-rule local recipients

So the central question becomes: **how much retained feedback is enough?**

## Model Structure

This is a spatial lattice model with **selection on an inherited continuous
cooperation trait**, not a model of learning, planning, or bargaining.

Each occupied cell carries:

- one cooperation trait $h \in [0, 1]$
- one inherited lineage label

The lineage label is not intended as a full kinship model. It serves as an
abstract stand-in for copies of the same inherited rule or for locally
clustered descendants of the same lineage.

## The Core Rule

At each step, agent $i$ with cooperation trait $h_i$ produces gross cooperative output:

$$B_i = b \cdot h_i$$

That output is split into retained and open components:

$$B_i^{\text{retained}} = r \cdot B_i, \qquad B_i^{\text{open}} = (1-r) \cdot B_i$$

Here $B_i^{\text{retained}}$ is the retained amount produced by site $i$ before routing, not the accumulated retained benefit that site $i$ eventually receives.

The producer also pays a private cost:

$$C_i = c \cdot h_i$$

Fitness is then computed as:

$$W_i = w_0 + \text{received\_open}_i + \text{received\_retained}_i - C_i$$

Variable definitions:

- $h_i$ is agent $i$'s cooperation trait
- $B_i$ is the total cooperative value produced by agent $i$
- $r$ is the retained-benefit fraction
- $b$ is the cooperation-benefit scale
- $C_i$ is the private cooperation cost paid by agent $i$
- $c$ is the cooperation-cost scale
- $W_i$ is the resulting fitness used in local replacement
- $w_0$ is fixed baseline fitness, added each step as a background term that dampens selection intensity
- $\text{received\_open}_i$ is the open benefit received by agent $i$ from its neighborhood
- $\text{received\_retained}_i$ is the accumulated retained benefit received by agent $i$ from same-lineage producers in its neighborhood, not the producer-side term $B_i^{\text{retained}}$

The **open** component is shared across the full local neighborhood. The
**retained** component is shared only across same-lineage recipients in that
local neighborhood and contributes to each recipient site's accumulated
retained benefit $\text{received\_retained}_i$.

### Why The Fixed Baseline Matters

The baseline term $w_0$ does not change from step to step.
It is added to every candidate parent's fitness before local parent selection,
so it dampens the strength of selection rather than changing the ordering of
candidates.

Suppose five local candidate parents have cooperation-related payoff terms
$\delta = \text{received\_open} + \text{received\_retained} - C = [0.30,\, 0.10,\, 0.05,\, 0.05,\, 0.00]$.

- Without a baseline, parent-choice weights are $[0.30,\, 0.10,\, 0.05,\, 0.05,\, 0.00]$, so the probabilities are $[0.60,\, 0.20,\, 0.10,\, 0.10,\, 0.00]$.
- With $w_0 = 1.0$, the weights become $[1.30,\, 1.10,\, 1.05,\, 1.05,\, 1.00]$, so the probabilities are about $[0.236,\, 0.200,\, 0.191,\, 0.191,\, 0.182]$.
- The ranking stays the same, but selection becomes much less extreme.

So the model turns one high-level claim into a direct experiment:

> cooperation rises when enough of its return is protected from leakage

## Simulation Step

One full synchronous retained-benefit update runs as follows. All sites update simultaneously.

<figure style={{ margin: '0 0 1.25rem 0' }}>
<div style={{ border: '1px solid #d6e4f5', overflow: 'hidden' }}>

<div style={{ background: '#0f3368', padding: '1rem 1.5rem' }}>
<div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem' }}>Retained Benefit Simulation Step</div>
<div style={{ color: '#ccdcef', fontSize: '0.9rem' }}>One synchronous grid update from step t to step t + 1 under retained-benefit routing.</div>
</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>1</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Start from the current grid state</p>

Each cell stores one cooperation trait $h \in [0, 1]$ and one inherited lineage label.

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>2</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Compute cooperative output and private cost</p>

$$B_i = b \cdot h_i, \qquad C_i = c \cdot h_i$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>3</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Split output into retained and open components</p>

$$B_i^{\text{retained}} = r \cdot B_i, \qquad B_i^{\text{open}} = (1-r) \cdot B_i$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>4</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Route and accumulate received benefit</p>

Open benefit is shared across the full local neighborhood; retained benefit is routed only to same-lineage recipients. Each site accumulates $\text{received\_open}_i$ from all neighbors and $\text{received\_retained}_i$ from same-lineage neighbors only.

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>5</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Compute site fitness</p>

$$W_i = w_0 + \text{received\_open}_i + \text{received\_retained}_i - C_i$$

Baseline fitness $w_0$ dampens selection intensity.

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>6</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Local replacement lottery — inherit trait and lineage, apply mutation</p>

One parent is sampled from the local neighborhood with probability proportional to $W_j$. The offspring inherits $h$ (with small Gaussian mutation, clipped to $[0,1]$) and the parent's lineage label. Same-lineage clusters grow when local cooperators outcompete their neighbors.

</div>
</div>
</div>

</div>
<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> One synchronous retained-benefit update from step <code>t</code> to step <code>t + 1</code>.</figcaption>
</figure>

Turnover is implemented as a **local replacement lottery** rather than as explicit death, birth, and movement.

## Frozen Replay Configuration

The browser replay below is a specific seeded run from the frozen website-demo configuration, not a schematic animation. It uses:

- a `72 × 72` toroidal lattice
- a von Neumann local neighborhood
- `250` simulation steps sampled every `5` steps
- baseline fitness `1.0`
- cooperation benefit `0.30`
- cooperation cost `0.10`
- retained-benefit fraction `0.35`
- mutation rate `0.02`
- mutation standard deviation `0.05`
- `24` initial lineage labels in `6 × 6` local blocks
- random seed `0`

In the viewer:

- cooperation view colors low `h` as pale beige, mid `h` as light blue, and high `h` as burgundy-red
- lineage view switches to lineage colors so local clustering becomes visible

## Interactive Replay

The browser replay below is based on sampled frames from that same frozen configuration.

The canonical implementation and export logic live in the [EvolvedCooperation](https://github.com/doesburg11/EvolvedCooperation) repository:

- [Module directory](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/retained_benefit)
- [Core model](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/retained_benefit/retained_benefit_model.py)
- [Frozen website-demo config](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/retained_benefit/config/retained_benefit_website_demo_config.py)
- [Replay exporter](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/retained_benefit/utils/export_github_pages_demo.py)

<RetainedBenefitReplay />

## How To Read The Replay

The replay is easiest to read as the interaction of three evolving quantities.

### 1. Mean cooperation

This shows whether the inherited cooperation trait is rising or falling in the population as a whole.

### 2. Local assortment

This shows how often agents are surrounded by same-lineage local recipients. When that value rises, retained benefit has a clearer channel back toward cooperators or their copies.

### 3. Dominant-lineage share

This shows whether one lineage is spreading strongly enough to occupy a large share of the lattice. It is a rough indicator of successful local copying and spatial consolidation.

Together these variables let you separate:

- trait change
- local clustering
- lineage expansion

instead of collapsing all three into one unexplained population curve.

## Why This Belongs Under Evolved Cooperation

This model belongs under evolved cooperation because:

- the cooperation trait is inherited rather than learned
- selection acts through differential local copying and reproduction-like replacement
- mutation creates heritable variation
- local structure changes which cooperation traits persist across generations

What changes here is not a policy inside a lifetime. What changes is the distribution of inherited cooperation levels across the population.

Within the site's evolved-cooperation set, Retained Benefit is the most abstract feedback-routing model.

<EvolvedCooperationCaseStudiesTable
  currentCaseStudy="retained-benefit"
  displayNumber="2"
  caption="How Retained Benefit fits among the site's evolved-cooperation case studies."
/>

## Why This Model Is Useful

This model is useful because it makes one candidate near-law of cooperation
unusually explicit:

> there is no cooperation without feedback

In other words:

- if cooperation creates value that is lost through evolutionary leakage to unrelated or weakly coupled recipients, cooperation is hard to sustain
- if enough of that value is routed back toward cooperators or their copies, cooperation can spread

## What "Feedback" Means Here

On this page, **feedback** does not mean only a verbal response, praise, or a conscious social reaction. It means any **causal return channel** by which the consequences of cooperation flow back toward the cooperator, its partners, or copies of the cooperative rule rather than being lost through evolutionary leakage to unrelated or weakly coupled recipients.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '1rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
  <p style={{ margin: '0' }}><strong style={{ color: '#0F3368' }}>Working definition.</strong> Here, feedback means any process that makes the benefits or downstream consequences of cooperation return non-randomly to cooperators, their partners, or their lineage, so that cooperation improves its own future persistence rather than being lost through evolutionary leakage to unrelated or weakly coupled recipients.</p>
</div>

Here, <strong>weakly coupled recipients</strong> means recipients whose gain does not feed back strongly enough into the actor's inclusive fitness, lineage persistence, or recurrence of the cooperative rule, even if they are nearby or benefit in the short run.

That return can take several forms.

### Material Feedback

This is the most concrete form.

- food, energy, money, territory, protection, or other usable resources flow back toward the cooperator
- cooperation therefore changes the material conditions for survival, reproduction, or future action

In many biological and ecological models, this is the clearest channel because cooperative behavior changes who gets access to resources.

### Immaterial Or Social Feedback

The return does not have to be material in the narrow sense.

- reputation can make later help or alliance more likely
- trust can stabilize repeated cooperation
- punishment, shame, obligation, or status can redirect future behavior
- partner choice can reward cooperators with better future interaction opportunities

These are **immaterial** in the sense that they are not food or money, but they still matter if they systematically alter who benefits, who gets chosen, and who is excluded.

### Informational Or Learning Feedback

Feedback can also operate through information.

- agents observe outcomes
- agents remember who cooperated or defected
- agents update expectations, policies, or strategies
- rewards and penalties reshape future behavior within a lifetime

This is the central sense of feedback in learned-cooperation models: behavior changes because experience changes later decisions.

### Ecological Or Structural Feedback

Sometimes the return channel is embedded in the structure of interaction rather than in an explicit transfer.

- spatial clustering makes cooperators more likely to encounter cooperators again
- local assortment routes benefits back toward similar or related others
- repeated interaction creates future consequences for present behavior
- institutions or network structure can reduce leakage to defectors

This kind of feedback often determines whether a cooperative act keeps helping the same social neighborhood or is simply absorbed by outsiders.

### Fitness Feedback

In evolved-cooperation models, this is the deepest level of accounting.

- cooperation changes survival
- cooperation changes reproductive success
- cooperation changes inclusive fitness or lineage persistence
- those changes alter which inherited traits become more common over generations

So material and immaterial returns matter evolutionarily only if they eventually affect **fitness**.

## Feedback In This Model

In Retained Benefit, the relevant feedback is a **fitness-relevant routing rule**.

- cooperation produces value
- some of that value is shared openly
- some of it is retained and routed only toward same-lineage recipients in the local neighborhood
- that retained return contributes to $\text{received\_retained}_i$
- $\text{received\_retained}_i$ raises fitness $W_i$
- higher fitness makes that lineage more likely to persist and spread

So the model uses a material-like local payoff channel, but the real question is evolutionary: **does the routing of cooperative value create enough feedback into fitness to let cooperation survive selection?**

That is why the slogan on this page is intentionally broad. The claim is not that cooperation requires one special substance called feedback. The claim is that cooperation requires some channel, material, immaterial, informational, structural, or fitness-relevant, through which the consequences of cooperation come back toward cooperators or their copies.

That claim is more abstract than the special-case logic of altruism,
reciprocity, or hunting. Retained Benefit is therefore the site's most direct
current model for asking what the minimal conditions of cooperation might look
like in general.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1-16. https://doi.org/10.1016/0022-5193(64)90038-4
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560-1563. https://doi.org/10.1126/science.1133755
- West, S. A., Griffin, A. S., & Gardner, A. (2007). *Evolutionary explanations for cooperation*. *Current Biology*, 17(16), R661-R672. https://doi.org/10.1016/j.cub.2007.06.004
- [EvolvedCooperation retained_benefit module](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/retained_benefit)
