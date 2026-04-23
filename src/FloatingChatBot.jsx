import React, { useState, useRef, useEffect } from "react";

const C = {
  deep:      "#0d3320",
  forest:    "#175330",
  mid:       "#1e6840",
  lime:      "#C8EC38",
  cream:     "#f5f4ee",
  creamDark: "#ede9de",
  white:     "#ffffff",
  ink:       "#0d1f14",
  inkMid:    "rgba(13,31,20,0.52)",
  font:      "var(--font)",
};

/* ── SVG Icons ── */
const IcoChatBubble = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2C6.03 2 2 5.8 2 10.5c0 2.18.84 4.17 2.22 5.68L3 19l3.5-1.16A9.26 9.26 0 0011 19c4.97 0 9-3.8 9-8.5S15.97 2 11 2z" stroke={C.deep} strokeWidth="1.6" strokeLinejoin="round" fill={C.lime}/>
    <path d="M7.5 10.5h7M7.5 13.5h4" stroke={C.deep} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IcoClose = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const IcoSend = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14 2L2 6.5l5 2 3-3.5-2.5 4 2 5L14 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const IcoBot = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="2" y="4" width="10" height="8" rx="2" stroke={C.lime} strokeWidth="1.2"/>
    <path d="M5 8h4M5 10h2" stroke={C.lime} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7 4V2M5 2h4" stroke={C.lime} strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="4.5" cy="7" r="0.75" fill={C.lime}/>
    <circle cx="9.5" cy="7" r="0.75" fill={C.lime}/>
  </svg>
);
const IcoUser = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="5" r="2.5" stroke={C.white} strokeWidth="1.2"/>
    <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke={C.white} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const QUICK_REPLIES = [
  "Where's the nearest health center?",
  "What services are available?",
  "How do I get HIV tested?",
  "Is testing confidential?",
];

const GREETING = "Hi! I'm your Baguio HSO health assistant. How can I help you today? You can ask me about HIV, STIs like herpes, syphilis, HPV, chlamydia, gonorrhea, available services, or how to get tested.";

