import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "./Auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "sonner";



const quryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={quryClient}> 
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <Toaster position="top-right"  visibleToasts={1} toastOptions={{duration:2000}} richColors/>
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
