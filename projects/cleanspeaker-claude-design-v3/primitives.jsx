/* CleanSpeaker — primitives (light theme, minimal) */
const { useState, useEffect, useRef, useMemo } = React;

/* ── Status bar ────────────────────────────────────────────────────── */
function CSStatusBar({ time = '9:41' }) {
  return (
    <div style={{
      height: 36, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px 0 24px',
      fontFamily: 'var(--f-ui)', fontSize: 14, fontWeight: 600,
      color: 'var(--fg-0)', letterSpacing: '-0.01em', flexShrink: 0,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11"><g fill="#0B1220">
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.5"/>
          <rect x="9" y="2" width="3" height="9" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity="0.4"/>
        </g></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M1 4.5C2.8 2.9 5 2 7.5 2c2.5 0 4.7.9 6.5 2.5" stroke="#0B1220" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M3.5 7c1.1-.9 2.5-1.4 4-1.4s2.9.5 4 1.4" stroke="#0B1220" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="7.5" cy="9.5" r="1.1" fill="#0B1220"/>
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><g fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#0B1220" strokeOpacity="0.45"/>
          <rect x="23.5" y="3.5" width="2" height="5" rx="1" fill="#0B1220" fillOpacity="0.45"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#0B1220"/>
        </g></svg>
      </div>
    </div>
  );
}

/* ── Header ────────────────────────────────────────────────────────── */
function CSHeader({ onBack, title, right }) {
  return (
    <div style={{
      height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 18px', flexShrink: 0,
    }}>
      <button onClick={onBack} style={{
        width: 38, height: 38, borderRadius: 999, border: 'none',
        background: 'transparent', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4 L6 10 L12 16" stroke="#0B1220" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-0)',
                     letterSpacing: '-0.01em',
                     whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                     flex: 1, textAlign: 'center', padding: '0 12px' }}>{title}</span>
      <div style={{ width: 38, height: 38, display: 'flex',
                    alignItems: 'center', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

/* ── Waveform (minimal, single accent) ─────────────────────────────── */
function Waveform({ height = 60, bars = 48, animate = true, intensity = 1 }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let raf, start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const cells = [];
  for (let i = 0; i < bars; i++) {
    const x = i / (bars - 1);
    const env = Math.sin(x * Math.PI) ** 0.6;
    const w1 = Math.sin(x * 18 - t * 2.1) * 0.5 + 0.5;
    const w2 = Math.sin(x * 7 + t * 3.3) * 0.5 + 0.5;
    const v = (w1 * 0.55 + w2 * 0.45) * env * intensity;
    const h = Math.max(2, v * height);
    cells.push(
      <div key={i} style={{
        width: 2, height: h, borderRadius: 1,
        background: 'var(--cy-1)', opacity: 0.5 + v * 0.5,
      }} />
    );
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height, gap: 3, width: '100%',
    }}>{cells}</div>
  );
}

/* ── Circular frequency dial — quiet light style ───────────────────── */
function polar(cx, cy, rad, deg) {
  const a = deg * Math.PI / 180;
  return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) };
}
function CircularDial({
  size = 280, value = 0.5, hz = 165,
  label = 'FREQUENCY', pulsing = false,
  showTicks = true, ringWidth = 10, children,
}) {
  const r = size / 2;
  const arc = 0.78;
  const gapDeg = (1 - arc) * 360;
  const startMath = 90 + gapDeg / 2;
  const v = Math.max(0, Math.min(1, value));
  const valueArc = v * arc * 360;
  const endMath = startMath + valueArc;

  const ticks = [];
  const tickCount = 48;
  if (showTicks) {
    for (let i = 0; i < tickCount; i++) {
      const f = i / (tickCount - 1);
      const mathAng = startMath + f * arc * 360;
      const major = i % 6 === 0;
      ticks.push({ mathAng, len: major ? 12 : 6, major, on: f <= v });
    }
  }

  const arcR = r - ringWidth / 2 - 1;
  const startPt = polar(r, r, arcR, startMath);
  const endPt = polar(r, r, arcR, endMath);
  const largeArc = valueArc > 180 ? 1 : 0;
  const arcD = v > 0
    ? `M ${startPt.x} ${startPt.y} A ${arcR} ${arcR} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`
    : '';
  // dot at end of active arc
  const dotR = 6;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        {/* base bg (very subtle) */}
        <circle cx={r} cy={r} r={r - 1} fill="var(--bg-1)" stroke="var(--hairline)"/>
        {/* track */}
        <circle cx={r} cy={r} r={arcR} fill="none"
          stroke="var(--bg-3)" strokeWidth={ringWidth}
          strokeDasharray={`${arc * 360 * Math.PI * arcR / 180} 9999`}
          strokeLinecap="round"
          transform={`rotate(${startMath - 90} ${r} ${r})`}/>

        {ticks.map((t, i) => {
          const a = t.mathAng * Math.PI / 180;
          const r1 = r - ringWidth - 4;
          const r2 = r1 - t.len;
          const x1 = r + Math.cos(a) * r1;
          const y1 = r + Math.sin(a) * r1;
          const x2 = r + Math.cos(a) * r2;
          const y2 = r + Math.sin(a) * r2;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={t.on ? 'var(--cy-1)' : 'var(--fg-3)'}
              strokeOpacity={t.on ? 1 : 0.5}
              strokeWidth={t.major ? 1.6 : 1}
              strokeLinecap="round"/>
          );
        })}

        {/* active arc */}
        {arcD && (
          <path d={arcD} fill="none" stroke="var(--cy-1)"
            strokeWidth={ringWidth} strokeLinecap="round"/>
        )}
        {/* end dot */}
        {v > 0 && (
          <circle cx={endPt.x} cy={endPt.y} r={dotR} fill="var(--bg-1)" stroke="var(--cy-1)" strokeWidth="2"/>
        )}
      </svg>

      <div style={{
        position: 'absolute', inset: ringWidth + 20,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        animation: pulsing ? 'csPulse 2.4s ease-in-out infinite' : 'none',
      }}>
        {children || (
          <>
            <div style={{
              fontSize: 10, letterSpacing: '0.22em', color: 'var(--fg-2)',
              textTransform: 'uppercase', marginBottom: 6, fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>{label}</div>
            <div className="hz" style={{
              fontSize: 64, fontWeight: 500, lineHeight: 1,
              color: 'var(--fg-0)', letterSpacing: '-0.04em',
            }}>{hz}</div>
            <div className="hz" style={{
              fontSize: 13, color: 'var(--fg-2)', marginTop: 6,
              letterSpacing: '0.05em',
            }}>Hz</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Speaker cone (minimal) ────────────────────────────────────────── */
function SpeakerCone({ size = 120 }) {
  const r = size / 2;
  return (
    <svg width={size} height={size}>
      <circle cx={r} cy={r} r={r-1} fill="var(--bg-1)" stroke="var(--hairline-2)"/>
      {[0.78, 0.6, 0.42].map((f, i) => (
        <circle key={i} cx={r} cy={r} r={r*f} fill="none"
          stroke="var(--fg-3)" strokeWidth="1" opacity={0.5 - i*0.1}/>
      ))}
      <circle cx={r} cy={r} r={r*0.18} fill="var(--bg-2)" stroke="var(--hairline-3)"/>
      <circle cx={r} cy={r} r={r*0.07} fill="var(--cy-1)"/>
    </svg>
  );
}

/* ── Frequency curve (single line, no fill) ────────────────────────── */
function FrequencyCurve({ width = 320, height = 80, dotted = false, color = 'var(--cy-1)' }) {
  const points = useMemo(() => {
    const pts = [];
    const n = 80;
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1);
      const base = Math.sin(x * 6) * 0.15 + Math.sin(x * 14 + 1) * 0.08;
      const env = Math.sin(x * Math.PI) ** 0.4;
      const y = 0.5 - (base + 0.05) * env - x * 0.15 + 0.1;
      pts.push([x * width, y * height]);
    }
    return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  }, [width, height]);
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {[0.5].map(p => (
        <line key={p} x1="0" y1={height*p} x2={width} y2={height*p}
          stroke="var(--hairline)"/>
      ))}
      <polyline points={points} fill="none"
        stroke={dotted ? 'var(--fg-3)' : color}
        strokeWidth="2"
        strokeDasharray={dotted ? '3 4' : 'none'}
        strokeLinecap="round"/>
    </svg>
  );
}

/* ── Progress ring (clean) ─────────────────────────────────────────── */
function ProgressRing({ size = 160, value = 0.4, thickness = 6, children }) {
  const r = size / 2 - thickness;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--bg-3)" strokeWidth={thickness}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="var(--cy-1)" strokeWidth={thickness}
          strokeDasharray={c} strokeDashoffset={c * (1 - value)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

/* ── Haptic visualizer (bars) ──────────────────────────────────────── */
function HapticPulse({ height = 80, pattern = 'wave', intensity = 1, running = true }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf, start = performance.now();
    const tick = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const N = 28;
  const bars = [];
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1);
    let v;
    switch (pattern) {
      case 'steady': v = 0.55 + Math.sin(t * 6 + x * 0.4) * 0.08; break;
      case 'wave':   v = (Math.sin(t * 3 - x * 5) * 0.5 + 0.5) * 0.9 + 0.1; break;
      case 'burst': {
        const phase = (t % 1.2) / 1.2;
        const burst = phase < 0.25 ? Math.sin(phase * Math.PI / 0.25) : 0;
        v = burst * (0.4 + Math.sin(x * 16) * 0.3) + 0.06;
        break;
      }
      case 'knock': {
        const beat = ((t * 2) % 1) < 0.18 ? 1 : 0;
        v = beat * (Math.sin(x * Math.PI) ** 0.5) * 0.95 + 0.06;
        break;
      }
      default: v = 0.5;
    }
    v *= intensity;
    bars.push(
      <div key={i} style={{
        flex: 1, height: Math.max(3, v * height), borderRadius: 2,
        background: 'var(--cy-1)', opacity: 0.5 + v * 0.5,
      }}/>
    );
  }
  return (
    <div style={{
      height, display: 'flex', alignItems: 'flex-end', gap: 3, width: '100%',
    }}>{bars}</div>
  );
}

/* ── Phone outline ─────────────────────────────────────────────────── */
function PhoneShape({ size = 160, vibrating = true }) {
  return (
    <div style={{ position: 'relative', width: size, height: size,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {vibrating && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', width: size * 0.85, height: size * 0.85,
          borderRadius: 999, border: '1.5px solid var(--cy-1)',
          opacity: 0.4,
          animation: `csRipple 2.4s ${i * 0.7}s ease-out infinite`,
        }}/>
      ))}
      <svg width={size * 0.4} height={size * 0.78} viewBox="0 0 64 120">
        <rect x="2" y="2" width="60" height="116" rx="10" fill="var(--bg-1)"
              stroke="var(--fg-2)" strokeWidth="1.4"/>
        <rect x="6" y="8" width="52" height="104" rx="6" fill="var(--bg-2)"/>
        <rect x="20" y="112" width="24" height="2" rx="1" fill="var(--cy-1)"/>
      </svg>
    </div>
  );
}

