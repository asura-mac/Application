import React from "react";
import OurVisionImage from "../assets/vission.webp";

export default function Vision() {
	return (
		<div id="vision" className="w-full min-h-screen flex items-center justify-center py-12 my-4 sm:my-10 lg:my-20">
			<div className="flex flex-col lg:flex-row items-center justify-between w-[85%] mx-auto bg-[#EDF4FF] rounded-xl gap-10 md:gap-20 p-10">
				{/* Left Side - Image */}
				<div className="lg:w-1/2 flex justify-center">
					<img
						src={OurVisionImage}
						alt="About Us"
						className="sm:w-full lg:w-[30rem] xl:w-[35rem] rounded-lg"
					/>
				</div>

				{/* Right Side - Text */}
				<div className="lg:w-1/2 text-left">
					<h1 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-6">
						OUR VISION
					</h1>
					<p className="text-lg md:text-[1.6rem] text-gray-700 leading-relaxed">
					We envision an India where technology works for everyone — helping every individual lead a better life, earn with dignity, and contribute to a cleaner, more equal society.
					</p>
				</div>
			</div>
		</div>
	);
}

