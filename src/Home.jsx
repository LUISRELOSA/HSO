import React, { useState, useEffect, useRef } from "react";
import FloatingChatBot from "./FloatingChatBot";
import hivImage      from "./assets/hiv-symptoms.png";
import chlamydia     from "./assets/chlamydia.jpg";
import Gonorrhea     from "./assets/Gonorrhea.webp";
import hsvImage      from "./assets/herpes.jpg";
import syphilisImage from "./assets/syphilis.webp";
import hpvImage      from "./assets/hpv.webp";
import BonJing       from "./assets/BonJing.jpg";
import qrCODE        from "./assets/qrCODE.jpg";

/* ─── DATA ─── */
const slides = [
  { image: hivImage,      title: "HIV",       sub: "Human Immunodeficiency Virus",  tag: "Viral",     description: "Attacks the immune system and can lead to AIDS if untreated. Early detection and treatment is critical for long-term health.",                                                                                                                   symptoms: ["Prolonged fever", "Night sweats", "Unexplained weight loss", "Swollen lymph nodes", "Chronic fatigue", "Mouth sores"],                          risk: "High Risk"   },
  { image: chlamydia,     title: "Chlamydia", sub: "Bacterial STI",                 tag: "Bacterial", description: "Often has no symptoms but is easily treatable with antibiotics when detected early through regular testing.",                                                                                                                                    symptoms: ["Abnormal discharge", "Burning urination", "Pelvic pain", "Testicular pain", "Rectal pain", "Often asymptomatic"],                               risk: "Treatable"   },
  { image: Gonorrhea,     title: "Gonorrhea", sub: "Bacterial STI",                 tag: "Bacterial", description: "Affects genitals, rectum, and throat. Early antibiotic treatment prevents serious complications.",                                                                                                                                              symptoms: ["Yellow discharge", "Painful urination", "Sore throat", "Rectal discharge", "Pelvic pain", "Swollen joints"],                                    risk: "Treatable"   },
  { image: hsvImage,      title: "Herpes",    sub: "Herpes Simplex Virus (HSV)",    tag: "Viral",     description: "A common viral infection causing painful sores or blisters. HSV-1 typically affects the mouth, while HSV-2 affects the genitals. Antiviral medications help manage outbreaks effectively.",                                                     symptoms: ["Fluid-filled blisters", "Painful sores", "Itching & burning", "Tingling sensation", "Fever (first outbreak)", "Swollen lymph nodes"],           risk: "Manageable"  },
  { image: syphilisImage, title: "Syphilis",  sub: "Bacterial STI",                 tag: "Bacterial", description: "A bacterial infection progressing in stages — primary, secondary, and tertiary. Highly curable with antibiotics in early stages. Left untreated, it can cause serious damage to the heart, brain, and other organs.",                           symptoms: ["Genital sore (chancre)", "Skin rash", "Fever", "Sore throat", "Swollen lymph nodes", "Muscle aches"],                                           risk: "Treatable"   },
  { image: hpvImage,      title: "HPV",       sub: "Human Papillomavirus",          tag: "Viral",     description: "The most common STI worldwide. Most infections clear on their own, but certain high-risk strains can lead to cervical, anal, penile, or throat cancers. Vaccination is highly effective for prevention.",                                        symptoms: ["Genital warts", "Cervical cell changes", "Often asymptomatic", "Throat/mouth warts", "Vulvar or penile lesions", "Can progress to cancer"],     risk: "Preventable" },
];

const videos = [
  { src: "https://www.youtube.com/embed/f6umofGzPpc", title: "HIV Prevention Tools", body: "Many tools are available to prevent HIV transmission.", tag: "Prevention" },
  { src: "https://www.youtube.com/embed/1_eo17YahCo", title: "About PrEP",           body: "Medicine that greatly reduces your chance of getting HIV.", tag: "Treatment"  },
  { src: "https://www.youtube.com/embed/Y3uQAfPRhm4", title: "HIV Testing",          body: "The only way to know your HIV status is to get tested.",   tag: "Testing"    },
];

