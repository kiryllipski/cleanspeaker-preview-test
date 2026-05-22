// screens-test.jsx — Sound Test, Speaker Test, Result

// ─── Sound Test (post-clean) ──────────────────────────────
function SoundTestScreen({ onBack, onContinue }) {
  const [state, setState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [t, setT] = useState(0);
  const TOTAL = 10;

  useEffect(() => {
    if (state !== 'playing') return;
    const id = setInterval(() => {
      setT(v => {
        if (v + 0.1 >= TOTAL) {
          clearInterval(id);
          setState('done');
          // Auto-advance to Result after a beat — no manual "See Result" button.
          setTimeout(() => { onContinue && onContinue(); }, 700);
          return TOTAL;
        }
        return v + 0.1;
      });
    }, 100);
    return () => clearInterval(id);
  }, [state]);

  const tt = Math.max(0, TOTAL - t);
  const pct = (t / TOTAL) * 100;
  const isPlaying = state === 'playing';
  const startTest = () => { if (!isPlaying) { setT(0); setState('playing'); } };

  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#E9F1FD', position:'relative'}}>
      <TopBar title="Sound Test" onBack={onBack}/>

      {/* Full-screen pulse while playing */}
      <CleanBgPulse active={isPlaying}/>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center',
        padding: '12px 24px 16px', textAlign:'center', position:'relative', zIndex: 1}}>
        <div style={{marginTop: 8, marginBottom: 6}}>
          <div style={{fontSize: 22, fontWeight: 800, letterSpacing:'-0.02em', lineHeight:1.2}}>
            Test your speaker
          </div>
          <div style={{fontSize: 14, color:'var(--muted)', marginTop: 6}}>
            Play a test sound to check the improvement.
          </div>
        </div>

        {/* Big play */}
        <div style={{position:'relative', margin: '12px 0', width: 240, height: 240,
          display:'flex', alignItems:'center', justifyContent:'center'}}>
          {/* Static decorative rings — only visible in idle/done, fade away when playing */}
          {[1, 0.86, 0.72].map((s, i) => (
            <div key={i} style={{
              position:'absolute', width: 240 * s, height: 240 * s, borderRadius:'50%',
              border:'1px solid var(--blue-soft)',
              opacity: isPlaying ? 0 : 1,
              transition: 'opacity 320ms var(--ease)',
            }}/>
          ))}
          {/* Progress arc */}
          <svg width="180" height="180" viewBox="0 0 180 180" style={{position:'absolute'}}>
            <circle cx="90" cy="90" r="78" stroke="var(--blue-faint)" strokeWidth="3" fill="none"/>
            {pct > 0 && (
              <circle cx="90" cy="90" r="78" stroke="var(--blue)" strokeWidth="3" fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(pct/100) * 490} 490`}
                transform="rotate(-90 90 90)"/>
            )}
          </svg>
          <button onClick={startTest}
            disabled={isPlaying}
            aria-label="Play test sound"
            style={{
              width: 130, height: 130, borderRadius:'50%',
              background: isPlaying
                ? 'linear-gradient(135deg, #3669F0 0%, #5482FA 55%, #3BD8F1 100%)'
                : 'linear-gradient(135deg, #3669F0 0%, #5482FA 55%, #3BD8F1 100%)',
              color: '#fff',
              border: 0, cursor: isPlaying ? 'default' : 'pointer',
              boxShadow: 'var(--shadow-cta)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
            <IPlay size={48} style={{marginLeft: 4}}/>
          </button>
        </div>

        <div style={{
          fontSize: 22, fontWeight: 800, fontVariantNumeric:'tabular-nums',
          color: isPlaying ? 'var(--blue)' : 'var(--muted-2)',
        }}>
          00:{Math.ceil(tt).toString().padStart(2,'0')}
        </div>

        <div style={{flex: 1}}/>

        {/* Single primary CTA — duplicates the big round button's action */}
        <button className="cs-cta" onClick={startTest} disabled={isPlaying}>
          <IVolume size={20}/> <span>{state === 'done' ? 'Replay Test' : isPlaying ? 'Playing…' : 'Play Test'}</span>
        </button>
      </div>
    </div>
  );
}

// ─── Separate Speaker Test (top vs bottom) ────────────────
function SpeakerTestScreen({ onBack }) {
  const [active, setActive] = useState(null); // 'top' | 'bottom' | null
  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#E9F1FD', position:'relative'}}>
      <TopBar title="Speaker Test" onBack={onBack}/>

      {/* Full-screen pulse mirrors Clean / Sound Test — same visual language */}
      <CleanBgPulse active={!!active}/>

      <div style={{flex:1, display:'flex', flexDirection:'column',
        padding: '12px 24px 24px', textAlign:'center', position:'relative', zIndex: 1}}>
        <div style={{fontSize: 22, fontWeight: 800, letterSpacing:'-0.02em', marginBottom: 6}}>
          Test each speaker
        </div>
        <div style={{fontSize: 14, color:'var(--muted)', marginBottom: 24, maxWidth: 320, margin: '0 auto 24px'}}>
          Play a sound through one speaker at a time to find which side needs more cleaning.
        </div>

        {/* Phone diagram */}
        <div style={{flex: 1, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{
            position:'relative',
            width: 170, height: 320,
            background: 'linear-gradient(180deg,#F4F6FB,#E8ECF5)',
            border:'8px solid #1B233F', borderRadius: 32,
            boxShadow:'0 22px 50px rgba(15,25,70,0.18)',
          }}>
            {/* Earpiece */}
            <div onClick={() => setActive(a => a === 'top' ? null : 'top')}
              style={{
                position:'absolute', left:'50%', top: 14, transform:'translateX(-50%)',
                width: 60, height: 6, borderRadius: 3, background:'#1B233F',
                cursor:'pointer',
              }}/>
            <SpeakerPing active={active === 'top'} pos="top"/>
            {/* Bottom speaker */}
            <div style={{
              position:'absolute', bottom: 10, left: '50%', transform:'translateX(-50%)',
              display:'flex', gap: 4,
            }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{width: 4, height: 4, borderRadius: 2, background:'#1B233F'}}/>
              ))}
            </div>
            <SpeakerPing active={active === 'bottom'} pos="bottom"/>
          </div>
        </div>

        {/* Buttons */}
        <div style={{display:'flex', gap: 12, marginTop: 12}}>
          <button
            onClick={() => setActive(a => a === 'top' ? null : 'top')}
            style={pillBtn(active === 'top')}
          >
            <IHeadphones size={18}/> Top
          </button>
          <button
            onClick={() => setActive(a => a === 'bottom' ? null : 'bottom')}
            style={pillBtn(active === 'bottom')}
          >
            <ISpeakerBox size={18}/> Bottom
          </button>
        </div>
      </div>
    </div>
  );
}

function pillBtn(active) {
  return {
    flex: 1, display:'flex', alignItems:'center', justifyContent:'center', gap: 8,
    padding: '14px 16px', borderRadius: 999,
    background: active ? 'var(--blue)' : 'var(--blue-faint)',
    color: active ? '#fff' : 'var(--ink)',
    border: 0, fontFamily:'inherit',
    fontSize: 15, fontWeight: 700, cursor:'pointer',
    boxShadow: active ? 'var(--shadow-cta)' : 'none',
    transition: 'all 200ms var(--ease)',
  };
}

function SpeakerPing({ active, pos }) {
  if (!active) return null;
  const style = pos === 'top'
    ? { top: -10, left:'50%', transform:'translateX(-50%)' }
    : { bottom: -10, left:'50%', transform:'translateX(-50%)' };
  return (
    <div style={{position:'absolute', ...style}}>
      {[0, 0.6, 1.2].map((d, i) => (
        <div key={i} style={{
          position:'absolute', left:'50%', top:'50%',
          width: 90, height: 90, borderRadius:'50%',
          border:'2px solid #fff',
          background: 'radial-gradient(circle, rgba(46,107,255,0.18) 0%, rgba(46,107,255,0.04) 60%, rgba(46,107,255,0) 80%)',
          boxShadow: 'inset 0 0 0 1px rgba(46,107,255,0.25)',
          animation: `csRingPulse 2.4s ${d}s ease-out infinite`,
          opacity: 0,
        }}/>
      ))}
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────
function ResultScreen({ onDone, score = 92 }) {
  const [stars, setStars] = useState(0);
  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#E9F1FD'}}>
      <TopBar title="Result"/>
      <div style={{flex:1, padding: '8px 24px 16px', textAlign:'center', position:'relative'}}>
        <Confetti count={28}/>

        <div style={{margin: '16px 0 8px', display:'flex', justifyContent:'center'}}>
          <div style={{
            width: 130, height: 130, borderRadius:'50%',
            background:'var(--blue-faint)',
            display:'flex', alignItems:'center', justifyContent:'center',
            animation:'csFadeIn 320ms var(--ease)',
          }}>
            <div style={{
              width: 88, height: 88, borderRadius:'50%',
              background: 'linear-gradient(160deg,#5C8DFF,#2E6BFF)',
              color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 14px 28px rgba(46,107,255,0.4)',
              animation:'csPulse 2s ease-in-out infinite',
            }}>
              <ICheck size={44} strokeWidth={3}/>
            </div>
          </div>
        </div>

        <div style={{fontSize: 26, fontWeight: 800, letterSpacing:'-0.02em', marginTop: 6}}>
          Great job!
        </div>
        <div style={{fontSize: 16, color:'var(--muted)', marginTop: 4}}>
          Your speaker is clean.
        </div>

        {/* Score */}
        <div style={{marginTop: 22}}>
          <div style={{fontSize: 12, fontWeight: 700, color:'var(--muted)', letterSpacing:'0.08em'}}>
            SOUND IMPROVED
          </div>
          <div style={{fontSize: 44, fontWeight: 800, letterSpacing:'-0.02em', color:'var(--blue)', marginTop: 2}}>
            {score}%
          </div>
          <div style={{
            position:'relative', height: 8, background:'var(--blue-faint)', borderRadius: 4,
            margin: '10px 24px',
          }}>
            <div style={{
              position:'absolute', left: 0, top: 0, bottom: 0,
              width: `${score}%`,
              background:'linear-gradient(90deg,#5C8DFF,#2E6BFF)',
              borderRadius: 4,
              transition: 'width 1s var(--ease)',
            }}/>
          </div>
        </div>

        <div style={{marginTop: 22}}>
          <div style={{fontSize: 13, color:'var(--muted)', marginBottom: 10}}>How do you hear the sound now?</div>
          <div style={{display:'flex', justifyContent:'center', gap: 8}}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setStars(n)}
                style={{background:'none', border:0, padding: 4, cursor:'pointer'}}>
                {n <= stars
                  ? <IStar size={32} stroke="#F1B53A"/>
                  : <IStarOutline size={32} stroke="#D2D7E3"/>}
              </button>
            ))}
          </div>
          <div style={{display:'flex', justifyContent:'space-between',
            fontSize: 11, color:'var(--muted)', marginTop: 2,
            padding: '0 8px'}}>
            <span>Not good</span><span>Perfect</span>
          </div>
        </div>

        <div style={{position:'absolute', left: 24, right: 24, bottom: 16}}>
          <button className="cs-cta" onClick={onDone}>Done</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SoundTestScreen, SpeakerTestScreen, ResultScreen });
