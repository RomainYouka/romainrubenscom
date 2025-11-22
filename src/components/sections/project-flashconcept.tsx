"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectFlashConceptProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const sectionTranslations = {
  FR: {
    sectionTitle: "FlashConcept",
    sectionSubtitle: "Concepts UX/UI conçus rapidement à partir de contraintes et problématiques données"
  },
  EN: {
    sectionTitle: "FlashConcept",
    sectionSubtitle: "UX/UI concepts designed quickly from given constraints and challenges"
  },
  ՀԱՅ: {
    sectionTitle: "FlashConcept",
    sectionSubtitle: "UX/UI հայեցակարգեր՝ արագ նախագծված տրված սահմանափակումներից և մարտահրավերներից"
  }
};

const flashConcept01Translations = {
  FR: {
    title: "FlashConcept_01",
    year: "Conception : 2025",
    collaboration: "Collaboration : Eubin Bark & Erwan Hodonou",
    description: "Le concept est un site accessible depuis un QR code présent sur l'étiquette du vêtement. Il rassemble les principales données liées à la fabrication : consommation d'eau, électricité, émissions de CO₂, matières utilisées, conditions de travail et potentiel de recyclabilité. Le site permet également de consulter une carte retraçant le parcours complet du produit, depuis l'origine des fibres jusqu'à l'assemblage final, avec des indications sur les lieux et les conditions de production. L'objectif est d'apporter davantage de transparence sur ce que représente réellement la fabrication d'un vêtement.",
    showMoreButton: "Voir tous les écrans",
    showLessButton: "Réduire"
  },
  EN: {
    title: "FlashConcept_01",
    year: "Designed in 2025",
    collaboration: "Collaboration: Eubin Bark & Erwan Hodonou",
    description: "This concept is a website accessible via a QR code on the garment's label. It gathers key manufacturing data: water consumption, electricity usage, CO₂ emissions, materials used, working conditions, and recyclability potential. The site also features an interactive map tracing the product's complete journey, from fiber origin to final assembly, with details about production locations and conditions. The goal is to bring greater transparency to what garment manufacturing truly represents.",
    showMoreButton: "View all screens",
    showLessButton: "Show less"
  },
  ՀԱՅ: {
    title: "FlashConcept_01",
    year: "Նախագծված 2025-ին",
    collaboration: "Համագործակցություն՝ Eubin Bark & Erwan Hodonou",
    description: "Այս հայեցակարգը կայք է, որին կարելի է մուտք գործել հագուստի պիտակի վրա գտնվող QR կոդի միջոցով։ Այն հավաքում է արտադրության հիմնական տվյալները՝ ջրի սպառում, էլեկտրաէներգիայի օգտագործում, CO₂ արտանետումներ, օգտագործված նյութեր, աշխատանքային պայմաններ և վերամշակման հնարավորություն։ Կայքը նաև ներառում է ինտերակտիվ քարտեզ, որը ցույց է տալիս ապրանքի ամբողջ ճանապարհորդությունը՝ մանրաթելերի սկզբից մինչև վերջնական հավաքում՝ արտադրության վայրերի և պայմանների մանրամասներով։ Նպատակն է ավելի մեծ թափանցիկություն բերել հագուստի արտադրության իրական նշանակության հարցում։",
    showMoreButton: "Տեսնել բոլոր էկրանները",
    showLessButton: "Թաքցնել"
  }
};

const flashConcept02Translations = {
  FR: {
    title: "FlashConcept_02",
    year: "Conception : 2025",
    description: "Une application mobile qui facilite la découverte d'événements culturels et sociaux à Lyon. L'interface propose une navigation intuitive entre les lieux à proximité, les discussions de groupe et les événements enregistrés. Le design met l'accent sur la lisibilité et la simplicité, avec un système de cartes de découverte inspiré des applications de rencontre, mais adapté aux sorties culturelles. Les fonctionnalités incluent la messagerie de groupe, la géolocalisation des lieux, et un système d'accessibilité complet avec modes clair/sombre et options pour les personnes daltoniennes.",
    showMoreButton: "Voir tous les écrans",
    showLessButton: "Réduire"
  },
  EN: {
    title: "FlashConcept_02",
    year: "Designed in 2025",
    description: "A mobile app that makes discovering cultural and social events in Lyon effortless. The interface offers intuitive navigation between nearby venues, group discussions, and saved events. The design emphasizes readability and simplicity, featuring a discovery card system inspired by dating apps but tailored for cultural outings. Features include group messaging, venue geolocation, and comprehensive accessibility settings with light/dark modes and colorblind-friendly options.",
    showMoreButton: "View all screens",
    showLessButton: "Show less"
  },
  ՀԱՅ: {
    title: "FlashConcept_02",
    year: "Նախագծված 2025-ին",
    description: "Մոբայլ հավելված, որը հեշտացնում է մշակույթային և սոցիալական իրադարձությունների հայտնագործումը Լիոնում։ Ինտերֆեյսն առաջարկում է ինտուիտիվ նավարկություն մոտակա վայրերի, խմբային քննարկումների և պահպանված իրադարձությունների միջև։ Դիզայնը շեշտը դնում է ընթեռնելիության և պարզության վրա՝ ներկայացնելով հայտնագործման քարտերի համակարգ, որը ոգեշնչված է ծանոթությունների հավելվածներից, բայց հարմարեցված է մշակութային դուրսգալուստների համար։ Գործառույթները ներառում են խմբային հաղորդագրություններ, վայրերի աշխարհագրական տեղորոշում և համապարփակ մատչելիության կարգավորումներ՝ բաց/մուգ ռեժիմներով և գույնի կույրության համար հարմարեցված տարբերակներով։",
    showMoreButton: "Տեսնել բոլոր էկրանները",
    showLessButton: "Թաքցնել"
  }
};

