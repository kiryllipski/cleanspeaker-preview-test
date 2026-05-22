function Paywall(){
  const [plan, setPlan] = React.useState("yearly");

  const benefits = [
    { icon:<Ico.Bolt s={18}/>,    t:"Unlimited exports", s:"No daily caps"},
    { icon:<Ico.Sparkle s={18}/>, t:"4K quality",        s:"Print-ready resolution"},
    { icon:<Ico.Layers s={18}/>,  t:"Batch blur",        s:"Process up to 50 photos"},
    { icon:<Ico.Eraser s={18}/>,  t:"Object eraser",     s:"Unlimited AI removals"},
    { icon:<Ico.Drop s={18}/>,    t:"No watermark",      s:"Clean exports for sharing"},
  ];

  return (
    <div style={{position:"absolute", inset:0, background:"var(--light)", overflow:"auto"}} className="noscroll">
      {/* Top bar */}
      <div style={{
        position:"sticky", top:0, zIndex:10, paddingTop:54,
        background:"linear-gradient(180deg, var(--light) 0%, var(--light) 70%, rgba(246,248,247,0) 100%)",
      }}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 22px"}}>
          <button onClick={()=>window.__nav("export")} style={{
            background:"none", border:"none", color:"#0D1718", cursor:"pointer", padding:0,
            display:"flex", alignItems:"center", gap:6, fontSize:15, fontWeight:500,
          }}><Ico.Close s={22}/></button>
          <button style={{
            background:"none", border:"none", color:"#11BC9B", cursor:"pointer", padding:0,
            fontSize:14, fontWeight:600,
          }}>Restore</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{padding:"4px 28px 0"}}>
        <div style={{
          width:64, height:64, borderRadius:18,
          background:"linear-gradient(135deg, #11BC9B, #0EA587)",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#04201B", marginBottom:18,
          boxShadow:"0 12px 30px rgba(17,188,155,.32)",
        }}><Ico.Crown s={28}/></div>
        <div style={{
          fontSize:30, fontWeight:700, color:"#0D1718",
          letterSpacing:-.5, lineHeight:1.1,
        }}>Unlock unlimited<br/>private edits.</div>
        <div style={{marginTop:10, fontSize:15, color:"#667277", lineHeight:1.5}}>
          Pro removes the watermark, unlocks 4K, batch blur, and the AI object eraser.
        </div>
      </div>

      {/* Benefits list */}
      <div style={{margin:"22px 22px 0", padding:"6px 4px",
        background:"#fff", border:"1px solid var(--border)", borderRadius:18,
      }}>
        {benefits.map((b,i)=>(
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:12,
            padding:"12px 14px",
            borderTop: i? "1px solid var(--border)":"none",
          }}>
            <div style={{
              width:34, height:34, borderRadius:11, background:"#DDF8F2", color:"#0EA587",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>{b.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:600, color:"#0D1718"}}>{b.t}</div>
              <div style={{fontSize:12, color:"#8A9998", marginTop:2}}>{b.s}</div>
            </div>
            <Ico.Check s={18}/>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div style={{margin:"22px 22px 0", display:"flex", flexDirection:"column", gap:10}}>
        {[
          {
            id:"yearly", label:"Yearly", price:"$29.99 / year", sub:"Just $2.50 / month · 7-day free trial",
            best:true,
          },
          {
            id:"monthly", label:"Monthly", price:"$5.99 / month", sub:"Cancel anytime",
          },
          {
            id:"lifetime", label:"Lifetime", price:"$59.99 once", sub:"Pay once · Yours forever",
          },
        ].map(p=>{
          const on = plan===p.id;
          return (
            <button key={p.id} onClick={()=>setPlan(p.id)} style={{
              width:"100%", padding:"14px 16px",
              background:"#fff", textAlign:"left", cursor:"pointer",
              borderRadius:18,
              border: on ? "2px solid #11BC9B" : "1px solid var(--border)",
              boxShadow: on ? "0 6px 20px rgba(17,188,155,.16)" : "none",
              position:"relative",
              display:"flex", alignItems:"center", justifyContent:"space-between",
            }}>
              <div style={{display:"flex", alignItems:"center", gap:12}}>
                <div style={{
                  width:22, height:22, borderRadius:99,
                  border: on? "7px solid #11BC9B" : "2px solid #C5CFCD",
                  boxSizing:"border-box",
                  background:"#fff",
                }}/>
                <div>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    <div style={{fontSize:15.5, fontWeight:600, color:"#0D1718"}}>{p.label}</div>
                    {p.best && <Pill color="pro" size="sm">Best value</Pill>}
                  </div>
                  <div style={{fontSize:12, color:"#8A9998", marginTop:3}}>{p.sub}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:15.5, fontWeight:700, color:"#0D1718"}}>{p.price}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{padding:"22px 22px 8px"}}>
        <Button variant="primary" onClick={()=>window.__nav("home")}>
          {plan==="yearly" ? "Start free trial" : plan==="lifetime" ? "Buy lifetime" : "Continue"}
        </Button>
        <div style={{textAlign:"center", color:"#8A9998", fontSize:11.5, marginTop:12, lineHeight:1.5}}>
          {plan==="yearly" && "7 days free, then $29.99/year. Cancel anytime."}
          {plan==="monthly" && "$5.99/month, billed monthly. Cancel anytime."}
          {plan==="lifetime" && "One-time payment. Lifetime access. No subscription."}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display:"flex", justifyContent:"center", gap:18,
        padding:"6px 22px 30px", color:"#8A9998", fontSize:11.5,
      }}>
        <span>Privacy policy</span>
        <span>·</span>
        <span>Terms</span>
        <span>·</span>
        <span>Restore</span>
      </div>
    </div>
  );
}
window.Paywall = Paywall;
