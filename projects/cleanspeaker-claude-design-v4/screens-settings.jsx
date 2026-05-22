// screens-settings.jsx — Settings + Support + Pro promo

function SettingsScreen({ isPro, onOpenPaywall, onOpenSupport, onOpenSpeakerTest, onOpenSoundTest }) {
  const [rateOpen, setRateOpen] = useState(false);

  const sections = [
    {
      title: 'Tools',
      items: [
        { label: 'Sound Test',   sub: 'Hear before & after', Icon: IVolume,    onClick: onOpenSoundTest },
        { label: 'Speaker Test', sub: 'Test each speaker',   Icon: ISpeakerBox, onClick: onOpenSpeakerTest },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Remove Ads', sub: 'Unlock ad-free experience', Icon: IBolt, onClick: onOpenPaywall, badge: !isPro && 'PRO' },
        { label: 'Restore Purchases', sub: 'Recover previous subscription', Icon: ILock, onClick: () => {} },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Rate Us',    sub: 'Tell us what you think', Icon: IStarOutline, onClick: () => setRateOpen(true) },
        { label: 'Contact Support', sub: 'We usually reply in 24h', Icon: IMail, onClick: onOpenSupport },
        { label: 'Share App',  sub: 'Tell a friend',          Icon: IShare, onClick: () => {} },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'Privacy Policy', Icon: IShield, onClick: () => {} },
        { label: 'Terms of Use',   Icon: IQuestion, onClick: () => {} },
      ],
    },
  ];

  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
      <TopBar title="Settings"/>
      <div style={{flex: 1, overflow: 'auto', padding: '0 16px 16px'}}>
        {/* Pro promo */}
        {!isPro && <ProPromo onClick={onOpenPaywall}/>}
        {isPro && <ProActive/>}

        {sections.map((s, i) => (
          <div key={i} style={{marginTop: 18}}>
            <div style={{
              fontSize: 11, fontWeight: 800, letterSpacing:'0.1em',
              color:'var(--muted)', margin:'0 6px 8px',
            }}>{s.title.toUpperCase()}</div>
            <div style={{
              background:'#fff', borderRadius: 16, border:'1px solid var(--line)',
              overflow:'hidden',
            }}>
              {s.items.map((it, j) => (
                <SettingRow key={j} {...it} divider={j < s.items.length - 1}/>
              ))}
            </div>
          </div>
        ))}

        <div style={{textAlign:'center', fontSize: 11, color:'var(--muted-2)', marginTop: 18}}>
          CleanSpeaker · v2.4.1 · made for premium audio care
        </div>
      </div>

      {rateOpen && <NativeRateDialog onDone={() => setRateOpen(false)}/>}
    </div>
  );
}

function ProPromo({ onClick }) {
  return (
    <div onClick={onClick} style={{
      marginTop: 8, cursor:'pointer',
      background: 'linear-gradient(135deg, #1E47BD 0%, #2E6BFF 100%)',
      borderRadius: 20, padding: 18,
      color:'#fff', position:'relative', overflow:'hidden',
    }}>
      {/* Decorative rings */}
      <div style={{position:'absolute', right: -40, top: -40, width: 140, height: 140,
        borderRadius:'50%', border:'2px solid rgba(255,255,255,0.18)'}}/>
      <div style={{position:'absolute', right: -20, top: -20, width: 100, height: 100,
        borderRadius:'50%', border:'2px solid rgba(255,255,255,0.12)'}}/>
      <div style={{display:'flex', alignItems:'center', gap: 6, marginBottom: 4}}>
        <ICrown size={16} color="#FFD466"/>
        <span style={{fontSize: 11, fontWeight: 800, letterSpacing:'0.1em', color:'#FFD466'}}>
          PRO MEMBERSHIP
        </span>
      </div>
      <div style={{fontSize: 22, fontWeight: 800, letterSpacing:'-0.02em', lineHeight:1.2, maxWidth: 220}}>
        Unlock CleanSpeaker Pro
      </div>
      <div style={{fontSize: 13, opacity: 0.85, marginTop: 4, maxWidth: 240, position:'relative'}}>
        Deep cleaning, manual frequency, no ads.
      </div>
      <div style={{
        display:'inline-flex', alignItems:'center', gap: 6,
        marginTop: 14, padding:'8px 14px',
        background:'#fff', color:'var(--blue)',
        borderRadius: 999, fontSize: 13, fontWeight: 800, position:'relative',
      }}>
        Try 3 days free <IChevR size={14} strokeWidth={2.4}/>
      </div>
    </div>
  );
}

