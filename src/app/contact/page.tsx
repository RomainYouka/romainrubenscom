"use client";

import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

const contactTranslations = {
  FR: {
    heading: "Contactez-moi facilement.",
    subheading: "",
    button1: "Mon e-mail",
    button2: "Voir mon LinkedIn",
    emailAriaLabel: "Envoyer un e-mail à Romain Rubens",
    linkedinAriaLabel: "Ouvrir le profil LinkedIn de Romain Rubens",
    emailTooltip: "Envoyer un e-mail à Romain Rubens",
    toastMessage: "Action lancée.",
  },
  EN: {
    heading: "Get in touch",
    subheading: "",
    button1: "My Email",
    button2: "View my LinkedIn",
    emailAriaLabel: "Send an email to Romain Rubens",
    linkedinAriaLabel: "Open Romain Rubens's LinkedIn profile",
    emailTooltip: "Send an email to Romain Rubens",
    toastMessage: "Action started.",
  },
  ՀԱՅ: {
    heading: "Միացեք ինձ։",
    subheading: "",
    button1: "Իմ էլ.փոստը",
    button2: "Բացել իմ LinkedIn",
    emailAriaLabel: "Ուղարկել էլ․փոստ Ռոմեն Ռուբենսին",
    linkedinAriaLabel: "Բացել Ռոմեն Ռուբենսի LinkedIn պրոֆիլը",
    emailTooltip: "Ուղարկել նամակ Ռոմեն Ռուբենսին",
    toastMessage: "Գործողությունը մեկնարկել է։",
  },
};

