import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import BairroPage from "./pages/BairroPage";
import BairrosIndexPage from "./pages/BairrosIndexPage";
import PrecoGasPelotasPage from "./pages/PrecoGasPelotasPage";
import NotFound from "./pages/NotFound";
import PageTemplate from "./pages/PageTemplate";
import LandingPromo from "./pages/LandingPromo";
import AdminLanding from "./pages/AdminLanding";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";
import AdminSiteContent from "./pages/AdminSiteContent";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSeo from "./pages/AdminSeo";
import AdminTracking from "./pages/AdminTracking";
import AdminLayout from "./components/admin/AdminLayout";
import TrackingScripts from "./components/TrackingScripts";
import { allPages } from "./lib/pages-data";
import { captureUtmParams } from "./lib/tracking";
import usePageviewTracking from "./hooks/usePageviewTracking";

const queryClient = new QueryClient();

function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}

function PageviewTracker() {
  usePageviewTracking();
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
        <PageviewTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lp/:slug" element={<LandingPromo />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="landing" element={<AdminLanding />} />
            <Route path="site-content" element={<AdminSiteContent />} />
            <Route path="seo" element={<AdminSeo />} />
            <Route path="tracking" element={<AdminTracking />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          <Route path="/bairros-atendidos-pelotas" element={<BairrosIndexPage />} />
          <Route path="/preco-gas-pelotas" element={<PrecoGasPelotasPage />} />
          <Route path="/bairro/:slug" element={<BairroPage />} />
          {allPages.map((page) => (
            <Route key={page.path} path={page.path} element={<PageTemplate page={page} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
