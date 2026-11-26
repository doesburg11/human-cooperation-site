---
id: indirect-reciprocity-progress
title: "Indirect Reciprocity: Definition and Progress"
sidebar_label: "Indirect Reciprocity: Definition and Progress"
sidebar_position: 1.6
slug: /evolved-cooperation/indirect-reciprocity-progress
---

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page states what this site counts as indirect reciprocity and tracks, rung by rung, how far a stepwise ladder has come from Nowak's threshold model towards indirect reciprocity in an ecological setting. It is built like the <a href="/evolved-cooperation/kin-selection-progress">kin-selection ladder</a>. The basic model is on the <a href="/evolved-cooperation/indirect-reciprocity">Indirect Reciprocity</a> page.</div>

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
        <tr><td style={{ textAlign: 'center' }}>4b</td><td>Mutation among the three strategies</td><td>Theory screen passed (2026-11-26); test not yet registered</td><td style={{ textAlign: 'center', backgroundColor: '#EEEEEE' }}>–</td></tr>
        <tr><td style={{ textAlign: 'center' }}>5a</td><td>Private assessment (individuals keep their own views and can disagree)</td><td>Planned</td><td style={{ textAlign: 'center', backgroundColor: '#EEEEEE' }}>–</td></tr>
        <tr><td style={{ textAlign: 'center' }}>5b</td><td>Gossip (views spread between individuals)</td><td>Planned; the last rung under the agreed hard stop</td><td style={{ textAlign: 'center', backgroundColor: '#EEEEEE' }}>–</td></tr>
        <tr><td style={{ textAlign: 'center' }}>6-10</td><td>Overlapping generations, energy, births needing energy, limited food, starvation, births into free space, movement</td><td>Planned, beyond the agreed hard stop</td><td style={{ textAlign: 'center', backgroundColor: '#EEEEEE' }}>–</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> The indirect-reciprocity ladder. Every rung is a population of 1,000 with a fixed size (Wright-Fisher generations); the ecological rungs (6 onwards) are not built. Counts are test-arm runs meeting the registered maintenance endpoint against shuffled-reputation runs. Rungs 1 to 3b and the first two attempts at 4a use a benefit-to-cost ratio of 3 and a consultation probability <em>q</em> = 0.6; the rebased results use <em>q</em> = 0.8. All results hold only at the settings tested.</figcaption>
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

## Next: Mutation (Rung 4b)

With mutation, every strategy keeps reappearing. A theory screen ([note](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/rung4b/THEORY_SCREEN_RUNG4B.md)) found a sharp cliff. At a mutation rate of 0.001 per offspring, cooperators settle at about 99% of the population (unconditional cooperators about 7.5%). Near a rate of 0.0046 the cooperative state disappears and the defector-dominated state is the only stable one left. The screen reads this as the combined effect of mutation supplying unconditional cooperators, who can feed defectors, and reintroducing defectors directly; it does not separate the two. The screen also shows that a defector-dominated state is stable at low mutation, so a test can only show maintenance from a cooperative start, not recovery. The rung-4b test has not been registered yet.

**Agreed hard stop for the line** (2026-11-26): on the new setting the ladder may continue up to rung 5b (gossip) at most, each rung with a theory screen, its own agreement and at most two attempts; two failures at any rung end the line, with no further rebase.

## Details and References

The plan, every pre-registration and all results are in the ladder's [README](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/README.md) and [RESULTS](https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/indirect_reciprocity/ladder/RESULTS.md).

- Nowak, M. A., and Sigmund, K. (1998). *Evolution of indirect reciprocity by image scoring*. *Nature*, 393, 573–577. https://doi.org/10.1038/31225
- Leimar, O., and Hammerstein, P. (2001). *Evolution of cooperation through indirect reciprocity*. *Proceedings of the Royal Society B*, 268, 745–753. https://doi.org/10.1098/rspb.2000.1573
- Panchanathan, K., and Boyd, R. (2003). *A tale of two defectors: the importance of standing for evolution of indirect reciprocity*. *Journal of Theoretical Biology*, 224, 115–126. https://doi.org/10.1016/S0022-5193(03)00154-1
- Nowak, M. A., and Sigmund, K. (2005). *Evolution of indirect reciprocity*. *Nature*, 437, 1291–1298. https://doi.org/10.1038/nature04131
