import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "~/components/ThemeProvider";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
      aria-label={
        theme === "light"
          ? "Перемкнути на темну тему"
          : "Перемкнути на світлу тему"
      }>
      {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
    </button>
  );
};
