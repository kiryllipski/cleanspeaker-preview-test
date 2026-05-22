/* CleanSpeaker v4 — reworked flow with speaker selection, state-driven cleaning, focused home */
(function(){
  const ic = {
    back:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    arrow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    check:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 8v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    settings:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.5.9a7 7 0 0 0-2-1.2l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.5-.9-2 3.5L5.1 10.8A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2.1 1.6 2 3.5 2.5-.9c.6.5 1.2.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.5.9 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
    sound:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 8c2 2 2 6 0 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    water:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    dust:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="1.3" fill="currentColor"/><circle cx="14" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="9" r="1.6" fill="currentColor"/><circle cx="10" cy="12" r="1.1" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/></svg>`,
    muffle:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 10v4M8 7v10M12 4v16M16 9v6M20 11v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    volume:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10v4h3l4 3V7L6 10H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 9c1.2 1 1.2 5 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></svg>`,
    clock:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    pause:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>`,
    play:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7V5z"/></svg>`,
    stop:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
    skip:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5l8 7-8 7V5zM15 5h3v14h-3V5z"/></svg>`,
    star:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.7l-5.4 2.8 1.2-6L3.3 9.3l6.1-.7L12 3z"/></svg>`,
    sliders:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h10M4 12h6M4 18h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="6" r="2.2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="18" r="2.2" stroke="currentColor" stroke-width="1.8"/></svg>`,
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

  const orb = (inner="", cls="") => `
    <div class="orb ${cls}">
      <div class="aura"></div>
      <div class="core"></div>
      <div class="ring r1"></div>
      <div class="ring r2"></div>
      <div class="ring r3"></div>
      <div class="label">${inner}</div>
    </div>`;

  const topbar = (opts={}) => {
    const back   = opts.back   ?? `<button class="icon-btn" data-go="${opts.backTo??""}">${ic.back}</button>`;
    const center = opts.center ?? `<div></div>`;
    const right  = opts.right  ?? `<div style="width:40px"></div>`;
    return `<div class="topbar">${back}${center}${right}</div>`;
  };
  const hairline = (n, idx) => `<div class="hairline">${Array.from({length:n},(_,i)=>`<span class="${i<=idx?"on":""}"></span>`).join("")}</div>`;

  // ===== Speaker card art (SVG illustrations, in-brand) =====
  const artEarpiece = `
    <svg class="spk-art" viewBox="0 0 200 96" preserveAspectRatio="none">
      <defs>
        <radialGradient id="erpGlow" cx="50%" cy="65%" r="50%">
          <stop offset="0" stop-color="rgba(94,230,255,.55)"/>
          <stop offset="60%" stop-color="rgba(94,230,255,.10)"/>
          <stop offset="100%" stop-color="rgba(94,230,255,0)"/>
        </radialGradient>
        <linearGradient id="erpMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1a212f"/><stop offset="1" stop-color="#0b0f17"/>
        </linearGradient>
      </defs>
      <rect width="200" height="96" fill="#070A14"/>
      <ellipse cx="100" cy="78" rx="80" ry="30" fill="url(#erpGlow)"/>
      <rect x="20" y="38" width="160" height="42" rx="8" fill="url(#erpMetal)"/>
      <rect x="22" y="38" width="156" height="1" fill="rgba(255,255,255,.06)"/>
      <rect x="60" y="56" width="80" height="3.5" rx="1.7" fill="#03060C"/>
      <rect x="60" y="56" width="80" height="1" fill="rgba(94,230,255,.4)" opacity=".7"/>
      <circle cx="58" cy="46" r="0.9" fill="#5EE6FF" opacity=".7"/>
      <circle cx="78" cy="42" r="0.7" fill="#5EE6FF" opacity=".5"/>
      <circle cx="124" cy="44" r="0.8" fill="#5EE6FF" opacity=".6"/>
      <circle cx="142" cy="48" r="0.6" fill="#5EE6FF" opacity=".4"/>
    </svg>`;

  const artBottom = `
    <svg class="spk-art" viewBox="0 0 200 96" preserveAspectRatio="none">
      <defs>
        <radialGradient id="botGlow" cx="50%" cy="80%" r="55%">
          <stop offset="0" stop-color="rgba(94,230,255,.55)"/>
          <stop offset="60%" stop-color="rgba(94,230,255,.10)"/>
          <stop offset="100%" stop-color="rgba(94,230,255,0)"/>
        </radialGradient>
        <linearGradient id="botMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1a212f"/><stop offset="1" stop-color="#0b0f17"/>
        </linearGradient>
      </defs>
      <rect width="200" height="96" fill="#070A14"/>
      <ellipse cx="100" cy="86" rx="90" ry="22" fill="url(#botGlow)"/>
      <rect x="14" y="30" width="172" height="48" rx="10" fill="url(#botMetal)"/>
      <g fill="#03060C">
        ${Array.from({length:9},(_,i)=>`<circle cx="${56+i*11}" cy="54" r="2.6"/>`).join("")}
      </g>
      <g fill="rgba(94,230,255,.6)">
        ${Array.from({length:9},(_,i)=>`<circle cx="${56+i*11}" cy="54" r="0.8" opacity="${0.4+Math.sin(i)*0.3}"/>`).join("")}
      </g>
    </svg>`;

  const artHeadphones = `
    <svg class="spk-art" viewBox="0 0 200 96" preserveAspectRatio="none">
      <defs>
        <radialGradient id="hpGlow" cx="50%" cy="60%" r="55%">
          <stop offset="0" stop-color="rgba(94,230,255,.55)"/>
          <stop offset="60%" stop-color="rgba(94,230,255,.10)"/>
          <stop offset="100%" stop-color="rgba(94,230,255,0)"/>
        </radialGradient>
        <linearGradient id="hpShell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#F4F7FB"/><stop offset="1" stop-color="#9AA8BD"/>
        </linearGradient>
      </defs>
      <rect width="200" height="96" fill="#070A14"/>
      <ellipse cx="100" cy="78" rx="80" ry="28" fill="url(#hpGlow)"/>
      <!-- left bud -->
      <g transform="translate(72 38)">
        <ellipse cx="0" cy="0" rx="22" ry="20" fill="url(#hpShell)"/>
        <path d="M-6 16 Q -8 32 0 38 Q 4 36 4 26 Z" fill="#D8DFEA"/>
        <circle cx="0" cy="2" r="9" fill="#1a212f"/>
        <circle cx="0" cy="2" r="6.5" fill="#03060C"/>
        <circle cx="0" cy="2" r="6.5" fill="url(#hpGlow)" opacity=".6"/>
      </g>
      <!-- right bud (reflected, smaller, behind) -->
      <g transform="translate(132 46)" opacity=".7">
        <ellipse cx="0" cy="0" rx="16" ry="14" fill="url(#hpShell)"/>
        <circle cx="0" cy="0" r="6" fill="#1a212f"/>
        <circle cx="0" cy="0" r="4.2" fill="#03060C"/>
      </g>
    </svg>`;

  // mini SVG for speaker chip on home
  const miniEarpiece = `<svg viewBox="0 0 36 30" fill="none"><rect x="3" y="6" width="30" height="18" rx="3" stroke="currentColor" stroke-width="1.2" opacity=".6"/><rect x="11" y="14" width="14" height="2" rx="1" fill="currentColor"/></svg>`;
  const miniBottom = `<svg viewBox="0 0 36 30" fill="none"><rect x="3" y="6" width="30" height="18" rx="3" stroke="currentColor" stroke-width="1.2" opacity=".6"/><g fill="currentColor">${Array.from({length:5},(_,i)=>`<circle cx="${10+i*4}" cy="15" r="1.4"/>`).join("")}</g></svg>`;
  const miniHeadphones = `<svg viewBox="0 0 36 30" fill="none"><circle cx="13" cy="15" r="6" stroke="currentColor" stroke-width="1.4"/><circle cx="13" cy="15" r="2.2" fill="currentColor"/><circle cx="25" cy="15" r="4" stroke="currentColor" stroke-width="1.4" opacity=".7"/><circle cx="25" cy="15" r="1.4" fill="currentColor" opacity=".7"/></svg>`;

  // ====== 00 Splash ======
  const s0 = () => `
    ${statusbar}
    <div class="splash">
      <div style="--orb:170px">${orb("")}</div>
      <div>
        <div class="wordmark" style="font-size:24px;font-weight:800;letter-spacing:-0.02em;opacity:0;animation:rise .9s cubic-bezier(.22,.9,.32,1) .8s forwards">Clean<span style="color:var(--cyan)">Speaker</span></div>
        <div style="font-size:11px;color:var(--text-3);letter-spacing:0.24em;text-transform:uppercase;font-weight:600;opacity:0;animation:rise .9s ease-out 1.1s forwards;text-align:center;margin-top:6px">Audio rescue</div>
      </div>
    </div>`;

  // ====== 00→01 Transition demo (loops) ======
  const sTrans = () => `
    ${statusbar}
    <div class="transition-card">
      <div class="t-splash"></div>
      <div class="t-orb">${orb("")}</div>
      <div class="t-word">Clean<span class="a">Speaker</span></div>
      <div class="t-onb-content">
        <h1>Restore your<br/>speaker. Calmly.</h1>
        <p>Calibrated frequency sweeps push out water and dust — the same method audio labs use.</p>
      </div>
      <div class="t-cta">Diagnose my speaker ${ic.arrow}</div>
    </div>`;

  // ====== 01 Onboarding ======
  const s1 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar">
        <div class="brand-dot"></div>
        <div class="kicker-mono">v4</div>
        <div style="width:40px"></div>
      </div>
      <div class="onb-hero" style="--orb:200px">${orb("")}</div>
      <h1 class="display big">Restore your<br/>speaker. Calmly.</h1>
      <p class="subtle" style="margin-top:12px">Calibrated frequency sweeps push out water and dust — the same method audio labs use, tuned for your phone.</p>
      <div class="spacer"></div>
      <div class="onb-meta">
        <div><b>4.9 ★</b> · 48k</div><div class="div"></div>
        <div><b>2.1M</b> · cleans</div><div class="div"></div>
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
      <button class="cta" data-go="4">Continue ${ic.arrow}</button>
      <div class="tertiary">Power off Bluetooth · place phone speaker-down</div>
    </div>`;

  // ====== 04 NEW — Speaker selection ======
  const s4 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:3, center:`<div class="kicker-mono">3 / 3</div>`})}
      ${hairline(3, 2)}
      <h1 class="display">Which speakers<br/>need cleaning?</h1>
      <p class="subtle" style="margin-top:10px">Select all that apply. We'll calibrate the sweep for each driver type.</p>
      <div class="sel-grid">
        <button class="sel-card sel">
          <div class="art">${artEarpiece}</div>
          <div class="nm">Earpiece</div>
          <div class="sm">top · call speaker</div>
          <div class="tick">${ic.check}</div>
        </button>
        <button class="sel-card sel">
          <div class="art">${artBottom}</div>
          <div class="nm">Bottom</div>
          <div class="sm">main · loudspeaker</div>
          <div class="tick">${ic.check}</div>
        </button>
        <button class="sel-card">
          <div class="art">${artHeadphones}</div>
          <div class="nm">Headphones</div>
          <div class="sm">wireless / wired</div>
          <div class="tick">${ic.check}</div>
        </button>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="5">Build my rescue plan ${ic.arrow}</button>
      <div class="tertiary">2 selected · estimated total ~2:40</div>
    </div>`;

  // ====== 05 NEW — Preparing plan ======
  const s5 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:4})}
      <div class="prep-stage">
        <div class="prep-orb">${orb("")}</div>
        <div>
          <div class="prep-title">Preparing your<br/>personal rescue plan</div>
          <div class="prep-sub">analyzing 2 drivers · matching frequencies</div>
        </div>
        <div class="prep-steps">
          <div class="prep-step done"><div class="pdot"></div>Diagnostic intake</div>
          <div class="prep-step done"><div class="pdot"></div>Driver profile lookup</div>
          <div class="prep-step on"><div class="pdot"></div>Calibrating sweep curve</div>
          <div class="prep-step"><div class="pdot"></div>Verifying safe volume</div>
        </div>
      </div>
      <button class="cta" data-go="6">Continue ${ic.arrow}</button>
    </div>`;

  // ====== 06 Plan Ready ======
  const s6 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:5})}
      <div class="eyebrow">Plan ready · 2 drivers · critical case</div>
      <h1 class="display big" style="margin-top:8px">Your rescue<br/>protocol</h1>
      <div class="plan-list">
        <div class="row"><div class="n">01</div><div class="t">Earpiece · water eject</div><div class="m">165 Hz · 40s</div></div>
        <div class="row"><div class="n">02</div><div class="t">Earpiece · dust dislodge</div><div class="m">880 Hz · 35s</div></div>
        <div class="row"><div class="n">03</div><div class="t">Bottom · water eject</div><div class="m">165 Hz · 40s</div></div>
        <div class="row"><div class="n">04</div><div class="t">Bottom · deep pass</div><div class="m">60 → 14k · 45s</div></div>
      </div>
      <div class="plan-summary">
        <div>Total run time</div>
        <div class="v">2:40 · 4 stages</div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="7">Unlock plan ${ic.arrow}</button>
      <div class="tertiary">Calibrated for current iPhone & Android · won't damage your phone</div>
    </div>`;

  // ====== 07 Rating ======
  const s7 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:6, right:`<button class="microlink" data-go="8" style="padding:8px 0">Skip</button>`})}
      <h1 class="display" style="text-align:center;margin-top:28px">How are we doing?</h1>
      <p class="subtle" style="text-align:center;margin-top:10px">Your answer makes future sweeps better for you.</p>
      <div class="stars">
        ${[1,1,1,1,0].map(on=>`<div class="star ${on?'on':''}">${ic.star}</div>`).join("")}
      </div>
      <p class="quote">
        "Cleared a glass of water from my Pixel in 90 seconds. Sound is back to crisp."
        <span class="att">Maya R. · verified clean</span>
      </p>
      <div class="spacer"></div>
      <button class="cta" data-go="8">Submit & continue ${ic.arrow}</button>
    </div>`;

  // ====== 08 Paywall ======
  const s8 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({back:`<button class="icon-btn" data-go="7">${ic.close}</button>`})}
      <div class="pw-orb" style="--orb:140px">${orb("")}</div>
      <div class="pw-title-row">
        <h1 class="display big">Unlimited<br/>rescues</h1>
        <div class="pw-badge">Lab verified</div>
      </div>
      <div class="tiers">
        <div class="tier featured">
          <div class="ribbon">3-day free trial</div>
          <div class="l">
            <div class="nm">Weekly · most popular</div>
            <div class="ds">$0 today · then $6.99/wk</div>
            <div class="feats">
              <div class="feat">Deep Clean Pro · unlimited</div>
              <div class="feat">Manual Hz tuner · 60 → 20k</div>
              <div class="feat">Ad-free forever</div>
            </div>
          </div>
          <div><div class="pr">FREE</div><div class="pp">cancel anytime</div></div>
        </div>
        <div class="tier">
          <div class="l"><div class="nm">Yearly</div><div class="ds">Save 78% · billed once</div></div>
          <div><div class="pr">$29.99</div><div class="pp">$0.58 / wk</div></div>
        </div>
        <div class="tier">
          <div class="l"><div class="nm">Lifetime</div><div class="ds">One payment, forever</div></div>
          <div><div class="pr">$49.99</div><div class="pp">once</div></div>
        </div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="9" style="margin-top:14px">Start free & begin clean ${ic.arrow}</button>
      <div class="tertiary">No charge today · <u>Restore</u> · <u>Terms</u> · <u>Privacy</u></div>
    </div>`;

  // ====== Cleaning screen builder (state-driven) ======
  // states: 'preparing' | 'warming' | 'active' | 'finishing' | 'success'
  // target: 'earpiece' | 'bottom' | 'headphones'
  function cleaningScreen(state="active", target="earpiece", opts={}){
    const targetMap = {
      earpiece:{name:"Earpiece · top driver", short:"earpiece"},
      bottom:{name:"Bottom · loudspeaker", short:"bottom"},
      headphones:{name:"Headphones · L+R", short:"headphones"},
    };
    const cfg = targetMap[target];

    const stateMap = {
      preparing:{pill:"warming",  label:"Warming up",   orbCls:"dim",          hz:"—", ph:"calibrating sweep",   tm:"starts in 02s", seg:0, segPct:8,  control:"pause"},
      warming:  {pill:"warming",  label:"Ramping",      orbCls:"",             hz:"40",  ph:"rising to target",    tm:"00:02 elapsed", seg:0, segPct:30, control:"pause"},
      active:   {pill:"",         label:"Active sweep", orbCls:"",             hz:"880", ph:"dust dislodge · mid", tm:"01:24 remaining", seg:1, segPct:60, control:"pause"},
      finishing:{pill:"finishing",label:"Settling",     orbCls:"glow-warm",    hz:"120", ph:"cooling driver",      tm:"00:06 remaining", seg:2, segPct:88, control:"pause"},
      success:  {pill:"finishing",label:"Complete",     orbCls:"glow-success", hz:"OK",  ph:"clean confirmed",     tm:"+42% clarity",     seg:3, segPct:100, control:"continue"},
    };
    const st = stateMap[state];

    const segs = [0,1,2].map(i=>{
      if(i<st.seg) return `<span class="seg done"></span>`;
      if(i===st.seg && st.seg<3) return `<span class="seg active"><i style="width:${st.segPct}%"></i></span>`;
      return `<span class="seg"></span>`;
    }).join("");

    const drops = state==="active" || state==="warming"
      ? Array.from({length:14}, (_,i)=>{
          const x = 32 + (i*7)%36, dly = (i*240)%4800, dur = 4400 + (i*180)%1800;
          return `<i style="left:${x.toFixed(1)}%;--dur:${dur.toFixed(0)}ms;animation-delay:${dly}ms"></i>`;
        }).join("")
      : "";

    const goNext = opts.goNext ?? "10";
    const control = st.control === "continue"
      ? `<button class="zbtn primary" data-go="${goNext}">${ic.arrow}</button>`
      : `<button class="zbtn primary">${ic.pause}</button>`;

    return `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:9, center:`<div class="state-pill ${st.pill}"><span class="sdot"></span>${st.label}</div>`})}
      <div class="clean-stage">
        <div class="orb clean-orb ${st.orbCls}">
          <div class="aura"></div>
          <div class="core"></div>
          <div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
          <div class="label">
            <div class="hz">${st.hz}${st.hz!=="—" && st.hz!=="OK"?'<span>Hz</span>':""}</div>
            <div class="ph">${st.ph}</div>
          </div>
        </div>
        <div class="steam">${drops}</div>
      </div>
      <div class="clean-meta">
        <div class="ph2">${cfg.name}</div>
        <div class="tm">${st.tm}</div>
      </div>
      <div class="clean-segs">${segs}</div>
      <div class="clean-controls">
        <button class="zbtn">${ic.skip}</button>
        ${control}
        <button class="zbtn danger">${ic.stop}</button>
      </div>
      <div class="zhint">${state==="success"?"tap continue to see your result":"tap to pause · long-press stop to abort"}</div>
    </div>`;
  }

  // ====== 09 Active cleaning (canonical = active state, earpiece) ======
  const s9 = () => cleaningScreen("active","earpiece");

  // ====== 10 Result ======
  const s10 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:9})}
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
      <button class="cta" data-go="11">Run sound test ${ic.arrow}</button>
      <a class="microlink" data-go="11">Done — go home</a>
    </div>`;

  // ====== 11 Home v4 (NEW reworked) ======
  const s11 = () => `
    ${statusbar}
    <div class="page" style="padding:50px 28px 24px">
      <div class="home-v4-top">
        <div>
          <div class="eyebrow">Good morning</div>
          <h1>Ready when <span class="g">you are</span></h1>
        </div>
        <div class="brand-dot"></div>
      </div>

      <div class="home-section-h">Choose target</div>
      <div class="spk-chips">
        <button class="spk-chip sel"><div class="mini">${miniEarpiece}</div><div class="lb">Earpiece</div></button>
        <button class="spk-chip"><div class="mini">${miniBottom}</div><div class="lb">Bottom</div></button>
        <button class="spk-chip"><div class="mini">${miniHeadphones}</div><div class="lb">Headphones</div></button>
      </div>

      <div class="home-section-h">Choose method</div>
      <div class="method-row">
        <button class="method-tile sel"><div class="ic">${ic.water}</div><div class="nm">Water Eject</div><div class="sm">~40s</div></button>
        <button class="method-tile"><div class="ic">${ic.dust}</div><div class="nm">Dust Clean</div><div class="sm">~35s</div></button>
        <button class="method-tile"><div class="ic">${ic.sliders}</div><div class="nm">Manual Hz</div><div class="sm">60–20k</div></button>
      </div>

      <button class="cta start-cta" data-go="9">Start clean ${ic.arrow}</button>

      <div class="home-section-h">Diagnostics</div>
      <button class="audio-test-card">
        <div class="ic">${ic.sound}</div>
        <div class="body">
          <div class="nm">Audio Test</div>
          <div class="sm">Stereo · clarity · channel balance · 90s</div>
        </div>
        <div class="arr">${ic.arrow}</div>
      </button>
    </div>`;

  // ====== Cleaning state variants (for state-machine demo cards) ======
  const stateScreens = {
    "9a":{title:"Cleaning · preparing", note:"State 1 — calibrating, orb dim", html:()=>cleaningScreen("preparing","earpiece")},
    "9b":{title:"Cleaning · warming",   note:"State 2 — ramping freq",        html:()=>cleaningScreen("warming","earpiece")},
    "9c":{title:"Cleaning · active",    note:"State 3 — mid-sweep (canonical)",html:()=>cleaningScreen("active","earpiece")},
    "9d":{title:"Cleaning · finishing", note:"State 4 — cooling, warm glow",  html:()=>cleaningScreen("finishing","earpiece")},
    "9e":{title:"Cleaning · success",   note:"State 5 — confirmed, lime orb", html:()=>cleaningScreen("success","earpiece")},
  };

  const screens = {
    0:{title:"Splash",                 note:"Brand reveal",                    html:s0},
    "0t":{title:"Splash → Onboarding", note:"Auto-loop transition demo",       html:sTrans},
    1:{title:"Onboarding",             note:"Orb hero · trust microline",      html:s1},
    2:{title:"Problem",                note:"4 options · hairline progress",   html:s2},
    3:{title:"Urgency",                note:"Time-based",                      html:s3},
    4:{title:"Speakers (NEW)",         note:"3-card multi-select",             html:s4},
    5:{title:"Preparing plan (NEW)",   note:"4-step ring · pulsing orb",       html:s5},
    6:{title:"Plan ready",             note:"Per-driver list",                 html:s6},
    7:{title:"Rating",                 note:"5 stars · 1 quote",               html:s7},
    8:{title:"Paywall",                note:"Featured trial + 2 tiers",        html:s8},
    9:{title:"Active cleaning",        note:"Canonical active state",          html:s9},
    10:{title:"Result",                note:"+42% orb · before→after",         html:s10},
    11:{title:"Home (NEW)",            note:"Target + method + Start · audio test", html:s11},
    ...stateScreens,
  };
  window.CleanSpeakerV4 = { screens, ic, cleaningScreen };
})();
