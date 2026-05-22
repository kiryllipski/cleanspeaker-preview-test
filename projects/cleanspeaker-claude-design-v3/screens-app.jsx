/* CleanSpeaker — App screens (light, minimal) */
const { useState: useS2, useEffect: useE2 } = React;

/* ── 13 Home (returning) ─────────────────────────────────────────── */
function ScrHome({ nav }) {
  const quickActions = [
    { id: 'water-eject', t: 'Water', hz: '165 Hz', i: ICONS.water(20) },
    { id: 'dust-clean',  t: 'Dust',  hz: '300 Hz', i: ICONS.dust(20) },
    { id: 'muffled-fix', t: 'Muffled', hz: '500 Hz', i: ICONS.muffled(20) },
    { id: 'pulse',       t: 'Pulse', hz: 'Haptic',  i: ICONS.pulse(20) },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 22px 0', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>CleanSpeaker</div>
        <button onClick={() => nav('settings')} style={{
          width: 36, height: 36, borderRadius: 999, border: 'none',
          background: 'var(--bg-2)', cursor: 'pointer', color: 'var(--fg-0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 2 v1.5 M9 14.5 v1.5 M2 9 h1.5 M14.5 9 h1.5 M4 4 l1 1 M13 13 l1 1 M4 14 l1-1 M13 5 l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding: '20px 22px 16px', height: 'calc(100% - 36px - 60px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Health card */}
        <div className="card" style={{ padding: 22, marginBottom: 14,
                                       display: 'flex', alignItems: 'center', gap: 18 }}>
          <ProgressRing size={72} value={0.86} thickness={5}>
            <div className="hz" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>86</div>
          </ProgressRing>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--ok)',
                          textTransform: 'uppercase', fontWeight: 600 }}>Healthy</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4,
                          letterSpacing: '-0.01em' }}>
              Cleaned 6 days ago
            </div>
          </div>
        </div>

        {/* Deep Clean CTA */}
        <button onClick={() => nav('cycle')} style={{
          padding: 18, borderRadius: 18, border: 'none',
          background: 'var(--fg-0)', color: '#FFFFFF', textAlign: 'left',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.1)', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{ICONS.shield(22)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Deep Clean</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
              3 stages · 40 s
            </div>
          </div>
          <div style={{ color: '#FFFFFF' }}>{ICONS.arrow(18)}</div>
        </button>

        {/* Quick actions 2x2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => {
              if (a.id === 'pulse') return nav('pulse');
              const t = a.id==='muffled-fix' ? 'Muffled Fix' : a.id==='dust-clean' ? 'Dust Clean' : 'Water Eject';
              nav('action', { ...a, t });
            }} style={{
              padding: '16px', borderRadius: 14, border: '1px solid var(--hairline)',
              background: 'var(--bg-1)', color: 'var(--fg-0)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            }}>
              <div style={{ color: 'var(--fg-0)' }}>{a.i}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.t}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 1 }}>{a.hz}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { label: 'Sound Test', sub: 'Frequency response', id: 'test', i: ICONS.test(18) },
            { label: 'Manual Hz',  sub: 'Custom frequencies', id: 'manual', i: ICONS.manual(18) },
          ].map(t => (
            <button key={t.id} onClick={() => nav(t.id)} style={{
              padding: '14px 16px', borderRadius: 12, border: '1px solid var(--hairline)',
              background: 'var(--bg-1)', color: 'var(--fg-0)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ color: 'var(--fg-1)' }}>{t.i}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>{t.sub}</div>
              </div>
              <div style={{ color: 'var(--fg-3)' }}>{ICONS.arrow(16)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        height: 60, padding: '0 12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        borderTop: '1px solid var(--hairline)', background: 'var(--bg-1)',
      }}>
        {[
          { i: ICONS.wave(22), label: 'Clean', active: true },
          { i: ICONS.test(22), label: 'Test' },
          { i: (<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 11 a8 8 0 1 0 2.5-5.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M3 4 v4 h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 6 v5 l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>), label: 'History' },
          { i: ICONS.user(22), label: 'Account' },
        ].map(t => (
          <button key={t.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: t.active ? 'var(--fg-0)' : 'var(--fg-2)',
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

/* ── 14 Action (Water Eject etc.) ────────────────────────────────── */
function ScrAction({ nav, state }) {
  const a = state.action || { id: 'water-eject', t: 'Water Eject', hz: '165 Hz', i: ICONS.water(20) };
  const config = {
    'water-eject': { hz: 165, val: 0.18, desc: 'Low tone vibrates water out.' },
    'dust-clean':  { hz: 300, val: 0.32, desc: 'Pulsed tone dislodges dust.' },
    'muffled-fix': { hz: 500, val: 0.48, desc: 'Sweeping tone clears obstruction.' },
  }[a.id] || { hz: 165, val: 0.2, desc: '' };

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title={a.t}/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center' }}>
          <CircularDial size={280} value={config.val} hz={config.hz} label="Frequency"/>
        </div>

        <p style={{ fontSize: 14, color: 'var(--fg-1)', textAlign: 'center',
                    lineHeight: 1.5, margin: '14px 16px 18px' }}>
          {config.desc} <strong style={{ color: 'var(--fg-0)' }}>Set volume to max</strong> and place phone speaker-down.
        </p>

        <button className="btn-primary" onClick={() => nav('cycle', a)}>
          Start
        </button>
      </div>
    </div>
  );
}

/* ── 15 Cycle (3-stage Deep Clean) ───────────────────────────────── */
function fmtTime(s) {
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60);
  return `${m}:${String(sec).padStart(2,'0')}`;
}
function ScrCycle({ nav, state }) {
  const isDeep = !state.action || state.action.id === 'deep-clean';
  const stages = isDeep ? [
    { name: 'Loosen', hz: 165, dur: 12 },
    { name: 'Dislodge', hz: 300, dur: 18 },
    { name: 'Polish', hz: 500, dur: 10 },
  ] : [
    { name: state.action.t, hz: parseInt(state.action.hz), dur: 30 },
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
        setElapsed(totalDur); setRunning(false);
        setTimeout(() => nav('result'), 400);
        return;
      }
      setElapsed(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  let acc = 0, stageIdx = 0;
  for (let i = 0; i < stages.length; i++) {
    if (elapsed < acc + stages[i].dur) { stageIdx = i; break; }
    acc += stages[i].dur;
    stageIdx = i;
  }
  const cur = stages[stageIdx];
  const stageElapsed = elapsed - acc;
  const overall = elapsed / totalDur;
  const liveHz = Math.round(cur.hz + Math.sin(elapsed * 4) * (cur.hz * 0.06));

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('abort')} title={isDeep ? 'Deep Clean' : state.action.t}/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center' }}>
          <CircularDial size={280} value={overall} hz={liveHz}
            label={cur.name.toUpperCase()} pulsing/>
        </div>

        {/* Waveform */}
        <div style={{ height: 48, marginTop: 14, marginBottom: 16 }}>
          <Waveform height={48} bars={56} intensity={1.1}/>
        </div>

        {/* Stage progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {stages.map((s, i) => {
            const isPast = i < stageIdx;
            const isNow = i === stageIdx;
            const localP = isNow ? stageElapsed / s.dur : isPast ? 1 : 0;
            return (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 2, background: 'var(--bg-3)',
                              overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${localP * 100}%`,
                    background: 'var(--fg-0)',
                    transition: 'width 0.1s linear',
                  }}/>
                </div>
                <div style={{ fontSize: 11, color: isNow ? 'var(--fg-0)' : 'var(--fg-2)',
                              marginTop: 6, fontWeight: 600 }}>
                  {s.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timer + controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="card-quiet" style={{ padding: '12px 14px', flex: 1 }}>
            <div style={{ fontSize: 10, color: 'var(--fg-2)', letterSpacing: '0.16em',
                          textTransform: 'uppercase' }}>Time</div>
            <div className="hz" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2 }}>
              {fmtTime(elapsed)} <span style={{ color: 'var(--fg-3)', fontSize: 14 }}>/ {fmtTime(totalDur)}</span>
            </div>
          </div>
          <button onClick={() => setRunning(r => !r)} style={{
            width: 52, height: 52, borderRadius: 999, border: 'none',
            background: 'var(--fg-0)', cursor: 'pointer', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {running ? (
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="3" y="2" width="2.5" height="10" rx="1" fill="currentColor"/><rect x="8.5" y="2" width="2.5" height="10" rx="1" fill="currentColor"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M4 2 L11 7 L4 12 z" fill="currentColor"/></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 17 Sound Test ───────────────────────────────────────────────── */
function ScrTest({ nav }) {
  const [active, setActive] = useS2(null);
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Sound Test"/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 14, color: 'var(--fg-1)', margin: '4px 0 22px' }}>
          Tap each speaker. We'll sweep 20 Hz – 20 kHz.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around',
                      alignItems: 'center', marginBottom: 26 }}>
          {['L', 'R'].map(side => {
            const on = active === side;
            return (
              <div key={side} style={{ textAlign: 'center' }}>
                <button onClick={() => setActive(on ? null : side)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                  position: 'relative',
                }}>
                  {on && [0, 1].map(i => (
                    <div key={i} style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: 120, height: 120, marginLeft: -60, marginTop: -60,
                      borderRadius: 999, border: '1px solid var(--cy-1)',
                      animation: `csRipple 2.2s ${i*0.8}s ease-out infinite`,
                    }}/>
                  ))}
                  <SpeakerCone size={110}/>
                </button>
                <div style={{ marginTop: 16, fontSize: 13,
                              color: on ? 'var(--fg-0)' : 'var(--fg-2)',
                              fontWeight: on ? 600 : 500 }}>
                  Channel {side}
                </div>
              </div>
            );
          })}
        </div>

        {/* Frequency response */}
        <div className="card" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Frequency response</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cy-1)' }}>+8.2 dB</div>
          </div>
          <FrequencyCurve width={324} height={90}/>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        marginTop: 6, fontSize: 10, color: 'var(--fg-3)' }}>
            <span className="mono">20 Hz</span>
            <span className="mono">1 kHz</span>
            <span className="mono">20 kHz</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['Loudness', '94', 'dB'], ['Clarity', '88', '%'], ['Balance', '-1.2', 'dB']].map((m, i) => (
            <div key={i} className="card-quiet" style={{ padding: '12px' }}>
              <div style={{ fontSize: 10, color: 'var(--fg-2)', letterSpacing: '0.14em',
                            textTransform: 'uppercase', marginBottom: 4 }}>{m[0]}</div>
              <div>
                <span className="hz" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>{m[1]}</span>
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

/* ── 16 Result ───────────────────────────────────────────────────── */
function ScrResult({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '40px 28px 22px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--ok)', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M9 18 L15 24 L27 12" stroke="currentColor" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 600, textAlign: 'center',
                     letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 8px' }}>
          Speaker restored
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-1)', textAlign: 'center',
                    margin: '0 0 26px', lineHeight: 1.5 }}>
          0.42 mL displaced · +12 dB clarity
        </p>

        {/* Before / after */}
        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        marginBottom: 10, fontSize: 12 }}>
            <span style={{ color: 'var(--fg-2)' }}>Before</span>
            <span style={{ color: 'var(--fg-0)', fontWeight: 600 }}>After</span>
          </div>
          <div style={{ position: 'relative' }}>
            <FrequencyCurve width={320} height={80} dotted/>
            <div style={{ position: 'absolute', inset: 0 }}>
              <FrequencyCurve width={320} height={80}/>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card-quiet" style={{ padding: 14 }}>
            <div style={{ fontSize: 10, color: 'var(--fg-2)', letterSpacing: '0.14em',
                          textTransform: 'uppercase' }}>Health</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span className="hz" style={{ fontSize: 26, fontWeight: 600, color: 'var(--ok)',
                                              letterSpacing: '-0.02em' }}>92</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ok)' }}>+45</span>
            </div>
          </div>
          <div className="card-quiet" style={{ padding: 14 }}>
            <div style={{ fontSize: 10, color: 'var(--fg-2)', letterSpacing: '0.14em',
                          textTransform: 'uppercase' }}>Cycle</div>
            <div className="hz" style={{ fontSize: 26, fontWeight: 600,
                                          letterSpacing: '-0.02em', marginTop: 4 }}>
              40<span style={{ fontSize: 16, color: 'var(--fg-2)' }}>s</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => nav('test')} style={{ marginBottom: 8 }}>
          Test sound
        </button>
        <button className="btn-ghost" onClick={() => nav('home')}>Done</button>
      </div>
    </div>
  );
}

