'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './project-framaspace-toolbar.module.css';

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

  const toolbarImages = [
    { id: 1, src: '/framaspace-toolbar/blue.png', alt: 'Blue Toolbar' },
    { id: 2, src: '/framaspace-toolbar/yellow.png', alt: 'Yellow Toolbar' },
    { id: 3, src: '/framaspace-toolbar/orange.png', alt: 'Orange Toolbar' },
    { id: 4, src: '/framaspace-toolbar/green.png', alt: 'Green Toolbar' },
    { id: 5, src: '/framaspace-toolbar/cyan.png', alt: 'Cyan Toolbar' },
    { id: 6, src: '/framaspace-toolbar/gray.png', alt: 'Gray Toolbar' },
  ];

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
          {/* Affiche les 6 images 2 fois pour créer un carrousel fluide */}
          {[...Array(2)].map((_, repetition) =>
            toolbarImages.map((item) => (
              <div
                key={`${repetition}-${item.id}`}
                className="flex-shrink-0"
                style={{
                  minWidth: 'clamp(300px, 50vw, 500px)',
                  marginRight: 'clamp(12px, 2vw, 20px)',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto rounded-lg"
                  style={{ display: 'block' }}
                />
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
