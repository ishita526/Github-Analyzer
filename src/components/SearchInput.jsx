import { useState } from 'react';
import { Search, RotateCcw, X, Trash2 } from 'lucide-react';

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
      {/* Search Box Form */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            disabled={isLoading}
            placeholder="Search GitHub username... (e.g., gaearon, torvalds)"
            className="w-full pl-12 pr-24 py-4 rounded-2xl glass-panel focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-100 placeholder-slate-400 transition-all duration-300 disabled:opacity-50 text-base shadow-lg"
            id="github-username-input"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {username && (
              <button
                type="button"
                onClick={() => setUsername('')}
                className="p-2 text-slate-400 hover:text-slate-200 cursor-pointer rounded-xl"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 text-sm flex items-center gap-2"
              id="search-submit-btn"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-2 ml-2 animate-[fadeIn_0.2s_ease-out] font-medium flex items-center gap-1">
            {error}
          </p>
        )}
      </form>

      {/* Search History Panel */}
      {history && history.length > 0 && (
        <div className="w-full glass-card p-4 rounded-2xl flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 tracking-wide uppercase px-1">
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              Recent Searches
            </span>
            <button
              onClick={onClearHistory}
              className="text-red-400/80 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
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
                className="group flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/15 rounded-xl pl-3 pr-2 py-1.5 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => {
                    setUsername(user);
                    onSearch(user);
                  }}
                  className="text-xs font-medium text-indigo-300 hover:text-indigo-200 cursor-pointer"
                >
                  {user}
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveHistoryItem(user)}
                  className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
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
