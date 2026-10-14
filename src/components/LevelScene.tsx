import { useState } from 'react'
import { Pause, Play } from 'lucide-react'

export function LevelScene({ compact = false, language = 'zh' }: { compact?: boolean; language?: 'zh' | 'en' }) {
  const [wireframe, setWireframe] = useState(false)
  const [paused, setPaused] = useState(false)
  return <div className={`level-scene ${wireframe ? 'wireframe' : ''} ${paused ? 'paused' : ''} ${compact ? 'compact-scene' : ''}`}>
    <svg viewBox="0 0 1200 460" fill="none" role="img" aria-label={language === 'en' ? 'Workshop concept scene with a pixel character, floating islands, and a level path' : '由像素角色、浮岛和关卡路径组成的工坊概念场景'}>
      <defs>
        <pattern id="level-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" className="scene-grid" /></pattern>
        <radialGradient id="scene-glow-left" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(380 240) scale(340 220)">
          <stop stopColor="#4f73ff" stopOpacity=".14" />
          <stop offset="1" stopColor="#4f73ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="scene-glow-right" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 195) scale(260 190)">
          <stop stopColor="#395ae6" stopOpacity=".16" />
          <stop offset="1" stopColor="#395ae6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="island-front" x1="250" y1="235" x2="250" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="#e0e6f0" /><stop offset="1" stopColor="#c8d1e1" /></linearGradient>
        <linearGradient id="sky-window" x1="892" y1="57" x2="1010" y2="260" gradientUnits="userSpaceOnUse"><stop stopColor="#2b4de0"/><stop offset=".55" stopColor="#5273f6"/><stop offset="1" stopColor="#9ab0ff"/></linearGradient>
        <linearGradient id="beam-glow" x1="880" y1="70" x2="880" y2="230" gradientUnits="userSpaceOnUse"><stop stopColor="#6c8cff" stopOpacity="0"/><stop offset=".5" stopColor="#6c8cff" stopOpacity=".22"/><stop offset="1" stopColor="#6c8cff" stopOpacity="0"/></linearGradient>
        <filter id="island-shadow" x="-40%" y="-100%" width="180%" height="300%"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <rect width="1200" height="460" fill="url(#level-grid)" />
      <rect width="1200" height="460" fill="url(#scene-glow-left)" />
      <rect width="1200" height="460" fill="url(#scene-glow-right)" />
      <circle cx="922" cy="190" r="145" className="scene-orbit" /><circle cx="922" cy="190" r="177" className="scene-orbit outer" />
      <circle cx="376" cy="255" r="195" className="scene-orbit outer" />
      <path d="M-15 386 150 344l148 29 161-47 181 61 159-26 222 20 214-39v118H-15z" className="distant-terrain" />
      <path d="M-15 412 110 382l165 24 190-38 175 42 195-31 180 25 200-28v84H-15z" className="distant-terrain" opacity=".45" />
      <g className="floating-background">
        <path d="m628 101 83-47 86 48-83 48z" className="background-tile" />
        <path d="m628 101 86 49v14l-86-49z" className="background-tile-side" />
        <path d="m714 150 83-48v14l-83 48z" className="background-tile-side" opacity=".8" />
        <path d="M680 106h44m-22-13v25" className="background-cross" />
        <path d="m142 108 52-30 54 31-52 30z" className="background-tile" opacity=".75" />
        <path d="m142 108 54 31v10l-54-31z" className="background-tile-side" opacity=".75" />
        <path d="m196 139 52-30v10l-52 30z" className="background-tile-side" opacity=".55" />
      </g>
      <ellipse cx="372" cy="392" rx="232" ry="21" fill="#5b72a3" opacity=".16" filter="url(#island-shadow)" />
      <ellipse cx="884" cy="360" rx="140" ry="16" fill="#5b72a3" opacity=".16" filter="url(#island-shadow)" />
      <g className="main-island">
        <path d="m153 256 218-122 233 133-219 124z" className="island-top" />
        <path d="m153 256 232 135v50l-232-134z" className="island-front" />
        <path d="m385 391 219-124v50L385 441z" className="island-side" />
        <path d="m153 256 218-122 233 133-219 124z" className="island-outline" />
        <path d="m342 182 32-18 32 18-32 18z" fill="#e4ecfb" className="platform-piece" opacity=".7" />
        <path d="m184 273 65-37 57 33 63-36 59 34 105-61" className="level-path" />
        <circle cx="184" cy="273" r="4" fill="#3054de" className="blue-piece" />
        <circle cx="428" cy="267" r="4" fill="#3054de" className="blue-piece" />
        <path d="m242 319 40-23 40 23-40 23zM282 342v25m-40-48v24l40 24 40-24v-24" className="terrain-edge" />
        <path d="m490 283 58-33 38 22-58 33z" className="terrain-edge" />
        <g transform="translate(316 130)"><path d="m0 78 63-35 58 33-62 36z" fill="#ced8ef" className="platform-piece" /><path d="m0 78 59 34v38L0 116z" fill="#aabbdc" className="platform-piece" /><path d="m59 112 62-36v38l-62 36z" fill="#899fc9" className="platform-piece" /><path d="m17 32 34-19 41 24-34 20z" fill="#4f70f5" className="blue-piece"/><path d="m17 32 41 25v60L17 93z" fill="#2948bd" className="blue-piece"/><path d="m58 57 34-20v61l-34 19z" fill="#7695f4" className="blue-piece"/><path d="m51 13 13 8M51 13v18m0 0 13-10" stroke="#cbd8ff" strokeWidth="1.5" /></g>
        <g transform="translate(224 189)" className="pixel-character"><ellipse cx="18" cy="64" rx="22" ry="6" fill="#2d4673" opacity=".18" /><path d="M0 0h28v6h7v27H0z" fill="#273346" className="character-fill"/><path d="M0-7h28v8H0zM-7 1H0v24h-7z" fill="#3b5ce1"/><path d="M7 8h21v13H7z" fill="#eff2fa"/><path d="M14 11h4v5h-4zm10 0h4v5h-4z" fill="#273346"/><path d="M-1 34h37v17H-1z" fill="#4568ed"/><path d="M7 51h9v11H7zm18 0h9v11h-9zM-8 34h7v14h-7zm45-4h7v17h-7z" fill="#273346"/></g>
        <path d="m492 170 18-10v61l-18 10z" fill="#becae1" className="flag-pole"/><path d="m510 161 47 27-47 12z" fill="#3457df" className="blue-piece" />
        <g className="coin coin-one"><path d="m289 174 8-13 8 13-8 13z" fill="#ffbe65"/><path d="m297 163 4 11-4 11" stroke="#dca054"/></g>
      </g>
      <g className="small-island"><path d="m737 239 126-71 140 80-127 71z" fill="#e9edf5" className="island-top"/><path d="m737 239 139 80v35l-139-79z" fill="#c7d2e7" className="island-front"/><path d="m876 319 127-71v36l-127 70z" fill="#a8b9d8" className="island-side"/><path d="m737 239 126-71 140 80-127 71z" className="island-outline"/><path d="m768 257 57-33 65 37 68-39" className="level-path" />
        <g transform="translate(850 82)"><path d="m0 62 76-42 35 21-76 42z" fill="#c4d1eb" className="platform-piece"/><path d="m0 62 35 21v146L0 208z" fill="#c5d0e4" className="platform-piece"/><path d="m35 83 76-42v146l-76 42z" fill="#a4b7d6" className="platform-piece"/><path d="M35 83V54C35 4 111-14 111 41v146l-22 12V73c0-22-33-5-33 14v130l-21 12z" fill="#dee6f3" className="platform-piece"/><path d="m56 87 33-20v132l-33 18z" fill="url(#sky-window)" className="portal-fill"/><path d="m42 96 47-27v130l-47 26z" fill="url(#beam-glow)" /><path d="m66 102 15-9m-15 22 15-9m-15 22 15-9" stroke="#cedcff" strokeWidth="1.4" /></g>
        <path d="m802 269 26-15 26 15-26 15z" fill="#4165f0" className="blue-piece"/><path d="m802 269 26 15v26l-26-15z" fill="#233fbb" className="blue-piece"/><path d="m828 284 26-15v26l-26 15z" fill="#6c87e6" className="blue-piece"/>
      </g>
      <path d="M583 209C642 122 692 148 757 213" className="jump-arc" />
      <circle cx="615" cy="176" r="2.5" fill="#5274da" opacity=".6" />
      <circle cx="722" cy="182" r="2.5" fill="#5274da" opacity=".6" />
      <g className="spark spark-one"><path d="M627 192v16m-8-8h16" className="scene-spark"/></g>
      <g className="spark spark-two"><path d="M1092 277v16m-8-8h16" className="scene-spark"/></g>
      <g className="coin coin-two"><path d="m667 166 8-13 8 13-8 13z" fill="#ffbe65"/><path d="m675 155 4 11-4 11" stroke="#dca054"/></g>
      <g transform="translate(77 120)"><path d="M0 0h25m-12-12v25" className="scene-spark"/><circle cx="1009" cy="-31" r="5" stroke="#8ba0ca"/></g>
      <path d="M74 365h30m-15-15v30M1126 125h24m-12-12v24" className="scene-annotation" />
      <path d="M128 43h80m-80 0v80M1064 340v64h-80M1064 43h-64m64 0v64M128 340v64h80" className="scene-corners" />
    </svg>
    <div className="scene-toolbar"><span className="scene-label"><span />{language === 'en' ? 'Workshop level concept' : '工坊概念关卡'}</span><div className="scene-switch" role="group" aria-label={language === 'en' ? 'Level view' : '关卡视图'}><button aria-pressed={!wireframe} onClick={() => setWireframe(false)}>{language === 'en' ? 'Scene' : '场景'}</button><button aria-pressed={wireframe} onClick={() => setWireframe(true)}>{language === 'en' ? 'Wireframe' : '线稿'}</button></div><button className="scene-pause" aria-label={paused ? (language === 'en' ? 'Resume animation' : '继续动画') : (language === 'en' ? 'Pause animation' : '暂停动画')} title={paused ? (language === 'en' ? 'Resume animation' : '继续动画') : (language === 'en' ? 'Pause animation' : '暂停动画')} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
  </div>
}
