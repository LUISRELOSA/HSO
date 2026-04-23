import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import FloatingChatBot from "./FloatingChatBot";
import AurorahillHC from './assets/AurorahillHC.jpg';
import AtabHC from './assets/AtabHC.jpg';
import AtokHC from './assets/AtokHC.jpg';
import AsinHC from './assets/AsinHC.png';
import CampoFilipinoHC from './assets/CampoFilipinoHC.jpg';
import CityCampHC from './assets/CityCampHC.jpg';
import EngineersHillHC from './assets/EngineersHillHC.jpg';
import HSO from './assets/HSO.jpg';
import IrisanHC from './assets/IrisanHC.jpg';
import LucbanHC from './assets/LucbanHC.jpg';
import LoakanHC from './assets/LoakanHC.jpg';
import MinesView from './assets/MinesView.png';
import PacdalHC from './assets/PacdalHC.jpg';
import PinsaoHC from './assets/PinsaoHC.jpg';
import QuezonHillHC from './assets/QuezonHillHC.jpg';
import QuirinoHillHC from './assets/QuirinoHillHC.jpg';
import ScoutBarrioHC from './assets/ScoutBarrioHC.jpg';

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

const defaultCenter = { lat: 16.413717857558595, lng: 120.59598703014733 };

const locations = [
  { name: "Aurora Hill District Health Center",      position: { lat: 16.424167803089063, lng: 120.59920394232935 }, description: "HIV Testing, STI Treatment, Immunization.",           image: AurorahillHC,   phone: "0916 643 0156",   travel: { walk: "30 mins",      moto: "6 mins",  car: "6 mins"  }, details: "Dr. Marie Therese B. Sumbillo · 2 Nurses · 2 Midwives\n9 Catchment Barangays: Ambiong, Aurora Hill Proper, Aurora Hill-North Central, Aurora Hill-South Central, Bayan Park East & West, Brookeside, Brookspoint, Lopez Jaena, Modern Site East & West, San Antonio Village" },
  { name: "Atab District Health Center",             position: { lat: 16.3885, lng: 120.5755 },                       description: "General Checkup, Maternal Care, HIV Testing.",        image: AtabHC,         phone: "(074) 420 9087",  travel: { walk: "1 hr 7 mins",  moto: "14 mins", car: "14 mins" }, details: "Dr. Karla C. Tabin · 2 Nurses · 2 Midwives\n7 Catchment Barangays: Bakakeng Central, Bakakeng Norte, Dontogan, Santo Rosario, Santo Tomas Proper, Santo Tomas School Area, SLU-SVP Housing Village" },
  { name: "Asin District Health Center",             position: { lat: 16.4046, lng: 120.5672 },                       description: "STI Screening, Family Planning, Vaccination.",        image: AsinHC,         phone: "620-4798",        travel: { walk: "1 hr 7 mins",  moto: "14 mins", car: "14 mins" }, details: "Dr. Bong Lagman · 1 Nurse · 1 Midwife\n3 Catchment Barangays: Asin Road, San Luis Village, San Roque Village" },
  { name: "Atok Trail District Health Center",       position: { lat: 16.380066067192747, lng: 120.63217829080976 },  description: "HIV Counseling, TB DOTS, Prenatal Care.",            image: AtokHC,         phone: "620-5395",        travel: { walk: "1.4 hrs",      moto: "18 mins", car: "19 mins" }, details: "Dr. Kea Ville B. Malucon · 1 Nurse · 3 Midwives\n4 Catchment Barangays: Atok Trail, Fort del Pilar, Kias, Apugan-Loakan" },
  { name: "Baguio HSO Mental Health & Wellness Unit",position: { lat: 16.42062025650955,  lng: 120.5968267028222 },   description: "HIV Testing, STI Treatment, Child Health, Mental Health.", image: HSO,        phone: "069 6361 · 911",  travel: { walk: "12 mins",      moto: "4 mins",  car: "5 mins"  }, details: "All offices open Monday to Friday, 8:00am – 5:00pm except on holidays." },
  { name: "Campo Filipino District Health Center",   position: { lat: 16.418641239365826, lng: 120.58809063011776 },  description: "STI Screening, Immunization, Dental.",               image: CampoFilipinoHC,phone: "(074) 442 0031",  travel: { walk: "22 mins",      moto: "7 mins",  car: "7 mins"  }, details: "Dr. Grace Angelica Tolito · 1 Nurse · 1 Midwife\n8 Catchment Barangays: Camp Allen, Campo Filipino, Cresencia Village, Guisad Surong, Andres Bonifacio, Market Subdivision, Padre Burgos, Padre Zamora" },
  { name: "City Camp District Health Center",        position: { lat: 16.41117461818585,  lng: 120.58901689856332 },  description: "HIV Testing, Family Planning, Nutrition.",           image: CityCampHC,     phone: "665-2902",        travel: { walk: "22 mins",      moto: "7 mins",  car: "7 mins"  }, details: "Dr. Nelson E. Hora · 2 Nurses · 3 Midwives\n14 Catchment Barangays: Balsigan, City Camp Central, City Camp Proper, Dominican Hill-Mirador, Ferdinand, GEFA, Imelda Marcos, Kayang Extension, Legarda-Burnham-Kisad, Lourdes Subdivision, MRR-Queen of Peace, Palma-Urbano, Quirino-Magsaysay, Rock Quarry" },
  { name: "Engineers Hill District Health Center",   position: { lat: 16.406840228059124, lng: 120.60292192129249 },  description: "Maternal Care, STI Treatment, Immunization.",        image: EngineersHillHC,phone: "(074) 442 0100",  travel: { walk: "21 mins",      moto: "6 mins",  car: "6 mins"  }, details: "Dr. Helen C. Colewan · 2 Nurses · 3 Midwives\n14 Catchment Barangays incl. Marcoville, BGH Compound, Cabinet Hill, Camp 8, Engineer's Hill, Greenwater Village, Military Cut-Off, Phil-Am, Salud Mitra, San Vicente" },
  { name: "Irisan District Health Center",           position: { lat: 16.418137241133625, lng: 120.55853947952804 },  description: "General Checkup, HIV Testing, Dental.",              image: IrisanHC,       phone: "442-0102",        travel: { walk: "1 hr 14 mins", moto: "18 mins", car: "19 mins" }, details: "Dr. Vanessa Fagcangan · 2 Nurses · 5 Midwives\n1 Catchment Barangay: All 28 Puroks of Irisan" },
  { name: "Loakan District Health Center",           position: { lat: 16.376848900483097, lng: 120.61461288322126 },  description: "HIV Testing, Maternal Care, Nutrition.",             image: LoakanHC,       phone: "(074) 665 8761",  travel: { walk: "1 hr 25 mins", moto: "16 mins", car: "19 mins" }, details: "Dr. Thelma Matbagan · 1 Nurse · 1 Midwife\n3 Catchment Barangays: Camp 7, Liwanag-Loakan, Loakan Proper" },
  { name: "Lucban District Health Center",           position: { lat: 16.42055520036126,  lng: 120.59702215069285 },  description: "HIV Counseling, TB DOTS, Child Health.",             image: LucbanHC,       phone: "309-65-05",       travel: { walk: "12 mins",      moto: "4 mins",  car: "5 mins"  }, details: "Dr. Deansy Licawen · 2 Nurses · 3 Midwives\n25 Catchment Barangays incl. ABCR, AZKCO, Alfonso Tabora, New Lucban, Session Road, Trancoville" },
  { name: "Mines View District Health Center",       position: { lat: 16.42172,           lng: 120.63009 },           description: "STI Treatment, TB DOTS, Child Health.",              image: MinesView,      phone: "665-8702",        travel: { walk: "1 hr 14 mins", moto: "13 mins", car: "13 mins" }, details: "Dr. Natazha Franco · 1 Nurse · 1 Midwife\n5 Catchment Barangays: Gibraltar, Lucnab, Mines View Park, Outlook Drive, Pucsusan" },
  { name: "Pacdal District Health Center",           position: { lat: 16.41976860537003,  lng: 120.61264979256788 },  description: "HIV Counseling, Immunization, Dental.",              image: PacdalHC,       phone: "665-8104",        travel: { walk: "51 mins",      moto: "10 mins", car: "12 mins" }, details: "Dr. Edna A. Tabo-oy · 1 Nurse · 2 Midwives\n5 Catchment Barangays: Country Club, Lualhati, Manuel A. Roxas, Saint Joseph Village, South Drive" },
  { name: "Pinsao District Health Center",           position: { lat: 16.42456845100626,  lng: 120.583344892568 },    description: "General Checkup, STI Screening, Family Planning.",  image: PinsaoHC,       phone: "665-7806",        travel: { walk: "37 mins",      moto: "8 mins",  car: "10 mins" }, details: "Dr. Elivira D. Belingon · 1 Nurse · 2 Midwives\n4 Catchment Barangays: Guisad Central, Pinget, Pinsao Pilot Project, Pinsao Proper" },
  { name: "Quezon Hill District Health Center",      position: { lat: 16.416558279182755, lng: 120.57618625069267 },  description: "HIV Testing, Maternal Care, Nutrition.",             image: QuezonHillHC,   phone: "620-5469",        travel: { walk: "41 mins",      moto: "12 mins", car: "12 mins" }, details: "Dr. Ana Marie R. Banta · 1 Nurse · 1 Midwife\n5 Catchment Barangays: Fairview, Middle Quezon Hill, Quezon Hill Proper, Upper Quezon Hill, Victoria Village" },
  { name: "Quirino Hill District Health Center",     position: { lat: 16.429142518433732, lng: 120.5916263641872 },   description: "General Checkup, STI Screening, Family Planning.",  image: QuirinoHillHC,  phone: "620-5338",        travel: { walk: "39 mins",      moto: "9 mins",  car: "10 mins" }, details: "Dr. Maria Alice P. Torres · 1 Nurse · 1 Midwife\n6 Catchment Barangays: Camdas Subdivision, Dizon Subdivision, East Quirino Hill, West Quirino Hill, Lower Quirino Hill, Upper Quirino Hill" },
  { name: "Scout Barrio District Health Center",     position: { lat: 16.396165525516484, lng: 120.60818192149273 },  description: "General Checkup, STI Screening, Family Planning.",  image: ScoutBarrioHC,  phone: "(074) 422-4512",  travel: { walk: "46 mins",      moto: "10 mins", car: "11 mins" }, details: "Dr. Aliza Castro · 1 Nurse · 1 Midwife\n6 Catchment Barangays: Lower Dagsian, Upper Dagsian, Gabriela Silang, Happy Hollow, Hillside, Scout Barrio" },
];

