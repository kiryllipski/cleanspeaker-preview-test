/* CleanSpeaker — App screens (Home, Actions, Cycle, Test, Result, Manual) */
const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

/* ──────────────────────────────────────────────────────────────
   08 — Home (returning user)
─────────────────────────────────────────────────────────────── */
function ScrHome({ nav }) {
  const quickActions = [
    { id: 'water-eject', t: 'Water', sub: '165 Hz', i: ICONS.water(22) },
    { id: 'dust-clean', t: 'Dust', sub: '300 Hz', i: ICONS.dust(22) },
    { id: 'muffled-fix', t: 'Muffled', sub: '500 Hz', i: ICONS.muffled(22) },
    { id: 'pulse', t: 'Pulse', sub: 'Haptic', i: ICONS.pulse(22) },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      {/* Top bar */}
      <div style={{ padding: '8px 22px 0', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>Good morning</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>CleanSpeaker</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px',
            borderRadius: 999, background: 'rgba(91,213,255,0.12)',
            border: '1px solid rgba(91,213,255,0.3)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--cy-1)',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--cy-1)',
                          boxShadow: '0 0 6px var(--cy-1)' }}/>
            PRO
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: 999, border: '1px solid var(--hairline-2)',
            background: 'var(--bg-glass)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--fg-1)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 1 v2 M8 13 v2 M1 8 h2 M13 8 h2 M3 3 l1.5 1.5 M11.5 11.5 L13 13 M3 13 l1.5-1.5 M11.5 4.5 L13 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div style={{ padding: '14px 22px 22px', height: 'calc(100% - 36px - 60px)',
                    display: 'flex', flexDirection: 'column' }}>
        {/* Hero: status card */}
        <div className="glass" style={{ padding: 20, marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
          {/* bg waveform decoration */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.18,
                        maskImage: 'linear-gradient(180deg, transparent, black 40%, transparent)',
                        WebkitMaskImage: 'linear-gradient(180deg, transparent, black 40%, transparent)' }}>
            <Waveform height={120} bars={64} intensity={0.5}/>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
            <ProgressRing size={86} value={0.86} thickness={6}>
              <div className="hz" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>86</div>
              <div style={{ fontSize: 9, color: 'var(--fg-2)', letterSpacing: '0.2em' }}>/ 100</div>
            </ProgressRing>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--ok)',
                            textTransform: 'uppercase', fontWeight: 600 }}>● Speaker healthy</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4, letterSpacing: '-0.01em' }}>
                Last cleaned 6 days ago
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 3 }}>
                Recommended in 8 days
              </div>
            </div>
          </div>
        </div>

        {/* Big CTA: Deep Clean */}
        <button onClick={() => nav('cycle')} style={{
          padding: 18, borderRadius: 22, border: '1px solid rgba(91,213,255,0.45)',
          background: 'linear-gradient(180deg, rgba(91,213,255,0.18) 0%, rgba(14,124,196,0.08) 100%)',
          color: 'var(--fg-0)', textAlign: 'left', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 10px 30px -12px rgba(91,213,255,0.4)',
          marginBottom: 14,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(180deg, #5BD5FF, #25B6F5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#021018', boxShadow: '0 4px 16px rgba(91,213,255,0.5)',
          }}>{ICONS.shield(26)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Deep Clean Pro</div>
            <div style={{ fontSize: 12, color: 'var(--fg-1)', marginTop: 2 }}>
              3-stage frequency sweep · 40 s
            </div>
          </div>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.arrow(20)}</div>
        </button>

        {/* Quick actions 2x2 */}
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', marginBottom: 10 }}>Quick Rescue</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => {
              if (a.id === 'pulse') return nav('pulse');
              const t = a.id==='muffled-fix' ? 'Muffled Fix' : a.id==='dust-clean' ? 'Dust Clean' : 'Water Eject';
              nav('action', { ...a, t });
            }} style={{
              padding: '14px 6px', borderRadius: 16,
              background: a.id === 'pulse'
                ? 'linear-gradient(180deg, rgba(91,213,255,0.14), rgba(91,213,255,0.04))'
                : 'rgba(255,255,255,0.03)',
              border: a.id === 'pulse'
                ? '1px solid rgba(91,213,255,0.35)'
                : '1px solid var(--hairline-2)',
              color: 'var(--fg-0)', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8, position: 'relative',
            }}>
              {a.id === 'pulse' && (
                <div style={{
                  position: 'absolute', top: -7, right: 6, padding: '2px 6px',
                  borderRadius: 999, background: 'var(--cy-1)', color: '#021018',
                  fontSize: 8, fontWeight: 700, letterSpacing: '0.12em',
                }}>NEW</div>
              )}
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(91,213,255,0.1)',
                border: '1px solid rgba(91,213,255,0.25)',
                color: 'var(--cy-1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{a.i}</div>
              <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap' }}>{a.t}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>{a.sub}</div>
            </button>
          ))}
        </div>

        {/* Tools row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <button onClick={() => nav('test')} style={{
            padding: '14px 14px', borderRadius: 14, textAlign: 'left',
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--hairline-2)',
            color: 'var(--fg-0)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ color: 'var(--cy-1)' }}>{ICONS.test(22)}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>Sound Test</div>
              <div style={{ fontSize: 11, color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>20 Hz – 20 kHz</div>
            </div>
          </button>
          <button onClick={() => nav('manual')} style={{
            padding: '14px 14px', borderRadius: 14, textAlign: 'left',
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--hairline-2)',
            color: 'var(--fg-0)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ color: 'var(--cy-1)' }}>{ICONS.manual(22)}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>Manual Hz</div>
              <div style={{ fontSize: 11, color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>Fine control</div>
            </div>
          </button>
        </div>

        {/* History */}
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', marginBottom: 8 }}>Recent</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflow: 'auto' }}>
          {[
            ['Deep Clean', '6 days ago', '+12 dB'],
            ['Water Eject', '8 days ago', '0.4 mL'],
            ['Dust Clean', '2 weeks ago', 'Routine'],
          ].map((row, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--hairline)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
            }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>{row[0]}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-2)', whiteSpace: 'nowrap' }}>{row[1]}</div>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--cy-1)', whiteSpace: 'nowrap' }}>{row[2]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        height: 60, padding: '0 12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        borderTop: '1px solid var(--hairline)',
        background: 'rgba(7,11,20,0.85)',
        backdropFilter: 'blur(20px)',
      }}>
        {[
          { id: 'home', i: ICONS.wave(22), label: 'Clean', active: true },
          { id: 'test', i: ICONS.test(22), label: 'Test' },
          { id: 'history', i: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 11 a8 8 0 1 0 2.5-5.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M3 4 v4 h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 6 v5 l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>), label: 'History' },
          { id: 'settings', i: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 2 l1 2.5 l2.5-0.5 l-0.5 2.5 l2.5 1 l-1 2.5 l1 2.5 l-2.5 1 l0.5 2.5 l-2.5-0.5 l-1 2.5 l-1-2.5 l-2.5 0.5 l0.5-2.5 l-2.5-1 l1-2.5 l-1-2.5 l2.5-1 l-0.5-2.5 l2.5 0.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>), label: 'Settings' },
        ].map(t => (
          <button key={t.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: t.active ? 'var(--cy-1)' : 'var(--fg-2)',
            padding: '6px 16px',
          }}>
            {t.i}
            <span style={{ fontSize: 10, fontWeight: 500 }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   09 — Action screen (Water Eject / Dust Clean / Muffled Fix)
─────────────────────────────────────────────────────────────── */
function ScrAction({ nav, state }) {
  const a = state.action || { id: 'water-eject', t: 'Water Eject', sub: '165 Hz', i: ICONS.water(22) };
  const config = {
    'water-eject': { hz: 165, val: 0.18, color: '#5BD5FF',
                     desc: 'A low-frequency tone vibrates water out of the speaker chamber.' },
    'dust-clean':  { hz: 300, val: 0.32, color: '#5BD5FF',
                     desc: 'A pulsed mid-range tone dislodges dust and pocket lint.' },
    'muffled-fix': { hz: 500, val: 0.48, color: '#5BD5FF',
                     desc: 'A sweeping tone clears obstructions that muffle output.' },
  }[a.id] || { hz: 165, val: 0.2, color: '#5BD5FF', desc: '' };

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title={a.t} light />
      <div style={{ padding: '8px 22px 22px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Hero dial */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <CircularDial size={296} value={config.val} hz={config.hz} pulsing
            label="Tuned frequency" showTicks/>

          {/* Reading line below */}
          <div style={{ marginTop: 22, padding: '10px 18px',
                        borderRadius: 999, background: 'rgba(91,213,255,0.08)',
                        border: '1px solid rgba(91,213,255,0.25)',
                        display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
            <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--cy-1)',
                          animation: 'csBlink 1.2s infinite', boxShadow: '0 0 8px var(--cy-1)' }}/>
            <span className="mono" style={{ fontSize: 11, color: 'var(--cy-1)', letterSpacing: '0.08em' }}>
              SINE · OPTIMAL FOR {a.t.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info card */}
        <div className="glass" style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(91,213,255,0.12)',
              border: '1px solid rgba(91,213,255,0.3)',
              color: 'var(--cy-1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{a.i}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--fg-2)',
                            letterSpacing: '0.18em', textTransform: 'uppercase' }}>How it works</div>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5, marginTop: 4 }}>
                {config.desc}
              </div>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px 14px',
                      fontSize: 11, color: 'var(--fg-2)' }}>
          <div style={{ color: 'var(--warn)' }}>{ICONS.spark(14)}</div>
          Place phone speaker-side down on a soft surface. Increase volume to max.
        </div>

        <button className="btn-primary" onClick={() => nav('cycle', a)}>
          Start cleaning
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   10 — Deep Clean cycle (3-stage frequency sweep)
─────────────────────────────────────────────────────────────── */
function ScrCycle({ nav, state }) {
  const isDeep = !state.action || state.action.id === 'deep-clean';
  const stages = isDeep ? [
    { name: 'Loosen',   hz: 165, dur: 12 },
    { name: 'Dislodge', hz: 300, dur: 18 },
    { name: 'Polish',   hz: 500, dur: 10 },
  ] : [
    { name: state.action.t, hz: parseInt(state.action.sub), dur: 30 },
  ];
  const totalDur = stages.reduce((s, x) => s + x.dur, 0);

  const [running, setRunning] = useS2(true);
  const [elapsed, setElapsed] = useS2(0);
  useE2(() => {
    if (!running) return;
    let raf, start = performance.now() - elapsed * 1000;
    const tick = (now) => {
      const t = (now - start) / 1000;
      if (t >= totalDur) {
        setElapsed(totalDur);
        setRunning(false);
        setTimeout(() => nav('result'), 500);
        return;
      }
      setElapsed(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  // Find current stage
  let acc = 0;
  let stageIdx = 0;
  for (let i = 0; i < stages.length; i++) {
    if (elapsed < acc + stages[i].dur) { stageIdx = i; break; }
    acc += stages[i].dur;
    stageIdx = i;
  }
  const cur = stages[stageIdx];
  const stageElapsed = elapsed - acc;
  const stageVal = stages.length === 1 ? Math.min(0.95, stageElapsed/cur.dur) :
                   (stageIdx + stageElapsed/cur.dur) / stages.length * 0.95;
  // Live Hz with subtle sweep within stage
  const liveHz = Math.round(cur.hz + Math.sin(elapsed * 4) * (cur.hz * 0.08));

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title={isDeep ? 'Deep Clean Pro' : state.action.t} light />
      <div style={{ padding: '8px 22px 22px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Hero dial */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* concentric live rings */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute', width: 280, height: 280, borderRadius: '50%',
              border: '1px solid rgba(91,213,255,0.18)',
              animation: `csRipple 2.6s ${i * 0.6}s ease-out infinite`,
            }}/>
          ))}

          <CircularDial size={280} value={stageVal} hz={liveHz} pulsing
            label={cur.name.toUpperCase()} showTicks/>
          {/* Live tag */}
          <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center',
                        padding: '8px 16px', borderRadius: 999,
                        background: 'rgba(255,120,120,0.08)',
                        border: '1px solid rgba(255,120,120,0.35)',
                        whiteSpace: 'nowrap' }}>
            <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--danger)',
                          animation: 'csBlink 0.9s infinite' }}/>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.15em',
                                             color: 'var(--danger)' }}>LIVE · STAGE {stageIdx+1}/{stages.length}</span>
          </div>
        </div>

        {/* Live waveform */}
        <div style={{ height: 64, marginTop: 18, marginBottom: 14,
                      padding: '0 6px', display: 'flex', alignItems: 'center' }}>
          <Waveform height={56} bars={64} intensity={1.2}/>
        </div>

        {/* Stage progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {stages.map((s, i) => {
            const isPast = i < stageIdx;
            const isNow = i === stageIdx;
            const localP = isNow ? stageElapsed / s.dur : isPast ? 1 : 0;
            return (
              <div key={i} style={{ flex: 1 }}>
                <div style={{
                  height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden', position: 'relative',
                }}>
                  <div style={{
                    height: '100%', width: `${localP * 100}%`,
                    background: 'linear-gradient(90deg, #25B6F5, #5BD5FF)',
                    boxShadow: '0 0 8px rgba(91,213,255,0.7)',
                    transition: 'width 0.1s linear',
                  }}/>
                </div>
                <div style={{ fontSize: 10, color: isNow ? 'var(--cy-1)' : 'var(--fg-2)',
                              marginTop: 6, fontWeight: 600,
                              letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {s.name}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 1 }}>
                  {s.hz} Hz
                </div>
              </div>
            );
          })}
        </div>

        {/* Timer + controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="glass-inset" style={{ padding: '10px 14px', flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--fg-2)', letterSpacing: '0.18em' }}>ELAPSED</div>
            <div className="hz" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>
              {fmtTime(elapsed)} <span style={{ color: 'var(--fg-3)', fontSize: 14 }}>/ {fmtTime(totalDur)}</span>
            </div>
          </div>
          <button onClick={() => setRunning(r => !r)} style={{
            width: 60, height: 60, borderRadius: 999, border: '1px solid var(--hairline-3)',
            background: 'rgba(255,255,255,0.06)', cursor: 'pointer', color: 'var(--fg-0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {running ? (
              <svg width="18" height="18" viewBox="0 0 18 18"><rect x="4" y="3" width="3" height="12" rx="1" fill="currentColor"/><rect x="11" y="3" width="3" height="12" rx="1" fill="currentColor"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M5 3 L14 9 L5 15 z" fill="currentColor"/></svg>
            )}
          </button>
          <button onClick={() => nav('result')} style={{
            width: 60, height: 60, borderRadius: 999, border: '1px solid rgba(255,120,120,0.5)',
            background: 'rgba(255,120,120,0.12)', cursor: 'pointer', color: 'var(--danger)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="1.5" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
function fmtTime(s) {
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60);
  return `${m}:${String(sec).padStart(2,'0')}`;
}

/* ──────────────────────────────────────────────────────────────
   11 — Sound Test
─────────────────────────────────────────────────────────────── */
function ScrTest({ nav }) {
  const [active, setActive] = useS2(null);
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Sound Test" light />
      <div style={{ padding: '8px 22px 22px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em',
                     margin: '4px 0 4px' }}>
          Tap each cone to test
        </h2>
        <p style={{ fontSize: 13, color: 'var(--fg-2)', margin: '0 0 22px' }}>
          We'll play a 20–20,000 Hz sweep through each driver.
        </p>

        {/* Cones */}
        <div style={{ display: 'flex', justifyContent: 'space-around',
                      alignItems: 'center', marginBottom: 30 }}>
          {['L', 'R'].map(side => {
            const on = active === side;
            return (
              <div key={side} style={{ textAlign: 'center' }}>
                <button onClick={() => setActive(on ? null : side)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <SpeakerCone size={120} glow={on} label={`CHANNEL ${side}`}/>
                </button>
                <div style={{ marginTop: 34, fontSize: 11,
                              color: on ? 'var(--cy-1)' : 'var(--fg-2)',
                              letterSpacing: '0.15em' }}>
                  {on ? '● PLAYING' : 'Tap to play'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Frequency response */}
        <div className="glass" style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.18em',
                          textTransform: 'uppercase' }}>Frequency Response</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cy-1)' }}>+8.2 dB clearer</div>
          </div>
          <div style={{ position: 'relative' }}>
            <FrequencyCurve width={324} height={100} dotted/>
            <div style={{ position: 'absolute', inset: 0 }}>
              <FrequencyCurve width={324} height={100}/>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>20 Hz</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>200</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>2 kHz</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>20 kHz</span>
          </div>
        </div>

        {/* Metrics row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                      gap: 8, marginBottom: 14 }}>
          {[
            ['Loudness', '94', 'dB'],
            ['Clarity', '88', '%'],
            ['Balance', '−1.2', 'dB'],
          ].map((m, i) => (
            <div key={i} className="glass-inset" style={{ padding: '12px 12px' }}>
              <div style={{ fontSize: 9, color: 'var(--fg-2)', letterSpacing: '0.18em',
                            textTransform: 'uppercase', marginBottom: 4 }}>{m[0]}</div>
              <div>
                <span className="hz" style={{ fontSize: 22, fontWeight: 600,
                                                letterSpacing: '-0.02em', color: 'var(--fg-0)' }}>{m[1]}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', marginLeft: 3 }}>{m[2]}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => nav('home')}>Done</button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   12 — Result
─────────────────────────────────────────────────────────────── */
function ScrResult({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '36px 24px 22px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Check seal */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18,
                      position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -10, width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(108,229,167,0.35), transparent 60%)',
            filter: 'blur(20px)',
          }}/>
          <div style={{
            position: 'relative', width: 120, height: 120, borderRadius: '50%',
            background: 'linear-gradient(180deg, rgba(108,229,167,0.2), rgba(108,229,167,0.05))',
            border: '1.5px solid var(--ok)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(108,229,167,0.4)',
          }}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <path d="M14 25 L22 33 L37 17" stroke="#6CE5A7" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 6px #6CE5A7)' }}/>
            </svg>
          </div>
        </div>

        <h2 style={{ fontSize: 30, fontWeight: 600, textAlign: 'center',
                     letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 10px' }}>
          Speaker restored
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-1)', textAlign: 'center',
                    margin: '0 0 24px', lineHeight: 1.5 }}>
          0.42 mL of water displaced. Sound clarity boosted by 12 dB.
        </p>

        {/* Before / after */}
        <div className="glass" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.18em',
                          textTransform: 'uppercase' }}>Before / After</div>
          </div>
          <div style={{ position: 'relative' }}>
            <FrequencyCurve width={324} height={86} dotted/>
            <div style={{ position: 'absolute', inset: 0 }}>
              <FrequencyCurve width={324} height={86}/>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        marginTop: 8, fontSize: 11 }}>
            <div>
              <div style={{ color: 'var(--fg-3)' }}>○ Before</div>
              <div className="hz" style={{ fontSize: 18, fontWeight: 600,
                                            letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>74 dB</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--cy-1)' }}>● After</div>
              <div className="hz" style={{ fontSize: 18, fontWeight: 600,
                                            letterSpacing: '-0.02em', color: 'var(--cy-1)' }}>86 dB</div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          <div className="glass-inset" style={{ padding: '14px 14px' }}>
            <div style={{ fontSize: 9, color: 'var(--fg-2)', letterSpacing: '0.2em' }}>HEALTH</div>
            <div>
              <span className="hz" style={{ fontSize: 28, fontWeight: 600,
                                              color: 'var(--ok)', letterSpacing: '-0.02em' }}>92</span>
              <span style={{ fontSize: 12, color: 'var(--fg-3)' }}>/ 100</span>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ok)', marginTop: 2 }}>+45 from baseline</div>
          </div>
          <div className="glass-inset" style={{ padding: '14px 14px' }}>
            <div style={{ fontSize: 9, color: 'var(--fg-2)', letterSpacing: '0.2em' }}>CYCLE TIME</div>
            <div>
              <span className="hz" style={{ fontSize: 28, fontWeight: 600,
                                              letterSpacing: '-0.02em' }}>40<span style={{ fontSize: 18 }}>s</span></span>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-2)', marginTop: 2 }}>3-stage sweep</div>
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => nav('test')} style={{ marginBottom: 10 }}>
          Run a sound test
        </button>
        <button className="btn-ghost" onClick={() => nav('home')}>Back to home</button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   13 — Manual Hz control
