/* CleanSpeaker — primitives: status bar, waveforms, dials, ripples */
const { useState, useEffect, useRef, useMemo } = React;

/* ── Slim glass status bar (replaces android one for our dark UI) ────── */
function CSStatusBar({ time = '9:41' }) {
  return (
    <div style={{
      height: 36, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px 0 24px',
      fontFamily: 'var(--f-ui)', fontSize: 14, fontWeight: 600,
      color: 'var(--fg-0)', letterSpacing: '-0.01em', flexShrink: 0,
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', opacity: 0.85 }}>
        {/* signal */}
        <svg width="16" height="11" viewBox="0 0 16 11"><g fill="#F4F8FF">
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.5"/>
          <rect x="9" y="2" width="3" height="9" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" opacity="0.4"/>
        </g></svg>
        {/* wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M1 4.5C2.8 2.9 5 2 7.5 2c2.5 0 4.7.9 6.5 2.5" stroke="#F4F8FF" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M3.5 7c1.1-.9 2.5-1.4 4-1.4s2.9.5 4 1.4" stroke="#F4F8FF" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="7.5" cy="9.5" r="1.1" fill="#F4F8FF"/>
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12"><g fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#F4F8FF" strokeOpacity="0.5"/>
          <rect x="23.5" y="3.5" width="2" height="5" rx="1" fill="#F4F8FF" fillOpacity="0.5"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#F4F8FF"/>
        </g></svg>
      </div>
    </div>
  );
}

/* ── Back / close header ───────────────────────────────────────────── */
function CSHeader({ onBack, title, right, light }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 18px', flexShrink: 0,
    }}>
      <button onClick={onBack} style={{
        width: 40, height: 40, borderRadius: 999, border: '1px solid var(--hairline-2)',
        background: 'var(--bg-glass)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'pointer', padding: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke={light ? '#F4F8FF' : '#B8C3D6'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg-1)',
                     whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                     flex: 1, textAlign: 'center', padding: '0 12px' }}>{title}</span>
      <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {right}
      </div>
    </div>
  );
}

/* ── Animated waveform strip ───────────────────────────────────────── */
function Waveform({ height = 80, bars = 64, animate = true, intensity = 1, color = 'var(--cy-1)' }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const cells = [];
  for (let i = 0; i < bars; i++) {
    const x = i / (bars - 1);
    // composite sine + envelope
    const env = Math.sin(x * Math.PI) ** 0.6;
    const w1 = Math.sin(x * 18 - t * 2.1) * 0.5 + 0.5;
    const w2 = Math.sin(x * 7 + t * 3.3) * 0.5 + 0.5;
    const v = (w1 * 0.55 + w2 * 0.45) * env * intensity;
    const h = Math.max(2, v * height);
    const o = 0.35 + v * 0.65;
    cells.push(
      <div key={i} style={{
        width: 3, height: h, borderRadius: 2,
        background: color, opacity: o,
        boxShadow: `0 0 8px ${color}`,
      }} />
    );
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height, gap: 2, width: '100%',
    }}>{cells}</div>
  );
}

/* ── Circular frequency dial (canvas-free) ─────────────────────────── */
function polar(cx, cy, rad, deg) {
  const a = deg * Math.PI / 180;
  return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) };
}

