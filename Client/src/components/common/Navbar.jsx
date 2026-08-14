import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, Menu, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { getUserSearchedResults } from "@/features/searchedMovie/searchedMovieSlice";

const Navbar = ({onMenuClick}) => {
  const { pathname } = useLocation();
  const moviePage = pathname.startsWith("/movie/page");
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [display, setDisplay] = useState(true);
  const Navigate = useNavigate();

  const {
    searchedData,
    loading: { searchedLoading },
    error: { searchedError },
  } = useSelector((state) => state.searched);

  const debounce = (fn) => {
    let timer;

    return (value, delay) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(value);
      }, delay);
    };
  };

  const getDebounceDelay = (query) => {
    const val = query.trim().toLowerCase();

    const isAISearch =
      val.split(" ").length > 3 ||
      val.includes("give") ||
      val.includes("like") ||
      val.includes("where") ||
      val.includes("movie");

    return isAISearch ? 1000 : 600;
  };

  const debounceSearch = useMemo(() => {
    return debounce((val) => {
      dispatch(getUserSearchedResults(val));
    });
  }, [dispatch]);

  const data = searchedData?.filter((ele) =>
    ele.media_type === "movie" &&
    ele.popularity >= 1 &&
    ele.runtime !== 0 &&
    ele.backdrop_path !== null &&
    ele.poster_path !== null
      ? ele
      : null,
  );

  const getPosterSize = () => {
    if (window.innerWidth < 480) return "w342";
    if (window.innerWidth < 768) return "w500";
    return "w780";
  };

  return (
<nav
  className={`
    w-full
    flex items-center justify-center
    gap-4 sm:gap-7 lg:gap-30
    capitalize text-white
    h-12 sm:h-14 md:h-15 lg:h-16

    ${moviePage
      ? "absolute top-0 left-0 z-10 bg-transparent text-white"
      : "bg-black"
    }
  `}
>
      <Link
        to={"/"}
        className="h-full w-[25%] overflow-hidden  flex justify-start items-center lg:w-[15%]"
      >
        <img
          src="/web_name.png"
          alt="NoirFrame"
          className="h-auto w-full pt-2 lg:pt-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
        />
      </Link>
      <div className="h-[42%] flex text-white flex-col justify-center items-center w-[45%] md:h-[50%] md:w-[50%] lg:h-[60%] lg:w-[50%] relative">
        <div className="w-full h-full flex justify-center items-center z-10">
          <input
            type="text"
            name="search"
            placeholder="Search movies or describe one — AI will suggest it..."
            value={searchVal}
            onChange={(e) => {
              const value = e.target.value;
              setSearchVal(value);
              debounceSearch(value, getDebounceDelay(value));
            }}
            className={`focus:border-b rounded-l-xs font-light outline-none p-0.5 h-full w-[80%] 
        placeholder:text-[8px] sm:placeholder:text-sm placeholder:font-bold 
        md:font-medium lg:placeholder:text-[17px] 
        text-xs sm:text-sm md:text-[17px]
        ${
          moviePage
            ? "bg-transparent animate-pulse backdrop-blur-xs focus:animate-none"
            : ""
        }`}
          />
          <button
            className="bg-transparent p-0.5 rounded-r-xs cursor-pointer w-[20%] h-full"
            onClick={() => {
              if (data.length > 0) {
                setSearchVal("");
                setDisplay(false);
                Navigate("/movie/search/lists");
              }
            }}
          >
            <Search className="w-full h-full" />
          </button>
        </div>

        <ul
          className={`custom-scroll absolute top-5 md:top-8 lg:top-10 left-0 w-full bg-neutral-900 text-white z-50
    max-h-72 overflow-y-auto rounded-xs shadow-lg text-xs sm:text-base font-bold
    ${searchVal.trim() && display ? "flex flex-col" : "hidden"}
  `}
        >
          {searchedLoading ? (
            <li className="py-3 flex justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
            </li>
          ) : data?.length ? (
            data.map((ele) => (
              <li key={ele.id}>
                <Link
                  to={`/movie/page/${ele.id}`}
                  onClick={() => {
                    setSearchVal("");
                    setDisplay(false);
                  }}
                  className="px-3 py-2 flex gap-5 items-center hover:bg-white/10"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/${getPosterSize()}${
                      ele.poster_path
                    }`}
                    loading="lazy"
                    className="w-[15%] aspect-2/3 rounded-xs object-cover"
                  />
                  <h2 className="hover:text-red-600">{ele.original_title}</h2>
                </Link>
              </li>
            ))
          ) : (
            <li className="py-2 text-center">{searchedError}</li>
          )}
        </ul>
      </div>

      <button className="h-[35%] lg:w-auto md:h-[50%] lg:h-[60%] cursor-pointer">
        <LogIn className="w-full h-full" />
      </button>

      <Menu
        className="cursor-pointer w-[8%] h-[40%] md:h-[60%]"
        onClick={onMenuClick}
      />
    </nav>
  );
};

export default Navbar;
