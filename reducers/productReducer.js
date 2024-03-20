import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsById = createAsyncThunk(
  "productlist/getProductsById",
  async ({
    brandId,
    categoryId,
    sizeIds,
    colorIds,
    styleIds,
    fabricIds,
    priceRange,
    packOF,
  }) => {
    const category = categoryId ?? "";
    const brand = brandId ?? "";
    const style = styleIds ?? "";
    const fabric = fabricIds ?? "";
    const color = colorIds ?? "";
    const size = sizeIds ?? "";
    const price = priceRange ?? "";
    const pack = packOF ?? "";

    const response = await fetch(
      `https://myunde.com/api/products/?keyword=&page=1&category=${category}&brand=${brand}&style=${style}&fabric=${fabric}&color=${color}&size=${size}&priceof=${price}&pack=${pack}`
    );
    const data = await response.json();
    return data;
  }
);

// export const getProductsById = createAsyncThunk(
//   "productlist/getProductsById",
//   async ({ query }) => {
//       const response = await fetch(
//         `https://myunde.com/base/api/products/?` + new URLSearchParams(query)
//       );
//       const data = await response.json();
//       return data;
//   }
// );

export const getProductItemsById = createAsyncThunk(
  "productlist/getProductItemsById",
  async (productId) => {
    // const response = await fetch(
    //   `https://myunde.com/base/api/product-items/?` + new URLSearchParams(query)
    // );
    const response = await fetch(
      `https://myunde.com/base/api/product-items/?productId=${productId}`
    );

    const data = await response.json();

    const mymap = new Map();
    const unique = data.filter((el) => {
      const colorSet = mymap.get(el.product);
      if (colorSet !== undefined) {
        if (colorSet.has(el.color)) {
          return false;
        } else {
          colorSet.add(el.color);
          return true;
        }
      } else {
        mymap.set(el.product, new Set([el.color]));
        return true;
      }
    });

    const filterdata = unique;
    return filterdata;
  }
);

export const getProducts = createAsyncThunk(
  "productlist/getProducts",
  async () => {
    const response = await fetch(`https://myunde.com/base/api/products`);
    const data = await response.json();
    return data;
  }
);

export const getProductItems = createAsyncThunk(
  "productlist/getProductItems",
  async () => {
    const response = await fetch(`https://myunde.com/base/api/product-items`);
    const data = await response.json();
    return data;
  }
);

export const getProductItemImages = createAsyncThunk(
  "productlist/getProductItemImages",
  async (id) => {
    const response = await fetch(
      `https://myunde.com/base/api/item-images/?productId=${id}`
    );
    const data = await response.json();
    return data;
  }
);
export const getProductItemByProductId = createAsyncThunk(
  "productlist/getProductItemByProductId",
  async (id) => {
    const response = await fetch(
      `https://myunde.com/base/api/product-items/?productId=${id}`
    );
    const data = await response.json();
    return data;
  }
);

export const getRelatedProducts = createAsyncThunk(
  "productlist/getRelatedProducts",
  async ({ CatId, ProductId }) => {
    const response = await fetch(
      `https://myunde.com/api/products/top/?categoryId=${CatId}`
    );
    const data = await response.json();
    const updatedData = data.filter((item) => item.product.id !== ProductId);
    return updatedData;
  }
);  

export const productReducer = createSlice({
  name: "productlistpage",
  initialState: {
    ProductsById: [],
    ProductItemsById: [],
    Products: [],
    ProductItems: [],
    RelatedProducts: [],
    ProductItemImages: [],
    ProductByItem: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsById.fulfilled, (state, action) => {
      state.ProductsById = action.payload;
    }),
      builder.addCase(getProductItemsById.fulfilled, (state, action) => {
        state.ProductItemsById = action.payload;
      }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.Products = action.payload;
      }),
      builder.addCase(getProductItems.fulfilled, (state, action) => {
        state.ProductItems = action.payload;
      }),
      builder.addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.RelatedProducts = action.payload;
      }),
      builder.addCase(getProductItemImages.fulfilled, (state, action) => {
        state.ProductItemImages = action.payload;
      });
    builder.addCase(getProductItemByProductId.fulfilled, (state, action) => {
      state.ProductByItem = action.payload;
    });
  },
});

export default productReducer.reducer;
