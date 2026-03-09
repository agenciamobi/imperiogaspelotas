import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center space-y-6">
        <h1 className="font-display text-6xl font-black text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Página não encontrada</p>
        <p className="text-muted-foreground max-w-md">
          A página que você procura não existe ou foi movida. Volte para o início ou fale conosco pelo WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full">
            <a href="/">
              <Home className="w-4 h-4" />
              Voltar ao início
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a href={getWhatsAppLink(WHATSAPP_MESSAGES.default)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
