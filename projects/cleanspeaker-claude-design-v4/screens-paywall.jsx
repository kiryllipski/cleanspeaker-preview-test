// screens-paywall.jsx — Paywall + Special Offer

const PAYWALL_FEATURES = [
  { Icon: ISparkle, title: 'Deep Clean', sub: 'Advanced multi-step cleaning' },
  { Icon: ITabManual, title: 'Manual Frequency', sub: 'Full control over Hz range' },
  { Icon: IVibStrong, title: 'Vibration Control', sub: 'Adjust intensity for results' },
  { Icon: IBolt, title: 'No Ads', sub: 'Enjoy an uninterrupted experience' },
];

// ─── Paywall ─────────────────────────────────────────────
function PaywallScreen({ onClose, onContinue }) {
  const plans = [
    { id: 'yearly', title: 'Yearly', price: '$19.99', old: '$49.99', tag: 'Save 60%', best: true, sub: 'Just $1.67/mo' },
    { id: 'weekly', title: 'Weekly', price: '$4.99', sub: 'Auto-renew' },
    { id: 'lifetime', title: 'One-time', price: '$29.99', sub: 'Lifetime access' },
  ];
  const [sel, setSel] = useState('yearly');

  return (
    <div className="cs-screen">
      <StatusBar/>
      <div className="cs-content padded" style={{paddingTop: 0}}>
        <div style={{display:'flex', justifyContent:'flex-end', padding:'8px 0'}}>
          <button className="cs-iconbtn" style={{width: 36, height: 36, background:'var(--surface-2)'}} onClick={onClose}>
            <IX size={18}/>
          </button>
        </div>

        <div style={{textAlign:'center', marginBottom: 12}}>
          <div style={{
            width: 56, height: 56, borderRadius:'50%', background:'#FFF6E2',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            color:'#F1B53A', marginBottom: 10,
          }}>
            <ICrown size={28}/>
          </div>
          <div style={{fontSize: 26, fontWeight: 800, letterSpacing:'-0.02em', lineHeight:1.15}}>
            Unlock the best<br/>cleaning experience
          </div>
          <div style={{fontSize: 14, color:'var(--muted)', marginTop: 8, lineHeight: 1.45, maxWidth: 300, margin: '8px auto 0'}}>
            Go Premium for deeper cleaning, more control and better results.
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap: 10, marginTop: 18, marginBottom: 18}}>
          {PAYWALL_FEATURES.map((f, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap: 14, padding:'4px 6px'}}>
              <div style={{width: 36, height: 36, borderRadius: 10,
                background:'var(--blue-soft)', color:'var(--blue)',
                display:'flex', alignItems:'center', justifyContent:'center', flex:'0 0 36px',
              }}>
                <f.Icon size={20} strokeWidth={2}/>
              </div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 14, fontWeight: 700}}>{f.title}</div>
                <div style={{fontSize: 12, color: 'var(--muted)'}}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:'flex', flexDirection:'column', gap: 8, marginBottom: 16}}>
          {plans.map(p => (
            <PlanRow key={p.id} plan={p} selected={sel === p.id} onSelect={() => setSel(p.id)}/>
          ))}
        </div>

        <div style={{flex: 1}}/>

        <button className="cs-cta" onClick={onContinue}>Try 3 Days Free</button>
        <div style={{fontSize: 12, color:'var(--muted)', textAlign:'center', marginTop: 10}}>
          No commitment. Cancel anytime.
        </div>
        <div style={{display:'flex', justifyContent:'center', gap: 16, marginTop: 10, fontSize:11, color:'var(--muted-2)'}}>
          <span>Terms</span><span>Privacy</span><span>Restore</span>
        </div>
      </div>
    </div>
  );
}

function PlanRow({ plan, selected, onSelect }) {
  return (
    <button onClick={onSelect} style={{
      position:'relative',
      display:'flex', alignItems:'center', gap: 14,
      padding: '14px 16px',
      background: selected ? 'var(--blue-faint)' : '#fff',
      border: `2px solid ${selected ? 'var(--blue)' : 'var(--line)'}`,
      borderRadius: 16,
      cursor: 'pointer',
      transition: 'all 180ms var(--ease)',
      width: '100%', textAlign: 'left',
      fontFamily: 'inherit',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: `2px solid ${selected ? 'var(--blue)' : 'var(--line-2)'}`,
        background: selected ? 'var(--blue)' : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'center',
        flex: '0 0 22px',
      }}>
        {selected && <div style={{width: 8, height: 8, borderRadius:'50%', background:'#fff'}}/>}
      </div>
      <div style={{flex: 1}}>
        <div style={{display:'flex', alignItems:'center', gap: 8}}>
          <span style={{fontSize: 15, fontWeight: 700}}>{plan.title}</span>
          {plan.tag && (
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing:'0.04em',
              background: 'var(--blue)', color:'#fff', padding:'2px 6px', borderRadius: 6,
            }}>{plan.tag}</span>
          )}
        </div>
        {plan.sub && <div style={{fontSize: 12, color:'var(--muted)', marginTop: 2}}>{plan.sub}</div>}
      </div>
      <div style={{textAlign: 'right'}}>
        <div style={{fontSize: 16, fontWeight: 800}}>{plan.price}</div>
        {plan.old && <div style={{fontSize: 12, color:'var(--muted-2)', textDecoration:'line-through'}}>{plan.old}</div>}
      </div>
    </button>
  );
}

