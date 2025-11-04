"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const projectsData = {
  FR: [
  {
    id: "ios26",
    title: "iOS 26 Interface",
    description: "Redesign conceptuel de l'interface iOS avec une approche minimaliste",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-1762162976974.png?width=8000&height=8000&resize=contain",
    color: "#000000"
  },
  {
    id: "waveswitch",
    title: "Wave Switch",
    description: "Interrupteur sans contact activé par geste, accompagné de son application connectée",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-1762162976977.png?width=8000&height=8000&resize=contain",
    color: "#F5F5F7"
  },
  {
    id: "namequest",
    title: "NameQuest",
    description: "Jeu de société éducatif et inclusif abordant les discriminations liées aux noms de famille",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-1762162977007.png?width=8000&height=8000&resize=contain",
    color: "#000000"
  }],

  EN: [
  {
    id: "ios26",
    title: "iOS 26 Interface",
    description: "Conceptual redesign of iOS interface with a minimalist approach",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-1762162976974.png?width=8000&height=8000&resize=contain",
    color: "#000000"
  },
  {
    id: "waveswitch",
    title: "Wave Switch",
    description: "Contactless switch activated by gesture, accompanied by its connected application",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-1762162976977.png?width=8000&height=8000&resize=contain",
    color: "#F5F5F7"
  },
  {
    id: "namequest",
    title: "NameQuest",
    description: "Educational and inclusive board game addressing discrimination related to family names",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-1762162977007.png?width=8000&height=8000&resize=contain",
    color: "#000000"
  }],

  ՀԱՅ: [
  {
    id: "ios26",
    title: "iOS 26 Interface",
    description: "iOS ինտերֆեյսի հայեցակարգային վերանախագծում մինիմալիստական մոտեցմամբ",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-1762162976974.png?width=8000&height=8000&resize=contain",
    color: "#000000"
  },
  {
    id: "waveswitch",
    title: "Wave Switch",
    description: "Հարթ ժեստային ինտերֆեյս ինտուիտիվ նավիգացիայի համար",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-1762162976977.png?width=8000&height=8000&resize=contain",
    color: "#F5F5F7"
  },
  {
    id: "namequest",
    title: "NameQuest",
    description: "Անունների որոնման և ուսումնասիրման համակարգ",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-1762162977007.png?width=8000&height=8000&resize=contain",
    color: "#000000"
  }]

};

const translations = {
  FR: {
    sectionTitle: "Sélection de travaux",
    viewProject: "En savoir plus"
  },
  EN: {
    sectionTitle: "Selection of works",
    viewProject: "Learn more"
  },
  ՀԱՅ: {
    sectionTitle: "Աշխատանքների ընտրություն",
    viewProject: "Իմանալ ավելին"
  }
};

export default function ProjectTeasers() {
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ";
    if (saved && translations[saved]) {
      setSelectedLanguage(saved);
    }
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
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentProjects = projectsData[selectedLanguage];
  const currentTranslations = translations[selectedLanguage];

  const handleProjectClick = (projectId: string) => {
    // Simply navigate with hash - let the projects page handle smooth scrolling
    router.push(`/projects#${projectId}`);
  };

  return (
    <section
      className="py-8 md:py-12 px-6 bg-black !w-full !h-full"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>

      <div className="max-w-[1200px] mx-auto">
        <h2
          className={`text-[clamp(32px,5vw,48px)] font-semibold text-white mb-12 text-center transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
          }
          style={{
            transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)"
          }}>

          {currentTranslations.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project, index) =>
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
            }
            style={{
              backgroundColor: "#FFFFFF",
              transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)",
              transitionDelay: `${100 + index * 80}ms`,
              display: "flex",
              flexDirection: "column",
              minHeight: "520px"
            }}>

              <div className="relative w-full h-[280px] overflow-hidden flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)"
                  }} />
              </div>

              <div className="relative p-6 bg-white flex flex-col flex-1">
                <h3 className="text-2xl font-semibold mb-2 text-[#515151]">
                  {project.title}
                </h3>
                <p className="text-base mb-6 leading-relaxed text-[#515151]">
                  {project.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white font-medium text-sm transition-all duration-300 group-hover:gap-3 mt-auto self-start"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)"
                  }}>

                  {currentTranslations.viewProject}
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}