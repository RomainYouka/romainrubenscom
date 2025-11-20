"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const bands = [
{
  id: 1,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-1-1762197715353.png",
  direction: "left" as const,
  speed: 1
},
{
  id: 2,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-2-1762197715380.png",
  direction: "right" as const,
  speed: 1
},
{
  id: 3,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-3-1762197715401.png",
  direction: "left" as const,
  speed: 1
},
{
  id: 4,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-4-1762197715384.png",
  direction: "right" as const,
  speed: 1
},
{
  id: 5,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-5-1762197717583.png",
  direction: "left" as const,
  speed: 1
},
{
  id: 6,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-6-1762197717601.png",
  direction: "right" as const,
  speed: 1
},
{
  id: 7,
  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Group-7-1762197715363.png",
  direction: "left" as const,
  speed: 1
}];


// Easing function for smoother animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export default function ProjectHorizontalParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

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
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "0px"
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollProgress = Math.max(0, Math.min(1,
      (viewportHeight - rect.top) / (viewportHeight + sectionHeight)
      ));

      // Apply easing for smoother scroll
      const easedProgress = easeOutCubic(scrollProgress);

      bands.forEach((band, index) => {
        const bandElement = bandRefs.current[index];
        if (!bandElement) return;

        // Parallax movement only (no opacity or scale)
        const maxOffset = 50;
        let offsetPercent = easedProgress * maxOffset * band.speed;

        if (band.direction === "left") {
          offsetPercent = -offsetPercent;
        }

        // Apply only parallax movement
        bandElement.style.transform = `translate3d(${offsetPercent}%, 0, 0)`;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, prefersReducedMotion]);

  return (
    <section
      id="project4-horizontal-parallax"
      ref={sectionRef}
      className="bg-black overflow-hidden py-12 md:py-16 lg:py-20 !w-full !h-full"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>

      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col -space-y-2 md:-space-y-4">
          {bands.map((band, index) =>
          <div
            key={band.id}
            className="w-full overflow-visible relative h-[80px] md:h-[110px] lg:h-[140px]">

              <div
              ref={(el) => {
                bandRefs.current[index] = el;
              }}
              className="absolute inset-0 h-full"
              style={{
                width: "200%",
                left: band.direction === "left" ? (index === 0 ? "-30%" : "0%") : "-100%",
                willChange: prefersReducedMotion ? "auto" : "transform",
                opacity: 1
              }}>

                <Image
                src={band.src}
                alt={`Group ${band.id}`}
                fill
                className="object-contain"
                quality={100}
                priority={index < 3}
                sizes="200vw"
                unoptimized />

              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}