/* CleanSpeaker — Onboarding screens (Welcome → Paywall) */
const { useState: useS1, useEffect: useE1 } = React;

/* ──────────────────────────────────────────────────────────────
   00 — Welcome
─────────────────────────────────────────────────────────────── */
function ScrWelcome({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 24px 28px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>
        {/* Hero device */}
        <div style={{ flex: 1, position: 'relative', display: 'flex',
                      alignItems: 'center', justifyContent: 'center' }}>
          {/* Halo */}
          <div style={{
            position: 'absolute', width: 360, height: 360,
            background: 'radial-gradient(circle, rgba(91,213,255,0.35) 0%, rgba(91,213,255,0.08) 35%, transparent 60%)',
            filter: 'blur(20px)', animation: 'csPulse 3s ease-in-out infinite',
          }} />
          {/* Ripples */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute', width: 220, height: 220, borderRadius: '50%',
              border: '1px solid rgba(91,213,255,0.4)',
              animation: `csRipple 3.5s ${i * 1.1}s ease-out infinite`,
            }}/>
          ))}
          <SpeakerCone size={180}/>
        </div>

        {/* Copy */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 8, marginBottom: 18 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cy-1)',
                          boxShadow: '0 0 12px var(--cy-1)' }}/>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--cy-1)',
                           textTransform: 'uppercase', fontWeight: 600 }}>CleanSpeaker Pro</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 600, margin: 0, lineHeight: 1.05,
                       letterSpacing: '-0.03em' }}>
            Restore your speaker<br/>
            <span style={{ color: 'var(--cy-1)' }}>in 30 seconds.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--fg-1)', marginTop: 14, lineHeight: 1.5,
                      maxWidth: 320, margin: '14px auto 0' }}>
            Engineered sound waves push out water, dust, and debris — no opening, no tools.
          </p>
        </div>

        <button className="btn-primary" onClick={() => nav('q1')}>Get started</button>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'var(--fg-2)' }}>
          Trusted by 850,000 phone owners worldwide
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   01 — Q1: What's wrong?
─────────────────────────────────────────────────────────────── */
function ScrQ1({ nav, state, set }) {
  const opts = [
    { id: 'water', title: 'Water in speaker', sub: 'After swim, rain, accidental drop',
      icon: ICONS.water(26) },
    { id: 'dust', title: 'Dust & debris', sub: 'Pocket lint, sand, daily buildup',
      icon: ICONS.dust(26) },
    { id: 'muffled', title: 'Muffled or low sound', sub: 'Calls sound far, music is dull',
      icon: ICONS.muffled(26) },
    { id: 'preventive', title: 'Just regular maintenance', sub: 'Keep speakers in top shape',
      icon: ICONS.shield(26) },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('welcome')} title="Step 1 of 3" light />
      <div style={{ padding: '8px 24px 24px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>
        <Progress steps={3} current={1}/>
        <h2 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15,
                     letterSpacing: '-0.02em', margin: '20px 0 8px' }}>
          What's the issue<br/>with your speaker?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-2)', margin: '0 0 22px' }}>
          We'll tune the rescue plan to your exact problem.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {opts.map(o => {
            const active = state.problem === o.id;
            return (
              <button key={o.id} onClick={() => set('problem', o.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px', borderRadius: 18,
                background: active
                  ? 'linear-gradient(180deg, rgba(91,213,255,0.18), rgba(91,213,255,0.04))'
                  : 'rgba(255,255,255,0.025)',
                border: `1px solid ${active ? 'rgba(91,213,255,0.55)' : 'var(--hairline-2)'}`,
                color: 'var(--fg-0)', textAlign: 'left', cursor: 'pointer',
                boxShadow: active ? '0 8px 24px -10px rgba(91,213,255,0.5)' : 'none',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: active ? 'rgba(91,213,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'rgba(91,213,255,0.4)' : 'var(--hairline)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: active ? 'var(--cy-1)' : 'var(--fg-1)',
                }}>{o.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{o.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{o.sub}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  border: `1.5px solid ${active ? 'var(--cy-1)' : 'var(--hairline-3)'}`,
                  background: active ? 'var(--cy-1)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {active && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6 L5 9 L10 3" stroke="#021018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                </div>
              </button>
            );
          })}
        </div>
        <button className="btn-primary" disabled={!state.problem}
                onClick={() => nav('q2')}
                style={!state.problem ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
          Continue
        </button>
      </div>
    </div>
  );
}

