---
id: to_do
title: To do
sidebar_position: 99
---
## PredPreyGrass observation-space improvements — partially built, see trial log

The RL-side half of this idea (drive-conditioned observations: `hunger_pressure`, `reproductive_readiness`, `prey_opportunity`, `predator_danger_pressure`, `grass_opportunity` as extra observation channels, reward untouched) is implemented and numerically verified as `predpreygrass/non_evolutionary/drive_conditioned_environment/` — the baseline-vs-drive-conditioned comparison hasn't been run yet.

The evolutionary half (evolving which drive channels are enabled, or how strongly each is scaled, as a heritable trait feeding the shared policy) has not been started. It's recorded as a candidate next experiment — targeting the shared-policy-can't-see-its-own-genome gap directly — in the [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log)'s "What's next" section on the website. Update that section (and its source, `predpreygrass/evolutionary/RESULTS.md`) rather than re-deriving this design from scratch here.


### Model Hunter Gathererers
- What are good determinants of "Camp"
## Hub formatioen
- as a bridge between hunter gateherers and settlers
- What are good determinats of "Hub" (for more permanent settlement)
  - Water/river
  - Protection
  - (Proximity access) to Leaderchip (Marbella: first the elite tourism then mass toerism; Hapton court)
  - Scaleability/self fulfilling
- Decisison to Fight-or-Flight

#### eating
=- More varied than setllers
- Scavanging
- Nuts
- Deer
- Large Deer (stronger than humans)
#### sheletering

#### household formation

#### movement

#### bands
- size (150)
- social structure
- specializasing


#### steps
-every step 1 month, to acurately enough simulate the seasons.



### Mental accounting
Implement a range of in-debtness, to model the concept of friend/informal business. For instance if defected x-times in a row / or if the accumulated investement is 'fair'.

### ESS : with only thieves in the world there is nothing to steal

### if defectors get punished with a certain probability; how does that reduce crime? [Rachel: "commiting crime is inversely related to chance of being caught/punished"] 

### make a vizualization with manually inserting a strange startegy into a basin/gird
- To (dis) proof ESS


### Nature v Nurture definitions
- what is nurture ? Pure "self nurtured" or "man made nurtured" or "nature nurtured? If someone is born near the equator in Africa; is that nurture? Is the behavior of ancestors nurture or nature? Is a physical inheritance nurture or nature?

- "Humans seem to have evolved capacities for learning reciprocity, but the actual reciprocal rules are built through development, attachment, repeated interaction, and culture. A newborn does not “reciprocate” in the game-theory sense. A baby mainly receives care. But babies are already equipped for social responsiveness: attention to faces, voices, emotional expressions, turn-taking rhythms, comfort, attachment, and sensitivity to contingent responses. Those are evolved foundations."

