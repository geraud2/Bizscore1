import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import { SplashScreen } from "@/components/SplashScreen";
import { BottomNav } from "@/components/BottomNav";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { Dashboard } from "@/pages/Dashboard";
import { AddSalePage } from "@/pages/AddSalePage";
import { ScorePage } from "@/pages/ScorePage";
import { CreditPage } from "@/pages/CreditPage";
import { ProfilePage } from "@/pages/ProfilePage";

type Tab = "home" | "sale" | "score" | "credit" | "profile";
type AuthView = "login" | "register";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

const AppInner = () => {
  const { isAuthenticated } = useAuth();
  const [splashDone, setSplashDone] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const handleTabChange = (tab: Tab) => setActiveTab(tab);

  if (!splashDone) return <SplashScreen onComplete={() => setSplashDone(true)} />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {authView === "login" ? (
            <motion.div key="login" {...pageVariants} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>
              <LoginPage onGoRegister={() => setAuthView("register")} />
            </motion.div>
          ) : (
            <motion.div key="register" {...pageVariants} transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>
              <RegisterPage onGoLogin={() => setAuthView("login")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-md mx-auto relative">
      <main className="px-4 pt-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {activeTab === "home" && <Dashboard onAddSale={() => setActiveTab("sale")} />}
            {activeTab === "sale" && <AddSalePage />}
            {activeTab === "score" && <ScorePage />}
            {activeTab === "credit" && <CreditPage />}
            {activeTab === "profile" && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <Toaster />
          <AppInner />
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
