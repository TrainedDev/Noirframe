import { HeroComponentSkeleton } from "@/components/ui/HeroComponentSkeleton";
import { useAutoSlider } from "@/hooks/useAutoSlider";
import { Link } from "react-router";

export const HeroSection = ({ moviesData, moviesLoading, moviesError }) => {
  const { activeIndex, transition } = useAutoSlider(moviesData);
  const formatVotes = (count) => {
    if (!count) return 0;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count;
  };
  // console.log(moviesData);
  
  const movieSlides = moviesData && moviesData.length ? [...moviesData, moviesData[0]] : [];

  return (
    <>
      <div className="w-full bg-black h-screen flex  overflow-x-hidden">
        {movieSlides && movieSlides.length ? (
          movieSlides?.map((ele, i) => (
            <div
              key={i}
              className={`flex justify-end pb-10 gap-5 h-screen w-full shrink-0 flex-col bg-cover bg-center tracking-width shadow-[0_0_100px_60px_black_inset] text-white snap-start pl-2 sm:shadow-[0_0_250px_75px_black_inset] ${
                transition ? "transition-all duration-700" : ""
              }`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${ele.backdrop_path})`,
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              <h1
                className={`text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl ${
                  activeIndex === i && i !== 0 ? "animate-translate" : ""
                }`}
              >
                {ele.title}
              </h1>
              <p
                className={`mt-2 text-sm sm:text-base text-gray-300
    ${activeIndex === i ? "animate-translate" : ""}`}
              >
                ⭐ {ele.vote_average?.toFixed(1)} • (
                {formatVotes(ele.vote_count)}) • {ele.release_date?.slice(0, 4)}
              </p>

              <p
                className={`text-sm w-[90%] h-auto line-clamp-2 leading-5 tracking-wide text-white bg-black/10 backdrop-blur-[1px] rounded-2xl p-1 text-start sm:leading-6 sm:text-base lg:tracking-normal lg:text-gray-50 lg:line-clamp-3 lg:leading-7 ${
                  activeIndex === i && i !== 0 ? "animate-translate" : ""
                }`}
              >
                {ele.overview}
              </p>

              <Link
                className={`border-0 bg-red-600 w-[50%] h-[8%] font-bold text-white text-sm flex justify-center items-center sm:text-base lg:text-xl ${
                  activeIndex === i && i !== 0
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
        ) : moviesLoading ? (
          <HeroComponentSkeleton />
        ) : (
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <img
              src={moviesError}
              alt="500"
              className="w-full aspect-video object-center object-cover"
            />
          </div>
        )}
      </div>
      <div className=" w-full h-2 flex justify-center items-center sticky -mt-8 ">
        <ul className="flex w-52 gap-1 h-full lg:w-[40%] lg:gap-4 lg:h-3">
          {movieSlides?.map((ele, i) => (
            <li key={i} className="w-full h-full flex justify-center">
              <span
                className={`h-full w-full rounded-full ${
                  activeIndex === i ? "bg-red-600" : "bg-white/20"
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};