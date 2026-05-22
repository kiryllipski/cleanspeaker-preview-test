function Onboarding(){
  const [splitPct, setSplitPct] = React.useState(52);
  const drag = (e)=>{
    const card = e.currentTarget.closest("[data-hero]");
    if(!card) return;
    const rect = card.getBoundingClientRect();
    const move = (cx)=>{
      const p = Math.max(8, Math.min(92, ((cx - rect.left)/rect.width)*100));
      setSplitPct(p);
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
    <div style={{
      position:"absolute", inset:0,
      background:"var(--light)",
      paddingTop:54,
      display:"flex", flexDirection:"column",
    }}>
      {/* Pagination dots */}
      <div style={{display:"flex", justifyContent:"center", gap:6, padding:"14px 0 8px"}}>
        <div style={{width:24, height:5, borderRadius:99, background:"#11BC9B"}}/>
        <div style={{width:5, height:5, borderRadius:99, background:"#CFD7D5"}}/>
        <div style={{width:5, height:5, borderRadius:99, background:"#CFD7D5"}}/>
      </div>

      {/* Hero before/after */}
      <div data-hero style={{
        margin:"10px 24px 22px",
        height:430, borderRadius:28, overflow:"hidden",
        position:"relative",
        boxShadow:"0 30px 60px -20px rgba(8,16,18,.18), 0 8px 30px rgba(8,16,18,.06)",
        background:"#0D1718",
        userSelect:"none",
      }}>
        <Photo kind="street" />
        {/* Right side = blurred (AFTER) */}
        <div style={{
          position:"absolute", inset:0,
          clipPath:`inset(0 0 0 ${splitPct}%)`,
        }}>
          <Photo kind="street" filter="blur(14px) saturate(1.05)" />
          {/* Privacy redactions on the AFTER side */}
          <PhotoRedactions />
        </div>

        {/* Labels */}
        <div style={{
          position:"absolute", left:14, top:14,
          background:"rgba(13,23,24,.6)", color:"#F8FAF9",
          fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:99,
          letterSpacing:.4, textTransform:"uppercase",
          backdropFilter:"blur(10px)",
        }}>Before</div>
        <div style={{
          position:"absolute", right:14, top:14,
          background:"rgba(17,188,155,.92)", color:"#04201B",
          fontSize:11, fontWeight:700, padding:"5px 10px", borderRadius:99,
          letterSpacing:.4, textTransform:"uppercase",
        }}>After</div>

        {/* Slider handle */}
        <div onMouseDown={drag} onTouchStart={drag} style={{
          position:"absolute", top:0, bottom:0,
          left:`calc(${splitPct}% - 1px)`, width:2, background:"#fff",
          boxShadow:"0 0 12px rgba(0,0,0,.4)",
          touchAction:"none", cursor:"ew-resize",
        }}>
          <div style={{
            position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
            width:42, height:42, borderRadius:99, background:"#fff",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 6px 20px rgba(0,0,0,.25)",
            color:"#0D1718",
          }}><Ico.Arrows s={20}/></div>
        </div>
      </div>

      {/* Headline */}
      <div style={{padding:"0 28px"}}>
        <div style={{
          fontSize:30, fontWeight:700, lineHeight:1.1, color:"#0D1718",
          letterSpacing:-.6,
        }}>Blur what should<br/>stay <span style={{color:"#0EA587"}}>private.</span></div>
        <div style={{
          marginTop:12, color:"#667277", fontSize:15.5, lineHeight:1.5,
        }}>Hide faces, backgrounds, addresses, and<br/>objects before sharing.</div>
      </div>

      <div style={{flex:1}}/>

      {/* CTAs */}
      <div style={{padding:"0 24px 30px"}}>
        <Button variant="primary" onClick={()=>window.__nav("home")}>Start editing</Button>
        <button onClick={()=>window.__nav("editor")} style={{
          marginTop:10, width:"100%", height:50,
          background:"transparent", border:"none", color:"#667277",
          fontFamily:"var(--font)", fontSize:15.5, fontWeight:500, cursor:"pointer",
        }}>Try sample photo</button>
      </div>
    </div>
  );
}
window.Onboarding = Onboarding;

/* ============== Photo asset ============== */
/* SVG-rendered photographic scene so the prototype works offline.
   Different "kinds" depict typical privacy-sensitive scenes. */

function Photo({ kind="street", filter, mask, style }){
  const Inner = {
    street: <StreetScene/>,
    portrait: <PortraitScene/>,
    product: <ProductScene/>,
    doorstep: <DoorstepScene/>,
    bokeh: <BokehScene/>,
  }[kind] || <StreetScene/>;

  return (
    <div style={{
      position:"absolute", inset:0,
      filter, ...style,
    }}>
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
        style={{width:"100%", height:"100%", display:"block"}}>
        {Inner}
      </svg>
      {mask}
    </div>
  );
}
window.Photo = Photo;

function StreetScene(){
  return (
    <g>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9D6BD"/>
          <stop offset="60%" stopColor="#C9A892"/>
          <stop offset="100%" stopColor="#7A6E68"/>
        </linearGradient>
        <linearGradient id="bldgL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E3328"/>
          <stop offset="100%" stopColor="#2A221B"/>
        </linearGradient>
        <linearGradient id="bldgR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#574131"/>
          <stop offset="100%" stopColor="#322419"/>
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#574437"/>
          <stop offset="100%" stopColor="#1F1612"/>
        </linearGradient>
        <radialGradient id="haze" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="rgba(255,220,170,0.55)"/>
          <stop offset="100%" stopColor="rgba(255,220,170,0)"/>
        </radialGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8B69A"/><stop offset="100%" stopColor="#B97D5E"/>
        </linearGradient>
        <linearGradient id="coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A1F1F"/><stop offset="100%" stopColor="#4A0F0F"/>
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A2820"/><stop offset="100%" stopColor="#1B1310"/>
        </linearGradient>
        <linearGradient id="car" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23252A"/><stop offset="100%" stopColor="#0E1014"/>
        </linearGradient>
      </defs>
      {/* sky */}
      <rect width="600" height="800" fill="url(#sky)"/>
      {/* sun haze */}
      <rect width="600" height="800" fill="url(#haze)"/>
      {/* buildings */}
      <polygon points="0,140 230,80 230,520 0,520" fill="url(#bldgL)"/>
      <polygon points="370,80 600,140 600,520 370,520" fill="url(#bldgR)"/>
      {/* windows L */}
      {Array.from({length:5}).map((_,r)=>Array.from({length:4}).map((_,c)=>(
        <rect key={`L${r}${c}`} x={20+c*52} y={170+r*60} width={32} height={26} rx={2}
          fill="rgba(245,210,160,.36)"/>
      )))}
      {/* windows R */}
      {Array.from({length:5}).map((_,r)=>Array.from({length:4}).map((_,c)=>(
        <rect key={`R${r}${c}`} x={400+c*52} y={170+r*60} width={32} height={26} rx={2}
          fill="rgba(245,210,160,.36)"/>
      )))}
      {/* ground */}
      <rect y="520" width="600" height="280" fill="url(#ground)"/>
      {/* road lines */}
      <rect y="555" width="600" height="3" fill="rgba(255,220,180,.18)"/>
      {/* parked car w/ visible plate */}
      <g transform="translate(380,520)">
        <rect x="0" y="0" width="200" height="120" rx="22" fill="url(#car)"/>
        <rect x="14" y="22" width="172" height="40" rx="8" fill="#13161A" stroke="rgba(255,255,255,.06)"/>
        <rect x="60" y="92" width="80" height="24" rx="4" fill="#F1E7C8"/>
        <text x="100" y="110" fontFamily="monospace" fontSize="16" fontWeight="700"
          textAnchor="middle" fill="#0D1718" letterSpacing="2">7K2 8FL</text>
        <circle cx="40" cy="130" r="14" fill="#0a0c0d"/>
        <circle cx="160" cy="130" r="14" fill="#0a0c0d"/>
      </g>
      {/* person in foreground */}
      <g transform="translate(180,250)">
        {/* body coat */}
        <path d="M40,180 C 0,260 -10,420 0,560 L 240,560 C 250,420 240,260 200,180 L 40,180 Z"
          fill="url(#coat)"/>
        {/* neck */}
        <rect x="100" y="160" width="40" height="40" fill="url(#skin)"/>
        {/* head */}
        <ellipse cx="120" cy="120" rx="60" ry="72" fill="url(#skin)"/>
        {/* hair */}
        <path d="M60,90 C 60,40 180,40 180,90 C 188,110 188,140 178,150 C 178,90 62,90 62,150 C 52,140 52,110 60,90 Z"
          fill="url(#hair)"/>
        {/* eyes */}
        <ellipse cx="100" cy="118" rx="5" ry="3" fill="#1A1310"/>
        <ellipse cx="140" cy="118" rx="5" ry="3" fill="#1A1310"/>
        {/* mouth */}
        <path d="M105,150 Q120,158 135,150" stroke="#5C2820" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* coffee cup */}
        <g transform="translate(170,300) rotate(-8)">
          <rect width="38" height="56" rx="4" fill="#FFFFFF"/>
          <rect width="38" height="14" fill="#7A4A30"/>
          <rect x="-3" y="14" width="44" height="6" fill="#3A1F12"/>
        </g>
      </g>
      {/* small text-like passers-by far away */}
      <rect x="40" y="540" width="48" height="60" rx="14" fill="rgba(0,0,0,.45)"/>
      <rect x="100" y="555" width="32" height="40" rx="10" fill="rgba(0,0,0,.4)"/>
    </g>
  );
}

