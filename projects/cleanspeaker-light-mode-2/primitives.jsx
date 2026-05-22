/* ===== CleanSpeaker — Primitives =====
   All components exposed on window at the bottom of this file.
   No imports. JSX compiled in-browser via @babel/standalone.
*/

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* -------- ICONS -------- */
const ICONS = {
  back: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  next: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  check: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  play: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor"/>
    </svg>
  ),
  stop: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>
    </svg>
  ),
  water: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3.5c3 4.5 6 7.5 6 11.2A6 6 0 0 1 6 14.7C6 11 9 8 12 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  dust: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="9" r="1.4" fill="currentColor"/>
      <circle cx="12" cy="6" r="1.1" fill="currentColor"/>
      <circle cx="17" cy="10" r="1.4" fill="currentColor"/>
      <circle cx="9" cy="15" r="1.1" fill="currentColor"/>
      <circle cx="15" cy="17" r="1.4" fill="currentColor"/>
      <circle cx="13" cy="12" r="0.9" fill="currentColor"/>
    </svg>
  ),
  volume: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 10v4h3l4 3V7L7 10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M15 9c1 1 1.5 2 1.5 3s-.5 2-1.5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18 6.5c2 1.6 3 3.3 3 5.5s-1 3.9-3 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  speaker: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="3.5" width="12" height="17" rx="2.4" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="7" r="0.9" fill="currentColor"/>
    </svg>
  ),
  wave: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 12c2 0 2-5 4-5s2 10 4 10 2-10 4-10 2 5 4 5h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  hz: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 6v12M5 12h7M12 6v12M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  vibration: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="8" y="4" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M4 9v6M20 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  headset: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 14v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <rect x="3" y="14" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="17" y="14" width="4" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  lock: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  sparkle: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z" fill="currentColor"/>
    </svg>
  ),
  shield: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 4.6-3.4 8.4-8 9-4.6-.6-8-4.4-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  more: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="1.6" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
      <circle cx="18" cy="12" r="1.6" fill="currentColor"/>
    </svg>
  ),
  flash: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  refresh: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0 1 13.4-6L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.4 6L4 16M4 20v-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* -------- Hook: RAF time -------- */
function useTime(running = true, speed = 1) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf, start = performance.now();
    const tick = (now) => {
      setT(((now - start) / 1000) * speed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed]);
  return t;
}

/* -------- StatusBar -------- */
function CSStatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor"/>
          <rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor"/>
        </svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M7 9.5a1 1 0 100-2 1 1 0 000 2zM4.4 7.1a3.7 3.7 0 015.2 0M2 4.8a7 7 0 0110 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2.2" stroke="currentColor" fill="none"/>
          <rect x="2" y="2" width="13" height="7" rx="1.2" fill="currentColor"/>
          <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.4" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}

/* -------- Header -------- */
function CSHeader({ onBack, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 4px' }}>
      <button className="icon-button" onClick={onBack} aria-label="Back" style={{ visibility: onBack ? 'visible' : 'hidden' }}>
        {ICONS.back(20)}
      </button>
      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{title || ''}</div>
      <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{right || null}</div>
    </div>
  );
}

/* -------- Progress (step dots) -------- */
function Progress({ steps, current }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '0 24px' }}>
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < current ? 'var(--cy-1)' : 'var(--bg-3)',
          transition: 'background 320ms var(--ease-out)',
        }}/>
      ))}
    </div>
  );
}

