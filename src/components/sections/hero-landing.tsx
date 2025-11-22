"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const translations = {
  FR: "Bienvenue",
  EN: "Welcome",
  ՀԱՅ: "Բարի գալուստ"
};

export default function HeroLanding() {
  const [displayedText, setDisplayedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isTyping, setIsTyping] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const fullText = translations[selectedLanguage];

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ";
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
      setDisplayedText("");
      setIsTyping(true);
      setShowScrollButton(false);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (displayedText.length < fullText.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else if (displayedText.length === fullText.length && isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowScrollButton(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayedText, isTyping, fullText]);

  const handleScroll = () => {
    const personalIntro = document.getElementById("personal-intro");
    if (personalIntro) {
      personalIntro.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
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
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-12">
        {/* Typing Animation Text */}
        <div className="flex items-center justify-center min-h-24">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 80px)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
              minWidth: "200px"
            }}
          >
            {displayedText}
            {isTyping && (
              <span
                style={{
                  animation: "blink 0.7s infinite",
                  marginLeft: "8px"
                }}
              >
                |
              </span>
            )}
          </h1>
        </div>

        {/* Scroll Down Button */}
        {showScrollButton && (
          <button
            onClick={handleScroll}
            className="flex flex-col items-center justify-center gap-2 animate-bounce cursor-pointer transition-all duration-300 hover:scale-110"
            style={{
              animation: "fadeIn 0.6s ease-in forwards"
            }}
            aria-label="Scroll down to continue"
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.7)",
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}
            >
              Descendre
            </span>
            <ChevronDown className="w-5 h-5" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
          </button>
        )}
      </div>

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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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
