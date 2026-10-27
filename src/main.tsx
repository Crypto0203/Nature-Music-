import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initNative, initBackButtonHandler, initLifecycleHandler } from "./native/capacitor";

// Initialize native Android features (no-op on web)
initNative();
initBackButtonHandler();
initLifecycleHandler();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
