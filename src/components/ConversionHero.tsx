import { useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, ShieldCheck, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BASE_WHATSAPP = "https://wa.me/5553991162002";

const benefits = [
  "Entrega rápida em até 30 minutos",
  "Sem taxa de entrega em Pelotas",
  "Revenda autorizada com garantia de segurança",
];

const ConversionHero = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const whatsappLink = useMemo(() => {
    const text = `Olá! Quero fazer um pedido na Império.\nNome: ${nome || "não informado"}\nTelefone: ${telefone || "não informado"}\nEndereço: ${endereco || "não informado"}`;
    return `${BASE_WHATSAPP}?text=${encodeURIComponent(text)}`;
  }, [nome, telefone, endereco]);

  return (
    <section id="inicio" className="pt-28 pb-14 md:pt-36 md:pb-20 gradient-green-soft">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
              <Timer className="w-4 h-4" />
              Últimas entregas do dia abertas
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black leading-tight text-foreground">
              Gás e Água com Entrega em 30 Minutos em Pelotas
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Sem taxa de entrega, preço justo e qualidade garantida para sua casa ou empresa.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>

          <Card id="formulario" className="border-border card-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Solicite seu pedido agora</CardTitle>
              <p className="text-sm text-muted-foreground">
                Preencha os dados e continue no WhatsApp em segundos.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} aria-label="Seu nome" />
              <Input placeholder="Seu telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} aria-label="Seu telefone" />
              <Input placeholder="Seu endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} aria-label="Seu endereço" />

              <Button asChild className="w-full bg-cta hover:bg-cta-hover text-primary-foreground font-bold h-11 rounded-full">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Quero pedir com desconto
                </a>
              </Button>

              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Seus dados são usados apenas para agilizar seu atendimento.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConversionHero;
