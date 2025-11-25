'use client';

import { useEffect, useRef, useState } from 'react';

export function ProjectTransitionSlide() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-24 md:h-32 bg-gradient-to-b from-white via-[#F5F5F7] to-white overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
        transition: 'opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-1 h-12 md:h-16 bg-gradient-to-b from-transparent via-[#D3D3D4] to-transparent rounded-full"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s, transform 1s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  );
}
