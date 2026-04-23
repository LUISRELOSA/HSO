import { useState, useEffect } from "react";
import Logo from "./assets/Logo.jpg";

const C = {
  deep:    "#0d3320",
  forest:  "#175330",
  mid:     "#1e6840",
  lime:    "#C8EC38",
  cream:   "#f5f4ee",
  white:   "#ffffff",
  font:    "var(--font)",
};

const ArrowR = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="19" height="14" viewBox="0 0 19 14" fill="none">
    <rect x="0" y="0" width="19" height="1.8" rx="0.9" fill="currentColor"/>
    <rect x="4" y="6.1" width="15" height="1.8" rx="0.9" fill="currentColor"/>
    <rect x="0" y="12.2" width="19" height="1.8" rx="0.9" fill="currentColor"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [showNav, setShowNav]       = useState(true);
  const [lastY, setLastY]           = useState(0);

  const links = [
    { id: "home",    label: "Home"     },
    { id: "about",   label: "About"    },
    { id: "pretest", label: "Pre-Test" },
    { id: "contact", label: "Contact"  },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === "home") {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo(0, top);
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY + 8) setShowNav(false);
      else if (y < lastY - 4) setShowNav(true);
      setLastY(y);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [lastY]);

  useEffect(() => {
    const k = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const isActive = (id) => activeSection === id;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 68,
        background: scrolled ? "rgba(13,51,32,0.97)" : C.deep,
        backdropFilter: scrolled ? "blur(24px)" : "none",
        boxShadow: scrolled ? `0 1px 0 rgba(200,236,56,0.1), 0 4px 24px rgba(0,0,0,0.18)` : "none",
        transform: showNav ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, background 0.3s",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 clamp(20px,3vw,56px)",
          height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* LOGO */}
          <button onClick={() => scrollTo("home")} style={{
            display: "flex", alignItems: "center", gap: 11,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
              border: "1.5px solid rgba(200,236,56,0.3)",
              boxShadow: "0 0 0 3px rgba(200,236,56,0.07)",
            }}>
              <img src={Logo} alt="HSO Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: C.font, fontSize: "0.83rem", fontWeight: 800, color: C.white, letterSpacing: "-0.01em", margin: 0, lineHeight: 1.2 }}>
                Health Services Office
              </p>
              <p style={{ fontFamily: C.font, fontSize: "0.6rem", fontWeight: 500, color: C.lime, margin: 0, letterSpacing: "0.07em" }}>
                City Government of Baguio
              </p>
            </div>
          </button>

          {/* DESKTOP NAV */}
          <div style={{ alignItems: "center", gap: 2 }} className="hidden lg:flex">
            {links.map(({ id, label }) => (
              <NavLink key={id} id={id} label={label} active={isActive(id)} onClick={() => scrollTo(id)} />
            ))}

            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 12px" }} />

            <GetTestedBtn onClick={() => scrollTo("pretest")} />
          </div>

          {/* HAMBURGER */}
          <button
            className="flex lg:hidden"
            onClick={() => setMobileOpen(prev => !prev)}
            style={{
              width: 42, height: 42, borderRadius: 12, cursor: "pointer",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.75)", transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,236,56,0.14)"; e.currentTarget.style.color = C.lime; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        onClick={() => setMobileOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 98,
          background: "rgba(8,34,18,0.6)", backdropFilter: "blur(6px)",
          opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "all" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* DRAWER */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100dvh",
        width: "min(320px,90vw)", zIndex: 99,
        background: C.deep,
        borderLeft: "1px solid rgba(200,236,56,0.08)",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>

        {/* Drawer header */}
        <div style={{
          padding: "20px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.lime, boxShadow: `0 0 9px ${C.lime}` }} />
            <span style={{ fontFamily: C.font, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
              Menu
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              width: 34, height: 34, borderRadius: 9,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.45)", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer links */}
        <div style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map(({ id, label }) => {
            const active = isActive(id);
            return (
              <button
                key={id} onClick={() => scrollTo(id)}
                style={{
                  background: active ? "rgba(200,236,56,0.08)" : "transparent",
                  border: "none", borderRadius: 14,
                  padding: "14px 16px",
                  fontFamily: C.font, fontSize: "1rem",
                  fontWeight: active ? 700 : 450,
                  color: active ? C.white : "rgba(255,255,255,0.48)",
                  cursor: "pointer", textAlign: "left",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.48)"; }}}
              >
                {label}
                {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.lime, boxShadow: `0 0 7px ${C.lime}` }} />}
              </button>
            );
          })}
        </div>

        {/* Drawer footer */}
        <div style={{ padding: "18px 20px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => scrollTo("pretest")}
            style={{
              width: "100%", background: C.lime, border: "none", borderRadius: 14,
              padding: "15px", fontFamily: C.font, fontSize: "0.9rem",
              fontWeight: 700, color: C.deep, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#d4f04a"; e.currentTarget.style.boxShadow = "0 0 22px rgba(200,236,56,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.lime; e.currentTarget.style.boxShadow = "none"; }}
          >
            Get Tested <ArrowR size={13} />
          </button>
          <p style={{ fontFamily: C.font, fontSize: "0.62rem", color: "rgba(255,255,255,0.18)", textAlign: "center", margin: "12px 0 0", letterSpacing: "0.06em" }}>
            Free · Confidential · Baguio City
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Nav link ── */
function NavLink({ id, label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", background: "none", border: "none", cursor: "pointer",
        padding: "8px 14px", borderRadius: 9,
        fontFamily: C.font, fontSize: "0.8rem",
        fontWeight: active ? 700 : 450,
        color: active ? C.white : hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
        letterSpacing: "0.01em", transition: "color 0.18s ease",
      }}
    >
      {label}
      {active && (
        <span style={{
          position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)",
          width: 4, height: 4, borderRadius: "50%",
          background: C.lime, boxShadow: `0 0 8px ${C.lime}`,
        }} />
      )}
    </button>
  );
}

/* ── Get tested button ── */
function GetTestedBtn({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: hov ? "#d4f04a" : C.lime, border: "none", borderRadius: 100,
        padding: "9px 20px", cursor: "pointer",
        fontFamily: C.font, fontSize: "0.76rem", fontWeight: 700, color: C.deep,
        letterSpacing: "0.01em",
        transform: hov ? "scale(1.04)" : "scale(1)",
        boxShadow: hov ? "0 0 20px rgba(200,236,56,0.35)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      Get Tested <ArrowR size={12} />
    </button>
  );
}