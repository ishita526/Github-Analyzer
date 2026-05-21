export default function SkeletonLoader() {
  return (
    <div className="w-full flex flex-col gap-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Profile Details Skeleton */}
      <div className="w-full glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar Placeholder */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl shimmer animate-shimmer flex-shrink-0"></div>
          
          {/* Main Info Placeholders */}
          <div className="flex-1 flex flex-col gap-3 w-full items-center md:items-start">
            <div className="w-48 h-8 rounded-lg shimmer animate-shimmer"></div>
            <div className="w-24 h-4 rounded-md shimmer animate-shimmer"></div>
            <div className="w-full max-w-xl h-4 rounded-md shimmer animate-shimmer mt-3"></div>
            <div className="w-3/4 max-w-md h-4 rounded-md shimmer animate-shimmer"></div>
          </div>
        </div>

        {/* Stats Grid Placeholders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl shimmer animate-shimmer"></div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-16 h-3 rounded shimmer animate-shimmer"></div>
                <div className="w-10 h-6 rounded shimmer animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Grid Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/30 pt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full shimmer animate-shimmer"></div>
              <div className="w-32 h-4 rounded shimmer animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Breakdown Skeleton */}
      <div className="w-full glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-4">
        <div className="w-40 h-6 rounded shimmer animate-shimmer"></div>
        <div className="w-full h-4 rounded-full shimmer animate-shimmer mt-2"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-2xl glass-card">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shimmer animate-shimmer"></div>
                <div className="w-16 h-4 rounded shimmer animate-shimmer"></div>
              </div>
              <div className="w-10 h-3 rounded shimmer animate-shimmer ml-5 mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Repositories Skeleton */}
      <div className="w-full flex flex-col gap-6">
        {/* Controls Bar Placeholder */}
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between glass-panel p-4 rounded-2xl">
          <div className="w-full sm:w-48 h-9 rounded-xl shimmer animate-shimmer"></div>
          <div className="w-64 h-9 rounded-xl shimmer animate-shimmer"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="w-36 h-6 rounded shimmer animate-shimmer"></div>
                <div className="w-12 h-4 rounded-full shimmer animate-shimmer"></div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="w-full h-4 rounded shimmer animate-shimmer"></div>
                <div className="w-5/6 h-4 rounded shimmer animate-shimmer"></div>
              </div>
              <div className="border-t border-slate-800/30 pt-4 flex flex-col gap-3 mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shimmer animate-shimmer"></div>
                    <div className="w-16 h-3 rounded shimmer animate-shimmer"></div>
                  </div>
                  <div className="w-8 h-3 rounded shimmer animate-shimmer"></div>
                  <div className="w-8 h-3 rounded shimmer animate-shimmer"></div>
                  <div className="w-12 h-3 rounded shimmer animate-shimmer"></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="w-20 h-3 rounded shimmer animate-shimmer"></div>
                  <div className="w-24 h-3 rounded shimmer animate-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
