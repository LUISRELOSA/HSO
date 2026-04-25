import React, { useState } from "react";

const C = {
  cream:     "#f5f4ee",
  creamDark: "#ede9de",
  creamMid:  "#dedad0",
  forest:    "#175330",
  deep:      "#0d3320",
  mid:       "#1e6840",
  lime:      "#C8EC38",
  white:     "#ffffff",
  ink:       "#0d1f14",
  inkMid:    "rgba(13,31,20,0.52)",
  inkFaint:  "rgba(13,31,20,0.22)",
  border:    "rgba(13,31,20,0.10)",
  font:      "var(--font)",
};

const healthCenters = [
  { name: "Aurora Hill District Health Center",       address: "#01 Malvar St. Aurora Hill Proper, Baguio",       phone: "0916 643 0156",   services: ["HIV Testing","STI Treatment","Immunization"],         facebook: "https://www.facebook.com/aurora.hill.hc.baguio",                  doctor: "Dr. Marie Therese B. Sumbillo", team: "2 Nurses · 2 Midwives"  },
  { name: "Atab District Health Center",              address: "Sto. Tomas Road Dontogan, Baguio",                 phone: "(074) 420 9087",   services: ["General Checkup","Maternal Care","HIV Testing"],       facebook: "https://www.facebook.com/profile.php?id=100068242016400",          doctor: "Dr. Karla C. Tabin",           team: "2 Nurses · 2 Midwives"  },
  { name: "Asin District Health Center",              address: "Pacday Quinio Drive, Km. 4, Asin Road",            phone: "620-4798",         services: ["STI Screening","Family Planning","Vaccination"],       facebook: "https://www.facebook.com/share/g/16gzomGQv6/",                     doctor: "Dr. Bong Lagman",              team: "1 Nurse · 1 Midwife"    },
  { name: "Atok Trail District Health Center",        address: "#01 Atok Trail Barangay, Baguio",                  phone: "620-5395",         services: ["HIV Counseling","TB DOTS","Prenatal Care"],            facebook: "https://www.facebook.com/share/1EfU6Cwe3y/",                       doctor: "Dr. Kea Ville B. Malucon",     team: "1 Nurse · 3 Midwives"   },
  { name: "Baguio HSO Mental Health & Wellness",      address: "2nd Floor HSO Annex, T. Alonzo, Baguio",           phone: "069 6361 · 911",   services: ["HIV Testing","STI Treatment","Mental Health"],         facebook: "https://www.facebook.com/profile.php?id=100085709652367",          doctor: "Mental Health Team",           team: "Specialized Unit"        },
  { name: "Campo Filipino District Health Center",    address: "Dangwa Street Cresencia Village, Baguio",          phone: "(074) 442 0031",   services: ["STI Screening","Immunization","Dental"],               facebook: "https://www.facebook.com/share/1Hb6vTg1LT/",                       doctor: "Dr. Grace Angelica Tolito",    team: "1 Nurse · 1 Midwife"    },
  { name: "City Camp District Health Center",         address: "City Camp Central Barangay Hall, Baguio",          phone: "665-2902",         services: ["HIV Testing","Family Planning","Nutrition"],           facebook: "https://www.facebook.com/profile.php?id=61563642178528",           doctor: "Dr. Nelson E. Hora",           team: "2 Nurses · 3 Midwives"  },
  { name: "Engineers Hill District Health Center",    address: "Manalo Alley Purok 2 Engineers Hill, Baguio",      phone: "(074) 442 0100",   services: ["Maternal Care","STI Treatment","Immunization"],        facebook: "https://www.facebook.com/share/1BnXDKPR64/",                       doctor: "Dr. Helen C. Colewan",         team: "2 Nurses · 3 Midwives"  },
  { name: "Irisan District Health Center",            address: "Purok 12, Irisan, Baguio",                         phone: "442-0102",         services: ["General Checkup","HIV Testing","Dental"],              facebook: "https://www.facebook.com/irisanhealthcenterofficial",              doctor: "Dr. Vanessa Fagcangan",        team: "2 Nurses · 5 Midwives"  },
  { name: "Lucban District Health Center",            address: "T. Alonzo St., Baguio",                            phone: "309-65-05",        services: ["HIV Counseling","TB DOTS","Child Health"],             facebook: "https://www.facebook.com/profile.php?id=100078508489278",          doctor: "Dr. Deansy Licawen",           team: "2 Nurses · 3 Midwives"  },
  { name: "Loakan District Health Center",            address: "#37 Purok Bubon, Loakan Proper, Baguio",           phone: "(074) 665 8761",   services: ["HIV Testing","Maternal Care","Nutrition"],             facebook: "https://www.facebook.com/profile.php?id=100083641591485",          doctor: "Dr. Thelma Matbagan",          team: "1 Nurse · 1 Midwife"    },
  { name: "Mines View District Health Center",        address: "Corner Torres St. Mines View, Baguio",             phone: "665-8702",         services: ["STI Treatment","TB DOTS","Child Health"],              facebook: "https://www.facebook.com/profile.php?id=100063803244852",          doctor: "Dr. Natazha Franco",           team: "1 Nurse · 1 Midwife"    },
  { name: "Pacdal District Health Center",            address: "Siapno Road, Pacdal, Baguio",                      phone: "665-8104",         services: ["HIV Counseling","Immunization","Dental"],              facebook: "https://www.facebook.com/PacdalHC",                                doctor: "Dr. Edna A. Tabo-oy",          team: "1 Nurse · 2 Midwives"   },
  { name: "Pinsao District Health Center",            address: "Purok 6, Pinsao Pilot Project, Baguio",            phone: "665-7806",         services: ["General Checkup","STI Screening","Family Planning"],  facebook: "https://www.facebook.com/pinsaohealthcenter",                      doctor: "Dr. Elivira D. Belingon",      team: "1 Nurse · 2 Midwives"   },
  { name: "Quezon Hill District Health Center",       address: "Mallare Street, Quezon Hill, Baguio",              phone: "620-5469",         services: ["HIV Testing","Maternal Care","Nutrition"],             facebook: "https://www.facebook.com/profile.php?id=100063919455522",          doctor: "Dr. Ana Marie R. Banta",       team: "1 Nurse · 1 Midwife"    },
  { name: "Quirino Hill District Health Center",      address: "126 Block 3, Middle Quirino Hill, Baguio",         phone: "620-5338",         services: ["General Checkup","STI Screening","Family Planning"],  facebook: "https://www.facebook.com/quirinohilldistricthealthcenter",         doctor: "Dr. Maria Alice P. Torres",    team: "1 Nurse · 1 Midwife"    },
  { name: "Scout Barrio District Health Center",      address: "Purok 5, Scout Barrio, Baguio",                    phone: "(074) 422-4512",   services: ["General Checkup","STI Screening","Family Planning"],  facebook: "https://www.facebook.com/profile.php?id=61553144109616",           doctor: "Dr. Aliza Castro",             team: "1 Nurse · 1 Midwife"    },
];

