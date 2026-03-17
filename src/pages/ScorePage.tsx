import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { ScoreDial } from "@/components/ScoreDial";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

export const ScorePage = () => {
  const { user } = useAuth();
  const { t } = useLang();
  const score = user?.score ?? 84;

  const statusLabel =
    score >= 80 ? t.scoreStatus.excellent :
    score >= 65 ? t.scoreStatus.good :
    score >= 40 ? t.scoreStatus.medium :
    t.scoreStatus.low;

  const statusColor =
    score >= 80 ? "from-emerald-500 to-green-600" :
    score >= 65 ? "from-green-400 to-emerald-500" :
    score >= 40 ? "from-orange-400 to-amber-500" :
    "from-red-500 to-rose-600";

  const factors = [
    { label: "Régularité des ventes", value: 88, color: "#22C55E" },
    { label: "Volume mensuel", value: 72, color: "#2563EB" },
    { label: "Croissance", value: 65, color: "#F59E0B" },
    { label: "Diversité produits", value: 55, color: "#8B5CF6" },
  ];

  const recs = [t.rec1, t.rec2, t.rec3, t.rec4];
  const recIcons = ["📈", "🛍️", "💰", "📝"];

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t.bizScore}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t.scoreDescription}</p>
      </motion.div>

      {/* Dial card */}
      <GlassCard delay={0.1} className="flex flex-col items-center py-8">
        <ScoreDial score={score} size={200} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4 text-center"
        >
          <span className={`inline-block px-5 py-1.5 rounded-full text-white text-sm font-bold bg-gradient-to-r ${statusColor}`}>
            {statusLabel}
          </span>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs text-center">
            {t.scoreExplanation}
          </p>
        </motion.div>
      </GlassCard>

      {/* Score factors */}
      <GlassCard delay={0.2} className="p-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Facteurs du score
        </p>
        <div className="space-y-4">
          {factors.map((f, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{f.label}</span>
                <span className="text-sm font-bold" style={{ color: f.color }}>{f.value}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${f.value}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                  className="h-full rounded-full"
                  style={{ background: f.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
          {t.recommendations}
        </p>
        <div className="space-y-3">
          {recs.map((rec, i) => (
            <GlassCard key={i} delay={0.35 + i * 0.06} className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(34,197,94,0.12))" }}>
                {recIcons[i]}
              </div>
              <p className="text-sm font-medium text-foreground">{rec}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
