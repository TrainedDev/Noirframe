import MoviesList from "../components/MoviesList";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import {
  storeBoolean,
  storeMovieFilters,
} from "../specificFilteredMoviesListSlice";
import FilterSidebar from "../components/FilterSidebar";

const SpecificMovieLists = () => {
  const [searchParams] = useSearchParams();
  const movieListName = searchParams.get("list_type");

  const { filterSidebar, selectedLists } = useSelector(
    (state) => state.filterMovie,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storeMovieFilters({ movieListName }));
  }, [dispatch, movieListName]);

  return (
    <div className="w-full h-full lg:flex lg:flex-col">
      <h1 className="w-full h-16 bg-[#0a0a0a] text-white capitalize flex justify-center items-center text-base sm:text-base">
        home / movie
      </h1>
      <section className="relative w-full h-auto lg:flex">
        {filterSidebar && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden"
            onClick={() => dispatch(storeBoolean({ filterSidebar: false }))}
          />
        )}
        <div
          className={`
    fixed inset-y-0 left-0 z-50
    w-[85%] max-w-sm
    bg-neutral-900 text-white
    overflow-y-auto custom-scroll
    p-5
    transition-transform duration-300
    lg:static lg:z-auto lg:w-[280px]
    lg:max-w-none lg:translate-x-0
    lg:bg-transparent lg:p-5
    ${filterSidebar ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <div className="w-full h-[10%] flex justify-between items-center font-semibold xs-sm text-xl uppercase ">
            <span className="flex gap-2">
              <h1>Filters</h1>
              <p className="text-base text-red-600 flex items-end">
                {selectedLists}
              </p>
            </span>
            <h1
              className="font-thin cursor-pointer lg:hidden"
              onClick={() => dispatch(storeBoolean({ filterSidebar: false }))}
            >
              x
            </h1>
          </div>
          <FilterSidebar />
        </div>
        <MoviesList movieListName={movieListName} />
      </section>
    </div>
  );
};

export default SpecificMovieLists;
