// components.jsx — Shared components for CleanSpeaker
const { useState, useEffect, useRef, useMemo } = React;

// ─── Status bar ───────────────────────────────────────────
function StatusBar({ time = '9:41', dark = false }) {
  const c = dark ? '#fff' : '#0E1530';
  return (
    <div className="cs-statusbar" style={{ color: c }}>
      <span>{time}</span>
      <div className="icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="4.3" y="5" width="3" height="6" rx="0.5"/>
          <rect x="8.6" y="3" width="3" height="8" rx="0.5"/>
          <rect x="12.9" y="0" width="3" height="11" rx="0.5"/>
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 10.3 1 4a10 10 0 0 1 14 0L8 10.3Z" fill={c}/>
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={c} fill="none"/>
          <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill={c}/>
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill={c}/>
        </svg>
      </div>
    </div>
  );
}

// ─── Top bar (back + title) ───────────────────────────────
function TopBar({ title, onBack, right, transparent = false }) {
  return (
    <div className="cs-toptitle" style={transparent ? {background: 'transparent'} : null}>
      {onBack ? (
        <button className="cs-back" onClick={onBack} aria-label="Back">
          <IChevL size={22} />
        </button>
      ) : <div style={{width:40}}/>}
      <div className="title">{title}</div>
      <div style={{width:40, display:'flex', justifyContent:'flex-end'}}>{right || null}</div>
    </div>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────
function TabBar({ active, onTabChange, onOpenPaywall }) {
  const tabs = [
    { id: 'clean',    label: 'Clean',    Icon: ITabClean },
    { id: 'manual',   label: 'Manual',   Icon: ITabManual },
    { id: 'pro',      label: 'Pro',      Icon: ITabPro, pro: true },
    { id: 'settings', label: 'Settings', Icon: ITabSettings },
  ];
  return (
    <div className="cs-tabbar">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id}
            className={'cs-tab' + (isActive ? ' active' : '') + (t.pro ? ' pro' : '')}
            onClick={() => t.id === 'pro' ? onOpenPaywall() : onTabChange(t.id)}>
            <t.Icon size={24} strokeWidth={isActive || t.pro ? 2.2 : 1.8} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── AdMob Banner (mock) ──────────────────────────────────
function AdBanner({ onClick }) {
  const ads = [
    { icon: 'TS', color: 'linear-gradient(135deg,#FF6B6B,#FF8E53)', title: 'Try Speedify VPN', sub: 'Fast & private — Free trial', cta: 'Install' },
    { icon: 'Fx', color: 'linear-gradient(135deg,#22C55E,#0EA5E9)', title: 'Fix Battery Drain', sub: 'Boost your phone — Free', cta: 'Open' },
    { icon: '🎧', color: 'linear-gradient(135deg,#A855F7,#EC4899)', title: 'AudioMax Pro', sub: 'Bass booster & equalizer', cta: 'Get' },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % ads.length), 5000);
    return () => clearInterval(t);
  }, []);
  const ad = ads[i];
  return (
    <div className="cs-adbanner" onClick={onClick} role="button" style={{cursor:'pointer'}}>
      <div className="ad-icon" style={{background: ad.color, fontSize: ad.icon.length > 2 ? 22 : 16}}>{ad.icon}</div>
      <div className="ad-body">
        <div className="ad-title"><span className="ad-tag">AD</span>{ad.title}</div>
        <div className="ad-sub">{ad.sub}</div>
      </div>
      <button className="ad-cta" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>{ad.cta}</button>
    </div>
  );
}

// ─── Bottom sheet ─────────────────────────────────────────
function BottomSheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div className="cs-sheet-backdrop" onClick={onClose} />
      <div className="cs-sheet">
        <div className="handle" />
        {children}
      </div>
    </>
  );
}

// ─── Sound wave animation (concentric rings) ──────────────
function WaveRipple({ active = true, color = '#2E6BFF', size = 220 }) {
  // Rings expand outward; multiple delayed
  const rings = [0, 0.4, 0.8, 1.2];
  return (
    <div style={{
      position: 'relative', width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {active && rings.map((delay, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size, height: size,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          opacity: 0.4,
          animation: `csRipple 1.8s ${delay}s linear infinite`,
        }}/>
      ))}
      {/* Inner solid disc */}
      <div style={{
        width: size * 0.45, height: size * 0.45,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, #5C8DFF, ${color} 70%)`,
        boxShadow: `0 0 40px ${color}55, inset 0 -10px 30px rgba(0,0,0,0.15)`,
        animation: active ? 'csPulse 1.6s ease-in-out infinite' : 'none',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '60%', height: '60%', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #B8CDFF, #4E7BFF)',
          opacity: 0.85,
        }}/>
      </div>
    </div>
  );
}

// ─── Animated sine wave (svg path) ────────────────────────
function SineWave({ freq = 450, amplitude = 22, color = '#2E6BFF', width = 320, height = 80, animate = true }) {
  // Map freq 100..2000 to wavelength
  const cycles = Math.max(2, Math.min(14, Math.round(freq / 120)));
  const w = width, h = height, mid = h / 2;
  // Build path
  const segments = 200;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * w;
    const y = mid + Math.sin((i / segments) * Math.PI * 2 * cycles) * amplitude;
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block'}}>
      <defs>
        <linearGradient id="sgrad" x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.2"/>
          <stop offset="0.5" stopColor={color}/>
          <stop offset="1" stopColor={color} stopOpacity="0.2"/>
        </linearGradient>
      </defs>
      <path d={pts.join(' ')} stroke="url(#sgrad)" strokeWidth="2.5" fill="none" strokeLinecap="round">
        {animate && <animate attributeName="stroke-dashoffset" from="0" to={`-${cycles * 40}`} dur="1.5s" repeatCount="indefinite"/>}
      </path>
    </svg>
  );
}

// ─── Confetti burst ───────────────────────────────────────
function Confetti({ count = 30 }) {
  const colors = ['#2E6BFF', '#F1B53A', '#22C55E', '#EC4899', '#A855F7', '#FF8E53'];
  const pieces = useMemo(() => Array.from({length: count}).map((_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 30,
    color: colors[i % colors.length],
    delay: Math.random() * 0.3,
    rot: Math.random() * 360,
    shape: Math.random() > 0.5 ? '50%' : '2px',
  })), [count]);
  return (
    <div style={{position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden'}}>
      {pieces.map((p, i) => (
        <div key={i} className="cs-confetto" style={{
          left: `${p.left}%`, top: `${p.top}%`,
          background: p.color, borderRadius: p.shape,
          animationDelay: `${p.delay}s`,
          transform: `rotate(${p.rot}deg)`,
        }}/>
      ))}
    </div>
  );
}

// Format seconds as M:SS
function fmtTime(s) {
  const m = Math.floor(s / 60), ss = s % 60;
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

Object.assign(window, {
  StatusBar, TopBar, TabBar, AdBanner, BottomSheet, WaveRipple, SineWave, Confetti, fmtTime,
});
