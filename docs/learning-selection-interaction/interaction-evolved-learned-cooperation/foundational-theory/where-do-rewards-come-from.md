---
id: where-do-rewards-come-from
title: Where Do Rewards Come From?
sidebar_position: 12
slug: /learning-selection-interaction/where-do-rewards-come-from
---

# Where Do Rewards Come From?

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>Standard reinforcement learning takes the reward function as given — an agent maximizes whatever scalar signal it's handed, and RL theory has nothing to say about where that signal comes from. Singh, Lewis &amp; Barto's *"Where Do Rewards Come From?"* (2009/2010) answers that question by placing reward itself inside an evolutionary loop: evolution searches for the internal reward function that best serves reproductive fitness, and the resulting reward — an agent's proximate, moment-to-moment motivation — need not resemble the ultimate fitness criterion it was selected for at all.</div>

This is the direct theoretical foundation for a question this site returns to repeatedly: [evolution shapes *what* an agent wants; within-lifetime learning shapes *how it gets it*](/learning-selection-interaction/theory). This paper is where that distinction is made computationally precise for the first time.

## 1. The question the paper asks

In computational RL, reward functions determine the problem an agent is trying to solve — but RL theory is "completely insensitive to the source of rewards." The paper argues this is misleading if you want to relate RL to real animal reward systems, for a specific reason: primary rewards in animals are hard-wired by evolution because of their relevance to reproductive success, but the precise *form* that hard-wiring takes is an open evolutionary design question, not something RL theory addresses.

The paper's proposal: treat reward-function design itself as something evolution optimizes, and formalize what an *optimal* reward function means once fitness — not reward — is evolution's actual currency.

## 2. All reward is internal

Before formalizing anything, the paper makes an argument about *where* reward signals live at all. The usual RL picture shows an agent receiving reward from its environment. But for an animal, "environment" is misleading shorthand — reward signals (a dopamine response, a hunger signal) are always generated *inside* the organism, by systems that are themselves part of what the organism must adapt to. Once you accept that, the internal/external distinction that usually organizes discussions of "intrinsic vs. extrinsic" reward stops being about where the signal is generated (always internal) and becomes a question about *what part of the internal architecture generated it, and for what*.

