"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectWaveSwitchProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  EN: {
    title: "Wave Switch & App",
    year: "Designed in 2025",
    paragraph1:
    "WaveSwitch is a contactless switch activated by gesture. Designed for a speculative future in 2080, where humans live with medical and aesthetic skin fungi born from global transformations, it relies on artificial intelligence to translate movement into action. Beyond the object itself, its meaning lies in the web and mobile interface: gesture customization, real-time visual feedback, and interaction tracking.",
    paragraph2:
    "This project explores the boundary between tangible objects and interactive systems, where design exists not only in physical form but in the relationship between human and machine. The switch becomes a way to question our connection to gesture, technological mediation, and the evolving domestic or work environment."
  },
  FR: {
    title: "Wave Switch & App",
    year: "Conception en 2025",
    paragraph1:
    "WaveSwitch est un interrupteur sans contact activé par geste. Conçu pour un avenir spéculatif en 2080, où les humains vivent avec des champignons cutanés médicaux et esthétiques nés des transformations mondiales, il s'appuie sur l'intelligence artificielle pour traduire le mouvement en action. Au-delà de l'objet lui-même, son sens réside dans l'interface web et mobile : personnalisation des gestes, retour visuel en temps réel et suivi des interactions.",
    paragraph2:
    "Ce projet explore la frontière entre objets tangibles et systèmes interactifs, où le design existe non seulement sous forme physique mais dans la relation entre l'humain et la machine. L'interrupteur devient un moyen de questionner notre connexion au geste, à la médiation technologique et à l'évolution de l'environnement domestique ou professionnel."
  },
  ՀԱՅ: {
    title: "Wave Switch & App",
    year: "Նախագծված 2025-ին",
    paragraph1:
    "WaveSwitch-ը շարժումներով ակտիվացվող անհպում անջատիչ է։ Նախագծված ապագայի համար՝ 2080 թվականին, երբ մարդիկ ապրում են բժշկական եւ գեղագիտական մաշկային սնկերի հետ, որոնք ծնվել են համաշխարհային փոփոխություններից, այն ապավինում է արհեստական բանականությանը՝ շարժումը գործողության վերածելու համար։ Առարկայից դուրս դրա իմաստը ընկած է վեբ եւ շարժական ինտերֆեյսում՝ ժեստերի անհատականացում, իրական ժամանակի տեսողական հետադարձ կապ եւ փոխազդեցության հետագծում։",
    paragraph2:
    "Այս նախագիծը ուսումնասիրում է նյութական առարկաների եւ ինտերակտիվ համակարգերի միջեւ սահմանը, որտեղ դիզայնը գոյություն ունի ոչ միայն ֆիզիկական ձեւով, այլեւ մարդու եւ մեքենայի միջեւ հարաբերություններում։ Անջատիչը դառնում է միջոց՝ հարցականի տակ դնելու մեր կապը ժեստի, տեխնոլոգիական միջնորդության եւ տնային կամ աշխատանքային միջավայրի զարգացման հետ։"
  }
};

export const ProjectWaveSwitch = ({ language }: ProjectWaveSwitchProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="waveswitch"
      className="w-full bg-white"
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        scrollMarginTop: "80px"
      }}>

      <div className="container max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(12px, 1.2vw, 14px)",
              fontWeight: 600,
              color: "#86868b",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "clamp(8px, 1vw, 12px)"
            }}>
            {t.year}
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              color: "#1d1d1f",
              letterSpacing: "-0.03em",
              marginBottom: "clamp(16px, 2vw, 24px)",
              lineHeight: 1.1
            }}>
            {t.title}
          </h2>

          <div
            className="max-w-[800px] mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontWeight: 400,
              color: "#1D1D1F",
              lineHeight: 1.5,
              letterSpacing: "-0.022em"
            }}>
            {t.paragraph1}
          </div>
        </div>

        {/* Responsive Feature Image */}
        <div className="mb-8 md:mb-12">
          <picture>
            <source 
              media="(max-width: 768px)" 
              srcSet="/waveswitch/features-tablet.png" 
            />
            <Image
              src="/waveswitch/features-desktop.png"
              alt="WaveSwitch Features Overview"
              width={1400}
              height={800}
              className="w-full h-auto rounded-2xl"
              quality={100}
              priority
            />
          </picture>
        </div>

        {/* Bottom Paragraph */}
        <div className="max-w-[800px] mx-auto text-center">
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontWeight: 400,
              color: "#1D1D1F",
              lineHeight: 1.5,
              letterSpacing: "-0.022em"
            }}>
            {t.paragraph2}
          </div>
        </div>
      </div>
    </section>
  );
};
