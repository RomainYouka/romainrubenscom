interface ProjectDividerProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

const dividerTranslations = {
  FR: "Au-delà de l'interaction. Vers l'expérience.",
  EN: "Beyond interaction. Into experience.",
  ՀԱՅ: "Փոխազդեցությունից դուրս: Դեպի փորձառություն:"
};

export default function ProjectDivider({ language }: ProjectDividerProps) {
  return (
    <section
      className="w-full h-[200px] bg-gradient-to-bl from-[#D72E3E] to-[#EB6037] flex items-center justify-center"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>

      <div className="text-center px-6">
        <p className="text-white text-[18px] md:text-[22px] italic leading-relaxed !font-bold">
          {dividerTranslations[language]}
        </p>
      </div>
    </section>);

}