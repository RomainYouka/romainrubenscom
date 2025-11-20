"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const bands = [
{
  id: 1,
  src: "/framaspace/A1.png",
  direction: "left" as const,
  speed: 30
},
{
  id: 2,
  src: "/framaspace/A2.png",
  direction: "right" as const,
  speed: 25
},
{
  id: 3,
  src: "/framaspace/A3.png",
  direction: "left" as const,
  speed: 35
},
{
  id: 4,
  src: "/framaspace/A4.png",
  direction: "right" as const,
  speed: 28
},
{
  id: 5,
  src: "/framaspace/A5.png",
  direction: "left" as const,
  speed: 32
},
{
  id: 6,
  src: "/framaspace/A6.png",
  direction: "right" as const,
  speed: 27
},
{
  id: 7,
  src: "/framaspace/A7.png",
  direction: "left" as const,
  speed: 33
}];


export default function ProjectHorizontalParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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
        
        @media (prefers-reduced-motion: reduce) {
          .scroll-left,
          .scroll-right {
            animation: none !important;
          }
        }
        
        .scroll-left {
          animation: scrollLeft var(--duration) linear infinite;
        }
        
        .scroll-right {
          animation: scrollRight var(--duration) linear infinite;
        }
        
        .scroll-left.paused,
        .scroll-right.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full">
        <div className="flex flex-col gap-3 md:gap-4">
          {bands.map((band, index) =>
          <div
            key={band.id}
            className="w-full overflow-hidden relative h-[50px] md:h-[55px] lg:h-[60px]">

              <div
              className={`flex absolute inset-0 h-full ${prefersReducedMotion ? '' : band.direction === 'left' ? 'scroll-left' : 'scroll-right'} ${isScrolling ? 'paused' : ''}`}
              style={{
                width: "max-content",
                willChange: prefersReducedMotion ? "auto" : "transform",
                '--duration': `${band.speed}s`
              } as React.CSSProperties}>

                {[...Array(6)].map((_, dupIndex) => (
                  <div key={dupIndex} className="flex h-full shrink-0" style={{ minWidth: "100vw" }}>
                    <Image
                    src={band.src}
                    alt={`Group ${band.id}`}
                    width={2400}
                    height={140}
                    className="h-full w-full object-cover"
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