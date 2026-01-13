import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router";
import ZoomContent from "./ZoomContent";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCurrentMoviesInTheater,
  fetchTrendingMovies,
  fetchTopMovies,
  fetchUpcoming_movies,
  fetchPopularMovies,
  getMoviesPage,
} from "@/Redux/Slices/movieSlice";
import {
  CardSkeleton,
  HeroComponentSkeleton,
} from "../Components Skeleton/ComponentSkeleton";

const Home = () => {
  const {
    nowPlayingMoviesData,
    trendingMoviesData,
    topMoviesData,
    upcomingMoviesData,
    popularMoviesData,
    loading: {
      nowPlayingLoading,
      topLoading,
      trendingLoading,
      upcomingLoading,
      popularLoading,
    },
    error: {
      nowPlayingError,
      topError,
      trendingError,
      upcomingError,
      popularError,
    },
  } = useSelector((state) => state.movieData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentMoviesInTheater());
    dispatch(fetchPopularMovies());
    dispatch(fetchTopMovies());
    dispatch(fetchTrendingMovies());
    dispatch(fetchUpcoming_movies());
    dispatch(getMoviesPage(1363123));
  }, [dispatch]);

  const useAutoSlider = (items, delay = 5000, transitionDuration = 700) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [transition, setTransition] = useState(true);

    useEffect(() => {
      if (!items?.length) return;

      const interval = setInterval(() => {
        setActiveIndex((prev) => prev + 1);
      }, delay);

      return () => clearInterval(interval);
    }, [items, delay]);

    useEffect(() => {
      if (!items?.length) return;

      if (activeIndex >= items.length) {
        const timeout = setTimeout(() => {
          setTransition(false);
          setActiveIndex(0);
        }, transitionDuration);

        return () => clearTimeout(timeout);
      } else {
        setTransition(true);
      }
    }, [activeIndex, items, transitionDuration]);

    return { activeIndex, transition };
  };

  const nowPlayingSlides = nowPlayingMoviesData
    ? [...nowPlayingMoviesData, nowPlayingMoviesData[0]]
    : [];

  const upcomingSlides = upcomingMoviesData
    ? [...upcomingMoviesData, upcomingMoviesData[0]]
    : [];

  const { activeIndex: upcomingIndex, transition: upcomingTransition } =
    useAutoSlider(upcomingMoviesData);
  const { activeIndex: nowPlayingIndex, transition: nowPlayingTransition } =
    useAutoSlider(nowPlayingMoviesData);

  const formatVotes = (count) => {
    if (!count) return 0;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
  };
  return (
    <>
      <main className="w-full h-auto gap-5 flex flex-col bg-black">
        <div className="w-full bg-black h-screen flex  overflow-x-hidden">
          {nowPlayingSlides ? (
            nowPlayingSlides?.map((ele, i) => (
              <div
                key={i}
                className={`flex justify-end pb-10 gap-5 h-screen w-full shrink-0 flex-col bg-cover bg-center tracking-width shadow-[0_0_100px_60px_black_inset] text-white snap-start pl-2 sm:shadow-[0_0_250px_75px_black_inset] ${
                  nowPlayingTransition ? "transition-all duration-700" : ""
                }`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${ele.backdrop_path})`,
                  transform: `translateX(-${nowPlayingIndex * 100}%)`,
                }}
              >
                <h1
                  className={`text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl ${
                    nowPlayingIndex === i && i !== 0 ? "animate-translate" : ""
                  }`}
                >
                  {ele.title}
                </h1>
                <p
                  className={`mt-2 text-sm sm:text-base text-gray-300
    ${nowPlayingIndex === i ? "animate-translate" : ""}`}
                >
                  ⭐ {ele.vote_average?.toFixed(1)} • (
                  {formatVotes(ele.vote_count)}) •{" "}
                  {ele.release_date?.slice(0, 4)}
                </p>

                <p
                  className={`text-sm w-[90%] h-auto line-clamp-2 leading-5 tracking-wide text-white bg-black/10 backdrop-blur-[1px] rounded-2xl p-1 text-start sm:leading-6 sm:text-base lg:tracking-normal lg:text-gray-50 lg:line-clamp-3 lg:leading-7 ${
                    nowPlayingIndex === i && i !== 0 ? "animate-translate" : ""
                  }`}
                >
                  {ele.overview}
                </p>

                <Link
                  className={`border-0 bg-red-600 w-[50%] h-[8%] font-bold text-white text-sm flex justify-center items-center sm:text-base lg:text-xl ${
                    nowPlayingIndex === i && i !== 0
                      ? "animate-translate lg:w-[30%]"
                      : "w-[50%] h-[8%] lg:w-[30%]"
                  }`}
                  to={`/movie/page/${ele.id}`}
                >
                  <button className="cursor-pointer hover:animate-bounce">
                    Play Now
                  </button>
                </Link>
              </div>
            ))
          ) : nowPlayingLoading ? (
            <HeroComponentSkeleton />
          ) : (
            <div className="w-full h-screen flex justify-center bg-black animate-fastspin">
              <img
                src={nowPlayingError}
                className="w-full aspect-video object-center object-cover"
              />
            </div>
          )}
        </div>
        <div className=" w-full h-2 flex justify-center items-center sticky -mt-8 ">
          <ul className="flex w-52 gap-1 h-full lg:w-[40%] lg:gap-4 lg:h-3">
            {nowPlayingMoviesData?.map((ele, i) => (
              <li key={i} className="w-full h-full flex justify-center">
                <span
                  className={`h-full w-full rounded-full ${
                    nowPlayingIndex === i ? "bg-red-600" : "bg-white/20"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 justify-center items-start bg-black capitalize text-white w-full h-auto overflow-hidden">
          <section className="flex flex-col w-full h-auto">
            <span className="flex h-auto items-center justify-between px-2">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Top Rated Movies
              </h1>
              <Link
                to={`/movie/lists?list-type=topRated`}
                className="text-red-500 text-sm md:text-base font-semibold"
              >
                View All
              </Link>
            </span>
            <Carousel className="w-full text-black h-auto">
              <ZoomContent
                error={topError}
                loading={topLoading}
                movieLists={topMoviesData}
              />
              <CarouselPrevious className="left-0.5" />
              <CarouselNext className="right-1.5" />
            </Carousel>
          </section>
          <section className="flex flex-col w-full h-auto">
            <span className="flex h-auto items-center justify-between px-2">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Trending Movies
              </h1>
              <Link
                to={`/movie/lists?list_type=trending`}
                className="text-red-500 text-sm md:text-base font-semibold"
              >
                View All
              </Link>
            </span>
            <Carousel className="w-full h-auto text-black">
              <ZoomContent
                error={trendingError}
                loading={trendingLoading}
                movieLists={trendingMoviesData}
              />
              <CarouselPrevious className="left-0.5" />
              <CarouselNext className="right-1.5" />
            </Carousel>
          </section>
          <section className="flex flex-col w-full h-auto">
            <span className="flex h-auto items-center justify-between px-2">
              <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                Popular Movies
              </h1>
              <Link
                to={`/movie/lists?list_type=popularMovies`}
                className="text-red-500 text-sm md:text-base font-semibold"
              >
                View All
              </Link>
            </span>
            <Carousel className="w-full h-auto text-black">
              <ZoomContent
                error={popularError}
                loading={popularLoading}
                movieLists={popularMoviesData}
              />
              <CarouselPrevious className="left-0.5" />
              <CarouselNext className="right-1.5" />
            </Carousel>
          </section>
        </div>

        <div className="w-full bg-black h-screen flex  overflow-x-hidden">
          {upcomingSlides ? (
            upcomingSlides?.map((ele, i) => (
              <div
                key={i}
                className={`flex justify-end pb-10 gap-5 aspect-video w-full shrink-0 flex-col bg-cover bg-center tracking-width shadow-[0_0_100px_60px_black_inset] text-white snap-start pl-2 sm:shadow-[0_0_250px_75px_black_inset] ${
                  upcomingTransition ? "transition-all duration-700" : ""
                }`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${ele.backdrop_path})`,
                  transform: `translateX(-${upcomingIndex * 100}%)`,
                }}
              >
                <h1
                  className={`text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl ${
                    upcomingIndex === i && i !== 0 ? "animate-translate" : ""
                  }`}
                >
                  {ele.title}
                </h1>
                <p
                  className={`mt-2 text-sm sm:text-base text-gray-300
    ${upcomingIndex === i ? "animate-translate" : ""}`}
                >
                  ⭐ {ele.vote_average?.toFixed(1)} • (
                  {formatVotes(ele.vote_count)}) •{" "}
                  {ele.release_date?.slice(0, 4)}
                </p>

                <p
                  className={`text-sm w-[90%] h-auto line-clamp-2 leading-5 tracking-wide text-white bg-black/10 backdrop-blur-[1px] rounded-2xl p-1 text-start sm:leading-6 sm:text-base lg:tracking-normal lg:text-gray-50 lg:line-clamp-3 lg:leading-7 ${
                    upcomingIndex === i && i !== 0 ? "animate-translate" : ""
                  }`}
                >
                  {ele.overview}
                </p>

                <Link
                  className={`border-0 bg-red-600 w-[50%] h-[8%] font-bold text-white text-sm flex justify-center items-center sm:text-base lg:text-xl ${
                    upcomingIndex === i && i !== 0
                      ? "animate-translate lg:w-[30%]"
                      : "w-[50%] h-[8%] lg:w-[30%]"
                  }`}
                  to={`/movie/page/${ele.id}`}
                >
                  <button className="cursor-pointer hover:animate-bounce">
                    Play Now
                  </button>
                </Link>
              </div>
            ))
          ) : upcomingLoading ? (
            <HeroComponentSkeleton />
          ) : (
            <div className="w-full h-screen flex justify-center bg-black animate-fastspin">
              <img
                src={upcomingError}
                className="w-full aspect-video object-center object-cover"
              />
            </div>
          )}
        </div>
        <div className=" w-full h-2 flex justify-center items-center sticky -mt-8 ">
          <ul className="flex w-52 gap-1 h-full lg:w-[40%] lg:gap-4 lg:h-3">
            {upcomingMoviesData?.map((ele, i) => (
              <li key={i} className="w-full h-full flex justify-center">
                <span
                  className={`h-full w-full rounded-full ${
                    upcomingIndex === i ? "bg-red-600" : "bg-white/20"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;
