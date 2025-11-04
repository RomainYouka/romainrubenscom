import Image from "next/image";

export default function ProjectWaveScreens() {
  return (
    <section
      className="pt-16 md:pt-24 pb-16 md:pb-24 bg-white flex items-center justify-center px-6 !w-full !h-full"
      style={{
        fontFamily: "SF Pro Display, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, sans-serif"
      }}>

      <div className="w-full max-w-[1200px] mx-auto">
        <div className="relative w-full">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/dma-1762181471904.png?width=8000&height=8000&resize=contain"
            alt="WaveSwitch technical specifications"
            width={1400}
            height={400}
            className="w-[95%] md:w-[1050px] h-auto max-w-full mx-auto"
            priority />

        </div>
      </div>
    </section>);

}