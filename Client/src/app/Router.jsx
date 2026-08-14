import MovieErrorPage from "@/components/common/MovieErrorPage";
import Home from "@/features/movie/page/Movies";
import MovieDetails from "@/features/movieDetails/page/MovieDetails";
import ReviewPage from "@/features/review/page/ReviewPage";
import SearchedUsersMovies from "@/features/searchedMovie/page/SearchedUsersMovies";
import SpecificMovieLists from "@/features/specificFilteredMoviesList/page/SpecificFilteredMoviesList";
import TagsPage from "@/features/tags/page/TagsPage";
import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";

// Assign the execution result directly to the variable (No function wrapper)
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // This correctly renders Home at the base "/" URL
        element: <Home />,
      },
      {
        path: "/movie/page/:id",
        element: <MovieDetails />,
      },
      {
        path: "/movie/lists",
        element: <SpecificMovieLists />,
      },
      {
        path: " /movie/:name/lists/:id",
        element: <TagsPage />,
      },
      {
        path: "/movie/review/lists/:id",
        element: <ReviewPage />,
      },
      {
        path: "/movie/search/lists",
        element: <SearchedUsersMovies />,
      },
      {
        path: "*",
        element: (
          <MovieErrorPage
            title="Movie Not Found 🎬"
            message="Looks like this movie wandered off the reel."
            showRetry={false}
          />
        ),
      },
    ],
  },
]);
