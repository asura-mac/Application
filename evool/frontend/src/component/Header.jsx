import React, { useState } from "react";
import logo from "./../assets/evool_t.png";
import { useNavigate, useLocation, Link } from "react-router-dom";

const menuItems = [
  { label: "Mission", path: "#mission" },
  { label: "Vision", path: "#vision" },
  { label: "Projects", path: "#project" },
  { label: "About us", path: "#about" },
  { label: "Blog", path: "/blog" },
  { label: "Get Involved", path: "#getInvolved" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
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
    <nav className="w-full fixed top-6 left-0 z-50 flex justify-center">
      <div className="flex justify-between items-center w-[90%] max-w-6xl bg-white shadow-lg rounded-full py-4 px-8">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Evool Foundation" className="w-10 mr-2" />
          <span className="text-lg font-semibold">Evool Foundation</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-lg font-medium">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavigation(item.path)}
                className="hover:text-gray-600"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Contact Us Button */}
        <Link
          to="/contact-us"
          className="hidden md:block bg-[#0B0D39] text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-800 transition"
        >
          Contact us
        </Link>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <img src="/close.png" alt="Close menu" className="w-6" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 absolute w-[90%] max-w-6xl rounded-xl top-16">
          <ul className="flex flex-col items-center space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="text-lg font-medium hover:text-gray-600"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href="/contact-us"
                className="bg-black text-white px-5 py-2 rounded-full text-lg font-medium hover:bg-gray-800"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