─────────────────────────────────────────────────────────────── */
function ScrManual({ nav }) {
  const [hz, setHz] = useS2(440);
  const [playing, setPlaying] = useS2(false);
  // ratio for dial (log scale 20 → 20000)
  const v = (Math.log(hz) - Math.log(20)) / (Math.log(20000) - Math.log(20));

  const presets = [
    { l: 'A4', v: 440 }, { l: 'Bass', v: 80 }, { l: 'Mid', v: 1000 }, { l: 'Hi', v: 8000 },
  ];

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Manual Hz" light right={
        <div style={{ fontSize: 11, color: 'var(--cy-1)', letterSpacing: '0.15em' }}>PRO</div>
      } />
      <div style={{ padding: '8px 22px 22px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center' }}>
          <CircularDial size={280} value={v} hz={hz} pulsing={playing}
            label="Frequency" showTicks/>
        </div>

        {/* Slider */}
        <div style={{ marginTop: 16, marginBottom: 14 }}>
          <input type="range" min={20} max={20000} value={hz}
            onChange={e => setHz(parseInt(e.target.value))}
            style={{
              width: '100%', accentColor: '#5BD5FF',
              height: 4,
            }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        marginTop: 4, fontSize: 10, color: 'var(--fg-3)' }}>
            <span className="mono">20 Hz</span>
            <span className="mono">1 kHz</span>
            <span className="mono">20 kHz</span>
          </div>
        </div>

        {/* Presets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                      gap: 8, marginBottom: 14 }}>
          {presets.map(p => (
            <button key={p.l} onClick={() => setHz(p.v)} style={{
              padding: '10px 8px', borderRadius: 12,
              background: hz === p.v ? 'rgba(91,213,255,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hz === p.v ? 'rgba(91,213,255,0.5)' : 'var(--hairline-2)'}`,
              color: hz === p.v ? 'var(--cy-1)' : 'var(--fg-0)', cursor: 'pointer',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600 }}>{p.l}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-2)', marginTop: 2 }}>
                {p.v < 1000 ? `${p.v} Hz` : `${p.v/1000} kHz`}
              </div>
            </button>
          ))}
        </div>

        <button className="btn-primary" onClick={() => setPlaying(p => !p)}>
          {playing ? 'Stop' : 'Play tone'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScrHome, ScrAction, ScrCycle, ScrTest, ScrResult, ScrManual, fmtTime });
