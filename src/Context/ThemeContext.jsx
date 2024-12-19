import { createContext, useContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  function toggleTheme() {
    setTheme((prev) => {
      let _theme = prev;
      if (_theme === "light") {
        _theme = "dark";
      } else {
        _theme = "light";
      }
      document.documentElement.setAttribute("data-theme", _theme);
      localStorage.setItem("theme", _theme);
      console.log(_theme);
      return _theme;
    });
  }
  /*  useEffect(() => {
    let theme = localStorage.getItem("theme");
    setTheme(theme);
  }, []); */

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
