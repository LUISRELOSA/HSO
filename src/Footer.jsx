import React from "react";
import CityLogo from "./assets/CityLogo.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--highlight)]/20 border-t border-[var(--dominant)] text-black mt-10">
      

      <div className="container-1080 mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={CityLogo} alt="Logo" className="h-10 w-10" />
            <span className="text-lg font-gotham-black text-[var(--dominant)]">
              GOVPH
            </span>
          </div>
          <p className="font-gotham-regular text-sm text-gray-700">
            Empowering community health awareness. Brought to you by local health authorities.
          </p>
        </div>

        <div>
          <h3 className="font-gotham-black text-[var(--dominant)] mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition"
            style={{ paddingLeft: "20px" }}>
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition"
            style={{ paddingLeft: "20px" }}>
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            style={{ paddingLeft: "20px" }}>
              <FaTwitter />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-gotham-black text-[var(--dominant)] mb-2">
            Contact
          </h3>
          <p className="text-sm font-gotham-regular">
            Email:{" "}
            <a
              href="mailto:info@govph.org"
              className="underline hover:text-[var(--dominant)] transition"
            >
              info@govph.org
            </a>
          </p>
          <p className="text-sm font-gotham-regular">
            Phone:{" "}
            <a
              href="tel:+639123456789"
              className="underline hover:text-[var(--dominant)] transition"
            >
              +63 912 345 6789
            </a>
          </p>
          <p className="text-sm font-gotham-regular">
            Address: Baguio City, Philippines
          </p>
        </div>
      </div>


      <div className="border-t border-[var(--dominant)] py-6 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} GOVPH. All rights reserved.
      </div>
    </footer>
  );
}
