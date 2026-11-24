---
id: kin-selection
title: Kin Selection
sidebar_position: 1
slug: /evolved-cooperation/kin-selection
---

import KinSelectionLiveGrid from '@site/src/components/KinSelectionLiveGrid';
import KinSelectionComparison from '@site/src/components/KinSelectionComparison';
import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/kin_selection" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Kin selection is the first of Nowak's five mechanisms for the evolution of cooperation. Cooperation spreads when the benefit delivered to a recipient, weighted by genetic relatedness, exceeds the private cost paid by the actor — Hamilton's rule: $rB > C$.</div>

## What Counts as Kin Selection Here

**The definition used on this site.** In the broad sense used here, kin selection means: *a helping trait spreads because its benefits go to individuals related to the helper by common descent, the helper's own offspring included, even though helping costs the helper some of its own survival or reproduction.* This is deliberately broad. In standard inclusive-fitness terms, benefits to one's own offspring count as *direct* fitness and benefits to other relatives as *indirect* fitness; this site groups both under one label and always says which one a result belongs to. A result counts as kin selection here only if all three of these hold:

1. **A real cost.** Counting any share of the benefit that comes back to the helper itself, helping leaves the helper with less survival or reproduction of its own than not helping. Helping that pays for itself (weak altruism, the case in the Moran runs below) does not count.
2. **The benefit goes to relatives by descent.** The recipients are the helper's offspring or other relatives by common descent, not the helper itself and not unrelated individuals who happen to be nearby. In these models inheritance is clonal, so offspring carry the parent's helping trait apart from mutation.
3. **Spread from rare, against a control.** Helping rises from a rare start to an endpoint set in advance, and a comparison registered in advance shows that it does not when the benefit no longer goes to relatives (or their relatedness is removed). Where that comparison changes several things at once, the result is reported as *consistent with* kin selection, not as proof that relatedness alone caused it.

These are the ingredients of a test of Hamilton's rule, $rB > C$: the relatedness-weighted benefit $rB$ exceeds the helper's net cost $C$. The broad definition has two sub-cases, and every result on this site says which one it belongs to:

- **Kin selection through parental care:** the recipients are the helper's own offspring.
- **Kin selection among non-offspring relatives:** the recipients are siblings, cousins or neighbours who share descent. This is the classic indirect-fitness case at the centre of Hamilton's theory. Much of the literature (for example West, Griffin and Gardner 2007) keeps the name "kin selection" for this sub-case alone and treats care for one's own offspring as direct fitness. This site uses the broad definition.

**The goal.** To establish kin selection, in this broad sense, in an **ecological setting**: individuals with energy reserves, a limited renewable food supply, death by starvation, births that need resources and go into free space, and individuals that move in search of food, so that population size and empty space follow resources rather than a fixed replacement rule.

**Where it stands.** Each row is one step; the Yes/No columns show which elements its model contains, and the last two columns say whether helping spread from rare and where the experiment is. Yes/No = the element is in the model or not; ✓ = achieved, ✗ = not achieved yet.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr>
          <th rowSpan={2}>Step</th>
          <th colSpan={3}>The help</th>
          <th colSpan={4}>Ecology</th>
          <th rowSpan={2}>Achieved</th>
          <th rowSpan={2}>Experiment</th>
        </tr>
        <tr>
          <th>Costly to the helper</th>
          <th>To own offspring</th>
          <th>To other relatives</th>
          <th>Energy budget</th>
          <th>Limited food</th>
          <th>Births need free space</th>
          <th>Agents move</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style={{ textAlign: 'center' }}>1</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/kin_selection">Moran kin selection</a> (warm-up)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>2</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder K0</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>3</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder K1</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>4</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder R1-R4</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>5</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder R5a-R8</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>6 <strong>Goal A</strong></td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td>Not yet built</td></tr>
        <tr><td style={{ textAlign: 'center' }}>7</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/kin_selection">Ecological kin model</a> (inconclusive)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>8</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Probably (not measured)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Partly (one jump at maturity)</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/network_reciprocity">Ecological network model</a> (not a kin test)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>9 <strong>Goal B</strong></td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td>Not yet built</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Steps towards kin selection, as defined above, in an ecological setting. Goal A: care for own offspring with full ecology, including movement; goal B: help to other relatives with full ecology, including movement. Step 7 also included care for own young (household juveniles). Step 8 was built as a network-reciprocity test: help goes to everyone nearby, relatedness was not tracked, and its rise was too small to count (mean trait +0.013 over 500 steps, 5 seeds). All results hold only at the settings tested.</figcaption>
</figure>

