"use client";

import { useState, useEffect } from "react";

const translations = {
  FR: {
    title: "À propos de moi",
    text: "Je suis étudiant en troisième année de design industriel, spécialisé en UX/UI et design d'interaction.\nJ'explore la relation entre l'humain, la technologie et les objets qu'il utilise.\nMon approche consiste à transformer la complexité en clarté et le design en expérience.\nPour en savoir plus sur mon parcours, vous pouvez me retrouver sur LinkedIn ou télécharger mon CV.",
  },
  EN: {
    title: "About me",
    text: "I'm a third-year industrial design student specializing in UX/UI and interaction design.\nI explore the relationship between humans, technology, and the objects they use.\nMy approach is to turn complexity into clarity and design into experience.\nTo learn more about my background, you can find me on LinkedIn or download my resume.",
  },
  ՀԱՅ: {
    title: "Իմ մասին՝",
    text: "Ես արդյունաբերական դիզայնի երրորդ կուրսի ուսանող եմ՝ մասնագիտացված UX/UI և ինտերակտիվ դիզայնի ոլորտում։\nՈւսումնասիրում եմ մարդու, տեխնոլոգիայի և առօրյա օգտագործվող առարկաների փոխհարաբերությունները՝ դիտարկելով դրանց ազդեցությունը մարդու փորձառության վրա։\n\nԻմ մոտեցումն ուղղված է բարդ գործընթացների պարզեցմանը՝ դիզայնը վերածելով իրական, զգայական հարուստ փորձառության։\nԵթե ցանկանում եք ավելի խորը ծանոթանալ իմ անցած ուղղուն, կարող եք այցելել իմ LinkedIn–ը կամ ներբեռնել իմ ռեզյումեն։",
  },
};

export default function PersonalIntro({ id = "personal-intro" }: { id?: string }) {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const transitionDuration = prefersReducedMotion ? "1ms" : "200ms";

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ";
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      if (prefersReducedMotion) {
        setSelectedLanguage(event.detail);
      } else {
        setIsFading(true);
        setTimeout(() => {
          setSelectedLanguage(event.detail);
          setIsFading(false);
        }, 200);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const content = translations[selectedLanguage];

  // Split text to find LinkedIn word and make it a link
  const renderTextWithLinkedInLink = (text: string) => {
    const linkedInPattern = /LinkedIn/i;
    const parts = text.split(linkedInPattern);
    
    if (parts.length === 1) {
      return text;
    }

    return (
      <>
        {parts[0]}
        <a
          href="https://www.linkedin.com/in/romain-rubens-ba660323b/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block"
          style={{
            color: "#1d1d1f",
            textDecoration: "none",
            transition: `color ${transitionDuration} ease-in-out`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0A66C2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#1d1d1f";
          }}
          onFocus={(e) => {
            e.currentTarget.style.color = "#0A66C2";
            e.currentTarget.style.outline = "2px solid #0A66C2";
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.color = "#1d1d1f";
            e.currentTarget.style.outline = "none";
          }}
        >
          LinkedIn
          <span
            className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#0A66C2] group-hover:w-full"
            style={{
              transition: `width ${transitionDuration} ease-in-out`,
            }}
          />
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      id={id}
      className="w-full bg-white"
      style={{
        paddingTop: "clamp(160px, 15vw, 200px)",
        paddingBottom: "clamp(160px, 15vw, 200px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div className="container max-w-[1200px] mx-auto px-5 md:px-10">
        <div
          style={{
            maxWidth: "70ch",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
            opacity: isFading ? 0 : 1,
            transition: `opacity ${transitionDuration} ease-in-out`,
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 600,
              color: "#1d1d1f",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginBottom: "clamp(20px, 2.5vw, 32px)",
            }}
          >
            {content.title}
          </h2>

          {/* Text with LinkedIn link */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontWeight: 400,
              color: "#1d1d1f",
              lineHeight: 1.5,
              letterSpacing: "-0.022em",
              whiteSpace: "pre-line",
              textWrap: "pretty",
            }}
          >
            {renderTextWithLinkedInLink(content.text)}
          </div>
        </div>
      </div>
    </section>
  );
}