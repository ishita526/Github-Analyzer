import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    const root = window.document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-md border border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-stone-900 cursor-pointer text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-all duration-300"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 animate-[fadeIn_0.3s_ease-out]" />
      ) : (
        <Moon className="w-4 h-4 animate-[fadeIn_0.3s_ease-out]" />
      )}
    </button>
  );
}
