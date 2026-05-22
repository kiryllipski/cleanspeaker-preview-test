/* ===== CleanSpeaker — Onboarding & Paywall Screens ===== */

const { useState: useS_ob, useEffect: useE_ob } = React;

/* ---- 01: Problem ---- */
function ScrProblem({ nav, state, set }) {
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <div style={{ padding: '8px 24px 0' }}>
        <Progress steps={3} current={1} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 360, marginTop: 12, position: 'relative' }}>
        <div style={{ position: 'absolute' }}><WaterDropParticles width={300} height={300} /></div>
        <GlowOrb size={240} />
      </div>

      <div style={{ padding: '0 28px', marginTop: 8 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Step 1 · Problem</div>
        <div className="h-display" style={{ marginBottom: 12 }}>Water in<br/>speaker?</div>
        <div className="body" style={{ maxWidth: 320 }}>Clean sound back in three guided steps. Works for water, dust and muffled audio.</div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('trust')}>Continue</CTAButton>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <span className="caption">No commitment · Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

/* ---- 02: Trust ---- */
function ScrTrust({ nav }) {
  const steps = [
    { i: 'Prepare', s: 'Max volume, no headphones', icon: ICONS.shield(20) },
    { i: 'Clean', s: 'Tuned frequency removes water', icon: ICONS.water(20) },
    { i: 'Test', s: 'Listen and confirm result', icon: ICONS.wave(20) },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 24px 0' }}>
        <Progress steps={3} current={2} />
      </div>

      <div style={{ padding: '32px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Step 2 · Process</div>
        <div className="h-1" style={{ marginBottom: 10 }}>Three guided<br/>steps. Nothing risky.</div>
        <div className="body">Prepare · Clean · Test</div>
      </div>

      <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((s, idx) => (
          <div key={s.i} className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center', animation: `fadeIn 480ms var(--ease-out) ${idx * 110}ms both` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--cy-0)', color: 'var(--cy-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {s.icon}
              <div className="mono" style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: 999, background: 'var(--fg-0)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>{idx + 1}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.i}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 2 }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('value')}>Continue</CTAButton>
      </div>
    </div>
  );
}

/* ---- 03: Value ---- */
function ScrValue({ nav }) {
  const tools = [
    { i: 'Water Clean', s: 'Eject trapped water', icon: ICONS.water(22) },
    { i: 'Dust Clean', s: 'Loosen fine debris', icon: ICONS.dust(22) },
    { i: 'Sound Test', s: 'Confirm by ear', icon: ICONS.wave(22) },
    { i: 'Advanced', s: 'Manual Hz · Wave modes', icon: ICONS.flash(22), pro: true },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <div style={{ padding: '8px 24px 0' }}>
        <Progress steps={3} current={3} />
      </div>

      <div style={{ padding: '32px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Step 3 · Toolkit</div>
        <div className="h-1" style={{ marginBottom: 10 }}>Speaker care,<br/>made simple.</div>
        <div className="body">Clean, test and control sound in one place.</div>
      </div>

      <div style={{ padding: '24px 24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {tools.map((t, idx) => (
          <div key={t.i} style={{ animation: `fadeIn 460ms var(--ease-out) ${idx * 70}ms both` }}>
            <ToolTile icon={t.icon} label={t.i} sub={t.s} locked={t.pro} accent={idx === 0} />
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('paywall')}>Continue</CTAButton>
      </div>
    </div>
  );
}

/* ---- 04: Paywall / Special ---- */
function ScrPaywall({ nav, state, set }) {
  const [plan, setPlan] = useS_ob('yearly');
  const [loading, setLoading] = useS_ob(false);

  const benefits = [
    { i: 'Deep Clean', s: 'Stronger, multi-step session', icon: ICONS.water(20) },
    { i: 'Manual Hz', s: '200 to 8000 Hz fine control', icon: ICONS.hz(20) },
    { i: 'Wave modes', s: 'Sine, sweep, pulse', icon: ICONS.wave(20) },
    { i: 'No ads', s: 'Quiet, focused flow', icon: ICONS.shield(20) },
  ];

  const startPremium = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); set && set('premium', true); nav('home-premium'); }, 800);
  };

  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 18px 0' }}>
        <button className="btn-text" style={{ fontSize: 13, height: 36, padding: '0 8px' }}>Restore</button>
        <button className="icon-button" onClick={() => { set && set('premium', false); nav('home-free'); }} aria-label="Close">{ICONS.close(18)}</button>
      </div>

      <div style={{ padding: '12px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cy-1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ICONS.sparkle(18)}</div>
          <div className="eyebrow">Special offer</div>
        </div>
        <div className="h-1" style={{ marginBottom: 8 }}>Unlock the<br/>full cleaning kit.</div>
        <div className="body" style={{ marginBottom: 18 }}>Deeper clean, advanced control, zero ads.</div>
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {benefits.map((b, idx) => (
          <div key={b.i} style={{ animation: `fadeIn 420ms var(--ease-out) ${80 + idx * 60}ms both` }}>
            <BenefitRow icon={b.icon} title={b.i} sub={b.s} />
          </div>
        ))}
      </div>

      <div style={{ padding: '18px 24px 0' }}>
        <PlanRow id="yearly" active={plan === 'yearly'} onClick={() => setPlan('yearly')}
                 title="Yearly" sub="$29.99 / year" badge="Save 70%" price="$2.50 / mo"/>
        <div style={{ height: 8 }}/>
        <PlanRow id="weekly" active={plan === 'weekly'} onClick={() => setPlan('weekly')}
                 title="Weekly" sub="3-day free trial" price="$4.99 / wk"/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <CTAButton onClick={startPremium} disabled={loading}>
          {loading ? <Spinner /> : (plan === 'weekly' ? 'Start 3-day free trial' : 'Start Premium')}
        </CTAButton>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 10 }}>
          <button className="btn-text" style={{ fontSize: 12.5 }} onClick={() => { set && set('premium', false); nav('home-free'); }}>Continue with ads</button>
        </div>
      </div>
    </div>
  );
}

function PlanRow({ active, onClick, title, sub, badge, price }) {
  return (
    <button onClick={onClick} style={{
      width: '100%',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      background: 'var(--bg-1)',
      border: `1.5px solid ${active ? 'var(--cy-1)' : 'var(--hairline)'}`,
      borderRadius: 14,
      textAlign: 'left',
      transition: 'border-color 200ms',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 999,
        border: `2px solid ${active ? 'var(--cy-1)' : 'var(--hairline-3)'}`,
        background: active ? 'var(--cy-1)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        flexShrink: 0,
      }}>
        {active && <div style={{ width: 8, height: 8, background: '#fff', borderRadius: 999 }}/>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</span>
          {badge && <span className="chip" style={{ background: 'var(--cy-0)', color: 'var(--cy-3)' }}>{badge}</span>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{sub}</div>
      </div>
      <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-0)' }}>{price}</div>
    </button>
  );
}

function Spinner() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: 999, animation: 'spin 800ms linear infinite' }}/>
      <span>Processing</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}

Object.assign(window, {
  ScrProblem,
  ScrTrust,
  ScrValue,
  ScrPaywall,
  PlanRow,
  Spinner,
});
