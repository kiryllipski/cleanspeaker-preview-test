function Exporter(){
  const [res, setRes] = React.useState("hd"); // standard | hd | 4k
  const [fmt, setFmt] = React.useState("jpg"); // jpg | png
  const [keepSize, setKeepSize] = React.useState(true);

  const onSave = ()=>{
    if(res==="4k"){
      window.__nav("paywall");
    } else {
      // simulate save success — keep simple by just bumping a flash
      alert("Saved to Photos");
    }
  };

  return (
    <div style={{position:"absolute", inset:0, background:"var(--dark)", color:"#F8FAF9"}}>
      <EditorTopBar onSave={onSave}/>

      <div style={{position:"absolute", top:108, bottom:386, left:0, right:0, overflow:"hidden"}}>
        <div style={{position:"absolute", inset:0}}>
          <Photo kind="street" filter="saturate(1.05)"/>
          <PhotoRedactions/>
        </div>
        {/* glow under preview */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          boxShadow:"inset 0 -120px 200px rgba(13,23,24,.55)",
        }}/>
        {/* pill */}
        <div style={{
          position:"absolute", left:14, top:14,
          background:"rgba(17,188,155,.92)", color:"#04201B",
          fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:99,
          letterSpacing:.4, textTransform:"uppercase",
        }}>Final preview</div>
        <div style={{
          position:"absolute", right:14, top:14,
          background:"rgba(13,23,24,.7)", color:"#F8FAF9",
          fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:99,
          backdropFilter:"blur(10px)", letterSpacing:.4, textTransform:"uppercase",
        }}>3 Edits</div>

        {/* Bottom info row over canvas */}
        <div style={{
          position:"absolute", left:14, right:14, bottom:14,
          padding:"12px 14px", borderRadius:14,
          background:"rgba(13,23,24,0.7)", backdropFilter:"blur(14px)",
          border:"1px solid rgba(255,255,255,.08)",
          color:"#F8FAF9",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <Ico.Image s={18}/>
            <div>
              <div style={{fontSize:13, fontWeight:600}}>3024 × 4032</div>
              <div style={{fontSize:11, color:"#A6C2BD"}}>Original quality preserved</div>
            </div>
          </div>
          <Pill color="teal_d"><Ico.Check s={11}/> Ready</Pill>
        </div>
      </div>

      <Sheet style={{height:386}}>
        <div style={{padding:"10px 22px 0", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={{fontSize:18, fontWeight:600, color:"#F8FAF9", letterSpacing:-.2}}>Export</div>
            <div style={{fontSize:12, color:"#8A9998", marginTop:2}}>Choose quality and format</div>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button style={{
              ...iconBtnStyle(),
            }}><Ico.Share s={18}/></button>
            <button style={{
              ...iconBtnStyle(),
            }}><Ico.Copy s={18}/></button>
          </div>
        </div>

        {/* Resolution */}
        <div style={{padding:"14px 16px 0"}}>
          <div style={{display:"flex", gap:8}}>
            {[
              { id:"standard", label:"Standard", sub:"1080 px"},
              { id:"hd",       label:"HD",       sub:"2K"},
              { id:"4k",       label:"4K",       sub:"Pro", pro:true},
            ].map(r=>{
              const on = res===r.id;
              return (
                <button key={r.id} onClick={()=>setRes(r.id)} style={{
                  flex:1, position:"relative",
                  background: on ? "rgba(17,188,155,0.16)" : "rgba(255,255,255,0.06)",
                  color: on ? "#11BC9B" : "#F8FAF9",
                  border: on ? "1px solid rgba(17,188,155,0.32)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius:14, padding:"12px 0",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                  fontFamily:"var(--font)", cursor:"pointer",
                }}>
                  <div style={{fontSize:14, fontWeight:600}}>{r.label}</div>
                  <div style={{fontSize:11, color: on? "rgba(17,188,155,.85)" : "rgba(248,250,249,.5)"}}>{r.sub}</div>
                  {r.pro && (
                    <div style={{position:"absolute", top:-8, right:-6}}>
                      <Pill color="pro" size="sm" style={{padding:"3px 8px", fontSize:10}}>
                        <Ico.Crown s={10}/> PRO
                      </Pill>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Format */}
        <div style={{padding:"14px 22px 0"}}>
          <div style={{fontSize:13, fontWeight:600, marginBottom:8}}>Format</div>
          <div style={{
            background:"rgba(255,255,255,0.06)", borderRadius:12, padding:3,
            display:"grid", gridTemplateColumns:"1fr 1fr", gap:2,
          }}>
            {["jpg","png"].map(f=>{
              const on = fmt===f;
              return (
                <button key={f} onClick={()=>setFmt(f)} style={{
                  background: on ? "rgba(255,255,255,0.16)" : "transparent",
                  color: on ? "#F8FAF9" : "rgba(248,250,249,.65)",
                  border:"none", borderRadius:10, padding:"9px 0",
                  fontFamily:"var(--font)", fontSize:13, fontWeight:600, cursor:"pointer",
                  textTransform:"uppercase", letterSpacing:1,
                }}>{f}</button>
              );
            })}
          </div>
        </div>

        {/* Keep original size */}
        <div style={{
          margin:"14px 22px 0", padding:"12px 14px",
          background:"rgba(255,255,255,0.04)", borderRadius:14,
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div>
            <div style={{fontSize:13.5, fontWeight:600}}>Keep original size</div>
            <div style={{fontSize:11.5, color:"#8A9998", marginTop:2}}>Match the source pixel dimensions</div>
          </div>
          <div onClick={()=>setKeepSize(!keepSize)} style={{cursor:"pointer"}}><Toggle on={keepSize}/></div>
        </div>

        {/* CTA */}
        <div style={{padding:"14px 16px 0"}}>
          <Button variant="primary" icon={<Ico.Save s={18}/>} onClick={onSave}>
            Save to Photos
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
window.Exporter = Exporter;
