/* CleanSpeaker — Onboarding (light, minimal) */
const { useState: useS1, useEffect: useE1 } = React;

/* ── 01 Welcome ──────────────────────────────────────────────────── */
function ScrWelcome({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 24px 24px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              position: 'absolute', width: 240, height: 240, borderRadius: '50%',
              border: '1px solid var(--cy-1)', opacity: 0.3,
              animation: `csRipple 3s ${i * 1.2}s ease-out infinite`,
            }}/>
          ))}
          <SpeakerCone size={140}/>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, margin: 0, lineHeight: 1.1,
                       letterSpacing: '-0.02em', color: 'var(--fg-0)' }}>
            Restore your speaker.
          </h1>
          <p style={{ fontSize: 15, color: 'var(--fg-1)', marginTop: 10,
                      lineHeight: 1.5, maxWidth: 300, margin: '10px auto 0' }}>
            Sound waves push out water and dust. No tools.
          </p>
        </div>

        <button className="btn-primary" onClick={() => nav('q1')}>Get started</button>
      </div>
    </div>
  );
}

/* ── Step indicator ──────────────────────────────────────────────── */
function Progress({ steps, current }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({length: steps}).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < current ? 'var(--fg-0)' : 'var(--bg-3)',
        }}/>
      ))}
    </div>
  );
}

/* ── Reusable list row for Q screens ─────────────────────────────── */
function OptionRow({ active, onClick, title, sub, icon }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px 18px', borderRadius: 16,
      background: active ? 'var(--fg-0)' : 'var(--bg-1)',
      border: `1px solid ${active ? 'var(--fg-0)' : 'var(--hairline)'}`,
      color: active ? '#FFFFFF' : 'var(--fg-0)', textAlign: 'left',
      cursor: 'pointer', width: '100%',
      transition: 'all 0.15s',
    }}>
      {icon && (
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: active ? 'rgba(255,255,255,0.12)' : 'var(--bg-2)',
          color: active ? '#FFFFFF' : 'var(--fg-0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>{title}</div>
        {sub && <div style={{ fontSize: 12,
                              color: active ? 'rgba(255,255,255,0.65)' : 'var(--fg-2)',
                              marginTop: 2, whiteSpace: 'nowrap',
                              overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>}
      </div>
      {active && <div style={{ color: '#FFFFFF' }}>{ICONS.check(18)}</div>}
    </button>
  );
}

/* ── 02 Q1 — Problem ─────────────────────────────────────────────── */
function ScrQ1({ nav, state, set }) {
  const opts = [
    { id: 'water',      title: 'Water',     sub: 'After rain or a splash', icon: ICONS.water() },
    { id: 'dust',       title: 'Dust',      sub: 'Pocket lint, sand',      icon: ICONS.dust() },
    { id: 'muffled',    title: 'Muffled',   sub: 'Sound is dull',          icon: ICONS.muffled() },
    { id: 'preventive', title: 'Just maintenance', sub: 'Keep it healthy', icon: ICONS.shield() },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('welcome')} title="1 of 3"/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>
        <Progress steps={3} current={1}/>
        <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.2,
                     letterSpacing: '-0.02em', margin: '20px 0 22px' }}>
          What's wrong?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {opts.map(o => (
            <OptionRow key={o.id} active={state.problem === o.id}
              onClick={() => set('problem', o.id)}
              title={o.title} sub={o.sub} icon={o.icon}/>
          ))}
        </div>
        <button className="btn-primary" disabled={!state.problem}
          onClick={() => nav('q2')}
          style={!state.problem ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
          Continue
        </button>
      </div>
    </div>
  );
}

/* ── 03 Q2 — Timing ──────────────────────────────────────────────── */
function ScrQ2({ nav, state, set }) {
  const opts = [
    { id: 'today',   title: 'Today' },
    { id: 'week',    title: 'This week' },
    { id: 'longer',  title: 'Over a week ago' },
    { id: 'always',  title: "It's always been like this" },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('q1')} title="2 of 3"/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>
        <Progress steps={3} current={2}/>
        <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.2,
                     letterSpacing: '-0.02em', margin: '20px 0 22px' }}>
          When did it start?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {opts.map(o => (
            <OptionRow key={o.id} active={state.when === o.id}
              onClick={() => set('when', o.id)} title={o.title}/>
          ))}
        </div>
        <button className="btn-primary" disabled={!state.when}
          onClick={() => nav('q3')}
          style={!state.when ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
          Continue
        </button>
      </div>
    </div>
  );
}

