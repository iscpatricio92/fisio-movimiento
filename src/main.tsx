import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics, trackPageView } from "./lib/analytics";

// Initialize analytics
initAnalytics();

// Track initial page view after a short delay to ensure gtag is ready
if (typeof window !== 'undefined') {
  // Use setTimeout to ensure the script has time to load
  setTimeout(() => {
    trackPageView(window.location.pathname, document.title);
  }, 100);
}

createRoot(document.getElementById("root")!).render(<App />);
