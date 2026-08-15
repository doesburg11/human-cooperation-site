---
id: nowak-mechanisms
title: Nowak Mechanisms
sidebar_position: 1
slug: /evolved-cooperation/nowak-mechanisms
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This section describes the five named Moran-process packages under <code>moran_models/nowak_mechanisms/</code> in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

This section contains one package for each of the five mechanisms for the evolution of cooperation identified in Nowak (2006). Each package is a thin wrapper over the shared [`interaction_kernel`](/evolved-cooperation/interaction-kernel) Moran engine.

## Shared Engine

All five mechanisms run on the same Moran update loop. What differs across them is the routing step — specifically the kernel that distributes cooperative benefit to neighbors, and any additional per-site state that modulates it.

## The Five Mechanisms

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '78%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mechanism</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>How cooperation is sustained</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/kin-selection">Kin Selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Benefit is routed with a lineage bias. Same-lineage neighbors receive more weight, operationalising Hamilton's rule <em>rB &gt; C</em>.</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/direct-reciprocity">Direct Reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Each site carries a memory of recently received help. Expressed cooperation is scaled by that memory, creating a direct reciprocal feedback loop.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/indirect-reciprocity">Indirect Reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Each site carries a public reputation. The routing kernel is biased toward higher-reputation recipients, sustaining cooperation through a reputation channel.</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/network-reciprocity">Network Reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Benefit is routed uniformly over local grid neighbors. Spatial structure alone protects cooperator clusters from exploitation, with no memory or lineage bias.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/group-selection">Group Selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Sites are partitioned into groups. Individual Moran replacement runs each step. Periodically the highest-fitness group is copied into the lowest-fitness group, adding a second level of selection.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> The five Nowak mechanisms and how each sustains cooperation in this implementation.</figcaption>
</figure>

## Spread vs. maintenance

The five mechanisms are often described as answers to the question "how does cooperation evolve?" But that question contains three distinct sub-questions — initiation (can a cooperative act occur at all?), spread (can cooperation increase in frequency when rare?), and maintenance (can cooperation resist invasion once common?) — and the five Nowak conditions address only the last.

**The Nowak conditions are maintenance conditions.** Each of the five rules — $rb > c$, $w > (T-R)/(T-P)$, $q > c/b$, $b/c > k$, $m/n > c/b$ — describes when a population already dominated by cooperators resists invasion by defectors. This is an evolutionary stability (ESS) condition. It is not a condition for spread from rare, and it is not a condition for the first cooperative act to occur.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '22%' }} />
        <col style={{ width: '28%' }} />
        <col style={{ width: '28%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mechanism</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Condition</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Spread from rare</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Maintenance (ESS)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/kin-selection">Kin selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>rb &gt; c</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong> — offspring stay near parents by definition, automatically creating kin clusters; 5/5 seeds <a href="#kin-selection-isolation-evidence" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/direct-reciprocity">Direct reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>w &gt; (T−R)/(T−P)</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#F8D7DA' }}><strong>No</strong> — rare TFT meets mostly ALLD; no memory of cooperation to reciprocate <a href="/evolved-cooperation/direct-reciprocity#step-1-pure-direct-reciprocity-fails" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong> <a href="/evolved-cooperation/direct-reciprocity#the-condition" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/indirect-reciprocity">Indirect reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>q &gt; c/b</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#F8D7DA' }}><strong>No</strong> — reputation system requires an existing cooperative base to bootstrap</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/network-reciprocity">Network reciprocity</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>b/c &gt; k</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#FFF3CD' }}><strong>Partial</strong> — cooperator clusters grow once formed, but a single isolated cooperator still loses to surrounding defectors</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}><a href="/evolved-cooperation/group-selection">Group selection</a></td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', fontStyle: 'italic' }}>m/n &gt; c/b</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#FFF3CD' }}><strong>Possible</strong> — if between-group selection is strong enough to offset within-group defector advantage</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5', backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> The five Nowak conditions mapped to spread from rare and maintenance. All five conditions are ESS (maintenance) conditions. Kin selection reliably spreads cooperation from rare because offspring proximity to parents is a trivial consequence of reproduction. The other mechanisms require additional biological conditions to achieve the same.</figcaption>
</figure>

