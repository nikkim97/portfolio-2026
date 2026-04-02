export default function NMLogo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.92)}
      viewBox="0 0 50 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NM"
    >
      {/* N — square linecaps read as PCB traces */}
      <path
        d="M3 3L3 30"
        stroke="var(--foreground)"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
      <path
        d="M3 3L15 30"
        stroke="var(--foreground)"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
      <path
        d="M15 3L15 30"
        stroke="var(--foreground)"
        strokeWidth="1.7"
        strokeLinecap="square"
      />

      {/* M — square linecaps */}
      <path
        d="M21 3L21 30"
        stroke="var(--foreground)"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
      <path
        d="M21 3L30 18L39 3"
        stroke="var(--foreground)"
        strokeWidth="1.7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M39 3L39 30"
        stroke="var(--foreground)"
        strokeWidth="1.7"
        strokeLinecap="square"
      />

      {/* Solder pads at key trace junctions */}
      {/* Top of N left vertical */}
      <rect x="1.65" y="1.65" width="2.7" height="2.7" fill="var(--foreground)" />
      {/* Valley of M — terracotta, draws the eye */}
      <rect x="28.65" y="16.65" width="2.7" height="2.7" fill="var(--accent)" />
      {/* Top-right of M */}
      <rect x="37.65" y="1.65" width="2.7" height="2.7" fill="var(--foreground)" />

      {/* Circuit trace with IEC resistor — accent color */}
      {/* Left node */}
      <circle cx="3" cy="39" r="1.5" fill="var(--accent)" />
      {/* Trace left of resistor */}
      <line x1="4.5" y1="39" x2="16" y2="39"
        stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="butt" />
      {/* Resistor body (IEC rectangle) */}
      <rect x="16" y="36.5" width="13" height="5"
        stroke="var(--accent)" strokeWidth="1.1" fill="none" />
      {/* Trace right of resistor */}
      <line x1="29" y1="39" x2="37.5" y2="39"
        stroke="var(--accent)" strokeWidth="1.1" strokeLinecap="butt" />
      {/* Right node */}
      <circle cx="39" cy="39" r="1.5" fill="var(--accent)" />
    </svg>
  );
}