/* ── SVG icons ── */
const IcoShield = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M11 2L4 5v6c0 4.42 2.98 8.56 7 9.93C15.02 19.56 18 15.42 18 11V5L11 2z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M8 11l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoCross = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <rect x="9" y="3" width="4" height="16" rx="2" fill={color}/>
    <rect x="3" y="9" width="16" height="4" rx="2" fill={color}/>
  </svg>
);
const IcoDoor = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <rect x="4" y="3" width="14" height="17" rx="2" stroke={color} strokeWidth="1.6"/>
    <circle cx="14.5" cy="11.5" r="1" fill={color}/>
    <path d="M4 20h14" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IcoHeart = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M11 18S3 13 3 7.5A4.5 4.5 0 0111 5a4.5 4.5 0 018 2.5C19 13 11 18 11 18z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);
const IcoLeaf = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M18 3c0 0-1 9-7 12S3 19 3 19s1-9 7-12S18 3 18 3z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M3 19c2-2 4-5 8-8" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IcoStar = ({ size = 20, color }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M11 3l2.09 5.26L19 9.27l-4 3.9.94 5.51L11 16l-4.94 2.68.94-5.51-4-3.9 5.91-.01L11 3z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);
const IcoPin = ({ size = 14, color }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M7 8A2.5 2.5 0 107 3a2.5 2.5 0 000 5z" fill={color} opacity="0.4"/>
    <path d="M7 1C4.24 1 2 3.24 2 6c0 4 5 8 5 8s5-4 5-8c0-2.76-2.24-5-5-5z" stroke={color} strokeWidth="1.2" fill="none"/>
  </svg>
);
const IcoPhone = ({ size = 14, color }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 2.5h2.2l1 2.5-.9.5A7.06 7.06 0 009 9l.5-.9 2.5 1V11.5C12 12.33 11.33 13 10.5 13 5.25 13 1 8.75 1 3.5 1 2.67 1.67 2 2.5 2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IcoExternal = ({ size = 11, color }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 10L10 2M10 2H6M10 2V6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoTeam = ({ size = 13, color }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <circle cx="5.5" cy="4.5" r="2" stroke={color} strokeWidth="1.1"/>
    <path d="M1.5 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <circle cx="10.5" cy="5" r="1.5" stroke={color} strokeWidth="1.1" opacity="0.45"/>
    <path d="M10.5 8c1.1 0 2 .9 2 2v.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
  </svg>
);

/* ── Service pill — neutral, no color accent ── */
function SvcPill({ label }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "5px 13px",
      borderRadius: 100,
      fontFamily: C.font,
      fontSize: "0.74rem",
      fontWeight: 600,
      letterSpacing: "0.01em",
      background: "rgba(13,31,20,0.06)",
      color: C.inkMid,
      border: `1px solid rgba(13,31,20,0.10)`,
    }}>
      {label}
    </span>
  );
}

