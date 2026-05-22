/* CleanSpeaker v2 — screen templates */
(function(){
  const ic = {
    back:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    water:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 14a3 3 0 0 0 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".6"/></svg>`,
    dust:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="1.5" fill="currentColor"/><circle cx="14" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="9" r="1.8" fill="currentColor"/><circle cx="10" cy="12" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/><circle cx="20" cy="18" r="1.3" fill="currentColor"/></svg>`,
    muffle:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 10v4M8 7v10M12 4v16M16 9v6M20 11v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    volume:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10v4h3l4 3V7L6 10H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 9c1.2 1 1.2 5 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></svg>`,
    deep:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>`,
    pause:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>`,
    play:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7V5z"/></svg>`,
    stop:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
    skip:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5l8 7-8 7V5zM15 5h3v14h-3V5z"/></svg>`,
    star:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.7l-5.4 2.8 1.2-6L3.3 9.3l6.1-.7L12 3z"/></svg>`,
    check:`<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shield:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 8v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    sound:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 8c2 2 2 6 0 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    history:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 4v5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    home:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    settings:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.5.9a7 7 0 0 0-2-1.2l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.5-.9-2 3.5L5.1 10.8A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2.1 1.6 2 3.5 2.5-.9c.6.5 1.2.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.5.9 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    droplet:`<svg width="18" height="22" viewBox="0 0 18 22" fill="none"><path d="M9 1S1 9.5 1 14a8 8 0 0 0 16 0c0-4.5-8-13-8-13z" fill="url(#dropGrad)" stroke="#5EE6FF" stroke-width="0.8"/></svg>`,
  };

  const statusbar = `
    <div class="statusbar">
      <div>9:41</div>
      <div class="punch"><div class="lens"></div></div>
      <div class="right">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M0 7h2v3H0V7zm4-2h2v5H4V5zm4-2h2v7H8V3zm4-2h2v9h-2V1z"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 4a8 8 0 0 1 12 0M3.5 6.5a4 4 0 0 1 7 0M7 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <div class="pill"></div>
      </div>
    </div>`;

  // ----- SVG helpers
  const svgDefs = `
    <defs>
      <linearGradient id="cyanDot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7BEFFF"/>
        <stop offset="1" stop-color="#2A7BFF"/>
      </linearGradient>
      <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#5EE6FF"/>
        <stop offset="1" stop-color="#9B6BFF"/>
      </linearGradient>
      <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#C5F4FF"/>
        <stop offset="1" stop-color="#2A7BFF"/>
      </linearGradient>
      <linearGradient id="splGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#5EE6FF"/>
        <stop offset="1" stop-color="#9B6BFF"/>
      </linearGradient>
      <radialGradient id="rippleGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="rgba(94,230,255,0)"/>
        <stop offset="70%" stop-color="rgba(94,230,255,0.18)"/>
        <stop offset="100%" stop-color="rgba(94,230,255,0)"/>
      </radialGradient>
    </defs>`;

  // 5-row × 11-col dot-grid speaker grille with center glow
  function grilleSvg(scale=1){
    const cols=11, rows=5, gap=14, r=4;
    const cx=(cols-1)*gap/2, cy=(rows-1)*gap/2;
    let dots="";
    for(let y=0;y<rows;y++){
      for(let x=0;x<cols;x++){
        const dx = x*gap - cx, dy = y*gap - cy;
        const dist = Math.hypot(dx,dy);
        const glow = dist < 26;
        dots += `<circle cx="${x*gap}" cy="${y*gap}" r="${r}" ${glow?'class="glowdot"':'fill="#1c2436"'}/>`;
      }
    }
    return `<g class="grille" transform="translate(20 20) scale(${scale})">${dots}</g>`;
  }

  // Animated speaker hero: dot grid + ripples + droplet + particles
  function speakerHero(){
    const W=320, H=280;
    // ripple positions
    const rip = (cls,r) => `<circle class="ripple ${cls}" cx="${W/2}" cy="${H*0.72}" r="${r}" fill="none" stroke="url(#splGrad)" stroke-width="1.4" opacity="0"/>`;
    // particles
    const parts = [
      {x:-40,y:-30},{x:55,y:-50},{x:-70,y:10},{x:80,y:0},
      {x:-25,y:-70},{x:30,y:-80},{x:-90,y:-20},{x:90,y:30}
    ].map((p,i)=>`<circle class="particle" cx="${W/2}" cy="${H*0.72}" r="1.5" fill="#5EE6FF" style="--dx:${p.x}px;--dy:${p.y}px;animation-delay:${i*200}ms"/>`).join("");

    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${svgDefs}
      ${rip("r1",26)}${rip("r2",26)}${rip("r3",26)}
      <g transform="translate(${W/2 - 70} ${H*0.72 - 28})">${grilleSvg(1)}</g>
      ${parts}
      <g class="droplet" transform="translate(${W/2} ${H*0.72 - 14})">
        <path d="M0 -22 C -8 -12 -10 -2 -10 4 a 10 10 0 0 0 20 0 C 10 -2 8 -12 0 -22 Z"
          fill="url(#dropGrad)" stroke="#5EE6FF" stroke-width="0.6"
          filter="drop-shadow(0 0 6px rgba(94,230,255,0.7))"/>
        <ellipse cx="-3" cy="-8" rx="2" ry="3" fill="rgba(255,255,255,0.6)"/>
      </g>
    </svg>`;
  }

  // Animated cleaning rig: dial + speaker grille center + ripples + droplet + particles + dbmeter
  function cleaningRig(){
    const W=320, H=320, cx=W/2, cy=H/2;
    const R=128;
    const C = 2*Math.PI*R;
    // tick marks
    let ticks="";
    for(let i=0;i<60;i++){
      const a = (i/60)*Math.PI*2 - Math.PI/2;
      const isMajor = i%5===0;
      const r1 = R + 10, r2 = R + (isMajor?20:16);
      const x1=cx+Math.cos(a)*r1, y1=cy+Math.sin(a)*r1;
      const x2=cx+Math.cos(a)*r2, y2=cy+Math.sin(a)*r2;
      ticks += `<line class="${isMajor?'major':''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }
    // ripples around speaker center
    const rip = (cls) => `<circle class="ripple ${cls}" cx="${cx}" cy="${cy+24}" r="32" fill="none" stroke="url(#splGrad)" stroke-width="1.4"/>`;
    // particles
    const parts = [
      {x:-30,y:-50},{x:40,y:-60},{x:-50,y:-30},{x:60,y:-20},
      {x:-20,y:-80},{x:25,y:-90},{x:-65,y:-50},{x:70,y:-40},
      {x:0,y:-100},{x:-45,y:-10},{x:50,y:0}
    ].map((p,i)=>`<circle class="particle" cx="${cx}" cy="${cy+24}" r="1.6" fill="#5EE6FF" style="--dx:${p.x}px;--dy:${p.y}px;animation-delay:${i*180}ms"/>`).join("");

    return `<svg class="dial" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${svgDefs}
      <circle class="track" cx="${cx}" cy="${cy}" r="${R}"/>
      <circle class="arc"   cx="${cx}" cy="${cy}" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C*0.6).toFixed(1)}"/>
      <g class="tickmarks" transform="rotate(90 ${cx} ${cy})">${ticks}</g>
    </svg>
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;pointer-events:none">
      ${rip("r1")}${rip("r2")}${rip("r3")}
      <g transform="translate(${cx-70} ${cy-4})">${grilleSvg(1)}</g>
      ${parts}
      <g class="droplet" transform="translate(${cx} ${cy+14})">
        <path d="M0 -18 C -6 -10 -8 -2 -8 3 a 8 8 0 0 0 16 0 C 8 -2 6 -10 0 -18 Z"
          fill="url(#dropGrad)" stroke="#5EE6FF" stroke-width="0.6"
          filter="drop-shadow(0 0 6px rgba(94,230,255,0.7))"/>
      </g>
    </svg>`;
  }

  // dB meter
  function dbMeter(){
    const bars = [];
    for(let i=0;i<24;i++){
      const on = i < 14;
      bars.push(`<span class="${on?'on':''}"></span>`);
    }
    return `<div class="dbmeter">${bars.join("")}</div>`;
  }

  // ===== 00 Splash =====
  const s0 = () => {
    // 6 dots on orbit at radius 60
    let dots="";
    for(let i=0;i<6;i++){
      const a = (i/6)*Math.PI*2 - Math.PI/2;
      const dx = Math.cos(a)*60, dy = Math.sin(a)*60;
      dots += `<div class="dot" style="--dx:${dx.toFixed(1)}px;--dy:${dy.toFixed(1)}px;animation-delay:${i*60}ms"></div>`;
    }
    return `
    ${statusbar}
    <div class="splash">
      <div class="splash-pulse"></div>
      <div class="splash-mark">
        <div class="orbit"></div>
        ${dots}
        <svg class="wave" viewBox="0 0 100 40">
          ${svgDefs}
          <path d="M5 20 Q 15 5, 25 20 T 45 20 T 65 20 T 85 20 T 105 20"/>
        </svg>
      </div>
      <div class="splash-word">Clean<span class="a">Speaker</span></div>
      <div class="splash-sub">Audio rescue · v2.0</div>
    </div>`;
  };

  // ===== 01 Onboarding =====
  const s1 = () => `
    ${statusbar}
    <div class="page" style="padding:0">
      <div class="hero-photo" style="margin:0;height:340px">
        <img src="assets/heroes/hero-droplet.png" alt=""/>
        <span class="livecounter" style="top:54px"><span class="ld"></span>2,431 cleaning now</span>
        <span class="badge-lab" style="top:54px">Audio Rescue Lab</span>
      </div>
      <div style="padding:0 24px 26px;display:flex;flex-direction:column;flex:1;margin-top:-30px;position:relative;z-index:2">
        <h1 class="display big">Diagnose, clean,<br/><span class="acc">restore your speaker.</span></h1>
      <p class="subtle" style="margin-top:10px">Calibrated frequency sweeps push out water, dust and debris — the same technique audio labs use, tuned for your phone.</p>
      <div class="trust-strip" style="margin-top:14px">
        <div class="item"><div class="v">4.9 ★</div><div class="l">48k reviews</div></div>
        <div class="div"></div>
        <div class="item"><div class="v">2.1M</div><div class="l">cleans run</div></div>
        <div class="div"></div>
        <div class="item"><div class="v">SGS</div><div class="l">lab-verified</div></div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="2" style="margin-top:14px">Diagnose my speaker ${ic.arrow}</button>
      <div class="tertiary">No account · Offline-ready · Won't damage your phone</div>
      </div>
    </div>`;

  // ===== 02 Problem =====
  const s2 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="1">${ic.back}</button><button class="skip mono">1/3</button></div>
      <div class="progress"><span class="on"></span><span></span><span></span></div>
      <h1 class="display">What's wrong with your speaker?</h1>
      <p class="subtle" style="margin-top:8px;margin-bottom:18px">Pick the closest issue — we'll tune the rescue plan.</p>
      <div class="option-list">
        <button class="option sel"><div class="icon">${ic.water}</div><div class="body"><div class="title">Water inside</div><div class="sub">Rain, drink, pool, sweat</div></div><div class="check">${ic.check}</div></button>
        <button class="option"><div class="icon">${ic.muffle}</div><div class="body"><div class="title">Muffled or distorted</div><div class="sub">Crackly, unclear playback</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.dust}</div><div class="body"><div class="title">Dust & lint</div><div class="sub">Pocket fuzz in the grille</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.volume}</div><div class="body"><div class="title">Low volume</div><div class="sub">Quieter than it used to be</div></div><div class="check"></div></button>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="3">Continue ${ic.arrow}</button>
    </div>`;

  // ===== 03 Urgency =====
  const s3 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="2">${ic.back}</button><button class="skip mono">2/3</button></div>
      <div class="progress"><span class="on"></span><span class="on"></span><span></span></div>
      <h1 class="display">When did it happen?</h1>
      <p class="subtle" style="margin-top:8px;margin-bottom:18px">Time matters — fresh water clears in under a minute.</p>
      <div class="option-list">
        <button class="option sel urgent"><div class="icon">${ic.info}</div><div class="body"><div class="title">Within the last hour</div><div class="sub">Critical — start cleaning now</div></div><div class="check">${ic.check}</div></button>
        <button class="option"><div class="icon">${ic.info}</div><div class="body"><div class="title">Today</div><div class="sub">Highly recoverable</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.info}</div><div class="body"><div class="title">A few days ago</div><div class="sub">Needs Deep Clean Pro</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.info}</div><div class="body"><div class="title">Not sure</div><div class="sub">Run a sound test first</div></div><div class="check"></div></button>
      </div>
      <div class="safety" style="margin-top:14px">
        <span class="ic">${ic.shield}</span>
        Power off Bluetooth headphones · place phone speaker-down on a cloth.
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="4">Build my rescue plan ${ic.arrow}</button>
    </div>`;

  // ===== 04 Plan Ready =====
  const s4 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="3">${ic.back}</button><div></div></div>
      <div class="eyebrow" style="margin-top:6px">Plan ready · Critical case</div>
      <h1 class="display big" style="margin-top:8px">Your <span class="acc">rescue protocol</span></h1>
      <div class="plan-card" style="margin-top:14px">
        <div class="plan-meta"><span class="dot"></span>4-step deep recovery · 2:40</div>
        <div class="plan-title">Water + Muffled Sound Fix</div>
        <div class="plan-steps">
          <div class="step"><div class="n">01</div>Low-freq water eject sweep<span class="meta">165 Hz · 40s</span></div>
          <div class="step"><div class="n">02</div>Mid-freq dust dislodge<span class="meta">880 Hz · 35s</span></div>
          <div class="step"><div class="n">03</div>High-freq cone reset<span class="meta">4 kHz · 45s</span></div>
          <div class="step"><div class="n">04</div>Deep Clean Pro pass<span class="meta">60 → 14k · 60s</span></div>
        </div>
      </div>
      <p class="subtle" style="margin-top:14px;text-align:center;font-size:13px">Calibrated for current iPhone & Android speaker drivers. Won't damage your phone.</p>
      <div class="spacer"></div>
      <button class="cta glow" data-go="5">Unlock rescue plan ${ic.arrow}</button>
      <div class="tertiary">Step 1 free · Steps 2–4 included with trial</div>
    </div>`;

  // ===== 05 Rating =====
  const s5 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="4">${ic.back}</button><button class="skip" data-go="6">Skip</button></div>
      <div style="text-align:center;margin-top:18px">
        <div style="display:inline-flex;width:68px;height:68px;border-radius:20px;background:linear-gradient(135deg,rgba(94,230,255,.18),rgba(42,123,255,.04));box-shadow:inset 0 0 0 1px rgba(94,230,255,.3);align-items:center;justify-content:center;color:var(--cyan);margin-bottom:18px">${ic.sound}</div>
      </div>
      <h1 class="display" style="text-align:center">Help us tune <span class="acc">your fix</span></h1>
      <p class="subtle" style="text-align:center;margin-top:10px">How confident are you before we start? Your answer makes future sweeps better for you.</p>
      <div style="display:flex;justify-content:center;gap:10px;margin:24px 0">
        ${[0,0,0,1,1].map(on => `<div style="width:48px;height:48px;border-radius:14px;${on?'color:var(--gold);background:linear-gradient(135deg,rgba(255,199,107,.18),rgba(7,10,20,.4));box-shadow:0 8px 24px -8px rgba(255,199,107,.5);border:1px solid rgba(255,199,107,.4)':'color:var(--text-3);background:var(--surface);border:1px solid var(--stroke)'};display:flex;align-items:center;justify-content:center">${ic.star}</div>`).join("")}
      </div>
      <div style="background:var(--surface);border:1px solid var(--stroke);padding:16px;border-radius:18px;font-size:13px;color:var(--text-2);line-height:1.55">
        "Cleared a glass of water from my Pixel in 90 seconds. Sound is back to crisp — felt like magic."
        <div style="display:flex;align-items:center;gap:10px;margin-top:12px;font-size:11px;color:var(--text-3)">
          <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#5EE6FF,#9B6BFF)"></div>
          Maya R. · 4 days ago · verified clean
        </div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="6">Submit & continue ${ic.arrow}</button>
      <div class="tertiary">Stored locally · Play Store review asked only after a successful clean.</div>
    </div>`;

  // ===== 06 Paywall =====
  const s6 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="5">${ic.close}</button><div></div></div>
      <div class="pw-hero">
        <img src="assets/heroes/hero-console.png" alt=""/>
        <div class="badge">★ Audio Lab verified</div>
      </div>
      <div class="eyebrow" style="margin-top:2px">One-time offer · Unlocks rescue plan</div>
      <h1 class="display" style="margin-top:6px">Unlimited <span class="acc">speaker rescues</span></h1>
      <div class="pw-features">
        <div class="pw-feat"><span class="tick">${ic.check}</span>Deep Clean Pro</div>
        <div class="pw-feat"><span class="tick">${ic.check}</span>Unlimited cycles</div>
        <div class="pw-feat"><span class="tick">${ic.check}</span>Manual Hz tuner</div>
        <div class="pw-feat"><span class="tick">${ic.check}</span>Ad-free forever</div>
      </div>
      <div class="pw-tiers">
        <div class="pw-tier featured">
          <div class="ribbon">3-day free trial</div>
          <div style="flex:1"><div class="nm">Weekly · Most popular</div><div class="ds">$0 today, then $6.99/wk</div></div>
          <div style="text-align:right"><div class="pr">FREE</div><div class="pp">cancel anytime</div></div>
        </div>
        <div class="pw-tier">
          <div style="flex:1"><div class="nm">Yearly</div><div class="ds">Save 78% · billed once</div></div>
          <div style="text-align:right"><div class="pr">$29.99</div><div class="pp">$0.58/wk</div></div>
        </div>
        <div class="pw-tier">
          <div style="flex:1"><div class="nm">Lifetime</div><div class="ds">One payment, forever</div></div>
          <div style="text-align:right"><div class="pr">$49.99</div><div class="pp">once</div></div>
        </div>
      </div>
      <button class="cta glow" data-go="7" style="margin-top:12px">Start free & begin clean ${ic.arrow}</button>
      <div class="tertiary">No charge today · <u>Restore</u> · <u>Terms</u> · <u>Privacy</u></div>
    </div>`;

  // ===== 07 Active Cleaning (A — refined) =====
  const s7 = () => `
    ${statusbar}
    <div class="page s7a">
      <div class="topbar">
        <button class="icon-btn" data-go="6">${ic.back}</button>
        <div class="mono kicker7">DEEP CLEAN · STAGE 02/03</div>
        <button class="icon-btn">${ic.info}</button>
      </div>
      <div class="rig">
        <div class="rig-glow"></div>
        ${cleaningRig()}
        <div class="rig-center">
          <div class="rig-hz mono">880<span class="u">Hz</span></div>
          <div class="rig-phase">Mid-freq dust sweep</div>
          <div class="rig-time mono">01 : 24 remaining</div>
        </div>
        ${dbMeter()}
      </div>
      <div class="stage-row">
        <div class="stage-chip done"><div class="n">${ic.check}</div>Water</div>
        <div class="stage-chip active"><div class="n">02</div>Dust</div>
        <div class="stage-chip"><div class="n">03</div>Cone</div>
      </div>
      <div class="control-row">
        <button class="ctrl" title="Skip stage">${ic.skip}</button>
        <button class="ctrl primary" title="Pause">${ic.pause}</button>
        <button class="ctrl danger" title="Hold to stop">${ic.stop}</button>
      </div>
      <div class="safety">
        <span class="ic">${ic.shield}</span>
        Volume locked at safe level · keep phone speaker-down
      </div>
      <div class="spacer"></div>
      <a class="microlink" data-go="8">jump to result preview ${ic.arrow}</a>
    </div>`;

  // ----- Shared bits for v7B / v7C
  // live waveform bars (heights cycle via CSS keyframes per-index)
  function liveWave(count=42){
    const bars = [];
    for (let i=0;i<count;i++){
      const phase = (i/count)*Math.PI*2;
      const base = 22 + Math.sin(phase*3)*18 + Math.sin(phase*7)*8;
      bars.push(`<span style="--h:${Math.max(8,Math.abs(base)).toFixed(0)}px;--d:${(i*40)%1600}ms"></span>`);
    }
    return `<div class="livewave">${bars.join("")}</div>`;
  }
  // 3-stage timeline with elapsed/remaining
  function stageTimeline(activeIdx, elapsed){
    const stages = [
      {n:"01", t:"Water eject",  hz:"165 Hz", d:40},
      {n:"02", t:"Dust dislodge",hz:"880 Hz", d:35},
      {n:"03", t:"Cone reset",   hz:"4 kHz", d:45},
    ];
    return `<div class="timeline">${stages.map((s,i)=>{
      const state = i<activeIdx?"done":(i===activeIdx?"now":"queue");
      const pct = i<activeIdx?100:(i===activeIdx?elapsed:0);
      return `<div class="tl-row ${state}">
        <div class="tl-n mono">${state==="done"?ic.check:s.n}</div>
        <div class="tl-body">
          <div class="tl-h"><span>${s.t}</span><b class="mono">${s.hz} · ${s.d}s</b></div>
          <div class="tl-bar"><i style="width:${pct}%"></i></div>
        </div>
      </div>`;
    }).join("")}</div>`;
  }

  // ===== 07B Active Cleaning · Interactive Console =====
  const s7b = () => `
    ${statusbar}
    <div class="page s7b">
      <div class="topbar">
        <button class="icon-btn" data-go="6">${ic.back}</button>
        <div class="pill-rec"><span class="rdot"></span>LIVE · 880 Hz</div>
        <button class="icon-btn">${ic.info}</button>
      </div>

      <div class="console">
        <div class="console-head">
          <div>
            <div class="ck">Mid-freq sweep · stage 02 / 03</div>
            <div class="ch mono">11.4<span class="u">ml ejected</span></div>
          </div>
          <div class="ring">
            <svg viewBox="0 0 80 80" width="64" height="64">
              <defs>
                <linearGradient id="ringG7b" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#5EE6FF"/><stop offset="1" stop-color="#9B6BFF"/>
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="6"/>
              <circle class="ring-arc" cx="40" cy="40" r="32" fill="none" stroke="url(#ringG7b)"
                stroke-width="6" stroke-linecap="round"
                stroke-dasharray="201.06" stroke-dashoffset="80"
                transform="rotate(-90 40 40)"/>
            </svg>
            <div class="ring-pct mono">60<span>%</span></div>
          </div>
        </div>

        ${liveWave()}

        <div class="readouts">
          <div class="ro"><div class="lb">FREQ</div><div class="vl mono">880 <i>Hz</i></div></div>
          <div class="ro"><div class="lb">AMPL</div><div class="vl mono">-12 <i>dB</i></div></div>
          <div class="ro"><div class="lb">ELAPSED</div><div class="vl mono">00:21 <i>/35s</i></div></div>
        </div>
      </div>

      ${stageTimeline(1, 60)}

      <div class="alert">
        <span class="ic">${ic.info}</span>
        <div><b>AirPods Pro connected.</b> Speaker output disabled — disconnect to continue.</div>
        <button class="ax">Disconnect</button>
      </div>

      <div class="spacer"></div>

      <div class="hold-row">
        <button class="ctrl">${ic.skip}</button>
        <button class="ctrl primary big">${ic.pause}<span>Pause sweep</span></button>
        <button class="hold-stop">
          <span class="hsfill"></span>
          <span class="hslabel">Hold to stop</span>
        </button>
      </div>
    </div>`;

  // ===== 07C Active Cleaning · Zen / breathing =====
  const s7c = () => {
    const drops = Array.from({length:18}, (_,i)=>{
      const x = 30 + Math.random()*40, dly = (i*220)%4400, dur = 4400 + Math.random()*1800;
      return `<i style="left:${x.toFixed(1)}%;--dur:${dur.toFixed(0)}ms;animation-delay:${dly}ms"></i>`;
    }).join("");
    return `
    ${statusbar}
    <div class="page s7c">
      <div class="topbar">
        <button class="icon-btn" data-go="6">${ic.back}</button>
        <div class="zen-kicker">02 / 03 · 01:24</div>
        <button class="icon-btn">${ic.info}</button>
      </div>

      <div class="zen-stage">
        <div class="orb">
          <div class="orb-aura"></div>
          <div class="orb-core"></div>
          <div class="orb-ring r1"></div>
          <div class="orb-ring r2"></div>
          <div class="orb-ring r3"></div>
          <div class="orb-readout">
            <div class="hz mono">880<span>Hz</span></div>
            <div class="ph">breathe with sweep</div>
          </div>
        </div>
        <div class="steam">${drops}</div>
      </div>

      <div class="zen-meta">
        <div class="lb">Dust dislodge · mid-freq</div>
        <div class="zhint">Tap anywhere to pause · long-press to abort</div>
      </div>

      <div class="zen-progress">
        <span class="seg done"></span>
        <span class="seg active"><i></i></span>
        <span class="seg"></span>
      </div>

      <div class="zen-controls">
        <button class="zbtn">${ic.skip}</button>
        <button class="zbtn primary">${ic.pause}</button>
        <button class="zbtn">${ic.stop}</button>
      </div>
    </div>`;
  };

  // ===== 08 Result =====
  const s8 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="7">${ic.back}</button><div></div></div>
      <div class="row" style="margin-top:4px;gap:12px">
        <div style="width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,rgba(167,248,107,.22),rgba(34,181,224,.05));box-shadow:inset 0 0 0 1px rgba(167,248,107,.34);display:flex;align-items:center;justify-content:center;color:var(--lime)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <div class="eyebrow" style="color:var(--lime)">Clean complete</div>
          <div style="font-size:13px;color:var(--text-2);margin-top:2px" class="mono">2:38 · 3 stages run · 12 ml ejected</div>
        </div>
      </div>
      <div class="result-hero">
        <img src="assets/heroes/result-split.png" alt=""/>
        <span class="tagL">Before</span><span class="tagR">After</span>
      </div>
      <div class="result-card">
        <div class="ulbl">Sound clarity restored</div>
        <div class="big">+42%</div>
        <div class="cmp-wave after" style="margin-top:10px">
          ${[28,55,72,90,65,48,82,95,72,55,38,62,88,98,72,55,30,48,72,95,82,55,38,28].map(h=>`<span style="height:${h}%"></span>`).join("")}
        </div>
      </div>
      <div class="cmp-grid">
        <div class="cmp-col"><div class="lb">Before</div><div class="v">58 <span style="font-size:13px;color:var(--text-3)">dB</span></div></div>
        <div class="cmp-col after"><div class="lb">After</div><div class="v">82 <span style="font-size:13px;color:var(--text-3)">dB</span></div></div>
      </div>
      <p class="subtle" style="text-align:center;margin-top:14px;font-size:12.5px">Play a sound test to confirm. If anything still sounds off, run a Deep Clean Pro pass.</p>
      <div class="spacer"></div>
      <button class="cta glow" data-go="9">Run sound test ${ic.sound.replace('width="20" height="20"','width="16" height="16"')}</button>
      <button class="cta ghost" style="margin-top:10px" data-go="9">Done — go home</button>
    </div>`;

  // ===== 09 Home =====
  const s9 = () => `
    ${statusbar}
    <div class="page" style="padding-bottom:92px">
      <div class="home-hello">
        <div>
          <div class="eyebrow">Good morning</div>
          <div class="h1">Speaker is <span class="g">healthy</span></div>
        </div>
        <button class="icon-btn">${ic.settings}</button>
      </div>
      <div class="statcard">
        <div class="lab">Last clean · 6h ago</div>
        <div class="tt">Deep Clean Pro</div>
        <div class="mt mono">+42% clarity · 3 stages · 2:38</div>
        <svg class="vis" viewBox="0 0 130 60">
          ${[20,38,55,72,90,65,48,82,95,72,55,38,62,88,98,72,55,30,48,72,95].map((h,i)=>`<rect x="${i*6+2}" y="${60-h*0.55}" width="3" height="${h*0.55}" rx="1.5" fill="url(#dialGrad)" filter="drop-shadow(0 0 4px rgba(94,230,255,.5))"/>`).join("")}
          <defs><linearGradient id="dialGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5EE6FF"/><stop offset="1" stop-color="#2A7BFF"/></linearGradient></defs>
        </svg>
      </div>
      <div class="tinytitle">Quick rescue</div>
      <div class="tile-grid">
        <button class="tile" data-go="7"><div class="ic">${ic.water}</div><div><div class="nm">Water Eject</div><div class="sm mono">~40s · low-freq sweep</div></div></button>
        <button class="tile" data-go="7"><div class="ic">${ic.dust}</div><div><div class="nm">Dust Clean</div><div class="sm mono">~35s · mid sweep</div></div></button>
        <button class="tile pro" data-go="7" style="position:relative"><div class="pill-pro">Pro</div><div class="ic">${ic.deep}</div><div><div class="nm">Deep Clean Pro</div><div class="sm mono">3 stages · ~2:30</div></div></button>
        <button class="tile" data-go="7"><div class="ic">${ic.muffle}</div><div><div class="nm">Manual Hz</div><div class="sm mono">60 Hz – 20 kHz</div></div></button>
      </div>
      <div class="tinytitle">Diagnostics</div>
      <div class="option-list">
        <button class="option" data-go="8"><div class="icon">${ic.sound}</div><div class="body"><div class="title">Sound Test</div><div class="sub">Check stereo & clarity</div></div><div class="check" style="border:none;color:var(--text-3)">${ic.arrow}</div></button>
        <button class="option"><div class="icon">${ic.history}</div><div class="body"><div class="title">History</div><div class="sub">12 sessions · last 6h ago</div></div><div class="check" style="border:none;color:var(--text-3)">${ic.arrow}</div></button>
      </div>
      <div class="tabbar">
        <button class="t on">${ic.home}<span>Home</span></button>
        <button class="t">${ic.sound}<span>Test</span></button>
        <button class="t">${ic.history}<span>History</span></button>
        <button class="t">${ic.settings}<span>Settings</span></button>
      </div>
    </div>`;

  const screens = {
    0:{title:"Splash",            note:"Animated brand reveal · 1.6s",   html:s0},
    1:{title:"Onboarding",        note:"Speaker hero + droplet",         html:s1},
    2:{title:"Problem Selection", note:"4 symptoms · refined",           html:s2},
    3:{title:"Urgency",           note:"Time-based personalization",     html:s3},
    4:{title:"Rescue Plan Ready", note:"4-step protocol",                html:s4},
    5:{title:"Internal Rating",   note:"Lightweight social proof",       html:s5},
    6:{title:"Paywall · Pro",     note:"Console hero + 3 tiers",         html:s6},
    7:{title:"Active Cleaning · A",   note:"Refined dial rig",            html:s7},
    8:{title:"Result",            note:"+42% hero · dB compare",         html:s8},
    9:{title:"Home (Returning)",  note:"Stat card · quick rescue",       html:s9},
    "7b":{title:"Active Cleaning · B", note:"Interactive console · hold-to-stop · AirPods alert", html:s7b},
    "7c":{title:"Active Cleaning · C", note:"Zen breathing · steam particles · tap-to-pause",      html:s7c},
  };
  window.CleanSpeakerV2 = { screens, ic };
})();
