import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  fetchTopMovies,
  fetchTrendingMovies,
  getFilterMovieLists,
} from "@/Redux/Slices/movieSlice";
import { storeBoolean, storeMovieFilters } from "@/Redux/Slices/componentSlice";
import { Link, useNavigate } from "react-router";
import { Languages } from "lucide-react";
import { DataLoading } from "../LoadingPage";

const MoviesList = ({ movieListName }) => {
  const [count, setCount] = useState(5);
  const [zoom, setZoom] = useState(false);
  const [movieFilter, setMovieFilter] = useState(false);
  const [movieLists, setMovieLists] = useState(null);
  const navigate = useNavigate();
  const {
    trendingMoviesData,
    topMoviesData,
    popularMoviesData,
    filterMoviesData,
    loading: {
      trendingLoading,
      topLoading,
      popularLoading,
      filterLoading,
    },
    error: {
      trendingError,
      topError,
      popularError,
      filterError,
    },
  } = useSelector((state) => state.movieData);
  const {
    genres,
    tags,
    yearGte,
    yearLte,
    runtimeGte,
    runtimeLte,
    sortBy,
    selectedLists,
  } = useSelector((state) => state.componentData);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (movieListName === "topRated") {
        dispatch(fetchTopMovies());
        setMovieLists(topMoviesData);
      } else if (movieListName === "trending") {
        dispatch(fetchTrendingMovies());
        setMovieLists(trendingMoviesData);
      } else {
        dispatch(fetchPopularMovies());
        setMovieLists(popularMoviesData);
      }
    };
    fetchData();
  }, [
    movieListName,
    dispatch,
    trendingMoviesData,
    topMoviesData,
    popularMoviesData,
  ]);

  const loading =
    trendingLoading ||
    topLoading ||
    popularLoading ||
    filterLoading;

  const error =
    trendingError || topError || popularError || filterError;

  useEffect(() => {
    const fetchFilteredLists = async () => {
      if (filterMoviesData) {
        setMovieLists(filterMoviesData);
      }
    };
    fetchFilteredLists();
  }, [filterMoviesData, movieLists]);

  return (
    <div className="w-full h-auto overflow-x-hidden p-3">
      <section className="bg-black flex flex-col h-full items-center text-sm sm:text-base">
        <div className="w-full text-gray-300 h-auto pb-3 overflow-hidden flex flex-col gap-y-1 text-sm text-md font-light lg:flex lg:items-center lg:h-30 lg:justify-between ">
          <h2 className="text-base font-medium w-auto h-8 flex justify-center items-center p-6 capitalize  lg:h-[90%]">
            Showing 1-{movieLists?.length - 1} of {movieLists?.length} results
          </h2>
          <div className="w-full h-full gap-3 flex justify-center items-center lg:justify-end lg:w-[30%]">
            <select
              className="w-[25%] p-2 outline-none capitalize rounded-xs overflow-y-scroll bg-[#0a0a0a] lg:w-[90%] "
              onChange={(e) => {
                dispatch(storeMovieFilters({ sortBy: e.target.value }));
                dispatch(
                  getFilterMovieLists({
                    genres,
                    tags,
                    yearGte,
                    yearLte,
                    runtimeGte,
                    runtimeLte,
                    sortBy,
                  })
                );
                console.log(filterMoviesData);
              }}
            >
              <option className="w-2 h-auto" value="" disabled>
                sort by
              </option>
              <option className="w-2 h-auto" value="original_title.asc">
                A to Z
              </option>
              <option className="w-2 h-auto" value="original_title.desc">
                Z to A
              </option>
              <option
                className="w-2 h-auto"
                value={"primary_release_date.desc"}
              >
                latest
              </option>
              <option className="w-2 h-auto" value="primary_release_date.asc">
                oldest
              </option>
            </select>
            <button
              className="bg-[#0a0a0a] p-2 w-[25%] cursor-pointer rounded-xs h-[90%] lg:hidden"
              onClick={() => {
                setMovieFilter(true);
                dispatch(storeBoolean({ filterSidebar: movieFilter }));
              }}
            >
              Filter {selectedLists}
            </button>
          </div>
        </div>
        {loading ? (
          <DataLoading />
        ) : movieLists ? (
          <div className="w-full h-auto gap-4 items-center flex flex-col p-5">
            <ul className="w-[90%] h-auto grid grid-cols-2 capitalize gap-1 justify-items-center sm:grid-cols-3 lg:gap-4 lg:w-full lg:grid-cols-4">
              {movieLists?.slice(0, count).map((ele, item) => (
                <li
                  onTouchStart={() => setZoom(item)}
                  onTouchEnd={() => setZoom(null)}
                  onMouseEnter={() => setZoom(item)}
                  onMouseLeave={() => setZoom(null)}
                  onClick={() => navigate(`/movie/page/${ele.id}`)}
                  className={` w-full h-full flex rounded-xs overflow-hidden cursor-pointer lg:h-85 lg:relative`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w342/${ele?.poster_path}`}
                    className={`z-0 w-full h-full object-center object-contain transition-all duration-700 lg:absolute ${
                      zoom === item
                        ? "scale-135 lg:scale-145"
                        : "scale-100 lg:scale-115"
                    }`}
                  />
                  <div
                    className={`absolute w-full bg-neutral-900/90 text-white/90  h-full hidden flex-col items-start justify-center cursor-pointer transition-all duration-700 gap-6 p-2 lg:flex ${
                      zoom === item ? "translate-x-0" : "translate-x-100"
                    } `}
                  >
                    <h1 className="text-xl font-bold text-white text-start mt-10">
                      {ele.original_title}
                    </h1>
                    <span className="flex justify-start gap-10 w-full items-center">
                      <p>{ele.vote_average}</p>
                      <span className="flex w-auto gap-1 h-auto justify-start items-center">
                        <Languages className="w-4" />
                        <p>{ele.original_language === "en" && "english"}</p>
                      </span>
                    </span>
                    <p className="line-clamp-2 text-sm w-[90%]">
                      {ele.overview}
                    </p>
                    <Link
                      to={`/movie/page/${ele.id}`}
                      className="flex flex-col items-center w-full h-auto"
                    >
                      <button className="w-full h-10 hover:animate-pulse rounded-sm text-base capitalize font-bold bg-red-600">
                        watch now
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="w-full h-auto flex justify-center items-center">
              {movieLists?.length > count ? (
                <button
                  className=" hover:animate-bounce w-[70%] p-2 text-sm sm:text-base capitalize text-white bg-red-600 sm:w-[35%] sm:p-2 font-medium rounded-sm  cursor-pointer"
                  onClick={() => setCount((prev) => prev + 3)}
                >
                  load more
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <img src={error} />
        )}
      </section>
    </div>
  );
};

export default MoviesList;
