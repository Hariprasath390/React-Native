import { configureStore  }  from "@reduxjs/toolkit";
import HomepageReducer from "./reducers/homepageReducer";
import productReducer from "./reducers/productReducer";
import FilterReducer from "./reducers/FilterReducer";
import  OrderReducer  from "./reducers/orderReducer";
import ReviewReducer from "./reducers/ReviewReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import  cartReducer  from "./reducers/cartReducers";
// import thunk from "redux-thunk"; // example custom middleware

// const middleware = [thunk];


const store = configureStore({
  reducer: {
    Home: HomepageReducer,
    ProductList: productReducer,
    FilterList: FilterReducer,
    Order: OrderReducer,
    Review : ReviewReducer,
    ProfileList : ProfileReducer,
    cartPage : cartReducer ,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export default store;
