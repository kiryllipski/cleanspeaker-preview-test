/* ============================================================
   screens-onboarding.jsx — welcome → questions → analyzing
                            → plan → rating → paywall → downsell
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   ScrWelcome
   ────────────────────────────────────────────────────────── */
function ScrWelcome({ nav }) {
  return (
    <div className="cs-screen cs-screen-glow">
      <CSStatusBar />
      <Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px 0', overflow: 'visible' }}>
        <div style={{ marginTop: 14, textAlign: 'center' }} className="anim-fade-in">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(10,132,255,0.08)',
            color: 'var(--cy-2)', fontWeight: 600, fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--cy-1)' }} />
            CleanSpeaker
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GlowOrb size={320} />
        </div>

        <div style={{ textAlign: 'center', marginTop: -8 }}>
          <h1 className="t-display anim-fade-up" style={{ margin: 0, fontSize: 36, letterSpacing: '-0.03em' }}>
            Bring your sound<br/>back to life.
          </h1>
          <p className="t-body anim-fade-up delay-1" style={{ marginTop: 12, maxWidth: 320, marginInline: 'auto' }}>
            Remove water, dust and debris with guided sound waves and smart vibration.
          </p>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ width: '100%', padding: '0 0 22px' }}>
          <button className="btn btn-primary btn-block anim-fade-up delay-2" onClick={() => nav('q1')}>
            Get Started
          </button>
          <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: 'var(--fg-2)' }}>
            Trusted by 1.2M people · No commitment
          </div>
        </div>
      </Body>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrQ1 — what's the problem
   ────────────────────────────────────────────────────────── */
function ScrQ1({ nav, state, set }) {
  const v = state.problem;
  const opts = [
    { k: 'water', icon: ICONS.water(20), title: 'Water in speaker', sub: 'Muffled or low sound' },
    { k: 'dust',  icon: ICONS.dust(20),  title: 'Dust or sand',     sub: 'Crackling or buzzing' },
    { k: 'low',   icon: ICONS.volume(20),title: 'Low volume',       sub: 'Not as loud as before' },
    { k: 'other', icon: ICONS.question(20), title: 'Other issue',   sub: 'Something else' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('welcome')} title={null} right={<span style={{ fontSize: 13, color: 'var(--fg-2)' }}>1 / 3</span>} />
      <div style={{ padding: '0 20px 4px' }}>
        <Progress steps={3} current={1} />
      </div>
      <Body style={{ paddingTop: 28 }}>
        <div className="anim-fade-up">
          <div className="t-eyebrow">Question 01</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>What's the problem?</h2>
          <p className="t-sub" style={{ margin: 0 }}>Select the issue you're experiencing.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          {opts.map((o, i) => (
            <div key={o.k} className={`anim-fade-up delay-${i + 1}`}>
              <OptionRow icon={o.icon} title={o.title} subtitle={o.sub}
                active={v === o.k} onClick={() => set('problem', o.k)} />
            </div>
          ))}
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" disabled={!v} onClick={() => nav('q2')}>
          Continue
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrQ2 — when did it happen
   ────────────────────────────────────────────────────────── */
