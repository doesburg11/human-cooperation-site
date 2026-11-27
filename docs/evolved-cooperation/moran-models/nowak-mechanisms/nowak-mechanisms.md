---
id: nowak-mechanisms
title: Nowak Mechanisms
sidebar_position: 1
slug: /evolved-cooperation/nowak-mechanisms
---

import GithubLink from '@site/src/components/GithubLink';

<GithubLink href="https://github.com/doesburg11/EvolvedCooperation/tree/main/moran_models/nowak_mechanisms" />

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This section contains one package for each of the five mechanisms for the evolution of cooperation identified in Nowak (2006). Each package is a thin wrapper over the shared [`interaction_kernel`](/evolved-cooperation/interaction-kernel) Moran engine.</div>

## Shared Engine

All five mechanisms run on the same Moran update loop. What differs across them is the routing step — specifically the kernel that distributes cooperative benefit to neighbors, and any additional per-site state that modulates it.

## The Five Mechanisms

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '78%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Mechanism</th>
          <th>How cooperation is sustained</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="/evolved-cooperation/kin-selection">Kin Selection</a></td>
          <td>Benefit is routed with a lineage bias. Same-lineage neighbors receive more weight, operationalising Hamilton's rule <em>rB &gt; C</em>.</td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/direct-reciprocity">Direct Reciprocity</a></td>
          <td>Each site carries a memory of recently received help. Expressed cooperation is scaled by that memory, creating a direct reciprocal feedback loop.</td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/indirect-reciprocity">Indirect Reciprocity</a></td>
          <td>Each site carries a public reputation. The routing kernel is biased toward higher-reputation recipients, sustaining cooperation through a reputation channel.</td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/network-reciprocity">Network Reciprocity</a></td>
          <td>Benefit is routed uniformly over local grid neighbors. Spatial structure alone protects cooperator clusters from exploitation, with no memory or lineage bias.</td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/group-selection">Group Selection</a></td>
          <td>Sites are partitioned into groups. Individual Moran replacement runs each step. Periodically the highest-fitness group is copied into the lowest-fitness group, adding a second level of selection.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> The five Nowak mechanisms and how each sustains cooperation in this implementation.</figcaption>
</figure>

## Spread vs. maintenance

The five mechanisms are often described as answers to the question "how does cooperation evolve?" But that question contains three distinct sub-questions — initiation (can a cooperative act occur at all?), spread (can cooperation increase in frequency when rare?), and maintenance (can cooperation resist invasion once common?) — and the five Nowak conditions address only the last.

