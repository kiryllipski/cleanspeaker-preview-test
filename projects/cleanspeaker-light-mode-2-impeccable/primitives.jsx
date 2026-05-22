/* ============================================================
   primitives.jsx — CleanSpeaker reusable components
   All components attached to window at the bottom.
   ============================================================ */

const { useState, useEffect, useRef, useMemo } = React;

/* ──────────────────────────────────────────────────────────
   ICONS — all return SVG, size-aware. Stroke 1.6 default.
   ────────────────────────────────────────────────────────── */
const ICONS = {
  back: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  ),
  chev: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  close: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  check: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5L20 7" />
    </svg>
  ),
  water: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c4 5 6 8.5 6 11.5a6 6 0 1 1-12 0C6 11.5 8 8 12 3z" />
    </svg>
  ),
  dust: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="6" cy="9" r="1.4" />
      <circle cx="12" cy="6" r="1" />
      <circle cx="18" cy="10" r="1.4" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="17" r="1.4" />
      <circle cx="6" cy="18" r="1" />
    </svg>
  ),
  volume: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16 8a5 5 0 0 1 0 8" />
      <path d="M19 5a9 9 0 0 1 0 14" />
    </svg>
  ),
  wave: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
    </svg>
  ),
  vibration: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M3 9v6M21 9v6M5 11v2M19 11v2" />
    </svg>
  ),
  headset: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a8 8 0 1 1 16 0" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </svg>
  ),
  lock: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  sparkle: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
    </svg>
  ),
  question: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  ),
  play: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  ),
  stop: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ),
  shield: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    </svg>
  ),
  bolt: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L5 14h6l-2 8 9-13h-6l1-7z" />
    </svg>
  ),
  flip: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M10 7h4" />
    </svg>
  ),
  noheads: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a8 8 0 0 1 16 0" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
      <path d="M3 3l18 18" stroke="#EF4444" />
    </svg>
  ),
  cone: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  star: (s = 22, filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7L12 3z" />
    </svg>
  ),
  refresh: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  settings: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
  crown: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 8l4 4 5-7 5 7 4-4-1 11H4L3 8z" />
    </svg>
  ),
  audio: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="2" height="6" rx="1" />
      <rect x="7" y="6" width="2" height="12" rx="1" />
      <rect x="11" y="3" width="2" height="18" rx="1" />
      <rect x="15" y="7" width="2" height="10" rx="1" />
      <rect x="19" y="10" width="2" height="4" rx="1" />
    </svg>
  ),
};

/* ──────────────────────────────────────────────────────────
   CSStatusBar — Android style minimal status bar
   ────────────────────────────────────────────────────────── */
function CSStatusBar({ light = false }) {
  const color = light ? '#0B1220' : '#0B1220';
  return (
    <div style={{
      height: 38, padding: '0 22px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color, flexShrink: 0,
    }}>
      <div style={{
        fontFamily: 'var(--f-mono)', fontWeight: 600, fontSize: 13,
        letterSpacing: '-0.01em',
      }}>9:41</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.85 }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M1 9h2v1H1zM4.5 7h2v3h-2zM8 5h2v5H8zM11.5 3h2v7h-2z" fill={color} />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 1.5C4.4 1.5 2.1 2.5.3 4.1l.6.7C2.5 3.3 4.7 2.4 7 2.4s4.5.9 6.1 2.4l.6-.7C11.9 2.5 9.6 1.5 7 1.5z" fill={color} />
          <path d="M7 4.3C5.2 4.3 3.5 5 2.2 6.1l.7.7C4 5.9 5.4 5.2 7 5.2s3 .7 4.1 1.6l.7-.7C10.5 5 8.8 4.3 7 4.3z" fill={color} />
          <circle cx="7" cy="8.2" r="1" fill={color} />
        </svg>
        <div style={{
          width: 22, height: 11, border: `1.2px solid ${color}`, borderRadius: 3, position: 'relative', opacity: 0.75,
        }}>
          <div style={{ position: 'absolute', inset: 1.5, width: '76%', background: color, borderRadius: 1.5 }} />
          <div style={{ position: 'absolute', right: -3, top: 3, width: 2, height: 5, background: color, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   CSHeader — back / title / right slot
   ────────────────────────────────────────────────────────── */
function CSHeader({ onBack, title, right, light }) {
  return (
    <div style={{
      height: 56, padding: '0 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color: light ? '#0B1220' : 'var(--fg-0)', flexShrink: 0,
    }}>
      {onBack ? (
        <button className="icon-btn" onClick={onBack} aria-label="Back">{ICONS.back()}</button>
      ) : <span style={{ width: 38 }} />}
      <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ minWidth: 38, display: 'flex', justifyContent: 'flex-end' }}>{right || null}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Progress — step indicator (filled dashes)
   ────────────────────────────────────────────────────────── */
function Progress({ steps, current }) {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < current ? 'var(--fg-0)' : 'var(--bg-3)',
          transition: 'background 240ms var(--ease)',
        }} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   OptionRow — large selectable row
   ────────────────────────────────────────────────────────── */
function OptionRow({ icon, title, subtitle, active, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 14,
        width: '100%', boxSizing: 'border-box',
        padding: '17px 18px',
        borderRadius: 16,
        background: 'var(--bg-1)',
        color: 'var(--fg-0)',
        outline: active ? '2px solid var(--cy-1)' : 'none',
        outlineOffset: active ? '-2px' : 0,
        border: '1px solid ' + (active ? 'transparent' : 'var(--hairline)'),
        transition: 'outline 180ms var(--ease), border 180ms var(--ease), transform 120ms var(--ease)',
        boxShadow: active ? '0 6px 18px rgba(10,132,255,0.14)' : 'none',
        ...style,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.985)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: active ? 'var(--cy-1)' : 'var(--bg-2)',
        color: active ? '#fff' : 'var(--cy-1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 180ms var(--ease), color 180ms var(--ease)',
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, marginTop: 2, color: 'var(--fg-2)' }}>{subtitle}</div>}
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        border: '1.5px solid ' + (active ? 'transparent' : 'var(--hairline-3)'),
        background: active ? 'var(--cy-1)' : 'transparent',
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 180ms var(--ease), border 180ms var(--ease)',
      }}>
        {active && ICONS.check(14)}
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   GlowOrb — animated breathing canvas orb (ambient hero)
   ────────────────────────────────────────────────────────── */
