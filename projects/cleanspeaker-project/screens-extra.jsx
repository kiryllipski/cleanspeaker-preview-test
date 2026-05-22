/* CleanSpeaker — Extra screens: Pulse Clean, Downsell, Settings, Permissions, Modals */
const { useState: useS3, useEffect: useE3 } = React;

/* ──────────────────────────────────────────────────────────────
   14 — Pulse Clean (vibration mode)
─────────────────────────────────────────────────────────────── */
function ScrPulse({ nav }) {
  const [pattern, setPattern] = useS3('wave');
  const [intensity, setIntensity] = useS3(7);
  const [combine, setCombine] = useS3(true);
  const [running, setRunning] = useS3(true);

  const patterns = [
    { id: 'steady', t: 'Steady', sub: 'Continuous 235 Hz' },
    { id: 'wave',   t: 'Wave',   sub: '180 → 320 Hz sweep' },
    { id: 'burst',  t: 'Burst',  sub: 'Pulsed 280 Hz, 4 Hz envelope' },
    { id: 'knock',  t: 'Knock',  sub: 'Hard pulses, 2 Hz' },
  ];

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Pulse Clean" light right={
        <div style={{ fontSize: 10, color: 'var(--cy-1)', letterSpacing: '0.15em',
                      display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          {ICONS.spark(12)} NEW
        </div>
      }/>
      <div style={{ padding: '0 22px 22px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Phone with vibration rings */}
        <div style={{ display: 'flex', justifyContent: 'center',
                      alignItems: 'center', flexShrink: 0, marginTop: 6, marginBottom: 12,
                      position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -30, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,213,255,0.25), transparent 60%)',
            filter: 'blur(20px)',
          }}/>
          <PhoneShape size={180} vibrating={running}/>
        </div>

        {/* Pulse visualizer */}
        <div className="glass" style={{ padding: 16, marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.18em',
                          textTransform: 'uppercase' }}>Live pattern</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cy-1)' }}>
              {patterns.find(p => p.id === pattern).sub}
            </div>
          </div>
          <HapticPulse height={70} pattern={pattern} intensity={intensity/10} running={running}/>
        </div>

        {/* Pattern selector */}
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', marginBottom: 8 }}>Pattern</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          {patterns.map(p => {
            const active = pattern === p.id;
            return (
              <button key={p.id} onClick={() => setPattern(p.id)} style={{
                padding: '11px 14px', borderRadius: 14, textAlign: 'left',
                background: active ? 'linear-gradient(180deg, rgba(91,213,255,0.18), rgba(91,213,255,0.04))' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${active ? 'rgba(91,213,255,0.5)' : 'var(--hairline-2)'}`,
                color: 'var(--fg-0)', cursor: 'pointer',
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{p.t}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-2)', marginTop: 2,
                                                whiteSpace: 'nowrap' }}>{p.sub}</div>
              </button>
            );
          })}
        </div>

        {/* Intensity */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                          textTransform: 'uppercase' }}>Intensity</span>
          <span className="hz" style={{ fontSize: 14, color: 'var(--cy-1)', fontWeight: 600 }}>
            {intensity}<span style={{ color: 'var(--fg-3)' }}>/10</span>
          </span>
        </div>
        <input type="range" min={1} max={10} value={intensity}
          onChange={e => setIntensity(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: '#5BD5FF', height: 4, marginBottom: 14 }}/>

        {/* Combine */}
        <div className="glass-inset" style={{ padding: '12px 14px',
                                              display: 'flex', alignItems: 'center', gap: 12,
                                              marginBottom: 14 }}>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.wave(20)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Layer with sound</div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>Add a 165 Hz tone for 2× efficiency</div>
          </div>
          <button onClick={() => setCombine(c => !c)} style={{
            width: 42, height: 24, borderRadius: 999, padding: 2,
            background: combine ? 'var(--cy-1)' : 'rgba(255,255,255,0.1)',
            border: 'none', cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', background: '#fff',
              transform: combine ? 'translateX(18px)' : 'translateX(0)',
              transition: 'transform 0.2s',
            }}/>
          </button>
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => setRunning(r => !r)}>
          {running ? 'Stop pulse' : 'Start pulse'}
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   15 — Downsell paywall (after closing main)
─────────────────────────────────────────────────────────────── */
function ScrDownsell({ nav }) {
  const [s, setS] = useS3(299);
  useE3(() => {
    const id = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(s/60)).padStart(2,'0');
  const ss = String(s%60).padStart(2,'0');

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ height: 44, display: 'flex', alignItems: 'center',
                    justifyContent: 'flex-end', padding: '0 18px', flexShrink: 0 }}>
        <button onClick={() => nav('home')} style={{
          width: 30, height: 30, borderRadius: 999, border: 'none',
          background: 'rgba(255,255,255,0.08)', cursor: 'pointer',
          color: 'var(--fg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ padding: '0 22px 18px', height: 'calc(100% - 80px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Bold hero */}
        <div style={{ textAlign: 'center', position: 'relative', marginBottom: 14 }}>
          <div style={{
            position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
            width: 280, height: 80,
            background: 'radial-gradient(ellipse, rgba(247,194,107,0.35), transparent 60%)',
            filter: 'blur(20px)',
          }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '6px 14px', borderRadius: 999,
                          background: 'linear-gradient(90deg, rgba(247,194,107,0.18), rgba(255,120,120,0.18))',
                          border: '1px solid rgba(247,194,107,0.45)',
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                          color: 'var(--warn)', textTransform: 'uppercase',
                          marginBottom: 14, whiteSpace: 'nowrap' }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--warn)',
                            animation: 'csBlink 1.2s infinite' }}/>
              One-time offer · ends in <span className="mono" style={{ marginLeft: 4 }}>{mm}:{ss}</span>
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 600, margin: '0 0 6px',
                         lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Wait — we get it.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5,
                        margin: '0 auto', maxWidth: 320 }}>
              Try CleanSpeaker Pro for <strong style={{ color: 'var(--fg-0)' }}>one week, free</strong>.
              Then just <strong style={{ color: 'var(--cy-1)' }}>$4.99</strong> — less than a coffee.
            </p>
          </div>
        </div>

        {/* Single highlighted plan */}
        <div style={{
          padding: '18px 18px', borderRadius: 18, marginBottom: 14,
          background: 'linear-gradient(180deg, rgba(91,213,255,0.22), rgba(91,213,255,0.04))',
          border: '1.5px solid var(--cy-1)',
          boxShadow: '0 12px 32px -12px rgba(91,213,255,0.6)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -10, left: 18, padding: '3px 10px',
            borderRadius: 999, background: '#5BD5FF', color: '#021018',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', whiteSpace: 'nowrap',
          }}>YOUR EXCLUSIVE PRICE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
            <span style={{
              fontFamily: 'var(--f-mono)', fontSize: 14, color: 'var(--fg-3)',
              textDecoration: 'line-through',
            }}>$9.99</span>
            <span className="hz" style={{ fontSize: 42, fontWeight: 600,
                                          color: 'var(--cy-1)', letterSpacing: '-0.025em',
                                          textShadow: '0 0 24px rgba(91,213,255,0.4)' }}>$4.99</span>
            <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>/ week</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-1)' }}>7 days free → then $4.99/week. Cancel anytime.</div>
        </div>

        {/* Mini benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
          {[
            ['Unlimited cycles', ICONS.wave(18)],
            ['Pulse Clean', ICONS.pulse(18)],
            ['Manual Hz', ICONS.manual(18)],
            ['No ads', ICONS.shield(18)],
          ].map((b, i) => (
            <div key={i} className="glass-inset" style={{
              padding: '10px 12px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ color: 'var(--cy-1)' }}>{b[1]}</div>
              <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>{b[0]}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="glass" style={{ padding: 14, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 6, color: 'var(--cy-1)' }}>
            {[1,2,3,4,5].map(i => <span key={i}>{ICONS.star(11)}</span>)}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-0)' }}>
            "Saved me $300 on a repair shop visit. Worth every penny."
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 6 }}>
            — Daniel K. · verified user
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => nav('home')}>
          Claim 7-day free trial
        </button>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: 'var(--fg-2)' }}>
          Auto-renews at $4.99/week. <span style={{ textDecoration: 'underline', color: 'var(--fg-1)' }}>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   16 — Settings
─────────────────────────────────────────────────────────────── */
function ScrSettings({ nav }) {
  const [haptics, setHaptics] = useS3(true);
  const [notifs, setNotifs] = useS3(true);
  const [autoVol, setAutoVol] = useS3(true);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--fg-2)',
                    textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>
        {title}
      </div>
      <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
  const Row = ({ icon, t, sub, right, last }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      borderBottom: last ? 'none' : '1px solid var(--hairline)',
    }}>
      {icon && <div style={{
        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
        background: 'rgba(91,213,255,0.1)',
        border: '1px solid rgba(91,213,255,0.25)',
        color: 'var(--cy-1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
  const Toggle = ({ on, set }) => (
    <button onClick={() => set(!on)} style={{
      width: 42, height: 24, borderRadius: 999, padding: 2,
      background: on ? 'var(--cy-1)' : 'rgba(255,255,255,0.1)',
      border: 'none', cursor: 'pointer', position: 'relative',
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transform: on ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform 0.2s',
      }}/>
    </button>
  );
  const Chev = () => (
    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 2 L10 7 L5 12" stroke="var(--fg-3)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Settings" light/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 92px)', overflow: 'auto' }}>

        {/* Account / Premium */}
        <div className="glass" style={{ padding: 18, marginBottom: 18,
                                        background: 'linear-gradient(180deg, rgba(91,213,255,0.15), rgba(91,213,255,0.03))',
                                        border: '1px solid rgba(91,213,255,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(180deg, #5BD5FF, #25B6F5)',
              color: '#021018',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{ICONS.shield(22)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>CleanSpeaker Pro</div>
              <div style={{ fontSize: 12, color: 'var(--fg-1)', marginTop: 2 }}>
                Renews Dec 14 · $29.99/yr
              </div>
            </div>
          </div>
        </div>

        <Section title="Cleaning">
          <Row icon={ICONS.pulse(18)} t="Haptic feedback" sub="Vibrate during cycles"
               right={<Toggle on={haptics} set={setHaptics}/>}/>
          <Row icon={ICONS.test(18)} t="Auto-volume boost" sub="Increase to max during cycle"
               right={<Toggle on={autoVol} set={setAutoVol}/>}/>
          <Row icon={ICONS.manual(18)} t="Default cycle" sub="Deep Clean Pro" right={<Chev/>} last/>
        </Section>

        <Section title="Notifications">
          <Row icon={ICONS.bell(18)} t="Cleaning reminders" sub="Every 7 days"
               right={<Toggle on={notifs} set={setNotifs}/>} last/>
        </Section>

        <Section title="Account">
          <Row icon={ICONS.user(18)} t="Manage subscription" right={<Chev/>}/>
          <Row icon={ICONS.shield(18)} t="Restore purchases" right={<Chev/>}/>
          <Row icon={ICONS.lock(18)} t="Privacy policy" right={<Chev/>} last/>
        </Section>

        <Section title="Support">
          <Row icon={null} t="Contact us" right={<Chev/>}/>
          <Row icon={null} t="Rate the app" right={<Chev/>}/>
          <Row icon={null} t="Terms of service" right={<Chev/>} last/>
        </Section>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--fg-3)',
                      padding: '12px 0 8px' }}>
          CleanSpeaker v3.2.1 · build 240
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   17 — Permission request (audio output)
─────────────────────────────────────────────────────────────── */
function ScrPermission({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '32px 28px 24px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: 28 }}>
            <div style={{
              position: 'absolute', inset: -28, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91,213,255,0.3), transparent 60%)',
              filter: 'blur(20px)',
              animation: 'csPulse 2.5s ease-in-out infinite',
            }}/>
            <div className="glass" style={{
              position: 'relative', width: 110, height: 110, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--cy-1)',
            }}>
              {ICONS.test(46)}
            </div>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 600, margin: '0 0 12px',
                       letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Allow CleanSpeaker<br/>to use your speaker
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.55,
                      maxWidth: 320, margin: '0 0 28px' }}>
            We play precisely tuned tones through your phone speaker to push out water and dust. Nothing is recorded.
          </p>

          {/* Permissions list */}
          <div className="glass" style={{ width: '100%', padding: 16, marginBottom: 8 }}>
            {[
              ['Audio output', 'Required to play cleaning frequencies'],
              ['Vibration', 'Required for Pulse Clean'],
              ['Notifications', 'Optional — cleaning reminders'],
            ].map((p, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '8px 0',
                borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
              }}>
                <div style={{ color: 'var(--cy-1)', marginTop: 1 }}>{ICONS.check(18)}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p[0]}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{p[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('welcome')}>
          Allow & continue
        </button>
        <button className="btn-ghost" onClick={() => nav('welcome')} style={{ marginTop: 8 }}>
          Not now
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   18 — Empty home (first run, before any cycle)
─────────────────────────────────────────────────────────────── */
function ScrEmptyHome({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 22px 0', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>Welcome</div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>CleanSpeaker</div>
        </div>
        <div style={{
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(247,194,107,0.12)',
          border: '1px solid rgba(247,194,107,0.4)',
          fontSize: 10, color: 'var(--warn)', fontWeight: 700, letterSpacing: '0.15em',
        }}>FREE TIER</div>
      </div>

      <div style={{ padding: '20px 22px', height: 'calc(100% - 36px - 60px)',
                    display: 'flex', flexDirection: 'column' }}>

        {/* Empty state hero */}
        <div className="glass" style={{
          padding: '28px 22px', marginBottom: 14, position: 'relative',
          textAlign: 'center', overflow: 'hidden',
        }}>
          {/* decorative rings */}
          {[1, 2].map(i => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 200, height: 200, borderRadius: '50%',
              border: '1px solid rgba(91,213,255,0.15)',
              transform: 'translate(-50%, -50%)',
            }}/>
          ))}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <SpeakerCone size={88}/>
            </div>
            <div style={{ fontSize: 11, color: 'var(--cy-1)', letterSpacing: '0.2em',
                          fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>
              First time here?
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em',
                          marginBottom: 6 }}>
              Run your first cycle
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-1)', maxWidth: 280,
                          margin: '0 auto', lineHeight: 1.5 }}>
              Place phone speaker-down, set volume to max, and let CleanSpeaker do the work.
            </div>
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => nav('cycle')} style={{
          padding: 18, borderRadius: 22, border: '1px solid rgba(91,213,255,0.45)',
          background: 'linear-gradient(180deg, rgba(91,213,255,0.2) 0%, rgba(14,124,196,0.08) 100%)',
          color: 'var(--fg-0)', textAlign: 'left', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 10px 30px -12px rgba(91,213,255,0.4)',
          marginBottom: 18,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(180deg, #5BD5FF, #25B6F5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#021018',
          }}>{ICONS.shield(26)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Try Deep Clean Pro</div>
            <div style={{ fontSize: 12, color: 'var(--fg-1)', marginTop: 2 }}>
              Free for first cycle • 40 s
            </div>
          </div>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.arrow(20)}</div>
        </button>

        {/* Tips list */}
        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--fg-2)',
                      textTransform: 'uppercase', marginBottom: 10 }}>Quick tips</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Max volume', 'The louder, the more effective'],
            ['Speaker down', 'Place phone on a soft surface'],
            ['Stay close', 'Don’t leave the room mid-cycle'],
          ].map((t, i) => (
            <div key={i} style={{
              padding: '12px 14px', borderRadius: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--hairline)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: 'rgba(91,213,255,0.12)',
                color: 'var(--cy-1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: 'var(--f-mono)', fontWeight: 600,
              }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{t[0]}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{t[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar (same as home) */}
      <div style={{
        height: 60, padding: '0 12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        borderTop: '1px solid var(--hairline)',
        background: 'rgba(7,11,20,0.85)',
      }}>
        {['Clean', 'Test', 'History', 'Settings'].map((l, i) => (
          <div key={l} style={{
            fontSize: 10, color: i === 0 ? 'var(--cy-1)' : 'var(--fg-2)',
            fontWeight: 500,
          }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   19 — Premium locked modal (on action attempt for free user)
─────────────────────────────────────────────────────────────── */
function ScrLocked({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Pulse Clean" light/>
      {/* dimmed bg content (mock) */}
      <div style={{ padding: '0 22px', height: 'calc(100% - 92px)',
                    position: 'relative', overflow: 'hidden' }}>
        <div style={{ filter: 'blur(8px) brightness(0.35)', height: '100%',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      paddingTop: 20 }}>
          <PhoneShape size={140}/>
          <div style={{ height: 16 }}/>
          <div className="glass" style={{ padding: 16, width: '100%' }}>
            <HapticPulse height={50} pattern="wave"/>
          </div>
        </div>

        {/* Modal overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(4,7,13,0.6), rgba(4,7,13,0.92))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div className="glass" style={{
            width: '100%', padding: '26px 22px', textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(11,17,28,0.95), rgba(4,7,13,0.95))',
            border: '1px solid rgba(91,213,255,0.35)',
            boxShadow: '0 20px 60px -20px rgba(91,213,255,0.4)',
          }}>
            <div style={{ position: 'relative', display: 'flex',
                          justifyContent: 'center', marginBottom: 18 }}>
              <div style={{
                position: 'absolute', inset: -10, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(91,213,255,0.3), transparent 60%)',
                filter: 'blur(15px)',
              }}/>
              <div style={{
                position: 'relative', width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(180deg, rgba(91,213,255,0.2), rgba(91,213,255,0.05))',
                border: '1px solid rgba(91,213,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--cy-1)',
              }}>{ICONS.lock(30)}</div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--cy-1)', letterSpacing: '0.22em',
                          fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>
              Pro feature
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px',
                         letterSpacing: '-0.02em' }}>
              Unlock Pulse Clean
            </h2>
            <p style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5,
                        margin: '0 0 20px', maxWidth: 280 }}>
              Vibration cleaning + Manual Hz + unlimited cycles. Start your 3-day free trial.
            </p>
            <button className="btn-primary" onClick={() => nav('paywall')}>
              Start free trial
            </button>
            <button className="btn-ghost" onClick={() => nav('home')} style={{ marginTop: 8 }}>
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   20 — Confirm abort cycle modal
─────────────────────────────────────────────────────────────── */
function ScrAbortModal({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('cycle')} title="Deep Clean Pro" light/>
      <div style={{ padding: '0 22px', height: 'calc(100% - 92px)',
                    position: 'relative', overflow: 'hidden' }}>
        {/* dimmed cycle content */}
        <div style={{ filter: 'blur(6px) brightness(0.5)', display: 'flex',
                      flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
          <CircularDial size={240} value={0.4} hz={302} label="DISLODGE" pulsing/>
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(4,7,13,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 4px',
        }}>
          <div className="glass" style={{
            width: '100%', padding: '24px 22px',
            background: 'linear-gradient(180deg, rgba(11,17,28,0.97), rgba(4,7,13,0.97))',
            border: '1px solid var(--hairline-3)',
            boxShadow: '0 20px 60px -20px rgba(0,0,0,0.8)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(255,120,120,0.12)',
                border: '1px solid rgba(255,120,120,0.4)',
                color: 'var(--danger)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2 L2 19 H20 L11 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <line x1="11" y1="9" x2="11" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="11" cy="16" r="0.8" fill="currentColor"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
                  Stop cycle?
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
                  Stage 2 of 3 · 14 s remaining
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5,
                        margin: '0 0 18px' }}>
              Stopping now means debris won’t fully clear. For best results, let the full cycle finish.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost" onClick={() => nav('home')} style={{
                flex: 1,
                background: 'rgba(255,120,120,0.1)',
                borderColor: 'rgba(255,120,120,0.4)',
                color: 'var(--danger)',
              }}>Stop anyway</button>
              <button className="btn-primary" onClick={() => nav('cycle')} style={{ flex: 1.4 }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   21 — Offline / no-connection state
─────────────────────────────────────────────────────────────── */
function ScrOffline({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="" light/>
      <div style={{ padding: '0 28px 24px', height: 'calc(100% - 92px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: 24 }}>
            <div style={{
              position: 'absolute', inset: -20, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(247,194,107,0.18), transparent 60%)',
              filter: 'blur(20px)',
            }}/>
            <div className="glass" style={{
              position: 'relative', width: 100, height: 100, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--warn)',
            }}>
              {ICONS.wifi_off(40)}
            </div>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 10px',
                       letterSpacing: '-0.02em' }}>
            You're offline
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5,
                      maxWidth: 300 }}>
            Cleaning still works without internet. You won’t see history sync, ratings or new presets.
          </p>

          <div className="glass-inset" style={{
            marginTop: 24, padding: '12px 16px', width: '100%',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--ok)',
                          boxShadow: '0 0 8px var(--ok)' }}/>
            <div style={{ fontSize: 13, flex: 1 }}>Cleaning engine is ready</div>
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('home')}>Try again</button>
        <button className="btn-ghost" onClick={() => nav('home')} style={{ marginTop: 8 }}>
          Continue offline
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   22 — Push notification permission
─────────────────────────────────────────────────────────────── */
function ScrPush({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '36px 28px 24px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: 26 }}>
            <div style={{
              position: 'absolute', inset: -25, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91,213,255,0.3), transparent 60%)',
              filter: 'blur(20px)',
            }}/>
            <div className="glass" style={{
              position: 'relative', width: 110, height: 110, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--cy-1)',
            }}>
              {ICONS.bell(48)}
            </div>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 10px',
                       letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Keep your speaker pristine
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.55,
                      maxWidth: 320, margin: '0 0 24px' }}>
            We’ll remind you to run a cycle every 7 days — the rhythm that keeps speakers sounding new.
          </p>

          {/* Mini preview */}
          <div className="glass" style={{ padding: 14, width: '100%', textAlign: 'left',
                                          display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(180deg, #5BD5FF, #25B6F5)',
              color: '#021018',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{ICONS.shield(18)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>CleanSpeaker</div>
              <div style={{ fontSize: 12, color: 'var(--fg-1)', whiteSpace: 'nowrap',
                            overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Time for your weekly Deep Clean
              </div>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>now</div>
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('home')}>Allow notifications</button>
        <button className="btn-ghost" onClick={() => nav('home')} style={{ marginTop: 8 }}>
          Not now
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScrPulse, ScrDownsell, ScrSettings, ScrPermission, ScrEmptyHome,
  ScrLocked, ScrAbortModal, ScrOffline, ScrPush,
});
