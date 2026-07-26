import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

/**
 * True radial (360-degree) mindmap rendered client-side. `markmap-lib` only
 * parses the markdown outline into a content tree; layout, folding, pan/zoom
 * and rendering are done with a small custom D3 radial-tree implementation,
 * since markmap-view's own renderer only lays out trees left-to-right.
 */
const BRANCH_COLORS = [
  '#e6550d', '#8e44ad', '#2980b9', '#27ae60', '#d35400',
  '#c0392b', '#16a085', '#8c564b', '#e84393', '#7f8c8d',
  '#f39c12', '#2c3e50', '#00b894',
];

const LEVEL_RADIUS = 240;
const MIN_SCALE = 0.3;
const MAX_SCALE = 3;
const ROOT_RX = 115;
const ROOT_RY = 28;
const NODE_BOX_WIDTH = 220;

// Labels vary a lot in length (plain topic vs. a topic plus a citation), and
// with wrapping enabled a long label needs more vertical room than a short
// one. Without this, long text would either overflow its fixed-height box
// (spilling into neighboring nodes and covering their fold targets) or force
// every box to be tall enough for the worst case. Estimate from stripped
// plain text since `content` is markmap's HTML (links, <code>, etc.).
function estimateBoxHeight(html, depth) {
  if (depth === 0) return 44;
  const fontSize = fontSizeForDepth(depth);
  const text = html.replace(/<[^>]+>/g, '');
  const charsPerLine = Math.max(10, Math.floor(NODE_BOX_WIDTH / (fontSize * 0.56)));
  const lines = Math.max(1, Math.ceil(text.length / charsPerLine));
  return Math.max(34, lines * fontSize * 1.3 + 12);
}

// Point on the root hub's boundary in the direction of `angle` (same polar
// convention as d3.linkRadial: 0 = up, increasing clockwise).
function hubBoundaryPoint(angle) {
  return [ROOT_RX * Math.sin(angle), -ROOT_RY * Math.cos(angle)];
}

function fontSizeForDepth(depth) {
  if (depth === 0) return 19;
  if (depth === 1) return 15;
  if (depth === 2) return 13;
  return 12;
}

function fontWeightForDepth(depth) {
  return depth <= 1 ? 700 : 400;
}

