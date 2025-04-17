import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-3 md:mb-4">
        404
      </h1>
      <p className="text-lg md:text-xl mb-5 md:mb-6 text-gray-700">
        Page Not Found
      </p>
      <Link
        to="/"
        className="px-5 py-2 text-sm md:text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
