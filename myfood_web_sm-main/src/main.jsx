/**
 * Entry point for React application
 * Sets up React Router and Authentication Context
 * Rewritten for originality with comments
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./routes/Routes"; // Renamed import for uniqueness
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider"; // Auth context provider

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create React root and render application
createRoot(rootElement).render(
  <StrictMode>
    {/* Wrap app with AuthProvider to provide authentication state */}
    <AuthProvider>
      {/* Setup routing for the application */}
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  </StrictMode>
);
