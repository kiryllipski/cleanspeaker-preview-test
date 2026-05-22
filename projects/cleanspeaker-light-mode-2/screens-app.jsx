/* ===== CleanSpeaker — App Flow Screens ===== */

const { useState: useS_app, useEffect: useE_app, useRef: useR_app } = React;

/* ---- 05: Home (Free) ---- */
function ScrHomeFree({ nav, state, set }) {
  return (
    <div className="cs-screen cs-screen-quiet">
      <CSStatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 0' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', letterSpacing: '-0.005em' }}>Hello</div>
          <div className="h-2" style={{ marginTop: 2 }}>CleanSpeaker</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-button">{ICONS.sparkle(18)}</button>
          <button className="icon-button">{ICONS.more(18)}</button>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => nav('setup')} style={{
          position: 'relative',
          width: '100%',
          borderRadius: 22,
          padding: '22px 20px',
          background: 'linear-gradient(160deg, #F0FAFE 0%, #E0F4FB 60%, #BAE6FD 130%)',
          border: '1px solid rgba(56,189,248,0.25)',
          overflow: 'hidden',
          textAlign: 'left',
          cursor: 'pointer',
          boxShadow: '0 12px 30px -16px rgba(14,165,233,0.4)',
        }}>
          <div style={{ position: 'absolute', right: -32, top: -28, opacity: 0.85 }}><GlowOrb size={180} intensity={0.85}/></div>
          <div className="eyebrow" style={{ color: 'var(--cy-3)', marginBottom: 10 }}>Main rescue</div>
          <div className="h-1" style={{ marginBottom: 8, maxWidth: 200 }}>Water in your speaker?</div>
          <div style={{ fontSize: 13, color: 'var(--fg-1)', maxWidth: 220, marginBottom: 16 }}>Eject trapped water with tuned sound.</div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 38, padding: '0 16px', borderRadius: 999, background: 'var(--fg-0)', color: '#fff', fontSize: 13, fontWeight: 600 }}>
            Start Rescue {ICONS.next(14)}
          </span>
        </button>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10, paddingLeft: 4 }}>More tools</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <ToolTile icon={ICONS.dust(20)} label="Dust Clean" sub="Loosen debris" onClick={() => nav('setup')}/>
          <ToolTile icon={ICONS.volume(20)} label="Low volume" sub="Restore loudness" onClick={() => nav('setup')}/>
          <ToolTile icon={ICONS.wave(20)} label="Sound Test" sub="Quick check" onClick={() => nav('sound-test')}/>
          <ToolTile icon={ICONS.flash(20)} label="Advanced" sub="Manual Hz, modes" locked onClick={() => nav('premium-tools')}/>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 22, left: 20, right: 20 }}>
        <Banner title="Soundwell" desc="Premium ear care · Try 7 days free" action="Open"/>
      </div>
    </div>
  );
}

/* ---- 06: Home (Premium) ---- */
function ScrHomePremium({ nav }) {
  return (
    <div className="cs-screen cs-screen-quiet">
      <CSStatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>Hello</div>
            <span className="chip-pro">PRO</span>
          </div>
          <div className="h-2" style={{ marginTop: 2 }}>CleanSpeaker</div>
        </div>
        <button className="icon-button">{ICONS.more(18)}</button>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <button onClick={() => nav('setup')} style={{
          position: 'relative',
          width: '100%',
          borderRadius: 22,
          padding: '22px 20px',
          background: 'linear-gradient(160deg, #0EA5E9 0%, #0284C7 60%, #075A8C 130%)',
          color: '#fff',
          overflow: 'hidden',
          textAlign: 'left',
          cursor: 'pointer',
          boxShadow: '0 18px 36px -16px rgba(2,132,199,0.5)',
        }}>
          <div style={{ position: 'absolute', right: -32, top: -28, opacity: 0.7 }}><GlowOrb size={180} intensity={0.65}/></div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Premium unlocked</div>
          <div className="h-1" style={{ marginBottom: 8, color: '#fff', maxWidth: 220 }}>Deep Clean ready.</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', maxWidth: 220, marginBottom: 16 }}>Stronger multi-step session.</div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 38, padding: '0 16px', borderRadius: 999, background: '#fff', color: 'var(--fg-0)', fontSize: 13, fontWeight: 600 }}>
            Start Deep Clean {ICONS.next(14)}
          </span>
        </button>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10, paddingLeft: 4 }}>All tools unlocked</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <ToolTile icon={ICONS.water(20)} label="Water Clean" sub="Quick rescue" onClick={() => nav('setup')}/>
          <ToolTile icon={ICONS.dust(20)} label="Dust Clean" sub="Loosen debris" onClick={() => nav('setup')}/>
          <ToolTile icon={ICONS.hz(20)} label="Manual Hz" sub="200–8000" onClick={() => nav('manual-hz')}/>
          <ToolTile icon={ICONS.vibration(20)} label="Vibration" sub="Intensity, patterns" onClick={() => nav('vibration')}/>
          <ToolTile icon={ICONS.headset(20)} label="Headset" sub="Earpiece flow" onClick={() => nav('setup')}/>
          <ToolTile icon={ICONS.wave(20)} label="Wave modes" sub="Sine · sweep · pulse" onClick={() => nav('manual-hz')}/>
        </div>
      </div>
    </div>
  );
}

