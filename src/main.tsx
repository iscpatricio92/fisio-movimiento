import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics, trackPageView } from "./lib/analytics";

// Initialize analytics
initAnalytics();

// Track initial page view
if (typeof window !== 'undefined') {
  trackPageView(window.location.pathname, document.title);
}

createRoot(document.getElementById("root")!).render(<App />);