function GlowOrb({ size = 240, intensity = 1, color = '#0A84FF', glow = '#38BDF8' }) {
  const ref = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    cv.width = size * dpr;
    cv.height = size * dpr;
    cv.style.width = size + 'px';
    cv.style.height = size + 'px';
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);

    let raf, start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      tRef.current = t;
      const cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);

      // outer halo
      const halo = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 0.5);
      halo.addColorStop(0, hexA(glow, 0.30 * intensity));
      halo.addColorStop(0.5, hexA(color, 0.10 * intensity));
      halo.addColorStop(1, hexA(color, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // orbit rings
      for (let i = 0; i < 3; i++) {
        const phase = t * 0.5 + i * 0.8;
        const r = size * 0.22 + i * 18 + Math.sin(phase) * 2;
        ctx.strokeStyle = hexA(color, 0.10 - i * 0.025);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // breathing core
      const breath = 1 + Math.sin(t * 1.4) * 0.05;
      const coreR = size * 0.16 * breath;
      const core = ctx.createRadialGradient(cx - coreR * 0.3, cy - coreR * 0.4, 0, cx, cy, coreR);
      core.addColorStop(0, '#FFFFFF');
      core.addColorStop(0.4, hexA(glow, 0.85));
      core.addColorStop(1, hexA(color, 0.45));
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // highlight specular
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.beginPath();
      ctx.arc(cx - coreR * 0.35, cy - coreR * 0.45, coreR * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // emitted ripples
      for (let i = 0; i < 2; i++) {
        const p = ((t * 0.6) + i * 0.5) % 1;
        const rr = coreR + p * (size * 0.32);
        ctx.strokeStyle = hexA(glow, (1 - p) * 0.35);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [size, intensity, color, glow]);

  return <canvas ref={ref} style={{ display: 'block' }} />;
}

function hexA(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ──────────────────────────────────────────────────────────
   Waveform — RAF-driven sine wave
   ────────────────────────────────────────────────────────── */
function Waveform({ width = 320, height = 70, color = '#0A84FF', amplitude = 1, animate = true }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let raf, start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const points = useMemo(() => {
    const n = 80;
    const arr = [];
    for (let i = 0; i <= n; i++) {
      const x = (i / n) * width;
      const env = Math.sin((i / n) * Math.PI); // envelope
      const y = height / 2 + Math.sin((i / n) * 8 + t * 3) * (height * 0.35) * env * amplitude;
      arr.push([x, y]);
    }
    return arr.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  }, [t, width, height, amplitude]);

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="wf-grad" x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="0.5" stopColor={color} stopOpacity="1" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={points} stroke="url(#wf-grad)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   ProgressRing — SVG ring with animated stroke-dashoffset
   ────────────────────────────────────────────────────────── */
function ProgressRing({ size = 220, stroke = 12, progress = 0, color = '#0A84FF', track = '#E3EBF4', label, sublabel, center }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={`pr-${size}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#38BDF8" />
            <stop offset="1" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={`url(#pr-${size})`} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 600ms var(--ease)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {center || (
          <>
            {label && <div className="t-mono" style={{ fontSize: 42, fontWeight: 600, letterSpacing: '-0.02em' }}>{label}</div>}
            {sublabel && <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 6 }}>{sublabel}</div>}
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   CircularDial — frequency dial with tick marks
   ────────────────────────────────────────────────────────── */
function CircularDial({ size = 240, value = 450, min = 100, max = 1000, label = 'Hz' }) {
  const stroke = 10;
  const r = (size - stroke) / 2 - 16;
  const cx = size / 2, cy = size / 2;
  // Arc spans from 135° to 405° (i.e. 270° span, bottom open)
  const startA = (135 * Math.PI) / 180;
  const sweep  = (270 * Math.PI) / 180;
  const progress = Math.min(1, Math.max(0, (value - min) / (max - min)));

  const polar = (a, rad) => [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad];

  const arcPath = (frac) => {
    const a0 = startA;
    const a1 = startA + sweep * frac;
    const [x0, y0] = polar(a0, r);
    const [x1, y1] = polar(a1, r);
    const large = sweep * frac > Math.PI ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  };

  const tickCount = 44;
  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const t = i / tickCount;
    const a = startA + sweep * t;
    const [x1, y1] = polar(a, r - 14);
    const [x2, y2] = polar(a, r - 4);
    const active = t <= progress;
    ticks.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={active ? 'var(--cy-1)' : 'var(--hairline-3)'} strokeWidth="2" strokeLinecap="round"
      />
    );
  }

  const [thumbX, thumbY] = polar(startA + sweep * progress, r);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <path d={arcPath(1)} stroke="var(--bg-3)" strokeWidth={stroke} fill="none" strokeLinecap="round" />
        <path d={arcPath(progress)} stroke="var(--cy-1)" strokeWidth={stroke} fill="none" strokeLinecap="round"
          style={{ transition: 'd 320ms var(--ease)' }} />
        {ticks}
        <circle cx={thumbX} cy={thumbY} r={stroke / 2 + 4} fill="#fff" stroke="var(--cy-1)" strokeWidth="2.5" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div className="t-mono" style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-2)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   HapticPulse — vibration intensity bars
   ────────────────────────────────────────────────────────── */
function HapticPulse({ intensity = 0.5, animate = true, width = 280 }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let raf, start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const bars = 28;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 60, width }}>
      {Array.from({ length: bars }).map((_, i) => {
        const env = Math.sin((i / bars) * Math.PI);
        const h = (0.3 + Math.abs(Math.sin(i * 0.7 + t * 4)) * 0.7) * env * 60 * (0.4 + intensity * 0.6);
        return (
          <div key={i} style={{
            flex: 1, height: Math.max(4, h),
            background: 'var(--cy-1)', borderRadius: 999,
            transition: 'height 60ms linear',
          }} />
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   RippleWaves — layered radial circles (active clean)
   ────────────────────────────────────────────────────────── */
function RippleWaves({ size = 260, color = '#0A84FF' }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          opacity: 0.5,
          animation: `ripple 2.6s ${i * 0.8}s var(--ease) infinite`,
        }} />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SpeakerCone — decorative concentric speaker
   ────────────────────────────────────────────────────────── */
function SpeakerCone({ size = 120, color = '#0A84FF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <radialGradient id="sc-g" cx="50%" cy="42%" r="55%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#DDEAF8" />
          <stop offset="1" stopColor="#9BBEE0" />
        </radialGradient>
        <radialGradient id="sc-c" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#1FA0FF" />
          <stop offset="1" stopColor="#0066D6" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#sc-g)" />
      <circle cx="60" cy="60" r="48" fill="#FFF" />
      <circle cx="60" cy="60" r="42" fill="url(#sc-g)" />
      <circle cx="60" cy="60" r="22" fill="url(#sc-c)" />
      <circle cx="56" cy="55" r="6" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   PhoneShape — tiny phone outline for setup checklist
   ────────────────────────────────────────────────────────── */
function PhoneShape({ size = 56, flipped = false }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 56 67">
      <rect x="8" y="2" width="40" height="63" rx="9" fill="none" stroke="var(--fg-0)" strokeWidth="1.6" />
      {flipped ? (
        <circle cx="28" cy="50" r="3" fill="var(--cy-1)" />
      ) : (
        <rect x="22" y="6" width="12" height="2" rx="1" fill="var(--fg-2)" />
      )}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   PlanCard — paywall pricing row
   ────────────────────────────────────────────────────────── */
function PlanCard({ name, price, sub, badge, savings, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      all: 'unset', cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px 18px',
      borderRadius: 16,
      background: active ? '#fff' : 'var(--bg-2)',
      border: `${active ? 2 : 1}px solid ${active ? 'var(--cy-1)' : 'var(--hairline)'}`,
      boxShadow: active ? '0 12px 28px rgba(10,132,255,0.16)' : 'none',
      transition: 'all 220ms var(--ease)',
      position: 'relative',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        border: `2px solid ${active ? 'var(--cy-1)' : 'var(--hairline-3)'}`,
        background: active ? 'var(--cy-1)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff',
        flexShrink: 0,
      }}>
        {active && ICONS.check(14)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{name}</div>
          {badge && <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
            padding: '3px 8px', borderRadius: 999,
            background: 'var(--cy-1)', color: '#fff',
            textTransform: 'uppercase',
          }}>{badge}</span>}
        </div>
        {sub && <div style={{ fontSize: 12, marginTop: 3, color: 'var(--fg-2)' }}>{sub}</div>}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="t-mono" style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{price}</div>
        {savings && <div style={{ fontSize: 11, color: 'var(--ok)', marginTop: 2, fontWeight: 500 }}>{savings}</div>}
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   Confetti — sparse SVG burst on success
   ────────────────────────────────────────────────────────── */
function Confetti({ width = 380, height = 200 }) {
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 26; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6,
        s: 2 + Math.random() * 4,
        c: ['#0A84FF', '#38BDF8', '#1FA0FF', '#E6F1FF'][i % 4],
        d: Math.random() * 0.8,
        r: Math.random() * 360,
      });
    }
    return arr;
  }, [width, height]);

  return (
    <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      {dots.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width={d.s} height={d.s * 1.6}
          fill={d.c} opacity="0.85"
          transform={`rotate(${d.r} ${d.x + d.s / 2} ${d.y + d.s / 2})`}
          style={{ animation: `fade-up 1.4s ${d.d}s var(--ease) both` }} />
      ))}
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   Banner — custom AdMob mock
   ────────────────────────────────────────────────────────── */
function Banner({ title = "AudioBoost Pro", desc = "Find perfect EQ for your speaker", cta = "Open" }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 12,
      borderRadius: 14,
      background: 'var(--bg-2)',
      border: '1px solid var(--hairline)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: 'linear-gradient(135deg, #0A84FF, #38BDF8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0,
      }}>{ICONS.audio(20)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: 'var(--fg-2)', marginTop: 2 }}>{desc}</div>
      </div>
      <button style={{
        all: 'unset', cursor: 'pointer',
        padding: '7px 14px', borderRadius: 999,
        background: 'var(--fg-0)', color: '#fff', fontSize: 12, fontWeight: 600,
      }}>{cta}</button>
      <span style={{
        position: 'absolute', fontSize: 9, color: 'var(--fg-3)',
      }}></span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Bottom action area — sticky CTA region
   ────────────────────────────────────────────────────────── */
function BottomCTA({ children, style }) {
  return (
    <div style={{
      padding: '14px 20px 22px',
      position: 'relative',
      zIndex: 2,
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: '-40px 0 0 0',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 70%)',
        maskImage: 'linear-gradient(180deg, transparent 0%, #000 70%)',
        backdropFilter: 'blur(10px) saturate(1.05)',
        WebkitBackdropFilter: 'blur(10px) saturate(1.05)',
        pointerEvents: 'none', zIndex: -1,
      }} />
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScreenBody — padded content area
   ────────────────────────────────────────────────────────── */
function Body({ children, style }) {
  return (
    <div style={{ flex: 1, padding: '0 20px', overflow: 'auto', ...style }}>{children}</div>
  );
}

/* ──────────────────────────────────────────────────────────
   Export everything to window
   ────────────────────────────────────────────────────────── */
Object.assign(window, {
  ICONS,
  CSStatusBar, CSHeader,
  Progress, OptionRow,
  GlowOrb, Waveform, ProgressRing, CircularDial, HapticPulse, RippleWaves,
  SpeakerCone, PhoneShape, PlanCard, Confetti, Banner,
  BottomCTA, Body,
  hexA,
});
