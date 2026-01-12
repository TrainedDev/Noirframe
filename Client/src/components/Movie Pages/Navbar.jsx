import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeBoolean } from "../../Redux/Slices/componentSlice";
import { LogIn, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router";
import { getUserSearchedResults } from "@/Redux/Slices/movieSlice";
const Navbar = () => {
  const { pathname } = useLocation();
  const moviePage = pathname.startsWith("/movie/page");
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [display, setDisplay] = useState(true);
  const {
    searchedData,
    loading: { searchedLoading },
    error: { searchedError },
  } = useSelector((state) => state.movieData);
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debounceSearch = useMemo(() => {
    return debounce((val) => {
      dispatch(getUserSearchedResults(val));
    }, 700);
  }, [dispatch]);

  const data = searchedData?.filter((ele) =>
    ele.media_type === "movie" &&
    ele.runtime !== 0 &&
    ele.backdrop_path !== null &&
    ele.poster_path !== null
      ? ele
      : null
  );

  return (
    <nav
      className={`w-full bg-black flex gap-7 lg:gap-30 justify-center text-white items-center capitalize h-7 sm:h-10  ${
        moviePage ? "absolute z-10 bg-transparent text-black/30" : ""
      } `}
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
            type="search"
            name="search"
            placeholder="Search"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              debounceSearch(e.target.value);
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
          <button className="bg-transparent p-0.5 rounded-r-xs cursor-pointer w-[20%] h-full">
            <Search className="w-full h-full" />
          </button>
        </div>

        <ul
          className={`custom-scroll absolute top-6 left-0 w-full bg-neutral-900 text-white z-50
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
                  onClick={() =>{ setSearchVal(""); setDisplay(false);}}
                  className="px-3 py-2 flex gap-5 items-center hover:bg-white/5"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w342${ele.poster_path}`}
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
      <button
        className=" cursor-pointer w-[8%] h-[40%] md:h-[60%]"
        onClick={() => dispatch(storeBoolean({ appSideBar: true }))}
      >
        <Menu className="w-full h-full" />
      </button>
    </nav>
  );
};

export default Navbar;