/* ── Facebook button ── */
function FbBtn({ href }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 18px",
        borderRadius: 100,
        background: hov ? C.mid : C.forest,
        color: C.lime,
        fontFamily: C.font,
        fontSize: "0.78rem",
        fontWeight: 700,
        textDecoration: "none",
        flexShrink: 0,
        transition: "background 0.18s ease, transform 0.18s ease",
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      View Page <IcoExternal size={11} color={C.lime} />
    </a>
  );
}

/* ── Health card — clean, no color accent border ── */
function HealthCard({ c }) {
  const [hov, setHov] = useState(false);
  const initials = c.doctor === "Mental Health Team"
    ? "MH"
    : c.doctor.replace("Dr. ", "").split(" ").filter(Boolean).slice(-1)[0].slice(0, 2).toUpperCase();

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.white : C.cream,
        border: `1.5px solid ${hov ? C.creamMid : C.border}`,
        borderRadius: 24,
        overflow: "hidden",
        transition: "transform 0.26s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, background 0.18s, border-color 0.18s",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov
          ? "0 24px 52px rgba(13,51,32,0.11), 0 4px 12px rgba(13,51,32,0.06)"
          : "0 1px 6px rgba(13,51,32,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>

        {/* Name */}
        <h3 style={{
          fontFamily: C.font,
          fontSize: "1.0rem",
          fontWeight: 800,
          color: C.ink,
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          margin: 0,
        }}>
          {c.name}
        </h3>

        {/* Address + Phone */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
            <span style={{ marginTop: 2, flexShrink: 0 }}>
              <IcoPin size={14} color={C.inkMid} />
            </span>
            <span style={{ fontFamily: C.font, fontSize: "0.81rem", color: C.inkMid, lineHeight: 1.55 }}>
              {c.address}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <IcoPhone size={14} color={C.forest} />
            <span style={{ fontFamily: C.font, fontSize: "0.81rem", fontWeight: 700, color: C.forest }}>
              {c.phone}
            </span>
          </div>
        </div>

        {/* Services */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {c.services.map(s => <SvcPill key={s} label={s} />)}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.border }} />

        {/* Doctor row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            {/* Avatar — flat, no gradient */}
            <div style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              flexShrink: 0,
              background: C.forest,
              border: `1.5px solid rgba(23,83,48,0.18)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.lime,
              fontFamily: C.font,
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.04em",
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{
                fontFamily: C.font,
                fontSize: "0.81rem",
                fontWeight: 700,
                color: C.ink,
                margin: "0 0 3px",
                letterSpacing: "-0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {c.doctor}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.inkMid }}>
                <IcoTeam size={13} color={C.inkMid} />
                <span style={{ fontFamily: C.font, fontSize: "0.71rem" }}>{c.team}</span>
              </div>
            </div>
          </div>
          <FbBtn href={c.facebook} />
        </div>

      </div>
    </div>
  );
}

/* ── Mission / Vision card — no radial glow ── */
function MVCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: hov ? C.deep : C.forest,
        borderRadius: 24,
        padding: "44px 40px 40px",
        transition: "background 0.26s ease, box-shadow 0.26s ease",
        boxShadow: hov
          ? "0 32px 64px rgba(13,51,32,0.38), 0 6px 18px rgba(13,51,32,0.2)"
          : "0 10px 32px rgba(13,51,32,0.22), 0 2px 8px rgba(13,51,32,0.12)",
      }}
    >
      {/* Label badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "rgba(200,236,56,0.1)",
        border: "1px solid rgba(200,236,56,0.2)",
        borderRadius: 100,
        padding: "6px 15px",
        marginBottom: 26,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.lime, display: "inline-block" }} />
        <span style={{
          fontFamily: C.font,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.lime,
        }}>
          {item.label}
        </span>
      </div>

      <p style={{
        fontFamily: C.font,
        fontSize: "clamp(1.3rem,2vw,1.75rem)",
        fontWeight: 800,
        color: C.cream,
        letterSpacing: "-0.03em",
        lineHeight: 1.24,
        margin: "0 0 18px",
      }}>
        {item.text}
      </p>

      <p style={{
        fontFamily: C.font,
        fontSize: "0.9rem",
        color: "rgba(245,244,238,0.78)",
        lineHeight: 1.74,
        margin: 0,
      }}>
        {item.sub}
      </p>

      {/* Bottom bar indicator */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 40,
        width: hov ? 60 : 24,
        height: 3,
        background: C.lime,
        borderRadius: "3px 3px 0 0",
        transition: "width 0.32s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

/* ── Commitment card — neutral icon bg ── */
function CommitCard({ Icon, title, body }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.white : C.cream,
        border: `1.5px solid ${hov ? C.creamMid : C.border}`,
        borderRadius: 20,
        padding: "26px 24px",
        transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease, background 0.18s, border-color 0.18s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 16px 40px rgba(13,51,32,0.09)" : "0 1px 6px rgba(13,51,32,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Icon container — neutral */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 14,
        background: "rgba(13,31,20,0.06)",
        border: `1px solid rgba(13,31,20,0.08)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={20} color={C.forest} />
      </div>

      <div>
        <p style={{
          fontFamily: C.font,
          fontSize: "0.93rem",
          fontWeight: 800,
          color: C.ink,
          margin: "0 0 6px",
          letterSpacing: "-0.015em",
        }}>
          {title}
        </p>
        <p style={{
          fontFamily: C.font,
          fontSize: "0.81rem",
          color: C.inkMid,
          lineHeight: 1.65,
          margin: 0,
        }}>
          {body}
        </p>
      </div>
    </div>
  );
}

