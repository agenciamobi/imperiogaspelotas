import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BairroPage from "./pages/BairroPage";
import NotFound from "./pages/NotFound";
import PageTemplate from "./pages/PageTemplate";
import LandingPromo from "./pages/LandingPromo";
import AdminLanding from "./pages/AdminLanding";
import AdminLogin from "./pages/AdminLogin";
import AdminIntegrations from "./pages/AdminIntegrations";
import AdminGuard from "./components/AdminGuard";
import TrackingScripts from "./components/TrackingScripts";
import { allPages } from "./lib/pages-data";
import { captureUtmParams } from "./lib/tracking";

const queryClient = new QueryClient();

function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TrackingScripts />
      <BrowserRouter>
        <UtmCapture />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lp/:slug" element={<LandingPromo />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/landing" element={<AdminGuard><AdminLanding /></AdminGuard>} />
          <Route path="/admin/integrations" element={<AdminGuard><AdminIntegrations /></AdminGuard>} />
          <Route path="/bairro/:slug" element={<BairroPage />} />
          {allPages.map((page) => (
            <Route key={page.path} path={page.path} element={<PageTemplate page={page} />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
