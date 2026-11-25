---
id: kin-selection-progress
title: "Kin Selection: Definition and Progress"
sidebar_label: "Kin Selection: Definition and Progress"
sidebar_position: 1.5
slug: /evolved-cooperation/kin-selection-progress
---

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page states what this site counts as kin selection and tracks, step by step, how far the experiments have come towards establishing it in a full ecological setting. The kin selection ladder is described below; the other experiments are on their own pages: the <a href="/evolved-cooperation/kin-selection">Moran kin-selection model</a> (with the ethnocentrism model), the ecological kin model, and the <a href="/evolved-cooperation/network-reciprocity#ecological-counterpart">ecological network model</a>.</div>

## Definition

**The definition used on this site.** In the broad sense used here, kin selection means: *a helping trait spreads because its benefits go to individuals related to the helper by common descent, the helper's own offspring included, even though helping costs the helper some of its own survival or reproduction.* This is deliberately broad. In standard inclusive-fitness terms, benefits to one's own offspring count as *direct* fitness and benefits to other relatives as *indirect* fitness; this site groups both under one label and always says which one a result belongs to. A result counts as kin selection here only if all three of these hold:

1. **A real cost.** Counting any share of the benefit that comes back to the helper itself, helping leaves the helper with less survival or reproduction of its own than not helping. Helping that pays for itself (weak altruism, the case in the [Moran kin-selection runs](/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed)) does not count.
2. **The benefit goes to relatives by descent.** The recipients are the helper's offspring or other relatives by common descent, not the helper itself and not unrelated individuals who happen to be nearby. In these models inheritance is clonal, so offspring carry the parent's helping trait apart from mutation.
3. **Spread from rare, against a control.** Helping rises from a rare start to an endpoint set in advance, and a comparison registered in advance shows that it does not when the benefit no longer goes to relatives (or their relatedness is removed). Where that comparison changes several things at once, the result is reported as *consistent with* kin selection, not as proof that relatedness alone caused it.

These are the ingredients of a test of Hamilton's rule, $rB > C$: the relatedness-weighted benefit $rB$ exceeds the helper's net cost $C$. The broad definition has two sub-cases, and every result on this site says which one it belongs to:

- **Kin selection through parental care:** the recipients are the helper's own offspring.
- **Kin selection among non-offspring relatives:** the recipients are siblings, cousins or neighbours who share descent. This is the classic indirect-fitness case at the centre of Hamilton's theory. Much of the literature (for example West, Griffin and Gardner 2007) keeps the name "kin selection" for this sub-case alone and treats care for one's own offspring as direct fitness. This site uses the broad definition.

**The goal.** To establish kin selection, in this broad sense, in an **ecological setting**: individuals with energy reserves, a limited renewable food supply, death by starvation, births that need resources and go into free space, and individuals that move in search of food, so that population size and empty space follow resources rather than a fixed replacement rule.

