import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategory = createAsyncThunk("home/getCategory", async () => {
  const response = await fetch("https://myunde.com/base/api/categories");
  const data = await response.json();
  return data;
});

export const getCampainImages = createAsyncThunk(
  "home/getCampainImages",
  async () => {
    const response = await fetch(
      "https://myunde.com/base/api/campaign-images/?depth=true"
    );
    const data = await response.json();
    return data;
  }
);

export const getProductOffers = createAsyncThunk(
  "home/getProductOffers",
  async () => {
    const response = await fetch(
      "https://myunde.com/base/api/product-offers/?depth=true"
    );
    const data = await response.json();
    return data;
  }
);

export const getBrandOffers = createAsyncThunk(
  "home/getBrandOffers",
  async () => {
    const response = await fetch(
      "http://192.168.0.108:8000/base/api/brand-offers"
    );
    const data = await response.json();
    return data;
  }
);

export const HomepageReducer = createSlice({
  name: "Homepage",
  initialState: {
    category: [],
    campaignImage: [],
    productOffers: [],
    brandOffers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    }),
      builder.addCase(getCampainImages.fulfilled, (state, action) => {
        state.campaignImage = action.payload;
      }),
      builder.addCase(getProductOffers.fulfilled, (state, action) => {
        state.productOffers = action.payload;
      });
    builder.addCase(getBrandOffers.fulfilled, (state, action) => {
      state.brandOffers = action.payload;
    });
  },
});

export default HomepageReducer.reducer;
