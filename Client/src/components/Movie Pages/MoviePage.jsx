import { useEffect, useState } from "react";
import ZoomContent from "./ZoomContent";
import { Carousel, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchRecommendMovieLists,
  fetchSimilarMovieLists,
  fetchUpcoming_movies,
  getMovieReviews,
  getMoviesPage,
} from "@/Redux/Slices/movieSlice";
import { Skeleton } from "../ui/skeleton";
import { Clock3Icon, Cross, LanguagesIcon, Star, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ReviewsLoading } from "../Components Skeleton/ComponentSkeleton";
import { DataLoading } from "./LoadingPage";

const MoviePage = () => {
  const [detail, setDetail] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const { id } = useParams();

  const {
    movieData,
    similarMoviesData,
    recommendMoviesData,
    upcomingMoviesData,
    movieReviews,
    loading: {
      moviePageLoading,
      similarLoading,
      recommendLoading,
      upcomingLoading,
      reviewsLoading,
    },
    error: {
      moviePageError,
      reviewsError,
      similarError,
      upcomingError,
      recommendError,
    },
  } = useSelector((state) => state.movieData);

  const dispatch = useDispatch();
  const movieDetails = movieData?.data;
  const movieTrailer = movieData?.movieTrailer;
  const movieTags = movieData?.movieTags && movieDetails?.genres;
  const getYear = new Date(movieDetails?.release_date).getFullYear() ?? "date";

  useEffect(() => {
    dispatch(getMoviesPage(id));
    dispatch(fetchRecommendMovieLists(id));
    dispatch(fetchSimilarMovieLists(id));
    dispatch(fetchUpcoming_movies());
    dispatch(getMovieReviews(id));
  }, [id, dispatch]);

  const getTime = () => {
    if (!movieDetails) return "none";
    const hour = Math.floor(movieDetails?.runtime / 60);
    const minute = movieDetails?.runtime % 60;
    return `${hour}h:${minute} min`;
  };
  console.log(videoLoading);

  return (
    <main className="w-full h-auto flex flex-col bg-black gap-3 ">
      <section className="w-full h-full">
        {moviePageLoading ? (
          <div className="w-screen aspect-video">
            <Skeleton className={"w-full h-full"} />
          </div>
        ) : movieDetails ? (
          <section className=" w-full aspect-video">
            {playing ? (
              <>
                {videoLoading && <DataLoading />}
                <div className="w-full flex justify-center items-end h-full lg:h-[80%]">
                  <iframe
                    src={movieTrailer?.embedUrl}
                    className={`${
                      videoLoading ? "opacity-0" : "opacity-100"
                    } w-[90%] h-[90%]`}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    onLoad={() => setVideoLoading(false)}
                  />
                  <div className="h-[90%] w-[2%]">
                    <Cross
                      onClick={() => setPlaying(false)}
                      className="w-full scale-130 hover:animate-spin text-white/90 cursor-pointer rotate-45"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div
                className={` justify-end pb-10 flex h-full w-full flex-col bg-cover bg-center tracking-width  text-white snap-start pl-2 lg:flex lg:shadow-[10px_0_120px_60px_black_inset]`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path})`,
                }}
              >
                <section className="w-[90%] h-auto hidden item-start flex-col text-white capitalize gap-y-4 p-3 lg:flex bg-red">
                  <ul className="flex gap-8 justify-start list-disc h-auto w-auto capitalize text-sm sm:text-sm md:text-base">
                    {movieDetails?.genres.map((ele, index) => (
                      <Link key={index} to={`/movie/genres/lists/${ele.id}`}>
                        <li
                          tabIndex={0}
                          className={` hover:bg-white ${
                            index === 0 ? "list-none" : ""
                          }`}
                        >
                          {ele.name}
                        </li>
                      </Link>
                    ))}
                  </ul>

                  <span className="h-auto w-auto flex justify-start text-center font-bold text-3xl sm:text-2xl md:text-3xl lg:text-4xl">
                    <h1>{movieDetails?.title}</h1>
                  </span>

                  <p className="w-[50%] line-clamp-3 tracking-wide leading-6 text-start text-sm font-stretch-extra-expanded sm:text-base sm:font-light lg:text-[14px]">
                    {movieDetails?.overview}
                  </p>

                  <div className="relative w-full h-10 text-xs sm:text-sm md:text-base">
                    <button
                      onClick={() => setDetail(true)}
                      className="absolute capitalize cursor-pointer w-[8%] p-1 bg-neutral-700/80 font-bold text-xs"
                    >
                      Read More
                    </button>

                    <section
                      className={` w-full h-screen flex justify-center items-center absolute text-white transition-all duration-700 z-10 ${
                        detail
                          ? "-translate-y-90 opacity-100 "
                          : "pointer-events-none opacity-0 -translate-y-140"
                      }`}
                    >
                      <div className="w-[60%] h-full rounded-sm flex gap-y-8 flex-col overflow-y-auto bg-neutral-900 p-7 ">
                        <span className="flex justify-between items-center gap-2 capitalize text-wrap font-bold text-2xl">
                          <h1>{movieDetails?.title}</h1>
                          <button onClick={() => setDetail(false)}>
                            <X className="text-gray-400 cursor-pointer" />
                          </button>
                        </span>
                        <div className="flex gap-x-5 justify-start items-center w-full lowercase text-base">
                          <p>{getYear}</p>
                          <span className="w-auto flex justify-center items-center gap-1 lowercase">
                            <Clock3Icon className="w-auto" />
                            <p>{getTime().toString()}</p>
                          </span>
                          <p className="w-auto">
                            {movieDetails?.vote_count} views
                          </p>
                          <div className="w-15 flex justify-start items-center gap-1">
                            <p>{Math.round(movieDetails?.vote_average)}</p>
                            <img src="/imdb.png" className="w-9" />
                          </div>
                        </div>

                        <span className="flex capitalize gap-3 items-center text-sm">
                          <h2 className="font-bold text-base">genres:</h2>
                          <ul className="flex flex-wrap gap-7 list-disc">
                            {movieDetails?.genres.map((ele, index) => (
                              <Link
                                key={index}
                                to={`/movie/genres/lists/${ele.id}`}
                              >
                                <li
                                  className={`${
                                    index === 0 ? "list-none" : ""
                                  }`}
                                >
                                  {ele.name}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </span>

                        <span className="flex capitalize gap-3 items-center text-sm">
                          <h2 className="font-bold text-base">tags:</h2>
                          <ul className="flex flex-wrap gap-5 list-none">
                            {movieDetails?.genres.map((ele, index) => (
                              <Link
                                key={index}
                                to={`/movie/tags/lists/${ele.id}`}
                              >
                                <li className="bg-neutral-800 flex p-1 justify-center">
                                  {ele.name}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </span>

                        <div className="flex gap-2 items-center text-sm">
                          <LanguagesIcon className="w-5" />
                          <ul className="flex justify-start items-center gap-3 w-auto flex-wrap">
                            {movieDetails?.spoken_languages.map(
                              (ele, index) => (
                                <li key={index}>{ele.english_name}</li>
                              )
                            )}
                          </ul>
                        </div>

                        <p className="tracking-wide text-start font-extralight leading-6 sm:leading-6 text-[15px] ">
                          {movieDetails?.overview}
                        </p>

                        <span className="flex items-center capitalize gap-2 text-sm">
                          <h2 className="font-bold text-base">Cast:</h2>
                          <ul className="flex flex-wrap gap-2 list-none">
                            <li>Action</li>
                            <li>Adventure</li>
                            <li>Crime</li>
                          </ul>
                        </span>

                        <span className="flex items-center capitalize gap-2 text-sm">
                          <h2 className="font-bold text-base">Cast:</h2>
                          <ul className="flex flex-wrap gap-2 list-none">
                            <li>Action</li>
                            <li>Adventure</li>
                            <li>Crime</li>
                          </ul>
                        </span>
                      </div>
                    </section>
                  </div>

                  <div className="flex flex-wrap gap-x-4 justify-start items-center w-full lowercase text-base">
                    <p>{getYear}</p>
                    <span className="w-auto flex justify-center items-center gap-1 lowercase">
                      <Clock3Icon className="w-auto" />
                      <p>{getTime().toString()}</p>
                    </span>
                    <p className="w-auto">{movieDetails?.vote_count} views</p>
                    <div className="w-15 flex justify-start items-center gap-1">
                      <p>{Math.round(movieDetails?.vote_average)}</p>
                      <img src="/imdb.png" className="w-9" />
                    </div>
                  </div>

                  <div className="flex gap-2 w-auto items-center text-base">
                    <LanguagesIcon className="w-3" />
                    <ul className="flex justify-start items-center gap-3 flex-wrap w-auto">
                      {movieDetails?.spoken_languages.map((ele, index) => (
                        <li key={index}>{ele.english_name}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      console.log("CLICKED");

                      setPlaying(true);
                      setVideoLoading(true);
                    }}
                    className="bg-red-600 w-64 h-12 text-xl font-medium rounded-sm hover:animate-pulse cursor-pointer"
                  >
                    Play Now
                  </button>
                </section>
              </div>
            )}
          </section>
        ) : (
          <img
            src={moviePageError}
            className="w-screen aspect-video object-center object-cover "
          />
        )}
      </section>
      {/* Movie Details On Mobile Device  */}
      <div className="w-full h-full flex flex-col text-white capitalize gap-2 p-3 shadow-[0_0_20px_20px_black] lg:hidden">
        <ul className="flex gap-8 items-start list-disc h-auto capitalize text-sm sm:text-[16px]">
          {movieDetails?.genres.map((ele, index) => (
            <li key={index} className={`${index === 0 ? "list-none" : ""}`}>
              {ele.name}
            </li>
          ))}
        </ul>
        <span className="h-auto w-full flex justify-start text-start font-bold text-base sm:text-2xl">
          <h1>{movieDetails?.title}</h1>
        </span>
        <p className="w-full line-clamp-3 tracking-wide leading-6 text-start text-sm font-stretch-extra-expanded sm:text-[15px] sm:font-light lg:text-xl">
          {movieDetails?.overview}
        </p>
        <div className="relative w-full h-10 text-xs sm:text-sm md:text-base">
          <button
            onClick={() => setDetail(true)}
            className="absolute capitalize cursor-pointer w-auto p-0.5 text-sm bg-neutral-800 font-bold"
          >
            Read More
          </button>
          <section
            className={` w-full flex justify-center items-center absolute text-white transition-all duration-500 z-10 ${
              detail
                ? "-translate-y-40 opacity-100"
                : " -translate-y-60 opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-140 flex gap-4 flex-col overflow-y-auto bg-neutral-900 p-7 ">
              <span className="flex justify-between items-center gap-2 capitalize text-wrap font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <h1>{movieDetails?.title}</h1>
                <button onClick={() => setDetail(false)}>
                  <X className="text-gray-400 cursor-pointer" />
                </button>
              </span>
              <div className="flex flex-wrap gap-x-5 justify-start items-center w-full lowercase text-base">
                <p>{getYear.toString()}</p>
                <span className="w-auto flex justify-center items-center gap-1 lowercase">
                  <Clock3Icon className="w-auto" />
                  <p>{getTime().toString()}</p>
                </span>
                <p className="w-auto">{movieDetails?.vote_count} views</p>
                <div className="w-15 flex justify-start items-center gap-1">
                  <p>{Math.round(movieDetails?.vote_average).toString()}</p>
                  <img src="/imdb.png" className="w-9" />
                </div>
              </div>

              <span className="flex capitalize gap-2 items-center text-sm">
                <h2 className="font-bold text-base">genres:</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {movieDetails?.genres.map((ele, index) => (
                    <Link key={index} to={`/movie/genres/lists/${index}`}>
                      <li>{ele.name}</li>
                    </Link>
                  ))}
                </ul>
              </span>

              <span className="flex capitalize gap-1 items-center text-sm">
                <h2 className="font-bold text-base">tags:</h2>
                <ul className="grid grid-cols-2 gap-2 list-none">
                  {movieTags?.map((ele, index) => (
                    <Link key={index} to={`/movie/tags/lists/${ele.id}`}>
                      <li className="bg-neutral-800 flex p-1 justify-center">
                        {ele.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </span>

              <div className="flex gap-2 items-center text-base">
                <LanguagesIcon className="w-3" />
                <ul className="grid grid-cols-2">
                  {movieDetails?.spoken_languages.map((ele, index) => (
                    <li key={index}>{ele.english_name}</li>
                  ))}
                </ul>
              </div>

              <p className="tracking-wide text-start font-extralight leading-6 sm:leading-6 text-sm sm:text-[15px] lg:text-xl">
                {movieDetails?.overview}
              </p>

              <span className="flex capitalize gap-2 text-sm">
                <h2 className="font-bold text-base">Cast:</h2>
                <ul className="flex justify-center items-center gap-3 flex-wrap">
                  <li>Action</li>
                  <li>Adventure</li>
                  <li>Crime</li>
                </ul>
              </span>

              <span className="flex capitalize gap-2 text-sm">
                <h2 className="font-bold text-base">Cast:</h2>
                <ul className="flex justify-center items-center gap-3 flex-wrap">
                  <li>Action</li>
                  <li>Adventure</li>
                  <li>Crime</li>
                </ul>
              </span>
            </div>
          </section>
        </div>
        <section className="flex flex-wrap gap-x-4 justify-start items-center w-full lowercase text-base">
          <p>{getYear.toString()}</p>
          <span className="w-auto flex justify-center items-center gap-1 lowercase">
            <Clock3Icon className="w-auto" />
            <p>{getTime().toString()}</p>
          </span>
          <p className="w-auto">{movieDetails?.vote_count} views</p>
          <div className="w-15 flex justify-start items-center gap-1">
            <p>{Math.round(movieDetails?.vote_average).toString()}</p>
            <img src="/imdb.png" className="w-9" />
          </div>
        </section>
        <button
          onClick={() => {
            setPlaying(true);
            setVideoLoading(true);
          }}
          className="bg-red-600 w-[40%] p-2 text-base font-medium rounded-sm hover:animate-pulse cursor-pointer sm:p-3 sm:text-xl  "
        >
          Play Now
        </button>
      </div>

      {/* Movie Cards And Reviews */}
      <div className="flex flex-col gap-2 bg-black capitalize text-white w-full h-auto overflow-hidden">
        <section
          className={`flex-col w-full h-auto ${
            similarMoviesData?.length === 0 || similarMoviesData === null
              ? "hidden"
              : "flex"
          }`}
        >
          <span className="flex h-auto items-center justify-between px-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              similar movies
            </h1>
            <Link
              to={`/movie/lists?list-type=topRated`}
              className="text-red-500 text-sm md:text-base font-semibold"
            >
             check out other movies
            </Link>
          </span>
          <Carousel className="w-full h-auto">
            <ZoomContent
              error={similarError}
              loading={similarLoading}
              movieLists={similarMoviesData}
            />
            <CarouselPrevious className="left-0.5" />
            <CarouselNext className="right-1.5" />
          </Carousel>
        </section>
        <section
          className={`flex-col w-full h-auto ${
            recommendMoviesData?.length === 0 || recommendMoviesData === null
              ? "hidden"
              : "flex"
          }`}
        >
          <span className="flex h-auto items-center justify-between px-2">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              recommend movies
            </h1>
            <Link
              to={`/movie/lists?list_type=trending`}
              className="text-red-500 text-sm md:text-base font-semibold"
            >
              check out other movies
            </Link>
          </span>
          <Carousel className="w-full h-auto text-black">
            <ZoomContent
              error={recommendError}
              loading={recommendLoading}
              movieLists={recommendMoviesData}
            />
            <CarouselPrevious className="left-0.5" />
            <CarouselNext className="right-1.5" />
          </Carousel>
        </section>
        <section className="flex flex-col w-full h-auto">
          <span className="flex h-auto items-center justify-between px-2">
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              upcoming movies
            </h1>
            <Link
              to={`/movie/lists?list_type=popularMovies`}
              className="text-red-500 text-sm md:text-base font-semibold"
            >
              check out other movies
            </Link>
          </span>
          <Carousel className="w-full h-full text-black">
            <ZoomContent
              error={upcomingError}
              loading={upcomingLoading}
              movieLists={upcomingMoviesData}
            />
            <CarouselPrevious className="left-0.5" />
            <CarouselNext className="right-1.5" />
          </Carousel>
        </section>

        <section
          className={`flex-col w-full h-[50%] px-2 gap-2 ${
            movieReviews?.length === 0 || !movieReviews ? "hidden" : "flex"
          }`}
        >
          <span className="flex h-[18%] items-center justify-between">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              review
            </h1>
            <Link
              to={`/movie/review/lists/${id}`}
              className="text-red-500 text-sm md:text-base font-semibold"
            >
              View All
            </Link>
          </span>
          <div className="w-full h-full">
            {movieReviews ? (
              <ul className="w-full h-auto flex flex-col justify-center items-center">
                {movieReviews?.slice(0, 3).map((ele, i) => (
                  <li
                    key={i}
                    className="w-full h-auto rounded-sm bg-neutral-900 flex flex-col p-2 justify-center items-start"
                  >
                    <div className="w-full h-auto gap-2 border-b border-gray-500/80 p-5 flex flex-wrap justify-start items-center">
                      <div className="w-[60%] flex justify-start gap-3 items-center">
                        <Avatar>
                          <AvatarImage
                            src={`https://image.tmdb.org/t/p/w342${ele.avatar_path}`}
                          />
                          <AvatarFallback>
                            <img src="https://github.com/evilrabbit.png" />
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`w-full text-start flex flex-col items-start`}
                        >
                          <h2>{ele.author}</h2>
                          <p className="text-sm">
                            {new Date(ele.created_at).toLocaleString()}
                          </p>
                        </span>
                      </div>
                      <ul className="flex justify-start items-center w-[35%] ">
                        {[5, 4, 3, 2, 1].map((ele, i) => (
                          <li key={i}>
                            <Star className="w-[80%] text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 text-base leading-8 tracking-normal text-start font-[550] text-white/90">
                      <p>{ele.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : reviewsLoading ? (
              <ReviewsLoading />
            ) : (
              <img src={reviewsError} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MoviePage;
