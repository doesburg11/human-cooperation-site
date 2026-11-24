---
title: The Moran Process
sidebar_position: 0
slug: /evolved-cooperation/moran-process
---

The Moran process explains how inherited variants spread or disappear in a finite population. It isolates the interaction between natural selection and genetic drift: even a variant with a reproductive advantage can disappear by chance.

## Birth and Death

Consider a well-mixed population of $N$ individuals, each of type A or B. At each step, one individual is selected to reproduce with probability proportional to its fitness. Its offspring replaces an individual chosen uniformly from the original population, including the parent. Thus the population size remains fixed.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <svg viewBox="0 0 720 228" role="img" aria-label="A population of six changes from two A and four B to three A and three B when A reproduces and replaces B." style={{ width: '100%', maxWidth: '720px', background: '#EAF2FB' }}>
    <rect width="720" height="48" fill="#0F3368" />
    <text x="22" y="30" fill="white" fontSize="18" fontWeight="bold">One birth–death event</text>
    {['Initial population', 'Choose parent and target', 'After replacement'].map((label, j) => <g key={label}>
      <text x={126 + j * 234} y="80" fontSize="13" textAnchor="middle" fill="#0F3368" fontWeight="bold">{label}</text>
      {[0,1,2,3,4,5].map((i) => <circle key={i} cx={82 + j * 234 + (i % 3) * 44} cy={115 + Math.floor(i / 3) * 42} r="15" fill={i < (j === 2 ? 3 : 2) ? '#1C4B8F' : '#A8B8C9'} stroke={j === 1 && (i === 0 || i === 2) ? '#0F3368' : 'none'} strokeWidth="3" />)}
    </g>)}
    <path d="M207 135 H251 M441 135 H485" stroke="#0F3368" strokeWidth="2.5" />
    <path d="M251 135 l-10 -6 v12 Z M485 135 l-10 -6 v12 Z" fill="#0F3368" />
    <text x="360" y="188" fontSize="13" textAnchor="middle" fill="#1F2D3D">A reproduces; B is replaced</text>
    <circle cx="264" cy="210" r="7" fill="#1C4B8F" /><text x="276" y="214" fontSize="12" fill="#1F2D3D">Type A</text>
    <circle cx="377" cy="210" r="7" fill="#A8B8C9" /><text x="389" y="214" fontSize="12" fill="#1F2D3D">Type B</text>
  </svg>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> One reproduction and replacement event changes the composition while preserving population size.</figcaption>
</figure>

When the offspring replaces an individual of the same type, composition remains unchanged. Without mutation, the process continues until one type occupies the whole population.

## Selection and Drift

Let $i$ be the number of A individuals and $r>0$ the constant reproductive fitness of A relative to B (fitness 1). The probability that A gains one individual is the probability of selecting an A parent multiplied by the probability of replacing a B individual:

$$
P(i\to i+1)=\frac{ri}{ri+N-i}\frac{N-i}{N}.
$$

Likewise, the probability of losing one A individual is

$$
P(i\to i-1)=\frac{N-i}{ri+N-i}\frac{i}{N}.
$$

The probability of no change is one minus these two probabilities. When $r=1$, changes in either direction are equally probable. When $r>1$, increases are more probable than decreases. Nevertheless, both directions remain possible in any mixed population.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <svg viewBox="0 0 720 148" role="img" aria-label="A random walk of counts from zero through one, two, three, four, five, and six, with absorbing endpoints zero and six." style={{ width: '100%', maxWidth: '720px', background: '#EAF2FB' }}>
    <rect width="720" height="42" fill="#0F3368" />
    <text x="22" y="27" fill="white" fontSize="17" fontWeight="bold">Population states: number of A individuals</text>
    {[0,1,2,3,4,5,6].map(i => <g key={i}>
      <circle cx={60+i*100} cy="86" r="22" fill={i===0 ? '#A8B8C9' : i===6 ? '#1C4B8F' : '#FFFFFF'} stroke="#0F3368" strokeWidth="1.5" />
      <text x={60+i*100} y="91" textAnchor="middle" fontSize="16" fill={i===6 ? '#ffffff' : '#0F3368'} fontWeight="bold">{i}</text>
      {i<6 && <text x={110+i*100} y="91" fontSize="23" textAnchor="middle" fill="#0F3368">{i===0 ? '←' : i===5 ? '→' : '↔'}</text>}
    </g>)}
    <text x="60" y="129" fontSize="13" textAnchor="middle" fill="#1F2D3D">A lost</text>
    <text x="360" y="129" fontSize="13" textAnchor="middle" fill="#1F2D3D">Mixed states</text>
    <text x="660" y="129" fontSize="13" textAnchor="middle" fill="#1F2D3D">A fixed</text>
  </svg>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 2:</strong> A stochastic walk between two absorbing states; each mixed state also permits no change.</figcaption>