/* ── Stat card — no accent dot ── */
function StatCard({ value, label, sub }) {
  return (
    <div style={{
      background: C.cream,
      border: `1.5px solid ${C.border}`,
      borderRadius: 20,
      padding: "28px 24px",
      boxShadow: "0 1px 6px rgba(13,51,32,0.04)",
    }}>
      <p style={{
        fontFamily: C.font,
        fontSize: "clamp(2.4rem,4vw,3rem)",
        fontWeight: 900,
        letterSpacing: "-0.065em",
        color: C.forest,
        lineHeight: 1,
        margin: "0 0 8px",
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: C.font,
        fontSize: "0.92rem",
        fontWeight: 700,
        color: C.ink,
        margin: "0 0 4px",
      }}>
        {label}
      </p>
      {sub && (
        <p style={{ fontFamily: C.font, fontSize: "0.77rem", color: C.inkMid, margin: 0 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Section label ── */
function SectionLabel({ eyebrow, title, light = false }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
        <div style={{ width: 18, height: 2, background: light ? C.lime : C.inkFaint, borderRadius: 2, flexShrink: 0 }} />
        <span style={{
          fontFamily: C.font,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: light ? C.lime : C.inkFaint,
        }}>
          {eyebrow}
        </span>
      </div>
      <h2 style={{
        fontFamily: C.font,
        fontSize: "clamp(1.9rem,3.5vw,2.7rem)",
        fontWeight: 900,
        letterSpacing: "-0.045em",
        lineHeight: 1,
        color: light ? C.cream : C.ink,
        margin: 0,
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ── Toggle button ── */
function ToggleBtn({ showAll, onToggle, total }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ textAlign: "center", marginTop: 44 }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 32px",
          borderRadius: 100,
          cursor: "pointer",
          fontFamily: C.font,
          fontSize: "0.84rem",
          fontWeight: 700,
          letterSpacing: "0.03em",
          background: hov ? C.forest : "transparent",
          color: hov ? C.lime : C.forest,
          border: `1.5px solid ${C.forest}`,
          transition: "background 0.18s ease, color 0.18s ease",
        }}
      >
        {showAll ? "Show less" : `View all ${total} centers`}
        <svg
          width="15" height="15" viewBox="0 0 16 16" fill="none"
          style={{ transition: "transform 0.28s ease", transform: showAll ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ═══════════════ MAIN PAGE ═══════════════ */
export default function About() {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE = 6;
  const visibleCenters = showAll ? healthCenters : healthCenters.slice(0, VISIBLE);

  return (
    <div style={{ fontFamily: C.font }}>
      <style>{`
        /* ── Hero ── */
        .ab-hero-wrap {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: end;
        }

        /* ── Stats ── */
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 64px;
        }

        /* ── Commitments ── */
        .ab-commit {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        /* ── Mission/Vision ── */
        .ab-mv {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* ── HC header + grid ── */
        .ab-hc-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .ab-hc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── Tablet ≤ 960px ── */
        @media (max-width: 960px) {
          .ab-hero-wrap {
            grid-template-columns: 1fr;
            gap: 28px;
            align-items: start;
          }
          .ab-hero-counter {
            align-self: flex-start;
          }
          .ab-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .ab-commit {
            grid-template-columns: repeat(2, 1fr);
          }
          .ab-hc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Mobile ≤ 600px ── */
        @media (max-width: 600px) {
          .ab-hero-wrap {
            gap: 24px;
          }
          .ab-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 48px;
          }
          .ab-commit {
            grid-template-columns: 1fr;
          }
          .ab-mv {
            grid-template-columns: 1fr;
          }
          .ab-hc-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .ab-hc-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ── Small mobile ≤ 420px ── */
        @media (max-width: 420px) {
          .ab-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── HERO ── deep green ── */}
      <div style={{ background: C.deep, paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(18px,4vw,56px)" }}>
          <div className="ab-hero-wrap">

            <div>
              {/* Eyebrow badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(200,236,56,0.10)",
                border: "1px solid rgba(200,236,56,0.22)",
                borderRadius: 100,
                padding: "7px 18px",
                marginBottom: 28,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: C.lime, display: "inline-block",
                  boxShadow: `0 0 8px ${C.lime}`,
                }} />
                <span style={{
                  fontFamily: C.font,
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.lime,
                }}>
                  Baguio City Health Services Office
                </span>
              </div>

              <h1 style={{
                fontFamily: C.font,
                fontSize: "clamp(2.8rem,8vw,4.2rem)",
                fontWeight: 900,
                color: C.cream,
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
                margin: "0 0 28px",
              }}>
                About Us
              </h1>

              <p style={{
                fontFamily: C.font,
                fontSize: "clamp(0.95rem,1.4vw,1.15rem)",
                color: "rgba(245,244,238,0.78)",
                lineHeight: 1.8,
                maxWidth: 500,
                margin: 0,
              }}>
                A city-wide network of dedicated health professionals serving every
                Baguio resident — free, confidential, and open to all.
              </p>
            </div>

            {/* Counter badge */}
            <div className="ab-hero-counter" style={{
              background: C.lime,
              borderRadius: 24,
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: C.font,
                fontSize: "4.2rem",
                fontWeight: 900,
                letterSpacing: "-0.07em",
                color: C.deep,
                lineHeight: 1,
              }}>
                {healthCenters.length}
              </span>
              <span style={{
                fontFamily: C.font,
                fontSize: "0.75rem",
                fontWeight: 700,
                color: C.deep,
                opacity: 0.55,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.45,
              }}>
                Health<br/>Centers
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── STATS + COMMITMENTS ── */}
      <div style={{ background: C.creamDark, paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(18px,4vw,56px)" }}>

          <div className="ab-stats">
            <StatCard value="17"      label="Health Centers"     sub="Across Baguio City"   />
            <StatCard value="Free"    label="All Consultations"  sub="No fees, ever"         />
            <StatCard value="Mon–Fri" label="Open Days"          sub="8:00 AM – 5:00 PM"    />
            <StatCard value="100+"    label="Barangays Served"   sub="City-wide coverage"    />
          </div>

          <SectionLabel eyebrow="Our Commitments" title="Care You Can Count On" />

          <div className="ab-commit">
            {[
              { Icon: IcoShield, title: "Fully Confidential",  body: "Your privacy is protected at every step. All services are discreet and non-judgmental." },
              { Icon: IcoCross,  title: "Completely Free",     body: "Every consultation, test, and treatment is provided free of charge for all residents." },
              { Icon: IcoDoor,   title: "Walk-In Friendly",    body: "No appointment needed. Our doors are open — just come as you are, any weekday." },
              { Icon: IcoHeart,  title: "Non-Judgmental",      body: "We welcome everyone regardless of background, status, or circumstance." },
              { Icon: IcoLeaf,   title: "Community-Rooted",    body: "Our staff live here, care here, and are invested in the health of every barangay." },
              { Icon: IcoStar,   title: "Universal Access",    body: "Quality health care is a right, not a privilege — and we make sure it stays that way." },
            ].map(v => <CommitCard key={v.title} {...v} />)}
          </div>

        </div>
      </div>

      {/* ── MISSION + VISION ── */}
      <div style={{ background: C.forest, paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(18px,4vw,56px)" }}>
          <SectionLabel eyebrow="Our Purpose" title="Why We Exist" light />
          <div className="ab-mv">
            {[
              {
                label: "Our Mission",
                text: "Breaking Barriers Towards Universal Care.",
                sub: "We serve every Baguio resident regardless of status, background, or circumstance — ensuring quality health care is never a privilege.",
              },
              {
                label: "Our Vision",
                text: "Quality Primary Health Care for All Amidst Changing Times.",
                sub: "Promoting wellbeing through accessible, responsive, and innovative health services that adapt and grow alongside our community.",
              },
            ].map(item => <MVCard key={item.label} item={item} />)}
          </div>
        </div>
      </div>

      {/* ── HEALTH CENTER GRID ── */}
      <div style={{ background: C.creamDark, paddingTop: 72, paddingBottom: 72 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(18px,4vw,56px)" }}>

          <div className="ab-hc-header">
            <SectionLabel eyebrow="City-Wide Network" title="District Health Centers" />
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: C.forest,
              borderRadius: 100,
              padding: "11px 22px",
              flexShrink: 0,
              marginBottom: 8,
            }}>
              <span style={{
                fontFamily: C.font,
                fontSize: "1.35rem",
                fontWeight: 900,
                color: C.lime,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}>
                {healthCenters.length}
              </span>
              <span style={{
                fontFamily: C.font,
                fontSize: "0.71rem",
                fontWeight: 600,
                color: C.lime,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}>
                Health Centers
              </span>
            </div>
          </div>

          <div className="ab-hc-grid">
            {visibleCenters.map(c => <HealthCard key={c.name} c={c} />)}
          </div>

          <ToggleBtn
            showAll={showAll}
            onToggle={() => setShowAll(prev => !prev)}
            total={healthCenters.length}
          />

        </div>
      </div>

    </div>
  );
}