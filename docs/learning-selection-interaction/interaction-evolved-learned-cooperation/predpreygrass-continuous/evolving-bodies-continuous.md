---
id: evolving-bodies-continuous
title: Learning Steers Body Evolution
sidebar_position: 6
slug: /learning-selection-interaction/predpreygrass-continuous/evolving-bodies
---

# Learning Steers Body Evolution

What happens in the continuous [PredPreyGrass](/learning-selection-interaction/predpreygrass-continuous) world when animals' bodies evolve while their behaviour is learned? Every animal carries three heritable genes, top speed, view distance and field of view, passed to its offspring with small mutations; one shared PPO policy per species learns how to use whatever body an animal has. The question behind it is the project's long-term one: can learning and evolution drive each other, as in a [Baldwin effect](/learning-selection-interaction/baldwin-effect)? The code and every number below are in the [`eco_evolutionary_continuous_traits`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/continuous_space/eco_evolutionary_continuous_traits) module of the PredPreyGrass repository.

## Key findings

- **Learning changed the direction of body evolution, from two starting points.** From one branch point, predator speed rose in all six runs in which the predator policy kept learning and fell in all six in which it was frozen. The difference, +0.18 on the gene's log scale, has a 95% interval of +0.14 to +0.22 (exact randomization p = 0.005). This was the test fixed in advance after a single exploratory run. From a second branch point, with much slower predators, the same test gave +0.19 (95% interval +0.09 to +0.28, p = 0.005).
- **Speed pays more under the learned predator policies.** With predator speeds set by hand and the same starting prey, extra speed paid about twice as much under the policies predators had learned as under the frozen one. Under the frozen policy faster lineages had more offspring but a smaller share of them survived; the learned predators turned more of their extra offspring into survivors.
- **Several traits showed persistent directional selection.** In runs where genes affected the body, selection differentials kept one sign in 84–100% of iterations, much larger and more consistent than in control runs where the genes had no effect.
- **Expensive bodies went with a collapsing ecosystem.** In a single pilot run where extra capacity cost a lot, evolution produced slow, short-sighted predators, prey went extinct in most test episodes, and the learning arms race of the base world disappeared. In two runs with cheaper capacity both species coexisted in every test episode. Those runs also differed in other settings, so cost alone is not isolated as the cause.
- **Both species traded view distance for a wide field of view** in both cheaper-cost runs; speed rose and then fell again. Neither run showed a sustained escalation in body traits.
- **Behaviour and bodies can be told apart.** Crossing policies with gene pools from three sampled points in training showed the prey's improvement came from learned behaviour, while a decline in predator hunting came mostly from evolved bodies in one run and from behaviour in another.

## Design

Each gene is a log-ratio to the species' base value, between half and double. A larger capacity raises the animal's resting metabolic cost, in line with the energy cost of vision found in animals (Niven et al., 2007; Moran et al., 2015); moving still costs energy per unit of speed. The cost weights (speed 1.0, view distance 0.5, field of view 0.25 per unit of relative change) are starting guesses, not measured values. Inheritance is asexual. Each episode's founders are drawn from the animals alive at the end of the previous episode, so the gene pool evolves across episodes, while the PPO policy, which sees each animal's own genes, learns across the same episodes. A neutral control carries the genes in the same way but without any effect on the body, which shows how far genes drift by chance.

## Expensive bodies: cheap animals and a collapsing ecosystem

In the pilot, a single run with the cost weights above, the genes evolved under persistent selection: predator speed and vision and prey vision fell and prey field of view rose, each with a selection differential of one sign in every iteration and 5–30 times larger than in the neutral control. But evolution found cheap bodies rather than better ones. Predators became slow and short-sighted, cutting their resting cost to 0.44 of the base, and became numerous: 34 predators and 3 prey on average at episode ends, against 12 and 22 in the neutral control. Both species survived in 13 of 50 test episodes, against 46 of 50 in the control, and newer policies no longer beat older opponents.

## Cheaper bodies: shorter, wider vision

At half and a quarter of the pilot's costs, both runs were stable, with both species surviving in every test episode:

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Trait</th><th>Change in both species and both cost levels</th><th>Iterations with the same sign of selection</th></tr>
    </thead>
    <tbody>
      <tr><td>View distance</td><td>fell to about 0.55× the base</td><td>96–100% (negative)</td></tr>
      <tr><td>Field of view</td><td>rose, by +0.39 to +0.55 on the log scale</td><td>84–96% (positive)</td></tr>
      <tr><td>Top speed</td><td>rose to iteration 500–900, then fell again</td><td>mostly positive, even while the mean fell</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 1:</strong> Body evolution in the two cheaper-cost runs (3,000 training iterations each). Vision was traded for width repeatably; speed went up and down, and the selection measure, which counts offspring within an episode, does not explain its decline.</figcaption>
</figure>

The speed decline while measured selection still favoured speed shows the measure is incomplete: survival to the end of an episode, which decides who founds the next one, is not in it, and drift through the founder bottleneck, mutation near the gene limits and the changing policies could all contribute.

