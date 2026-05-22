/* ===== CleanSpeaker — Premium Tool Screens ===== */

const { useState: useS_ex } = React;

/* ---- 15: Manual Hz ---- */
function ScrManualHz({ nav }) {
  const [hz, setHz] = useS_ex(450);
  const [mode, setMode] = useS_ex('sine');
  const modes = [
    { id: 'sine',  label: 'Sine' },
    { id: 'sweep', label: 'Sweep' },
    { id: 'pulse', label: 'Pulse' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-premium')} title="Manual Hz" right={<span className="chip-pro">PRO</span>}/>

      <div style={{ padding: '8px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Frequency control</div>
        <div className="h-2" style={{ marginBottom: 4 }}>Fine-tune the tone.</div>
        <div className="body-sm">Slide between 200 and 8000 Hz.</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, position: 'relative' }}>
        <CircularDial size={260} value={hz} min={200} max={8000}/>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div className="mono" style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em' }}>{hz}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginTop: -2 }}>Hz</div>
        </div>
      </div>

      <div style={{ padding: '8px 28px 0' }}>
        <input type="range" min={200} max={8000} value={hz} onChange={(e) => setHz(+e.target.value)} style={{ width: '100%', accentColor: 'var(--cy-1)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span className="mono caption">200</span>
          <span className="mono caption">8000</span>
        </div>
      </div>

      <div style={{ padding: '14px 24px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Wave mode</div>
        <div style={{ display: 'flex', gap: 6, background: 'var(--bg-2)', padding: 4, borderRadius: 999 }}>
          {modes.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              flex: 1, height: 36, borderRadius: 999,
              background: mode === m.id ? 'var(--bg-1)' : 'transparent',
              fontWeight: 600, fontSize: 13,
              color: mode === m.id ? 'var(--fg-0)' : 'var(--fg-2)',
              border: 'none', cursor: 'pointer',
              boxShadow: mode === m.id ? '0 2px 6px rgba(15,23,42,0.06)' : 'none',
              transition: 'all 200ms var(--ease-out)',
            }}>{m.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 24px 0' }}>
        <Waveform width={364} height={70} amplitude={mode === 'pulse' ? 1 : 0.7} freq={mode === 'sweep' ? 2.4 : 1.2}/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('clean-active')}>Start session</CTAButton>
      </div>
    </div>
  );
}

/* ---- 16: Vibration ---- */
function ScrVibration({ nav }) {
  const [intensity, setIntensity] = useS_ex(0.6);
  const [pattern, setPattern] = useS_ex('pulse');
  const patterns = [
    { id: 'pulse', label: 'Pulse', sub: 'Even pulses' },
    { id: 'tap', label: 'Tap', sub: 'Short bursts' },
    { id: 'wave', label: 'Wave', sub: 'Rising sweep' },
  ];
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-premium')} title="Vibration" right={<span className="chip-pro">PRO</span>}/>

      <div style={{ padding: '8px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Haptic assist</div>
        <div className="h-2" style={{ marginBottom: 4 }}>Loosen with vibration.</div>
        <div className="body-sm">Pair with frequency for stubborn cases.</div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <HapticPulse width={300} height={92} intensity={intensity}/>
          <div className="mono" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>{Math.round(intensity * 100)}<span style={{ fontSize: 14, color: 'var(--fg-2)', marginLeft: 4 }}>%</span></div>
        </div>
      </div>

      <div style={{ padding: '20px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Intensity</div>
        <input type="range" min={0} max={100} value={Math.round(intensity * 100)} onChange={(e) => setIntensity(+e.target.value / 100)} style={{ width: '100%', accentColor: 'var(--cy-1)' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span className="caption">Low</span>
          <span className="caption">High</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10, paddingLeft: 4 }}>Pattern</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {patterns.map(p => (
            <button key={p.id} onClick={() => setPattern(p.id)} style={{
              flex: 1, padding: '12px 10px',
              background: pattern === p.id ? 'var(--fg-0)' : 'var(--bg-1)',
              color: pattern === p.id ? '#fff' : 'var(--fg-0)',
              border: `1px solid ${pattern === p.id ? 'var(--fg-0)' : 'var(--hairline)'}`,
              borderRadius: 14,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 200ms',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
              <div style={{ fontSize: 11, color: pattern === p.id ? 'rgba(255,255,255,0.7)' : 'var(--fg-2)', marginTop: 2 }}>{p.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <CTAButton onClick={() => nav('clean-active')}>Start session</CTAButton>
      </div>
    </div>
  );
}

/* ---- 17: Deep Clean (active premium) ---- */
function ScrDeepClean({ nav }) {
  const t = useTime();
  const phase = Math.floor((t / 6) % 3); // 3 phases cycling
  const phases = ['Sweep 200–1k Hz', 'Pulse 1.2 kHz', 'Vibration assist'];
  const progress = ((t / 18) % 1);
  return (
    <div className="cs-screen cs-screen-glow-light">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home-premium')} title="Deep Clean" right={<span className="chip-pro">PRO</span>}/>

      <div style={{ padding: '8px 28px 0' }}>
        <div className="eyebrow" style={{ marginBottom: 10, color: 'var(--cy-3)' }}>Phase {phase + 1} of 3</div>
        <div className="h-2" style={{ marginBottom: 4 }}>{phases[phase]}</div>
        <div className="body-sm">Sweeping frequencies to dislodge stubborn water.</div>
      </div>

      <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <ProgressRing size={250} stroke={10} progress={progress}>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em' }}>
              {String(Math.floor((1 - progress) * 180 / 60)).padStart(2, '0')}:{String(Math.floor((1 - progress) * 180 % 60)).padStart(2, '0')}
            </div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--cy-2)', marginTop: 4, letterSpacing: '0.05em' }}>REMAINING</div>
          </div>
        </ProgressRing>
      </div>

      <div style={{ padding: '12px 24px 0' }}>
        <Waveform width={364} height={64} amplitude={0.9} freq={phase === 1 ? 2.4 : 1.4}/>
      </div>

      <div style={{ padding: '8px 20px 0', display: 'flex', justifyContent: 'center', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= phase ? 'var(--cy-1)' : 'var(--bg-3)',
            transition: 'background 400ms var(--ease-out)',
          }}/>
        ))}
      </div>

      <div style={{ padding: '14px 24px 0', display: 'flex', justifyContent: 'center', gap: 10 }}>
        <Stat label="Frequency" value={phase === 0 ? '200–1k' : phase === 1 ? '1.2k Hz' : '450 Hz'}/>
        <Stat label="Vibration" value={phase === 2 ? 'High' : 'Off'}/>
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <button onClick={() => nav('sound-test')} style={{
          width: '100%', height: 56, borderRadius: 999,
          background: 'var(--bg-1)', border: '1px solid var(--hairline-2)',
          fontSize: 15, fontWeight: 600, color: 'var(--fg-0)',
        }}>Stop session</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScrManualHz,
  ScrVibration,
  ScrDeepClean,
});
