/* ============================================================
   screens-extra.jsx — Permission, Settings
   ============================================================ */

function ScrPermission({ nav }) {
  return (
    <div className="cs-screen cs-screen-glow">
      <CSStatusBar />
      <Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 36 }}>
        <div className="anim-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
          <GlowOrb size={200} intensity={0.9} />
        </div>

        <div className="anim-fade-up" style={{ marginTop: 28 }}>
          <div className="t-eyebrow">Audio permission</div>
          <h2 className="t-h1" style={{ margin: '10px 0 8px' }}>Allow audio output</h2>
          <p className="t-sub" style={{ margin: 0, maxWidth: 320 }}>
            CleanSpeaker needs audio access to play cleaning frequencies through your speaker.
          </p>
        </div>

        <div className="card anim-fade-up delay-2" style={{ marginTop: 24, textAlign: 'left', width: '100%' }}>
          {[
            ['Audio output', 'Play sine waves at 450 Hz'],
            ['Vibration', 'Help dislodge debris'],
            ['No microphone', 'We never listen'],
          ].map(([t, s], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0',
              borderBottom: i < 2 ? '1px solid var(--hairline)' : 'none',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999,
                background: i === 2 ? 'var(--bg-2)' : 'var(--cy-0)',
                color: i === 2 ? 'var(--fg-2)' : 'var(--cy-1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{ICONS.check(14)}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </Body>
      <BottomCTA>
        <button className="btn btn-primary btn-block" onClick={() => nav('q1')}>Allow & Continue</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => nav('q1')}>Not now</button>
      </BottomCTA>
    </div>
  );
}

function ScrSettings({ nav, state }) {
  return (
    <div className="cs-screen">
      <CSStatusBar />
      <CSHeader onBack={() => nav('home')} title="Settings" />
      <Body>
        <div style={{ marginTop: 8 }}>
          {state.premium ? (
            <div className="card" style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'var(--fg-0)', color: '#fff', border: 'none',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(56,189,248,0.18)', color: '#38BDF8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{ICONS.crown(22)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>CleanSpeaker Pro</div>
                <div style={{ fontSize: 12.5, opacity: 0.7, marginTop: 2 }}>Renews Apr 12, 2026</div>
              </div>
            </div>
          ) : (
            <button onClick={() => nav('paywall')} style={{
              all: 'unset', cursor: 'pointer', width: '100%',
              padding: 18, borderRadius: 20,
              background: 'linear-gradient(135deg, #2A95FF, #0066D6)',
              color: '#fff',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: 'var(--shadow-cta)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{ICONS.crown(22)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>Get CleanSpeaker Pro</div>
                <div style={{ fontSize: 12.5, opacity: 0.8, marginTop: 2 }}>Deep clean, no ads, all tools</div>
              </div>
              <span style={{ color: '#fff', opacity: 0.7 }}>{ICONS.chev(18)}</span>
            </button>
          )}
        </div>

        <Section title="Cleaning">
          <SettingRow label="Default frequency" value="450 Hz" />
          <SettingRow label="Vibration intensity" value="Medium" />
          <SettingRow label="Cycle length" value="2:30" />
        </Section>

        <Section title="Notifications">
          <SettingRow label="Cleaning reminders" toggle />
          <SettingRow label="Tips & updates" toggle on={false} />
        </Section>

        <Section title="About">
          <SettingRow label="Help & support" chev />
          <SettingRow label="Privacy" chev />
          <SettingRow label="Terms of service" chev />
          <SettingRow label="Version" value="2.4.1" />
        </Section>
      </Body>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div className="t-eyebrow" style={{ marginBottom: 10, paddingLeft: 4 }}>{title}</div>
      <div className="card" style={{ padding: 0 }}>
        {React.Children.map(children, (c, i) => (
          <div style={{ borderTop: i > 0 ? '1px solid var(--hairline)' : 'none' }}>{c}</div>
        ))}
      </div>
    </div>
  );
}

function SettingRow({ label, value, toggle, on = true, chev }) {
  const [v, setV] = useState(on);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px',
    }}>
      <span style={{ fontSize: 14, color: 'var(--fg-0)' }}>{label}</span>
      {toggle ? (
        <button onClick={() => setV(!v)} style={{
          all: 'unset', cursor: 'pointer',
          width: 44, height: 26, borderRadius: 999,
          background: v ? 'var(--cy-1)' : 'var(--bg-3)',
          position: 'relative', transition: 'background 200ms var(--ease)',
        }}>
          <div style={{
            position: 'absolute', top: 3, left: v ? 21 : 3,
            width: 20, height: 20, borderRadius: 999,
            background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
            transition: 'left 200ms var(--ease)',
          }} />
        </button>
      ) : chev ? (
        <span style={{ color: 'var(--fg-3)' }}>{ICONS.chev(14)}</span>
      ) : (
        <span className="t-mono" style={{ fontSize: 13, color: 'var(--fg-2)' }}>{value}</span>
      )}
    </div>
  );
}

Object.assign(window, { ScrPermission, ScrSettings });
