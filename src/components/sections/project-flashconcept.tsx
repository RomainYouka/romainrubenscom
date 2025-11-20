"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    description: "Le concept est un site accessible depuis un QR code présent sur l'étiquette du vêtement. Il rassemble les principales données liées à la fabrication : consommation d'eau, électricité, émissions de CO₂, matières utilisées, conditions de travail et potentiel de recyclabilité. Le site permet également de consulter une carte retraçant le parcours complet du produit, depuis l'origine des fibres jusqu'à l'assemblage final, avec des indications sur les lieux et les conditions de production. L'objectif est d'apporter davantage de transparence sur ce que représente réellement la fabrication d'un vêtement."
  },
  EN: {
    title: "FlashConcept_01",
    year: "Designed in 2025",
    collaboration: "Collaboration: Eubin Bark & Erwan Hodonou",
    description: "This concept is a website accessible via a QR code on the garment's label. It gathers key manufacturing data: water consumption, electricity usage, CO₂ emissions, materials used, working conditions, and recyclability potential. The site also features an interactive map tracing the product's complete journey, from fiber origin to final assembly, with details about production locations and conditions. The goal is to bring greater transparency to what garment manufacturing truly represents."
  },
  ՀԱՅ: {
    title: "FlashConcept_01",
    year: "Նախագծված 2025-ին",
    collaboration: "Համագործակցություն՝ Eubin Bark & Erwan Hodonou",
    description: "Այս հայեցակարգը կայք է, որին կարելի է մուտք գործել հագուստի պիտակի վրա գտնվող QR կոդի միջոցով։ Այն հավաքում է արտադրության հիմնական տվյալները՝ ջրի սպառում, էլեկտրաէներգիայի օգտագործում, CO₂ արտանետումներ, օգտագործված նյութեր, աշխատանքային պայմաններ և վերամշակման հնարավորություն։ Կայքը նաև ներառում է ինտերակտիվ քարտեզ, որը ցույց է տալիս ապրանքի ամբողջ ճանապարհորդությունը՝ մանրաթելերի սկզբից մինչև վերջնական հավաքում՝ արտադրության վայրերի և պայմանների մանրամասներով։ Նպատակն է ավելի մեծ թափանցիկություն բերել հագուստի արտադրության իրական նշանակության հարցում։"
  }
};

const flashConcept02Translations = {
  FR: {
    title: "FlashConcept_02",
    year: "Conception : 2025",
    description: "Une application mobile qui facilite la découverte d'événements culturels et sociaux à Lyon. L'interface propose une navigation intuitive entre les lieux à proximité, les discussions de groupe et les événements enregistrés. Le design met l'accent sur la lisibilité et la simplicité, avec un système de cartes de découverte inspiré des applications de rencontre, mais adapté aux sorties culturelles. Les fonctionnalités incluent la messagerie de groupe, la géolocalisation des lieux, et un système d'accessibilité complet avec modes clair/sombre et options pour les personnes daltoniennes.",
    journeyLabel: "Parcours complet de l'application"
  },
  EN: {
    title: "FlashConcept_02",
    year: "Designed in 2025",
    description: "A mobile app that makes discovering cultural and social events in Lyon effortless. The interface offers intuitive navigation between nearby venues, group discussions, and saved events. The design emphasizes readability and simplicity, featuring a discovery card system inspired by dating apps but tailored for cultural outings. Features include group messaging, venue geolocation, and comprehensive accessibility settings with light/dark modes and colorblind-friendly options.",
    journeyLabel: "Complete app journey"
  },
  ՀԱՅ: {
    title: "FlashConcept_02",
    year: "Նախագծված 2025-ին",
    description: "Մոբայլ հավելված, որը հեշտացնում է մշակույթային և սոցիալական իրադարձությունների հայտնագործումը Լիոնում։ Ինտերֆեյսն առաջարկում է ինտուիտիվ նավարկություն մոտակա վայրերի, խմբային քննարկումների և պահպանված իրադարձությունների միջև։ Դիզայնը շեշտը դնում է ընթեռնելիության և պարզության վրա՝ ներկայացնելով հայտնագործման քարտերի համակարգ, որը ոգեշնչված է ծանոթությունների հավելվածներից, բայց հարմարեցված է մշակութային դուրսգալուստների համար։ Գործառույթները ներառում են խմբային հաղորդագրություններ, վայրերի աշխարհագրական տեղորոշում և համապարփակ մատչելիության կարգավորումներ՝ բաց/մուգ ռեժիմներով և գույնի կույրության համար հարմարեցված տարբերակներով։",
    journeyLabel: "Հավելվածի ամբողջական ճանապարհորդություն"
  }
};

