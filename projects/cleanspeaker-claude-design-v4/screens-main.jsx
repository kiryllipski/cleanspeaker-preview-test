// screens-main.jsx — Clean (auto) + Manual screens

// ─── Clean screen (auto cleaning, 60s) ────────────────────
const CLEAN_DURATION = 60; // seconds

function CleanScreen({ onFinish, isPro, speedMul = 1 }) {
  // state: 'idle' | 'running' | 'paused' | 'done'
  const [state, setState] = useState('idle');
  const [elapsed, setElapsed] = useState(0);
  const tickRef = useRef(null);

  useEffect(() => {
    if (state !== 'running') return;
    const step = 0.1 * speedMul;
    tickRef.current = setInterval(() => {
      setElapsed((e) => {
        if (e + step >= CLEAN_DURATION) {
          clearInterval(tickRef.current);
          setTimeout(() => {
            setState('done');
            onFinish && onFinish();
          }, 300);
          return CLEAN_DURATION;
        }
        return e + step;
      });
    }, 100);
    return () => clearInterval(tickRef.current);
  }, [state, speedMul]);

  const remaining = Math.max(0, CLEAN_DURATION - elapsed);
  const pct = Math.min(100, (elapsed / CLEAN_DURATION) * 100);
  const min = Math.floor(remaining / 60);
  const sec = Math.floor(remaining % 60);
  const display = `${min}:${sec.toString().padStart(2, '0')}`;

  const isRunning = state === 'running';

  const start = () => { setElapsed(0); setState('running'); };
  const stop = () => {
    clearInterval(tickRef.current);
    setState('idle');
    setElapsed(0);
  };

  return (
    <div data-screen-label="Clean" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <TopBar title="Cleaner" />

      {/* Full-screen pulse (active only) */}
      <CleanBgPulse active={isRunning} />

      {/* Edge-to-edge wave bars */}
      <div style={{
        height: 56,
        width: '100%',
        padding: 0,
        opacity: isRunning ? 1 : 0,
        transition: 'opacity 320ms var(--ease)',
        position: 'relative',
        zIndex: 1,
      }}>
        <SoundWaveBars active={isRunning} bars={64} />
      </div>

      {/* Centered gauge */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 1, padding: '0 24px',
      }}>
        <div style={{ position: 'relative', width: 340, height: 280 }}>
          <CleanGauge pct={pct} active={isRunning} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6, paddingTop: 22,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {state === 'idle' ? 'Ready' : 'Cleaning'}
            </div>
            <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1, color: 'var(--ink)' }}>
              {display}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue)' }}>
              {Math.round(pct)}%
            </div>
          </div>
        </div>
      </div>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: 10, padding: '0 24px 16px', position: 'relative', zIndex: 1 }}>
        {[
          { label: 'Frequency', val: '450 Hz', Icon: ISine },
          { label: 'Vibration', val: isRunning ? 'On' : 'Idle', Icon: IVibMed },
          { label: 'Mode', val: 'Auto', Icon: ISparkle }
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', borderRadius: 14,
            padding: '10px 8px', textAlign: 'center',
            border: '1px solid rgba(46, 107, 255, 0.08)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--blue)', marginBottom: 2 }}>
              <s.Icon size={18} strokeWidth={2} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{s.val}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA — fixed-height container avoids jump between Start (cs-cta 63px) and Stop (72px circle) */}
      <div style={{ padding: '0 24px 16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 88, position: 'relative', zIndex: 1 }}>
        {!isRunning ? (
          <button className="cs-cta" onClick={start}>
            <IPlay size={20} />
            <span>{state === 'idle' ? 'Start Cleaning' : 'Resume'}</span>
          </button>
        ) : (
          <button onClick={stop} aria-label="Stop" style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#fff', border: '0', color: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 14px 32px rgba(95, 168, 255, 0.35), 0 4px 14px rgba(62, 139, 226, 0.25)',
          }}>
            <IStop size={28} />
          </button>
        )}
      </div>
    </div>
  );
}

