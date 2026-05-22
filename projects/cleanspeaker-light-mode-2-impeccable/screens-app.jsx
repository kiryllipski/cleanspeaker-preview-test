/* ============================================================
   screens-app.jsx — Home, Setup, Clean, Test, Result, Premium tools
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   ScrHomeFree
   ────────────────────────────────────────────────────────── */
function ScrHomeFree({ nav, state }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{
        padding: '12px 20px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Good evening
          </div>
          <div className="t-h2" style={{ marginTop: 2 }}>CleanSpeaker</div>
        </div>
        <button className="icon-btn" onClick={() => nav('settings')} aria-label="Settings">
          {ICONS.settings(20)}
        </button>
      </div>

      <Body style={{ paddingTop: 18 }}>
        <div className="anim-fade-up" style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden',
          background: 'radial-gradient(120% 110% at 50% 0%, #DDEAF8 0%, #FFFFFF 70%)',
          border: '1px solid var(--hairline)',
          padding: '22px 22px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="t-eyebrow" style={{ color: 'var(--cy-2)' }}>Recommended</div>
              <h2 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>
                Water in speaker?
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-1)', maxWidth: 220 }}>
                Clean sound in 3 guided steps.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlowOrb size={108} />
            </div>
          </div>
          <button className="btn btn-primary btn-block" style={{ marginTop: 22 }} onClick={() => nav('setup')}>
            Start Rescue
          </button>
        </div>

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div className="t-eyebrow">Other tools</div>
          <button onClick={() => nav('paywall')} style={{
            all: 'unset', cursor: 'pointer', fontSize: 12, color: 'var(--cy-2)', fontWeight: 500,
          }}>Unlock all →</button>
        </div>

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <ToolTile icon={ICONS.dust(22)} title="Dust Clean" sub="Quick · Free"
            onClick={() => nav('setup')} className="anim-fade-up delay-1" />
          <ToolTile icon={ICONS.volume(22)} title="Sound Test" sub="Check clarity"
            onClick={() => nav('soundtest')} className="anim-fade-up delay-2" />
        </div>

        <button onClick={() => nav('paywall')} className="anim-fade-up delay-3" style={{
          all: 'unset', cursor: 'pointer',
          marginTop: 10, padding: '14px 16px', borderRadius: 16,
          background: 'var(--bg-2)', border: '1px solid var(--hairline)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: 'var(--fg-0)', color: 'var(--cy-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{ICONS.crown(20)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Pro tools locked</div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>Manual Hz · Wave modes · Vibration</div>
          </div>
          <span style={{ color: 'var(--fg-2)' }}>{ICONS.chev(16)}</span>
        </button>

        <div className="anim-fade-up delay-4" style={{ marginTop: 16, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -8, left: 12, fontSize: 9.5,
            color: 'var(--fg-3)', background: 'var(--bg-1)', padding: '0 6px', letterSpacing: '0.18em',
          }}>SPONSORED</div>
          <Banner />
        </div>
      </Body>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrHomePremium — same shell, all unlocked, no banner
   ────────────────────────────────────────────────────────── */
function ScrHomePremium({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{
        padding: '12px 20px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--cy-2)', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'flex', gap: 6, alignItems: 'center' }}>
            {ICONS.sparkle(12)} Pro
          </div>
          <div className="t-h2" style={{ marginTop: 2 }}>CleanSpeaker</div>
        </div>
        <button className="icon-btn" onClick={() => nav('settings')} aria-label="Settings">
          {ICONS.settings(20)}
        </button>
      </div>

      <Body style={{ paddingTop: 18 }}>
        <div className="anim-fade-up" style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden',
          background: 'radial-gradient(120% 110% at 50% 0%, #C2DEFC 0%, #EEF3F9 70%)',
          border: '1px solid var(--hairline)',
          padding: '22px 22px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="t-eyebrow" style={{ color: 'var(--cy-2)' }}>All tools unlocked</div>
              <h2 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>
                Deep Clean ready.
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-1)', maxWidth: 220 }}>
                Multi-cycle cleaning with smart vibration.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GlowOrb size={108} intensity={1.2} />
            </div>
          </div>
          <button className="btn btn-primary btn-block" style={{ marginTop: 22 }} onClick={() => nav('setup')}>
            Start Deep Clean
          </button>
        </div>

        <div className="t-eyebrow" style={{ marginTop: 20 }}>Quick tools</div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <ToolTile icon={ICONS.water(22)} title="Water Clean" sub="Standard" onClick={() => nav('setup')} className="anim-fade-up delay-1" />
          <ToolTile icon={ICONS.dust(22)}  title="Dust Clean"  sub="Quick"    onClick={() => nav('setup')} className="anim-fade-up delay-2" />
        </div>

        <div className="t-eyebrow" style={{ marginTop: 18 }}>Advanced</div>
        <div className="anim-fade-up delay-3" style={{ marginTop: 10, background: 'var(--bg-1)', border: '1px solid var(--hairline)', borderRadius: 18, overflow: 'hidden' }}>
          {[
            { i: ICONS.wave(20), t: 'Manual Hz', s: '100–1000 Hz', go: 'manualhz' },
            { i: ICONS.audio(20), t: 'Wave Modes', s: 'Sine · Square · Sweep', go: 'wavemodes' },
            { i: ICONS.vibration(20), t: 'Vibration', s: 'Low to High', go: 'vibration' },
            { i: ICONS.headset(20), t: 'Headset Clean', s: 'Per-side cycle', go: 'headsetclean' },
          ].map((it, idx, arr) => (
            <button key={it.t} onClick={() => nav(it.go)} style={{
              all: 'unset', cursor: 'pointer', width: '100%',
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px',
              borderTop: idx > 0 ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: 'var(--cy-0)', color: 'var(--cy-1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{it.i}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>{it.s}</div>
              </div>
              <span style={{ color: 'var(--fg-3)' }}>{ICONS.chev(14)}</span>
            </button>
          ))}
        </div>
      </Body>
    </div>
  );
}

function ToolTile({ icon, title, sub, locked, onClick, className }) {
  return (
    <button onClick={onClick} className={className} style={{
      all: 'unset', cursor: 'pointer',
      padding: 16, borderRadius: 18,
      background: 'var(--bg-1)', border: '1px solid var(--hairline)',
      display: 'flex', flexDirection: 'column', gap: 12,
      position: 'relative',
      transition: 'border 200ms var(--ease), transform 200ms var(--ease)',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--hairline-2)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--hairline)'}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: locked ? 'var(--bg-2)' : 'var(--cy-0)',
        color: locked ? 'var(--fg-2)' : 'var(--cy-1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
          {locked && <span style={{ color: 'var(--fg-3)' }}>{ICONS.lock(13)}</span>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{sub}</div>
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrSetup — checklist before clean
   ────────────────────────────────────────────────────────── */
function ScrSetup({ nav }) {
  const [checks, setChecks] = useState([true, false, false]);
  const all = checks.every(Boolean);
  const items = [
    { t: 'Volume at 100%', s: 'Maximum sound output for ejection' },
    { t: 'Screen facing down', s: 'Helps gravity pull water out' },
    { t: 'No headphones connected', s: 'Disconnect wired or Bluetooth' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Setup" />
      <Body style={{ paddingTop: 8 }}>
        <div className="anim-fade-up">
          <div className="t-eyebrow">3 quick checks</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>Before we start</h2>
          <p className="t-sub" style={{ margin: 0 }}>Tap each step to confirm.</p>
        </div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => (
            <button key={i} className={`anim-fade-up delay-${i + 1}`} onClick={() => {
              setChecks(c => c.map((v, k) => k === i ? !v : v));
            }} style={{
              all: 'unset', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 18px',
              borderRadius: 16,
              background: checks[i] ? 'var(--bg-1)' : 'var(--bg-2)',
              border: `1px solid ${checks[i] ? 'var(--cy-1)' : 'var(--hairline)'}`,
              transition: 'all 220ms var(--ease)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                border: `2px solid ${checks[i] ? 'var(--cy-1)' : 'var(--hairline-3)'}`,
                background: checks[i] ? 'var(--cy-1)' : 'transparent',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 200ms var(--ease)',
              }}>
                {checks[i] && ICONS.check(16)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{it.t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--fg-2)', marginTop: 2 }}>{it.s}</div>
              </div>
              <span style={{ color: 'var(--fg-3)' }}>{checks[i] ? null : ICONS.chev(16)}</span>
            </button>
          ))}
        </div>

        <div className="card-quiet anim-fade-up delay-4" style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.shield(20)}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-1)', flex: 1 }}>
            Stay still during cleaning. The session takes about 2 minutes 30 seconds.
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" disabled={!all} onClick={() => nav('clean')}>
          {all ? "I'm Ready" : `Complete ${checks.filter(c => !c).length} more`}
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrClean — active cleaning session
   ────────────────────────────────────────────────────────── */
function ScrClean({ nav }) {
  const TOTAL = 150; // real total seconds (display)
  const DEMO  = 12;  // accelerated for prototype
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    let raf, start = performance.now();
    const tick = (now) => {
      const real = ((now - start) / 1000) * (TOTAL / DEMO);
      const e = Math.min(TOTAL, real);
      setElapsed(e);
      if (e < TOTAL) raf = requestAnimationFrame(tick);
      else setTimeout(() => nav('cleancomplete'), 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const progress = elapsed / TOTAL;
  const mm = Math.floor((TOTAL - elapsed) / 60).toString().padStart(2, '0');
  const ss = Math.floor((TOTAL - elapsed) % 60).toString().padStart(2, '0');

  return (
    <div className="cs-screen cs-screen-glow-deep">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Water Clean" />

      <Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
        <div className="t-eyebrow anim-fade-in">In progress</div>

        <div style={{ position: 'relative', marginTop: 18 }}>
          <ProgressRing size={280} stroke={14} progress={progress}
            track="rgba(15,23,42,0.06)"
            center={
              <>
                <div className="t-mono" style={{ fontSize: 54, fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {mm}:{ss}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 8 }}>
                  Remaining
                </div>
              </>
            }
          />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: -1,
          }}>
            <RippleWaves size={300} color="#0A84FF" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 26 }}>
          <Chip>{ICONS.wave(14)} 450 Hz</Chip>
          <Chip>{ICONS.vibration(14)} Medium</Chip>
          <Chip>{ICONS.bolt(14)} Cycle 1/2</Chip>
        </div>

        <div style={{ marginTop: 20 }}>
          <Waveform width={320} height={50} />
        </div>

        <p className="t-sub anim-fade-up" style={{ marginTop: 4, textAlign: 'center', maxWidth: 280 }}>
          Sound waves help push trapped water out of the speaker.
        </p>
      </Body>

      <BottomCTA>
        <button className="btn btn-soft btn-block" onClick={() => nav('cleancomplete')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--bad)' }}>
            {ICONS.stop(16)} Stop
          </span>
        </button>
      </BottomCTA>
    </div>
  );
}

function Chip({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 12px', borderRadius: 999,
      background: 'rgba(255,255,255,0.7)',
      border: '1px solid var(--hairline)',
      fontSize: 12.5, fontWeight: 500, color: 'var(--fg-0)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    }}>{children}</div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrCleanComplete — bridge to sound test
   ────────────────────────────────────────────────────────── */
function ScrCleanComplete({ nav }) {
  return (
    <div className="cs-screen cs-screen-glow">
      <CSStatusBar />
      <Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 200, height: 200 }} className="anim-fade-in">
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GlowOrb size={200} intensity={1.3} />
          </div>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 76, height: 76, borderRadius: 999,
              background: '#fff', color: 'var(--cy-1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 18px 40px rgba(10,132,255,0.32)',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12l5 5L20 7"
                  strokeDasharray="30"
                  strokeDashoffset="30"
                  style={{ animation: 'check-draw 600ms 200ms var(--ease) forwards' }}
                />
              </svg>
            </div>
          </div>
        </div>
        <style>{`@keyframes check-draw { to { stroke-dashoffset: 0; } }`}</style>

        <div className="anim-fade-up delay-2" style={{ marginTop: 28 }}>
          <div className="t-eyebrow" style={{ color: 'var(--cy-2)' }}>Cycle complete</div>
          <h2 className="t-h1" style={{ margin: '10px 0 8px' }}>Clean complete</h2>
          <p className="t-sub" style={{ margin: 0, maxWidth: 280, marginInline: 'auto' }}>
            Now play a quick test to check your sound.
          </p>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('soundtest')}>
          Continue to Sound Test
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrSoundTest — play test sound + feedback
   ────────────────────────────────────────────────────────── */
function ScrSoundTest({ nav }) {
  const [playing, setPlaying] = useState(false);
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Sound Test" />
      <Body>
        <div className="anim-fade-up" style={{ textAlign: 'center', marginTop: 8 }}>
          <div className="t-eyebrow">Verify clarity</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>Play a test sound</h2>
          <p className="t-sub" style={{ margin: 0 }}>How does it sound now?</p>
        </div>

        <div style={{
          marginTop: 32, position: 'relative',
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: 280,
        }}>
          {playing && <div style={{ position: 'absolute' }}><RippleWaves size={260} /></div>}
          <button onClick={() => setPlaying(p => !p)} style={{
            all: 'unset', cursor: 'pointer',
            width: 120, height: 120, borderRadius: 999,
            background: playing
              ? 'linear-gradient(180deg, #2A95FF, #0A84FF)'
              : 'linear-gradient(180deg, #2A95FF, #0066D6)',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 18px 40px rgba(10,132,255,0.32)',
            transition: 'transform 200ms var(--ease)',
            transform: playing ? 'scale(1.04)' : 'scale(1)',
          }}>
            {playing ? ICONS.stop(40) : ICONS.play(40)}
          </button>
        </div>

        <div style={{ marginTop: 8 }}>
          <Waveform width={360} height={40} animate={playing} amplitude={playing ? 1 : 0.15} />
        </div>

        <div className="anim-fade-up delay-2" style={{ marginTop: 18 }}>
          <div className="t-eyebrow" style={{ textAlign: 'center', marginBottom: 12 }}>
            How is the sound?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={() => { setFeedback('better'); setTimeout(() => nav('resultbetter'), 200); }}
              style={{
                all: 'unset', cursor: 'pointer',
                padding: '16px', borderRadius: 16,
                background: feedback === 'better' ? 'var(--fg-0)' : 'var(--bg-1)',
                color: feedback === 'better' ? '#fff' : 'var(--fg-0)',
                border: `1px solid ${feedback === 'better' ? 'var(--fg-0)' : 'var(--hairline)'}`,
                textAlign: 'center',
                transition: 'all 200ms var(--ease)',
              }}>
              <div style={{ fontSize: 22 }}>↑</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Better</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Sound is clear</div>
            </button>
            <button onClick={() => { setFeedback('muffled'); setTimeout(() => nav('resultmuffled'), 200); }}
              style={{
                all: 'unset', cursor: 'pointer',
                padding: '16px', borderRadius: 16,
                background: 'var(--bg-1)',
                color: 'var(--fg-0)',
                border: '1px solid var(--hairline)',
                textAlign: 'center',
                transition: 'all 200ms var(--ease)',
              }}>
              <div style={{ fontSize: 22 }}>≈</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Still muffled</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Needs more</div>
            </button>
          </div>
        </div>
      </Body>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrResultBetter — positive close
   ────────────────────────────────────────────────────────── */
function ScrResultBetter({ nav }) {
  return (
    <div className="cs-screen cs-screen-glow">
      <CSStatusBar />
      <Body style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 24 }}>
        <Confetti width={380} height={180} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 92, height: 92, borderRadius: 999,
            background: '#fff', color: 'var(--cy-1)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 18px 40px rgba(10,132,255,0.32)',
          }}>
            {ICONS.check(48)}
          </div>
        </div>

        <div className="anim-fade-up delay-2" style={{ marginTop: 24 }}>
          <div className="t-eyebrow" style={{ color: 'var(--cy-2)' }}>Rescue complete</div>
          <h2 className="t-h1" style={{ margin: '10px 0 8px' }}>Sound restored.</h2>
          <p className="t-sub" style={{ margin: 0, maxWidth: 320 }}>
            Your speaker is clean. Run another cycle if needed.
          </p>
        </div>

        <div className="card anim-fade-up delay-3" style={{ marginTop: 26, width: '100%', textAlign: 'left' }}>
          <div className="t-eyebrow" style={{ marginBottom: 14 }}>Session summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>
            <span style={{ fontSize: 13, color: 'var(--fg-1)' }}>Cycle time</span>
            <span className="t-mono" style={{ fontSize: 14, fontWeight: 600 }}>2:30</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>
            <span style={{ fontSize: 13, color: 'var(--fg-1)' }}>Frequency</span>
            <span className="t-mono" style={{ fontSize: 14, fontWeight: 600 }}>450 Hz</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <span style={{ fontSize: 13, color: 'var(--fg-1)' }}>Cycles</span>
            <span className="t-mono" style={{ fontSize: 14, fontWeight: 600 }}>1</span>
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('home')}>Done</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => nav('clean')}>
          Run again
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrResultMuffled — Deep Clean upsell
   ────────────────────────────────────────────────────────── */
function ScrResultMuffled({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('soundtest')} title={null} />
      <Body>
        <div className="anim-fade-up" style={{ marginTop: 8 }}>
          <div className="t-eyebrow">Still muffled?</div>
          <h2 className="t-h1" style={{ margin: '8px 0 8px' }}>Try a stronger clean.</h2>
          <p className="t-sub" style={{ margin: 0 }}>Deep Clean uses multi-cycle frequencies + vibration to remove stubborn debris.</p>
        </div>

        <div className="anim-fade-up delay-2" style={{
          marginTop: 22,
          padding: '24px 20px',
          borderRadius: 20,
          background: 'var(--fg-0)',
          color: '#fff',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.35 }}>
            <GlowOrb size={180} color="#38BDF8" glow="#38BDF8" />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(56,189,248,0.18)', color: '#38BDF8',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>{ICONS.sparkle(11)} Premium</div>
            <h3 style={{ margin: '12px 0 6px', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>
              Deep Clean
            </h3>
            <p style={{ margin: 0, fontSize: 13.5, opacity: 0.7 }}>
              2× longer · 3 frequency ranges · adaptive vibration
            </p>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Manual Hz control', 'Wave modes', 'Vibration intensity', 'No ads'].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, opacity: 0.9 }}>
                  <div style={{ color: '#38BDF8' }}>{ICONS.check(14)}</div>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('paywall')}>
          Try Deep Clean · 3 Days Free
        </button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => nav('clean')}>
          Run basic again
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrManualHz — frequency dial (Pro)
   ────────────────────────────────────────────────────────── */
function ScrManualHz({ nav }) {
  const [hz, setHz] = useState(450);
  const presets = [165, 300, 450, 600, 900];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Manual Hz" right={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--cy-2)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {ICONS.sparkle(12)} Pro
        </span>
      } />
      <Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12 }}>
        <p className="t-sub" style={{ margin: 0, textAlign: 'center' }}>Tune the cleaning frequency precisely.</p>

        <div style={{ marginTop: 22 }}>
          <CircularDial size={260} value={hz} />
        </div>

        <div style={{ marginTop: 24, width: '100%' }}>
          <input type="range" min="100" max="1000" value={hz}
            onChange={e => setHz(parseInt(e.target.value, 10))}
            style={{
              width: '100%', accentColor: 'var(--cy-1)',
              height: 4,
            }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-2)', marginTop: 4 }}>
            <span className="t-mono">100 Hz</span>
            <span className="t-mono">1000 Hz</span>
          </div>
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 6, width: '100%' }}>
          {presets.map(p => (
            <button key={p} onClick={() => setHz(p)} style={{
              all: 'unset', cursor: 'pointer',
              flex: 1, textAlign: 'center',
              padding: '9px 0', borderRadius: 999,
              background: hz === p ? 'var(--cy-1)' : 'var(--bg-2)',
              color: hz === p ? '#fff' : 'var(--fg-0)',
              fontSize: 13, fontWeight: 500, fontFamily: 'var(--f-mono)',
              transition: 'background 180ms var(--ease), color 180ms var(--ease)',
            }}>{p}</button>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: 14, background: 'var(--bg-2)', borderRadius: 14, width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.bolt(20)}</div>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--fg-1)' }}>
            <b style={{ color: 'var(--fg-0)' }}>{hz < 250 ? 'Low' : hz < 600 ? 'Mid' : 'High'}</b> · {hz < 250 ? 'Deep bass region' : hz < 600 ? 'Best for water ejection' : 'Targets fine debris'}
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('clean')}>
          Start at {hz} Hz
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrWaveModes — Pro
   ────────────────────────────────────────────────────────── */
function ScrWaveModes({ nav }) {
  const [mode, setMode] = useState('sine');
  const modes = [
    { k: 'sine',     t: 'Sine',         s: 'Smooth · default' },
    { k: 'square',   t: 'Square',       s: 'Stronger pulses' },
    { k: 'sweep',    t: 'Frequency sweep', s: 'Adaptive ramp' },
    { k: 'pulse',    t: 'Pulse train',  s: 'Burst pattern' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Wave Modes" right={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--cy-2)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {ICONS.sparkle(12)} Pro
        </span>
      } />
      <Body>
        <p className="t-sub" style={{ margin: '8px 0 0' }}>Choose the waveform for your cleaning cycle.</p>

        <div className="card" style={{ marginTop: 18, display: 'flex', justifyContent: 'center', padding: '24px 16px' }}>
          <Waveform width={340} height={100} amplitude={mode === 'square' ? 1.4 : mode === 'pulse' ? 1.1 : 1} />
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {modes.map((m, i) => (
            <div key={m.k} className={`anim-fade-up delay-${i + 1}`}>
              <OptionRow
                icon={ICONS.wave(18)}
                title={m.t} subtitle={m.s}
                active={mode === m.k} onClick={() => setMode(m.k)}
              />
            </div>
          ))}
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('clean')}>Apply & Start</button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrVibration — Pro
   ────────────────────────────────────────────────────────── */
function ScrVibration({ nav }) {
  const [v, setV] = useState(0.5);
  const level = v < 0.34 ? 'Low' : v < 0.67 ? 'Medium' : 'High';
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Vibration" right={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--cy-2)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {ICONS.sparkle(12)} Pro
        </span>
      } />
      <Body style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ alignSelf: 'flex-start' }}>
          <p className="t-sub" style={{ margin: 0 }}>Adjust vibration to help dislodge debris.</p>
        </div>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #EAF3FF, #DDEAF8 70%, #C2DEFC)',
            border: '1px solid var(--hairline)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <PhoneShape size={80} />
            <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '1px dashed var(--hairline-3)', animation: 'ring-rotate 12s linear infinite' }} />
          </div>

          <HapticPulse intensity={v} width={300} />

          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span className="t-eyebrow">Intensity</span>
              <span className="t-mono" style={{ fontSize: 18, fontWeight: 600 }}>{level}</span>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={v}
              onChange={e => setV(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--cy-1)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-2)' }}>
              <span>Low</span><span>Medium</span><span>High</span>
            </div>
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('clean')}>Apply & Start</button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrHeadsetClean — Pro
   ────────────────────────────────────────────────────────── */
