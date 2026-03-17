import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [stage, setStage] = useState<"show" | "exit">("show");

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("exit"), 2000);
    const timer2 = setTimeout(() => onComplete(), 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage === "show" && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(160deg, #0F172A 0%, #1e3a5f 50%, #0d1b2a 100%)" }}
        >
          {/* Background orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #2563eb, transparent)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #22c55e, transparent)" }} />

          {/* Logo container */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-brand"
              style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}>
              <TrendingUp size={48} color="white" strokeWidth={2.5} />
            </div>
            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-3xl"
              style={{ background: "linear-gradient(135deg, #2563EB44, #22C55E44)" }}
            />
          </motion.div>

          {/* App name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-black tracking-tight mb-2"
              style={{ color: "white", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              BizScore AI
            </h1>
            <p className="text-base font-medium" style={{ color: "rgba(148,163,184,1)" }}>
              Votre score financier intelligent
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-16 w-32"
          >
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #2563EB, #22C55E)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
