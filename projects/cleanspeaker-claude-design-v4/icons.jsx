// icons.jsx — All SVG icons for CleanSpeaker
// Stroke-based, 24x24 default

const Icon = ({ children, size = 24, stroke = 'currentColor', fill = 'none', viewBox = '0 0 24 24', strokeWidth = 1.8, ...rest }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill}
    stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
);

const IDroplet = (p) => (<Icon {...p}><path d="M12 3.5c1.6 2 6 7.2 6 10.8a6 6 0 0 1-12 0c0-3.6 4.4-8.8 6-10.8Z"/><path d="M9 14a3 3 0 0 0 3 3" /></Icon>);
const IDust = (p) => (<Icon {...p}>
  <circle cx="7" cy="7" r="1.2" /><circle cx="12" cy="5" r="0.9" />
  <circle cx="17" cy="8" r="1.2" /><circle cx="6" cy="12" r="0.9" />
  <circle cx="11" cy="12" r="1.4" /><circle cx="16" cy="13" r="1" />
  <circle cx="8" cy="17" r="1.2" /><circle cx="14" cy="18" r="1" />
  <circle cx="18" cy="17" r="0.9" />
</Icon>);
const IVolume = (p) => (<Icon {...p}><path d="M4 10v4h3l4 3V7l-4 3H4Z"/><path d="M15 9a4 4 0 0 1 0 6"/><path d="M17.5 6.5a8 8 0 0 1 0 11"/></Icon>);
const IVolumeLow = (p) => (<Icon {...p}><path d="M4 10v4h3l4 3V7l-4 3H4Z"/><path d="M15 9a4 4 0 0 1 0 6"/></Icon>);
const IQuestion = (p) => (<Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.5c0 2-2.4 1.8-2.4 3.8"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></Icon>);
const ICheck = (p) => (<Icon {...p}><path d="m5 12.5 4.5 4.5L19 7"/></Icon>);
const IChevR = (p) => (<Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>);
const IChevL = (p) => (<Icon {...p}><path d="m15 6-6 6 6 6"/></Icon>);
const IChevD = (p) => (<Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>);
const IChevU = (p) => (<Icon {...p}><path d="m6 15 6-6 6 6"/></Icon>);
const IX = (p) => (<Icon {...p}><path d="m6 6 12 12M18 6 6 18"/></Icon>);
const IPlay = (p) => (<Icon {...p} fill="currentColor" stroke="none"><path d="M8 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 8 5.5Z"/></Icon>);
const IStop = (p) => (<Icon {...p} fill="currentColor" stroke="none"><rect x="6" y="6" width="12" height="12" rx="2"/></Icon>);
const ICrown = ({ color = 'currentColor', ...p }) => (<Icon fill={color} stroke="none" {...p}><path d="M3 7.5 7 11l3-5 2 4 2-4 3 5 4-3.5-2 10.5H5L3 7.5Z"/></Icon>);
const ICog = (p) => (<Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 14.8a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 3.9 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H2.6a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.3 9.2a1.7 1.7 0 0 0-.3-1.9L3.9 7.2A2 2 0 1 1 6.8 4.3l.1.1a1.7 1.7 0 0 0 1.9.3h.1A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></Icon>);
const ISparkle = (p) => (<Icon {...p}><path d="M12 4v6M12 14v6M4 12h6M14 12h6"/><path d="m7 7 3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" /></Icon>);
const IShield = (p) => (<Icon {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></Icon>);
const IStar = ({ color = '#F1B53A', ...p }) => (<Icon fill={color} stroke="none" {...p}><path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6L12 17l-5.4 2.8 1-6L3.3 9.4l6-.9L12 3Z"/></Icon>);
const IStarOutline = ({ color = '#C7CDDB', ...p }) => (<Icon stroke={color} {...p}><path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6L12 17l-5.4 2.8 1-6L3.3 9.4l6-.9L12 3Z"/></Icon>);
const IHeadphones = (p) => (<Icon {...p}><path d="M3 16v-4a9 9 0 0 1 18 0v4"/><rect x="3" y="14" width="5" height="7" rx="1.5"/><rect x="16" y="14" width="5" height="7" rx="1.5"/></Icon>);
const IShare = (p) => (<Icon {...p}><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M16 6l-4-4-4 4M12 2v14"/></Icon>);
const IMail = (p) => (<Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>);
const ILock = (p) => (<Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></Icon>);
const IBolt = (p) => (<Icon {...p} fill="currentColor" stroke="none"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></Icon>);
const ISpeakerBox = (p) => (<Icon {...p}><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="9" r="2"/><circle cx="12" cy="15" r="3"/></Icon>);

// Waveforms
const ISine = (p) => (<Icon {...p} viewBox="0 0 32 24"><path d="M2 12c4-10 8-10 12 0s8 10 12 0 6 0 4 0" /></Icon>);
const ISquare = (p) => (<Icon {...p} viewBox="0 0 32 24"><path d="M2 18V6h6v12h6V6h6v12h6V6h4"/></Icon>);
const ITriangle = (p) => (<Icon {...p} viewBox="0 0 32 24"><path d="M2 18l6-12 6 12 6-12 6 12 4-8"/></Icon>);
const IRamp = (p) => (<Icon {...p} viewBox="0 0 32 24"><path d="M2 18 8 6v12L14 6v12L20 6v12L26 6h4"/></Icon>);
const IHarmonic = (p) => (<Icon {...p} viewBox="0 0 32 24"><path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0 4 6 6 0 2-3 4 0"/><path d="M2 12c3 6 5 6 8 0s5-6 8 0 4 3 8-2" opacity=".5"/></Icon>);

// Vibration
const IVibOff = (p) => (<Icon {...p}><rect x="9" y="4" width="6" height="16" rx="2"/><path d="m3 3 18 18"/></Icon>);
const IVibSoft = (p) => (<Icon {...p}><rect x="9" y="5" width="6" height="14" rx="2"/><path d="M5 11v2M19 11v2"/></Icon>);
const IVibMed = (p) => (<Icon {...p}><rect x="9" y="5" width="6" height="14" rx="2"/><path d="M5 10v4M19 10v4M3 11v2M21 11v2"/></Icon>);
const IVibStrong = (p) => (<Icon {...p}><rect x="9" y="4" width="6" height="16" rx="2"/><path d="M5 9v6M19 9v6M3 10v4M21 10v4M1 11v2M23 11v2"/></Icon>);
const IVibPulse = (p) => (<Icon {...p}><rect x="9" y="5" width="6" height="14" rx="2"/><path d="M3 12h2l2-3 2 6 2-3"/><path d="M15 12l2-3 2 6 2-3"/></Icon>);

// Tabs
const ITabClean = (p) => (<Icon {...p}><path d="M12 3.5c1.4 1.8 5.5 6.6 5.5 9.8a5.5 5.5 0 0 1-11 0c0-3.2 4.1-8 5.5-9.8Z"/></Icon>);
const ITabManual = (p) => (<Icon {...p}><path d="M3 12h2l2-6 4 14 4-12 2 6h4"/></Icon>);
const ITabPro = (p) => (<Icon {...p}><path d="M3 7.5 7 11l3-5 2 4 2-4 3 5 4-3.5-2 10.5H5L3 7.5Z"/></Icon>);
const ITabSettings = ICog;

// People
const IUsers = (p) => (<Icon {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="7" r="2.5"/><path d="M15 14a5 5 0 0 1 6 5"/></Icon>);

// Confetti is drawn as circles in component, not here.

Object.assign(window, {
  Icon,
  IDroplet, IDust, IVolume, IVolumeLow, IQuestion, ICheck, IChevR, IChevL, IChevD, IChevU,
  IX, IPlay, IStop, ICrown, ICog, ISparkle, IShield, IStar, IStarOutline,
  IHeadphones, IShare, IMail, ILock, IBolt, ISpeakerBox,
  ISine, ISquare, ITriangle, IRamp, IHarmonic,
  IVibOff, IVibSoft, IVibMed, IVibStrong, IVibPulse,
  ITabClean, ITabManual, ITabPro, ITabSettings, IUsers,
});