## Behaviour or bodies?

In these runs, a newer checkpoint is a newer policy together with newer bodies, so a change in hunting success mixes learning with evolution. Playing policies from iterations 300, 1,500 and 2,990 with the gene pools of each of those iterations separates the two. The prey's improvement was behaviour: newer prey policies were harder to catch, while their evolved bodies made no difference or made them slightly easier to catch. In the run at half the pilot's costs, predators caught less mostly because of their evolved bodies: under one fixed policy, catch risk fell from 4.24 with an early gene pool to 1.52 with the last one. In the run at a quarter of the costs, predators declined only slightly, through behaviour. Catch risk is hunting success, not fitness; predators that catch less but spend less energy waiting near grass may still do well.

## Does learning change how bodies evolve?

If behaviour adapts to the bodies it drives, a trait may only be worth having while behaviour keeps learning to use it. To test this, the quarter-cost run was branched at iteration 1,500 into four arms: both species learning, both frozen, only predators frozen, only prey frozen. Every arm continued for the same number of steps, starting from the same policies and with founders drawn afresh from the same pooled gene pool. A frozen policy stays exactly as it was at the branch point while the genes keep evolving. A first round with one run per arm suggested that predator speed rose only where predators kept learning; that contrast was then fixed as the test, and the four arms were run again with three new seeds each.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Arm</th><th>Predators learn</th><th>Prey learn</th><th>Seed 1</th><th>Seed 2</th><th>Seed 3</th><th>Mean</th></tr>
    </thead>
    <tbody>
      <tr><td>both learning</td><td>yes</td><td>yes</td><td>+0.086</td><td>+0.047</td><td>+0.110</td><td>+0.081</td></tr>
      <tr><td>prey frozen</td><td>yes</td><td>no</td><td>+0.057</td><td>+0.062</td><td>+0.127</td><td>+0.082</td></tr>
      <tr><td>both frozen</td><td>no</td><td>no</td><td>−0.066</td><td>−0.004</td><td>−0.061</td><td>−0.044</td></tr>
      <tr><td>predators frozen</td><td>no</td><td>yes</td><td>−0.144</td><td>−0.171</td><td>−0.150</td><td>−0.155</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 2:</strong> Change in the population's mean predator-speed gene over 1,500 iterations after the branch point (log scale; +0.1 is about 10% faster). Every run with learning predators got faster, every run with frozen predators got slower.</figcaption>
</figure>

Averaging the two learning arms against the two frozen arms gives +0.18 (95% interval +0.14 to +0.22). The p value comes from reassigning "learning" and "frozen" among the runs in every possible way, 400 in all, within each prey setting; none of the reassignments gives a contrast as large in either direction as the real one except the real one and its mirror, so p = 0.005, the smallest the design allows. The contrast holds within each prey setting: +0.24 where prey learned and +0.13 where prey were frozen. In the second comparison the both-frozen arm also ran on a different code path, a plain simulation loop instead of the training framework, because the framework cannot run with nothing to train.

Other genes, not tested in advance: prey speed changed by 0.15 less when prey learned than when they were frozen, and predators' view distance changed by 0.04 more when predators learned. A fifth arm with genes switched off, meant as a drift reference, turned out not to fit: with every animal on the base body, populations were much smaller and the genes drifted far more than in the other arms.

## A second starting point

The test was repeated from a later point of the same training run (iteration 2,500), where predators had become much slower (speed gene +0.06 against +0.19) and both species had wider fields of view. The design was the same, four arms with three seeds each and no gene-off arm.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Arm</th><th>Predators learn</th><th>Prey learn</th><th>Seed 1</th><th>Seed 2</th><th>Seed 3</th><th>Mean</th></tr>
    </thead>
    <tbody>
      <tr><td>both learning</td><td>yes</td><td>yes</td><td>+0.340</td><td>+0.119</td><td>+0.266</td><td>+0.242</td></tr>
      <tr><td>prey frozen</td><td>yes</td><td>no</td><td>+0.248</td><td>+0.257</td><td>+0.292</td><td>+0.266</td></tr>
      <tr><td>both frozen</td><td>no</td><td>no</td><td>+0.106</td><td>+0.110</td><td>+0.091</td><td>+0.102</td></tr>
      <tr><td>predators frozen</td><td>no</td><td>yes</td><td>+0.091</td><td>+0.060</td><td>−0.049</td><td>+0.034</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 3:</strong> Change in the mean predator-speed gene from the second branch point (iteration 2,500). From this slower start speed rose in most frozen runs too, but every run with learning predators gained more than every run with frozen ones, if narrowly (lowest +0.119 against highest +0.110).</figcaption>
</figure>

The pre-specified contrast is +0.19 (95% interval +0.09 to +0.28, p = 0.005), against +0.18 from the first branch point, and it holds within each prey setting (+0.21 and +0.16). Both branch points come from the same training run, so how the effect depends on, for example, the cost of capacity is still untested.

## Why does speed pay more when predators learn?

