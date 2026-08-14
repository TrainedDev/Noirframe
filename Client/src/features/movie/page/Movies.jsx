import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCurrentMoviesInTheater,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcoming_movies,
  fetchPopularMovies,
  getMoviesPage,
} from "../movieSlice";
import { HeroSection } from "../component/HeroSection";
import MovieCards from "@/components/common/MovieCards";

const Home = () => {
  const {
    nowPlayingMoviesData,
    trendingMoviesData,
    topRatedMoviesData,
    upcomingMoviesData,
    popularMoviesData,
    loading: {
      nowPlayingLoading,
      topRatedLoading,
      trendingLoading,
      upcomingLoading,
      popularLoading,
    },
    error: {
      nowPlayingError,
      topRatedError,
      trendingError,
      upcomingError,
      popularError,
    },
  } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  // console.log(topRatedMoviesData, trendingMoviesData, popularMoviesData);

  useEffect(() => {
    dispatch(fetchCurrentMoviesInTheater());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchTrendingMovies());
    dispatch(fetchUpcoming_movies());
    dispatch(getMoviesPage(1363123));
  }, [dispatch]);

  const cardData = [
    {
      data: topRatedMoviesData,
      loading: topRatedLoading,
      error: topRatedError,
      heading: " Top Rated Movies",
      link: "/movie/lists?list-type=topRated",
    },
    {
      data: trendingMoviesData,
      loading: trendingLoading,
      error: trendingError,
      heading: "Trending Movies",
      link: "/movie/lists?list_type=trending",
    },
    {
      data: popularMoviesData,
      loading: popularLoading,
      error: popularError,
      heading: "Popular Movies",
      link: "/movie/lists?list_type=popularMovies",
    },
  ];
  return (
    <>
      <main className="w-full h-auto gap-5 flex flex-col bg-black">
        <HeroSection
          moviesData={nowPlayingMoviesData}
          moviesLoading={nowPlayingLoading}
          moviesError={nowPlayingError}
        />
        <MovieCards cards={cardData} />

        <HeroSection
          moviesData={upcomingMoviesData}
          moviesLoading={upcomingLoading}
          moviesError={upcomingError}
        />
      </main>
    </>
  );
};

export default Home;
