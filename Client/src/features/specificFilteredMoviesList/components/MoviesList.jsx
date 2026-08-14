import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "../../movie/movieSlice";
import {
  getFilterMovieLists,
  storeBoolean,
  storeMovieFilters,
} from "../specificFilteredMoviesListSlice";
import { Link, useNavigate } from "react-router";
import { Languages } from "lucide-react";
import { DataLoading } from "@/components/ui/LoadingPage";

const MoviesList = ({ movieListName }) => {
  const [count, setCount] = useState(5);
  const [zoom, setZoom] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    trendingMoviesData,
    topRatedMoviesData,
    popularMoviesData,
    loading: {
      trendingLoading,
      topRatedLoading,
      popularLoading,
    },
    error: {
      trendingError,
      topRatedError,
      popularError,
    },
  } = useSelector((state) => state.movie);

  const {
    filterMoviesData,
    loading: { filterLoading },
    error: { filterError },
    genres,
    tags,
    yearGte,
    yearLte,
    runtimeGte,
    runtimeLte,
    // sortBy,
    selectedLists,
  } = useSelector((state) => state.filterMovie);

  // Fetch the correct movie list
  useEffect(() => {
    if (movieListName === "topRated") {
      dispatch(fetchTopRatedMovies());
    } else if (movieListName === "trending") {
      dispatch(fetchTrendingMovies());
    } else if (movieListName === "popular") {
      dispatch(fetchPopularMovies());
    }
  }, [movieListName, dispatch]);

  // Decide which data should be displayed
  const movieLists =
    filterMoviesData ||
    (movieListName === "topRated"
      ? topRatedMoviesData
      : movieListName === "trending"
        ? trendingMoviesData
        : popularMoviesData);

  // Decide loading state
  let movieLoading = false;
  let movieError = null;

  if (filterMoviesData) {
    movieLoading = filterLoading;
    movieError = filterError;
  } else if (movieListName === "topRated") {
    movieLoading = topRatedLoading;
    movieError = topRatedError;
  } else if (movieListName === "trending") {
    movieLoading = trendingLoading;
    movieError = trendingError;
  } else if (movieListName === "popular") {
    movieLoading = popularLoading;
    movieError = popularError;
  }

  const getPosterSize = () => {
    if (window.innerWidth < 480) return "w342";
    if (window.innerWidth < 768) return "w500";
    return "w780";
  };

  return (
    <div className="w-full h-auto overflow-x-hidden p-3">
      <section className="bg-black flex flex-col h-full items-center text-sm sm:text-base">
        {/* Header */}
        <div className="w-full text-gray-300 h-auto pb-3 overflow-hidden flex flex-col gap-y-1 text-sm text-md font-light lg:flex lg:items-center lg:h-30 lg:justify-between">
          <h2 className="text-base font-medium w-auto h-8 flex justify-center items-center p-6 capitalize lg:h-[90%]">
            Showing 1-{movieLists?.length ?? 0} of{" "}
            {movieLists?.length ?? 0} results
          </h2>

          <div className="w-full h-full gap-3 flex justify-center items-center lg:justify-end lg:w-[30%]">
            <select
              className="w-[25%] p-2 outline-none capitalize rounded-xs overflow-y-scroll bg-[#0a0a0a] lg:w-[90%]"
              onChange={(e) => {
                const newSortBy = e.target.value;

                dispatch(
                  storeMovieFilters({
                    sortBy: newSortBy,
                  })
                );

                dispatch(
                  getFilterMovieLists({
                    genres,
                    tags,
                    yearGte,
                    yearLte,
                    runtimeGte,
                    runtimeLte,
                    sortBy: newSortBy,
                  })
                );
              }}
            >
              <option value="" disabled>
                sort by
              </option>

              <option value="original_title.asc">
                A to Z
              </option>

              <option value="original_title.desc">
                Z to A
              </option>

              <option value="primary_release_date.desc">
                latest
              </option>

              <option value="primary_release_date.asc">
                oldest
              </option>
            </select>

            <button
              className="bg-[#0a0a0a] p-2 w-[25%] cursor-pointer rounded-xs h-[90%] lg:hidden"
              onClick={() => {
                dispatch(
                  storeBoolean({
                    filterSidebar: true,
                  })
                );
              }}
            >
              Filter {selectedLists}
            </button>
          </div>
        </div>

        {/* Loading */}
        {movieLoading ? (
          <DataLoading />
        ) : movieLists?.length ? (
          <div className="w-full h-auto gap-4 items-center flex flex-col p-5">
            <ul className="w-[90%] h-auto grid grid-cols-2 capitalize gap-1 justify-items-center sm:grid-cols-3 lg:gap-4 lg:w-full lg:grid-cols-4">
              {movieLists.slice(0, count).map((ele, index) => (
                <li
                  key={ele.id}
                  onTouchStart={() => setZoom(index)}
                  onTouchEnd={() => setZoom(null)}
                  onMouseEnter={() => setZoom(index)}
                  onMouseLeave={() => setZoom(null)}
                  onClick={() =>
                    navigate(`/movie/page/${ele.id}`)
                  }
                  className={`
                    w-full h-full flex rounded-xs overflow-hidden
                    cursor-pointer lg:h-85 lg:relative
                  `}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/${getPosterSize()}${ele.poster_path}`}
                    loading="lazy"
                    alt={ele.original_title}
                    className={`
                      z-0 w-full h-full object-center object-contain
                      transition-all duration-700 lg:absolute
                      ${
                        zoom === index
                          ? "scale-135 lg:scale-145"
                          : "scale-100 lg:scale-115"
                      }
                    `}
                  />

                  <div
                    className={`
                      absolute w-full bg-neutral-900/90
                      text-white/90 h-full hidden flex-col
                      items-start justify-center cursor-pointer
                      transition-all duration-700 gap-6 p-2 lg:flex
                      ${
                        zoom === index
                          ? "translate-x-0"
                          : "translate-x-100"
                      }
                    `}
                  >
                    <h1 className="text-xl font-bold text-white text-start mt-10">
                      {ele.original_title}
                    </h1>

                    <span className="flex justify-start gap-10 w-full items-center">
                      <p>{ele.vote_average}</p>

                      <span className="flex w-auto gap-1 h-auto justify-start items-center">
                        <Languages className="w-4" />

                        <p>
                          {ele.original_language === "en"
                            ? "english"
                            : ele.original_language}
                        </p>
                      </span>
                    </span>

                    <p className="line-clamp-2 text-sm w-[90%]">
                      {ele.overview}
                    </p>

                    <Link
                      to={`/movie/page/${ele.id}`}
                      className="flex flex-col items-center w-full h-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="w-full h-10 hover:animate-pulse rounded-sm text-base capitalize font-bold bg-red-600">
                        watch now
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            {/* Load more */}
            {movieLists.length > count && (
              <div className="w-full h-auto flex justify-center items-center">
                <button
                  className="hover:animate-bounce w-[70%] p-2 text-sm sm:text-base capitalize text-white bg-red-600 sm:w-[35%] sm:p-2 font-medium rounded-sm cursor-pointer"
                  onClick={() =>
                    setCount((prev) => prev + 3)
                  }
                >
                  load more
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-white">
            {movieError || "No movies found"}
          </div>
        )}
      </section>
    </div>
  );
};

export default MoviesList;