**Where it stands.** Each row is one step. The rows are grouped by how the population is regulated: in the first block, a Moran-style replacement rule keeps the population size fixed (every death is refilled at once by a neighbour's offspring, so the grid stays full); in the second, population size is not fixed and follows births, deaths and resources, as the goal requires. The Yes/No columns show which elements its model contains, and the last two columns say whether helping spread from rare and where the experiment is. Yes/No = the element is in the model or not; ✓ = achieved, ✗ = not achieved yet.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr>
          <th rowSpan={2}>Step</th>
          <th rowSpan={2}>Population size</th>
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
        <tr><td colSpan={11} style={{ backgroundColor: '#EAF2FB' }}><strong>Fixed population size (replacement rule, or fixed breeder slots)</strong></td></tr>
        <tr><td style={{ textAlign: 'center' }}>1</td><td style={{ textAlign: 'center' }}>Fixed</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="/evolved-cooperation/kin-selection#later-tests-self-benefit-and-speed">Moran kin selection</a> (warm-up)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>2</td><td style={{ textAlign: 'center' }}>Fixed</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder K0</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>Ref.</td><td style={{ textAlign: 'center' }}>Fixed (<em>n</em> breeders per patch, refilled each generation)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Partly (patch-wide benefit)</td><td style={{ textAlign: 'center' }}>Yes (patch-mates)</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Partly (one dispersal step after birth)</td><td style={{ textAlign: 'center', backgroundColor: '#EEEEEE' }}>–</td><td><a href="#external-check-kanwal-and-gardner-2022">Kanwal and Gardner (2022)</a> (external check; consistent with)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>3</td><td style={{ textAlign: 'center' }}>Fixed</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder K1</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>4</td><td style={{ textAlign: 'center' }}>Fixed</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#D6E4F5' }}>✓</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder R1-R4</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>5 (first attempts)</td><td style={{ textAlign: 'center' }}>Fixed</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Tried (grid stayed almost full)</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder R5a-R7b</a></td></tr>
        <tr><td colSpan={11} style={{ backgroundColor: '#EAF2FB' }}><strong>Ecological: population size not fixed</strong></td></tr>
        <tr><td style={{ textAlign: 'center' }}>5 (R8)</td><td style={{ textAlign: 'center' }}>Not fixed (births into free sites)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Ladder R8</a></td></tr>
        <tr><td style={{ textAlign: 'center' }}>5 (restart, no energy)</td><td style={{ textAlign: 'center' }}>Not fixed (births into free sites)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">Step-5 restart</a> (2026-11-24)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>6 <strong>Goal A</strong></td><td style={{ textAlign: 'center' }}>Not fixed (follows food)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td>Not yet built</td></tr>
        <tr><td style={{ textAlign: 'center' }}>7</td><td style={{ textAlign: 'center' }}>Not fixed (cap 320)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/kin_selection">Ecological kin model</a> (inconclusive)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>8</td><td style={{ textAlign: 'center' }}>Not fixed (cap 400)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Probably (not measured)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Partly (one jump at maturity)</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td><a href="/evolved-cooperation/network-reciprocity#ecological-counterpart">Ecological network model</a> (not a kin test)</td></tr>
        <tr><td style={{ textAlign: 'center' }}>9 <strong>Goal B</strong></td><td style={{ textAlign: 'center' }}>Not fixed (follows food)</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>No</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center' }}>Yes</td><td style={{ textAlign: 'center', backgroundColor: '#F8D7DA' }}>✗</td><td>Not yet built</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Steps towards kin selection, as defined above, in an ecological setting. Every achieved step (1 to 4) has a fixed population size; no step with a population size that is not fixed has succeeded yet. Goal A: care for own offspring with full ecology, including movement; goal B: help to other relatives with full ecology, including movement. Step 5 is split into its first attempts, which kept the replacement rule, its R8 attempt, which dropped it, and a restart on the step-3 base without energy (2026-11-24): there, care for own offspring at b/c 6 was still rising at the end of the runs but reached the endpoint in only 4 of 20 (a fixed-occupancy version of the same rule did no better, 2 of 20); at higher benefit it spread, but the empty space then largely disappeared. The row marked Ref. is not a step: it is an external check of a published model (Kanwal and Gardner 2022, see below), in which costly help to patch-mates stays above Taylor's cancellation value at equilibrium; it has no spread from rare and no control run, so it is marked – rather than ✓ or ✗, and is read as consistent with kin selection among non-offspring relatives. Steps 7 and 8 cap the population with density-dependent mortality, not a replacement rule. Step 7 also included care for own young (household juveniles). Step 8 was built as a network-reciprocity test: help goes to everyone nearby, relatedness was not tracked, and its rise was too small to count (mean trait +0.013 over 500 steps, 5 seeds). All results hold only at the settings tested.</figcaption>
</figure>

**Note.** Still to achieve: steps 5 to 9, which means everything in the second block. The transition from the first block to the second has not yet succeeded. A restart of step 5 on the step-3 base, without energy (2026-11-24), also missed its endpoint and reached its agreed hard stop, which closes the route of rebuilding the Moran model step by step. An attempt to replicate a published model that already has goal A's ecology, Taylor-Davies et al. (2024), in which parents evolve to feed their own infants on a grid with energy, regrowing food, births into free tiles and movement, stopped before any test (2026-11-25): with the authors' public code, neither the settings stated in the paper (4 of 24 populations survived 10,000 steps) nor the code's default settings (3 of 24) kept populations alive, while the paper reports surviving populations in all its runs. The settings the authors actually used could not be recovered, so their feeding results were not tested here. No kin-selection experiment so far has agents that move in search of food: in steps 1 to 6 they stay on their site for life, step 7 has no space at all, and in step 8 a few adults make one random jump when they mature. A planned movement step on the ladder (R5b) was skipped because the grid was almost full. Step 5 is the next step for care of own offspring: it failed once births needed free space, possibly because relatives born close together compete for that space (kin competition, untested). Steps 7 to 9 are the harder track, help to relatives other than offspring: step 2 worked only at benefit-to-cost ratios of 12 and 24, and its control changes local settling and relatedness together; the ladder never added ecology to it; the ecological kin model (step 7) rose in some runs, but that could not be separated from the population's survival; and the ecological network model (step 8) has costly help with no return to the helper, but tracks no relatedness and showed only a very small rise. It could still be a starting point for this track. Two non-kin models already have more of the goal's ecology and could host either goal: [Cooperative Hunting](/evolved-cooperation/cooperative-hunting) has an energy budget, regrowing grass, starvation and agents that move, but returns the shared kill to the hunters and has no births into free space; the [Spatial Prisoner's Dilemma](/evolved-cooperation/spatial-prisoners-dilemma) has births into adjacent empty cells and some movement, but no limited food. Neither tracks relatedness.