**Note.** Still to achieve: steps 5 to 9. No kin-selection experiment so far has agents that move in search of food: in steps 1 to 6 they stay on their site for life, step 7 has no space at all, and in step 8 a few adults make one random jump when they mature. A planned movement step on the ladder (R5b) was skipped because the grid was almost full. Step 5 is the next step for care of own offspring: it failed once births needed free space, possibly because relatives born close together compete for that space (kin competition, untested). Steps 7 to 9 are the harder track, help to relatives other than offspring: step 2 worked only at benefit-to-cost ratios of 12 and 24, and its control changes local settling and relatedness together; the ladder never added ecology to it; the ecological kin model (step 7) rose in some runs, but that could not be separated from the population's survival; and the ecological network model (step 8) has costly help with no return to the helper, but tracks no relatedness and showed only a very small rise. It could still be a starting point for this track. Two non-kin models already have more of the goal's ecology and could host either goal: [Cooperative Hunting](/evolved-cooperation/cooperative-hunting) has an energy budget, regrowing grass, starvation and agents that move, but returns the shared kill to the hunters and has no births into free space; the [Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma) has births into adjacent empty cells and some movement, but no limited food. Neither tracks relatedness.



<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.6rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
<strong>Robust initiator.</strong> Of the five Nowak mechanisms, kin selection is the most biologically robust initiator of cooperation from rare. It works because offspring inherit the parent's cooperative trait and stay nearby — automatically clustering cooperators together. This spatial proximity is a trivial consequence of reproduction itself, requiring no additional biological conditions. Other mechanisms that also spread cooperation from rare (direct reciprocity with a spatial scaffold) depend on partner stability and memory that are not automatically given. The <a href="/evolved-cooperation/nowak-mechanisms#spread-vs-maintenance">Nowak Mechanisms overview</a> maps this distinction across all five mechanisms. One qualification: in the spread-from-rare runs here, a helper keeps part of its own benefit, so helping has no net direct cost (weak altruism); help with a real net cost to the helper did not spread in this model (see <a href="#later-tests-self-benefit-and-speed">Later tests</a>). By this site's own <a href="#what-counts-as-kin-selection-here">definition</a>, which requires a real net cost, that spread is therefore step 1 of the stepwise table, a warm-up, not kin selection itself. In models with energy, limited food and births into free space, this robustness is narrower; see <a href="#from-the-moran-model-to-an-ecological-model">From the Moran model to an ecological model</a>.
</div>

## How It Is Implemented Here

Relatedness is operationalised through **lineage labels**. Every site carries an inherited lineage identifier. The positive routing kernel assigns higher weight to same-lineage neighbors than to other-lineage neighbors:

$$
K^+_{j \to i} \propto
\begin{cases}
w_{\text{same}} & \text{if lineage}_j = \text{lineage}_i \\
w_{\text{other}} & \text{otherwise}
\end{cases}
$$

with row normalization applied afterward. Because offspring inherit the parent's lineage label, cooperator clusters accumulate same-lineage neighbors over time, which progressively recirculates more of the cooperative benefit back toward cooperators — the positive feedback that makes cooperation viable.

## One Step

One full synchronous kin-selection update runs as follows. All sites update simultaneously.

<figure style={{ margin: '0 0 1.25rem 0' }}>
<div style={{ border: '1px solid #d6e4f5', overflow: 'hidden' }}>

<div style={{ background: '#0f3368', padding: '1rem 1.5rem' }}>
<div style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem' }}>Kin Selection Simulation Step</div>
<div style={{ color: '#ccdcef', fontSize: '0.9rem' }}>One synchronous grid update from step t to step t + 1 under kin-selection routing.</div>
</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>1</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Start from the current grid state</p>

Each site stores one cooperation trait $h$ and one inherited lineage label.

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

$$B_i^+ = B_{\text{plus}} \cdot h_i, \qquad C_i = C_{\text{scale}} \cdot h_i$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>3</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Build the kin-weighted routing kernel</p>

Assign raw weight $w_{\text{same}}$ to same-lineage neighbors and $w_{\text{other}}$ to other-lineage neighbors, then row-normalize:

$$w_{ij} = \begin{cases} w_{\text{same}} & \text{if } \text{lineage}_i = \text{lineage}_j \\ w_{\text{other}} & \text{otherwise} \end{cases} \qquad K_{ij}^+ = \frac{w_{ij}}{\sum_k w_{ik}}$$

</div>
</div>
</div>

<div style={{ textAlign: 'center', padding: '2px 0', color: '#1c4b8f', fontSize: '1.5rem', lineHeight: 1, borderTop: '1px solid #d6e4f5', borderBottom: '1px solid #d6e4f5', background: '#ffffff' }}>↓</div>

