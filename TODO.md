# To Do

Working notes and research ideas for the human-cooperation-site project. Not published to the website — this is a private, git-tracked scratchpad, directly editable by both Peter and Claude.

---

## Quick / misc

- Apply "system dynamics" to micro data, and use graphics from AnyLogic to explain the second law of thermodynamics.
- Self organisation v regulation (road to serfdom)
- More political issues=> migration, cultural assimilation
- ABM seggration - https://en.wikipedia.org/wiki/Schelling%27s_model_of_segregation

---

## Leibo2017 experiments (specified, succesfull run)

[Leibo2017](https://github.com/doesburg11/Leibo2017) — 
- maybe experiment with more realistic stag hunt like rewards
---

## SequentialSocialDilemmas experiments (specified, not yet run)

[SequentialSocialDilemmas](https://github.com/doesburg11/SequentialSocialDilemmas) — `cleanup_reputation` (McKee et al. 2023 reputation-intrinsic-reward layered on Cleanup; identifiable vs. anonymous conditions, territoriality/turn-taking metrics — see the repo README's "The reputation experiment: cleanup_reputation" section for the full mechanism)
- Run the identifiable vs. anonymous pilot (`run_scripts/run_reputation_cleanup_identifiable.sh` / `_anonymous.sh`, 10M-step scale, one at a time — single GPU) and compare collective return, territoriality, and turn-taking between the two conditions.
- If the qualitative pattern replicates (identifiable → higher return, lower territoriality, higher turn-taking), implement results on website.
---

## Hughes2018 experiments (run; Cleanup non-replication, Harvest inconclusive)

[Hughes2018](https://github.com/doesburg11/Hughes2018) — from-scratch reproduction of inequity aversion in Cleanup/Harvest (Hughes et al. 2018).
- Cleanup: `advantageous_only` (guilt) loses to `baseline` in 6/6 seed comparisons, at and beyond the paper's own training scale — the opposite of the paper's Fig. 3A headline claim. Real engineering confounds (a trace-observability bug, then beam-cooldown/waste-grace-period mechanics) were found and ruled out along the way; the non-replication persisted after both fixes. Investigation stopped 2026-09-09 — documented in the repo README as the current honest state, not pursued further for now.
- Harvest: first real training (3 seeds × baseline/advantageous_only/disadvantageous_only) run 2026-09-09, reaching only ~3.6-3.8M agent-steps — 20-30x short of the paper's own Harvest scale (Fig. 4: ~70-100M agent-steps). Near-tie means across conditions, but `disadvantageous_only` had both the highest mean and a much tighter seed-to-seed spread than the other two — loosely consistent with Fig. 4's claim, but not statistically separable at 3 seeds. **A full-scale Harvest run (paper's own agent-step budget, more seeds) is still needed before this can be called conclusive either way.**
---

## Wang2019 experiments (rebuilt correctly, toy-scale run only)

[Wang2019](https://github.com/doesburg11/Wang2019) — from-scratch replication of Wang et al. 2019 (Evolving Intrinsic Motivations for Altruistic Behavior, AAMAS 2019). Population-Based Training over none/individual/shared reward-network conditions on Cleanup; toy-scale run (single seed, 150 rounds, population 8) matches the paper's own Fig. 4 ranking direction (`shared > none > individual`) after two real bugs (stale Adam optimizer state surviving policy exploit; throwaway network construction perturbing PyTorch's global RNG) were caught in Codex review and fixed — see the repo's RESULTS.md for the before/after.

- **Placement decided, after actually reading the primary source PDF (not just the repo's own summary):** file under **Learning × Selection Interaction Models → Foundational Replications**, directly alongside Hinton & Nowlan (1987) and Ackley & Littman (1991), not under Evolved Cooperation. Reasoning: this is the cleanest example anywhere in this project family of a genuine fast-timescale-learning / slow-timescale-evolution interaction — the policy network is RL-trained *and* its learned weights are inherited "in a Lamarckian fashion" (the paper's own words, Sec. 2.3, citing Jaderberg et al. 2017's PBT), while the reward network is never learned within a lifetime at all, only evolved (PBT exploit-and-perturb) — a Baldwinian-shaped predisposition that shapes what the policy learns. The paper itself claims that lineage twice: it cites Hinton & Nowlan directly for the two-timescale architecture (Sec. 1: "similar to [26]"), and in the Discussion justifies why evolving the reward network works by citing co-author Fernando's own "Meta Learning by the Baldwin Effect" (ref [13]). Contrast with McKee2023 (pure RL, no evolutionary component, correctly filed under Learned Cooperation) and the classical Nowak-mechanism repos (pure evolutionary/replicator dynamics, no individual RL learning) — Wang2019 is the one repo with both processes genuinely present at once.
  - Still cross-link from the Evolved Cooperation side once the page exists: the shared-reward-network mechanism is explicitly "inspired by multi-level (group) selection" (paper cites Wilson 1975 directly), and the assortative-matchmaking condition is explicitly a named "Greenbeard" strategy (paper cites Dawkins 1976), not kin selection proper — link from Group Selection (and possibly a Greenbeard mention near Kin Selection), the same cross-linking pattern McKee2023's page already uses toward Indirect Reciprocity.
- **Scale-up recommendation, revised**: don't chase the paper's own scale (N=50 agents, 500 parallel arenas, up to 2×10⁸ steps per condition) — that's a distributed-cluster budget, the same wall Hughes2018's Harvest experiment already hit (needed ~70-100M steps, initial attempts reached only ~3.6-3.8M). Better next step: keep the current toy scale (150 rounds, population 8) but run **5-8 seeds** instead of 1, matching this project family's usual "many seeds at small scale" pattern (e.g. Foerster2018's 50-seed IPD/IMP runs). That's cheap and turns "one run matched the paper's ranking direction" into "the ranking holds up across seeds" — a meaningfully stronger claim for a fraction of the cost of actually scaling population/rounds up.
---

## PredPreyGrass experiments (specified, not yet run)

### Observation-space improvements
The RL-side half of this idea (drive-conditioned observations: `hunger_pressure`, `reproductive_readiness`, `prey_opportunity`, `predator_danger_pressure`, `grass_opportunity` as extra observation channels, reward untouched) is implemented and numerically verified as `predpreygrass/non_evolutionary/drive_conditioned_environment/` — a single-seed baseline-vs-drive-conditioned comparison ran 2026-09-06 (+6.0% gap, predator-driven); additional seeds and the energy-only arm are still open, tracked in that module's own README rather than here.

The evolutionary half (evolving which drive channels are enabled, or how strongly each is scaled, as a heritable trait feeding the shared policy) has not been started. It's recorded as a candidate next experiment — targeting the shared-policy-can't-see-its-own-genome gap directly — in the [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log)'s "What's next" section on the website. Update that section (and its source, `predpreygrass/evolutionary/RESULTS.md`) rather than re-deriving this design from scratch here.

Design constraints to preserve:
- Keep the action space movement-only. Make behavior richer by improving what the agent observes, not by adding explicit actions like `eat`, `attack`, or `reproduce`.
- Use derived internal drives as a biologically plausible interpretation layer, not tactical shortcuts.
- Avoid over-engineered affordances such as `can_kill_this_prey`, `best_escape_direction`, or `best_grass_direction`; those encode too much designer knowledge.

Useful evolutionary framing:
- Treat the evolved object as a motivational/perceptual scaffold, not a directly inherited behavior policy.
- Candidate heritable knobs: `hunger_threshold`, `danger_radius`, `social_radius`, `grass_density_radius`, `reproduction_pressure_scaling`, `enemy_pressure_scaling`, `ally_pressure_scaling`, enabled/disabled drive channels, observation range, movement speed, energy cost, and possibly initial policy bias/architecture.
- Clean comparison ladder: raw-observation baseline → drive-conditioned RL → evolved-drive Baldwinian version → optional Lamarckian benchmark where learned weights are inherited directly.

Key experimental question:
- Raw observation asks whether learning can discover useful behavior from scratch.
- Derived drives ask whether evolution can produce perceptual/motivational systems that make useful lifetime learning easier.

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

### Train pack_hunt_opponent_shaping

[PredPreyGrass](https://github.com/doesburg11/PredPreyGrass) — `predpreygrass/non_evolutionary/project_cooperation/pack_hunt_opponent_shaping/` (fixed-population, scripted-prey environment testing whether an N-player pairwise generalization of Foerster et al. (2018)'s LOLA opponent-shaping changes the intra-predator join-the-hunt/free-ride equilibrium, versus a naive-PPO baseline. Env, viewer, both training loops, and the opponent-shaping math are implemented and verified correct — including reducing exactly to Foerster2018's own `lola_pg_update` at N=2 — but nothing has been trained to convergence yet. See the module's own README for the full design rationale, rejected alternatives, and the Codex review of the opponent-shaping implementation.)

- Run `tune_ppo.py` (naive baseline, condition 1) to completion; record steady-state engagement rate, catch rate, and per-agent reward variance.
- Run `tune_opponent_shaping.py` (pairwise N-player opponent shaping, condition 2) to completion under the same env config; compare against the naive baseline on the same metrics.
- Tune `delta`/`eta`/`horizon`/`batch_size` — the current defaults (`delta=0.01`) are an untuned starting guess per the module README's own config comments, not a validated value; watch for exploding or oscillating rewards.
- If opponent shaping measurably raises engagement/catch rate over naive PPO, look for the TFT-like punishment signature: a predator that scrounged last round getting spatially excluded from the pack next round (nothing in the reward function hand-codes this — it would have to be learned).
- If pairwise shaping proves unstable at `N=3`, the documented fallback is condition 3 (an M-FOS-style model-free meta-policy) — not built yet.
- If a real, reproducible effect is found, write it up as a page under this site's Learned Cooperation section, alongside the Foerster2018 replication page it extends.

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

### Behavior-aware curriculum learning (VIP)

Open-ended Multi-agent Autocurricula via Visual Inspection of Policies with Multi-modal LLMs — Pantè, Fanti & Capobianco, 9 July 2026 (arXiv).

The paper introduces VIP (Visual Inspection of Policies): instead of deciding curriculum difficulty from scalar rewards or textual summaries, a video-language model watches actual MARL episodes and recommends what agents should train on next. On SMAC, this produced better curricula than learning-signal-based alternatives. A striking example is a policy with a 0% win rate that was nevertheless visibly close to a successful strategy; VIP recognized this and kept training the task, after which performance rose to roughly 80%.

For PredPreyGrass, this is unusually relevant. Sparse reproduction rewards can make numerical learning-progress measures misleading: a population may be developing clustering, coordinated pursuit, avoidance, or proto-pack-hunting before those behaviours translate into reproduction. VIP suggests a new form of behavior-aware curriculum learning: periodically render evaluation episodes and use behavioral observations — not just reward — to decide whether to increase prey energy, alter population ratios, introduce faster prey, change resource scarcity, etc. Treat this as a promising experimental extension, not something to put in the core PPG loop yet.

### Continual-adaptation evaluation (MEAL)

MEAL: A Benchmark for Continual Multi-Agent Reinforcement Learning — Tomilin et al., ICML 2026, published 30 April and revised 24 June 2026 (OpenReview).

MEAL positions continual MARL as a distinct evaluation problem: agents should not merely solve one stationary multi-agent environment, but maintain and acquire capabilities over extended sequences of changing tasks. The authors emphasize that existing continual-RL studies often use only a handful of tasks, whereas long-term multi-agent adaptation needs substantially longer and computationally practical sequences.

This is highly relevant to the Red Queen evaluation problem. PPG should probably not be evaluated solely by final return or even all-species-survive-to-horizon. A stronger evaluation would explicitly measure adaptation over ecological regime changes. For example: train predator/prey populations → change prey speed → measure adaptation → change grass density → measure adaptation → restore an earlier environment → test whether previous competence survived. That gives three useful dimensions: adaptation speed, retention/forgetting, and robustness across ecological regimes. MEAL reinforces the idea that ongoing adaptability itself should be an evaluation target.

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
- **Agency** = "Zeggenschap" in Dutch.
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
- Inequity Aversion Improves Cooperation in Intertemporal Social Dilemmas (Hughes, Leibo, Phillips, Tuyls, Dueñez-Guzman, Castañeda, Dunning, Zhu, McKee, Koster, Zhu, Roff & Graepel, NeurIPS 2018): agents with an inequity-aversion reward term (disutility from both advantageous and disadvantageous inequity) sustain cooperation in sequential social dilemmas better than purely selfish agents.

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

- Make a template for presenting replicated research on the website (e.g. cultural-plasticity, metabolic-rate positive control, ERL Baldwin — multiple seeds/trials of the same experiment) so results are shown in a consistent format instead of ad hoc per-page write-ups.
- Make available the full pre-cleanup archive content in a repository if ever needed — note: it's already fully recoverable from git history even though the pages were deleted from `docs/archive/` (2026-08-21 cleanup).
- Consider posting about the project on LinkedIn.
- Maybe make a to-do mindmap out of this file at some point.
