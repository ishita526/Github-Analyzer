import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    const root = window.document.documentElement;
    if (newTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="glass-card flex items-center justify-center p-3 rounded-2xl cursor-pointer text-slate-400 hover:text-indigo-400 transition-all duration-300"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 animate-[fadeIn_0.3s_ease-out]" />
      ) : (
        <Moon className="w-5 h-5 animate-[fadeIn_0.3s_ease-out]" />
      )}
    </button>
  );
}
