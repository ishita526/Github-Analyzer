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
  // Format join date, e.g. "Joined May 21, 2018"
  const formatJoinDate = (isoString) => {
    if (!isoString) return 'Joined Unknown';
    const date = new Date(isoString);
    return `Joined ${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 animate-[slideUp_0.6s_ease-out] shadow-xl relative overflow-hidden">
      {/* Background soft color glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

      {/* Header Info Block */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        {/* Avatar */}
        <div className="relative group">
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 opacity-60 blur-md group-hover:opacity-100 transition duration-500"></div>
          <img
            src={profile.avatar_url}
            alt={`${profile.name || profile.login}'s avatar`}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-slate-900/10 dark:border-slate-100/10 bg-slate-800"
          />
        </div>

        {/* User Name and Handles */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 leading-tight">
                {profile.name || profile.login}
              </h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm md:text-base inline-flex items-center gap-1 mt-1 hover:underline group"
              >
                @{profile.login}
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Created at Date badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 border border-indigo-500/15 text-indigo-300 text-xs font-semibold self-center md:self-start">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatJoinDate(profile.created_at)}</span>
            </div>
          </div>

          {/* User Bio */}
          <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            {profile.bio || (
              <span className="text-slate-500 italic">This profile has no bio.</span>
            )}
          </p>
        </div>
      </div>

      {/* Main Stats Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Repositories */}
        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <FolderGit className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Repositories</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-100 mt-0.5">{profile.public_repos}</h3>
          </div>
        </div>

        {/* Followers */}
        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Followers</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-100 mt-0.5">{profile.followers}</h3>
          </div>
        </div>

        {/* Following */}
        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Following</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-100 mt-0.5">{profile.following}</h3>
          </div>
        </div>

        {/* Gists */}
        <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public Gists</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-100 mt-0.5">{profile.public_gists}</h3>
          </div>
        </div>
      </div>

      {/* Meta/Social Info List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800 dark:border-slate-800/50 pt-6 text-sm">
        {/* Location */}
        <div className="flex items-center gap-3 text-slate-300">
          <div className="text-slate-400">
            <MapPin className="w-4 h-4" />
          </div>
          <span>{profile.location || <span className="text-slate-500 italic">Not Available</span>}</span>
        </div>

        {/* Company */}
        <div className="flex items-center gap-3 text-slate-300">
          <div className="text-slate-400">
            <Building className="w-4 h-4" />
          </div>
          <span>{profile.company || <span className="text-slate-500 italic">Not Available</span>}</span>
        </div>

        {/* Blog / Website */}
        <div className="flex items-center gap-3 text-slate-300">
          <div className="text-slate-400">
            <LinkIcon className="w-4 h-4" />
          </div>
          {profile.blog ? (
            <a
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 hover:underline break-all truncate"
            >
              {profile.blog}
            </a>
          ) : (
            <span className="text-slate-500 italic">Not Available</span>
          )}
        </div>

        {/* Twitter */}
        <div className="flex items-center gap-3 text-slate-300">
          <div className="text-slate-400">
            <Twitter className="w-4 h-4" />
          </div>
          {profile.twitter_username ? (
            <a
              href={`https://twitter.com/${profile.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              @{profile.twitter_username}
            </a>
          ) : (
            <span className="text-slate-500 italic">Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
}
