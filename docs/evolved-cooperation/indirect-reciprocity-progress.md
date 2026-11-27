---
id: indirect-reciprocity-progress
title: "Indirect Reciprocity: Definition and Progress"
sidebar_label: "Indirect Reciprocity: Definition and Progress"
sidebar_position: 1.6
slug: /evolved-cooperation/indirect-reciprocity-progress
---

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page states what this site counts as indirect reciprocity and tracks, rung by rung, how far a stepwise ladder came from Nowak's threshold model towards indirect reciprocity in an ecological setting. The original ladder ended at rung 5a; a separately registered gossip follow-up also did not meet its maintenance criterion. An external check of the authors' own gossip model (Kawakatsu, Kessinger and Plotkin 2024) met its registered replication criteria. It is built like the <a href="/evolved-cooperation/kin-selection-progress">kin-selection ladder</a>. The basic model is on the <a href="/evolved-cooperation/indirect-reciprocity">Indirect Reciprocity</a> page.</div>

## Definition

Indirect reciprocity is helping guided by reputation: "I help you because you helped others." It is a candidate for a distinctly human route to cooperation, because reputations can be built from observation and spread by gossip. A result counts as **indirect reciprocity** on this ladder only if all three of these hold:

1. **A real cost.** Each act of help costs the donor and returns nothing to it from that recipient in that encounter.
2. **Return through reputation, not kin or personal experience.** Whether a donor helps depends on third-party information about the recipient (its reputation), earned by the recipient's own actions. It does not depend on what that recipient did *to this donor* (that would be direct reciprocity) or on relatedness.
3. **Against a control that removes the information.** The registered test compares a test arm with an arm in which reputations are **shuffled**: each donor sees the reputation of a random other individual, so the distribution of reputations is kept but its link to behaviour is cut.

In Nowak's simplest form indirect reciprocity is bistable: discriminators (who help only those in good standing) resist defectors once common, but a rare discriminator does not spread. So the ladder's main criterion is **maintenance**: discriminators (or, once unconditional cooperators are present, cooperators of both kinds) stay at 80% or more for 500 generations from a 90% cooperative start. Spread from rare is a separate question. Maintenance over a finite horizon shows only that, not general stability.

**The goal.** Indirect reciprocity in an **ecological setting**: energy reserves, limited renewable food, starvation, births that need free space, and individuals that move, so that population size follows resources; ultimately a world in which hunters share food according to reputation.

**Rules** (carried over from the kin ladder): one ingredient per rung; a theory screen (a calculation, no simulation) before any code; each rung pre-registered and reviewed before it is run; at most two attempts per rung, and a hard stop after that.

