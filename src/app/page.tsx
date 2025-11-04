"use client";

import HeroLanding from "@/components/sections/hero-landing";
import PersonalIntro from "@/components/sections/personal-intro";
import HomeSlides from "@/components/sections/home-slides";
import ProjectTeasers from "@/components/sections/project-teasers";

export default function Home() {
  return (
    <main className="min-h-screen bg-white w-full">
      {/* Hero landing section with background image */}
      <HeroLanding />

      {/* Personal intro section */}
      <div className="w-full bg-white">
        <PersonalIntro />
      </div>

      {/* Project Teasers section */}
      <div className="w-full bg-white">
        <ProjectTeasers />
      </div>

      {/* Slides section */}
      <div className="w-full bg-white">
        <HomeSlides />
      </div>
    </main>
  );
}