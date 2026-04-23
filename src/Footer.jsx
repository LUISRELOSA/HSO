import React, { useState } from "react";
import CityLogo from "./assets/CityLogo.png";

const C = {
  deep:        "#0d3320",
  forest:      "#175330",
  lime:        "#C8EC38",
  cream:       "#f5f4ee",
  creamDark:   "#ede9de",
  white:       "#ffffff",
  onDarkMid:   "rgba(255,255,255,0.45)",
  onDarkFaint: "rgba(255,255,255,0.22)",
  border:      "rgba(255,255,255,0.07)",
  font:        "var(--font)",
};

/* ── SVG Icons ── */
const IcoPhone = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 2.5h2.5l1.2 3-.9.6a8.08 8.08 0 004.6 4.6l.6-.9 3 1.2v2.5c0 .83-.67 1.5-1.5 1.5C6.05 15 1 9.95 1 4 1 3.17 1.67 2.5 2.5 2.5" stroke={C.lime} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IcoMail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="10" rx="2" stroke={C.onDarkMid} strokeWidth="1.3"/>
    <path d="M1 5l7 5 7-5" stroke={C.onDarkMid} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IcoPin = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 9A2.5 2.5 0 108 4a2.5 2.5 0 000 5z" fill={C.onDarkMid} opacity="0.5"/>
    <path d="M8 1C5.24 1 3 3.24 3 6c0 4.5 5 9 5 9s5-4.5 5-9c0-2.76-2.24-5-5-5z" stroke={C.onDarkMid} strokeWidth="1.3" fill="none"/>
  </svg>
);
const IcoFb = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M8.5 3.5H10V1.5H8C6.34 1.5 5 2.84 5 4.5V5.5H3.5V7.5H5V12.5H7V7.5H9L9.5 5.5H7V4.5C7 3.95 7.45 3.5 8 3.5H8.5z"/>
  </svg>
);
const IcoIg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="10.5" cy="3.5" r="0.75" fill="currentColor"/>
  </svg>
);
const IcoX = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M11.1 1.5h2.1L8.5 6.7 14 12.5h-3.9l-3-4-3.5 4H1.5l5.1-5.7L.8 1.5h4l2.7 3.6 3.6-3.6zm-.7 9.9h1.2L3.7 2.7H2.4l8 8.7z"/>
  </svg>
);

function SocialBtn({ href, Icon }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? C.lime : "rgba(255,255,255,0.06)",
        border: `1px solid ${hov ? C.lime : C.border}`,
        color: hov ? C.deep : C.onDarkMid,
        textDecoration: "none",
        transition: "all 0.2s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 8px 20px rgba(200,236,56,0.2)" : "none",
      }}
    >
      <Icon />
    </a>
  );
}

function FooterLink({ href = "#", children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        fontFamily: C.font, fontSize: "0.82rem",
        color: hov ? C.cream : C.onDarkMid,
        textDecoration: "none", marginBottom: 11,
        transition: "color 0.18s ease",
      }}
    >
      {hov && <span style={{ width: 14, height: 1.5, background: C.lime, borderRadius: 2, flexShrink: 0 }} />}
      {children}
    </a>
  );
}

function ColLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
      <div style={{ width: 16, height: 2, background: C.lime, borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontFamily: C.font, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.lime }}>
        {children}
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: C.deep, borderTop: `1px solid ${C.border}` }}>

      {/* ── MAIN GRID ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "68px clamp(20px,3vw,56px) 52px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1.3fr", gap: "clamp(28px,4vw,68px)" }}>

          {/* COL 1 — Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                border: "1.5px solid rgba(200,236,56,0.28)",
                boxShadow: "0 0 0 3px rgba(200,236,56,0.06)",
              }}>
                <img src={CityLogo} alt="HSO Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <p style={{ fontFamily: C.font, fontSize: "0.88rem", fontWeight: 800, color: C.white, letterSpacing: "-0.01em", margin: "0 0 2px", lineHeight: 1.2 }}>
                  Health Services Office
                </p>
                <p style={{ fontFamily: C.font, fontSize: "0.62rem", fontWeight: 500, color: "rgba(200,236,56,0.5)", margin: 0, letterSpacing: "0.07em" }}>
                  City Government of Baguio
                </p>
              </div>
            </div>

            <p style={{ fontFamily: C.font, fontSize: "0.82rem", color: C.cream, lineHeight: 1.72, margin: "0 0 28px", maxWidth: 290 }}>
              Empowering community health awareness and breaking barriers towards universal care in Baguio City.
            </p>

            <div style={{ display: "flex", gap: 9 }}>
              <SocialBtn href="https://facebook.com" Icon={IcoFb} />
              <SocialBtn href="https://instagram.com" Icon={IcoIg} />
              <SocialBtn href="https://twitter.com" Icon={IcoX} />
            </div>
          </div>

          {/* COL 2 — Navigation */}
          <div>
            <ColLabel>Navigation</ColLabel>
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#pretest">Pre-Test</FooterLink>
            <FooterLink href="#">Find a Center</FooterLink>
          </div>

          {/* COL 3 — Services */}
          <div>
            <ColLabel>Services</ColLabel>
            <FooterLink>HIV Testing</FooterLink>
            <FooterLink>STI Screening</FooterLink>
            <FooterLink>Maternal Care</FooterLink>
            <FooterLink>Mental Health</FooterLink>
            <FooterLink>TB DOTS</FooterLink>
          </div>

          {/* COL 4 — Contact */}
          <div>
            <ColLabel>Contact</ColLabel>

            {/* Hotline card */}
            <div style={{
              background: "rgba(200,236,56,0.07)",
              border: "1px solid rgba(200,236,56,0.14)",
              borderRadius: 18, padding: "16px 18px", marginBottom: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                <IcoPhone />
                <span style={{ fontFamily: C.font, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,236,56,0.5)" }}>
                  Hotline
                </span>
              </div>
              <p style={{ fontFamily: C.font, fontSize: "1.15rem", fontWeight: 900, color: C.lime, letterSpacing: "-0.03em", margin: "0 0 3px", lineHeight: 1 }}>
                0985-251-5968
              </p>
              <p style={{ fontFamily: C.font, fontSize: "0.82rem", fontWeight: 600, color: C.cream, margin: 0 }}>
                442-9800
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IcoMail />
                <a href="mailto:info@govph.org" style={{ fontFamily: C.font, fontSize: "0.78rem", color: C.cream, textDecoration: "none" }}>
                  info@govph.org
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IcoPin />
                <span style={{ fontFamily: C.font, fontSize: "0.78rem", color: C.cream }}>
                  Baguio City, Philippines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px clamp(20px,3vw,56px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <p style={{ fontFamily: C.font, fontSize: "0.72rem", color: C.cream, margin: 0 }}>
            &copy; {new Date().getFullYear()} Baguio City Health Services Office. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.lime, boxShadow: `0 0 8px ${C.lime}` }} />
            <span style={{ fontFamily: C.font, fontSize: "0.66rem", fontWeight: 600, color: C.cream, letterSpacing: "0.07em" }}>
              Free · Confidential · Universal Care
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}