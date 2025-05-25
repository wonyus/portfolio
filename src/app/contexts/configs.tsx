"use client";
import useSupabaseBrowser from "@/utils/supabase/client";
import { createContext, useState, useContext, useEffect, use } from "react";

interface ConfigContextType {
  theme: string;
  language: string;
  setTheme: (theme: string) => void;
  setLanguage: (language: string) => void;
  configs: { [key: string]: any };
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const ConfigContext = createContext<ConfigContextType>({
  theme: "light",
  language: "en",
  setTheme: () => {},
  setLanguage: () => {},
  configs: {},
  isLoading: true,
  error: null,
  setError: () => {},
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const [configs, setConfigs] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const loadConfigs = async () => {
    try {
      const supabase = useSupabaseBrowser();
      const { data, error } = await supabase.from("configs").select("*");
      if (error) {
        setError("Error loading configs");
        setIsLoading(false);
        return;
      }
      if (data) {
        const configData = data.reduce((acc: { [key: string]: any }, item: { configs: any; id: string }) => {
          acc[item.id] = item.configs;
          return acc;
        }, {});
        console.log("Config data loaded:", configData);
        setConfigs(configData);
      }
      setIsLoading(false);
    } catch (error) {
      setError("Error loading configs");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadConfigs();
    })();
  }, []);
  
  // Persist theme changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Persist language changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <ConfigContext.Provider
      value={{
        theme,
        language,
        setTheme,
        setLanguage,
        configs,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}; // Custom hook to use the config context

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
