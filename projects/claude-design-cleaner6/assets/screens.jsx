// All 12 Sonic Clean screens — content only (no phone frame).
// React hooks and primitives are already in scope from components.jsx (inlined above).

// ============ 01 SPLASH ============
function ScreenSplash({ onNext }) {
  return (
    <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 28px 36px', overflow: 'hidden' }} className="screen-enter">
      <div className="bg-glow" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan-glow)' }} />
          <div style={{ fontFamily: 'Onest', fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>Sonic Clean</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <WaveRing size={280} state="active" />
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className="t-eyebrow">Acoustic Care</span>
          <h1 style={{ fontFamily: 'Onest', fontSize: 38, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.025em' }}>
            Clear sound,<br/>
            in <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--cyan)' }}>seconds</span>.
          </h1>
          <p className="t-body" style={{ fontSize: 15, maxWidth: 320 }}>
            A precision sound-wave routine that pushes out water, dust and debris your speaker has been holding onto.
          </p>
        </div>
        <button className="btn-primary" onClick={onNext}>
          Begin diagnosis
          <Icon.ArrowRight c="#001318"/>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <Icon.Shield c="var(--text-dim)" s={14}/> Safe for any Android device
        </div>
      </div>
    </div>
  );
}

// ============ 02 PROBLEM DISCOVERY ============
function ScreenProblem({ onNext, onBack, selected, setSelected }) {
  const options = [
    { id: 'water', icon: Icon.Droplet, label: 'Water inside', sub: 'Phone got wet or splashed', color: '#4cc9f0' },
    { id: 'dust',  icon: Icon.Dust,    label: 'Dust & debris', sub: 'Pocket lint or sand', color: '#7df9ff' },
    { id: 'muffled', icon: Icon.Speaker, label: 'Sound is muffled', sub: 'Quieter or distorted', color: '#00e5ff' },
    { id: 'check', icon: Icon.Sparkle, label: 'Just a check-up', sub: 'No issue, routine care', color: '#a3e9ff' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px' }} className="screen-enter">
      <Header step={1} total={3} onBack={onBack}/>
      <div style={{ marginTop: 28, marginBottom: 24 }}>
        <span className="t-eyebrow">Step 01 · Symptom</span>
        <h2 style={{ fontFamily: 'Onest', fontSize: 28, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: 8 }}>
          What's happening with your speaker?
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {options.map(opt => {
          const isOn = selected === opt.id;
          return (
            <button key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                appearance: 'none',
                border: isOn ? '1px solid var(--cyan)' : '1px solid var(--line-strong)',
                background: isOn
                  ? 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))'
                  : 'rgba(15,18,24,0.6)',
                borderRadius: 18,
                padding: '18px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--text)',
                boxShadow: isOn ? '0 0 0 4px rgba(0,229,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                transition: 'all 0.2s ease'
              }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: isOn ? `radial-gradient(circle at 30% 30%, ${opt.color}, var(--cyan-deep))` : 'rgba(255,255,255,0.04)',
                border: '1px solid var(--line-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isOn ? '0 0 20px rgba(0,229,255,0.4)' : 'none',
                flexShrink: 0
              }}>
                {opt.icon({c: isOn ? '#001318' : 'var(--text)', s: 22})}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <div style={{ fontFamily: 'Onest', fontSize: 16, fontWeight: 600 }}>{opt.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{opt.sub}</div>
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: '1.5px solid ' + (isOn ? 'var(--cyan)' : 'var(--line-strong)'),
                background: isOn ? 'var(--cyan)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {isOn && <Icon.Check c="#001318" s={14}/>}
              </div>
            </button>
          );
        })}
      </div>
      <button className="btn-primary" onClick={onNext} disabled={!selected}
        style={{ opacity: selected ? 1 : 0.35, marginTop: 20, transition: 'opacity 0.2s' }}>
        Continue <Icon.ArrowRight c="#001318"/>
      </button>
    </div>
  );
}

