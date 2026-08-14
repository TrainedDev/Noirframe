import MovieErrorPage from "@/components/common/MovieErrorPage";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <MovieErrorPage
      title="Oops! The Movie Reel Snapped!"
      message="Something went wrong behind the scenes. Even our popcorn machine is confused."
      error={error}
      onRetry={resetErrorBoundary}
    />
  );
};

const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error(error);
        console.error(info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;