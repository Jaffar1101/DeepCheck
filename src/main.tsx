import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set GitHub Pages flag for routing
(window as any).__IS_GITHUB_PAGES__ = true;

createRoot(document.getElementById("root")!).render(<App />);
