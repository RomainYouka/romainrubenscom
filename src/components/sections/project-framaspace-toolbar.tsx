'use client';

import { useEffect, useRef, useState } from 'react';

interface ToolbarItem {
  id: number;
  color: string;
  label: string;
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: 1, color: '#FF4444', label: 'Tool 1' },
  { id: 2, color: '#5DADE2', label: 'Tool 2' },
  { id: 3, color: '#F4D03F', label: 'Tool 3' },
  { id: 4, color: '#FF9933', label: 'Tool 4' },
  { id: 5, color: '#52B788', label: 'Tool 5' },
  { id: 6, color: '#5DADE2', label: 'Tool 6' },
  { id: 7, color: '#A9A9A9', label: 'Tool 7' },
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
      className="w-full bg-black py-16 md:py-24 overflow-hidden"
    >
      <div className="px-4 md:px-8">
        {/* Container avec overflow hidden pour afficher seulement la partie visible */}
        <div className="w-full overflow-hidden rounded-lg">
          <div
            ref={containerRef}
            className="flex"
            style={{
              gap: 'clamp(12px, 3vw, 20px)',
              transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            {/* Affiche les items 7 fois pour créer un carrousel infini */}
            {[...Array(2)].map((_, repetition) =>
              TOOLBAR_ITEMS.map((item) => (
                <div
                  key={`${repetition}-${item.id}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg shadow-lg transition-transform hover:scale-105"
                  style={{
                    backgroundColor: item.color,
                    width: 'clamp(80px, 20vw, 140px)',
                    height: 'clamp(100px, 25vw, 160px)',
                    cursor: 'pointer',
                  }}
                >
                  {/* Icon (cercles stylisés) */}
                  <div className="flex gap-1.5 mb-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="rounded-full bg-white/80"
                        style={{
                          width: '6px',
                          height: '6px',
                        }}
                      />
                    ))}
                  </div>
                  {/* Label invisible mais accessible */}
                  <span className="sr-only">{item.label}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hint texte pour mobile */}
        <p className="text-center text-white/60 text-xs md:text-sm mt-6">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
