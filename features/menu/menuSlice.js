import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backApi } from "../../utils/api";

export const getMenu = createAsyncThunk(
  "menu",
  async (_, { rejectWithValue }) => {
    try {
      const res = await backApi.get("/menu");
      return res.data.menuList;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuList: null,
    menuCount: 0,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.menuList = action.payload;
        state.menuCount = action.payload.length;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
