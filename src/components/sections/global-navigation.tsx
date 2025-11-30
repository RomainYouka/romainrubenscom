"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Globe, Download, Check } from "lucide-react";

// Animated Burger Icon Component
const AnimatedBurgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-center items-center">
      <span
        className="absolute w-6 h-0.5 bg-[#3C3C3C] transition-all duration-500 ease-in-out"
        style={{
          transform: isOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-8px) rotate(0deg)',
          opacity: 1
        }}
      />
      <span
        className="absolute w-6 h-0.5 bg-[#3C3C3C] transition-all duration-500 ease-in-out"
        style={{
          transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
          opacity: isOpen ? 0 : 1
        }}
      />
      <span
        className="absolute w-6 h-0.5 bg-[#3C3C3C] transition-all duration-500 ease-in-out"
        style={{
          transform: isOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(8px) rotate(0deg)',
          opacity: 1
        }}
      />
    </div>
  );
};

// Logo image component
const LogoIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
<img
  src="/logo-rubens.png"
  alt="Romain Rubens"
  role="img"
  {...props}
/>;

// Translation data
const translations = {
  FR: {
    home: "Accueil",
    projects: "Projets",
    contact: "Contact",
    resume: "CV"
  },
  EN: {
    home: "Home",
    projects: "Projects",
    contact: "Contact",
    resume: "Resume"
  },
  ՀԱՅ: {
    home: "Գլխավոր",
    projects: "Նախագծեր",
    contact: "Կապ",
    resume: "Ռեզյումե"
  }
};

