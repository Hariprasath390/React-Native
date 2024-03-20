import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cartPage/addToCart",
  async ({ productItemId, qty }) => {
    const response = await fetch(
      `https://myunde.com/base/api/product-item/${productItemId}`
    );
    const data = await response.json();

    const cartProduct = {
      id: productItemId,
      product_item: data.id,
      product: data.product,
      quantity: qty,
    };

    const existingData = await AsyncStorage.getItem("cartItems");

    const parsedData = JSON.parse(existingData);

    if (parsedData !== null) {
      const cartProductDatas = [...parsedData, cartProduct];

      AsyncStorage.setItem("cartItems", cartProductDatas);

      console.log(cartProductDatas, ")))))))))))))))))");

      return cartProductDatas;
    } else {
      AsyncStorage.setItem("cartItems", cartProduct);

      console.log(cartProduct, "00000000000000000");

      return cartProduct;
    }
  }
);

export const listCartDataBase = createAsyncThunk(
  "cartPage/listCartDataBase",
  async ({ userId, cartProductItem }) => {
    console.log(
      cartProductItem,
      ")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))A"
    );
    const response =
      userId !== 0
        ? await fetch(`https://myunde.com/api/orders/cart/${userId}/`)
        : await fetch(
            `https://myunde.com/api/orders/cart/0/?cartProductItem=${JSON.stringify(
              cartProductItem
            )}`
          );

    const data = await response.json();

    const existingData = await AsyncStorage.getItem("cartProductItems");
    const parsedData = JSON.parse(existingData);
    if (parsedData !== null) {
      const cartProductItemDatas = [...parsedData, data.cartProductItems];

      AsyncStorage.setItem(
        "cartProductItems",
        JSON.stringify(cartProductItemDatas)
      );

      return cartProductItemDatas;
    } else {
      AsyncStorage.setItem(
        "cartProductItems",
        JSON.stringify(data.cartProductItems)
      );

      return data.cartProductItems;
    }
  }
);

export const cartReducers = createSlice({
  name: "cartPage",
  initialState: {
    cartItems: [],
    cartProductDetail: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(listCartDataBase.fulfilled, (state, action) => {
      state.cartProductDetail = action.payload;
    });
  },
});

export default cartReducers.reducer;