function PortraitScene(){
  return (
    <g>
      <defs>
        <radialGradient id="pBg" cx="60%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#3D5C66"/>
          <stop offset="100%" stopColor="#0F1A1F"/>
        </radialGradient>
        <linearGradient id="pSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0C9AE"/><stop offset="100%" stopColor="#A86C4E"/>
        </linearGradient>
        <linearGradient id="pHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C3A28"/><stop offset="100%" stopColor="#241510"/>
        </linearGradient>
        <linearGradient id="pShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2D7C6"/><stop offset="100%" stopColor="#A19783"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#pBg)"/>
      {/* bokeh circles */}
      {[
        [80,120,60,0.18],[120,520,80,0.14],[480,220,90,0.16],[520,640,70,0.12],
        [60,720,50,0.2],[300,80,40,0.18],[380,720,55,0.14],
      ].map(([x,y,r,a],i)=>(
        <circle key={i} cx={x} cy={y} r={r} fill={`rgba(255,236,196,${a})`}/>
      ))}
      {/* shoulders */}
      <path d="M0,800 L 0,640 C 100,540 240,520 300,520 C 360,520 500,540 600,640 L 600,800 Z"
        fill="url(#pShirt)"/>
      {/* neck */}
      <rect x="265" y="430" width="70" height="100" fill="url(#pSkin)"/>
      {/* head */}
      <ellipse cx="300" cy="370" rx="120" ry="140" fill="url(#pSkin)"/>
      {/* hair */}
      <path d="M180,290 C 180,200 420,200 420,290 C 440,330 440,370 410,380 C 410,280 190,280 190,380 C 160,370 160,330 180,290 Z"
        fill="url(#pHair)"/>
      {/* features */}
      <ellipse cx="262" cy="360" rx="9" ry="5" fill="#241510"/>
      <ellipse cx="338" cy="360" rx="9" ry="5" fill="#241510"/>
      <path d="M280,420 Q300,432 320,420" stroke="#7C3A28" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </g>
  );
}

