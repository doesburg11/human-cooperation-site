---
id: indirect-reciprocity
title: Indirect Reciprocity
sidebar_position: 3
slug: /evolved-cooperation/indirect-reciprocity
---

## Status

<div style={{ backgroundColor: '#EAF2FB', border: '1px solid #D6E4F5', padding: '0.4rem 1.25rem', margin: '0 0 1.5rem 0', color: '#1F2D3D' }}>This page describes the <code>moran_models/nowak_mechanisms/indirect_reciprocity/</code> package in the sibling <a href="https://github.com/doesburg11/EvolvedCooperation">EvolvedCooperation</a> repository.</div>

Indirect reciprocity is cooperation sustained by reputation. Rather than requiring repeated encounters with the same individual, an agent helps others whose public reputation signals that they are good cooperators — "I help you because others are watching."

## How It Is Implemented Here

Each site carries a **public reputation** score. The positive routing kernel is biased toward higher-reputation recipients:

$$
K^+_{j \to i} \propto \text{bias} + \text{reputation}_i^{\,\text{exponent}}
$$

with row normalization applied afterward. After each step, the reputation of surviving sites is updated from observed helping output:

$$
\text{rep}_i \leftarrow (1 - \omega) \times \text{rep}_{\text{parent}} + \omega \times \frac{B^+_{\text{parent}}}{\text{B\_plus\_scale}}
$$

where $\omega$ is the observation weight. Agents that help more accumulate higher reputation, which causes them to receive more routed benefit — sustaining cooperation through the public reputation channel.

## Key Parameters

<figure className="site-table-figure">
  <div className="site-table-scroll">
  <table className="site-table site-table--bordered site-table--striped">
    <colgroup>
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
      <col style={{ width: '33.33%' }} />
    </colgroup>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Default</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>reputation_default</code></td>
        <td><code>0.5</code></td>
        <td>Initial reputation for all sites</td>
      </tr>
      <tr>
        <td><code>reputation_observation_weight</code></td>
        <td><code>0.35</code></td>
        <td>How quickly reputation tracks recent helping</td>
      </tr>
      <tr>
        <td><code>reputation_kernel_bias</code></td>
        <td><code>0.10</code></td>
        <td>Minimum routing weight regardless of reputation</td>
      </tr>
      <tr>
        <td><code>reputation_kernel_exponent</code></td>
        <td><code>1.0</code></td>
        <td>Curvature of reputation-to-weight mapping</td>
      </tr>
      <tr>
        <td><code>B_plus_scale</code></td>
        <td><code>1.0</code></td>
        <td>Scales cooperative benefit produced per unit trait</td>
      </tr>
      <tr>
        <td><code>C_scale</code></td>
        <td><code>0.2</code></td>
        <td>Private cost per unit trait</td>
      </tr>
    </tbody>
  </table>
</div>
  <figcaption className="site-table-caption"><strong>Display 1:</strong> Key parameters controlling reputation dynamics and routing in the indirect reciprocity model.</figcaption>
</figure>

## Python Module Layout

```text
moran_models/nowak_mechanisms/indirect_reciprocity/
  __init__.py
  indirect_reciprocity_model.py
  indirect_reciprocity_pygame_ui.py
  config/
    indirect_reciprocity_config.py
```

## Usage

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.indirect_reciprocity.indirect_reciprocity_model
```

Live viewer:

```bash
./.conda/bin/python -m moran_models.nowak_mechanisms.indirect_reciprocity.indirect_reciprocity_pygame_ui
```

## References

- Nowak, M. A., & Sigmund, K. (1998). *Evolution of indirect reciprocity by image scoring*. *Nature*, 393, 573–577. https://doi.org/10.1038/31225
- Nowak, M. A. (2006). *Five rules for the evolution of cooperation*. *Science*, 314(5805), 1560–1563. https://doi.org/10.1126/science.1133755