## The Ladder in Detail

The [Moran kin-selection model](/evolved-cooperation/kin-selection) is a full grid where every site is refilled each step by a neighbour's offspring. An earlier [ecological kin-selection model](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/kin_selection) (sexual reproduction, households, care for juveniles) let helping rise from rare in some runs (2 of 5 in its proof suite), also when relatedness cues were shuffled. But its controls did not separate that spread from population survival: populations persisted with helper care, while no tested survival floor (up to 0.4) kept populations without helpers alive. So it is not an established kin-selection result. In a follow-up, learned instead of inherited helping gave no detectable persistence benefit over a small constant care effort. A separate line of work, the [kin selection ladder](https://github.com/doesburg11/EvolvedCooperation/tree/main/ecological_models/nowak_mechanisms/kin_selection/ladder), asked whether kin selection survives as the model becomes more like a real ecology. Starting from the Moran model, it added one ingredient at a time (each pre-registered, with at most two attempts and its own control), and required helping to spread from rare at every step.

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
          <td style={{ backgroundColor: '#D6E4F5' }}>Care for one's own young spread at every step (19-20/20 runs against 0/20 for help to young neighbours). It also spread when offspring settled anywhere on the grid, so this site counts it as kin selection through parental care (see <a href="/evolved-cooperation/kin-selection-progress">Kin Selection: Definition and Progress</a>), not kin selection among non-offspring relatives; it did not depend on relatives living close together, and the comparison does not isolate parentage alone.</td>
        </tr>
        <tr>
          <td>Empty space</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>Not reached. Several attempts left the grid almost full, and one breeding-age setting could not sustain a population. When parents gave birth into nearby free sites, substantial empty space appeared in one of two versions, but care for own young then settled near a third of its maximum and the main test missed the endpoint (one higher-benefit arm reached it in 4/20 runs).</td>
        </tr>
        <tr>
          <td>Empty space, restart on the parental-care base without energy (2026-11-24)</td>
          <td style={{ backgroundColor: '#F8D7DA' }}>Not met. Births went into free neighbouring sites, deaths were independent of helping, and there was no energy. Care for own young at a benefit-to-cost ratio of 6 was still rising when the runs ended (mean 0.47 at update 6,000) but reached the endpoint in only 4/20 runs; a version of the same birth rule with the grid kept full did no better (2/20), so free space was not identified as the blocker. At ratios of 12 and 24 care spread (18/20 and 20/20), but the empty space then largely disappeared. Both registered attempts were used, so this route is closed.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> The kin selection ladder, from the Moran model toward an ecological model (20 seeds per arm; success = final mean helping ≥ 0.60). Details and all numbers are in the module's <a href="https://github.com/doesburg11/EvolvedCooperation/blob/main/ecological_models/nowak_mechanisms/kin_selection/ladder/RESULTS.md">RESULTS.md</a>.</figcaption>
</figure>

