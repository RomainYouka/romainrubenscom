"use client";

import { useState, useEffect } from "react";

interface ProjectNameQuestProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  EN: {
    title: "Name Quest - Educational Board Game on Last Names",
    year: "Designed in 2025",
    description:
      "NameQuest is an educational and inclusive board game that addresses discrimination linked to last names through a 55-square journey across different countries. Made up of individual, collective, and trap cards, the game blends anecdotes, general knowledge questions, and real-life situations.\n\nDesigned for 2 to 6 players, it encourages reflection and dialogue in a playful, accessible setting, featuring a colorful design, laser-cut tokens, and a strong cultural dimension.",
    contextText: "The project stems from a simple observation: a family name is never neutral. It reveals a history, an origin, and a heritage. It can be a source of pride but also of prejudice. Today, many people still experience discrimination linked to their name, whether in administrative procedures, school environments, or everyday interactions. Faced with these realities, the goal is to imagine an inclusive educational tool, capable of fostering an honest, playful, and accessible conversation around identity."
  },
  FR: {
    title: "Name Quest - Jeu de Société Éducatif sur les Noms de Famille",
    year: "Conception : 2025",
    description:
      "NameQuest est un jeu de société éducatif et inclusif, abordant les discriminations liées aux noms de famille à travers un parcours de 55 cases représentant différents pays. Composé de cartes individuelles, collectives et pièges, le jeu mêle anecdotes, questions de culture générale et situations vécues.\n\nPensé pour 2 à 6 joueurs, il invite à la réflexion et au dialogue dans un cadre ludique et accessible, avec un design coloré, des pions en découpe laser, et une forte dimension culturelle.",
    contextText: "Le projet part d'un constat simple : le nom de famille n'est jamais neutre. Il révèle une histoire, une origine et un héritage. Il peut être source de fierté mais aussi de préjugés. Certaines personnes témoignent encore aujourd'hui de discriminations liées à leur nom, que ce soit dans les démarches administratives, dans le milieu scolaire ou dans les interactions du quotidien. Face à ces constats, l'objectif est d'imaginer un support pédagogique inclusif, capable de provoquer une conversation honnête, ludique et accessible autour de l'identité."
  },
  ՀԱՅ: {
    title: "Name Quest - Կրթական Սեղանի Խաղ Ազգանունների Մասին",
    year: "Նախագծված 2025-ին",
    description:
      "NameQuest-ը կրթական և ներառական սեղանի խաղ է, որը անդրադառնում է ազգանունների հետ կապված խտրականությանը 55 վանդակից բաղկացած ուղևորության միջոցով՝ ներկայացնելով տարբեր երկրներ։ Բաղկացած է անհատական, կոլեկտիվ և թակարդային քարտերից, խաղը համատեղում է անեկդոտներ, ընդհանուր գիտելիքների հարցեր և իրական իրավիճակներ։\n\nՆախագծված 2-ից 6 խաղացողների համար, այն խրախուսում է մտորումներ և երկխոսություն խաղային, մատչելի միջավայրում՝ գունեղ դիզայնով, լազերային կտրված տոկենով և ուժեղ մշակութային չափով։",
    contextText: "Նախագիծը սկսվում է պարզ դիտարկումից՝ ազգանունը երբեք չեզոք չէ։ Այն բացահայտում է պատմություն, ծագումը և ժառանգությունը։ Այն կարող է լինել հպարտության աղբյուր, բայց նաև կանխակալության։ Այսօր շատ մարդիկ շարունակում են տառապել իրենց ազգանունի հետ կապված խտրականությամբ՝ լինի դա վարչական ընթացակարգեր, դպրոցական միջավայր կամ առօրյա փոխազդեցություն։ Այս իրականությունների դեմ, նպատակն է պատկերել ներառական կրթական գործիք, որը ունակ է խթանել անկեղծ, խաղային և մատչելի զրույց ինքնության շուրջ։"
  }
};

export default function ProjectNameQuest({ language }: ProjectNameQuestProps) {
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
      id="namequest"
      className="w-full bg-[#F5F5F7]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        scrollMarginTop: "80px"
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-stretch gap-0 md:gap-0">
          {/* Image PNG à gauche */}
          <div
            className="w-full md:w-[45%] lg:w-[50%] xl:flex-shrink-0 xl:!w-[650px] xl:!max-w-[650px]"
            style={{
              maxWidth: "100%",
              display: "flex",
              alignItems: "flex-start"
            }}
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/eeeeeeeeee-1762112535901.png?width=8000&height=8000&resize=contain"
              alt="NameQuest Board Game"
              className="!w-full md:!h-auto xl:!h-full"
              style={{
                objectFit: "contain",
                objectPosition: "center top"
              }}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (window.innerWidth >= 1280) {
                  img.style.objectFit = "cover";
                  img.style.objectPosition = "center top";
                }
              }}
            />
          </div>

          {/* Contenu texte à droite */}
          <div
            className="flex-1 px-5 md:px-6 lg:px-10 flex flex-col justify-center"
            style={{
              textAlign: "left",
              paddingTop: "clamp(48px, 6vw, 80px)",
              paddingBottom: "clamp(48px, 6vw, 80px)"
            }}
          >
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
                color: "#1D1D1F",
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
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                whiteSpace: "pre-line",
                marginBottom: "clamp(24px, 3vw, 40px)"
              }}
            >
              {t.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
