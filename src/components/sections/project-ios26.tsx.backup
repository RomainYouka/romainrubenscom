"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

const translations = {
  EN: {
    year: "Designed in 2025",
    title: "iOS 26 Update Vision",
    description: "iOS 26 Update is a fictional interface built into the iOS 26 update, designed to turn waiting time into an introspective and poetic moment, accessible only during system updates. The experience is optional: users can choose to take part or skip directly to the standard update screen, discovering an unexpected space with every update.\n\nPowered by Apple Intelligence, users can write a message to their future self, either freely or through a brief guided exchange. Each text is unique and editable, with past messages available for re-reading, creating a subtle link between past and present. The interface displays update progress at the bottom, kept minimal and energy-efficient, bringing a human touch to an otherwise constrained moment.",
    toolsLabel: "Tools used :"
  },
  FR: {
    year: "Conception en 2025",
    title: "iOS 26 Vision de la MàJ",
    description: "iOS 26 Update est une interface fictive intégrée à la mise à jour iOS 26, conçue pour transformer l'attente en un moment introspectif et poétique, accessible uniquement lors des mises à jour. L'expérience est facultative : l'utilisateur peut choisir d'y participer ou de passer directement à l'écran classique, découvrant ainsi un espace inattendu à chaque mise à jour.\n\nGrâce à Apple Intelligence, il peut rédiger un message à son « soi du futur », libre ou guidé par un court échange. Le texte est unique, modifiable, et le message précédent peut être relu, créant un lien entre passé et présent. L'interface affiche la progression de la mise à jour en bas, sobre et optimisée pour la batterie, humanisant un instant souvent perçu comme contraint.",
    toolsLabel: "Outils utilisés :"
  },
  ՀԱՅ: {
    year: "Նախագծված 2025-ին",
    title: "iOS 26 Թարմացման Տեսլական",
    description: "iOS 26 Update-ը հորինված միջերես է՝ ներառված iOS 26 թարմացման մեջ, նախագծված է սպասման ժամանակը ինտրոսպեկտիվ և բանաստեղծական պահի վերածելու համար, հասանելի միայն համակարգի թարմացումների ժամանակ։ Փորձառությունը կամընտիր է․ օգտատերերը կարող են ընտրել մասնակցել կամ անցնել ուղղակիորեն ստանդարտ թարմացման էկրան՝ յուրաքանչյուր թարմացմամբ հայտնաբերելով անսպասելի տարածություն։\n\nApple Intelligence-ի շնորհիվ օգտատերերը կարող են հաղորդագրություն գրել իրենց ապագա ինքնությանը՝ ազատ կամ կարճ առաջնորդված զրույցի միջոցով։ Յուրաքանչյուր տեքստ եզակի է և խմբագրելի, անցյալ հաղորդագրությունները հասանելի են կրկին կարդալու համար՝ ստեղծելով նուրբ կապ անցյալի և ներկայի միջև։ Միջերեսը ցույց է տալիս թարմացման առաջընթացը ներքևում՝ պահպանված նվազագույն և էներգախնայող, մարդկային հպում բերելով այլապես սահմանափակ պահին։",
    toolsLabel: "Օգտագործված գործիքներ՝"
  }
};

interface ProjectIOS26Props {
  language?: "EN" | "FR" | "ՀԱՅ";
}

export default function ProjectIOS26({ language = "EN" }: ProjectIOS26Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
            videoElement.play().catch(() => {});

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      videoElement.play();
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
            videoElement.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
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
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      id="ios26"
      ref={sectionRef}
      className="bg-black !w-full !h-full"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        scrollMarginTop: "80px"
      }}>

      <div className="container max-w-[1200px] mx-auto px-5 md:px-10" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          {/* Vidéo à gauche */}
          <div
            className="w-full md:w-auto md:flex-shrink-0"
            style={{
              maxWidth: "400px"
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
                preload="auto"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
                aria-label="iOS 26 Update Vision interface demonstration" />

            </div>
          </div>

          {/* Contenu texte à droite */}
          <div className="flex-1" style={{ textAlign: "left" }}>
            {/* Année */}
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

            {/* Titre */}
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

            {/* Texte descriptif */}
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

            {/* Tools used section */}
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
                }}>

                {content.toolsLabel}
              </div>

              <div className="flex items-center gap-1" style={{ paddingLeft: 0, marginLeft: 0 }}>
                {/* Sketch Logo */}
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Sans-titre-2-1-glissees-2-1762104496795.png?width=8000&height=8000&resize=contain"
                  alt="Sketch"
                  style={{
                    width: "clamp(46px, 6vw, 62px)",
                    height: "clamp(46px, 6vw, 62px)",
                    objectFit: "contain"
                  }} />


                {/* After Effects Logo */}
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Sans-titre-2-1-glissees-avec-arriere-plan-supprime-1762104480110.png?width=8000&height=8000&resize=contain"
                  alt="After Effects"
                  style={{
                    width: "clamp(46px, 6vw, 62px)",
                    height: "clamp(46px, 6vw, 62px)",
                    objectFit: "contain"
                  }} />

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle section avec les 4 mockups iPhone */}
      <div className="w-full flex items-center justify-center" style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/pkujom-1762177933577.png?width=8000&height=8000&resize=contain"
          alt="iOS 26 Update Vision screens"
          style={{
            width: "100%",
            maxWidth: "1200px",
            height: "auto",
            display: "block",
            paddingLeft: "clamp(20px, 4vw, 40px)",
            paddingRight: "clamp(20px, 4vw, 40px)"
          }}
        />
      </div>
    </section>);

}