<div style={{ display: 'flex', borderBottom: '1px solid #d6e4f5', background: '#eaf2fb' }}>
<div style={{ width: '6px', background: '#0f3368', flexShrink: 0 }} />
<div style={{ display: 'flex', gap: '1rem', padding: '0.9rem 1.25rem', alignItems: 'flex-start', flex: 1 }}>
<div style={{ minWidth: '42px', width: '42px', height: '42px', background: '#1c4b8f', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>4</div>
<div style={{ flex: 1 }}>
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Accumulate lineage-weighted receipts</p>

Each site sums the kin-weighted share of cooperative benefit received from its neighbors:

$$R_i^+ = \sum_j K_{ji}^+ \cdot B_j^+$$

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

$$W_i = w_0 + R_i^+ - C_i$$

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
<p style={{ fontWeight: 700, color: '#0f3368', margin: '0 0 0.35rem' }}>Sample a local parent by softmax over fitness, copy trait and lineage</p>

Parent selection is restricted to the site's local neighborhood. The offspring inherits trait $h$ (with small Gaussian mutation) and lineage label — same-lineage clusters grow when cooperators reproduce locally.

</div>
</div>
</div>

</div>
<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> One synchronous kin-selection update from step <code>t</code> to step <code>t + 1</code>.</figcaption>
</figure>

**Production**

Each site produces cooperative output and pays a private cost proportional to its trait:

$$B_i^+ = B_{\text{plus}} \cdot h_i$$

$$C_i = C_{\text{scale}} \cdot h_i$$

**Kernel construction**

For each producer $i$, a raw routing weight $w_{ij}$ is assigned to each neighbor $j$ based on lineage match, then row-normalized so weights sum to 1:

$$w_{ij} = \begin{cases} w_{\text{same}} & \text{if } \text{lineage}_i = \text{lineage}_j \\ w_{\text{other}} & \text{otherwise} \end{cases}$$

$$K_{ij}^+ = \frac{w_{ij}}{\sum_k w_{ik}}$$

**Routing**

Each site receives the lineage-weighted share of every neighbor's production:

$$R_i^+ = \sum_j K_{ji}^+ \cdot B_j^+$$

**Fitness score**

$$W_i = w_0 + R_i^+ - C_i$$

**Local replacement**

Each site samples a parent from its local neighborhood via softmax over $W$. The offspring inherits the parent's trait $h$ (with small Gaussian mutation) and lineage label. Because the lineage label is inherited, same-lineage clusters grow when local cooperators outcompete their neighbors — the feedback that sustains cooperation.

Variable definitions:

- $h_i$ is site $i$'s cooperation trait in [0, 1]
- $B_i^+$ is the cooperative benefit produced by site $i$
- $C_i$ is the private cost paid by site $i$
- $K_{ij}^+$ is the normalized routing weight from producer $i$ to recipient $j$
- $R_i^+$ is the total routed benefit received by site $i$
- $W_i$ is the fitness score used for local replacement
- $w_0$ is the fixed baseline fitness shared by all sites, which dampens selection intensity

## Worked Example

Consider a focal site $i$ with four von Neumann neighbors, two same-lineage (A) and two other-lineage (B):

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--bordered site-table--striped">
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Site</th>
        <th>Lineage</th>
        <th>Trait $h$</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$i$</td>
        <td>A</td>
        <td>0.8</td>
      </tr>
      <tr>
        <td>$j_1$</td>
        <td>A</td>
        <td>0.7</td>
      </tr>
      <tr>
        <td>$j_2$</td>
        <td>A</td>
        <td>0.6</td>
      </tr>
      <tr>
        <td>$j_3$</td>
        <td>B</td>
        <td>0.9</td>
      </tr>
      <tr>
        <td>$j_4$</td>
        <td>B</td>
        <td>0.5</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 3:</strong> Worked example: trait values and lineage assignments for focal site $i$ and its four von Neumann neighbors.</figcaption>
</figure>

**Production**

$$B_i^+ = 1.0 \times 0.8 = 0.80, \qquad C_i = 0.2 \times 0.8 = 0.16$$

**Outgoing kernel row for site $i$**

Raw weights: $w_{\text{same}} = 0.8$ for $j_1, j_2$; $w_{\text{other}} = 0.2$ for $j_3, j_4$. Row sum = 2.00, so normalized weights are 0.40 for same-lineage and 0.10 for other-lineage.

**What $i$ sends**

$$i \to j_1: \ 0.80 \times 0.40 = 0.32 \qquad i \to j_3: \ 0.80 \times 0.10 = 0.08$$

Same-lineage neighbors receive 4× more benefit than other-lineage neighbors.

**What $i$ receives** (assuming symmetric neighborhood structure)

$$R_i^+ = \underbrace{0.7 \times 0.40}_{j_1} + \underbrace{0.6 \times 0.40}_{j_2} + \underbrace{0.9 \times 0.10}_{j_3} + \underbrace{0.5 \times 0.10}_{j_4} = 0.66$$

**Fitness**

$$W_i = 1.0 + 0.66 - 0.16 = 1.50$$

**Why kinship helps**

If $i$ were surrounded by four other-lineage neighbors with the same traits, all incoming weights would be 0.10:

$$R_i^+ = (0.7 + 0.6 + 0.9 + 0.5) \times 0.10 = 0.27, \qquad W_i = 1.0 + 0.27 - 0.16 = 1.11$$

The lineage cluster raises fitness from 1.11 to 1.50 — a difference that compounds over many steps as same-lineage cooperators expand together.

## Key Parameters

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--bordered site-table--striped">
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Default</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>kin_weight_same_lineage</code></td>
        <td><code>0.8</code></td>
        <td>Routing weight toward same-lineage neighbors</td>
      </tr>
      <tr>
        <td><code>kin_weight_other_lineage</code></td>
        <td><code>0.2</code></td>
        <td>Routing weight toward other-lineage neighbors</td>
      </tr>
      <tr>
        <td><code>B_plus_scale</code></td>
        <td><code>1.0</code></td>
        <td>Scales cooperative benefit produced per unit trait</td>
      </tr>
      <tr>
        <td><code>C_scale</code></td>
        <td><code>0.2</code></td>
        <td>Private cost per unit trait</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 4:</strong> Key parameters controlling kin-selection routing weights and payoff scaling.</figcaption>
</figure>

Hamilton's rule maps onto these parameters as $r \approx w_{\text{same}} / (w_{\text{same}} + w_{\text{other}})$, $B = $ `B_plus_scale`, $C = $ `C_scale`.

## Simulation Results

The [Nowak Mechanisms overview](/evolved-cooperation/nowak-mechanisms#spread-vs-maintenance) reports kin selection as **Yes** for both spread from rare and maintenance. This page demonstrates both and shows exactly how the mechanism operates.

Scripts: [`utils/proof_of_mechanism.py`](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/proof_of_mechanism.py) and [`well_mixed/utils/proof_of_mechanism.py`](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/well_mixed/utils/proof_of_mechanism.py). 5 seeds per scenario, 1000 steps each. Success threshold: mean final cooperation trait ≥ 0.60.

### Step 1 — Maintenance: cooperation holds when common

Starting cooperation trait ≈ 0.90 (high), default kin bias (same-lineage weight 0.8, other-lineage weight 0.2), $B/C = 5$.

**Result: 5/5 seeds successful. Mean final trait = 0.984.**

Cooperation not only persists but rises slightly as the Moran process filters out low-trait agents. The kin-weighted routing recirculates benefit preferentially back toward same-lineage cooperators, creating a fitness premium that fully offsets the private cost. Hamilton's rule ($rB > C$) is met and the population locks into near-maximum cooperation.

### Step 2 — Spread from rare: kin selection enables invasion

Starting cooperation trait ≈ 0.05 (rare), same kin bias and $B/C$ as above.

**Result: 5/5 seeds successful. Mean final trait = 0.872.**

From a starting frequency of 5%, cooperation spreads to 87% on average across seeds. Offspring inherit the parent's lineage and stay local, automatically clustering same-lineage cooperators together. The kin-biased routing then preferentially recirculates benefit within those clusters, accelerating their growth. The ablation below isolates how much each component contributes.

### Step 3 — Ablations: what breaks the mechanism

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered">
      <colgroup>
        <col style={{ width: '30%' }} />
        <col style={{ width: '18%' }} />
        <col style={{ width: '16%' }} />
        <col style={{ width: '36%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Success rate</th>
          <th>Mean trait</th>
          <th>Interpretation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>maintenance_common_start</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>5 / 5</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>0.984</td>
          <td>Maintenance confirmed. Kin-biased routing locks cooperation near maximum.</td>
        </tr>
        <tr>
          <td>spread_from_rare_kin_bias</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>5 / 5</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>0.872</td>
          <td>Spread from rare confirmed. Cooperation invades reliably from 5% with kin bias.</td>
        </tr>
        <tr>
          <td>no_kin_bias_ablation (spatial)</td>
          <td style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>1 / 5</td>
          <td style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>0.488</td>
          <td>Equal kin weights on the same spatial grid — network reciprocity alone. Spread is partial and stochastic at this run length (1/5, against 5/5 with the kin bias); in later, longer tests uniform routing caught up. Spatial structure supported spread in these tests, faster with the kin bias.</td>
        </tr>
        <tr>
          <td>well_mixed_control (kin preference, no kin proximity)</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>0 / 5</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>0.006</td>
          <td>Fully connected population — kin preference active but offspring scattered globally, so no kin proximity. Indistinguishable from the no-kin-bias control (0.005). Consistent with kin proximity (provided automatically by local reproduction) being what makes the effect work in this model.</td>
        </tr>
        <tr>
          <td>below_hamiltons_rule (spatial)</td>
          <td style={{ backgroundColor: '#FFFFFF' }}>0 / 5</td>
          <td style={{ backgroundColor: '#FFFFFF' }}>0.008</td>
          <td>$B/C = 0.25$ ($rB$ &lt; $C$). Cooperation collapses from 90% to near zero — Hamilton's rule boundary confirmed within the spatial model.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 5:</strong> Proof-of-mechanism results. 5 seeds per scenario, 1000 steps. Success = mean final trait ≥ 0.60.</figcaption>
</figure>

**What the ablations show.** The no-kin-bias ablation removes lineage weighting while keeping local reproduction, leaving only the spatial assortment from offspring proximity. The result — 1/5 seeds, mean 0.488 — is the baseline from local reproduction alone. Kin-biased routing raised that to 5/5 at this run length by preferentially recirculating benefit within same-lineage clusters, including back to the helper itself; later, longer tests found uniform routing also spreading (see Later tests below). The well-mixed control shows the other side: kin preference without kin proximity produced no detectable effect (0/5, mean 0.006 — identical to the no-kin-bias well-mixed control at 0.005). Kin proximity — automatically provided by local reproduction — was required in the tested controls (well-mixed 0/5 here; global-competitor replacement 1/20 in the later tests); kin-biased routing made spread faster on top of it, without being separated from the extra self-return it brings.

## Why kin bias speeds up spread: the self-routing advantage

The cluster-growth story — cooperators form patches, patches expand — explains maintenance. It does not explain why the kin-biased arm formed patches more reliably than spatial structure alone at the proof's run length. A lone cooperator on the grid surrounded entirely by other-lineage defectors would seem to gain little from kin routing.

The key is the self-routing term. Because self is always same-lineage and the neighbourhood includes self, the kernel routes approximately 50% of a cooperator's own output back to itself ($K^+_{i \to i} = w_\text{same} / (w_\text{same} + 4 \cdot w_\text{other}) = 0.8 / 1.6 = 0.5$ when all spatial neighbours are other-lineage). Fitness for that lone cooperator becomes:

$$W_i = 1 + 0.5 \cdot h_i \cdot B_\text{plus} - 0.2 \cdot h_i = 1 + 0.3 h_i > 1$$

here with the default benefit scale $B_\text{plus} = 1$ and cost $0.2 \cdot h_i$.

Even before a cluster forms, a lone cooperator on the spatial grid already outcompetes local defectors. Network reciprocity without kin bias lacks this: a lone cooperator with uniform routing gets back 0.2·h of its own benefit, exactly its cost, so it gains nothing on net and its fate is left to drift until a cluster forms. This is consistent with the kin-biased arm's faster early spread: it reached 5/5 in the proof run, against network reciprocity's stochastic 1/5, plausibly by shortening the vulnerable solo-cooperator phase; uniform routing was slower but later also spread (see below). In a well-mixed population this advantage disappears: the self-routing benefit is diffused across 575 neighbours rather than concentrated in a local neighbourhood, and the local kin-bias advantage is absent in the well-mixed control.

### Later tests: self-benefit and speed

Later matched tests (20 runs per arm, 2026-11-19) qualify the 1/5 versus 5/5 contrast above. Label-biased routing spread in 14/20 runs at 1000 steps, uniform routing in 3/20; but by 3000 steps uniform routing had also spread in 20/20 runs, as far as label-biased routing. So the label-biased arm spread faster, and these tests do not separate the bias from the extra self-return it brings; in the arm with self removed from routing (which also changes how the benefit is distributed), label-biased routing failed in 0/20 runs. With uniform routing, a lone helper keeps 0.2·h of its own benefit, exactly its cost; with the label bias it keeps 0.5·h. Where helping had a net direct cost at some number of related neighbours, it failed in every arm (0/20). The spread in this model is therefore consistent with weak altruism (no net direct cost to the helper) in a population where offspring stay near their parents; there was no sign of kin *discrimination* making costly helping pay. Details: the caveat in the [Moran kin-selection README](https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/kin_selection) and the ladder's [RESULTS.md](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md) (steps 0-0c).

## Live simulation

Both grids below start from the **same random initial state** — roughly 5% cooperators, 18 lineages, kin bias 0.8/0.2. Left satisfies Hamilton's rule ($B/C = 5$, $rB > C$). Right violates it ($B/C = 0.2$, $rB < C$) — cost swamps benefit even with kin-biased routing. Press **Play** to watch spatial kin clusters grow on the left and collapse on the right. Press **Reset** to start a new random configuration.

<figure style={{ margin: '0 0 1.25rem 0' }}>
<KinSelectionComparison />
<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Live kin-selection comparison. Both grids start from the same random initial state (~5% cooperators, 18 lineages, kin bias 0.8/0.2). Left: Hamilton's rule satisfied ($B/C = 5$, $rB$ &gt; $C$ — cooperation spreads). Right: Hamilton's rule violated ($B/C = 0.2$, $rB$ &lt; $C$ — cooperation collapses).</figcaption>
</figure>

## From the Moran model to an ecological model

The results above come from the Moran model: a full grid where every site is refilled each step by a neighbour's offspring. An earlier [ecological kin-selection model](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/kin_selection) (sexual reproduction, households, care for juveniles) let helping rise from rare in some runs (2 of 5 in its proof suite), also when relatedness cues were shuffled. But its controls did not separate that spread from population survival: populations persisted with helper care, while no tested survival floor (up to 0.4) kept populations without helpers alive. So it is not an established kin-selection result. In a follow-up, learned instead of inherited helping gave no detectable persistence benefit over a small constant care effort. A separate line of work, the [kin selection ladder](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/kin_selection/ladder), asked whether kin selection survives as the model becomes more like a real ecology. Starting from the Moran model, it added one ingredient at a time (each pre-registered, with at most two attempts and its own control), and required helping to spread from rare at every step.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered">
      <colgroup>
        <col style={{ width: '28%' }} />
        <col style={{ width: '72%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Stage</th>
          <th>What happened</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Moran level, costly help</td>
          <td>Helping spread only when the helper got part of its own benefit back. Help with a real net cost to the helper failed in every arm (0/20 runs).</td>
        </tr>
        <tr>
          <td>Overlapping generations, costly help to neighbours</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>At benefit-to-cost ratios of 12 and 24, costly help spread in 20/20 runs when offspring settled locally (not at 3 or 6); at 12 it spread in 0/20 under the global-competitor control, where the parent for each vacancy was drawn from five random sites anywhere on the grid. This is consistent with kin selection through viscosity (relatives stay close, so help reaches relatives), but the test does not separate it from network reciprocity, which also works through helpers clustering with helpers, and the control changes several things at once.</td>
        </tr>
        <tr>
          <td>Care for own offspring, then survival, ages, energy, birth costs, starvation and limited food</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>Care for one's own young spread at every step (19-20/20 runs against 0/20 for help to young neighbours). It also spread when offspring settled anywhere on the grid, so this site counts it as kin selection through parental care (see <a href="#what-counts-as-kin-selection-here">What counts as kin selection here</a>), not kin selection among non-offspring relatives; it did not depend on relatives living close together, and the comparison does not isolate parentage alone.</td>
        </tr>
        <tr>
          <td>Empty space</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>Not reached. Several attempts left the grid almost full, and one breeding-age setting could not sustain a population. When parents gave birth into nearby free sites, substantial empty space appeared in one of two versions, but care for own young then settled near a third of its maximum and the main test missed the endpoint (one higher-benefit arm reached it in 4/20 runs).</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 7:</strong> The kin selection ladder, from the Moran model toward an ecological model (20 seeds per arm; success = final mean helping ≥ 0.60). Details and all numbers are in the module's <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">RESULTS.md</a>.</figcaption>
</figure>

**What this adds to the picture above.** Kin selection among non-offspring relatives, with a real cost to the helper, did appear outside the simplest model, but in one step only, at the higher benefit-to-cost ratios tested (12 and 24), and only while offspring stayed near their parents. Kin selection through parental care was more robust across the tested variants, but in these tests it did not require offspring to stay near their parents. One late result points in an unexpected direction: once births went into free sites, care for own young spread much further when offspring dispersed across the whole grid (to near-maximum in 20/20 runs) than when they stayed local. That pattern is consistent with kin competition (relatives competing with each other for the same nearby space, which in theory can cancel the benefit of helping them; Taylor 1992), but it was not tested directly. A follow-up measurement on the same runs (diagnostic DR8, exploratory) looked at the neighbourhoods of would-be parents. With local births, about two thirds of breeding opportunities found no free neighbouring site, for strong and weak helpers alike (strong helpers were blocked only 0.6 percentage points more often), and a parent's own offspring made up about 12% of its neighbours in both groups. With grid-wide dispersal, none of the measured opportunities was blocked. So, locally, space was often short for strong and weak helpers alike, not specifically around helpers; the idea that helpers' own young fill the space around them is not supported in size. Why care spread further under grid-wide dispersal remains open.

## Kin cues: the ethnocentrism model

The models above track lineage directly. Real organisms usually cannot see relatedness; at most they see a cue that tends to go with it. Hammond and Axelrod's (2006) ethnocentrism model is a simple test case. Agents on a 51×51 torus have an inherited colour (one of four) and two inherited flags: help neighbours of the same colour or not, and help neighbours of another colour or not. Helping costs the helper 0.01 and gives the neighbour 0.03 in chance to reproduce; offspring are placed next to the parent, and agents die at random (10% per tick), which keeps empty space available. In the original model, ethnocentrics (who help only their own colour) become the most common strategy, at about three quarters of the population.

We ported the NetLogo version of the model (Wilensky 2003) to Python, checked it against the NetLogo runs (nine experiments, no clear difference), and added a pedigree so the relatedness of neighbours can be measured. Six pre-registered experiments followed, with 30 runs per condition (60 in the last). The model's inner loops were later compiled with Numba, which made a run 4 to 8 times faster (about 0.5–0.8 s instead of 3.4 s for a 2,000-tick run on the 51×51 grid). The random draws happen in the same order as before, so every committed run reproduces exactly, and all results below are unchanged.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered">
      <colgroup>
        <col style={{ width: '28%' }} />
        <col style={{ width: '72%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Experiment</th>
          <th>What happened</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Who is helped (standard model)</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>Same-colour neighbours were usually kin: 90% shared a founder (the immigrant their line descends from), against 18% of different-colour neighbours, and 43% of same-colour neighbour pairs were at most two births apart (parent and offspring, siblings, or grandparent and grandchild). Colour worked as a strong but imperfect cue of descent.</td>
        </tr>
        <tr>
          <td>Random colour: children get a random colour, so colour no longer tracks descent</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>Ethnocentrics fell from 75.5% to 12.9% of the population; strategies that help regardless of colour became more common. How often help was given hardly changed (77% vs 76% of meetings), while neighbours remained related through local birth (70% shared a founder).</td>
        </tr>
        <tr>
          <td>Random colour with own-colour meetings approximately matched: children get a random colour, but one colour is drawn far more often, so about 80% of meetings are with the own colour, as with inherited colour</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>Ethnocentrics made up 32.4% of the population, against 75.5% with inherited colour and 12.9% with uniform random colour. So most of the fall under random colour remained when the mean own-colour meeting share was approximately matched (80% vs 81% of ethnocentrics’ neighbours). Altruists were again the most common strategy.</td>
        </tr>
        <tr>
          <td>Lower viscosity: offspring placed anywhere in the world with probability d</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>Cooperation fell as d rose: with random colour from 76% to 4% of meetings at d = 1. Inherited colour did not prevent this: at d = 1 both colour rules gave about 4%, with egoists at about 90%. At intermediate dispersal inherited colour went with more cooperation (45% vs 29% at d = 0.25; descriptive only).</td>
        </tr>
        <tr>
          <td>Shuffle: with random colour, at the end of every tick the agents swap places at random among the occupied cells, so neighbours who meet share a founder only as often as under random mixing; offspring are still born next to their parent</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>Founder sharing among neighbours who meet fell to the level of random mixing (from 0.64 above it to 0.00). Cooperation fell from 76% to 11% of meetings, and egoists rose from 8% to 76% of the population. The drop was in which strategies existed, not in whom they met: each strategy still met its own colour 25% of the time. Shuffling a tenth of the cells per tick already brought cooperation down to 22% (descriptive only).</td>
        </tr>
        <tr>
          <td>Hamilton's-rule prediction: one colour, so helping is a single inherited trait; relatedness r first measured without selection at four shuffle levels, then the benefit set so that r × benefit / cost = k</td>
          <td style={{ backgroundColor: '#D6E4F5' }}>Relatedness measured in advance predicted whether helpers became more or less common than without selection in all 8 cells far from the threshold (k = 0.5 and 2), across relatedness from 0.79 to 0.23. Near the threshold (k = 0.8 and 1.25), 6 of 8 cells went the predicted way and 2 were unclear; none went the opposite way (Display 9).</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 8:</strong> Kin cues in the ethnocentrism model (Experiment 104 settings, 30 runs per condition; 60 in the Hamilton's-rule test). Blue: the pre-registered expectation was met (for the Hamilton's-rule test, the main hypothesis; the near-threshold one was inconclusive); red: the test that the colour cue can stand in for local birth was not met. Details and all numbers are in the module's <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/ethnocentrism/RESULTS.md">RESULTS.md</a>.</figcaption>
</figure>

**What this adds to the picture above.** In this model, cooperation was highest when offspring stayed near their parents, so that neighbours were often related, as in the viscosity results above. With inherited colour acting as a cue of descent, help went to same-colour neighbours, who were closer kin while offspring stayed local. At full dispersal, inherited colour did not produce more cooperation than random colour: egoists of the same colour could collect help from ethnocentrics they settled next to, and cooperation fell to about 4% of meetings under both colour rules. Random colour also made same-colour meetings rarer (25% instead of 80%); bringing the average own-colour meeting share back to about 80% with still-random colour restored only part of the ethnocentric share (32% instead of 76%). Two limits apply. That third experiment matches the average meeting share, not the colour structure (one dominant colour rather than four local colour clusters), so it narrows this confound rather than removing it. The dispersal experiment changes relatedness together with how often births are blocked, how large the population grows and whom agents meet.

The shuffle experiment addresses that last limit. It keeps local birth and leaves the occupied cells occupied at each shuffle, but brings founder sharing among neighbours who meet down to the random-mixing level. Cooperation then collapsed as it did under full dispersal. Of these experiments, it is the clearest test of whether removing spatial assortment lowers cooperation. The result is consistent with cooperation being supported by assortment through local birth (the kin-selection reading). It still does not show that relatedness alone is the cause. Because strategies are inherited, neighbours also stop sharing strategies, and that cannot be separated from shared descent here. Competition among relatives for nearby empty cells changes too, and the population shrank (from about 1,620 to 870) as cooperation fell.

The last experiment asks a sharper question: not only whether helping depends on relatedness, but whether Hamilton's rule, r × benefit > cost, predicts the direction of change in the share of helpers on either side of the threshold. With one colour, helping is a single inherited trait. Relatedness r among neighbours who meet was measured first in runs without selection, at four shuffle levels, and the benefit was then set so that r × benefit / cost = k. The rule predicts that helpers become more common than in the neutral runs when k > 1, and less common when k < 1.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered">
      <thead>
        <tr>
          <th>k = r × benefit / cost</th>
          <th>r = 0.79 (no shuffle)</th>
          <th>r = 0.51</th>
          <th>r = 0.35</th>
          <th>r = 0.23</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>0.5</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.11</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.11</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.14</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.16</td></tr>
        <tr><td>0.8</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.05</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.07</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.07</td><td style={{ backgroundColor: '#D6E4F5' }}>−0.10</td></tr>
        <tr><td>1.25</td><td style={{ backgroundColor: '#D6E4F5' }}>+0.04</td><td style={{ backgroundColor: '#D6E4F5' }}>+0.05</td><td>+0.03</td><td>+0.01</td></tr>
        <tr><td>2</td><td style={{ backgroundColor: '#D6E4F5' }}>+0.17</td><td style={{ backgroundColor: '#D6E4F5' }}>+0.21</td><td style={{ backgroundColor: '#D6E4F5' }}>+0.19</td><td style={{ backgroundColor: '#D6E4F5' }}>+0.16</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 9:</strong> Hamilton's-rule prediction test in the one-colour ethnocentrism model: share of helpers in the last 100 ticks minus the share without selection at the same relatedness (60 runs per cell). Blue: the predicted direction, with p &lt; 0.01; white: unclear. No cell went the opposite way. Details in section 7 of the module's <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/ethnocentrism/RESULTS.md">RESULTS.md</a>.</figcaption>
</figure>

Far from the threshold the prediction held at every relatedness level. Near it, it held at the two higher relatedness levels and was unclear, but not reversed, at the two lower ones. The descriptive crossing of the helper-share difference (interpolated from the four k values) lay slightly above k = 1 and rose as relatedness fell, from about 1.02 to 1.21. This supports the pre-registered quantitative benchmark: relatedness measured in advance, with the raw payoffs, predicted the direction of the late-run change in the share of helpers far from the threshold. Two limits remain. In a lattice model like this, kin selection and spatial (network) reciprocity are two descriptions of the same process, so no result here can favour one over the other. And why the crossing lies above 1 and rises with shuffling was not tested. Relatedness under selection was somewhat lower than without it, which could explain the rise; competition among relatives for empty cells is another possible, untested contributor.

## In Plain Terms

Read together, the results on this page suggest that **cooperation spread most reliably when the benefit came back to the helper or to its own offspring**; costly help to other relatives spread only under narrower conditions. This fits the wider pattern described on the [Evolved Cooperation](/evolved-cooperation#in-plain-terms) page.

- **Moran model.** In the tested runs, helping spread from rare when the helper kept enough of its own benefit to cover its cost (weak altruism). Help with a real net cost to the helper failed in every tested arm (0/20 runs). In the stepwise table above this is step 1, a warm-up, not kin selection.
- **Costly help to neighbours.** It spread at one ladder stage only: when offspring settled locally and the benefit-to-cost ratio was 12 or 24. It did not spread at ratios of 3 or 6, or under the global-competitor control tested at 12. This is step 2; no ecology was added to it.
- **Care for one's own young.** It spread at every completed ladder stage, including when offspring settled anywhere on the grid; the empty-space stage was not reached. By the definition used here this is kin selection through parental care, not kin selection among non-offspring relatives: steps 3 and 4 achieved, step 5 (births into free space) not.
- **Kin cues.** In the ethnocentrism model, ethnocentrics (who help only their own colour) were much more common when colour tracked shared descent: 75.5% of the population, against 12.9% with random colour. How often help was given hardly changed (77% vs 76% of meetings). These comparisons do not rule out every other difference.

So, on this evidence, living among relatives went with cooperation spreading mainly where the benefit came back to the helper or its own young. These designs do not fully separate the helper's own return from the benefit to relatives or from local structure, and these are abstract models: read this as a tentative pointer, not a settled law.

## See Also

- [Spatial Altruism](/evolved-cooperation/spatial-altruism) — Mitteldorf & Wilson's (2000) baseline, no-`harshness`/no-`disease` case is a concrete historical instance of exactly the "stochastic 1/5" scenario named above in [Why kin bias speeds up spread](#why-kin-bias-speeds-up-spread-the-self-routing-advantage): a lone cooperator recaptures `1/5` of its own benefit purely because it is one of five participants in its own neighbourhood lottery, with no lineage bias at all. That paper derives its own viability threshold, `b > 5c`, from precisely this relatedness coefficient — Hamilton's rule `rB > C` with `r = 1/5` gives `b/5 > c`, i.e. `b > 5c`. Where this page's kin bias, by explicitly routing benefit toward same-lineage neighbours (and back to the helper), coincided with `5/5` success at the proof run's duration (later tests showed uniform routing could catch up), Spatial Altruism's harsher, higher-density variants achieve a comparable reliability boost through a different route entirely — differential group/patch density rather than lineage-biased routing — which is also why that page's own "See Also" section treats it as closer to Group Selection than to Kin Selection once `harshness` and `disease` are turned on.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
- Hammond, R. A., and Axelrod, R. (2006). *The evolution of ethnocentrism*. *Journal of Conflict Resolution*, 50(6), 926–936. https://doi.org/10.1177/0022002706293470
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
- Taylor, P. D. (1992). *Altruism in viscous populations — an inclusive fitness model*. *Evolutionary Ecology*, 6(4), 352–356. https://doi.org/10.1007/BF02270971
- Wilensky, U. (2003). *NetLogo Ethnocentrism model*. Center for Connected Learning and Computer-Based Modeling, Northwestern University. http://ccl.northwestern.edu/netlogo/models/Ethnocentrism
