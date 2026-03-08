import { useState, useCallback, useEffect } from "react";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import heroBanner from "@/assets/hero-banner.png";
import aguaMineral from "@/assets/agua-mineral.png";
import liquigasMascote from "@/assets/liquigas-mascote.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const slides = [
  {
    title: "Disk Gás e Água\nem Pelotas",
    subtitle: "Entrega rápida de gás de cozinha e água mineral no conforto da sua casa. Revenda autorizada Liquigás.",
    cta: "Peça pelo WhatsApp",
    img: heroBanner,
    imgAlt: "Botijão de gás e água mineral em Pelotas",
  },
  {
    title: "Água Mineral\n20 Litros",
    subtitle: "Galão de água mineral com entrega em domicílio. Hidrate-se com qualidade e praticidade.",
    cta: "Peça sua Água",
    img: aguaMineral,
    imgAlt: "Galão de água mineral 20 litros",
  },
  {
    title: "Revenda\nAutorizada Liquigás",
    subtitle: "Produtos licenciados e inspecionados. Qualidade e segurança garantidas para sua família.",
    cta: "Saiba Mais",
    img: liquigasMascote,
    imgAlt: "Liquigás mascote - revenda autorizada",
  },
];

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="inicio" className="relative pt-[100px] section-curve-bottom">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <div className="gradient-green-vivid relative min-h-[520px] md:min-h-[580px] flex items-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-primary-foreground/[0.04] rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary-foreground/[0.04] rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-primary-foreground/[0.03] rounded-full" />

                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-7 text-primary-foreground">
                      <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.1] whitespace-pre-line">
                        {slide.title}
                      </h1>
                      <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-14 px-8 rounded-full shadow-lg font-bold"
                      >
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-5 h-5" />
                          {slide.cta}
                        </a>
                      </Button>
                    </div>
                    <div className="hidden md:flex justify-center">
                      <img
                        src={slide.img}
                        alt={slide.imgAlt}
                        className="w-full max-w-[360px] h-auto drop-shadow-2xl object-contain"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-md hidden md:flex"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-md hidden md:flex"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-10 bg-secondary" : "w-2.5 bg-primary-foreground/40"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
