"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectVahanProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const translations = {
  FR: {
    title: "Article d'Artiste",
    year: "Conception : 2024",
    description: "La réalisation de cet article sur Vahan Soghomonian, un artiste aux pratiques multiples mêle poésie, musique, photographie et installation. Son univers navigue entre héritage arménien, des récits personnels et expérimentations sensibles. Le projet met en lumière une œuvre profondément ancrée dans le réel et l'imaginaire, entre mémoire et création contemporaine.\n\nCette publication repose sur une interview menée avec l'artiste, enrichie par des archives, des photographies documentaires et une mise en page bilingue français-arménien. Le travail éditorial interroge la transmission artistique à travers un format hybride, entre récit et analyse visuelle.\n\nL'usage de l'arménien constitue à la fois un hommage à l'héritage de l'artiste et un geste personnel, traduisant un lien culturel partagé et un dialogue entre mémoire et création.",
    collaboration: "Interview réalisée par : Matis Sophiyair-Landais & Romain Rubens\nConception Graphique : Romain Rubens",
    viewAllScreens: "Voir toutes les pages",
    viewLess: "Réduire"
  },
  EN: {
    title: "Artist Article",
    year: "Designed in 2024",
    description: "This article about Vahan Soghomonian, an artist whose practice spans poetry, music, photography and installation, explores a universe shaped by Armenian heritage, personal narratives and sensitive experimentation. His work moves between reality and imagination, grounding contemporary creation in memory and lived experience.\n\nThe publication is built around an interview conducted with the artist, enriched with archives, documentary photographs and a bilingual French-Armenian layout. The editorial approach examines artistic transmission through a hybrid format that combines storytelling and visual analysis.\n\nThe use of Armenian is both a tribute to the artist's heritage and a personal gesture, reflecting a shared cultural connection and a dialogue between memory and creation.",
    collaboration: "Interview conducted by: Matis Sophiyair-Landais & Romain Rubens\nGraphic Design: Romain Rubens",
    viewAllScreens: "View all pages",
    viewLess: "Show less"
  },
  ՀԱՅ: {
    title: "Արտիստի Հոդված",
    year: "Նախագծված 2024-ին",
    description: "Այս հոդվածը վերաբերում է Վահան Սողոմոնյանին՝ արվեստագետ, որի գործունեությունը ընդգրկում է բանաստեղծություն, երաժշտություն, լուսանկար և ինստալյացիա։ Հոդվածը բացահայտում է մի աշխարհ, որը ձևավորվում է հայկական ժառանգության, անձնական պատմությունների և զգայական փորձարկումների միջոցով։ Նրա ստեղծագործությունը շարժվում է իրականության և երևակայության միջև՝ ժամանակակից արվեստը հիմնավորելով հիշողության և ապրած փորձի վրա։\n\nՀրապարակումը կառուցված է արվեստագետի հետ անցկացված հարցազրույցի շուրջ՝ հարստացված արխիվային նյութերով, փաստավավերագրական լուսանկարներով և ֆրանսերեն–հայերեն երկլեզու ձևաորությամբ։ Խմբագրական մոտեցումը ուսումնասիրում է արվեստի փոխանցման գործընթացը՝ օգտագործելով հիբրիդային ձևաչափ, որը միավորում է պատմողական շերտերը և տեսողական վերլուծությունը։\n\nՀայերենի կիրառումը միաժամանակ հարգանքի տուրք է արվեստագետի ժառանգությանը և անձնական ժեստ՝ արտահայտող ընդհանուր մշակութային կապը և հիշողության ու ստեղծագործության միջև ձևավորվող երկխոսությունը։",
    collaboration: "Հարցազրույց անցկացրել են՝ Matis Sophiyair-Landais & Romain Rubens\nԳրաֆիկական Դիզայն՝ Romain Rubens",
    viewAllScreens: "Տեսնել բոլոր էջերը",
    viewLess: "Թաքցնել"
  }
};

const vahanImages = [
  "1", "2", "3", "4", "5", "6"
];

