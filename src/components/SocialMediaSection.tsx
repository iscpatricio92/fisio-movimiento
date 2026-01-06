import { Instagram, Facebook, Youtube, ExternalLink, Share2 } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: typeof Instagram;
  url: string;
  color: string;
  description: string;
  enabled: boolean;
}

interface SocialMediaSectionProps {
  className?: string;
}

export const SocialMediaSection = ({ 
  className = '' 
}: SocialMediaSectionProps) => {
  // URLs de redes sociales - declaradas directamente en el componente
  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/physioholisticmx/',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600',
      description: '@physioholisticmx',
      enabled: true,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/fisio.movimiento.mx',
      color: 'hover:bg-[#1877F2]',
      description: 'Síguenos en Facebook',
      enabled: true,
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@tu-canal', // Reemplazar con el URL real cuando esté disponible
      color: 'hover:bg-[#FF0000]',
      description: 'Suscríbete a nuestro canal',
      enabled: true,
    },
  ].filter(link => link.enabled);

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-card rounded-xl lg:rounded-2xl p-4 md:p-6 shadow-soft border border-border/50">
        {/* Header - Compacto en móvil */}
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl gradient-hero flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5 lg:w-7 lg:h-7 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-lg lg:text-2xl font-bold text-foreground">
              Síguenos en Redes
            </h3>
            <p className="hidden sm:block text-muted-foreground text-sm">
              Consejos y actualizaciones
            </p>
          </div>
        </div>

        {/* Social Media Links - Grid compacto */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-secondary/50 hover:bg-card rounded-xl p-3 lg:p-5 border border-border/30 hover:border-primary/40 transition-all duration-200 hover:shadow-soft active:scale-95 text-center"
              >
                <div className="flex flex-col items-center gap-2 lg:gap-3">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl gradient-hero flex items-center justify-center group-hover:scale-105 group-hover:shadow-md transition-all duration-200">
                    <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary-foreground" />
                  </div>
                  <span className="text-xs lg:text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {social.name}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

