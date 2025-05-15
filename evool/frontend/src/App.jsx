import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Footer"
import Header from "./component/Header"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import { useEffect, useState } from "react";
import Loader from "./component/Loader";
import { Helmet } from "react-helmet";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // loader visible for 1 second

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>Evool Foundation | Tech-Driven Solutions for India’s Daily Challenges</title>
        <meta
        name="description"
        content="Transforming everyday life in India with tech for social good, job creation, and sustainable change. Join our movement to build a better, inclusive future."/>
        <meta property="og:title" content=" Evool Foundation | Tech-Driven Solutions for India’s Daily Challenges" />
        <meta
        property="og:description"
        content="Transforming everyday life in India with tech for social good, job creation, and sustainable change. Join our movement to build a better, inclusive future."/>
        <meta
        property="og:image"
        content="https://evoolfoundation.org/evool_og.png"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://evoolfoundation.org/" />
        
      </Helmet>

      {loading && <Loader />} 

      <Header />
      <main style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