<figure id="kin-selection-isolation-evidence" style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Kin selection — simulation evidence</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Spread from rare:</strong> 5/5 seeds, mean trait 0.872 — offspring inherit lineage and stay local, automatically creating kin clusters; this is kin selection as it operates in biology — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Maintenance:</strong> 5/5 seeds, mean trait 0.984 — kin-biased routing locks cooperation near maximum once common</li>
        <li><strong>No kin bias ablation:</strong> 1/5 seeds, mean trait 0.488 — removing kin bias while keeping local reproduction gives only partial spread; confirms kin-biased routing is the decisive amplifier on top of local reproduction</li>
        <li><strong>Well-mixed control — kin preference without kin proximity:</strong> 0/5 seeds, mean trait 0.006 — biologically incoherent scenario (kin selection requires offspring proximity, which local reproduction provides automatically); confirms that kin preference without kin proximity is meaningless — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/well_mixed/utils/proof_of_mechanism.py">well_mixed/proof_of_mechanism.py</a></li>
        <li><strong>Below Hamilton's rule:</strong> 0/5 seeds from 90% — rb &gt; c boundary confirmed</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Kin selection simulation evidence. The 5/5 spread result is kin selection operating as it does in biology — local reproduction automatically provides the kin proximity the mechanism requires. The well-mixed control tests kin preference without kin proximity, which has no biological counterpart.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Direct reciprocity — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance:</strong> proven — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed/utils/proof_of_mechanism.py">well_mixed/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-1-pure-direct-reciprocity-fails">Step 1 on direct reciprocity page</a></li>
        <li><strong>Spread from rare = No:</strong> proven — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed/utils/proof_stability_vs_invasion.py">well_mixed/proof_stability_vs_invasion.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-2-partner-persistence-is-necessary-but-not-sufficient-from-a-random-start">Step 2 on direct reciprocity page</a></li>
        <li><strong>Spatial clustering scaffold:</strong> network reciprocity provides origin, direct reciprocity provides maintenance — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/spatial_clustering/utils/proof_of_mechanism.py">spatial_clustering/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-3-spatial-structure-adds-network-reciprocity">Step 3 on direct reciprocity page</a></li>
        <li><strong>Kin clustering scaffold:</strong> partner permanence is the origin mechanism — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/kin_clustering/utils/proof_of_mechanism.py">kin_clustering/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-4-partner-permanence-not-spatial-clustering-is-the-origin-mechanism">Step 4 on direct reciprocity page</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Direct reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Indirect reciprocity — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> proven — 5/5 seeds, mean trait 0.873 — binary Nowak model (donor helps only if recipient reputation ≥ threshold, q=0.80 &gt; c/b=0.20) — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = No:</strong> proven — 0/5 seeds, mean trait 0.276 (q=0.80) and 0/5, mean trait 0.201 (q=0.05) — rare cooperators help defectors who have neutral initial reputation, but defectors never reciprocate; cooperators pay cost with no return and are eliminated before the reputation feedback loop can bootstrap — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
        <li><strong>Reputation gating ablation:</strong> without reputation-gated access to help, maintenance fails (2/5 seeds vs. 5/5 with gating) — defectors receive the same benefit as cooperators without paying the cost; confirms reputation-gated discrimination is the mechanism</li>
        <li><strong>Why the spatial model confounds this:</strong> the spatial grid provides network-reciprocity clustering on top of the reputation channel; the ablation (no reputation routing) still gives 5/5 success on the grid, proving the grid alone sustains cooperation. The well-mixed binary model isolates the reputation channel cleanly — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Indirect reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Network reciprocity — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> proven — 5/5 seeds, mean trait 0.928 — 24×24 von Neumann grid (k=4), b/c=5 &gt; k — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/network_reciprocity/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = Partial:</strong> proven — 2/5 seeds, mean trait 0.536 — cooperation spreads in replicates where a viable cluster forms by chance; fails in the others; directly demonstrates the stochastic cluster-formation threshold</li>
        <li><strong>b/c &gt; k boundary:</strong> proven — B_plus_scale=0.5 → b/c=2.5 &lt; k=4 — 0/5 seeds, mean trait 0.012 — cooperation collapses completely from 90% when condition is violated</li>
        <li><strong>k is the decisive parameter:</strong> proven — Moore neighbourhood (k=8) with same b/c=5 — 0/5 seeds, mean trait 0.009 — condition violated by increasing neighbourhood size, not by changing payoffs; confirms k as the network degree in Nowak's condition</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Network reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Group selection — fully proven by simulation</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> proven — 5/5 seeds, mean trait 0.950 — 24×24 von Neumann grid, group replacement every 25 steps, m/n &gt; c/b condition met — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/group_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = Possible:</strong> proven — 2/5 seeds, mean trait 0.548 — cooperation spreads in replicates where a cooperator-rich group is occasionally copied over a defector-rich group; stochastic, directly demonstrating the "Possible" claim</li>
        <li><strong>Double ablation (Moore + no groups):</strong> proven — Moore neighbourhood (k=8 &gt; b/c=5) disables spatial clustering; group_selection_interval=99999 disables between-group copying — 0/5 seeds, mean trait 0.010 — cooperation collapses completely; confirms both mechanisms are needed</li>
        <li><strong>Group events alone cannot rescue cooperation:</strong> proven — Moore neighbourhood (spatial advantage removed) + group selection active (interval=25) — 0/5 seeds, mean trait 0.012 — between-group copying amplifies spatial within-group clusters but cannot replace them; any spread in the standard scenario is due to within-group spatial assortment, not between-group events alone</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 7:</strong> Group selection simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

