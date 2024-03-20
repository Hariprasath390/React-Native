import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPincode = createAsyncThunk(
  "FilterList/getPincode",
  async (value) => {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${value}`
    );
    const data = await response.json();
    return data;
  }
);

export const OrderReducer = createSlice({
  name: "FilterList",
  initialState: {
    pincodeData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPincode.fulfilled, (state, action) => {
      state.pincodeData = action.payload;
    });
  },
});

export default OrderReducer.reducer;