## Where It Stands

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr><th>Rung</th><th>Ingredient added</th><th>Result</th><th>Achieved</th></tr>
      </thead>
      <tbody>
        <tr><td style={{ textAlign: 'center' }}>0</td><td>Base: Nowak's threshold model (discriminators against defectors, probability <em>q</em> of knowing a reputation)</td><td>Reproduced: discriminators resist defectors exactly above the predicted threshold; a rare discriminator loses</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td></tr>
        <tr><td style={{ textAlign: 'center' }}>1</td><td>Sampled encounters; reputation is still the strategy label</td><td>20/20 against 0/20 shuffled; a plumbing check, not indirect reciprocity by the definition</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓ (baseline)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>2</td><td>Reputation earned by actions (simple standing, public record, every act observed)</td><td>20/20 against 0/20; the first rung that meets the definition</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td></tr>
        <tr><td style={{ textAlign: 'center' }}>2b</td><td>Partial observation (each act seen with probability 0.5)</td><td>20/20 against 0/20</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td></tr>
        <tr><td style={{ textAlign: 'center' }}>3a</td><td>Execution errors (an intended help fails with probability 0.1)</td><td>19/20 against 0/20</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td></tr>
        <tr><td style={{ textAlign: 'center' }}>3b</td><td>Assessment errors (a record is set wrongly with probability 0.02)</td><td>17/20 against 0/20 (narrowly)</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td></tr>
        <tr><td style={{ textAlign: 'center' }}>4a</td><td>Unconditional cooperators (who help everyone) alongside discriminators and defectors (who never help)</td><td>On the original setting both permitted attempts failed: 14/20 and 11/20 (16 required). After a separately agreed rebase to <em>q</em> = 0.8 (below): 100/100 against 0/100</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓ (rebased)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>4b</td><td>Mutation among the three strategies (rate 0.001 per offspring)</td><td>96/100 against 0/100 shuffled, both endpoints (rebased setting)</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td></tr>
        <tr><td style={{ textAlign: 'center' }}>5a</td><td>Private assessment (individuals keep their own views and can disagree)</td><td>45/100 against 0/100 shuffled; 80 needed (rebased setting)</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td></tr>
        <tr><td style={{ textAlign: 'center' }}>5b</td><td>Separate follow-up: target-specific gossip after private assessment</td><td>44/100; 80 required. It beat the sham but not the paired no-gossip comparison</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td></tr>
        <tr><td style={{ textAlign: 'center' }}>Ext.</td><td>External check (not a rung): the authors' own code for Kawakatsu, Kessinger and Plotkin (2024), opinion-copying gossip under private assessment, run unchanged (100 individuals, no mutation)</td><td>Registered criteria met. Stern judging: without gossip 300/300 runs fix defectors; with gossip the three predicted starts fix discriminators in 47, 43 and 44 of 50. Simple standing without gossip: defectors die out in 175/200 runs from the four starts predicted to lose them</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓ (external)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>6-10</td><td>Overlapping generations, energy, births needing energy, limited food, starvation, births into free space, movement</td><td>Not built</td><td style={{ textAlign: 'center', backgroundColor: '#EEEEEE' }}>–</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> The indirect-reciprocity ladder. Every rung is a population of 1,000 with a fixed size (Wright-Fisher generations); the ecological rungs (6 onwards) are not built. The external-check row uses the authors' model instead (100 individuals, one imitation step per generation, no mutation; counts are runs reaching fixation of the named strategy) and is not a ladder rung. Counts are test-arm runs meeting the registered maintenance endpoint against shuffled-reputation runs. Rungs 1 to 3b and the first two attempts at 4a use a benefit-to-cost ratio of 3 and a consultation probability <em>q</em> = 0.6; the rebased results use <em>q</em> = 0.8. All results hold only at the settings tested.</figcaption>
</figure>

