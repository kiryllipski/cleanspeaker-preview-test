/* Shared editor chrome used by Editor, SmartSelect, Background, Eraser, Export screens */

function EditorTopBar({ onSave }){
  return (
    <div style={{
      position:"absolute", top:54, left:0, right:0, height:54,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 16px",
      color:"#F8FAF9",
      zIndex:30,
    }}>
      <button onClick={()=>window.__nav("home")} style={iconBtnStyle()}><Ico.Back s={20}/></button>
      <div style={{display:"flex", gap:6}}>
        <button style={iconBtnStyle()}><Ico.Undo s={20}/></button>
        <button style={iconBtnStyle()}><Ico.Redo s={20}/></button>
        <button style={iconBtnStyle()}><Ico.Help s={20}/></button>
        <button onClick={onSave || (()=>window.__nav("export"))} style={{
          ...iconBtnStyle(),
          background:"#11BC9B", color:"#04201B",
          paddingLeft:14, paddingRight:14, width:"auto",
          fontSize:14, fontWeight:600,
        }}>Save</button>
      </div>
    </div>
  );
}
function iconBtnStyle(){
  return {
    width:36, height:36, borderRadius:99,
    background:"rgba(255,255,255,0.08)",
    border:"1px solid rgba(255,255,255,0.06)",
    color:"#F8FAF9",
    display:"flex", alignItems:"center", justifyContent:"center",
    cursor:"pointer", padding:0,
    backdropFilter:"blur(18px)",
  };
}
window.EditorTopBar = EditorTopBar;
window.iconBtnStyle = iconBtnStyle;

