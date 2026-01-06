import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

interface ScrollAnimatedProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-up' | 'scale-in' | 'slide-in-left';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollAnimated = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollAnimatedProps) => {
  const { ref, isVisible, prefersReducedMotion } = useScrollAnimation({
    threshold,
    triggerOnce,
    delay,
  });

  // If user prefers reduced motion, render without animation classes
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-6 lg:translate-y-8',
    'fade-in': 'opacity-0',
    'slide-up': 'opacity-0 translate-y-4 lg:translate-y-6',
    'scale-in': 'opacity-0 scale-[0.97] lg:scale-95',
    'slide-in-left': 'opacity-0 -translate-x-4 lg:-translate-x-8',
  };

  const visibleClasses = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    'slide-up': 'opacity-100 translate-y-0',
    'scale-in': 'opacity-100 scale-100',
    'slide-in-left': 'opacity-100 translate-x-0',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 lg:duration-700 ease-out',
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
    >
      {children}
    </div>
  );
};


