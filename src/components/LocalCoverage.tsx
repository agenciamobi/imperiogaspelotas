import { Link } from "react-router-dom";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { bairros } from "@/lib/bairros";
import {
  BUSINESS_HOURS,
  PHONE_DISPLAY,
  PHONE_LANDLINE,
  WHATSAPP_MESSAGES,
  getWhatsAppLink,
} from "@/lib/constants";
import { appendUtmToWhatsAppLink, trackWhatsAppClick } from "@/lib/tracking";

const LocalCoverage = () => {
  return (
    <section id="atendimento-pelotas" className="bg-background py-16 sm:py-20" aria-labelledby="local-coverage-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Atendimento local em Pelotas/RS
          </span>

          <h2 id="local-coverage-title" className="mt-5 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Disk gás e água com entrega em Pelotas
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            A Império Gás e Água atende pedidos de gás de cozinha e água mineral em Pelotas, Rio Grande do Sul.
            Você pode solicitar botijão P13 de 13 kg, P08 de 8 kg, Liquinho de 2 kg e galão de água mineral de 20 litros
            pelo WhatsApp ou telefone. A disponibilidade e o prazo são confirmados para o seu endereço no momento do pedido.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">Área de atendimento</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Pelotas/RS e bairros atendidos pela operação local.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">Horário</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{BUSINESS_HOURS}.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">Pedidos e contato</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              WhatsApp {PHONE_DISPLAY} · Telefone {PHONE_LANDLINE}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-3xl bg-muted p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-2xl font-black text-foreground">Bairros atendidos em Pelotas</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Consulte a página do seu bairro para informações de atendimento e confirme a disponibilidade pelo WhatsApp.
              </p>
            </div>

            <a
              href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("local_coverage")}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cta-hover"
              aria-label="Pedir gás ou água em Pelotas pelo WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Pedir pelo WhatsApp
            </a>
          </div>

          <nav className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-4" aria-label="Bairros atendidos em Pelotas">
            {bairros.map((bairro) => (
              <Link
                key={bairro.slug}
                to={`/bairro/${bairro.slug}`}
                className="text-sm font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                aria-label={`Disk gás e água no bairro ${bairro.nome}, Pelotas`}
              >
                {bairro.nome}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default LocalCoverage;
