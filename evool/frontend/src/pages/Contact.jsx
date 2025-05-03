
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [contactData, setContactData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { email, name, message } = contactData;
  //   if (!email || !name || !message) {
    
  //     return;
  //   }

  //   setContactLoading(true);
  

  //   try {
  // //   lofgic for api call
  //   } finally {
  //     setContactLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, message } = contactData;
  
    // Basic validation
    if (!email || !name || !message) {
      alert("All fields are required.");
      return;
    }
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    setContactLoading(true);
  
    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, message }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }
  
      alert("Your message has been sent successfully!");
      setContactData({ email: "", name: "", message: "" }); // Clear form
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to send message.");
    } finally {
      setContactLoading(false);
    }
  };
  
  return (
    <main className="w-[85%] mx-auto min-h-screen pt-12 md:pt-8 bg-white my-20">
      <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Contact Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="mb-8 text-gray-700">
            Ask us anything. We'd love to hear from you.
          </p>

          <address className="not-italic space-y-6 text-gray-700">
            <div className="flex items-start gap-2 overflow-visible">
              <div className="flex-shrink-0 w-6 h-6 mt-1">
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
                <span>
                  105, P-17, Omkar CHS Ltd, Noopur Nagar Mataji Mandir, Mira Road, Thane, 401107
              </span>
            </div>




            <div className="flex items-start gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contactus@evoolfoundation.org</span>
            </div>
          </address>

          {/* Social Links */}
          <div className="mt-10">
            <h2 className="text-lg font-medium mb-2">Follow us</h2>
            
            <div className="flex justify-center sm:justify-start space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
            {/* Twitter */}
            <a
              href="https://x.com/EvoolFoundation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-2 border-black rounded-full p-2 hover:scale-105 transition">
                <svg viewBox="0 0 24 24" fill="black" className="h-4 w-4">
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
              <div className="border-2 border-black rounded-full p-2 hover:scale-105 transition">
                <svg viewBox="0 0 24 24" fill="black" className="h-5 w-5">
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
              <div className="border-2 border-black rounded-full p-2 hover:scale-105 transition">
                <svg viewBox="0 0 24 24" fill="black" className="h-4 w-4">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.663V1.337C24 .6 23.4 0 22.675 0z" />
                </svg>
              </div>
            </a>
          </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-sm" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={contactData.name}
              onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={contactData.message}
              onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
              rows="5"
              className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={contactLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {contactLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
