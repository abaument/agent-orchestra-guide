import React from "react";
import ReactPlayer from "react-player";

export default function VideoHero() {
  return (
    <section id="hero" className="w-full h-[60vh] overflow-hidden relative">
      <ReactPlayer
        url="/hero.mp4" // ou URL externe
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow">
          Agent Orchestra Guide
        </h1>
      </div>
    </section>
  );
}
