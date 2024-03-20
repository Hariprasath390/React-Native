import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductPage from "./NavPages/product/ProductPage";
import CartPage from "./NavPages/cart/CartPage";
import ProductDetail from "./NavPages/product/ProductDetail";
import ShippingPage from "./NavPages/cart/ShippingPage";
import PlaceOrderpage from "./NavPages/cart/PlaceOrderpage";
import Payment from "./NavPages/cart/PaymentPage";
import SearchBar from "./NavPages/component/SearchBar";
import Spage from "./NavPages/component/Spage";
import Filter from "./NavPages/product/Filter";
import Wish from "./NavPages/component/Wish";
import RelatedProduct from "./NavPages/product/RelatedProduct";
import TabBar from "./TabBar";
import Myorder from "./NavPages/profile/Myorder";
import OrderInfo from "./NavPages/profile/OrderInfo";
import TrackOrder from "./NavPages/profile/TrackOrder";
import RatingPage from "./NavPages/product/RatingPage";
import EditAdress from "./NavPages/profile/EditAdress";
import EditProfiile from "./NavPages/profile/EditProfiile";
import OrderPlacedPage from "./NavPages/cart/OrderPlacedPage";
import OtpLogin from "./NavPages/component/OtpLogin";
import Headericon from "./NavPages/component/Headericon";
import DeleteAccount from "./NavPages/profile/DeleteAccount";
import Aboutus from "./NavPages/profile/Aboutus";
import OrderStatus from "./NavPages/cart/OrderStatus";
import Reviews from "./NavPages/product/Reviews";
import Like from "./NavPages/product/like";
import ImageZoom from "./NavPages/product/ImageZoom";
import Google from "./NavPages/component/Google";
import ProfilePage from "./Tabbarpages/ProfilePage";

import PrivacyPolicy from "./NavPages/profile/PrivacyPolicy";
import Conditions from "./NavPages/profile/Conditions";
import Faq from "./NavPages/profile/Faq";

import Delivery from "./NavPages/profile/Delivery";
import Cancellation from "../MyundeProject/NavPages/profile/Cancellation";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="HomePage"
            component={TabBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductPage"
            component={ProductPage}
            options={({ navigation }) => ({
              title: "Product List",
              headerRight: () => (
                <Headericon navigation={navigation} hideSearch={false} />
              ),
            })}
          />
          <Stack.Screen
            name="TrackOrder"
            component={TrackOrder}
            options={{ title: "Track Order" }}
          />
          <Stack.Screen
            name="EditAddress"
            component={EditAdress}
            options={{ title: "Edit address" }}
          />
          <Stack.Screen
            name="OrderPlacedPage"
            component={OrderPlacedPage}
            options={{ title: "Order Placedpage" }}
          />
          <Stack.Screen
            name="OtpLogin"
            component={OtpLogin}
            options={{ title: "Otp Login" }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfiile}
            options={{ title: "Edit Profiile" }}
          />
          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ title: "Profile" }}
          />
          <Stack.Screen
            name="DeleteAccount"
            component={DeleteAccount}
            options={{ title: "Delete Account" }}
          />
          <Stack.Screen
            name="Aboutus"
            component={Aboutus}
            options={{ title: "About us" }}
          />

          <Stack.Screen
            name="Spage"
            component={Spage}
            options={{ title: "Search List" }}
          />
          <Stack.Screen
            name="Details"
            component={ProductDetail}
            options={({ navigation }) => ({
              title: "Product Detail",
              headerRight: () => (
                <Headericon navigation={navigation} hideSearch={false} />
              ),
            })}
          />
          <Stack.Screen
            name="checkout"
            component={ShippingPage}
            options={{ title: "Checkout Page" }}
          />
          <Stack.Screen
            name="MyOrders"
            component={Myorder}
            options={{ title: "My orders" }}
          />
          <Stack.Screen
            name="OrderInfo"
            component={OrderInfo}
            options={{ title: "Order Information" }}
          />
          <Stack.Screen
            name="RatingPage"
            component={RatingPage}
            options={{ title: "Review Page" }}
          />
          <Stack.Screen
            name="Cart"
            component={CartPage}
            options={{ title: "Shopping Cart" }}
          />
          <Stack.Screen
            name="Like"
            component={Like}
            options={{ title: "Like page " }}
          />
          <Stack.Screen
            name="AdressDetail"
            component={PlaceOrderpage}
            options={{ title: "Adress detail" }}
          />

          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ title: "Payment Page" }}
          />
          <Stack.Screen
            name="OrderStatus"
            component={OrderStatus}
            options={{ title: "OrderStatus" }}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{ title: "Ratings & Reviews" }}
          />
          <Stack.Screen
            name="Wishlist"
            component={Wish}
            options={{ title: "Wishlist " }}
          />
          <Stack.Screen
            name="TermsAndConditions"
            component={Conditions}
            options={{ title: "Terms & Conditions " }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ title: "Privacy Policy" }}
          />
          <Stack.Screen
            name="Delivery"
            component={Delivery}
            options={{ title: "Delivery" }}
          />
          <Stack.Screen
            name="ShippingCancellation"
            component={Cancellation}
            options={{ title: "Shipping & Cancellation" }}
          />
          <Stack.Screen
            name="FAQ"
            component={Faq}
            options={{ title: "Frequently asked questions" }}
          />
          <Stack.Screen
            name="Related"
            component={RelatedProduct}
            options={({ navigation }) => ({
              title: "Product Detail",
            })}
          />
          <Stack.Screen
            name="ImageZoom"
            component={ImageZoom}
            options={{ title: "Image Zoom " }}
          />
          <Stack.Screen
            name="Filter"
            component={Filter}
            options={{ title: "Filters", headerShown: false }}
          />
          <Stack.Screen
            name="Google"
            component={Google}
            options={{ title: "Google Login" }}
          />
          <Stack.Screen
            name="SearchBar"
            component={SearchBar}
            screenOptions={{ headerShown: false }}
            options={({ navigation }) => ({
              title: "Seαrcн",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
