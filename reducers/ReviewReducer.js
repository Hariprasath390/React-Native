import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk(
  "productlist/getReviews",
  async (productId) => {
    const response = await fetch(
      `https://myunde.com/api/products/review/${productId}`
    );
    const data = await response.json();
    return data;
  }
);

export const ReviewReducer = createSlice({
  name: "Reviewpage",
  initialState: {
    Reviews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.Reviews = action.payload;
    });
  },
});

export default ReviewReducer.reducer;