function ProductScene(){
  return (
    <g>
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A57B"/><stop offset="100%" stopColor="#7B5634"/>
        </linearGradient>
        <linearGradient id="leather" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C4F2C"/><stop offset="100%" stopColor="#3F2614"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#wood)"/>
      {/* wood grain */}
      {Array.from({length:14}).map((_,i)=>(
        <rect key={i} y={i*60} width="600" height="2" fill="rgba(0,0,0,.06)"/>
      ))}
      {/* shadow */}
      <ellipse cx="300" cy="540" rx="200" ry="22" fill="rgba(0,0,0,.32)"/>
      {/* leather bag */}
      <rect x="140" y="280" width="320" height="240" rx="32" fill="url(#leather)"/>
      <path d="M 200 280 Q 200 200 300 200 Q 400 200 400 280" stroke="#3F2614" strokeWidth="14" fill="none"/>
      <rect x="280" y="380" width="40" height="50" rx="6" fill="#2A1607"/>
      <circle cx="300" cy="405" r="4" fill="#E2C58F"/>
      {/* notebook */}
      <rect x="60" y="600" width="220" height="40" rx="6" fill="#1A1310"/>
      <rect x="60" y="600" width="220" height="6" fill="#E2C58F"/>
      {/* key */}
      <g transform="translate(420,620) rotate(-15)">
        <circle cx="0" cy="0" r="20" fill="#9C7A3A" stroke="#5A4520" strokeWidth="3"/>
        <rect x="14" y="-4" width="60" height="8" fill="#9C7A3A"/>
      </g>
    </g>
  );
}

