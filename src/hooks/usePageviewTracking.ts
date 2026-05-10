import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageview } from "@/lib/analytics";

export default function usePageviewTracking() {
  const { pathname } = useLocation();
  useEffect(() => { trackPageview(pathname); }, [pathname]);
}