/* -------- GlowOrb (Canvas) -------- */
function GlowOrb({ size = 220, intensity = 1, pulsing = true, color = '#0EA5E9', soft = '#BAE6FD' }) {
  const ref = useRef(null);
  const animRef = useRef({ raf: 0, start: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = size / 2, cy = size / 2;
    animRef.current.start = performance.now();

    function draw(now) {
      const t = (now - animRef.current.start) / 1000;
      const breath = pulsing ? (0.5 + 0.5 * Math.sin(t * 0.9)) : 0.5;
      ctx.clearRect(0, 0, size, size);

      // outer glow halo
      const haloR = size * 0.46 * (1 + 0.04 * breath);
      const grd = ctx.createRadialGradient(cx, cy, haloR * 0.15, cx, cy, haloR);
      grd.addColorStop(0, `rgba(186, 230, 253, ${0.55 * intensity})`);
      grd.addColorStop(0.4, `rgba(186, 230, 253, ${0.18 * intensity})`);
      grd.addColorStop(1, 'rgba(186, 230, 253, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fill();

      // expanding ripple rings
      for (let i = 0; i < 3; i++) {
        const phase = (t * 0.35 + i / 3) % 1;
        const r = size * 0.18 + phase * size * 0.28;
        const alpha = (1 - phase) * 0.55 * intensity;
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // core orb gradient
      const coreR = size * 0.18;
      const core = ctx.createRadialGradient(cx - coreR * 0.3, cy - coreR * 0.4, coreR * 0.1, cx, cy, coreR);
      core.addColorStop(0, '#E0F7FE');
      core.addColorStop(0.45, color);
      core.addColorStop(1, '#075A8C');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // sheen
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.ellipse(cx - coreR * 0.32, cy - coreR * 0.45, coreR * 0.32, coreR * 0.18, -0.4, 0, Math.PI * 2);
      ctx.fill();

      // orbital arcs
      ctx.lineCap = 'round';
      for (let i = 0; i < 2; i++) {
        const baseR = size * 0.27 + i * 8;
        const span = Math.PI * 0.45;
        const startA = t * (i % 2 ? -0.6 : 0.7) + i * 1.3;
        ctx.strokeStyle = i === 0 ? `rgba(14,165,233,${0.6 * intensity})` : `rgba(2,132,199,${0.35 * intensity})`;
        ctx.lineWidth = i === 0 ? 1.6 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, baseR, startA, startA + span);
        ctx.stroke();
      }

      animRef.current.raf = requestAnimationFrame(draw);
    }
    animRef.current.raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current.raf);
  }, [size, intensity, pulsing]);

  return <canvas ref={ref} style={{ display: 'block' }} />;
}

/* -------- Waveform (animated sine) -------- */
function Waveform({ width = 320, height = 96, amplitude = 0.6, color = '#0EA5E9', running = true, freq = 1.2 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    let raf, start = performance.now();
    function draw(now) {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);
      const cy = height / 2;
      const segs = 140;
      // soft fill underneath
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs) * width;
        const env = Math.sin((i / segs) * Math.PI);
        const y = cy + Math.sin(i * 0.18 + t * freq * 4) * height * 0.35 * amplitude * env
                     + Math.sin(i * 0.42 + t * freq * 7) * height * 0.12 * amplitude * env;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.closePath();
      const fill = ctx.createLinearGradient(0, 0, 0, height);
      fill.addColorStop(0, 'rgba(56,189,248,0.18)');
      fill.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = fill;
      ctx.fill();

      // primary line
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs) * width;
        const env = Math.sin((i / segs) * Math.PI);
        const y = cy + Math.sin(i * 0.18 + t * freq * 4) * height * 0.35 * amplitude * env
                     + Math.sin(i * 0.42 + t * freq * 7) * height * 0.12 * amplitude * env;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();

      if (running) raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [width, height, amplitude, color, running, freq]);
  return <canvas ref={ref} style={{ display: 'block' }} />;
}

/* -------- ProgressRing (SVG dashoffset) -------- */
function ProgressRing({ size = 220, stroke = 8, progress = 0.4, color = '#0EA5E9', children, soft = true }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, progress)));
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="prGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8"/>
            <stop offset="100%" stopColor="#0284C7"/>
          </linearGradient>
        </defs>
        {soft && <circle cx={size/2} cy={size/2} r={r} stroke="rgba(15,23,42,0.06)" strokeWidth={stroke} fill="none"/>}
        <circle cx={size/2} cy={size/2} r={r}
          stroke="url(#prGrad)" strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 480ms var(--ease-out)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

/* -------- CircularDial -------- */
function CircularDial({ size = 220, value = 450, min = 200, max = 8000, color = '#0EA5E9' }) {
  const r = size / 2 - 18;
  const ticks = 40;
  const norm = Math.log(value / min) / Math.log(max / min);
  const sweep = 0.75; // 270 deg
  const startAngle = Math.PI * (0.75); // start at 135deg
  const t = useTime();
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="dialGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#38BDF8"/>
            <stop offset="1" stopColor="#0EA5E9"/>
          </linearGradient>
        </defs>
        {Array.from({ length: ticks }).map((_, i) => {
          const a = startAngle + (i / (ticks - 1)) * (Math.PI * 2 * sweep);
          const active = i / (ticks - 1) <= norm;
          const r1 = r - (active ? 14 : 8);
          const r2 = r;
          const x1 = size / 2 + Math.cos(a) * r1, y1 = size / 2 + Math.sin(a) * r1;
          const x2 = size / 2 + Math.cos(a) * r2, y2 = size / 2 + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={active ? color : 'rgba(15,23,42,0.14)'}
            strokeWidth={active ? 2 : 1.3}
            strokeLinecap="round"/>;
        })}
        {/* sweep arc indicator */}
        <path d={describeArc(size/2, size/2, r - 18, startAngle, startAngle + norm * Math.PI * 2 * sweep)}
          stroke="url(#dialGrad)" strokeWidth={3} fill="none" strokeLinecap="round" />
        <circle cx={size/2 + Math.cos(startAngle + norm * Math.PI * 2 * sweep) * (r - 18)}
                cy={size/2 + Math.sin(startAngle + norm * Math.PI * 2 * sweep) * (r - 18)}
                r={6 + Math.sin(t * 2) * 1} fill={color} />
      </svg>
    </div>
  );
}

