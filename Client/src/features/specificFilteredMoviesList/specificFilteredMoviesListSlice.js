import { createSlice } from "@reduxjs/toolkit";
import { fetchFilteredMovieList, fetchGenreAndTags } from "./api";
import { createAppAsyncThunk } from "@/utils/createAppAsyncThunk";

export const getGenresAndTags = createAppAsyncThunk(
  "/fetch/movie/genre/tags",
  fetchGenreAndTags,
);
export const getFilterMovieLists = createAppAsyncThunk(
  "fetch/movie/filter/lists",
  fetchFilteredMovieList,
);

const filterMovieSlice = createSlice({
  name: "filterMovieSlice",
  initialState: {
    appSideBar: false,
    filterSidebar: false,
    genres: [],
    tags: [],
    sortBy: null,
    yearGte: null,
    yearLte: null,
    runtimeGte: null,
    runtimeLte: null,
    duration: null,
    selectedLists: 0,
    movieListName: null,
    filterMoviesData: null,
    movieGenresAndTagsData: null,
    loading: {
      filterLoading: false,
      genresLoading: false,
    },
    error: {
      filterError: null,
      genresError: null,
    },
  },
  reducers: {
    storeBoolean: (state, action) => {
      state.appSideBar = action.payload.appSideBar;
      state.filterSidebar = action.payload.filterSidebar;
    },
    storeMovieFilters: (state, action) => {
      const { genres, tags, ...rest } = action.payload;

      if (genres !== undefined) {
        const genreId = action.payload.genres;
        if (!state.genres.includes(genreId)) {
          state.genres.push(genreId);
        }
      }
      if (tags !== undefined) {
        const movieTags = action.payload.tags;
        if (!state.tags.includes(movieTags)) {
          state.tags.push(movieTags);
        }
      }

      Object.entries(rest).forEach(([key, val]) => {
        if (val !== undefined) {
          state[key] = val;
        }
      });

      state.selectedLists =
        state.genres?.length +
        state.tags?.length +
        (state.yearGte || state.yearLte ? 1 : 0) +
        (state.runtimeGte || state.runtimeLte ? 1 : 0);
    },
    resetMovieFilters: (state) => {
      state.selectedLists = 0;
      state.genres = [];
      state.tags = [];
      state.yearGte = null;
      state.yearLte = null;
      state.runtimeGte = null;
      state.runtimeLte = null;
      state.duration = "";
      state.sortBy = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // FILTER
      .addCase(getFilterMovieLists.pending, (state) => {
        state.loading.filterLoading = true;
        state.loading.filterError = null;
      })
      .addCase(getFilterMovieLists.fulfilled, (state, action) => {
        state.loading.filterLoading = false;
        state.filterMoviesData = action.payload;
      })
      .addCase(getFilterMovieLists.rejected, (state, action) => {
        state.loading.filterLoading = false;
        const actions = action.error?.message;
        state.error.filterError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
              ? "Request sent. Response stuck in traffic."
              : "500: Server is having feelings. Please respect its space.";
      })

      // GENRES
      .addCase(getGenresAndTags.pending, (state) => {
        state.loading.genresLoading = true;
        state.loading.genresError = null;
        state.error.genresError = null;
      })
      .addCase(getGenresAndTags.fulfilled, (state, action) => {
        state.loading.genresLoading = false;
        state.movieGenresAndTagsData = action.payload;
      })
      .addCase(getGenresAndTags.rejected, (state, action) => {
        state.loading.genresLoading = false;
        const actions = action.error?.message;
        state.error.genresError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
              ? "Request sent. Response stuck in traffic."
              : "500: Server is having feelings. Please respect its space.";
      });
  },
});

export const { storeBoolean, storeMovieFilters, resetMovieFilters } = filterMovieSlice.actions;
export default filterMovieSlice.reducer;
