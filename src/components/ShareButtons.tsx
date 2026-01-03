import { trackEvent } from '@/lib/analytics';
import { Facebook, Twitter, MessageCircle, Linkedin, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'floating';
}

export const ShareButtons = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://www.fisioanalaurareyes.com/',
  title = 'Lic. Analaura Reyes Priego | Fisioterapeuta en CDMX y Metepec',
  description = 'Fisioterapeuta con doble titulación. Especialista en traumatología, ATM, hipopresivos y manejo del dolor.',
  className = '',
  variant = 'default'
}: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: shareLinks.facebook,
      color: 'hover:bg-[#1877F2] hover:text-white',
      label: 'Compartir en Facebook',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: shareLinks.twitter,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
      label: 'Compartir en Twitter',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: shareLinks.whatsapp,
      color: 'hover:bg-[#25D366] hover:text-white',
      label: 'Compartir en WhatsApp',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: shareLinks.linkedin,
      color: 'hover:bg-[#0077B5] hover:text-white',
      label: 'Compartir en LinkedIn',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground font-medium">Compartir:</span>
        <div className="flex gap-2">
          {shareButtons.map((button) => {
            const Icon = button.icon;
            return (
              <a
                key={button.name}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 ${button.color}`}
                aria-label={button.label}
                onClick={() => {
                  trackEvent('share', {
                    method: button.name,
                    platform: button.name,
                  });
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
          {navigator.share && (
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Compartir usando el navegador"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-24 right-4 md:right-6 z-40 ${className}`}>
        <div className="bg-card rounded-2xl p-4 shadow-glow border border-border/50 animate-scale-in">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-foreground mb-2">Compartir</div>
            {shareButtons.map((button) => {
              const Icon = button.icon;
              return (
                <a
                  key={button.name}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 ${button.color}`}
                  aria-label={button.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{button.name}</span>
                </a>
              );
            })}
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              aria-label="Copiar enlace"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-500">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="text-sm font-medium">Copiar enlace</span>
                </>
              )}
            </button>
            {navigator.share && (
              <button
                onClick={handleShare}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                aria-label="Compartir usando el navegador"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Más opciones</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <span className="text-sm font-semibold text-foreground">Compartir en:</span>
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((button) => {
          const Icon = button.icon;
          return (
            <a
              key={button.name}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 ${button.color} shadow-soft hover:shadow-glow`}
              aria-label={button.label}
              onClick={(e) => {
                // Tracking opcional (Google Analytics)
                if (typeof window !== 'undefined' && (window as unknown as { gtag?: (command: string, targetId: string, config: { event_category: string; event_label: string }) => void }).gtag) {
                  (window as unknown as { gtag: (command: string, targetId: string, config: { event_category: string; event_label: string }) => void }).gtag('event', 'share', {
                    event_category: 'Social',
                    event_label: button.name,
                  });
                }
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{button.name}</span>
            </a>
          );
        })}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-glow ${copied ? 'bg-green-500/20 text-green-500' : ''}`}
          aria-label="Copiar enlace"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-500">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span className="text-sm font-medium">Copiar enlace</span>
            </>
          )}
        </button>
        {navigator.share && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-glow"
            aria-label="Compartir usando el navegador"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Más opciones</span>
          </button>
        )}
      </div>
    </div>
  );
};