function describeArc(cx, cy, r, a1, a2) {
  const large = a2 - a1 > Math.PI ? 1 : 0;
  const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
  const x2 = cx + Math.cos(a2) * r, y2 = cy + Math.sin(a2) * r;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/* -------- HapticPulse -------- */
function HapticPulse({ width = 260, height = 80, intensity = 0.6, running = true }) {
  const t = useTime(running);
  const bars = 22;
  return (
    <svg width={width} height={height}>
      {Array.from({ length: bars }).map((_, i) => {
        const env = Math.sin((i / (bars - 1)) * Math.PI);
        const h = (0.3 + 0.7 * Math.abs(Math.sin(t * 3 + i * 0.5))) * height * 0.85 * intensity * env + 6;
        const x = (i / (bars - 1)) * (width - 6) + 3;
        return <rect key={i} x={x - 2} y={(height - h) / 2} width={4} height={h} rx={2} fill="#0EA5E9" opacity={0.4 + 0.6 * env}/>;
      })}
    </svg>
  );
}

/* -------- SpeakerCone (concentric rings) -------- */
function SpeakerCone({ size = 160, animated = true }) {
  const t = useTime(animated);
  const rings = 6;
  return (
    <svg width={size} height={size}>
      <defs>
        <radialGradient id="sc" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#E0F7FE"/>
          <stop offset="65%" stopColor="#38BDF8"/>
          <stop offset="100%" stopColor="#075A8C"/>
        </radialGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={size*0.42} fill="url(#sc)"/>
      {Array.from({ length: rings }).map((_, i) => {
        const phase = ((t * 0.5 + i / rings) % 1);
        const r = size * 0.46 + phase * size * 0.05;
        const alpha = (1 - phase) * 0.5;
        return <circle key={i} cx={size/2} cy={size/2} r={r} stroke={`rgba(14,165,233,${alpha})`} strokeWidth="1" fill="none"/>;
      })}
      <circle cx={size/2} cy={size/2} r={size*0.18} fill="#0B1220"/>
      <circle cx={size/2 - 6} cy={size/2 - 8} r={size*0.05} fill="rgba(255,255,255,0.4)"/>
    </svg>
  );
}

/* -------- WaterDropParticles -------- */
function WaterDropParticles({ width = 200, height = 200, running = true }) {
  const t = useTime(running);
  const drops = 12;
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {Array.from({ length: drops }).map((_, i) => {
        const seed = (i * 137.5) % 360;
        const angle = (seed / 360) * Math.PI * 2;
        const r = (width / 2) * 0.65;
        const phase = ((t * 0.4 + i / drops) % 1);
        const opacity = Math.sin(phase * Math.PI) * 0.85;
        const dr = phase * 30 - 15;
        const cx = width / 2 + Math.cos(angle) * (r + dr);
        const cy = height / 2 + Math.sin(angle) * (r + dr);
        const size = 4 + ((i * 7) % 5);
        return (
          <g key={i} opacity={opacity}>
            <circle cx={cx} cy={cy} r={size} fill="#38BDF8" opacity="0.25"/>
            <circle cx={cx - 1} cy={cy - 1.5} r={size * 0.3} fill="#fff" opacity="0.7"/>
          </g>
        );
      })}
    </svg>
  );
}

/* -------- DustParticles -------- */
function DustParticles({ width = 220, height = 220, running = true }) {
  const t = useTime(running);
  const dots = 36;
  return (
    <svg width={width} height={height}>
      {Array.from({ length: dots }).map((_, i) => {
        const seed1 = (i * 73) % 100 / 100;
        const seed2 = (i * 191) % 100 / 100;
        const phase = (t * 0.25 + seed1) % 1;
        const angle = seed2 * Math.PI * 2;
        const r0 = 14;
        const r = r0 + phase * width * 0.42;
        const cx = width / 2 + Math.cos(angle) * r;
        const cy = height / 2 + Math.sin(angle) * r;
        const opacity = (1 - phase) * 0.7;
        return <circle key={i} cx={cx} cy={cy} r={1.6 + seed1 * 2} fill="#38BDF8" opacity={opacity}/>;
      })}
    </svg>
  );
}

