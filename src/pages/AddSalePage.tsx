import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useLang } from "@/context/LangContext";

export const AddSalePage = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ amount: "", product: "", date: new Date().toISOString().split("T")[0] });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
    setForm({ amount: "", product: "", date: new Date().toISOString().split("T")[0] });
    setTimeout(() => setSuccess(false), 3000);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm font-medium";

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t.addSaleTitle}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Enregistrez vos transactions en temps réel</p>
      </motion.div>

      <GlassCard delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.amount}
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.amount}
                onChange={set("amount")}
                placeholder="0"
                required
                min="1"
                className={`${inputClass} pr-16`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                FCFA
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.product}
            </label>
            <input
              type="text"
              value={form.product}
              onChange={set("product")}
              placeholder="Ex: Tissu wax, Légumes..."
              required
              className={inputClass}
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.date}
            </label>
            <input
              type="date"
              value={form.date}
              onChange={set("date")}
              required
              className={inputClass}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white shadow-brand disabled:opacity-70 mt-2"
            style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Enregistrement...
              </span>
            ) : (
              t.submitSale
            )}
          </motion.button>
        </form>
      </GlassCard>

      {/* Success notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-28 left-4 right-4 max-w-sm mx-auto z-50"
          >
            <div className="rounded-2xl p-4 flex items-center gap-3 shadow-brand"
              style={{ background: "linear-gradient(135deg, #166534, #14532d)" }}>
              <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">{t.saleSaved}</p>
                <p className="text-emerald-300 text-xs">{t.saleSuccess}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <GlassCard delay={0.25} className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          💡 Conseils
        </p>
        <div className="space-y-2">
          {["Enregistrez chaque vente pour améliorer votre score", "Plus vous enregistrez, mieux l'IA vous évalue", "Votre score influence vos offres de crédit"].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }} />
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
