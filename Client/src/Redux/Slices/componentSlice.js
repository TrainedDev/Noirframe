import { createSlice } from "@reduxjs/toolkit";

export const componentSlice = createSlice({
  name: "syncSlice",
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
    selectedLists: 0,
    movieListName:null
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
  },
});

export const { storeBoolean, storeMovieFilters } = componentSlice.actions;
export default componentSlice.reducer;