// Full-screen ring pulse — concentric circles expanding outward with white stroke
function CleanBgPulse({ active }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {active && [0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: '50%', top: '50%',
          width: 780, height: 780,
          borderRadius: '50%',
          border: '2px solid #fff',
          background: 'radial-gradient(circle, rgba(46,107,255,0.12) 0%, rgba(46,107,255,0.04) 60%, rgba(46,107,255,0) 80%)',
          boxShadow: 'inset 0 0 0 1px rgba(46,107,255,0.20)',
          transformOrigin: 'center center',
          animation: `csRingPulse 3.6s ${i * 0.9}s ease-out infinite`,
          opacity: 0,
        }}/>
      ))}
    </div>
  );
}

// SVG arc gauge
function CleanGauge({ pct = 0, active = false }) {
  // Arc from 150° to 390°
  const R = 130, CX = 170, CY = 140;
  const startA = 150, endA = 390;
  const rad = (a) => (a * Math.PI) / 180;
  const point = (a) => `${CX + R * Math.cos(rad(a))} ${CY + R * Math.sin(rad(a))}`;
  const fullPath = `M ${point(startA)} A ${R} ${R} 0 1 1 ${point(endA)}`;
  const progA = startA + (endA - startA) * (pct / 100);
  const progPath = `M ${point(startA)} A ${R} ${R} 0 ${(progA - startA) > 180 ? 1 : 0} 1 ${point(progA)}`;
  return (
    <svg width="340" height="280" viewBox="0 0 340 280" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="gaugegrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3669F0"/>
          <stop offset="0.55" stopColor="#5482FA"/>
          <stop offset="1" stopColor="#3BD8F1"/>
        </linearGradient>
      </defs>
      {/* Track */}
      <path d={fullPath} stroke="rgba(54, 105, 240, 0.12)" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Tick marks */}
      {[...Array(32)].map((_, i) => {
        const a = startA + (i / 31) * (endA - startA);
        const r1 = R - 24, r2 = R - 30;
        const reached = (i / 31) * 100 <= pct;
        return (
          <line key={i}
            x1={CX + r1 * Math.cos(rad(a))} y1={CY + r1 * Math.sin(rad(a))}
            x2={CX + r2 * Math.cos(rad(a))} y2={CY + r2 * Math.sin(rad(a))}
            stroke={reached ? 'var(--blue)' : 'rgba(54, 105, 240, 0.16)'}
            strokeWidth="2" strokeLinecap="round" />
        );
      })}
      {/* Progress */}
      {pct > 0 && (
        <path d={progPath} stroke="url(#gaugegrad)" strokeWidth="14" fill="none" strokeLinecap="round"
          style={{ transition: 'd 100ms linear', filter: active ? 'drop-shadow(0 6px 16px rgba(54,105,240,0.45))' : 'none' }} />
      )}
    </svg>
  );
}

// Edge-to-edge animated bars (thin)
function SoundWaveBars({ active, bars = 48 }) {
  const arr = useMemo(() => Array.from({ length: bars }, (_, i) => i), [bars]);
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      height: '100%', width: '100%', gap: 2,
    }}>
      {arr.map((i) => (
        <div key={i} style={{
          flex: 1,
          height: '100%',
          background: 'linear-gradient(180deg, #5482FA, #3669F0)',
          borderRadius: 1.5,
          transformOrigin: 'center',
          animation: active ? `csBar${i % 7} 0.${4 + (i % 5)}s ease-in-out infinite alternate` : 'none',
          transform: active ? undefined : 'scaleY(0.18)',
        }} />
      ))}
      <style>{`
        @keyframes csBar0 { from { transform: scaleY(0.18) } to { transform: scaleY(0.95) } }
        @keyframes csBar1 { from { transform: scaleY(0.35) } to { transform: scaleY(0.75) } }
        @keyframes csBar2 { from { transform: scaleY(0.50) } to { transform: scaleY(0.25) } }
        @keyframes csBar3 { from { transform: scaleY(0.20) } to { transform: scaleY(0.85) } }
        @keyframes csBar4 { from { transform: scaleY(0.75) } to { transform: scaleY(0.30) } }
        @keyframes csBar5 { from { transform: scaleY(0.45) } to { transform: scaleY(0.95) } }
        @keyframes csBar6 { from { transform: scaleY(0.60) } to { transform: scaleY(0.15) } }
      `}</style>
    </div>
  );
}

// ─── Manual screen (swipe vertical for Hz, popovers) ──────
const WAVEFORMS = [
  { id: 'sine',     label: 'Sine',       Icon: ISine },
  { id: 'square',   label: 'Square',     Icon: ISquare },
  { id: 'triangle', label: 'Triangle',   Icon: ITriangle },
  { id: 'ramp',     label: 'Ramp',       Icon: IRamp },
  { id: 'harmonic', label: 'Harmonious', Icon: IHarmonic },
];

