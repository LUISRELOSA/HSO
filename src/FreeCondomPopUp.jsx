import { useEffect, useState } from "react";
import condom from "./assets/condom.png";

export default function FreeCondomPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[600px] h-[600px] max-w-[95%] bg-white rounded-2xl shadow-2xl text-center relative overflow-hidden flex flex-col">

        {/* Green Top Header */}
        <div className="w-full h-10 bg-[#2d7a36] relative bottom-3">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-6 text-white text-4xl font-bold hover:opacity-80"
          >
            ✕
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center -mt-14">
          <div className="bg-yellow-400 p-8 rounded-full shadow-lg">
            <img 
              src={condom} 
              alt="Condom" 
              className="w-50 h-70 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-8 text-7xl font-bold text-[#195134] tracking-tight">
          FREE CONDOMS
        </h2>

        {/* Availability */}
        <p className="mt-6 text-2xl text-black font-medium">
          Available at all Baguio Health Centers
        </p>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 px-12 leading-relaxed">
          Protect yourself and your partner. Visit your nearest health center today!
        </p>

        {/* Why Use Condoms Box */}
        <div
          className="rounded-lg p-8 mt-8 mx-10"
          style={{ backgroundColor: "#d4e7d4" , borderRadius: '35px'}}
        >
          <p className="font-bold text-[#195134] text-lg mb-4">
            Why use condoms?
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Condoms are highly effective at preventing HIV, STIs, and unintended
            pregnancy when used correctly and consistently.
          </p>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Learn More Button (OPEN CDC LINK) */}
        <div className="pb-6 px-[10%]">
          <button
            onClick={() =>
              window.open(
                "https://www.cdc.gov/hiv/prevention/condoms.html",
                "_blank"
              )
            }
            className="w-full text-white py-5 rounded-lg font-bold text-xl transition hover:opacity-90"
            style={{ backgroundColor: "#195134", padding: '5px',marginBottom: '10px', width: '350px', borderRadius: '35px'}}
          >
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
}
