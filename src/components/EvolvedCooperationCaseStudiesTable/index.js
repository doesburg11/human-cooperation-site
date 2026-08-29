const CASE_STUDIES = [
  {
    key: 'cooperative-hunting',
    label: 'Cooperative Hunting',
    href: '/evolved-cooperation/cooperative-hunting/',
    description: 'A spatial ecological model in which predator cooperation evolves through hunting success, energetic cost, and inherited trait variation.',
  },
  {
    key: 'spatial-prisoners-dilemma',
    label: "Spatial Prisoner's Dilemma",
    href: '/evolved-cooperation/spatial-prisoners-dilemma/',
    description: "A local-game ecology in which inherited same-vs-other Prisoner's Dilemma response rules spread through energy accumulation, local movement, and local reproduction.",
  },
  {
    key: 'retained-benefit',
    label: 'Retained Benefit',
    href: '/evolved-cooperation/retained-benefit/',
    description: 'An abstract lattice model in which a continuous cooperation trait spreads only when enough of the value created by cooperation is routed back toward cooperators or copies of the cooperative rule.',
  },
];

const headerCellStyle = {
  backgroundColor: '#0f3368',
  color: '#ffffff',
  textAlign: 'left',
  padding: '0.75rem 1rem',
  border: '1px solid #D6E4F5',
};

const bodyCellStyle = {
  padding: '0.75rem 1rem',
  border: '1px solid #D6E4F5',
};

function getRowStyle(index, isCurrent) {
  if (isCurrent) {
    return { backgroundColor: 'rgba(15, 51, 104, 0.12)' };
  }
  if (index % 2 === 1) {
    return { backgroundColor: 'rgba(120, 170, 230, 0.16)' };
  }
  return undefined;
}

export default function EvolvedCooperationCaseStudiesTable({
  currentCaseStudy,
  displayNumber,
  caption = 'Current evolved-cooperation case studies.',
}) {
  const captionPrefix = displayNumber ? `Display ${displayNumber}: ` : '';

  return (
    <figure style={{ width: '100%', margin: '0 0 1.25rem 0', textAlign: 'center' }}>
      <div style={{ width: '100%', overflowX: 'auto', textAlign: 'left' }}>
        <table style={{ display: 'table', width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
          <colgroup>
            <col style={{ width: '28%' }} />
            <col style={{ width: '72%' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={headerCellStyle}>Case study</th>
              <th style={headerCellStyle}>Selection logic</th>
            </tr>
          </thead>
          <tbody>
            {CASE_STUDIES.map((caseStudy, index) => {
              const isCurrent = caseStudy.key === currentCaseStudy;
              return (
                <tr key={caseStudy.key} style={getRowStyle(index, isCurrent)}>
                  <td style={bodyCellStyle}>
                    <a href={caseStudy.href}>{caseStudy.label}</a>
                  </td>
                  <td style={bodyCellStyle}>{caseStudy.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <figcaption style={{ marginTop: '0.6rem', textAlign: 'center' }}>
        {captionPrefix ? <strong>{captionPrefix}</strong> : null}
        {caption}
      </figcaption>
    </figure>
  );
}