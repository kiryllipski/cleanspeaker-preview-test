function Eraser(){
  // states: select (paint over object) -> processing -> result
  const [state, setState] = React.useState("select");
  const [brush, setBrush] = React.useState(60);

  const startProcess = () => {
    setState("processing");
    setTimeout(()=>setState("result"), 2200);
  };

  return (
    <div style={{position:"absolute", inset:0, background:"var(--dark)", color:"#F8FAF9"}}>
      <EditorTopBar/>

      <div style={{position:"absolute", top:108, bottom:380, left:0, right:0, overflow:"hidden"}}>
        <div style={{position:"absolute", inset:0}}>
          <Photo kind="product"/>
        </div>

        {/* Selection state: highlight notebook + key as objects to remove */}
        {state==="select" && (
          <>
            <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
              style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
              {/* paint stroke over notebook */}
              <rect x="56" y="595" width="226" height="50" rx="6"
                fill="rgba(17,188,155,0.55)" stroke="#11BC9B" strokeWidth="2"/>
              <text x="170" y="625" fontFamily="var(--font)" fontSize="14" fontWeight="700"
                textAnchor="middle" fill="#04201B" style={{textTransform:"uppercase", letterSpacing:1}}>Selected</text>
              {/* paint stroke over key */}
              <ellipse cx="438" cy="616" rx="60" ry="34"
                fill="rgba(17,188,155,0.55)" stroke="#11BC9B" strokeWidth="2"/>
            </svg>
            {/* Brush cursor */}
            <div style={{
              position:"absolute", left:`75%`, top:`78%`,
              width:brush, height:brush, borderRadius:99,
              border:"2px solid #11BC9B",
              boxShadow:"0 0 0 1px rgba(0,0,0,0.4) inset",
              transform:"translate(-50%,-50%)", pointerEvents:"none",
            }}/>
            {/* Hint */}
            <div style={{
              position:"absolute", left:14, top:14,
              background:"rgba(13,23,24,.7)", color:"#F8FAF9",
              fontSize:11.5, fontWeight:600, padding:"7px 12px", borderRadius:99,
              backdropFilter:"blur(10px)",
            }}>
              Brush over the objects to remove
            </div>
          </>
        )}

        {state==="processing" && (
          <div style={{
            position:"absolute", inset:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(13,23,24,0.55)", backdropFilter:"blur(2px)",
          }}>
            <div style={{
              padding:"22px 26px",
              background:"rgba(13,23,24,0.85)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:20, textAlign:"center",
              boxShadow:"0 12px 40px rgba(0,0,0,.4)",
            }}>
              <div style={{
                width:36, height:36, margin:"0 auto 12px",
                borderRadius:99,
                border:"3px solid rgba(17,188,155,.25)",
                borderTopColor:"#11BC9B",
                animation:"spin 1s linear infinite",
              }}/>
              <div style={{fontSize:15, fontWeight:600, color:"#F8FAF9"}}>Rebuilding background</div>
              <div style={{fontSize:12.5, color:"#8A9998", marginTop:4}}>Inpainting context-aware fills…</div>
            </div>
          </div>
        )}

        {state==="result" && (
          <ResultSplit/>
        )}
      </div>

      {/* Bottom sheet content swaps by state */}
      <Sheet style={{height:380}}>
        <ToolTabs active="erase"/>

        {state==="select" && (
          <>
            {/* tools */}
            <div style={{padding:"12px 16px 0", display:"flex", gap:8}}>
              {[
                { id:"brush",  icon:<Ico.Brush s={18}/>,  label:"Brush", on:true },
                { id:"lasso",  icon:<Ico.Wand s={18}/>,   label:"Auto" },
                { id:"erase",  icon:<Ico.Eraser s={18}/>, label:"Eraser" },
                { id:"clear",  icon:<Ico.Trash s={18}/>,  label:"Clear" },
              ].map(b=>{
                const on = b.on;
                return (
                  <button key={b.id} style={{
                    flex:1,
                    background: on ? "rgba(17,188,155,0.16)" : "rgba(255,255,255,0.06)",
                    color: on ? "#11BC9B" : "#F8FAF9",
                    border: on ? "1px solid rgba(17,188,155,0.32)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius:14, padding:"10px 0",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                    fontFamily:"var(--font)", fontSize:11, fontWeight:600, cursor:"pointer",
                  }}>{b.icon}{b.label}</button>
                );
              })}
            </div>
            <div style={{padding:"14px 22px 0"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                <div style={{fontSize:13, fontWeight:600}}>Brush size</div>
                <div style={{fontSize:12, color:"#11BC9B", fontWeight:600}}>{Math.round(brush)} px</div>
              </div>
              <Slider value={brush} onChange={setBrush}/>
            </div>
            <div style={{padding:"14px 16px 0", display:"flex", gap:10}}>
              <Button variant="glass" onClick={()=>window.__nav("editor")} style={{flex:"0 0 110px"}}>Cancel</Button>
              <Button variant="primary" onClick={startProcess} icon={<Ico.Sparkle s={18}/>} style={{flex:1}}>Remove object</Button>
            </div>
          </>
        )}

        {state==="processing" && (
          <div style={{padding:"22px 22px 0", textAlign:"center"}}>
            <div style={{fontSize:14, fontWeight:600, color:"#F8FAF9"}}>Working on it…</div>
            <div style={{fontSize:12, color:"#8A9998", marginTop:4}}>Usually under 5 seconds</div>
            <div style={{
              marginTop:16, height:6, borderRadius:99, background:"rgba(255,255,255,0.06)", overflow:"hidden",
            }}>
              <div style={{
                width:"60%", height:"100%",
                background:"linear-gradient(90deg, transparent, #11BC9B, transparent)",
                backgroundSize:"200% 100%",
                animation:"shimmer 1.6s linear infinite",
              }}/>
            </div>
          </div>
        )}

        {state==="result" && (
          <>
            <div style={{padding:"14px 22px 0"}}>
              <div style={{
                padding:"10px 14px", background:"rgba(17,188,155,0.10)",
                border:"1px solid rgba(17,188,155,0.28)", borderRadius:14,
                display:"flex", alignItems:"center", gap:10,
              }}>
                <Ico.Check s={16}/>
                <div style={{fontSize:13}}>Removed in 1.8s. Background reconstructed.</div>
              </div>
            </div>
            <div style={{padding:"14px 16px 0", display:"flex", gap:10}}>
              <Button variant="glass" onClick={()=>{ setState("select"); }} icon={<Ico.Refresh s={16}/>} style={{flex:1}}>Try again</Button>
              <Button variant="primary" onClick={()=>window.__nav("export")} icon={<Ico.Check s={18}/>} style={{flex:1}}>Looks good</Button>
            </div>
          </>
        )}
      </Sheet>
    </div>
  );
}

function ResultSplit(){
  const [split, setSplit] = React.useState(50);
  const drag = (e)=>{
    const root = e.currentTarget.closest("[data-result-root]");
    if(!root) return;
    const rect = root.getBoundingClientRect();
    const move = (cx)=>{
      const p = Math.max(8, Math.min(92, ((cx - rect.left)/rect.width)*100));
      setSplit(p);
    };
    const onMove = (ev)=>{
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      move(cx);
    };
    const onUp = ()=>{
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    onMove(e);
  };
  return (
    <div data-result-root style={{position:"absolute", inset:0}}>
      <div style={{position:"absolute", inset:0}}><Photo kind="product"/></div>
      {/* AFTER: cleaned-up product photo (mask out notebook + key) */}
      <div style={{
        position:"absolute", inset:0,
        clipPath:`inset(0 0 0 ${split}%)`,
      }}>
        <Photo kind="product"/>
        {/* paint over removed objects with same wood color to imitate inpaint */}
        <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
          style={{position:"absolute", inset:0, width:"100%", height:"100%"}}>
          <defs>
            <linearGradient id="patch" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B68F65"/><stop offset="100%" stopColor="#7A5634"/>
            </linearGradient>
          </defs>
          <rect x="56" y="595" width="226" height="50" rx="2" fill="url(#patch)"/>
          <ellipse cx="438" cy="616" rx="60" ry="32" fill="url(#patch)"/>
          {/* faint grain to match wood */}
          {Array.from({length:5}).map((_,i)=>(
            <rect key={i} x="56" y={596+i*10} width="226" height="1.5" fill="rgba(0,0,0,.06)"/>
          ))}
          <ellipse cx="438" cy="618" rx="58" ry="2" fill="rgba(0,0,0,.06)"/>
        </svg>
      </div>
      <div onMouseDown={drag} onTouchStart={drag} style={{position:"absolute", inset:0, touchAction:"none"}}>
        <SplitHandle pct={split}/>
      </div>
      <div style={{
        position:"absolute", left:14, top:14,
        background:"rgba(13,23,24,.6)", color:"#F8FAF9",
        fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:99,
        letterSpacing:.4, textTransform:"uppercase", backdropFilter:"blur(10px)",
      }}>Before</div>
      <div style={{
        position:"absolute", right:14, top:14,
        background:"rgba(17,188,155,.92)", color:"#04201B",
        fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:99,
        letterSpacing:.4, textTransform:"uppercase",
      }}>After</div>
    </div>
  );
}
window.Eraser = Eraser;
