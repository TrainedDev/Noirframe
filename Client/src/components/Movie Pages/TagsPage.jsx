import { useState, useEffect } from "react";
import {
  fetchUpcoming_movies,
  getFilterMovieLists,
} from "@/Redux/Slices/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Languages } from "lucide-react";
import { DataLoading } from "./LoadingPage";

const TagsPage = () => {
  const { name, id } = useParams();
  const [count, setCount] = useState(5);
  const [zoom, setZoom] = useState(false);
  const {
    filterMoviesData,
    loading: { filterLoading },
    error: { filterError },
  } = useSelector((state) => state.movieData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFilterMovieLists(name === "tags" ? { tags: [id] } : { genres: [id] })
    );
    dispatch(fetchUpcoming_movies());
  }, [dispatch, id, name]);

  return (
    <>
      {filterLoading ? (
        <DataLoading />
      ) : filterMoviesData ? (
        <div className="w-full h-auto gap-4 items-center flex flex-col p-5">
          <ul className="w-[90%] h-auto grid grid-cols-2 capitalize gap-1 justify-items-center sm:grid-cols-3 lg:gap-5 lg:w-full lg:grid-cols-5">
            {filterMoviesData?.slice(0, count).map((ele, item) => (
              <li
                key={item}
                onTouchStart={() => setZoom(item)}
                onTouchEnd={() => setZoom(null)}
                onMouseEnter={() => setZoom(item)}
                onMouseLeave={() => setZoom(null)}
                className={` w-full h-full flex rounded-xs overflow-hidden cursor-pointer lg:h-96 lg:relative`}
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
                  <p className="line-clamp-2 text-sm w-[90%]">{ele.overview}</p>
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
            {filterMoviesData?.length > count ? (
              <button
                className=" hover:animate-bounce w-[70%] p-2 text-sm sm:text-base capitalize text-white bg-red-600 sm:w-[35%] sm:p-2 font-medium rounded-sm  cursor-pointer"
                onClick={() => setCount((prev) => prev + 2)}
              >
                load more
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <h1>{filterError}</h1>
      )}
    </>
  );
};

export default TagsPage;
