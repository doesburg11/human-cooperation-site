import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

/**
 * Interactive companion to "Why learning smooths the fitness landscape"
 * (Hinton & Nowlan, 1987). Three sections:
 *   1. Three terrains — smooth vs. rugged (NK-style) vs. needle-in-haystack.
 *   2. The manufactured gradient — a closed-form computed curve showing how
 *      lifetime learning turns a flat-plus-spike landscape into a slope.
 *   3. Watch it race — an actual small genetic algorithm (not a canned
 *      animation) comparing selection alone against selection helped by
 *      lifetime learning on a 20-bit lock.
 * All three are computed client-side; nothing here is pre-rendered data.
 */

// ---------------------------------------------------------------------------
// Section 1 — terrain shapes (pure functions, safe at module scope)
// ---------------------------------------------------------------------------
function smoothFn(x) {
  return 0.08 + 0.9 * Math.exp(-Math.pow((x - 0.58) / 0.26, 2));
}

function ruggedFn(x) {
  return (
    0.5 +
    0.22 * Math.sin(2 * Math.PI * (1.3 * x + 0.15)) +
    0.18 * Math.sin(2 * Math.PI * (3.1 * x + 0.6)) +
    0.12 * Math.sin(2 * Math.PI * (5.7 * x + 0.05))
  );
}

function needleFn(x, spikeX, halfWidth) {
  const d = Math.abs(x - spikeX);
  if (d < halfWidth) return 0.1 + 0.86 * (1 - d / halfWidth);
  return 0.1;
}

function sampleCurve(fn, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(fn(i / n));
  return pts;
}

function normalize(arr) {
  const min = Math.min.apply(null, arr);
  const max = Math.max.apply(null, arr);
  const range = max - min || 1;
  return arr.map((v) => (v - min) / range);
}

