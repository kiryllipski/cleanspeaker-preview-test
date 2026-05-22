function Background(){
  const [tab, setTab] = React.useState("blur"); // blur | remove | replace
  const [preset, setPreset] = React.useState("portrait");
  const [intensity, setIntensity] = React.useState(72);
  const [replaceBg, setReplaceBg] = React.useState("white");

  return (
    <div style={{position:"absolute", inset:0, background:"var(--dark)", color:"#F8FAF9"}}>
      <EditorTopBar/>

      <div style={{position:"absolute", top:108, bottom:380, left:0, right:0, overflow:"hidden"}}>
        {/* Background-blurred subject */}
        <div style={{position:"absolute", inset:0, filter: tab==="blur" ? `blur(${4 + intensity*0.18}px) saturate(1.05)` : "none"}}>
          <Photo kind="portrait"/>
        </div>

        {/* For replace tab, show replacement background */}
        {tab==="replace" && (
          <div style={{position:"absolute", inset:0, ...({
            white:{ background:"#F4F1EC" },
            gray: { background:"#E1E2DF" },
            beige:{ background:"#E9DDC9" },
            grad: { background:"linear-gradient(135deg,#DDF8F2 0%,#FFFCEB 60%,#EFE0FF 100%)" },
            custom:{ background:"linear-gradient(135deg,#102323,#0EA587)"},
          }[replaceBg])}}/>
        )}

        {/* Subject silhouette layer (sharp portrait) */}
        <div style={{
          position:"absolute", inset:0,
          maskImage: "radial-gradient(ellipse 240px 360px at 50% 60%, #000 60%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 240px 360px at 50% 60%, #000 60%, transparent 70%)",
        }}>
          <Photo kind="portrait"/>
        </div>

        {/* Subtle vignette */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          boxShadow:"inset 0 -100px 200px rgba(13,23,24,.45)",
        }}/>

        {/* Top labels */}
        <div style={{
          position:"absolute", left:14, top:14,
          background:"rgba(13,23,24,.6)", color:"#F8FAF9",
          fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:99,
          backdropFilter:"blur(10px)", letterSpacing:.4, textTransform:"uppercase",
        }}>Subject</div>
        <div style={{
          position:"absolute", right:14, top:14,
          background:"rgba(17,188,155,.92)", color:"#04201B",
          fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:99,
          letterSpacing:.4, textTransform:"uppercase",
        }}>{tab==="blur"?"Bokeh":tab==="remove"?"Cutout":"Replaced"}</div>

      </div>

      <Sheet style={{height:380}}>
        <ToolTabs active="background"/>

        {/* Tabs: Blur, Remove, Replace */}
        <div style={{padding:"6px 16px 0"}}>
          <div style={{
            background:"rgba(255,255,255,0.06)", borderRadius:12, padding:3,
            display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:2,
          }}>
            {[
              { id:"blur", label:"Blur"},
              { id:"remove", label:"Remove"},
              { id:"replace", label:"Replace"},
            ].map(s=>{
              const on = tab===s.id;
              return (
                <button key={s.id} onClick={()=>setTab(s.id)} style={{
                  background: on ? "rgba(255,255,255,0.16)" : "transparent",
                  color: on ? "#F8FAF9" : "rgba(248,250,249,.65)",
                  border:"none", borderRadius:10, padding:"9px 0",
                  fontFamily:"var(--font)", fontSize:13, fontWeight:600, cursor:"pointer",
                }}>{s.label}</button>
              );
            })}
          </div>
        </div>

        {tab==="blur" && (
          <>
            {/* Presets */}
            <div className="noscroll" style={{padding:"14px 16px 0", display:"flex", gap:8, overflowX:"auto"}}>
              {[
                {id:"portrait", label:"Portrait", icon:<Ico.Person s={16}/>},
                {id:"bokeh",    label:"Bokeh",    icon:<Ico.Drop s={16}/>},
                {id:"motion",   label:"Motion",   icon:<Ico.Bolt s={16}/>},
                {id:"studio",   label:"Studio",   icon:<Ico.Sparkle s={16}/>},
              ].map(p=>{
                const on = preset===p.id;
                return (
                  <button key={p.id} onClick={()=>setPreset(p.id)} style={{
                    flex:"0 0 auto", display:"flex", gap:6, alignItems:"center",
                    padding:"9px 14px", borderRadius:12,
                    background: on? "rgba(17,188,155,0.16)" : "rgba(255,255,255,0.06)",
                    color: on? "#11BC9B" : "#F8FAF9",
                    border: on? "1px solid rgba(17,188,155,0.32)" : "1px solid rgba(255,255,255,0.08)",
                    fontFamily:"var(--font)", fontSize:13, fontWeight:600, cursor:"pointer",
                  }}>{p.icon}{p.label}</button>
                );
              })}
            </div>
            <div style={{padding:"16px 22px 0"}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                <div style={{fontSize:13, fontWeight:600}}>Intensity</div>
                <div style={{fontSize:12, color:"#11BC9B", fontWeight:600}}>{Math.round(intensity)}%</div>
              </div>
              <Slider value={intensity} onChange={setIntensity}/>
            </div>
          </>
        )}

        {tab==="remove" && (
          <div style={{padding:"16px 22px 0"}}>
            <div style={{
              padding:"12px 14px", background:"rgba(17,188,155,0.10)",
              border:"1px solid rgba(17,188,155,0.28)", borderRadius:14,
              display:"flex", alignItems:"center", gap:10,
            }}>
              <Ico.Sparkle s={18}/>
              <div style={{fontSize:13, color:"#F8FAF9"}}>
                Subject isolated. Background is now transparent.
              </div>
            </div>
            <div style={{
              marginTop:14, padding:"14px",
              background:"rgba(255,255,255,0.04)", borderRadius:14,
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <div>
                <div style={{fontSize:13.5, fontWeight:600}}>Refine hair edges</div>
                <div style={{fontSize:11.5, color:"#8A9998", marginTop:2}}>Auto-feather flyaways</div>
              </div>
              <Toggle on={true}/>
            </div>
          </div>
        )}

        {tab==="replace" && (
          <div className="noscroll" style={{padding:"14px 12px 0", display:"flex", gap:8, overflowX:"auto"}}>
            {[
              { id:"white", label:"Clean white", style:{ background:"#F4F1EC" }},
              { id:"gray",  label:"Soft gray",  style:{ background:"#E1E2DF" }},
              { id:"beige", label:"Warm beige", style:{ background:"#E9DDC9" }},
              { id:"grad",  label:"Gradient",   style:{ background:"linear-gradient(135deg,#DDF8F2 0%,#FFFCEB 60%,#EFE0FF 100%)" }},
              { id:"custom",label:"Custom",     style:{ background:"linear-gradient(135deg,#102323,#0EA587)" }},
            ].map(b=>{
              const on = replaceBg===b.id;
              return (
                <button key={b.id} onClick={()=>setReplaceBg(b.id)} style={{
                  flex:"0 0 86px",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                  background:"transparent", border:"none", cursor:"pointer", padding:0,
                }}>
                  <div style={{
                    width:80, height:80, borderRadius:14,
                    border: on ? "2px solid #11BC9B" : "1px solid rgba(255,255,255,.12)",
                    boxSizing:"border-box",
                    boxShadow: on ? "0 0 0 4px rgba(17,188,155,.18)" : "none",
                    ...b.style,
                  }}/>
                  <div style={{fontSize:11, color: on?"#11BC9B":"#C5CFCD", fontWeight:600}}>{b.label}</div>
                </button>
              );
            })}
          </div>
        )}

        <div style={{padding:"16px 16px 0"}}>
          <Button variant="primary" onClick={()=>window.__nav("export")}>
            {tab==="blur"?"Apply background blur" : tab==="remove" ? "Use cutout" : "Apply background"}
          </Button>
        </div>
      </Sheet>
    </div>
  );
}

function Toggle({ on=false }){
  return (
    <div style={{
      width:48, height:28, borderRadius:99,
      background: on ? "#11BC9B" : "rgba(255,255,255,0.16)",
      position:"relative", transition:"background .2s",
    }}>
      <div style={{
        position:"absolute", top:2, left: on? 22:2,
        width:24, height:24, borderRadius:99, background:"#fff",
        boxShadow:"0 1px 3px rgba(0,0,0,.25)", transition:"left .2s",
      }}/>
    </div>
  );
}
window.Toggle = Toggle;
window.Background = Background;
