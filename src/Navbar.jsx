import { useState, useEffect } from "react";
import Logo from "./assets/Logo.jpg";

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastY, setLastY] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const isActive = (section) => activeSection === section;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 10) setShowNav(false);
      else setShowNav(true);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-[var(--secondary)] shadow transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full : mb-32"
        }`}
      >
        <div className="container-1080 mx-auto px-4">
          <div className="flex items-center justify-between h-[80px]">
            <div className="flex items-center gap-4">

              {/*LOGO HERE */}
              <div className=" p-2 rounded-full shadow self-start">
                <img
                  src={Logo}
                  alt="CHSO Logo"
                  className="h-auto w-25 rounded-full object-cover transform translate-y-3"
                />
              </div>

              <div>
                <h1 className="section-subtitle text-[var(--dominant) shadow-amber-50]">
                  Health Services Office
                </h1>
                <p className="text-sm font-gotham-regular text-white/80 italic">
                  City Government of Baguio
                </p>
              </div>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-gotham-black">
              <button
                onClick={() => scrollToSection("home")}
                className={
                  isActive("home")
                    ? "text-[var(--dominant)] underline"
                    : "text-white hover:text-[var(--dominant)]"
                }
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={
                  isActive("about")
                    ? "text-[var(--dominant)] underline"
                    : "text-white hover:text-[var(--dominant)]"
                }
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("pretest")}
                className={
                  isActive("pretest")
                    ? "text-[var(--highlight)] underline"
                    : "text- -[var(--highlight)] hover:text-[var(--dominant)]"
                }
              >
                PRE-TEST
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={
                  isActive("contact")
                    ? "text-[var(--dominant)] underline"
                    : "text-black hover:text-[var(--dominant)]"
                }
              >
                CONTACT
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-[var(--dominant)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
<div
  className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
    mobileOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-4 flex items-center justify-between border-b">
    <h3 className="section-subtitle text-3xl">Menu</h3>
    <button className="text-3xl" onClick={() => setMobileOpen(false)}>✕</button>
  </div>

  <div className="p-4 flex flex-col gap-5">

    <button
      onClick={() => scrollToSection("home")}
      className="section-substitle text-3xl text-left hover:text-[var(--dominant)]"
    >
      HOME
    </button>

    <button
      onClick={() => scrollToSection("about")}
      className="section-substitle text-3xl text-left hover:text-[var(--dominant)]"
    >
      ABOUT
    </button>

    <button
      onClick={() => scrollToSection("pretest")}
      className="section-substitle text-3xl text-left hover:text-[var(--dominant)]"
    >
      PRE-TEST
    </button>

    <button
      onClick={() => scrollToSection("contact")}
      className="section-substitle text-3xl text-left hover:text-[var(--dominant)]"
    >
      CONTACT
    </button>

  </div>
</div>

    </>
  );
}
