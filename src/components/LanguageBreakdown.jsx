import { BarChart3 } from 'lucide-react';

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
  Unknown: '#78716f'
};

export default function LanguageBreakdown({ repos }) {
  if (!repos || repos.length === 0) return null;

  const languageCounts = {};
  let totalWithLanguage = 0;

  repos.forEach((repo) => {
    const lang = repo.language;
    if (lang) {
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
      totalWithLanguage++;
    }
  });

  if (totalWithLanguage === 0) {
    return (
      <div className="w-full rounded-2xl p-8 animate-[slideUp_0.7s_ease-out] flex flex-col items-center justify-center text-center shadow-sm border border-stone-200 dark:border-white/5 bg-stone-50/50 dark:bg-stone-950/30">
        <BarChart3 className="w-8 h-8 text-stone-400 dark:text-stone-500 mb-3" />
        <h3 className="text-base font-bold text-stone-700 dark:text-stone-300">Language Statistics</h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">No language statistics available for these repositories.</p>
      </div>
    );
  }

  const sortedLanguages = Object.entries(languageCounts)
    .map(([name, count]) => {
      const percentage = ((count / totalWithLanguage) * 100).toFixed(1);

      const fallbackColor = (() => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
          hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
        }
        return `#${(hash % 16777215).toString(16).padStart(6, '0')}`;
      })();

      return {
        name,
        count,
        percentage: parseFloat(percentage),
        color: LANGUAGE_COLORS[name] || fallbackColor,
      };
    })
    .sort((a, b) => b.count - a.count);

  let mainLanguages = sortedLanguages;
  if (sortedLanguages.length > 5) {
    const top4 = sortedLanguages.slice(0, 4);
    const remaining = sortedLanguages.slice(4);
    const otherCount = remaining.reduce((acc, curr) => acc + curr.count, 0);
    const otherPercentage = parseFloat(((otherCount / totalWithLanguage) * 100).toFixed(1));
    
    mainLanguages = [
      ...top4,
      {
        name: 'Other',
        count: otherCount,
        percentage: otherPercentage,
        color: '#78716f'
      }
    ];
  }

  return (
    <div className="w-full rounded-2xl p-6 md:p-8 animate-[slideUp_0.7s_ease-out] shadow-sm border border-stone-200 dark:border-white/5 bg-stone-50/50 dark:bg-stone-950/30">
      {/* Stacked Percentage Bar */}
      <div className="w-full h-5 rounded-full flex overflow-hidden bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 mb-6">
        {mainLanguages.map((lang) => (
          <div
            key={lang.name}
            style={{ 
              width: `${lang.percentage}%`,
              backgroundColor: lang.color 
            }}
            className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full hover:scale-y-110 cursor-pointer relative"
            title={`${lang.name}: ${lang.percentage}% (${lang.count} ${lang.count === 1 ? 'repo' : 'repos'})`}
          />
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {mainLanguages.map((lang) => (
          <div key={lang.name} className="flex flex-col gap-1.5 p-3 rounded-lg bg-stone-100/50 dark:bg-stone-900/20 border border-stone-200 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-xs font-bold text-stone-900 dark:text-stone-50 truncate">{lang.name}</span>
            </div>
            <div className="flex justify-between items-baseline pl-5">
              <span className="text-[11px] text-stone-700 dark:text-stone-300 font-semibold">{lang.percentage}%</span>
              <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">({lang.count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
