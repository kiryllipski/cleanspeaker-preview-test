// Shared components for Sonic Clean
const { useState, useEffect, useRef, useMemo } = React;

// Status bar (Android)
function StatusBar({ tint = '#fff' }) {
  return (
    <div className="android-statusbar" style={{ color: tint }}>
      <span style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>12:30</span>
      <div className="right" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path d="M9 9.5L1 1.5L9 1L17 1.5L9 9.5Z" stroke={tint} strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M1 5C3 3 5.5 2 8 2C10.5 2 13 3 15 5" stroke={tint} strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M3.5 7.5C4.8 6.5 6.3 6 8 6C9.7 6 11.2 6.5 12.5 7.5" stroke={tint} strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="8" cy="10" r="1.2" fill={tint}/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600 }}>87</span>
          <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
            <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke={tint} strokeOpacity="0.6"/>
            <rect x="2" y="2" width="13" height="7" rx="1" fill={tint}/>
            <rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill={tint} fillOpacity="0.6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function NavPill({ tint = 'rgba(255,255,255,0.6)' }) {
  return (
    <div className="android-nav">
      <div className="pill" style={{ background: tint }} />
    </div>
  );
}

// Android frame shell
function Frame({ children, screenBg = 'var(--bg)', tint = '#fff', navTint }) {
  return (
    <div className="android-frame">
      <div className="android-screen" style={{ background: screenBg }}>
        <StatusBar tint={tint} />
        <div style={{ position: 'absolute', inset: '44px 0 28px', overflow: 'hidden', zIndex: 1 }}>
          {children}
        </div>
        <NavPill tint={navTint || 'rgba(255,255,255,0.6)'} />
      </div>
    </div>
  );
}

// Frameless screen for the gallery
function ScreenCard({ index, title, children, screenBg = 'var(--bg)', tint = '#fff' }) {
  return (
    <div className="screen-card">
      <div className="meta">
        <span className="num">{String(index).padStart(2, '0')}</span>
        <span className="title">{title}</span>
      </div>
      <div className="frame" style={{ background: screenBg }}>
        <StatusBar tint={tint} />
        <div style={{ position: 'absolute', inset: '44px 0 28px', overflow: 'hidden', zIndex: 1 }}>
          {children}
        </div>
        <NavPill tint={'rgba(255,255,255,0.6)'} />
      </div>
    </div>
  );
}