export default function FloatingChatBot() {
  const [open, setOpen]     = useState(false);
  const [input, setInput]   = useState("");
  const [messages, setMsgs] = useState([
    { role: "bot", text: GREETING },
  ]);
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse]   = useState(true);
  const bottomRef           = useRef(null);
  const inputRef            = useRef(null);

  useEffect(() => { if (open) setPulse(false); }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text: msg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, {
        role: "bot",
        text: getBotReply(msg),
      }]);
    }, 1100 + Math.random() * 600);
  };

  return (
    <>
      {/* ── CHAT WINDOW ── */}
      <div style={{
        position: "fixed", bottom: 92, right: 24, zIndex: 200,
        width: "min(380px, calc(100vw - 48px))",
        background: C.cream,
        border: `1.5px solid ${C.creamDark}`,
        borderRadius: 26,
        boxShadow: open
          ? "0 32px 80px rgba(13,51,32,0.22), 0 0 0 1px rgba(200,236,56,0.12)"
          : "none",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        maxHeight: open ? 520 : 0,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "max-height 0.38s cubic-bezier(.4,0,.2,1), opacity 0.28s ease, box-shadow 0.28s ease",
      }}>

        {/* Header */}
        <div style={{
          background: C.deep,
          padding: "18px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
              background: "rgba(200,236,56,0.12)",
              border: "1.5px solid rgba(200,236,56,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IcoBot />
            </div>
            <div>
              <p style={{ fontFamily: C.font, fontSize: "0.88rem", fontWeight: 800, color: C.white, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                HSO Assistant
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.lime, boxShadow: `0 0 6px ${C.lime}` }} />
                <span style={{ fontFamily: C.font, fontSize: "0.64rem", color: "rgba(200,236,56,0.6)", fontWeight: 600 }}>
                  Online · Baguio City HSO
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.5)",
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            <IcoClose />
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px 16px 8px",
          display: "flex", flexDirection: "column", gap: 10,
          scrollbarWidth: "none",
        }}>
          {messages.map((m, i) => (
            <ChatBubble key={i} msg={m} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {messages.length <= 1 && (
          <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 7 }}>
            {QUICK_REPLIES.map(q => (
              <button key={q} onClick={() => sendMessage(q)}
                style={{
                  padding: "7px 13px", borderRadius: 100,
                  background: C.white, border: `1.5px solid ${C.creamDark}`,
                  fontFamily: C.font, fontSize: "0.72rem", fontWeight: 600, color: C.forest,
                  cursor: "pointer", transition: "all 0.18s ease",
                  lineHeight: 1.3,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.forest; e.currentTarget.style.color = C.lime; e.currentTarget.style.borderColor = C.forest; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.forest; e.currentTarget.style.borderColor = C.creamDark; }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 14px 16px", borderTop: `1px solid ${C.creamDark}`, flexShrink: 0,
          display: "flex", gap: 9, alignItems: "flex-end",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
            placeholder="Type a message…"
            style={{
              flex: 1, border: `1.5px solid ${C.creamDark}`, borderRadius: 14,
              padding: "10px 14px", background: C.white,
              fontFamily: C.font, fontSize: "0.84rem", color: C.ink,
              outline: "none", resize: "none",
              transition: "border-color 0.18s",
            }}
            onFocus={e => { e.target.style.borderColor = C.forest; }}
            onBlur={e => { e.target.style.borderColor = C.creamDark; }}
          />
          <SendBtn onClick={() => sendMessage()} disabled={!input.trim()} />
        </div>
      </div>

      {/* ── FAB BUTTON ── */}
      <FabButton open={open} pulse={pulse} onClick={() => setOpen(o => !o)} />
    </>
  );
}

/* ── Chat bubble ── */
function ChatBubble({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <div style={{
      display: "flex", alignItems: "flex-end", gap: 8,
      flexDirection: isBot ? "row" : "row-reverse",
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
        background: isBot ? C.deep : C.forest,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 2,
      }}>
        {isBot ? <IcoBot /> : <IcoUser />}
      </div>

      <div style={{
        maxWidth: "76%",
        background: isBot ? C.white : C.forest,
        color: isBot ? C.ink : C.white,
        border: isBot ? `1.5px solid ${C.creamDark}` : "none",
        borderRadius: isBot ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
        padding: "10px 14px",
        fontFamily: C.font, fontSize: "0.84rem", lineHeight: 1.6,
        boxShadow: isBot ? "0 2px 8px rgba(13,51,32,0.06)" : "0 2px 12px rgba(13,51,32,0.16)",
      }}>
        {msg.text}
      </div>
    </div>
  );
}

/* ── Typing indicator ── */
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.deep, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <IcoBot />
      </div>
      <div style={{
        background: C.white, border: `1.5px solid ${C.creamDark}`,
        borderRadius: "18px 18px 18px 4px",
        padding: "12px 16px", display: "flex", gap: 5, alignItems: "center",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 6, height: 6, borderRadius: "50%", background: C.inkMid,
            animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
        <style>{`@keyframes typingDot { 0%,80%,100%{opacity:.25;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }`}</style>
      </div>
    </div>
  );
}

/* ── Send button ── */
function SendBtn({ onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: 13, flexShrink: 0,
        background: disabled ? C.creamDark : hov ? C.mid : C.forest,
        border: "none", cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: disabled ? C.inkMid : C.lime,
        transition: "all 0.18s ease",
        transform: (!disabled && hov) ? "scale(1.06)" : "scale(1)",
      }}
    >
      <IcoSend />
    </button>
  );
}

/* ── FAB button ── */
function FabButton({ open, pulse, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 201,
        width: 56, height: 56, borderRadius: "50%",
        background: open ? C.forest : C.lime,
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov
          ? "0 12px 32px rgba(13,51,32,0.3), 0 0 0 4px rgba(200,236,56,0.18)"
          : "0 6px 20px rgba(13,51,32,0.2)",
        transform: hov ? "scale(1.08)" : "scale(1)",
        transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)",
      }}
    >
      {pulse && !open && (
        <span style={{
          position: "absolute", inset: -6, borderRadius: "50%",
          border: `2px solid ${C.lime}`,
          animation: "fabPulse 2s ease-out infinite",
          opacity: 0,
        }} />
      )}
      <style>{`@keyframes fabPulse { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(1.6);opacity:0} }`}</style>

      {open ? <IcoClose /> : <IcoChatBubble />}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   BOT REPLY LOGIC — expanded with HIV, HSV, Syphilis, HPV
══════════════════════════════════════════════════════════ */
function getBotReply(msg) {
  const m = msg.toLowerCase();

  /* ── LOCATION / CENTER ── */
  if (m.includes("nearest") || m.includes("center") || (m.includes("where") && m.includes("go")) || m.includes("location") || m.includes("address"))
    return "You can find your nearest health center in the Contact section of this page. We have 17 centers across Baguio City, all open Mon–Fri, 8am–5pm. You can also call us at 0985-251-5968 for directions to the closest one.";

  /* ── SERVICES ── */
  if (m.includes("service") || m.includes("offer") || m.includes("available") || m.includes("provide"))
    return "Our centers offer: HIV Testing & Counseling, STI Screening & Treatment (Herpes, Syphilis, HPV, Chlamydia, Gonorrhea), Maternal & Child Care, Immunization, TB DOTS, Dental, Nutrition, Family Planning, Mental Health services, and General Checkups — all free of charge.";

  /* ── HIV TESTING ── */
  if ((m.includes("hiv") && (m.includes("test") || m.includes("check") || m.includes("screen"))) || m.includes("get tested for hiv"))
    return "HIV testing is available at all 17 of our health centers — no appointment needed. Just walk in during office hours (Mon–Fri, 8am–5pm). Testing is completely free, fast, and confidential. You'll receive counseling before and after the test.";

  /* ── HIV GENERAL ── */
  if (m.includes("hiv") || m.includes("human immunodeficiency"))
    return "HIV (Human Immunodeficiency Virus) attacks the body's immune system. It is transmitted through unprotected sex, sharing needles, or from mother to child during birth/breastfeeding. With early antiretroviral therapy (ART), people with HIV can live long, healthy lives. Early symptoms include fever, fatigue, night sweats, and swollen lymph nodes. Get tested — early detection saves lives.";

  /* ── AIDS ── */
  if (m.includes("aids") || m.includes("acquired immune"))
    return "AIDS (Acquired Immunodeficiency Syndrome) is the late stage of HIV infection when the immune system is severely damaged. It can be prevented by starting HIV treatment early. With proper antiretroviral therapy (ART), most people with HIV never develop AIDS. If you're concerned, visit any of our 17 health centers for a free and confidential HIV test.";

  /* ── HERPES / HSV ── */
  if (m.includes("herpes") || m.includes("hsv") || m.includes("cold sore") || m.includes("blister"))
    return "Herpes (HSV) is a common viral infection. HSV-1 usually causes oral herpes (cold sores), while HSV-2 causes genital herpes. Symptoms include painful blisters, itching, and burning sensations. While there is no cure, antiviral medications (like acyclovir) can reduce outbreak frequency and severity. Many people with herpes live normal lives. Visit our health centers for testing and treatment guidance.";

  /* ── SYPHILIS ── */
  if (m.includes("syphilis") || m.includes("chancre") || m.includes("treponema"))
    return "Syphilis is a bacterial STI that progresses in stages. Stage 1: a painless sore (chancre) at the infection site. Stage 2: rash, fever, sore throat, and muscle aches. Stage 3 (tertiary): can damage the heart, brain, and other organs if untreated. The good news — syphilis is easily cured with antibiotics (usually penicillin) when caught early. Free testing is available at all our health centers.";

  /* ── HPV ── */
  if (m.includes("hpv") || m.includes("papillomavirus") || m.includes("genital wart") || m.includes("cervical cancer"))
    return "HPV (Human Papillomavirus) is the most common STI worldwide. Most infections clear on their own. However, high-risk HPV strains can cause cervical, penile, vulvar, anal, and throat cancers, as well as genital warts. Prevention: the HPV vaccine is highly effective and recommended for ages 9–26. Regular Pap smears also help detect cervical changes early. Ask our health centers about HPV screening and vaccination.";

  /* ── HPV VACCINE ── */
  if (m.includes("vaccine") || m.includes("vaccination") || m.includes("immuniz"))
    return "Vaccines are one of the best STI prevention tools. The HPV vaccine protects against the strains that cause most cervical cancers and genital warts. It's recommended for ages 9–26 and is most effective before sexual activity begins. Visit any Baguio City HSO health center to ask about available vaccines and immunization schedules.";

  /* ── CHLAMYDIA ── */
  if (m.includes("chlamydia"))
    return "Chlamydia is one of the most common bacterial STIs. It often has no symptoms, which is why regular testing is so important. When symptoms do appear, they include unusual discharge, burning urination, and pelvic pain. It is easily cured with antibiotics. Untreated chlamydia can lead to pelvic inflammatory disease (PID) and fertility issues. Free screening is available at our health centers.";

  /* ── GONORRHEA ── */
  if (m.includes("gonorrhea") || m.includes("gonorrhoea") || m.includes("clap"))
    return "Gonorrhea is a bacterial STI that affects the genitals, rectum, and throat. Symptoms include yellow/green discharge and painful urination, but it can also be asymptomatic. It is treatable with antibiotics, though antibiotic-resistant strains are increasing — making early treatment more important than ever. Visit our health centers for free testing and treatment.";

  /* ── STI GENERAL ── */
  if (m.includes("sti") || m.includes("std") || m.includes("sexually transmitted") || m.includes("infection"))
    return "STIs (Sexually Transmitted Infections) include HIV, Herpes (HSV), Syphilis, HPV, Chlamydia, Gonorrhea, and others. Many have no obvious symptoms, so regular testing is the only way to know your status. Most bacterial STIs are curable with antibiotics, and viral STIs can be managed with medication. All STI screening at Baguio City HSO health centers is free and confidential.";

  /* ── SYMPTOMS ── */
  if (m.includes("symptom") || m.includes("sign") || m.includes("how do i know") || m.includes("how will i know"))
    return "STI symptoms vary by infection. Common warning signs include: unusual discharge, sores or blisters on or around the genitals, burning or painful urination, rashes on the skin or palms, unexplained fever or fatigue, and swollen lymph nodes. However, many STIs — including HIV, Chlamydia, and HPV — often show no symptoms at all. Regular testing is the only reliable way to know your status.";

  /* ── PREVENTION ── */
  if (m.includes("prevent") || m.includes("protect") || m.includes("safe sex") || m.includes("condom"))
    return "Key STI prevention steps: (1) Use condoms consistently and correctly. (2) Get vaccinated for HPV and Hepatitis B. (3) Get tested regularly, especially with new or multiple partners. (4) Consider PrEP if you are at high risk for HIV. (5) Limit number of sexual partners. (6) Communicate openly with partners about STI status. Our health centers offer free counseling on all of these.";

  /* ── PREP ── */
  if (m.includes("prep") || m.includes("pre-exposure") || m.includes("prevent hiv"))
    return "PrEP (Pre-Exposure Prophylaxis) is a daily medication for HIV-negative people at high risk of HIV. When taken consistently, PrEP reduces the risk of getting HIV from sex by about 99%. It is available through our health centers. Visit us for a consultation to find out if PrEP is right for you — it's free and confidential.";

  /* ── PEP ── */
  if (m.includes("pep") || m.includes("post-exposure") || m.includes("after exposure"))
    return "PEP (Post-Exposure Prophylaxis) is an emergency HIV prevention medication taken within 72 hours after a possible HIV exposure. It must be started as soon as possible — the sooner, the more effective. PEP is taken daily for 28 days. If you think you've been exposed to HIV, go to a health center immediately or call 0985-251-5968.";

  /* ── TREATMENT ── */
  if (m.includes("treatment") || m.includes("medicine") || m.includes("cure") || m.includes("antibiotic") || m.includes("antiviral"))
    return "Treatment depends on the type of STI. Bacterial STIs (Syphilis, Chlamydia, Gonorrhea) are curable with antibiotics. Viral STIs (HIV, Herpes, HPV) have no cure, but antiretroviral therapy (ART) for HIV and antivirals for Herpes effectively manage the infection. HPV often clears on its own; vaccines prevent the most dangerous strains. All treatments at Baguio City HSO health centers are free.";

  /* ── CONFIDENTIAL / PRIVACY ── */
  if (m.includes("confidential") || m.includes("privacy") || m.includes("private") || m.includes("secret") || m.includes("no one will know"))
    return "Absolutely. All services at Baguio City HSO — including HIV and STI testing, counseling, and treatment — are 100% confidential. No information is shared with anyone without your explicit consent. You can seek care without fear of judgment or disclosure.";

  /* ── FREE / COST ── */
  if (m.includes("free") || m.includes("cost") || m.includes("pay") || m.includes("fee") || m.includes("charge"))
    return "Yes — all consultations, tests, counseling, and treatments at our health centers are completely free of charge for all Baguio City residents. This includes HIV testing, STI screening, PrEP consultations, and more.";

  /* ── HOURS ── */
  if (m.includes("hour") || m.includes("open") || m.includes("time") || m.includes("schedule") || m.includes("when"))
    return "All Baguio City HSO health centers are open Monday to Friday, 8:00 AM – 5:00 PM. They are closed on weekends and public holidays. No appointment is needed for most services — just walk in!";

  /* ── HOTLINE / EMERGENCY ── */
  if (m.includes("hotline") || m.includes("emergency") || m.includes("phone") || m.includes("contact") || m.includes("call") || m.includes("number"))
    return "You can reach Baguio City HSO at: 📞 0985-251-5968 or 442-9800. For after-hours emergencies, please go to the nearest hospital emergency room. Our health centers handle walk-ins during office hours (Mon–Fri, 8am–5pm).";

  /* ── PARTNER NOTIFICATION ── */
  if (m.includes("partner") || m.includes("tell my") || m.includes("notify") || m.includes("inform"))
    return "If you test positive for an STI, it is important to inform your sexual partner(s) so they can also get tested and treated. Our health counselors can help you with partner notification — they can guide you on how to have that conversation, or in some cases, notify partners on your behalf confidentially. You are not alone in this process.";

  /* ── STIGMA / SHAME ── */
  if (m.includes("ashamed") || m.includes("embarrass") || m.includes("stigma") || m.includes("shame") || m.includes("judg") || m.includes("scared"))
    return "We completely understand — seeking help about STIs can feel daunting. But please know: STIs are medical conditions, just like any other illness. There is no shame in getting tested or treated. Our health staff are trained to provide care without judgment. Your health matters, and getting tested is an act of courage and responsibility.";

  /* ── PREGNANCY / MOTHER TO CHILD ── */
  if (m.includes("pregnant") || m.includes("pregnancy") || m.includes("baby") || m.includes("mother") || m.includes("maternal"))
    return "Pregnant women with STIs such as HIV, Syphilis, or Herpes can pass the infection to their baby during pregnancy, birth, or breastfeeding. However, with proper prenatal care and treatment, mother-to-child transmission can be greatly reduced or even prevented. Please visit one of our health centers as early as possible for maternal STI screening and care.";

  /* ── DEFAULT ── */
  return "I'm here to help! You can ask me about HIV, Herpes (HSV), Syphilis, HPV, Chlamydia, Gonorrhea, STI symptoms, prevention, treatment, PrEP/PEP, or how to find a Baguio City HSO health center near you.";
}