// ============ 03 LAST CLEANED ============
function ScreenLastClean({ onNext, onBack, selected, setSelected }) {
  const options = [
    { id: 'never', label: 'Never', sub: "I didn't know that was a thing" },
    { id: 'months', label: 'A few months ago', sub: 'Or longer' },
    { id: 'weeks',  label: 'Last few weeks', sub: 'Recently enough' },
    { id: 'days',   label: 'Just days ago', sub: 'Doing maintenance' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px' }} className="screen-enter">
      <Header step={2} total={3} onBack={onBack}/>
      <div style={{ marginTop: 28, marginBottom: 8 }}>
        <span className="t-eyebrow">Step 02 · Timeline</span>
        <h2 style={{ fontFamily: 'Onest', fontSize: 28, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: 8 }}>
          When did you last clean it?
        </h2>
        <p className="t-body" style={{ fontSize: 14, marginTop: 8 }}>This helps us calibrate sweep intensity for your device.</p>
      </div>

      <div style={{ marginTop: 18, marginBottom: 18, padding: 18, borderRadius: 18, border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.6)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Bolt c="var(--cyan)" s={20}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Onest', fontSize: 14, fontWeight: 600 }}>Most users wait too long</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Speakers collect dust within 2–3 weeks of daily use.</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {options.map(opt => {
          const isOn = selected === opt.id;
          return (
            <button key={opt.id} onClick={() => setSelected(opt.id)}
              style={{
                appearance: 'none', textAlign: 'left', cursor: 'pointer', color: 'var(--text)',
                border: isOn ? '1px solid var(--cyan)' : '1px solid var(--line-strong)',
                background: isOn ? 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))' : 'rgba(15,18,24,0.6)',
                borderRadius: 16, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
              <div>
                <div style={{ fontFamily: 'Onest', fontSize: 16, fontWeight: 600 }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{opt.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                border: '1.5px solid ' + (isOn ? 'var(--cyan)' : 'var(--line-strong)'),
                background: isOn ? 'var(--cyan)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {isOn && <Icon.Check c="#001318" s={12}/>}
              </div>
            </button>
          );
        })}
      </div>
      <button className="btn-primary" onClick={onNext} disabled={!selected}
        style={{ opacity: selected ? 1 : 0.35, marginTop: 20, transition: 'opacity 0.2s' }}>
        Continue <Icon.ArrowRight c="#001318"/>
      </button>
    </div>
  );
}

// ============ 04 DIAGNOSTIC (analyzing) ============
function ScreenDiagnostic({ onNext, onBack }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const stages = [
    { hz: 220, label: 'Listening to ambient response' },
    { hz: 880, label: 'Sweeping midrange' },
    { hz: 1840, label: 'Measuring high-frequency loss' },
  ];
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setProgress(p => {
        const n = Math.min(1, p + 0.012);
        if (n >= 0.33 && stage === 0) setStage(1);
        if (n >= 0.66 && stage === 1) setStage(2);
        return n;
      });
    }, 60);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (progress >= 1) {
      const id = setTimeout(onNext, 600);
      return () => clearTimeout(id);
    }
  }, [progress]);

  const s = stages[stage];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 36px', overflow: 'hidden' }} className="screen-enter">
      <Header step={3} total={3} onBack={onBack}/>

      <div className="bg-glow" style={{ opacity: 0.6 }}/>

      <div style={{ marginTop: 22, position: 'relative', zIndex: 1 }}>
        <span className="t-eyebrow">Diagnostic in progress</span>
        <h2 style={{ fontFamily: 'Onest', fontSize: 26, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: 6 }}>
          Analyzing your speaker
        </h2>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <FrequencyDial size={280} value={s.hz} progress={progress} label="Now scanning"/>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderRadius: 16, background: 'rgba(15,18,24,0.7)', border: '1px solid var(--line-strong)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', animation: 'pulseGlow 1.2s infinite' }}/>
          <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>{s.label}…</div>
          <div style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--cyan)' }}>{Math.round(progress * 100)}%</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              height: 32, borderRadius: 10,
              padding: '6px 10px',
              border: i <= stage ? '1px solid rgba(0,229,255,0.4)' : '1px solid var(--line-strong)',
              background: i <= stage ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.02)',
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: i <= stage ? 'var(--cyan)' : 'var(--text-dim)', letterSpacing: '0.08em' }}>
                {`STAGE ${i+1}`}
              </span>
              {i < stage && <Icon.Check c="var(--cyan)" s={12}/>}
              {i === stage && <div className="wave-row" style={{ height: 14, marginLeft: 'auto' }}>
                {[0,1,2,3].map(j => <i key={j} style={{ width: 2, animationDelay: `${j*0.1}s` }}/>) }
              </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ 05 RESCUE PLAN ============
function ScreenPlan({ onNext, onBack, problem }) {
  const planMap = {
    water: { score: 38, label: 'Critical', items: [
      { icon: Icon.Droplet, t: 'Water Eject', s: '165 Hz pulse to dislodge moisture', time: '30s' },
      { icon: Icon.Wave,    t: '3-Stage Sweep', s: 'Low, mid, high frequency clean', time: '60s' },
      { icon: Icon.Speaker, t: 'Sound Test',  s: 'Compare before/after clarity', time: '15s' },
    ]},
    dust: { score: 52, label: 'Moderate', items: [
      { icon: Icon.Dust, t: 'Dust Clean', s: 'Resonance pulse to expel debris', time: '45s' },
      { icon: Icon.Wave, t: '3-Stage Sweep', s: 'Full frequency clean', time: '60s' },
      { icon: Icon.Speaker, t: 'Sound Test', s: 'Verify clarity restored', time: '15s' },
    ]},
    muffled: { score: 44, label: 'Significant', items: [
      { icon: Icon.Speaker, t: 'Muffled Fix', s: 'Targeted high-frequency restore', time: '40s' },
      { icon: Icon.Wave, t: '3-Stage Sweep', s: 'Full frequency clean', time: '60s' },
      { icon: Icon.Diamond, t: 'Deep Clean Pro', s: 'Manual Hz precision pass', time: '90s' },
    ]},
    check: { score: 71, label: 'Healthy', items: [
      { icon: Icon.Sparkle, t: 'Light Maintenance', s: 'Quick preventive sweep', time: '20s' },
      { icon: Icon.Speaker, t: 'Sound Test', s: 'Baseline measurement', time: '15s' },
    ]},
  };
  const plan = planMap[problem] || planMap.water;
  const scoreColor = plan.score < 50 ? 'var(--red)' : plan.score < 70 ? 'var(--amber)' : 'var(--green)';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px', overflow: 'auto' }} className="screen-enter">
      <Header step={null} total={null} onBack={onBack} title="Your plan"/>
      <div style={{ marginTop: 18 }}>
        <span className="t-eyebrow">Diagnostic complete</span>
        <h2 style={{ fontFamily: 'Onest', fontSize: 26, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: 6 }}>
          We built a rescue plan for your speaker.
        </h2>
      </div>

      {/* Score card */}
      <div className="glass-strong" style={{ marginTop: 20, padding: 20, display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${scoreColor}40, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', width: 84, height: 84 }}>
          <svg viewBox="0 0 84 84" style={{ width: '100%', height: '100%' }}>
            <circle cx="42" cy="42" r="36" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none"/>
            <circle cx="42" cy="42" r="36" stroke={scoreColor} strokeWidth="6" fill="none"
              strokeDasharray={2*Math.PI*36}
              strokeDashoffset={2*Math.PI*36 * (1 - plan.score/100)}
              transform="rotate(-90 42 42)"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${scoreColor})` }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'Onest', fontSize: 26, fontWeight: 600, letterSpacing: '-0.04em' }}>{plan.score}</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>SCORE</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: scoreColor }}>{plan.label}</div>
          <div style={{ fontFamily: 'Onest', fontSize: 18, fontWeight: 600, marginTop: 2 }}>Speaker health</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Based on your diagnosis & sweep test</div>
        </div>
      </div>

      {/* Plan steps */}
      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div className="t-eyebrow" style={{ marginBottom: 10 }}>Recommended sequence</div>
        {plan.items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0',
            borderBottom: i < plan.items.length - 1 ? '1px solid var(--line)' : 'none'
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              border: '2px solid var(--cyan)',
              background: 'rgba(0,229,255,0.15)',
              position: 'relative'
            }}>
              <span style={{ position: 'absolute', inset: -22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--cyan)', letterSpacing: '0.1em' }}>
                {String(i+1).padStart(2,'0')}
              </span>
            </div>
            <div style={{ marginLeft: 12, flex: 1 }}>
              <div style={{ fontFamily: 'Onest', fontSize: 15, fontWeight: 600 }}>{it.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{it.s}</div>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{it.time}</div>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={onNext} style={{ marginTop: 'auto' }}>
        Continue <Icon.ArrowRight c="#001318"/>
      </button>
    </div>
  );
}

// ============ 06 RATING MOMENT ============
function ScreenRating({ onNext, onBack }) {
  const [stars, setStars] = useState(0);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px', position: 'relative', overflow: 'hidden' }} className="screen-enter">
      <Header step={null} total={null} onBack={onBack} muted />
      <div className="bg-glow" style={{ opacity: 0.4 }}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1, gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'radial-gradient(circle at 30% 30%, var(--cyan-hi), var(--cyan-deep))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px var(--cyan-glow)'
          }}>
            <Icon.Sparkle c="#001318" s={28}/>
          </div>
          <span className="t-eyebrow">Quick favor</span>
        </div>
        <div>
          <h2 style={{ fontFamily: 'Onest', fontSize: 28, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 320 }}>
            Help others like you find clear sound.
          </h2>
          <p className="t-body" style={{ fontSize: 14, marginTop: 12, maxWidth: 300 }}>
            Your rating helps Sonic Clean reach more people with this exact problem.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {[1,2,3,4,5].map(i => (
            <button key={i}
              onClick={() => setStars(i)}
              style={{
                appearance: 'none', background: 'transparent', border: 0, cursor: 'pointer', padding: 6,
                transition: 'transform 0.15s, filter 0.15s',
                transform: i <= stars ? 'scale(1.08)' : 'scale(1)',
                filter: i <= stars ? 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))' : 'none'
              }}>
              {Icon.Star({c: i <= stars ? '#fbbf24' : 'rgba(255,255,255,0.18)', s: 42, filled: i <= stars})}
            </button>
          ))}
        </div>

        <div style={{ minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {stars >= 4 && (
            <div style={{
              padding: '8px 14px', borderRadius: 100,
              background: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.3)',
              fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--green)', letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              <Icon.Check c="var(--green)" s={12}/> Thank you!
            </div>
          )}
          {stars > 0 && stars < 4 && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>We'll do better — tell us what's missing on the next screen.</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary" onClick={onNext} disabled={stars === 0} style={{ opacity: stars === 0 ? 0.35 : 1, transition: 'opacity 0.2s' }}>
          Continue <Icon.ArrowRight c="#001318"/>
        </button>
        <button onClick={onNext} style={{ background: 'transparent', border: 0, color: 'var(--text-dim)', fontFamily: 'Manrope', fontSize: 13, padding: 12, cursor: 'pointer' }}>
          Maybe later
        </button>
      </div>
    </div>
  );
}

// ============ 07 PAYWALL ============
function ScreenPaywall({ onNext, onBack }) {
  const [plan, setPlan] = useState('year');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }} className="screen-enter">
      <div className="bg-glow" />
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <button onClick={onBack} style={{
          appearance: 'none', border: 0, cursor: 'pointer',
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line-strong)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon.Close c="var(--text-muted)" s={14}/>
        </button>
      </div>

      <div style={{ padding: '36px 24px 0', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}>
          <Icon.Bolt c="var(--cyan)" s={12}/>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>One-time offer · 24h</span>
        </div>
        <h1 style={{ fontFamily: 'Onest', fontSize: 32, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.025em' }}>
          Unlock the full <span style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>rescue kit</span>
        </h1>
      </div>

      {/* feature list */}
      <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        {[
          { i: Icon.Wave, t: '3-stage frequency sweep', s: 'Low / mid / high precision pass' },
          { i: Icon.Diamond, t: 'Deep Clean Pro', s: 'Targeted manual-Hz cleaning' },
          { i: Icon.Timer, t: 'Unlimited rescue cycles', s: 'No daily caps, ever' },
          { i: Icon.Shield, t: 'No ads', s: 'Quiet, focused interface' },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {f.i({c: 'var(--cyan)', s: 16})}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Onest', fontSize: 14, fontWeight: 600 }}>{f.t}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.s}</div>
            </div>
            <Icon.Check c="var(--cyan)" s={18}/>
          </div>
        ))}
      </div>

      {/* plan picker */}
      <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
        <button onClick={() => setPlan('year')}
          style={{
            appearance: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
            border: plan === 'year' ? '1.5px solid var(--cyan)' : '1px solid var(--line-strong)',
            background: plan === 'year' ? 'linear-gradient(180deg, rgba(0,229,255,0.1), rgba(0,229,255,0.02))' : 'rgba(15,18,24,0.6)',
            borderRadius: 18, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
            position: 'relative',
            boxShadow: plan === 'year' ? '0 0 0 4px rgba(0,229,255,0.08)' : 'none'
          }}>
          <div style={{ position: 'absolute', top: -8, right: 16, padding: '3px 10px', borderRadius: 100, background: 'var(--cyan)', fontFamily: 'JetBrains Mono', fontSize: 9, color: '#001318', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Save 78%</div>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            border: '1.5px solid ' + (plan === 'year' ? 'var(--cyan)' : 'var(--line-strong)'),
            background: plan === 'year' ? 'var(--cyan)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {plan === 'year' && <Icon.Check c="#001318" s={12}/>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Onest', fontSize: 16, fontWeight: 600 }}>Yearly</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>3-day free trial, then billed yearly</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Onest', fontSize: 16, fontWeight: 600 }}>$ 24.99 /yr</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textDecoration: 'line-through' }}>$ 119.88</div>
          </div>
        </button>

        <button onClick={() => setPlan('week')}
          style={{
            appearance: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
            border: plan === 'week' ? '1.5px solid var(--cyan)' : '1px solid var(--line-strong)',
            background: plan === 'week' ? 'linear-gradient(180deg, rgba(0,229,255,0.1), rgba(0,229,255,0.02))' : 'rgba(15,18,24,0.6)',
            borderRadius: 18, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14
          }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            border: '1.5px solid ' + (plan === 'week' ? 'var(--cyan)' : 'var(--line-strong)'),
            background: plan === 'week' ? 'var(--cyan)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {plan === 'week' && <Icon.Check c="#001318" s={12}/>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Onest', fontSize: 16, fontWeight: 600 }}>Weekly</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>No trial, cancel anytime</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Onest', fontSize: 16, fontWeight: 600 }}>$ 6.99 /wk</div>
          </div>
        </button>
      </div>

      <div style={{ padding: '20px 24px 12px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1, marginTop: 'auto' }}>
        <button className="btn-primary" onClick={onNext}>
          {plan === 'year' ? 'Start 3-day free trial' : 'Continue weekly'} <Icon.ArrowRight c="#001318"/>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', letterSpacing: '0.04em', padding: '0 8px' }}>
          <span style={{ cursor: 'pointer' }}>Restore</span>
          <span>Auto-renews · Cancel anytime</span>
          <span style={{ cursor: 'pointer' }}>Terms</span>
        </div>
      </div>
    </div>
  );
}

// ============ 08 HOME ============
function ScreenHome({ onNavigate }) {
  const tiles = [
    { id: 'water',  icon: Icon.Droplet,   label: 'Water Eject',     sub: '165 Hz pulse',    color: 'cyan',  premium: false },
    { id: 'dust',   icon: Icon.Dust,      label: 'Dust Clean',      sub: 'Resonance',       color: 'mint',  premium: false },
    { id: 'muff',   icon: Icon.Speaker,   label: 'Muffled Fix',     sub: 'High-freq pass',  color: 'cyan',  premium: false },
    { id: 'deep',   icon: Icon.Diamond,   label: 'Deep Clean Pro',  sub: '3-stage sweep',   color: 'cyan',  premium: true },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 90px', position: 'relative' }} className="screen-enter">
      {/* top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cyan)' }}>Sonic Clean · Pro</div>
          <div style={{ fontFamily: 'Onest', fontSize: 26, fontWeight: 500, marginTop: 4, letterSpacing: '-0.02em' }}>
            Hello, listener.
          </div>
        </div>
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line-strong)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V13L15 16M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z" stroke="var(--text-muted)" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Hero status card */}
      <div className="glass-strong" style={{ marginTop: 22, padding: 22, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, opacity: 0.4 }}>
          <WaveRing size={180} color="var(--cyan)" state="active"/>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Speaker health</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'Onest', fontSize: 60, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--green)' }}>89</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--text-muted)' }}>/ 100</span>
          <span style={{ marginLeft: 8, padding: '4px 8px', borderRadius: 100, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--green)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>+27 today</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-muted)' }}>
          Last cleaned <span style={{ color: 'var(--text)' }}>32 min ago</span> · 3-stage sweep
        </div>
        <button onClick={() => onNavigate('preclean')} style={{
          marginTop: 14, padding: '10px 16px', borderRadius: 100,
          border: '1px solid rgba(0,229,255,0.4)', background: 'rgba(0,229,255,0.08)',
          color: 'var(--cyan)', fontFamily: 'Onest', fontSize: 13, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer'
        }}>
          Start a new cycle <Icon.ArrowRight c="var(--cyan)" s={14}/>
        </button>
      </div>

      {/* Tiles */}
      <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div className="t-eyebrow">Tools</div>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--text-dim)' }}>4 available</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {tiles.map(t => (
          <button key={t.id} onClick={() => onNavigate('preclean', t.id)} style={{
            appearance: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
            border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.6)',
            borderRadius: 18, padding: 16, display: 'flex', flexDirection: 'column', gap: 30, position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'radial-gradient(circle at 30% 30%, var(--cyan-hi), var(--cyan-deep))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(0,229,255,0.3)'
            }}>
              {t.icon({c: '#001318', s: 18})}
            </div>
            <div>
              <div style={{ fontFamily: 'Onest', fontSize: 15, fontWeight: 600 }}>{t.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{t.sub}</div>
            </div>
            {t.premium && (
              <div style={{ position: 'absolute', top: 12, right: 12, padding: '2px 8px', borderRadius: 100, background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)', fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--amber)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Pro</div>
            )}
          </button>
        ))}
      </div>

      {/* History row */}
      <div style={{ marginTop: 22, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="t-eyebrow">Recent activity</div>
        <span style={{ fontSize: 11, color: 'var(--cyan)', fontFamily: 'Onest', fontWeight: 600 }}>View all</span>
      </div>
      <div style={{ borderRadius: 16, border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.6)', overflow: 'hidden' }}>
        {[
          { t: 'Water Eject', d: 'Today, 14:08', v: '+12', h: 165 },
          { t: '3-Stage Sweep', d: 'Yesterday, 09:21', v: '+5', h: 880 },
        ].map((r, i, a) => (
          <div key={i} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < a.length-1 ? '1px solid var(--line)' : 'none' }}>
            <div className="wave-row" style={{ height: 24 }}>
              {[0,1,2,3,4].map(j => <i key={j} style={{ width: 2, animationDelay: `${j*0.1}s` }}/>) }
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Onest', fontSize: 13, fontWeight: 600 }}>{r.t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.d} · {r.h} Hz</div>
            </div>
            <div style={{ padding: '3px 8px', borderRadius: 100, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--green)' }}>{r.v}</div>
          </div>
        ))}
      </div>

      <TabBar active="home"/>
    </div>
  );
}

// ============ 09 PRE-CLEAN CHECKLIST ============
function ScreenPreClean({ onNext, onBack }) {
  const [checked, setChecked] = useState({ vol: true, dir: true, hp: true });
  const items = [
    { id: 'vol', icon: Icon.Volume, t: 'Volume at maximum', s: 'Sound waves work harder when loud' },
    { id: 'dir', icon: Icon.Down,    t: 'Hold phone speaker-down', s: 'Lets gravity assist the eject' },
    { id: 'hp',  icon: Icon.Headphones, t: 'Disconnect headphones', s: 'Detach earbuds & Bluetooth audio' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px' }} className="screen-enter">
      <Header onBack={onBack} title="Before we clean"/>
      <div style={{ marginTop: 12 }}>
        <span className="t-eyebrow">Setup · 3 steps</span>
        <h2 style={{ fontFamily: 'Onest', fontSize: 24, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 6 }}>
          Three checks for best results
        </h2>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {items.map(it => {
          const on = checked[it.id];
          return (
            <button key={it.id} onClick={() => setChecked(c => ({ ...c, [it.id]: !c[it.id] }))}
              style={{
                appearance: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)',
                border: on ? '1px solid rgba(74,222,128,0.4)' : '1px solid var(--line-strong)',
                background: on ? 'linear-gradient(180deg, rgba(74,222,128,0.06), transparent 60%)' : 'rgba(15,18,24,0.6)',
                borderRadius: 16, padding: 18,
                display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s ease'
              }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: on ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.03)',
                border: on ? '1px solid rgba(74,222,128,0.3)' : '1px solid var(--line-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {it.icon({c: on ? 'var(--green)' : 'var(--text-muted)', s: 20})}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Onest', fontSize: 15, fontWeight: 600 }}>{it.t}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{it.s}</div>
              </div>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                border: on ? '1px solid var(--green)' : '1.5px solid var(--line-strong)',
                background: on ? 'var(--green)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {on && <Icon.Check c="#001318" s={14}/>}
              </div>
            </button>
          );
        })}
      </div>

      {/* tip card */}
      <div style={{ marginTop: 16, padding: 16, borderRadius: 16, border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.6)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon.Bolt c="var(--cyan)" s={14}/>
        </div>
        <div>
          <div style={{ fontFamily: 'Onest', fontSize: 13, fontWeight: 600 }}>Tip</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Keep speaker pointed down through the full cycle. You can stop anytime.</div>
        </div>
      </div>

      <button className="btn-primary" onClick={onNext} disabled={!Object.values(checked).every(Boolean)}
        style={{ opacity: Object.values(checked).every(Boolean) ? 1 : 0.35, marginTop: 16 }}>
        Start sweep · 60s <Icon.ArrowRight c="#001318"/>
      </button>
    </div>
  );
}

// ============ 10 CLEANING IN PROGRESS ============
function ScreenCleaning({ onNext, onBack }) {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const stages = [
    { hz: 165,  label: 'Low — water eject' },
    { hz: 680,  label: 'Mid — debris dislodge' },
    { hz: 1840, label: 'High — clarity restore' },
  ];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setProgress(p => Math.min(1, p + 0.006));
    }, 60);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (progress >= 1) {
      const id = setTimeout(onNext, 400);
      return () => clearTimeout(id);
    }
  }, [progress]);

  const stageIdx = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
  const s = stages[stageIdx];
  const stageProgress = (progress - stageIdx * 0.333) / 0.333;
  const secondsLeft = Math.ceil((1 - progress) * 60);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px', position: 'relative', overflow: 'hidden' }} className="screen-enter">
      <div className="bg-glow" style={{ opacity: 0.5 + stageProgress * 0.4 }}/>
      <Header onBack={onBack} title={`Cleaning · ${stageIdx + 1} of 3`} muted/>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', animation: 'pulseGlow 1s infinite' }}/>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Live · sweep</span>
        </div>
        <FrequencyDial value={s.hz} progress={progress} label="Frequency"/>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Onest', fontSize: 18, fontWeight: 600 }}>{s.label}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>You can stop at any time</div>
        </div>

        {/* sine wave */}
        <SineWaveLine width={300} height={56} amplitude={0.7} frequency={4 + stageIdx * 2} phase={progress * 30}/>
      </div>

      {/* stage indicators */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 16, position: 'relative', zIndex: 1 }}>
        {[0,1,2].map(i => (
          <div key={i}>
            <div style={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: i < stageIdx ? '100%' : i === stageIdx ? `${stageProgress*100}%` : '0%',
                background: 'linear-gradient(90deg, var(--cyan-deep), var(--cyan))',
                boxShadow: '0 0 8px var(--cyan)',
                transition: 'width 0.2s'
              }}/>
            </div>
            <div style={{ marginTop: 6, fontFamily: 'JetBrains Mono', fontSize: 10, color: i <= stageIdx ? 'var(--cyan)' : 'var(--text-dim)', letterSpacing: '0.1em' }}>{`STAGE 0${i+1}`}</div>
          </div>
        ))}
      </div>

      {/* time + controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
        <div style={{
          flex: 1, padding: '14px 18px',
          border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.7)',
          borderRadius: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Remaining</div>
            <div style={{ fontFamily: 'Onest', fontSize: 18, fontWeight: 600 }}>0:{String(secondsLeft).padStart(2,'0')}</div>
          </div>
          <Icon.Timer c="var(--text-muted)" s={20}/>
        </div>
        <button onClick={() => setPaused(p => !p)}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
          {paused ? <Icon.Play c="var(--cyan)" s={20}/> : <Icon.Pause c="var(--cyan)" s={20}/>}
        </button>
        <button onClick={onBack}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            border: '1px solid rgba(255,87,87,0.3)', background: 'rgba(255,87,87,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--red)"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
        </button>
      </div>
    </div>
  );
}

// ============ 11 RESULT / SOUND TEST ============
function ScreenResult({ onNext, onBack }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px', overflow: 'auto' }} className="screen-enter">
      <Header onBack={onBack} title="Result"/>

      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18,
          background: 'radial-gradient(circle at 30% 30%, #7fffb0, #2da567)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 24px rgba(74,222,128,0.5)',
          animation: 'checkPop 0.6s ease-out'
        }}>
          <Icon.Check c="#003915" s={28}/>
        </div>
        <div>
          <div className="t-eyebrow" style={{ color: 'var(--green)' }}>Complete</div>
          <h2 style={{ fontFamily: 'Onest', fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 2 }}>
            Sound is clearer and louder.
          </h2>
        </div>
      </div>

      {/* big delta */}
      <div className="glass-strong" style={{ marginTop: 22, padding: 22, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(74,222,128,0.18), transparent 60%)', pointerEvents: 'none' }}/>
        <div className="t-eyebrow" style={{ position: 'relative' }}>Clarity gain</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6, position: 'relative' }}>
          <span style={{ fontFamily: 'Onest', fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--green)' }}>+28</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--text-muted)' }}>points · 61 → 89</span>
        </div>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, position: 'relative' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Before</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'flex-end', gap: 2, height: 38 }}>
              {[0.3, 0.5, 0.4, 0.6, 0.35, 0.5, 0.3, 0.4, 0.5, 0.3, 0.4, 0.3].map((h,i) => (
                <div key={i} style={{ width: 4, height: `${h*100}%`, background: 'rgba(255,87,87,0.7)', borderRadius: 2, boxShadow: '0 0 6px rgba(255,87,87,0.4)' }}/>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>After</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'flex-end', gap: 2, height: 38 }}>
              {[0.7, 0.9, 0.75, 0.95, 0.8, 0.9, 0.85, 1, 0.95, 0.8, 0.9, 0.85].map((h,i) => (
                <div key={i} style={{ width: 4, height: `${h*100}%`, background: 'var(--green)', borderRadius: 2, boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* metrics row */}
      <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { l: 'Volume', v: '+18%', c: 'var(--green)' },
          { l: 'High freq', v: '+24%', c: 'var(--green)' },
          { l: 'Water out', v: '0.18 ml', c: 'var(--cyan)' },
        ].map((m,i) => (
          <div key={i} style={{ padding: 14, borderRadius: 14, border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.6)' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.l}</div>
            <div style={{ marginTop: 4, fontFamily: 'Onest', fontSize: 18, fontWeight: 600, color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>

      {/* sound test play */}
      <div style={{ marginTop: 14, padding: 18, borderRadius: 18, border: '1px solid var(--line-strong)', background: 'rgba(15,18,24,0.6)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button style={{
          width: 52, height: 52, borderRadius: '50%',
          border: 0, cursor: 'pointer',
          background: 'radial-gradient(circle at 30% 30%, var(--cyan-hi), var(--cyan-deep))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 18px var(--cyan-glow)'
        }}>
          <Icon.Play c="#001318" s={20}/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Onest', fontSize: 14, fontWeight: 600 }}>Play sound test</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Listen at full volume to verify result</div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-muted)' }}>0:15</div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 16 }}>
        <button className="btn-primary" onClick={onNext}>
          Done <Icon.Check c="#001318" s={18}/>
        </button>
        <button className="btn-ghost" onClick={onBack}>
          Run again
        </button>
      </div>
    </div>
  );
}

// ============ 12 DEEP CLEAN PRO (manual Hz) ============
function ScreenDeepClean({ onBack, onNext }) {
  const [hz, setHz] = useState(680);
  const [running, setRunning] = useState(false);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 28px', position: 'relative', overflow: 'hidden' }} className="screen-enter">
      <div className="bg-glow" style={{ opacity: 0.3 }}/>
      <Header onBack={onBack} title="Deep Clean Pro" muted/>

      <div style={{ marginTop: 6, position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ padding: '3px 8px', borderRadius: 100, background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pro</span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Manual frequency control</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <FrequencyDial value={hz} progress={(hz - 100) / 1900} label={running ? 'Sweeping' : 'Set frequency'}/>
      </div>

      {/* manual slider */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          <span>100 Hz</span>
          <span>1000 Hz</span>
          <span>2000 Hz</span>
        </div>
        <input type="range" min="100" max="2000" step="10" value={hz} onChange={e => setHz(+e.target.value)}
          style={{ width: '100%', accentColor: '#00e5ff' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
          {[165, 440, 880, 1840].map(p => (
            <button key={p} onClick={() => setHz(p)}
              style={{
                appearance: 'none', cursor: 'pointer',
                padding: '6px 10px', borderRadius: 100,
                border: hz === p ? '1px solid var(--cyan)' : '1px solid var(--line-strong)',
                background: hz === p ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.02)',
                color: hz === p ? 'var(--cyan)' : 'var(--text-muted)',
                fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.04em'
              }}>
              {p} Hz
            </button>
          ))}
        </div>
      </div>

      <button className="btn-primary" onClick={() => { setRunning(true); setTimeout(onNext, 800); }}>
        {running ? 'Running…' : 'Start manual sweep'} {!running && <Icon.ArrowRight c="#001318"/>}
      </button>
    </div>
  );
}

// ============ HEADER ============
function Header({ step, total, onBack, title, muted = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button onClick={onBack} style={{
        width: 40, height: 40, borderRadius: 12,
        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--line-strong)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
      }}>
        <Icon.ArrowLeft c="var(--text-muted)" s={18}/>
      </button>
      {step && total && (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: i + 1 === step ? 24 : 6,
              height: 4,
              borderRadius: 4,
              background: i + 1 <= step ? 'var(--cyan)' : 'rgba(255,255,255,0.1)',
              boxShadow: i + 1 === step ? '0 0 8px var(--cyan)' : 'none',
              transition: 'all 0.3s'
            }}/>
          ))}
        </div>
      )}
      {title && !muted && (
        <div style={{ fontFamily: 'Onest', fontSize: 14, fontWeight: 600 }}>{title}</div>
      )}
      {title && muted && (
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{title}</div>
      )}
      <div style={{ width: 40 }}/>
    </div>
  );
}

// Register
Object.assign(window, {
  ScreenSplash, ScreenProblem, ScreenLastClean, ScreenDiagnostic, ScreenPlan,
  ScreenRating, ScreenPaywall, ScreenHome, ScreenPreClean, ScreenCleaning,
  ScreenResult, ScreenDeepClean
});
