import { useState } from "react";

const C = {
  cream:      "#f5f4ee",
  creamDark:  "#ede9de",
  creamMid:   "#e4e0d4",
  forest:     "#175330",
  deep:       "#0d3320",
  mid:        "#1e6840",
  lime:       "#C8EC38",
  white:      "#ffffff",
  ink:        "#0d1f14",
  inkMid:     "rgba(13,31,20,0.52)",
  inkFaint:   "rgba(13,31,20,0.26)",
  font:       "var(--font)",
};

/* ── SVG Icons ── */
const ArrowR = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowL = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M2 5.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoShield = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5L2 3.5v4c0 2.76 2.16 5.35 5 5.97C9.84 12.85 12 10.26 12 7.5v-4L7 1.5z" stroke={C.forest} strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M5 7l1.5 1.5 3-3" stroke={C.forest} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoLock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke={C.forest} strokeWidth="1.2"/>
    <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke={C.forest} strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="7" cy="9" r="0.9" fill={C.forest}/>
  </svg>
);
const IcoChart = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1.5" y="8" width="2.5" height="4.5" rx="0.8" fill={C.forest}/>
    <rect x="5.75" y="5" width="2.5" height="7.5" rx="0.8" fill={C.forest}/>
    <rect x="10" y="2" width="2.5" height="10.5" rx="0.8" fill={C.forest}/>
  </svg>
);
const IcoHelp = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M3.8 3.8a1.2 1.2 0 012.2.7c0 .8-.8 1-1 1.4v.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="5" cy="7.2" r="0.5" fill="currentColor"/>
  </svg>
);

/* ── Small section eyebrow ── */
function Eyebrow({ children, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 18, height: 2, background: light ? C.lime : C.inkFaint, borderRadius: 2, flexShrink: 0 }} />
      <span style={{
        fontFamily: C.font, fontSize: "0.72rem", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: light ? "rgba(200,236,56,0.55)" : C.inkFaint,
      }}>{children}</span>
    </div>
  );
}

