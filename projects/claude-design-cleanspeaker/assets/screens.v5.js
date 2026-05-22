/* CleanSpeaker v5 - evidence-first flow */
(function(){
  const IMG = "assets/generated/v5/run-2026-05-13/";
  const img = {
    onboard: IMG + "onboarding-speaker-evidence__generated.jpg",
    clean: IMG + "cleaning-driver-ejection__generated.jpg",
    result: IMG + "result-before-after-evidence__generated.jpg",
    paywall: IMG + "lab-console-paywall__generated.jpg",
  };

  const ic = {
    back:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    arrow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    check:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    sound:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M17 8c2 2 2 6 0 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    water:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
    dust:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="7" r="1.3" fill="currentColor"/><circle cx="14" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="9" r="1.6" fill="currentColor"/><circle cx="10" cy="12" r="1.1" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/></svg>`,
    clock:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    phone:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M10 18h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    bluetooth:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 6l8 6-8 6V4l8 8-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    pause:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>`,
    play:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5l12 7-12 7V5z"/></svg>`,
    stop:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
    skip:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5l8 7-8 7V5zM15 5h3v14h-3V5z"/></svg>`,
    sliders:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h10M4 12h6M4 18h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="6" r="2.2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="18" r="2.2" stroke="currentColor" stroke-width="1.8"/></svg>`,
  };

  const statusbar = `
    <div class="statusbar" aria-hidden="true">
      <div>9:41</div>
      <div class="punch"><div class="lens"></div></div>
      <div class="right">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M0 7h2v3H0V7zm4-2h2v5H4V5zm4-2h2v7H8V3zm4-2h2v9h-2V1z"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 4a8 8 0 0 1 12 0M3.5 6.5a4 4 0 0 1 7 0M7 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <div class="pill"></div>
      </div>
    </div>`;

  const topbar = (opts={}) => {
    const back = opts.back ?? `<button class="icon-btn" aria-label="Go back" data-go="${opts.backTo ?? ""}">${ic.back}</button>`;
    const center = opts.center ?? `<div></div>`;
    const right = opts.right ?? `<div style="width:40px"></div>`;
    return `<div class="topbar">${back}${center}${right}</div>`;
  };
  const hairline = (n, idx) => `<div class="hairline" aria-label="Step ${idx+1} of ${n}">${Array.from({length:n},(_,i)=>`<span class="${i<=idx?"on":""}"></span>`).join("")}</div>`;
  const evidence = (src, cls, label) => `<div class="evidence-panel ${cls}"><img src="${src}" alt="${label}" loading="eager"/><div class="img-chip"><i></i>${label}</div></div>`;
  const primary = (label, go) => `<button class="cta" data-go="${go}">${label} ${ic.arrow}</button>`;

  const miniEarpiece = `<svg viewBox="0 0 36 30" fill="none" aria-hidden="true"><rect x="3" y="6" width="30" height="18" rx="3" stroke="currentColor" stroke-width="1.2" opacity=".6"/><rect x="11" y="14" width="14" height="2" rx="1" fill="currentColor"/></svg>`;
  const miniBottom = `<svg viewBox="0 0 36 30" fill="none" aria-hidden="true"><rect x="3" y="6" width="30" height="18" rx="3" stroke="currentColor" stroke-width="1.2" opacity=".6"/><g fill="currentColor">${Array.from({length:5},(_,i)=>`<circle cx="${10+i*4}" cy="15" r="1.4"/>`).join("")}</g></svg>`;
  const miniHeadphones = `<svg viewBox="0 0 36 30" fill="none" aria-hidden="true"><circle cx="13" cy="15" r="6" stroke="currentColor" stroke-width="1.4"/><circle cx="13" cy="15" r="2.2" fill="currentColor"/><circle cx="25" cy="15" r="4" stroke="currentColor" stroke-width="1.4" opacity=".7"/><circle cx="25" cy="15" r="1.4" fill="currentColor" opacity=".7"/></svg>`;

  const s0 = () => `
    ${statusbar}
    <div class="splash">
      <div class="brand-dot" style="width:58px;height:58px;border-radius:18px"></div>
      <div>
        <div class="wordmark" style="font-size:25px;font-weight:850;letter-spacing:-.025em">Clean<span style="color:var(--cyan)">Speaker</span></div>
        <div class="sub" style="text-align:center">Rescue protocol</div>
      </div>
    </div>`;

  const s1 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar">
        <div class="brand-dot"></div>
        <div class="kicker-mono">Evidence first</div>
        <div style="width:40px"></div>
      </div>
      ${evidence(img.onboard,"hero-evidence","water lift")}
      <h1 class="display big">Push water out<br/>of the speaker.</h1>
      <p class="subtle" style="margin-top:12px">A calibrated sweep moves air through the grille at safe volume. You see the target before the clean starts.</p>
      <div class="instrument-strip">
        <div class="instrument"><div class="k">mode</div><div class="v">safe</div></div>
        <div class="instrument good"><div class="k">target</div><div class="v">2 spk</div></div>
        <div class="instrument"><div class="k">time</div><div class="v">2:20</div></div>
      </div>
      <div class="spacer"></div>
      ${primary("Diagnose speaker",2)}
    </div>`;

  const s2 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:1, center:`<div class="kicker-mono">1 / 4</div>`})}
      ${hairline(4,0)}
      <h1 class="display">What's wrong?</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:22px">Pick the closest symptom. The plan changes with the cause.</p>
      <div class="options" role="group" aria-label="Speaker problem">
        <button class="opt sel" aria-pressed="true"><div class="ic">${ic.water}</div><div class="body"><div class="t">Water inside</div><div class="s">Rain, drink, pool</div></div><div class="dot">${ic.check}</div></button>
        <button class="opt" aria-pressed="false"><div class="ic">${ic.sound}</div><div class="body"><div class="t">Muffled sound</div></div><div class="dot"></div></button>
        <button class="opt" aria-pressed="false"><div class="ic">${ic.dust}</div><div class="body"><div class="t">Dust and lint</div></div><div class="dot"></div></button>
        <button class="opt" aria-pressed="false"><div class="ic">${ic.clock}</div><div class="body"><div class="t">Low volume after time</div></div><div class="dot"></div></button>
      </div>
      <div class="spacer"></div>
      ${primary("Continue",3)}
    </div>`;

  const s3 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:2, center:`<div class="kicker-mono">2 / 4</div>`})}
      ${hairline(4,1)}
      <h1 class="display">Set it up safely.</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:18px">The sweep only works when sound leaves the speaker grille directly.</p>
      <div class="safety-list">
        <div class="safety-row"><div class="mark">${ic.phone}</div><div class="body"><div class="t">Place phone speaker-down</div><div class="s">A towel under the edge catches droplets.</div></div></div>
        <div class="safety-row warn"><div class="mark">${ic.bluetooth}</div><div class="body"><div class="t">Disconnect Bluetooth</div><div class="s">Audio must play through the phone speaker.</div></div></div>
        <div class="safety-row"><div class="mark">${ic.sound}</div><div class="body"><div class="t">Volume limited to safe range</div><div class="s">The app ramps gradually before active sweep.</div></div></div>
      </div>
      <div class="spacer"></div>
      ${primary("Check setup",4)}
    </div>`;

  const s4 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:3, center:`<div class="kicker-mono">3 / 4</div>`})}
      ${hairline(4,2)}
      <h1 class="display">Choose the target.</h1>
      <p class="subtle" style="margin-top:10px">Select every speaker that sounded blocked.</p>
      <div class="spk-chips" style="margin-top:18px" role="group" aria-label="Speaker targets">
        <button class="spk-chip sel" aria-pressed="true"><div class="mini">${miniEarpiece}</div><div class="lb">Earpiece</div></button>
        <button class="spk-chip sel" aria-pressed="true"><div class="mini">${miniBottom}</div><div class="lb">Bottom</div></button>
        <button class="spk-chip" aria-pressed="false"><div class="mini">${miniHeadphones}</div><div class="lb">Headphones</div></button>
      </div>
      ${evidence(img.onboard,"compact-evidence soft","target proof")}
      <div class="spacer"></div>
      ${primary("Build rescue plan",5)}
      <div class="tertiary">2 selected, estimated total 2:20</div>
    </div>`;

  const s5 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:4, center:`<div class="kicker-mono">4 / 4</div>`})}
      ${hairline(4,3)}
      <h1 class="display">Calibrating sweep.</h1>
      <p class="subtle" style="margin-top:10px">The curve starts low for water, then uses a short dust pass.</p>
      <div class="frequency-card">
        <div class="frequency-line" aria-hidden="true">
          <svg viewBox="0 0 280 74" fill="none">
            <path d="M0 54 C38 48 46 20 78 26 C112 34 118 62 152 54 C190 45 190 18 224 22 C246 25 258 38 280 34" stroke="var(--cyan)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M0 54 C38 48 46 20 78 26 C112 34 118 62 152 54 C190 45 190 18 224 22 C246 25 258 38 280 34" stroke="var(--cyan)" stroke-width="8" stroke-linecap="round" opacity=".14"/>
          </svg>
        </div>
        <div class="prep-steps">
          <div class="prep-step done"><div class="pdot"></div>Setup verified</div>
          <div class="prep-step done"><div class="pdot"></div>Driver targets mapped</div>
          <div class="prep-step on"><div class="pdot"></div>Safe ramp selected</div>
          <div class="prep-step"><div class="pdot"></div>Ready to clean</div>
        </div>
      </div>
      <div class="spacer"></div>
      ${primary("Review protocol",6)}
    </div>`;

  const s6 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:5})}
      <div class="eyebrow">Protocol ready</div>
      <h1 class="display big" style="margin-top:8px">Two speakers,<br/>three passes.</h1>
      <div class="plan-list">
        <div class="protocol-row"><div class="n">01</div><div><div class="t">Bottom water eject</div><div class="s">Low-frequency air pulse for visible droplets.</div></div><div class="m">165 Hz<br/>45s</div></div>
        <div class="protocol-row"><div class="n">02</div><div><div class="t">Earpiece water eject</div><div class="s">Shorter pass to protect the smaller driver.</div></div><div class="m">190 Hz<br/>35s</div></div>
        <div class="protocol-row"><div class="n">03</div><div><div class="t">Dust dislodge</div><div class="s">Gentle sweep after water movement slows.</div></div><div class="m">720 Hz<br/>60s</div></div>
      </div>
      <div class="plan-summary"><div>Total run time</div><div class="v">2:20</div></div>
      <div class="spacer"></div>
      ${primary("Start safety gate",7)}
      <div class="tertiary">You can pause or stop at any point.</div>
    </div>`;

  const s7 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:6})}
      <h1 class="display">Final safety gate.</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:18px">One issue needs attention before the sweep can start.</p>
      <div class="blocked-card">
        <div class="badge">Bluetooth detected</div>
        <h2>Sound is routed away from the phone.</h2>
        <p>Disconnect headphones or speakers. The rescue sweep must play through the blocked phone speaker.</p>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="8">I've disconnected it ${ic.check}</button>
      <button class="cta ghost" data-go="12" style="margin-top:10px">Show blocked state</button>
    </div>`;

  const s8 = () => `
    ${statusbar}
    <div class="page paywall-v5">
      ${topbar({back:`<button class="icon-btn" aria-label="Close paywall" data-go="7">${ic.close}</button>`})}
      ${evidence(img.paywall,"compact-evidence soft","calibration lab")}
      <h1 class="display big">Unlock the<br/>calibrated clean.</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:14px">Your protocol is ready. Pro keeps the sweep tuned per speaker and removes repeat limits.</p>
      <div class="unlock-card">
        <div class="top">
          <div><div class="name">3-day rescue pass</div><div class="sub">$0 today, then $6.99/wk</div></div>
          <div class="price">FREE</div>
        </div>
        <div class="feature-line"><i></i>Calibrated water and dust passes</div>
        <div class="feature-line"><i></i>Manual Hz control after rescue</div>
        <div class="feature-line"><i></i>Restore purchase anytime</div>
      </div>
      <div class="spacer"></div>
      ${primary("Start free clean",9)}
      <div class="tertiary">No charge today, restore, terms, privacy</div>
    </div>`;

  const s9 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:8, center:`<div class="state-pill"><span class="sdot"></span>Active sweep</div>`})}
      <div class="evidence-panel cleaning-visual">
        <img src="${img.clean}" alt="Water droplets being pushed from a phone speaker" loading="eager"/>
        <div class="cleaning-readout"><div class="hz">165<span>Hz</span></div><div class="phase">bottom<br/>water eject</div></div>
      </div>
      <div class="clean-meta"><div class="ph2">Speaker-down, safe volume</div><div class="tm">01:18 remaining</div></div>
      <div class="clean-segs"><span class="seg active"><i style="width:42%"></i></span><span class="seg"></span><span class="seg"></span></div>
      <div class="clean-controls">
        <button class="zbtn" aria-label="Skip current pass">${ic.skip}</button>
        <button class="zbtn primary" aria-label="Pause cleaning" data-go="13">${ic.pause}</button>
        <button class="zbtn danger" aria-label="Stop cleaning">${ic.stop}</button>
      </div>
      <div class="zhint">tap pause, hold stop to abort</div>
    </div>`;

  const s10 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:9})}
      <div class="eyebrow">Clean complete</div>
      <h1 class="display" style="margin-top:8px">The grille is clear.</h1>
      ${evidence(img.result,"result-proof soft","before and after")}
      <div class="result-panel">
        <div class="result-card"><div class="k">before</div><div class="v">58 dB</div></div>
        <div class="result-card after"><div class="k">after</div><div class="v">82 dB</div></div>
      </div>
      <p class="subtle" style="margin-top:14px">Run the sound test to confirm clarity before you put the phone back in your pocket.</p>
      <div class="spacer"></div>
      ${primary("Run sound test",11)}
      <a class="microlink" data-go="11">Done, go home</a>
    </div>`;

  const s11 = () => `
    ${statusbar}
    <div class="page" style="padding:50px 28px 24px">
      <div class="home-v4-top">
        <div><div class="eyebrow">Ready</div><h1>Clean by <span class="g">target</span></h1></div>
        <div class="brand-dot"></div>
      </div>
      <div class="last-clean"><div class="thumb"><img src="${img.result}" alt="Last cleaning result" loading="eager"/></div><div class="body"><div class="t">Last clean confirmed</div><div class="s">Bottom and earpiece, 2:20, sound test passed.</div></div></div>
      <div class="home-section-h">Choose target</div>
      <div class="spk-chips">
        <button class="spk-chip sel" aria-pressed="true"><div class="mini">${miniEarpiece}</div><div class="lb">Earpiece</div></button>
        <button class="spk-chip" aria-pressed="false"><div class="mini">${miniBottom}</div><div class="lb">Bottom</div></button>
        <button class="spk-chip" aria-pressed="false"><div class="mini">${miniHeadphones}</div><div class="lb">Headphones</div></button>
      </div>
      <div class="home-section-h">Choose method</div>
      <div class="method-row">
        <button class="method-tile sel" aria-pressed="true"><div class="ic">${ic.water}</div><div class="nm">Water Eject</div><div class="sm">~45s</div></button>
        <button class="method-tile" aria-pressed="false"><div class="ic">${ic.dust}</div><div class="nm">Dust Clean</div><div class="sm">~60s</div></button>
        <button class="method-tile" aria-pressed="false"><div class="ic">${ic.sliders}</div><div class="nm">Manual Hz</div><div class="sm">60-20k</div></button>
      </div>
      <button class="cta start-cta" data-go="9">Start clean ${ic.arrow}</button>
      <div class="home-section-h">Diagnostics</div>
      <button class="audio-test-card">
        <div class="ic">${ic.sound}</div><div class="body"><div class="nm">Audio Test</div><div class="sm">Stereo, clarity, channel balance, 90s</div></div><div class="arr">${ic.arrow}</div>
      </button>
    </div>`;

  const s12 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:7})}
      <h1 class="display">Audio blocked.</h1>
      <p class="subtle" style="margin-top:10px;margin-bottom:18px">The sweep cannot start until sound can leave the phone speaker.</p>
      <div class="check-stack">
        <div class="check-row"><div class="mark">${ic.bluetooth}</div><div class="body"><div class="t">Bluetooth still connected</div><div class="s">Disconnect AirPods, car audio, or external speakers.</div></div></div>
        <div class="check-row"><div class="mark">${ic.sound}</div><div class="body"><div class="t">Volume permission needed</div><div class="s">Allow the app to raise volume only during the sweep.</div></div></div>
        <div class="check-row"><div class="mark">${ic.phone}</div><div class="body"><div class="t">Speaker orientation unknown</div><div class="s">Place the bottom edge slightly lower than the screen.</div></div></div>
      </div>
      <div class="spacer"></div>
      ${primary("Run checks again",8)}
    </div>`;

  const s13 = () => `
    ${statusbar}
    <div class="page">
      ${topbar({backTo:9, center:`<div class="state-pill warming"><span class="sdot"></span>Paused</div>`})}
      ${evidence(img.clean,"wide-evidence soft","paused sweep")}
      <h1 class="display">Paused safely.</h1>
      <p class="subtle" style="margin-top:10px">The speaker is still wet. Resume within 10 minutes or restart the safety check.</p>
      <div class="clean-segs"><span class="seg done"></span><span class="seg active"><i style="width:28%"></i></span><span class="seg"></span></div>
      <div class="spacer"></div>
      <div class="clean-controls">
        <button class="zbtn" aria-label="Skip current pass">${ic.skip}</button>
        <button class="zbtn primary" aria-label="Resume cleaning" data-go="9">${ic.play}</button>
        <button class="zbtn danger" aria-label="Stop cleaning">${ic.stop}</button>
      </div>
      <div class="zhint">resume continues the same protocol</div>
    </div>`;

  const screens = {
    0:{title:"Splash", note:"Calm brand mark", html:s0},
    1:{title:"Onboarding evidence", note:"Generated macro hero", html:s1},
    2:{title:"Problem", note:"Accessible choices", html:s2},
    3:{title:"Safety setup", note:"Concrete setup checklist", html:s3},
    4:{title:"Targets", note:"Speaker selection", html:s4},
    5:{title:"Calibration", note:"Frequency curve", html:s5},
    6:{title:"Protocol", note:"Transparent plan", html:s6},
    7:{title:"Safety gate", note:"Blocked Bluetooth", html:s7},
    8:{title:"Paywall", note:"Protocol unlock", html:s8},
    9:{title:"Active cleaning", note:"Generated ejection visual", html:s9},
    10:{title:"Result evidence", note:"Before and after", html:s10},
    11:{title:"Home", note:"Target and method", html:s11},
    12:{title:"Blocked audio", note:"Recovery state", html:s12},
    13:{title:"Paused", note:"Interrupted clean", html:s13},
  };

  window.CleanSpeakerV5 = { screens, img };
})();
