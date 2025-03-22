import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NuqsAdapter } from "nuqs/adapters/react";
import Toaster from "./components/ui/toaster";
import QueryProvider from "./context/QueryProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <QueryProvider>
        <AuthProvider>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
        </AuthProvider>
        <Toaster />
      </QueryProvider>
  </StrictMode>
);
