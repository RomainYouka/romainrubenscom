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

  return (
    <section
      ref={sectionRef}
      className={styles['horizontal-scroll-section']}
    >
      <div className="flex flex-col items-center justify-center w-full">
        {/* Container avec les items empilés verticalement */}
        <div
          ref={containerRef}
          className={styles['horizontal-track']}
        >
          {/* Affiche les 6 barres empilées verticalement */}
          {TOOLBAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className="w-full flex items-center px-4 md:px-6 py-3 md:py-4 relative group cursor-pointer transition-all hover:shadow-lg"
              style={{
                backgroundColor: item.bgColor,
                height: '60px',
                borderRadius: '8px',
              }}
            >
              {/* Section gauche - Icônes */}
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 rounded-full bg-white/60 hover:bg-white transition" />
                <div className="w-4 h-4 rounded-full bg-white/40 hover:bg-white transition" />
                <div className="w-4 h-4 rounded-full bg-white/20 hover:bg-white transition" />
              </div>

              {/* Section milieu - Slider/Barre */}
              <div className="flex-1 mx-4 md:mx-6 h-2 bg-white/30 rounded-full relative">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${40 + (item.id * 8)}%` }}
                />
              </div>

              {/* Section droite - Contrôles */}
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 rounded-sm bg-white/60 hover:bg-white transition" />
                <div className="w-3 h-3 rounded-sm bg-white/40 hover:bg-white transition" />
              </div>
            </div>
          ))}
        </div>

        {/* Hint texte */}
        <p className={styles['hint-text']}>
          Explore the tools
        </p>
      </div>
    </section>
  );
}
