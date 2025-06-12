"use client";

import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {
  Language,
  StoreLanguageActionsContext,
  StoreLanguageContext,
} from "./store-language-context";
import { cookieName, fallbackLng } from "./config";

function StoreLanguageProvider(props: PropsWithChildren<{}>) {
  const [language, setLanguageRaw] = useState<Language>(
    () => Cookies.get(cookieName) ?? fallbackLng
  );

  const setLanguage = useCallback((language: Language) => {
    Cookies.set(cookieName, language ?? fallbackLng);
    setLanguageRaw(language ?? fallbackLng);
  }, []);

  const contextValue = useMemo(() => ({ language }), [language]);

  const contextActionsValue = useMemo(
    () => ({
      setLanguage,
    }),
    [setLanguage]
  );

  return (
    <StoreLanguageContext.Provider value={contextValue}>
      <StoreLanguageActionsContext.Provider value={contextActionsValue}>
        {props.children}
      </StoreLanguageActionsContext.Provider>
    </StoreLanguageContext.Provider>
  );
}

export default StoreLanguageProvider;
