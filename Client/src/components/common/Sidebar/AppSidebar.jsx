import {
  Home,
  Inbox,
  Search,
  Settings,
  X,
  Filter,
  Film,
  Heart,
  Clock3,
} from "lucide-react";
import { Link } from "react-router";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Movies",
    url: "/movie/lists",
    icon: Film,
  },
  {
    title: "Trending",
    url: "/movie/lists?list_type=trending",
    icon: Filter,
  },
  {
    title: "Search",
    url: "/movie/search/lists",
    icon: Search,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Watch History",
    url: "/history",
    icon: Clock3,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AppSidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-dvh
          w-[280px] sm:w-[320px]
          bg-neutral-950
          border-r border-white/10
          shadow-2xl
          text-white
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center"
          >
            <img
              src="/web_name.png"
              alt="NoirFrame"
              className="w-32 sm:w-36"
            />
          </Link>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-white/70
              hover:bg-white/10
              hover:text-white
              transition
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-3 overflow-y-auto h-[calc(100dvh-4rem)]">
          <p className="px-3 pt-2 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Discover
          </p>

          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={onClose}
                  className="
                    group
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-3
                    text-sm font-medium
                    text-white/70
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  <Icon
                    className="
                      h-5 w-5
                      text-white/50
                      transition
                      group-hover:text-red-500
                    "
                  />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom section */}
          <div className="mt-auto pt-6">
            <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4">
              <p className="text-sm font-semibold text-white">
                Welcome to NoirFrame
              </p>

              <p className="mt-1 text-xs leading-relaxed text-white/50">
                Discover movies, explore recommendations and find your next
                favorite film.
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;