const stats = [
  { value: "17",   label: "Centers"  },
  { value: "Free", label: "Care"     },
];

/* ─── Icons ─── */
const Chevron = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d={dir==="left"?"M10 13L5 8l5-5":"M6 3l5 5-5 5"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Check = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
    <path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Play = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M2.5 1.5l7 4-7 4V1.5z" fill="currentColor"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/* ─── QR Lightbox Modal ─── */
function QRModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(8,34,18,0.82)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "qrFadeIn 0.22s ease",
      }}
    >
      <style>{`
        @keyframes qrFadeIn  { from { opacity: 0; }               to { opacity: 1; } }
        @keyframes qrScaleIn { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#082212",
          border: "1px solid rgba(200,236,56,0.2)",
          borderRadius: 24,
          padding: "28px 28px 24px",
          maxWidth: 340,
          width: "100%",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,236,56,0.08)",
          animation: "qrScaleIn 0.28s cubic-bezier(0.34,1.56,0.64,1)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(200,236,56,0.1)",
            border: "1px solid rgba(200,236,56,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#C8EC38",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#C8EC38"; e.currentTarget.style.color = "#082212"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(200,236,56,0.1)"; e.currentTarget.style.color = "#C8EC38"; }}
        >
          <CloseIcon />
        </button>

        {/* Header */}
        <p style={{ fontFamily: "var(--font)", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,236,56,0.6)", margin: "0 0 6px" }}>HSO Baguio</p>
        <p style={{ fontFamily: "var(--font)", fontSize: "1.05rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 18px" }}>Scan to Connect</p>

        {/* QR Image */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 10 }}>
          <img
            src={qrCODE}
            alt="QR Code"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 8 }}
          />
        </div>

        <p style={{ fontFamily: "var(--font)", fontSize: "0.68rem", color: "rgba(200,236,56,0.5)", textAlign: "center", margin: "14px 0 0", lineHeight: 1.6 }}>
          Point your camera at the code to visit the Baguio HSO portal
        </p>
      </div>
    </div>
  );
}

/* ─── Video Card ─── */
function VideoCard({ v }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hov ? "rgba(8,34,18,0.14)" : "rgba(8,34,18,0.07)"}`,
        borderRadius: 20, overflow: "hidden",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        transform: hov ? "translateY(-6px) scale(1.008)" : "translateY(0) scale(1)",
        boxShadow: hov ? "0 28px 60px rgba(8,34,18,0.12)" : "0 2px 12px rgba(8,34,18,0.05)",
      }}
    >
      <div style={{ height: 3, background: hov ? "#C8EC38" : "rgba(200,236,56,0.35)", transition: "background 0.3s" }} />
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} src={v.src} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <span style={{ display: "inline-block", marginBottom: 10, background: "rgba(8,34,18,0.05)", color: "#082212", border: "1px solid rgba(8,34,18,0.1)", fontFamily: "var(--font)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 100 }}>{v.tag}</span>
        <p style={{ fontFamily: "var(--font)", fontSize: "0.9rem", fontWeight: 700, color: "#082212", margin: "0 0 6px", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{v.title}</p>
        <p style={{ fontFamily: "var(--font)", fontSize: "0.75rem", color: "rgba(8,34,18,0.45)", lineHeight: 1.65, margin: "0 0 16px" }}>{v.body}</p>
        <button
          style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#082212", border: "none", borderRadius: 100, padding: "8px 16px", fontFamily: "var(--font)", fontSize: "0.72rem", fontWeight: 600, color: "#C8EC38", cursor: "pointer", transition: "all 0.2s ease" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#C8EC38"; e.currentTarget.style.color = "#082212"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#082212"; e.currentTarget.style.color = "#C8EC38"; }}
        >
          <Play /> Watch now
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Home() {
  const [current, setCurrent]             = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [qrOpen, setQrOpen]               = useState(false);
  const intervalRef = useRef(null);

  const go = (idx) => {
    if (transitioning || idx === current) return;
    setTransitioning(true);
    setTimeout(() => { setCurrent(idx); setTransitioning(false); }, 360);
  };

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5500);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const scrollToPretest = () => document.getElementById("pretest")?.scrollIntoView({ behavior: "smooth" });

  const slide = slides[current];

  return (
    <section style={{ minHeight: "100vh", background: "#f5f7f3", paddingTop: 50, paddingBottom: 50 }}>

      <style>{`
        /* ── Carousel ── */
        .home-carousel {
          display: grid;
          grid-template-columns: 62fr 38fr;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(8,34,18,0.1);
          margin-bottom: 16px;
          box-shadow: 0 8px 40px rgba(8,34,18,0.1);
        }
        .home-carousel-img {
          position: relative;
          overflow: hidden;
          min-height: 560px;
        }
        .home-carousel-panel {
          background: #082212;
          padding: 40px 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* ── Bottom bento ── */
        .home-bottom-grid {
          display: grid;
          grid-template-columns: 3.5fr 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 56px;
        }

        /* ── QR tile ── */
        .home-qr-tile {
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .home-qr-tile:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 16px 40px rgba(8,34,18,0.18);
          border-color: rgba(200,236,56,0.35) !important;
        }
        .home-qr-tile:active {
          transform: scale(0.97);
        }

        /* ── Videos ── */
        .home-video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        /* ── Tablet (≤900px) ── */
        @media (max-width: 900px) {
          .home-bottom-grid { grid-template-columns: 1fr 1fr 1fr; }
          .home-bonjing { grid-column: 1 / -1; }
          .home-video-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Mobile (≤640px) ── */
        @media (max-width: 640px) {
          /* Carousel stacks vertically */
          .home-carousel {
            grid-template-columns: 1fr;
            border-radius: 18px;
            margin-bottom: 12px;
          }
          .home-carousel-img { min-height: 220px; }
          .home-carousel-panel { padding: 20px 18px 22px; }

          /* Symptom grid: single column on very narrow */
          .home-symptoms-grid { grid-template-columns: 1fr 1fr !important; gap: 6px 8px !important; }

          /* Bento: Bonjing full-width top, then QR + 2 stats in a row */
          .home-bottom-grid {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 10px;
            margin-bottom: 32px;
          }
          .home-bonjing {
            grid-column: 1 / -1;
          }
          /* QR and stats sit in their natural 1/3 columns */

          /* Videos: single column */
          .home-video-grid { grid-template-columns: 1fr; }
          .home-video-header { flex-direction: column; align-items: flex-start; gap: 10px; }

          /* Bonjing card: compact horizontal layout */
          .home-bonjing-inner { gap: 14px !important; padding: 16px 18px !important; }
          .home-bonjing-img   { width: 64px !important; height: 64px !important; }

          /* Stat cards: smaller text on mobile */
          .home-stat-value { font-size: 1.5rem !important; }
          .home-stat-label { font-size: 0.52rem !important; }

          /* QR card height */
          .home-qr-tile { min-height: unset !important; }
        }

        /* ── Small mobile (≤400px) ── */
        @media (max-width: 400px) {
          .home-carousel-panel { padding: 16px 14px 18px; }
          .home-bottom-grid    { gap: 8px; }
          .home-symptoms-grid  { grid-template-columns: 1fr !important; }
          .home-bonjing-img    { width: 52px !important; height: 52px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(14px,3vw,48px)" }}>

        {/* ── EYEBROW ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8EC38", display: "inline-block", boxShadow: "0 0 8px rgba(200,236,56,0.8)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(8,34,18,0.4)", letterSpacing: "0.08em" }}>
            Health &amp; Wellness — Baguio City HSO
          </span>
        </div>

        {/* ══ CAROUSEL ══ */}
        <div className="home-carousel">

          {/* LEFT: IMAGE */}
          <div className="home-carousel-img">
            <img src={slide.image} alt={slide.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: transitioning ? 0 : 1, transform: transitioning ? "scale(1.04)" : "scale(1)", transition: "opacity 0.36s ease, transform 0.36s ease" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 50%, #082212 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,34,18,0.65) 0%, transparent 45%)" }} />
            <div style={{ position: "absolute", bottom: 26, left: 22, display: "flex", alignItems: "center", gap: 12 }}>
              {["left","right"].map(dir => (
                <button key={dir} onClick={() => { go(dir==="left"?(current-1+slides.length)%slides.length:(current+1)%slides.length); resetInterval(); }} style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,0.18)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.28)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", transition:"all 0.2s ease" }} onMouseEnter={e=>{e.currentTarget.style.background="#C8EC38";e.currentTarget.style.color="#082212";e.currentTarget.style.borderColor="#C8EC38";e.currentTarget.style.transform="scale(1.1)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.18)";e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="rgba(255,255,255,0.28)";e.currentTarget.style.transform="scale(1)";}}>
                  <Chevron dir={dir} />
                </button>
              ))}
              <div style={{ display: "flex", gap: 5 }}>
                {slides.map((_,i) => <button key={i} onClick={() => { go(i); resetInterval(); }} style={{ width:i===current?24:6, height:6, borderRadius:100, background:i===current?"#C8EC38":"rgba(255,255,255,0.35)", border:"none", cursor:"pointer", padding:0, transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)" }} />)}
              </div>
            </div>
            <div style={{ position:"absolute", bottom:32, right:24 }}>
              <span style={{ fontFamily:"var(--font)", fontSize:"0.65rem", fontWeight:600, color:"rgba(255,255,255,0.35)", letterSpacing:"0.06em" }}>{String(current+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span>
            </div>
          </div>

          {/* RIGHT: INFO PANEL */}
          <div
            className="home-carousel-panel"
            style={{ opacity: transitioning ? 0.4 : 1, transition: "opacity 0.36s ease" }}
          >
            <div>
              <span style={{ display:"inline-block", marginBottom:20, background:"rgba(200,236,56,0.1)", color:"rgba(200,236,56,0.75)", border:"1px solid rgba(200,236,56,0.18)", fontFamily:"var(--font)", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 12px", borderRadius:100 }}>{slide.risk}</span>
              <p style={{ fontFamily:"var(--font)", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#f4f5ee", margin:"0 0 7px" }}>{slide.sub}</p>
              <h1 style={{ fontFamily:"var(--font)", fontSize:"clamp(1.8rem,5vw,4rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.045em", lineHeight:0.92, margin:"0 0 14px" }}>{slide.title}</h1>
              <p style={{ fontFamily:"var(--font)", fontSize:"0.78rem", fontWeight:400, color:"#f4f5ee", lineHeight:1.65, margin:"0 0 20px" }}>{slide.description}</p>
              <div style={{ height:1, background:"rgba(255,255,255,0.07)", marginBottom:18 }} />
              <p style={{ fontFamily:"var(--font)", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#f4f5ee", margin:"0 0 12px" }}>Common Symptoms</p>
              <div className="home-symptoms-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 10px", marginBottom:24 }}>
                {slide.symptoms.map((s,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ width:18, height:18, borderRadius:"50%", flexShrink:0, background:"rgba(200,236,56,0.1)", border:"1px solid rgba(200,236,56,0.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"#C8EC38" }}><Check /></span>
                    <span style={{ fontFamily:"var(--font)", fontSize:"0.71rem", fontWeight:500, color:"#f4f5ee", lineHeight:1.3 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={scrollToPretest} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", background:"#C8EC38", border:"none", borderRadius:13, padding:"14px", fontFamily:"var(--font)", fontSize:"0.82rem", fontWeight:700, color:"#082212", cursor:"pointer", letterSpacing:"0.01em", transition:"all 0.22s ease" }} onMouseEnter={e=>{e.currentTarget.style.background="#d4f04a";e.currentTarget.style.boxShadow="0 0 24px rgba(200,236,56,0.35)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="#C8EC38";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
              Learn More &amp; Get Tested <Arrow />
            </button>
          </div>
        </div>

        {/* ══ BONJING + QR + STATS ══ */}
        <div className="home-bottom-grid">

          {/* Bonjing */}
          <div className="home-bonjing" style={{ background:"#fff", border:"1px solid rgba(8,34,18,0.08)", borderRadius:20, boxShadow:"0 2px 12px rgba(8,34,18,0.04)" }}>
            <div className="home-bonjing-inner" style={{ display:"flex", alignItems:"center", gap:20, padding:"22px 26px", height:"100%", boxSizing:"border-box" }}>
              <img className="home-bonjing-img" src={BonJing} alt="Bonjing" style={{ width:84, height:84, objectFit:"cover", borderRadius:14, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <span style={{ display:"inline-block", marginBottom:8, background:"rgba(8,34,18,0.06)", color:"#082212", border:"1px solid rgba(8,34,18,0.1)", fontFamily:"var(--font)", fontSize:"0.56rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"3px 9px", borderRadius:100 }}>HSO Baguio</span>
                <p style={{ fontFamily:"var(--font)", fontSize:"1.05rem", fontWeight:800, color:"#082212", letterSpacing:"-0.02em", margin:"0 0 5px", lineHeight:1.2 }}>Meet Bonjing</p>
                <p style={{ fontFamily:"var(--font)", fontSize:"0.71rem", color:"rgba(8,34,18,0.4)", lineHeight:1.55, margin:0 }}>Baguio HSO's health ambassador.</p>
              </div>
            </div>
          </div>

          {/* QR — clickable */}
          <div
            className="home-qr-tile"
            onClick={() => setQrOpen(true)}
            role="button"
            aria-label="Enlarge QR code"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setQrOpen(true); }}
            style={{ background:"#082212", border:"1px solid rgba(200,236,56,0.12)", borderRadius:20, padding:"14px 12px 12px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, position:"relative" }}
          >
            {/* Zoom hint */}
            <div style={{ position:"absolute", top:10, right:10, width:22, height:22, borderRadius:6, background:"rgba(200,236,56,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1h3.5M1 1v3.5M10 10H6.5M10 10V6.5" stroke="#C8EC38" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ background:"#fff", borderRadius:8, padding:5, width:"100%" }}>
              <img src={qrCODE} alt="Scan QR code" style={{ width:"100%", height:"auto", display:"block", borderRadius:5 }} />
            </div>
            <span style={{ fontFamily:"var(--font)", fontSize:"0.57rem", fontWeight:600, color:"#C8EC38", letterSpacing:"0.1em", textTransform:"uppercase" }}>Scan Me</span>
          </div>

          {/* Stats */}
          {stats.map(({ value, label }) => (
            <div key={label} style={{ background:"#082212", border:"1px solid rgba(200,236,56,0.12)", borderRadius:20, padding:"24px 14px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5 }}>
              <span className="home-stat-value" style={{ fontFamily:"var(--font)", fontSize:"2rem", fontWeight:900, color:"#fff", letterSpacing:"-0.04em", lineHeight:1 }}>{value}</span>
              <span className="home-stat-label" style={{ fontFamily:"var(--font)", fontSize:"0.57rem", fontWeight:600, color:"#C8EC38", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
            </div>
          ))}

        </div>

        {/* ══ VIDEO HEADER ══ */}
        <div className="home-video-header" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:18 }}>
          <div>
            <p style={{ fontFamily:"var(--font)", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(8,34,18,0.3)", margin:"0 0 7px" }}>Educational Resources</p>
            <h2 style={{ fontFamily:"var(--font)", fontSize:"clamp(1.4rem,2.2vw,1.8rem)", fontWeight:800, color:"#082212", letterSpacing:"-0.03em", margin:0, lineHeight:1 }}>Preventives &amp; Tips</h2>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:7, background:"#082212", borderRadius:100, padding:"7px 16px", flexShrink: 0 }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#C8EC38", display:"inline-block" }} />
            <span style={{ fontFamily:"var(--font)", fontSize:"0.62rem", fontWeight:600, color:"#C8EC38", letterSpacing:"0.06em" }}>3 Videos</span>
          </div>
        </div>

        {/* ══ VIDEO GRID ══ */}
        <div className="home-video-grid">
          {videos.map((v,i) => <VideoCard key={i} v={v} />)}
        </div>

      </div>

      {/* ── QR LIGHTBOX ── */}
      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}

      <FloatingChatBot />
    </section>
  );
}