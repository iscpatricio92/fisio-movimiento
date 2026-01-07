import { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

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

interface ClinicGalleryProps {
  compact?: boolean;
}

export const ClinicGallery = ({ compact = false }: ClinicGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="relative">
      {/* Header - only show if not compact */}
      {!compact && (
        <div className="text-center mb-6">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Instalaciones
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mt-2">
            Conoce Mis <span className="text-primary">Consultorios</span>
          </h3>
        </div>
      )}

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {galleryImages.map((image, index) => (
            <CarouselItem key={index} className={`pl-2 ${compact ? 'basis-full' : 'basis-full'}`}>
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
        <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-5 bg-card/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary h-10 w-10" />
        <CarouselNext className="hidden sm:flex -right-4 lg:-right-5 bg-card/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary h-10 w-10" />
      </Carousel>

      {/* Mobile swipe hint */}
      <p className="text-center text-xs text-muted-foreground mt-3 sm:hidden">
        ← Desliza para ver más →
      </p>

      {/* Decorative element */}
      <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-primary/20" />

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
