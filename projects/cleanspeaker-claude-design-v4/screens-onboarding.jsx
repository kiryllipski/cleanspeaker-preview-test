// screens-onboarding.jsx — Splash, Onboarding, Trust

// ─── Splash (auto-advances) ───────────────────────────────
function SplashScreen({ onContinue }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="cs-screen" data-screen-label="Splash" style={{background: 'linear-gradient(180deg,#F4F8FF 0%,#FFFFFF 60%)'}}>
      <StatusBar/>
      <div className="cs-content" style={{justifyContent:'center', alignItems:'center', gap: 28}}>
        <div style={{position:'relative'}}>
          <WaveRipple size={180}/>
        </div>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize: 36, fontWeight: 800, letterSpacing:'-0.03em'}}>
            Clean<span style={{color:'var(--blue)'}}>Speaker</span>
          </div>
          <div style={{fontSize: 12, fontWeight: 600, letterSpacing: '0.4em',
            color: 'var(--muted)', marginTop: 6}}>RESCUE</div>
        </div>
        <div style={{position:'absolute', bottom: 56, color:'var(--muted)', fontSize: 12, fontWeight: 500}}>
          Designed for premium audio care
        </div>
      </div>
    </div>
  );
}

// ─── Onboarding (single screen with 3-dot carousel) ───────
function OnboardingScreen({ onContinue }) {
  const [idx, setIdx] = useState(0);
  const slides = [
    {
      title: 'Bring your sound back to life.',
      body: 'Remove water, dust and dirt from your speaker with guided cleaning and smart vibration.',
      art: 'speaker',
    },
    {
      title: 'Sound waves push out water.',
      body: 'Low-frequency tones gently force trapped moisture out of the speaker mesh.',
      art: 'waves',
    },
    {
      title: 'Safe & effective.',
      body: 'Designed to protect your device. No drying agents, no risk — just physics.',
      art: 'shield',
    },
  ];
  const slide = slides[idx];
  return (
    <div className="cs-screen">
      <StatusBar/>
      <div className="cs-content" style={{padding: '0 24px 16px'}}>
        <div style={{flex: 1, display:'flex', flexDirection:'column', alignItems:'center',
            justifyContent:'center', textAlign:'center', gap: 24, paddingTop: 8}} key={idx}>
          <OnboardingArt type={slide.art}/>
          <div style={{maxWidth: 320, animation: 'csFadeIn 320ms var(--ease)'}}>
            <div style={{fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em',
              lineHeight: 1.15, textWrap: 'balance'}}>{slide.title}</div>
            <div style={{fontSize: 15, color: 'var(--muted)', marginTop: 12, lineHeight: 1.5}}>
              {slide.body}
            </div>
          </div>
        </div>
        {/* Dots */}
        <div style={{display:'flex', justifyContent:'center', gap: 6, padding: '20px 0 16px'}}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === idx ? 22 : 6, height: 6, borderRadius: 4,
              background: i === idx ? 'var(--blue)' : 'var(--line-2)',
              transition: 'all 240ms var(--ease)',
            }}/>
          ))}
        </div>
        <button className="cs-cta" onClick={() => {
          if (idx < slides.length - 1) setIdx(idx + 1);
          else onContinue();
        }}>Continue</button>
        <div style={{height: 16}}/>
      </div>
    </div>
  );
}

