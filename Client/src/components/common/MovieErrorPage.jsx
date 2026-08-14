import { useNavigate } from "react-router";
import { Home, RotateCcw, Film, Ghost } from "lucide-react";

const MovieErrorPage = ({
  title = "Well... That Was a Plot Twist!",
  message = "Something went wrong while playing this movie scene.",
  error,
  showRetry = true,
}) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-dvh w-full bg-black text-white flex items-center justify-center px-5 overflow-hidden">
      <div className="relative w-full max-w-2xl text-center">

        {/* Decorative movie icons */}
        <div className="absolute -top-10 left-5 rotate-12 opacity-20">
          <Film className="w-16 h-16" />
        </div>

        <div className="absolute -bottom-10 right-5 -rotate-12 opacity-20">
          <Ghost className="w-16 h-16" />
        </div>

        {/* 404 / error number */}
        <div className="relative flex justify-center items-center mb-6">
          <span className="text-[100px] sm:text-[150px] font-black leading-none text-red-600/20">
            404
          </span>

          <div className="absolute">
            <Film className="w-16 h-16 sm:w-24 sm:h-24 text-red-600 animate-pulse" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          {title}
        </h1>

        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          {message}
        </p>

        {/* Error details */}
        {error && (
          <details className="mt-6 text-left max-w-xl mx-auto">
            <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-300">
              Show technical details
            </summary>

            <pre className="mt-3 p-4 rounded bg-neutral-900 text-red-400 text-xs overflow-auto max-h-40">
              {error.toString()}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

          {showRetry && (
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-red-600 hover:bg-red-700 transition-colors font-semibold"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-600">
          Don't worry. No movies were harmed during this error.
        </p>
      </div>
    </main>
  );
};

export default MovieErrorPage;