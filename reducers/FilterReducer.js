import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getFilter = createAsyncThunk(
  "FilterList/getFilter",
  async ({ query }) => {
    const response = await fetch(
      `https://myunde.com/base/api/filter/?` + new URLSearchParams(query)
    );

    const data = await response.json();
    return data;
  }
);



export const getSize = createAsyncThunk("FilterList/getSize", async () => {
  const response = await fetch(`https://myunde.com/base/api/sizes`);
  const data = await response.json();
  return data;
});

export const getColor = createAsyncThunk("FilterList/getColor", async () => {
  const response = await fetch(`https://myunde.com/base/api/colors`);
  const data = await response.json();
  return data;
});

export const getFabric = createAsyncThunk("FilterList/getFabric", async () => {
  const response = await fetch(`https://myunde.com/base/api/fabrics`);
  const data = await response.json();
  return data;
});

export const getBrand = createAsyncThunk("FilterList/getBrand", async () => {
  const response = await fetch("https://myunde.com/base/api/brands");
  const data = await response.json();
  return data;
});

export const getStyle = createAsyncThunk("FilterList/getStyle", async () => {
  const response = await fetch("https://myunde.com/base/api/styles");
  const data = await response.json();
  return data;
});

export const FilterReducer = createSlice({
  name: "FilterList",
  initialState: {
    Colors: [],
    Sizes: [],
    Fabric: [],
    brand: [],
    style: [],
    filter: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSize.fulfilled, (state, action) => {
      state.Sizes = action.payload;
    }),
      builder.addCase(getColor.fulfilled, (state, action) => {
        state.Colors = action.payload;
      });
    builder.addCase(getFabric.fulfilled, (state, action) => {
      state.Fabric = action.payload;
    });
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.brand = action.payload;
    });
    builder.addCase(getStyle.fulfilled, (state, action) => {
      state.style = action.payload;
    });
    builder.addCase(getFilter.fulfilled, (state, action) => {
      state.filter = action.payload;
    });
  },
});

export default FilterReducer.reducer;