function ScrQ2({ nav, state, set }) {
  const v = state.when;
  const opts = [
    { k: 'now',     icon: ICONS.bolt(20),  title: 'Just now',         sub: 'Within the last hour' },
    { k: 'today',   icon: ICONS.refresh(20), title: 'Today',          sub: 'A few hours ago' },
    { k: 'recent',  icon: ICONS.wave(20),  title: 'Recently',         sub: 'A few days ago' },
    { k: 'awhile',  icon: ICONS.question(20), title: 'A while ago',   sub: 'Or not sure' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('q1')} title={null} right={<span style={{ fontSize: 13, color: 'var(--fg-2)' }}>2 / 3</span>} />
      <div style={{ padding: '0 20px 4px' }}>
        <Progress steps={3} current={2} />
      </div>
      <Body style={{ paddingTop: 28 }}>
        <div className="anim-fade-up">
          <div className="t-eyebrow">Question 02</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>When did it start?</h2>
          <p className="t-sub" style={{ margin: 0 }}>Faster action means better results.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          {opts.map((o, i) => (
            <div key={o.k} className={`anim-fade-up delay-${i + 1}`}>
              <OptionRow icon={o.icon} title={o.title} subtitle={o.sub}
                active={v === o.k} onClick={() => set('when', o.k)} />
            </div>
          ))}
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" disabled={!v} onClick={() => nav('q3')}>
          Continue
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrQ3 — your device
   ────────────────────────────────────────────────────────── */
function ScrQ3({ nav, state, set }) {
  const v = state.device;
  const opts = [
    { k: 'phone',    icon: ICONS.flip(20),    title: 'Phone speaker',     sub: 'Bottom or earpiece' },
    { k: 'tablet',   icon: ICONS.cone(20),    title: 'Tablet speaker',    sub: 'iPad, Galaxy Tab, etc.' },
    { k: 'bt',       icon: ICONS.audio(20),   title: 'Bluetooth speaker', sub: 'Portable or smart speaker' },
    { k: 'headset',  icon: ICONS.headset(20), title: 'Headphones',        sub: 'Wired or wireless' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('q2')} title={null} right={<span style={{ fontSize: 13, color: 'var(--fg-2)' }}>3 / 3</span>} />
      <div style={{ padding: '0 20px 4px' }}>
        <Progress steps={3} current={3} />
      </div>
      <Body style={{ paddingTop: 28 }}>
        <div className="anim-fade-up">
          <div className="t-eyebrow">Question 03</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>Which device?</h2>
          <p className="t-sub" style={{ margin: 0 }}>We'll tune the cleaning profile.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
          {opts.map((o, i) => (
            <div key={o.k} className={`anim-fade-up delay-${i + 1}`}>
              <OptionRow icon={o.icon} title={o.title} subtitle={o.sub}
                active={v === o.k} onClick={() => set('device', o.k)} />
            </div>
          ))}
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" disabled={!v} onClick={() => nav('analyzing')}>
          Continue
        </button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrAnalyzing — fake analysis ring + rotating status
   ────────────────────────────────────────────────────────── */
function ScrAnalyzing({ nav }) {
  const [p, setP] = useState(0);
  const [step, setStep] = useState(0);
  const steps = [
    'Analyzing speaker profile',
    'Estimating contamination',
    'Building cleaning plan',
  ];
  useEffect(() => {
    let raf, start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 2600;
      setP(Math.min(1, t));
      setStep(Math.min(2, Math.floor(t * 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => nav('plan'), 480);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="cs-screen cs-screen-glow">
      <CSStatusBar />
      <Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="t-eyebrow anim-fade-in">Diagnostics</div>
        <h2 className="t-h1 anim-fade-up" style={{ margin: '8px 0 28px' }}>Preparing your plan</h2>

        <ProgressRing
          size={220} stroke={10} progress={p}
          center={
            <>
              <div className="t-mono" style={{ fontSize: 42, fontWeight: 600 }}>{Math.round(p * 100)}%</div>
              <div style={{ fontSize: 11, color: 'var(--fg-2)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 6 }}>
                Working
              </div>
            </>
          }
        />

        <div style={{ marginTop: 32, height: 22, position: 'relative', width: 300 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              position: 'absolute', inset: 0, textAlign: 'center',
              fontSize: 14, color: 'var(--fg-1)',
              transition: 'opacity 320ms var(--ease), transform 320ms var(--ease)',
              opacity: step === i ? 1 : 0,
              transform: step === i ? 'translateY(0)' : 'translateY(6px)',
            }}>{s}</div>
          ))}
        </div>
      </Body>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrPlan — personalized plan
   ────────────────────────────────────────────────────────── */
function ScrPlan({ nav, state }) {
  const problem = {
    water: 'Water removal',
    dust: 'Dust removal',
    low: 'Volume boost',
    other: 'Mixed clean',
  }[state.problem || 'water'];

  const items = [
    { t: 'Setup checklist', s: 'Volume, position, no headphones', d: '20s' },
    { t: problem, s: '450 Hz acoustic ejection cycle', d: '2m 30s' },
    { t: 'Sound test', s: 'Verify clarity', d: '15s' },
  ];

  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader title={null} />
      <Body style={{ paddingTop: 12 }}>
        <div className="anim-fade-up">
          <div className="t-eyebrow">Personalised</div>
          <h2 className="t-h1" style={{ margin: '8px 0 6px' }}>Your cleaning plan</h2>
          <p className="t-sub" style={{ margin: 0 }}>Built for {state.device === 'bt' ? 'a Bluetooth speaker' : 'your device'}.</p>
        </div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => (
            <div key={i} className={`card anim-fade-up delay-${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999,
                background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 600, fontFamily: 'var(--f-mono)', fontSize: 13,
              }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{it.t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--fg-2)', marginTop: 2 }}>{it.s}</div>
              </div>
              <div className="t-mono" style={{ fontSize: 13, color: 'var(--fg-1)' }}>{it.d}</div>
            </div>
          ))}
        </div>

        <div className="card-quiet anim-fade-up delay-4" style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: 'var(--cy-1)' }}>{ICONS.shield(22)}</div>
          <div style={{ flex: 1, minWidth: 0, fontSize: 13, color: 'var(--fg-1)' }}>
            Safe for all speakers. Designed to protect your device.
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('rating')}>Continue</button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrRating — pre-paywall trust boost
   ────────────────────────────────────────────────────────── */
function ScrRating({ nav }) {
  const [stars, setStars] = useState(0);
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader title={null} right={
        <button className="icon-btn" onClick={() => nav('paywall')} aria-label="Skip">{ICONS.close(20)}</button>
      } />
      <Body style={{ textAlign: 'center' }}>
        <div className="anim-fade-up" style={{ marginTop: 24 }}>
          <div className="t-eyebrow">Quick favour</div>
          <h2 className="t-h1" style={{ margin: '8px 0 8px' }}>Help others find us</h2>
          <p className="t-sub" style={{ margin: 0, maxWidth: 300, marginInline: 'auto' }}>
            Your rating helps us reach more people with broken sound.
          </p>
        </div>

        <div className="anim-fade-up delay-2" style={{
          marginTop: 36, padding: '24px',
          background: 'var(--bg-2)', borderRadius: 20,
          border: '1px solid var(--hairline)',
        }}>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Rate CleanSpeaker
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 18, color: 'var(--cy-1)' }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} style={{ all: 'unset', cursor: 'pointer' }} onClick={() => setStars(n)}>
                <div style={{ transition: 'transform 200ms var(--ease)', transform: stars >= n ? 'scale(1.08)' : 'scale(1)' }}>
                  {ICONS.star(36, stars >= n)}
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: 'var(--fg-1)' }}>
            Trusted by 1.2M users · 4.8 average
          </div>
        </div>

        <div className="anim-fade-up delay-3" style={{
          marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {[
            ['Saved my AirPods after the rain.', 'Mike R.'],
            ['Speakers sound clear again, no joke.', 'Sasha P.'],
          ].map(([q, a], i) => (
            <div key={i} className="card-quiet" style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: 4, color: 'var(--cy-1)', marginBottom: 6 }}>
                {[1, 2, 3, 4, 5].map(n => <span key={n}>{ICONS.star(12, true)}</span>)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-0)' }}>{`“${q}”`}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 4 }}>{a}</div>
            </div>
          ))}
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('paywall')}>Continue</button>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrPaywall — Primary monetization
   ────────────────────────────────────────────────────────── */
function ScrPaywall({ nav, state, set }) {
  const [plan, setPlan] = useState('year');

  return (
    <div className="cs-screen cs-screen-glow">
      <CSStatusBar />
      <div style={{
        position: 'absolute', top: 38, right: 14, zIndex: 5,
      }}>
        <button className="icon-btn" onClick={() => nav('downsell')} aria-label="Close">
          {ICONS.close(20)}
        </button>
      </div>

      <Body style={{ paddingTop: 24 }}>
        <div style={{ textAlign: 'center' }} className="anim-fade-up">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <div style={{ color: 'var(--cy-1)' }}>{ICONS.crown(28)}</div>
          </div>
          <div className="t-eyebrow" style={{ color: 'var(--cy-2)' }}>CleanSpeaker Pro</div>
          <h2 className="t-display" style={{ margin: '8px 0 8px', fontSize: 28 }}>
            Unlock the<br/>deep clean.
          </h2>
          <p className="t-sub" style={{ margin: 0 }}>3 days free, then $19.99/year. Cancel anytime.</p>
        </div>

        <div className="anim-fade-up delay-1" style={{
          marginTop: 22,
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {[
            ['Deep Clean cycles', 'Advanced multi-step cleaning'],
            ['Manual frequency', 'Full Hz range control'],
            ['Wave modes & vibration', 'Tune cleaning intensity'],
            ['No ads, ever', 'Uninterrupted experience'],
          ].map(([t, s], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 4px' }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999,
                background: 'var(--cy-1)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{ICONS.check(14)}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="anim-fade-up delay-2" style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PlanCard name="Yearly" sub="3-day free trial · then $19.99/yr" price="$1.66/mo"
            badge="Best value" savings="Save 60%" active={plan === 'year'} onClick={() => setPlan('year')} />
          <PlanCard name="Weekly" sub="Billed weekly" price="$4.99"
            active={plan === 'week'} onClick={() => setPlan('week')} />
          <PlanCard name="One-time" sub="Lifetime access" price="$29.99"
            active={plan === 'once'} onClick={() => setPlan('once')} />
        </div>
      </Body>

      <BottomCTA>
        <button className="btn btn-primary btn-block anim-fade-up delay-3" onClick={() => {
          set('premium', true); nav('home');
        }}>
          {plan === 'year' ? 'Try 3 Days Free' : plan === 'week' ? 'Start Weekly' : 'Buy Lifetime'}
        </button>
        <div style={{
          marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, color: 'var(--fg-2)',
        }}>
          <button style={{ all: 'unset', cursor: 'pointer' }}>Restore</button>
          <span>No commitment · Cancel anytime</span>
          <button style={{ all: 'unset', cursor: 'pointer' }} onClick={() => nav('home')}>Continue free</button>
        </div>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   ScrDownsell — softer offer on close
   ────────────────────────────────────────────────────────── */
function ScrDownsell({ nav, set }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader title={null} right={
        <button className="icon-btn" onClick={() => nav('home')} aria-label="Close">{ICONS.close(20)}</button>
      } />
      <Body style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }} className="anim-fade-in">
          <GlowOrb size={180} intensity={0.7} />
        </div>
        <div className="anim-fade-up">
          <div className="t-eyebrow" style={{ color: 'var(--cy-2)' }}>Wait · special offer</div>
          <h2 className="t-h1" style={{ margin: '10px 0 8px' }}>One last try.</h2>
          <p className="t-sub" style={{ margin: 0, maxWidth: 320, marginInline: 'auto' }}>
            Get all Pro features for less than a coffee.
          </p>
        </div>

        <div className="card anim-fade-up delay-2" style={{
          marginTop: 26, padding: 20, textAlign: 'left',
          background: 'var(--fg-0)', color: '#fff', border: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7 }}>Weekly</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span className="t-mono" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>$2.49</span>
                <span style={{ fontSize: 13, opacity: 0.6 }}>/week</span>
              </div>
              <div style={{ fontSize: 12, color: '#38BDF8', marginTop: 4 }}>50% off · only today</div>
            </div>
            <span style={{
              fontSize: 10, padding: '4px 10px', borderRadius: 999,
              background: 'var(--cy-1)', color: '#fff', fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>Limited</span>
          </div>

          <div style={{ marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 14 }}>
            {['Deep Clean', 'Manual frequency', 'Wave modes & vibration', 'No ads'].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', fontSize: 13, opacity: 0.9 }}>
                <div style={{ color: '#38BDF8' }}>{ICONS.check(14)}</div>
                {b}
              </div>
            ))}
          </div>
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => { set('premium', true); nav('home'); }}>
          Claim Offer
        </button>
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <button style={{ all: 'unset', cursor: 'pointer', fontSize: 13, color: 'var(--fg-2)' }} onClick={() => nav('home')}>
            Continue with ads
          </button>
        </div>
      </BottomCTA>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Export
   ────────────────────────────────────────────────────────── */
Object.assign(window, {
  ScrWelcome, ScrQ1, ScrQ2, ScrQ3,
  ScrAnalyzing, ScrPlan, ScrRating,
  ScrPaywall, ScrDownsell,
});