function DoorstepScene(){
  return (
    <g>
      <defs>
        <linearGradient id="door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C4A4A"/><stop offset="100%" stopColor="#15292A"/>
        </linearGradient>
        <linearGradient id="wallD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9CFC0"/><stop offset="100%" stopColor="#9D9079"/>
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#wallD)"/>
      {/* bricks pattern */}
      {Array.from({length:20}).map((_,r)=>Array.from({length:8}).map((_,c)=>(
        <rect key={`b${r}${c}`} x={c*78 + (r%2?38:0)} y={r*42}
          width={76} height={40} fill="none"
          stroke="rgba(0,0,0,.06)"/>
      )))}
      {/* door */}
      <rect x="160" y="180" width="280" height="500" rx="6" fill="url(#door)"/>
      <rect x="180" y="200" width="240" height="220" rx="4" fill="rgba(255,255,255,.04)"/>
      <rect x="180" y="440" width="240" height="220" rx="4" fill="rgba(255,255,255,.04)"/>
      <circle cx="400" cy="430" r="6" fill="#C8A876"/>
      {/* number plaque */}
      <rect x="280" y="120" width="120" height="46" rx="6" fill="#E8DCC4"/>
      <text x="340" y="153" fontFamily="serif" fontSize="30" fontWeight="700"
        textAnchor="middle" fill="#1A1310">2841</text>
      {/* package */}
      <rect x="220" y="640" width="160" height="100" rx="4" fill="#C9A57B"/>
      <rect x="220" y="680" width="160" height="2" fill="rgba(0,0,0,.18)"/>
      <rect x="240" y="660" width="60" height="14" fill="#fff"/>
    </g>
  );
}

function BokehScene(){
  return (
    <g>
      <defs>
        <radialGradient id="bk" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#395C66"/><stop offset="100%" stopColor="#0F1A1F"/>
        </radialGradient>
      </defs>
      <rect width="600" height="800" fill="url(#bk)"/>
      {Array.from({length:24}).map((_,i)=>{
        const x = (i*73)%600 + (i%3)*20;
        const y = (i*97)%800;
        const r = 30 + (i%5)*16;
        const a = 0.06 + (i%4)*0.04;
        return <circle key={i} cx={x} cy={y} r={r} fill={`rgba(255,236,196,${a})`}/>;
      })}
    </g>
  );
}

window.StreetScene = StreetScene;
window.PortraitScene = PortraitScene;
window.ProductScene = ProductScene;
window.DoorstepScene = DoorstepScene;
window.BokehScene = BokehScene;

function PhotoRedactions(){
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice"
      style={{position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none"}}>
      {/* Face redaction (mosaic) */}
      <g transform="translate(245,330)">
        {Array.from({length:5}).map((_,r)=>Array.from({length:5}).map((_,c)=>(
          <rect key={`m${r}${c}`} x={c*22} y={r*22} width={20} height={20}
            fill={["#A38166","#7C5F4A","#C8A286","#5E4633","#9B7758"][((r+c)*3+r)%5]}/>
        )))}
      </g>
      {/* License plate redaction (solid) */}
      <rect x="438" y="610" width="84" height="26" rx="4" fill="#0D1718"/>
      <rect x="438" y="610" width="84" height="26" rx="4" fill="rgba(17,188,155,0.0)" stroke="#11BC9B" strokeWidth="0"/>
    </svg>
  );
}
window.PhotoRedactions = PhotoRedactions;
