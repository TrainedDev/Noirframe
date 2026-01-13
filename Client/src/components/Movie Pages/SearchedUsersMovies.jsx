import { getUserSearchedResults } from "@/Redux/Slices/movieSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { DataLoading } from "./LoadingPage";

const SearchedUsersMovies = () => {
  const [searchVal, setSearchVal] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const {
    searchedData,
    loading: { searchedLoading },
    error: { searchedError },
  } = useSelector((state) => state.movieData);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchVal.trim() === "") {
      console.log("empty string not allowed");
      return;
    }

    dispatch(getUserSearchedResults(searchVal));
  };

  return (
    <main
      className="
        w-screen h-auto flex flex-col gap-8
        p-4 sm:p-5
        text-white text-sm sm:text-base
      "
    >
      <div className="w-full h-20 flex justify-center items-end">
        <form
          onSubmit={handleSubmit}
          className="
            w-full flex items-center h-[60%]
            bg-neutral-900
            border border-transparent
            focus-within:border-red-700
            transition-colors
          "
        >
          <button
            type="submit"
            className="w-[20%] flex justify-center items-center h-full cursor-pointer"
          >
            <Search className="h-4 sm:h-5 md:h-6 text-white" />
          </button>

          <input
            type="search"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="
              w-[80%] h-full bg-neutral-900 text-white
              outline-none
              text-sm sm:text-base md:text-lg
              px-2 sm:px-3
            "
          />
        </form>
      </div>

      <ul
        className="
          w-full capitalize h-8 flex gap-4
          border-b border-b-neutral-800/75
          font-light
          text-xs sm:text-sm md:text-base
        "
      >
        <li
          tabIndex={0}
          onClick={() => setMediaType("all")}
          className="h-full focus:border-b-2 focus:border-red-600 cursor-pointer"
        >
          all
        </li>
        <li
          tabIndex={0}
          onClick={() => setMediaType("movie")}
          className="h-full focus:border-b-2 focus:border-red-600 cursor-pointer"
        >
          movie
        </li>
        <li
          tabIndex={0}
          onClick={() => setMediaType("tv")}
          className="h-full focus:border-b-2 focus:border-red-600 cursor-pointer"
        >
          tv show
        </li>
        <li
          tabIndex={0}
          onClick={() => setMediaType("person")}
          className="h-full focus:border-b-2 focus:border-red-600 cursor-pointer"
        >
          person
        </li>
      </ul>
      {searchedLoading ? (
        <DataLoading />
      ) : searchedData ? (
        <ul
          className="
          w-full grid grid-cols-2 gap-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
        "
        >
          {searchedData
            ?.filter((ele) =>
              ele.media_type === mediaType
                ? ele
                : mediaType === "all"
                ? ele
                : null
            )
            .map((ele, i) => (
              <Link
                key={i}
                to={`/movie/page/:${ele.id}`}
                className="w-full aspect-2/3"
              >
                <li className="w-full h-full relative flex items-end">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${ele?.poster_path}`}
                    alt="movie"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <h2
                    className="
                  absolute p-2 sm:p-3 md:p-4
                  text-xs sm:text-sm md:text-base lg:text-lg
                  font-medium leading-tight
                  bg-black/40 w-full
                "
                  >
                    {ele.original_title}
                  </h2>
                </li>
              </Link>
            ))}
        </ul>
      ) : (
        <div className="w-full capitalize h-full">
          <h1>{searchedError}</h1>
        </div>
      )}
    </main>
  );
};

export default SearchedUsersMovies;