/* ── SVG Icons ── */
const IcoSearch = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IcoClose = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M2 2l7 7M9 2L2 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IcoArrowR = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoChevL = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M8.5 10.5L4.5 6.5l4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoPhone = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3.5 2.5h2.5l1.2 3-.9.6a8.08 8.08 0 004.6 4.6l.6-.9 3 1.2v2.5c0 .83-.67 1.5-1.5 1.5C6.05 15 1 9.95 1 4 1 3.17 1.67 2.5 2.5 2.5" stroke={C.forest} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IcoWalk = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="2.5" r="1.25" fill="currentColor"/>
    <path d="M5 5.5L7 4.5l2 1-1 3.5L9.5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 13l1.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IcoMoto = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="3" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="11" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5 9.5H8L9.5 6.5H12M5 9.5L7 6.5H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IcoCar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1.5" y="6" width="11" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M3 6L4.5 3h5L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="4" cy="11" r="1.25" fill="currentColor"/>
    <circle cx="10" cy="11" r="1.25" fill="currentColor"/>
  </svg>
);
const IcoMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill={C.forest}/>
    <path d="M10 1C6.134 1 3 4.134 3 8c0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7z" stroke={C.forest} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const travelIcons = { walk: IcoWalk, moto: IcoMoto, car: IcoCar };
