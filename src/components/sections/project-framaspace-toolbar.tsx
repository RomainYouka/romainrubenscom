'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './project-framaspace-toolbar.module.css';

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
      className={styles['horizontal-scroll-section']}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Container avec overflow hidden pour le scroll horizontal */}
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <div
            ref={containerRef}
            className={styles['horizontal-track']}
            style={{
              transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Affiche les items 2 fois pour créer un carrousel fluide */}
            {[...Array(2)].map((_, repetition) =>
              TOOLBAR_ITEMS.map((item) => (
                <div
                  key={`${repetition}-${item.id}`}
                  className={styles['toolbar-item']}
                >
                  {/* Icon */}
                  <span className={styles['toolbar-icon']}>
                    {item.icon}
                  </span>
                  {/* Label */}
                  <span className={styles['toolbar-label']}>
                    {item.label}
                  </span>
                  {/* Accessible label */}
                  <span className="sr-only">{item.label}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hint texte */}
        <p className={styles['hint-text']}>
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
