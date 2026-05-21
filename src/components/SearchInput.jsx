import { useState } from 'react';
import { Search, X, Trash2 } from 'lucide-react';

export default function SearchInput({ onSearch, history, onRemoveHistoryItem, onClearHistory, isLoading }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Please enter a GitHub username');
      return;
    }
    setError('');
    onSearch(trimmed);
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 animate-[slideUp_0.5s_ease-out]">
      {/* Hero Title */}
      <div className="mb-2">
        <p className="text-xs font-mono uppercase tracking-widest text-lime-700 dark:text-lime-400 mb-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-lime-400 rounded-full"></span>
          Search Developers
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
          Find any GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-400">profile</span>
        </h2>
      </div>

      {/* Search Box Form */}
      <form onSubmit={handleSubmit} className="relative w-full mt-4">
        <div className="relative flex items-center">
          <div className="absolute left-5 text-stone-400 dark:text-stone-500">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Search GitHub username... (e.g., gaearon, torvalds)"
            className="w-full pl-14 pr-28 py-3.5 rounded-lg border border-stone-200 dark:border-white/10 bg-white dark:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-lime-400/50 text-stone-900 dark:text-stone-50 placeholder-stone-400 dark:placeholder-stone-500 transition-all duration-300 disabled:opacity-50 text-base shadow-sm"
            id="github-username-input"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {username && (
              <button
                type="button"
                onClick={() => setUsername('')}
                className="p-2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-400 cursor-pointer rounded-md transition-colors"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="bg-lime-400 hover:bg-lime-500 text-stone-950 font-semibold px-4 py-2 rounded-md transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50 text-sm flex items-center gap-2"
              id="search-submit-btn"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-2 ml-2 animate-[fadeIn_0.2s_ease-out] font-medium flex items-center gap-1">
            {error}
          </p>
        )}
      </form>

      {/* Search History Panel */}
      {history && history.length > 0 && (
        <div className="w-full p-4 rounded-lg flex flex-col gap-3 border border-stone-200 dark:border-white/10 bg-stone-50/50 dark:bg-stone-950/30">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-600 dark:text-stone-400 tracking-wide uppercase px-1">
            <span className="flex items-center gap-1.5">
              Recent Searches
            </span>
            <button
              onClick={onClearHistory}
              className="text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
              title="Clear all history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {history.map((user) => (
              <div
                key={user}
                className="group flex items-center gap-1.5 bg-lime-400/10 dark:bg-lime-400/5 hover:bg-lime-400/20 dark:hover:bg-lime-400/10 border border-lime-400/30 dark:border-lime-400/20 rounded-lg pl-3 pr-2 py-1.5 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => {
                    setUsername(user);
                    onSearch(user);
                  }}
                  className="text-xs font-medium text-lime-700 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 cursor-pointer"
                >
                  {user}
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveHistoryItem(user)}
                  className="text-stone-400 dark:text-stone-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                  title={`Remove ${user}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
