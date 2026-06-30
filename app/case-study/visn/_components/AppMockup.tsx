const LABEL = "text-[10px] tracking-[0.28em] uppercase";

function Phone({ children, tint = "#FBF7F1" }: { children: React.ReactNode; tint?: string }) {
  return (
    <div
      className="mx-auto rounded-[44px] p-[10px] flex-shrink-0"
      style={{
        width: 240,
        height: 480,
        background: "var(--foreground)",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.25), 0 10px 20px -10px rgba(0,0,0,0.15)",
      }}
    >
      <div
        className="w-full h-full rounded-[36px] overflow-hidden relative"
        style={{ background: tint }}
      >
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full z-10"
          style={{ width: 72, height: 18, background: "var(--foreground)" }}
        />
        {children}
      </div>
    </div>
  );
}

export function PhoneSequence() {
  return (
    <div className="flex flex-wrap gap-6 justify-center items-center">
      <Phone>
        <div className="h-full flex flex-col items-center justify-center px-8 gap-5 text-center">
          <p className={`${LABEL} text-[var(--midtone)]`}>Setup · 1 of 3</p>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ border: "2px solid var(--accent)" }}>
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="11" cy="17" r="3" fill="var(--accent)" />
              <path d="M17 12c2.5 1.8 2.5 8.2 0 10" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M21 9c4 3 4 14 0 17" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="font-light" style={{ fontSize: 18, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
            &quot;Tell us your destination&quot;
          </h3>
        </div>
      </Phone>

      <Phone>
        <div className="h-full flex flex-col gap-3 px-6 pt-12 pb-6">
          <div className="flex flex-col items-center gap-1">
            <p className={`${LABEL} text-[var(--midtone)]`}>Facing</p>
            <p className="font-light" style={{ fontSize: 48, letterSpacing: "-0.04em", lineHeight: 1 }}>NE</p>
          </div>
          <div className="flex flex-col items-center gap-1 mt-1">
            <p className={`${LABEL}`} style={{ color: "var(--accent)" }}>Next Turn</p>
            <p className="font-light" style={{ fontSize: 20, letterSpacing: "-0.02em" }}>Right · 200 ft</p>
          </div>
          <div className="flex-1 relative flex items-center justify-center mt-2">
            <div className="absolute w-28 h-28 rounded-full" style={{ border: "1px solid var(--border)", opacity: 0.5 }} />
            <div className="absolute w-16 h-16 rounded-full" style={{ border: "1px solid var(--border)" }} />
            <div className="absolute w-9 h-9 rounded-full" style={{ border: "1px solid var(--accent)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "var(--accent)" }} />
          </div>
          <p className="text-[10px] font-light text-[var(--midtone)] text-center">Clear path ahead</p>
        </div>
      </Phone>

      <Phone tint="#F5EDE4">
        <div className="h-full flex flex-col items-center justify-center gap-5 px-6 text-center">
          <p className={`${LABEL}`} style={{ color: "var(--accent)" }}>Alert</p>
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
            <span style={{ color: "#F5F1EB", fontSize: 32, lineHeight: 1 }}>←</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-light text-[var(--midtone)]">Object</p>
            <p className="font-light" style={{ fontSize: 38, letterSpacing: "-0.03em", lineHeight: 1 }}>3 ft</p>
            <p className="text-[11px] font-light text-[var(--midtone)]">on your left</p>
          </div>
        </div>
      </Phone>
    </div>
  );
}

function Node({ x, y, w, h, label, sub, accent }: { x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="#FBF7F1" stroke={accent ? "var(--accent)" : "#DDD6CC"} strokeWidth={accent ? 1.5 : 1} />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize="11" fill="var(--foreground)" fontWeight="300" letterSpacing="0.5">{label}</text>
      {sub && <text x={x + w / 2} y={y + 36} textAnchor="middle" fontSize="8" fill="#4A4440" fontWeight="300">{sub}</text>}
    </g>
  );
}

export function SystemDiagram() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 600 320" className="w-full h-auto">
        <defs>
          <marker id="arrow-vi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#4A4440" />
          </marker>
        </defs>

        <text x="20" y="30" fontSize="9" letterSpacing="3" fill="#4A4440" fontWeight="300">WEARABLE LAYER</text>
        <Node x={20} y={40} w={140} h={50} label="Ultrasonic Array" sub="distance + angle" />
        <Node x={20} y={110} w={140} h={50} label="Compass + IMU" sub="heading + motion" />
        <Node x={20} y={180} w={140} h={50} label="BLE Device Agent" sub="sampling + sync" accent />

        <line x1={160} y1={205} x2={230} y2={135} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />
        <line x1={160} y1={205} x2={230} y2={205} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />

        <text x="240" y="30" fontSize="9" letterSpacing="3" fill="var(--accent)" fontWeight="300">APP LAYER</text>
        <Node x={240} y={40} w={130} h={50} label="Onboarding + Pairing" sub="voice-led setup" />
        <Node x={240} y={110} w={130} h={50} label="Guidance Core" sub="route + obstacle fusion" accent />
        <Node x={240} y={180} w={130} h={50} label="Map + Session State" sub="turn context + logs" />

        <line x1={305} y1={90} x2={305} y2={108} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />
        <line x1={305} y1={160} x2={305} y2={178} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />

        <line x1={370} y1={135} x2={450} y2={65} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />
        <line x1={370} y1={135} x2={450} y2={135} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />
        <line x1={370} y1={135} x2={450} y2={205} stroke="#4A4440" strokeWidth={1} markerEnd="url(#arrow-vi)" />

        <text x="460" y="30" fontSize="9" letterSpacing="3" fill="#4A4440" fontWeight="300">GUIDANCE OUTPUTS</text>
        <Node x={460} y={40} w={120} h={50} label="Haptic Cues" sub="left / right pulse" />
        <Node x={460} y={110} w={120} h={50} label="Audio Alerts" sub='&quot;object 3 ft left&quot;' />
        <Node x={460} y={180} w={120} h={50} label="Fallback Prompts" sub="recenter + recover" />

        <text x="300" y="260" textAnchor="middle" fontSize="9" letterSpacing="3" fill="#4A4440" fontWeight="300">CURRENT VISN STRUCTURE</text>
        <text x="300" y="280" textAnchor="middle" fontSize="10" fill="var(--foreground)" fontWeight="300">Pairing-first onboarding · fused guidance loop · non-visual defaults with recovery states</text>
      </svg>
    </div>
  );
}
