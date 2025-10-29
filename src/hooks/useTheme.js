import { useState, useEffect } from "react";

const THEME_STORAGE_KEY = "theme";
const DARK_THEME_CLASS = "dark-theme";

// Função para obter o tema inicial
function getInitialTheme() {
  // Verifica se há tema salvo no localStorage
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    return savedTheme === "dark";
  }
  // Se não houver, verifica preferência do sistema
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return true;
  }
  return false;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    // Aplica ou remove a classe do tema no documento
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add(DARK_THEME_CLASS);
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
    } else {
      htmlElement.classList.remove(DARK_THEME_CLASS);
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleTheme };
}

