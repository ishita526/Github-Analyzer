import { useState, useEffect } from 'react';
import {
  Github,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  Bookmark,
  GitBranch,
  Search,
  Code,
  ChevronRight
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const root = window.document.documentElement;
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);


  const handleSearch = async (username) => {
    if (!username) return;
    setIsLoading(true);
    setError(null);

    try {
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

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      let reposData = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      setProfile(profileData);
      setRepos(reposData);

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
      setProfile(null);
      setRepos(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHistory = (username) => {
    const normUser = username.trim();
    const filtered = history.filter(u => u.toLowerCase() !== normUser.toLowerCase());
    const updated = [normUser, ...filtered].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  const handleRemoveHistoryItem = (username) => {
    const updated = history.filter((u) => u !== username);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Fixed Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-stone-200 dark:border-white/10 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-lime-400 rounded-md text-stone-950 relative">
              <Github className="w-5 h-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 bg-lime-400"></span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-50">
                GitScope
              </h1>
              <p className="text-[9px] font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Profile Analyzer
              </p>
            </div>
          </div>

          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-8">
          
          {/* Search Section */}
          <div className="animate-[fadeIn_0.4s_ease-out]">
            <SearchInput
              onSearch={handleSearch}
              history={history}
              onRemoveHistoryItem={handleRemoveHistoryItem}
              onClearHistory={handleClearHistory}
              isLoading={isLoading}
            />
          </div>

          {/* Results Container */}
          <div className="w-full flex flex-col gap-8">
            {isLoading && <SkeletonLoader />}

            {!isLoading && error && (
              <div className="w-full rounded-2xl p-8 flex flex-col items-center justify-center text-center animate-[slideUp_0.5s_ease-out] shadow-sm border border-red-500/20 dark:border-red-500/15 bg-stone-50/60 dark:bg-stone-950/40 relative overflow-hidden">

                <div className="absolute -top-20 w-40 h-40 rounded-full bg-red-500/5 blur-3xl pointer-events-none"></div>

                <div className="p-4 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 mb-4">
                  {error.type === 'RATE_LIMIT' ? (
                    <ShieldAlert className="w-8 h-8" />
                  ) : (
                    <AlertCircle className="w-8 h-8" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">{error.title}</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-md leading-relaxed">
                  {error.message}
                </p>
                
                {error.type === 'RATE_LIMIT' && (
                  <div className="mt-5 text-xs text-lime-700 dark:text-lime-400 font-semibold px-4 py-2 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center gap-1.5">
                    <Code className="w-4 h-4" />
                    <span>Tip: Rate limits reset hourly.</span>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !error && profile && (
              <div className="flex flex-col gap-8">
                <ProfileDetails profile={profile} />

                <div className="w-full flex flex-col gap-3">
                  <SectionTitle
                    icon={GitBranch}
                    title="Languages"
                    subtitle="Most-used technologies"
                  />
                  <LanguageBreakdown repos={repos} />
                </div>

                <div className="w-full flex flex-col gap-4">
                  <SectionTitle
                    icon={GitBranch}
                    title="Repositories"
                    subtitle={`${profile.public_repos} total repositories`}
                  />
                  <RepositoryList repos={repos} />
                </div>
              </div>
            )}

            {!isLoading && !error && !profile && (
              <div className="w-full rounded-2xl p-8 md:p-16 text-center flex flex-col items-center justify-center animate-[slideUp_0.6s_ease-out] shadow-sm relative overflow-hidden border border-stone-200 dark:border-white/5 bg-stone-50/40 dark:bg-stone-950/20">
                
                <div className="relative p-5 rounded-2xl bg-lime-400/10 border border-lime-400/20 text-lime-700 dark:text-lime-400 mb-6">
                  <Sparkles className="w-10 h-10" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
                  Analyze GitHub Profiles
                </h2>
                
                <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 mt-4 max-w-xl leading-relaxed">
                  Search any GitHub username to instantly inspect their profile metrics, popular repositories, language breakdown, and more.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-12">
                  <div className="rounded-xl p-5 flex flex-col items-center gap-3 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
                    <div className="p-2.5 rounded-lg bg-lime-400/15 border border-lime-400/30 text-lime-700 dark:text-lime-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">Search Profile</h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">Query any username in seconds.</p>
                  </div>

                  <div className="rounded-xl p-5 flex flex-col items-center gap-3 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
                    <div className="p-2.5 rounded-lg bg-lime-400/15 border border-lime-400/30 text-lime-700 dark:text-lime-400">
                      <Code className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">Analyze Languages</h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">See their tech stacks instantly.</p>
                  </div>

                  <div className="rounded-xl p-5 flex flex-col items-center gap-3 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
                    <div className="p-2.5 rounded-lg bg-lime-400/15 border border-lime-400/30 text-lime-700 dark:text-lime-400">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wide">Save History</h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">Quick access to past searches.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-white/10 py-6 px-4 md:px-8 bg-stone-50/50 dark:bg-stone-950/50">
        <div className="max-w-6xl mx-auto text-center text-xs text-stone-600 dark:text-stone-400 font-medium">
          <p>Built with React • Tailwind CSS • GitHub REST API</p>
        </div>
      </footer>
    </div>
  );
}
