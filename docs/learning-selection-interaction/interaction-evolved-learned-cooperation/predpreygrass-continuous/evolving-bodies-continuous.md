---
id: evolving-bodies-continuous
title: Learning Steers Body Evolution
sidebar_position: 6
slug: /learning-selection-interaction/predpreygrass-continuous/evolving-bodies
---

# Learning Steers Body Evolution

What happens in the continuous [PredPreyGrass](/learning-selection-interaction/predpreygrass-continuous) world when animals' bodies evolve while their behaviour is learned? Every animal carries three heritable genes, top speed, view distance and field of view, passed to its offspring with small mutations; one shared PPO policy per species learns how to use whatever body an animal has. The question behind it is the project's long-term one: can learning and evolution drive each other, as in a [Baldwin effect](/learning-selection-interaction/baldwin-effect)? The code and every number below are in the [`eco_evolutionary_continuous_traits`](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_continuous_traits) module of the PredPreyGrass repository.

## Key findings

- **Learning changed the direction of body evolution.** From one shared starting point, predator speed rose in all six runs in which the predator policy kept learning and fell in all six in which it was frozen. The difference, +0.18 on the gene's log scale, has a 95% interval of +0.14 to +0.22 (exact randomization p = 0.005). This was the test fixed in advance after a single exploratory run.
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

## What this does and does not show

The result is a replicated case of learning changing the course of evolution: branches drawn from the same branch-point gene pool showed opposite predator-speed trajectories depending on whether the predator policy kept adapting. That is a broad Baldwin-style result, learning steering evolution (Baldwin, 1896; [Hinton and Nowlan, 1987](/learning-selection-interaction/hinton-nowlan-1987)). It is not the classic Baldwin effect, in which individual lifetime learning smooths the path for genes: here learning is one policy shared by a whole species and trained across generations.

It does not show *why*. One reading is that a faster body only pays once the policy has learned to use the extra speed, so a frozen policy, tuned to the bodies of the branch point, gets no benefit from faster offspring. Another is that learning and frozen predators live in different ecologies, with different numbers of predators and prey, which would change selection on speed without any adaptation to bodies. The runs measure gene trajectories, not which bodies pay, and they start from one branch point only, so how general the effect is remains open. Separating these readings, for example by scoring frozen and learned policies on bodies of different speeds, is the next step.

## References

- Baldwin, J. M. (1896). A new factor in evolution. *The American Naturalist*, 30(354), 441–451.
- Hinton, G. E., and Nowlan, S. J. (1987). How learning can guide evolution. *Complex Systems*, 1, 495–502.
- Moran, D., Softley, R., and Warrant, E. J. (2015). The energetic cost of vision and the evolution of eyeless Mexican cavefish. *Science Advances*, 1(8), e1500363.
- Niven, J. E., Anderson, J. C., and Laughlin, S. B. (2007). Fly photoreceptors demonstrate energy-information trade-offs in neural coding. *PLoS Biology*, 5(4), e116.
- doesburg11. *PredPreyGrass*, `eco_evolutionary_continuous_traits` module (code, runs and results, RESULTS.md sections 1–5). GitHub. https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/evolutionary/eco_evolutionary_continuous_traits
