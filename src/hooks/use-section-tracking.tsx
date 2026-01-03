import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/analytics';

interface UseSectionTrackingOptions {
  sectionName: string;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Hook para trackear cuando una sección entra en el viewport
 * Útil para medir engagement con diferentes secciones del sitio
 */
export const useSectionTracking = ({
  sectionName,
  threshold = 0.3,
  triggerOnce = true,
}: UseSectionTrackingOptions) => {
  const hasTracked = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || (hasTracked.current && triggerOnce)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(sectionName);
            if (triggerOnce) {
              hasTracked.current = true;
            }
          }
        });
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, threshold, triggerOnce]);

  return sectionRef;
};

