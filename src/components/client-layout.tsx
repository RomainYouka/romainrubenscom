"use client";

import { useState, useEffect } from "react";
import GlobalNavigation from "@/components/sections/global-navigation";
import DesignerQuotes from "@/components/sections/designer-quotes";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showQuotes, setShowQuotes] = useState(false);

  useEffect(() => {
    const updateMetaDescription = (language: string) => {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `RomainRubens (${language})`);
      }
      
      // Update html lang attribute
      const langMap: Record<string, string> = {
        "FR": "fr",
        "EN": "en",
        "ՀԱՅ": "hy"
      };
      document.documentElement.lang = langMap[language] || "en";
    };

    // Set initial description based on saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage") || "EN";
    updateMetaDescription(savedLanguage);

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      updateMetaDescription(event.detail);
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <>
      <GlobalNavigation onShowQuotes={() => setShowQuotes(true)} />
      {children}
      <DesignerQuotes isVisible={showQuotes} onClose={() => setShowQuotes(false)} />
    </>
  );
}