export default function ProjectVahanSoghomonian({ language }: ProjectVahanProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const t = translations[language];
  const visibleImages = showAllImages ? vahanImages : vahanImages.slice(0, 1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (imageNum: string) => {
    if (!showAllImages) {
      setShowAllImages(true);
    }
    setLightboxImage(imageNum);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  };

  const goToPreviousImage = () => {
    if (!lightboxImage) return;
    const currentIndex = vahanImages.indexOf(lightboxImage);
    if (currentIndex > 0) {
      setLightboxImage(vahanImages[currentIndex - 1]);
    }
  };

  const goToNextImage = () => {
    if (!lightboxImage) return;
    const currentIndex = vahanImages.indexOf(lightboxImage);
    if (currentIndex < vahanImages.length - 1) {
      setLightboxImage(vahanImages[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      if (e.key === "ArrowLeft") goToPreviousImage();
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  const currentImageIndex = lightboxImage ? vahanImages.indexOf(lightboxImage) : -1;
  const canGoPrevious = currentImageIndex > 0;
  const canGoNext = currentImageIndex >= 0 && currentImageIndex < vahanImages.length - 1;

  return (
    <section
      id="vahan-soghomonian"
      className="w-full bg-white"
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
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-16">
          <div className="w-full md:w-[45%] lg:w-[50%]">
            <div className="space-y-4">
              {visibleImages.map((imageNum, idx) => (
                <div
                  key={imageNum}
                  className="cursor-pointer overflow-hidden rounded-lg bg-gray-100 hover:opacity-80 transition-opacity"
                  onClick={() => handleImageClick(imageNum)}
                  style={{
                    aspectRatio: imageNum === "1" ? "9/12" : "2/1",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease, transform 0.6s ease`,
                    transitionDelay: `${(idx + 1) * 50}ms`
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image {imageNum}</span>
                  </div>
                </div>
              ))}
            </div>

            {vahanImages.length > 1 && (
              <button
                onClick={() => setShowAllImages(!showAllImages)}
                ref={el => el?.style.setProperty('margin-top', 'clamp(20px, 2.5vw, 32px)')}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.1vw, 15px)",
                  fontWeight: 500,
                  color: "#1D1D1F",
                  backgroundColor: "#F5F5F7",
                  padding: "clamp(12px, 1.2vw, 16px) clamp(20px, 2vw, 28px)",
                  border: "1px solid #E8E8ED",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                  marginTop: "clamp(20px, 2.5vw, 32px)"
                }}
              >
                {showAllImages ? t.viewLess : t.viewAllScreens}
              </button>
            )}
          </div>

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
                color: "#424245",
                lineHeight: 1.6,
                marginBottom: "clamp(32px, 4vw, 48px)",
                whiteSpace: "pre-wrap"
              }}
            >
              {t.description}
            </div>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                color: "#86868b",
                lineHeight: 1.8,
                whiteSpace: "pre-wrap"
              }}
            >
              {t.collaboration}
            </div>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[1001]"
          >
            <X size={32} />
          </button>

          <div className="flex items-center justify-between w-full max-h-[90vh]">
            {canGoPrevious && (
              <button
                onClick={goToPreviousImage}
                className="text-white hover:text-gray-300 transition-colors ml-4"
              >
                <ChevronLeft size={40} />
              </button>
            )}

            <div className="flex-1 flex items-center justify-center max-h-[85vh]">
              <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center p-4"
                style={{
                  width: lightboxImage === "1" ? "auto" : "80vw",
                  height: lightboxImage === "1" ? "auto" : "auto",
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  aspectRatio: lightboxImage === "1" ? "9/12" : "2/1"
                }}>
                <span className="text-gray-200 text-lg">Image {lightboxImage}</span>
              </div>
            </div>

            {canGoNext && (
              <button
                onClick={goToNextImage}
                className="text-white hover:text-gray-300 transition-colors mr-4"
              >
                <ChevronRight size={40} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
