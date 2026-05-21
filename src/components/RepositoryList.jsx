import { useState, useMemo } from 'react';
import { 

  Star, 
  GitFork, 
  Search, 
  ArrowUpDown, 
  ExternalLink,
  Code2,
  Calendar,
  Scale,
  Database
} from 'lucide-react';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Unknown: '#64748b'
};

export default function RepositoryList({ repos }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars'); // 'stars' | 'forks' | 'updated'

  // Format date to "Updated 2 days ago" or "Updated on Oct 12, 2023"
  const formatUpdateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    
    return `Updated on ${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  // Convert size in KB to beautiful format
  const formatSize = (sizeKB) => {
    if (sizeKB < 1024) return `${sizeKB} KB`;
    return `${(sizeKB / 1024).toFixed(1)} MB`;
  };

  // Filter and Sort repos
  const processedRepos = useMemo(() => {
    if (!repos) return [];

    let result = [...repos];

    // Filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          (repo.description && repo.description.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === 'forks') {
        return b.forks_count - a.forks_count;
      }
      if (sortBy === 'updated') {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

    return result;
  }, [repos, searchTerm, sortBy]);

  return (
    <div className="w-full flex flex-col gap-6 animate-[slideUp_0.8s_ease-out]">
      {/* Controls Bar (Filter + Sort) */}
      <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between glass-panel p-4 rounded-2xl shadow-md">
        {/* Repo Search */}
        <div className="relative w-full sm:max-w-xs flex items-center">
          <div className="absolute left-3 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter repositories..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/20 dark:bg-slate-100/5 focus:outline-none focus:ring-1.5 focus:ring-indigo-500/50 text-slate-100 placeholder-slate-400 transition-all text-sm border border-slate-800 dark:border-slate-800/30"
          />
        </div>

        {/* Sorting Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-2 whitespace-nowrap">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by:
          </span>
          {[
            { id: 'stars', label: 'Stars' },
            { id: 'forks', label: 'Forks' },
            { id: 'updated', label: 'Updated' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                sortBy === option.id
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-slate-800/40 dark:bg-slate-100/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 dark:hover:bg-slate-100/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Repositories Grid */}
      {processedRepos.length === 0 ? (
        <div className="w-full glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center">
          <Code2 className="w-12 h-12 text-slate-500 mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No Repositories Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            {searchTerm 
              ? `No repositories matched your search query "${searchTerm}". Try a different keyword.`
              : 'This user does not have any public repositories available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {processedRepos.map((repo) => (
            <div
              key={repo.id}
              className="glass-card rounded-2xl p-5 md:p-6 flex flex-col justify-between h-full relative overflow-hidden"
            >
              <div>
                {/* Repo Header */}
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-lg font-bold text-slate-100 hover:text-indigo-400 transition-colors break-all leading-snug">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 group"
                    >
                      {repo.name}
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h4>
                  {repo.private ? (
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">Private</span>
                  ) : (
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/15 font-semibold">Public</span>
                  )}
                </div>

                {/* Repo Description */}
                <p className="text-slate-300 text-sm mt-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                  {repo.description || (
                    <span className="text-slate-500 italic">No description provided.</span>
                  )}
                </p>
              </div>

              {/* Repo Footer Stats and Tags */}
              <div className="mt-5 pt-4 border-t border-slate-800 dark:border-slate-800/30 flex flex-col gap-3 text-xs">
                {/* Meta stats line */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-slate-400 font-semibold">
                  {/* Language Badge */}
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#64748b' }}
                    />
                    <span>{repo.language || 'Unknown'}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors" title={`${repo.stargazers_count} stars`}>
                    <Star className="w-3.5 h-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </div>

                  {/* Forks */}
                  <div className="flex items-center gap-1 hover:text-indigo-400 transition-colors" title={`${repo.forks_count} forks`}>
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{repo.forks_count}</span>
                  </div>

                  {/* Size */}
                  <div className="flex items-center gap-1" title={`Size: ${repo.size} KB`}>
                    <Database className="w-3.5 h-3.5" />
                    <span>{formatSize(repo.size)}</span>
                  </div>
                </div>

                {/* Additional footer tags */}
                <div className="flex items-center justify-between gap-3 text-[11px] text-slate-500 pt-1">
                  {/* License */}
                  <div className="flex items-center gap-1 font-medium truncate max-w-[150px]">
                    <Scale className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{repo.license ? repo.license.spdx_id || repo.license.name : 'No License'}</span>
                  </div>

                  {/* Update time */}
                  <div className="flex items-center gap-1 font-medium flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    <span>{formatUpdateTime(repo.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
