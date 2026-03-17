import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { useLang } from "@/context/LangContext";
import { mockCreditOffers } from "@/utils/mockData";
import { MessageCircle, ExternalLink } from "lucide-react";

export const CreditPage = () => {
  const { t } = useLang();

  const openWhatsApp = (phone: string, name: string) => {
    const msg = encodeURIComponent(`Bonjour ${name}, je souhaite en savoir plus sur vos offres de crédit. Mon BizScore est disponible.`);
    window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t.creditTitle}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t.creditSubtitle}</p>
      </motion.div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(34,197,94,0.08))" }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}>
          💡
        </div>
        <p className="text-sm text-foreground font-medium leading-relaxed">
          Votre BizScore améliore vos chances d'obtenir un crédit. Plus il est élevé, meilleures sont vos conditions.
        </p>
      </motion.div>

      {/* Offers */}
      <div className="space-y-4">
        {mockCreditOffers.map((offer, i) => (
          <GlassCard key={offer.id} delay={0.15 + i * 0.08} className="p-5">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-gradient-to-br ${offer.color} shadow-sm`}>
                {offer.logo}
              </div>
              <div>
                <h3 className="font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {offer.name}
                </h3>
                <p className="text-xs text-muted-foreground">{offer.rate} · {offer.duration}</p>
              </div>
            </div>

            {/* Range */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 rounded-xl p-3 bg-secondary/50">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                  {t.creditRange}
                </p>
                <p className="text-sm font-bold text-foreground">{offer.range}</p>
              </div>
            </div>

            {/* Conditions */}
            <div className="mb-4 p-3 rounded-xl bg-secondary/40 border border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                {t.creditConditions}
              </p>
              <p className="text-sm text-foreground">{offer.conditions}</p>
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => openWhatsApp(offer.phone, offer.name)}
              className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r ${offer.color}`}
            >
              <MessageCircle size={18} />
              {t.contact}
            </motion.button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