/* ---- 07: Setup checklist ---- */
function ScrSetup({ nav }) {
  const [checks, setChecks] = useS_app({ vol: false, screen: false, head: false });
  const ready = checks.vol && checks.screen && checks.head;
  const toggle = (k) => setChecks(c => ({ ...c, [k]: !c[k] }));
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-free')} title="Before we start" right={<span className="chip-soft">2 min</span>}/>

      <div style={{ padding: '14px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Quick checks</div>
        <div className="h-1" style={{ marginBottom: 8 }}>Three quick<br/>checks first.</div>
        <div className="body">For the best clean, confirm all three.</div>
      </div>

      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <OptionCard icon={ICONS.volume(20)} title="Volume at 100%"
          sub="Maximize media volume in system settings"
          active={checks.vol}
          onClick={() => toggle('vol')}/>
        <OptionCard icon={ICONS.speaker(20)} title="Phone face down"
          sub="Lay on a flat, hard surface"
          active={checks.screen}
          onClick={() => toggle('screen')}/>
        <OptionCard icon={ICONS.headset(20)} title="No headphones connected"
          sub="Disconnect Bluetooth audio"
          active={checks.head}
          onClick={() => toggle('head')}/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <CTAButton onClick={() => ready && nav('clean-active')} disabled={!ready}>
          {ready ? "I'm ready" : `Confirm all ${[checks.vol, checks.screen, checks.head].filter(Boolean).length}/3 checks`}
        </CTAButton>
      </div>
    </div>
  );
}

/* ---- 08: Clean Active ---- */
function ScrCleanActive({ nav }) {
  const DURATION = 60; // seconds
  const [elapsed, setElapsed] = useS_app(0);
  useE_app(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const e = (now - start) / 1000;
      setElapsed(e);
      if (e >= DURATION) { nav('clean-complete'); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const progress = Math.min(1, elapsed / DURATION);
  const remain = Math.max(0, DURATION - elapsed);
  const m = Math.floor(remain / 60), s = Math.floor(remain % 60);
  const time = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-free')} title="Water Clean" right={<span className="chip">450 Hz</span>}/>

      <div style={{ padding: '8px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>In progress</div>
        <div className="h-2" style={{ marginBottom: 6 }}>Ejecting water<br/>from your speaker.</div>
        <div className="body-sm">Sound waves push the moisture out. Don't move the phone.</div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <WaterDropParticles width={300} height={300}/>
        </div>
        <ProgressRing size={260} stroke={10} progress={progress}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="mono" style={{ fontSize: 46, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-0)' }}>{time}</div>
            <div className="mono" style={{ fontSize: 13, color: 'var(--cy-2)', marginTop: 6, letterSpacing: '0.04em' }}>{Math.round(progress * 100)}%</div>
          </div>
        </ProgressRing>
      </div>

      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 18 }}>
        <Stat label="Frequency" value="450 Hz"/>
        <Stat label="Mode" value="Auto"/>
        <Stat label="Cycle" value="01 / 03"/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <button onClick={() => nav('clean-stopped')} style={{
          width: '100%', height: 56, borderRadius: 999,
          background: 'var(--bg-1)', border: '1px solid var(--hairline-2)',
          fontSize: 15, fontWeight: 600, color: 'var(--fg-0)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: 999, background: 'var(--bg-2)', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-0)' }}>{ICONS.stop(12)}</span>
          Stop session
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ textAlign: 'center', padding: '8px 14px', background: 'var(--bg-1)', border: '1px solid var(--hairline)', borderRadius: 12, minWidth: 84 }}>
      <div style={{ fontSize: 10.5, color: 'var(--fg-2)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div className="mono" style={{ fontSize: 14, color: 'var(--fg-0)', fontWeight: 600, marginTop: 4 }}>{value}</div>
    </div>
  );
}

/* ---- 09: Clean Stopped ---- */
function ScrCleanStopped({ nav }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-free')} title=""/>

      <div style={{ padding: '40px 28px 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', width: 80, height: 80, borderRadius: 999, background: 'var(--bg-2)', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-1)', marginBottom: 24 }}>
          {ICONS.stop(28)}
        </div>
        <div className="h-1" style={{ marginBottom: 8 }}>Clean stopped</div>
        <div className="body">The session was interrupted. You can resume or skip to the test.</div>
      </div>

      <div style={{ padding: '36px 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CTAButton onClick={() => nav('clean-active')}>Run again</CTAButton>
        <CTAButton variant="ghost" onClick={() => nav('sound-test')}>Test sound</CTAButton>
      </div>
    </div>
  );
}

/* ---- 10: Clean Complete ---- */
function ScrCleanComplete({ nav }) {
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <CSHeader title=""/>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
        <GlowOrb size={220} intensity={1.1}/>
      </div>
      <div style={{ padding: '24px 28px 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--cy-3)' }}>Session complete</div>
        <div className="h-1" style={{ marginBottom: 10 }}>Clean complete.</div>
        <div className="body">Now check your sound by ear.</div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('sound-test')}>Continue to test</CTAButton>
      </div>
    </div>
  );
}

/* ---- 11: Sound Test ---- */
function ScrSoundTest({ nav }) {
  const [playing, setPlaying] = useS_app(false);
  useE_app(() => {
    if (!playing) return;
    const id = setTimeout(() => setPlaying(false), 3200);
    return () => clearTimeout(id);
  }, [playing]);
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-free')} title="Sound Test"/>

      <div style={{ padding: '12px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Listen & judge</div>
        <div className="h-1" style={{ marginBottom: 8 }}>Does it sound<br/>clear now?</div>
        <div className="body">Tap to play a calibrated sample. Then choose how it sounds.</div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => setPlaying(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
          <GlowOrb size={200} intensity={playing ? 1.3 : 0.85}/>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            {playing ? ICONS.stop(28) : ICONS.play(32)}
          </div>
        </button>
      </div>

      <div style={{ padding: '8px 24px 0', display: 'flex', justifyContent: 'center' }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--cy-3)', letterSpacing: '0.06em' }}>
          {playing ? '— PLAYING 1.2 kHz REFERENCE —' : '— TAP TO PLAY TEST —'}
        </div>
      </div>

      <div style={{ marginTop: 14, padding: '0 24px' }}>
        <Waveform width={364} height={70} amplitude={playing ? 1 : 0.18} running={true}/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', gap: 10 }}>
        <button onClick={() => nav('result-better')} style={{ flex: 1, height: 56, borderRadius: 999, background: 'var(--cy-1)', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer' }}>Sounds better</button>
        <button onClick={() => nav('result-muffled')} style={{ flex: 1, height: 56, borderRadius: 999, background: 'var(--bg-1)', color: 'var(--fg-0)', fontWeight: 600, fontSize: 15, border: '1px solid var(--hairline-2)', cursor: 'pointer' }}>Still muffled</button>
      </div>
    </div>
  );
}

/* ---- 12: Result — Better ---- */
function ScrResultBetter({ nav }) {
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-free')} title=""/>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, position: 'relative' }}>
        <GlowOrb size={210} intensity={1.15}/>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cy-1)', boxShadow: '0 8px 24px -8px var(--cy-glow)' }}>
            {ICONS.check(34)}
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 28px 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--cy-3)' }}>Rescue complete</div>
        <div className="h-1" style={{ marginBottom: 8 }}>Sound restored.</div>
        <div className="body">Your speaker is clear again. Run it once more if needed.</div>
      </div>

      <div style={{ padding: '28px 20px 0' }}>
        <Banner title="Soundwell" desc="Ear care plus 7 days free" action="Try"/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CTAButton onClick={() => nav('home-free')}>Done</CTAButton>
        <CTAButton variant="ghost" onClick={() => nav('clean-active')}>Run again</CTAButton>
      </div>
    </div>
  );
}

/* ---- 13: Result — Still muffled / Deep Clean Upsell ---- */
function ScrResultMuffled({ nav, set }) {
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <CSHeader onBack={() => nav('sound-test')} title=""/>

      <div style={{ padding: '8px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--cy-3)' }}>Stronger option</div>
        <div className="h-1" style={{ marginBottom: 8 }}>Still muffled?<br/>Try a deeper clean.</div>
        <div className="body">Basic clean uses a single tone. Deep Clean uses a multi-step sweep tuned to dislodge stubborn water.</div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{
          position: 'relative',
          borderRadius: 22,
          padding: '20px',
          background: 'linear-gradient(160deg, #FFFFFF 0%, #F0FAFE 70%, #E0F4FB 130%)',
          border: '1px solid var(--cy-soft)',
          overflow: 'hidden',
          boxShadow: '0 18px 36px -16px rgba(14,165,233,0.3)',
        }}>
          <div style={{ position: 'absolute', right: -24, top: -24, opacity: 0.6 }}><GlowOrb size={140}/></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span className="chip-pro">PRO</span>
            <span className="eyebrow" style={{ color: 'var(--cy-3)' }}>Deep Clean</span>
          </div>
          <div className="h-2" style={{ marginBottom: 6 }}>Deep, multi-step.</div>
          <div className="body-sm" style={{ marginBottom: 16 }}>For tough cases. Sweeps frequencies to release trapped water.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Bullet>Manual Hz · 200 to 8000</Bullet>
            <Bullet>Wave modes · sine, sweep, pulse</Bullet>
            <Bullet>Vibration intensity control</Bullet>
            <Bullet>No ads, longer sessions</Bullet>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CTAButton onClick={() => { set && set('premium', true); nav('home-premium'); }}>Try Deep Clean</CTAButton>
        <CTAButton variant="ghost" onClick={() => nav('clean-active')}>Run basic again</CTAButton>
      </div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--fg-1)' }}>
      <span style={{ width: 16, height: 16, borderRadius: 999, background: 'var(--cy-1)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ICONS.check(11)}</span>
      <span>{children}</span>
    </div>
  );
}

/* ---- 14: Premium Tools (locked surface for free user) ---- */
function ScrPremiumTools({ nav }) {
  const tools = [
    { i: 'Deep Clean', s: 'Multi-step strong session', icon: ICONS.water(20) },
    { i: 'Manual Hz', s: 'Fine frequency control', icon: ICONS.hz(20) },
    { i: 'Wave modes', s: 'Sine, sweep, pulse', icon: ICONS.wave(20) },
    { i: 'Headset Clean', s: 'For earpieces', icon: ICONS.headset(20) },
    { i: 'Vibration', s: 'Pattern + intensity', icon: ICONS.vibration(20) },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-free')} title="Premium tools"/>

      <div style={{ padding: '12px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Advanced control</div>
        <div className="h-1" style={{ marginBottom: 8 }}>For tough cases.</div>
        <div className="body">Unlock five tools for stubborn debris and fine-tuned sessions.</div>
      </div>

      <div style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tools.map((t) => (
          <OptionCard key={t.i} icon={t.icon} title={t.i} sub={t.s} locked onClick={() => nav('paywall')}/>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('paywall')}>See special offer</CTAButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScrHomeFree,
  ScrHomePremium,
  ScrSetup,
  ScrCleanActive,
  ScrCleanStopped,
  ScrCleanComplete,
  ScrSoundTest,
  ScrResultBetter,
  ScrResultMuffled,
  ScrPremiumTools,
  Stat,
  Bullet,
});