function CircularDial({
  size = 280, value = 0.5, min = 20, max = 20000, hz = 165,
  label = 'FREQUENCY', spinning = false, pulsing = false,
  showTicks = true, ringWidth = 12, children,
}) {
  const r = size / 2;
  const inner = r - ringWidth - 14;
  const arc = 0.78;                    // 78% working arc, 22% gap at bottom
  const gapDeg = (1 - arc) * 360;      // 79.2°
  // math-degree of FIRST tick (bottom-left edge of gap)
  // 90° (= 6 o'clock) + half gap → 129.6°  → put first tick at bottom-left
  const startMath = 90 + gapDeg / 2;
  const v = Math.max(0, Math.min(1, value));
  const valueArc = v * arc * 360;
  const endMath = startMath + valueArc;

  // ticks
  const ticks = [];
  const tickCount = 48;
  if (showTicks) {
    for (let i = 0; i < tickCount; i++) {
      const f = i / (tickCount - 1);
      const mathAng = startMath + f * arc * 360;
      const major = i % 6 === 0;
      const len = major ? 14 : 8;
      ticks.push({ mathAng, len, major, idx: i, on: f <= v });
    }
  }

  // active arc path
  const arcR = r - ringWidth / 2 - 1;
  const startPt = polar(r, r, arcR, startMath);
  const endPt = polar(r, r, arcR, endMath);
  const largeArc = valueArc > 180 ? 1 : 0;
  const arcD = v > 0
    ? `M ${startPt.x} ${startPt.y} A ${arcR} ${arcR} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`
    : '';

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* outer glow */}
      <div style={{
        position: 'absolute', inset: -40, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,213,255,0.25) 0%, transparent 55%)',
        filter: 'blur(20px)',
        animation: pulsing ? 'csPulse 2.4s ease-in-out infinite' : 'none',
      }} />
      {/* base ring */}
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="dialFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B121E"/>
            <stop offset="100%" stopColor="#040810"/>
          </linearGradient>
          <linearGradient id="dialRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)"/>
            <stop offset="50%" stopColor="rgba(255,255,255,0.04)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.10)"/>
          </linearGradient>
          <linearGradient id="dialGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E7CC4"/>
            <stop offset="50%" stopColor="#5BD5FF"/>
            <stop offset="100%" stopColor="#BEF1FF"/>
          </linearGradient>
        </defs>
        {/* outer rim */}
        <circle cx={r} cy={r} r={r - 1} fill="url(#dialFill)" stroke="url(#dialRim)" strokeWidth="1.5"/>
        {/* inset shadow */}
        <circle cx={r} cy={r} r={r - ringWidth - 4} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2"/>
        {/* inner bowl */}
        <circle cx={r} cy={r} r={inner} fill="#04070D" stroke="rgba(255,255,255,0.05)"/>

        {/* tick marks */}
        {ticks.map((t, i) => {
          const a = t.mathAng * Math.PI / 180;
          const r1 = r - ringWidth - 2;
          const r2 = r1 - t.len;
          const x1 = r + Math.cos(a) * r1;
          const y1 = r + Math.sin(a) * r1;
          const x2 = r + Math.cos(a) * r2;
          const y2 = r + Math.sin(a) * r2;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={t.on ? '#5BD5FF' : 'rgba(255,255,255,0.18)'}
              strokeWidth={t.major ? 2 : 1.2}
              strokeLinecap="round"
              style={t.on ? { filter: 'drop-shadow(0 0 4px #5BD5FF)' } : {}}
            />
          );
        })}

        {/* active arc highlight */}
        {arcD && (
          <path d={arcD}
            fill="none"
            stroke="url(#dialGlow)"
            strokeWidth={ringWidth}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 10px rgba(91,213,255,0.6))' }}
          />
        )}
      </svg>

      {/* center content */}
      <div style={{
        position: 'absolute', inset: ringWidth + 18,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        {children || (
          <>
            <div style={{
              fontSize: 11, letterSpacing: '0.22em', color: 'var(--fg-2)',
              textTransform: 'uppercase', marginBottom: 6,
              whiteSpace: 'nowrap',
            }}>{label}</div>
            <div className="hz" style={{
              fontSize: 68, fontWeight: 500, lineHeight: 1,
              color: 'var(--fg-0)', letterSpacing: '-0.04em',
              textShadow: '0 0 24px rgba(91,213,255,0.4)',
            }}>{hz}</div>
            <div className="hz" style={{
              fontSize: 14, color: 'var(--cy-1)', marginTop: 8,
              letterSpacing: '0.05em',
            }}>Hz</div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Speaker grille / cone (visual) ────────────────────────────────── */
function SpeakerCone({ size = 140, glow = true, label }) {
  const r = size / 2;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {glow && (
        <div style={{
          position: 'absolute', inset: -10, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,213,255,0.35), transparent 60%)',
          filter: 'blur(8px)',
          animation: 'csPulse 2s ease-in-out infinite',
        }} />
      )}
      <svg width={size} height={size} style={{ position: 'relative' }}>
        <defs>
          <radialGradient id={`cone-${size}`} cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="#0B131F"/>
            <stop offset="60%" stopColor="#070B14"/>
            <stop offset="100%" stopColor="#03050A"/>
          </radialGradient>
        </defs>
        <circle cx={r} cy={r} r={r-1} fill={`url(#cone-${size})`} stroke="rgba(255,255,255,0.12)"/>
        {[0.85, 0.7, 0.55, 0.4].map((f, i) => (
          <circle key={i} cx={r} cy={r} r={r*f} fill="none"
            stroke={`rgba(91,213,255,${0.15 + i*0.1})`} strokeWidth="0.8"/>
        ))}
        <circle cx={r} cy={r} r={r*0.22} fill="#0E1827" stroke="rgba(91,213,255,0.4)"/>
        <circle cx={r} cy={r} r={r*0.08} fill="#5BD5FF" style={{ filter: 'drop-shadow(0 0 6px #5BD5FF)' }}/>
      </svg>
      {label && (
        <div style={{
          position: 'absolute', bottom: -22, left: 0, right: 0,
          textAlign: 'center', fontSize: 11, letterSpacing: '0.2em',
          color: 'var(--fg-2)',
        }}>{label}</div>
      )}
    </div>
  );
}

/* ── Frequency response curve (svg) ────────────────────────────────── */
function FrequencyCurve({ width = 340, height = 120, color = '#5BD5FF', dotted = false }) {
  const points = useMemo(() => {
    const pts = [];
    const n = 80;
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1);
      // logarithmic-ish response curve
      const base = Math.sin(x * 6) * 0.15 + Math.sin(x * 14 + 1) * 0.08;
      const env = Math.sin(x * Math.PI) ** 0.4;
      const y = 0.5 - (base + 0.05) * env - x * 0.15 + 0.1;
      pts.push([x * width, y * height]);
    }
    return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  }, [width, height]);
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`fc-${width}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0E7CC4"/>
          <stop offset="50%" stopColor="#5BD5FF"/>
          <stop offset="100%" stopColor="#BEF1FF"/>
        </linearGradient>
        <linearGradient id={`fcfill-${width}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map(p => (
        <line key={p} x1="0" y1={height*p} x2={width} y2={height*p}
          stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4"/>
      ))}
      <polyline points={`0,${height} ${points} ${width},${height}`} fill={`url(#fcfill-${width})`}/>
      <polyline points={points} fill="none" stroke={dotted ? 'rgba(255,255,255,0.25)' : `url(#fc-${width})`}
        strokeWidth="2" strokeDasharray={dotted ? '3 4' : 'none'}
        style={{ filter: dotted ? 'none' : 'drop-shadow(0 0 6px rgba(91,213,255,0.6))' }}/>
    </svg>
  );
}