const VIBRATIONS = [
  { id: 'off',    label: 'Off',    Icon: IVibOff },
  { id: 'soft',   label: 'Soft',   Icon: IVibSoft },
  { id: 'medium', label: 'Medium', Icon: IVibMed },
  { id: 'strong', label: 'Strong', Icon: IVibStrong },
  { id: 'pulse',  label: 'Pulse',  Icon: IVibPulse },
];

function ManualScreen({ isPro, onOpenPaywall }) {
  const [freq, setFreq] = useState(450);
  const [wave, setWave] = useState('sine');
  const [vib, setVib] = useState('medium');
  const [playing, setPlaying] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [hint, setHint] = useState(true);

  const dragRef = useRef({ active: false, startY: 0, startFreq: 0 });
  const surfRef = useRef(null);

  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(() => setHint(false), 3000);
    return () => clearTimeout(t);
  }, [hint]);

  // Only start dragging if pointerdown lands on the swipe surface itself
  // — never on an interactive child (button, etc).
  const onPointerDown = (e) => {
    if (e.target.closest('button')) return;
    dragRef.current = { active: true, startY: e.clientY, startFreq: freq };
    setHint(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dy = dragRef.current.startY - e.clientY;
    const delta = Math.round(dy * 3);
    const next = Math.max(40, Math.min(8000, dragRef.current.startFreq + delta));
    setFreq(next);
  };
  const onPointerUp = (e) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const waveObj = WAVEFORMS.find((w) => w.id === wave);
  const vibObj = VIBRATIONS.find((v) => v.id === vib);

  return (
    <div data-screen-label="Manual" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <TopBar title="Manual" right={
        !isPro && (
          <button onClick={onOpenPaywall} style={{
            background: 'linear-gradient(135deg, #3669F0 0%, #5482FA 55%, #3BD8F1 100%)',
            color: '#fff', border: 0, borderRadius: 999,
            padding: '6px 12px', fontSize: 12, fontWeight: 800, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            boxShadow: '0 6px 16px rgba(95, 168, 255, 0.35)',
          }}>
            <ICrown size={14}/> Pro
          </button>
        )
      }/>

      {/* Background pulse while playing */}
      <CleanBgPulse active={playing} />

      {/* Swipe surface — fills available space */}
      <div
        ref={surfRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          touchAction: 'none', userSelect: 'none',
          position: 'relative', cursor: 'ns-resize', zIndex: 1,
          padding: '0 24px',
        }}>

        {/* Big freq display */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>
            Frequency
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 4 }}>
            <div style={{
              fontSize: 84, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)',
              fontVariantNumeric: 'tabular-nums', lineHeight: 1,
            }}>
              {freq}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--muted-2)' }}>Hz</div>
          </div>
          {/* Hint directly under the Hz value */}
          <div style={{ height: 28, marginTop: 8, display: 'flex', justifyContent: 'center' }}>
            {hint && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.85)', color: 'var(--blue)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                animation: 'csFadeIn 240ms var(--ease)',
                boxShadow: '0 4px 12px rgba(46, 107, 255, 0.12)',
              }}>
                <IChevU size={14} strokeWidth={2.4}/>
                Swipe up / down to adjust
                <IChevD size={14} strokeWidth={2.4}/>
              </div>
            )}
          </div>
        </div>

        {/* Live wave */}
        <div style={{ margin: '8px 0 18px' }}>
          <LiveWave wave={wave} freq={freq} playing={playing}/>
        </div>

        {/* Mode buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <ModeButton label={waveObj.label} Icon={waveObj.Icon} onClick={() => setSheet('wave')}/>
          <ModeButton label={vibObj.label}  Icon={vibObj.Icon}  onClick={() => setSheet('vib')}/>
        </div>
      </div>

      {/* CTA — fixed-height container avoids jump between Play (cs-cta 63px) and Stop (72px circle) */}
      <div style={{ padding: '0 24px 16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 88, position: 'relative', zIndex: 1 }}>
        {!playing ? (
          <button className="cs-cta" onClick={() => setPlaying(true)}>
            <IPlay size={20}/>
            <span>Play Sound</span>
          </button>
        ) : (
          <button onClick={() => setPlaying(false)} aria-label="Stop" style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#fff', border: '0', color: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 14px 32px rgba(95, 168, 255, 0.35), 0 4px 14px rgba(62, 139, 226, 0.25)',
          }}>
            <IStop size={28}/>
          </button>
        )}
      </div>

      {/* Wave selector sheet */}
      <BottomSheet open={sheet === 'wave'} onClose={() => setSheet(null)}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textAlign: 'center', marginBottom: 12, letterSpacing: '0.08em' }}>WAVEFORM</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0 8px' }}>
          {WAVEFORMS.map((w) => (
            <button key={w.id} onClick={() => { setWave(w.id); setSheet(null); }}
              className={'cs-iconbtn' + (wave === w.id ? ' active' : '')}
              style={{ width: 56, height: 56 }}
              aria-label={w.label}>
              <w.Icon size={26} strokeWidth={2}/>
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* Vibration selector sheet */}
      <BottomSheet open={sheet === 'vib'} onClose={() => setSheet(null)}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', textAlign: 'center', marginBottom: 12, letterSpacing: '0.08em' }}>VIBRATION</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0 8px' }}>
          {VIBRATIONS.map((v) => (
            <button key={v.id} onClick={() => { setVib(v.id); setSheet(null); }}
              className={'cs-iconbtn' + (vib === v.id ? ' active' : '')}
              style={{ width: 56, height: 56 }}
              aria-label={v.label}>
              <v.Icon size={26} strokeWidth={2}/>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}

function ModeButton({ label, Icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px',
      background: '#fff',
      border: '1px solid rgba(46, 107, 255, 0.12)',
      borderRadius: 999,
      cursor: 'pointer',
      color: 'var(--ink)',
      fontFamily: 'inherit',
      boxShadow: '0 4px 14px rgba(46, 107, 255, 0.06)',
    }}>
      <span style={{ color: 'var(--blue)', display: 'flex' }}><Icon size={20} strokeWidth={2}/></span>
      <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
      <IChevD size={14} strokeWidth={2} stroke="var(--muted)"/>
    </button>
  );
}