function Progress({ steps, current }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({length: steps}).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < current ? 'var(--cy-1)' : 'rgba(255,255,255,0.08)',
          boxShadow: i < current ? '0 0 8px rgba(91,213,255,0.5)' : 'none',
        }}/>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   02 — Q2: When did issue start?
─────────────────────────────────────────────────────────────── */
function ScrQ2({ nav, state, set }) {
  const opts = [
    { id: 'today', title: 'Today', sub: 'Within the last few hours' },
    { id: 'week', title: 'This week', sub: 'Up to 7 days ago' },
    { id: 'longer', title: 'More than a week ago', sub: 'Time to take action' },
    { id: 'always', title: "It's always been this way", sub: 'I want to fix it now' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('q1')} title="Step 2 of 3" light />
      <div style={{ padding: '8px 24px 24px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>
        <Progress steps={3} current={2}/>
        <h2 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15,
                     letterSpacing: '-0.02em', margin: '20px 0 8px' }}>
          When did it start?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-2)', margin: '0 0 22px' }}>
          Older debris needs longer cycles to dislodge.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {opts.map(o => {
            const active = state.when === o.id;
            return (
              <button key={o.id} onClick={() => set('when', o.id)} style={{
                padding: '18px 20px', borderRadius: 18, textAlign: 'left',
                background: active ? 'linear-gradient(180deg, rgba(91,213,255,0.18), rgba(91,213,255,0.04))' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${active ? 'rgba(91,213,255,0.55)' : 'var(--hairline-2)'}`,
                color: 'var(--fg-0)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{o.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{o.sub}</div>
                </div>
                <div style={{ color: active ? 'var(--cy-1)' : 'var(--fg-3)' }}>{ICONS.arrow(20)}</div>
              </button>
            );
          })}
        </div>
        <button className="btn-primary" disabled={!state.when}
                onClick={() => nav('q3')}
                style={!state.when ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
          Continue
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   03 — Q3: Phone model
─────────────────────────────────────────────────────────────── */
function ScrQ3({ nav, state, set }) {
  const popular = [
    'Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro', 'Samsung Galaxy S23',
    'OnePlus 12', 'Xiaomi 14 Pro', 'Samsung Galaxy A55',
    'Google Pixel 7a', 'Nothing Phone (2a)',
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('q2')} title="Step 3 of 3" light />
      <div style={{ padding: '8px 24px 24px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>
        <Progress steps={3} current={3}/>
        <h2 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15,
                     letterSpacing: '-0.02em', margin: '20px 0 8px' }}>
          Which phone do<br/>you have?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-2)', margin: '0 0 18px' }}>
          We'll calibrate sweep frequencies for your speaker chamber.
        </p>
        {/* Search */}
        <div style={{
          height: 50, borderRadius: 14, padding: '0 16px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hairline-2)',
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#6B788F" strokeWidth="1.5"/>
            <path d="M10.5 10.5 L14 14" stroke="#6B788F" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--fg-0)', fontFamily: 'var(--f-ui)', fontSize: 14,
          }} placeholder="Search model..."/>
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', marginBottom: 10 }}>Popular</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, overflow: 'auto' }}>
          {popular.map(m => {
            const active = state.phone === m;
            return (
              <button key={m} onClick={() => set('phone', m)} style={{
                padding: '14px 16px', borderRadius: 12, textAlign: 'left',
                background: active ? 'rgba(91,213,255,0.12)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${active ? 'rgba(91,213,255,0.4)' : 'var(--hairline)'}`,
                color: 'var(--fg-0)', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {m}
                {active && <div style={{ color: 'var(--cy-1)' }}>{ICONS.check(18)}</div>}
              </button>
            );
          })}
        </div>
        <button className="btn-primary" disabled={!state.phone}
                onClick={() => nav('analyzing')}
                style={!state.phone ? { opacity: 0.4, pointerEvents: 'none' } : { marginTop: 14 }}>
          Analyze my speaker
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   04 — Analyzing
─────────────────────────────────────────────────────────────── */
function ScrAnalyzing({ nav, state }) {
  const [progress, setProgress] = useS1(0);
  const [step, setStep] = useS1(0);
  const steps = [
    'Scanning speaker chamber',
    'Measuring impedance',
    'Detecting debris signature',
    'Building rescue plan',
  ];
  useE1(() => {
    let raf;
    const start = performance.now();
    const dur = 5200;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setProgress(p);
      setStep(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => nav('plan'), 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '24px 24px 24px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--cy-1)',
                      textTransform: 'uppercase', fontWeight: 600, marginBottom: 6,
                      whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--cy-1)',
                         boxShadow: '0 0 8px var(--cy-1)' }}></span>
          Live diagnostic
        </div>
        <div style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 28,
                      whiteSpace: 'nowrap' }}>
          {state.phone || 'Your device'}
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* concentric scan rings */}
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                position: 'absolute', inset: -40 * i, borderRadius: '50%',
                border: '1px solid rgba(91,213,255,0.18)',
                animation: `csRipple 3s ${i * 0.7}s ease-out infinite`,
              }}/>
            ))}
            <ProgressRing size={240} value={progress} thickness={6}>
              <div style={{ fontSize: 10, letterSpacing: '0.3em',
                            color: 'var(--fg-2)', textTransform: 'uppercase' }}>Analyzing</div>
              <div className="hz" style={{
                fontSize: 60, fontWeight: 500, color: 'var(--fg-0)',
                letterSpacing: '-0.03em', marginTop: 4,
                textShadow: '0 0 24px rgba(91,213,255,0.4)',
              }}>{Math.round(progress*100)}</div>
              <div className="hz" style={{ fontSize: 12, color: 'var(--cy-1)', marginTop: 4 }}>%</div>
            </ProgressRing>
          </div>
        </div>

        {/* Step list */}
        <div className="glass" style={{ width: '100%', padding: '14px 18px', marginTop: 18 }}>
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={s} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '6px 0', opacity: i > step ? 0.35 : 1,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: `1.5px solid ${done ? 'var(--cy-1)' : active ? 'var(--cy-1)' : 'var(--hairline-3)'}`,
                  background: done ? 'var(--cy-1)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? '0 0 8px var(--cy-1)' : 'none',
                }}>
                  {done && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3" stroke="#021018" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cy-1)', animation: 'csBlink 1s infinite' }}/>}
                </div>
                <div style={{ fontSize: 13, color: active ? 'var(--fg-0)' : 'var(--fg-1)',
                              fontWeight: active ? 600 : 400 }}>{s}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   05 — Rescue plan (personalized result)
─────────────────────────────────────────────────────────────── */
function ScrPlan({ nav, state }) {
  const problemMap = {
    water: { sev: 'Moderate', sevColor: 'var(--warn)', label: 'Water trapped',
             score: 47, cycles: 3 },
    dust: { sev: 'High', sevColor: 'var(--danger)', label: 'Dust buildup',
            score: 32, cycles: 4 },
    muffled: { sev: 'Significant', sevColor: 'var(--warn)', label: 'Sound obstruction',
               score: 41, cycles: 3 },
    preventive: { sev: 'Healthy', sevColor: 'var(--ok)', label: 'Routine care',
                  score: 78, cycles: 1 },
  };
  const p = problemMap[state.problem] || problemMap.water;

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: 8, marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--cy-1)',
                        textTransform: 'uppercase', fontWeight: 600, marginBottom: 8,
                        whiteSpace: 'nowrap' }}>
            ✓ Diagnostic complete
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15,
                       letterSpacing: '-0.02em', margin: 0 }}>
            Your personal<br/>rescue plan
          </h2>
        </div>

        {/* Score panel */}
        <div className="glass" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <ProgressRing size={94} value={p.score/100} thickness={6}>
              <div className="hz" style={{ fontSize: 26, fontWeight: 600,
                                            color: 'var(--fg-0)', letterSpacing: '-0.03em' }}>
                {p.score}
              </div>
              <div style={{ fontSize: 9, color: 'var(--fg-2)', letterSpacing: '0.2em' }}>/ 100</div>
            </ProgressRing>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                            textTransform: 'uppercase', marginBottom: 4 }}>Speaker health</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: p.sevColor,
                            letterSpacing: '-0.02em' }}>{p.sev}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-1)', marginTop: 2 }}>{p.label} detected</div>
            </div>
          </div>
          {/* mini freq curve */}
          <div style={{ marginTop: 14, position: 'relative' }}>
            <FrequencyCurve width={324} height={56} dotted/>
            <div style={{ position: 'absolute', inset: 0 }}>
              <FrequencyCurve width={324} height={56}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between',
                          marginTop: 4, fontSize: 9, color: 'var(--fg-3)',
                          letterSpacing: '0.1em' }}>
              <span className="mono">20 Hz</span>
              <span style={{ color: 'var(--cy-1)' }}>● Current</span>
              <span style={{ color: 'var(--fg-3)' }}>○ Target</span>
              <span className="mono">20 kHz</span>
            </div>
          </div>
        </div>

        {/* Plan steps */}
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', marginBottom: 10 }}>Recommended cycle</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { t: 'Loosen', d: '165 Hz · 12 s', i: ICONS.wave(20) },
            { t: 'Dislodge', d: '300 Hz pulse · 18 s', i: ICONS.water(20) },
            { t: 'Polish', d: '500 Hz sweep · 10 s', i: ICONS.spark(18) },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 16px', borderRadius: 14,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid var(--hairline)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(91,213,255,0.12)',
                border: '1px solid rgba(91,213,255,0.3)',
                color: 'var(--cy-1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{s.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Stage {i+1} · {s.t}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{s.d}</div>
              </div>
              <div className="hz" style={{ fontSize: 12, color: 'var(--fg-2)' }}>{i+1}/3</div>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={() => nav('rating')} style={{ marginTop: 14 }}>
          Continue
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   06 — Rating moment
─────────────────────────────────────────────────────────────── */
function ScrRating({ nav }) {
  const [rated, setRated] = useS1(0);
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('plan')} title="" right={
        <button onClick={() => nav('paywall')} style={{
          background: 'transparent', border: 'none', color: 'var(--fg-2)',
          fontSize: 13, fontFamily: 'var(--f-ui)', cursor: 'pointer',
        }}>Skip</button>
      } light/>
      <div style={{ padding: '8px 24px 24px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          {/* award badge */}
          <div style={{ position: 'relative', marginBottom: 22 }}>
            <div style={{
              position: 'absolute', inset: -30, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91,213,255,0.35), transparent 60%)',
              filter: 'blur(20px)',
            }}/>
            <div className="glass" style={{
              width: 140, height: 140, borderRadius: '50%',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div className="hz" style={{ fontSize: 32, fontWeight: 600,
                                            color: 'var(--cy-1)', letterSpacing: '-0.03em' }}>4.9</div>
              <div style={{ display: 'flex', gap: 2, marginTop: 4, color: 'var(--cy-1)' }}>
                {[1,2,3,4,5].map(i => <span key={i}>{ICONS.star(11)}</span>)}
              </div>
              <div style={{ fontSize: 10, color: 'var(--fg-2)', marginTop: 4,
                            letterSpacing: '0.15em' }}>62,481 RATINGS</div>
            </div>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.25,
                       letterSpacing: '-0.02em', margin: '0 0 12px',
                       maxWidth: 320 }}>
            Loved by 850K+ users who rescued their sound
          </h2>
          <p style={{ fontSize: 13, color: 'var(--fg-1)', maxWidth: 300,
                      margin: '0 0 22px', lineHeight: 1.5 }}>
            We're an independent team. Your 5-star vote helps us reach more people.
          </p>

          {/* Stars */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setRated(i)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                color: i <= rated ? 'var(--cy-1)' : 'var(--fg-3)',
                filter: i <= rated ? 'drop-shadow(0 0 8px var(--cy-1))' : 'none',
                transition: 'all 0.2s',
              }}>{ICONS.star(34)}</button>
            ))}
          </div>

          {/* Testimonial */}
          <div className="glass" style={{ padding: 16, textAlign: 'left', width: '100%' }}>
            <div style={{ display: 'flex', gap: 2, marginBottom: 6, color: 'var(--cy-1)' }}>
              {[1,2,3,4,5].map(i => <span key={i}>{ICONS.star(11)}</span>)}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-0)' }}>
              "Dropped my Pixel in the pool. Ran two cycles and the sound was crystal clear again. Saved me a $400 repair."
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 8 }}>
              — Maya R. · verified user
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('paywall')}>
          {rated >= 4 ? 'Submit & continue' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   07 — Paywall (special offer)
─────────────────────────────────────────────────────────────── */
function ScrPaywall({ nav }) {
  const [plan, setPlan] = useS1('year');
  const [s, setS] = useS1(599);
  useE1(() => {
    const id = setInterval(() => setS(x => x > 0 ? x - 1 : 599), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(s/60)).padStart(2,'0');
  const ss = String(s%60).padStart(2,'0');

  return (
    <div className="cs-screen">
      <CSStatusBar />
      {/* close */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center',
                    justifyContent: 'flex-end', padding: '0 18px', flexShrink: 0 }}>
        <button onClick={() => nav('downsell')} style={{
          width: 30, height: 30, borderRadius: 999, border: 'none',
          background: 'rgba(255,255,255,0.08)', cursor: 'pointer',
          color: 'var(--fg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ padding: '0 22px 18px', height: 'calc(100% - 80px)',
                    display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
            borderRadius: 999, background: 'rgba(247,194,107,0.12)',
            border: '1px solid rgba(247,194,107,0.4)',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.14em',
            color: 'var(--warn)', textTransform: 'uppercase', marginBottom: 12,
            whiteSpace: 'nowrap',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--warn)',
                          animation: 'csBlink 1.2s infinite' }}/>
            Offer expires in
            <span className="mono" style={{ marginLeft: 4 }}>{mm}:{ss}</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 600, margin: '0 0 4px',
                       lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Start your free 3-day trial
          </h2>
          <p style={{ fontSize: 13, color: 'var(--fg-2)', margin: 0 }}>
            Cancel anytime. No commitment.
          </p>
        </div>

        {/* Benefit list */}
        <div className="glass" style={{ padding: '14px 16px', marginBottom: 14 }}>
          {[
            ['Unlimited rescue cycles', 'Run as many as you need'],
            ['All cleaning modes', 'Water, Dust, Muffled, Deep Clean Pro'],
            ['Manual Hz control', '20 Hz – 20 kHz fine-tuning'],
            ['No ads, ever', 'Pure premium experience'],
          ].map(([t, sub], i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '7px 0',
              borderTop: i ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{ color: 'var(--cy-1)', marginTop: 1 }}>{ICONS.check(18)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{t}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
          {[
            { id: 'year', tag: 'BEST VALUE · SAVE 78%', title: '12 months', price: '$2.49',
              unit: '/ week', total: '$129.99 $29.99 / year' },
            { id: 'month', tag: '', title: '1 month', price: '$6.99',
              unit: '/ week', total: '$27.99 billed monthly' },
            { id: 'week', tag: '', title: '1 week', price: '$3.99',
              unit: '/ week', total: 'Recurring weekly' },
          ].map(o => {
            const active = plan === o.id;
            return (
              <button key={o.id} onClick={() => setPlan(o.id)} style={{
                padding: '14px 16px', borderRadius: 16,
                background: active ? 'linear-gradient(180deg, rgba(91,213,255,0.18), rgba(91,213,255,0.04))' : 'rgba(255,255,255,0.025)',
                border: `1.5px solid ${active ? 'var(--cy-1)' : 'var(--hairline-2)'}`,
                color: 'var(--fg-0)', cursor: 'pointer', textAlign: 'left',
                position: 'relative',
                boxShadow: active ? '0 8px 24px -10px rgba(91,213,255,0.5)' : 'none',
                transition: 'all 0.15s',
              }}>
                {o.tag && (
                  <div style={{
                    position: 'absolute', top: -9, left: 14, padding: '3px 10px',
                    borderRadius: 999, background: 'linear-gradient(90deg, #25B6F5, #5BD5FF)',
                    color: '#021018', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
                    whiteSpace: 'nowrap',
                  }}>{o.tag}</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: `1.5px solid ${active ? 'var(--cy-1)' : 'var(--hairline-3)'}`,
                    background: active ? 'var(--cy-1)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {active && <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#021018' }}/>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{o.total}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="hz" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{o.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--fg-2)', marginLeft: 2 }}>{o.unit}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button className="btn-primary" onClick={() => nav('home')} style={{ marginTop: 14 }}>
          Start free trial
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10,
                      fontSize: 11, color: 'var(--fg-2)' }}>
          <span>3-day free trial · then $29.99/yr</span>
          <span style={{ color: 'var(--fg-1)', textDecoration: 'underline' }}>Restore</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScrWelcome, ScrQ1, ScrQ2, ScrQ3, ScrAnalyzing, ScrPlan, ScrRating, ScrPaywall, Progress });
