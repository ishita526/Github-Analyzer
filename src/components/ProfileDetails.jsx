import { 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Building, 
  Calendar, 
  ExternalLink,
  Users,
  UserPlus,
  BookOpen,
  FolderGit
} from 'lucide-react';

export default function ProfileDetails({ profile }) {
  const formatJoinDate = (isoString) => {
    if (!isoString) return 'Unknown';
    const date = new Date(isoString);
    return `Joined ${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  return (
    <div className="w-full rounded-2xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 animate-[slideUp_0.6s_ease-out] shadow-sm border border-stone-200 dark:border-white/5 bg-stone-50/50 dark:bg-stone-950/30 relative overflow-hidden">

      {/* Background subtle glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-lime-400/5 blur-3xl pointer-events-none"></div>

      {/* Header Info Block */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={profile.avatar_url}
            alt={`${profile.name || profile.login}'s avatar`}
            className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover border-4 border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-stone-900"
          />
        </div>

        {/* User Name and Handles */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
                {profile.name || profile.login}
              </h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-700 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 font-semibold text-sm md:text-base inline-flex items-center gap-1 mt-1 hover:underline group"
              >
                @{profile.login}
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Created at Date badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-lime-400/10 border border-lime-400/20 text-lime-700 dark:text-lime-400 text-xs font-semibold self-center md:self-start">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatJoinDate(profile.created_at)}</span>
            </div>
          </div>

          {/* User Bio */}
          <p className="mt-4 text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl">
            {profile.bio || (
              <span className="text-stone-500 dark:text-stone-400 italic">This profile has no bio.</span>
            )}
          </p>
        </div>
      </div>

      {/* Main Stats Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-stone-200 dark:border-white/5 pt-6">
        {/* Repositories */}
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-lime-400/15 text-lime-700 dark:text-lime-400">
              <FolderGit className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">Repos</p>
          </div>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">{profile.public_repos}</h3>
        </div>

        {/* Followers */}
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-lime-400/15 text-lime-700 dark:text-lime-400">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">Followers</p>
          </div>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">{profile.followers}</h3>
        </div>

        {/* Following */}
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-lime-400/15 text-lime-700 dark:text-lime-400">
              <UserPlus className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">Following</p>
          </div>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">{profile.following}</h3>
        </div>

        {/* Gists */}
        <div className="rounded-lg p-4 flex flex-col gap-2 bg-stone-100/50 dark:bg-stone-900/30 border border-stone-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-lime-400/15 text-lime-700 dark:text-lime-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">Gists</p>
          </div>
          <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">{profile.public_gists}</h3>
        </div>
      </div>

      {/* Meta/Social Info List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-200 dark:border-white/5 pt-6 text-sm">
        {/* Location */}
        <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
          <div className="text-stone-500 dark:text-stone-400">
            <MapPin className="w-4 h-4" />
          </div>
          <span>{profile.location || <span className="text-stone-500 dark:text-stone-400 italic">Not Available</span>}</span>
        </div>

        {/* Company */}
        <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
          <div className="text-stone-500 dark:text-stone-400">
            <Building className="w-4 h-4" />
          </div>
          <span>{profile.company || <span className="text-stone-500 dark:text-stone-400 italic">Not Available</span>}</span>
        </div>

        {/* Blog / Website */}
        <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
          <div className="text-stone-500 dark:text-stone-400">
            <LinkIcon className="w-4 h-4" />
          </div>
          {profile.blog ? (
            <a
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-700 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 hover:underline break-all truncate"
            >
              {profile.blog}
            </a>
          ) : (
            <span className="text-stone-500 dark:text-stone-400 italic">Not Available</span>
          )}
        </div>

        {/* Twitter */}
        <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
          <div className="text-stone-500 dark:text-stone-400">
            <Twitter className="w-4 h-4" />
          </div>
          {profile.twitter_username ? (
            <a
              href={`https://twitter.com/${profile.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-700 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 hover:underline"
            >
              @{profile.twitter_username}
            </a>
          ) : (
            <span className="text-stone-500 dark:text-stone-400 italic">Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
}
