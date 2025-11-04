"use client";

import Image from "next/image";

export default function HeroLanding() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/fond-romain-rubens-1762169393726.png?width=8000&height=8000&resize=contain"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Content Overlay (optional - vous pouvez ajouter du contenu ici si nécessaire) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Vous pouvez ajouter du texte ou des éléments ici plus tard */}
      </div>
    </section>
  );
}
