// CleanSpeaker Interactive App Logic & Web Audio Synthesizer

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. WORKSPACE TABS MANAGEMENT
  // ==========================================
  const sidebarButtons = document.querySelectorAll(".sidebar-btn");
  const dashboardTabs = document.querySelectorAll(".dashboard-tab");

  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");

      // Update sidebar buttons
      sidebarButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update tabs visibility
      dashboardTabs.forEach((t) => t.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");

      // Trigger special initializations
      if (tabId === "all-screens") {
        initializeScreensGrid();
      }
    });
  });

  // ==========================================
  // 2. WEB AUDIO API SYNTHESIZER
  // ==========================================
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isSoundPlaying = false;
  let audioMuted = true; // Safe default

  const globalAudioBtn = document.getElementById("btn-global-audio-mute");

  // Toggle Mute/Unmute
  globalAudioBtn.addEventListener("click", () => {
    audioMuted = !audioMuted;
    if (audioMuted) {
      globalAudioBtn.classList.add("muted");
      globalAudioBtn.querySelector("span").textContent = "AUDIO OFF";
      stopSynthSound();
    } else {
      globalAudioBtn.classList.remove("muted");
      globalAudioBtn.querySelector("span").textContent = "AUDIO ON";
      // Initialize Audio Context on user action
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    }
  });

  function startSynthSound(frequency = 290, type = "sine") {
    if (audioMuted || !audioCtx) return;

    try {
      stopSynthSound();

      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type =
        type === "sawtooth"
          ? "sawtooth"
          : type === "triangle"
            ? "triangle"
            : type === "square"
              ? "square"
              : "sine";

      oscillator.frequency.value = frequency;

      // Harmonious wave custom combination
      if (type === "harmonious") {
        oscillator.type = "sine";
        // Add a secondary harmonic subtle layer
        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        subOsc.type = "triangle";
        subOsc.frequency.value = frequency * 1.5; // Harmonic ratio
        subGain.gain.value = 0.05;
        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start();
        // Bind to parent reference to kill later
        oscillator.subOsc = subOsc;
        oscillator.subGain = subGain;
      }

      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // Low safe volume
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      isSoundPlaying = true;
    } catch (e) {
      console.warn("Audio Context error: ", e);
    }
  }

  function updateSynthFrequency(frequency) {
    if (!isSoundPlaying || !oscillator) return;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    if (oscillator.subOsc) {
      oscillator.subOsc.frequency.setValueAtTime(
        frequency * 1.5,
        audioCtx.currentTime,
      );
    }
  }

  function stopSynthSound() {
    if (oscillator) {
      try {
        oscillator.stop();
        if (oscillator.subOsc) {
          oscillator.subOsc.stop();
        }
      } catch (e) {}
      oscillator = null;
    }
    isSoundPlaying = false;
  }

  // ==========================================
  // 3. VIRTUAL PHONE STATE MACHINE
  // ==========================================
  const phoneScreens = {
    splash: document.getElementById("view-splash"),
    onboarding: document.getElementById("view-onboarding"),
    trust: document.getElementById("view-trust"),
    paywall: document.getElementById("view-paywall"),
    specialOffer: document.getElementById("view-special-offer"),
    appShell: document.getElementById("view-app-shell"),
    soundTest: document.getElementById("view-sound-test"),
    result: document.getElementById("view-result"),
  };

  const deviceFrame = document.getElementById("simulated-device-frame");

  // Pro features status
  let isUserPro = false;

  window.simulator = {
    jumpToScreen: function (screenKey) {
      // Clear active cleaners or sounds
      stopCleaningCycle();
      stopManualSound();
      stopSynthSound();
      closeAllPopovers();
      hideMockPopup("modalSupportSupport");
      hideMockPopup("modalGooglePlayRating");

      // Reset screen classes
      Object.keys(phoneScreens).forEach((k) => {
        phoneScreens[k].classList.remove("active");
      });

      if (phoneScreens[screenKey]) {
        phoneScreens[screenKey].classList.add("active");
      }

      // Toggle global header display if shell is active
      if (screenKey === "appShell") {
        globalAudioBtn.style.opacity = "1";
        globalAudioBtn.style.pointerEvents = "auto";
      } else {
        globalAudioBtn.style.opacity = "0";
        globalAudioBtn.style.pointerEvents = "none";
      }

      // Special transitions
      if (screenKey === "splash") {
        setTimeout(() => {
          if (phoneScreens.splash.classList.contains("active")) {
            this.jumpToScreen("onboarding");
          }
        }, 2200);
      }
    },

    jumpToState: function (stateKey, btnEl) {
      // Highlight active remote button
      document
        .querySelectorAll(".remote-btn")
        .forEach((b) => b.classList.remove("active-remote"));
      if (btnEl) btnEl.classList.add("active-remote");

      // Helper to switch shell tabs
      const switchShellTab = (tabKey) => {
        this.jumpToScreen("appShell");
        shellTabButtons.forEach((b) => b.classList.remove("active"));
        const btn = document.querySelector(
          `.nav-item-btn[data-shell-tab="${tabKey}"]`,
        );
        if (btn) btn.classList.add("active");

        shellTabViews.forEach((v) => v.classList.remove("active"));
        const view = document.getElementById(`shell-tab-${tabKey}`);
        if (view) view.classList.add("active");
      };

      switch (stateKey) {
        case "splash":
          this.jumpToScreen("splash");
          break;
        case "onboarding-0":
        case "onboarding-1":
        case "onboarding-2":
          this.jumpToScreen("onboarding");
          const slideIdx = parseInt(stateKey.split("-")[1]);
          onboardingSlides.forEach((s) => s.classList.remove("active"));
          onboardingDots.forEach((d) => d.classList.remove("active"));
          onboardingSlides[slideIdx].classList.add("active");
          onboardingDots[slideIdx].classList.add("active");
          currentOnboardingSlide = slideIdx;
          break;
        case "trust":
          this.jumpToScreen("trust");
          break;
        case "rate-dialog":
          switchShellTab("cleaner");
          showMockPopup("modalGooglePlayRating");
          break;
        case "cleaner-idle":
          switchShellTab("cleaner");
          break;
        case "cleaner-active":
          switchShellTab("cleaner");
          startCleaningCycle();
          break;
        case "manual":
          switchShellTab("manual");
          break;
        case "manual-wave":
          switchShellTab("manual");
          popoverWaveMenu.style.display = "block";
          break;
        case "manual-vib":
          switchShellTab("manual");
          popoverVibMenu.style.display = "block";
          break;
        case "sound-test":
          this.jumpToScreen("soundTest");
          break;
        case "sound-test-active":
          this.jumpToScreen("soundTest");
          startTestingAcoustics();
          break;
        case "result":
          this.jumpToScreen("result");
          break;
        case "settings":
          switchShellTab("settings");
          break;
        case "support-modal":
          switchShellTab("settings");
          showMockPopup("modalSupportSupport");
          break;
        case "paywall":
          this.jumpToScreen("paywall");
          break;
        case "special-offer":
          this.jumpToScreen("specialOffer");
          break;
      }
    },

    setProStatus: function (isPro) {
      upgradeUserToPro(isPro);

      const badge = document.getElementById("remoteProStatusBadge");
      const freeBtn = document.getElementById("btnToggleFreeMode");
      const proBtn = document.getElementById("btnToggleProMode");

      if (isPro) {
        badge.textContent = "PREMIUM MODE";
        badge.style.background = "var(--primary)";
        proBtn.classList.add("active-pro");
        freeBtn.classList.remove("active-free");
      } else {
        badge.textContent = "FREE MODE";
        badge.style.background = "var(--dark-indigo-light)";
        proBtn.classList.remove("active-pro");
        freeBtn.classList.add("active-free");
      }
    },
  };

  // Splash Screen automatic redirect
  setTimeout(() => {
    if (phoneScreens.splash.classList.contains("active")) {
      window.simulator.jumpToScreen("onboarding");
    }
  }, 2200);

  // ==========================================
  // 4. ONBOARDING CAROUSEL SLIDES
  // ==========================================
  const onboardingContinueBtn = document.getElementById(
    "btn-onboarding-continue",
  );
  const onboardingSlides = document.querySelectorAll(".onboarding-slide");
  const onboardingDots = document.querySelectorAll("#carouselIndicators .dot");
  let currentOnboardingSlide = 0;

  onboardingContinueBtn.addEventListener("click", () => {
    if (currentOnboardingSlide < onboardingSlides.length - 1) {
      // Move to next onboarding slide
      onboardingSlides[currentOnboardingSlide].classList.remove("active");
      onboardingDots[currentOnboardingSlide].classList.remove("active");

      currentOnboardingSlide++;

      onboardingSlides[currentOnboardingSlide].classList.add("active");
      onboardingDots[currentOnboardingSlide].classList.add("active");
    } else {
      // Advance to Trust page
      window.simulator.jumpToScreen("trust");
    }
  });

  // ==========================================
  // 5. TRUST SCREEN REVIEW ROTATION
  // ==========================================
  const trustReviews = [
    document.getElementById("trustReview1"),
    document.getElementById("trustReview2"),
  ];
  let activeReviewIdx = 0;

  setInterval(() => {
    if (phoneScreens.trust.classList.contains("active")) {
      trustReviews[activeReviewIdx].classList.remove("active");
      activeReviewIdx = (activeReviewIdx + 1) % trustReviews.length;
      trustReviews[activeReviewIdx].classList.add("active");
    }
  }, 3800);

  const trustContinueBtn = document.getElementById("btn-trust-continue");

  trustContinueBtn.addEventListener("click", () => {
    // Social Hook: Show standard rating dialog inside phone before paywall
    showMockPopup("modalGooglePlayRating");
  });

  // ==========================================
  // 6. PAYWALL & DEEP SUBSCRIPTION CONVERSIONS
  // ==========================================
  const paywallCards = document.querySelectorAll(".paywall-card");
  const paywallCloseBtn = document.getElementById("btn-close-paywall");
  const paywallSubscribeBtn = document.getElementById("btn-paywall-subscribe");

  const specialOfferCloseBtn = document.getElementById(
    "btn-close-special-offer",
  );
  const specialOfferBuyBtn = document.getElementById("btn-special-offer-buy");

  // Handle plan select clicks
  paywallCards.forEach((card) => {
    card.addEventListener("click", () => {
      paywallCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const option = card.getAttribute("data-option");
      if (option === "yearly") {
        paywallSubscribeBtn.textContent = "Try 3 Days Free & Start";
      } else {
        paywallSubscribeBtn.textContent = "Unlock CleanSpeaker Pro";
      }
    });
  });

  // Closing first paywall triggers Special Offer Upsell
  paywallCloseBtn.addEventListener("click", () => {
    window.simulator.jumpToScreen("specialOffer");
  });

  paywallSubscribeBtn.addEventListener("click", () => {
    upgradeUserToPro(true);
  });

  // Special discount page
  specialOfferCloseBtn.addEventListener("click", () => {
    // User declined Pro entirely, route to Free mode
    upgradeUserToPro(false);
  });

  specialOfferBuyBtn.addEventListener("click", () => {
    upgradeUserToPro(true);
  });

  function upgradeUserToPro(proStatus) {
    isUserPro = proStatus;

    // Configure visual adjustments based on Pro status
    const banner = document.getElementById("shellAdMobBanner");
    const proNavBadge = document.querySelector(".nav-pro-badge");
    const promoCard = document.getElementById("btnSettingsPromoPro");
    const removeAdsBtn = document.getElementById("btnSettingRemoveAds");

    if (isUserPro) {
      banner.classList.add("admob-pro-user-hidden");
      proNavBadge.style.opacity = "0.5";
      proNavBadge.style.pointerEvents = "none";
      if (promoCard) promoCard.style.display = "none";
      if (removeAdsBtn) removeAdsBtn.style.display = "none";
      showToastNotification("✨ Premium active. All AdMob banners hidden!");
    } else {
      banner.classList.remove("admob-pro-user-hidden");
      proNavBadge.style.opacity = "1";
      proNavBadge.style.pointerEvents = "auto";
      if (promoCard) promoCard.style.display = "block";
      if (removeAdsBtn) removeAdsBtn.style.display = "flex";
      showToastNotification("Starting in Free mode with AdMob support.");
    }

    window.simulator.jumpToScreen("appShell");
  }

  // ==========================================
  // 7. MAIN APP SHELL TABS (CLEAN, MANUAL, PRO, SETTINGS)
  // ==========================================
  const shellTabButtons = document.querySelectorAll(".nav-item-btn");
  const shellTabViews = document.querySelectorAll(".shell-tab-view");

  shellTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabKey = btn.getAttribute("data-shell-tab");

      if (tabKey === "pro") {
        // Redirect back to premium pricing
        window.simulator.jumpToScreen("paywall");
        return;
      }

      // Stop ongoing manual sounds on tab shift
      stopManualSound();
      stopSynthSound();
      closeAllPopovers();

      shellTabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      shellTabViews.forEach((v) => v.classList.remove("active"));
      document.getElementById(`shell-tab-${tabKey}`).classList.add("active");
    });
  });

  // ==========================================
  // 8. TAB A: AUTOMATIC CLEANER LOGIC (ACCELERATED COUNTDOWN)
  // ==========================================
  const startStopCleanerBtn = document.getElementById("btnCleanerStartStop");
  const cleanerCircleProgress = document.getElementById(
    "cleanerCircleProgress",
  );
  const cleanerProgressTime = document.getElementById("cleanerProgressTime");
  const cleanerProgressLabel = document.getElementById("cleanerProgressLabel");
  const cleanerProgressPct = document.getElementById("cleanerProgressPct");
  const cleanerPlayIcon = document.getElementById("cleanPlayIcon");
  const cleanerStopIcon = document.getElementById("cleanStopIcon");

  let cleaningInterval = null;
  let isCleaningActive = false;
  let cleaningProgressSecs = 60; // 1 Minute

  startStopCleanerBtn.addEventListener("click", () => {
    if (isCleaningActive) {
      stopCleaningCycle();
    } else {
      startCleaningCycle();
    }
  });

  function startCleaningCycle() {
    isCleaningActive = true;
    cleaningProgressSecs = 60;

    // Toggle active classes
    document
      .getElementById("shell-tab-cleaner")
      .classList.add("active-cleaning-state");
    deviceFrame.classList.add("phone-vibrating-effect");

    cleanerPlayIcon.style.display = "none";
    cleanerStopIcon.style.display = "block";

    cleanerProgressLabel.textContent = "Cleaning...";

    // Web Audio Synthesizer: Trigger starting tone
    startSynthSound(150, "triangle");

    // Smooth accelerated countdown (runs at 4x speed for prototype mockup)
    cleaningInterval = setInterval(() => {
      cleaningProgressSecs--;

      // Calculate countdown display
      const displaySecs = cleaningProgressSecs % 60;
      cleanerProgressTime.textContent = `0:${displaySecs < 10 ? "0" + displaySecs : displaySecs}`;

      // Progress calculation
      const pct = Math.round(((60 - cleaningProgressSecs) / 60) * 100);
      cleanerProgressPct.textContent = `${pct}%`;

      // Ejecting stroke ring animation
      const radius = 90;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (pct / 100) * circumference;
      cleanerCircleProgress.style.strokeDashoffset = offset;

      // Real-time audio pitch sweep: vary Hz pitch during cleaning
      // Standard water ejection frequencies rise gradually from 120Hz up to 450Hz
      const syntheticHz = 120 + pct * 3.5;
      updateSynthFrequency(syntheticHz);

      // Trigger physical haptic motor vibration on Android devices
      if (navigator.vibrate && pct % 2 === 0) {
        navigator.vibrate(100);
      }

      if (cleaningProgressSecs <= 0) {
        stopCleaningCycle();
        // Redirect instantly to Sound Test post-clean
        window.simulator.jumpToScreen("soundTest");
      }
    }, 150); // Speed up for prototype: 150ms per mock second
  }

  function stopCleaningCycle() {
    isCleaningActive = false;
    clearInterval(cleaningInterval);

    document
      .getElementById("shell-tab-cleaner")
      .classList.remove("active-cleaning-state");
    deviceFrame.classList.remove("phone-vibrating-effect");

    cleanerPlayIcon.style.display = "block";
    cleanerStopIcon.style.display = "none";

    cleanerProgressLabel.textContent = "Idle";
    cleanerProgressTime.textContent = "1:00";
    cleanerProgressPct.textContent = "Ready";

    cleanerCircleProgress.style.strokeDashoffset = 565.48; // Reset stroke

    stopSynthSound();
  }

  // ==========================================
  // 9. TAB B: MANUAL SWIPE GENERATOR & GESTURES
  // ==========================================
  const gesturePad = document.getElementById("manualGesturePad");
  const manualHzDisplay = document.getElementById("manualHzDisplay");
  const triggerWaveBtn = document.getElementById("btnTriggerWavePopover");
  const triggerVibBtn = document.getElementById("btnTriggerVibPopover");

  const popoverWaveMenu = document.getElementById("popoverWaveMenu");
  const popoverVibMenu = document.getElementById("popoverVibMenu");

  let activeManualHz = 290;
  let activeManualWave = "sine";
  let activeManualVib = "off";
  let isManualSoundActive = false;

  const manualSoundBtn = document.getElementById("btnManualSoundStartStop");
  const manualPlayIcon = document.getElementById("manualPlayIcon");
  const manualStopIcon = document.getElementById("manualStopIcon");

  // Gestures dragging vertical sweep
  let dragStartY = 0;
  let dragStartHz = 290;
  let isDraggingGesture = false;

  gesturePad.addEventListener("mousedown", (e) => {
    isDraggingGesture = true;
    dragStartY = e.clientY;
    dragStartHz = activeManualHz;
    gesturePad.style.background = "rgba(37, 99, 235, 0.03)";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDraggingGesture) return;

    const deltaY = dragStartY - e.clientY;

    // Scale delta to shift frequency: upward shifts increase frequency, downward decreases
    // Use an exponential scaling curve to traverse human auditory spectrum comfortably (20Hz - 20000Hz)
    let newHz = dragStartHz + Math.round(deltaY * 1.5);

    // Constraints
    if (newHz < 20) newHz = 20;
    if (newHz > 20000) newHz = 20000;

    activeManualHz = newHz;
    manualHzDisplay.textContent = activeManualHz;

    // Update live frequency tone
    if (isManualSoundActive) {
      updateSynthFrequency(activeManualHz);
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDraggingGesture) {
      isDraggingGesture = false;
      gesturePad.style.background = "white";
    }
  });

  // Mobile Touch Gestures Support
  gesturePad.addEventListener("touchstart", (e) => {
    isDraggingGesture = true;
    dragStartY = e.touches[0].clientY;
    dragStartHz = activeManualHz;
  });

  gesturePad.addEventListener("touchmove", (e) => {
    if (!isDraggingGesture) return;
    e.preventDefault();

    const deltaY = dragStartY - e.touches[0].clientY;
    let newHz = dragStartHz + Math.round(deltaY * 2.2);

    if (newHz < 20) newHz = 20;
    if (newHz > 20000) newHz = 20000;

    activeManualHz = newHz;
    manualHzDisplay.textContent = activeManualHz;

    if (isManualSoundActive) {
      updateSynthFrequency(activeManualHz);
    }
  });

  gesturePad.addEventListener("touchend", () => {
    isDraggingGesture = false;
  });

  // Play and Stop sound manual generators
  manualSoundBtn.addEventListener("click", () => {
    if (isManualSoundActive) {
      stopManualSound();
    } else {
      startManualSound();
    }
  });

  function startManualSound() {
    isManualSoundActive = true;
    manualPlayIcon.style.display = "none";
    manualStopIcon.style.display = "block";

    startSynthSound(activeManualHz, activeManualWave);

    // If vibration mode is active, trigger haptics
    applyManualVibrationState(activeManualVib);
  }

  function stopManualSound() {
    isManualSoundActive = false;
    manualPlayIcon.style.display = "block";
    manualStopIcon.style.display = "none";

    stopSynthSound();
    deviceFrame.classList.remove("phone-vibrating-effect");
  }

  // Wave Options menu selection triggers
  triggerWaveBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popoverVibMenu.style.display = "none";
    popoverWaveMenu.style.display =
      popoverWaveMenu.style.display === "block" ? "none" : "block";
  });

  document
    .querySelectorAll("#popoverWaveMenu .pop-option-btn")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        document
          .querySelectorAll("#popoverWaveMenu .pop-option-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        activeManualWave = btn.getAttribute("data-wave");

        // Update trigger visual label text
        let label = "Sine Wave";
        if (activeManualWave === "square") label = "Square Wave";
        if (activeManualWave === "triangle") label = "Triangle Wave";
        if (activeManualWave === "sawtooth") label = "Ramp Wave";
        if (activeManualWave === "harmonious") label = "Harmonic Wave";

        document.getElementById("manualWaveText").textContent = label;
        popoverWaveMenu.style.display = "none";

        // Live change parameters
        if (isManualSoundActive) {
          startSynthSound(activeManualHz, activeManualWave);
        }
      });
    });

  // Vibration intensity selectors
  triggerVibBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popoverWaveMenu.style.display = "none";
    popoverVibMenu.style.display =
      popoverVibMenu.style.display === "block" ? "none" : "block";
  });

  document
    .querySelectorAll("#popoverVibMenu .pop-option-btn")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        document
          .querySelectorAll("#popoverVibMenu .pop-option-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        activeManualVib = btn.getAttribute("data-vib");

        let label = "Off";
        if (activeManualVib === "medium") label = "Medium";
        if (activeManualVib === "intense") label = "Intense";

        document.getElementById("manualVibText").textContent = label;
        popoverVibMenu.style.display = "none";

        // Update active device vibrator
        if (isManualSoundActive) {
          applyManualVibrationState(activeManualVib);
        }
      });
    });

  function applyManualVibrationState(vibState) {
    deviceFrame.classList.remove("phone-vibrating-effect");
    if (vibState === "medium") {
      deviceFrame.classList.add("phone-vibrating-effect");
      if (navigator.vibrate) navigator.vibrate([100, 100]);
    } else if (vibState === "intense") {
      deviceFrame.classList.add("phone-vibrating-effect");
      if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
    }
  }

  // Close menus on clicking elsewhere
  document.addEventListener("click", () => {
    closeAllPopovers();
  });

  function closeAllPopovers() {
    popoverWaveMenu.style.display = "none";
    popoverVibMenu.style.display = "none";
  }

  // ==========================================
  // 10. SOUND TEST SCREEN (Post clean)
  // ==========================================
  const startStopSoundTestBtn = document.getElementById("btnTestSoundPlay");
  const soundTestCompleteBtn = document.getElementById(
    "btn-sound-test-complete",
  );

  const soundTestPlayIcon = document.getElementById("soundTestPlayIcon");
  const soundTestStopIcon = document.getElementById("soundTestStopIcon");

  let isSoundTestActive = false;
  let testSoundInterval = null;

  startStopSoundTestBtn.addEventListener("click", () => {
    if (isSoundTestActive) {
      stopTestingAcoustics();
    } else {
      startTestingAcoustics();
    }
  });

  function startTestingAcoustics() {
    isSoundTestActive = true;
    document
      .getElementById("view-sound-test")
      .classList.add("testing-audio-active");

    soundTestPlayIcon.style.display = "none";
    soundTestStopIcon.style.display = "block";

    // Play sound test: varying harmonic sweeping frequencies to showcase clean sound range
    startSynthSound(300, "harmonious");

    let cycles = 0;
    testSoundInterval = setInterval(() => {
      cycles++;
      const sweepHz = 300 + Math.sin(cycles * 0.5) * 150;
      updateSynthFrequency(sweepHz);
    }, 100);
  }

  function stopTestingAcoustics() {
    isSoundTestActive = false;
    document
      .getElementById("view-sound-test")
      .classList.remove("testing-audio-active");

    soundTestPlayIcon.style.display = "block";
    soundTestStopIcon.style.display = "none";

    clearInterval(testSoundInterval);
    stopSynthSound();
  }

  // Interactive 5 Star selection
  const ratingStars = document.querySelectorAll("#soundTestStars svg");
  let userSelectedStars = 0;

  ratingStars.forEach((star) => {
    star.addEventListener("click", () => {
      const starVal = parseInt(star.getAttribute("data-val"));
      userSelectedStars = starVal;

      // Update stars UI
      ratingStars.forEach((s) => {
        const val = parseInt(s.getAttribute("data-val"));
        if (val <= starVal) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });

      // Dynamic post-aha conversion logic:
      // If user scores 5 stars, show native rate us dialog, otherwise route to results!
      showToastNotification(`Thanks for the ${starVal}-star rating!`);
    });
  });

  soundTestCompleteBtn.addEventListener("click", () => {
    stopTestingAcoustics();

    // Calculate simulated restoration percentage based on rating stars
    const resPercentVal = document.getElementById("resPercentVal");
    if (userSelectedStars === 5) {
      resPercentVal.textContent = "98%";
    } else if (userSelectedStars === 4) {
      resPercentVal.textContent = "92%";
    } else if (userSelectedStars > 0) {
      resPercentVal.textContent = "84%";
    } else {
      resPercentVal.textContent = "92%"; // default
    }

    window.simulator.jumpToScreen("result");
  });

  // ==========================================
  // 11. RESULTS SCREEN AND RETEST
  // ==========================================
  const resultRetestBtn = document.getElementById("btnResultRetest");
  const resultFinishBtn = document.getElementById("btn-result-finish");

  resultRetestBtn.addEventListener("click", () => {
    window.simulator.jumpToScreen("soundTest");
  });

  resultFinishBtn.addEventListener("click", () => {
    window.simulator.jumpToScreen("appShell");
  });

  // ==========================================
  // 12. SETTINGS SCREEN TRIGGERS & MESSAGES
  // ==========================================
  const btnSettingsPromoPro = document.getElementById("btnSettingsPromoPro");
  const btnSettingRemoveAds = document.getElementById("btnSettingRemoveAds");
  const btnSettingSpeakerTest = document.getElementById(
    "btnSettingSpeakerTest",
  );

  const btnSettingSupport = document.getElementById("btnSettingSupport");
  const btnSettingRateUs = document.getElementById("btnSettingRateUs");

  const bannerAdMobBtn = document.getElementById("btnAdMobCta");

  // AdMob Banner click redirects to Paywall
  bannerAdMobBtn.addEventListener("click", () => {
    window.simulator.jumpToScreen("paywall");
  });

  // Settings triggers
  if (btnSettingsPromoPro) {
    btnSettingsPromoPro.addEventListener("click", () => {
      window.simulator.jumpToScreen("paywall");
    });
  }

  if (btnSettingRemoveAds) {
    btnSettingRemoveAds.addEventListener("click", () => {
      window.simulator.jumpToScreen("paywall");
    });
  }

  btnSettingSpeakerTest.addEventListener("click", () => {
    window.simulator.jumpToScreen("soundTest");
  });

  btnSettingSupport.addEventListener("click", () => {
    showMockPopup("modalSupportSupport");
  });

  btnSettingRateUs.addEventListener("click", () => {
    showMockPopup("modalGooglePlayRating");
  });

  // ==========================================
  // 13. MOCK POPUPS DIALOGS & ACTIONS
  // ==========================================
  const modalSupport = document.getElementById("modalSupportSupport");
  const btnSupportCancel = document.getElementById("btnSupportCancel");
  const btnSupportSubmit = document.getElementById("btnSupportSubmit");

  const modalRateDialog = document.getElementById("modalGooglePlayRating");
  const btnRateDismiss = document.getElementById("btnRateDialogDismiss");
  const btnRateSubmit = document.getElementById("btnRateDialogSubmit");

  function showMockPopup(modalId) {
    const modalNode = document.getElementById(modalId);
    if (modalNode) {
      modalNode.style.display = "flex";
    }
  }

  function hideMockPopup(modalId) {
    const modalNode = document.getElementById(modalId);
    if (modalNode) {
      modalNode.style.display = "none";
    }
  }

  // Support Form Cancel & Submit
  btnSupportCancel.addEventListener("click", () => {
    hideMockPopup("modalSupportSupport");
  });

  btnSupportSubmit.addEventListener("click", () => {
    const email = document.getElementById("sup-email").value;
    const msg = document.getElementById("sup-msg").value;

    if (!email || !msg) {
      showToastNotification("Please complete all form fields.");
      return;
    }

    hideMockPopup("modalSupportSupport");
    showToastNotification(
      "📩 Message sent! Support team will respond shortly.",
    );
    document.getElementById("sup-msg").value = ""; // reset
  });

  // Native rating dialog cancel & submit
  btnRateDismiss.addEventListener("click", () => {
    hideMockPopup("modalGooglePlayRating");
    // If rating dialog was triggered from Trust Screen, route to Paywall now
    if (phoneScreens.trust.classList.contains("active")) {
      window.simulator.jumpToScreen("paywall");
    }
  });

  btnRateSubmit.addEventListener("click", () => {
    hideMockPopup("modalGooglePlayRating");
    showToastNotification("⭐️ Thank you! Rating registered in Play Store.");
    // If rating dialog was triggered from Trust Screen, route to Paywall now
    if (phoneScreens.trust.classList.contains("active")) {
      window.simulator.jumpToScreen("paywall");
    }
  });

  // Star items click inside native dialog mock
  const nativeStars = document.querySelectorAll("#dialogRateStars svg");
  nativeStars.forEach((star) => {
    star.addEventListener("click", () => {
      const idx = parseInt(star.getAttribute("data-rate"));
      nativeStars.forEach((s) => {
        const val = parseInt(s.getAttribute("data-rate"));
        if (val <= idx) {
          s.style.color = "#ffaa00";
        } else {
          s.style.color = "rgba(0, 0, 0, 0.1)";
        }
      });
    });
  });

  // Toast manager
  const toastContainer = document.getElementById("toastContainer");
  const toastMessageText = document.getElementById("toastMessageText");
  let toastTimer = null;

  function showToastNotification(message) {
    clearTimeout(toastTimer);
    toastMessageText.textContent = message;
    toastContainer.classList.add("active");

    toastTimer = setTimeout(() => {
      toastContainer.classList.remove("active");
    }, 3000);
  }

  // Update Clock Simulation every minute
  function updateStatusBarClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const clkNode = document.getElementById("statusBarClock");
    if (clkNode) clkNode.textContent = `${hours}:${minutes}`;
  }

  updateStatusBarClock();
  setInterval(updateStatusBarClock, 30000);

  // ==========================================
  // 14. ALL SCREENS STATIC CATALOG CLONING
  // ==========================================
  function initializeScreensGrid() {
    const gridLayout = document.getElementById("screensGridLayout");
    gridLayout.innerHTML = ""; // reset

    const screensToClone = [
      { id: "view-splash", title: "1. Splash Screen" },
      { id: "view-onboarding", title: "2. Onboarding Screen" },
      { id: "view-trust", title: "3. Trust Social Proof" },
      { id: "modalGooglePlayRating", title: "4. Native Rating Dialog" },
      { id: "view-paywall", title: "5. Premium Paywall" },
      { id: "view-special-offer", title: "6. Special Offer discount" },
      {
        id: "view-app-shell",
        tab: "cleaner",
        title: "7. Cleaner Screen (Idle)",
      },
      {
        id: "view-app-shell",
        tab: "cleaner-active",
        title: "8. Cleaner Screen (Active)",
      },
      { id: "view-app-shell", tab: "manual", title: "9. Manual Swipe Hertz" },
      { id: "view-sound-test", title: "10. Sound Performance Test" },
      { id: "view-result", title: "11. Success Results" },
      { id: "view-app-shell", tab: "settings", title: "12. Settings Tab" },
      { id: "modalSupportSupport", title: "13. Support Care Ticket" },
    ];

    screensToClone.forEach((item) => {
      // Create grid wrapper card
      const card = document.createElement("div");
      card.className = "screen-card-box";

      const title = document.createElement("h4");
      title.className = "screen-card-title";
      title.textContent = item.title;
      card.appendChild(title);

      // Create mobile viewport canvas
      const canvas = document.createElement("div");
      canvas.className = "phone-canvas";

      // Clock & network status bar
      const bar = document.createElement("div");
      bar.className = "phone-status-bar";
      bar.innerHTML = `
        <span>10:42</span>
        <div class="status-icons">
          <svg viewBox="0 0 24 24" style="width:12px; height:12px; fill:#333;"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c3.9 3.51 10 3.14 13.43-.8l1.43 1.43c1.54-1.23 2.28-3.18 2.28-5.61 0-4.97-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
          <svg viewBox="0 0 24 24" style="width:12px; height:12px; fill:#333;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <svg viewBox="0 0 24 24" style="width:12px; height:12px; fill:#333;"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      `;
      canvas.appendChild(bar);

      // Home bar
      const navLine = document.createElement("div");
      navLine.className = "phone-home-indicator";
      canvas.appendChild(navLine);

      // Clone screen content
      const screenWrapper = document.createElement("div");
      screenWrapper.className = "phone-screens-wrapper";

      const originalScreen = document.getElementById(item.id);
      if (originalScreen) {
        const clonedScreen = originalScreen.cloneNode(true);
        clonedScreen.id = ""; // remove duplicate IDs

        // Remove active state layers for individual static states
        clonedScreen.classList.remove("active");
        clonedScreen.style.opacity = "1";
        clonedScreen.style.visibility = "visible";
        clonedScreen.style.transform = "none";

        // Custom styling modifications based on tab keys
        if (item.tab) {
          const mainShell = clonedScreen.querySelector(".main-app-shell");
          if (mainShell) {
            // Un-active all tab view shells
            mainShell
              .querySelectorAll(".shell-tab-view")
              .forEach((v) => v.classList.remove("active"));
            mainShell
              .querySelectorAll(".nav-item-btn")
              .forEach((b) => b.classList.remove("active"));

            if (item.tab === "cleaner") {
              mainShell
                .querySelector("#shell-tab-cleaner")
                .classList.add("active");
              mainShell
                .querySelector('[data-shell-tab="cleaner"]')
                .classList.add("active");
            } else if (item.tab === "cleaner-active") {
              mainShell
                .querySelector("#shell-tab-cleaner")
                .classList.add("active");
              mainShell
                .querySelector("#shell-tab-cleaner")
                .classList.add("active-cleaning-state");
              mainShell
                .querySelector('[data-shell-tab="cleaner"]')
                .classList.add("active");
              // show stop icon instead of play
              const playI = mainShell.querySelector("#cleanPlayIcon");
              const stopI = mainShell.querySelector("#cleanStopIcon");
              if (playI) playI.style.display = "none";
              if (stopI) stopI.style.display = "block";

              // update progress mock values
              mainShell.querySelector("#cleanerProgressLabel").textContent =
                "Cleaning...";
              mainShell.querySelector("#cleanerProgressTime").textContent =
                "0:42";
              mainShell.querySelector("#cleanerProgressPct").textContent =
                "30%";
              mainShell.querySelector(
                "#cleanerCircleProgress",
              ).style.strokeDashoffset = 395.8; // 30% complete
            } else if (item.tab === "manual") {
              mainShell
                .querySelector("#shell-tab-manual")
                .classList.add("active");
              mainShell
                .querySelector('[data-shell-tab="manual"]')
                .classList.add("active");
            } else if (item.tab === "settings") {
              mainShell
                .querySelector("#shell-tab-settings")
                .classList.add("active");
              mainShell
                .querySelector('[data-shell-tab="settings"]')
                .classList.add("active");
            }
          }
        }

        // Cloned node dialog overlays must be visible within grid card borders
        if (
          item.id === "modalGooglePlayRating" ||
          item.id === "modalSupportSupport"
        ) {
          clonedScreen.style.display = "flex";
          clonedScreen.style.position = "absolute";
          clonedScreen.style.background = "rgba(0, 0, 0, 0.15)";
        }

        screenWrapper.appendChild(clonedScreen);
      }

      canvas.appendChild(screenWrapper);
      card.appendChild(canvas);
      gridLayout.appendChild(card);
    });
  }
});
