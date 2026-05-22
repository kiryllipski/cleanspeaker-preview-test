/**
 * @schema 2.10
 * @input bars: number = 20
 * @input min_h: number = 20
 * @input max_h: number = 95
 * @input amplitude: number = 1
 * @input speed_ms: number = 70
 * @input bar_color: color = #5EE6FF
 * @input ring_color: color = #2A7BFF
 */
const bars = Math.max(6, Math.floor(pencil.input.bars));
const minH = Math.max(5, Math.min(95, pencil.input.min_h));
const maxH = Math.max(minH + 1, Math.min(100, pencil.input.max_h));
const amp = Math.max(0.2, pencil.input.amplitude);
const speed = Math.max(10, pencil.input.speed_ms);

const w = pencil.width;
const h = pencil.height;
const cx = w / 2;
const cy = h / 2;

const nodes = [];

// soft rings behind bars
nodes.push({
  id: 'ring_outer',
  type: 'ellipse',
  x: cx - 110,
  y: cy - 110,
  width: 220,
  height: 220,
  fill: { type: 'color', color: '#00000000' },
  stroke: { thickness: 1.5, fill: { type: 'color', color: pencil.input.ring_color } },
  opacity: 0.22,
});
nodes.push({
  id: 'ring_mid',
  type: 'ellipse',
  x: cx - 86,
  y: cy - 86,
  width: 172,
  height: 172,
  fill: { type: 'color', color: '#00000000' },
  stroke: { thickness: 1.5, fill: { type: 'color', color: pencil.input.ring_color } },
  opacity: 0.30,
});
nodes.push({
  id: 'ring_inner',
  type: 'ellipse',
  x: cx - 62,
  y: cy - 62,
  width: 124,
  height: 124,
  fill: { type: 'color', color: '#00000000' },
  stroke: { thickness: 1.5, fill: { type: 'color', color: pencil.input.ring_color } },
  opacity: 0.4,
});

const barsWidth = Math.min(260, w - 40);
const barGap = 4;
const barW = (barsWidth - (bars - 1) * barGap) / bars;
const startX = cx - barsWidth / 2;

for (let i = 0; i < bars; i++) {
  const t = i / Math.max(1, bars - 1);
  const wave = Math.sin(t * Math.PI * 3.3 + (i * speed) / 280);
  const norm = (wave * 0.5 + 0.5) * amp;
  const value = minH + (maxH - minH) * Math.max(0, Math.min(1, norm));
  const barH = (h * 0.42 * value) / 100;

  nodes.push({
    id: `bar_${i}`,
    type: 'rectangle',
    x: startX + i * (barW + barGap),
    y: cy + 66 - barH,
    width: barW,
    height: barH,
    cornerRadius: 6,
    fill: {
      type: 'gradient',
      gradientType: 'linear',
      rotation: 180,
      colors: [
        { color: pencil.input.bar_color, position: 0 },
        { color: '#9B6BFF', position: 1 }
      ]
    },
    opacity: 0.92,
  });
}

// center glow chip
nodes.push({
  id: 'glow',
  type: 'ellipse',
  x: cx - 34,
  y: cy - 34,
  width: 68,
  height: 68,
  fill: {
    type: 'gradient',
    gradientType: 'radial',
    colors: [
      { color: '#5EE6FFAA', position: 0 },
      { color: '#5EE6FF00', position: 1 }
    ]
  }
});

return nodes;
