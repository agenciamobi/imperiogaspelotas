import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { DELIVERY_START_HOUR, DELIVERY_END_HOUR } from "@/lib/constants";

const UrgencyBar = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= DELIVERY_START_HOUR && hours < DELIVERY_END_HOUR) {
        // Durante o horário de entrega
        const end = new Date();
        end.setHours(DELIVERY_END_HOUR, 0, 0, 0);
        const diff = end.getTime() - now.getTime();
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setIsOpen(true);

        if (h > 0) return `${h}h ${m}min para encerrar entregas`;
        if (m > 0) return `${m}min ${s}s para encerrar entregas`;
        return `${s}s para encerrar entregas`;
      } else {
        // Fora do horário — calcular até próxima abertura (09h)
        setIsOpen(false);
        const nextOpen = new Date();
        if (hours >= DELIVERY_END_HOUR) {
          // Após 22h — próximo dia 09h
          nextOpen.setDate(nextOpen.getDate() + 1);
        }
        nextOpen.setHours(DELIVERY_START_HOUR, 0, 0, 0);

        const diff = nextOpen.getTime() - now.getTime();
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (h > 0) return `Faltam ${h}h ${m}min para iniciarmos as entregas`;
        return `Faltam ${m}min para iniciarmos as entregas`;
      }
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-urgency text-primary-foreground">
      <div className="container mx-auto px-4 h-10 flex items-center justify-center gap-2 text-xs sm:text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <Clock className="w-4 h-4 urgency-pulse" />
          <span className="hidden sm:inline">
            {isOpen ? "⏰" : "🕐"} <strong>{timeLeft}</strong> {isOpen ? "— Peça agora!" : ""}
          </span>
          <span className="sm:hidden">
            {isOpen ? "⏰" : "🕐"} <strong>{timeLeft}</strong>
          </span>
        </p>
      </div>
    </div>
  );
};

export default UrgencyBar;
