"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward } from "lucide-react";

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
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoContainer1 = useRef<HTMLDivElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoContainer2 = useRef<HTMLDivElement>(null);

  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const videoElement1 = videoRef1.current;
    const container1 = videoContainer1.current;

    if (!videoElement1 || !container1) return;

    // Observer pour la première vidéo
    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            videoElement1.play().catch(() => {});
            setIsPlaying1(true);
          } else {
            videoElement1.pause();
            setIsPlaying1(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer1.observe(container1);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement1.pause();
        setIsPlaying1(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer1.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayPause1 = () => {
    const videoElement = videoRef1.current;
    if (!videoElement) return;
    
    if (isPlaying1) {
      videoElement.pause();
      setIsPlaying1(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying1(true);
    }
  };

  const skipForward1 = () => {
    const videoElement = videoRef1.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

  useEffect(() => {
    const videoElement2 = videoRef2.current;
    const container2 = videoContainer2.current;

    if (!videoElement2 || !container2) return;

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            videoElement2.play().catch(() => {});
            setIsPlaying2(true);
          } else {
            videoElement2.pause();
            setIsPlaying2(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1],
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    observer2.observe(container2);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement2.pause();
        setIsPlaying2(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer2.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayPause2 = () => {
    const videoElement = videoRef2.current;
    if (!videoElement) return;
    
    if (isPlaying2) {
      videoElement.pause();
      setIsPlaying2(false);
    } else {
      videoElement.play().catch(() => {});
      setIsPlaying2(true);
    }
  };

  const skipForward2 = () => {
    const videoElement = videoRef2.current;
    if (!videoElement) return;
    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
  };

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
        {/* Section 1: iPhone mockup à gauche + texte à droite */}
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 md:gap-16 mb-16 md:mb-24">
          {/* Vidéo iPhone à gauche */}
          <div
            ref={videoContainer1}
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0"
            style={{
              maxWidth: "min(85vw, 400px)"
            }}>

            <div
              style={{
                width: "100%",
                overflow: "hidden"
              }}>

              <video
                ref={videoRef1}
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/4730AC9B-6273-4BD0-A10F-373F327D9B3B-1762106663715.mp4"
                loop
                muted
                playsInline
                preload="auto"
                aria-label="Wave Switch app interface demonstration" className="!w-full !h-full !max-w-full" />

            </div>

            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={togglePlayPause1}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label={isPlaying1 ? "Pause" : "Play"}
              >
                {isPlaying1 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying1 ? "Pause" : "Play"}
              </button>
              
              <button
                onClick={skipForward1}
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
              }}>

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
              }}>

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
                marginBottom: "clamp(24px, 3vw, 32px)"
              }}>

              {t.paragraph1}
            </div>
          </div>
        </div>

        {/* Section 2: Mockup video on the right with text on the left - aligned with Section 1 */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-16 md:mb-24 mt-12 md:mt-16">
          {/* Texte à gauche - flex-shrink-0 avec même largeur que mockup section 1 */}
          <div
            className="w-full md:w-auto md:flex-shrink-0 mx-auto md:mx-0 flex flex-col items-center md:items-start justify-center"
            style={{
              maxWidth: "min(85vw, 400px)"
            }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                fontWeight: 400,
                color: "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.022em",
                textAlign: "left",
                width: "100%"
              }}>
              {t.paragraph2}
            </div>
          </div>

          {/* Vidéo à droite avec boutons - flex-1 comme texte section 1 */}
          <div
            ref={videoContainer2}
            className="w-full md:flex-1 flex flex-col items-center"
            style={{
              maxWidth: "100%"
            }}>

            {/* Video sur desktop, image responsive sur mobile */}
            <div
              style={{
                width: "100%",
                maxWidth: "min(100%, 450px)",
                overflow: "hidden",
                backgroundColor: "transparent"
              }}>

              {/* Desktop: Video */}
              <video
                ref={videoRef2}
                src="/waveswitch/mockup waveswitch_2.mp4"
                loop
                muted
                playsInline
                preload="auto"
                aria-label="Wave Switch mockup demonstration" 
                className="!w-full !h-full !max-w-full hidden md:block" />

              {/* Mobile/Tablet: Image de remplacement */}
              <img
                src="/waveswitch/tablet_mockup.png"
                alt="Wave Switch mockup features"
                className="!w-full !h-full !max-w-full md:hidden"
                style={{
                  display: "block",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Boutons d'actions alignés au centre du mockup - visible seulement sur desktop */}
            <div className="hidden md:flex items-center justify-center gap-3 mt-5">
              <button
                onClick={togglePlayPause2}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] font-medium text-sm transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-body)"
                }}
                aria-label={isPlaying2 ? "Pause" : "Play"}
              >
                {isPlaying2 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying2 ? "Pause" : "Play"}
              </button>
              
              <button
                onClick={skipForward2}
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
        </div>

      </div>
    </section>);

};