</figure>

At equal fitness, the expected proportion of A is constant, yet individual populations eventually become homogeneous. This is genetic drift: random changes in inherited type frequencies. A change in frequency does not, by itself, demonstrate selection.

## Fixation Probability

Fixation is the eventual occupation of the entire population by a single type. For the constant-fitness Moran process, the probability that A fixes starting from $i$ copies is

$$
\rho_i=\begin{cases}
\dfrac{1-r^{-i}}{1-r^{-N}}, & r\ne 1,\\[6pt]
i/N, & r=1.
\end{cases}
$$

For one new A individual in a population of ten, the neutral fixation probability is therefore 10%. A reproductive advantage raises this probability, but does not eliminate the risk of loss.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <svg viewBox="0 0 720 290" role="img" aria-label="Bar chart of fixation probability for relative fitness values 0.8, 1, 1.2, and 1.5: respectively 3.0, 10.0, 19.9, and 33.9 percent." style={{ width: '100%', maxWidth: '720px', background: '#EAF2FB' }}>
    <rect width="720" height="48" fill="#0F3368" />
    <text x="22" y="30" fill="white" fontSize="18" fontWeight="bold">Fixation probability: one initial A in N = 10</text>
    {[0,10,20,30,40].map(v => <g key={v}>
      <line x1={135+v*13} x2={135+v*13} y1="75" y2="246" stroke="#D6E4F5" />
      <text x={135+v*13} y="263" textAnchor="middle" fontSize="12" fill="#1F2D3D">{v}%</text>
    </g>)}
    {[['0.8',3.0],['1.0',10.0],['1.2',19.9],['1.5',33.9]].map(([r,p], j) => <g key={r}>
      <text x="119" y={98+j*43} fontSize="14" fill="#1F2D3D" textAnchor="end">r = {r}</text>
      <rect x="135" y={79+j*43} width={p*13} height="27" fill={r==='1.0' ? '#78AAE6' : '#1C4B8F'} />
      <text x={143+p*13} y={98+j*43} fontSize="13" fill="#0F3368" fontWeight="bold">{p.toFixed(1)}%</text>
    </g>)}
    <text x="395" y="283" fontSize="13" fill="#1F2D3D" textAnchor="middle">Probability of fixation (%)</text>
  </svg>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Exact analytical fixation probabilities for four relative fitness values (rounded to one decimal place).</figcaption>
</figure>

Even with a 50% fitness advantage, the new type is lost in approximately two thirds of realizations. This is why experiments with a rare invading strategy require independent replicates rather than conclusions based on a single population trajectory.

## From the Classical Process to Cooperation Models

The classical model assigns constant fitness to each type. In cooperation models, fitness can instead depend on who interacts with whom, which benefits are received, and which costs are paid. A cooperative strategy may consequently have different reproductive prospects at different population frequencies.

The [Interaction Kernel](/evolved-cooperation/interaction-kernel) in this model library extends the Moran-style approach by computing fitness from routed benefits, harms and costs. Its implementation samples local parents using fitness-dependent softmax probabilities and supports trait mutation; it is not the single-event, well-mixed classical process derived above. The analytical fixation formula therefore serves as a reference, not an exact prediction for that implementation.

## What the Replacement Rule Did in These Models

Many of the site's [kin-selection](/evolved-cooperation/kin-selection) tests use a Moran-style update: each vacancy on a full grid is refilled by the offspring of a parent drawn by fitness from nearby candidates. A stepwise series of tests on that model ([From the Moran model to an ecological model](/evolved-cooperation/kin-selection#from-the-moran-model-to-an-ecological-model); the registered comparisons used 20 runs per arm, and some follow-ups and diagnostics were exploratory) showed how much of the outcome depends on the replacement rule itself. All of the following hold only at the settings tested:

