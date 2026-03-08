import { MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top - Canais */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <span className="font-bold">(53) 9 9116-2002</span>
            </a>
            <a href="tel:555332739559" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="w-5 h-5 text-secondary" />
              <span className="font-bold">(53) 3273-9559</span>
            </a>
            <a href="tel:5553984157194" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="w-5 h-5 text-secondary" />
              <span className="font-bold">(53) 98415-7194</span>
            </a>
          </div>
        </div>
      </div>

      {/* Middle - Links */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Império Gás e Água" className="h-10 brightness-200" />
              <span className="font-display font-bold text-lg">Império Gás</span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              Disk Gás e Água em Pelotas/RS. Revenda autorizada Liquigás com entrega rápida até às 22h.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#inicio" className="hover:text-primary-foreground transition-colors">Início</a></li>
              <li><a href="#gas" className="hover:text-primary-foreground transition-colors">Disk Gás</a></li>
              <li><a href="#agua" className="hover:text-primary-foreground transition-colors">Disk Água</a></li>
              <li><a href="#botijoes" className="hover:text-primary-foreground transition-colors">Botijões</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Informações</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#faq" className="hover:text-primary-foreground transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#contato" className="hover:text-primary-foreground transition-colors">Contato</a></li>
              <li>Revenda Autorizada Liquigás</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-sm uppercase tracking-wider">Atendimento</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>Pelotas – Rio Grande do Sul</li>
              <li>Entregamos em toda a cidade</li>
              <li>Todos os dias até às 22h</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Império Gás e Água – Disk Gás Pelotas. Todos os direitos reservados.</p>
          <p>disk gás Pelotas · gás de cozinha · água mineral · botijão de gás · Liquigás Pelotas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
