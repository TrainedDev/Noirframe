import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { storeMovieFilters } from "@/Redux/Slices/componentSlice";
import {
  getFilterMovieLists,
  getGenresAndTags,
} from "@/Redux/Slices/movieSlice";
import { Skeleton } from "../ui/skeleton";
import { CalendarDays } from "lucide-react";

const FilterSidebar = () => {
  const { movieGenresAndTagsData, loading, error } = useSelector(
    (state) => state.movieData
  );
  const {
    genres,
    tags,
    yearGte,
    yearLte,
    runtimeGte,
    runtimeLte,
    movieListName,
  } = useSelector((state) => state.componentData);

  const dispatch = useDispatch();
  // console.log(movieGenresAndTagsData);

  useEffect(() => {
    dispatch(getGenresAndTags());
    dispatch(getFilterMovieLists());
  }, [dispatch]);

  useEffect(() => {}, []);

  const currentYear = new Date().getFullYear();

  function generateDecadeRange(startYear = 1920) {
    const ranges = [];
    if (ranges.length > 0) return ranges;
    for (let end = currentYear; end >= startYear; end -= 20) {
      const from = Math.max(end - 20, startYear);
      ranges.push({
        from,
        to: end,
      });
    }
    return ranges;
  }
  generateDecadeRange();
  const yearsArr = generateDecadeRange();

  return (
    <div className="flex flex-col w-full h-auto gap-5">
      <h1 className="xs-md text-base capitalize font-bold">genres</h1>
      <ul className="w-full h-52  gap-3 flex flex-col capitalize custom-scroll overflow-y-scroll">
        {loading.movieGenresAndTagsLoading ? (
          <li className="xs:sm text-base w-full border-b shrink-0 border-black font-medium text-gray-300 h-[18%]">
            <Skeleton className={"h-full w-full"} />
          </li>
        ) : error.movieGenresAndTagsError ? (
          <p>{error.movieGenresAndTagsError}</p>
        ) : (
          movieGenresAndTagsData?.map((ele, i) => (
            <li
              key={i}
              className={`xs:sm text-base w-full border-b shrink-0 border-black font-medium text-gray-300 h-12 ${
                genres.includes(ele.id) ? "bg-red-600" : "bg-none"
              } `}
              onClick={() => dispatch(storeMovieFilters({ genres: ele.id }))}
            >
              {ele.name}
            </li>
          ))
        )}
      </ul>
      <div className="w-full flex flex-col justify-center capitalize gap-4 h-32">
        <h1 className="xs-md text-base font-bold">duration</h1>
        <RadioGroup
          onValueChange={(v) => {
            console.log(v);

            if (v == "short") {
              dispatch(storeMovieFilters({ runtimeLte: 60 }));
            } else if (v == "normal") {
              dispatch(
                storeMovieFilters({ runtimeGte: 60, runtimeLte: 60 * 2 })
              );
            } else if (v == "long") {
              dispatch(
                storeMovieFilters({ runtimeGte: 60 * 2, runtimeLte: 60 * 3 })
              );
            } else if (v == "epic") {
              dispatch(storeMovieFilters({ runtimeLte: 60 * 3 }));
            } else {
              dispatch(storeMovieFilters({ runtimeGte: 60 }));
            }
          }}
          className={"xs:sm font-medium text-base w-full grid grid-cols-2"}
        >
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="short"
              id="r1"
              className={" focus:bg-gray-600"}
            />
            <Label htmlFor="r1">under 1 hour</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="normal"
              id="r2"
              className={" focus:bg-gray-600"}
            />
            <Label htmlFor="r2">1-2Hours</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="long"
              id="r3"
              className={" focus:bg-gray-600"}
            />
            <Label htmlFor="r3">2-3Hours</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem
              value="epic"
              id="r4"
              // onClick={() => dispatch(storeMovieFilters({ runtimeLte: 60 * 3 }))}
              className={" focus:bg-gray-600"}
            />
            <Label htmlFor="r4">3+ Hours</Label>
          </div>
        </RadioGroup>
      </div>

      <div className={`flex flex-col w-full gap-3 capitalize ${ !movieGenresAndTagsData ? "h-auto": "h-50"}`}>
        <h1 className="xs-md text-base font-bold"> popular tags</h1>
        <ul className=" custom-scroll text-base font-extralight grid grid-cols-2 gap-0.5 w-full h-auto overflow-y-auto">
          {loading.movieGenresAndTagsLoading ? (
            <li className="w-full h-auto items-center py-3 flex justify-center">
              <div className="w-5 h-5 rounded-full border-3 border-red-600 border-t-transparent animate-spin" />
            </li>
          ) : error.movieGenresAndTagsError ? (
            <p>{error.movieGenresAndTagsError}</p>
          ) : (
            movieGenresAndTagsData?.map((ele, i) => (
              <li
                key={i}
                onClick={() => dispatch(storeMovieFilters({ tags: ele.name }))}
                className={`p-1 w-[90%] flex justify-center rounded-sm ${
                  tags.includes(ele.name) ? "bg-red-700" : "bg-stone-950"
                }`}
              >
                {ele.name}
              </li>
            ))
          )}
        </ul>
      </div>

      <h1 className="xs-md text-base font-bold capitalize">by release year</h1>
      <ul className="flex flex-col h-auto w-full items-start p-2 gap-2">
        <li
          tabIndex={0}
          className="w-full flex justify-center bg-black p-3 hover:bg-red-600 rounded-sm focus:bg-red-600"
          onClick={() => dispatch(storeMovieFilters({ yearLte: currentYear }))}
        >
          <CalendarDays className="w-[13px] mr-1" />
          <p>{currentYear}</p>
        </li>
        {yearsArr?.map((ele, i) => (
          <li
            key={i}
            tabIndex={0}
            onClick={() =>
              dispatch(
                storeMovieFilters({ yearGte: ele.from, yearLte: ele.to })
              )
            }
            className="w-full flex justify-center bg-black p-3 hover:bg-red-600 rounded-sm focus:bg-red-600"
          >
            <CalendarDays className="w-[13px] mr-1" />
            <p>{`${ele.from} - ${ele.to}`}</p>
          </li>
        ))}
      </ul>

      <div className=" w-full h-10 flex justify-center items-center mb-5 lg:mb-1">
        <button
          className="w-[80%] h-[90%] capitalize cursor-pointer rounded hover:animate-bounce bg-red-600 text-white text-base"
          onClick={() =>
            dispatch(
              getFilterMovieLists({
                genres,
                tags,
                yearGte,
                yearLte,
                runtimeGte,
                runtimeLte,
                movieListName,
              })
            )
          }
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