**What the ladder adds.** Kin selection among non-offspring relatives, with a real cost to the helper, did appear outside the simplest model, but in one step only, at the higher benefit-to-cost ratios tested (12 and 24), and only while offspring stayed near their parents. Kin selection through parental care was more robust across the tested variants, but in these tests it did not require offspring to stay near their parents. One late result points in an unexpected direction: once births went into free sites, care for own young spread much further when offspring dispersed across the whole grid (to near-maximum in 20/20 runs) than when they stayed local. That pattern is consistent with kin competition (relatives competing with each other for the same nearby space, which in theory can cancel the benefit of helping them; Taylor 1992), but it was not tested directly. A follow-up measurement on the same runs (diagnostic DR8, exploratory) looked at the neighbourhoods of would-be parents. With local births, about two thirds of breeding opportunities found no free neighbouring site, for strong and weak helpers alike (strong helpers were blocked only 0.6 percentage points more often), and a parent's own offspring made up about 12% of its neighbours in both groups. With grid-wide dispersal, none of the measured opportunities was blocked. So, locally, space was often short for strong and weak helpers alike, not specifically around helpers; the idea that helpers' own young fill the space around them is not supported in size. Why care spread further under grid-wide dispersal remains open.

## External check: Kanwal and Gardner (2022)

