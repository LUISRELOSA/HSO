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

const defaultCenter = {
  lat: 16.413717857558595,
  lng: 120.59598703014733,
};

const mapContainerStyle = { width: "100%", height: "420px" };

const locations = [
  {
    name: "Aurora Hill District Health Center",
    position: { lat: 16.424167803089063, lng: 120.59920394232935 },
    description: "Offers HIV Testing, STI Treatment, Immunization.",
    image: AurorahillHC,
    averageTime: { walk: "30mins", motorcycle: "6mins", car: "6mins" },
    details: `DR. MARIE THERESE B. SUMBILLO, 2 NURSES, 2 MIDWIVES
9 Catchment Barangays: Ambiong, Aurora Hill Proper, Aurora Hill-North Central, Aurora Hill-South Central, Bayan Park East and West, Brookeside, Brookspoint, Lopez Jaena, Modern Site East and West, San Antonio Village`
  },
  {
    name: "Atab District Health Center",
    position: { lat: 16.3885, lng: 120.5755 },
    description: "General Checkup, Maternal Care, HIV Testing",
    image: AtabHC,
    averageTime: { walk: "1hr 7mins", motorcycle: "14mins", car: "14mins" },
    details: `DR. KARLA C. TABIN, 2 NURSES, 2 MIDWIVES
7 Catchment Barangays: Bakakeng Central, Bakakeng Norte, Dontogan, Santo Rosario, Santo Tomas Proper, Santo Tomas School Area, SLU-SVP Housing Village`
  },
  {
    name: "Asin District Health Center",
    position: { lat: 16.4046, lng: 120.5672 },
    description: "STI Screening, Family Planning, Vaccination",
    image: AsinHC,
    averageTime: { walk: "1hr 7mins", motorcycle: "14mins", car: "14mins" },
    details: `DR. BONG LAGMAN, 1 NURSE, 1 MIDWIFE
3 Catchment Barangays: Asin Road, San Luis Village, San Roque Village`
  },
  {
    name: "Atok Trail District Health Center",
    position: { lat: 16.380066067192747, lng: 120.63217829080976 },
    description: "Provides free checkups and minor medical services.",
    image: AtokHC,
    averageTime: { walk: "1.4 hrs", motorcycle: "18 mins", car: "19 mins" },
    details: `DR. KEA VILLE B. MALUCON, 1 NURSE, 3 MIDWIVES
4 Catchment Barangays: Atok Trail, Fort del Pilar, Kias, Apugan-Loakan`
  },
  {
    name: "Baguio HSO Mental Health & Wellness Unit",
    position: { lat: 16.42062025650955, lng: 120.5968267028222 },
    description: "HIV Testing, STI Treatment, Child Health, Mental Health",
    image: HSO,
    averageTime: { walk: "12 mins", motorcycle: "4 mins", car: "5 mins" },
    details: `All offices at the Main Building and District Health Centers are 
    open from Monday to Friday, 8:00am - 5:00pm except on holidays.`
  },
  {
    name: "Campo Filipino District Health Center",
    position: { lat: 16.418641239365826, lng: 120.58809063011776 },
    description: "STI Screening, Immunization, Dental",
    image: CampoFilipinoHC,
    averageTime: { walk: "22 mins", motorcycle: "7 mins", car: "7mins" },
    details: `DR. GRACE ANGELICA TOLITO, 1 NURSE, 1 MIDWIFE
8 Catchment Barangays: Camp Allen, Campo Filipino, Cresencia Village, Guisad Surong, Andres Bonifacio, Market Subdivision, Padre Burgos, Padre Zamora`
  },

  {
    name: "City Camp District Health Center",
    position: { lat: 16.41117461818585, lng: 120.58901689856332 },
    description: "HIV Testing, Family Planning, Nutrition",
    image: CityCampHC,
    averageTime: { walk: "22mins", motorcycle: "7 mins", car: "7 mins" },
    details: `DR. NELSON E. HORA, 2 NURSES, 3 MIDWIVES
14 Catchment Barangays: Balsigan, City Camp Central, City Camp Proper, Dominican Hill-Mirador, Ferdinand, GEFA, Imelda Marcos, Kayang Extension, Legarda-Burnham-Kisad, Lourdes Subdivision, MRR-Queen of Peace, Palma-Urbano, Quirino-Magsaysay, Rock Quarry`
  },
  {
    name: "Engineers Hill District Health Center",
    position: { lat: 16.406840228059124, lng: 120.60292192129249 },
    description: "Maternal Care, STI Treatment, Immunization",
    image: EngineersHillHC,
    averageTime: { walk: "21mins", motorcycle: "6mins", car: "6mins" },
    details: `DR. HELEN C. COLEWAN, 2 NURSES, 3 MIDWIVES
14 Catchment Barangays: Marcoville, BGH Compound, Cabinet Hill, Camp 8, DPS Area, Engineer’s Hill, Upper General Luna, Greenwater Village, Military Cut-Off, Phil-Am, Poliwes, Salud Mitra, San Vicente, Santa Escolastica`
  },
  {
    name: "Irisan District Health Center",
    position: { lat: 16.418137241133625, lng: 120.55853947952804 },
    description: "General Checkup, HIV Testing, Dental",
    image: IrisanHC,
    averageTime: { walk: "1hr 14mins", motorcycle: "18 mins", car: "19 mins" },
    details: `DR. VANESSA FAGCANGAN, 2 NURSES, 5 MIDWIVES
1 Catchment Barangay: All 28 Puroks of Irisan`
  },
  {
    name: "Loakan District Health Center",
    position: { lat: 16.376848900483097, lng: 120.61461288322126 },
    description: "HIV Testing, Maternal Care, Nutrition",
    image: LoakanHC,
    averageTime: { walk: "1hr 25mins", motorcycle: "16 mins", car: "19 mins" },
    details: `DR. THELMA MATBAGAN, 1 NURSE, 1 MIDWIFE
3 Catchment Barangays: Camp 7, Liwanag-Loakan, Loakan Proper`
  },
  {
    name: "Lucban District Health Center",
    position: { lat: 16.42055520036126, lng: 120.59702215069285 },
    description: "HIV Counseling, TB DOTS, Child Health",
    image: LucbanHC,
    averageTime: { walk: "12mins", motorcycle: "4mins", car: "5mins" },
    details: `DR. DEANSY LICAWEN, 2 NURSES, 3 MIDWIVES
25 Catchment Barangays: ABCR, AZKCO, Alfonso Tabora, Bagong Lipunan, Lower General Luna, Happy Homes, Harrison-Carantes, Holy Ghost, Honeymoon, Imelda Village, Kabayanihan, Kagitingan, Kayang-Hilltop, Magsaysay Private Road, Magsaysay Lower, Magsaysay Upper, Magsaysay Upper, Malcolm Square, New Lucban, Rizal Monument, North Sanitary Camp, South Sanitary Camp, Session Road, Slaughter House, Teodora Alonzo, Trancoville`
  },
  {
    name: "Mines View District Health Center",
    position: { lat: 16.42172, lng: 120.63009 },
    description: "STI Treatment, TB DOTS, Child Health",
    image: MinesView,
    averageTime: { walk: "1hr 14min", motorcycle: "13 mins", car: "13 mins" },
    details: `DR. NATAZHA FRANCO, 1 NURSE, 1 MIDWIFE
5 Catchment Barangays: Gibraltar, Lucnab, Mines View Park, Outlook Drive, Pucsusan`
  },
  {
    name: "Pacdal District Health Center",
    position: { lat: 16.41976860537003, lng: 120.61264979256788 },
    description: "HIV Counseling, Immunization, Dental",
    image: PacdalHC,
    averageTime: { walk: "51mins", motorcycle: "10mins", car: "12mins" },
    details: `DR. EDNA A. TABO-OY, 1 NURSE, 2 MIDWIVES
5 Catchment Barangays: Country Club, Lualhati, Manuel A. Roxas, Saint Joseph Village, South Drive`
  },
  {
    name: "Pinsao District Health Center",
    position: { lat: 16.42456845100626, lng: 120.583344892568 },
    description: "General Checkup, STI Screening, Family Planning",
    image: PinsaoHC,
    averageTime: { walk: "37mins", motorcycle: "8mins", car: "10mins" },
    details: `DR. ELIVIRA D. BELINGON, 1 NURSE, 2 MIDWIVES
4 Catchment Barangays: Guisad Central, Pinget, Pinsao Pilot Project, Pinsao Proper`
  },
  {
    name: "Quezon Hill District Health Center",
    position: { lat: 16.416558279182755, lng: 120.57618625069267 },
    description: "HIV Testing, Maternal Care, Nutrition",
    image: QuezonHillHC,
    averageTime: { walk: "41mins", motorcycle: "12mins", car: "12mins" },
    details: `DR. ANA MARIE R. BANTA, 1 NURSE, 1 MIDWIFE
5 Catchment Barangays: Fairview, Middle Quezon Hill, Quezon Hill Proper, Upper Quezon Hill, Victoria Village`
  },
  {
    name: "Quirino Hill District Health Center",
    position: { lat: 16.429142518433732, lng: 120.5916263641872 },
    description: "General Checkup, STI Screening, Family Planning",
    image: QuirinoHillHC,
    averageTime: { walk: "39mins", motorcycle: "9mins", car: "10mins" },
    details: `DR. MARIA ALICE P. TORRES, 1 NURSE, 1 MIDWIFE
6 Catchment Barangays: Camdas Subdivision, Dizon Subdivision, East Quirino Hill, West Quirino Hill, Lower Quirino Hill, Upper Quirino Hill`
  },
  {
    name: "Scout Barrio District Health Center",
    position: { lat: 16.396165525516484, lng: 120.60818192149273 },
    description: "General Checkup, STI Screening, Family Planning",
    image: ScoutBarrioHC,
    averageTime: { walk: "46mins", motorcycle: "10mins", car: "11mins" },
    details: `DR. ALIZA CASTRO, 1 NURSE, 1 MIDWIFE
6 Catchment Barangays: Lower Dagsian, Upper Dagsian, Gabriela Silang, Happy Hollow, Hillside, Scout Barrio`
  }
];

