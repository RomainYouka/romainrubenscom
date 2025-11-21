"use client";

import HeroLanding from "@/components/sections/hero-landing";
import PersonalIntro from "@/components/sections/personal-intro";
import HomeSlides from "@/components/sections/home-slides";

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full">
      <HeroLanding />

      <div className="w-full bg-white">
        <PersonalIntro />
      </div>

      <div className="w-full bg-white">
        <HomeSlides />
      </div>
    </main>
  );
}