---
id: predpreygrass-energy-entropy
title: Energy and Entropy in PredPreyGrass
sidebar_position: 3
slug: /learning-selection-interaction/predpreygrass-energy-entropy
---

An ecosystem can sustain organized living populations only while usable energy enters it. In PredPreyGrass, grass regeneration supplies energy, feeding transfers it between trophic levels, and metabolism removes it from the usable pool. These rules create the ecological scarcity on which survival, reproduction and ultimately evolutionary selection depend.

## Energy Flow in the Simulation

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ overflowX: 'auto', border: '1px solid #D6E4F5' }}>
    <svg viewBox="0 0 960 490" role="img" aria-label="Energy enters through grass regeneration, is transferred to prey and predator through feeding, and exits the tracked usable energy pool through passive metabolism. Reproduction redistributes energy from parent to offspring." style={{ display: 'block', width: '100%', minWidth: '650px', fontFamily: 'Arial, sans-serif', background: '#FFFFFF' }}>
      <rect width="960" height="88" fill="#0F3368" />
      <text x="30" y="35" fontSize="24" fontWeight="700" fill="#FFFFFF">Energy flow in PredPreyGrass</text>
      <text x="30" y="62" fontSize="15" fill="#FFFFFF">Discrete base environment · model energy units</text>
      <rect x="28" y="111" width="904" height="219" fill="#F4F8FD" stroke="#D6E4F5" />
      <text x="48" y="136" fill="#1C4B8F" fontSize="13" fontWeight="700" letterSpacing="1">ENERGY INPUT AND TRANSFER</text>
      <g fill="#FFFFFF" stroke="#D6E4F5" strokeWidth="1.5"><rect x="48" y="158" width="180" height="106"/><rect x="280" y="158" width="180" height="106"/><rect x="512" y="158" width="180" height="106"/><rect x="744" y="158" width="168" height="106"/></g>
      <g fill="#0F3368" fontSize="18" fontWeight="700" textAnchor="middle"><text x="138" y="188">External input</text><text x="370" y="188">Grass</text><text x="602" y="188">Prey</text><text x="828" y="188">Predator</text></g>
      <g fill="#1F2D3D" fontSize="14" textAnchor="middle"><text x="138" y="214">Regeneration</text><text x="138" y="237">≤ 4 units / step</text><text x="370" y="214">100 patches</text><text x="370" y="237">Up to 2 units each</text><text x="602" y="214">Grazes grass</text><text x="602" y="237">−0.05 / step</text><text x="828" y="214">Consumes prey</text><text x="828" y="237">−0.15 / step</text></g>
      <g stroke="#1C4B8F" strokeWidth="3" fill="none"><path d="M232 211 H263"/><path d="M464 211 H495"/><path d="M696 211 H727"/></g>
      <path d="M263 205 L275 211 L263 217 Z M495 205 L507 211 L495 217 Z M727 205 L739 211 L727 217 Z" fill="#1C4B8F" />
      <text x="254" y="201" fill="#1C4B8F" fontSize="12" textAnchor="middle">input</text><text x="486" y="201" fill="#1C4B8F" fontSize="12" textAnchor="middle">graze</text><text x="718" y="201" fill="#1C4B8F" fontSize="12" textAnchor="middle">hunt</text>
      <text x="48" y="294" fontSize="14" fontWeight="700" fill="#0F3368">Feeding transfers energy; reproduction splits it.</text>
      <text x="48" y="314" fontSize="13" fill="#1F2D3D">No additional bite or movement cost.</text>
      <g stroke="#64778D" strokeWidth="2.5" fill="none" strokeDasharray="5 4"><path d="M602 267 V348"/><path d="M828 267 V348"/></g>
      <path d="M597 348 L602 360 L607 348 Z M823 348 L828 360 L833 348 Z" fill="#64778D" />
      <rect x="48" y="365" width="864" height="72" fill="#EAF2FB" stroke="#D6E4F5" />
      <text x="70" y="394" fontSize="18" fill="#0F3368" fontWeight="700">Metabolic dissipation</text>
      <text x="70" y="417" fontSize="14" fill="#1F2D3D">Energy removed from the usable pool — no heat or entropy variable is tracked.</text>
      <text x="48" y="467" fontSize="13" fill="#64778D">Solid: energy input and transfer     ·     Dashed: removal from the model's energy ledger</text>
    </svg>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 1:</strong> Energy enters through grass regeneration, flows through feeding, and leaves the usable pool through depletion. Arrows show accounting flows, not measured quantities.</figcaption>