const Toast = ({ message, isVisible }: { message: string; isVisible: boolean }) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm font-medium text-[#1A1A1A] bg-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all z-50 ${
        isVisible
          ? "opacity-100 translate-y-0 duration-180"
          : "opacity-0 translate-y-2 pointer-events-none duration-180"
      }`}
      style={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {message}
    </div>
  );
};

// Gmail logo SVG - official multicolor style
const GmailLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 4H2C0.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-10 6L2 8V6l10 6 10-6v2z" fill="currentColor" />
  </svg>
);

// LinkedIn logo SVG
const LinkedInLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ContactPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [isVisible, setIsVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [emailValidating, setEmailValidating] = useState(false);
  const [linkedInValidating, setLinkedInValidating] = useState(false);

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !contactTranslations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent<"FR" | "EN" | "ՀԱՅ">) => {
      setSelectedLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const currentTranslations = contactTranslations[selectedLanguage];

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  };

  const handleEmailClick = () => {
    setEmailValidating(true);
    setTimeout(() => {
      setEmailValidating(false);
    }, 2200);
    window.location.href =
      "mailto:hello@romainrubens.com?subject=Contact — romainrubens.com";
  };

  const handleLinkedInClick = () => {
    setLinkedInValidating(true);
    setTimeout(() => {
      setLinkedInValidating(false);
    }, 2200);
    window.open("https://www.linkedin.com/in/romain-rubens-ba660323b/", "_blank", "noopener,noreferrer");
  };

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const transitionDuration = prefersReducedMotion ? '1ms' : '280ms';

  return (
    <main
      className="min-h-screen bg-[#FFFFFF] pt-16"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
      }}
    >
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 md:py-32 bg-[#F5F5F7] border-t border-[#D3D3D4]" style={{ paddingBottom: "clamp(48px, 8vw, 96px)" }}>
        {/* Dégradés multiples pour un effet moderne */}
        {/* Dégradé principal - coin supérieur droit */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-300/40 via-pink-200/30 to-transparent pointer-events-none z-0 blur-3xl" />
        
        {/* Dégradé secondaire - coin inférieur gauche */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/30 via-blue-200/20 to-transparent pointer-events-none z-0 blur-3xl" />
        
        {/* Dégradé subtil - centre droit */}
        <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-gradient-to-l from-amber-200/25 to-transparent pointer-events-none z-0 blur-2xl" />
        
        <div className="relative z-20 w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <h1
              className={`font-bold text-[#515151] leading-[1.07] max-w-[90vw] md:max-w-none transition-all duration-[360ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              }`}
              style={{
                fontSize: "clamp(32px, 7vw, 56px)",
                transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
                transitionDelay: "60ms",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60px",
                textWrap: "balance",
              }}
            >
              {currentTranslations.heading}
            </h1>

            <p
              className={`text-[clamp(16px,3.5vw,20px)] font-normal text-[#86868B] max-w-[700px] leading-[1.4] transition-all duration-[360ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
                transitionDelay: "120ms",
                marginTop: "clamp(12px, 2vw, 16px)",
                marginBottom: "clamp(16px, 2.5vw, 24px)",
                textAlign: "center",
                textWrap: "balance",
              }}
            >
              {currentTranslations.subheading}
            </p>

            <div
              className={`flex flex-col-reverse md:flex-row items-center justify-center gap-3 md:gap-4 w-full md:w-auto transition-all duration-[280ms] ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
                transitionDelay: "180ms",
              }}
            >
              {/* Email Button - Gmail Style */}
              <button
                onClick={handleEmailClick}
                disabled={emailValidating}
                aria-label={currentTranslations.emailAriaLabel}
                title={currentTranslations.emailTooltip}
                className="group relative inline-flex items-center justify-center gap-2 w-full md:w-[280px] h-[56px] px-10 py-[14px] bg-white text-[#1D1D1F] font-medium text-base rounded-[50px] border border-[#86868B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EA4335] focus-visible:outline-offset-2 active:scale-[0.98] overflow-visible transition-all duration-[160ms] ease-in-out disabled:cursor-not-allowed"
                style={{
                  width: "min(320px, 88vw)",
                }}
              >
                {/* Inner border on hover */}
                <span 
                  className="absolute inset-[4px] rounded-[46px] border-[1px] border-[#EA4335] opacity-0 group-hover:opacity-100 transition-opacity duration-[200ms] ease-in-out pointer-events-none"
                />
                
                <GmailLogo className="w-4 h-4 flex-shrink-0 text-[#1D1D1F] group-hover:text-[#EA4335] transition-colors duration-[160ms] ease-in-out" />
                <span className="whitespace-nowrap" style={{ lineHeight: "1.2" }}>
                  {currentTranslations.button1.includes("Email") ? (
                    <>
                      {currentTranslations.button1.split("Email")[0]}
                      <span className="group-hover:underline group-hover:decoration-[#EA4335] group-hover:underline-offset-2 transition-all duration-[160ms] ease-in-out">Email</span>
                      {currentTranslations.button1.split("Email")[1]}
                    </>
                  ) : currentTranslations.button1.includes("e-mail") ? (
                    <>
                      {currentTranslations.button1.split("e-mail")[0]}
                      <span className="group-hover:underline group-hover:decoration-[#EA4335] group-hover:underline-offset-2 transition-all duration-[160ms] ease-in-out">e-mail</span>
                      {currentTranslations.button1.split("e-mail")[1]}
                    </>
                  ) : currentTranslations.button1.includes("փոստ") ? (
                    <>
                      {currentTranslations.button1.split("փոստ")[0]}
                      <span className="group-hover:underline group-hover:decoration-[#EA4335] group-hover:underline-offset-2 transition-all duration-[160ms] ease-in-out">փոստ</span>
                      {currentTranslations.button1.split("փոստ")[1]}
                    </>
                  ) : (
                    currentTranslations.button1
                  )}
                </span>
                
                {/* Validation state - visual only with checkmark pulse */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center gap-2 bg-white rounded-[50px] transition-opacity ${
                    emailValidating ? 'opacity-100 duration-[200ms]' : 'opacity-0 duration-[180ms] pointer-events-none'
                  }`}
                >
                  <span className="absolute inset-[4px] rounded-[46px] border-[1px] border-[#EA4335]" />
                  <Check 
                    className="w-5 h-5 text-[#EA4335]" 
                    strokeWidth={2.5} 
                  />
                </div>
              </button>

              {/* LinkedIn Button */}
              <button
                onClick={handleLinkedInClick}
                disabled={linkedInValidating}
                aria-label={currentTranslations.linkedinAriaLabel}
                className="group relative inline-flex items-center justify-center gap-2 w-full md:w-[280px] h-[56px] px-10 py-[14px] bg-white text-[#1D1D1F] font-medium text-base rounded-[50px] border border-[#86868B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A66C2] focus-visible:outline-offset-2 active:scale-[0.98] overflow-visible transition-all duration-[160ms] ease-in-out disabled:cursor-not-allowed"
                style={{
                  width: "min(320px, 88vw)",
                }}
              >
                {/* Inner border on hover */}
                <span 
                  className="absolute inset-[4px] rounded-[46px] border-[1px] border-[#0A66C2] opacity-0 group-hover:opacity-100 transition-opacity duration-[200ms] ease-in-out pointer-events-none"
                />
                
                <LinkedInLogo className="w-4 h-4 flex-shrink-0 text-[#1D1D1F] group-hover:text-[#0A66C2] transition-colors duration-[160ms] ease-in-out" />
                <span className="whitespace-nowrap" style={{ lineHeight: "1.2" }}>
                  {currentTranslations.button2.includes("LinkedIn") ? (
                    <>
                      {currentTranslations.button2.split("LinkedIn")[0]}
                      <span className="group-hover:underline group-hover:decoration-[#0A66C2] group-hover:underline-offset-2 transition-all duration-[160ms] ease-in-out">LinkedIn</span>
                      {currentTranslations.button2.split("LinkedIn")[1]}
                    </>
                  ) : (
                    currentTranslations.button2
                  )}
                </span>
                
                {/* Validation state - visual only with checkmark */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center gap-2 bg-white rounded-[50px] transition-opacity ${
                    linkedInValidating ? 'opacity-100 duration-[200ms]' : 'opacity-0 duration-[180ms] pointer-events-none'
                  }`}
                >
                  <span className="absolute inset-[4px] rounded-[46px] border-[1px] border-[#0A66C2]" />
                  <Check 
                    className="w-5 h-5 text-[#0A66C2]" 
                    strokeWidth={2.5} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Toast message={toastMessage} isVisible={toastVisible} />
    </main>
  );
}