// app.jsx — CleanSpeaker main app

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "startScreen": "splash",
  "isPro": false,
  "adsVisible": true,
  "accent": "#2E6BFF",
  "cleanSpeed": 1
}/*EDITMODE-END*/;

const ACCENTS = [
  ['#2E6BFF', '#5C8DFF'],
  ['#0EA5E9', '#22D3EE'],
  ['#22C55E', '#86EFAC'],
  ['#A855F7', '#EC4899'],
  ['#F1B53A', '#FF8E53'],
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // route: 'splash' | 'onboarding' | 'trust' | 'paywall' | 'special' | 'app'
  // sub on 'app': active tab
  const [route, setRoute] = useState(t.startScreen);
  const [tab, setTab] = useState('clean');
  // overlay screens (within app)
  const [overlay, setOverlay] = useState(null); // 'soundTest' | 'speakerTest' | 'result' | 'support' | 'paywall' | 'special'

  // Apply accent
  useEffect(() => {
    const root = document.documentElement;
    if (t.accent) {
      root.style.setProperty('--blue', t.accent);
      // also derive faint/soft variants approximately by mixing white — keep static-ish for now
    }
  }, [t.accent]);

  // Make startScreen tweak change route live (without resetting on every tweak change)
  useEffect(() => {
    setRoute(t.startScreen);
  }, [t.startScreen]);

  const goCleanFinish = () => setOverlay('soundTest');

  // ── Render route ───
  let body;
  if (route === 'splash') {
    body = <SplashScreen onContinue={() => setRoute('onboarding')}/>;
  } else if (route === 'onboarding') {
    body = <OnboardingScreen onContinue={() => setRoute('trust')}/>;
  } else if (route === 'trust') {
    body = <TrustScreen onContinue={() => setRoute('paywall')}/>;
  } else if (route === 'paywall') {
    body = <PaywallScreen
      onClose={() => setRoute('special')}
      onContinue={() => { setTweak('isPro', true); setRoute('app'); }}/>;
  } else if (route === 'special') {
    body = <SpecialOfferScreen
      onClose={() => setRoute('app')}
      onContinue={() => { setTweak('isPro', true); setRoute('app'); }}/>;
  } else if (route === 'app') {
    body = (
      <AppShell
        tab={tab}
        setTab={setTab}
        isPro={t.isPro}
        adsVisible={t.adsVisible && !t.isPro}
        overlay={overlay}
        setOverlay={setOverlay}
        onCleanFinish={goCleanFinish}
        onOpenPaywall={() => setOverlay('paywall')}
        cleanSpeed={t.cleanSpeed}
        setTweak={setTweak}
      />
    );
  }

  return (
    <>
      {body}
      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Flow">
            <TweakSelect label="Start at" value={t.startScreen}
              onChange={v => setTweak('startScreen', v)}
              options={[
                ['splash', 'Splash'],
                ['onboarding', 'Onboarding'],
                ['trust', 'Trust screen'],
                ['paywall', 'Paywall'],
                ['special', 'Special offer'],
                ['app', 'Main app'],
              ]}/>
          </TweakSection>
          <TweakSection title="Monetization">
            <TweakToggle label="Pro user" value={t.isPro}
              onChange={v => setTweak('isPro', v)}/>
            <TweakToggle label="Show ads" value={t.adsVisible}
              onChange={v => setTweak('adsVisible', v)}/>
          </TweakSection>
          <TweakSection title="Cleaner">
            <TweakSlider label="Demo speed" value={t.cleanSpeed} min={0.5} max={20} step={0.5}
              onChange={v => setTweak('cleanSpeed', v)}/>
          </TweakSection>
          <TweakSection title="Theme">
            <TweakColor label="Accent" value={t.accent}
              onChange={v => setTweak('accent', v)}
              options={ACCENTS.map(a => a[0])}/>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

// ─── App shell: tabs + overlay screens ────────────────────
function AppShell({ tab, setTab, isPro, adsVisible, overlay, setOverlay, onCleanFinish, onOpenPaywall, cleanSpeed, setTweak }) {
  let tabBody;
  if (tab === 'clean') {
    tabBody = <CleanScreen key={'clean'} isPro={isPro} onFinish={onCleanFinish} speedMul={cleanSpeed}/>;
  } else if (tab === 'manual') {
    tabBody = <ManualScreen isPro={isPro} onOpenPaywall={onOpenPaywall}/>;
  } else if (tab === 'settings') {
    tabBody = <SettingsScreen
      isPro={isPro}
      onOpenPaywall={onOpenPaywall}
      onOpenSupport={() => setOverlay('support')}
      onOpenSpeakerTest={() => setOverlay('speakerTest')}
      onOpenSoundTest={() => setOverlay('soundTest')}/>;
  }

  return (
    <div className="cs-screen">
      <StatusBar/>
      <div style={{flex: 1, minHeight: 0, position:'relative', display:'flex', flexDirection:'column', overflow:'hidden'}}>
        {tabBody}

        {/* In-app overlay screens (kept inside content area, above tab body) */}
        {overlay === 'soundTest' && (
          <Overlay>
            <SoundTestScreen onBack={() => setOverlay(null)} onContinue={() => setOverlay('result')}/>
          </Overlay>
        )}
        {overlay === 'speakerTest' && (
          <Overlay>
            <SpeakerTestScreen onBack={() => setOverlay(null)}/>
          </Overlay>
        )}
        {overlay === 'result' && (
          <Overlay>
            <ResultScreen onDone={() => setOverlay(null)}/>
          </Overlay>
        )}
        {overlay === 'support' && (
          <Overlay>
            <SupportScreen onBack={() => setOverlay(null)}/>
          </Overlay>
        )}
      </div>

      {/* AdMob banner (free users) */}
      {adsVisible && <AdBanner onClick={onOpenPaywall}/>}

      {/* Tab bar */}
      <TabBar active={tab} onTabChange={setTab} onOpenPaywall={onOpenPaywall}/>

      {/* Paywall + Special offer: FULL-SCREEN overlays that cover status bar, ad banner AND tab bar.
          Their own StatusBar is the only one shown (no duplicate). */}
      {overlay === 'paywall' && (
        <FullScreenOverlay>
          <PaywallScreen onClose={() => setOverlay('special')}
            onContinue={() => { setTweak('isPro', true); setOverlay(null); }}/>
        </FullScreenOverlay>
      )}
      {overlay === 'special' && (
        <FullScreenOverlay>
          <SpecialOfferScreen onClose={() => setOverlay(null)}
            onContinue={() => { setTweak('isPro', true); setOverlay(null); }}/>
        </FullScreenOverlay>
      )}
    </div>
  );
}

function Overlay({ children }) {
  return (
    <div style={{
      position:'absolute', inset: 0, background:'#E9F1FD',
      zIndex: 10, display:'flex', flexDirection:'column',
      animation:'csSlideUp 280ms var(--ease)',
    }}>
      {children}
    </div>
  );
}

// Covers the entire phone screen — sits above status bar, ad banner and tab bar.
function FullScreenOverlay({ children }) {
  return (
    <div style={{
      position:'absolute', inset: 0, background:'#fff',
      zIndex: 50, display:'flex', flexDirection:'column',
      animation:'csSlideUp 280ms var(--ease)',
    }}>
      {children}
    </div>
  );
}

// Mount
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
