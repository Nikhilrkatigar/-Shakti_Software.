import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart, Boxes, FileSpreadsheet, ScanEye, Globe, RefreshCw, Server,
  ShieldCheck, Mail, Factory, Lock, TrendingUp, Headset, Compass, Handshake,
  Gauge, Layers, Sparkles,
} from 'lucide-react';

/** Icon names referenced from content.json. */
const MAP: Record<string, LucideIcon> = {
  ShoppingCart, Boxes, FileSpreadsheet, ScanEye, Globe, RefreshCw, Server,
  ShieldCheck, Mail, Factory, Lock, TrendingUp, Headset, Compass, Handshake,
  Gauge, Layers,
};

interface IconProps {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export default function Icon({ name, size = 22, strokeWidth = 1.9 }: IconProps) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
