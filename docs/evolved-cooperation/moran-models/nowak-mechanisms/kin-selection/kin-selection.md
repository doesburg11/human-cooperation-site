---
id: kin-selection
title: Kin Selection
sidebar_position: 1
slug: /evolved-cooperation/kin-selection
---

import KinSelectionLiveGrid from '@site/src/components/KinSelectionLiveGrid';
import KinSelectionComparison from '@site/src/components/KinSelectionComparison';
import GithubLink from '@site/src/components/GithubLink';

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the <a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/kin_selection"><code>moran_models/nowak_mechanisms/kin_selection/</code></a> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms/kin_selection" />

Kin selection is the first of Nowak's five mechanisms for the evolution of cooperation. Cooperation spreads when the benefit delivered to a recipient, weighted by genetic relatedness, exceeds the private cost paid by the actor — Hamilton's rule: $rB > C$.

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.6rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>
<strong>Unique robustness.</strong> Of the five Nowak mechanisms, kin selection is the most biologically robust initiator of cooperation from rare. It works because offspring inherit the parent's cooperative trait and stay nearby — automatically clustering cooperators together. This spatial proximity is a trivial consequence of reproduction itself, requiring no additional biological conditions. Other mechanisms that also spread cooperation from rare (direct reciprocity with a spatial scaffold) depend on partner stability and memory that are not automatically given. The <a href="/evolved-cooperation/nowak-mechanisms#spread-vs-maintenance">Nowak Mechanisms overview</a> maps this distinction across all five mechanisms.
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
<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> One synchronous kin-selection update from step <code>t</code> to step <code>t + 1</code>.</figcaption>
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
  <figcaption className="site-table-caption"><strong>Display 2:</strong> Worked example: trait values and lineage assignments for focal site $i$ and its four von Neumann neighbors.</figcaption>
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
  <figcaption className="site-table-caption"><strong>Display 3:</strong> Key parameters controlling kin-selection routing weights and payoff scaling.</figcaption>
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
          <td>Equal kin weights on the same spatial grid — network reciprocity alone. Spread is partial and stochastic. The kin bias amplifies the spatial baseline from 1/5 to 5/5; the spatial structure is the necessary foundation.</td>
        </tr>
        <tr>
          <td>well_mixed_control (kin preference, no kin proximity)</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>0 / 5</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>0.006</td>
          <td>Fully connected population — kin preference active but offspring scattered globally, so no kin proximity. Indistinguishable from the no-kin-bias control (0.005). Confirms that kin proximity (provided automatically by local reproduction) is what makes kin selection work.</td>
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
  <figcaption className="site-table-caption"><strong>Display 4:</strong> Proof-of-mechanism results. 5 seeds per scenario, 1000 steps. Success = mean final trait ≥ 0.60.</figcaption>
</figure>

**What the ablations show.** The no-kin-bias ablation removes lineage weighting while keeping local reproduction, leaving only the spatial assortment from offspring proximity. The result — 1/5 seeds, mean 0.488 — is the baseline from local reproduction alone. Kin-biased routing amplifies that to 5/5 by preferentially recirculating benefit within same-lineage clusters. The well-mixed control confirms the other side: kin preference without kin proximity produces no effect at all (0/5, mean 0.006 — identical to the no-kin-bias well-mixed control at 0.005). Kin proximity — automatically provided by local reproduction — is the necessary condition; kin-biased routing is the amplifier on top of it.

## Why kin bias amplifies spatial structure: the self-routing advantage

The cluster-growth story — cooperators form patches, patches expand — explains maintenance. It does not explain why the kin bias makes patch formation so much more reliable than spatial structure alone. A lone cooperator on the grid surrounded entirely by other-lineage defectors would seem to gain little from kin routing.

The key is the self-routing term. Because self is always same-lineage and the neighbourhood includes self, the kernel routes approximately 50% of a cooperator's own output back to itself ($K^+_{i \to i} = w_\text{same} / (w_\text{same} + 4 \cdot w_\text{other}) = 0.8 / 1.6 = 0.5$ when all spatial neighbours are other-lineage). Fitness for that lone cooperator becomes:

$$W_i = 1 + 0.5 \cdot h_i \cdot B_\text{plus} - 0.2 \cdot h_i = 1 + 0.3 h_i > 1$$

Even before a cluster forms, a lone cooperator on the spatial grid already outcompetes local defectors. Network reciprocity without kin bias lacks this: a lone cooperator with uniform routing receives zero net benefit from its spatial neighbours and loses immediately. This is why the kin bias converts network reciprocity's stochastic 1/5 into a reliable 5/5 — it removes the vulnerable solo-cooperator phase. In a well-mixed population this advantage disappears: the self-routing benefit is diffused across 575 neighbours rather than concentrated in a local neighbourhood, and the effect vanishes.

## Live simulation

Both grids below start from the **same random initial state** — roughly 5% cooperators, 18 lineages, kin bias 0.8/0.2. Left satisfies Hamilton's rule ($B/C = 5$, $rB > C$). Right violates it ($B/C = 0.2$, $rB < C$) — cost swamps benefit even with kin-biased routing. Press **Play** to watch spatial kin clusters grow on the left and collapse on the right. Press **Reset** to start a new random configuration.

<figure style={{ margin: '0 0 1.25rem 0' }}>
<KinSelectionComparison />
<figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Live kin-selection comparison. Both grids start from the same random initial state (~5% cooperators, 18 lineages, kin bias 0.8/0.2). Left: Hamilton's rule satisfied ($B/C = 5$, $rB$ &gt; $C$ — cooperation spreads). Right: Hamilton's rule violated ($B/C = 0.2$, $rB$ &lt; $C$ — cooperation collapses).</figcaption>
</figure>

## See Also

- [Spatial Altruism](/evolved-cooperation/spatial-altruism) — Mitteldorf & Wilson's (2000) baseline, no-`harshness`/no-`disease` case is a concrete historical instance of exactly the "stochastic 1/5" scenario named above in [Why kin bias amplifies spatial structure](#why-kin-bias-amplifies-spatial-structure-the-self-routing-advantage): a lone cooperator recaptures `1/5` of its own benefit purely because it is one of five participants in its own neighbourhood lottery, with no lineage bias at all. That paper derives its own viability threshold, `b > 5c`, from precisely this relatedness coefficient — Hamilton's rule `rB > C` with `r = 1/5` gives `b/5 > c`, i.e. `b > 5c`. Where this page's kin bias converts that stochastic `1/5` into a reliable `5/5` by explicitly routing benefit toward same-lineage neighbours, Spatial Altruism's harsher, higher-density variants achieve a comparable reliability boost through a different route entirely — differential group/patch density rather than lineage-biased routing — which is also why that page's own "See Also" section treats it as closer to Group Selection than to Kin Selection once `harshness` and `disease` are turned on.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