const travelLabels = { walk: "Walking", moto: "Motorcycle", car: "By Car" };

/* ── Stat chip ── */
function StatChip({ value, label }) {
  return (
    <div style={{
      background: C.cream, border: `1.5px solid ${C.creamDark}`,
      borderRadius: 18, padding: "22px 22px",
      boxShadow: "0 2px 8px rgba(13,51,32,0.05)",
    }}>
      <p style={{ fontFamily: C.font, fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.055em", color: C.forest, lineHeight: 1, margin: "0 0 5px" }}>
        {value}
      </p>
      <span style={{ fontFamily: C.font, fontSize: "0.78rem", fontWeight: 600, color: C.inkMid, letterSpacing: "0.02em" }}>
        {label}
      </span>
    </div>
  );
}

export default function Contact() {
  const [active, setActive]     = useState(null);
  const [query, setQuery]       = useState("");
  const [submitted, setSubmit]  = useState("");
  const [filtered, setFiltered] = useState(locations);
  const [suggest, setSuggest]   = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const f = submitted.trim()
      ? locations.filter(l => l.name.toLowerCase().includes(submitted.toLowerCase()))
      : locations;
    setFiltered(f);
    if (f.length && mapRef.current) { mapRef.current.panTo(f[0].position); mapRef.current.setZoom(15); }
  }, [submitted]);

  return (
    <div style={{ fontFamily: C.font }}>

      {/* ── HERO  (deep green) ── */}
      <div style={{ background: C.deep, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,3vw,56px)" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
            <div style={{ width: 18, height: 2, background: C.lime, borderRadius: 2 }} />
            <span style={{ fontFamily: C.font, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8EC38" }}>
              Baguio City Health Services Office
            </span>
          </div>

          <h1 style={{
            fontFamily: C.font, fontSize: "clamp(4rem,8vw,4rem)",
            fontWeight: 900, color: C.cream, letterSpacing: "-0.065em",
            lineHeight: 0.88, margin: "0 0 28px",
          }}>
            Find a Health Center
          </h1>

          <p style={{ fontFamily: C.font, fontSize: "clamp(0.95rem,1.3vw,1.1rem)", color: "#f5f4ee", lineHeight: 1.78, maxWidth: 520, margin: 0 }}>
            17 district health centers across Baguio City, open Monday to Friday. All services are free.
          </p>
        </div>
      </div>

      {/* ── STATS + MAP ── (cream) ── */}
      <div style={{ background: C.creamDark, paddingTop: 72, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,3vw,56px)" }}>

          {/* Stat row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 36 }}>
            <StatChip value="17" label="Health Centers" />
            <StatChip value="Mon–Fri" label="Open Days" />
            <StatChip value="8am–5pm" label="Office Hours" />
            <StatChip value="Free" label="All Consultations" />
          </div>

          {/* Map bento */}
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16, marginBottom: 16 }}>

            {/* SIDEBAR */}
            <div style={{
              background: C.white, border: `1.5px solid ${C.creamDark}`,
              borderRadius: 24, overflow: "hidden",
              maxHeight: 528, display: "flex", flexDirection: "column",
              boxShadow: "0 2px 10px rgba(13,51,32,0.06)",
            }}>
              {active ? (
                <>
                  {/* Image */}
                  <div style={{ position: "relative", height: 158, overflow: "hidden", flexShrink: 0 }}>
                    <img src={active.image} alt={active.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,51,32,0.88) 0%, transparent 55%)" }} />
                    <button
                      onClick={() => setActive(null)}
                      style={{
                        position: "absolute", top: 12, left: 12,
                        background: "rgba(245,244,238,0.92)", backdropFilter: "blur(6px)",
                        border: "none", borderRadius: 100, padding: "5px 11px",
                        display: "flex", alignItems: "center", gap: 5,
                        cursor: "pointer", color: C.forest, transition: "all 0.18s",
                        fontFamily: C.font, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.05em",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = C.lime}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(245,244,238,0.92)"}
                    >
                      <IcoChevL /> Back
                    </button>
                    <p style={{
                      position: "absolute", bottom: 13, left: 14, right: 14,
                      fontFamily: C.font, fontSize: "0.9rem", fontWeight: 800,
                      color: C.white, margin: 0, lineHeight: 1.25, letterSpacing: "-0.015em",
                    }}>
                      {active.name}
                    </p>
                  </div>

                  {/* Details */}
                  <div style={{ overflowY: "auto", padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 14, scrollbarWidth: "none" }}>
                    <p style={{ fontFamily: C.font, fontSize: "0.8rem", color: C.inkMid, lineHeight: 1.6, margin: 0 }}>
                      {active.description}
                    </p>

                    {/* Phone */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(23,83,48,0.07)", borderRadius: 12, padding: "10px 14px" }}>
                      <IcoPhone />
                      <span style={{ fontFamily: C.font, fontSize: "0.82rem", fontWeight: 700, color: C.forest }}>
                        {active.phone}
                      </span>
                    </div>

                    {/* Travel times */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                        <div style={{ width: 14, height: 1.5, background: C.inkFaint, borderRadius: 2 }} />
                        <span style={{ fontFamily: C.font, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.inkFaint }}>
                          Travel Time
                        </span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        {Object.entries(active.travel).map(([k, v]) => {
                          const Icon = travelIcons[k];
                          return (
                            <div key={k} style={{
                              display: "flex", justifyContent: "space-between", alignItems: "center",
                              padding: "8px 13px", background: C.creamDark, borderRadius: 10,
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 7, color: C.inkMid }}>
                                <Icon />
                                <span style={{ fontFamily: C.font, fontSize: "0.74rem", color: C.inkMid }}>{travelLabels[k]}</span>
                              </div>
                              <span style={{ fontFamily: C.font, fontSize: "0.78rem", fontWeight: 700, color: C.forest }}>{v}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Details text */}
                    <div style={{ background: "rgba(23,83,48,0.06)", border: "1px solid rgba(23,83,48,0.1)", borderRadius: 12, padding: "12px 14px" }}>
                      <p style={{ fontFamily: C.font, fontSize: "0.74rem", color: C.forest, lineHeight: 1.68, margin: 0, whiteSpace: "pre-line" }}>
                        {active.details}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ padding: "44px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: 16 }}>
                  <div style={{
                    width: 52, height: 52,
                    background: "rgba(23,83,48,0.08)", border: "1.5px solid rgba(23,83,48,0.12)",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IcoMapPin />
                  </div>
                  <div>
                    <p style={{ fontFamily: C.font, fontSize: "0.95rem", fontWeight: 800, color: C.ink, margin: "0 0 6px", letterSpacing: "-0.015em" }}>
                      Select a health center
                    </p>
                    <p style={{ fontFamily: C.font, fontSize: "0.78rem", color: C.inkMid, margin: 0, lineHeight: 1.6 }}>
                      Click any pin on the map to view details, services, and travel times.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* MAP */}
            <div style={{
              background: C.white, border: `1.5px solid ${C.creamDark}`,
              borderRadius: 24, overflow: "hidden",
              boxShadow: "0 2px 10px rgba(13,51,32,0.06)",
            }}>
              {/* Search */}
              <div style={{ padding: "13px 16px", background: C.cream, borderBottom: `1px solid ${C.creamDark}` }}>
                <div style={{ position: "relative" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: C.white, border: `1.5px solid ${C.creamDark}`,
                    borderRadius: 100, padding: "9px 16px",
                    transition: "border-color 0.18s",
                  }}>
                    <span style={{ color: C.inkMid }}><IcoSearch /></span>
                    <input
                      type="text"
                      placeholder="Search health center…"
                      value={query}
                      onChange={e => {
                        setQuery(e.target.value);
                        setSuggest(e.target.value.trim()
                          ? locations.filter(l => l.name.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5)
                          : []);
                      }}
                      onFocus={e => e.target.parentElement.style.borderColor = C.forest}
                      onBlur={e => e.target.parentElement.style.borderColor = C.creamDark}
                      onKeyDown={e => { if (e.key === "Enter") { setSubmit(query); setSuggest([]); }}}
                      style={{
                        flex: 1, border: "none", background: "transparent", outline: "none",
                        fontFamily: C.font, fontSize: "0.84rem", color: C.ink,
                      }}
                    />
                    {query && (
                      <button
                        onClick={() => { setQuery(""); setSubmit(""); setSuggest([]); setFiltered(locations); }}
                        style={{
                          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                          border: "none", background: C.creamDark, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: C.inkMid,
                        }}
                      >
                        <IcoClose />
                      </button>
                    )}
                  </div>

                  {suggest.length > 0 && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                      background: C.white, border: `1.5px solid ${C.creamDark}`,
                      borderRadius: 18, overflow: "hidden", zIndex: 50,
                      boxShadow: "0 12px 40px rgba(13,51,32,0.1)",
                    }}>
                      {suggest.map((s, i) => (
                        <div key={i}
                          onClick={() => { setQuery(s.name); setSubmit(s.name); setSuggest([]); }}
                          style={{
                            padding: "11px 18px", fontFamily: C.font, fontSize: "0.82rem",
                            color: C.ink, cursor: "pointer",
                            borderBottom: i < suggest.length - 1 ? `1px solid ${C.creamDark}` : "none",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = C.creamDark}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          {s.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <GoogleMap
                mapContainerStyle={{ width: "100%", height: 420 }}
                center={defaultCenter} zoom={13}
                onLoad={m => (mapRef.current = m)}
                options={{
                  styles: [
                    { featureType: "water",         elementType: "geometry",        stylers: [{ color: "#d0e8e0" }] },
                    { featureType: "landscape",      elementType: "geometry",        stylers: [{ color: "#f3f1ea" }] },
                    { featureType: "road",           elementType: "geometry.fill",   stylers: [{ color: "#e6e4dc" }] },
                    { featureType: "road",           elementType: "geometry.stroke", stylers: [{ color: "#dddbd2" }] },
                    { featureType: "poi.park",       elementType: "geometry",        stylers: [{ color: "#d6ebd0" }] },
                    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c8c6be" }] },
                  ],
                }}
              >
                {filtered.map((loc, i) => (
                  <Marker key={i} position={loc.position} onClick={() => setActive(loc)} />
                ))}
              </GoogleMap>

              <div style={{
                padding: "10px 18px", background: C.cream, borderTop: `1px solid ${C.creamDark}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: C.font, fontSize: "0.74rem", color: C.inkMid }}>
                  Showing {filtered.length} of {locations.length} centers
                </span>
                <span style={{ fontFamily: C.font, fontSize: "0.74rem", color: C.inkFaint }}>
                  Baguio City, Benguet
                </span>
              </div>
            </div>
          </div>

          {/* ── HOTLINE + HOURS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* Hotline — lime bg */}
            <div style={{
              background: C.lime, borderRadius: 24, padding: "32px 36px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 16, height: 2, background: C.deep, borderRadius: 2 }} />
                  <span style={{ fontFamily: C.font, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(13,51,32,0.55)" }}>
                    Emergency Hotline
                  </span>
                </div>
                <p style={{ fontFamily: C.font, fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.04em", color: C.deep, margin: "0 0 4px", lineHeight: 1 }}>
                  0985-251-5968
                </p>
                <p style={{ fontFamily: C.font, fontSize: "1rem", fontWeight: 700, color: C.forest, margin: 0 }}>
                  442-9800
                </p>
              </div>
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: "rgba(13,51,32,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M4 4.5C4 3.7 4.7 3 5.5 3h2.8c.6 0 1.1.45 1.2 1.05l.9 4.5c.1.55-.15 1.1-.65 1.38L8.5 10.9c1.2 2.4 3.15 4.35 5.55 5.55l1.47-1.25c.28-.5.83-.75 1.38-.65l4.5.9c.6.1 1.05.6 1.05 1.2V19.5c0 .83-.67 1.5-1.5 1.5C8.5 21 3 15.5 3 8.5c0-.83.67-1.5 1.5-1.5" fill={C.deep}/>
                </svg>
              </div>
            </div>

            {/* Hours — deep green */}
            <div style={{
              background: C.deep, border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 24, padding: "32px 36px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 16, height: 2, background: C.lime, borderRadius: 2 }} />
                  <span style={{ fontFamily: C.font, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,236,56,0.5)" }}>
                    Office Hours
                  </span>
                </div>
                <p style={{ fontFamily: C.font, fontSize: "clamp(1.4rem,2vw,1.8rem)", fontWeight: 900, color: C.cream, letterSpacing: "-0.035em", margin: "0 0 4px", lineHeight: 1 }}>
                  Monday – Friday
                </p>
                <p style={{ fontFamily: C.font, fontSize: "clamp(1.4rem,2vw,1.8rem)", fontWeight: 900, color: C.lime, letterSpacing: "-0.035em", margin: 0, lineHeight: 1 }}>
                  8:00 AM – 5:00 PM
                </p>
              </div>
              <p style={{ fontFamily: C.font, fontSize: "0.8rem", color: C.cream, marginTop: 16 }}>
                Closed on holidays. All services are free of charge.
              </p>
            </div>
          </div>

        </div>
      </div>
      <FloatingChatBot />
    </div>
  );
}