function drawTerrain(canvas, kind, colors) {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = rect.width;
  const h = rect.height;
  const padTop = 12;
  const padBottom = 8;
  const padSide = 6;
  const plotH = h - padTop - padBottom;
  const plotW = w - padSide * 2;

  const n = 200;
  let values;
  let optIdx;
  if (kind === 'smooth') {
    values = sampleCurve(smoothFn, n);
    optIdx = values.indexOf(Math.max.apply(null, values));
  } else if (kind === 'rugged') {
    values = normalize(sampleCurve(ruggedFn, n));
    optIdx = values.indexOf(Math.max.apply(null, values));
  } else {
    const spikeX = 0.78;
    const halfWidth = 0.028;
    values = sampleCurve((x) => needleFn(x, spikeX, halfWidth), n);
    optIdx = Math.round(spikeX * n);
  }

  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  ctx.moveTo(padSide, padTop + plotH);
  for (let i = 0; i <= n; i++) {
    ctx.lineTo(padSide + (i / n) * plotW, padTop + plotH - values[i] * plotH);
  }
  ctx.lineTo(padSide + plotW, padTop + plotH);
  ctx.closePath();
  ctx.fillStyle = colors.surface2;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(padSide, padTop + plotH);
  ctx.lineTo(padSide + plotW, padTop + plotH);
  ctx.strokeStyle = colors.muted;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.beginPath();
  for (let j = 0; j <= n; j++) {
    const qx = padSide + (j / n) * plotW;
    const qy = padTop + plotH - values[j] * plotH;
    if (j === 0) ctx.moveTo(qx, qy);
    else ctx.lineTo(qx, qy);
  }
  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  const ox = padSide + (optIdx / n) * plotW;
  const oy = padTop + plotH - values[optIdx] * plotH;
  ctx.beginPath();
  ctx.arc(ox, oy, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = colors.accent;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.surface2;
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// Generic imperative line-chart controller — shared by the gradient chart
// and the live-race chart. Both are small (<=260 points) so redrawing the
// full path on every update is cheap.
// ---------------------------------------------------------------------------
function createLineChart(svgEl, tooltipEl, opts, cls) {
  const margin = { top: 14, right: 16, bottom: 30, left: 34 };
  const W = 640;
  const H = 320;
  const plotW = W - margin.left - margin.right;
  const plotH = H - margin.top - margin.bottom;
  const { xMax, yMax } = opts;
  const xTickEvery = opts.xTickEvery || Math.ceil(xMax / 5);
  const yTicks = opts.yTicks || [0, yMax / 2, yMax];

  const xScale = (x) => margin.left + (x / xMax) * plotW;
  const yScale = (y) => margin.top + plotH - (y / yMax) * plotH;

  const ns = 'http://www.w3.org/2000/svg';
  function el(tag, attrs) {
    const e = document.createElementNS(ns, tag);
    Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k]));
    return e;
  }

  svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
  while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

  yTicks.forEach((yt) => {
    svgEl.appendChild(
      el('line', {
        x1: margin.left,
        x2: margin.left + plotW,
        y1: yScale(yt),
        y2: yScale(yt),
        class: yt === 0 ? cls.axisLine : cls.gridLine,
      })
    );
    const t = el('text', { x: margin.left - 8, y: yScale(yt) + 3, class: cls.tickLabel, 'text-anchor': 'end' });
    t.textContent = Math.round(yt * 10) / 10;
    svgEl.appendChild(t);
  });
  for (let xt = 0; xt <= xMax; xt += xTickEvery) {
    const lbl = el('text', { x: xScale(xt), y: margin.top + plotH + 18, class: cls.tickLabel, 'text-anchor': 'middle' });
    lbl.textContent = xt;
    svgEl.appendChild(lbl);
  }
  if (opts.xLabel) {
    const xl = el('text', { x: margin.left + plotW / 2, y: H - 2, class: cls.tickLabel, 'text-anchor': 'middle' });
    xl.textContent = opts.xLabel;
    svgEl.appendChild(xl);
  }
  svgEl.appendChild(el('line', { x1: margin.left, x2: margin.left, y1: margin.top, y2: margin.top + plotH, class: cls.axisLine }));

  const pathA = el('path', { class: cls.seriesALine });
  const pathB = el('path', { class: cls.seriesBLine });
  svgEl.appendChild(pathB);
  svgEl.appendChild(pathA);
  const dotA = el('circle', { class: cls.seriesADot, r: 4 });
  const dotB = el('circle', { class: cls.seriesBDot, r: 4 });
  const labelA = el('text', { class: `${cls.directLabel} ${cls.directLabelA}` });
  const labelB = el('text', { class: `${cls.directLabel} ${cls.directLabelB}` });
  svgEl.appendChild(dotB);
  svgEl.appendChild(dotA);
  svgEl.appendChild(labelB);
  svgEl.appendChild(labelA);

  const guide = el('line', { class: cls.hoverGuide, y1: margin.top, y2: margin.top + plotH });
  svgEl.appendChild(guide);
  const hoverRect = el('rect', { class: cls.hoverRect, x: margin.left, y: margin.top, width: plotW, height: plotH });
  svgEl.appendChild(hoverRect);

  const current = { a: [], b: [] };

  function pathD(points) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.x).toFixed(2)},${yScale(p.y).toFixed(2)}`).join(' ');
  }

  function update(dataA, dataB) {
    current.a = dataA;
    current.b = dataB;
    pathA.setAttribute('d', pathD(dataA));
    pathB.setAttribute('d', pathD(dataB));
    if (dataA.length) {
      const last = dataA[dataA.length - 1];
      dotA.setAttribute('cx', xScale(last.x));
      dotA.setAttribute('cy', yScale(last.y));
      labelA.setAttribute('x', Math.min(xScale(last.x) + 8, W - 8));
      labelA.setAttribute('y', yScale(last.y) - 8);
      labelA.textContent = opts.labelA;
    }
    if (dataB.length) {
      const last = dataB[dataB.length - 1];
      dotB.setAttribute('cx', xScale(last.x));
      dotB.setAttribute('cy', yScale(last.y));
      labelB.setAttribute('x', Math.min(xScale(last.x) + 8, W - 8));
      labelB.setAttribute('y', yScale(last.y) + 13);
      labelB.textContent = opts.labelB;
    }
  }

  function onMove(evt) {
    const box = svgEl.getBoundingClientRect();
    const relX = ((evt.clientX - box.left) / box.width) * W;
    let xVal = Math.round(((relX - margin.left) / plotW) * xMax);
    xVal = Math.max(0, Math.min(xMax, xVal));
    const pa = current.a[xVal];
    const pb = current.b[xVal];
    if (!pa && !pb) return;
    guide.setAttribute('x1', xScale(xVal));
    guide.setAttribute('x2', xScale(xVal));
    guide.style.opacity = 1;
    const lines = [`${opts.xLabel || 'x'}: ${xVal}`];
    if (pa) lines.push(`${opts.labelA}: ${pa.y.toFixed(2)}`);
    if (pb) lines.push(`${opts.labelB}: ${pb.y.toFixed(2)}`);
    tooltipEl.innerHTML = lines.join('<br>');
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = `${evt.clientX - box.left}px`;
    tooltipEl.style.top = `${evt.clientY - box.top - 10}px`;
  }
  function onLeave() {
    guide.style.opacity = 0;
    tooltipEl.style.opacity = 0;
  }
  hoverRect.addEventListener('mousemove', onMove);
  hoverRect.addEventListener('mouseleave', onLeave);

  return {
    update,
    destroy() {
      hoverRect.removeEventListener('mousemove', onMove);
      hoverRect.removeEventListener('mouseleave', onLeave);
    },
  };
}

// ---------------------------------------------------------------------------
// Section 2 — closed-form "manufactured gradient" data
// ---------------------------------------------------------------------------
function buildGradientData() {
  const L = 20;
  const T = 1000;
  const raw = [];
  const learn = [];
  const table = [];
  for (let x = 0; x <= L; x++) {
    const plastic = L - x;
    const pTrial = Math.pow(2, -plastic);
    const pSolve = 1 - Math.pow(1 - pTrial, T);
    const rawFit = x === L ? 20 : 1;
    const learnFit = 1 + 19 * pSolve;
    raw.push({ x, y: rawFit });
    learn.push({ x, y: learnFit });
    table.push({ x, rawFit, learnFit });
  }
  return { raw, learn, table };
}

// ---------------------------------------------------------------------------
// Section 3 — live genetic-algorithm race
// ---------------------------------------------------------------------------
const L = 20;
const POP = 150;
const T_TRIALS = 1000;
const MUT_RATE = 0.02;
const MAX_GEN = 260;
const FIXED_WRONG = 0;
const FIXED_RIGHT = 1;
const PLASTIC = 2;

function randInt(n) {
  return Math.floor(Math.random() * n);
}

function initSelectionOnly() {
  const pop = [];
  for (let i = 0; i < POP; i++) {
    const g = [];
    for (let j = 0; j < L; j++) g.push(Math.random() < 0.5 ? 1 : 0);
    pop.push(g);
  }
  return pop;
}

function initLearning() {
  const pop = [];
  for (let i = 0; i < POP; i++) {
    const g = [];
    for (let j = 0; j < L; j++) {
      const r = Math.random();
      g.push(r < 0.25 ? FIXED_RIGHT : r < 0.5 ? FIXED_WRONG : PLASTIC);
    }
    pop.push(g);
  }
  return pop;
}

function fitnessSelectionOnly(g) {
  let correct = 0;
  for (let i = 0; i < L; i++) if (g[i] === 1) correct++;
  return { fitness: correct === L ? 20 : 1, correct };
}

function fitnessLearning(g) {
  let fixedWrongCount = 0;
  let plasticCount = 0;
  let fixedRightCount = 0;
  for (let i = 0; i < L; i++) {
    if (g[i] === FIXED_WRONG) fixedWrongCount++;
    else if (g[i] === PLASTIC) plasticCount++;
    else fixedRightCount++;
  }
  if (fixedWrongCount > 0) return { fitness: 1, correct: fixedRightCount };
  if (plasticCount === 0) return { fitness: 20, correct: fixedRightCount };
  const p = Math.pow(2, -plasticCount);
  const u = Math.random();
  const trialsUsed = Math.ceil(Math.log(1 - u) / Math.log(1 - p));
  if (trialsUsed <= T_TRIALS) {
    return { fitness: 1 + 19 * (1 - trialsUsed / T_TRIALS), correct: fixedRightCount };
  }
  return { fitness: 1, correct: fixedRightCount };
}

function weightedPick(pop, fits) {
  let total = 0;
  for (let i = 0; i < fits.length; i++) total += fits[i];
  let r = Math.random() * total;
  for (let j = 0; j < fits.length; j++) {
    r -= fits[j];
    if (r <= 0) return pop[j];
  }
  return pop[pop.length - 1];
}

function crossover(p1, p2) {
  const point = 1 + randInt(L - 1);
  return p1.slice(0, point).concat(p2.slice(point));
}

function mutateSelectionOnly(g) {
  return g.map((v) => (Math.random() < MUT_RATE ? 1 - v : v));
}

function mutateLearning(g) {
  return g.map((v) => {
    if (Math.random() >= MUT_RATE) return v;
    const options = [FIXED_WRONG, FIXED_RIGHT, PLASTIC].filter((o) => o !== v);
    return options[randInt(options.length)];
  });
}

function stepGeneration(pop, fitFn, mutateFn) {
  const evals = pop.map(fitFn);
  const fits = evals.map((e) => e.fitness);
  let bestIdx = 0;
  for (let i = 1; i < evals.length; i++) if (evals[i].fitness > evals[bestIdx].fitness) bestIdx = i;
  const next = [];
  for (let k = 0; k < POP; k++) {
    const parentA = weightedPick(pop, fits);
    const parentB = weightedPick(pop, fits);
    next.push(mutateFn(crossover(parentA, parentB)));
  }
  return { pop: next, best: evals[bestIdx], bestGenome: pop[bestIdx] };
}

function getThemeColors(wrapEl) {
  const cs = getComputedStyle(wrapEl);
  return {
    ink: cs.getPropertyValue('--bh-ink').trim(),
    muted: cs.getPropertyValue('--bh-muted').trim(),
    accent: cs.getPropertyValue('--bh-accent').trim(),
    surface2: cs.getPropertyValue('--bh-surface-2').trim(),
  };
}

export default function BaldwinNeedleHaystack() {
  const wrapRef = useRef(null);
  const terrainSmoothRef = useRef(null);
  const terrainRuggedRef = useRef(null);
  const terrainNeedleRef = useRef(null);
  const gradientSvgRef = useRef(null);
  const gradientTooltipRef = useRef(null);
  const raceSvgRef = useRef(null);
  const raceTooltipRef = useRef(null);
  const raceChartRef = useRef(null);
  const simRef = useRef(null);
  const timerRef = useRef(null);

  const gradientData = useMemo(buildGradientData, []);

  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [stats, setStats] = useState({ gen: 0, fitLearn: 1, fitSel: 1, correct: 0 });
  const [bestGenome, setBestGenome] = useState(null);

  // Draw terrains + build the static gradient chart on mount.
  useEffect(() => {
    const wrap = wrapRef.current;
    const colors = getThemeColors(wrap);

    function drawAll() {
      drawTerrain(terrainSmoothRef.current, 'smooth', colors);
      drawTerrain(terrainRuggedRef.current, 'rugged', colors);
      drawTerrain(terrainNeedleRef.current, 'needle', colors);
    }
    drawAll();

    const gradientChart = createLineChart(
      gradientSvgRef.current,
      gradientTooltipRef.current,
      { xMax: 20, yMax: 20, xTickEvery: 5, yTicks: [0, 10, 20], xLabel: 'loci correct', labelA: '+ learning', labelB: 'genotype alone' },
      styles
    );
    gradientChart.update(gradientData.learn, gradientData.raw);

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAll, 120);
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      gradientChart.destroy();
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build the (initially empty) race chart once.
  useEffect(() => {
    raceChartRef.current = createLineChart(
      raceSvgRef.current,
      raceTooltipRef.current,
      { xMax: MAX_GEN, yMax: 20, xTickEvery: 50, yTicks: [0, 10, 20], xLabel: 'generation', labelA: '+ learning', labelB: 'selection only' },
      styles
    );
    resetSim();
    return () => {
      if (raceChartRef.current) raceChartRef.current.destroy();
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetSim() {
    if (timerRef.current) clearInterval(timerRef.current);
    simRef.current = {
      popLearn: initLearning(),
      popSel: initSelectionOnly(),
      gen: 0,
      historyA: [],
      historyB: [],
    };
    if (raceChartRef.current) raceChartRef.current.update([], []);
    setStats({ gen: 0, fitLearn: 1, fitSel: 1, correct: 0 });
    setBestGenome(null);
    setRunning(false);
    setFinished(false);
  }

  function tick() {
    const sim = simRef.current;
    const stepLearn = stepGeneration(sim.popLearn, fitnessLearning, mutateLearning);
    const stepSel = stepGeneration(sim.popSel, fitnessSelectionOnly, mutateSelectionOnly);
    sim.popLearn = stepLearn.pop;
    sim.popSel = stepSel.pop;
    sim.gen += 1;
    sim.historyA.push({ x: sim.gen, y: stepLearn.best.fitness });
    sim.historyB.push({ x: sim.gen, y: stepSel.best.fitness });
    raceChartRef.current.update(sim.historyA, sim.historyB);

    setStats({
      gen: sim.gen,
      fitLearn: stepLearn.best.fitness,
      fitSel: stepSel.best.fitness,
      correct: stepLearn.best.correct,
    });
    setBestGenome(stepLearn.bestGenome);

    if (sim.gen >= MAX_GEN) {
      clearInterval(timerRef.current);
      setRunning(false);
      setFinished(true);
    }
  }

  function handleRun() {
    if (running) return;
    if (simRef.current && simRef.current.gen >= MAX_GEN) resetSim();
    setRunning(true);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timerRef.current = setInterval(tick, reducedMotion ? 4 : 28);
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div>
        <div className={styles.eyebrow}>Interactive — Hinton &amp; Nowlan, worked through</div>
        <div className={styles.introTitle}>See it: three landscapes and a live race</div>
        <p className={styles.introText}>
          The claim above — that learning turns a needle-in-a-haystack into a climbable slope — is easy to state and easy
          to doubt. Below: the same three landscape shapes, the actual gradient learning creates, and a live
          genetic-algorithm race between selection alone and selection helped by lifetime learning. All three are
          computed in your browser as you read this, not pre-rendered.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Three terrains</div>
        <p className={styles.sectionLede}>
          Selection can only follow a slope it can feel. Whether one exists depends entirely on the shape of the
          landscape underneath the trait.
        </p>
        <div className={styles.terrainGrid}>
          <figure className={styles.terrainCard}>
            <canvas ref={terrainSmoothRef} className={styles.terrainCanvas} />
            <figcaption>
              <div className={styles.terrainLabel}>Smooth</div>
              <p className={styles.terrainCap}>
                One scalar, one gentle slope. A mutant a little closer to the optimum is a little fitter, every
                generation — selection climbs this alone.
              </p>
            </figcaption>
          </figure>
          <figure className={styles.terrainCard}>
            <canvas ref={terrainRuggedRef} className={styles.terrainCanvas} />
            <figcaption>
              <div className={styles.terrainLabel}>Rugged — NK-style</div>
              <p className={styles.terrainCap}>
                Several interacting genes, partial credit for partial matches. Harder to climb, and easy to get stuck
                on a lesser bump — but nearby genotypes still hint at &ldquo;warmer.&rdquo;
              </p>
            </figcaption>
          </figure>
          <figure className={styles.terrainCard}>
            <canvas ref={terrainNeedleRef} className={styles.terrainCanvas} />
            <figcaption>
              <div className={styles.terrainLabel}>Needle-in-haystack</div>
              <p className={styles.terrainCap}>
                Flat everywhere except one exact combination. 19 of 20 correct pays exactly as badly as 0 of 20 — no
                slope to feel until you land on it.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>The manufactured gradient</div>
        <p className={styles.sectionLede}>
          Take the 20-locus lock. Plot expected fitness against how many loci a genotype already has fixed correct —
          once for the raw genotype, once allowing each individual up to 1,000 private guesses at whatever&rsquo;s left
          over its lifetime.
        </p>
        <div className={styles.card}>
          <div className={styles.chartShell}>
            <svg ref={gradientSvgRef} className={styles.linechart} />
            <div ref={gradientTooltipRef} className={styles.tooltip} />
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchA}`} />
              genotype + up to 1,000 lifetime guesses
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchB}`} />
              genotype alone (no learning)
            </span>
          </div>
        </div>
        <p className={styles.formulaCap}>
          expected fitness(x) = 1 + 19 × P(remaining 20−x loci all guessed correctly within 1,000 random lifetime
          trials), where each trial has probability 2⁻⁽²⁰⁻ˣ⁾ of hitting them all at once
        </p>
        <details className={styles.dataToggle}>
          <summary>View data table</summary>
          <div className={styles.tableScroll}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Loci correct</th>
                  <th>Raw genotype fitness</th>
                  <th>Expected fitness w/ learning</th>
                </tr>
              </thead>
              <tbody>
                {gradientData.table.map((row) => (
                  <tr key={row.x}>
                    <td>{row.x}</td>
                    <td>{row.rawFit.toFixed(2)}</td>
                    <td>{row.learnFit.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Watch it race</div>
        <p className={styles.sectionLede}>
          Same 20-bit lock, same population of 150, same crossover-and-mutation update rule, same mutation rate. The
          only difference: whether each individual gets up to 1,000 private guesses at its still-undetermined loci
          before its fitness is scored. Press run.
        </p>
        <div className={styles.card}>
          <div className={styles.raceControls}>
            <button
              type="button"
              className={`${styles.instrumentBtn} ${styles.instrumentBtnPrimary}`}
              onClick={handleRun}
              disabled={running}
            >
              {finished ? 'Run again' : 'Run race'}
            </button>
            <button type="button" className={styles.instrumentBtn} onClick={resetSim}>
              Reset
            </button>
          </div>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Generation</div>
              <div className={styles.statValue}>{stats.gen}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Best fitness · learning</div>
              <div className={styles.statValue}>{stats.fitLearn.toFixed(1)}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Best fitness · selection only</div>
              <div className={styles.statValue}>{stats.fitSel.toFixed(1)}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>Loci fixed correct · best</div>
              <div className={styles.statValue}>{stats.correct} / {L}</div>
            </div>
          </div>

          <div className={styles.chartShell} style={{ marginTop: '1.1rem' }}>
            <svg ref={raceSvgRef} className={styles.linechart} />
            <div ref={raceTooltipRef} className={styles.tooltip} />
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchA}`} />
              selection + learning
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.swatchB}`} />
              selection only
            </span>
          </div>

          <div style={{ marginTop: '1.1rem' }}>
            <p className={styles.genomeCaption}>
              Best &ldquo;selection + learning&rdquo; genotype this generation —{' '}
              <span className={styles.fixedOk}>fixed correct</span>,{' '}
              <span className={styles.plastic}>still plastic (learnable)</span>,{' '}
              <span className={styles.fixedBad}>fixed wrong (unrecoverable)</span>:
            </p>
            <div className={styles.genomeReadout}>
              {bestGenome
                ? bestGenome.map((v, i) => (
                    <span key={i} className={v === FIXED_RIGHT ? styles.fixedOk : v === FIXED_WRONG ? styles.fixedBad : styles.plastic}>
                      {v === FIXED_RIGHT ? '1' : v === FIXED_WRONG ? '0' : '?'}
                      {i < bestGenome.length - 1 ? ' ' : ''}
                    </span>
                  ))
                : '— press run —'}
            </div>
          </div>
        </div>
      </div>

      <p className={styles.closingNote}>
        The 20-bit all-or-nothing lock above is the textbook demonstration, deliberately extreme so the effect is
        unambiguous to measure. Real genetic landscapes are rarely that discontinuous — most are <em>rugged</em>, with
        partial credit for partial matches, closer to the middle panel above than the right one. Rugged is enough to
        make the same point: without learning&rsquo;s help, selection has no gradient to follow.
      </p>
    </div>
  );
}
