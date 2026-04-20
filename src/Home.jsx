import React, { useState, useEffect } from "react";
import FloatingChatBot from "./FloatingChatBot";
import hivImage from "./assets/hiv-symptoms.png";
import chlamydia from "./assets/chlamydia.jpg";
import Gonorrhea from "./assets/Gonorrhea.webp";
import BonJing from "./assets/BonJing.jpg";
import qrCODE from "./assets/qrCODE.jpg";

const slides = [
  {
    image: hivImage,
    title: "HIV (Human Immunodeficiency Virus)",
    description: "Attacks the immune system and can lead to AIDS if untreated.",
  },
  {
    image: chlamydia,
    title: "Chlamydia",
    description:
      "A bacterial infection that often has no symptoms. Easily treatable with antibiotics.",
  },
  {
    image: Gonorrhea,
    title: "Gonorrhea",
    description:
      "Another bacterial infection affecting the genitals, rectum, and throat.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      3000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="min-h-screen w-full bg-white pb-20" style={{ marginTop: '150px' , marginBottom: '40px'}}>
      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full flex justify-center">
        <div className="w-[80%] mx-auto">
          {/* FIRST ROW: 2 COLUMNS */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* COLUMN 1: CAROUSEL */}
            <div className="w-full space-y-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
                <img
                  src={slides[current].image}
                  alt="slide"
                  className="w-full h-full object-contain"
                />

                {/* Prev */}
                <button
                  onClick={() =>
                    setCurrent((prev) =>
                      prev === 0 ? slides.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full shadow px-3 py-1 text-2xl"
                >
                  ‹
                </button>

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrent((prev) =>
                      prev === slides.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black rounded-full shadow px-3 py-1 text-2xl"
                >
                  ›
                </button>
              </div>
            </div>

            {/* CAPTION */}
            <div className="bg-[#195134] rounded-xl p-5 text-center"  style={{ marginTop: '20px', padding: '10px'}}>
              <h2 className="font-gotham-black text-lg text-white">
                {slides[current].title}
              </h2>
              <p className="mt-1 text-sm text-white font-gotham-regular">
                {slides[current].description}
              </p>
            </div>
                      </div>

            {/* COLUMN 2: BONJING */}
            <div className="w-full">
            <div className="bg-white rounded-xl p-6">
              <h2 className="section-substitle font-gotham-black text-center text-[#195134]">
                Learn More About BONJING
              </h2>

              <p className="text-sm text-center text-black mt-1">
                Scan the QR code below to learn more about BONJING in HSO—Baguio.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4 items-center">
                <img
                  src={BonJing}
                  alt="Bonjing Mascot"
                  className="rounded-xl w-full h-48 object-cover mx-auto"
                />
                <img
                  src={qrCODE}
                  alt="QR"
                  className="w-full max-w-[140px] mx-auto"
                />
              </div>
            </div>
          </div>
          </div>

          {/* SECOND ROW: 3 VIDEOS */}
          <div className="w-full ">
            <h2 className="section-substitle font-gotham-black text-[#195134] text-center mb-8" style={{ marginBottom: '20px' , marginTop: '30px'}}>
              Preventives and Tips
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="flex flex-col items-center text-center bg-[#195134] rounded-xl" >
              <div className=" rounded-2xl shadow overflow-hidden w-full max-w-[320px] " style={{ marginTop: '30px'}}>
                <iframe
                  width="100%"
                  height="180"
                  src="https://www.youtube.com/embed/f6umofGzPpc"
                  title="HIV Prevention Tools"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="mt-6 section-subs font-gotham-black text-white">
                HIV Prevention Tools
              </h3>
              <p className="mt-3 text-sm text-white max-w-[300px]">
                Many tools are available to help prevent HIV.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="flex flex-col items-center text-center  bg-[#195134] rounded-xl">
              <div className="bg-white rounded-2xl shadow overflow-hidden w-full max-w-[320px]" style={{ marginTop: '30px'}}>
                <iframe
                  width="100%"
                  height="180"
                  src="https://www.youtube.com/embed/1_eo17YahCo"
                  title="About PrEP"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="mt-6 section-subs font-gotham-black text-white">
                About PrEP
              </h3>
              <p className="mt-3 text-sm text-white max-w-[300px]">
                PrEP is medicine that greatly reduces your chance of getting HIV from sex or injection drug use. It is for people without HIV who may be exposed to HIV through sex or injection drug use.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="flex flex-col items-center text-center b bg-[#195134] rounded-xl">
              <div className="bg-white rounded-2xl shadow overflow-hidden w-full max-w-[320px]"  style={{ marginTop: '30px'}}>
                <iframe
                  width="100%"
                  height="180"
                  src="https://www.youtube.com/embed/Y3uQAfPRhm4"
                  title="HIV Testing"

                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="mt-6 section-subs font-gotham-black text-white"  >
                HIV Testing
              </h3>
              <p className="mt-3 text-sm text-white max-w-[300px]">
                HIV is a virus that attacks the body's immune system. The only way to know if you have HIV is to get tested.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingChatBot />
    </section>
  );
}