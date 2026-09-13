import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const CHART_PADDING = { left: 40, right: 14, top: 14, bottom: 30 };

const COLORS = {
  chartBackground: '#ffffff',
  chartGrid: 'rgba(15, 51, 104, 0.12)',
  chartAxis: 'rgba(15, 51, 104, 0.35)',
  chartMarker: '#0f3368',
  chartText: '#4e6279',
  agents: '#2d5fba',
  carnivores: '#7d1e24',
};

const WEIGHT_LABELS = [
  ['visual_N', 'visual N'],
  ['visual_S', 'visual S'],
  ['visual_E', 'visual E'],
  ['visual_W', 'visual W'],
  ['in_tree', 'in tree'],
  ['health_norm', 'health'],
  ['energy_norm', 'energy'],
];

function chartRect(canvas) {
  return {
    left: CHART_PADDING.left,
    top: CHART_PADDING.top,
    right: canvas.width - CHART_PADDING.right,
    bottom: canvas.height - CHART_PADDING.bottom,
  };
}

function drawChartScaffold(ctx, canvas, maxValue, finalStep) {
  const rect = chartRect(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = COLORS.chartBackground;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const plotWidth = rect.right - rect.left;
  const plotHeight = rect.bottom - rect.top;
  const yTicks = 4;

  ctx.strokeStyle = COLORS.chartGrid;
  ctx.lineWidth = 1;
  for (let tick = 0; tick <= yTicks; tick += 1) {
    const ratio = tick / yTicks;
    const y = rect.bottom - ratio * plotHeight;
    ctx.beginPath();
    ctx.moveTo(rect.left, y);
    ctx.lineTo(rect.right, y);
    ctx.stroke();
  }

  ctx.strokeStyle = COLORS.chartAxis;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(rect.left, rect.top);
  ctx.lineTo(rect.left, rect.bottom);
  ctx.lineTo(rect.right, rect.bottom);
  ctx.stroke();

  ctx.fillStyle = COLORS.chartText;
  ctx.font = '11px IBM Plex Mono, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let tick = 0; tick <= yTicks; tick += 1) {
    const ratio = tick / yTicks;
    const y = rect.bottom - ratio * plotHeight;
    const value = maxValue * ratio;
    ctx.fillText(Math.round(value).toString(), rect.left - 8, y);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('0', rect.left, rect.bottom + 8);
  ctx.fillText(Number(finalStep || 0).toLocaleString(), rect.right, rect.bottom + 8);

  return rect;
}

function drawSeries(ctx, rect, points, valueIndex, color, maxValue, maxStep) {
  if (!points || !points.length) {
    return;
  }
  const plotWidth = rect.right - rect.left;
  const plotHeight = rect.bottom - rect.top;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  points.forEach((point, index) => {
    const x = rect.left + (point[0] / Math.max(1, maxStep)) * plotWidth;
    const y = rect.bottom - (point[valueIndex] / Math.max(maxValue, 1e-9)) * plotHeight;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

function drawChart(canvas, population, step) {
  const ctx = canvas.getContext('2d');
  const finalStep = population[population.length - 1][0];
  const maxAgents = Math.max.apply(null, population.map((p) => p[1]));
  const maxValue = Math.ceil(maxAgents / 100) * 100;

  const rect = drawChartScaffold(ctx, canvas, maxValue, finalStep);
  drawSeries(ctx, rect, population, 1, COLORS.agents, maxValue, finalStep);
  drawSeries(ctx, rect, population, 2, COLORS.carnivores, maxValue, finalStep);

  const plotWidth = rect.right - rect.left;
  const markerX = rect.left + (Number(step) / Math.max(1, finalStep)) * plotWidth;

  ctx.strokeStyle = COLORS.chartMarker;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(markerX, rect.top);
  ctx.lineTo(markerX, rect.bottom);
  ctx.stroke();
  ctx.setLineDash([]);
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

export default function FounderEffectReplay() {
  const basePath = useBaseUrl('/learning-selection-interaction/founder-effect/');
  const chartCanvasRef = useRef(null);
  const preloadedRef = useRef({});

  const [data, setData] = useState(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [framesPerSecond, setFramesPerSecond] = useState(12);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    let cancelled = false;
    loadJson(`${basePath}data.json`)
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setErrorText(String(error));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [basePath]);

  const frames = data ? data.frames : [];
  const population = data ? data.population : [];
  const frameCount = frames.length;

  useEffect(() => {
    if (!playing || frameCount === 0) {
      return undefined;
    }
    const timerId = window.setInterval(() => {
      setCurrentFrameIndex((previous) => Math.min(previous + 1, frameCount - 1));
    }, 1000 / framesPerSecond);
    return () => {
      window.clearInterval(timerId);
    };
  }, [playing, frameCount, framesPerSecond]);

  useEffect(() => {
    if (!playing || frameCount === 0) {
      return;
    }
    if (currentFrameIndex >= frameCount - 1) {
      setPlaying(false);
    }
  }, [currentFrameIndex, frameCount, playing]);

  useEffect(() => {
    if (!frameCount) {
      return;
    }
    const preload = (index) => {
      if (index < 0 || index >= frameCount || preloadedRef.current[index]) {
        return;
      }
      const img = new Image();
      img.src = `${basePath}frames/${frames[index][1]}`;
      preloadedRef.current[index] = img;
    };
    preload(currentFrameIndex + 1);
    preload(currentFrameIndex + 2);
  }, [currentFrameIndex, frameCount, frames, basePath]);

  useEffect(() => {
    if (!population.length || !chartCanvasRef.current || !frames[currentFrameIndex]) {
      return;
    }
    drawChart(chartCanvasRef.current, population, frames[currentFrameIndex][0]);
  }, [currentFrameIndex, population, frames]);

  const currentFrame = frames[currentFrameIndex];
  const currentStep = currentFrame ? currentFrame[0] : 0;
  const finalStep = frameCount ? frames[frameCount - 1][0] : 0;
  const frameIndexLabel = frameCount ? `${currentFrameIndex + 1} / ${frameCount}` : '0 / 0';
  const stepLabel = `Step ${Number(currentStep).toLocaleString()} / ${Number(finalStep).toLocaleString()}`;
  const isFinal = frameCount > 0 && currentFrameIndex === frameCount - 1;
  const viewerCaption = errorText
    || (isFinal ? 'Final frame — population 499, carnivores 30.' : `Strategy L, seed ${data ? data.seed : ''} — evolution off, RL learning only.`);

  const maxWeight = data
    ? Math.max(...WEIGHT_LABELS.map(([key]) => data.eval_weights[key]))
    : 1;

  return (
    <div className={styles.pageShell}>
      {errorText ? <p className={styles.errorText}>{errorText}</p> : null}

      <div className={styles.layout}>
        <section className={`${styles.card} ${styles.viewerCard}`}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Replay</p>
              <h3 className={styles.cardTitle}>World State</h3>
            </div>
          </div>

          <div className={styles.controlRow}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              type="button"
              onClick={() => setPlaying((previous) => !previous)}
              disabled={frameCount === 0}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              type="button"
              onClick={() => {
                setPlaying(false);
                setCurrentFrameIndex(0);
              }}
              disabled={frameCount === 0}
            >
              Restart
            </button>
            <label className={styles.field}>
              <span>Playback</span>
              <select
                className={styles.select}
                value={String(framesPerSecond)}
                onChange={(event) => setFramesPerSecond(Number(event.target.value))}
                disabled={frameCount === 0}
              >
                <option value="4">4 fps</option>
                <option value="8">8 fps</option>
                <option value="12">12 fps</option>
                <option value="16">16 fps</option>
                <option value="24">24 fps</option>
              </select>
            </label>
          </div>

          <div className={styles.sliderRow}>
            <label htmlFor="founder-effect-frame-slider">Frame</label>
            <input
              id="founder-effect-frame-slider"
              className={styles.rangeInput}
              type="range"
              min="0"
              max={String(Math.max(0, frameCount - 1))}
              value={String(Math.min(currentFrameIndex, Math.max(0, frameCount - 1)))}
              step="1"
              onChange={(event) => {
                setPlaying(false);
                setCurrentFrameIndex(Number(event.target.value));
              }}
              disabled={frameCount === 0}
            />
            <span className={styles.frameIndexLabel}>{frameIndexLabel}</span>
          </div>

          {currentFrame ? (
            <img
              className={styles.worldImage}
              src={`${basePath}frames/${currentFrame[1]}`}
              alt={`Grid state at step ${currentStep}`}
            />
          ) : (
            <div className={styles.worldImage} />
          )}

          <div className={styles.viewerFooter}>
            <p className={styles.monoText}>{stepLabel}</p>
            <p className={styles.viewerCaption}>{viewerCaption}</p>
          </div>
        </section>

        <div className={styles.sidebarColumn}>
          <section className={`${styles.card} ${styles.chartCard}`}>
            <div className={`${styles.cardHeader} ${styles.cardHeaderCompact}`}>
              <div>
                <h3 className={styles.cardTitle}>Population</h3>
                <p className={styles.chartSubtitle}>Agents &amp; carnivores over time</p>
              </div>
            </div>

            <canvas
              ref={chartCanvasRef}
              className={styles.chartCanvas}
              width="420"
              height="200"
              aria-label="Population history"
            />

            <div className={styles.legendBlock} style={{ marginTop: '0.75rem' }}>
              <div className={styles.legendRow}>
                <span className={`${styles.swatch} ${styles.swatchAgents}`} />
                <span>Agents</span>
              </div>
              <div className={styles.legendRow}>
                <span className={`${styles.swatch} ${styles.swatchCarnivores}`} />
                <span>Carnivores</span>
              </div>
            </div>
          </section>

          <aside className={`${styles.card} ${styles.legendCard}`}>
            <div className={styles.cardHeader}>
              <div>
                <p className={styles.sectionEyebrow}>Source genome</p>
                <h3 className={styles.cardTitle}>eval_weights</h3>
              </div>
            </div>

            <div className={styles.weightsBlock}>
              {data
                ? WEIGHT_LABELS.map(([key, label]) => {
                  const value = data.eval_weights[key];
                  const pct = maxWeight > 0 ? (value / maxWeight) * 100 : 0;
                  return (
                    <div className={styles.weightRow} key={key}>
                      <span>{label}</span>
                      <span className={styles.weightBarTrack}>
                        <span className={styles.weightBarFill} style={{ width: `${pct}%` }} />
                      </span>
                      <span className={styles.weightValue}>{value.toFixed(2)}</span>
                    </div>
                  );
                })
                : null}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
