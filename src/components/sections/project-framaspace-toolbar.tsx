'use client';

import { useEffect, useRef, useState } from 'react';

interface ToolbarItem {
  id: number;
  icon: string;
  label: string;
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: 1, icon: '●', label: 'Tool 1' },
  { id: 2, icon: '◆', label: 'Tool 2' },
  { id: 3, icon: '▲', label: 'Tool 3' },
  { id: 4, icon: '■', label: 'Tool 4' },
  { id: 5, icon: '○', label: 'Tool 5' },
  { id: 6, icon: '⬢', label: 'Tool 6' },
  { id: 7, icon: '✕', label: 'Tool 7' },
];

export function FramaspaceToolbarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const targetTranslateXRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  // LERP fonction pour interpolation fluide
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // IntersectionObserver pour détecter quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Wheel event listener pour synchroniser scroll vertical → horizontal
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isVisible || !containerRef.current) return;

      // Récupère la largeur totale des items et l'espace disponible
      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      const maxTranslate = scrollWidth - containerWidth;

      // Convertir le scroll vertical en déplacement horizontal
      // deltaY positif = scroll down = move right
      const scrollDelta = e.deltaY * 0.5; // Facteur d'amortissement
      targetTranslateXRef.current = Math.max(0, Math.min(maxTranslate, targetTranslateXRef.current + scrollDelta));
    };

    if (isVisible) {
      window.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isVisible]);

  // RequestAnimationFrame pour l'interpolation fluide
  useEffect(() => {
    const animate = () => {
      // LERP avec facteur de 0.1 pour fluidité ultra-lisse
      const newTranslateX = lerp(currentTranslateX, targetTranslateXRef.current, 0.1);
      setCurrentTranslateX(newTranslateX);

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(-${newTranslateX}px)`;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [currentTranslateX]);

  // Réinitialiser quand la section sort du viewport
  useEffect(() => {
    if (!isVisible) {
      targetTranslateXRef.current = 0;
      setCurrentTranslateX(0);
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateX(0)';
      }
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-12 md:py-20 overflow-hidden flex items-center justify-center min-h-32 md:min-h-40"
    >
      <div className="w-full px-4 md:px-8 flex flex-col items-center justify-center">
        {/* Container avec overflow hidden pour le scroll horizontal */}
        <div className="w-full overflow-hidden">
          <div
            ref={containerRef}
            className="flex items-center"
            style={{
              gap: 'clamp(12px, 2.5vw, 18px)',
              transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
              paddingLeft: '2rem',
              paddingRight: '2rem',
            }}
          >
            {/* Affiche les items 2 fois pour créer un carrousel fluide */}
            {[...Array(2)].map((_, repetition) =>
              TOOLBAR_ITEMS.map((item) => (
                <div
                  key={`${repetition}-${item.id}`}
                  className="flex-shrink-0 flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-3 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/10 hover:border-white/30 cursor-pointer group"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    height: 'clamp(48px, 12vw, 60px)',
                    minWidth: '80px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {/* Icon */}
                  <span className="text-base md:text-lg text-white/80 group-hover:text-white transition-colors flex-shrink-0">
                    {item.icon}
                  </span>
                  {/* Label - hidden on mobile pour économiser l'espace */}
                  <span className="hidden sm:inline text-xs md:text-sm text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.label}
                  </span>
                  {/* Accessible label */}
                  <span className="sr-only">{item.label}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hint texte pour mobile */}
        <p className="text-center text-white/40 text-xs mt-6">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
