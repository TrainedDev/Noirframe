import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterMovieLists,
  getGenresAndTags,
  resetMovieFilters,
  storeBoolean,
  storeMovieFilters,
} from "../specificFilteredMoviesListSlice";
import { Skeleton } from "../../../components/ui/skeleton";
import { CalendarDays, RotateCcw } from "lucide-react";

const FilterSidebar = () => {
  const dispatch = useDispatch();

  const {
    genres,
    tags,
    yearGte,
    yearLte,
    runtimeGte,
    runtimeLte,
    duration,
    movieListName,
    movieGenresAndTagsData,
    loading,
    error,
  } = useSelector((state) => state.filterMovie);

  useEffect(() => {
    if (!movieGenresAndTagsData?.length) {
      dispatch(getGenresAndTags());
    }
  }, [dispatch, movieGenresAndTagsData]);

  const currentYear = new Date().getFullYear();

  const yearRanges = [];

  for (let end = currentYear; end >= 1920; end -= 20) {
    const from = Math.max(end - 20, 1920);

    yearRanges.push({
      from,
      to: end,
    });
  }

  const handleDurationChange = (value) => {
    switch (value) {
      case "short":
        dispatch(
          storeMovieFilters({
            duration: value,
            runtimeGte: null,
            runtimeLte: 60,
          })
        );
        break;

      case "normal":
        dispatch(
          storeMovieFilters({
            duration: value,
            runtimeGte: 60,
            runtimeLte: 120,
          })
        );
        break;

      case "long":
        dispatch(
          storeMovieFilters({
            duration: value,
            runtimeGte: 120,
            runtimeLte: 180,
          })
        );
        break;

      case "epic":
        dispatch(
          storeMovieFilters({
            duration: value,
            runtimeGte: 180,
            runtimeLte: null,
          })
        );
        break;

      default:
        dispatch(
          storeMovieFilters({
            duration: "",
            runtimeGte: null,
            runtimeLte: null,
          })
        );
    }
  };

  const handleSubmit = () => {
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
    );
    dispatch(storeBoolean({ filterSidebar: false }))
  };

  const handleReset = () => {
    dispatch(resetMovieFilters());
  };

  return (
    <div className="flex flex-col w-full gap-7 pb-6">

      {/* GENRES */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold uppercase tracking-wide">
            Genres
          </h2>

          {genres.length > 0 && (
            <span className="text-xs text-red-500">
              {genres.length} selected
            </span>
          )}
        </div>

        <div className="w-full max-h-52 overflow-y-auto custom-scroll space-y-1">
          {loading.movieGenresAndTagsLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="h-10 w-full" />
              ))}
            </>
          ) : error.movieGenresAndTagsError ? (
            <p className="text-red-500 text-sm">
              {error.movieGenresAndTagsError}
            </p>
          ) : (
            movieGenresAndTagsData?.map((genre) => {
              const selected = genres.includes(genre.id);

              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() =>
                    dispatch(
                      storeMovieFilters({
                        genres: genre.id,
                      })
                    )
                  }
                  className={`
                    w-full text-left px-3 py-2.5 rounded
                    text-sm transition-colors
                    ${
                      selected
                        ? "bg-red-600 text-white"
                        : "bg-black text-gray-300 hover:bg-neutral-800 hover:text-white"
                    }
                  `}
                >
                  {genre.name}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* DURATION */}
      <div className="space-y-3">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Duration
        </h2>

        <RadioGroup
          value={duration}
          onValueChange={handleDurationChange}
          className="grid grid-cols-2 gap-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="short" id="duration-short" />
            <Label htmlFor="duration-short">
              Under 1 hour
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="normal" id="duration-normal" />
            <Label htmlFor="duration-normal">
              1–2 hours
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="long" id="duration-long" />
            <Label htmlFor="duration-long">
              2–3 hours
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="epic" id="duration-epic" />
            <Label htmlFor="duration-epic">
              3+ hours
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* TAGS */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold uppercase tracking-wide">
            Popular Tags
          </h2>

          {tags.length > 0 && (
            <span className="text-xs text-red-500">
              {tags.length} selected
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto custom-scroll">
          {loading.movieGenresAndTagsLoading ? (
            <div className="col-span-2 flex justify-center py-5">
              <div className="w-5 h-5 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
            </div>
          ) : error.movieGenresAndTagsError ? (
            <p className="text-red-500 text-sm">
              {error.movieGenresAndTagsError}
            </p>
          ) : (
            movieGenresAndTagsData?.map((tag) => {
              const selected = tags.includes(tag.name);

              return (
                <button
                  key={tag.name}
                  type="button"
                  onClick={() =>
                    dispatch(
                      storeMovieFilters({
                        tags: tag.name,
                      })
                    )
                  }
                  className={`
                    px-2 py-2 rounded text-xs transition-colors
                    ${
                      selected
                        ? "bg-red-700 text-white"
                        : "bg-neutral-950 text-gray-300 hover:bg-neutral-800"
                    }
                  `}
                >
                  {tag.name}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RELEASE YEAR */}
      <div className="space-y-3">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Release Year
        </h2>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() =>
              dispatch(
                storeMovieFilters({
                  yearGte: null,
                  yearLte: currentYear,
                })
              )
            }
            className={`
              w-full flex justify-center items-center gap-1
              p-3 rounded text-sm
              ${
                yearLte === currentYear && !yearGte
                  ? "bg-red-600"
                  : "bg-black hover:bg-neutral-800"
              }
            `}
          >
            <CalendarDays className="w-4" />
            {currentYear}
          </button>

          {yearRanges.map((range) => {
            const selected =
              yearGte === range.from &&
              yearLte === range.to;

            return (
              <button
                key={`${range.from}-${range.to}`}
                type="button"
                onClick={() =>
                  dispatch(
                    storeMovieFilters({
                      yearGte: range.from,
                      yearLte: range.to,
                    })
                  )
                }
                className={`
                  w-full flex justify-center items-center gap-1
                  p-3 rounded text-sm transition-colors
                  ${
                    selected
                      ? "bg-red-600"
                      : "bg-black hover:bg-neutral-800"
                  }
                `}
              >
                <CalendarDays className="w-4" />
                {range.from} – {range.to}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full h-11 cursor-pointer rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full h-10 cursor-pointer rounded bg-neutral-900 hover:bg-neutral-800 text-gray-300 flex justify-center items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;