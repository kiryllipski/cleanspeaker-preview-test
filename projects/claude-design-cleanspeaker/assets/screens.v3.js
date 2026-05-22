/* CleanSpeaker v3 — Zen Console
   One focal element per screen. No duplicated state. Hairline progress everywhere. */
(function(){
  const ic = {
    back:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    arrow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    check:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 8v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    settings:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.5.9a7 7 0 0 0-2-1.2l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.5-.9-2 3.5L5.1 10.8A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2.1 1.6 2 3.5 2.5-.9c.6.5 1.2.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.5.9 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    home:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    sound:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 8c2 2 2 6 0 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    history:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 4v5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    water:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    dust:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="1.3" fill="currentColor"/><circle cx="14" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="9" r="1.6" fill="currentColor"/><circle cx="10" cy="12" r="1.1" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/></svg>`,
    muffle:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 10v4M8 7v10M12 4v16M16 9v6M20 11v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    volume:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10v4h3l4 3V7L6 10H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 9c1.2 1 1.2 5 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></svg>`,
    deep:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>`,
    clock:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    pause:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>`,
    stop:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
    skip:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5l8 7-8 7V5zM15 5h3v14h-3V5z"/></svg>`,
    star:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.7l-5.4 2.8 1.2-6L3.3 9.3l6.1-.7L12 3z"/></svg>`,
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

  // ----- shared orb (size in px via --orb on parent)
  const orb = (inner="") => `
    <div class="orb">
      <div class="aura"></div>
      <div class="core"></div>
      <div class="ring r1"></div>
      <div class="ring r2"></div>
      <div class="ring r3"></div>
      <div class="label">${inner}</div>
    </div>`;

  // ----- topbar with back + optional kicker + optional right
  const topbar = (opts={}) => {
    const back   = opts.back   ?? `<button class="icon-btn" data-go="${opts.backTo??""}">${ic.back}</button>`;
    const center = opts.center ?? `<div></div>`;
    const right  = opts.right  ?? `<div style="width:40px"></div>`;
    return `<div class="topbar">${back}${center}${right}</div>`;
  };

  // hairline progress (n total, idx current 0-based)
  const hairline = (n, idx) => `<div class="hairline">${Array.from({length:n},(_,i)=>`<span class="${i<=idx?"on":""}"></span>`).join("")}</div>`;

  // ====== 00 Splash ======
  const s0 = () => `
    ${statusbar}
    <div class="splash">
      <div style="--orb:170px">${orb("")}</div>
      <div>
        <div class="wordmark">Clean<span class="a">Speaker</span></div>
        <div class="sub">Audio rescue</div>
      </div>
    </div>`;

  // ====== 01 Onboarding ======
  const s1 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar">
        <div class="brand-dot"></div>
        <div class="kicker-mono">v3 · zen</div>
        <div style="width:40px"></div>
      </div>
      <div class="onb-hero" style="--orb:200px">${orb("")}</div>
      <h1 class="display big">Restore your<br/>speaker. Calmly.</h1>
      <p class="subtle" style="margin-top:12px">Calibrated frequency sweeps push out water and dust — the same method audio labs use, tuned for your phone.</p>
      <div class="spacer"></div>
      <div class="onb-meta">
        <div><b>4.9 ★</b> · 48k</div>
        <div class="div"></div>
        <div><b>2.1M</b> · cleans</div>
        <div class="div"></div>
        <div><b>SGS</b> · verified</div>
      </div>
      <button class="cta" data-go="2" style="margin-top:14px">Diagnose my speaker ${ic.arrow}</button>
    </div>`;

  // ====== 02 Problem ======
  const s2 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:1, center:`<div class="kicker-mono">1 / 3</div>`})}
      ${hairline(3, 0)}
      <h1 class="display">What's wrong?</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:22px">Pick the closest — we'll tune the rescue plan.</p>
      <div class="options">
        <button class="opt sel"><div class="ic">${ic.water}</div><div class="body"><div class="t">Water inside</div><div class="s">Rain, drink, pool</div></div><div class="dot">${ic.check}</div></button>
        <button class="opt"><div class="ic">${ic.muffle}</div><div class="body"><div class="t">Muffled or distorted</div></div><div class="dot"></div></button>
        <button class="opt"><div class="ic">${ic.dust}</div><div class="body"><div class="t">Dust & lint</div></div><div class="dot"></div></button>
        <button class="opt"><div class="ic">${ic.volume}</div><div class="body"><div class="t">Low volume</div></div><div class="dot"></div></button>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="3">Continue ${ic.arrow}</button>
    </div>`;

  // ====== 03 Urgency ======
  const s3 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:2, center:`<div class="kicker-mono">2 / 3</div>`})}
      ${hairline(3, 1)}
      <h1 class="display">When did it happen?</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:22px">Time matters — fresh water clears in under a minute.</p>
      <div class="options">
        <button class="opt urgent sel"><div class="ic">${ic.clock}</div><div class="body"><div class="t">Within the last hour</div><div class="s">Critical · start now</div></div><div class="dot">${ic.check}</div></button>
        <button class="opt"><div class="ic">${ic.clock}</div><div class="body"><div class="t">Today</div></div><div class="dot"></div></button>
        <button class="opt"><div class="ic">${ic.clock}</div><div class="body"><div class="t">A few days ago</div></div><div class="dot"></div></button>
        <button class="opt"><div class="ic">${ic.clock}</div><div class="body"><div class="t">Not sure</div></div><div class="dot"></div></button>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="4">Build my plan ${ic.arrow}</button>
      <div class="tertiary">Power off Bluetooth · place phone speaker-down on cloth</div>
    </div>`;

  // ====== 04 Plan Ready ======
  const s4 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:3})}
      ${hairline(3, 2)}
      <div class="eyebrow">Plan ready · critical case</div>
      <h1 class="display big" style="margin-top:8px">Your rescue protocol</h1>
      <div class="plan-list">
        <div class="row"><div class="n">01</div><div class="t">Low-freq water eject</div><div class="m">165 Hz · 40s</div></div>
        <div class="row"><div class="n">02</div><div class="t">Mid-freq dust dislodge</div><div class="m">880 Hz · 35s</div></div>
        <div class="row"><div class="n">03</div><div class="t">High-freq cone reset</div><div class="m">4 kHz · 45s</div></div>
        <div class="row"><div class="n">04</div><div class="t">Deep Clean Pro pass</div><div class="m">60 → 14k · 60s</div></div>
      </div>
      <div class="plan-summary">
        <div>Total run time</div>
        <div class="v">2:40 · 4 stages</div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="5">Unlock rescue plan ${ic.arrow}</button>
      <div class="tertiary">Calibrated for current iPhone & Android · won't damage your phone</div>
    </div>`;

  // ====== 05 Rating ======
  const s5 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:4, right:`<button class="microlink" data-go="6" style="padding:8px 0">Skip</button>`})}
      <h1 class="display" style="text-align:center;margin-top:28px">How are we doing?</h1>
      <p class="subtle" style="text-align:center;margin-top:10px">Your answer makes future sweeps better for you.</p>
      <div class="stars">
        <div class="star on">${ic.star}</div>
        <div class="star on">${ic.star}</div>
        <div class="star on">${ic.star}</div>
        <div class="star on">${ic.star}</div>
        <div class="star">${ic.star}</div>
      </div>
      <p class="quote">
        "Cleared a glass of water from my Pixel in 90 seconds. Sound is back to crisp."
        <span class="att">Maya R. · verified clean</span>
      </p>
      <div class="spacer"></div>
      <button class="cta" data-go="6">Submit & continue ${ic.arrow}</button>
    </div>`;

  // ====== 06 Paywall ======
  const s6 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({back:`<button class="icon-btn" data-go="5">${ic.close}</button>`})}
      <div class="pw-orb" style="--orb:140px">${orb("")}</div>
      <div class="pw-title-row">
        <h1 class="display big">Unlimited<br/>speaker rescues</h1>
        <div class="pw-badge">Lab verified</div>
      </div>
      <div class="tiers">
        <div class="tier featured">
          <div class="ribbon">3-day free trial</div>
          <div class="l">
            <div class="nm">Weekly · most popular</div>
            <div class="ds">$0 today · then $6.99/wk</div>
            <div class="feats">
              <div class="feat">Deep Clean Pro · unlimited cycles</div>
              <div class="feat">Manual Hz tuner · 60 → 20k</div>
              <div class="feat">Ad-free forever</div>
            </div>
          </div>
          <div>
            <div class="pr">FREE</div>
            <div class="pp">cancel anytime</div>
          </div>
        </div>
        <div class="tier">
          <div class="l">
            <div class="nm">Yearly</div>
            <div class="ds">Save 78% · billed once</div>
          </div>
          <div>
            <div class="pr">$29.99</div>
            <div class="pp">$0.58 / wk</div>
          </div>
        </div>
        <div class="tier">
          <div class="l">
            <div class="nm">Lifetime</div>
            <div class="ds">One payment, forever</div>
          </div>
          <div>
            <div class="pr">$49.99</div>
            <div class="pp">once</div>
          </div>
        </div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="7" style="margin-top:14px">Start free & begin clean ${ic.arrow}</button>
      <div class="tertiary">No charge today · <u>Restore</u> · <u>Terms</u> · <u>Privacy</u></div>
    </div>`;

  // ====== 07 Active Cleaning (zen canonical) ======
  const s7 = () => {
    const drops = Array.from({length:14}, (_,i)=>{
      const x = 32 + Math.random()*36, dly = (i*240)%4800, dur = 4400 + Math.random()*1800;
      return `<i style="left:${x.toFixed(1)}%;--dur:${dur.toFixed(0)}ms;animation-delay:${dly}ms"></i>`;
    }).join("");
    return `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:6, center:`<div class="kicker-mono">02 / 03</div>`})}
      <div class="clean-stage">
        <div class="orb clean-orb">
          <div class="aura"></div>
          <div class="core"></div>
          <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
          <div class="label">
            <div class="hz">880<span>Hz</span></div>
            <div class="ph">dust dislodge</div>
          </div>
        </div>
        <div class="steam">${drops}</div>
      </div>
      <div class="clean-meta">
        <div class="ph2">Mid-freq sweep</div>
        <div class="tm">01 : 24 remaining</div>
      </div>
      <div class="clean-segs">
        <span class="seg done"></span>
        <span class="seg active"><i></i></span>
        <span class="seg"></span>
      </div>
      <div class="clean-controls">
        <button class="zbtn">${ic.skip}</button>
        <button class="zbtn primary" data-go="8">${ic.pause}</button>
        <button class="zbtn danger">${ic.stop}</button>
      </div>
      <div class="zhint">tap to pause · long-press stop to abort</div>
    </div>`;
  };

  // ====== 08 Result ======
  const s8 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:7})}
      <div class="eyebrow" style="text-align:center;margin-top:6px">Clean complete · 2:38</div>
      <div class="result-orb">
        ${orb(`<div class="pct">+42<span>%</span></div><div class="lb">clarity restored</div>`)}
      </div>
      <div class="result-headline">
        <h2>Your speaker is back<br/>to factory crisp.</h2>
        <p class="sub">3 stages run · 12 ml ejected · sound test recommended to confirm.</p>
      </div>
      <div class="result-stats">
        <div class="col"><div class="v">58 dB</div><div class="l">Before</div></div>
        <div class="arrow">${ic.arrow}</div>
        <div class="col"><div class="v">82 dB</div><div class="l">After</div></div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="9">Run sound test ${ic.arrow}</button>
      <a class="microlink" data-go="9">Done — go home</a>
    </div>`;

  // ====== 09 Home ======
  const s9 = () => `
    ${statusbar}
    <div class="page" style="padding-bottom:90px">
      <div class="home-hello">
        <div>
          <div class="eyebrow">Good morning</div>
          <h1>Speaker is <span class="g">healthy</span></h1>
        </div>
        <button class="icon-btn">${ic.settings}</button>
      </div>
      <div class="home-stat">
        <div class="lb">Last clean · 6h ago</div>
        <div class="v">+42<small>% clarity</small></div>
        <div class="meta">Deep Clean Pro · 3 stages · 2:38</div>
        <svg class="vis" viewBox="0 0 120 46">
          <defs><linearGradient id="visG3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5EE6FF"/><stop offset="1" stop-color="#2A7BFF"/></linearGradient></defs>
          ${[18,30,42,58,72,55,40,68,82,60,45,32,52,72,82,60,46,26,40,60,82,68,46,30].map((h,i)=>`<rect x="${i*5+2}" y="${46-h*0.42}" width="2.4" height="${h*0.42}" rx="1.2" fill="url(#visG3)"/>`).join("")}
        </svg>
      </div>
      <div class="home-tiny">Quick rescue</div>
      <div class="home-quick">
        <button class="home-tile" data-go="7"><div class="ic">${ic.water}</div><div class="b"><div class="nm">Water Eject</div><div class="sm">~40s · 165 Hz</div></div><div class="arr">${ic.arrow}</div></button>
        <button class="home-tile" data-go="7"><div class="ic">${ic.dust}</div><div class="b"><div class="nm">Dust Clean</div><div class="sm">~35s · 880 Hz</div></div><div class="arr">${ic.arrow}</div></button>
        <button class="home-tile pro" data-go="7"><div class="ic">${ic.deep}</div><div class="b"><div class="nm">Deep Clean Pro</div><div class="sm">3 stages · ~2:30</div></div><div class="arr">${ic.arrow}</div></button>
      </div>
      <div class="tabbar">
        <button class="t on">${ic.home}<span>Home</span></button>
        <button class="t">${ic.sound}<span>Test</span></button>
        <button class="t">${ic.history}<span>History</span></button>
        <button class="t">${ic.settings}<span>Settings</span></button>
      </div>
    </div>`;

  const screens = {
    0:{title:"Splash",            note:"Single orb · 1 anim cue",         html:s0},
    1:{title:"Onboarding",        note:"Orb hero · social proof microline",html:s1},
    2:{title:"Problem",           note:"4 options · hairline progress",   html:s2},
    3:{title:"Urgency",           note:"Time-based · safety as tertiary", html:s3},
    4:{title:"Plan Ready",        note:"4-step list · summary footer",    html:s4},
    5:{title:"Rating",            note:"5 stars · 1 quote · skip",        html:s5},
    6:{title:"Paywall",           note:"Orb · 3 tiers · features in featured", html:s6},
    7:{title:"Active Cleaning",   note:"Zen orb · breathing · hairline segs", html:s7},
    8:{title:"Result",            note:"+42% orb · single stat row",      html:s8},
    9:{title:"Home",              note:"1 stat · 3 quick rescues",        html:s9},
  };
  window.CleanSpeakerV3 = { screens, ic };
})();