const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
  isScrolled,
  onToggle
}: {selectedLanguage: string;onLanguageChange: (lang: string) => void; isScrolled: boolean; onToggle: (open: boolean) => void;}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  // Fixed width to accommodate globe icon
  const FIXED_WIDTH = 42;
  
  // Animation timing - doit correspondre à la transition de la barre (300ms)
  const TOOLBAR_ANIMATION_DURATION = 300;
  // Délai pour voir le changement de langue avant de fermer
  const LANGUAGE_CHANGE_DELAY = 500;

  // Show ALL languages
  const allLanguages = ["FR", "EN", "ՀԱՅ"];
  
  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        // Position toujours à 64px car la barre sera forcée en position initiale
        const topPosition = 64;
        setDropdownPosition({
          top: topPosition,
          left: buttonRect.left
        });
        setIsPositioned(true);
      }
    };

    if (shouldShowDropdown) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setIsPositioned(false);
    }
  }, [shouldShowDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShouldShowDropdown(false);
        onToggle(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShouldShowDropdown(false);
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle]);

  const handleLanguageSelect = (code: string) => {
    // 1. Changer la langue d'abord
    onLanguageChange(code);
    
    // 2. Attendre que le changement de langue soit visible
    setTimeout(() => {
      // 3. Puis fermer le dropdown et revenir à l'état détaché
      setIsOpen(false);
      setShouldShowDropdown(false);
      onToggle(false);
    }, LANGUAGE_CHANGE_DELAY);
  };

  const handleClick = () => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 200);
    
    if (!isOpen) {
      // Ouvrir : forcer la barre en position initiale d'abord
      onToggle(true);
      setIsOpen(true);
      // Attendre que l'animation de la barre soit terminée avant d'afficher le dropdown
      setTimeout(() => {
        setShouldShowDropdown(true);
      }, TOOLBAR_ANIMATION_DURATION);
    } else {
      // Fermer immédiatement
      setIsOpen(false);
      setShouldShowDropdown(false);
      onToggle(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef} style={{ margin: 0, padding: 0 }}>
      {/* Button with globe icon and click animation */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="flex items-center justify-center h-full text-[#3C3C3C] transition-all hover:opacity-70"
        aria-label="Select language"
        aria-expanded={isOpen}
        style={{
          minWidth: `${FIXED_WIDTH}px`,
          width: `${FIXED_WIDTH}px`,
          padding: 0,
          margin: 0,
          border: 'none',
          background: 'none',
          transitionDuration: "180ms",
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "opacity, transform",
          transform: isClicking ? "scale(0.92)" : "scale(1)"
        }}>
        <Globe className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </button>
      
      {/* Dropdown - fixed width matching button with backdrop blur */}
      {isPositioned && (
        <div
          className={`fixed overflow-hidden transition-all ${
            shouldShowDropdown 
              ? "opacity-100 translate-y-0 duration-[240ms] ease-in-out" 
              : "opacity-0 -translate-y-2 pointer-events-none duration-[200ms] ease-in-out"
          }`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${FIXED_WIDTH}px`,
            borderRadius: "0 0 8px 8px",
            borderLeft: "1px solid #D3D3D4",
            borderRight: "1px solid #D3D3D4",
            borderBottom: "1px solid #D3D3D4",
            borderTop: "none",
            backgroundColor: "#FFFFFF",
            zIndex: 1001
          }}>

          {/* Items: show ALL languages with selected one highlighted */}
          <div className="flex flex-col">
            {allLanguages.map((lang) => {
              const isSelected = lang === selectedLanguage;
              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className="w-full py-2 text-center transition-all duration-[200ms]"
                  style={{
                    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui",
                    fontWeight: 500,
                    fontSize: "14px",
                    padding: "8px 0",
                    backgroundColor: isSelected ? "#3C3C3C" : "transparent",
                    color: isSelected ? "#FFFFFF" : "#3C3C3C",
                    ...(isSelected ? {} : { 
                      '&:hover': { 
                        backgroundColor: "#F5F5F7" 
                      }
                    })
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "#F5F5F7";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}>
                  <span className="uppercase">{lang}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ResumeButton = ({ selectedLanguage }: { selectedLanguage: "FR" | "EN" | "ՀԱՅ" }) => {
  const currentTranslations = translations[selectedLanguage];
  const [resumeValidating, setResumeValidating] = useState(false);
  
  const handleDownload = () => {
    setResumeValidating(true);
    setTimeout(() => {
      setResumeValidating(false);
    }, 2200);
    
    // Map language codes to PDF file names
    const pdfFiles = {
      FR: "/resumes/RUBENS_Romain_curriculum_vitae.pdf",
      EN: "/resumes/RUBENS-Romain-Resume.pdf",
      ՀԱՅ: "/resumes/RUBENS Romain (Կենսագրություն)_1764506453112.pdf"
    };
    
    const pdfUrl = pdfFiles[selectedLanguage];
    const pdfFileNames = {
      FR: "RUBENS_Romain_curriculum_vitae.pdf",
      EN: "RUBENS-Romain-Resume.pdf",
      ՀԱՅ: "RUBENS Romain (Կենսագրություն)_1764506453112.pdf"
    };
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfFileNames[selectedLanguage];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={resumeValidating}
      className="relative flex items-center justify-center text-white transition-all font-medium text-sm no-underline disabled:cursor-not-allowed"
      aria-label={`Download ${currentTranslations.resume}`}
      style={{
        backgroundColor: "#3C3C3C",
        border: "1px solid #3C3C3C",
        borderRadius: "980px",
        padding: "8px 16px",
        height: "36px",
        minWidth: "95px",
        width: "95px",
        transitionDuration: "180ms",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "opacity, background-color, transform",
        outline: "none",
        boxShadow: "none"
      }}
      onMouseEnter={(e) => {
        if (!resumeValidating) {
          e.currentTarget.style.opacity = "0.85";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
      onMouseDown={(e) => {
        if (!resumeValidating) {
          e.currentTarget.style.transform = "scale(0.97)";
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}>
      <span style={{ textAlign: "center", width: "100%" }}>{currentTranslations.resume}</span>
      
      {/* Validation state - visual only with checkmark pulse */}
      <div 
        className={`absolute inset-0 flex items-center justify-center bg-[#3C3C3C] rounded-[980px] transition-opacity ${
          resumeValidating ? 'opacity-100 duration-[200ms]' : 'opacity-0 duration-[180ms] pointer-events-none'
        }`}
      >
        <Check 
          className="w-5 h-5 text-white" 
          strokeWidth={2.5} 
        />
      </div>
    </button>
  );
};

const GlobalNavigation = ({ onShowQuotes }: { onShowQuotes?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"FR" | "EN" | "ՀԱՅ">("FR");
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    let saved = localStorage.getItem("preferredLanguage") as "FR" | "EN" | "ՀԱՅ" | null;
    if (!saved || !translations[saved]) {
      saved = "FR";
      localStorage.setItem("preferredLanguage", "FR");
    }
    setSelectedLanguage(saved);
  }, []);

  const handleLanguageChange = (lang: string) => {
    const validLang = lang as "FR" | "EN" | "ՀԱՅ";
    setSelectedLanguage(validLang);
    localStorage.setItem("preferredLanguage", validLang);

    // Dispatch event to update content without navigation
    window.dispatchEvent(new CustomEvent("languageChange", { detail: validLang }));
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Trigger animation
    setLogoAnimating(true);
    setTimeout(() => setLogoAnimating(false), 260);

    // Show quotes overlay instead of navigating
    if (onShowQuotes) {
      onShowQuotes();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Ne pas mettre à jour isScrolled si le dropdown de langue OU le menu burger est ouvert
      if (!languageDropdownOpen && !isMenuOpen) {
        setIsScrolled(window.scrollY > 8);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [languageDropdownOpen, isMenuOpen]);

  // Forcer la position initiale quand le dropdown s'ouvre
  const handleLanguageDropdownToggle = (open: boolean) => {
    setLanguageDropdownOpen(open);
    if (open) {
      // Forcer la barre en position initiale
      setIsScrolled(false);
    } else {
      // Rétablir l'état du scroll quand le dropdown se ferme
      // avec une animation fluide inversée
      if (!isMenuOpen) {
        setIsScrolled(window.scrollY > 8);
      }
    }
  };

  // Gérer l'ouverture/fermeture du menu burger
  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    if (newMenuState) {
      // Ouvrir : forcer la barre en position initiale
      setIsScrolled(false);
    } else {
      // Fermer : rétablir l'état du scroll si on n'est pas en haut de la page
      if (window.scrollY > 8) {
        setIsScrolled(true);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    
    // Dispatch event to notify other components when menu state changes
    window.dispatchEvent(new CustomEvent("menuStateChange", { detail: isMenuOpen }));
  }, [isMenuOpen]);

  useEffect(() => {
    const handleLightboxStateChange = (event: CustomEvent<boolean>) => {
      setIsLightboxOpen(event.detail);
    };

    window.addEventListener("flashconceptLightboxStateChange", handleLightboxStateChange as EventListener);
    return () => {
      window.removeEventListener("flashconceptLightboxStateChange", handleLightboxStateChange as EventListener);
    };
  }, []);

  const currentTranslations = translations[selectedLanguage];

  const navLinks = [
  { name: currentTranslations.home, href: "/" },
  { name: currentTranslations.projects, href: "/projects" },
  { name: currentTranslations.contact, href: "/contact" }];

  const prefersReducedMotion = typeof window !== 'undefined' ?
  window.matchMedia('(prefers-reduced-motion: reduce)').matches :
  false;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ease-in-out ${
          isLightboxOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ 
          fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
          paddingTop: isScrolled ? "12px" : "0",
          paddingLeft: isScrolled ? "12px" : "0",
          paddingRight: isScrolled ? "12px" : "0"
        }}>

        <div 
          className={`transition-all duration-300 ease-in-out ${
            isScrolled ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""
          }`}
          style={{
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.85)" : "#FFFFFF",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
            borderRadius: isScrolled ? "980px" : "0",
            borderBottom: isScrolled ? "none" : "1px solid #D3D3D4"
          }}>
          <div className="mx-auto h-16 max-w-[1200px] px-6">
            <nav className="flex h-full w-full items-center justify-between">
              {/* Desktop Navigation */}
              <div className="hidden h-full w-full items-center justify-between md:flex">
                <a
                  href="/"
                  onClick={handleLogoClick}
                  aria-label="Home"
                  className={`flex items-center text-[#3C3C3C] hover:opacity-80 transition-all h-full cursor-pointer relative ${
                  prefersReducedMotion ?
                  logoAnimating ? 'opacity-60' : 'opacity-100' :
                  ''}`
                  }
                  style={{
                    transitionDuration: prefersReducedMotion ? '120ms' : '230ms',
                    transform: logoAnimating && !prefersReducedMotion ? 'scale(0.98)' : 'scale(1)',
                    overflow: 'hidden'
                  }}>

                  <LogoIcon className="h-4 w-auto fill-current relative z-10" />
                  
                  {!prefersReducedMotion && logoAnimating &&
                  <span
                    className="absolute inset-y-0 w-[120%] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    style={{
                      left: '-120%',
                      animation: 'logo-sheen 230ms ease-in-out forwards',
                      clipPath: 'inset(0 -4px 0 0)'
                    }} />

                  }
                </a>
                
                <div className="flex items-center h-full" style={{ gap: "40px" }}>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className="flex items-center text-[#3C3C3C] transition-all h-full font-medium text-sm px-3 no-underline hover:underline focus-visible:underline active:hover:underline"
                      style={{
                        textDecorationColor: "#3C3C3C",
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "2px",
                        transitionDuration: "180ms",
                        transitionTimingFunction: "ease-in-out",
                        transitionProperty: "text-decoration-color, opacity",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        boxShadow: "none"
                      }}>
                      {link.name}
                    </Link>
                  ))}
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    isScrolled={isScrolled}
                    onToggle={handleLanguageDropdownToggle} />
                  <ResumeButton selectedLanguage={selectedLanguage} />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex w-full items-center justify-between md:hidden">
                <a
                  href="/"
                  onClick={handleLogoClick}
                  aria-label="Home"
                  className={`flex items-center text-[#3C3C3C] hover:opacity-80 transition-all cursor-pointer relative ${
                  prefersReducedMotion ?
                  logoAnimating ? 'opacity-60' : 'opacity-100' :
                  ''}`
                  }
                  style={{
                    transitionDuration: prefersReducedMotion ? '120ms' : '230ms',
                    transform: logoAnimating && !prefersReducedMotion ? 'scale(0.98)' : 'scale(1)',
                    overflow: 'hidden'
                  }}>

                  <LogoIcon className="h-3.5 w-auto fill-current relative z-10" />
                  
                  {!prefersReducedMotion && logoAnimating &&
                  <span
                    className="absolute inset-y-0 w-[120%] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    style={{
                      left: '-120%',
                      animation: 'logo-sheen 230ms ease-in-out forwards',
                      clipPath: 'inset(0 -4px 0 0)'
                    }} />

                  }
                </a>
                <div className="flex items-center gap-5" style={{ height: "36px" }}>
                  <ResumeButton selectedLanguage={selectedLanguage} />
                  <div className="flex items-center justify-center" style={{ height: "36px" }}>
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={handleLanguageChange}
                      isScrolled={isScrolled}
                      onToggle={handleLanguageDropdownToggle} />
                  </div>
                  <button
                    onClick={handleMenuToggle}
                    className="flex items-center justify-center text-[#3C3C3C] transition-opacity duration-200 hover:opacity-80"
                    style={{ height: "36px" }}
                    aria-label="Toggle menu">

                    <AnimatedBurgerIcon isOpen={isMenuOpen} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full overflow-y-auto px-6 pt-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-4 text-lg font-medium text-[#3C3C3C] border-b border-[#D3D3D4] hover:opacity-80 transition-opacity"
                onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>);

};

export default GlobalNavigation;