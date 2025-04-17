import React from "react";
import logo from "./../assets/evool_t.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
const menuItems = [
  { label: "Our Mission", path: "#mission" },
  { label: "Our Vision", path: "#vision" },
  { label: "Our Project", path: "#project" },
  { label: "About Us", path: "#about" },
  { label: "Get Involved", path: "#getInvolved" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
    if (path.startsWith("#")) {
      if (location.pathname !== "/") {
        // Go to home with hash
        navigate(`/${path}`);
      } else {
        const el = document.querySelector(path);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(path);
    }
  };
  return (
    <footer className="relative mt-56 bg-blue-300 text-black ">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-blue-300"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="px-4 pt-12 mx-auto max-w-screen-xl md:px-8">
        <div className="grid gap-12 mb-10 lg:grid-cols-6">
          {/* Logo + Description */}
          <section className="md:max-w-md lg:col-span-2 text-center md:text-left">
            <a
              href="/"
              aria-label="Go home"
              className="inline-flex items-center justify-center md:justify-start"
            >
              <img
                src={logo}
                alt="Evool Foundation Logo"
                className="w-28 mr-2"
              />
              <span className="text-[1.3rem] font-bold tracking-wide uppercase">
                EVOOL FOUNDATION
              </span>
            </a>
            <p className="mt-4 text-sm text-deep-purple-50">
              Evool Foundation is dedicated to leveraging technology for social
              good, creating innovative solutions that empower individuals,
              communities, and the planet.
            </p>
          </section>

          {/* Navigation + Contact */}
          <div className="flex flex-wrap justify-center gap-10 sm:justify-around lg:col-span-4 lg:pl-10 text-center sm:text-left">
            {/* Menu */}
            <nav>
              <h2 className="text-xl font-medium">Company</h2>
              <ul className="mt-4 flex flex-col gap-2 w-36 mx-auto sm:mx-0">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className="hover:underline"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-medium">Contact</h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>+91 91368 95794</li>
                <li>contactus@evoolfoundation.org</li>
                <li>
                  105, P-17, Omkar CHS Ltd,
                  <br />
                  Noopur Nagar Mataji Mandir,
                  <br />
                  Mira Road, Thane, 401107
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-5 pb-10 border-t-4 border-white sm:flex-row text-sm">
          {/* Social Icons - Left Side */}
          <div className="flex justify-center sm:justify-start space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
            {/* Twitter */}
            <a
              href="https://x.com/EvoolFoundation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-2 border-white rounded-full p-2 hover:scale-105 transition">
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.27 4.27 0 001.88-2.36 8.5 8.5 0 01-2.7 1.03 4.24 4.24 0 00-7.22 3.86 12.04 12.04 0 01-8.75-4.43 4.24 4.24 0 001.31 5.66 4.2 4.2 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.16 4.27 4.27 0 01-1.91.07 4.25 4.25 0 003.96 2.94A8.52 8.52 0 012 19.54a12.03 12.03 0 006.52 1.91c7.83 0 12.11-6.49 12.11-12.11 0-.18 0-.36-.01-.54A8.67 8.67 0 0024 5.59a8.52 8.52 0 01-2.54.7z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/evoolfoundation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-2 border-white rounded-full p-2 hover:scale-105 transition">
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1.1.6 1.6 1.1.5.5.9 1 .9 1.6.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.6 1.1-1.1 1.6-.5.5-1 .9-1.6 1.1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1.1-.6-1.6-1.1-.5-.5-.9-1-.9-1.6-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5 1-.9 1.6-1.1.4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.8.4-1.2.8s-.6.7-.8 1.2c-.1.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.8.8 1.2s.7.6 1.2.8c.4.1 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.8-.4 1.2-.8s.6-.7.8-1.2c.1-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.8-.8-1.2s-.7-.6-1.2-.8c-.4-.1-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.5a5.3 5.3 0 110 10.6 5.3 5.3 0 010-10.6zm0 8.8a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm5.6-9.8a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
                </svg>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/sunbeachresortgorai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-2 border-white rounded-full p-2 hover:scale-105 transition">
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.663V1.337C24 .6 23.4 0 22.675 0z" />
                </svg>
              </div>
            </a>
          </div>

          {/* Center Text */}
          <p className="text-center w-full sm:w-auto">
            © {new Date().getFullYear()} EVOOL FOUNDATION. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