// ─── Special offer (shown when paywall closed) ────────────
function SpecialOfferScreen({ onClose, onContinue }) {
  const [secs, setSecs] = useState(599); // 9:59
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = Math.floor(secs/60).toString().padStart(2,'0');
  const ss = (secs%60).toString().padStart(2,'0');

  return (
    <div className="cs-screen" style={{background:'linear-gradient(180deg,#F4F8FF,#FFFFFF 60%)'}}>
      <StatusBar/>
      <div className="cs-content padded" style={{paddingTop: 0}}>
        <div style={{display:'flex', justifyContent:'flex-end', padding:'8px 0'}}>
          <button className="cs-iconbtn" style={{width: 36, height: 36}} onClick={onClose}>
            <IX size={18}/>
          </button>
        </div>

        <div style={{textAlign:'center', marginTop: 10}}>
          <div style={{
            display:'inline-block',
            padding:'6px 12px',
            background:'var(--ink)', color:'#fff',
            borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing:'0.1em',
            marginBottom: 14, whiteSpace:'nowrap',
          }}>SPECIAL OFFER · LIMITED</div>
          <div style={{fontSize: 30, fontWeight: 800, letterSpacing:'-0.025em', lineHeight: 1.1}}>
            Wait! Get <span style={{color:'var(--blue)'}}>80% OFF</span><br/>your first year.
          </div>
        </div>

        {/* Countdown */}
        <div style={{
          display:'flex', justifyContent:'center', gap: 8, marginTop: 18,
        }}>
          {[mm[0], mm[1], ':', ss[0], ss[1]].map((c, i) => (
            <div key={i} style={c === ':' ? {
              fontSize: 30, fontWeight: 800, color: 'var(--blue)',
              display: 'flex', alignItems: 'center',
            } : {
              width: 44, height: 56, borderRadius: 12,
              background: 'var(--ink)', color: '#fff',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em',
            }}>{c}</div>
          ))}
        </div>
        <div style={{textAlign:'center', fontSize: 12, color:'var(--muted)', marginTop: 8}}>
          Offer expires in this session
        </div>

        {/* Price */}
        <div style={{
          margin: '20px 0 16px',
          background: '#fff', borderRadius: 20, padding: 20,
          border: '2px solid var(--blue)',
          boxShadow: '0 12px 32px var(--blue-glow)',
        }}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize: 13, fontWeight: 700, color:'var(--muted)'}}>Lifetime CleanSpeaker Pro</div>
              <div style={{display:'flex', alignItems:'baseline', gap: 8, marginTop: 4}}>
                <span style={{fontSize: 32, fontWeight: 800, letterSpacing:'-0.02em', color:'var(--blue)'}}>$5.99</span>
                <span style={{fontSize: 14, color:'var(--muted-2)', textDecoration:'line-through'}}>$29.99</span>
              </div>
            </div>
            <div style={{
              padding:'8px 12px', background:'#FEF2C9', color:'#A37800',
              borderRadius: 12, fontWeight: 800, fontSize: 13,
            }}>-80%</div>
          </div>
          <div style={{
            display:'flex', flexDirection:'column', gap: 8,
            marginTop: 16, paddingTop: 16, borderTop:'1px solid var(--line)',
          }}>
            {['One-time payment', 'All Pro features unlocked', 'No ads, ever', 'Lifetime updates'].map((t, i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap: 10, fontSize: 13}}>
                <div style={{
                  width: 18, height: 18, borderRadius:'50%', background:'var(--blue-soft)',
                  display:'flex', alignItems:'center', justifyContent:'center', color:'var(--blue)',
                  flex:'0 0 18px',
                }}>
                  <ICheck size={12} strokeWidth={2.6}/>
                </div>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{flex: 1}}/>
        <button className="cs-cta" onClick={onContinue}>Claim 80% Off</button>
        <button onClick={onClose} style={{
          marginTop: 10, background:'none', border:0, color:'var(--muted)',
          fontSize: 13, fontWeight: 600, padding: 10, cursor:'pointer', width:'100%',
        }}>No thanks, continue with ads</button>
      </div>
    </div>
  );
}

Object.assign(window, { PaywallScreen, SpecialOfferScreen });