/* ── Loader ring ────────────────────────────────────────────────── */
function ProgressRing({ size = 160, value = 0.4, thickness = 8, children, animate = true }) {
  const r = size / 2 - thickness;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={thickness}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#pgrad)" strokeWidth={thickness}
          strokeDasharray={c} strokeDashoffset={c * (1 - value)}
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px rgba(91,213,255,0.6))',
                   transition: 'stroke-dashoffset 0.4s ease' }}/>
        <defs>
          <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#25B6F5"/>
            <stop offset="100%" stopColor="#BEF1FF"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      }}>{children}</div>
    </div>
  );
}

/* ── Icon set (minimal cyan strokes, no emoji) ─────────────────────── */
const ICONS = {
  water: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M11 2 C6 8.5 4 12 4 14.5 a7 7 0 0 0 14 0 C18 12 16 8.5 11 2z"
      stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M8 14.5 a3 3 0 0 0 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>),
  dust: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <circle cx="6" cy="10" r="1.4" fill="currentColor"/>
    <circle cx="11" cy="7" r="1" fill="currentColor"/>
    <circle cx="15" cy="11" r="1.6" fill="currentColor"/>
    <circle cx="9" cy="14" r="1.2" fill="currentColor"/>
    <circle cx="14" cy="16" r="0.9" fill="currentColor" opacity="0.7"/>
    <circle cx="4" cy="15" r="0.7" fill="currentColor" opacity="0.6"/>
  </svg>),
  muffled: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M3 9 v4 h3 l4 3 V6 L6 9 H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M14 8 q2 3 0 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
    <line x1="13" y1="6" x2="19" y2="16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>),
  shield: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M11 2 L4 5 v5 c0 4.5 3 8 7 10 c4-2 7-5.5 7-10 V5 L11 2z"
      stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M8 11 l2.5 2.5 L15 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  wave: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M2 11 q2-4 4 0 q2 4 4 0 q2-4 4 0 q2 4 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  test: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <rect x="3" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="8" cy="11" r="2" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="14" cy="11" r="2" stroke="currentColor" strokeWidth="1.2"/>
  </svg>),
  manual: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="11" y1="6" x2="11" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="11" y1="11" x2="14" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>),
  check: (s=18) => (<svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5.5 9 L8 11.5 L12.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  spark: (s=18) => (<svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <path d="M9 1 L10.5 7 L16 9 L10.5 11 L9 17 L7.5 11 L2 9 L7.5 7 z" fill="currentColor"/>
  </svg>),
  arrow: (s=18) => (<svg width={s} height={s} viewBox="0 0 18 18" fill="none">
    <path d="M5 4 L11 9 L5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  star: (s=18, fill='currentColor') => (<svg width={s} height={s} viewBox="0 0 18 18">
    <path d="M9 1 L11.3 6.6 L17 7.1 L12.7 11 L14 17 L9 13.9 L4 17 L5.3 11 L1 7.1 L6.7 6.6 z" fill={fill}/>
  </svg>),
  pulse: (s=22) => (<svg width={s} height={s} viewBox="0 0 22 22" fill="none">
    <path d="M1 11 h3 L6 6 L9 16 L12 4 L15 14 L17 11 h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>),
  bell: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <path d="M4 14 v-3 a6 6 0 1 1 12 0 v3 l1.5 2 h-15 z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M8 17 a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>),
  lock: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M7 9 V6 a3 3 0 0 1 6 0 v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>),
  user: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M3.5 17 a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>),
  wifi_off: (s=20) => (<svg width={s} height={s} viewBox="0 0 20 20" fill="none">
    <path d="M2 6 q8-5 16 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
    <path d="M5 9.5 q5-3 10 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
    <circle cx="10" cy="14" r="1.4" fill="currentColor"/>
    <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>),
};

