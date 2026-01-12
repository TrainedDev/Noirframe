import MoviesList from "./MoviesList";
import { useSelector, useDispatch } from "react-redux";
import { storeBoolean, storeMovieFilters } from "@/Redux/Slices/componentSlice";
import FilterSidebar from "@/components/Sidebar/FilterSidebar";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

const SpecificMovieLists = () => {
  const [searchParams] = useSearchParams();
  const movieListName = searchParams.get("list-type");

  const { filterSidebar, selectedLists } = useSelector(
    (state) => state.componentData
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
        <div
          className={`absolute bg-neutral-900 p-[25px_27px_0_27px] flex flex-col gap-5 -left-1 z-10 w-full -top-15 h-screen overflow-y-scroll lg:overflow-y-visible custom-scroll text-white transition-all duration-700 lg:opacity-100 lg:transition-none lg:translate-none sm:w-[50%] lg:w-[27%] lg:static lg:z-0 lg:bg-transparent ${
            filterSidebar ? "translate-x-1 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="w-full h-[10%] flex justify-between items-center font-semibold xs-sm text-xl uppercase">
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
