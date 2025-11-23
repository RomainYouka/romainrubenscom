"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

const translations = {
  FR: {
    title: "À propos de moi",
    text: "Je suis étudiant en troisième année de design industriel, spécialisé en UX/UI et design d'interaction.\nJ'explore la relation entre l'humain, la technologie et les objets qu'il utilise.\nMon approche consiste à transformer la complexité en clarté et le design en expérience.\nPour en savoir plus sur mon parcours, vous pouvez me retrouver sur LinkedIn ou télécharger mon CV.",
    cta: "Voir mes projets",
  },
  EN: {
    title: "About me",
    text: "I'm a third-year industrial design student specializing in UX/UI and interaction design.\nI explore the relationship between humans, technology, and the objects they use.\nMy approach is to turn complexity into clarity and design into experience.\nTo learn more about my background, you can find me on LinkedIn or download my resume.",
    cta: "View my projects",
  },
  ՀԱՅ: {
    title: "Իմ մասին՝",
    text: "Ես արդյունաբերական դիզայնի երրորդ կուրսի ուսանող եմ՝ մասնագիտացված UX/UI և ինտերակտիվ դիզայնի ոլորտում։\nՈւսումնասիրում եմ մարդու, տեխնոլոգիայի և առօրյա օգտագործվող առարկաների փոխհարաբերությունները՝ դիտարկելով դրանց ազդեցությունը մարդու փորձառության վրա։\n\nԻմ մոտեցումն ուղղված է բարդ գործընթացների պարզեցմանը՝ դիզայնը վերածելով իրական, զգայական հարուստ փորձառության։\nԵթե ցանկանում եք ավելի խորը ծանոթանալ իմ անցած ուղղուն, կարող եք այցելել իմ «LinkedIn»–ը կամ ներբեռնել իմ ռեզյումեն։",
    cta: "Տեսեք իմ նախագծերը",
  },
};

// PDF file mapping for downloads
const pdfFiles = {
  FR: "/resumes/RUBENS-Romain-CV.pdf",
  EN: "/resumes/RUBENS-Romain-Resume.pdf",
  ՀԱՅ: "/resumes/RUBENS-Romain-Resume.pdf"
};

const pdfFileNames = {
  FR: "RUBENS-Romain-CV.pdf",
  EN: "RUBENS-Romain-Resume.pdf",
  ՀԱՅ: "RUBENS-Romain-Resume.pdf"
};

export default function PersonalIntro({ id = "personal-intro" }: { id?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const transitionDuration = prefersReducedMotion ? "1ms" : "200ms";

  const handleCVDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2200);

    const pdfUrl = pdfFiles[selectedLanguage];
    const fileName = pdfFileNames[selectedLanguage];

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // Split text to find LinkedIn and CV/Resume links and make them clickable
  const renderTextWithLinks = (text: string) => {
    // Match LinkedIn (both "LinkedIn" and Armenian «LinkedIn»–ը)
    const linkedInPattern = /«?LinkedIn»?–?ը?/i;
    // Match CV/Resume (télécharger mon CV, download my resume, ներբեռնել իմ ռեզյումեն)
    const cvPattern = /(télécharger mon CV|download my resume|ներբեռնել իմ ռեզյումեն)/i;
    
    // Split by LinkedIn first
    const linkedInParts = text.split(linkedInPattern);
    
    if (linkedInParts.length === 1) {
      // No LinkedIn found, just look for CV/Resume
      const cvParts = text.split(cvPattern);
      if (cvParts.length === 1) {
        return text;
      }
      return (
        <>
          {cvParts[0]}
          <button
            onClick={handleCVDownload}
            disabled={isDownloading}
            style={{
              color: "#1d1d1f",
              textDecoration: "none",
              background: "none",
              border: "none",
              padding: "0",
              cursor: "pointer",
              transition: `color ${transitionDuration} ease-in-out`,
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
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
            <u>{cvParts[1]}</u>
          </button>
          {cvParts[2]}
        </>
      );
    }

    // LinkedIn found, now check for CV in the last part
    const lastPart = linkedInParts[linkedInParts.length - 1];
    const cvParts = lastPart.split(cvPattern);
    
    const linkedInLink = (
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
    );

    const cvButton = (
      <button
        onClick={handleCVDownload}
        disabled={isDownloading}
        className="group relative inline-block"
        style={{
          color: "#1d1d1f",
          textDecoration: "none",
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
          transition: `color ${transitionDuration} ease-in-out`,
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#3C3C3C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#1d1d1f";
        }}
        onFocus={(e) => {
          e.currentTarget.style.color = "#3C3C3C";
          e.currentTarget.style.outline = "2px solid #3C3C3C";
          e.currentTarget.style.outlineOffset = "2px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.color = "#1d1d1f";
          e.currentTarget.style.outline = "none";
        }}
      >
        {cvParts[1] || ""}
        <span
          className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3C3C3C] group-hover:w-full"
          style={{
            transition: `width ${transitionDuration} ease-in-out`,
          }}
        />
      </button>
    );

    if (cvParts.length === 1) {
      return (
        <>
          {linkedInParts[0]}
          {linkedInLink}
          {linkedInParts[1]}
        </>
      );
    }

    return (
      <>
        {linkedInParts[0]}
        {linkedInLink}
        {cvParts[0]}
        {cvButton}
        {cvParts[2]}
      </>
    );
  };

  return (
    <>
      {/* Main section - same as home page */}
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
        <div className="container max-w-[1200px] mx-auto px-5 md:px-10 w-full">
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

            {/* Text with LinkedIn and CV links */}
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
                marginBottom: "clamp(60px, 8vw, 80px)",
              }}
            >
              {renderTextWithLinks(content.text)}
            </div>

            {/* CTA Button - Apple/Google style with animation */}
            <button
              onClick={() => {
                router.push("/projects");
              }}
              disabled={isPending}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                fontWeight: 500,
                color: "white",
                backgroundColor: "#3C3C3C",
                border: "none",
                borderRadius: "980px",
                padding: "10px 24px",
                cursor: isPending ? "wait" : "pointer",
                transition: "opacity 100ms ease-in-out, transform 100ms ease-in-out",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                opacity: isPending ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                setIsButtonHovered(true);
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                setIsButtonHovered(false);
                e.currentTarget.style.opacity = "1";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {content.cta}
              <span
                style={{
                  fontSize: "1.1em",
                  display: "inline-block",
                  transition: "transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isButtonHovered ? "translateX(4px)" : "translateX(0)",
                }}
              >
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}