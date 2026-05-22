function Picker(){
  const [granted, setGranted] = React.useState(false);
  const albums = ["Recents", "Favorites", "Selfies", "Screenshots", "Documents"];
  const photos = [
    "street", "portrait", "doorstep", "product", "bokeh", "street",
    "portrait", "product", "doorstep", "bokeh", "street", "portrait",
  ];

  if(!granted){
    return (
      <div style={{position:"absolute", inset:0, paddingTop:54, background:"var(--light)", display:"flex", flexDirection:"column"}}>
        {/* nav */}
        <div style={{display:"flex", alignItems:"center", padding:"14px 22px"}}>
          <button onClick={()=>window.__nav("home")} style={{
            background:"none", border:"none", color:"#0D1718", cursor:"pointer", padding:0,
            display:"flex", alignItems:"center", gap:6, fontSize:15, fontWeight:500,
          }}><Ico.Back s={20}/></button>
        </div>

        {/* hero */}
        <div style={{padding:"24px 28px 0"}}>
          <div style={{
            width:88, height:88, borderRadius:24,
            background:"linear-gradient(135deg, #DDF8F2, #B6F0DF)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#0EA587", marginBottom:22,
          }}>
            <Ico.Image s={44}/>
          </div>
          <div style={{fontSize:28, fontWeight:700, color:"#0D1718", letterSpacing:-.4, lineHeight:1.15}}>
            Choose a photo<br/>to edit
          </div>
          <div style={{marginTop:12, color:"#667277", fontSize:15.5, lineHeight:1.5}}>
            We only use the photo you select. Nothing is uploaded unless you export.
          </div>
        </div>

        <div style={{padding:"22px 24px"}}>
          {[
            { icon:<Ico.Lock s={18}/>, t:"Private by default", s:"Editing happens on your device"},
            { icon:<Ico.Sparkle s={18}/>, t:"Limited photo access", s:"You pick what we can see"},
            { icon:<Ico.Bolt s={18}/>, t:"Fast & local", s:"No cloud round-trips required"},
          ].map((row,i)=>(
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:14,
              padding:"10px 0",
              borderTop: i? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                width:36, height:36, borderRadius:11, background:"#DDF8F2", color:"#0EA587",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>{row.icon}</div>
              <div>
                <div style={{fontSize:14.5, fontWeight:600, color:"#0D1718"}}>{row.t}</div>
                <div style={{fontSize:12.5, color:"#8A9998", marginTop:2}}>{row.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{flex:1}}/>
        <div style={{padding:"0 24px 30px"}}>
          <Button variant="primary" onClick={()=>setGranted(true)}>Choose photo</Button>
          <div style={{textAlign:"center", color:"#8A9998", fontSize:13, marginTop:14}}>
            Or <span onClick={()=>window.__nav("editor")} style={{color:"#0EA587", fontWeight:600}}>try a sample photo</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position:"absolute", inset:0, paddingTop:54, background:"var(--light)", display:"flex", flexDirection:"column"}}>
      {/* nav */}
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 22px"}}>
        <button onClick={()=>setGranted(false)} style={{
          background:"none", border:"none", color:"#11BC9B", fontSize:15.5, fontWeight:600, cursor:"pointer",
        }}>Cancel</button>
        <div style={{fontSize:16, fontWeight:600, color:"#0D1718"}}>Recents</div>
        <button onClick={()=>window.__nav("editor")} style={{
          background:"none", border:"none", color:"#11BC9B", fontSize:15.5, fontWeight:600, cursor:"pointer",
        }}>Done</button>
      </div>

      {/* Album dropdown */}
      <div style={{padding:"4px 22px 12px"}}>
        <button style={{
          background:"#fff", border:"1px solid var(--border)", borderRadius:14,
          padding:"10px 14px", display:"flex", alignItems:"center", justifyContent:"space-between",
          width:"100%", cursor:"pointer",
        }}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <Ico.Folder s={18}/>
            <span style={{fontSize:14, fontWeight:600, color:"#0D1718"}}>Recents</span>
            <span style={{fontSize:12, color:"#8A9998"}}>2,418 photos</span>
          </div>
          <Ico.Search s={18}/>
        </button>
      </div>

      {/* Filter chips */}
      <div className="noscroll" style={{display:"flex", gap:8, overflowX:"auto", padding:"0 22px 12px"}}>
        {albums.map((a,i)=>(
          <div key={a} style={{
            flex:"0 0 auto",
            padding:"7px 14px", borderRadius:99,
            background: i===0 ? "#0D1718" : "#fff",
            color: i===0 ? "#F8FAF9" : "#0D1718",
            border: i===0 ? "none" : "1px solid var(--border)",
            fontSize:13, fontWeight:600, cursor:"pointer",
          }}>{a}</div>
        ))}
      </div>

      {/* Photo grid */}
      <div className="noscroll" style={{
        flex:1, overflowY:"auto", padding:"0 14px 110px",
      }}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:3}}>
          {photos.map((p,i)=>{
            const selected = i===0;
            return (
              <div key={i} onClick={()=>window.__nav("editor")} style={{
                position:"relative", paddingTop:"100%", borderRadius:6, overflow:"hidden",
                background:"#0D1718", cursor:"pointer",
              }}>
                <div style={{position:"absolute", inset:0}}>
                  <Photo kind={p}/>
                </div>
                {/* Live AI tag on a few */}
                {(i===0 || i===2 || i===6 || i===8) && (
                  <div style={{
                    position:"absolute", left:6, top:6, background:"rgba(17,188,155,.92)",
                    color:"#04201B", fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99,
                    letterSpacing:.3,
                  }}>AI</div>
                )}
                {/* Selected ring */}
                <div style={{
                  position:"absolute", inset:0, borderRadius:6,
                  border: selected ? "3px solid #11BC9B" : "none",
                }}/>
                {selected && (
                  <div style={{
                    position:"absolute", right:6, top:6, width:22, height:22, borderRadius:99,
                    background:"#11BC9B", color:"#04201B",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}><Ico.Check s={14}/></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Use button */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0,
        padding:"14px 22px 30px",
        background:"linear-gradient(180deg, rgba(246,248,247,0) 0%, rgba(246,248,247,0.98) 30%)",
      }}>
        <Button variant="primary" onClick={()=>window.__nav("editor")}>Use photo</Button>
      </div>
    </div>
  );
}
window.Picker = Picker;
