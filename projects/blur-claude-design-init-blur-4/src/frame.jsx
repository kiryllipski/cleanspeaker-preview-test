/* iPhone 15 Pro frame – screen 393×852pt */
function Phone({ children, theme="light", label }) {
  const dark = theme === "dark";
  const statusColor = dark ? "#F8FAF9" : "#0D1718";
  return (
    <div data-screen-label={label} style={{
      width:393, height:852, position:"relative",
      borderRadius:55, padding:11,
      background:"linear-gradient(155deg,#1c1f21,#0a0c0d)",
      boxShadow:"0 50px 120px -20px rgba(0,0,0,.55), 0 6px 20px rgba(0,0,0,.4), inset 0 0 0 1.5px #2a2d2f, inset 0 0 0 3px #0a0c0d",
      flexShrink:0,
    }}>
      {/* side buttons */}
      <div style={{position:"absolute", left:-2, top:170, width:3, height:32, background:"#0a0c0d", borderRadius:2}}/>
      <div style={{position:"absolute", left:-2, top:220, width:3, height:60, background:"#0a0c0d", borderRadius:2}}/>
      <div style={{position:"absolute", left:-2, top:300, width:3, height:60, background:"#0a0c0d", borderRadius:2}}/>
      <div style={{position:"absolute", right:-2, top:230, width:3, height:90, background:"#0a0c0d", borderRadius:2}}/>

      <div style={{
        width:"100%", height:"100%",
        borderRadius:44, overflow:"hidden",
        position:"relative",
        background: dark ? "var(--dark)" : "var(--light)",
      }}>
        {/* status bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:54,
          display:"flex", alignItems:"center", padding:"16px 36px 0",
          color: statusColor, fontWeight:600, fontSize:15, letterSpacing:.2,
          zIndex:50, pointerEvents:"none",
        }}>
          <div style={{flex:1}}>9:41</div>
          {/* Dynamic Island */}
          <div style={{
            position:"absolute", left:"50%", top:11, transform:"translateX(-50%)",
            width:124, height:36, background:"#000", borderRadius:20,
          }}/>
          <div style={{display:"flex", alignItems:"center", gap:6, color:statusColor}}>
            <Ico.Cell /><Ico.Wifi /><Ico.Battery />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function Sheet({ children, height="auto", style={}, dark=true }) {
  return (
    <div style={{
      position:"absolute", left:0, right:0, bottom:0,
      background: dark ? "rgba(13,23,24,0.86)" : "rgba(255,255,255,0.92)",
      backdropFilter:"blur(28px) saturate(140%)",
      WebkitBackdropFilter:"blur(28px) saturate(140%)",
      borderTopLeftRadius:28, borderTopRightRadius:28,
      borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--border)",
      paddingBottom: 30,
      color: dark ? "#F8FAF9" : "var(--text)",
      ...style,
    }}>
      <div style={{display:"flex", justifyContent:"center", paddingTop:8}}>
        <div style={{width:36, height:5, borderRadius:99, background: dark? "rgba(255,255,255,0.18)":"rgba(0,0,0,0.18)"}}/>
      </div>
      {children}
    </div>
  );
}

function Pill({ children, color="teal", size="sm", style={} }) {
  const colors = {
    teal:    { bg:"#DDF8F2", fg:"#0EA587" },
    teal_d:  { bg:"rgba(17,188,155,.16)", fg:"#11BC9B" },
    dark:    { bg:"rgba(255,255,255,.08)", fg:"#F8FAF9" },
    light:   { bg:"#F1F4F3", fg:"#667277" },
    pro:     { bg:"linear-gradient(135deg,#11BC9B,#0EA587)", fg:"#fff" },
  };
  const c = colors[color];
  const small = size==="sm";
  return <span style={{
    display:"inline-flex", alignItems:"center", gap:6,
    background:c.bg, color:c.fg,
    fontSize: small? 11:13, fontWeight:600,
    padding: small ? "4px 9px" : "6px 12px",
    borderRadius:99, lineHeight:1, letterSpacing:.2,
    ...style,
  }}>{children}</span>;
}

function Button({ children, variant="primary", icon, onClick, style={}, full=true }) {
  const styles = {
    primary: { bg:"#11BC9B", fg:"#04201B", border:"none" },
    primary_dark: { bg:"#11BC9B", fg:"#04201B", border:"none" },
    dark: { bg:"#0D1718", fg:"#F8FAF9", border:"none" },
    light:{ bg:"#FFFFFF", fg:"#111827", border:"1px solid var(--border)" },
    glass:{ bg:"rgba(255,255,255,0.08)", fg:"#F8FAF9", border:"1px solid rgba(255,255,255,0.12)" },
    ghost:{ bg:"transparent", fg:"#11BC9B", border:"none" },
  };
  const s = styles[variant];
  return <button onClick={onClick} style={{
    width: full ? "100%" : "auto",
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
    height:54, borderRadius:18,
    background:s.bg, color:s.fg, border:s.border,
    fontFamily:"var(--font)", fontSize:17, fontWeight:600,
    cursor:"pointer", letterSpacing:.1,
    ...style,
  }}>{icon}{children}</button>;
}

/* Slider with rendered thumb */
function Slider({ value=50, color="#11BC9B", track="rgba(255,255,255,.16)", onChange }) {
  const [v, setV] = React.useState(value);
  React.useEffect(()=>setV(value), [value]);
  const ref = React.useRef(null);
  const drag = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const move = (clientX) => {
      const p = Math.max(0, Math.min(100, ((clientX - rect.left)/rect.width)*100));
      setV(p); onChange && onChange(p);
    };
    const onMove = (ev) => {
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      move(cx);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    move(cx);
  };
  return (
    <div ref={ref} onMouseDown={drag} onTouchStart={drag}
      style={{position:"relative", height:30, padding:"13px 0", cursor:"pointer", touchAction:"none"}}>
      <div style={{height:4, borderRadius:99, background:track, position:"relative"}}>
        <div style={{position:"absolute", left:0, top:0, height:4, borderRadius:99, background:color, width:v+"%"}}/>
      </div>
      <div style={{
        position:"absolute", top:"50%", left:`calc(${v}% - 12px)`,
        width:24, height:24, borderRadius:99, background:"#fff",
        boxShadow:"0 1px 2px rgba(0,0,0,.18), 0 4px 14px rgba(0,0,0,.16)",
        transform:"translateY(-50%)",
      }}/>
    </div>
  );
}

window.Phone = Phone;
window.Sheet = Sheet;
window.Pill = Pill;
window.Button = Button;
window.Slider = Slider;