**The Nowak conditions are maintenance conditions.** Each of the five rules — $rb > c$, $w > (T-R)/(T-P)$, $q > c/b$, $b/c > k$, $m/n > c/b$ — describes when a population already dominated by cooperators resists invasion by defectors. This is an evolutionary stability (ESS) condition. It is not a condition for spread from rare, and it is not a condition for the first cooperative act to occur.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered">
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '22%' }} />
        <col style={{ width: '28%' }} />
        <col style={{ width: '28%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Mechanism</th>
          <th>Condition</th>
          <th>Spread from rare</th>
          <th>Maintenance (ESS)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="/evolved-cooperation/kin-selection">Kin selection</a></td>
          <td style={{ fontStyle: 'italic' }}>rb &gt; c</td>
          <td style={{ backgroundColor: '#D4EDDA' }}><strong>Yes</strong> — offspring stay near parents by definition, automatically creating kin clusters; 5/5 seeds in the original proof run (weak altruism: helpers keep part of their own benefit) <a href="#kin-selection-isolation-evidence" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
          <td style={{ backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/direct-reciprocity">Direct reciprocity</a></td>
          <td style={{ fontStyle: 'italic' }}>w &gt; (T−R)/(T−P)</td>
          <td style={{ backgroundColor: '#F8D7DA' }}><strong>No</strong> — rare TFT meets mostly ALLD; no memory of cooperation to reciprocate <a href="/evolved-cooperation/direct-reciprocity#step-1-pure-direct-reciprocity-fails" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
          <td style={{ backgroundColor: '#D4EDDA' }}><strong>Yes</strong> <a href="/evolved-cooperation/direct-reciprocity#the-condition" style={{ fontSize: '0.8em', whiteSpace: 'nowrap' }}>→ simulated</a></td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/indirect-reciprocity">Indirect reciprocity</a></td>
          <td style={{ fontStyle: 'italic' }}>q &gt; c/b</td>
          <td style={{ backgroundColor: '#F8D7DA' }}><strong>No</strong> — reputation system requires an existing cooperative base to bootstrap</td>
          <td style={{ backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/network-reciprocity">Network reciprocity</a></td>
          <td style={{ fontStyle: 'italic' }}>b/c &gt; k</td>
          <td style={{ backgroundColor: '#FFF3CD' }}><strong>Partial</strong> — cooperator clusters grow once formed, but a single isolated cooperator still loses to surrounding defectors</td>
          <td style={{ backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
        <tr>
          <td><a href="/evolved-cooperation/group-selection">Group selection</a></td>
          <td style={{ fontStyle: 'italic' }}>m/n &gt; c/b</td>
          <td style={{ backgroundColor: '#FFF3CD' }}><strong>Possible</strong> — if between-group selection is strong enough to offset within-group defector advantage</td>
          <td style={{ backgroundColor: '#D4EDDA' }}><strong>Yes</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> The five Nowak conditions mapped to spread from rare and maintenance. All five conditions are ESS (maintenance) conditions. Kin selection reliably spreads cooperation from rare because offspring proximity to parents is a trivial consequence of reproduction. The other mechanisms require additional biological conditions to achieve the same. In the kin-selection runs the helper keeps part of its own benefit, so this spread is weak altruism, and in later, longer tests uniform routing also spread; see Display 3. By the site's <a href="/evolved-cooperation/kin-selection-progress">definition of kin selection</a>, which requires a real net cost, this spread is step 1 of its stepwise table, a warm-up, not kin selection itself.</figcaption>
</figure>

<figure id="kin-selection-isolation-evidence" style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Kin selection — simulation evidence</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Spread from rare:</strong> 5/5 seeds, mean trait 0.872 — offspring inherit lineage and stay local, automatically creating kin clusters; consistent with kin selection through viscosity, with the helper keeping part of its own benefit (weak altruism) — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Maintenance:</strong> 5/5 seeds, mean trait 0.984 — in the original common-start run, cooperation stayed near maximum</li>
        <li><strong>No kin bias ablation:</strong> 1/5 seeds, mean trait 0.488 — removing kin bias while keeping local reproduction gives only partial spread at this run length; in the later, longer tests below, uniform routing caught up</li>
        <li><strong>Well-mixed control — kin preference without kin proximity:</strong> 0/5 seeds, mean trait 0.006 — biologically incoherent scenario (kin selection requires offspring proximity, which local reproduction provides automatically); in this control, kin preference without local kin proximity produced no detectable spread — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/kin_selection/well_mixed/utils/proof_of_mechanism.py">well_mixed/proof_of_mechanism.py</a></li>
        <li><strong>Below Hamilton's rule:</strong> 0/5 seeds from 90% — collapse below the threshold, consistent with rb &gt; c</li>
        <li><strong>Later matched tests (20 runs per arm, 2026-11-19):</strong> kin-biased routing spread in 14/20 runs at 1000 steps, uniform routing in 3/20, but uniform routing reached 20/20 by 3000 steps; so the kin bias made spread faster, but the tests do not separate it from the extra self-return it brings (without self-return, kin-biased routing also failed); help with a real net cost to the helper failed in every arm (0/20) — <a href="/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed">Later tests</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Kin selection simulation evidence. In the 5/5 spread result, local reproduction automatically provides the kin proximity the mechanism requires; the later tests show that this spread is weak altruism (step 1 of the kin-selection page's stepwise table, not kin selection by the site's definition), and that kin-biased routing spread faster than uniform routing without being separated from its extra self-return. The well-mixed control tests kin preference without kin proximity, which has no biological counterpart.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Direct reciprocity — simulation evidence</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance:</strong> shown — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed/utils/proof_of_mechanism.py">well_mixed/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-1-pure-direct-reciprocity-fails">Step 1 on direct reciprocity page</a></li>
        <li><strong>Spread from rare = No:</strong> shown — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/well_mixed/utils/proof_stability_vs_invasion.py">well_mixed/proof_stability_vs_invasion.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-2-partner-persistence-is-necessary-but-not-sufficient-from-a-random-start">Step 2 on direct reciprocity page</a></li>
        <li><strong>Spatial clustering scaffold:</strong> network reciprocity provides origin, direct reciprocity provides maintenance — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/spatial_clustering/utils/proof_of_mechanism.py">spatial_clustering/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-3-spatial-structure-adds-network-reciprocity">Step 3 on direct reciprocity page</a></li>
        <li><strong>Kin clustering scaffold:</strong> partner permanence is the origin mechanism — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/direct_reciprocity/scaffolds/kin_clustering/utils/proof_of_mechanism.py">kin_clustering/proof_of_mechanism.py</a> · <a href="/evolved-cooperation/direct-reciprocity#step-4-partner-permanence-not-spatial-clustering-is-the-origin-mechanism">Step 4 on direct reciprocity page</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 4:</strong> Direct reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Indirect reciprocity — simulation evidence</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> shown — 5/5 seeds, mean trait 0.873 — binary Nowak model (donor helps only if recipient reputation ≥ threshold, q=0.80 &gt; c/b=0.20) — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = No:</strong> shown — 0/5 seeds, mean trait 0.276 (q=0.80) and 0/5, mean trait 0.201 (q=0.05) — rare cooperators help defectors who have neutral initial reputation, but defectors return little or no help; cooperators pay cost with no return and are eliminated before the reputation feedback loop can bootstrap — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
        <li><strong>Reputation gating ablation:</strong> without reputation-gated access to help, maintenance fails (2/5 seeds vs. 5/5 with gating) — defectors receive the same benefit as cooperators without paying the cost; consistent with reputation-gated discrimination is the mechanism</li>
        <li><strong>Why the spatial model confounds this:</strong> the spatial grid provides network-reciprocity clustering on top of the reputation channel; the ablation (no reputation routing) still gives 5/5 success on the grid, showing that, in this setup, the grid can sustain cooperation without reputation routing. The well-mixed binary model isolates the reputation channel cleanly — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/indirect_reciprocity/well_mixed_binary/utils/proof_of_mechanism.py">well_mixed_binary/proof_of_mechanism.py</a></li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 5:</strong> Indirect reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

**Boundary from the indirect-reciprocity ladder (2026-11-26).** The public-reputation evidence above is a maintenance result under a shared record. In a separately registered fixed-population test from a cooperative start, over 2,000 generations and on the rebased q = 0.8 setting, the ladder met both endpoints through partial observation, execution and assessment error, unconditional cooperators and mutation (rung 4b: 96/100 versus 0/100 shuffled controls). Its next, private-views rung did not meet the registered bar (45/100 against 80 required; control 0/100). Thus the ladder did not meet its private-assessment endpoint under the tested conditions. [Full ladder and protocol](/evolved-cooperation/indirect-reciprocity-progress).

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Network reciprocity — simulation evidence</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> shown — 5/5 seeds, mean trait 0.928 — 24×24 von Neumann grid (k=4), b/c=5 &gt; k — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/network_reciprocity/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = Partial:</strong> shown — 2/5 seeds, mean trait 0.536 — cooperation spreads in replicates where a viable cluster forms by chance; fails in the others; consistent with a stochastic cluster-formation threshold</li>
        <li><strong>b/c &gt; k boundary:</strong> shown — B_plus_scale=0.5 → b/c=2.5 &lt; k=4 — 0/5 seeds, mean trait 0.012 — cooperation collapses completely from 90% when condition is violated</li>
        <li><strong>Larger neighbourhood (k):</strong> shown — Moore neighbourhood (k=8) with same b/c=5 — 0/5 seeds, mean trait 0.009 — condition violated by increasing neighbourhood size, not by changing payoffs; consistent with k as the network degree in Nowak's condition</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 6:</strong> Network reciprocity simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

<figure style={{ margin: '0 0 1.5rem 0' }}>
  <div style={{ border: '1px solid #D6E4F5', overflow: 'hidden' }}>
    <div style={{ backgroundColor: '#0F3368', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 'bold' }}>Group selection — simulation evidence</div>
    <div style={{ backgroundColor: '#EAF2FB', color: '#1F2D3D', padding: '0.6rem 1.25rem' }}>
      <ul style={{ margin: '0' }}>
        <li><strong>Maintenance = Yes:</strong> shown — 5/5 seeds, mean trait 0.950 — 24×24 von Neumann grid, group replacement every 25 steps, m/n &gt; c/b condition met — <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/group_selection/utils/proof_of_mechanism.py">utils/proof_of_mechanism.py</a></li>
        <li><strong>Spread from rare = Possible:</strong> shown — 2/5 seeds, mean trait 0.548 — cooperation spreads in replicates where a cooperator-rich group is occasionally copied over a defector-rich group; stochastic, illustrating the "Possible" claim</li>
        <li><strong>Double ablation (Moore + no groups):</strong> shown — Moore neighbourhood (k=8 &gt; b/c=5) disables spatial clustering; group_selection_interval=99999 disables between-group copying — 0/5 seeds, mean trait 0.010 — cooperation collapses completely; removing both breaks it, though this ablation alone does not show which component is needed (the next row tests group events alone)</li>
        <li><strong>Group events alone cannot rescue cooperation:</strong> shown — Moore neighbourhood (spatial advantage removed) + group selection active (interval=25) — 0/5 seeds, mean trait 0.012 — between-group copying amplifies spatial within-group clusters but did not replace them in these runs; the results are consistent with spread in the standard scenario requiring within-group spatial assortment, and group events alone did not produce spread</li>
      </ul>
    </div>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 7:</strong> Group selection simulation evidence for the spread and maintenance claims in Display 2.</figcaption>
</figure>

The direct implication: demonstrating that a mechanism *maintains* cooperation is not the same as demonstrating that it *produces* cooperation. The simulation results in this section test both, and the distinction shows up clearly in every mechanism.

### Threshold tests of the five conditions

The models above show each mechanism at work in the shared engine, where a helper keeps part of its own benefit. A second set of models tests each condition on its own terms: one small model per mechanism, with no self-benefit, a threshold written down before the run, and a pass rule fixed in advance. Each model asks whether selection changes sign where the theory says it should. Display 8 lists the five tests and which question, spread or maintenance, each one answers.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped site-table--bordered">
    <colgroup>
      <col style={{ width: '17%' }} />
      <col style={{ width: '23%' }} />
      <col style={{ width: '38%' }} />
      <col style={{ width: '22%' }} />
    </colgroup>
    <thead>
      <tr><th>Mechanism</th><th>Threshold tested</th><th>Simulated result</th><th>Spread or maintenance</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="/evolved-cooperation/kin-selection#hamiltons-rule-in-a-minimal-sibling-model">Kin selection</a></td><td><em>br &gt; c</em>, with <em>r</em> = 0.5 for siblings</td><td><strong>Reproduced.</strong> The trait rose or fell as <em>br − c</em> predicts in 7 of 7 cells, including 2 cells where a rule using the chance that a sibling carries the allele (0.75) would predict the wrong sign.</td><td>Direction of change from 50%: neither spread from rare nor maintenance</td></tr>
      <tr><td><a href="/evolved-cooperation/direct-reciprocity#threshold-test-of-w--cb">Direct reciprocity</a></td><td><em>w &gt; c/b</em> (finite population: <em>w</em>* = 0.336 and 0.503)</td><td><strong>Reproduced.</strong> A rare defector lost above <em>w</em>* and gained below it in all 9 cells far from the threshold, and the size of the change matched the prediction in 11 of 12 cells; a rare tit-for-tat lost in all 12 cells.</td><td>Maintenance yes; spread from rare no</td></tr>
      <tr><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/threshold_models/indirect_reciprocity_discriminators/RESULTS.md">Indirect reciprocity</a></td><td><em>q &gt; c/b</em> (finite population: <em>q</em>* = 0.336 and 0.503)</td><td><strong>Reproduced.</strong> A rare defector lost above <em>q</em>* and gained below it in all 9 cells far from the threshold, and the size of the change matched the prediction in 12 of 12 cells; a rare discriminator lost in all 12 cells.</td><td>Maintenance yes; spread from rare no</td></tr>
      <tr><td><a href="/evolved-cooperation/network-reciprocity#threshold-model-without-self-benefit">Network reciprocity</a></td><td><em>b/c &gt; k</em> (finite population: 4.26 on a 4-neighbour graph, 9.33 on an 8-neighbour graph)</td><td><strong>Reproduced.</strong> Selection had the predicted sign in 9 of 9 far cells; the estimated thresholds, 4.23 [4.18, 4.27] and 9.35 [9.30, 9.40], match the finite-population values and exclude <em>k</em>.</td><td>Spread from rare: a single cooperator's chance to take over</td></tr>
      <tr><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/threshold_models/group_selection_traulsen_nowak/RESULTS.md">Group selection</a></td><td><em>b/c &gt; 1 + n/(m − 2)</em> (Traulsen and Nowak; 1.625 for groups of 5, 2.25 for groups of 10, with 10 groups)</td><td><strong>Reproduced for groups of 5; approached for groups of 10.</strong> With groups of 5 the estimated threshold, 1.64 [1.61, 1.66], matches the predicted 1.625. With groups of 10 the first run missed (about 7 against 2.25). A follow-up test showed why: the rule holds only for weak selection, and as selection weakened the estimate fell to 2.88 and then 2.37 [2.32, 2.42], close to but just above 2.25.</td><td>Spread from rare: a single cooperator's chance to take over</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 8:</strong> Threshold tests of the five Nowak conditions, one minimal model per mechanism, each pre-registered and run without self-benefit. The thresholds are the finite-population versions of the conditions in Display 2. The reciprocity tests answer the maintenance question and confirm the "No" for spread in Display 2; the network and group tests measure spread from a single cooperator. Code, pre-registrations and full results: <a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/threshold_models">threshold_models</a>.</figcaption>
</figure>

## The origin of cooperation

The five Nowak conditions are maintenance conditions. Of the five, only kin selection reliably spread cooperation from rare in the original proof runs (later, longer runs qualify this; see below) — but understanding *why* requires distinguishing what each mechanism needs from the biological environment in order to operate.

**Kin selection and local reproduction are inseparable.** Kin selection works because offspring inherit the parent's cooperative trait and stay nearby, automatically clustering same-lineage cooperators together. This spatial clustering is not an extra assumption of the model — local reproduction supplies it. In this model you cannot have the effect without offspring proximity, and offspring proximity follows from local reproduction. The local grid structure in the spatial model is not a confound; it is what kin reproduction looks like.

This is confirmed by the well-mixed control (Display 3): kin preference without kin proximity — offspring scattered globally — produces no benefit at all (0/5, indistinguishable from a no-kin-bias control). Not because kin selection is weak, but because the scenario is biologically incoherent. In this model the load-bearing part is local reproduction: removing it removes the effect, whereas without the relatedness bias, uniform routing still spread in later, longer runs (see the qualification below).

**The other mechanisms are not as automatic.** Direct reciprocity also spreads cooperation reliably from rare when given spatial structure (100% success with a spatial scaffold). But spatial structure is not trivially given for direct reciprocity — it additionally requires partner stability, memory of past interactions, and repeated encounters with the same individuals. These are real biological requirements that are not automatically satisfied by reproduction alone. Direct reciprocity needs a stable community structure to have something to reciprocate.

Network reciprocity alone — without kin bias or reciprocity memory — gives only partial, stochastic spread (2/5). It is the structural foundation but not sufficient on its own.

Group selection adds nothing for spread from rare (2/5 — identical to the network reciprocity baseline). Its role is confined to maintenance.

**What makes kin selection the most robust initiator in these tests** is therefore not that it is the only mechanism capable of spreading cooperation from rare, but that the structural condition it requires — offspring near parents — is automatically provided by reproduction in any biological system. Direct reciprocity and network reciprocity depend on additional conditions that must be independently met. This robustness, though, was shown for weak altruism, which the site's definition does not count as kin selection; the qualification below says where costly help did spread.

**Qualification from later tests (2026-11-19).** In the kin-selection runs above, a helper keeps part of its own benefit, so helping has no net direct cost: the spread from rare is weak altruism. Where helping had a real net cost to the helper, it failed in every arm. By the site's [definition of kin selection](/evolved-cooperation/kin-selection-progress), which requires such a cost, these runs are therefore step 1 of its stepwise table, a warm-up that does not count as kin selection. In a later variant with overlapping generations, costly help to neighbours did spread at benefit-to-cost ratios of 12 and 24 when offspring settled locally, and at 12 failed under global-competitor replacement (step 2; no ecology was added to it); this is consistent with kin selection through viscosity, but was not separated from network reciprocity. With ecology added, kin selection in the site's [broad definition](/evolved-cooperation/kin-selection-progress) held only through parental care, on an almost-full grid with energy and limited food (steps 3 and 4); not with substantial empty space (step 5) on the lattice, and not among non-offspring relatives alone on the lattice; in a ported empty-site island model with births needing free space, costly help to patch-mates met its registered criteria, and so did two follow-ups: help that excluded the helper's own offspring (at benefit-to-cost 28) and help only to own offspring after they settle (at 14; not care of dependent young; all consistent with kin selection), and a model with sexual reproduction and households could not separate helping from population survival. The goal is kin selection in a full ecological setting, with births that need free space and agents that move in search of food; steps 1 to 4 are achieved and step 5 has met its registered criteria three times, in that island model (help to patch-mates with own offspring not excluded; help among non-offspring relatives with own offspring excluded; and help to own offspring after they settle, not care of dependent young; all consistent with kin selection), both goal rows (care for own offspring and help to other relatives) are open, and no kin-selection experiment so far has agents that move in search of food ([stepwise table](/evolved-cooperation/kin-selection-progress)). Details: [Kin Selection](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed) and [The Ladder in Detail](/evolved-cooperation/kin-selection-progress#the-ladder-in-detail).

**Self-routing test (2026-11-26).** The weak-altruism point is not limited to kin selection. In the shared Moran engine every wrapper routes part of a producer's benefit back to the producer itself (one fifth under uniform routing over itself and its four neighbours), so at b = 1 and c = 0.2 a helper's own return exactly covers its cost. A pre-registered rerun of the low-start comparison, with the producer removed from its own routing and everything else unchanged, separated the mechanisms. Network reciprocity and group selection no longer spread in any of their cells where helping had risen (0 of 64 runs); their spread from a low start was weak altruism. Indirect reciprocity still spread in 8 of 9 cells (66 of 72 runs), although always less than with the self-route; since uniform routing fails on the same grid without it, the spread is carried by help flowing towards high-reputation neighbours, with a reputation signal that is perfect and free. Kin-weighted routing rose a little but met the criterion in no cell. These hold at the tested settings and over 250 steps; at benefit-to-cost ratios of 16 and 24, network reciprocity and group selection rose slowly without the self-route. Details: [RESULTS.md](https://github.com/doesburg11/EvolvedCooperation/blob/main/moran_models/nowak_mechanisms/RESULTS.md).

**The Nowak 2010 controversy.** In arguing that multilevel selection subsumes kin selection, Nowak, Tarnita, and Wilson (2010) pointed at the mathematical equivalence between kin selection and spatial/group structure. The simulation results here are consistent with that entanglement — kin selection operates through the same local structure that defines network reciprocity. The 137-researcher rebuttal (Abbot et al., 2011) defends the kin selection framework. The debate is not settled, but in these spatial tests kin selection and network reciprocity remain empirically entangled: two descriptions of the same local-assortment process, not two mechanisms the tests could separate.

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

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '18%' }} />
        <col style={{ width: '27%' }} />
        <col style={{ width: '27%' }} />
        <col style={{ width: '28%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Mechanism</th>
          <th>"Nature" side</th>
          <th>"Nurture" side</th>
          <th>Human version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Kin selection</td>
          <td>Strong. Selection favors helping genetic relatives because they share genes.</td>
          <td>Moderate. Humans learn who counts as "family"; culture can expand or weaken kin duties.</td>
          <td>"I help my child, sibling, cousin, clan."</td>
        </tr>
        <tr>
          <td>Direct reciprocity</td>
          <td>Strong-medium. Evolution favors memory, trust, gratitude, resentment, partner recognition.</td>
          <td>Strong. Individuals learn who helps, who cheats, who can be trusted.</td>
          <td>"You helped me before, so I help you now."</td>
        </tr>
        <tr>
          <td>Indirect reciprocity</td>
          <td>Medium. Evolution favors reputation tracking, moral emotions, concern for social evaluation.</td>
          <td>Very strong. Reputation depends on language, gossip, norms, morality — all culturally transmitted.</td>
          <td>"You helped others, so I trust/help you."</td>
        </tr>
        <tr>
          <td>Network reciprocity</td>
          <td>Medium. Evolution can favor clustering, bonding, local loyalty, partner choice.</td>
          <td>Strong. Human networks are shaped by family, school, work, religion, and institutions.</td>
          <td>"People in my circle help each other."</td>
        </tr>
        <tr>
          <td>Group selection</td>
          <td>Medium-strong. Groups with more internal cooperation may outcompete less cooperative groups.</td>
          <td>Very strong in humans. Group identity, norms, punishment, ritual, law, and ideology are culturally transmitted.</td>
          <td>"We cooperate because we are part of this group."</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 9:</strong> Kin selection is the most nature-heavy of the five; indirect reciprocity and group selection are the most nurture/culture-heavy in humans. Direct and network reciprocity sit in between. None of the five is purely nature or purely nurture.</figcaption>
</figure>

A more useful division cuts across the five mechanisms rather than ranking them:

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <colgroup>
        <col style={{ width: '22%' }} />
        <col style={{ width: '39%' }} />
        <col style={{ width: '39%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Level</th>
          <th>What evolution supplies</th>
          <th>What learning/culture supplies</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Basic social architecture</td>
          <td>Attachment, social emotions, memory, recognition, fairness sensitivity, punishment motives.</td>
          <td>—</td>
        </tr>
        <tr>
          <td>Development</td>
          <td>Readiness to learn social rules.</td>
          <td>Who helped me, who cheated, whom to trust.</td>
        </tr>
        <tr>
          <td>Culture</td>
          <td>Capacity for norm learning.</td>
          <td>Actual rules: family duty, fairness, debt, gratitude, honor, punishment.</td>
        </tr>
        <tr>
          <td>Institutions</td>
          <td>Capacity for group living.</td>
          <td>Law, religion, markets, reputation systems, contracts.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 10:</strong> Evolutionary selection does not produce a fixed rule such as "always cooperate" — too rigid, too easily exploited. Instead it favors learning systems that let humans become cooperative under the right conditions: help kin, reciprocate with reliable partners, track reputation, cluster with cooperators, follow group norms, and punish or avoid exploiters. See the [interaction between learning and selection](/learning-selection-interaction/theory) for how this site models that coupling directly.</figcaption>
</figure>

## References

- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
- Nowak, M. A., Tarnita, C. E., & Wilson, E. O. (2010). *The evolution of eusociality*. *Nature*, 466(7310), 1057–1062. https://doi.org/10.1038/nature09205
- Abbot, P., et al. [137 signatories] (2011). *Inclusive fitness theory and eusociality*. *Nature*, 471(7339), E1–E4. https://doi.org/10.1038/nature09831
- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
