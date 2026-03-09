import { useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, ShieldCheck, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const benefits = [
  "Entrega rápida em até 30 minutos",
  "Sem taxa de entrega em Pelotas",
  "Revenda autorizada com garantia de segurança",
];

const ConversionHero = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [errors, setErrors] = useState<{ nome?: string; telefone?: string }>({});

  const isFormValid = nome.trim().length >= 2 && telefone.replace(/\D/g, "").length >= 10;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatPhone(e.target.value));
    if (errors.telefone) setErrors((prev) => ({ ...prev, telefone: undefined }));
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    if (errors.nome) setErrors((prev) => ({ ...prev, nome: undefined }));
  };

  const validateAndSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newErrors: { nome?: string; telefone?: string } = {};

    if (nome.trim().length < 2) {
      newErrors.nome = "Informe seu nome";
    }

    const phoneDigits = telefone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      newErrors.telefone = "Telefone inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
      return;
    }
  };

  const whatsappLink = useMemo(() => {
    return getWhatsAppLink(WHATSAPP_MESSAGES.orderForm(nome, telefone, endereco));
  }, [nome, telefone, endereco]);

  return (
    <section id="inicio" className="scroll-mt-28 pt-28 pb-14 md:pt-36 md:pb-20 gradient-green-soft">
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

          <Card id="formulario" className="border-border card-shadow scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-2xl">Solicite seu pedido agora</CardTitle>
              <p className="text-sm text-muted-foreground">
                Preencha os dados e continue no WhatsApp em segundos.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Seu nome *"
                  value={nome}
                  onChange={handleNomeChange}
                  aria-label="Seu nome"
                  className={errors.nome ? "border-destructive" : ""}
                />
                {errors.nome && <p className="text-xs text-destructive mt-1">{errors.nome}</p>}
              </div>

              <div>
                <Input
                  placeholder="Seu telefone *"
                  value={telefone}
                  onChange={handlePhoneChange}
                  aria-label="Seu telefone"
                  className={errors.telefone ? "border-destructive" : ""}
                  inputMode="tel"
                />
                {errors.telefone && <p className="text-xs text-destructive mt-1">{errors.telefone}</p>}
              </div>

              <Input
                placeholder="Seu endereço (opcional)"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                aria-label="Seu endereço"
              />

              <Button
                asChild
                className={`w-full bg-cta hover:bg-cta-hover text-primary-foreground font-bold h-11 rounded-full ${
                  !isFormValid ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={validateAndSubmit}
                >
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