export default function ProjectFlashConcept({ language }: ProjectFlashConceptProps) {
  const [showAllConcept01, setShowAllConcept01] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [lightboxConcept, setLightboxConcept] = useState<"01" | "02" | null>(null);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  
  const concept01ButtonRef = useRef<HTMLDivElement>(null);
  const concept02ButtonRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const concept01Ref = useRef<HTMLDivElement>(null);
  const concept02Ref = useRef<HTMLDivElement>(null);

  const sectionContent = sectionTranslations[language];
  const concept01 = flashConcept01Translations[language];
  const concept02 = flashConcept02Translations[language];

  // FlashConcept_02: Explicit image manifest (skips 9 and 26)
  const concept02Images = [
    1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    39, 40, 41, 42, 43, 44, 45, 46
  ];
  
  const initialImageCount = 4;
  const visibleConcept02Images = showAllImages 
    ? concept02Images 
    : concept02Images.slice(0, initialImageCount);
  
  const flashConcept01Images = showAllConcept01 
    ? [1, 2, 3, 4, 5, 6, 7]
    : [1, 2, 3];
  
  const currentImageIndex = lightboxImage 
    ? (lightboxConcept === "01" 
        ? flashConcept01Images.indexOf(lightboxImage)
        : visibleConcept02Images.indexOf(lightboxImage))
    : -1;
  
  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex >= 0 && (lightboxConcept === "01"
    ? currentImageIndex < flashConcept01Images.length - 1
    : currentImageIndex < visibleConcept02Images.length - 1);
  
  const handleToggleConcept01 = () => {
    if (showAllConcept01) {
      setShowAllConcept01(false);
      setTimeout(() => {
        concept01ButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    } else {
      setShowAllConcept01(true);
    }
  };
  
  const handleToggleConcept02 = () => {
    if (showAllImages) {
      setShowAllImages(false);
      setTimeout(() => {
        concept02ButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    } else {
      setShowAllImages(true);
    }
  };

  const handleImageClick = (imageNum: number, concept: "01" | "02") => {
    setLightboxImage(imageNum);
    setLightboxConcept(concept);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("flashconceptLightboxStateChange", { detail: true }));
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxConcept(null);
    document.body.style.overflow = "";
    window.dispatchEvent(new CustomEvent("flashconceptLightboxStateChange", { detail: false }));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  const goToPreviousImage = () => {
    if (lightboxConcept === "01") {
      const index = flashConcept01Images.indexOf(lightboxImage!);
      if (index > 0) setLightboxImage(flashConcept01Images[index - 1]);
    } else if (lightboxConcept === "02") {
      const index = visibleConcept02Images.indexOf(lightboxImage!);
      if (index > 0) setLightboxImage(visibleConcept02Images[index - 1]);
    }
  };

  const goToNextImage = () => {
    if (lightboxConcept === "01") {
      const index = flashConcept01Images.indexOf(lightboxImage!);
      if (index < flashConcept01Images.length - 1) setLightboxImage(flashConcept01Images[index + 1]);
    } else if (lightboxConcept === "02") {
      const index = visibleConcept02Images.indexOf(lightboxImage!);
      if (index < visibleConcept02Images.length - 1) setLightboxImage(visibleConcept02Images[index + 1]);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (concept01Ref.current) observer.observe(concept01Ref.current);
    if (concept02Ref.current) observer.observe(concept02Ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxImage) {
      setIsImageTransitioning(true);
      const timer = setTimeout(() => setIsImageTransitioning(false), 80);
      return () => clearTimeout(timer);
    }
  }, [lightboxImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === "ArrowLeft") goToPreviousImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, lightboxConcept]);

  return (
    <section
      id="flashconcept"
      className="w-full bg-white"
      style={{
        scrollMarginTop: "80px"
      }}
    >
      {/* FlashConcept_01 */}
      <div
        ref={concept01Ref}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-12 md:py-20">
          {/* Text Content */}
          <div className="mb-8 md:mb-12">
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "#86868b",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}
            >
              {concept01.year}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(16px, 2vw, 24px)"
              }}
            >
              {concept01.title}
            </h3>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 500,
                color: "#86868b",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                marginBottom: "clamp(16px, 2vw, 20px)"
              }}
            >
              {concept01.collaboration}
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(24px, 3vw, 32px)"
              }}
            >
              {concept01.description}
            </p>
          </div>

          {/* Images Grid - iPhone mockups with show more */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full" style={{ maxWidth: "900px" }}>
              {flashConcept01Images.map((num, index) => {
                const isInitial = index < 3;
                return (
                  <div 
                    key={`${num}-${index}`}
                    className="relative w-full overflow-hidden rounded-lg md:rounded-xl transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      aspectRatio: "9/19.5",
                      opacity: isInitial ? 1 : (showAllConcept01 ? 1 : 0),
                      transform: isInitial ? 'translateY(0)' : (showAllConcept01 ? 'translateY(0)' : 'translateY(20px)'),
                      transitionDelay: showAllConcept01 ? `${(index - 3) * 50}ms` : '0ms',
                      maxHeight: isInitial ? 'none' : (showAllConcept01 ? '100%' : '0'),
                    }}
                    onClick={() => handleImageClick(num, "01")}
                  >
                    <Image
                      src={`/${num}.png`}
                      alt={`FlashConcept 01 - iPhone ${num}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Show More/Less Buttons for FlashConcept_01 */}
          <div ref={concept01ButtonRef} className="flex justify-center mt-8 md:mt-12">
            {!showAllConcept01 ? (
              <button
                onClick={handleToggleConcept01}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  letterSpacing: "-0.01em"
                }}
              >
                {concept01.showMoreButton}
                <ChevronDown className="w-4 h-4 transition-none" />
              </button>
            ) : (
              <button
                onClick={handleToggleConcept01}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  letterSpacing: "-0.01em"
                }}
              >
                {concept01.showLessButton}
                <ChevronDown className="w-4 h-4 rotate-180 transition-none" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Divider between FlashConcept_01 and NameQuest */}
      <div className="border-t border-[#D3D3D4]"></div>

      {/* FlashConcept_02 */}
      <div
        ref={concept02Ref}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300"
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-12 md:py-20">
          {/* Text Content */}
          <div className="mb-8 md:mb-12">
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1.2vw, 14px)",
                fontWeight: 600,
                color: "#86868b",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1vw, 12px)"
              }}
            >
              {concept02.year}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}
            >
              {concept02.title}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(24px, 3vw, 40px)"
              }}
            >
              {concept02.description}
            </p>
          </div>

          {/* App Journey Grid - Compact with Show More */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full" style={{ maxWidth: "1100px" }}>
              {visibleConcept02Images.map((num, index) => {
                const isInitial = index < initialImageCount;
                return (
                  <div
                    key={num}
                    className="relative w-full overflow-hidden rounded-lg md:rounded-xl shadow-sm bg-[#F5F5F7] transition-all duration-500 ease-out cursor-pointer"
                    style={{
                      aspectRatio: "9/19.5",
                      opacity: isInitial ? 1 : (showAllImages ? 1 : 0),
                      transform: isInitial ? 'translateY(0)' : (showAllImages ? 'translateY(0)' : 'translateY(20px)'),
                      transitionDelay: showAllImages ? `${(index - initialImageCount) * 30}ms` : '0ms',
                      maxHeight: isInitial ? 'none' : (showAllImages ? '100%' : '0'),
                    }}
                    onClick={() => handleImageClick(num, "02")}
                  >
                    <Image
                      src={`/${num}.jpg`}
                      alt={`FlashConcept 02 - Screen ${num}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 250px"
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Show More/Less Buttons */}
          <div ref={concept02ButtonRef} className="flex justify-center mt-8 md:mt-12">
            {!showAllImages ? (
              <button
                onClick={handleToggleConcept02}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  letterSpacing: "-0.01em"
                }}
              >
                {concept02.showMoreButton}
                <ChevronDown className="w-4 h-4 transition-none" />
              </button>
            ) : (
              <button
                onClick={handleToggleConcept02}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-medium transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  letterSpacing: "-0.01em"
                }}
              >
                {concept02.showLessButton}
                <ChevronDown className="w-4 h-4 rotate-180 transition-none" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && lightboxConcept && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          {/* Image Container - stops click propagation */}
          <div 
            className="relative w-full h-full flex items-center justify-center px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxConcept === "01" ? `/${lightboxImage}.png` : `/${lightboxImage}.jpg`}
              alt="Lightbox"
              width={600}
              height={1200}
              className={`max-h-[90vh] w-auto object-contain pointer-events-none transition-opacity duration-150 ${
                isImageTransitioning ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                disabled={!canGoPrevious}
                className={`pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all duration-100 ease-out ${
                  canGoPrevious
                    ? "bg-[#F5F5F7] text-[#1D1D1F] hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
                    : "bg-[#E5E5E7] text-[#A1A1A6] cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                disabled={!canGoNext}
                className={`pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full transition-all duration-100 ease-out ${
                  canGoNext
                    ? "bg-[#F5F5F7] text-[#1D1D1F] hover:scale-[1.05] active:scale-[0.95] cursor-pointer"
                    : "bg-[#E5E5E7] text-[#A1A1A6] cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F5F7] text-[#1D1D1F] transition-all duration-100 ease-out hover:scale-[1.05] active:scale-[0.95]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
