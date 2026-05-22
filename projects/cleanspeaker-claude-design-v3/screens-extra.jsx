/* CleanSpeaker — Extra screens (light, minimal) */
const { useState: useS3, useEffect: useE3 } = React;

/* ── 18 Pulse Clean ──────────────────────────────────────────────── */
function ScrPulse({ nav }) {
  const [pattern, setPattern] = useS3('wave');
  const [intensity, setIntensity] = useS3(7);
  const [combine, setCombine] = useS3(true);
  const [running, setRunning] = useS3(true);

  const patterns = [
    { id: 'steady', t: 'Steady' },
    { id: 'wave',   t: 'Wave' },
    { id: 'burst',  t: 'Burst' },
    { id: 'knock',  t: 'Knock' },
  ];

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Pulse Clean"/>
      <div style={{ padding: '0 22px 22px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', justifyContent: 'center',
                      marginTop: 4, marginBottom: 14 }}>
          <PhoneShape size={160} vibrating={running}/>
        </div>

        <div className="card" style={{ padding: 16, marginBottom: 14 }}>
          <HapticPulse height={56} pattern={pattern} intensity={intensity/10} running={running}/>
        </div>

        {/* Pattern selector — single row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
          {patterns.map(p => {
            const active = pattern === p.id;
            return (
              <button key={p.id} onClick={() => setPattern(p.id)} style={{
                padding: '10px 6px', borderRadius: 10,
                background: active ? 'var(--fg-0)' : 'var(--bg-1)',
                border: `1px solid ${active ? 'var(--fg-0)' : 'var(--hairline)'}`,
                color: active ? '#FFFFFF' : 'var(--fg-0)', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
              }}>{p.t}</button>
            );
          })}
        </div>

        {/* Intensity */}
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: 'var(--fg-1)' }}>Intensity</span>
          <span className="hz" style={{ fontSize: 14, color: 'var(--fg-0)', fontWeight: 600 }}>
            {intensity}<span style={{ color: 'var(--fg-3)' }}>/10</span>
          </span>
        </div>
        <input type="range" min={1} max={10} value={intensity}
          onChange={e => setIntensity(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--fg-0)', height: 4, marginBottom: 14 }}/>

        {/* Combine toggle */}
        <div className="card" style={{ padding: '14px 16px',
                                       display: 'flex', alignItems: 'center', gap: 12,
                                       marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Layer with sound</div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>2× efficiency</div>
          </div>
          <Switch on={combine} set={setCombine}/>
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => setRunning(r => !r)}>
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}

/* ── Switch ──────────────────────────────────────────────────────── */
function Switch({ on, set }) {
  return (
    <button onClick={() => set(!on)} style={{
      width: 42, height: 24, borderRadius: 999, padding: 2,
      background: on ? 'var(--fg-0)' : 'var(--bg-3)',
      border: 'none', cursor: 'pointer', flexShrink: 0,
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: '#FFFFFF',
        transform: on ? 'translateX(18px)' : 'translateX(0)',
        transition: 'transform 0.18s',
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
      }}/>
    </button>
  );
}

/* ── 09 Downsell ─────────────────────────────────────────────────── */
function ScrDownsell({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ height: 44, display: 'flex', alignItems: 'center',
                    justifyContent: 'flex-end', padding: '0 18px', flexShrink: 0 }}>
        <button onClick={() => nav('home')} style={{
          width: 32, height: 32, borderRadius: 999, border: 'none',
          background: 'var(--bg-2)', cursor: 'pointer',
          color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ padding: '0 22px 18px', height: 'calc(100% - 80px)',
                    display: 'flex', flexDirection: 'column' }}>

        <h2 style={{ fontSize: 28, fontWeight: 600, margin: '4px 0 6px',
                     lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          One last offer.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--fg-1)', margin: '0 0 26px',
                    lineHeight: 1.5 }}>
          7 days free, then $4.99/week. Half the regular price.
        </p>

        {/* Price highlight */}
        <div className="card" style={{
          padding: 22, marginBottom: 18,
          border: '2px solid var(--fg-0)',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 16, color: 'var(--fg-3)',
                            textDecoration: 'line-through' }}>$9.99</span>
            <span className="hz" style={{ fontSize: 44, fontWeight: 600,
                                            color: 'var(--fg-0)', letterSpacing: '-0.03em' }}>$4.99</span>
            <span style={{ fontSize: 14, color: 'var(--fg-2)' }}>/ week</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 8 }}>
            7-day free trial. Cancel anytime.
          </div>
        </div>

        {/* Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            'Unlimited cycles',
            'Pulse Clean & Manual Hz',
            'No ads',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ color: 'var(--fg-0)' }}>{ICONS.check(18)}</div>
              <div style={{ fontSize: 14 }}>{t}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        <button className="btn-primary" onClick={() => nav('home')}>
          Claim offer
        </button>
        <button className="btn-ghost" onClick={() => nav('home')} style={{ marginTop: 4 }}>
          Not now
        </button>
      </div>
    </div>
  );
}

/* ── 20 Settings ─────────────────────────────────────────────────── */
function ScrSettings({ nav }) {
  const [haptics, setHaptics] = useS3(true);
  const [notifs, setNotifs] = useS3(true);
  const [autoVol, setAutoVol] = useS3(true);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--fg-2)',
                    textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4,
                    fontWeight: 600 }}>
        {title}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
  const Row = ({ t, sub, right, last }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
      borderBottom: last ? 'none' : '1px solid var(--hairline)',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</div>
        {sub && <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
  const Chev = () => (
    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 2 L10 7 L5 12" stroke="var(--fg-3)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Settings"/>
      <div style={{ padding: '4px 22px 22px', height: 'calc(100% - 88px)', overflow: 'auto' }}>

        {/* Pro card */}
        <div className="card" style={{ padding: 18, marginBottom: 18,
                                       background: 'var(--fg-0)', borderColor: 'var(--fg-0)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{ICONS.shield(20)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>Pro</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                Renews Dec 14
              </div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)' }}><Chev/></div>
          </div>
        </div>

        <Section title="Cleaning">
          <Row t="Haptic feedback" right={<Switch on={haptics} set={setHaptics}/>}/>
          <Row t="Auto-volume" sub="Max during cycles"
               right={<Switch on={autoVol} set={setAutoVol}/>}/>
          <Row t="Default cycle" sub="Deep Clean" right={<Chev/>} last/>
        </Section>

        <Section title="Notifications">
          <Row t="Reminders" sub="Every 7 days"
               right={<Switch on={notifs} set={setNotifs}/>} last/>
        </Section>

        <Section title="Account">
          <Row t="Subscription" right={<Chev/>}/>
          <Row t="Restore purchases" right={<Chev/>}/>
          <Row t="Privacy" right={<Chev/>} last/>
        </Section>

        <Section title="Support">
          <Row t="Help" right={<Chev/>}/>
          <Row t="Rate the app" right={<Chev/>}/>
          <Row t="Terms" right={<Chev/>} last/>
        </Section>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--fg-3)',
                      padding: '4px 0 8px' }}>v3.2.1</div>
      </div>
    </div>
  );
}

