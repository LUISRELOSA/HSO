import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import "./App.css";
import "./index.css";
import Contact from "./Contact";
import { LoadScript } from "@react-google-maps/api";
import About from "./About";
import Pretest from "./Pretest";
import Footer from "./Footer";
import FreeCondomPopup from "./FreeCondomPopUp";

export default function App() {
  const googleMapsApiKey = "AIzaSyD1tsAWluD3r-Itr-JPVQ3CPI7SbCVejxQ";
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'pretest', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={["places"]}
      preventGoogleFontsLoading={true}
    >
      <div className="app-root">
        <Navbar activeSection={activeSection} />
        <FreeCondomPopup />

        <main className="flex-grow pt-[180px] w-full">
          <section id="home">
            <Home />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="pretest">
            <Pretest />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </LoadScript>
  );
}