/* ══ RESULT ══ */
function Result({ score, isHighRisk, onRestart }) {
  const high    = isHighRisk || score >= 5;
  const mod     = !high && score >= 3;
  const riskNum = high ? 3 : mod ? 2 : 1;

  const levels = [
    { label: "Low Risk",      range: "0–2 pts", color: C.forest,   darkColor: "#C8EC38", dot: "#C8EC38", bg: "rgba(200,236,56,0.13)", border: "rgba(200,236,56,0.25)" },
    { label: "Moderate Risk", range: "3–4 pts", color: "#92600a",  darkColor: "#fbbf24", dot: "#f59e0b", bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.3)"  },
    { label: "High Risk",     range: "5+ pts",  color: "#991b1b",  darkColor: "#f87171", dot: "#ef4444", bg: "rgba(220,38,38,0.12)",  border: "rgba(220,38,38,0.3)"   },
  ];
  const active = levels[riskNum - 1];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        .result-hero { display: flex; gap: 28px; align-items: center; }
        @media (max-width: 600px) {
          .result-hero { flex-direction: column; align-items: flex-start; gap: 20px; }
          .result-levels { width: 100%; }
          .result-next-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Score hero */}
      <div style={{ background: C.deep, borderRadius: 24, padding: "36px 30px" }}>
        <div className="result-hero">
          <div style={{ flex: 1 }}>
            <Eyebrow light>Assessment Result</Eyebrow>
            <p style={{ fontFamily: C.font, fontSize: "5.5rem", fontWeight: 900, letterSpacing: "-0.065em", lineHeight: 1, margin: "8px 0 6px", color: active.darkColor }}>
              {score}
            </p>
            <p style={{ fontFamily: C.font, fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>Total Score</p>
          </div>

          <div className="result-levels" style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
            {levels.map((l, i) => {
              const sel = i + 1 === riskNum;
              return (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", borderRadius: 100, background: sel ? l.bg : "rgba(255,255,255,0.04)", border: `1px solid ${sel ? l.border : "rgba(255,255,255,0.07)"}`, transition: "all 0.3s ease" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: sel ? l.dot : "rgba(255,255,255,0.18)", boxShadow: sel ? `0 0 8px ${l.dot}` : "none" }} />
                  <span style={{ fontFamily: C.font, fontSize: "0.78rem", fontWeight: sel ? 700 : 450, color: sel ? l.darkColor : "rgba(245,244,238,0.3)", letterSpacing: "0.02em" }}>{l.label}</span>
                  <span style={{ fontFamily: C.font, fontSize: "0.66rem", color: sel ? l.darkColor : "rgba(245,244,238,0.18)", opacity: sel ? 0.7 : 1 }}>{l.range}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Risk badge */}
      <div style={{ background: active.bg, border: `1.5px solid ${active.dot}35`, borderRadius: 18, padding: "18px 22px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: active.dot, flexShrink: 0, boxShadow: `0 0 10px ${active.dot}80` }} />
        <div>
          <p style={{ fontFamily: C.font, fontSize: "0.9rem", fontWeight: 800, color: active.color, margin: "0 0 2px" }}>
            {active.label} — {high ? "Testing strongly recommended." : mod ? "Consider getting tested soon." : "No immediate concern — test regularly."}
          </p>
          <p style={{ fontFamily: C.font, fontSize: "0.78rem", color: active.color, opacity: 0.72, margin: 0 }}>
            {high ? "Visit a health center as soon as possible." : mod ? "Early detection makes all the difference." : "Regular testing is a healthy habit."}
          </p>
        </div>
      </div>

      {/* Next steps */}
      <div className="result-next-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.white, border: `1.5px solid ${C.creamDark}`, borderRadius: 22, padding: "26px 24px" }}>
          <div style={{ width: 28, height: 3, background: C.lime, borderRadius: 2, marginBottom: 16 }} />
          <p style={{ fontFamily: C.font, fontSize: "0.95rem", fontWeight: 800, color: C.ink, marginBottom: 10, letterSpacing: "-0.015em" }}>What to do next</p>
          <p style={{ fontFamily: C.font, fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.65, marginBottom: 16 }}>
            {high ? "Testing is strongly recommended. Visit a health center as soon as possible." : mod ? "Consider getting tested. Early detection makes all the difference." : "No immediate concern — regular testing is still a healthy habit."}
          </p>
          <p style={{ fontFamily: C.font, fontSize: "0.8rem", fontWeight: 700, color: C.forest, marginBottom: 3 }}>Baguio City Health Services Office</p>
          <p style={{ fontFamily: C.font, fontSize: "0.72rem", color: C.inkMid, margin: 0 }}>Reproductive Health and Wellness Center, Room 101</p>
        </div>

        <div style={{ background: C.lime, borderRadius: 22, padding: "26px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: 28, height: 3, background: C.deep, borderRadius: 2, marginBottom: 16 }} />
            <p style={{ fontFamily: C.font, fontSize: "0.95rem", fontWeight: 800, color: C.deep, marginBottom: 10, letterSpacing: "-0.015em" }}>Emergency Hotline</p>
            <p style={{ fontFamily: C.font, fontSize: "1.5rem", fontWeight: 900, color: C.deep, letterSpacing: "-0.04em", margin: "0 0 4px", lineHeight: 1 }}>0985-251-5968</p>
            <p style={{ fontFamily: C.font, fontSize: "0.88rem", fontWeight: 700, color: C.forest, margin: "0 0 18px" }}>442-9800</p>
          </div>
          <a href="https://www.facebook.com/me/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 20px", borderRadius: 100, background: C.deep, color: C.white, fontSize: "0.8rem", fontWeight: 700, fontFamily: C.font, textDecoration: "none" }}>
            View Facebook Page <ArrowR />
          </a>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <ActionBtn onClick={onRestart} variant="cream" style={{ flex: 1 }}><ArrowL /> Take Again</ActionBtn>
        <ActionBtn onClick={() => alert("Thank you for completing the assessment. Stay informed and stay safe!")} variant="forest" style={{ flex: 1 }}>Done</ActionBtn>
      </div>
    </div>
  );
}

/* ── Action button ── */
function ActionBtn({ children, onClick, variant = "forest", style = {} }) {
  const [hov, setHov] = useState(false);
  const styles = {
    forest: { bg: hov ? C.mid : C.forest, color: C.lime },
    cream:  { bg: hov ? C.creamMid : C.creamDark, color: C.ink },
    lime:   { bg: hov ? "#d4f04a" : C.lime, color: C.deep },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "13px 22px", borderRadius: 14, border: "none", cursor: "pointer", fontFamily: C.font, fontSize: "0.88rem", fontWeight: 700, background: s.bg, color: s.color, transition: "all 0.18s ease", boxShadow: (variant === "forest" && hov) ? "0 6px 20px rgba(13,51,32,0.22)" : "none", transform: hov ? "translateY(-1px)" : "none", ...style }}>
      {children}
    </button>
  );
}

/* ── Option pill ── */
function OptionPill({ children, sel, onClick, isUnsure }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "9px 18px", borderRadius: 100, cursor: "pointer",
        background: sel
          ? isUnsure ? "rgba(13,31,20,0.08)" : C.forest
          : hov ? C.creamMid : C.white,
        border: `1.5px solid ${sel
          ? isUnsure ? "rgba(13,31,20,0.2)" : C.forest
          : C.creamDark}`,
        fontFamily: C.font, fontSize: "0.84rem",
        fontWeight: sel ? 700 : 500,
        color: sel
          ? isUnsure ? C.inkMid : C.white
          : C.ink,
        transition: "all 0.18s ease",
      }}
    >
      {sel && !isUnsure && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.lime, flexShrink: 0 }} />}
      {sel && isUnsure && <IcoHelp />}
      {children}
    </button>
  );
}

