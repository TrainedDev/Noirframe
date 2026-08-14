import { createSlice } from "@reduxjs/toolkit";
import { fetchUserSearchMedia } from "./api";
import { createAppAsyncThunk } from "@/utils/createAppAsyncThunk";

export const getUserSearchedResults = createAppAsyncThunk(
  "/fetch/search/media",
  fetchUserSearchMedia,
);

export const searchedMovieSlice = createSlice({
  name: "searchedMovieSlice",
  initialState: {
    searchedData: null,
    loading: {
      searchedLoading: false,
    },
    error: {
      searchedError: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //SEARCHED
      .addCase(getUserSearchedResults.pending, (state) => {
        state.loading.searchedLoading = true;
        state.error.searchedError = null;
      })
      .addCase(getUserSearchedResults.fulfilled, (state, action) => {
        state.loading.searchedLoading = false;
        state.searchedData = action.payload;
      })
      .addCase(getUserSearchedResults.rejected, (state, action) => {
        state.loading.searchedLoading = false;
        const actions = action.error?.message;
        state.error.searchedError =
          actions == 404
            ? "404:We looked everywhere. Even under the couch. Nothing. 🎬"
            : actions == 502 || actions == 504
              ? "Request sent. Response stuck in traffic."
              : "500: Server is having feelings. Please respect its space.";
      });
  },
});

export default searchedMovieSlice.reducer;