/* ── Icon set (single-stroke, currentColor) ────────────────────────── */
const ICONS = {
  water: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M11 2 C6 8.5 4 12 4 14.5 a7 7 0 0 0 14 0 C18 12 16 8.5 11 2z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>),
  dust: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <circle cx="6" cy="10" r="1.3" fill="currentColor"/>
    <circle cx="11" cy="7" r="1" fill="currentColor"/>
    <circle cx="15" cy="11" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="14" r="1.1" fill="currentColor"/>
    <circle cx="14" cy="16" r="0.9" fill="currentColor"/>
  </svg>),
  muffled: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M3 9 v4 h3 l4 3 V6 L6 9 H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <line x1="13" y1="6" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>),
  shield: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M11 2 L4 5 v5 c0 4.5 3 8 7 10 c4-2 7-5.5 7-10 V5 L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>),
  pulse: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M1 11 h3 L6 6 L9 16 L12 4 L15 14 L17 11 h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  wave: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M2 11 q2-4 4 0 q2 4 4 0 q2-4 4 0 q2 4 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  test: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <rect x="3" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="11" r="2" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="14" cy="11" r="2" stroke="currentColor" strokeWidth="1.3"/>
  </svg>),
  manual: (s=20) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="11" y1="6" x2="11" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="11" y1="11" x2="14" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>),
  check: (s=18) => (<svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <path d="M3.5 9.5 L7 13 L14.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  arrow: (s=18) => (<svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <path d="M5 4 L11 9 L5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  star: (s=18, fill='currentColor') => (<svg width={s} height={s} viewBox="0 0 18 18">
    <path d="M9 1 L11.3 6.6 L17 7.1 L12.7 11 L14 17 L9 13.9 L4 17 L5.3 11 L1 7.1 L6.7 6.6 z" fill={fill}/>
  </svg>),
  bell: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <path d="M4 14 v-3 a6 6 0 1 1 12 0 v3 l1.5 2 h-15 z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 17 a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>),
  lock: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 9 V6 a3 3 0 0 1 6 0 v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>),
  user: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3.5 17 a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>),
  wifi_off: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <path d="M2 6 q8-5 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M5 9.5 q5-3 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <circle cx="10" cy="14" r="1.4" fill="currentColor"/>
    <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>),
  sparkles: (s=18) => (<svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <path d="M9 2 L10 7 L15 8 L10 9 L9 14 L8 9 L3 8 L8 7 z" fill="currentColor"/>
  </svg>),
};

Object.assign(window, {
  CSStatusBar, CSHeader, Waveform, CircularDial, SpeakerCone,
  FrequencyCurve, ProgressRing, HapticPulse, PhoneShape, ICONS,
});
