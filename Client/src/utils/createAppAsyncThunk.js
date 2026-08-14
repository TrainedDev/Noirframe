import { createAsyncThunk } from "@reduxjs/toolkit";


export const createAppAsyncThunk = (type, apiFunction) =>
  createAsyncThunk(type, async (arg, thunkApi) => {
    try {
      return await apiFunction(arg);
    } catch (err) {
      return thunkApi.rejectWithValue({
        message: err.response?.data?.msg || "Something went wrong",
        status: err.response?.status || 500,
      });
    }
  });