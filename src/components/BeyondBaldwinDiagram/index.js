import React from 'react';
import styles from './styles.module.css';

// Static reference diagram: the Baldwin effect at the hub, with five other
// evolutionary mechanisms that couple a fast timescale (learning, culture,
// development, gene expression) back onto the slow genetic timescale.
// Coordinates are hand-placed for a fixed pentagon layout (radius 250 from
// center, 72° apart) — there is nothing data-driven to justify a layout
// engine here, unlike InteractionMindmap's collapsible outline.

const NODES = [
  {
    key: 'accommodation',
    lines: ['GENETIC', 'ACCOMMODATION'],
    year: '2003',
    cx: 450,
    cy: 130,
    tone: 'slow',
    tag: 'SUBSUMES',
    tagPos: { x: 450, y: 275 },
    who: 'West-Eberhard, 2003',
    note:
      "Generalizes genetic assimilation: selection can fix a learned trait into an instinct, or just as easily increase plasticity, or tune the induced response without ever removing the need to learn it. The Baldwin effect is the special case that drives plasticity to zero.",
  },
  {
    key: 'culture',
    lines: ['GENE–CULTURE', 'COEVOLUTION'],
    year: '1985',
    cx: 688,
    cy: 303,
    tone: 'fast',
    tag: 'CULTURE',
    tagPos: { x: 550, y: 348 },
    who: 'Boyd & Richerson, 1985',
    note:
      'Culture as a second, faster inheritance system, transmitted by teaching and imitation. Population-level cultural practice reshapes the selective environment genes face — the loop runs through shared behavior, not one individual’s lifetime learning.',
  },
  {
    key: 'niche',
    lines: ['NICHE', 'CONSTRUCTION'],
    year: '2003',
    cx: 597,
    cy: 582,
    tone: 'fast',
    tag: 'ENVIRONMENT',
    tagPos: { x: 512, y: 465 },
    who: 'Odling-Smee, Laland & Feldman, 2003',
    note:
      'Organisms build and modify their environments, and those modifications are inherited ecologically — altering the selection pressure on descendants’ genes independent of any individual’s learning.',
  },
  {
    key: 'epigenetic',
    lines: ['EPIGENETIC', 'INHERITANCE'],
    year: '1995',
    cx: 303,
    cy: 582,
    tone: 'fast',
    tag: 'HEREDITY',
    tagPos: { x: 388, y: 465 },
    who: 'Jablonka & Lamb, 1995',
    note:
      'Environmentally induced marks on gene expression, e.g. DNA methylation, can persist a handful of generations without any change to the sequence itself — a third timescale, faster than sequence evolution but longer-lived than one lifetime.',
  },
  {
    key: 'cognitive-niche',
    lines: ['COGNITIVE', 'NICHE'],
    year: '1987',
    cx: 212,
    cy: 303,
    tone: 'fast',
    dashed: true,
    tag: 'INVERTS',
    tagPos: { x: 350, y: 348 },
    who: 'Tooby & DeVore, 1987',
    note:
      'Turns the Baldwin logic inside out: selection favors domain-general learning capacity itself, because the environment is too unstable for any one fixed instinct to keep paying off. What gets fixed genetically is the ability to learn, not the learned content.',
  },
];

export default function BeyondBaldwinDiagram() {
  return (
    <div className={styles.wrap}>
      <div className={styles.panel}>
        <svg viewBox="0 0 900 780" className={styles.svg} role="img"
          aria-label="Diagram: the Baldwin effect at the center, connected to Genetic Accommodation, Gene-Culture Coevolution, Niche Construction, Epigenetic Inheritance and the Cognitive Niche Hypothesis, with a dashed ring representing the Extended Evolutionary Synthesis surrounding all of them.">

          <circle cx="450" cy="380" r="330" className={styles.ring} />

          {NODES.map((n) => (
            <line
              key={`edge-${n.key}`}
              x1="450" y1="380" x2={n.cx} y2={n.cy}
              className={n.tone === 'slow' ? styles.edgeSlow : n.dashed ? styles.edgeFastDashed : styles.edgeFast}
            />
          ))}

          {NODES.map((n) => (
            <g key={`tag-${n.key}`} className={styles.edgeLabel}>
              <rect x={n.tagPos.x - (n.tag.length * 3.6 + 12)} y={n.tagPos.y - 11}
                width={n.tag.length * 7.2 + 24} height="22" rx="11" />
              <text x={n.tagPos.x} y={n.tagPos.y + 1}>{n.tag}</text>
            </g>
          ))}

          <g className={styles.nodeCenter}>
            <circle cx="450" cy="380" r="78" />
            <text x="450" y="368" className={styles.nameCenter}>BALDWIN</text>
            <text x="450" y="386" className={styles.nameCenter}>EFFECT</text>
            <text x="450" y="406" className={styles.year}>1896 · 1987</text>
          </g>

          {NODES.map((n) => (
            <g key={n.key} className={n.tone === 'slow' ? styles.nodeSlow : styles.nodeFast}>
              <circle cx={n.cx} cy={n.cy} r="64" />
              <text x={n.cx} y={n.cy - 10} className={styles.name}>{n.lines[0]}</text>
              <text x={n.cx} y={n.cy + 6} className={styles.name}>{n.lines[1]}</text>
              <text x={n.cx} y={n.cy + 22} className={styles.year}>{n.year}</text>
            </g>
          ))}

          <g className={styles.ringLabel}>
            <text x="450" y="726" className={styles.ringLabelMain}>EXTENDED EVOLUTIONARY SYNTHESIS</text>
            <text x="450" y="746" className={styles.ringLabelSub}>frames all six as one family · Laland et al., 2015</text>
          </g>
        </svg>

        <div className={styles.legend}>
          <span className={styles.legendItem}><i className={styles.swatchSlow} />generalizes Baldwin directly</span>
          <span className={styles.legendItem}><i className={styles.swatchFast} />parallel channel, same kind of coupling</span>
          <span className={styles.legendItem}><i className={styles.swatchFastDashed} />inverts Baldwin&rsquo;s logic</span>
          <span className={styles.legendItem}><i className={styles.swatchRing} />umbrella framework, not a mechanism</span>
        </div>
      </div>

      <dl className={styles.notes}>
        {NODES.map((n) => (
          <div key={n.key} className={styles.noteRow}>
            <dt>
              <span className={n.tone === 'slow' ? styles.tagSlow : styles.tagFast}>{n.tag}</span>
              <span className={styles.noteWho}>{n.who}</span>
            </dt>
            <dd>{n.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