</figure>

The [discrete base environment](https://github.com/doesburg11/PredPreyGrass/tree/main/predpreygrass/non_evolutionary/discrete_space/base_environment_discrete) is an open energy system. It does not simulate sunlight, temperature or thermodynamic entropy directly. Instead, it tracks scalar energy for each grass patch and animal. The term entropy describes the physical analogy, not a measured state variable or a separate reservoir in the implementation.

## The Energy Budget

Let $G_t$, $H_t$ and $P_t$ denote total energy stored in grass, prey and predators at step $t$. Total usable energy is $E_t=G_t+H_t+P_t$. Its conceptual accounting balance is

$$
E_{t+1}-E_t=I_t-D_t,
$$

where $I_t$ is actual input from grass regeneration and $D_t$ is net depletion, accounting for final-step clipping or removal at starvation. Feeding and reproduction redistribute tracked energy rather than creating it.

The following settings are from the [discrete base configuration](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/discrete_space/base_environment_discrete/config_env.py). Other PPG variants may use different energy rules.

<figure className="site-table-figure">
  <div className="site-table-scroll">
    <table className="site-table site-table--striped">
      <thead><tr><th>Mechanism</th><th>Configured value</th><th>Effect on usable energy</th></tr></thead>
      <tbody>
        <tr><td>Grass regeneration</td><td>0.04 per patch per step; cap 2.0</td><td>External input, limited by storage capacity.</td></tr>
        <tr><td>Prey metabolism</td><td>0.05 per step</td><td>Removes energy.</td></tr>
        <tr><td>Predator metabolism</td><td>0.15 per step</td><td>Removes energy.</td></tr>
        <tr><td>Movement</td><td>0</td><td>No additional energy charge in this base implementation.</td></tr>
        <tr><td>Grazing and predation</td><td>Full stored energy transferred</td><td>Redistribution; no conversion discount.</td></tr>
        <tr><td>Reproduction</td><td>3.0 prey; 5.0 predator</td><td>Parent transfers this energy to offspring.</td></tr>
      </tbody>
    </table>
  </div>
  <figcaption className="site-table-caption"><strong>Display 2:</strong> Energy sources, sinks and transfers in the discrete base environment.</figcaption>
</figure>

### Limits to Population Growth

There are 100 grass patches, so the maximum new energy supplied in a step is $100\times0.04=4$ units. Actual input is lower whenever patches are near their storage cap. The nominal metabolic demand for $n_h$ prey and $n_p$ predators per step is

$$
D_{\mathrm{nominal}}=0.05n_h+0.15n_p.
$$

For example, 40 prey and 20 predators require 5 units per step, exceeding the maximum regeneration rate. Such a population could temporarily draw down stored energy but cannot sustain that demand indefinitely without a reduction in population or change in energy supply. This is a budget comparison, not a prediction of equilibrium population size.

## Real Ecosystems: Trophic Efficiency

In nature, energy is conserved physically, but its capacity to perform useful biological work diminishes as it is dissipated as heat. At successive trophic levels, only a fraction of production becomes new biomass at the next level. Other energy supports metabolism or passes through uneaten material and waste. Nutrients can return through decomposition; usable energy does not cycle back in the same way.

Lindeman's trophic-dynamic framework expresses this transfer as a ratio of production across trophic levels. The familiar ten-percent rule is an approximation, not a universal efficiency constant. To illustrate the cumulative effect, assume 20% efficiency at each of two transfers, starting with 100 units of grass production.

<figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
  <div style={{ overflowX: 'auto', border: '1px solid #D6E4F5' }}>
    <svg viewBox="0 0 800 330" role="img" aria-label="Illustrative trophic production declines from 100 units of grass to 20 units of prey and 4 units of predator." style={{ display: 'block', width: '100%', minWidth: '530px', fontFamily: 'Arial, sans-serif', background: '#FFFFFF' }}>
      <rect width="800" height="72" fill="#0F3368" />
      <text x="26" y="30" fontSize="21" fontWeight="700" fill="#FFFFFF">Trophic production in a real ecosystem</text>
      <text x="26" y="53" fontSize="14" fill="#FFFFFF">Illustrative example: 20% efficiency at each transfer</text>
      {[0,25,50,75,100].map(v => <g key={v}><line x1={155+v*5.8} x2={155+v*5.8} y1="97" y2="270" stroke="#D6E4F5"/><text x={155+v*5.8} y="289" fill="#64778D" fontSize="13" textAnchor="middle">{v}</text></g>)}
      {[['Grass',100],['Prey',20],['Predator',4]].map(([name,v],i) => <g key={name}><text x="135" y={131+i*58} fill="#0F3368" fontSize="16" textAnchor="end" fontWeight="700">{name}</text><rect x="155" y={111+i*58} width={v*5.8} height="30" fill={['#1C4B8F','#4C78B5','#78AAE6'][i]}/><text x={v===100?725:165+v*5.8} y={131+i*58} fill={v===100?'#FFFFFF':'#0F3368'} textAnchor={v===100?'end':'start'} fontSize="15" fontWeight="700">{v} units</text></g>)}
      <text x="445" y="318" fontSize="14" textAnchor="middle" fill="#1F2D3D">Production relative to the grass baseline (units)</text>
    </svg>
  </div>
  <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}><strong>Display 3:</strong> Illustrative production at successive trophic levels: 100 units of grass, 20 of prey and 4 of predator production. These are not measured PPG values.</figcaption>
