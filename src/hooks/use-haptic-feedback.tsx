import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export const useHapticFeedback = () => {
  const vibrate = useCallback((type: HapticType = 'light') => {
    // Check if vibration API is supported
    if (!('vibrate' in navigator)) return;

    // Different vibration patterns based on type
    const patterns: Record<HapticType, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10],
      warning: [20, 30, 20],
      error: [30, 50, 30, 50, 30],
    };

    try {
      navigator.vibrate(patterns[type]);
    } catch {
      // Silently fail if vibration not available
    }
  }, []);

  const triggerHaptic = useCallback((type: HapticType = 'light') => {
    vibrate(type);
  }, [vibrate]);

  return { triggerHaptic };
};

// Utility function for direct use without hook
export const hapticFeedback = (type: HapticType = 'light') => {
  if (!('vibrate' in navigator)) return;

  const patterns: Record<HapticType, number | number[]> = {
    light: 10,
    medium: 20,
    heavy: 30,
    success: [10, 50, 10],
    warning: [20, 30, 20],
    error: [30, 50, 30, 50, 30],
  };

  try {
    navigator.vibrate(patterns[type]);
  } catch {
    // Silently fail
  }
};
