"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const bands = [
{
  id: 1,
  src: "/framaspace/A1.png",
  width: 2400,
  height: 140
},
{
  id: 2,
  src: "/framaspace/A2.png",
  width: 2400,
  height: 140
},
{
  id: 3,
  src: "/framaspace/A3.png",
  width: 2400,
  height: 140
},
{
  id: 4,
  src: "/framaspace/A4.png",
  width: 2400,
  height: 140
},
{
  id: 5,
  src: "/framaspace/A5.png",
  width: 2400,
  height: 140
},
{
  id: 6,
  src: "/framaspace/A6.png",
  width: 2400,
  height: 140
},
{
  id: 7,
  src: "/framaspace/A7.png",
  width: 2400,
  height: 140
}];


export default function ProjectHorizontalParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState<number[]>(new Array(bands.length).fill(0));
  const bandRefs = useRef<(HTMLDivElement | null)[]>(new Array(bands.length).fill(null));

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
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculer si la section est visible
      const isVisible = sectionRect.top < viewportHeight && sectionRect.bottom > 0;
      if (!isVisible) return;

      // Calculer la progression du scroll dans la section
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      
      // Progression de 0 à 1
      // progress = 0 quand section entre par le bas (sectionTop = viewportHeight)
      // progress = 1 quand section sort par le haut (sectionTop = -sectionHeight)
      const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));

      // Calculer le déplacement pour chaque bande
      const newProgress = bands.map((band, index) => {
        const bandElement = bandRefs.current[index];
        if (!bandElement) return 0;

        const viewportWidth = window.innerWidth;
        const imageWidth = band.width;
        const maxScroll = Math.max(0, imageWidth - viewportWidth);
        
        // Les impairs (index 0, 2, 4, 6) vont à droite (positif)
        // Les pairs (index 1, 3, 5) vont à gauche (négatif)
        const isEven = (index + 1) % 2 === 0;
        
        return isEven ? -progress * maxScroll : progress * maxScroll;
      });

      setScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prefersReducedMotion]);


  return (
    <section
      id="project4-horizontal-parallax"
      ref={sectionRef}
      className="bg-black overflow-hidden py-12 md:py-16 lg:py-20 !w-full !h-full"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>

      <div className="w-full">
        <div className="flex flex-col gap-3 md:gap-4">
          {bands.map((band, index) => {
            const isEven = (index + 1) % 2 === 0;
            const translateX = scrollProgress[index] || 0;
            
            return (
              <div
                key={band.id}
                className="w-full overflow-hidden relative h-[120px] md:h-[140px] lg:h-[160px]">
                <div
                  ref={(el) => {
                    bandRefs.current[index] = el;
                  }}
                  className="absolute h-full"
                  style={{
                    transform: prefersReducedMotion ? 'none' : `translateX(${translateX}px)`,
                    transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear',
                    willChange: prefersReducedMotion ? 'auto' : 'transform',
                    [isEven ? 'left' : 'right']: 0
                  }}>
                  <Image
                    src={band.src}
                    alt={`Framaspace ${band.id}`}
                    width={band.width}
                    height={band.height}
                    className="h-full w-auto object-contain"
                    style={{ display: 'block' }}
                    quality={100}
                    priority={index < 3}
                    unoptimized />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>);

}