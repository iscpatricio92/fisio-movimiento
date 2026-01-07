import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { ScrollAnimated } from './ScrollAnimated';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// Placeholder images - replace with actual clinic photos
const galleryImages: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
    alt: 'Sala de tratamiento principal',
    caption: 'Sala de Tratamiento CDMX',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    alt: 'Equipo de fisioterapia moderno',
    caption: 'Equipo Especializado',
  },
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
    alt: 'Área de espera cómoda',
    caption: 'Área de Espera',
  },
  {
    src: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop',
    alt: 'Consultorio Metepec',
    caption: 'Consultorio Metepec',
  },
];

export const ClinicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="mt-16 lg:mt-24">
      <ScrollAnimated animation="fade-up" delay={100}>
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Instalaciones
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Conoce Mis <span className="text-primary">Consultorios</span>
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground mt-3 lg:mt-4 max-w-2xl mx-auto">
            Espacios diseñados para tu comodidad y recuperación
          </p>
        </div>
      </ScrollAnimated>

      <ScrollAnimated animation="fade-up" delay={200}>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div 
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-glow transition-all duration-300"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12 bg-card/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          <CarouselNext className="hidden sm:flex -right-4 lg:-right-12 bg-card/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
        </Carousel>

        {/* Mobile swipe hint */}
        <p className="text-center text-xs text-muted-foreground mt-4 sm:hidden">
          ← Desliza para ver más →
        </p>
      </ScrollAnimated>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <DialogClose className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
          {selectedImage && (
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white font-display font-bold text-lg">{selectedImage.caption}</p>
                  <p className="text-white/70 text-sm mt-1">{selectedImage.alt}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
