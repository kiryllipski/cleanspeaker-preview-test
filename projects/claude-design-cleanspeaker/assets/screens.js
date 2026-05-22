/* CleanSpeaker — screen templates */
(function(){
  const ic = {
    back:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    close:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    water:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 14a3 3 0 0 0 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".6"/></svg>`,
    dust:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="1.5" fill="currentColor"/><circle cx="14" cy="5" r="1" fill="currentColor"/><circle cx="18" cy="9" r="1.8" fill="currentColor"/><circle cx="10" cy="12" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/><circle cx="7" cy="17" r="1" fill="currentColor"/><circle cx="20" cy="18" r="1.3" fill="currentColor"/></svg>`,
    muffle:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 10v4M8 7v10M12 4v16M16 9v6M20 11v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    volume:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10v4h3l4 3V7L6 10H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 9c1.2 1 1.2 5 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></svg>`,
    deep:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>`,
    play:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7V5z"/></svg>`,
    pause:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`,
    stop:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`,
    skip:`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5l8 7-8 7V5zM15 5h3v14h-3V5z"/></svg>`,
    star:`<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.7l-5.4 2.8 1.2-6L3.3 9.3l6.1-.7L12 3z"/></svg>`,
    check:`<svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-11" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrow:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shield:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 8v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    sound:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 9v6h4l5 4V5L8 9H4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 8c2 2 2 6 0 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    history:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1 0 3-6.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M3 4v5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    home:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    settings:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.5.9a7 7 0 0 0-2-1.2l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.5-.9-2 3.5L5.1 10.8A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2.1 1.6 2 3.5 2.5-.9c.6.5 1.2.9 2 1.2l.4 2.6h4l.4-2.6c.7-.3 1.4-.7 2-1.2l2.5.9 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
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

  // helper: hero waveform
  const heroWave = () => {
    let bars = "";
    const heights = [22,38,55,72,90,72,55,42,68,95,72,55,38,28,46,66,82,60,40,22];
    heights.forEach((h,i)=>bars += `<span style="height:${h}%;animation-delay:${i*70}ms"></span>`);
    return `<div class="hero-wave">
      <div class="ring r3"></div><div class="ring r2"></div><div class="ring"></div>
      <div class="bars">${bars}</div>
    </div>`;
  };

  // ===== Screen 1: Onboarding Start =====
  const s1 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><div></div><button class="skip">Skip</button></div>
      ${heroWave()}
      <div class="eyebrow" style="margin-top:auto">SOUND-WAVE SPEAKER CARE</div>
      <h1 class="display big" style="margin-top:10px">Rescue your <span class="acc">muffled speaker</span> in 60 seconds.</h1>
      <p class="subtle" style="margin-top:12px">Calibrated frequency sweeps push out water, dust, and debris — used by audio engineers, now in your pocket.</p>
      <div class="spacer"></div>
      <div class="trust"><div class="b"><span class="dot"></span>2.1M cleans</div><div class="b"><span class="dot"></span>4.9 ★ rating</div><div class="b"><span class="dot"></span>Lab-tested</div></div>
      <button class="cta" data-go="2">Start Speaker Check ${ic.arrow}</button>
      <div class="tertiary">No account needed · Works offline</div>
    </div>`;

  // ===== Screen 2: Problem Selection =====
  const s2 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="1">${ic.back}</button><button class="skip">1 / 3</button></div>
      <div class="progress"><span class="on"></span><span></span><span></span></div>
      <h1 class="display">What's wrong with your speaker?</h1>
      <p class="subtle" style="margin-top:8px;margin-bottom:18px">Choose the issue closest to yours — we'll tune the rescue plan.</p>
      <div class="option-list">
        <button class="option sel"><div class="icon">${ic.water}</div><div class="body"><div class="title">Water inside</div><div class="sub">Got wet, rain, drink, pool</div></div><div class="check">${ic.check}</div></button>
        <button class="option"><div class="icon">${ic.muffle}</div><div class="body"><div class="title">Muffled or distorted</div><div class="sub">Sound is unclear, crackly</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.dust}</div><div class="body"><div class="title">Dust & lint</div><div class="sub">Built up in the grille</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.volume}</div><div class="body"><div class="title">Low volume</div><div class="sub">Quieter than before</div></div><div class="check"></div></button>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="3">Continue ${ic.arrow}</button>
    </div>`;

  // ===== Screen 3: Condition / Urgency =====
  const s3 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="2">${ic.back}</button><button class="skip">2 / 3</button></div>
      <div class="progress"><span class="on"></span><span class="on"></span><span></span></div>
      <h1 class="display">When did it happen?</h1>
      <p class="subtle" style="margin-top:8px;margin-bottom:18px">Time matters — fresh water damage clears faster.</p>
      <div class="option-list">
        <button class="option sel"><div class="icon" style="color:#FF6B8A;background:linear-gradient(135deg,rgba(255,107,138,.18),rgba(42,123,255,.04));box-shadow:inset 0 0 0 1px rgba(255,107,138,.3),0 0 18px rgba(255,107,138,.18)">${ic.info}</div><div class="body"><div class="title">Within the last hour</div><div class="sub">Critical — start cleaning now</div></div><div class="check">${ic.check}</div></button>
        <button class="option"><div class="icon">${ic.info}</div><div class="body"><div class="title">Today</div><div class="sub">Still very recoverable</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.info}</div><div class="body"><div class="title">A few days ago</div><div class="sub">Needs Deep Clean</div></div><div class="check"></div></button>
        <button class="option"><div class="icon">${ic.info}</div><div class="body"><div class="title">Not sure</div><div class="sub">We'll run a sound test first</div></div><div class="check"></div></button>
      </div>
      <div class="safety" style="margin-top:14px">
        <span class="ic">${ic.shield}</span>
        Power off Bluetooth headphones. Place phone speaker-down on a soft surface.
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="4">Build my rescue plan ${ic.arrow}</button>
    </div>`;

  // ===== Screen 4: Rescue Plan Ready =====
  const s4 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="3">${ic.back}</button><div></div></div>
      <div class="eyebrow" style="margin-top:6px">PLAN READY · CRITICAL CASE</div>
      <h1 class="display big" style="margin-top:8px">Your personal <span class="acc">rescue protocol</span></h1>
      <div class="plan-card" style="margin-top:14px">
        <div class="plan-meta"><span class="dot"></span>4-step deep recovery · ~ 2 min 40s</div>
        <div class="plan-title">Water + Muffled Sound Fix</div>
        <div class="plan-steps">
          <div class="step"><div class="n">1</div>Low-freq water eject sweep<span class="meta">165 Hz · 40s</span></div>
          <div class="step"><div class="n">2</div>Mid-freq dust dislodge<span class="meta">880 Hz · 35s</span></div>
          <div class="step"><div class="n">3</div>High-freq cone reset<span class="meta">4 kHz · 45s</span></div>
          <div class="step"><div class="n">4</div>Deep Clean Pro pass<span class="meta">60–14k · 60s</span></div>
        </div>
      </div>
      <p class="subtle" style="margin-top:14px;text-align:center">Hold your phone speaker-down. Don't worry — this won't damage anything.</p>
      <div class="spacer"></div>
      <button class="cta glow" data-go="5">Unlock Rescue Plan ${ic.arrow}</button>
      <div class="tertiary">Step 1 free · Steps 2–4 included with trial</div>
    </div>`;

  // ===== Screen 5: Feedback / Rating Moment =====
  const s5 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="4">${ic.back}</button><button class="skip" data-go="6">Skip</button></div>
      <div style="text-align:center;margin-top:24px">
        <div style="display:inline-flex;width:64px;height:64px;border-radius:20px;background:linear-gradient(135deg,rgba(94,230,255,.18),rgba(42,123,255,.04));box-shadow:inset 0 0 0 1px rgba(94,230,255,.3);align-items:center;justify-content:center;color:var(--cyan);margin-bottom:16px">${ic.sound}</div>
      </div>
      <h1 class="display" style="text-align:center">Help us tune <span class="acc">your fix</span></h1>
      <p class="subtle" style="text-align:center;margin-top:10px">How confident do you feel before we start? Your answer makes future sweeps better for you.</p>
      <div class="stars">
        <div class="star">${ic.star}</div>
        <div class="star">${ic.star}</div>
        <div class="star">${ic.star}</div>
        <div class="star on">${ic.star}</div>
        <div class="star on">${ic.star}</div>
      </div>
      <div class="testimonial">
        "Cleared a glass of water from my Pixel in 90 seconds. Sound is back to crisp — felt like magic."
        <div class="who"><div class="avi"></div>Maya · 4 days ago · verified clean</div>
      </div>
      <div class="spacer"></div>
      <button class="cta" data-go="6">Submit & Continue ${ic.arrow}</button>
      <div class="tertiary">Internal only · We'll ask for a Play Store review after a successful clean.</div>
    </div>`;

  // ===== Screen 6: Special Offer Paywall =====
  const s6 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="5">${ic.close}</button><div></div></div>
      <div style="height:14px"></div>
      <div class="eyebrow">SPECIAL ONE-TIME OFFER · UNLOCKS RESCUE PLAN</div>
      <h1 class="display big" style="margin-top:8px">Get unlimited <span class="acc">speaker rescues</span></h1>
      <p class="subtle" style="margin-top:8px">Your full plan is ready. Activate to start the deep clean — cancel anytime in Settings.</p>
      <div class="bullet-list">
        <div class="bullet"><span class="tick">${ic.check}</span>Deep Clean Pro</div>
        <div class="bullet"><span class="tick">${ic.check}</span>Unlimited cycles</div>
        <div class="bullet"><span class="tick">${ic.check}</span>Manual Hz control</div>
        <div class="bullet"><span class="tick">${ic.check}</span>Ad-free forever</div>
        <div class="bullet"><span class="tick">${ic.check}</span>Sound test suite</div>
        <div class="bullet"><span class="tick">${ic.check}</span>Cleaning history</div>
      </div>
      <div class="tier-list">
        <div class="tier featured">
          <div class="ribbon">3-Day Free Trial</div>
          <div><div class="name">Weekly · Most popular</div><div class="desc">$0 today, then $6.99/wk</div></div>
          <div class="right"><div class="price">FREE</div><div class="per">3 days, then $6.99/wk</div></div>
        </div>
        <div class="tier">
          <div><div class="name">Yearly</div><div class="desc">Save 78% · billed once</div></div>
          <div class="right"><div class="price">$29.99</div><div class="per">$0.58 / week</div></div>
        </div>
        <div class="tier">
          <div><div class="name">Lifetime</div><div class="desc">One payment, all features forever</div></div>
          <div class="right"><div class="price">$49.99</div><div class="per">once</div></div>
        </div>
      </div>
      <div class="spacer"></div>
      <button class="cta glow" data-go="7">Start Free & Begin Clean ${ic.arrow}</button>
      <div class="tertiary">No charge today · Cancel anytime · <u>Restore</u> · <u>Terms</u></div>
    </div>`;

  // ===== Screen 7: Active Cleaning =====
  const s7 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="6">${ic.back}</button><div style="font-size:11px;color:var(--text-2);letter-spacing:0.14em">DEEP CLEAN · STAGE 2/3</div><button class="icon-btn">${ic.info}</button></div>
      <div class="dial-wrap">
        <div class="dial-glow"></div>
        <svg class="dial-svg" width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#5EE6FF"/>
              <stop offset="1" stop-color="#9B6BFF"/>
            </linearGradient>
          </defs>
          <circle class="track" cx="150" cy="150" r="130"/>
          <circle class="arc" cx="150" cy="150" r="130" stroke-dasharray="816.8" stroke-dashoffset="245"/>
        </svg>
        <div class="dial-center">
          <div class="dial-hz">880<span class="unit">Hz</span></div>
          <div class="dial-label">Mid-freq sweep</div>
          <div class="dial-time">01:24 remaining</div>
        </div>
      </div>
      <div class="stage-bar">
        <div class="seg done">${ic.check} Water</div>
        <div class="seg active">Dust</div>
        <div class="seg">Cone</div>
      </div>
      <div class="control-row">
        <button class="ctrl">${ic.skip}</button>
        <button class="ctrl primary">${ic.pause}</button>
        <button class="ctrl">${ic.stop}</button>
      </div>
      <div class="safety">
        <span class="ic">${ic.shield}</span>
        Volume locked at safe level · Hold phone speaker-down for best results
      </div>
      <div class="spacer"></div>
      <button class="cta ghost" data-go="8">Skip to Result (demo) ${ic.arrow}</button>
    </div>`;

  // ===== Screen 8: Result / Sound Test =====
  const s8 = () => `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="7">${ic.back}</button><div></div></div>
      <div style="margin-top:6px;display:flex;align-items:center;gap:10px">
        <div style="width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,rgba(82,229,163,.22),rgba(34,181,224,.05));box-shadow:inset 0 0 0 1px rgba(82,229,163,.3);display:flex;align-items:center;justify-content:center;color:var(--green)">${ic.check.replace('width="11" height="11"','width="20" height="20"')}</div>
        <div><div class="eyebrow" style="color:var(--green)">CLEAN COMPLETE</div><div style="font-size:13px;color:var(--text-2);margin-top:2px">2 min 38s · 3 stages run</div></div>
      </div>
      <h1 class="display big" style="margin-top:14px">Sound clarity restored <span class="acc">+42%</span></h1>
      <div class="compare">
        <div class="col">
          <div class="lbl">Before</div>
          <div class="val">58<span style="font-size:13px;color:var(--text-3);margin-left:3px">dB</span></div>
          <div class="mini-wave"><span style="height:30%"></span><span style="height:50%"></span><span style="height:35%"></span><span style="height:55%"></span><span style="height:40%"></span><span style="height:25%"></span><span style="height:45%"></span><span style="height:30%"></span></div>
        </div>
        <div class="col after">
          <div class="lbl">After</div>
          <div class="val">82<span style="font-size:13px;color:var(--text-3);margin-left:3px">dB</span></div>
          <div class="mini-wave"><span style="height:70%"></span><span style="height:90%"></span><span style="height:60%"></span><span style="height:95%"></span><span style="height:80%"></span><span style="height:65%"></span><span style="height:88%"></span><span style="height:75%"></span></div>
        </div>
      </div>
      <p class="subtle" style="text-align:center;margin-top:4px">Play a quick sound test to confirm the fix. If it's still muffled, run a Deep Clean Pro pass.</p>
      <div class="spacer"></div>
      <button class="cta glow" data-go="9">Run Sound Test ${ic.sound.replace('width="20" height="20"','width="16" height="16"')}</button>
      <button class="cta ghost" style="margin-top:10px" data-go="9">Done — Go Home</button>
    </div>`;

  // ===== Screen 9: Home Screen =====
  const s9 = () => `
    ${statusbar}
    <div class="page" style="padding-bottom:90px">
      <div class="row between" style="margin-top:4px">
        <div>
          <div class="eyebrow">GOOD MORNING</div>
          <div style="font-size:22px;font-weight:700;letter-spacing:-0.02em;margin-top:2px">Speaker is <span style="color:var(--green)">healthy</span></div>
        </div>
        <button class="icon-btn">${ic.settings}</button>
      </div>
      <div class="home-hero" style="margin-top:14px">
        <div class="label">LAST CLEAN · 6h AGO</div>
        <div class="title">Deep Clean Pro</div>
        <div class="meta">+42% clarity · 3 stages · 2:38</div>
        <div class="mini-bars">
          <span style="height:30%"></span><span style="height:60%"></span><span style="height:90%"></span><span style="height:70%"></span><span style="height:45%"></span><span style="height:80%"></span><span style="height:55%"></span><span style="height:38%"></span><span style="height:70%"></span><span style="height:90%"></span><span style="height:60%"></span><span style="height:42%"></span>
        </div>
      </div>
      <div class="tinytitle">Quick Rescue</div>
      <div class="tile-grid">
        <button class="tile" data-go="7"><div class="ic">${ic.water}</div><div><div class="nm">Water Eject</div><div class="sm">~40s · low-freq sweep</div></div></button>
        <button class="tile" data-go="7"><div class="ic">${ic.dust}</div><div><div class="nm">Dust Clean</div><div class="sm">~35s · mid sweep</div></div></button>
        <button class="tile pro" data-go="7"><div class="ic">${ic.deep}</div><div><div class="nm">Deep Clean Pro</div><div class="sm">3-stage sweep · ~ 2:30</div></div></button>
        <button class="tile" data-go="10"><div class="ic">${ic.muffle}</div><div><div class="nm">Manual Hz</div><div class="sm">60 Hz – 20 kHz</div></div></button>
      </div>
      <div class="tinytitle">Diagnostics</div>
      <div class="option-list">
        <button class="option" data-go="8"><div class="icon">${ic.sound}</div><div class="body"><div class="title">Sound Test</div><div class="sub">Check stereo & clarity</div></div><div class="check" style="border:none;color:var(--text-3)">${ic.arrow}</div></button>
        <button class="option"><div class="icon">${ic.history}</div><div class="body"><div class="title">Cleaning History</div><div class="sub">12 sessions · last 6h ago</div></div><div class="check" style="border:none;color:var(--text-3)">${ic.arrow}</div></button>
      </div>
      <div class="tabbar">
        <button class="t on">${ic.home}<span>Home</span></button>
        <button class="t">${ic.sound}<span>Test</span></button>
        <button class="t">${ic.history}<span>History</span></button>
        <button class="t">${ic.settings}<span>Settings</span></button>
      </div>
    </div>`;

  // ===== Screen 10: Manual Hz (bonus) =====
  const s10 = () => {
    const heights = [12,18,22,30,38,48,62,78,90,72,55,42,30,22,16,14,18,24,32,40];
    const bars = heights.map((h,i)=>`<span class="${i>5&&i<15?'on':''}" style="height:${h}%"></span>`).join("");
    return `
    ${statusbar}
    <div class="page">
      <div class="topbar"><button class="icon-btn" data-go="9">${ic.back}</button><div style="font-size:13px;font-weight:600">Manual Hz</div><button class="icon-btn">${ic.info}</button></div>
      <div class="dial-wrap">
        <div class="dial-glow"></div>
        <svg class="dial-svg" width="300" height="300" viewBox="0 0 300 300">
          <circle class="track" cx="150" cy="150" r="130"/>
          <circle class="arc" cx="150" cy="150" r="130" stroke-dasharray="816.8" stroke-dashoffset="490"/>
        </svg>
        <div class="dial-center">
          <div class="dial-hz">2.4<span class="unit">kHz</span></div>
          <div class="dial-label">Custom frequency</div>
          <div class="dial-time">Drag dial to tune</div>
        </div>
      </div>
      <div class="hz-range">${bars}</div>
      <div class="row between" style="font-size:11px;color:var(--text-3);letter-spacing:0.06em">
        <span>60 Hz</span><span>500</span><span>2k</span><span>8k</span><span>20 kHz</span>
      </div>
      <div class="control-row" style="margin-top:18px">
        <button class="ctrl">${ic.skip}</button>
        <button class="ctrl primary">${ic.play}</button>
        <button class="ctrl">${ic.stop}</button>
      </div>
      <div class="spacer"></div>
      <div class="safety"><span class="ic">${ic.shield}</span>Pro feature · Avoid sustained tones above 16 kHz</div>
    </div>`;
  };

  const screens = {
    1:{title:"Onboarding Start",  note:"Promise + waveform hero",     html:s1},
    2:{title:"Problem Selection", note:"Pick the symptom",            html:s2},
    3:{title:"Condition & Urgency",note:"Time-based personalization", html:s3},
    4:{title:"Rescue Plan Ready", note:"Build anticipation",          html:s4},
    5:{title:"Internal Rating",   note:"Lightweight feedback",        html:s5},
    6:{title:"Special Offer Paywall",note:"3-tier with trial",        html:s6},
    7:{title:"Active Cleaning",   note:"Hero dial · 3-stage",         html:s7},
    8:{title:"Result & Sound Test",note:"Before / after",             html:s8},
    9:{title:"Home (Returning)",  note:"Quick rescue + history",      html:s9},
   10:{title:"Manual Hz · Pro",   note:"Bonus: frequency tuner",      html:s10},
  };

  window.CleanSpeaker = { screens, ic };
})();
