# To Do

Working notes and research ideas for the human-cooperation-site project. Not published to the website — this is a private, git-tracked scratchpad, directly editable by both Peter and Claude.

---

## PredPreyGrass experiments (specified, not yet run)

### Observation-space improvements
The RL-side half of this idea (drive-conditioned observations: `hunger_pressure`, `reproductive_readiness`, `prey_opportunity`, `predator_danger_pressure`, `grass_opportunity` as extra observation channels, reward untouched) is implemented and numerically verified as `predpreygrass/non_evolutionary/drive_conditioned_environment/` — the baseline-vs-drive-conditioned comparison hasn't been run yet.

The evolutionary half (evolving which drive channels are enabled, or how strongly each is scaled, as a heritable trait feeding the shared policy) has not been started. It's recorded as a candidate next experiment — targeting the shared-policy-can't-see-its-own-genome gap directly — in the [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log)'s "What's next" section on the website. Update that section (and its source, `predpreygrass/evolutionary/RESULTS.md`) rather than re-deriving this design from scratch here.

### Direct reciprocity without coordination under necessity

Goal:
- Remove "we must cooperate or we cannot kill the prey" completely.
- Study whether predators learn to help because help is returned later, not because a kill is impossible alone.

Recommended environment concept:
- Start from a rabbits-only or `shared_prey` style environment, not `mammoths`.
- Every prey is individually catchable by one predator.
- Reproduction remains the only learning reward, so the setup stays aligned with the rest of PredPreyGrass.

Cooperative act:
- After a successful solo kill, the capturing predator can choose `share_food = 0/1`.
- If `share_food = 1` and another predator is within Moore neighborhood, a fixed fraction of prey energy is transferred to one nearby predator.
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
- Add one extra private observation signal for predators only: at nearby predator positions, encode focal-agent trust toward that predator (or a compact summary such as nearest-partner trust / mean nearby trust).
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

### Mixed Stag Hunt
- Two types of prey: mammoths and deer.
  - Experiment for coevolution.
  - https://chatgpt.com/share/694e5758-e21c-8008-87d9-1c01dc66cf1b
  - https://en.wikipedia.org/wiki/Stag_hunt

### Macro-level energy accounting
- Add to the file already in place: `energy_by_type.json` (created by `evaluate_..._debug.py`).
- Subtract cumulative decay energy for Predator and Prey per step (homeostatic energy).
- Add cumulative photosynthesis energy from grass.

### Dynamic training
- Create a training algorithm of competing policies and select a "winner" after each iteration/N iterations. Competing policies have different environment configs. Goal: optimize environment parameters more efficiently and automatically at run time rather than manually after full (10-hour) experiments.
- Determine success via fitness metrics and ability to co-adapt.
- Curriculum reward tuning.

### Malthusian trap / population cap
- Limit population size of predators or prey — is that beneficial compared to unbounded reproduction?
- LT-goal: acquire more wealth as a population. Energy as a proxy for wealth — what if only the top 10% of energy reproduces? Framing: escaping the Malthusian trap.

### Environment enhancements
- Male & female reproduction instead of asexual reproduction.
- Build wall or move wall.
- Adding water/rivers.

### Episode horizon + hyperparameter curriculum

Tuning hyperparameters and env parameters simultaneously.

`max_steps_per_episode`: for policy learning performance, 500-2000 steps per episode is a common sweet spot in multi-agent RL — long enough for interactions to unfold, short enough for PPO to assign credit. For open-ended co-evolution specifically, longer episodes (2000-5000) may be worth the slower training so emergent dynamics have time to play out.

A good trick is to curriculum the horizon: start short (500-1000 steps) so agents learn basic survival, then gradually increase (+500 every N iterations) to expose them to longer ecological timescales.

**Phase A (bootstrap)**
- `max_steps = 1_000`
- `gamma = 0.995` (effective credit horizon ≈ 1/(1−γ) ≈ 200 steps)
- `lambda_ (GAE) = 0.95–0.97`