The Nowak-mechanism nature/nurture table and the evolution/culture/institutions table both now live on the site at [Nowak Mechanisms → Nowak's mechanisms on the nature-nurture spectrum](/evolved-cooperation/nowak-mechanisms#nowaks-mechanisms-on-the-nature-nurture-spectrum) — edit them there, not here.

So in humans, evolutionary selection does not simply produce fixed cooperation rules like:

“Always cooperate.”

That would be too rigid and easily exploited.

Instead, selection favors **learning systems** that allow humans to become cooperative under the right social conditions: cooperate with kin, reciprocate with reliable partners, care about reputation, cluster with cooperators, follow group norms, and punish or avoid exploiters.

## Why do humans cooperate?

The surface answers are many:

- survival,
- reciprocity,
- empathy,
- norms,
- reputation,
- laws,
- morality.

These are important mechanisms, but they can be reduced to a smaller set of structural reasons.

## Evolutionary Stable Strategy (ESS)

- **"With only thieves (in the world) there's nothing to steal"**

## Having options makes people happy
- Changing (options) seasons makes people happie than peoplewith fixed climate?? This implies relation between equator distance and happiness.

## Interdependence of outcomes

Cooperation becomes rational when payoffs are coupled and agents cannot optimize fully on their own.

Examples include:

- shared resources,
- division of labor,
- ecological feedback loops,
- public goods,
- tasks that exceed solo capacity.

## Temporal extension

Cooperation becomes more likely when interactions repeat over time. Short-term sacrifice can produce long-term gain through:

- reciprocity,
- trust,
- reputation,
- learning,
- cultural transmission.

## Internalization of group structure

Humans often carry social regulation inside the individual through:

- empathy,
- guilt,
- shame,
- norms,
- identity.

This helps explain why cooperation can persist even when direct monitoring or immediate reward is weak.

## One-sentence synthesis

Cooperation emerges when independent optimization breaks down, the future matters, and social coordination becomes internalized.

## Why this matters here

For this site, the central question is not whether cooperation exists, but how it fits into a broader theory of human behavior and under what minimal conditions it emerges:

- through learning within a lifetime,
- through selection across generations,
- and through the interaction between those two timescales.

That is why cooperation sits near the center of the project. It is not the whole of human behavior, but it is one of the clearest cases in which behavior cannot be understood at the level of the isolated individual alone.

### Brainstorming
- Use Leary's Rose in Learned Cooperation?
- "The Inevitablity of Selfishness"
- "Cooperation is not trivial. Competition is intuitivly more sensible due to the inevitability of selfishness"

### [X]Cooperation by bundled forces of predators
- Predators can eat if the predators enters the Moore neighborhood of a Prey
- It can only eat if it has a higher energy level than the Prey
- If more Predators ar in the Moore neighborhood, it can eat the Prey only if their cumulative energy is greater or equal than the Prey. If so: the divide the energy proportionally to their own energy.
- "When you can't do it alone you must do it together"

### Similarties "Nature" and "Nurture"
- maybe not so different
- The natural selection of life time learning
- diminshing returns on the happy behaviors (learning is also open-ended like evolution is)
- reward system is adaptivre like evolution


### Differences
-  "nature" is very **binary**: survival/reproduction, "Nurture" is more continuous and less fatal.

### repo tit-for-tat
- iterative tit-for-tat
- always end defecting if finite ending
- MARL training with random ending periods (max_steps), might result in cooperating

### [ ] Direct reciprocity without coordination under necessity

Goal:
- Remove "we must cooperate or we cannot kill the prey" completely.
- Study whether predators learn to help because help is returned later, not because a kill is impossible alone.

Recommended environment concept:
- Start from a rabbits-only or `shared_prey` style environment, not `mammoths`.
- Every prey is individually catchable by one predator.
- Reproduction remains the only learning reward, so the setup stays aligned with the rest of PredPreyGrass.

Cooperative act:
- After a successful solo kill, the capturing predator can choose `share_food = 0/1`.
- If `share_food = 1` and another predator is within Moore neighborhood:
- A fixed fraction of prey energy is transferred to one nearby predator.
- The sharer keeps the remainder and is immediately worse off than under selfish consumption.
- Sharing is therefore voluntary and immediately costly.

Alternative cooperative act:
- `assist_hunt = 0/1` for a nearby predator that is chasing prey.
- Assistance lowers the target predator's hunting cost or raises its capture chance.
- Assistance is never required for capture, only beneficial.

Direct reciprocity mechanism:
- Each predator keeps private memory of specific partners, not public reputation.
- Example memory variable: `trust[i][j]` = how much predator `i` expects predator `j` to return favors.
- Increase `trust[i][j]` when `j` shared with or assisted `i`.
- Decrease `trust[i][j]` when `j` refused to share or help in a relevant opportunity.
- Let trust slowly decay back toward neutral so reciprocity must be maintained.

Observation / state:
- Standard spatial observation stays intact.
- Add one extra private observation signal for predators only:
- At nearby predator positions, encode focal-agent trust toward that predator.
- Or provide a compact summary such as nearest-partner trust / mean nearby trust.
- Do not expose a public reputation score; otherwise the mechanism shifts toward indirect reciprocity.

Why this is no longer necessity:
- A predator can always eat alone.
- Cooperation now means giving up immediate energy for another predator.
- The only reason to do this is expectation of future return through repeated interaction.

Core experimental conditions:
- Baseline selfish condition: no memory, no partner-specific trust signal.
- Direct reciprocity condition: private partner memory enabled.
- Identity-shuffle ablation: same reciprocity logic, but predator identities are randomly remapped each episode.
- Optional indirect reciprocity comparison: public reputation signal instead of private pairwise memory.

Ecological settings that make direct reciprocity testable:
- Spawn offspring near parents so the same predators meet repeatedly.
- Keep movement costs and energy decay moderate so repeated interaction matters.
- Keep prey abundant enough that sharing is feasible, but not so abundant that social help is irrelevant.
- Keep lifetimes long enough for remembered favors to be returned.

What should emerge if direct reciprocity is real:
- Predators share or assist reliable partners more than unreliable partners.
- Predators reduce helping after a partner failed to reciprocate.
- Cooperation is stronger with partner memory than without it.
- Cooperation collapses or weakens strongly when identities are shuffled.

Minimal metrics:
- `P(share | partner shared with me before)`
- `P(share | partner did not share with me before)`
- `P(assist | partner assisted me before)`
- Mean energy transferred per dyad over time
- Share/assist rate for familiar partners versus unfamiliar partners
- Change in helping probability after partner defection
- Reproduction rate under baseline vs reciprocity vs identity-shuffle

Interpretation:
- If helping rises only when partner-specific memory is available, then cooperation is no longer explained by immediate ecological necessity.
- It is explained by expected future return from repeated interaction: direct reciprocity.


### [ ] Mixed -Stah Hunt
- Have to types of Prey: Mammoths and Deer
  - Experiment for coevolution
  - https://chatgpt.com/share/694e5758-e21c-8008-87d9-1c01dc66cf1b
  - https://en.wikipedia.org/wiki/Stag_hunt

### Macro-level energy
- Add it to the file which is already in place: energy_by_type.json (created by evaluate_......_debug.py)
- Substract cumulative decay energy Predator and Prey per step (homeostatic energy)
- Add cumulative photosynthesis energy from grass


### layered cooperationn in SocialBehavior
- Marl Book example
- Display Maslow's Pyramid and describe project from bottom to top:
- First layer: PredatorPreyGrass project. Typical for the first layer, physical need (eeating), survival an reproduction.
- Second layer: social needs. Need to corporate 


### Dynamic training

- Create training algorithm of competing policies and select 'winner' after each iteration/a number of iterations. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automatically at run time rather than manually after full (10 hour) experiments.
Determine success:
  - fitness metrics
  - ability to co-adapt

- curriculum reward tuning



### Examples to try out

- Meta learning example RLlib ("learning-to-learn"):
https://github.com/ray-project/ray/blob/master/rllib/examples/algorithms/maml_lr_supervised_learning.py
- curriculum: https://github.com/ray-project/ray/blob/master/rllib/examples/curriculum/curriculum_learning.py
- curiosity: https://github.com/ray-project/ray/tree/master/rllib/examples/curiosity

- Explore examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax


### Environment enhancements
- Male & Female reproduction instead of asexual reproduction
- Build wall or move wall
- Adding water/rivers

  ### Experiments

- Tuning hyperparameters and env parameters simultaneously (see chat)

- max_steps_per_episode: 
  For policy learning performance: 500–2000 steps per episode is a common sweet spot in multi-agent RL — long enough for interactions to unfold, short enough for PPO to assign credit.

  For open-ended co-evolution (your case): you might intentionally want longer episodes (e.g. 2000–5000) so emergent dynamics have time to play out, even if training is slower.

  A good trick is to curriculum the horizon:

  Start short (e.g. 500–1000) → agents learn basic survival.

  Gradually increase (e.g. +500 every N iterations) → expose them to longer ecological timescales.

  “works-in-practice” plan for your PredPreyGrass run, plus what to tweak as you lengthen episodes.

  ## Recommended episode horizon + hyperparameters (curriculum)

  Start shorter for stability/throughput, then stretch to let eco-dynamics (booms, busts, Red-Queen) unfold.

  **Phase A (bootstrap)**

  * `max_steps = 1_000`
  * `gamma = 0.995` (effective credit horizon ≈ 1/(1−γ) ≈ **200** steps)
  * `lambda_ (GAE) = 0.95–0.97`

  **Phase B (mid)**

  * `max_steps = 2_000–3_000`
  * `gamma = 0.997–0.998` (horizon ≈ **333–500**)
  * `lambda_ = 0.96–0.97`

  **Phase C (long-term dynamics)**

  * `max_steps = 4_000–5_000`
  * `gamma = 0.998–0.999` (horizon ≈ **500–1 000**)
  * `lambda_ = 0.97`

  Why that mapping? PPO’s useful credit horizon is \~1/(1−γ). As you increase `max_steps`, you raise `γ` so actions can “see” far enough ahead without making variance explode.


  ## Batch/throughput knobs to adjust as episodes get longer

  Keep \~**4–10 episodes per PPO iteration** so you still get decent reset diversity:

  * **train\_batch\_size**: roughly `episodes_per_iter × max_steps`.
    Example: at `max_steps=1_000`, use `8_000–16_000`. When you move to `max_steps=3_000`, bump toward `24_000–48_000`.
  * **rollout\_fragment\_length**: increase with horizon so GAE has longer contiguous fragments (e.g., 200 → 400 → 800).
  * **num\_envs\_per\_env\_runner**: raise a bit as episodes lengthen to maintain sampler throughput.
  * **KL/clip**: leave defaults unless you see instability; longer horizons often benefit from slightly smaller learning rate rather than big clip/kl changes.

  ## When to stop stretching episodes

  * If `timing/iter_minutes` balloons or TensorBoard curves update too slowly, hold the current `max_steps` for a while.
  * If you see extinction before the cap, longer episodes won’t help—tune ecology (e.g., energy gains/losses) instead.

  ## Make available the BHP archive in a repository

  
  ## LT-goal acquire more wealth as a population
  * Energy as a proxy of wealth
  * Only the top 10% of energy reproduces?
  * Escaping the Malthusian trap

  ### Integrate Dynamic Field Theory 
  - Wrapper around brain
  - Visualize first!!!

  ### Posting on the linkedin The Behavior Patterns Project?

  ### The Malthusian Trap in a Predator–Prey Co-Evolutionary System
  - Limit population size of predators or prey; is that beneficial compared to unbounded reproduction?
  - [2.5]: experiment_1 / experiment are powerfull examples of the Malthusian trap. Record this on site. Create a "Malthusian Trap" 


### Pranjal 2-12-2025

- Communication: leave ant trace (ant colony/lenia), also keep previous state in Observation?
- www.talkRL.com
- Reshape Field of Vision for Predators; only into the direction of moiving? In that way Prey can hide more easily from Predators?
- Is the existence of a prolonged episode betweeen predators and prey not an emergence of cooperation?

### Research shortlist: evolution + birth/death + MARL

- Malthusian Reinforcement Learning (Leibo et al., 2018/2019): population pressure and ecology-linked MARL adaptation.  
  https://arxiv.org/abs/1812.07019  
  https://www.ifaamas.org/Proceedings/aamas2019/pdfs/p1099.pdf
- Neural MMO (Suarez et al., 2019; Neural MMO 2.0, 2021): persistent many-agent worlds with spawn/death and resource pressure.  
  https://arxiv.org/abs/1903.00784  
  https://arxiv.org/abs/2110.07594
- Evolutionary Population Curriculum (2020): evolutionary selection over policy populations in large-scale MARL.  
  https://arxiv.org/abs/2003.10423
- Evolutionary MARL in Group Social Dilemmas (Chaos, 2025): evolutionary pressure on RL traits in social dilemmas.  
  https://pubmed.ncbi.nlm.nih.gov/39937196/
- Iterated + Evolutionary Games with MARL (Nature Communications, 2025): MARL-discovered strategies tested in evolving populations.  
  https://www.nature.com/articles/s41467-025-67178-6
- Neural Population Learning beyond Symmetric Zero-Sum Games (AAMAS 2024): population-level selection/equilibrium in general-sum MARL.  
  https://deepmind.google/research/publications/24820/


- ### Comenius and Curriculum Learning

Comenius argued that teaching should proceed from the easy to the difficult, so that new knowledge builds on what has already been learned. This principle closely resembles curriculum learning in reinforcement learning, where an agent first trains on simpler tasks before progressing to more complex ones.

For PredPreyGrass, this could mean starting with easy survival conditions and gradually introducing scarcity, predators, competition, cooperation, and co-evolution. An adaptive curriculum may be especially useful, because the difficulty can change according to the agents’ current performance rather than following a fixed sequence. This connects Comenius’ educational principle with modern ideas in automatic curriculum learning and open-ended learning.

- make a to do mindmap?
