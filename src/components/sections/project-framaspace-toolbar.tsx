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

  return (
    <section
      ref={sectionRef}
      className={styles['horizontal-scroll-section']}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Container avec les items empilés verticalement */}
        <div
          ref={containerRef}
          className={styles['horizontal-track']}
        >
          {/* Affiche les 7 items empilés verticalement */}
          {TOOLBAR_ITEMS.map((item) => (
            <div
              key={item.id}
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