Object.assign(window, {
  CSStatusBar, CSHeader, Waveform, CircularDial, SpeakerCone,
  FrequencyCurve, ProgressRing, ICONS, HapticPulse, PhoneShape,
});

/* ── Haptic pulse visualizer ───────────────────────────────────────── */
function HapticPulse({ height = 120, pattern = 'wave', intensity = 1, running = true }) {
  // pattern shape function returns 0..1 envelope at time t (sec) and bar i (0..n-1)
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const N = 32;
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
        flex: 1, height: Math.max(4, v * height),
        borderRadius: 3,
        background: 'linear-gradient(180deg, #BEF1FF 0%, #5BD5FF 60%, #0E7CC4 100%)',
        opacity: 0.4 + v * 0.6,
        boxShadow: `0 0 ${4 + v * 10}px rgba(91,213,255,${0.3 + v * 0.5})`,
      }}/>
    );
  }
  return (
    <div style={{
      height, display: 'flex', alignItems: 'flex-end', gap: 3,
      width: '100%',
    }}>{bars}</div>
  );
}

/* ── Phone outline with vibration emanation ────────────────────────── */
function PhoneShape({ size = 180, vibrating = true, ringCount = 3 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {vibrating && [...Array(ringCount)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: size * 0.9, height: size * 0.9,
          borderRadius: 999,
          border: '1.5px solid rgba(91,213,255,0.5)',
          animation: `csRipple 2.4s ${i * 0.7}s ease-out infinite`,
        }}/>
      ))}
      <svg width={size * 0.42} height={size * 0.78} viewBox="0 0 64 120" style={{ position: 'relative' }}>
        <defs>
          <linearGradient id="phoneShape" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A2230"/>
            <stop offset="100%" stopColor="#070B14"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="116" rx="10" fill="url(#phoneShape)"
              stroke="rgba(91,213,255,0.35)" strokeWidth="1.2"/>
        <rect x="6" y="8" width="52" height="104" rx="6" fill="#04070D"/>
        {/* speaker slit at bottom */}
        <rect x="20" y="112" width="24" height="2" rx="1" fill="#5BD5FF"
              style={{ filter: 'drop-shadow(0 0 4px #5BD5FF)' }}/>
        {/* signal hairlines on screen */}
        {[0.2, 0.35, 0.5, 0.65, 0.8].map((y, i) => (
          <line key={i} x1="14" y1={20 + y * 80} x2="50" y2={20 + y * 80}
                stroke="rgba(91,213,255,0.4)" strokeWidth="0.6"/>
        ))}
        <circle cx="32" cy="14" r="1.5" fill="rgba(91,213,255,0.5)"/>
      </svg>
    </div>
  );
}
