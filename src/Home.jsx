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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,48px)" }}>

        {/* ── EYEBROW ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8EC38", display: "inline-block", boxShadow: "0 0 8px rgba(200,236,56,0.8)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(8,34,18,0.4)", letterSpacing: "0.08em" }}>
            Health &amp; Wellness — Baguio City HSO
          </span>
        </div>

        {/* ══ CAROUSEL ══ */}
        <div style={{ display: "grid", gridTemplateColumns: "62fr 38fr", borderRadius: 24, overflow: "hidden", minHeight: 560, border: "1px solid rgba(8,34,18,0.1)", marginBottom: 16, boxShadow: "0 8px 40px rgba(8,34,18,0.1)" }}>

          {/* LEFT: IMAGE */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: 560 }}>
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
          <div style={{ background: "#082212", padding: "40px 34px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: transitioning ? 0.4 : 1, transition: "opacity 0.36s ease" }}>
            <div>
              <span style={{ display:"inline-block", marginBottom:20, background:"rgba(200,236,56,0.1)", color:"rgba(200,236,56,0.75)", border:"1px solid rgba(200,236,56,0.18)", fontFamily:"var(--font)", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 12px", borderRadius:100 }}>{slide.risk}</span>
              <p style={{ fontFamily:"var(--font)", fontSize:"0.62rem", fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#f4f5ee", margin:"0 0 7px" }}>{slide.sub}</p>
              <h1 style={{ fontFamily:"var(--font)", fontSize:"clamp(2.8rem,4vw,4rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.045em", lineHeight:0.92, margin:"0 0 18px" }}>{slide.title}</h1>
              <p style={{ fontFamily:"var(--font)", fontSize:"0.78rem", fontWeight:400, color:"#f4f5ee", lineHeight:1.65, margin:"0 0 26px" }}>{slide.description}</p>
              <div style={{ height:1, background:"rgba(255,255,255,0.07)", marginBottom:22 }} />
              <p style={{ fontFamily:"var(--font)", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#f4f5ee", margin:"0 0 13px" }}>Common Symptoms</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 10px", marginBottom:28 }}>
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

        {/* ══ BONJING + QR + STATS ══
            Grid: [Bonjing × 2 cols] [QR × 1 col] [17] [12+] [Free]  =  5 cols total */}
        <div style={{ display: "grid", gridTemplateColumns: "3.5fr 1fr 1fr 1fr", gap: 12, marginBottom: 56 }}>

          {/* Bonjing — spans 2 cols, QR removed from inside */}
          <div style={{ background:"#fff", border:"1px solid rgba(8,34,18,0.08)", borderRadius:20, padding:"22px 26px", display:"flex", alignItems:"center", gap:20, boxShadow:"0 2px 12px rgba(8,34,18,0.04)" }}>
            <img src={BonJing} alt="Bonjing" style={{ width:84, height:84, objectFit:"cover", borderRadius:14, flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <span style={{ display:"inline-block", marginBottom:8, background:"rgba(8,34,18,0.06)", color:"#082212", border:"1px solid rgba(8,34,18,0.1)", fontFamily:"var(--font)", fontSize:"0.56rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"3px 9px", borderRadius:100 }}>HSO Baguio</span>
              <p style={{ fontFamily:"var(--font)", fontSize:"1.05rem", fontWeight:800, color:"#082212", letterSpacing:"-0.02em", margin:"0 0 5px", lineHeight:1.2 }}>Meet Bonjing</p>
              <p style={{ fontFamily:"var(--font)", fontSize:"0.71rem", color:"rgba(8,34,18,0.4)", lineHeight:1.55, margin:0 }}>Baguio HSO's health ambassador.</p>
            </div>
          </div>

          {/* QR — own card, same dark style as the 3 stats */}
          <div style={{ background:"#082212", border:"1px solid rgba(200,236,56,0.12)", borderRadius:20, padding:"14px 12px 12px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
            {/* white wrapper keeps QR high-contrast + scannable */}
            <div style={{ background:"#fff", borderRadius:8, padding:5, width:"100%" }}>
              <img src={qrCODE} alt="Scan QR code" style={{ width:"100%", height:"auto", display:"block", borderRadius:5 }} />
            </div>
            <span style={{ fontFamily:"var(--font)", fontSize:"0.57rem", fontWeight:600, color:"#C8EC38", letterSpacing:"0.1em", textTransform:"uppercase" }}>Scan Me</span>
          </div>

          {/* Stats */}
          {stats.map(({ value, label }) => (
            <div key={label} style={{ background:"#082212", border:"1px solid rgba(200,236,56,0.12)", borderRadius:20, padding:"24px 14px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5 }}>
              <span style={{ fontFamily:"var(--font)", fontSize:"2rem", fontWeight:900, color:"#fff", letterSpacing:"-0.04em", lineHeight:1 }}>{value}</span>
              <span style={{ fontFamily:"var(--font)", fontSize:"0.57rem", fontWeight:600, color:"#C8EC38", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
            </div>
          ))}

        </div>

        {/* ══ VIDEO HEADER ══ */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:18 }}>
          <div>
            <p style={{ fontFamily:"var(--font)", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(8,34,18,0.3)", margin:"0 0 7px" }}>Educational Resources</p>
            <h2 style={{ fontFamily:"var(--font)", fontSize:"clamp(1.4rem,2.2vw,1.8rem)", fontWeight:800, color:"#082212", letterSpacing:"-0.03em", margin:0, lineHeight:1 }}>Preventives &amp; Tips</h2>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:7, background:"#082212", borderRadius:100, padding:"7px 16px" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#C8EC38", display:"inline-block" }} />
            <span style={{ fontFamily:"var(--font)", fontSize:"0.62rem", fontWeight:600, color:"#C8EC38", letterSpacing:"0.06em" }}>3 Videos</span>
          </div>
        </div>

        {/* ══ VIDEO GRID ══ */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {videos.map((v,i) => <VideoCard key={i} v={v} />)}
        </div>

      </div>
      <FloatingChatBot />
    </section>
  );
}