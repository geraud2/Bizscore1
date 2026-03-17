import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import { LogOut, Moon, Sun, Globe, ChevronRight, User, MapPin, Briefcase } from "lucide-react";
import type { Language } from "@/utils/translations";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useLang();
  const { isDark, toggleTheme } = useTheme();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "fon", label: "Fon", flag: "🇧🇯" },
  ];

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {t.profile}
        </h1>
      </motion.div>

      {/* User card */}
      <GlassCard delay={0.1} className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl shadow-brand p-[2px] shrink-0"
            style={{ background: "linear-gradient(135deg, #2563EB, #22C55E)" }}>
            <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center">
              <span className="text-2xl font-black gradient-brand-text">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-black text-lg text-foreground truncate"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {user?.name}
            </h2>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={14} className="shrink-0" />
            <span className="truncate">{user?.activity || "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{user?.location || "—"}</span>
          </div>
        </div>

        {/* Score badge */}
        <div className="mt-4 p-3 rounded-xl flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(34,197,94,0.08))" }}>
          <span className="text-sm font-semibold text-foreground">BizScore</span>
          <span className="text-2xl font-black gradient-brand-text"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {user?.score}
          </span>
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard delay={0.15} className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Globe size={18} className="text-primary" />
          <p className="font-semibold text-foreground">{t.language}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {languages.map(({ code, label, flag }) => (
            <motion.button
              key={code}
              whileTap={{ scale: 0.96 }}
              onClick={() => setLang(code)}
              className={`py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                lang === code
                  ? "text-white shadow-brand"
                  : "bg-secondary/70 text-muted-foreground"
              }`}
              style={lang === code ? { background: "linear-gradient(135deg, #2563EB, #22C55E)" } : {}}
            >
              <span className="text-base">{flag}</span>
              {label}
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Dark mode */}
      <GlassCard delay={0.2} className="p-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={18} className="text-primary" /> : <Sun size={18} className="text-primary" />}
            <span className="font-semibold text-foreground">{t.darkMode}</span>
          </div>
          <div className={`w-12 h-6 rounded-full transition-all relative ${isDark ? "bg-primary" : "bg-muted"}`}
            style={isDark ? { background: "linear-gradient(135deg, #2563EB, #22C55E)" } : {}}>
            <motion.div
              animate={{ x: isDark ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
            />
          </div>
        </motion.button>
      </GlassCard>

      {/* Logout */}
      <GlassCard delay={0.25} className="p-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={logout}
          className="w-full flex items-center gap-3 text-destructive"
        >
          <LogOut size={18} />
          <span className="font-semibold">{t.logout}</span>
        </motion.button>
      </GlassCard>
    </div>
  );
};
