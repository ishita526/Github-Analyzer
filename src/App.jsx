import { useState, useEffect } from 'react';
import {
  Github,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  Bookmark,
  GitBranch,
  Search,
  Code
} from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import SearchInput from './components/SearchInput';
import ProfileDetails from './components/ProfileDetails';
import LanguageBreakdown from './components/LanguageBreakdown';
import RepositoryList from './components/RepositoryList';
import SkeletonLoader from './components/SkeletonLoader';
import SectionTitle from './components/SectionTitle';


export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('searchHistory')) || [];
    } catch {
      return [];
    }
  });

  // Initialize theme DOM on mount (no setState in effect)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const root = window.document.documentElement;
    if (savedTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, []);


  // Main search function
  const handleSearch = async (username) => {
    if (!username) return;
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch Profile
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      
      if (!profileRes.ok) {
        if (profileRes.status === 404) {
          throw new Error('USER_NOT_FOUND');
        } else if (profileRes.status === 403) {
          throw new Error('RATE_LIMIT_EXCEEDED');
        } else {
          throw new Error('GENERIC_ERROR');
        }
      }
      
      const profileData = await profileRes.intoJSON ? await profileRes.intoJSON() : await profileRes.json();

      // 2. Fetch Repositories (up to 100, sorted by updated)
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      let reposData = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      // Update state
      setProfile(profileData);
      setRepos(reposData);

      // Save to history (case-insensitive deduplication, limit to last 5)
      updateHistory(profileData.login);

    } catch (err) {
      console.error('Fetch error:', err);
      if (err.message === 'USER_NOT_FOUND') {
        setError({
          type: 'NOT_FOUND',
          title: 'User Not Found',
          message: `The GitHub username "${username}" does not exist. Please check the spelling and try again.`
        });
      } else if (err.message === 'RATE_LIMIT_EXCEEDED') {
        setError({
          type: 'RATE_LIMIT',
          title: 'Rate Limit Exceeded',
          message: 'You have hit the unauthenticated GitHub API rate limit (60 requests/hour). Please wait a while before making more searches.'
        });
      } else {
        setError({
          type: 'NETWORK',
          title: 'Connection Error',
          message: 'Unable to connect to the GitHub API. Please check your internet connection and try again.'
        });
      }
      // Reset profile/repos on error
      setProfile(null);
      setRepos(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to update search history list
  const updateHistory = (username) => {
    const normUser = username.trim();
    // Filter out if already in history
    const filtered = history.filter(u => u.toLowerCase() !== normUser.toLowerCase());
    // Put to the top of list
    const updated = [normUser, ...filtered].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  // Remove individual history item
  const handleRemoveHistoryItem = (username) => {
    const updated = history.filter((u) => u !== username);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  // Clear all history items
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="min-h-screen py-8 px-4 md:py-12 md:px-8 max-w-4xl mx-auto flex flex-col gap-8 transition-colors duration-300">
      
      {/* Top Header Section */}
      <header className="flex justify-between items-center w-full animate-[fadeIn_0.4s_ease-out]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl shadow-md text-white">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 dark:from-indigo-300 dark:via-purple-300 dark:to-indigo-400 bg-clip-text text-transparent">
              GitScope
            </h1>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              GitHub Profile Analyzer
            </p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      {/* Search Input Box */}
      <SearchInput
        onSearch={handleSearch}
        history={history}
        onRemoveHistoryItem={handleRemoveHistoryItem}
        onClearHistory={handleClearHistory}
        isLoading={isLoading}
      />

      {/* Main Results / Loading / Errors Container */}
      <main className="w-full flex flex-col gap-8">
        {isLoading && <SkeletonLoader />}

        {!isLoading && error && (
          <div className="w-full glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center animate-[slideUp_0.5s_ease-out] shadow-xl border border-red-500/10 dark:border-red-500/15 relative overflow-hidden">

            {/* Error background subtle glow */}
            <div className="absolute -top-20 w-40 h-40 rounded-full bg-red-500/5 blur-3xl pointer-events-none"></div>

            <div className="p-4 rounded-full bg-red-500/10 text-red-400 mb-4 animate-bounce">
              {error.type === 'RATE_LIMIT' ? (
                <ShieldAlert className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-slate-100">{error.title}</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-md leading-relaxed">
              {error.message}
            </p>
            
            {error.type === 'RATE_LIMIT' && (
              <div className="mt-5 text-xs text-indigo-400 font-semibold px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center gap-1.5">
                <Code className="w-4 h-4" />
                <span>Tip: Rate limits reset hourly.</span>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && profile && (
          <div className="flex flex-col gap-8">
            {/* 1. Profile Core Card */}
            <ProfileDetails profile={profile} />


            {/* 2. Insights panel */}
            <div className="w-full flex flex-col gap-3">
              <SectionTitle
                icon={GitBranch}
                title="Insights"
                subtitle="Most-used languages & repo signals"
              />
              <LanguageBreakdown repos={repos} />
            </div>

            {/* 3. Repository Sorting/Filtering/Listing */}
            <div className="w-full flex flex-col gap-4">
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2 px-1">
                <GitBranch className="w-5 h-5 text-indigo-400" />
                Repositories ({profile.public_repos})
              </h3>
              <RepositoryList repos={repos} />
            </div>
          </div>
        )}

        {/* Dynamic Welcome Landing Page (When no search has been made yet) */}
        {!isLoading && !error && !profile && (
          <div className="w-full glass-panel rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center animate-[slideUp_0.6s_ease-out] shadow-xl relative overflow-hidden">
            {/* Visual ambient glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"></div>

            <div className="relative p-5 rounded-3xl bg-gradient-to-tr from-indigo-500/15 to-purple-500/15 text-indigo-400 mb-6 border border-indigo-500/10 shadow-inner group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-md group-hover:opacity-40 transition"></div>
              <Sparkles className="relative w-10 h-10 animate-pulse" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-100 leading-tight">
              Analyze GitHub Profiles Instantly
            </h2>
            
            <p className="text-sm md:text-base text-slate-400 mt-3 max-w-lg leading-relaxed">
              Enter any developer's GitHub username above to instantly inspect their account creation metrics, popular repository breakdown, languages analytics, and contact channels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-10">
              <div className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">1. Search Profile</h4>
                <p className="text-[11px] text-slate-500">Query any username in seconds.</p>
              </div>

              <div className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">2. Parse Languages</h4>
                <p className="text-[11px] text-slate-500">Analyze the tech stacks they write.</p>
              </div>

              <div className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Bookmark className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">3. Save History</h4>
                <p className="text-[11px] text-slate-500">Track and jump back to past searches.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-800/10 dark:border-slate-800/20 mt-8 text-xs text-slate-500 font-medium">
        <p>Built with React &bull; Tailwind CSS v4 &bull; GitHub REST API</p>
      </footer>
    </div>
  );
}
