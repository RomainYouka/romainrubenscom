"use client";

import { useState, useEffect } from "react";

interface ProjectFramaspaceProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  FR: {
    title: "Framaspace : Refonte visuelle axée sur l'essentiel",
    year: "La Conception : 2024",
    description:
      "Framaspace est un service open source de collaboration et de stockage en ligne. Nous avons revu l'esthétique de cet interface afin de le rendre plus interatif et plus compréhensible par ses utilisateurs. Objectif : moderniser l'interface tout en respectant l'éthique libre du projet.\n\nTravail mené sur la typographie, la palette de couleurs, la lisibilité, et la cohérence visuelle. Ce projet avait pour ambition de redonner à Framaspace une identité plus fluide et expressive, sans trahir l'esprit libre du projet.\n\nJ'ai travaillé une narration visuelle sobre mais marquante, où chaque phrase d'accroche guide l'utilisateur avec complicité. L'esthétique vient soutenir l'usage, dans une interface pensée pour être à la fois lisible, cohérente et engageante.",
    collaboration: "Collaboration : Thalia Mehio",
    appsUsed: "Outils utilisés :"
  },
  EN: {
    title: "Framaspace: Visual Redesign Focused on Essentials",
    year: "Designed in 2024",
    description:
      "Framaspace is an open-source online collaboration and storage service. We have redesigned the aesthetics of this interface to make it more interactive and understandable for its users. Objective: modernize the interface while respecting the free ethics of the project.\n\nWork carried out on typography, color palette, readability, and visual consistency. This project aimed to give Framaspace a more fluid and expressive identity, without betraying the free spirit of the project.\n\nI worked on a sober but striking visual narrative, where each tagline guides the user with complicity. Aesthetics support usage, in an interface designed to be readable, consistent and engaging.",
    collaboration: "Collaboration: Thalia Mehio",
    appsUsed: "Tools used:"
  },
  ՀԱՅ: {
    title: "Framaspace․ Վիզուալ վերանախագծում՝ կենտրոնացած էականի վրա",
    year: "Նախագծված 2024-ին",
    description:
      "Framaspace-ը բաց կոդով համագործակցության եւ պահպանման առցանց ծառայություն է։ Մենք վերանախագծել ենք այս ինտերֆեյսի գեղագիտությունը՝ այն ավելի ինտերակտիվ եւ հասկանալի դարձնելու համար օգտատերերի համար։ Նպատակ՝ արդիականացնել ինտերֆեյսը՝ հարգելով նախագծի ազատ էթիկան։\n\nԱշխատանք է իրականացվել տպագրության, գունային պալիտրայի, ընթեռնելիության եւ տեսողական հետեւողականության վրա։ Այս նախագիծը նպատակ ուներ Framaspace-ին տալ ավելի հեղուկ եւ արտահայտիչ ինքնություն՝ առանց նախագծի ազատ ոգուն դավաճանելու։\n\nԵս աշխատել եմ սոսկ բայց տպավորիչ տեսողական պատմության վրա, որտեղ յուրաքանչյուր կարգախոս ուղղորդում է օգտատիրոջը համակցությամբ։ Գեղագիտությունը աջակցում է օգտագործմանը՝ ինտերֆեյսում, որը նախագծված է ընթեռնելի, հետեւողական եւ գրավիչ լինելու համար։",
    collaboration: "Համագործակցություն՝ Thalia Mehio",
    appsUsed: "Օգտագործված գործիքներ՝"
  }
};

const appIcons = [
  {
    name: "Figma",
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Sans-titre-2-1-glissees-4-1762190296105.png?width=8000&height=8000&resize=contain"
  },
  {
    name: "Photoshop",
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Sans-titre-2-1-glissees-7-1762190299719.png?width=8000&height=8000&resize=contain"
  },
  {
    name: "InDesign",
    url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Sans-titre-2-1-glissees-3-1762190318022.png?width=8000&height=8000&resize=contain"
  }
];

export default function ProjectFramaspace({ language }: ProjectFramaspaceProps) {
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
      id="framaspace"
      className="w-full bg-black"
      style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        scrollMarginTop: "80px"
      }}
    >
      <div className="container max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          {/* Image PNG à gauche */}
          <div
            className="w-full md:w-auto md:flex-shrink-0"
            style={{
              maxWidth: "500px"
            }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/rnybtevfdcz-1762190003461.png?width=8000&height=8000&resize=contain"
              alt="Framaspace Interface Redesign"
              style={{
                width: "100%",
                height: "auto",
                display: "block"
              }}
            />
          </div>

          {/* Contenu texte à droite */}
          <div className="flex-1" style={{ textAlign: "left" }}>
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
              {t.year}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}
            >
              {t.title}
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#F5F5F7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(16px, 2vw, 24px)"
              }}
            >
              {t.description}
            </div>

            {/* Collaboration */}
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#F5F5F7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                marginBottom: "clamp(24px, 3vw, 32px)"
              }}
            >
              {t.collaboration}
            </div>

            {/* Apps Used Section */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 1.3vw, 15px)",
                  fontWeight: 500,
                  color: "#86868b",
                  letterSpacing: "-0.01em",
                  marginBottom: "clamp(8px, 1vw, 10px)",
                  paddingLeft: 0
                }}
              >
                {t.appsUsed}
              </div>
              <div className="flex items-center gap-1" style={{ paddingLeft: 0, marginLeft: 0 }}>
                {appIcons.map((app) => (
                  <img
                    key={app.name}
                    src={app.url}
                    alt={app.name}
                    style={{
                      width: "clamp(46px, 6vw, 62px)",
                      height: "clamp(46px, 6vw, 62px)",
                      objectFit: "contain"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}