function ProActive() {
  return (
    <div style={{
      marginTop: 8,
      background:'linear-gradient(135deg, #0E1F5C 0%, #1E47BD 100%)',
      borderRadius: 20, padding: 16,
      color:'#fff', display:'flex', alignItems:'center', gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background:'rgba(255,255,255,0.12)',
        display:'flex', alignItems:'center', justifyContent:'center', color:'#FFD466',
      }}>
        <ICrown size={22}/>
      </div>
      <div style={{flex: 1}}>
        <div style={{fontSize: 11, fontWeight: 800, letterSpacing:'0.1em', color:'#FFD466'}}>PRO ACTIVE</div>
        <div style={{fontSize: 15, fontWeight: 700}}>All features unlocked</div>
      </div>
    </div>
  );
}

function SettingRow({ label, sub, Icon, onClick, divider, badge }) {
  return (
    <button onClick={onClick} style={{
      width:'100%', display:'flex', alignItems:'center', gap: 14,
      padding:'14px 16px', background:'transparent', border: 0, cursor:'pointer',
      borderBottom: divider ? '1px solid var(--line)' : 'none',
      textAlign:'left', fontFamily:'inherit',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background:'var(--blue-soft)', color:'var(--blue)',
        display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 36px',
      }}>
        <Icon size={18} strokeWidth={2}/>
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontSize: 15, fontWeight: 700, display:'flex', alignItems:'center', gap: 8}}>
          {label}
          {badge && (
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing:'0.06em',
              background:'#FFD466', color:'#7A4F00', padding:'2px 5px', borderRadius: 4,
            }}>{badge}</span>
          )}
        </div>
        {sub && <div style={{fontSize: 12, color:'var(--muted)', marginTop: 1}}>{sub}</div>}
      </div>
      <IChevR size={16} stroke="var(--muted-2)"/>
    </button>
  );
}

// ─── Support form (fake door) ─────────────────────────────
function SupportScreen({ onBack }) {
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
        <TopBar title="Support" onBack={onBack}/>
        <div style={{flex:1, display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', padding:'24px', textAlign:'center', gap: 16}}>
          <div style={{
            width: 88, height: 88, borderRadius:'50%',
            background:'var(--blue-faint)',
            display:'flex', alignItems:'center', justifyContent:'center',
            animation:'csFadeIn 240ms var(--ease)',
          }}>
            <div style={{
              width: 60, height: 60, borderRadius:'50%',
              background:'linear-gradient(160deg,#5C8DFF,#2E6BFF)', color:'#fff',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 10px 24px rgba(46,107,255,0.35)',
            }}>
              <ICheck size={30} strokeWidth={2.8}/>
            </div>
          </div>
          <div style={{fontSize: 22, fontWeight: 800}}>Message sent!</div>
          <div style={{fontSize: 14, color:'var(--muted)', maxWidth: 280, lineHeight: 1.5}}>
            Thanks for reaching out. Our team usually replies within 24 hours.
          </div>
          <div style={{flex: 1}}/>
          <button className="cs-cta" onClick={onBack}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
      <TopBar title="Support" onBack={onBack}/>
      <form onSubmit={submit} style={{flex: 1, padding:'8px 20px 16px',
        display:'flex', flexDirection:'column'}}>
        <div style={{fontSize: 22, fontWeight: 800, letterSpacing:'-0.02em', marginBottom: 4}}>
          How can we help?
        </div>
        <div style={{fontSize: 13, color:'var(--muted)', marginBottom: 18}}>
          Tell us about the issue and our team will get back to you.
        </div>

        <Field label="Subject">
          <input value={subject} onChange={e => setSubject(e.target.value)}
            placeholder="Brief description"
            style={inputStyle}/>
        </Field>
        <Field label="Message" required>
          <textarea value={msg} onChange={e => setMsg(e.target.value)}
            placeholder="Describe what's happening with your speaker…"
            rows={6}
            style={{...inputStyle, resize:'none', height: 'auto'}}/>
        </Field>

        <div style={{
          background:'var(--blue-faint)', padding:'12px 14px', borderRadius: 12,
          fontSize: 12, color:'var(--ink-2)', lineHeight: 1.5,
          display:'flex', gap: 10, alignItems:'flex-start',
        }}>
          <IShield size={18} stroke="var(--blue)" style={{flex:'0 0 18px', marginTop: 1}}/>
          <span>Your message is private. We won't share your details with anyone.</span>
        </div>

        <div style={{flex: 1}}/>
        <button type="submit" className="cs-cta" disabled={!msg.trim()}
          style={!msg.trim() ? {opacity: 0.4, boxShadow:'none'} : null}>
          Send Message
        </button>
      </form>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div style={{marginBottom: 14}}>
      <div style={{fontSize: 12, fontWeight: 700, color:'var(--muted)', marginBottom: 6, letterSpacing:'0.04em'}}>
        {label.toUpperCase()}{required && <span style={{color:'var(--blue)'}}> *</span>}
      </div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '14px 16px',
  background: 'var(--surface-2)', border: '1px solid var(--line)',
  borderRadius: 14, fontSize: 15, color: 'var(--ink)',
  fontFamily: 'inherit', outline: 'none',
  height: 50,
};

Object.assign(window, { SettingsScreen, SupportScreen });
