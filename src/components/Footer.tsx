import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Império Gás e Água" className="h-10 brightness-200" />
              <span className="font-display font-bold text-lg">Império Gás</span>
            </div>
            <p className="text-sm text-background/60">
              Disk Gás e Água em Pelotas/RS. Revenda autorizada Liquigás com entrega rápida.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><a href="#inicio" className="hover:text-background transition-colors">Início</a></li>
              <li><a href="#gas" className="hover:text-background transition-colors">Disk Gás</a></li>
              <li><a href="#agua" className="hover:text-background transition-colors">Disk Água</a></li>
              <li><a href="#botijoes" className="hover:text-background transition-colors">Botijões</a></li>
              <li><a href="#faq" className="hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li>(53) 9 9116-2002</li>
              <li>(53) 3273-9559</li>
              <li>(53) 98415-7194</li>
              <li>Entrega até às 22h</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-display font-bold mb-4">Atendimento</h4>
            <p className="text-sm text-background/60">
              Pelotas – Rio Grande do Sul<br />
              Entregamos em toda a cidade
            </p>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-background/40">
          <p>© {new Date().getFullYear()} Império Gás e Água – Disk Gás Pelotas. Todos os direitos reservados.</p>
          <p>disk gás Pelotas · gás de cozinha Pelotas · água mineral Pelotas · botijão de gás Pelotas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