export default function Contact() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [tempQuery, setTempQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    let filtered = locations;

    if (searchQuery.trim()) {
      filtered = filtered.filter((loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLocations(filtered);

    if (filtered.length && mapRef.current) {
      mapRef.current.panTo(filtered[0].position);
      mapRef.current.setZoom(15);
    }
  }, [searchQuery]);

  return (
    <section
      className="w-full bg-[var(--dominant)] py-24"
      style={{
        marginTop: "120px", 
        minHeight: "90vh",  
      }}
    >
      <div className="container-1080 mx-auto px-5">

        <h1
          className="section-title text-white text-center"
          style={{ marginTop: "20px", marginBottom: "20px" , paddingTop:'40px'}}
        >
          Contact Us
        </h1>

        <div className="grid md:grid-cols-4 gap-10 mt-10">

          {/* LEFT PANEL */}
          <div
            className="col-span-1 mod-card p-4 overflow-y-auto max-h-[510px] bg-white rounded-lg"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {activeMarker ? (
              <div>
                <h2 className="text-xl font-bold">{activeMarker.name}</h2>

                {activeMarker.image && (
                  <img
                    src={activeMarker.image}
                    alt={activeMarker.name}
                    className="w-full my-3"
                  />
                )}

                <p className="text-black mb-3">{activeMarker.description}</p>

                {activeMarker.averageTime && (
                  <div className="text-sm space-y-1 mb-3">
                    <p className="font-semibold">Average Time:</p>
                    <div className="flex gap-2">🚶 Walking: {activeMarker.averageTime.walk}</div>
                    <div className="flex gap-2">🏍️ Motorcycle: {activeMarker.averageTime.motorcycle}</div>
                    <div className="flex gap-2">🚗 Car: {activeMarker.averageTime.car}</div>
                  </div>
                )}

                {activeMarker.details && (
                  <div className="mt-4 p-3 bg-[#50a0679c] rounded-md text-sm whitespace-pre-line">
                    {activeMarker.details}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-black">Click a health center marker to see details here.</p>
            )}
          </div>

          {/* RIGHT SIDE — MAP */}
          <div
            className="col-span-3 mod-card p-4 bg-[#195134] rounded-lg"
            style={{ marginBottom: "50px" }}
          >

            {/* SEARCH BAR */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchQuery(tempQuery);
                setSuggestions([]);
              }}
              className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 relative"
            >
              <input
                type="text"
                placeholder="Search health center"
                className="px-3 py-1 border rounded w-full sm:w-64"
                value={tempQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setTempQuery(value);
                  setSuggestions(
                    value.trim()
                      ? locations
                          .filter((loc) =>
                            loc.name.toLowerCase().includes(value.toLowerCase())
                          )
                          .slice(0, 5)
                      : []
                  );
                }}
                style={{ marginBottom: "10px" }}
              />

              {suggestions.length > 0 && (
                <div className="bg-[#50a06773] border rounded shadow absolute top-full mt-1 z-10 w-full sm:w-64">
                  {suggestions.map((s, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setTempQuery(s.name);
                        setSearchQuery(s.name);
                        setSuggestions([]);
                      }}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </form>

            {/* GOOGLE MAP */}
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "420px" }}
              center={defaultCenter}
              zoom={13}
              onLoad={(map) => (mapRef.current = map)}
            >
              {filteredLocations.map((loc, index) => (
                <Marker
                  key={index}
                  position={loc.position}
                  onClick={() => setActiveMarker(loc)}
                />
              ))}
            </GoogleMap>
          </div>
        </div>

        <FloatingChatBot />
      </div>
    </section>
  );
}