/* ── 04 Q3 — Device ──────────────────────────────────────────────── */
function ScrQ3({ nav, state, set }) {
  const popular = [
    'Samsung Galaxy S24 Ultra', 'Google Pixel 8 Pro', 'Samsung Galaxy S23',
    'OnePlus 12', 'Xiaomi 14 Pro', 'Pixel 7a', 'Nothing Phone 2a', 'Galaxy A55',
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('q2')} title="3 of 3"/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>
        <Progress steps={3} current={3}/>
        <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.2,
                     letterSpacing: '-0.02em', margin: '20px 0 16px' }}>
          Your phone
        </h2>
        <div style={{
          height: 46, borderRadius: 12, padding: '0 14px',
          background: 'var(--bg-2)', border: '1px solid var(--hairline)',
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="var(--fg-2)" strokeWidth="1.5"/>
            <path d="M10.5 10.5 L14 14" stroke="var(--fg-2)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--fg-0)', fontFamily: 'var(--f-ui)', fontSize: 14,
          }} placeholder="Search model"/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, overflow: 'auto' }}>
          {popular.map(m => {
            const active = state.phone === m;
            return (
              <button key={m} onClick={() => set('phone', m)} style={{
                padding: '12px 16px', borderRadius: 12, textAlign: 'left',
                background: active ? 'var(--fg-0)' : 'var(--bg-1)',
                border: `1px solid ${active ? 'var(--fg-0)' : 'var(--hairline)'}`,
                color: active ? '#FFFFFF' : 'var(--fg-0)', cursor: 'pointer',
                fontSize: 14, fontWeight: 500,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                {m}
                {active && ICONS.check(16)}
              </button>
            );
          })}
        </div>
        <button className="btn-primary" disabled={!state.phone}
          onClick={() => nav('analyzing')}
          style={!state.phone ? { opacity: 0.3, pointerEvents: 'none', marginTop: 12 } : { marginTop: 12 }}>
          Analyze
        </button>
      </div>
    </div>
  );
}

/* ── 05 Analyzing ────────────────────────────────────────────────── */
function ScrAnalyzing({ nav, state }) {
  const [progress, setProgress] = useS1(0);
  const [step, setStep] = useS1(0);
  const steps = ['Scanning chamber', 'Measuring impedance', 'Detecting debris', 'Building plan'];

  useE1(() => {
    let raf;
    const start = performance.now();
    const dur = 5000;
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
        <div style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 24,
                      whiteSpace: 'nowrap' }}>
          {state.phone || 'Your device'}
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProgressRing size={220} value={progress} thickness={5}>
            <div className="hz" style={{
              fontSize: 56, fontWeight: 500, color: 'var(--fg-0)',
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>{Math.round(progress*100)}</div>
            <div className="hz" style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 6 }}>%</div>
          </ProgressRing>
        </div>

        <div style={{ width: '100%', marginTop: 18 }}>
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={s} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '6px 4px', opacity: i > step ? 0.3 : 1,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: `1.5px solid ${done || active ? 'var(--fg-0)' : 'var(--fg-3)'}`,
                  background: done ? 'var(--fg-0)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF',
                }}>
                  {done && ICONS.check(11)}
                  {active && <div style={{ width: 6, height: 6, borderRadius: '50%',
                                            background: 'var(--fg-0)',
                                            animation: 'csBlink 1s infinite' }}/>}
                </div>
                <div style={{ fontSize: 14, fontWeight: active ? 600 : 500,
                              color: active ? 'var(--fg-0)' : 'var(--fg-1)' }}>{s}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 06 Rescue plan ──────────────────────────────────────────────── */