<figure style={{ margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', overflow: 'hidden' }}>
    <div className="blue-banner">
      <div className="blue-banner-title">All Reward Is Internal</div>
      <div className="blue-banner-subtitle">Recreated from Figure 1. Left: the usual textbook view, where primary reward comes from a critic in "the environment." Right: the paper's actual view — the environment is factored into an internal and external part, both inside the boundary of the organism itself for the internal part; every reward signal comes from the internal environment's critic, never directly from the external world.</div>
    </div>
    <img
      src="/img/learning-selection-interaction/interaction-evolved-learned-cooperation/where-do-rewards-come-from/figure-1-agent-environment.svg"
      alt="Display 1: Two-panel diagram. Left panel, 'Standard View': an Agent box and an Environment box exchange Actions and States; a Critic nested inside the Environment box sends Rewards to the Agent. Right panel, 'Organism View': a dashed boundary labeled Organism encloses an Agent box and an Internal Environment box (itself containing a Critic that sends Rewards to the Agent, and exchanging Decisions/States with the Agent); outside the Organism boundary sits an External Environment box, connected across the boundary by Actions (Agent to External Environment) and Sensations (External Environment to Internal Environment)."
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Recreated from Singh, Lewis &amp; Barto's (2009/2010) Figure 1, redrawn for legibility rather than copied pixel-for-pixel.</figcaption>
</figure>

This reframing also dissolves a definitional headache. Psychologists distinguish *extrinsic* motivation (doing something for a specific rewarding outcome) from *intrinsic* motivation ("doing something because it is inherently interesting"), but the line between them is notoriously hard to draw precisely. The paper's move: both kinds of reward are primary, hard-wired signals — the only real difference is what regularity in the organism's evolutionary history each one tracks. Intrinsically motivated behaviors (exploration, play, manipulation) got wired in because *those behaviors themselves* paid off in fitness across generations, not because they were ever paired with satisfying a biological need in any individual's own lifetime.

## 3. The Optimal Reward framework

The formal definition, stripped to its essentials:

- **A** — an adaptive RL agent, using some reward function $i_A$ drawn from a space $I_A$ of possible internal reward functions to drive its lifetime of learning.
- **$\mathcal{E}$** — a distribution over environments (formally, MDPs) the agent might encounter.
- **G** — a *fitness function*, mapping a whole lifetime history $h$ of agent-environment interaction to a scalar fitness value $G(h)$. G is deliberately unconstrained in form — it need not look anything like a discounted sum of rewards.
- **Optimal reward** $i_A^*$ — the reward function in $I_A$ that maximizes *expected fitness* $G$, averaged over sampled environments from $\mathcal{E}$, when the agent adapts to each one using ordinary RL driven by that reward.

The critical move is keeping **G** (fitness — evolution's actual currency) and **$i_A$** (reward — what the agent's own learning actually optimizes moment to moment) as two separate functions. Evolution's job is to search reward-function space for whatever $i_A^*$ produces the best G in expectation. Nothing requires $i_A^*$ to resemble G directly — and the paper's experiments (below) are built specifically to show that the two routinely diverge.

This yields a specific hypothesis about *what kind of information* ends up in each function: since $i_A^*$ is optimized across a whole *distribution* of environments, it should end up encoding **regularities that hold across environments** (and interactions between the environment distribution and the agent's own fixed structure) — while the **value function an agent learns within a single lifetime** captures regularities specific to *that* environment, which don't generalize and don't need to. That is the same fast-timescale/slow-timescale split this site's [two-timescale framework](/learning-selection-interaction/theory#fast-and-slow-dynamics) runs on throughout — here it's the *reward function itself*, not just the policy, that sits on the slow, evolutionary side.

## 4. Hungry-Thirsty domain: an emergent drive for water

The first experiment: a 6×6 gridworld (four 3×3 rooms connected by gaps in barriers), with one fixed food location and one fixed water location per sampled environment. An `eat` action only works at the food location; a `drink` action only works at the water location. Eating removes hunger for one step; **only not-being-hungry increments fitness** — there is *no* fitness credit anywhere for drinking. But thirst has a structural bite: a thirsty agent's `eat` action simply fails. An agent that ignores water eventually can't eat at all.

The agent learns within its lifetime via ε-greedy Q-learning; the paper searches (largely exhaustively) over a small parametric family of reward functions, run per candidate across many sampled environments and lifetimes, and reports the reward function with the highest resulting mean cumulative fitness.

**The best reward function found:** a small penalty for being hungry-and-thirsty, a smaller penalty for hungry-but-not-thirsty, a small *positive* reward for not-hungry-but-thirsty, and a large reward for not-hungry-and-not-thirsty. In other words: search discovered a reward that tracks thirst explicitly, purely because doing so serves the one thing that *does* count toward fitness (not being hungry) — an emergent drive for water despite water never appearing in the fitness function at all. Learned policies visibly reflect it: agents shuttle back and forth between food and water for their entire lifetime.

Two more findings from this experiment are worth carrying forward:

- Fitness under a given reward function turned out to be **high-variance and multimodal** across otherwise-identical agent lifetimes — for all four reward functions tested, not just the good ones — and fitness-based reward (rewarding only the literal fitness event) did badly more than half the time.
- Fitness as a function of the *size* of the thirst penalty is **sharply peaked**: a zero penalty (ignore thirst entirely) performs far worse, but so does too large a penalty. Only a narrow band of penalty magnitudes actually helps.

## 5. Boxes domain: an emergent drive for exploration and manipulation

The second experiment isolates a different, more clearly *intrinsic*-flavored case. Two boxes sit at fixed locations; an `open` action opens a box, and food can only be eaten from a box that is both open *and* currently stocked. A closed box always has food; an open box only has food for one step right after being opened, then a 0.1 chance per step of swinging shut again. So getting fed requires: find a closed box, open it, eat *immediately*. Only eating increments fitness — opening a box, by itself, earns nothing under the literal fitness function.

The experiment ran two conditions. In **CONSTANT**, food is available in boxes for the agent's whole 10,000-step lifetime. In **STEP** — the more revealing condition — **no box has ever contained food for the first 5,000 steps**, and food only starts appearing after that. STEP simulates, in an extreme deliberately exaggerated form, a developmental period with no fitness-relevant activity available at all.

**The best reward function for STEP** gives a full reward for not being hungry, but also a small positive reward for having *both* boxes open while hungry, zero for one box open, and a small penalty for both closed. That is: the optimal reward explicitly rewards **opening boxes as such**, independent of whether food is currently obtainable. The payoff shows up exactly where you'd predict: agents trained under this reward spend the food-free first half of their lives opening boxes anyway, so that the moment food starts appearing at step 5,000, they are already fluent box-openers and start converting that skill into fitness immediately — a constant fitness-growth slope from that point on. Agents trained under the plain fitness-based reward have no signal to learn anything during the first half, so they only start learning to open boxes *after* food appears — a visibly slower, accelerating fitness curve that never catches up within the run.

This is the paper's clearest illustration of a reward that would ordinarily be called "intrinsically motivated" (curiosity about manipulating objects, entirely decoupled from any currently-available payoff) emerging from nothing but evolutionary optimization for fitness under a *distal*, delayed relationship to that fitness.

## 6. What the two experiments show, together

The paper draws two general conclusions that go beyond either individual experiment:

1. **A single evolved reward function can implicitly combine multiple, differently-related aspects of the domain.** In Hungry-Thirsty, one reward function balances a directly fitness-relevant component (hunger) against an indirectly relevant one (thirst) in a single scalar. In Boxes, it balances hunger against curiosity about box state. The precise shape of the optimal reward is determined by the single global goal of maximizing fitness, but its relationship to that goal can be as indirect as "reward curiosity about the very object that will matter later."
2. **Two genuinely different kinds of adaptation are doing the work, at two different timescales** — exactly the split named in §3 above: the *global*, cross-environment search for the reward function itself (evolution's job), and the *local*, within-lifetime adaptation of a value/policy function to the specifics of one sampled environment (ordinary RL's job). Neither one, alone, is what the paper is arguing for — it's their combination, with the reward function itself sitting on the slow, evolved side of the boundary rather than being handed to the agent from outside.

## 7. Where this sits, and what it connects to on this site

This paper is a close cousin of [Ackley & Littman (1991)](/learning-selection-interaction/ackley-littman-1991) but answers a different question with a different method. Ackley & Littman ask whether combining *an* evolved reward function (their fixed "evaluation network") with lifetime learning beats either mechanism alone, in one ecological architecture — and demonstrate it empirically at scale. Singh, Lewis & Barto instead formalize *why* an evolved reward function should be expected to diverge from the fitness criterion it's selected for, and demonstrate that divergence directly, by exhaustively searching small hand-parameterized reward spaces in two transparent toy domains with ordinary Q-learning as the lifetime learner. Together they make the same underlying claim from two different directions: one architectural and large-scale, one formal and small-scale.

Put more sharply: 1991 is an early **existence proof** that an evolved reward distinct from fitness, paired with lifetime learning, works — Ackley & Littman never frame "what should a reward look like relative to fitness" as a question in its own right, never search reward-function space systematically, and never characterize *when or why* divergence from fitness helps. Their evolved evaluation network almost certainly does diverge from raw fitness in interesting ways — that's implicit in it outperforming the alternatives — but the paper never studies that divergence directly the way Hungry-Thirsty's four-number reward table makes it visible. 2010 is the **theory** that explains why 1991's architecture should be expected to work, made small enough to see the mechanism directly. Tellingly, the two lines of work aren't even connected by their own authors: Singh, Lewis & Barto's reference list doesn't cite Ackley & Littman at all — this is a connection this site's own reading draws, not one the original papers draw themselves.

**What the two papers share:**

- Reward and fitness are kept as two genuinely separate functions — neither paper ever conflates "what the agent optimizes" with "what evolution actually selects for."
- Within-lifetime behavior is driven by ordinary RL, using that individual's own fixed, evolved reward as its signal.
- Evolution acts on the *reward function itself*, not directly on behavior — the behavior is left for lifetime learning to work out.

**Where they differ:**

| | Ackley & Littman (1991) | Singh, Lewis & Barto (2010) |
|---|---|---|
| Headline claim | Combined evolution + learning beats either alone — a *performance* result | The evolved reward diverges from fitness in an interpretable way — a *content* result |
| Domain | Full spatial ecology (100×100 grid, predators, plants, shelter) | Small abstract gridworld (6×6, two toy tasks) |
| How the reward is found | Implicit — an ordinary population-based genetic algorithm (mutation, crossover, selection), never itself framed as "searching reward-function space" | Explicit — a small, hand-parameterized reward-function family, searched (mostly) exhaustively over named candidates |
| Lifetime learning rule | CRBP (Complementary Reinforcement Back-Propagation) | ε-greedy Q-learning |
| Formal framework | None — no defined space of reward functions, no stated optimality criterion | The Optimal Reward Problem, formally defined ($A$, $I_A$, $\mathcal{E}$, $G$, $i_A^*$ — see §3) |
| Scale | This site's own replication: 500 runs, full statistical comparative study | Original paper: ~320-agent batches per candidate reward, no formal cross-seed significance testing |

The paper itself identifies its closest prior relative as Uchibe & Doya (2008), which proposes *embodied evolution* as a concrete mechanism for evolving reward — but stays tied to combining internal reward with an externally-supplied one. This paper's framework dispenses with external reward entirely and aims for maximum generality instead. A companion, fuller treatment of the same framework — with a gradient-based (rather than exhaustive-search) method for finding good reward functions — appeared the following year as Singh, Lewis, Barto & Sorg (2010), *"Intrinsically Motivated Reinforcement Learning: An Evolutionary Perspective"* (IEEE TAMD).

This project's own [PredPreyGrass](/learning-selection-interaction/predpreygrass) work connects to this paper directly, not just by analogy: [Trial 12 of the Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log) (the `eco_evolutionary_erl_baldwin` module) already gives each agent an evolved, lifetime-fixed "evaluation network" — a reward function under genetic control, exactly as this paper formalizes — separate from a live action network adjusted by within-lifetime RL. Per-agent lineage logging now exists there specifically to ask this paper's question of that architecture directly: does the evolved reward converge on a dense, always-available proximate substitute (e.g. weighting immediate energy/health state heavily) rather than one that tracks reproduction events themselves — the same "food reward instead of maximize descendants" divergence this paper demonstrates in miniature. See the trial log's "What's next" section for status; no real-scale result yet.

## 8. A worked example: is a sparse "reproduction only" reward a fitness function in disguise?

This project's shared-policy PredPreyGrass modules mostly train on a deliberately sparse reward: a fixed bonus paid only at a reproduction event, nothing paid for anything else (see [PredPreyGrass](/learning-selection-interaction/predpreygrass): "agents are rewarded only for reproducing — a deliberately sparse signal"). That reward is worth examining through this paper's lens, because it's a real example of the $i_A$ / $G$ distinction from §3 collapsing rather than holding.

A "reward only at reproduction, zero otherwise" signal is structurally almost identical in shape to a fitness function: both are defined by counting a single terminal, literally-fitness-relevant event, and neither differentiates any intermediate state — no partial credit for finding food, staying healthy, avoiding a predator, or approaching a mate. In this paper's terms, that reward is close to $i_A = G$ (reward mirroring fitness directly) rather than an $i_A^*$ genuinely free to diverge from it, the way the Hungry-Thirsty reward diverges from its own fitness function by tracking thirst even though thirst earns zero fitness.

That's not a design mistake — $i_A = G$ is a legitimate point in the space, and it's exactly what "test whether the ecosystem can sustain itself on survival and reproduction alone" (the module's own stated goal) calls for. But it does mean sparse-reward PredPreyGrass trials aren't actually testing this paper's claim. That claim is specifically about a reward *found by search or evolution optimizing for real fitness outcomes* — not "any denser reward beats sparse." This project's own reward-density initiative (see the [Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log)'s reward-density row) tested several *hand-shaped* denser reward variants — human-guessed bonus terms for things like proximity to food — against the sparse baseline, and sparse won every comparison. That result and this paper aren't in tension: hand-designed shaping is a different generative process from the one this paper is about, and hand-shaping is notorious for producing exploitable reward hacking rather than better fitness. The reward-density result is evidence that naive, human-guessed shaping hurts here — not evidence against reward functions actually *found by* search or evolution.

The module that does test this paper's real mechanism is `eco_evolutionary_erl_baldwin` — [Trial 12 of the Darwin/Baldwin Trial Log](/learning-selection-interaction/darwin-baldwin-trial-log). Its `offspring_count` plays exactly the role of $G$ — same event-counting shape as the sparse PredPreyGrass reward above — while `genome.eval_weights` is a genuinely *evolved* reward, free to weight whatever selection finds useful, even though none of it appears in the fitness criterion itself. Concretely, `eval_weights` is a 7-number linear weighting over exactly the same channels the agent's own behavior network sees — four directional "something is there" signals (`visual_N`/`S`/`E`/`W`, decaying with distance, not distinguishing *what* was spotted), `in_tree` (sheltered or not), `health_norm`, and `energy_norm` — plus an 8th, `alarm_signal`, under the optional communication strategy. This exact channel set isn't a PredPreyGrass invention; it's carried over directly from [Ackley & Littman's (1991) own Figure 4](/learning-selection-interaction/ackley-littman-1991#2-world-al-the-environment), to keep the replication faithful to the source paper. Whatever "drive" evolution ends up encoding has to be expressible as a weighted sum of just these channels.

**The search mechanism itself is not hypothetical — it's already running, and it already produced this project's strongest result.** Selection on `eval_weights` (survive, reproduce, pass the genome on) is exactly what drove Trial 12's headline finding: combined evolution+learning significantly beats evolution-alone, learning-alone, and no-adaptation, at real statistical power (500 runs, 1,000,000-step ceiling). Trial 12's 500 runs themselves all predate the per-agent lineage logging this analysis needed, so none of them could be reused directly — but a fresh seed, run with logging enabled, now has.

**Confirmed result (2026-09-12/13), n=30:** one seed alone was a dramatic but equivocal signal — a second seed's replication attempt showed the same direction (`health_norm` still largest) but a much weaker magnitude, so 27 more seeds were run in parallel and all 30 completed the full 1,000,000-step budget. Pooled across all 30 (161.1 million logged agent lifetimes plus 13,408 right-censored survivors), the pattern holds: evolution consistently weights `health_norm` and `energy_norm` roughly 2.5–3× more heavily than any of the five other observation channels, while every channel's raw correlation with realized `offspring_count` stays under 0.007. That's the same qualitative pattern as the paper's own Hungry-Thirsty result, now confirmed across independent random seeds rather than resting on one run: the evolved reward concentrates on dense, always-available internal state — health and energy, this world's closest analogue to "food reward" — rather than on whatever single channel happens to best predict the fitness event directly.

One caveat survives replication unchanged: single-channel correlation isn't the same as causal irrelevance — fitness depends on the whole policy learned against all channels jointly, not any one channel in isolation. The mismatch between evolved weight and marginal correlation is now strong, replicated evidence of divergence; it's not a causal decomposition of the policy. (The 30-seed combined analysis also surfaced a real memory bug — an early version loaded all 161M rows as Python objects and got OOM-killed at 89GB RAM — fixed by parsing straight into numpy arrays instead.) Full numbers live in the module's [`RESULTS.md` §17](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/evolutionary/eco_evolutionary_erl_baldwin/RESULTS.md).

## References

- Singh, S., Lewis, R. L., & Barto, A. G. (2009/2010). "Where Do Rewards Come From?" Originally *Proceedings of the 31st Annual Conference of the Cognitive Science Society*, 2601–2606 (2009); reprinted in *Proceedings of the International Symposium on AI-Inspired Biology* (AISB 2010 convention), 111–116.
- Singh, S., Lewis, R. L., Barto, A. G., & Sorg, J. (2010). "Intrinsically Motivated Reinforcement Learning: An Evolutionary Perspective." *IEEE Transactions on Autonomous Mental Development*, 2(2), 70–82.
- Uchibe, E., & Doya, K. (2008). "Finding Intrinsic Rewards by Embodied Evolution and Constrained Reinforcement Learning." *Neural Networks*, 21(10), 1447–1455.
- Ackley, D. H., & Littman, M. L. (1991). "Interactions Between Learning and Evolution." In *Artificial Life II*, 487–509. Addison-Wesley.