function ToolTabs({ active="blur" }){
  const tabs = [
    { id:"blur",       label:"Blur",       icon:<Ico.Drop s={18}/>,   nav:"editor" },
    { id:"mask",       label:"Mask",       icon:<Ico.Wand s={18}/>,   nav:"select" },
    { id:"background", label:"Background", icon:<Ico.Mountain s={18}/>,nav:"background" },
    { id:"erase",      label:"Erase",      icon:<Ico.Eraser s={18}/>, nav:"eraser" },
    { id:"export",     label:"Export",     icon:<Ico.Save s={18}/>,   nav:"export" },
  ];
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"14px 14px 6px",
    }}>
      {tabs.map(t=>{
        const on = t.id===active;
        return (
          <button key={t.id} onClick={()=>window.__nav(t.nav)} style={{
            background:"transparent", border:"none", cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", gap:5,
            color: on ? "#11BC9B" : "rgba(248,250,249,.6)",
            fontFamily:"var(--font)", fontSize:11.5, fontWeight:600,
            padding:"4px 10px", letterSpacing:.2, position:"relative",
          }}>
            <div style={{
              width:42, height:42, borderRadius:14,
              background: on ? "rgba(17,188,155,.16)" : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              border: on? "1px solid rgba(17,188,155,.32)":"1px solid transparent",
              transition:"all .2s",
            }}>{t.icon}</div>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
window.ToolTabs = ToolTabs;

/* Canvas: photo + optional before/after split, optional AI scan overlay, optional mask */
function Canvas({ kind="street", split=null, mask=null, scan=false, redactions=true, blurAmt=14, mode="soft", children }){
  /* mode: soft (gaussian) | pixelate | mosaic | redact */
  const filter =
    mode==="soft" ? `blur(${blurAmt}px) saturate(1.05)` :
    mode==="pixelate" ? `blur(2px) contrast(1.1)` :
    mode==="mosaic" ? `blur(.5px)` : null;

  return (
    <div style={{
      position:"absolute", top:108, bottom:0, left:0, right:0,
      background:"#0B1416", overflow:"hidden",
    }}>
      <div style={{position:"absolute", inset:0}}>
        <Photo kind={kind}/>
      </div>

      {split !== null && (
        <>
          <div style={{
            position:"absolute", inset:0,
            clipPath:`inset(0 0 0 ${split}%)`,
          }}>
            <Photo kind={kind} filter={filter}/>
            {redactions && <PhotoRedactions/>}
            {mode==="pixelate" && <PixelGridOverlay/>}
            {mode==="mosaic" && <MosaicOverlay/>}
            {mode==="redact" && <RedactBars/>}
          </div>
          {/* Slider line */}
          <SplitHandle pct={split}/>
          <div style={{
            position:"absolute", left:14, top:14,
            background:"rgba(13,23,24,.6)", color:"#F8FAF9",
            fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:99,
            backdropFilter:"blur(8px)", letterSpacing:.4, textTransform:"uppercase",
          }}>Before</div>
          <div style={{
            position:"absolute", right:14, top:14,
            background:"rgba(17,188,155,.92)", color:"#04201B",
            fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:99,
            letterSpacing:.4, textTransform:"uppercase",
          }}>After</div>
        </>
      )}

      {scan && <ScanOverlay/>}
      {mask}

      {children}
    </div>
  );
}
window.Canvas = Canvas;

function SplitHandle({pct=50, dark=true}){
  return (
    <div style={{
      position:"absolute", top:0, bottom:0,
      left:`calc(${pct}% - 1px)`, width:2, background:"#fff",
      boxShadow:"0 0 12px rgba(0,0,0,.4)",
    }}>
      <div style={{
        position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        width:42, height:42, borderRadius:99, background:"#fff",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 6px 20px rgba(0,0,0,.25)", color:"#0D1718",
      }}><Ico.Arrows s={18}/></div>
    </div>
  );
}
window.SplitHandle = SplitHandle;

function ScanOverlay(){
  return (
    <div style={{position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden"}}>
      {/* scan line */}
      <div style={{
        position:"absolute", left:0, right:0, height:120,
        background:"linear-gradient(180deg, rgba(17,188,155,0) 0%, rgba(17,188,155,.5) 50%, rgba(17,188,155,0) 100%)",
        animation:"scanY 2.4s ease-in-out infinite",
      }}/>
      {/* corner marks */}
      {[
        {top:14,left:14},{top:14,right:14},{bottom:14,left:14},{bottom:14,right:14},
      ].map((p,i)=>{
        const cls = {
          width:18, height:18, position:"absolute", borderColor:"#11BC9B",
          borderStyle:"solid", borderWidth:0, ...p
        };
        if(p.top && p.left)   { cls.borderTopWidth=2; cls.borderLeftWidth=2; }
        if(p.top && p.right)  { cls.borderTopWidth=2; cls.borderRightWidth=2; }
        if(p.bottom && p.left){ cls.borderBottomWidth=2; cls.borderLeftWidth=2; }
        if(p.bottom && p.right){cls.borderBottomWidth=2; cls.borderRightWidth=2; }
        return <div key={i} style={cls}/>;
      })}
    </div>
  );
}

function PixelGridOverlay(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      <defs>
        <pattern id="pix" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <rect width="22" height="22" fill="rgba(0,0,0,0)"/>
          <rect width="22" height="22" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="600" height="800" fill="url(#pix)"/>
    </svg>
  );
}

function MosaicOverlay(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      {Array.from({length: 800/22}).map((_,r)=>Array.from({length: 600/22}).map((_,c)=>{
        const seed = (r*7 + c*3) % 9;
        const fill = ["#A38166","#7C5F4A","#C8A286","#5E4633","#9B7758","#3D5460","#5C7C84","#7B5634","#0F1A1F"][seed];
        return <rect key={`mo${r}${c}`} x={c*22} y={r*22} width={22} height={22} fill={fill} fillOpacity={(r>14 && r<22 && c>9 && c<16) ? .7 : 0}/>;
      }))}
    </svg>
  );
}

function RedactBars(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      <rect x="220" y="320" width="160" height="60" rx="4" fill="#0D1718"/>
      <rect x="438" y="610" width="84" height="26" rx="4" fill="#0D1718"/>
    </svg>
  );
}
window.PixelGridOverlay = PixelGridOverlay;
window.MosaicOverlay = MosaicOverlay;
window.RedactBars = RedactBars;
window.ScanOverlay = ScanOverlay;

/* ============== Editor (Blur tab) ============== */
function Editor(){
  const [split, setSplit] = React.useState(50);
  const [mode, setMode] = React.useState("soft");
  const [intensity, setIntensity] = React.useState(70);
  const dragSplit = (e)=>{
    const root = e.currentTarget.closest("[data-canvas-root]");
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

  const blurAmt = 4 + (intensity/100)*22;

  return (
    <div style={{position:"absolute", inset:0, background:"var(--dark)", color:"#F8FAF9"}}>
      <EditorTopBar/>

      <div data-canvas-root style={{position:"absolute", top:108, bottom:340, left:0, right:0, overflow:"hidden"}}>
        <div style={{position:"absolute", inset:0}}>
          <Photo kind="street"/>
        </div>
        <div style={{
          position:"absolute", inset:0,
          clipPath:`inset(0 0 0 ${split}%)`,
        }}>
          <Photo kind="street" filter={
            mode==="soft" ? `blur(${blurAmt}px)` :
            mode==="pixelate" ? `blur(1px) contrast(1.05)` :
            mode==="mosaic" ? null : null
          }/>
          {mode==="pixelate" && <PixelGridOverlay/>}
          {mode==="mosaic" && <MosaicOverlay/>}
          {mode==="redact" && <RedactBars/>}
          {mode!=="redact" && <PhotoRedactions/>}
        </div>

        <div onMouseDown={dragSplit} onTouchStart={dragSplit} style={{position:"absolute", inset:0, touchAction:"none"}}>
          <SplitHandle pct={split}/>
        </div>

        {/* Labels */}
        <div style={{
          position:"absolute", left:14, top:14,
          background:"rgba(13,23,24,.6)", color:"#F8FAF9",
          fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:99,
          backdropFilter:"blur(10px)", letterSpacing:.4, textTransform:"uppercase",
        }}>Before</div>
        <div style={{
          position:"absolute", right:14, top:14,
          background:"rgba(17,188,155,.92)", color:"#04201B",
          fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:99,
          letterSpacing:.4, textTransform:"uppercase",
        }}>After</div>

        {/* AI detected pill */}
        <div style={{
          position:"absolute", left:14, bottom:14,
          background:"rgba(13,23,24,.7)", color:"#F8FAF9",
          fontSize:11.5, fontWeight:600, padding:"7px 12px", borderRadius:99,
          backdropFilter:"blur(10px)",
          display:"flex", alignItems:"center", gap:6,
        }}>
          <span style={{
            width:6, height:6, borderRadius:99, background:"#11BC9B",
            animation:"pulseDot 1.6s ease-in-out infinite",
          }}/>
          AI detected 3 faces · 1 plate · 2 texts
        </div>
      </div>

      {/* Bottom sheet */}
      <Sheet style={{height:340}}>
        <ToolTabs active="blur"/>

        <div style={{padding:"6px 22px 0"}}>
          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            marginBottom:10,
          }}>
            <div style={{fontSize:14, fontWeight:600, color:"#F8FAF9"}}>Intensity</div>
            <div style={{fontSize:13, color:"#11BC9B", fontWeight:600}}>{Math.round(intensity)}%</div>
          </div>
          <Slider value={intensity} onChange={setIntensity}/>
        </div>

        <div style={{padding:"14px 16px 0"}}>
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8}}>
            {[
              { id:"soft",     label:"Soft",     icon:<Ico.Drop s={18}/> },
              { id:"pixelate", label:"Pixelate", icon:<Ico.Grid s={18}/> },
              { id:"mosaic",   label:"Mosaic",   icon:<Ico.Mosaic s={18}/> },
              { id:"redact",   label:"Redact",   icon:<Ico.Lock s={18}/> },
            ].map(m=>{
              const on = mode===m.id;
              return (
                <button key={m.id} onClick={()=>setMode(m.id)} style={{
                  background: on ? "#11BC9B" : "rgba(255,255,255,0.06)",
                  color: on ? "#04201B" : "#F8FAF9",
                  border: on ? "none" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius:14, padding:"10px 0",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                  fontFamily:"var(--font)", fontSize:12, fontWeight:600, cursor:"pointer",
                }}>
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{padding:"16px 16px 0"}}>
          <Button variant="primary" onClick={()=>window.__nav("export")}>
            Apply blur
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
window.Editor = Editor;
