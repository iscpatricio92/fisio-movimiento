/**
 * Skip to Content Link for keyboard/screen reader accessibility
 * Allows users to skip navigation and jump directly to main content
 */
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-semibold focus:shadow-glow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
    >
      Saltar al contenido principal
    </a>
  );
};
