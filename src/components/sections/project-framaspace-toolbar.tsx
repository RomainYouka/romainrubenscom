'use client';

export function FramaspaceToolbarSection() {
  const toolbarImages = [
    { id: 1, src: '/framaspace-toolbar/red.png', alt: 'Red toolbar' },
    { id: 2, src: '/framaspace-toolbar/blue.png', alt: 'Blue toolbar' },
    { id: 3, src: '/framaspace-toolbar/yellow.png', alt: 'Yellow toolbar' },
    { id: 4, src: '/framaspace-toolbar/orange.png', alt: 'Orange toolbar' },
    { id: 5, src: '/framaspace-toolbar/green.png', alt: 'Green toolbar' },
    { id: 6, src: '/framaspace-toolbar/cyan.png', alt: 'Cyan toolbar' },
  ];

  return (
    <section className="w-full bg-black py-6 md:py-8 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-3 md:gap-4">
        {toolbarImages.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="w-full h-auto rounded-lg"
            style={{ display: 'block' }}
          />
        ))}
      </div>
    </section>
  );
}
