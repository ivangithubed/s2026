import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<[string, (theme: string) => void] | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setTheme(storedTheme || systemTheme);
  }, []);

  const toggleTheme = (newTheme: string) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeScript() {
  const script = `
    const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

