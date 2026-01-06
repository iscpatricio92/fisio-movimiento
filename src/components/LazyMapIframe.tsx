import { useState, useRef, useEffect } from 'react';

interface LazyMapIframeProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Lazy-loaded Google Maps iframe with IntersectionObserver
 * Only loads the iframe when it becomes visible in the viewport
 * Includes security sandbox attributes
 */
export const LazyMapIframe = ({ src, title, className = '' }: LazyMapIframeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before it's visible
        threshold: 0,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading placeholder */}
      {(!isVisible || !isLoaded) && (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="text-sm text-muted-foreground">Cargando mapa...</span>
          </div>
        </div>
      )}
      
      {isVisible && (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          onLoad={() => setIsLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          className={isLoaded ? 'opacity-100' : 'opacity-0'}
        />
      )}
    </div>
  );
};
