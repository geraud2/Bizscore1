import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, ShoppingBag, Plus } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { MiniChart } from "@/components/MiniChart";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { mockSales } from "@/utils/mockData";

interface DashboardProps {
  onAddSale: () => void;
}

export const Dashboard = ({ onAddSale }: DashboardProps) => {
  const { user } = useAuth();
  const { t } = useLang();

  const scoreStatus =
    !user ? "" :
    user.score >= 80 ? t.scoreStatus.excellent :
    user.score >= 65 ? t.scoreStatus.good :
    user.score >= 40 ? t.scoreStatus.medium :
    t.scoreStatus.low;

  const scoreBarColor =
    !user ? "#22C55E" :
    user.score >= 80 ? "#22C55E" :
    user.score >= 65 ? "#16a34a" :
    user.score >= 40 ? "#F59E0B" :
    "#EF4444";

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <p className="text-sm font-medium text-muted-foreground">{t.welcome}</p>
          <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {user?.name?.split(" ")[0]} 👋
          </h1>
        </div>
        <div className="w-11 h-11 rounded-2xl shadow-brand p-[2px]"
          style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}>
          <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
            <span className="text-base font-black gradient-brand-text">
              {user?.name?.[0]?.toUpperCase()}
            </span>
          </div>
        </div>
      </motion.header>

      {/* BizScore Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="relative overflow-hidden rounded-2xl p-6 text-white"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1e3a5f 60%, #0d2340 100%)" }}
      >
        {/* Decorative orbs */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-20"
          style={{ background: "radial-gradient(circle, #22C55E, transparent)" }} />

        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">
            BizScore AI
          </p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-7xl font-black tracking-tighter leading-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {user?.score ?? 84}
            </span>
            <div className="flex items-center gap-1 mb-2 text-emerald-400 font-bold text-sm">
              <ArrowUpRight size={18} />
              <span>+12 pts</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2.5 w-full rounded-full overflow-hidden mb-3"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${user?.score ?? 84}%` }}
              transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #EF4444, #F59E0B 50%, ${scoreBarColor})` }}
            />
          </div>
          <p className="text-sm font-semibold text-slate-300">{scoreStatus}</p>
        </div>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-4" delay={0.2}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(37,99,235,0.1)" }}>
            <TrendingUp size={20} className="text-primary" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">{t.revenue}</p>
          <p className="text-lg font-black text-foreground mt-0.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {(user?.revenue ?? 1200000).toLocaleString()} FCFA
          </p>
        </GlassCard>
        <GlassCard className="p-4" delay={0.25}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(34,197,94,0.1)" }}>
            <ShoppingBag size={20} className="text-primary-end" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">{t.sales}</p>
          <p className="text-lg font-black text-foreground mt-0.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {user?.salesCount ?? 142}
          </p>
        </GlassCard>
      </div>

      {/* Mini chart */}
      <GlassCard delay={0.3} className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Évolution des ventes
        </p>
        <MiniChart />
      </GlassCard>

      {/* Recent sales */}
      <GlassCard delay={0.35} className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t.recentSales}
          </p>
          <span className="text-xs font-bold gradient-brand-text">{t.viewAll}</span>
        </div>
        <div className="space-y-2.5">
          {mockSales.slice(0, 4).map((sale, i) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(34,197,94,0.15))" }}>
                  🛍️
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{sale.product}</p>
                  <p className="text-xs text-muted-foreground">{sale.date}</p>
                </div>
              </div>
              <span className="text-sm font-bold gradient-brand-text">
                +{sale.amount.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAddSale}
        className="w-full py-4 rounded-2xl font-bold text-white shadow-brand flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}
      >
        <Plus size={20} />
        {t.addSale}
      </motion.button>
    </div>
  );
};
