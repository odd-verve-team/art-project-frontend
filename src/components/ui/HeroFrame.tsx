export const HeroFrame = () => {
  const frameVars = {
    '--offset-x': '405px', // Horizontal screen edge offset
    '--offset-y': '265px', // Bottom screen edge offset
    '--corner-size': '25px', // Corner dimensions (width & height)
    '--border-width': '2px', // Corner line thickness
  } as React.CSSProperties;

  return (
    <div className="absolute inset-0 pointer-events-none" style={frameVars}>
      {/* TEXT */}
      <div className="absolute top-[var(--offset-y)] left-1/2 -translate-x-1/2 text-background text-[22px] font-light leading-none uppercase">
        Design 2026
      </div>

      {/* CORNERS */}
      <span className="absolute top-[var(--offset-y)] left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-l-[length:var(--border-width)]" />
      <span className="absolute top-[var(--offset-y)] right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-t-[length:var(--border-width)] border-r-[length:var(--border-width)]" />
      <span className="absolute bottom-[var(--offset-y)] left-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-l-[length:var(--border-width)]" />
      <span className="absolute bottom-[var(--offset-y)] right-[var(--offset-x)] w-[var(--corner-size)] h-[var(--corner-size)] border-background border-b-[length:var(--border-width)] border-r-[length:var(--border-width)]" />
    </div>
  );
};