function ScrHeadsetClean({ nav }) {
  const [step, setStep] = useState(0);
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Headset Clean" right={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--cy-2)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {ICONS.sparkle(12)} Pro
        </span>
      } />
      <Body style={{ paddingTop: 8 }}>
        <div className="anim-fade-up">
          <div className="t-eyebrow">Earpiece & headset</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>Test each side</h2>
          <p className="t-sub" style={{ margin: 0 }}>We'll clean each speaker independently.</p>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { t: 'Left earpiece', s: '180 Hz · 45 seconds' },
            { t: 'Right earpiece', s: '180 Hz · 45 seconds' },
            { t: 'Phone earpiece', s: 'Top speaker only' },
          ].map((it, i) => (
            <button key={i} onClick={() => setStep(i)} style={{
              all: 'unset', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 18px',
              borderRadius: 16,
              background: step === i ? 'var(--bg-1)' : 'var(--bg-2)',
              border: `1px solid ${step === i ? 'var(--cy-1)' : 'var(--hairline)'}`,
              transition: 'all 200ms var(--ease)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 999,
                background: step === i ? 'var(--cy-0)' : 'var(--bg-3)',
                color: step === i ? 'var(--cy-1)' : 'var(--fg-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{ICONS.headset(20)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{it.s}</div>
              </div>
              <div style={{ color: 'var(--fg-3)' }}>{ICONS.chev(14)}</div>
            </button>
          ))}
        </div>

        <div className="card-quiet" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.shield(20)}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-1)' }}>
            Lower volumes are used to protect your ears.
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('clean')}>Start Clean</button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Export
   ────────────────────────────────────────────────────────── */
Object.assign(window, {
  ScrHomeFree, ScrHomePremium,
  ScrSetup, ScrClean, ScrCleanComplete,
  ScrSoundTest, ScrResultBetter, ScrResultMuffled,
  ScrManualHz, ScrWaveModes, ScrVibration, ScrHeadsetClean,
});
