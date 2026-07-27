import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

/**
 * Left/right mindmap rendered client-side. `markmap-lib` only parses the
 * markdown outline into a content tree; layout, folding, pan/zoom and
 * rendering are done with a small custom implementation.
 *
 * Each top-level branch is pinned to a side (left or right of the root) and
 * given a fixed vertical band sized from its *fully expanded* extent, not
 * its currently visible extent. That band position never moves as nodes
 * elsewhere are folded/unfolded, so expanding a node only grows its own
 * branch locally instead of reflowing the whole diagram.
 */
const BRANCH_COLORS = [
  '#e6550d', '#8e44ad', '#2980b9', '#27ae60', '#d35400',
  '#c0392b', '#16a085', '#8c564b', '#e84393', '#7f8c8d',
  '#f39c12', '#2c3e50', '#00b894',
];

const LEVEL_RADIUS = 240;
const VERTICAL_GAP = 14;
const MIN_SCALE = 0.3;
const MAX_SCALE = 3;
const ROOT_RX = 115;
const ROOT_RY = 28;
const NODE_BOX_WIDTH = 220;

// Labels vary a lot in length (plain topic vs. a topic plus a citation), and
// with wrapping enabled a long label needs more vertical room than a short
// one. Without this, long text would either overflow its fixed-height box
// (spilling into neighboring nodes) or force every box to be tall enough
// for the worst case. Estimate from stripped plain text since `content` is
// markmap's HTML (links, <code>, etc.).
function estimateBoxHeight(html, depth) {
  if (depth === 0) return 44;
  const fontSize = fontSizeForDepth(depth);
  const text = html.replace(/<[^>]+>/g, '');
  const charsPerLine = Math.max(10, Math.floor(NODE_BOX_WIDTH / (fontSize * 0.56)));
  const lines = Math.max(1, Math.ceil(text.length / charsPerLine));
  return Math.max(34, lines * fontSize * 1.3 + 12);
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

// Point on the root hub's ellipse boundary in the direction of (tx, ty).
function rootBoundaryPoint(tx, ty) {
  const angle = Math.atan2(ty, tx);
  return [ROOT_RX * Math.cos(angle), ROOT_RY * Math.sin(angle)];
}

// Bottom-up pass: gives every node a `_extent` (total vertical space its
// subtree needs) and a `_center` (that node's own vertical offset within
// its subtree's block), and each child a `_top` (offset from the top of the
// parent's block). Mutates `node` in place; returns the extent.
function computeExtent(node, depth) {
  const minExtent = estimateBoxHeight(node.content, depth) + VERTICAL_GAP;
  if (!node.children || node.children.length === 0) {
    node._extent = minExtent;
    node._center = node._extent / 2;
    return node._extent;
  }
  let cursor = 0;
  node.children.forEach((child) => {
    const extent = computeExtent(child, depth + 1);
    child._top = cursor;
    cursor += extent;
  });
  const childrenExtent = cursor;
  const padding = Math.max(0, minExtent - childrenExtent) / 2;
  if (padding > 0) {
    node.children.forEach((child) => {
      child._top += padding;
    });
  }
  node._extent = Math.max(childrenExtent, minExtent);
  const first = node.children[0];
  const last = node.children[node.children.length - 1];
  node._center = (first._top + first._center + last._top + last._center) / 2;
  return node._extent;
}

// Top-down pass: turns each node's relative `_top`/`_center` into absolute
// (cx, cy) coordinates. `dirSign` is +1 for the right side, -1 for the left.
function assignPositions(node, depth, top, dirSign) {
  node.depth = depth;
  node.cy = top + node._center;
  node.cx = dirSign * LEVEL_RADIUS * depth;
  (node.children || []).forEach((child) => {
    assignPositions(child, depth + 1, top + child._top, dirSign);
  });
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
      // Start with every node that has children collapsed, so unfolding one
      // node reveals only its direct children, not the whole subtree.
      const allCollapsed = new Set();
      const collectCollapsible = (node, path) => {
        if (node.children.length === 0) return;
        allCollapsed.add(path);
        node.children.forEach((child, i) => collectCollapsible(child, `${path}.${i}`));
      };
      root.children.forEach((child, i) => collectCollapsible(child, `root.${i}`));
      setCollapsed(allCollapsed);
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
    if (!rawRoot) return null;

    // markmap-lib's Transformer only produces `content`/`children`; it does
    // not assign node ids (that happens inside markmap-view's own renderer,
    // which we don't use here), so keys are derived from each node's tree path.
    const buildVisible = (node, color, path) => ({
      key: path,
      content: node.content,
      color,
      hasChildren: node.children.length > 0,
      children: collapsed.has(path)
        ? []
        : node.children.map((child, i) => buildVisible(child, color, `${path}.${i}`)),
    });

    const branchesVisible = rawRoot.children.map((child, i) =>
      buildVisible(child, BRANCH_COLORS[i % BRANCH_COLORS.length], `root.${i}`),
    );

    branchesVisible.forEach((b) => computeExtent(b, 1));

    // Alternate branches between the right and left side of the root. A
    // branch's side never changes, and expanding/collapsing a node only
    // resizes its own band and shifts branches *after* it on the same
    // side — the opposite side is never touched.
    const rightIdx = [];
    const leftIdx = [];
    branchesVisible.forEach((_, i) => (i % 2 === 0 ? rightIdx : leftIdx).push(i));

    const positionSide = (idxList, dirSign) => {
      const total = idxList.reduce((sum, i) => sum + branchesVisible[i]._extent, 0);
      let top = -total / 2;
      idxList.forEach((i) => {
        assignPositions(branchesVisible[i], 1, top, dirSign);
        top += branchesVisible[i]._extent;
      });
    };
    positionSide(rightIdx, 1);
    positionSide(leftIdx, -1);

    const visibleRoot = {
      key: 'root',
      content: rawRoot.content,
      color: null,
      hasChildren: rawRoot.children.length > 0,
      children: branchesVisible,
      depth: 0,
      cx: 0,
      cy: 0,
    };

    const descendants = [];
    const links = [];
    const walk = (node, parent) => {
      descendants.push(node);
      if (parent) links.push({ source: parent, target: node });
      (node.children || []).forEach((child) => walk(child, node));
    };
    walk(visibleRoot, null);

    let minX = -ROOT_RX;
    let maxX = ROOT_RX;
    let minY = -ROOT_RY;
    let maxY = ROOT_RY;
    descendants.forEach((n) => {
      if (n.depth === 0) return;
      const left = n.cx >= 0 ? n.cx : n.cx - NODE_BOX_WIDTH - 20;
      const right = n.cx >= 0 ? n.cx + NODE_BOX_WIDTH + 20 : n.cx;
      minX = Math.min(minX, left);
      maxX = Math.max(maxX, right);
      minY = Math.min(minY, n.cy - 30);
      maxY = Math.max(maxY, n.cy + 30);
    });

    return { descendants, links, bounds: { minX, maxX, minY, maxY } };
  }, [rawRoot, collapsed]);

  // Fit the whole diagram inside the container on first render / data change.
  useEffect(() => {
    if (!layout || fitted) return;
    const padding = 60;
    const { minX, maxX, minY, maxY } = layout.bounds;
    const neededW = maxX - minX + padding * 2;
    const neededH = maxY - minY + padding * 2;
    const scale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, Math.min(size.width / neededW, size.height / neededH)),
    );
    const k = scale || 1;
    setTransform({ x: -((minX + maxX) / 2) * k, y: -((minY + maxY) / 2) * k, k });
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

  // First-level links leave the elliptical hub's boundary (in the direction
  // of their target) instead of the exact center point.
  const linkPath = (link) => {
    const tx = link.target.cx;
    const ty = link.target.cy;
    if (link.source.depth === 0) {
      const [sx, sy] = rootBoundaryPoint(tx, ty);
      const mx = (sx + tx) / 2;
      return `M${sx},${sy} Q${mx},${sy} ${tx},${ty}`;
    }
    const sx = link.source.cx;
    const sy = link.source.cy;
    const mx = (sx + tx) / 2;
    return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
  };

  return (
    <div ref={containerRef} className={styles.container} style={{ height }}>
      <svg ref={svgRef} viewBox={viewBox} className={styles.svg}>
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          {layout &&
            layout.links.map((link) => (
              <path
                key={`${link.source.key}-${link.target.key}`}
                d={linkPath(link)}
                className={styles.link}
                stroke={link.target.color || 'var(--ifm-color-emphasis-500)'}
              />
            ))}
          {layout &&
            layout.descendants.map((node) => {
              const depth = node.depth;
              const isCollapsedWithChildren = node.hasChildren && node.children.length === 0;
              const isRight = depth === 0 || node.cx >= 0;
              const boxWidth = NODE_BOX_WIDTH;
              const boxHeight = estimateBoxHeight(node.content, depth);
              const gap = depth === 0 ? 0 : 12;
              const boxX = depth === 0 ? -boxWidth / 2 : isRight ? gap : -gap - boxWidth;
              return (
                <g
                  key={node.key}
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
                  ) : node.hasChildren ? (
                    <circle
                      r={7}
                      className={styles.foldCircle}
                      fill={
                        isCollapsedWithChildren
                          ? node.color || 'var(--ifm-color-primary)'
                          : 'var(--ifm-background-surface-color)'
                      }
                      stroke={node.color || 'var(--ifm-color-primary)'}
                      strokeWidth={2}
                      onClick={() => toggle(node.key)}
                    />
                  ) : (
                    <circle r={3} fill={node.color || 'var(--ifm-color-emphasis-500)'} />
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
                      dangerouslySetInnerHTML={{ __html: node.content }}
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
