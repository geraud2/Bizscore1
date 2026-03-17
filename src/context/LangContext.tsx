import React, { createContext, useContext, useState } from "react";
import { translations, Language } from "@/utils/translations";

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations["fr"];
}

const LangContext = createContext<LangContextType>({
  lang: "fr",
  setLang: () => {},
  t: translations["fr"],
});

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("bizscore_lang");
    return (saved as Language) || "fr";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("bizscore_lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
