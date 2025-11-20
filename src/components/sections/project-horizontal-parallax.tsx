"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const bands = [
{
  id: 1,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-1-1762197715353.png",
  direction: "left" as const,
  speed: 30
},
{
  id: 2,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-2-1762197715380.png",
  direction: "right" as const,
  speed: 25
},
{
  id: 3,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-3-1762197715401.png",
  direction: "left" as const,
  speed: 35
},
{
  id: 4,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-4-1762197715384.png",
  direction: "right" as const,
  speed: 28
},
{
  id: 5,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-5-1762197717583.png",
  direction: "left" as const,
  speed: 32
},
{
  id: 6,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-6-1762197717601.png",
  direction: "right" as const,
  speed: 27
},
{
  id: 7,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-7-1762197715363.png",
  direction: "left" as const,
  speed: 33
}];


export default function ProjectHorizontalParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);


  return (
    <section
      id="project4-horizontal-parallax"
      ref={sectionRef}
      className="bg-black overflow-hidden py-12 md:py-16 lg:py-20 !w-full !h-full"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>
      
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .scroll-left {
          animation: scrollLeft var(--duration) linear infinite;
        }
        
        .scroll-right {
          animation: scrollRight var(--duration) linear infinite;
        }
      `}</style>

      <div className="w-full">
        <div className="flex flex-col -space-y-4 md:-space-y-6">
          {bands.map((band, index) =>
          <div
            key={band.id}
            className="w-full overflow-hidden relative h-[110px] md:h-[110px] lg:h-[140px]">

              <div
              className={`flex absolute inset-0 h-full ${prefersReducedMotion ? '' : band.direction === 'left' ? 'scroll-left' : 'scroll-right'}`}
              style={{
                width: "max-content",
                willChange: prefersReducedMotion ? "auto" : "transform",
                '--duration': `${band.speed}s`
              } as React.CSSProperties}>

                {[...Array(4)].map((_, dupIndex) => (
                  <div key={dupIndex} className="flex h-full shrink-0">
                    <Image
                    src={band.src}
                    alt={`Group ${band.id}`}
                    width={2400}
                    height={140}
                    className="h-full w-auto object-contain"
                    style={{ display: 'block' }}
                    quality={100}
                    priority={index < 3 && dupIndex === 0}
                    unoptimized />
                  </div>
                ))}

              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}