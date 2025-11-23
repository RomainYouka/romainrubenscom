"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const translations = {
  FR: { text: "Hello, moi c'est Romain Rubens", button: "Descendre" },
  EN: { text: "Hello, I'm Romain Rubens", button: "Scroll Down" },
  ՀԱՅ: { text: "Ողջույն, ես Ռոման Ռուբենս եմ", button: "ԻՋՆԵԼ" }
};

export default function HeroLanding() {
  const [displayedText, setDisplayedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [showInitialCursor, setShowInitialCursor] = useState(false);

  const fullText = translations[selectedLanguage].text;
  const buttonText = translations[selectedLanguage].button;

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ";
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const checkSplashDone = () => {
      const introSeen = sessionStorage.getItem("introSeen");
      if (introSeen === "true") {
        setSplashDone(true);
        setShowInitialCursor(true);
      }
    };

    checkSplashDone();
    const interval = setInterval(checkSplashDone, 100);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!splashDone) {
        setSplashDone(true);
        setShowInitialCursor(true);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [splashDone]);

  useEffect(() => {
    if (!showInitialCursor) return;
    
    const timer = setTimeout(() => {
      setShowInitialCursor(false);
      setIsTyping(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [showInitialCursor]);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
      setDisplayedText("");
      setIsTyping(true);
      setShowScrollButton(false);
      setShowInitialCursor(true);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!splashDone || !isTyping) return;

    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else if (displayedText.length === fullText.length) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowScrollButton(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayedText, isTyping, fullText, splashDone]);

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
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
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
              opacity: splashDone ? 1 : 0,
              transition: "opacity 0.6s ease",
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
            {showInitialCursor && !displayedText ? (
              <span style={{ animation: "blink 0.7s infinite", display: "inline", lineHeight: "inherit" }}>|</span>
            ) : displayedText ? (
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

      {/* Scroll Down Button - Bottom */}
      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110"
          style={{
            animation: "fadeInAndBounce 0.6s ease-in forwards",
            background: "none",
            border: "none",
            padding: "16px",
            zIndex: 20
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
            {buttonText}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
        </button>
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
