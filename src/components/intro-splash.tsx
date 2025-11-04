"use client";

import { useEffect, useState } from "react";

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [greeting, setGreeting] = useState({ hy: "Բարի լույս", en: "Hello", fr: "Bonjour" });

  useEffect(() => {
    // Check if splash has been shown this session
    if (typeof window !== "undefined") {
      const introSeen = sessionStorage.getItem("introSeen");
      if (introSeen === "true") {
        return;
      }

      // Determine time-based greeting using local time
      const hour = new Date().getHours();
      
      let greetingData;
      if (hour >= 0 && hour < 12) {
        // Morning: 00:00 - 11:59 → "Բարի լույս"
        greetingData = { hy: "Բարի լույս", en: "Hello", fr: "Bonjour" };
      } else if (hour >= 12 && hour < 17) {
        // Afternoon: 12:00 - 16:59 → "Բարի օր"
        greetingData = { hy: "Բարի օր", en: "Hello", fr: "Bonjour" };
      } else {
        // Evening: 17:00 - 23:59 → "Բարի երեկո"
        greetingData = { hy: "Բարի երեկո", en: "Hello", fr: "Bonsoir" };
      }
      
      setGreeting(greetingData);

      // Lock body scroll
      document.body.style.overflow = "hidden";

      // Show splash
      setIsVisible(true);

      // Auto-dismiss timer - 3.5s total duration
      const dismissTimer = setTimeout(() => {
        handleDismiss();
      }, 3500);

      return () => {
        clearTimeout(dismissTimer);
        document.body.style.overflow = "";
      };
    }
  }, []);

  const handleDismiss = () => {
    const prefersReducedMotion = typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;

    setIsAnimatingOut(true);

    if (prefersReducedMotion) {
      // Reduced motion: fade-out only
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("introSeen", "true");
        document.body.style.overflow = "";
      }, 200);
    } else {
      // Standard: slide-up reveal
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const duration = isMobile ? 600 : 750;
      
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("introSeen", "true");
        document.body.style.overflow = "";
      }, duration);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      handleDismiss();
    }
  };

  useEffect(() => {
    if (isVisible && !isAnimatingOut) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible, isAnimatingOut]);

  if (!isVisible) return null;

  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const slideDuration = isMobile ? 600 : 750;

  return (
    <>
      <noscript>
        <style>{`
          #intro-splash-overlay {
            display: none !important;
          }
        `}</style>
      </noscript>

      {/* Splash overlay - slides up like a curtain */}
      <div
        id="intro-splash-overlay"
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#535353",
          zIndex: 10000,
          transform: isAnimatingOut && !prefersReducedMotion ? "translateY(-100%)" : "translateY(0)",
          opacity: isAnimatingOut && prefersReducedMotion ? 0 : 1,
          transition: isAnimatingOut 
            ? prefersReducedMotion 
              ? "opacity 200ms ease-out" 
              : `transform ${slideDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
          willChange: prefersReducedMotion ? "opacity" : "transform",
          cursor: isAnimatingOut ? "default" : "pointer",
          pointerEvents: isAnimatingOut ? "none" : "auto",
        }}
        onClick={!isAnimatingOut ? handleDismiss : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Welcome greeting"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          {/* Armenian greeting as SVG text */}
          <svg
            width="100%"
            height="90"
            viewBox="0 0 800 90"
            style={{
              maxWidth: "90vw",
              overflow: "visible",
              shapeRendering: "geometricPrecision",
            }}
            aria-label={greeting.hy}
          >
            <text
              x="400"
              y="65"
              textAnchor="middle"
              style={{
                fontFamily: "SF Pro Display, -apple-system, system-ui, sans-serif",
                fontSize: "72px",
                fontWeight: 700,
                fill: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              {greeting.hy}
            </text>
          </svg>

          {/* English | French greetings */}
          <div
            style={{
              fontFamily: "SF Pro Display, -apple-system, system-ui, sans-serif",
              fontSize: "clamp(21px, 4vw, 28px)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span className="greeting-animate" style={{ fontWeight: 500 }}>{greeting.en}</span>
            <span style={{ 
              color: "#FFFFFF", 
              opacity: 0.6,
              fontSize: "1em",
              lineHeight: "1",
              display: "flex",
              alignItems: "center",
            }}>|</span>
            <span style={{ fontWeight: 400 }}>{greeting.fr}</span>
          </div>
        </div>

        {/* Skip link */}
        {!isAnimatingOut && (
          <button
            onClick={handleDismiss}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-200"
            style={{
              fontFamily: "SF Pro Display, -apple-system, system-ui, sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
            }}
            aria-label="Skip introduction"
          >
            Skip
          </button>
        )}
      </div>
    </>
  );
}