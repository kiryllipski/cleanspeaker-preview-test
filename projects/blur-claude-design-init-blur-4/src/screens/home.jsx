function Home(){
  const quick = [
    { id:"privacy",  label:"Privacy Blur",     sub:"Faces & plates",  icon:<Ico.Face s={20}/>, accent:"#11BC9B"},
    { id:"bg",       label:"Blur Background",  sub:"Studio bokeh",    icon:<Ico.Drop s={20}/>, accent:"#11BC9B"},
    { id:"object",   label:"Remove Object",    sub:"Smart erase",     icon:<Ico.Eraser s={20}/>, accent:"#11BC9B"},
    { id:"removebg", label:"Remove Background",sub:"Subject cutout",  icon:<Ico.Layers s={20}/>, accent:"#11BC9B"},
  ];
  const recents = [
    { kind:"street",  title:"Street walk",  meta:"2 hrs ago · Faces blurred", date:"Today" },
    { kind:"product", title:"Camera bag",   meta:"Yesterday · BG removed",  date:"Yesterday" },
    { kind:"doorstep",title:"Front door",   meta:"Mar 12 · Address hidden", date:"Last week" },
  ];

  return (
    <div style={{position:"absolute", inset:0, paddingTop:54, background:"var(--light)", overflow:"auto"}} className="noscroll">
      {/* Top bar */}
      <div style={{padding:"16px 22px 10px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{
            fontSize:26, fontWeight:700, letterSpacing:-.5, color:"#0D1718",
          }}>Blur Photo</div>
          <Pill color="pro" style={{boxShadow:"0 4px 14px rgba(17,188,155,.3)"}}>
            <Ico.Crown s={11}/> PRO
          </Pill>
        </div>
        <button style={{
          width:40, height:40, borderRadius:99, background:"#fff",
          border:"1px solid var(--border)", color:"#0D1718",
          display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
        }}><Ico.Settings s={20}/></button>
      </div>

      {/* Big import card */}
      <button onClick={()=>window.__nav("picker")} style={{
        margin:"6px 18px 16px", padding:0,
        width:"calc(100% - 36px)",
        height:178, borderRadius:26, border:"none", cursor:"pointer",
        background:"linear-gradient(135deg, #0D1718 0%, #16302C 60%, #0EA587 130%)",
        position:"relative", overflow:"hidden", textAlign:"left",
        boxShadow:"0 18px 40px -12px rgba(13,23,24,.45)",
      }}>
        {/* subtle bokeh */}
        <svg width="100%" height="100%" style={{position:"absolute", inset:0, opacity:.55}}>
          <circle cx="320" cy="40" r="80" fill="rgba(17,188,155,0.16)"/>
          <circle cx="270" cy="160" r="40" fill="rgba(255,255,255,0.06)"/>
          <circle cx="60" cy="160" r="50" fill="rgba(17,188,155,0.12)"/>
        </svg>
        <div style={{position:"relative", padding:"22px 24px", color:"#F8FAF9"}}>
          <div style={{display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:600, color:"#83E6D0", letterSpacing:.6, textTransform:"uppercase"}}>
            <Ico.Sparkle s={14}/> AI privacy editor
          </div>
          <div style={{fontSize:26, fontWeight:700, marginTop:8, lineHeight:1.15, letterSpacing:-.5}}>
            Edit a photo
          </div>
          <div style={{fontSize:14, color:"#A6C2BD", marginTop:4}}>
            Auto-detect faces, plates & private info
          </div>
          <div style={{
            position:"absolute", right:24, bottom:22,
            width:48, height:48, borderRadius:99, background:"#11BC9B",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#04201B",
          }}><Ico.Plus s={22}/></div>
        </div>
      </button>

      {/* Quick actions grid */}
      <div style={{padding:"4px 18px 0"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          {quick.map(q=>(
            <button key={q.id} onClick={()=>window.__nav(
              q.id==="bg" || q.id==="removebg" ? "background" :
              q.id==="object" ? "eraser" : "select"
            )} style={{
              background:"#fff", border:"1px solid var(--border)",
              borderRadius:18, padding:"14px 14px 14px",
              display:"flex", flexDirection:"column", alignItems:"flex-start",
              gap:10, cursor:"pointer", textAlign:"left",
              boxShadow:"0 1px 0 rgba(15,23,28,.02)",
            }}>
              <div style={{
                width:38, height:38, borderRadius:11,
                background:"#DDF8F2", color:"#0EA587",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>{q.icon}</div>
              <div>
                <div style={{fontSize:14, fontWeight:600, color:"#0D1718"}}>{q.label}</div>
                <div style={{fontSize:12, color:"#8A9998", marginTop:2}}>{q.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent projects */}
      <div style={{padding:"22px 22px 8px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{fontSize:17, fontWeight:600, color:"#0D1718", letterSpacing:-.2}}>Recent</div>
        <div style={{fontSize:13, color:"#0EA587", fontWeight:600}}>See all</div>
      </div>

      <div className="noscroll" style={{
        display:"flex", gap:12, padding:"4px 22px 14px",
        overflowX:"auto",
      }}>
        {recents.map((r,i)=>(
          <button key={i} onClick={()=>window.__nav("editor")} style={{
            flex:"0 0 auto", width:130, height:160, borderRadius:18,
            border:"none", cursor:"pointer", padding:0, position:"relative",
            background:"#0D1718", overflow:"hidden",
            boxShadow:"0 1px 0 rgba(15,23,28,.04)",
          }}>
            <Photo kind={r.kind}/>
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.65) 100%)",
            }}/>
            <div style={{
              position:"absolute", left:10, top:10,
              background:"rgba(17,188,155,.92)", color:"#04201B",
              fontSize:9, fontWeight:700, padding:"3px 7px", borderRadius:99,
              letterSpacing:.4, textTransform:"uppercase",
            }}>Edited</div>
            <div style={{
              position:"absolute", left:10, right:10, bottom:10, color:"#fff", textAlign:"left"
            }}>
              <div style={{fontSize:12, fontWeight:600}}>{r.title}</div>
              <div style={{fontSize:10, opacity:.78, marginTop:2}}>{r.date}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Trust row */}
      <div style={{
        margin:"8px 18px 30px", padding:"14px 16px",
        background:"#fff", border:"1px solid var(--border)", borderRadius:18,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        {[
          { icon:<Ico.Sparkle s={16}/>, label:"Original quality", sub:"Lossless"},
          { icon:<Ico.Lock s={16}/>,    label:"Private editing",  sub:"On device"},
          { icon:<Ico.Bolt s={16}/>,    label:"Fast export",      sub:"< 20 sec"},
        ].map((t,i)=>(
          <div key={i} style={{display:"flex", alignItems:"center", gap:10, flex:1}}>
            <div style={{
              width:32, height:32, borderRadius:10, background:"#DDF8F2", color:"#0EA587",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>{t.icon}</div>
            <div>
              <div style={{fontSize:11.5, fontWeight:600, color:"#0D1718"}}>{t.label}</div>
              <div style={{fontSize:10, color:"#8A9998"}}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <TabBar active="home"/>
    </div>
  );
}

function TabBar({ active="home" }){
  const items = [
    { id:"home",   icon:<Ico.Image s={22}/>,  label:"Edit" },
    { id:"picker", icon:<Ico.Folder s={22}/>, label:"Library" },
    { id:"paywall",icon:<Ico.Crown s={22}/>,  label:"Pro" },
    { id:"home",   icon:<Ico.Settings s={22}/>,label:"Settings" },
  ];
  return (
    <div style={{
      position:"absolute", left:0, right:0, bottom:0,
      background:"rgba(255,255,255,0.92)",
      backdropFilter:"blur(20px) saturate(140%)",
      borderTop:"1px solid var(--border)",
      paddingBottom:30, paddingTop:8, paddingLeft:22, paddingRight:22,
      display:"flex", justifyContent:"space-around",
    }}>
      {items.map((it,i)=>(
        <button key={i} onClick={()=>window.__nav(it.id)} style={{
          background:"none", border:"none", cursor:"pointer",
          display:"flex", flexDirection:"column", alignItems:"center", gap:3,
          color: active===it.id ? "#0EA587" : "#8A9998",
          fontFamily:"var(--font)", fontSize:11, fontWeight:500,
          padding:"6px 14px", minWidth:60,
        }}>{it.icon}<span>{it.label}</span></button>
      ))}
    </div>
  );
}
window.Home = Home;
window.TabBar = TabBar;
