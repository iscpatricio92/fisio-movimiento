import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  webpSrc?: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  blurPlaceholder?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  srcSet,
  sizes,
  webpSrc,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  blurPlaceholder = true,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Blur placeholder background */}
      {blurPlaceholder && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      <picture>
        {webpSrc && (
          <source srcSet={srcSet || webpSrc} sizes={sizes} type="image/webp" />
        )}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
        />
      </picture>

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">
            Error al cargar imagen
          </span>
        </div>
      )}
    </div>
  );
};
