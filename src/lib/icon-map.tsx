import {
  Zap, Shield, Clock, Clock3, CheckCircle2, BadgeCheck, Star,
  HandCoins, ShieldCheck, RefreshCcw, PackageCheck, MessageCircle, MapPin,
  ShoppingCart, Truck, Phone,
} from "lucide-react";

export const ICONS: Record<string, any> = {
  Zap, Shield, Clock, Clock3, CheckCircle2, BadgeCheck, Star,
  HandCoins, ShieldCheck, RefreshCcw, PackageCheck, MessageCircle, MapPin,
  ShoppingCart, Truck, Phone,
};

export function Icon({ name, className }: { name?: string; className?: string }) {
  const C = (name && ICONS[name]) || Zap;
  return <C className={className} />;
}