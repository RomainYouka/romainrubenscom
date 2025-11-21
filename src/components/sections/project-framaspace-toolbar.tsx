'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './project-framaspace-toolbar.module.css';

interface ToolbarItem {
  id: number;
  bgColor: string;
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: 1, bgColor: '#6BA3FF' },
  { id: 2, bgColor: '#FFD700' },
  { id: 3, bgColor: '#FF7F33' },
  { id: 4, bgColor: '#52B788' },
  { id: 5, bgColor: '#5DADE2' },
  { id: 6, bgColor: '#A9A9A9' },
];

export function FramaspaceToolbarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const targetTranslateXRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  // LERP pour interpolation fluide
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

      const containerWidth = containerRef.current.offsetWidth;
      const scrollWidth = containerRef.current.scrollWidth;
      const maxTranslate = scrollWidth - containerWidth;

      const scrollDelta = e.deltaY * 0.5;
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
      className={styles['horizontal-scroll-section']}
    >
      <div className="w-full overflow-hidden">
        <div
          ref={containerRef}
          className={styles['horizontal-track']}
          style={{
            transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          {/* Affiche les 6 barres 2 fois pour créer un carrousel fluide */}
          {[...Array(2)].map((_, repetition) =>
            TOOLBAR_ITEMS.map((item) => (
              <div
                key={`${repetition}-${item.id}`}
                className="flex-shrink-0 flex items-center px-5 md:px-8 py-4 md:py-5 rounded-lg"
                style={{
                  backgroundColor: item.bgColor,
                  minWidth: 'clamp(280px, 45vw, 450px)',
                  height: '60px',
                  marginRight: 'clamp(12px, 2vw, 20px)',
                  gap: '12px',
                }}
              >
                {/* Icônes gauche - eye et dots */}
                <div className="flex gap-2 items-center flex-shrink-0">
                  <div className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black/60" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                  </div>
                </div>

                {/* Barre de contrôle centrale */}
                <div className="flex-1 h-2 bg-white/30 rounded-full relative">
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${45 + (item.id * 6)}%` }}
                  />
                </div>

                {/* Contrôles droite */}
                <div className="flex gap-2 items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-sm bg-white/60" />
                  <div className="w-3 h-3 rounded-sm bg-white/40" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hint texte */}
      <p className={styles['hint-text']}>
        Scroll to explore
      </p>
    </section>
  );
}
