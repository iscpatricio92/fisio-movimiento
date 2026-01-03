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
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
              <Share2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Síguenos en Redes Sociales
              </h3>
              <p className="text-muted-foreground text-sm md:text-base mt-1">
                Mantente al día con nuestros consejos y actualizaciones
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-gradient-to-br from-secondary/50 to-background rounded-xl p-8 md:p-12 border border-border/50">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Descripción */}
            <div className="text-center">
              <h4 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Mantente Conectado
              </h4>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Síguenos en nuestras redes sociales para ver consejos de fisioterapia, ejercicios, y actualizaciones sobre nuestros servicios.
              </p>
            </div>

            {/* Grid de redes sociales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative bg-card rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-glow ${social.color} text-center md:text-left`}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <div className="w-16 h-16 rounded-xl gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="font-display text-lg font-bold text-foreground mb-1">
                          {social.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {social.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                          Visitar perfil
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