function ScrPlan({ nav, state }) {
  const map = {
    water:      { sev: 'Moderate', sevColor: 'var(--warn)',   score: 47, label: 'Water trapped' },
    dust:       { sev: 'High',     sevColor: 'var(--danger)', score: 32, label: 'Dust buildup' },
    muffled:    { sev: 'Notable',  sevColor: 'var(--warn)',   score: 41, label: 'Obstruction' },
    preventive: { sev: 'Healthy',  sevColor: 'var(--ok)',     score: 78, label: 'Routine care' },
  };
  const p = map[state.problem] || map.water;

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 22px 22px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>

        <h2 style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15,
                     letterSpacing: '-0.02em', margin: '8px 0 22px' }}>
          Your rescue plan
        </h2>

        {/* Score */}
        <div className="card" style={{ padding: 20, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <ProgressRing size={86} value={p.score/100} thickness={5}>
              <div className="hz" style={{ fontSize: 24, fontWeight: 600,
                                            color: 'var(--fg-0)', letterSpacing: '-0.03em' }}>
                {p.score}
              </div>
            </ProgressRing>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-2)',
                            textTransform: 'uppercase', marginBottom: 4 }}>Health</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: p.sevColor,
                            letterSpacing: '-0.01em' }}>{p.sev}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-1)', marginTop: 2 }}>{p.label}</div>
            </div>
          </div>
        </div>

        {/* Plan */}
        <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', margin: '6px 4px 10px' }}>3-stage cycle</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {[
            { t: 'Loosen',   d: '165 Hz · 12 s' },
            { t: 'Dislodge', d: '300 Hz · 18 s' },
            { t: 'Polish',   d: '500 Hz · 10 s' },
          ].map((s, i) => (
            <div key={i} className="card" style={{
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                background: 'var(--bg-2)', color: 'var(--fg-0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600, fontFamily: 'var(--f-mono)',
              }}>{i+1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{s.t}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>{s.d}</div>
              </div>
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

/* ── 07 Rating ───────────────────────────────────────────────────── */
function ScrRating({ nav }) {
  const [rated, setRated] = useS1(0);
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('plan')} right={
        <button onClick={() => nav('paywall')} style={{
          background: 'transparent', border: 'none', color: 'var(--fg-2)',
          fontSize: 14, fontFamily: 'var(--f-ui)', cursor: 'pointer', padding: 8,
        }}>Skip</button>
      }/>
      <div style={{ padding: '8px 28px 24px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

          <div style={{ display: 'flex', gap: 2, color: 'var(--cy-1)', marginBottom: 14 }}>
            {[1,2,3,4,5].map(i => <span key={i}>{ICONS.star(14)}</span>)}
          </div>
          <div className="hz" style={{ fontSize: 56, fontWeight: 600,
                                        letterSpacing: '-0.04em', color: 'var(--fg-0)',
                                        lineHeight: 1 }}>4.9</div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 8,
                        letterSpacing: '0.05em' }}>62,481 ratings</div>

          <h2 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.25,
                       letterSpacing: '-0.02em', margin: '26px 0 22px',
                       maxWidth: 280 }}>
            Help others find us
          </h2>

          <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setRated(i)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                color: i <= rated ? 'var(--cy-1)' : 'var(--fg-3)',
              }}>{ICONS.star(36)}</button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('paywall')}>
          Continue
        </button>
      </div>
    </div>
  );
}

/* ── 08 Paywall ──────────────────────────────────────────────────── */
function ScrPaywall({ nav }) {
  const [plan, setPlan] = useS1('year');
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ height: 44, display: 'flex', alignItems: 'center',
                    justifyContent: 'flex-end', padding: '0 18px', flexShrink: 0 }}>
        <button onClick={() => nav('downsell')} style={{
          width: 32, height: 32, borderRadius: 999, border: 'none',
          background: 'var(--bg-2)', cursor: 'pointer',
          color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ padding: '0 22px 18px', height: 'calc(100% - 80px)',
                    display: 'flex', flexDirection: 'column' }}>

        <h2 style={{ fontSize: 28, fontWeight: 600, margin: '4px 0 8px',
                     lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          Try Pro free for 3 days
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-1)', margin: '0 0 22px',
                    lineHeight: 1.5 }}>
          Cancel anytime.
        </p>

        {/* Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
          {[
            'Unlimited cleaning cycles',
            'All modes including Pulse Clean',
            'Manual frequency control',
            'No ads',
          ].map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ color: 'var(--fg-0)', flexShrink: 0 }}>{ICONS.check(18)}</div>
              <div style={{ fontSize: 14, color: 'var(--fg-0)' }}>{t}</div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'year', tag: 'Save 78%', title: '12 months',
              price: '$2.49', unit: '/ week', total: '$29.99 yearly' },
            { id: 'month', tag: '', title: '1 month',
              price: '$6.99', unit: '/ week', total: '$27.99 monthly' },
            { id: 'week', tag: '', title: '1 week',
              price: '$3.99', unit: '/ week', total: 'Renews weekly' },
          ].map(o => {
            const active = plan === o.id;
            return (
              <button key={o.id} onClick={() => setPlan(o.id)} style={{
                padding: '14px 16px', borderRadius: 14,
                background: 'var(--bg-1)',
                border: `1.5px solid ${active ? 'var(--fg-0)' : 'var(--hairline)'}`,
                color: 'var(--fg-0)', cursor: 'pointer', textAlign: 'left',
                position: 'relative', transition: 'all 0.12s',
              }}>
                {o.tag && (
                  <div style={{
                    position: 'absolute', top: -8, right: 14, padding: '2px 8px',
                    borderRadius: 999, background: 'var(--fg-0)',
                    color: '#FFFFFF', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.06em',
                  }}>{o.tag}</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: `1.5px solid ${active ? 'var(--fg-0)' : 'var(--fg-3)'}`,
                    background: active ? 'var(--fg-0)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {active && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFFFFF' }}/>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{o.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>{o.total}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="hz" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>{o.price}</span>
                    <span style={{ fontSize: 11, color: 'var(--fg-2)', marginLeft: 2 }}>{o.unit}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => nav('home')} style={{ marginTop: 14 }}>
          Start free trial
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16,
                      marginTop: 10, fontSize: 12, color: 'var(--fg-2)' }}>
          <span>Terms</span>
          <span>Privacy</span>
          <span>Restore</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScrWelcome, ScrQ1, ScrQ2, ScrQ3, ScrAnalyzing, ScrPlan, ScrRating, ScrPaywall, Progress, OptionRow });