**Why it was run.** Step 5 failed once births needed free space, possibly because relatives born close together compete for the same space (kin competition). This is the classic obstacle: Taylor (1992) showed that when offspring disperse with a fixed probability, the benefit of living among relatives is exactly cancelled by competing with them, so population viscosity alone does not favour altruism. [Kanwal and Gardner (2022)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8905158/) argue that the cancellation breaks when dispersal depends on density: juveniles leave crowded patches more often, which relieves competition among relatives. To check that claim before building on it, their own simulation code ([jkanwal/viscosity-promotes-altruism](https://github.com/jkanwal/viscosity-promotes-altruism)) was run unchanged on their full grid, with the criteria written down before the runs (2026-11-21).

**The model.** 50,000 breeders live on patches of $n$ breeders. Each breeder has 100 offspring that copy its genes, apart from rare mutations. A juvenile's helping trait $z$ lowers its own survival, and the patch average of $z$ raises the survival of every juvenile on the patch. Each patch also draws a random survival factor, so the number of surviving juveniles differs between patches. Each juvenile then disperses with a probability that depends on how many juveniles survived on its patch, through an evolving rule, and pays a dispersal cost $c$ (the chance of dying on the way). Finally, each patch gets $n$ new breeders, drawn from the juveniles present (with repeats if there are fewer than $n$; an empty patch is refilled with new random individuals). The measure is the paper's *potential for altruism* $A = z/(1-z)$, averaged over the last 1,000 of 20,000 generations. Under Taylor's cancellation, $A = 1/n$; the paper predicts $A$ above $1/n$ and rising with $c$. Grid: $n \in \{1, 2, 3, 5, 10\}$ × $c \in \{0, 0.2, 0.4, 0.6, 0.8\}$, one run per cell (25 runs, about 3 days each).

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--bordered site-table--striped">
      <thead>
        <tr>
          <th rowSpan={2}>Breeders per patch <em>n</em></th>
          <th rowSpan={2}>Taylor's value 1/<em>n</em></th>
          <th colSpan={3}>Simulated <em>A</em> at dispersal cost <em>c</em></th>
          <th rowSpan={2}>Paper's analytic <em>A</em> at <em>c</em> = 0.8</th>
        </tr>
        <tr><th>0</th><th>0.4</th><th>0.8</th></tr>
      </thead>
      <tbody>
        <tr><td style={{ textAlign: 'center' }}>2</td><td style={{ textAlign: 'center' }}>0.50</td><td style={{ textAlign: 'center' }}>0.51</td><td style={{ textAlign: 'center' }}>0.56</td><td style={{ textAlign: 'center' }}>0.62</td><td style={{ textAlign: 'center' }}>0.63</td></tr>
        <tr><td style={{ textAlign: 'center' }}>3</td><td style={{ textAlign: 'center' }}>0.33</td><td style={{ textAlign: 'center' }}>0.36</td><td style={{ textAlign: 'center' }}>0.46</td><td style={{ textAlign: 'center' }}>0.54</td><td style={{ textAlign: 'center' }}>0.56</td></tr>
        <tr><td style={{ textAlign: 'center' }}>5</td><td style={{ textAlign: 'center' }}>0.20</td><td style={{ textAlign: 'center' }}>0.25</td><td style={{ textAlign: 'center' }}>0.37</td><td style={{ textAlign: 'center' }}>0.45</td><td style={{ textAlign: 'center' }}>0.51</td></tr>
        <tr><td style={{ textAlign: 'center' }}>10</td><td style={{ textAlign: 'center' }}>0.10</td><td style={{ textAlign: 'center' }}>0.16</td><td style={{ textAlign: 'center' }}>0.28</td><td style={{ textAlign: 'center' }}>0.33</td><td style={{ textAlign: 'center' }}>0.47</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 3:</strong> Potential for altruism <em>A</em> in the Kanwal and Gardner grid (authors' code, one run per cell, mean of the last 1,000 of 20,000 generations). Columns <em>c</em> = 0.2 and 0.6 are left out for space; they lie in between. With one breeder per patch (<em>n</em> = 1, a check), <em>A</em> was 0.94 to 0.98, close to the expected 1.</figcaption>
</figure>

**Result: all criteria set in advance were met.** All 20 runs with $n > 1$ have $A$ above Taylor's $1/n$. The paper's mixed-effects regression of $A$ on the realised dispersal rate gives a slope of −0.177 (paper: −0.178), and its permutation test gives $p = 10^{-5}$ ($p = 0.001$ in the paper's own variant, which shuffles the median-based $A$). Beyond the registered test, $A$ rises with $c$ at every $n > 1$; it tracks the analytic curve closely for $n = 2$ and 3 but falls below it at larger $n$ and higher $c$ (for example 0.33 against 0.47 at $n = 10$, $c = 0.8$), while staying well above $1/n$.

**What it does and does not show for this page.** It is an independent check on a published result: in the authors' model, with viscosity and evolving density-dependent dispersal, costly help to patch-mates (the sub-case *among non-offspring relatives*) is kept above Taylor's cancellation value. These runs did not include a matched fixed-dispersal control, so they do not show on their own that density dependence is the cause; that rests on the paper's analysis. It appears in Display 1 as a reference row, not as a numbered step, for three reasons: the number of breeders is fixed ($n$ per patch, so the model belongs to the first block); the helping trait starts at random values and settles to an equilibrium level, rather than spreading from rare; and no run removes relatedness while keeping everything else, so the comparison is with Taylor's analytic value, not with a control run. What it suggests for step 5 is a concrete ingredient to try: let offspring leave crowded neighbourhoods more often than sparse ones. The step-5 restart (2026-11-24) tried this only loosely, in one exploratory arm: offspring with no free neighbouring site moved to a random empty site anywhere (surviving the move with probability 0.8), a fixed rule rather than the evolving density-dependent dispersal of Kanwal and Gardner. Care reached the endpoint in 8 of 20 runs there, against 4 of 20 with local births only (p = 0.15, not significant). So the ingredient has been tried, loosely, with an inconclusive result; a test with evolving density-dependent dispersal has not been run.

## References

- Hamilton, W. D. (1964). *The genetical evolution of social behaviour. I*. *Journal of Theoretical Biology*, 7(1), 1–16. https://doi.org/10.1016/0022-5193(64)90038-4
- Kanwal, J., and Gardner, A. (2022). *Population viscosity promotes altruism under density-dependent dispersal*. *Proceedings of the Royal Society B: Biological Sciences*, 289(1970), 20212668. https://doi.org/10.1098/rspb.2021.2668
- Taylor, P. D. (1992). *Altruism in viscous populations — an inclusive fitness model*. *Evolutionary Ecology*, 6(4), 352–356. https://doi.org/10.1007/BF02270971
- Taylor-Davies, M., Hamon, G., Boulet, T., and Moulin-Frier, C. (2024). *Emergent kin selection of altruistic feeding via non-episodic neuroevolution*. arXiv:2411.10536. Published 2025 in *Applications of Evolutionary Computation* (Lecture Notes in Computer Science), 496–509. https://doi.org/10.1007/978-3-031-90062-4_31
- West, S. A., Griffin, A. S., and Gardner, A. (2007). *Social semantics: altruism, cooperation, mutualism, strong reciprocity and group selection*. *Journal of Evolutionary Biology*, 20(2), 415–432. https://doi.org/10.1111/j.1420-9101.2006.01258.x
