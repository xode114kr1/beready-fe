import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backApi } from "../../utils/api";

export const getReviewList = createAsyncThunk(
  "review/getReviewList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await backApi.get("/review");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const getTopReviewList = createAsyncThunk(
  "review/getTopReviewById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await backApi.get(`/review/top/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewList: null,
    topReviewList: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getReviewList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.reviewList = action.payload;
      })
      .addCase(getReviewList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTopReviewList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTopReviewList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topReviewList = action.payload;
        state.error = "";
      })
      .addCase(getTopReviewList.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
