// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="flex flex-col lg:pr-20 lg:flex-row max-lg:items-center lg:justify-between max-lg:gap-10 pt-16 lg:pb-56 pb-12 ">
                <div className="flex flex-col lg:pl-20 gap-3 max-lg:text-center">
                    <img src="voolata_long_r.png" alt="" className="w-32 max-lg:mx-auto" />
                    <p className="w-64">An Initiative by Evool Foundation.</p>
                </div>

                <div className="flex lg:flex-row  flex-col lg:gap-20 max-lg:items-center gap-10">
                    <div className="flex flex-col gap-3 max-lg:text-center">
                        <h1 className="font-semibold text-2xl">Company</h1>
                        <ul className="list-none flex flex-col gap-1">
                            <Link to="/about-us">About us</Link>
                            <Link to="/donation">Donation</Link>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3 w-36 max-lg:text-center">
                        <h1 className="font-semibold text-2xl ">Links</h1>
                        <ul className="list-none flex flex-col gap-1">
                            <Link to="/terms-conditions">Terms & Conditions</Link>
                            <Link to="/refund-policy">Refund Policy</Link>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </ul>
                    </div>
                    <div className="flex flex-col  gap-3 max-lg:text-center">
                        <h1 className="font-semibold text-2xl">Contact</h1>
                        <ul className="list-none w-80 flex flex-col gap-1">
                            <li>contactus@evoolfoundation.org</li>
                            <li>105, P-17, Omkar CHS Ltd, Noopur Nagar Mataji Mandir, Mira Road, Thane, Thane- 401107</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="h-28 lg:bg-[#FAFAFA] flex flex-col lg:flex-row items-center lg:justify-between gap-5">
                <div className="pl-24 lg:flex hidden">
                    <h1>© {new Date().getFullYear()} Voolata. All rights reserved.</h1>
                </div>
                <div className="flex gap-6 items-center lg:pr-24 ">
                    <a 
        href="https://x.com/evoolfoundation?s=21" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative transition-transform hover:scale-110"
        aria-label="Follow us on X (Twitter)"
    >
        <img src="/x_icon.svg" alt="X (Twitter)" className="w-6 h-6" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Follow us on X
        </span>
    </a>
    
    <a 
        href="https://www.instagram.com/evoolfoundation?igsh=bG9kZmNmaWg5NmN4" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative transition-transform hover:scale-110"
        aria-label="Follow us on Instagram"
    >
        <img src="/ig_icon.svg" alt="Instagram" className="w-6 h-6" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Follow us on Instagram
        </span>
    </a>
    
    <a 
        href="https://www.facebook.com/share/1J5Q1EniJW/?mibextid=wwXIfr" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative transition-transform hover:scale-110"
        aria-label="Follow us on Facebook"
    >
        <img src="/meta_icon.svg" alt="Facebook" className="w-6 h-6" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Follow us on Facebook
        </span>
    </a>
                </div>
                <div className="lg:hidden">
                    <h1>© {new Date().getFullYear()} Voolata. All rights reserved.</h1>
                </div>
            </div>
        </>
    )
}

export default Footer;