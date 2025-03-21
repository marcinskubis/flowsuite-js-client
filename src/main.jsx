import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GOOGLE_CLIENT_ID } from "./config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./switch.css";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);
