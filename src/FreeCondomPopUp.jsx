import { useEffect, useState } from "react";
import condom from "./assets/condom.png";

const C = {
  deep:   "#0d3320",
  forest: "#175330",
  mid:    "#1e6840",
  lime:   "#C8EC38",
  white:  "#ffffff",
  ink:    "#0d1f14",
  font:   "var(--font)",
};

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const ArrowR = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function FreeCondomPopup() {
  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 360);
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(20px) brightness(0.5)",
        WebkitBackdropFilter: "blur(20px) brightness(0.5)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.36s ease",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 560,
          maxWidth: "100%",
          background: C.deep,
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "transform 0.4s cubic-bezier(0.34,1.3,0.64,1), opacity 0.36s ease",
          opacity: visible ? 1 : 0,
          fontFamily: C.font,
        }}
      >

        {/* ── IMAGE PANEL ── */}
        <div style={{
          width: "100%",
          height: 300,
          background: C.forest,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* subtle radial glow */}
          <div style={{
            position: "absolute",
            width: 280, height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,236,56,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* full image, uncropped */}
          <img
            src={condom}
            alt="Free Condom"
            style={{
              maxWidth: "65%",
              maxHeight: "85%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              position: "relative",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.4))",
            }}
          />

          {/* close */}
          <button
            onClick={close}
            style={{
              position: "absolute", top: 16, right: 16,
              width: 34, height: 34, borderRadius: 10,
              background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.6)",
              transition: "all 0.18s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            <CloseIcon />
          </button>

          {/* FREE badge */}
          <div style={{
            position: "absolute", top: 16, left: 16,
            background: C.lime, color: C.ink,
            fontSize: "0.65rem", fontWeight: 800,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: 100,
          }}>
            Free
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ padding: "28px 32px 32px" }}>

          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <div style={{ width: 14, height: 2, background: C.lime, borderRadius: 2 }} />
            <span style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "rgba(200,236,56,0.5)",
            }}>
              Baguio City Health Services
            </span>
          </div>

          {/* title */}
          <h2 style={{
            margin: "0 0 10px",
            fontSize: "2.2rem", fontWeight: 900,
            letterSpacing: "-0.05em", lineHeight: 1,
            color: C.white,
          }}>
            Free Condoms<br />
            <span style={{ color: C.lime }}>Available Now</span>
          </h2>

          {/* body */}
          <p style={{
            margin: "0 0 24px",
            fontSize: "0.88rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
          }}>
            Pick up free condoms at any Baguio City Health Center. No prescription, no judgment — just protection for you and your partner.
          </p>

          {/* divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 24 }} />

          {/* stats row */}
          <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
            {[
              { value: "HIV",  label: "Prevention"    },
              { value: "STIs", label: "Protection"    },
              { value: "100%", label: "Free of charge" },
            ].map(({ value, label }, i) => (
              <div key={label} style={{
                flex: 1,
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                paddingLeft: i > 0 ? 20 : 0,
              }}>
                <p style={{ margin: "0 0 2px", fontSize: "1.1rem", fontWeight: 900, color: C.lime, letterSpacing: "-0.03em" }}>
                  {value}
                </p>
                <p style={{ margin: 0, fontSize: "0.72rem", color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href="https://www.cdc.gov/hiv/prevention/condoms.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "14px 22px", borderRadius: 14,
                background: C.lime, color: C.ink,
                fontSize: "0.88rem", fontWeight: 700, textDecoration: "none",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#d4f04a"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(200,236,56,0.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.lime; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Learn More <ArrowR />
            </a>

            <button
              onClick={close}
              style={{
                padding: "14px 22px", borderRadius: 14,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.88rem", fontWeight: 600, cursor: "pointer",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = C.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}