The direct implication: demonstrating that a mechanism *maintains* cooperation is not the same as demonstrating that it *produces* cooperation. The simulation results in this section test both, and the distinction shows up clearly in every mechanism.

## The origin of cooperation

The five Nowak conditions are maintenance conditions. Of the five, only kin selection reliably spreads cooperation from rare — but understanding *why* requires distinguishing what each mechanism needs from the biological environment in order to operate.

**Kin selection and local reproduction are inseparable.** Kin selection works because offspring inherit the parent's cooperative trait and stay nearby, automatically clustering same-lineage cooperators together. This spatial clustering is not an extra assumption — it is a trivial consequence of reproduction itself. You cannot have kin selection without offspring proximity, and offspring proximity comes for free from biology. The local grid structure in the spatial model is not a confound; it is what kin reproduction looks like.

This is confirmed by the well-mixed control (Display 3): kin preference without kin proximity — offspring scattered globally — produces no benefit at all (0/5, indistinguishable from a no-kin-bias control). Not because kin selection is weak, but because the scenario is biologically incoherent. Kin selection *is* local reproduction with relatedness-biased routing. Separating the two removes the mechanism entirely.

**The other mechanisms are not as automatic.** Direct reciprocity also spreads cooperation reliably from rare when given spatial structure (100% success with a spatial scaffold). But spatial structure is not trivially given for direct reciprocity — it additionally requires partner stability, memory of past interactions, and repeated encounters with the same individuals. These are real biological requirements that are not automatically satisfied by reproduction alone. Direct reciprocity needs a stable community structure to have something to reciprocate.

Network reciprocity alone — without kin bias or reciprocity memory — gives only partial, stochastic spread (2/5). It is the structural foundation but not sufficient on its own.

Group selection adds nothing for spread from rare (2/5 — identical to the network reciprocity baseline). Its role is confined to maintenance.

**What makes kin selection the most robust initiator** is therefore not that it is the only mechanism capable of spreading cooperation from rare, but that the structural condition it requires — offspring near parents — is automatically provided by reproduction in any biological system. Direct reciprocity and network reciprocity depend on additional conditions that must be independently met.

**The Nowak 2010 controversy.** In arguing that multilevel selection subsumes kin selection, Nowak, Tarnita, and Wilson (2010) pointed at the mathematical equivalence between kin selection and spatial/group structure. The simulation results here are consistent with that entanglement — kin selection operates through the same local structure that defines network reciprocity. The 137-researcher rebuttal (Abbot et al., 2011) defends the kin selection framework. The debate is not settled, but the practical implication is clear: kin selection and local population structure are two descriptions of the same biological reality, not two competing mechanisms.

## Beyond These Five

Nowak's taxonomy is a useful compact framework but not an exhaustive list. Important cooperation mechanisms outside the five include:

- **Partner choice** — agents preferentially interact with cooperative partners and abandon poor ones.
- **Partner control** — agents alter partner incentives through sanctions, punishment, or exclusion.
- **Byproduct mutualism** — an action benefits others because it directly benefits the actor at the same time.
- **Policing** — third parties suppress selfish behavior or stabilize collective rules.
- **Pseudoreciprocity** — an actor benefits another because a more productive partner later improves the actor's own payoff.
- **Greenbeard effects** — a recognizable trait marks cooperators and directs help toward others carrying the same marker.
- **Niche construction** — cooperative behavior changes the environment, which then feeds back on selection.
- **Institutional enforcement** — norms, monitoring, and punishment stabilize cooperation at social scales.
- **General assortment** — cooperators interact with cooperators more often than random mixing predicts, regardless of the specific cause.

The shared condition across all of them mirrors the repo-level feedback framing: cooperation spreads when enough of the value it creates returns to cooperators or copies of the cooperative rule to outweigh the private cost.

## Nowak's mechanisms on the nature-nurture spectrum

The five mechanisms above are implemented here as fixed evolutionary rules — but applied to human cooperation specifically, none of them is purely a matter of nature or purely a matter of nurture. Evolution can supply the underlying capacity (a predisposition to help kin, to remember favors, to track reputation) while culture and individual development determine how that capacity actually gets used.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '18%' }} />
        <col style={{ width: '27%' }} />
        <col style={{ width: '27%' }} />
        <col style={{ width: '28%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Mechanism</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"Nature" side</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"Nurture" side</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Human version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Kin selection</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strong. Selection favors helping genetic relatives because they share genes.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Moderate. Humans learn who counts as "family"; culture can expand or weaken kin duties.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"I help my child, sibling, cousin, clan."</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Direct reciprocity</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strong-medium. Evolution favors memory, trust, gratitude, resentment, partner recognition.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strong. Individuals learn who helps, who cheats, who can be trusted.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"You helped me before, so I help you now."</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Indirect reciprocity</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Medium. Evolution favors reputation tracking, moral emotions, concern for social evaluation.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Very strong. Reputation depends on language, gossip, norms, morality — all culturally transmitted.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"You helped others, so I trust/help you."</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Network reciprocity</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Medium. Evolution can favor clustering, bonding, local loyalty, partner choice.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Strong. Human networks are shaped by family, school, work, religion, and institutions.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"People in my circle help each other."</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Group selection</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Medium-strong. Groups with more internal cooperation may outcompete less cooperative groups.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Very strong in humans. Group identity, norms, punishment, ritual, law, and ideology are culturally transmitted.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>"We cooperate because we are part of this group."</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 8:</strong> Kin selection is the most nature-heavy of the five; indirect reciprocity and group selection are the most nurture/culture-heavy in humans. Direct and network reciprocity sit in between. None of the five is purely nature or purely nurture.</figcaption>
</figure>

A more useful division cuts across the five mechanisms rather than ranking them:

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
    <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '39%' }} />
        <col style={{ width: '39%' }} />
      </colgroup>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Level</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>What evolution supplies</th>
          <th style={{ backgroundColor: '#0F3368', color: '#FFFFFF', textAlign: 'left', padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>What learning/culture supplies</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Basic social architecture</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Attachment, social emotions, memory, recognition, fairness sensitivity, punishment motives.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>—</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Development</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Readiness to learn social rules.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Who helped me, who cheated, whom to trust.</td>
        </tr>
        <tr>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Culture</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Capacity for norm learning.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Actual rules: family duty, fairness, debt, gratitude, honor, punishment.</td>
        </tr>
        <tr style={{ backgroundColor: 'rgba(120, 170, 230, 0.16)' }}>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Institutions</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Capacity for group living.</td>
          <td style={{ padding: '0.75rem 1rem', border: '1px solid #D6E4F5' }}>Law, religion, markets, reputation systems, contracts.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 9:</strong> Evolutionary selection does not produce a fixed rule such as "always cooperate" — too rigid, too easily exploited. Instead it favors learning systems that let humans become cooperative under the right conditions: help kin, reciprocate with reliable partners, track reputation, cluster with cooperators, follow group norms, and punish or avoid exploiters. See the [interaction between learning and selection](/learning-selection-interaction/theory) for how this site models that coupling directly.</figcaption>
</figure>

## References

- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
- Nowak, M. A., Tarnita, C. E., & Wilson, E. O. (2010). *The evolution of eusociality*. *Nature*, 466(7310), 1057–1062. https://doi.org/10.1038/nature09205
- Abbot, P., et al. [137 signatories] (2011). *Inclusive fitness theory and eusociality*. *Nature*, 471(7339), E1–E4. https://doi.org/10.1038/nature09831
- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