- **Who may replace whom.** When the parent for a vacancy was drawn from the vacancy's neighbours, helping spread in 20/20 runs; when it was drawn from five random sites anywhere on the grid, in 1/20. Here the helper kept enough of its own benefit to cover its cost (weak altruism), so by the site's [definition](/evolved-cooperation/kin-selection#what-counts-as-kin-selection-here) this is step 1 of the stepwise table, a warm-up, not kin selection. With overlapping generations and a real net cost to the helper, the same contrast was 20/20 against 0/20 at a benefit-to-cost ratio of 12. The global control changes several things at once (offspring land away from their parents and the competitors are no longer local), so this shows dependence on local replacement as a package, not on relatedness alone. That costly result is step 2 of the table; no ecology was added to it.
- **Whether selection acts through births or deaths.** With fitness deciding births, helping spread. With each site's death risk normalized against its neighbours', selection through deaths failed (0/20), also when selection was split equally between births and deaths. With death risk normalized against the whole grid, the equal split succeeded under local replacement (20/20 against 0/20 for global replacement), so the result is sensitive to the normalization scope; the mechanism was not isolated. With selection entirely through deaths, local replacement failed again (0/20), while the global-replacement arm spread in 14/20; that arm was not a neutral control, and the reason for its success was not established. The full move to selection through survival was not achieved. All of these arms were weak altruism (the helper's own share covered its cost), so they are step-1 variants, not kin-selection tests.
- **The fixed population size.** In the viable replacement-lottery runs, through the steps that added energy stores, birth costs and limited food (where care for one's own young spread: steps 3 and 4 of the table), occupancy was at least 0.996; changing the parents' condition, income or endowment did not materially create vacancies. A Moran-style rule fixes occupancy, ruling out empty-space dynamics, vacancy-driven density variation and population growth. When births instead went into free neighbouring sites, substantial empty space appeared in one of the two attempts (with the parent's energy split with the newborn); in the other (with a free endowment for the newborn), vacancies stayed rare, and care for one's own young (kin selection through parental care, step 5 of the table, not achieved) settled lower with local births than with grid-wide dispersal (about 0.35 against 0.99).
- **No movement.** In all of these models an individual stays on its site for life; only its offspring are placed elsewhere, at birth. A planned step with movement into empty sites was skipped because the grid was almost full. Movement in search of food is part of the site's goal for kin selection in a full ecological setting, and no kin-selection experiment has it yet ([stepwise table](/evolved-cooperation/kin-selection#what-counts-as-kin-selection-here)).

The analytical results above remain the reference for drift and fixation; these tests show which assumptions of the process a cooperation result may silently depend on.

## Relevance to Predator–Prey–Grass

The Moran process provides a baseline for studying the evolution of inherited behavioral strategies in [Predator–Prey–Grass](/learning-selection-interaction/predpreygrass). Consider two heritable strategy lineages, cooperative and opportunistic, with identical physical traits. A neutral model predicts how frequently one lineage should disappear through random reproduction alone.

A proposed test would introduce one strategy at a controlled initial frequency, run independent populations, and measure its persistence, frequency and reproductive success. Compare these outcomes with a neutral baseline matched for initial frequency and population size. For a changing ecological population, a baseline that also accounts for demographic fluctuations is more informative than using the fixed-$N$ formula uncritically.

Unlike the classical Moran model, PPG allows fluctuating population sizes, spatially structured interactions, ecological feedback and learning. Cooperative hunting may create frequency-dependent selection because the benefits of cooperation depend on the availability of partners. These differences are precisely the mechanisms the PPG experiments seek to investigate. The section above shows what can change when such ecological features replace a fixed-size Moran update.

## References

- Moran, P. A. P. (1958). Random processes in genetics. *Mathematical Proceedings of the Cambridge Philosophical Society*, 54(1), 60–71.
- Sella, G., & Hirsh, A. E. (2005). The application of statistical physics to evolutionary biology. *Proceedings of the National Academy of Sciences*, 102(27), 9541–9546. [Full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC1172247/).
