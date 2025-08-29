import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fastApi } from "../../utils/api";

export const getEstimationLilac = createAsyncThunk(
  "estimation/lilac",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fastApi.get("/estimate/lilac");
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const getEstimationdalelac = createAsyncThunk(
  "estimation/dalelac",
  async (category, { rejectWithValue }) => {
    try {
      cate = { 일식: "japan", 한식: "korea", 일품: "specialty" };
      const res = await fastApi.get(`/estimate/dalelac/${cate[category]}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const estimationSlice = createSlice({
  name: "estimation",
  initialState: {
    time: "00",
    peopleCount: 0,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEstimationLilac.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEstimationLilac.fulfilled, (state, action) => {
        state.time = action.payload.wait_time;
        state.peopleCount = action.payload.people;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getEstimationLilac.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getEstimationdalelac.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEstimationdalelac.fulfilled, (state, action) => {
        state.time = action.payload.wait_time;
        state.peopleCount = action.payload.people;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getEstimationdalelac.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default estimationSlice.reducer;
