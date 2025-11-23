"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const translations = {
  FR: { 
    text: "Page non trouvée",
    subtitle: "404",
    button: "Retourner à l'accueil"
  },
  EN: { 
    text: "Page not found",
    subtitle: "404",
    button: "Back to home"
  },
  ՀԱՅ: { 
    text: "Էջը չի գտնվել",
    subtitle: "404",
    button: "Վերադառնալ տուն"
  }
};

export default function NotFound() {
  const [displayedText, setDisplayedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showInitialCursor, setShowInitialCursor] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fullText = translations[selectedLanguage].text;
  const buttonText = translations[selectedLanguage].button;

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ";
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setShowInitialCursor(true);
    const timer = setTimeout(() => {
      setShowInitialCursor(false);
      setIsTyping(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
      setDisplayedText("");
      setIsTyping(true);
      setShowButton(false);
      setShowInitialCursor(true);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else if (displayedText.length === fullText.length) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowButton(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [displayedText, isTyping, fullText]);

  return (
    <section className="relative w-full h-screen overflow-hidden" suppressHydrationWarning>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/fond-romain-rubens-1762169393726.png?width=8000&height=8000&resize=contain"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* 404 Code - Top */}
        <div style={{
          position: "absolute",
          top: "clamp(32px, 8vw, 80px)",
          fontSize: "clamp(14px, 2vw, 18px)",
          fontFamily: "var(--font-body)",
          color: "rgba(255, 255, 255, 0.5)",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }}>
          {translations[selectedLanguage].subtitle}
        </div>

        {/* Typing Animation Text - Center */}
        <div className="flex items-center justify-center flex-1">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 7vw, 80px)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              textAlign: "center",
              whiteSpace: "normal",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              paddingLeft: "clamp(16px, 5vw, 48px)",
              paddingRight: "clamp(16px, 5vw, 48px)",
              maxWidth: "95vw"
            }}
          >
            {mounted && showInitialCursor && !displayedText ? (
              <span style={{ animation: "blink 0.7s infinite", display: "inline", lineHeight: "inherit" }}>|</span>
            ) : mounted && displayedText ? (
              <span style={{ display: "inline", lineHeight: "inherit" }}>
                {displayedText}
                <span style={{ animation: isTyping ? "blink 0.7s infinite" : "none", opacity: isTyping ? 1 : 0, display: "inline", lineHeight: "inherit", transition: "opacity 0.1s ease", marginLeft: "-0.05em", whiteSpace: "nowrap" }}>|</span>
              </span>
            ) : (
              <span style={{ visibility: "hidden", display: "inline", lineHeight: "inherit" }}>{fullText}</span>
            )}
          </h1>
        </div>
      </div>

      {/* Back to Home Button - Bottom */}
      {mounted && showButton && (
        <Link
          href="/"
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 group"
          style={{
            animation: "fadeInAndBounce 0.6s ease-in forwards",
            background: "none",
            border: "none",
            padding: "16px",
            zIndex: 20,
            textDecoration: "none"
          }}
          aria-label="Back to home"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease"
            }}
            className="group-hover:text-white"
          >
            {buttonText}
          </span>
          <ChevronRight className="w-4 h-4" style={{ color: "rgba(255, 255, 255, 0.7)", transition: "color 0.3s ease" }} />
        </Link>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        @keyframes fadeInAndBounce {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