**What has been shown.** Under simple standing (helping a good recipient, or refusing a bad one, keeps a donor's standing good), reputation-guided helping was maintained against defectors while reputations became more realistic one ingredient at a time: earned from actions, only partly observed, with failed helps and with wrongly recorded actions. Each time, the shuffled-reputation control missed the maintenance endpoint. The margin narrowed as errors were added (20, 20, 20, 19, then 17 of 20 runs).

## Unconditional Cooperators and the Rebase

Adding unconditional cooperators, who help everyone, was the ladder's first major weak point, as theory warns: they pay for helping defectors, and while they are common they can feed them. On the first base (benefit-to-cost 3, *q* = 0.6), cooperation held in 14 of 20 runs with 10% unconditional cooperators and in 11 of 20 with 5%, short of the registered 16 of 20, and the rung reached its hard stop. Outcomes were all-or-nothing, so with 20 runs per condition the counts were noisy.

The user then chose (2026-11-26) to rebase: after the two failures were known, a theory screen identified a setting with more deterministic margin, a higher probability of consulting a reputation (*q* = 0.8, the benefit-to-cost ratio kept at 3), and the ladder re-ran rungs 2 to 3b on it before retrying rung 4a, with 100 runs per condition and the bar at 80 of 100. This branch was chosen after rung 4a had failed twice; those failures stand, and the new results hold only on the new setting.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr><th>Test on <em>q</em> = 0.8 (100 runs per arm)</th><th>Test arm at endpoint</th><th>Shuffled control at endpoint</th></tr>
      </thead>
      <tbody>
        <tr><td>Rungs 2, 2b, 3a and 3b, re-run</td><td style={{ textAlign: 'center' }}>100/100 each</td><td style={{ textAlign: 'center' }}>0/100 each</td></tr>
        <tr><td><strong>Rung 4a: 10% unconditional cooperators, 80% discriminators, 10% defectors</strong></td><td style={{ textAlign: 'center' }}><strong>100/100</strong></td><td style={{ textAlign: 'center' }}><strong>0/100</strong></td></tr>
        <tr><td>Reported: 5% unconditional cooperators</td><td style={{ textAlign: 'center' }}>100/100</td><td style={{ textAlign: 'center' }}>–</td></tr>
        <tr><td>Reported: 30% unconditional cooperators</td><td style={{ textAlign: 'center' }}>89/100 (defectors took over in the other 11)</td><td style={{ textAlign: 'center' }}>–</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> The rebase (2026-11-26): endpoint = cooperators (unconditional cooperators plus discriminators; discriminators alone for rungs 2 to 3b) at 80% or more after 500 generations from a 90% cooperative start. Unconditional cooperators declined towards zero wherever defectors were present; defectors rose slightly above their 10% start (mean peak about 11%) before dying out.</figcaption>
</figure>

As registered, rung 4a is **met** on the new setting: maintenance of cooperation with unconditional cooperators present from the start, over 500 generations, against a shuffled-reputation control that missed the endpoint in every run. It is not invasion from rare, and not resistance to defectors continuously reintroduced by mutation; that is the next rung.

## Mutation (Rung 4b)

With mutation, each strategy can reappear in any generation. A theory screen ([note](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/rung4b/THEORY_SCREEN_RUNG4B.md)) found a sharp cliff in the noise-free model: at a mutation rate of 0.001 per offspring, cooperators settle at about 99% of the population, and near a rate of 0.0046 the cooperative state disappears and the defector-dominated state is the only stable one left (the screen does not separate the two routes: mutation supplying unconditional cooperators, who can feed defectors, and reintroducing defectors directly). A defector-dominated state is stable even at low mutation, so the test asks about maintenance from a cooperative start, not recovery.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr><th>Condition (100 runs, 2,000 generations)</th><th>Runs meeting both endpoints</th><th>Mean share of cooperators, generations 1,501-2,000</th><th>Noise-free screen, same window</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Mutation rate 0.001 (the test)</strong></td><td style={{ textAlign: 'center' }}><strong>96/100</strong></td><td style={{ textAlign: 'center' }}>0.95</td><td style={{ textAlign: 'center' }}>0.99</td></tr>
        <tr><td><strong>Same, reputations shuffled (the control)</strong></td><td style={{ textAlign: 'center' }}><strong>0/100</strong></td><td style={{ textAlign: 'center' }}>0.01</td><td style={{ textAlign: 'center' }}>0.01</td></tr>
        <tr><td>Mutation rate 0.002</td><td style={{ textAlign: 'center' }}>76/100</td><td style={{ textAlign: 'center' }}>0.76</td><td style={{ textAlign: 'center' }}>0.97</td></tr>
        <tr><td>Mutation rate 0.004</td><td style={{ textAlign: 'center' }}>10/100</td><td style={{ textAlign: 'center' }}>0.16</td><td style={{ textAlign: 'center' }}>0.90</td></tr>
        <tr><td>Mutation rate 0.005</td><td style={{ textAlign: 'center' }}>1/100</td><td style={{ textAlign: 'center' }}>0.08</td><td style={{ textAlign: 'center' }}>0.07</td></tr>
        <tr><td>Start with defectors only (rate 0.001)</td><td style={{ textAlign: 'center' }}>0/100</td><td style={{ textAlign: 'center' }}>0.015</td><td style={{ textAlign: 'center' }}>0.014</td></tr>
        <tr><td>Image scoring instead of standing, main start (rate 0.001)</td><td style={{ textAlign: 'center' }}>13/100</td><td style={{ textAlign: 'center' }}>0.19</td><td style={{ textAlign: 'center' }}>–</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 3:</strong> Rung 4b on the rebased setting (<em>q</em> = 0.8), start 10% unconditional cooperators, 80% discriminators, 10% defectors unless stated. Endpoints: cooperators at 80% or more at generation 500, and a mean share of 80% or more over generations 1,501-2,000, in the same run. Only the first two rows are the registered test; the others are reported for comparison.</figcaption>
</figure>

As registered, rung 4b is **met** ([results](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/RESULTS.md)): with mutation active throughout, cooperative strategies (mostly discriminators, with about 8% unconditional cooperators present in the late window) met both registered endpoints in 96 of 100 runs from a cooperative start, while the shuffled-reputation control lost every run. In each of the 4 failed runs the population fell below half cooperators once, ended with 98-99% defectors and did not recover within the run. Starting from a population of defectors only, no run reached the cooperation endpoints: this is maintenance, not recovery or spread from rare. The stochastic runs were less favourable than the noise-free screen: runs escaped to the defector-dominated state at mutation rates well below the screen's cliff (10 of 100 runs held at a rate of 0.004, where the screen predicted 90% cooperators). Image scoring, which held without mutation, mostly did not hold with it. These comparisons are descriptive, at one setting.

## Private Assessment (Rung 5a) and the End of the Original Line

In rung 5a there is no public record: every individual keeps its own view of every other, and judges each act it observes by standing using its *own* view of the recipient. Views can then disagree: a discriminator that rightly refuses someone it sees as bad is judged bad by an observer who sees that person as good. A theory screen ([note](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/rung5a/THEORY_SCREEN_RUNG5A.md)) predicted a narrow margin: cooperation was lost at a mutation rate between 0.00116 and 0.00119 over a finite horizon (an equilibrium fold near 0.00128), against a fold near 0.0046 with public records, so the ladder's fixed rate of 0.001 was close to the private-assessment threshold. Under the line's agreed rule (no change of any setting), the test was run at that fixed rate.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr><th>Condition (100 runs, 2,000 generations, mutation 0.001)</th><th>Runs meeting both endpoints</th><th>Mean share of cooperators, generations 1,501-2,000</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Private views (the test)</strong></td><td style={{ textAlign: 'center' }}><strong>45/100</strong></td><td style={{ textAlign: 'center' }}>0.48</td></tr>
        <tr><td><strong>Private views, reputations shuffled (the control)</strong></td><td style={{ textAlign: 'center' }}><strong>0/100</strong></td><td style={{ textAlign: 'center' }}>0.01</td></tr>
        <tr><td>For comparison: public records (rung 4b)</td><td style={{ textAlign: 'center' }}>96/100</td><td style={{ textAlign: 'center' }}>0.95</td></tr>
        <tr><td>Private views, start with discriminators only</td><td style={{ textAlign: 'center' }}>53/100</td><td style={{ textAlign: 'center' }}>0.61</td></tr>
        <tr><td>Private views, mutation 0.002</td><td style={{ textAlign: 'center' }}>4/100</td><td style={{ textAlign: 'center' }}>0.08</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 4:</strong> Rung 5a on the rebased setting (<em>q</em> = 0.8), start 10% unconditional cooperators, 80% discriminators, 10% defectors unless stated. The registered bar was 80 of 100 test runs meeting both endpoints. Rung 4b's runs used other seeds, so the comparison is descriptive. In 58% of the observations of a discriminator's deliberate refusal, the observer saw the recipient as good and so judged the discriminator bad.</figcaption>
</figure>

As registered, rung 5a is **not met** ([results](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/RESULTS.md)): 45 of 100 runs met both endpoints, well short of 80, while the shuffled control lost every run. In 57 runs cooperation fell below half at some point, and those runs ended with defectors in the majority. This is consistent with Hilbe et al. (2018)'s broader result that private, noisy information can destabilise reputation-based cooperation, but it does not establish a general effect across norms or information structures. The deterministic screen overestimated the stochastic late-window mean (0.93 predicted, 0.48 observed).

**The original line ends here.** As agreed before the rebase (2026-11-26), a valid failure with no permitted change of settings ended the original indirect-reciprocity line at rung 4b. A later, separately registered gossip follow-up is reported below; it does not change that original ladder boundary.

## Separate Gossip Follow-up (5b)

The follow-up retained rung 5a's private views and fixed base, but placed one target-specific gossip phase halfway through each generation: a receiver could copy one source's view of the same third party. It compared that rule with fresh no-gossip runs and with a wrong-target sham.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead><tr><th>Arm (100 runs)</th><th>Both endpoints</th><th>Mean cooperators, late window</th><th>Midpoint agreement, before / after</th></tr></thead>
      <tbody>
        <tr><td><strong>Target-specific gossip</strong></td><td style={{ textAlign: 'center' }}><strong>44/100</strong></td><td style={{ textAlign: 'center' }}>0.460</td><td style={{ textAlign: 'center' }}>0.703 / 0.893</td></tr>
        <tr><td>No gossip</td><td style={{ textAlign: 'center' }}>37/100</td><td style={{ textAlign: 'center' }}>0.387</td><td style={{ textAlign: 'center' }}>0.696 / 0.696</td></tr>
        <tr><td>Wrong-target sham</td><td style={{ textAlign: 'center' }}>11/100</td><td style={{ textAlign: 'center' }}>0.140</td><td style={{ textAlign: 'center' }}>0.604 / 0.844</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 5:</strong> The separately registered gossip follow-up on rung 5a's fixed base. Agreement is the share of sampled distinct observer pairs holding the same view of a third party immediately before and after the midpoint phase.</figcaption>
</figure>

The result is **not met**: 44 passes were below the registered 80-pass bar, and the paired advantage over no gossip was only 23 wins to 16 losses (p = 0.168), below the registered +20 and p < 0.01 criterion. Gossip did beat the sham (41 wins to 8 losses; p < 0.000001), supporting the narrower conclusion that copying the right target mattered in this design. It does not show that gossip generally fails, nor does it extend the model into ecology.

## External Check: the Authors' Own Gossip Model

As a separate external check (not a ladder rung), the authors' own code for Kawakatsu, Kessinger and Plotkin (2024) was run unchanged, with criteria registered in advance: 100 individuals, private views, opinion-copying gossip (an individual adopts another's view of a third party), no mutation, 50 runs per setting.