/* ── 19 Manual Hz ────────────────────────────────────────────────── */
function ScrManual({ nav }) {
  const [hz, setHz] = useS2(440);
  const [playing, setPlaying] = useS2(false);
  const v = (Math.log(hz) - Math.log(20)) / (Math.log(20000) - Math.log(20));

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Manual Hz"/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center' }}>
          <CircularDial size={280} value={v} hz={hz} label="Frequency" pulsing={playing}/>
        </div>

        <div style={{ marginTop: 18, marginBottom: 18 }}>
          <input type="range" min={20} max={20000} value={hz}
            onChange={e => setHz(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--fg-0)', height: 4 }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        marginTop: 4, fontSize: 10, color: 'var(--fg-3)' }}>
            <span className="mono">20 Hz</span>
            <span className="mono">1 kHz</span>
            <span className="mono">20 kHz</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
          {[['Bass', 80], ['A4', 440], ['Mid', 1000], ['Hi', 8000]].map(([l, v]) => (
            <button key={l} onClick={() => setHz(v)} style={{
              padding: '10px 6px', borderRadius: 10,
              background: hz === v ? 'var(--fg-0)' : 'var(--bg-1)',
              border: `1px solid ${hz === v ? 'var(--fg-0)' : 'var(--hairline)'}`,
              color: hz === v ? '#FFFFFF' : 'var(--fg-0)', cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
            }}>{l}</button>
          ))}
        </div>

        <button className="btn-primary" onClick={() => setPlaying(p => !p)}>
          {playing ? 'Stop' : 'Play'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScrHome, ScrAction, ScrCycle, ScrTest, ScrResult, ScrManual, fmtTime });