</figure>

Trophic efficiency is an ecosystem-level production ratio over time, not necessarily the fraction of an individual meal assimilated by an animal. PPG simplifies the latter to full transfer of stored model energy, while passive metabolism reduces available energy between feeding events.

## Implications for Selection and Learning

In the base environment, reproduction requires 8 energy units for prey and 12 for predators. Offspring receive part of their parent's stored energy; the parent also receives a separate learning reward of 10. This reward is a training signal, not new ecological energy.

Efficient foraging allows an agent to accumulate energy faster than it loses it. For predators, improved hunting can raise energy income; for prey, grazing and avoiding predation can improve survival. When inherited strategies produce more surviving descendants, energy acquisition becomes a mechanism through which natural selection can favor those strategies. This is distinct from learning a policy that increases reward during an agent's lifetime, and illustrates [behavior as a cost–benefit investment](/nature-nurture-human-behavior#behavior-as-a-cost-benefit-investment).

Cooperation must likewise be assessed in terms of energy, survival and reproduction, including how costs and benefits are shared and whether coexistence persists. A higher number of cooperative kills alone does not establish an evolutionary advantage.

## A More Realistic Energy-Transfer Experiment

A useful extension would vary the fraction of consumed energy retained by the consumer while keeping grass regeneration, metabolism and movement rules fixed. For a feeding event of size $e$, an assimilation parameter $\eta$ between zero and one would transfer $\eta e$ to the consumer and remove $(1-\eta)e$ from the tracked pool.

This is a proposed experiment, not an implemented feature of the base environment. The fraction should be motivated by assimilation biology and calibrated against trophic production rather than assumed equal to the ten-percent rule. Compare otherwise identical runs across transfer fractions and measure actual input, depletion, production, population persistence and reproduction. This would test how greater energetic constraints affect food-chain viability and opportunities for cooperative behavior.

## References

- Lindeman, R. L. (1942). The trophic-dynamic aspect of ecology. *Ecology*, 23(4), 399–417. [DOI](https://doi.org/10.2307/1930126).
- National Geographic Education. Energy Flow and the 10% Rule. [Resource](https://education.nationalgeographic.org/resource/energy-flow-and-10-percent-rule/).
- PredPreyGrass. Discrete base environment: [configuration](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/discrete_space/base_environment_discrete/config_env.py) and [implementation](https://github.com/doesburg11/PredPreyGrass/blob/main/predpreygrass/non_evolutionary/discrete_space/base_environment_discrete/predpreygrass_rllib_env.py).