/* ══ MAIN ══ */
export default function Pretest() {
  const [answers, setAnswers]           = useState({});
  const [showResult, setShowResult]     = useState(false);
  const [score, setScore]               = useState(0);
  const [isHighRisk, setIsHighRisk]     = useState(false);
  const [currentPage, setCurrentPage]   = useState(1);
  const [hasConsented, setHasConsented] = useState(false);

  /* ── "Not Sure" appended to every single-type question ── */
  const NOT_SURE = { label: "Not Sure", points: 0, isUnsure: true };

  const questions = [
    { id: 1,  text: "Have you had unprotected sex in the past 6 months?",                       type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 2,  text: "Have you had multiple sexual partners in the past year?",                   type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 3,  text: "Have you had sexual contact with someone whose HIV status is unknown?",     type: "single", options: [{ label: "Yes", points: 1 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 4,  text: "Do you have a partner diagnosed with HIV?",                                 type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }, NOT_SURE] },
    { id: 5,  text: "Have you had condomless sex with someone who injects drugs?",               type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 6,  text: "Have you engaged with a commercial sex worker?",                            type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 7,  text: "Have you shared needles?",                                                  type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }, NOT_SURE] },
    { id: 8,  text: "Have you received a blood transfusion before 1992?",                        type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 9,  text: "Did you get a tattoo or piercing with unsterilized equipment?",             type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }, NOT_SURE] },
    { id: 10, text: "Are you a healthcare worker exposed to needle-stick injury?",               type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }, NOT_SURE] },
    { id: 11, text: "Were you born to an untreated HIV-positive mother?",                        type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }, NOT_SURE] },
    { id: 12, text: "Are you experiencing any of these symptoms?",                               type: "multi",  options: [{ label: "Unexplained fever over 2 weeks", points: 1 }, { label: "Night sweats and weight loss", points: 2 }, { label: "Swollen lymph nodes", points: 1 }, { label: "Persistent diarrhea", points: 1 }, { label: "No symptoms", points: 0 }] },
    { id: 13, text: "Have you been tested in the last 6 months?",                                type: "single", options: [{ label: "Yes", points: -1 }, { label: "No", points: 0 }, NOT_SURE] },
  ];

  const perPage  = 4;
  const total    = Math.ceil(questions.length / perPage);
  const current  = questions.slice((currentPage - 1) * perPage, currentPage * perPage);
  const progress = (currentPage / total) * 100;

  const handleChange = (id, val) => setAnswers(p => ({ ...p, [id]: val }));

  const submit = () => {
    let tot = 0, hi = false;
    questions.forEach(q => {
      const a = answers[q.id];
      if (!a) return;
      if (q.type === "multi") {
        a.forEach(o => { if (o.autoHighRisk) hi = true; if (typeof o.points === "number") tot += o.points; });
      } else {
        if (a.autoHighRisk) hi = true;
        if (typeof a.points === "number") tot += a.points;
      }
    });
    setScore(tot); setIsHighRisk(hi); setShowResult(true);
  };

  const restart = () => {
    setAnswers({}); setShowResult(false); setScore(0);
    setIsHighRisk(false); setCurrentPage(1); setHasConsented(false);
  };

  return (
    <div id="pretest" style={{ background: C.creamDark, paddingTop: 0, paddingBottom: 80, fontFamily: C.font }}>

      <style>{`
        /* ── Pretest layout ── */
        .pretest-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: start;
        }
        .pretest-sidebar { display: flex; flex-direction: column; gap: 16px; }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .pretest-grid {
            grid-template-columns: 1fr;
          }
          .pretest-sidebar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .pretest-sidebar-disclaimer { grid-column: 1 / -1; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .pretest-page-header h1 { font-size: clamp(2.4rem, 10vw, 4rem) !important; }
          .pretest-page-header    { margin-bottom: 28px !important; }
          .pretest-sidebar        { grid-template-columns: 1fr; }
          .pretest-form-inner     { padding: 22px 18px !important; border-radius: 20px !important; }
          .pretest-consent-inner  { padding: 28px 20px !important; border-radius: 20px !important; }
          .pretest-question-card  { padding: 14px 16px !important; border-radius: 16px !important; }
          .pretest-pills          { gap: 6px !important; }
          .pretest-pill           { padding: 8px 14px !important; font-size: 0.8rem !important; }
          .pretest-nav            { gap: 8px !important; }
          .pretest-nav button     { padding: 11px 16px !important; font-size: 0.82rem !important; }
        }

        /* ── Small mobile ── */
        @media (max-width: 400px) {
          .pretest-form-inner    { padding: 18px 14px !important; }
          .pretest-consent-inner { padding: 22px 16px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,3vw,56px)" }}>

        {/* Page header */}
        <div className="pretest-page-header" style={{ marginBottom: 52 }}>
          <Eyebrow>Reproductive Health and Wellness Center</Eyebrow>
          <h1 style={{ fontFamily: C.font, fontSize: "clamp(2.6rem,8vw,4rem)", fontWeight: 900, color: C.ink, letterSpacing: "-0.05em", lineHeight: 0.92, margin: "12px 0 0" }}>
            STI / HIV Risk Assessment
          </h1>
        </div>

        <div className="pretest-grid">

          {/* ── LEFT SIDEBAR ── */}
          <div className="pretest-sidebar">
            {[
              { src: "https://www.youtube.com/embed/604tb9pehxE", title: "Start HIV treatment as soon as possible after diagnosis", tag: "Treatment" },
              { src: "https://www.youtube.com/embed/uScEAA9LlZw", title: "Why get tested?", tag: "Testing" },
            ].map((v, i) => (
              <div key={i} style={{ background: C.white, border: `1.5px solid ${C.creamDark}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 10px rgba(13,51,32,0.05)" }}>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} src={v.src} title={v.title} allowFullScreen />
                </div>
                <div style={{ padding: "14px 16px 18px" }}>
                  <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 100, marginBottom: 8, background: "rgba(23,83,48,0.09)", color: C.forest, fontFamily: C.font, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{v.tag}</span>
                  <p style={{ fontFamily: C.font, fontSize: "0.82rem", fontWeight: 700, color: C.ink, margin: "4px 0 0", lineHeight: 1.4, letterSpacing: "-0.01em" }}>{v.title}</p>
                </div>
              </div>
            ))}

            <div className="pretest-sidebar-disclaimer" style={{ background: "rgba(23,83,48,0.06)", border: `1.5px solid rgba(23,83,48,0.1)`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <IcoShield />
              <p style={{ fontFamily: C.font, fontSize: "0.78rem", color: C.forest, lineHeight: 1.65, margin: 0 }}>
                This assessment is <strong>confidential and voluntary</strong>. No personal information is collected or stored.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Assessment ── */}
          <div>
            {showResult ? (
              <Result score={score} isHighRisk={isHighRisk} onRestart={restart} />

            ) : !hasConsented ? (

              /* ── CONSENT ── */
              <div className="pretest-consent-inner" style={{ background: C.white, border: `1.5px solid ${C.creamDark}`, borderRadius: 28, padding: "44px 40px", boxShadow: "0 4px 20px rgba(13,51,32,0.06)" }}>
                <Eyebrow>Informed Consent</Eyebrow>
                <h2 style={{ fontFamily: C.font, fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: C.ink, margin: "12px 0 10px" }}>Before We Begin</h2>
                <p style={{ fontFamily: C.font, fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.7, marginBottom: 36 }}>
                  A confidential, voluntary questionnaire to help assess your STI / HIV risk level.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {[
                    { Icon: IcoLock,   label: "Confidential",           desc: "No personal information will be collected or stored." },
                    { Icon: IcoChart,  label: "Anonymous Statistics",    desc: "Aggregate data may be used to improve public health services." },
                    { Icon: IcoShield, label: "Testing Recommendations", desc: "You may receive guidance to visit a health center based on results." },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: C.creamDark, borderRadius: 14 }}>
                      <div style={{ marginTop: 1, flexShrink: 0 }}><item.Icon /></div>
                      <div>
                        <p style={{ fontFamily: C.font, fontWeight: 700, fontSize: "0.86rem", color: C.ink, margin: "0 0 3px" }}>{item.label}</p>
                        <p style={{ fontFamily: C.font, fontSize: "0.78rem", color: C.inkMid, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkbox */}
                <div
                  onClick={() => setHasConsented(v => !v)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 18px", borderRadius: 14, cursor: "pointer", background: hasConsented ? "rgba(23,83,48,0.07)" : C.creamDark, border: `1.5px solid ${hasConsented ? "rgba(23,83,48,0.2)" : C.creamMid}`, marginBottom: 20, transition: "all 0.2s ease" }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 7, flexShrink: 0, background: hasConsented ? C.forest : C.creamMid, display: "flex", alignItems: "center", justifyContent: "center", color: C.lime, transition: "all 0.2s ease" }}>
                    {hasConsented && <IcoCheck />}
                  </div>
                  <span style={{ fontFamily: C.font, fontSize: "0.88rem", fontWeight: 600, color: C.ink }}>I understand and agree to proceed voluntarily</span>
                </div>

                {hasConsented && (
                  <ActionBtn onClick={() => setHasConsented(true)} variant="forest" style={{ width: "100%", padding: "15px" }}>
                    Proceed to Assessment <ArrowR />
                  </ActionBtn>
                )}
              </div>

            ) : (

              /* ── QUESTIONS ── */
              <div className="pretest-form-inner" style={{ background: C.white, border: `1.5px solid ${C.creamDark}`, borderRadius: 28, padding: "36px 36px", boxShadow: "0 4px 20px rgba(13,51,32,0.06)" }}>

                {/* Progress */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h2 style={{ fontFamily: C.font, fontSize: "clamp(1.1rem,3vw,1.4rem)", fontWeight: 900, letterSpacing: "-0.03em", color: C.ink, margin: 0 }}>
                      HIV Risk Assessment
                    </h2>
                    <span style={{ fontFamily: C.font, fontSize: "0.74rem", fontWeight: 700, color: C.inkFaint, letterSpacing: "0.04em", background: C.creamDark, padding: "5px 12px", borderRadius: 100, whiteSpace: "nowrap" }}>
                      Page {currentPage} of {total}
                    </span>
                  </div>
                  <div style={{ height: 6, background: C.creamDark, borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${C.forest}, ${C.mid})`, borderRadius: 100, transition: "width 0.4s ease" }} />
                  </div>
                </div>

                {/* Questions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {current.map(q => (
                    <div key={q.id} className="pretest-question-card" style={{ background: C.creamDark, borderRadius: 18, padding: "18px 20px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                        <span style={{ flexShrink: 0, background: C.forest, color: C.lime, fontFamily: C.font, fontSize: "0.6rem", fontWeight: 800, padding: "3px 8px", borderRadius: 7, letterSpacing: "0.04em" }}>
                          Q{q.id}
                        </span>
                        <p style={{ fontFamily: C.font, fontSize: "0.9rem", fontWeight: 600, color: C.ink, margin: 0, lineHeight: 1.5, letterSpacing: "-0.01em" }}>
                          {q.text}
                        </p>
                      </div>

                      <div className="pretest-pills" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {q.type === "single" && q.options.map((opt, idx) => {
                          const sel = answers[q.id]?.label === opt.label;
                          return (
                            <OptionPill key={idx} sel={sel} isUnsure={!!opt.isUnsure} onClick={() => handleChange(q.id, opt)}>
                              {opt.label}
                            </OptionPill>
                          );
                        })}
                        {q.type === "multi" && q.options.map((opt, idx) => {
                          const sel = answers[q.id]?.some(o => o.label === opt.label) || false;
                          return (
                            <OptionPill key={idx} sel={sel} isUnsure={false} onClick={() => {
                              const prev = answers[q.id] || [];
                              handleChange(q.id, sel ? prev.filter(o => o.label !== opt.label) : [...prev, opt]);
                            }}>
                              {opt.label}
                            </OptionPill>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="pretest-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 22, borderTop: `1px solid ${C.creamDark}`, gap: 10 }}>
                  {currentPage > 1
                    ? <ActionBtn variant="cream" onClick={() => setCurrentPage(p => p - 1)}><ArrowL /> Previous</ActionBtn>
                    : <div />
                  }
                  {currentPage < total
                    ? <ActionBtn variant="forest" onClick={() => setCurrentPage(p => p + 1)}>Next <ArrowR /></ActionBtn>
                    : <ActionBtn variant="lime" onClick={submit}>Submit <ArrowR /></ActionBtn>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}