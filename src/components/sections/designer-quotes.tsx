"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Quote {
  id: number;
  text: { FR: string; EN: string; ՀԱՅ: string };
  author: string;
}

const quotes: Quote[] = [
  {
    id: 1,
    text: {
      FR: "Le design n'est pas seulement l'apparence et la sensation. Le design, c'est comment ça fonctionne.",
      EN: "Design is not just what it looks like and feels like. Design is how it works.",
      ՀԱՅ: "Դիզայնը միայն արտաքին տեսքն ու զգացողությունը չէ։ Դիզայնը այն է, թե ինչպես է այն\u00A0աշխատում։"
    },
    author: "Steve Jobs"
  },
  {
    id: 2,
    text: {
      FR: "Le bon design est évident. Le grand design est transparent.",
      EN: "Good design is obvious. Great design is transparent.",
      ՀԱՅ: "Լավ դիզայնը ակնհայտ է։ Հիանալի դիզայնը\u00A0թափանցիկ\u00A0է։"
    },
    author: "Joe Sparano"
  },
  {
    id: 3,
    text: {
      FR: "La simplicité est la sophistication ultime.",
      EN: "Simplicity is the ultimate sophistication.",
      ՀԱՅ: "Պարզությունը վերջնական\u00A0կատարելագործումն\u00A0է։"
    },
    author: "Leonardo da Vinci"
  },
  {
    id: 4,
    text: {
      FR: "Le design est la pensée rendue visuelle.",
      EN: "Design is thinking made visual.",
      ՀԱՅ: "Դիզայնը տեսողական դարձած\u00A0մտածումն\u00A0է։"
    },
    author: "Saul Bass"
  },
  {
    id: 5,
    text: {
      FR: "Les détails ne sont pas les détails. Ils font le design.",
      EN: "The details are not the details. They make the design.",
      ՀԱՅ: "Մանրամասները մանրամասներ չեն։ Նրանք ստեղծում են\u00A0դիզայնը։"
    },
    author: "Charles Eames"
  },
  {
    id: 6,
    text: {
      FR: "Le design crée la culture. La culture façonne les valeurs. Les valeurs déterminent l'avenir.",
      EN: "Design creates culture. Culture shapes values. Values determine the future.",
      ՀԱՅ: "Դիզայնը ստեղծում է մշակույթ։ Մշակույթը ձևավորում է արժեքներ։ Արժեքները որոշում են\u00A0ապագան։"
    },
    author: "Robert L. Peters"
  },
  {
    id: 7,
    text: {
      FR: "Moins, mais mieux.",
      EN: "Less, but better.",
      ՀԱՅ: "Քիչ, բայց ավելի\u00A0լավ։"
    },
    author: "Dieter Rams"
  },
  {
    id: 8,
    text: {
      FR: "La forme suit la fonction.",
      EN: "Form follows function.",
      ՀԱՅ: "Ձևը հետևում է\u00A0գործառույթին։"
    },
    author: "Louis Sullivan"
  },
  {
    id: 9,
    text: {
      FR: "Le design est l'intelligence rendue visible.",
      EN: "Design is intelligence made visible.",
      ՀԱՅ: "Դիզայնը տեսանելի դարձած\u00A0խելքն\u00A0է։"
    },
    author: "Alina Wheeler"
  },
  {
    id: 10,
    text: {
      FR: "Le contenu précède le design. Le design sans contenu n'est pas du design, c'est de la décoration.",
      EN: "Content precedes design. Design in the absence of content is not design, it's decoration.",
      ՀԱՅ: "Բովանդակությունը նախորդում է դիզայնին։ Դիզայնը առանց բովանդակության դիզայն չէ, դա\u00A0զարդարում\u00A0է։"
    },
    author: "Jeffrey Zeldman"
  }
];

// Fonction pour obtenir une citation aléatoire en évitant les 4 dernières
const getRandomQuote = (recentIds: number[]): Quote => {
  const availableQuotes = quotes.filter(q => !recentIds.includes(q.id));
  
  if (availableQuotes.length === 0) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  return availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
};

export default function DesignerQuotes({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const router = useRouter();
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [language, setLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("EN");
  const [geniePhase, setGeniePhase] = useState<"opening" | "visible" | "closing">("opening");

  useEffect(() => {
    if (!isVisible) {
      setGeniePhase("opening");
      setCurrentQuote(null);
      return;
    }

    // Détecter la langue depuis localStorage
    const savedLang = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ";
    if (savedLang) {
      setLanguage(savedLang);
    }

    // Récupérer l'historique des citations récentes
    const recentQuotesStr = sessionStorage.getItem("recentQuotes");
    const recentQuotes: number[] = recentQuotesStr ? JSON.parse(recentQuotesStr) : [];
    
    // Sélectionner une citation aléatoire
    const selectedQuote = getRandomQuote(recentQuotes);
    setCurrentQuote(selectedQuote);
    
    // Mettre à jour l'historique
    const updatedRecent = [selectedQuote.id, ...recentQuotes].slice(0, 4);
    sessionStorage.setItem("recentQuotes", JSON.stringify(updatedRecent));
    
    // Séquence d'animation rapide
    setGeniePhase("opening");
    
    // Animation d'ouverture: 500ms
    const visibleTimer = setTimeout(() => {
      setGeniePhase("visible");
    }, 500);
    
    // Temps de lecture réduit: 4 secondes puis fermeture rapide
    const closeTimer = setTimeout(() => {
      setGeniePhase("closing");
      
      // Animation de fermeture: 500ms
      setTimeout(() => {
        onClose();
        // Navigate to home page after closing
        router.push("/");
      }, 500);
    }, 4500);
    
    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(closeTimer);
    };
  }, [isVisible, onClose, router]);

  if (!isVisible || !currentQuote) return null;

  const quoteText = currentQuote.text[language];

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white w-screen h-screen"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
        transformOrigin: "top left",
        animation: geniePhase === "opening" 
          ? "genieOpen 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards"
          : geniePhase === "closing"
          ? "genieClose 500ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards"
          : "none"
      }}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full px-8 md:px-16">
        {/* Citation */}
        <div 
          className={`max-w-4xl text-center transition-opacity duration-500 ${
            geniePhase === "visible" ? "opacity-100" : "opacity-0"
          }`}
        >
          <p 
            className="text-2xl md:text-4xl lg:text-5xl italic leading-relaxed"
            style={{ 
              color: "#515151",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: "1.4",
              textWrap: "balance",
            }}
          >
            "{quoteText}"
          </p>
        </div>
        
        {/* Auteur - Moins d'espace */}
        <div 
          className={`mt-3 md:mt-4 transition-opacity duration-500 ${
            geniePhase === "visible" ? "opacity-100" : "opacity-0"
          }`}
        >
          <p 
            className="text-sm md:text-base"
            style={{ 
              color: "#515151",
              fontWeight: 400,
              letterSpacing: "0.02em"
            }}
          >
            {currentQuote.author}
          </p>
        </div>
        
        {/* Logo en bas */}
        <div 
          className={`absolute bottom-12 md:bottom-16 transition-opacity duration-500 ${
            geniePhase === "visible" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-48 h-12 md:w-64 md:h-16">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-complet-1761908824859.png"
              alt="Romain Rubens Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}