/* -------- BenefitRow -------- */
function BenefitRow({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: 'var(--cy-0)', color: 'var(--cy-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

/* -------- OptionCard -------- */
function OptionCard({ icon, title, sub, active, onClick, locked }) {
  return (
    <button onClick={onClick} disabled={locked && !onClick} style={{
      width: '100%',
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      background: active ? 'var(--fg-0)' : 'var(--bg-1)',
      color: active ? '#fff' : 'var(--fg-0)',
      border: `1px solid ${active ? 'var(--fg-0)' : 'var(--hairline)'}`,
      borderRadius: 16,
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'background 220ms var(--ease-out), color 220ms var(--ease-out), border-color 220ms',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: active ? 'rgba(255,255,255,0.12)' : 'var(--cy-0)',
        color: active ? '#fff' : 'var(--cy-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 8 }}>
          {title}
          {locked && <span className="chip-pro">PRO</span>}
        </div>
        {sub && <div style={{ fontSize: 12, color: active ? 'rgba(255,255,255,0.7)' : 'var(--fg-2)', marginTop: 2 }}>{sub}</div>}
      </div>
      {active && <div style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--cy-1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ICONS.check(14)}</div>}
      {locked && !active && <div style={{ color: 'var(--fg-3)' }}>{ICONS.lock(16)}</div>}
    </button>
  );
}

/* -------- CTAButton -------- */
function CTAButton({ children, variant = 'primary', onClick, disabled, ...rest }) {
  const cls = variant === 'primary' ? 'btn-primary'
            : variant === 'accent' ? 'btn-accent'
            : variant === 'ghost'  ? 'btn-ghost'
            : 'btn-text';
  return <button className={cls} onClick={onClick} disabled={disabled} {...rest}>{children}</button>;
}

/* -------- Banner (sponsored) -------- */
function Banner({ logo, title, desc, action, onTap }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      background: 'var(--bg-2)',
      border: '1px solid var(--hairline)',
      borderRadius: 14,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-1)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-2)' }}>{logo || ICONS.sparkle(16)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{title}</div>
          <span style={{ fontSize: 9.5, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Sponsored</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--fg-2)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{desc}</div>
      </div>
      <button onClick={onTap} style={{ height: 32, padding: '0 12px', borderRadius: 999, background: 'var(--bg-1)', border: '1px solid var(--hairline-2)', fontSize: 12, fontWeight: 600 }}>{action || 'Open'}</button>
    </div>
  );
}

/* -------- LockChip -------- */
function LockChip() {
  return <span className="chip-pro">PRO</span>;
}

/* -------- Toolkit Tile (for home grid) -------- */
function ToolTile({ icon, label, sub, locked, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      flex: 1,
      display: 'flex', flexDirection: 'column', gap: 10,
      padding: 14,
      background: accent ? 'var(--cy-0)' : 'var(--bg-1)',
      border: `1px solid ${accent ? 'transparent' : 'var(--hairline)'}`,
      borderRadius: 16,
      textAlign: 'left',
      position: 'relative',
      minHeight: 110,
      cursor: 'pointer',
      transition: 'transform 160ms var(--ease-out)',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: accent ? 'var(--bg-1)' : 'var(--cy-0)', color: 'var(--cy-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.01em' }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 1 }}>{sub}</div>}
      </div>
      {locked && <div style={{ position: 'absolute', top: 12, right: 12 }}><LockChip /></div>}
    </button>
  );
}

/* -------- Section title (eyebrow + heading + sub) -------- */
function Section({ eyebrow, title, sub, align = 'left' }) {
  return (
    <div style={{ textAlign: align, padding: '0 24px' }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
      <div className="h-1" style={{ marginBottom: sub ? 10 : 0 }}>{title}</div>
      {sub && <div className="body">{sub}</div>}
    </div>
  );
}

/* -------- Scene-enter wrapper -------- */
function SceneEnter({ children, k }) {
  return <div key={k} className="scene-enter" style={{ height: '100%' }}>{children}</div>;
}

/* -------- Expose to window -------- */
Object.assign(window, {
  ICONS,
  useTime,
  CSStatusBar,
  CSHeader,
  Progress,
  GlowOrb,
  Waveform,
  ProgressRing,
  CircularDial,
  HapticPulse,
  SpeakerCone,
  WaterDropParticles,
  DustParticles,
  BenefitRow,
  OptionCard,
  CTAButton,
  Banner,
  LockChip,
  ToolTile,
  Section,
  SceneEnter,
});