**Phase B (mid)**
- `max_steps = 2_000–3_000`
- `gamma = 0.997–0.998` (horizon ≈ 333–500)
- `lambda_ = 0.96–0.97`

**Phase C (long-term dynamics)**
- `max_steps = 4_000–5_000`
- `gamma = 0.998–0.999` (horizon ≈ 500–1,000)
- `lambda_ = 0.97`

Why that mapping: PPO's useful credit horizon is ~1/(1−γ). As `max_steps` increases, raise γ so actions can "see" far enough ahead without variance exploding.

Batch/throughput knobs to adjust as episodes get longer — keep ~4-10 episodes per PPO iteration for decent reset diversity:
- `train_batch_size`: roughly `episodes_per_iter × max_steps`. Example: at `max_steps=1_000`, use `8_000–16_000`; at `max_steps=3_000`, bump toward `24_000–48_000`.
- `rollout_fragment_length`: increase with horizon so GAE has longer contiguous fragments (e.g., 200 → 400 → 800).
- `num_envs_per_env_runner`: raise a bit as episodes lengthen to maintain sampler throughput.
- KL/clip: leave defaults unless instability appears; longer horizons often benefit more from a slightly smaller learning rate than from big clip/KL changes.

When to stop stretching episodes:
- If `timing/iter_minutes` balloons or TensorBoard curves update too slowly, hold the current `max_steps` for a while.
- If extinction happens before the cap, longer episodes won't help — tune ecology (energy gains/losses) instead.

---

## Hunter-gatherer settlement model (rough concept)

A separate, non-PredPreyGrass simulation idea: modeling early human settlement patterns.

- What are good determinants of a "Camp"?
- Hub formation as a bridge between hunter-gatherers and settlers. What determines a "Hub" (more permanent settlement)?
  - Water/river access
  - Protection
  - Proximity to leadership (cf. Marbella: elite tourism first, then mass tourism; Hampton Court)
  - Scalability / self-reinforcing growth
- Decision to fight-or-flight.
- Eating: more varied than settlers — scavenging, nuts, deer, large deer (stronger than humans).
- Sheltering, household formation, movement, band structure (size ~150, social structure, specialization) — all undeveloped.
- Step granularity: one step = one month, to simulate seasons accurately enough.

---

## Conceptual / theoretical notes

- **Nature vs. nurture definitions**: what counts as "nurture" — pure self-nurtured, "man-made" nurtured, or nature-nurtured? If someone is born near the equator in Africa, is that nurture? Is ancestral behavior nurture or nature? Is physical inheritance nurture or nature? Related thought: humans seem to have evolved capacities for learning reciprocity, but the actual reciprocal rules are built through development, attachment, repeated interaction, and culture — a newborn doesn't "reciprocate" in the game-theory sense, but babies already show social responsiveness (attention to faces/voices, turn-taking rhythms, sensitivity to contingent response) as an evolved foundation for that later learning. (The Nowak-mechanism nature/nurture table and the evolution/culture/institutions table already live on the site at [Nowak Mechanisms](/evolved-cooperation/nowak-mechanisms#nowaks-mechanisms-on-the-nature-nurture-spectrum) — edit them there, not here.)
- **Mental accounting**: implement a range of "in-debtedness" to model informal friend/business trust — e.g., defected x-times in a row, or whether accumulated investment is "fair."
- **ESS**: "With only thieves in the world there is nothing to steal." If defectors are punished with a certain probability, how does that reduce crime? (Rachel: "committing crime is inversely related to chance of being caught/punished.") Visualize by manually inserting a strange strategy into a basin/grid to (dis)prove ESS.
- **Similarities between "nature" and "nurture"**: maybe not so different — natural selection of lifetime learning, diminishing returns on rewarding behaviors (learning is open-ended like evolution), the reward system is adaptive like evolution.
- **Differences**: "nature" is very binary (survival/reproduction); "nurture" is more continuous and less fatal.
- **Having options makes people happy**: does changing seasons make people happier than a fixed climate? Implies a relationship between distance from the equator and happiness — unverified.
- **Integrate Dynamic Field Theory** as a wrapper around brain/behavior modeling. Visualize first before building anything.
- Loose brainstorm fragments: use Leary's Rose in Learned Cooperation? "The Inevitability of Selfishness" — cooperation is not trivial, competition is intuitively more sensible due to the inevitability of selfishness. "Layered cooperation" in a social-behavior sense — MARL Book example (undeveloped).

