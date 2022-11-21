import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export function ThemeProvider({ children }) {
  const [themes] = useState([
    { name: "Light", className: "" },
    { name: "Dark", className: "dark" }
  ]);
  const [theme, setTheme] = useState(themes[0]);

  function applyStoredTheme() {
    const stored = window.localStorage.getItem("theme");

    if (!stored || stored === "") return;
    const _theme = themes.find(({ name }) => stored === name);

    _theme && setTheme(_theme);
  }

  useEffect(() => {
    applyStoredTheme();
  }, []);

  function setAndStoreTheme(_theme) {
    if (!_theme) return;
    setTheme(_theme);
    window.localStorage.setItem("theme", _theme.name);
  }

  console.log("PROVIDER", theme.name, theme.className);

  return (
    <ThemeContext.Provider value={{ setAndStoreTheme, theme, themes }}>
      <div className={theme.className}>
      {children}
      </div>
    </ThemeContext.Provider>
  );
}