/* ── 21 Permission ───────────────────────────────────────────────── */
function ScrPermission({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '40px 28px 24px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'var(--bg-2)', color: 'var(--fg-0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}>
            {ICONS.test(40)}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 600, margin: '0 0 10px',
                       letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Use your speaker
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.55,
                      maxWidth: 300, margin: '0 0 28px' }}>
            We play tones through your speaker to clean it. Nothing is recorded.
          </p>

          <div className="card" style={{ width: '100%', padding: 16 }}>
            {[
              ['Audio output', 'Required'],
              ['Vibration', 'Required'],
              ['Notifications', 'Optional'],
            ].map((p, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < arr.length - 1 ? '1px solid var(--hairline)' : 'none',
              }}>
                <div style={{ color: 'var(--fg-0)' }}>{ICONS.check(16)}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p[0]}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{p[1]}</div>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('welcome')}>
          Allow
        </button>
        <button className="btn-ghost" onClick={() => nav('welcome')} style={{ marginTop: 4 }}>
          Not now
        </button>
      </div>
    </div>
  );
}

/* ── 12 Empty Home (first run) ───────────────────────────────────── */
function ScrEmptyHome({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 22px 0', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>CleanSpeaker</div>
        <div style={{
          padding: '5px 10px', borderRadius: 999,
          background: 'var(--bg-2)', color: 'var(--fg-1)',
          fontSize: 11, fontWeight: 600,
        }}>Free</div>
      </div>

      <div style={{ padding: '24px 22px', height: 'calc(100% - 36px - 60px)',
                    display: 'flex', flexDirection: 'column' }}>

        <div style={{ textAlign: 'center', padding: '12px 0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <SpeakerCone size={96}/>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em',
                       margin: '0 0 8px' }}>
            Run your first cycle
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', maxWidth: 280,
                      margin: '0 auto', lineHeight: 1.5 }}>
            Volume up, speaker down. We'll do the rest.
          </p>
        </div>

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
              First cycle free · 40 s
            </div>
          </div>
          <div style={{ color: '#FFFFFF' }}>{ICONS.arrow(18)}</div>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Volume up', 'Set to maximum'],
            ['Speaker down', 'Soft surface'],
            ['Stay close', "Don't leave"],
          ].map((t, i) => (
            <div key={i} className="card" style={{
              padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: 'var(--bg-2)', color: 'var(--fg-0)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontFamily: 'var(--f-mono)', fontWeight: 600,
              }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t[0]}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{t[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        height: 60, padding: '0 12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        borderTop: '1px solid var(--hairline)', background: 'var(--bg-1)',
      }}>
        {['Clean', 'Test', 'History', 'Account'].map((l, i) => (
          <div key={l} style={{
            fontSize: 10, color: i === 0 ? 'var(--fg-0)' : 'var(--fg-2)',
            fontWeight: 500,
          }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ── Modal scaffold ──────────────────────────────────────────────── */
function Modal({ children, backgroundBlur = true }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: backgroundBlur ? 'blur(4px)' : 'none',
      WebkitBackdropFilter: backgroundBlur ? 'blur(4px)' : 'none',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      padding: 16,
    }}>{children}</div>
  );
}

/* ── 22 Premium locked ───────────────────────────────────────────── */
function ScrLocked({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader title="Pulse Clean"/>
      <div style={{ padding: '0 22px', height: 'calc(100% - 88px)',
                    position: 'relative', overflow: 'hidden' }}>
        <div style={{ filter: 'blur(6px) opacity(0.5)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      paddingTop: 20 }}>
          <PhoneShape size={140}/>
          <div style={{ height: 16 }}/>
          <div className="card" style={{ padding: 16, width: '100%' }}>
            <HapticPulse height={50} pattern="wave"/>
          </div>
        </div>

        <Modal>
          <div className="card" style={{ width: '100%', padding: 24, textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
              background: 'var(--bg-2)', color: 'var(--fg-0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{ICONS.lock(28)}</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 6px',
                         letterSpacing: '-0.02em' }}>
              Pro feature
            </h2>
            <p style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5,
                        margin: '0 0 18px' }}>
              Unlock Pulse Clean and unlimited cycles.
            </p>
            <button className="btn-primary" onClick={() => nav('paywall')}>
              Start free trial
            </button>
            <button className="btn-ghost" onClick={() => nav('home')} style={{ marginTop: 4 }}>
              Maybe later
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

/* ── 23 Abort cycle modal ────────────────────────────────────────── */
function ScrAbortModal({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader title="Deep Clean"/>
      <div style={{ padding: '0 22px', height: 'calc(100% - 88px)',
                    position: 'relative', overflow: 'hidden' }}>
        <div style={{ filter: 'blur(6px) opacity(0.5)', display: 'flex',
                      flexDirection: 'column', alignItems: 'center', paddingTop: 24 }}>
          <CircularDial size={220} value={0.4} hz={302} label="DISLODGE" pulsing/>
        </div>

        <Modal>
          <div className="card" style={{ width: '100%', padding: 22 }}>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em',
                          marginBottom: 6 }}>
              Stop cycle?
            </div>
            <p style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5,
                        margin: '0 0 18px' }}>
              Stopping early leaves debris in the speaker.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => nav('home')} style={{
                flex: 1, height: 48, borderRadius: 999,
                background: 'var(--bg-2)', border: 'none', color: 'var(--danger)',
                fontFamily: 'var(--f-ui)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}>Stop</button>
              <button onClick={() => nav('cycle')} style={{
                flex: 1.5, height: 48, borderRadius: 999, border: 'none',
                background: 'var(--fg-0)', color: '#FFFFFF',
                fontFamily: 'var(--f-ui)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}>Continue</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

/* ── 24 Offline ──────────────────────────────────────────────────── */
function ScrOffline({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')}/>
      <div style={{ padding: '0 28px 24px', height: 'calc(100% - 88px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--bg-2)', color: 'var(--warn)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 22,
          }}>
            {ICONS.wifi_off(36)}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px',
                       letterSpacing: '-0.02em' }}>
            You're offline
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5,
                      maxWidth: 280 }}>
            Cleaning still works. History won't sync.
          </p>
        </div>

        <button className="btn-primary" onClick={() => nav('home')}>Retry</button>
        <button className="btn-ghost" onClick={() => nav('home')}>Continue offline</button>
      </div>
    </div>
  );
}

/* ── 11 Push notification permission ─────────────────────────────── */
function ScrPush({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '40px 28px 24px', height: 'calc(100% - 36px)',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'var(--bg-2)', color: 'var(--fg-0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24,
          }}>
            {ICONS.bell(36)}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px',
                       letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Stay on schedule
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-1)', lineHeight: 1.5,
                      maxWidth: 280, margin: '0 0 22px' }}>
            Get a reminder every 7 days.
          </p>

          <div className="card" style={{ padding: 14, width: '100%',
                                          display: 'flex', alignItems: 'center', gap: 12,
                                          textAlign: 'left' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'var(--fg-0)', color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{ICONS.shield(16)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>CleanSpeaker</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Time for your weekly cycle
              </div>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>now</div>
          </div>
        </div>

        <button className="btn-primary" onClick={() => nav('home')}>Allow</button>
        <button className="btn-ghost" onClick={() => nav('home')}>Not now</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScrPulse, ScrDownsell, ScrSettings, ScrPermission, ScrEmptyHome,
  ScrLocked, ScrAbortModal, ScrOffline, ScrPush, Switch, Modal,
});
