import { motion, AnimatePresence } from "framer-motion";
import { Home, PlusCircle, BarChart3, Wallet, User } from "lucide-react";
import { useLang } from "@/context/LangContext";

type Tab = "home" | "sale" | "score" | "credit" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const { t } = useLang();

  const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: t.nav.home },
    { id: "sale", icon: PlusCircle, label: t.nav.sale },
    { id: "score", icon: BarChart3, label: t.nav.score },
    { id: "credit", icon: Wallet, label: t.nav.credit },
    { id: "profile", icon: User, label: t.nav.profile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="glass-card border-t border-border/50 rounded-none rounded-t-2xl px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.88 }}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl min-w-[56px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 gradient-brand rounded-xl opacity-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={
                    isActive
                      ? "text-primary drop-shadow-sm"
                      : "text-muted-foreground"
                  }
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                <span
                  className={`text-[10px] font-semibold transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -top-0.5 w-1 h-1 rounded-full gradient-brand bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