// Live waveform display — cycles scale across the full 40Hz..8000Hz range without hitting a ceiling
function LiveWave({ wave, freq, playing }) {
  const w = 320, h = 90;
  // Log-mapped cycles so high frequencies actually look denser (vs old linear /100 capped at 12)
  const cycles = Math.max(2, Math.min(36, Math.round(2 + Math.log2(Math.max(40, freq) / 40) * 3.6)));
  const path = useMemo(() => buildWavePath(wave, cycles, w, h, 24), [wave, cycles]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="livegrad" x1="0" x2="1">
          <stop offset="0" stopColor="#3669F0" stopOpacity="0.1"/>
          <stop offset="0.5" stopColor="#3669F0" stopOpacity="1"/>
          <stop offset="1" stopColor="#3BD8F1" stopOpacity="0.2"/>
        </linearGradient>
      </defs>
      <path d={path} stroke="url(#livegrad)" strokeWidth="1.4" fill="none" strokeLinecap="round"
        style={{ transition: 'd 200ms var(--ease)' }}>
        {playing && (
          <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="0.6s" repeatCount="indefinite"/>
        )}
      </path>
    </svg>
  );
}

function buildWavePath(wave, cycles, w, h, amp) {
  const mid = h / 2;
  const segments = 320;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * w;
    const t = (i / segments) * cycles;
    const phase = (t % 1) * 2 * Math.PI;
    const tNorm = t % 1;
    let y;
    switch (wave) {
      case 'sine':     y = Math.sin(phase); break;
      case 'square':   y = tNorm < 0.5 ? 1 : -1; break;
      case 'triangle': y = tNorm < 0.5 ? -1 + tNorm * 4 : 3 - tNorm * 4; break;
      case 'ramp':     y = 1 - tNorm * 2; break;
      case 'harmonic': y = (Math.sin(phase) + Math.sin(phase * 2) * 0.5 + Math.sin(phase * 3) * 0.3) / 1.8; break;
      default: y = Math.sin(phase);
    }
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${(mid - y * amp).toFixed(1)}`);
  }
  return pts.join(' ');
}

Object.assign(window, { CleanScreen, ManualScreen, CLEAN_DURATION });