| Setting | Without gossip | With gossip (τ = 0.4) |
| --- | --- | --- |
| Stern judging, three starts predicted to reach discriminators | 0/150 runs fix discriminators | 134/150 runs fix discriminators |
| Stern judging, all six starts | 300/300 runs fix defectors | 139/300 runs fix discriminators |

The registered replication criteria were **met**: under stern judging, every run without gossip fixed defectors, while with gossip the three predicted starts fixed discriminators in 47, 43 and 44 of 50 runs. A graded dose check also held: from one mixed start, discriminators fixed in 0/50 runs at τ = 0.05 and 35/50 at τ = 0.30. Under simple standing, the bridge to rung 5a, defectors went extinct without gossip in 175 of 200 runs from the four starts predicted to lose them. Mean cooperation was 0.91–0.95 from three of those starts. Because the authors' model differs from the ladder in several ways at once (updating rule, mutation, observation rate, starts and success measure), this cannot say which difference explains the ladder's rung-5a result. Details: [RESULTS](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/kawakatsu2024_gossip/RESULTS.md).

## Details and References

The plan, every pre-registration and all results are in the ladder's [README](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/README.md) and [RESULTS](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/RESULTS.md).

- Nowak, M. A., and Sigmund, K. (1998). *Evolution of indirect reciprocity by image scoring*. *Nature*, 393, 573–577. https://doi.org/10.1038/31225
- Leimar, O., and Hammerstein, P. (2001). *Evolution of cooperation through indirect reciprocity*. *Proceedings of the Royal Society B*, 268, 745–753. https://doi.org/10.1098/rspb.2000.1573
- Panchanathan, K., and Boyd, R. (2003). *A tale of two defectors: the importance of standing for evolution of indirect reciprocity*. *Journal of Theoretical Biology*, 224, 115–126. https://doi.org/10.1016/S0022-5193(03)00154-1
- Nowak, M. A., and Sigmund, K. (2005). *Evolution of indirect reciprocity*. *Nature*, 437, 1291–1298. https://doi.org/10.1038/nature04131
- Hilbe, C., Schmid, L., Tkadlec, J., Chatterjee, K., and Nowak, M. A. (2018). *Indirect reciprocity with private, noisy, and incomplete information*. *PNAS*, 115(48), 12241–12246. https://doi.org/10.1073/pnas.1810565115
- Kawakatsu, M., Kessinger, T. A., and Plotkin, J. B. (2024). *A mechanistic model of gossip, reputations, and cooperation*. *PNAS*. Preprint: https://arxiv.org/abs/2312.10821
