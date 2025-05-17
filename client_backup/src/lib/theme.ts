import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "garkuwa-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(storageKey) || defaultTheme;
      }
      return defaultTheme;
    }
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (theme: string) => {
      setTheme(theme);
    },
  };

  return React.createElement(
    ThemeProviderContext.Provider,
    { value },
    children
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
