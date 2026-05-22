function SmartSelect(){
  const [target, setTarget] = React.useState("face"); // object | background | face | text
  const [brush, setBrush] = React.useState(48);
  const [scanning, setScanning] = React.useState(true);
  React.useEffect(()=>{
    const t = setTimeout(()=>setScanning(false), 2400);
    return ()=>clearTimeout(t);
  }, []);

  return (
    <div style={{position:"absolute", inset:0, background:"var(--dark)", color:"#F8FAF9"}}>
      <EditorTopBar/>

      <div style={{position:"absolute", top:108, bottom:380, left:0, right:0, overflow:"hidden"}}>
        <div style={{position:"absolute", inset:0}}>
          <Photo kind="street"/>
        </div>

        {/* AI mask: face */}
        {target==="face" && <FaceMaskOverlay/>}
        {target==="background" && <BgMaskOverlay/>}
        {target==="object" && <ObjectMaskOverlay/>}
        {target==="text" && <TextMaskOverlay/>}

        {scanning && <ScanOverlay/>}

        {/* Detection pill */}
        <div style={{
          position:"absolute", left:14, top:14,
          background:"rgba(13,23,24,.7)", color:"#F8FAF9",
          fontSize:11.5, fontWeight:600, padding:"7px 12px", borderRadius:99,
          backdropFilter:"blur(10px)",
          display:"flex", alignItems:"center", gap:6,
        }}>
          <span style={{
            width:6, height:6, borderRadius:99, background:"#11BC9B",
            animation: scanning ? "pulseDot 1.4s ease-in-out infinite" : "none",
          }}/>
          {scanning ? "Scanning…" : `AI detected 3 ${target==='face'?'faces':target+'s'}`}
        </div>

        {/* Brush cursor preview */}
        {!scanning && (
          <div style={{
            position:"absolute", left:`60%`, top:`58%`,
            width:brush, height:brush, borderRadius:99,
            border:"2px solid #11BC9B",
            boxShadow:"0 0 0 1px rgba(0,0,0,0.4) inset, 0 0 0 1px rgba(0,0,0,0.4)",
            transform:"translate(-50%,-50%)",
            pointerEvents:"none",
          }}/>
        )}
      </div>

      {/* Bottom sheet */}
      <Sheet style={{height:380}}>
        <ToolTabs active="mask"/>

        {/* Segmented target */}
        <div style={{padding:"4px 16px 0"}}>
          <div style={{
            background:"rgba(255,255,255,0.06)",
            borderRadius:12, padding:3,
            display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:2,
          }}>
            {[
              {id:"object", label:"Object"},
              {id:"background", label:"Background"},
              {id:"face", label:"Face"},
              {id:"text", label:"Text"},
            ].map(s=>{
              const on = target===s.id;
              return (
                <button key={s.id} onClick={()=>{setTarget(s.id); setScanning(true); setTimeout(()=>setScanning(false), 1400);}} style={{
                  background: on ? "rgba(255,255,255,0.16)" : "transparent",
                  color: on ? "#F8FAF9" : "rgba(248,250,249,.65)",
                  border:"none", borderRadius:10,
                  padding:"9px 0",
                  fontFamily:"var(--font)", fontSize:13, fontWeight:600, cursor:"pointer",
                  boxShadow: on ? "0 1px 2px rgba(0,0,0,.18)" : "none",
                }}>{s.label}</button>
              );
            })}
          </div>
        </div>

        {/* Brush tools */}
        <div style={{padding:"14px 16px 0", display:"flex", gap:8}}>
          {[
            { id:"brush", icon:<Ico.Brush s={18}/>, label:"Brush", on:true },
            { id:"eraser", icon:<Ico.Eraser s={18}/>, label:"Eraser" },
            { id:"refine", icon:<Ico.Wand s={18}/>, label:"Refine edge" },
            { id:"clear", icon:<Ico.Trash s={18}/>, label:"Clear" },
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

        {/* Brush size */}
        <div style={{padding:"14px 22px 0"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
            <div style={{fontSize:13, fontWeight:600, color:"#F8FAF9"}}>Brush size</div>
            <div style={{fontSize:12, color:"#11BC9B", fontWeight:600}}>{Math.round(brush)} px</div>
          </div>
          <Slider value={brush} onChange={setBrush}/>
        </div>

        <div style={{padding:"14px 16px 0"}}>
          <Button variant="primary" onClick={()=>window.__nav("editor")}>
            Apply blur
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
window.SmartSelect = SmartSelect;

function FaceMaskOverlay(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      <ellipse cx="300" cy="370" rx="64" ry="78" fill="rgba(17,188,155,0.38)" stroke="#11BC9B" strokeWidth="2"/>
      <rect x="38" y="540" width="48" height="60" rx="14" fill="rgba(17,188,155,0.38)" stroke="#11BC9B" strokeWidth="2"/>
      <rect x="98" y="555" width="32" height="40" rx="10" fill="rgba(17,188,155,0.38)" stroke="#11BC9B" strokeWidth="2"/>
      {/* Detection markers */}
      <circle cx="300" cy="285" r="4" fill="#11BC9B"/>
      <circle cx="62" cy="544" r="3" fill="#11BC9B"/>
      <circle cx="114" cy="557" r="3" fill="#11BC9B"/>
    </svg>
  );
}
function BgMaskOverlay(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      <defs>
        <mask id="cutPerson">
          <rect width="600" height="800" fill="#fff"/>
          {/* subject silhouette */}
          <ellipse cx="300" cy="370" rx="64" ry="78" fill="#000"/>
          <rect x="220" y="430" width="160" height="370" rx="80" fill="#000"/>
        </mask>
      </defs>
      <rect width="600" height="800" fill="rgba(17,188,155,0.38)" mask="url(#cutPerson)"/>
    </svg>
  );
}
function ObjectMaskOverlay(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      <rect x="378" y="518" width="206" height="124" rx="22"
        fill="rgba(17,188,155,0.38)" stroke="#11BC9B" strokeWidth="2"/>
      <circle cx="481" cy="577" r="3" fill="#11BC9B"/>
    </svg>
  );
}
function TextMaskOverlay(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      <rect x="436" y="606" width="88" height="32" rx="4"
        fill="rgba(17,188,155,0.38)" stroke="#11BC9B" strokeWidth="2"/>
      <rect x="220" y="320" width="160" height="60" rx="4"
        fill="rgba(17,188,155,0.38)" stroke="#11BC9B" strokeWidth="2"/>
    </svg>
  );
}
window.FaceMaskOverlay = FaceMaskOverlay;