The branch runs show which way genes move, not why. Two readings were open: behaviour adapting to faster bodies, or learning and frozen predators living in different ecologies (where predators learned, there were about a quarter fewer prey). To separate them, predators were given fixed speed genes (−0.2, 0, +0.2 or +0.4, mixed within each episode) and scored under the frozen branch-point policy and under the six policies predators had learned by the end of their branches, all against the same starting prey. Fitness was counted as each founder's descendants alive at the end of an episode, the animals the next episode's founders are drawn from; 600 paired episodes per condition.

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--striped">
    <thead>
      <tr><th>Predator policy</th><th>−0.2</th><th>0</th><th>+0.2</th><th>+0.4</th><th>Share of offspring surviving at +0.4</th></tr>
    </thead>
    <tbody>
      <tr><td>frozen (branch point)</td><td>0.86</td><td>0.98</td><td>1.06</td><td>1.10</td><td>34%</td></tr>
      <tr><td>learned (mean of 6 runs)</td><td>0.76</td><td>0.91</td><td>1.04</td><td>1.28</td><td>38%</td></tr>
    </tbody>
  </table>
</div>
<figcaption className="site-table-caption"><strong>Display 4:</strong> Relative fitness of predator lineages by speed gene, same starting prey. Under the frozen policy the gain levels off above +0.2, about where the population was; under the learned policies it keeps rising. The last column is the share of a lineage's members still alive at the end of the episode (42% and 41% at −0.2).</figcaption>
</figure>

The slope of fitness on speed was +0.40 under the frozen policy and about twice that under the learned ones (difference +0.46, 95% interval +0.24 to +0.68 across the six learned runs, all six above zero). So the effect appears with the same starting prey, which makes the different prey numbers of the branch arms an unlikely main route, though prey numbers still differ within episodes. Faster lineages had more offspring under both policies, but under the frozen one fewer of those offspring survived, and from +0.2 to +0.4 the extra offspring added no survivors.

Splitting the change in an evolving population with both policies frozen, episode by episode, showed the same balance: faster lineages' extra births and their lower survival largely cancelled in every one of four simulated islands, so net selection on speed was small and inconsistent and speed mostly drifted. The selection measure logged in training counts offspring only, which is why it had suggested selection for speed in the frozen arms too. Why speed fell further when only predators were frozen while prey kept learning is still unexplained.

## What this does and does not show

The result is a case of learning changing the course of evolution, found at two branch points of one training run: from the first, branches drawn from the same gene pool showed opposite predator-speed trajectories depending on whether the predator policy kept adapting; from the second, predator speed rose more where it kept adapting. That is a broad Baldwin-style result, learning steering evolution (Baldwin, 1896; [Hinton and Nowlan, 1987](/learning-selection-interaction/hinton-nowlan-1987)). It is not the classic Baldwin effect, in which individual lifetime learning smooths the path for genes: here learning is one policy shared by a whole species and trained across generations.

A route consistent with the data is that learned behaviour makes speed pay: under the learned policies faster predators turn more of their extra offspring into survivors. That is shown with the same starting prey, but not that the policies adapted to speed specifically, since the learned policies differ from the frozen one in everything they learned. The effect is found from two starting points of one training run, not across settings.

What has not appeared is coevolution in bodies. Both species showed the same qualitative change in vision, shorter view distance and a wider field of view, and the prey's gains came from behaviour; no divergence or arms race in bodies was detected. In the model a wide field of view only costs energy, while in animals a narrow, forward field brings depth perception for hunting (Heesy, 2004; Banks et al., 2015). Giving a narrow field its own advantage, so that predators can evolve "hunting eyes" and prey "panoramic eyes", is the planned next step toward a two-way loop; per-agent learning, as in [Ackley and Littman (1991)](/learning-selection-interaction/ackley-littman-1991), would be the step toward a classic Baldwin effect.

## References

- Baldwin, J. M. (1896). A new factor in evolution. *The American Naturalist*, 30(354), 441–451.
- Banks, M. S., Sprague, W. W., Schmoll, J., Parnell, J. A. Q., and Love, G. D. (2015). Why do animal eyes have pupils of different shapes? *Science Advances*, 1(7), e1500391.
- Heesy, C. P. (2004). On the relationship between orbit orientation and binocular visual field overlap in mammals. *The Anatomical Record Part A*, 281A(1), 1104–1110.
- Hinton, G. E., and Nowlan, S. J. (1987). How learning can guide evolution. *Complex Systems*, 1, 495–502.
- Moran, D., Softley, R., and Warrant, E. J. (2015). The energetic cost of vision and the evolution of eyeless Mexican cavefish. *Science Advances*, 1(8), e1500363.
- Niven, J. E., Anderson, J. C., and Laughlin, S. B. (2007). Fly photoreceptors demonstrate energy-information trade-offs in neural coding. *PLoS Biology*, 5(4), e116.
- doesburg11. *PredPreyGrass*, `eco_evolutionary_continuous_traits` module (code, runs and results, RESULTS.md sections 1–8). GitHub. https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/continuous_space/eco_evolutionary_continuous_traits
