import React from "react";

export default function About() {
  const healthCenters = [
    {
      name: "Aurora Hill District Health Center",
      address: "#01 Malvar St. Aurora Hill Proper, Baguio",
      phone: "0916 643 0156",
      services: "HIV Testing, STI Treatment, Immunization",
      facebook: "https://www.facebook.com/aurora.hill.hc.baguio",
      staff: "DR. MARIE THERESE B. SUMBILLO, 2 NURSES, 2 MIDWIVES",
    },
    {
      name: "Atab District Health Center",
      address: "Sto. Tomas Road Dontogan, Baguio",
      phone: "(074) 420 9087",
      services: "General Checkup, Maternal Care, HIV Testing",
      facebook: "https://www.facebook.com/profile.php?id=100068242016400",
      staff: "DR. KARLA C. TABIN, 2 NURSES, 2 MIDWIVES",
    },
    {
      name: "Asin District Health Center",
      address: "Pacday Quinio Drive, Upper Purok 3, Km. 4, Asin Road, Baguio",
      phone: "620-4798",
      services: "STI Screening, Family Planning, Vaccination",
      facebook: "https://www.facebook.com/share/g/16gzomGQv6/",
      staff: "DR. BONG LAGMAN, 1 NURSE, 1 MIDWIFE",
    },
    {
      name: "Atok Trail District Health Center",
      address: "#01 Atok Trail Barangay, Baguio",
      phone: "620-5395",
      services: "HIV Counseling, TB DOTS, Prenatal Care",
      facebook: "https://www.facebook.com/share/1EfU6Cwe3y/",
      staff: "DR. KEA VILLE B. MALUCON, 1 NURSE, 3 MIDWIVES",
    },
    {
      name: "Baguio HSO Mental Health & Wellness Unit",
      address: "2nd Floor HSO Annex, T. Alonzo, Baguio",
      phone: "069 6361 | 911",
      services: "HIV Testing, STI Treatment, Child Health, Mental Health",
      facebook: "https://www.facebook.com/profile.php?id=100085709652367",
      staff: "",
    },
    {
      name: "Campo Filipino District Health Center",
      address: "Dangwa street Cresencia Village, Baguio",
      phone: "(074) 442 0031",
      services: "STI Screening, Immunization, Dental",
      facebook: "https://www.facebook.com/share/1Hb6vTg1LT/",
      staff: "DR. GRACE ANGELICA TOLITO, 1 NURSE, 1 MIDWIFE",
    },
    {
      name: "City Camp District Health Center",
      address: "City Camp Central Barangay Hall, Baguio",
      phone: "665-2902",
      services: "HIV Testing, Family Planning, Nutrition",
      facebook: "https://www.facebook.com/profile.php?id=61563642178528",
      staff: "DR. NELSON E. HORA, 2 NURSES, 3 MIDWIVES",
    },
    {
      name: "Engineers Hill District Health Center",
      address: "Manalo Alley Purok 2 Engineers Hill, Baguio",
      phone: "(074) 442 0100",
      services: "Maternal Care, STI Treatment, Immunization",
      facebook: "https://www.facebook.com/share/1BnXDKPR64/",
      staff: "DR. HELEN C. COLEWAN, 2 NURSES, 3 MIDWIVES",
    },
    {
      name: "Irisan District Health Center",
      address: "Purok 12, Irisan, Baguio",
      phone: "442-0102",
      services: "General Checkup, HIV Testing, Dental",
      facebook: "https://www.facebook.com/irisanhealthcenterofficial",
      staff: "DR. VANESSA FAGCANGAN, 2 NURSES, 5 MIDWIVES",
    },
    {
      name: "Lucban District Health Center",
      address: "T. Alonzo St., Baguio",
      phone: "309-65-05 | 09311912109",
      services: "HIV Counseling, TB DOTS, Child Health",
      facebook: "https://www.facebook.com/profile.php?id=100078508489278",
      staff: "DR. DEANSY LICAWEN, 2 NURSES, 3 MIDWIVES",
    },
    {
      name: "Loakan District Health Center",
      address: "#37 Purok Bubon, Loakan Proper, Baguio",
      phone: "(074) 665 8761",
      services: "HIV Testing, Maternal Care, Nutrition",
      facebook: "https://www.facebook.com/profile.php?id=100083641591485",
      staff: "DR. THELMA MATBAGAN, 1 NURSE, 1 MIDWIFE",
    },
    {
      name: "Mines View District Health Center",
      address: "Corner Torres St. Mines View, Baguio",
      phone: "665-8702",
      services: "STI Treatment, TB DOTS, Child Health",
      facebook: "https://www.facebook.com/profile.php?id=100063803244852",
      staff: "DR. NATAZHA FRANCO, 1 NURSE, 1 MIDWIFE",
    },
    {
      name: "Pacdal District Health Center",
      address: "Siapno Road, Pacdal, Baguio",
      phone: "665-8104",
      services: "HIV Counseling, Immunization, Dental",
      facebook: "https://www.facebook.com/PacdalHC",
      staff: "DR. EDNA A. TABO-OY, 1 NURSE, 2 MIDWIVES",
    },
    {
      name: "Pinsao District Health Center",
      address: "Purok 6, Pinsao Pilot Project, Baguio",
      phone: "665-7806",
      services: "General Checkup, STI Screening, Family Planning",
      facebook: "https://www.facebook.com/pinsaohealthcenter",
      staff: "DR. ELIVIRA D. BELINGON, 1 NURSE, 2 MIDWIVES",
    },
    {
      name: "Quezon Hill District Health Center",
      address: "Mallare Street, Quezon Hill, Baguio",
      phone: "620-5469",
      services: "HIV Testing, Maternal Care, Nutrition",
      facebook: "https://www.facebook.com/profile.php?id=100063919455522",
      staff: "DR. ANA MARIE R. BANTA, 1 NURSE, 1 MIDWIFE",
    },
    {
      name: "Quirino Hill District Health Center",
      address: "126 Block 3, Middle Quirino Hill, Baguio",
      phone: "620-5338",
      services: "General Checkup, STI Screening, Family Planning",
      facebook: "https://www.facebook.com/quirinohilldistricthealthcenter",
      staff: "DR. MARIA ALICE P. TORRES, 1 NURSE, 1 MIDWIFE",
    },
    {
      name: "Scout Barrio District Health Center",
      address: "Purok 5, Scout Barrio, beside Scout Barrio Barangay Hall, Baguio",
      phone: "(074) 422-4512",
      services: "General Checkup, STI Screening, Family Planning",
      facebook: "https://www.facebook.com/profile.php?id=61553144109616",
      staff: "DR. ALIZA CASTRO, 1 NURSE, 1 MIDWIFE",
    },
  ];

  return (
    <section className="section-wrapper min-h-screen bg-[var(--dominant)]">
      <div className="container-1080 mx-auto px-6 flex flex-col items-center">

        <h1
          className="section-title text-white text-center"
          style={{ marginBottom: "10px", paddingTop: "10px" }}
        >
          About Us
        </h1>

        {/* MISSION + VISION */}
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-14 ">
          <div
            className="rounded-md"
            style={{
              border: "3px solid #195134",
              padding: "10px",
              color: "#195134",
              transition: "0.3s",
              background : "white" ,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 18px #EFE100";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 className="section-subtitle font-gotham-black mb-2">Our Mission</h3>
            <p className="font-gotham-regular text-xl">
              Breaking Barriers Towards Universal Care.
            </p>
          </div>

          <div
            className="rounded-md"
            style={{
              border: "3px solid #195134",
              padding: "10px",
              color: "#195134",
              transition: "0.3s",
              background : "white" ,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 18px #EFE100";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 className="section-subtitle font-gotham-black mb-2">Our Vision</h3>
            <p className="font-gotham-regular text-xl">
              Provide Quality Primary Health Care Services for the Promotion of Wellbeing for All amidst Changing Times.
            </p>
          </div>
        </div>

        {/* SUBTITLE */}
        <h2
          className="section-subtitle text-white text-center"
          style={{ marginTop: "35px", marginBottom: "10px", paddingTop: "10px" }}
        >
          District Health Service Providers
        </h2>

        {/* HEALTH CENTERS */}
        <div
          className="w-[80%] mx-auto overflow-y-auto"
          style={{ 
            marginTop: "20px", 
            maxHeight: "600px",
            paddingRight: "10px"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthCenters.map((c, index) => (
              <div
                key={index}
                className="rounded-md transition"
                style={{
                  border: "3px solid #50A067",
                  backgroundColor: "white",
                  padding: "12px",
                  color: "black",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 18px #EFE100";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <h3
                  className="text-2xl mb-2 font-bold"
                  style={{ color: "#195134" }}
                >
                  {c.name}
                </h3>

                <p className="text-md mb-1" style={{ fontWeight: "200" }}>
                  {c.address}
                </p>

                {c.staff && (
                  <p className="text-sm mb-1" style={{ fontWeight: "300", color: "#195134" }}>
                    <strong>Staff:</strong> {c.staff}
                  </p>
                )}

                <p
                  className="text-md mb-1"
                  style={{ fontWeight: "200" }}
                >
                  <span>
                    <strong style={{ fontWeight: "200" }}>Services:</strong>{" "}
                    {c.services}{" "}
                    <a
                      href={c.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline ml-1 text-xs"
                      style={{
                        color: "#195134",
                        fontWeight: "100",
                        fontSize: "0.70rem",
                      }}
                    >
                      See more…
                    </a>
                  </span>
                </p>

                <a
                  href={c.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-2 underline block transition duration-200"
                  style={{
                    color: "black",
                    fontWeight: "200",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#EFE100")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "black")
                  }
                >
                  Facebook Page
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}