function RadialMindmapCanvas({ markdown, height }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const zoomRef = useRef(null);

  const [d3, setD3] = useState(null);
  const [rawRoot, setRawRoot] = useState(null);
  const [collapsed, setCollapsed] = useState(() => new Set());
  const [size, setSize] = useState({ width: 900, height: 720 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [fitted, setFitted] = useState(false);

  // Parse the markdown outline into a plain node tree (once per markdown prop).
  useEffect(() => {
    let disposed = false;
    (async () => {
      const [{ Transformer }, d3lib] = await Promise.all([
        import('markmap-lib'),
        import('d3'),
      ]);
      if (disposed) return;
      const transformer = new Transformer();
      const { root } = transformer.transform(markdown);
      setD3(() => d3lib);
      setRawRoot(root);
      // Start with only the branch headers visible; deeper nodes reveal on click.
      setCollapsed(new Set(root.children.map((_, i) => `root.${i}`)));
      setFitted(false);
    })();
    return () => {
      disposed = true;
    };
  }, [markdown]);

  // Track container size so the diagram is centered and can auto-fit.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height: h } = entry.contentRect;
        if (width > 0 && h > 0) setSize({ width, height: h });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (key) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const layout = useMemo(() => {
    if (!rawRoot || !d3) return null;

    // markmap-lib's Transformer only produces `content`/`children`; it does not
    // assign node ids (that happens inside markmap-view's own renderer, which
    // we don't use here), so keys are derived from each node's tree path.
    const buildVisible = (node, color, path) => ({
      key: path,
      content: node.content,
      color,
      hasChildren: node.children.length > 0,
      children: collapsed.has(path)
        ? []
        : node.children.map((child, i) => buildVisible(child, color, `${path}.${i}`)),
    });

    const visibleRoot = {
      key: 'root',
      content: rawRoot.content,
      color: null,
      hasChildren: rawRoot.children.length > 0,
      children: rawRoot.children.map((child, i) =>
        buildVisible(child, BRANCH_COLORS[i % BRANCH_COLORS.length], `root.${i}`),
      ),
    };

    const hierarchyRoot = d3.hierarchy(visibleRoot);
    const maxRadius = Math.max(1, hierarchyRoot.height) * LEVEL_RADIUS;
    const tree = d3
      .tree()
      .size([2 * Math.PI, maxRadius])
      .separation((a, b) => (a.parent === b.parent ? 2.6 : 3.8) / a.depth);
    tree(hierarchyRoot);

    hierarchyRoot.each((d) => {
      const angle = d.x - Math.PI / 2;
      d.cx = d.y * Math.cos(angle);
      d.cy = d.y * Math.sin(angle);
    });

    return { hierarchyRoot, maxRadius };
  }, [rawRoot, collapsed, d3]);

  // Fit the whole diagram inside the container on first render / data change.
  useEffect(() => {
    if (!layout || fitted) return;
    const padding = 90;
    const needed = layout.maxRadius * 2 + padding * 2;
    const scale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, Math.min(size.width, size.height) / needed),
    );
    setTransform({ x: 0, y: 0, k: scale || 1 });
    setFitted(true);
  }, [layout, size, fitted]);

  // Wire up d3-zoom for pan/scroll-zoom, keeping React state as the source of truth.
  useEffect(() => {
    if (!d3 || !svgRef.current) return;
    const svgSel = d3.select(svgRef.current);
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([MIN_SCALE, MAX_SCALE])
      .filter((event) => !event.button && event.type !== 'dblclick')
      .on('zoom', (event) => {
        const { x, y, k } = event.transform;
        setTransform({ x, y, k });
      });
    zoomRef.current = zoomBehavior;
    svgSel.call(zoomBehavior);
    return () => {
      svgSel.on('.zoom', null);
    };
  }, [d3]);

  // Keep d3-zoom's internal transform in sync when we programmatically fit.
  useEffect(() => {
    if (!d3 || !svgRef.current || !zoomRef.current) return;
    const identity = d3.zoomIdentity.translate(transform.x, transform.y).scale(transform.k);
    d3.select(svgRef.current).call(zoomRef.current.transform, identity);
    // Only sync when the fit computation changes the transform, not on every drag tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d3, fitted]);

  const viewBox = `${-size.width / 2} ${-size.height / 2} ${size.width} ${size.height}`;
  const linkGenerator = d3
    ? d3.linkRadial().angle((d) => d.x).radius((d) => d.y)
    : null;

  // First-level links leave the elliptical hub's boundary (at their own
  // target's angle) instead of the exact center point, which is what made
  // every ray appear to converge on a single pixel.
  const rootLinkPath = (link) => {
    const [sx, sy] = hubBoundaryPoint(link.target.x);
    const [tx, ty] = [link.target.cx, link.target.cy];
    const [mx, my] = [tx * 0.6, ty * 0.6];
    return `M${sx},${sy} Q${mx},${my} ${tx},${ty}`;
  };

  return (
    <div ref={containerRef} className={styles.container} style={{ height }}>
      <svg ref={svgRef} viewBox={viewBox} className={styles.svg}>
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {layout &&
            linkGenerator &&
            layout.hierarchyRoot
              .links()
              .map((link) => (
                <path
                  key={`${link.source.data.key}-${link.target.data.key}`}
                  d={link.source.depth === 0 ? rootLinkPath(link) : linkGenerator(link)}
                  className={styles.link}
                  stroke={link.target.data.color || 'var(--ifm-color-emphasis-500)'}
                />
              ))}
          {layout &&
            layout.hierarchyRoot.descendants().map((node) => {
              const depth = node.depth;
              const isCollapsedWithChildren =
                node.data.hasChildren && node.data.children.length === 0;
              const isRight = depth === 0 || node.cx >= 0;
              const boxWidth = NODE_BOX_WIDTH;
              const boxHeight = estimateBoxHeight(node.data.content, depth);
              const gap = depth === 0 ? 0 : 12;
              const boxX = depth === 0 ? -boxWidth / 2 : isRight ? gap : -gap - boxWidth;
              return (
                <g
                  key={node.data.key}
                  transform={`translate(${node.cx},${node.cy})`}
                  className={styles.node}
                >
                  {depth === 0 ? (
                    <ellipse
                      rx={ROOT_RX}
                      ry={ROOT_RY}
                      fill="var(--ifm-background-surface-color)"
                      stroke="var(--ifm-color-primary)"
                      strokeWidth={2}
                    />
                  ) : node.data.hasChildren ? (
                    <circle
                      r={7}
                      className={styles.foldCircle}
                      fill={
                        isCollapsedWithChildren
                          ? node.data.color || 'var(--ifm-color-primary)'
                          : 'var(--ifm-background-surface-color)'
                      }
                      stroke={node.data.color || 'var(--ifm-color-primary)'}
                      strokeWidth={2}
                      onClick={() => toggle(node.data.key)}
                    />
                  ) : (
                    <circle r={3} fill={node.data.color || 'var(--ifm-color-emphasis-500)'} />
                  )}
                  <foreignObject
                    x={boxX}
                    y={-boxHeight / 2}
                    width={boxWidth}
                    height={boxHeight}
                    className={styles.foreignObject}
                  >
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      className={styles.content}
                      style={{
                        fontSize: fontSizeForDepth(depth),
                        fontWeight: fontWeightForDepth(depth),
                        justifyContent: depth === 0 ? 'center' : isRight ? 'flex-start' : 'flex-end',
                        textAlign: depth === 0 ? 'center' : isRight ? 'left' : 'right',
                      }}
                      dangerouslySetInnerHTML={{ __html: node.data.content }}
                    />
                  </foreignObject>
                </g>
              );
            })}
        </g>
      </svg>
    </div>
  );
}

export default function InteractionMindmap({ markdown, height = '720px' }) {
  return (
    <BrowserOnly fallback={<div className={styles.container} style={{ height }} />}>
      {() => <RadialMindmapCanvas markdown={markdown} height={height} />}
    </BrowserOnly>
  );
}
