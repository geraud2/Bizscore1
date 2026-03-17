import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = "", delay = 0, onClick }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.32, 0.72, 0, 1] }}
    onClick={onClick}
    className={cn(
      "glass-card shadow-card rounded-2xl p-6",
      onClick && "cursor-pointer",
      className
    )}
  >
    {children}
  </motion.div>
);
