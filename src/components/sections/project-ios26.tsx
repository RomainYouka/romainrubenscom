"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import { useBlurAnimation } from "@/hooks/useBlurAnimation";

const translations = {
  EN: {
    year: "Designed in 2025",
    title: "iOS 26 Update Vision",
    description: "iOS 26 Update is a fictional interface built into the iOS 26 update, designed to turn waiting time into a quiet and introspective moment. It appears only during the update process.\nThe experience is optional: users can choose to try it or skip straight to the classic update screen, discovering a small and unexpected space each time the system updates.\n\nWith Apple Intelligence, users can generate a personal message by answering a short custom questionnaire. The text is unique and editable, and they can also read again the message they wrote during the previous update.\n\nAt the same time, the interface shows the update progress at the bottom of the screen. It stays simple, battery friendly and unobtrusive, giving a human touch to a moment that is usually seen as forced or purely functional."
  },
  FR: {
    year: "Conception en 2025",
    title: "iOS 26 Vision de la MàJ",
    description: "iOS 26 Update est une interface fictive intégrée à la mise à jour iOS 26, conçue pour transformer l'attente en un moment introspectif et poétique, accessible uniquement lors des mises à jour. L'expérience est facultative : l'utilisateur peut choisir d'y participer ou de passer directement à l'écran classique, découvrant ainsi un espace inattendu à chaque mise à jour.\n\nGrâce à Apple Intelligence, l'utilisateur peut généré un texte en répondant à un questionnaire personnalisé. Le texte généré est unique et modifiable. L'utilisateur aussi relire son message laissé durant la précédente mise à jour. En parralèle, l'interface affiche la progression de la mise à jour en bas, sobre et optimisée pour la batterie, humanisant un instant souvent perçu comme contraint."
  },
  ՀԱՅ: {
    year: "Նախագծված 2025-ին",
    title: "iOS 26 Թարմացման Տեսլական",
    description: "iOS 26 Update-ը պատկերային միջերես է, որը ներառված է iOS 26-ի թարմացման մեջ և ստեղծված է սպասման պահը վերածելու ներհայեցողական ու պոետիկ փորձառության։ Այն հասանելի է միայն թարմացման ընթացքում։ Փորձառությունը պարտադիր չէ․ օգտատերը կարող է ընտրել մասնակցել դրան կամ անմիջապես անցնել դասական էկրանին՝ յուրաքանչյուր թարմացման հետ բացահայտելով անսպասելի մի տարածք։\n\nApple Intelligence-ի շնորհիվ օգտատերը կարող է ստեղծել տեքստ՝ պատասխանելով իրեն հատուկ կազմված հարցաշարին։ Ստացված տեքստը եզակի է և փոփոխելի։\nՕգտատերը կարող է նաև կրկին կարդալ այն հաղորդագրությունը, որը թողել էր նախորդ թարմացման ժամանակ։ Միևնույն ընթացքում միջերեսի ներքևում ցուցադրվում է թարմացման ընթացքը՝ պարզ, էներգախնայող և զուսպ ձևով, ինչը մարդկայնացնում է մի պահ, որը սովորաբար ընկալվում է որպես պարտադրող կամ սահմանափակող։"
  }
};

interface ProjectIOS26Props {
  language?: "EN" | "FR" | "ՀԱՅ";
}

export default function ProjectIOS26({ language = "EN" }: ProjectIOS26Props) {
  const { ref: blurRef, isVisible } = useBlurAnimation();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = translations[language];

  useEffect(() => {
    const videoElement = videoRef.current;
    const sectionElement = sectionRef.current;

    if (!videoElement || !sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer.observe(sectionElement);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  return (
    <section
      id="ios26"
      ref={(node) => {
        sectionRef.current = node;
        (blurRef as any).current = node;
      }}
      className={`bg-black !w-full !h-full ${isVisible ? "blur-out" : "blur-in"}`}
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        scrollMarginTop: "80px"
      }}>

      <div className="container max-w-[1200px] mx-auto px-5 md:px-10" style={{
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)"
      }}>
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-16 mb-12 md:mb-0">
          <div
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0"
            style={{
              maxWidth: "min(85vw, 400px)"
            }}>

            <div
              style={{
                width: "100%",
                borderRadius: "clamp(18px, 2.5vw, 32px)",
                overflow: "hidden",
                backgroundColor: "#000"
              }}>

              <video
                ref={videoRef}
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/RUBENS-Romain-iOS26-Update-Vision-1762103405784.mp4"
                loop
                muted
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
                aria-label="iOS 26 Update Vision interface demonstration" />

            </div>

            <div className="flex items-center justify-center gap-3" style={{ marginTop: "5px", position: "relative", zIndex: 10 }}>
              <button
                onClick={togglePlayPause}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              
              <button
                onClick={skipForward}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label="Skip forward 5 seconds"
              >
                <SkipForward className="w-4 h-4" />
                +5s
              </button>
            </div>
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
              }}>

              {content.year}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                marginBottom: "clamp(20px, 2.5vw, 32px)"
              }}>

              {content.title}
            </h2>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                fontWeight: 400,
                color: "#f5f5f7",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                marginBottom: "clamp(20px, 2.5vw, 32px)",
                whiteSpace: "pre-line"
              }}>

              {content.description}
            </div>
          </div>
        </div>
      </div>
    </section>);

}
