import Image from "next/image";

export default function ProjectGameBoard() {
  return (
    <section className="w-full bg-[#E8E8E8] py-8 md:py-12 flex items-center justify-center">
      <div className="w-full max-w-[700px] px-6">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/plateau-Rubens-romain-1762114266538.png?width=8000&height=8000&resize=contain"
          alt="Name Quest Game Board"
          width={700}
          height={700}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}