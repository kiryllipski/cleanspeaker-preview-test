/* Router – renders all 9 screens side by side as iPhone frames */
const SCREENS = [
  { id:"onboarding", label:"01 Onboarding", theme:"light",  Comp: () => <Onboarding/> },
  { id:"home",       label:"02 Home",       theme:"light",  Comp: () => <Home/> },
  { id:"picker",     label:"03 Picker",     theme:"light",  Comp: () => <Picker/> },
  { id:"editor",     label:"04 Editor",     theme:"dark",   Comp: () => <Editor/> },
  { id:"select",     label:"05 Smart select", theme:"dark", Comp: () => <SmartSelect/> },
  { id:"background", label:"06 Background", theme:"dark",   Comp: () => <Background/> },
  { id:"eraser",     label:"07 Eraser",     theme:"dark",   Comp: () => <Eraser/> },
  { id:"export",     label:"08 Export",     theme:"dark",   Comp: () => <Exporter/> },
  { id:"paywall",    label:"09 Paywall",    theme:"light",  Comp: () => <Paywall/> },
];

function Header(){
  return (
    <div style={{
      width:"100%", maxWidth:1600, margin:"0 auto 28px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      color:"#F6F8F7", padding:"0 8px",
    }}>
      <div style={{display:"flex", alignItems:"center", gap:14}}>
        <div style={{
          width:44, height:44, borderRadius:14,
          background:"linear-gradient(135deg,#11BC9B,#0EA587)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#04201B",
          boxShadow:"0 6px 20px rgba(17,188,155,.35)",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="currentColor"/>
          </svg>
        </div>
        <div>
          <div style={{fontSize:22, fontWeight:700, letterSpacing:-0.3}}>Blur Photo</div>
          <div style={{fontSize:13, color:"#8A9998"}}>AI Privacy & Background Editor — iOS prototype</div>
        </div>
      </div>
      <div style={{
        display:"flex", gap:10, alignItems:"center",
        color:"#8A9998", fontSize:13,
      }}>
        <Pill color="teal_d">9 screens</Pill>
        <Pill color="dark">Interactive</Pill>
      </div>
    </div>
  );
}

function App(){
  const [active, setActive] = React.useState(()=>{
    return localStorage.getItem("bp.active") || "onboarding";
  });
  React.useEffect(()=>{ localStorage.setItem("bp.active", active); }, [active]);

  // Provide nav via context-like global
  window.__nav = (id)=>setActive(id);
  window.__activeScreen = active;

  // Build a single-screen "spotlight" view: list of all screens shown side by side,
  // with the currently-active one slightly emphasized.

  return (
    <div style={{width:"100%", maxWidth:1600, margin:"0 auto"}}>
      <Header/>

      {/* Nav bar of screens */}
      <div style={{
        display:"flex", flexWrap:"wrap", gap:8, marginBottom:24,
        padding:"10px 12px",
        background:"rgba(255,255,255,0.04)",
        border:"1px solid rgba(255,255,255,0.06)",
        borderRadius:18, justifyContent:"center",
      }}>
        {SCREENS.map(s=> (
          <button key={s.id} onClick={()=>{
            setActive(s.id);
            const el = document.getElementById("frame-"+s.id);
            if(el) el.scrollIntoView({behavior:"smooth", inline:"center", block:"center"});
          }} style={{
            background: active===s.id ? "#11BC9B" : "transparent",
            color: active===s.id ? "#04201B" : "#C5CFCD",
            border:"1px solid "+ (active===s.id ? "#11BC9B" : "rgba(255,255,255,0.08)"),
            borderRadius:99, padding:"8px 14px",
            fontFamily:"var(--font)", fontSize:13, fontWeight:600, cursor:"pointer",
            letterSpacing:.1,
          }}>{s.label}</button>
        ))}
      </div>

      <div className="noscroll" style={{
        display:"flex", gap:36, alignItems:"flex-start",
        overflowX:"auto", padding:"30px 8px 60px", scrollSnapType:"x mandatory",
      }}>
        {SCREENS.map(s=>{
          const isActive = active === s.id;
          return (
            <div key={s.id} id={"frame-"+s.id} style={{
              scrollSnapAlign:"center",
              transition:"transform .35s cubic-bezier(.2,.7,.3,1), opacity .35s",
              transform: isActive ? "scale(1)" : "scale(.96)",
              opacity: isActive ? 1 : .82,
            }}>
              <Phone theme={s.theme} label={s.label}><s.Comp/></Phone>
              <div style={{
                marginTop:14, color:"#8A9998", fontSize:13, fontWeight:500,
                textAlign:"center",
              }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <div style={{
        textAlign:"center", color:"#667277", fontSize:12, padding:"12px 0 30px",
      }}>
        Tap any chip above to focus a screen. Tap inside the phone to navigate.
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