// Animated wave ring — concentric circles with pulsing
function WaveRing({ size = 240, color = 'var(--cyan)', state = 'idle' }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* outer glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at center, ${color === 'var(--cyan)' ? 'rgba(0,229,255,0.25)' : 'rgba(0,229,255,0.2)'} 0%, transparent 60%)`,
        filter: 'blur(20px)',
        animation: 'pulseGlow 2.5s ease-in-out infinite'
      }} />
      {/* expanding rings */}
      {[0, 0.5, 1, 1.5].map((delay, i) => (
        <div key={i} style={{
          position: 'absolute',
          inset: '20%',
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: 0,
          animation: state === 'idle' ? 'none' : `ringPulse 2.4s ease-out infinite ${delay}s`
        }} />
      ))}
      <svg viewBox="0 0 240 240" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="wr-grad" cx="50%" cy="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1"/>
            <stop offset="60%" stopColor={color} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="wr-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        {/* concentric thin rings */}
        {[40, 60, 80, 100, 118].map((r, i) => (
          <circle key={r} cx="120" cy="120" r={r}
            stroke="url(#wr-line)"
            strokeWidth={i === 4 ? 1.5 : 1}
            fill="none"
            opacity={0.15 + i * 0.12}
          />
        ))}
        {/* center solid */}
        <circle cx="120" cy="120" r="30" fill="url(#wr-grad)" />
        <circle cx="120" cy="120" r="14" fill={color} opacity="0.9" />
        <circle cx="120" cy="120" r="6" fill="#fff" />
      </svg>
      {/* dots around outer */}
      <svg viewBox="0 0 240 240" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const r = 115;
          const x = 120 + Math.cos(a) * r;
          const y = 120 + Math.sin(a) * r;
          return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 0.8} fill={color} opacity={0.3 + (i % 3) * 0.2} />;
        })}
      </svg>
    </div>
  );
}

// Real waveform — sinusoidal pattern, vertical bars
function WaveformBars({ count = 60, color = 'var(--cyan)', height = 80, animated = true, baseAmp = 0.4, randomSeed = 1 }) {
  const bars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const t = i / count;
      // mix of two sines for organic feel
      const v = Math.abs(Math.sin(t * Math.PI * 4 + randomSeed) * 0.6 + Math.sin(t * Math.PI * 9 + randomSeed * 2) * 0.4);
      return Math.max(0.08, baseAmp + v * 0.6);
    });
  }, [count, baseAmp, randomSeed]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height, justifyContent: 'center' }}>
      {bars.map((v, i) => (
        <i key={i} style={{
          display: 'block',
          width: 3,
          height: `${v * 100}%`,
          background: color,
          borderRadius: 4,
          boxShadow: `0 0 8px ${color === 'var(--cyan)' ? 'rgba(0,229,255,0.55)' : color}`,
          animation: animated ? `waveBar ${1 + (i % 5) * 0.2}s ease-in-out infinite ${(i % 7) * 0.08}s` : 'none',
          opacity: 0.85
        }} />
      ))}
    </div>
  );
}

// Frequency circular dial
function FrequencyDial({ size = 280, value = 680, min = 100, max = 2000, label = 'Frequency', state = 'idle', progress = 0 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 28;
  const circumference = 2 * Math.PI * radius;
  const angle = ((value - min) / (max - min)) * 360 - 90;
  const indicatorX = cx + Math.cos(angle * Math.PI / 180) * radius;
  const indicatorY = cy + Math.sin(angle * Math.PI / 180) * radius;
  const offset = circumference - (progress * circumference);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{
        position: 'absolute', inset: -20,
        background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 60%)',
        filter: 'blur(20px)'
      }} />
      <svg viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="fd-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7df9ff"/>
            <stop offset="100%" stopColor="#0083a6"/>
          </linearGradient>
        </defs>
        {/* tick marks around */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const r1 = radius + 6;
          const r2 = radius + (i % 5 === 0 ? 16 : 10);
          const x1 = cx + Math.cos(a) * r1;
          const y1 = cy + Math.sin(a) * r1;
          const x2 = cx + Math.cos(a) * r2;
          const y2 = cy + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 5 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'} strokeWidth={1} />;
        })}
        {/* track */}
        <circle cx={cx} cy={cy} r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth={2} fill="none" />
        {/* progress arc */}
        <circle cx={cx} cy={cy} r={radius}
          stroke="url(#fd-grad)"
          strokeWidth={3}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.7))', transition: 'stroke-dashoffset 0.4s ease' }}
        />
        {/* indicator dot */}
        <circle cx={indicatorX} cy={indicatorY} r={6} fill="#fff" />
        <circle cx={indicatorX} cy={indicatorY} r={10} fill="rgba(0,229,255,0.4)" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
      }}>
        <div className="t-eyebrow" style={{ fontSize: 10 }}>{label}</div>
        <div style={{ fontFamily: 'Onest', fontSize: 56, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>
          {value}
        </div>
        <div className="t-caption" style={{ fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Hz</div>
      </div>
    </div>
  );
}

// Phone illustration (line art SVG) — the phone with sound waves coming out of speaker
function PhoneSoundIllustration({ size = 220, intensity = 1 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 220 308" fill="none">
      <defs>
        <linearGradient id="phone-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2230"/>
          <stop offset="100%" stopColor="#0a0e15"/>
        </linearGradient>
        <radialGradient id="speaker-glow" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8"/>
          <stop offset="40%" stopColor="#00e5ff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7df9ff" stopOpacity="1"/>
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.2"/>
        </linearGradient>
      </defs>
      {/* phone body */}
      <rect x="50" y="20" width="120" height="200" rx="20" fill="url(#phone-body)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      <rect x="60" y="30" width="100" height="170" rx="12" fill="#000" />
      {/* notch */}
      <rect x="95" y="34" width="30" height="4" rx="2" fill="#0a0e15" />
      {/* speaker grille at bottom */}
      <rect x="80" y="210" width="60" height="3" rx="1.5" fill="#1a2230" />
      <rect x="80" y="216" width="60" height="3" rx="1.5" fill="#00e5ff" opacity="0.7"/>
      {/* sound waves below */}
      <ellipse cx="110" cy="220" rx="80" ry="60" fill="url(#speaker-glow)" opacity={0.8 * intensity}/>
      {/* wave arcs */}
      {[1, 2, 3].map(i => (
        <path key={i}
          d={`M${50 - i*15},${230 + i*5} Q110,${280 + i*8} ${170 + i*15},${230 + i*5}`}
          stroke="url(#wave-grad)"
          strokeWidth={2}
          fill="none"
          opacity={1 - i * 0.25}
        />
      ))}
      {/* particles */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = ((i / 24) * Math.PI) + Math.PI;
        const r = 60 + (i % 4) * 12;
        const x = 110 + Math.cos(a) * r;
        const y = 235 + Math.sin(a) * r * 0.6;
        return <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1} fill="#7df9ff" opacity={0.4 + (i % 3) * 0.2}/>;
      })}
    </svg>
  );
}

// Sound wave horizontal animated line (sinusoidal)
function SineWaveLine({ width = 320, height = 80, color = 'var(--cyan)', amplitude = 0.6, frequency = 4, phase = 0 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let x = 0; x <= width; x += 2) {
      const t = x / width;
      const y = height / 2 + Math.sin(t * Math.PI * frequency * 2 + phase) * (height / 2 - 6) * amplitude * Math.exp(-Math.abs(t - 0.5) * 1.5);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, [width, height, amplitude, frequency, phase]);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sine-grad-${phase}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.1"/>
          <stop offset="50%" stopColor={color} stopOpacity="1"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={`url(#sine-grad-${phase})`} strokeWidth="2" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color === 'var(--cyan)' ? 'rgba(0,229,255,0.7)' : color})` }}/>
    </svg>
  );
}

