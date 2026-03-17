import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";

interface RegisterPageProps {
  onGoLogin: () => void;
}

export const RegisterPage = ({ onGoLogin }: RegisterPageProps) => {
  const { register } = useAuth();
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", password: "", activity: "", location: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const ok = register(form);
    if (!ok) setError("Cet email est déjà utilisé.");
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm font-medium";

  const activities = [
    "Commerce général", "Alimentation / Restauration", "Agriculture",
    "Artisanat", "Transport", "Santé / Pharmacie", "TIC / Services", "Autre",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-10 overflow-y-auto"
      style={{ background: "linear-gradient(160deg, hsl(var(--background)) 0%, hsl(210,30%,95%) 100%)" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-7"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-brand mb-3"
            style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}>
            <TrendingUp size={28} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {t.auth.registerTitle}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">{t.auth.registerSubtitle}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          onSubmit={handleSubmit}
          className="space-y-3.5"
        >
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.auth.name}
            </label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="Amara Diallo"
              required
              className={inputClass}
            />
          </div>

          {/* Activity */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.auth.activity}
            </label>
            <select
              value={form.activity}
              onChange={set("activity")}
              required
              className={`${inputClass} appearance-none`}
            >
              <option value="">Choisir une activité</option>
              {activities.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.auth.location}
            </label>
            <input
              type="text"
              value={form.location}
              onChange={set("location")}
              placeholder="Cotonou, Bénin"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.auth.email}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="votre@email.com"
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {t.auth.password}
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="••••••••"
                required
                minLength={6}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-destructive font-medium bg-destructive/10 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white shadow-brand disabled:opacity-70 mt-1"
            style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Inscription...
              </span>
            ) : (
              t.auth.registerBtn
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-5 mb-8 text-sm text-muted-foreground"
        >
          {t.auth.hasAccount}{" "}
          <button onClick={onGoLogin} className="font-bold gradient-brand-text">
            {t.auth.loginHere}
          </button>
        </motion.p>
      </div>
    </div>
  );
};
