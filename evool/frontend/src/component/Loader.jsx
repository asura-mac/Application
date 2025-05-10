// src/components/Loader.jsx
import React from "react";
import loding from './../assets/loadingAnimationV1.mp4'
export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <video
        src={loding}
        controls={false}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="w-48 h-48 object-contain"
      />
    </div>
  );
}