// Tab bar (bottom)
function TabBar({ active = 'home' }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 11L12 3L21 11V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V11Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'test', label: 'Test', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 12H6M9 6V18M14 9V15M19 11V13" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'history', label: 'History', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6"/>
        <path d="M12 7V12L15 14" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'settings', label: 'Settings', icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.6"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={c} strokeWidth="1.6"/>
      </svg>
    )}
  ];
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 80,
      paddingBottom: 4,
      background: 'linear-gradient(180deg, transparent, rgba(5,6,8,0.95) 30%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTop: '1px solid var(--line)',
      zIndex: 5
    }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        const color = isActive ? 'var(--cyan)' : 'var(--text-dim)';
        return (
          <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative' }}>
            {isActive && <div style={{ position: 'absolute', top: -8, width: 32, height: 3, borderRadius: 3, background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan-glow)' }}/>}
            {t.icon(color)}
            <span style={{ fontSize: 10, color, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Icon library — both <Icon.X c=... s=.../> JSX usage and Icon.X({c,s}) call usage work.
const Icon = {
  Droplet: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3C12 3 5 11 5 15.5C5 19.6 8.13 22 12 22C15.87 22 19 19.6 19 15.5C19 11 12 3 12 3Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M8.5 16C8.5 17.7 9.8 19 11.5 19" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  Dust: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="8" r="1.5" fill={c}/>
      <circle cx="12" cy="6" r="2" fill={c}/>
      <circle cx="18" cy="9" r="1.5" fill={c}/>
      <circle cx="9" cy="13" r="1.2" fill={c}/>
      <circle cx="15" cy="14" r="1.6" fill={c}/>
      <circle cx="7" cy="18" r="1.4" fill={c}/>
      <circle cx="13" cy="19" r="1" fill={c}/>
      <circle cx="18" cy="17" r="1.3" fill={c}/>
    </svg>
  ),
  Speaker: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M11 5L6 9H3V15H6L11 19V5Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M15.5 9C16.4 10 17 11.4 17 12C17 12.6 16.4 14 15.5 15" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M18.5 7C20 8.5 21 10.5 21 12C21 13.5 20 15.5 18.5 17" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  Headphones: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 14V11C3 6 7 3 12 3C17 3 21 6 21 11V14" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <rect x="3" y="13" width="4" height="7" rx="2" stroke={c} strokeWidth="1.6"/>
      <rect x="17" y="13" width="4" height="7" rx="2" stroke={c} strokeWidth="1.6"/>
    </svg>
  ),
  Sparkle: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 9L20 10L13.5 11L12 18L10.5 11L4 10L10.5 9L12 2Z" fill={c}/>
      <path d="M19 14L19.7 17L22 17.5L19.7 18L19 21L18.3 18L16 17.5L18.3 17L19 14Z" fill={c} opacity="0.7"/>
    </svg>
  ),
  Diamond: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 3H18L22 9L12 22L2 9L6 3Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M2 9H22M9 3L12 22M15 3L12 22" stroke={c} strokeWidth="1.6" strokeLinejoin="round" opacity="0.7"/>
    </svg>
  ),
  Check: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12L10 17L19 8" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowRight: ({c = '#fff', s = 22} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowLeft: ({c = '#fff', s = 22} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Star: ({c = '#fbbf24', s = 32, filled = true} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'}>
      <path d="M12 2L14.85 8.85L22 9.55L16.5 14.35L18.15 21.5L12 17.85L5.85 21.5L7.5 14.35L2 9.55L9.15 8.85L12 2Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  Close: ({c = '#fff', s = 20} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 6L18 18M18 6L6 18" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Play: ({c = '#fff', s = 22} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M8 5V19L19 12L8 5Z"/>
    </svg>
  ),
  Pause: ({c = '#fff', s = 22} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <rect x="6" y="5" width="4" height="14" rx="1"/>
      <rect x="14" y="5" width="4" height="14" rx="1"/>
    </svg>
  ),
  Wave: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M2 12C4 6 6 18 8 12C10 6 12 18 14 12C16 6 18 18 20 12C21 9 22 12 22 12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Shield: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 5V12C4 17 8 21 12 22C16 21 20 17 20 12V5L12 2Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Timer: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="8" stroke={c} strokeWidth="1.6"/>
      <path d="M12 9V13L14.5 14.5" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 2H15" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Bolt: ({c = '#fff', s = 24} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14H11L10 22L20 9H13L13 2Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill={c} fillOpacity="0.15"/>
    </svg>
  ),
  Volume: ({c = '#fff', s = 22} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M11 5L6 9H3V15H6L11 19V5Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" fill={c} fillOpacity="0.2"/>
      <path d="M15 9V15M18 7V17M21 10V14" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Down: ({c = '#fff', s = 22} = {}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M12 19L18 13M12 19L6 13" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

Object.assign(window, {
  StatusBar, NavPill, Frame, ScreenCard,
  WaveRing, WaveformBars, FrequencyDial, PhoneSoundIllustration, SineWaveLine,
  TabBar, Icon
});
