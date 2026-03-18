import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { DELIVERY_END_HOUR } from "@/lib/constants";

const UrgencyBar = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDelivery = new Date();
      endOfDelivery.setHours(DELIVERY_END_HOUR, 0, 0, 0);

      if (now >= endOfDelivery) {
        return "Entregas encerradas hoje";
      }

      const diff = endOfDelivery.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        return `${hours}h ${minutes}min para encerrar entregas`;
      } else if (minutes > 0) {
        return `${minutes}min ${seconds}s para encerrar entregas`;
      } else {
        return `${seconds}s para encerrar entregas`;
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
          <span className="hidden sm:inline">⏰ Faltam <strong>{timeLeft}</strong> — Peça agora!</span>
          <span className="sm:hidden">⏰ <strong>{timeLeft}</strong></span>
        </p>
      </div>
    </div>
  );
};

export default UrgencyBar;