export default function ProjectFlashConcept({ language }: ProjectFlashConceptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isConceptVisible, setIsConceptVisible] = useState(false);
  const [isConcept02Visible, setIsConcept02Visible] = useState(false);

  const sectionContent = sectionTranslations[language];
  const concept01 = flashConcept01Translations[language];
  const concept02 = flashConcept02Translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const conceptTimer = setTimeout(() => {
      setIsConceptVisible(true);
    }, 400);

    const concept02Timer = setTimeout(() => {
      setIsConcept02Visible(true);
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(conceptTimer);
      clearTimeout(concept02Timer);
    };
  }, []);

  return (
    <section
      id="flashconcept"
      className="w-full bg-[#F5F5F7]"
      style={{
        scrollMarginTop: "80px"
      }}
    >
      {/* Section Header */}
      <div 
        className="w-full border-b border-[#D3D3D4]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s cubic-bezier(0.25,0.1,0.25,1), transform 0.6s cubic-bezier(0.25,0.1,0.25,1)"
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-16">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 600,
              color: "#1D1D1F",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              marginBottom: "clamp(8px, 1vw, 12px)"
            }}
          >
            {sectionContent.sectionTitle}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              fontWeight: 400,
              color: "#86868b",
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              maxWidth: "800px"
            }}
          >
            {sectionContent.sectionSubtitle}
          </p>
        </div>
      </div>

      {/* FlashConcept_01 */}
      <div
        style={{
          opacity: isConceptVisible ? 1 : 0,
          transform: isConceptVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.2s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.2s"
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-20">
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
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(12px, 1.5vw, 16px)"
              }}
            >
              {concept01.title}
            </h3>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: 500,
                color: "#515151",
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
                maxWidth: "900px"
              }}
            >
              {concept01.description}
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div 
              className="relative w-full overflow-hidden rounded-[12px] md:rounded-[16px] bg-black"
              style={{
                aspectRatio: "16/10"
              }}
            >
              <Image
                src="/flashconcept-01-mockup-1.png"
                alt="FlashConcept 01 - Interface mockup 1"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                style={{
                  transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)"
                }}
              />
            </div>

            <div 
              className="relative w-full overflow-hidden rounded-[12px] md:rounded-[16px] bg-black"
              style={{
                aspectRatio: "16/10"
              }}
            >
              <Image
                src="/flashconcept-01-mockup-2.png"
                alt="FlashConcept 01 - Interface mockup 2"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                style={{
                  transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)"
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FlashConcept_02 */}
      <div
        style={{
          opacity: isConcept02Visible ? 1 : 0,
          transform: isConcept02Visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.4s"
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-20 border-t border-[#D3D3D4]">
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
                fontSize: "clamp(26px, 3.5vw, 36px)",
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(16px, 2vw, 20px)"
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
                maxWidth: "900px",
                marginBottom: "clamp(24px, 3vw, 32px)"
              }}
            >
              {concept02.description}
            </p>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                fontWeight: 500,
                color: "#515151",
                lineHeight: 1.4,
                letterSpacing: "-0.01em"
              }}
            >
              {concept02.journeyLabel}
            </div>
          </div>

          {/* App Journey Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 46 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className="relative w-full overflow-hidden rounded-[8px] md:rounded-[12px] bg-[#E8E8ED] shadow-sm"
                style={{
                  aspectRatio: "9/19.5"
                }}
              >
                <Image
                  src={`https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/portfolio-images/flashconcept-02/${num}.jpg`}
                  alt={`FlashConcept 02 - Screen ${num}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  style={{
                    transition: "transform 0.3s cubic-bezier(0.25,0.1,0.25,1)"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