function OnboardingArt({ type }) {
  if (type === 'speaker') {
    return (
      <div style={{position:'relative', width: 240, height: 240, display:'flex', alignItems:'center', justifyContent:'center'}}>
        {/* Concentric rings */}
        {[1, 0.78, 0.56].map((s, i) => (
          <div key={i} style={{
            position:'absolute', width: 220 * s, height: 220 * s, borderRadius:'50%',
            border: '1.5px solid var(--blue-soft)',
            background: i === 2 ? 'radial-gradient(circle at 30% 30%, #C9DAFF, var(--blue-soft))' : 'transparent',
          }}/>
        ))}
        {/* Speaker box */}
        <div style={{
          position:'absolute', width: 110, height: 110, borderRadius: 18,
          background: 'linear-gradient(160deg,#5C8DFF,#2E6BFF 60%,#1E47BD)',
          boxShadow:'0 16px 32px rgba(46,107,255,0.4), inset 0 -8px 16px rgba(0,0,0,0.18)',
          display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap: 6,
        }}>
          <div style={{width: 70, height: 70, borderRadius:'50%',
            background:'radial-gradient(circle at 35% 35%,#2A4FB8 30%,#0E1F5C)',
            border:'2px solid rgba(255,255,255,0.2)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{width: 28, height: 28, borderRadius: '50%', background: '#0A1338'}}/>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'waves') {
    return (
      <div style={{position:'relative', width: 240, height: 240, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <WaveRipple size={220}/>
      </div>
    );
  }
  if (type === 'shield') {
    return (
      <div style={{position:'relative', width: 240, height: 240, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          background: 'var(--blue-faint)', display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: 'linear-gradient(160deg,#5C8DFF,#2E6BFF)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', boxShadow:'0 16px 32px rgba(46,107,255,0.35)',
          }}>
            <IShield size={56} strokeWidth={1.8}/>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// ─── Trust screen — 500k users + reviews ──────────────────
function TrustScreen({ onContinue, onRateUs }) {
  const [showRate, setShowRate] = useState(false);
  const reviews = [
    { name: 'Mark D.', text: 'Saved my JBL after the pool. Sound came back in 60 sec.', rating: 5 },
    { name: 'Sarah K.', text: 'Cleared dust from my phone speaker — voice calls so much clearer now.', rating: 5 },
  ];
  return (
    <div className="cs-screen">
      <StatusBar/>
      <div className="cs-content padded">
        <div style={{textAlign:'center', paddingTop: 12, marginBottom: 18}}>
          <div style={{fontSize: 28, fontWeight: 800, letterSpacing:'-0.02em', lineHeight: 1.15}}>
            Trusted by half a million<br/>speaker lovers.
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(160deg, #F2F6FF 0%, #E5EDFF 100%)',
          borderRadius: 20, padding: '22px 18px', textAlign: 'center',
          marginBottom: 16,
        }}>
          <div style={{display:'flex', justifyContent:'center', gap: -8, marginBottom: 12}}>
            {['#FF8E53','#22C55E','#A855F7','#2E6BFF','#F1B53A'].map((c, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius:'50%', background: c,
                border: '3px solid #fff', marginLeft: i ? -10 : 0,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontWeight:800, fontSize: 13,
              }}>{['M','S','J','A','K'][i]}</div>
            ))}
          </div>
          <div style={{fontSize: 32, fontWeight: 800, letterSpacing:'-0.02em', color:'var(--ink)'}}>
            500,000+
          </div>
          <div style={{fontSize: 14, color: 'var(--muted)', marginTop: 2}}>satisfied users worldwide</div>
          <div style={{display:'flex', justifyContent:'center', gap: 2, marginTop: 10}}>
            {[0,1,2,3,4].map(i => <IStar key={i} size={18} stroke="#F1B53A"/>)}
            <span style={{fontSize: 13, fontWeight:700, marginLeft: 6, color: 'var(--ink)'}}>4.8</span>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap: 10, marginBottom: 16}}>
          {reviews.map((r, i) => (
            <div key={i} className="cs-card" style={{padding: '14px 14px'}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 6}}>
                <span style={{fontSize: 13, fontWeight: 700}}>{r.name}</span>
                <div style={{display:'flex', gap: 1}}>
                  {[...Array(r.rating)].map((_,j) => <IStar key={j} size={12} stroke="#F1B53A"/>)}
                </div>
              </div>
              <div style={{fontSize: 13, color: 'var(--muted)', lineHeight: 1.45}}>"{r.text}"</div>
            </div>
          ))}
        </div>

        <div style={{flex: 1}}/>
        <button className="cs-cta" onClick={() => setShowRate(true)}>Continue</button>
        <div style={{height: 8}}/>
      </div>

      {/* Native rate us dialog mock */}
      {showRate && (
        <NativeRateDialog onDone={() => { setShowRate(false); onContinue(); }}/>
      )}
    </div>
  );
}

// Mock of native iOS/Android rate prompt
function NativeRateDialog({ onDone }) {
  const [stars, setStars] = useState(0);
  return (
    <>
      <div className="cs-sheet-backdrop" />
      <div style={{
        position: 'absolute', left: 32, right: 32, top: '38%',
        background: '#fff', borderRadius: 14, padding: '22px 20px',
        zIndex: 32, animation: 'csFadeIn 240ms var(--ease)',
        boxShadow: '0 18px 60px rgba(14,21,48,0.25)',
        textAlign: 'center',
      }}>
        <div style={{fontSize: 15, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4}}>
          Enjoying CleanSpeaker?
        </div>
        <div style={{fontSize: 12, color: 'var(--muted)', marginBottom: 14}}>
          Tap a star to rate it on the App Store.
        </div>
        <div style={{display:'flex', justifyContent:'center', gap: 6, marginBottom: 18}}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => setStars(n)}
              style={{background:'none', border:0, padding: 4, cursor:'pointer'}}>
              {n <= stars
                ? <IStar size={28} stroke="#F1B53A"/>
                : <IStarOutline size={28} stroke="#C7CDDB"/>}
            </button>
          ))}
        </div>
        <div style={{display:'flex', borderTop:'1px solid #E5E7EB', margin:'0 -20px -22px', paddingTop: 0}}>
          <button onClick={onDone} style={{
            flex:1, padding:'14px', background:'none', border:0, fontSize:15,
            color:'var(--muted)', cursor:'pointer', borderRight:'1px solid #E5E7EB',
          }}>Not Now</button>
          <button onClick={onDone} style={{
            flex:1, padding:'14px', background:'none', border:0, fontSize:15, fontWeight:700,
            color:'var(--blue)', cursor:'pointer',
          }}>Submit</button>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { SplashScreen, OnboardingScreen, TrustScreen, NativeRateDialog });