### Notes from Pranjal (2025-12-02)
- Communication: leave an ant trace (ant colony / Lenia-style), also keep previous state in observation?
- www.talkrl.com
- Reshape field of vision for predators — only in the direction of movement? Would let prey hide more easily.
- Is the existence of a prolonged episode between predators and prey not itself an emergence of cooperation?

---

## Reference / reading list

### Research shortlist: evolution + birth/death + MARL
- Malthusian Reinforcement Learning (Leibo et al., 2018/2019): population pressure and ecology-linked MARL adaptation. https://arxiv.org/abs/1812.07019 · https://www.ifaamas.org/Proceedings/aamas2019/pdfs/p1099.pdf
- Neural MMO (Suarez et al., 2019; Neural MMO 2.0, 2021): persistent many-agent worlds with spawn/death and resource pressure. https://arxiv.org/abs/1903.00784 · https://arxiv.org/abs/2110.07594
- Evolutionary Population Curriculum (2020): evolutionary selection over policy populations in large-scale MARL. https://arxiv.org/abs/2003.10423
- Evolutionary MARL in Group Social Dilemmas (Chaos, 2025): evolutionary pressure on RL traits in social dilemmas. https://pubmed.ncbi.nlm.nih.gov/39937196/
- Iterated + Evolutionary Games with MARL (Nature Communications, 2025): MARL-discovered strategies tested in evolving populations. https://www.nature.com/articles/s41467-025-67178-6
- Neural Population Learning beyond Symmetric Zero-Sum Games (AAMAS 2024): population-level selection/equilibrium in general-sum MARL. https://deepmind.google/research/publications/24820/

### Examples to try out
- Meta-learning example, RLlib ("learning-to-learn"): https://github.com/ray-project/ray/blob/master/rllib/examples/algorithms/maml_lr_supervised_learning.py
- Curriculum: https://github.com/ray-project/ray/blob/master/rllib/examples/curriculum/curriculum_learning.py
- Curiosity: https://github.com/ray-project/ray/tree/master/rllib/examples/curiosity
- Explore JaxMARL examples: https://github.com/flairox/jaxmarl?tab=readme-ov-file
  - https://raw.githubusercontent.com/FLAIROx/JaxMARL/refs/heads/main/docs/imgs/smax.gif
  - SMAX: https://github.com/FLAIROx/JaxMARL/tree/main/jaxmarl/environments/smax

### Comenius and curriculum learning
Comenius argued that teaching should proceed from the easy to the difficult, so that new knowledge builds on what has already been learned. This principle closely resembles curriculum learning in reinforcement learning, where an agent first trains on simpler tasks before progressing to more complex ones.

For PredPreyGrass, this could mean starting with easy survival conditions and gradually introducing scarcity, predators, competition, cooperation, and co-evolution. An adaptive curriculum may be especially useful, because difficulty could change according to the agents' current performance rather than following a fixed sequence — connecting Comenius' educational principle with modern automatic curriculum learning and open-ended learning.

---

## Site / meta

- Make available the full pre-cleanup archive content in a repository if ever needed — note: it's already fully recoverable from git history even though the pages were deleted from `docs/archive/` (2026-08-21 cleanup).
- Consider posting about the project on LinkedIn.
- Maybe make a to-do mindmap out of this file at some point.
