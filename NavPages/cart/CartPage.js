import React, { useEffect } from "react";
import Image2 from "react-native-scalable-image";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { useDispatch, useSelector } from "react-redux";
import { listCartDataBase } from "../../reducers/cartReducers";

const width = Dimensions.get("window").width - 130;
const CardWidth = Dimensions.get("window").width - 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ffff",
  },
  item: {
    backgroundColor: "#f3f3f3",
    fontSize: 24,
    borderBottomStartRadius: 20,
    elevation: 10,
    paddingTop: 20,
    padding: 15,
    borderRadius: 4,
    color: "black",
  },
  image: {
    width: 120,
    height: 130,
    margin: 10,
    alignItems: "center",
    flex: 1,
    borderRadius: 30,
  },
  card: {
    paddingVertical: 5,
    marginVertical: 7,
    marginHorizontal: 5,
    flexDirection: "row",
    backgroundColor: "white",
    position: "relative",
    borderRadius: 10,
    shadowColor: "grey",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card2: {
    paddingVertical: 5,
    marginVertical: 7,
    marginHorizontal: 5,

    backgroundColor: "white",
    position: "relative",
    borderRadius: 10,
    shadowColor: "grey",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 17,
    fontWeight: "700",
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 150 / 2,

    marginLeft: 2,
    marginTop: 2,
  },
  trash: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: width - 60,
  },
  priceee: {
    fontWeight: "700",
  },

  code: {
    fontSize: 14,
    marginLeft: 2,
  },
  ww: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "flex-start",
  },

  qu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 18,

    fontSize: 17,
  },
  fu: {
    flexDirection: "row",
    width: 180,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pri: {
    fontSize: 25,
    marginLeft: 2,
    fontWeight: "700",
  },

  total: {
    fontSize: 17,
    alignItems: "flex-start",
  },
  tprice: {
    fontWeight: "900",
    fontSize: 25,
    width: 200,
  },
  tp: {
    elevation: 10,
    padding: 15,
    backgroundColor: "#f3f3f3",
    flexDirection: "row",
  },
  div: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 100,
  },
  checkout: {
    marginHorizontal: 10,
    backgroundColor: "black",
    width: width,
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text2: {
    color: "white",
    textAlign: "center",
  },

  button: {
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 18,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "rgb(0,53,96)",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

function CartPage({ navigation }) {
  // const { id, colorIds, sizeIds } = params ?? {};

  const [cart, setCart] = useState({});

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { cartItems, cartProductDetail } = useSelector(
    (state) => state.cartPage
  );

  console.log(cartItems, "+++++++++++++++++++++++++++");

  const decreaseCount = async (id) => {
    const oneDataIndex1 = cart.findIndex((v) => v.product.productItemID === id);
    const dataCopy1 = [...cart];
    if (dataCopy1[oneDataIndex1].product.count > 1) {
      dataCopy1[oneDataIndex1].product.count--;
    }
    setCart(dataCopy1);

    await AsyncStorage.setItem("cartItems", JSON.stringify(dataCopy1));
  };

  const increaseCount = async (id) => {
    const oneDataIndex = cartProductDetail.findIndex(
      (v) => v.product.product_item === id
    );

    const dataCopy = [...cartProductDetail];
    dataCopy[oneDataIndex].quantity++;

    await AsyncStorage.setItem("cartItems", JSON.stringify(dataCopy));
  };

  const toCheckout = () => {
    navigation.navigate("checkout");
  };

  const showToastWithGravity = (data) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        data,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    } else {
      Alert.alert(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      // console.log("cart -value", cart);

      dispatch(listCartDataBase({ userId: 0, cartProductItem: [cart] })); // first arg is a user id now it's no user so 0
    }
  }, [cart]);

  const getData = async () => {
    setLoading(true);
    await AsyncStorage.getItem("cartItems")
      .then((value) => {
        console.log("initial call", value);
        if (value) {
          setCart(JSON.parse(value));
        }
      })

      .catch((error) => {});
    setLoading(false);
  };

  // console.log("outerLog:", cart);

  const removeCartItem = async (productItemId, name) => {
    const existingData = await AsyncStorage.getItem("cartItems");
    const newData = JSON.parse(existingData).filter(
      (value) => value.product.productItemID !== productItemId
    );

    setCart(newData);
    await AsyncStorage.setItem("cartItems", JSON.stringify(newData));
    showToastWithGravity(`${name} removed in cart`);
  };

  console.log(cart, "999999999999999999");

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <ActivityIndicator size={50} color={"black"} />
        </View>
      ) : (
        <View style={styles.container}>
          {cartProductDetail?.length ? (
            <ScrollView style={{ padding: 5 }}>
              {cartProductDetail?.map((item, i) => {
                console.log(item, "||||||||||||||||||||||");

                const dataBaseQty = [cart]?.find((obj) => {
                  console.log(
                    cart,
                    "cartttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"
                  );
                  return obj.product_item === item?.id;
                });
                console.log(
                  dataBaseQty,
                  "quantity -------------------------------"
                );
                return (
                  <View key={i}>
                    <View style={styles.card}>
                      <View>
                        <Image
                          style={{
                            width: 100,
                            height: 130,
                            margin: 10,
                            alignItems: "center",
                            flex: 1,
                            borderRadius: 10,
                          }}
                          source={{ uri: item?.image }}
                          alt="img"
                        />
                      </View>

                      <View style={{ width: CardWidth }}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 10,

                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontSize: 17, fontWeight: "500" }}>
                            {item?.product?.name.slice(0, 19)}...
                          </Text>
                          <TouchableOpacity
                            style={{
                              position: "absolute",
                              right: 0,
                              zIndex: 1,
                              backgroundColor: "#f3f3f3",
                              width: 40,
                              height: 40,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 50,
                            }}
                            onPress={() =>
                              removeCartItem(
                                item.product_item,
                                item?.product?.name
                              )
                            }
                          >
                            <EvilIcons
                              name="trash"
                              size={30}
                              color={"rgb(0,53,96)"}
                            />
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            width: 60,
                            marginVertical: 5,
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontWeight: "500" }}>Color : </Text>
                          {item?.color?.image ? (
                            <Image
                              source={{ uri: item?.color?.image }}
                              style={{
                                width: 20,
                                height: 20,
                                borderWidth: 1,
                                borderRadius: 50,
                                borderColor: "grey",
                              }}
                            />
                          ) : (
                            <Text
                              style={{
                                ...styles.circle,
                                backgroundColor: item?.color?.code,
                              }}
                            ></Text>
                          )}
                        </View>

                        <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                          Size :
                          <Text>
                            {item?.product?.size?.name === "FREE SIZE"
                              ? "FS"
                              : item?.size?.name}
                          </Text>
                        </Text>
                        <View>
                          <Text
                            style={{ marginVertical: 5, fontWeight: "500" }}
                          >
                            Price : ₹ {item?.product?.price}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              marginLeft: 2,
                              fontWeight: "700",
                            }}
                          >
                            ₹
                            {parseFloat(
                              dataBaseQty?.quantity * item?.product?.price
                            ).toFixed(2)}
                          </Text>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              backgroundColor: "#f3f3f3",
                              borderRadius: 10,

                              fontSize: 17,
                            }}
                          >
                            <View>
                              <Text
                                style={{
                                  width: 40,

                                  textAlign: "center",
                                  fontSize: 30,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() =>
                                  decreaseCount(item?.product?.productItemID)
                                }
                              >
                                -
                              </Text>
                            </View>

                            <Text
                              style={{
                                width: 24,
                                textAlign: "center",
                                fontSize: 14,
                              }}
                            >
                              {dataBaseQty?.quantity}
                            </Text>

                            <View>
                              <Text
                                style={{
                                  width: 40,

                                  textAlign: "center",
                                  fontSize: 18,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onPress={() =>
                                  increaseCount(item?.product?.product_item)
                                }
                              >
                                +
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Image2
                source={require("../../images/CRTPNG-02.webp")}
                width={Dimensions.get("window").width}
              />
            </View>
          )}
        </View>
      )}

      {cart?.length >= 1 && (
        <View style={styles.tp}>
          <View style={{ width: 100 }}>
            <Text style={styles.total}> Total price</Text>
            <Text style={styles.tprice}>
              ₹
              {cart.reduce(
                (x, y) => x + y.product?.price * y.product?.count,
                0
              )}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              // onPress={() => alert("Not yet done coding")}
              // android_ripple={{ color: "white" }}
              onPress={() => toCheckout()}
            >
              <Text style={styles.buttonText}>Check out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default CartPage;

// <View style={styles.card2}>
//   <View>
//     <Text
//       style={{
//         textAlign: "right",
//         width: ScreenWidth - 33,
//         fontWeight: "800",
//         color: "red",
//         marginVertical: 5,
//       }}
//     >
//       Buy 1 Get 1 Offer Applied
//     </Text>
//   </View>
//   <View style={{ flexDirection: "row" }}>
//     <View>
//       <Image
//         style={{
//           width: 100,
//           height: 130,
//           margin: 10,
//           alignItems: "center",
//           flex: 1,
//           borderRadius: 10,
//         }}
//         source={{ uri: item?.product?.image }}
//         alt="img"
//       />
//     </View>

//     <View>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           position: "relative",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 17,
//             fontWeight: "500",
//             width: 175,
//           }}
//         >
//           {item?.product?.name.slice(0, 19)}...
//         </Text>
//         <TouchableOpacity
//           style={{
//             right: 0,
//             zIndex: 1,
//             backgroundColor: "#f3f3f3",
//             width: 40,
//             height: 40,
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 50,
//           }}
//           onPress={() =>
//             removeCartItem(
//               item.product.productItemID,
//               item?.product?.name
//             )
//           }
//         >
//           <EvilIcons
//             name="trash"
//             size={30}
//             color={"rgb(0,53,96)"}
//           />
//         </TouchableOpacity>
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           width: 60,
//           marginVertical: 5,
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text style={{ fontWeight: "500" }}>Color : </Text>
//         {item?.product.color?.image ? (
//           <Image
//             source={{ uri: item?.product.color?.image }}
//             style={{
//               width: 20,
//               height: 20,
//               borderWidth: 1,
//               borderRadius: 50,
//               borderColor: "grey",
//             }}
//           />
//         ) : (
//           <Text
//             style={{
//               ...styles.circle,
//               backgroundColor: item?.product.color?.code,
//             }}
//           ></Text>
//         )}
//       </View>
//       <Text
//         style={{ marginVertical: 5, fontWeight: "500" }}
//       >
//         Size :
//         <Text>
//           {item?.product?.size?.name === "FREE SIZE"
//             ? "FS"
//             : item?.product?.size?.name}
//         </Text>
//       </Text>
//     </View>
//   </View>

//   <View style={{ flexDirection: "row" }}>
//     <View>
//       <Image
//         style={{
//           width: 100,
//           height: 130,
//           margin: 10,
//           alignItems: "center",
//           flex: 1,
//           borderRadius: 10,
//         }}
//         source={{ uri: item?.product?.image }}
//         alt="img"
//       />
//     </View>

//     <View>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           position: "relative",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 17,
//             fontWeight: "500",
//             width: 175,
//           }}
//         >
//           {item?.product?.name.slice(0, 19)}...
//         </Text>
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           width: 60,
//           marginVertical: 5,
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Text style={{ fontWeight: "500" }}>Color : </Text>
//         {item?.product.color?.image ? (
//           <Image
//             source={{ uri: item?.product.color?.image }}
//             style={{
//               width: 20,
//               height: 20,
//               borderWidth: 1,
//               borderRadius: 50,
//               borderColor: "grey",
//             }}
//           />
//         ) : (
//           <Text
//             style={{
//               ...styles.circle,
//               backgroundColor: item?.product.color?.code,
//             }}
//           ></Text>
//         )}
//       </View>
//       <View>
//         <Text
//           style={{ marginVertical: 5, fontWeight: "500" }}
//         >
//           Size :
//           <Text>
//             {item?.product?.size?.name === "FREE SIZE"
//               ? "FS"
//               : item?.product?.size?.name}
//           </Text>
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           width: ScreenWidth - 151,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 20,
//             marginLeft: 2,
//             fontWeight: "700",
//           }}
//         >
//           ₹
//           {parseFloat(
//             item?.product?.count * item?.product?.price
//           ).toFixed(2)}
//         </Text>

//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             backgroundColor: "#f3f3f3",
//             borderRadius: 10,

//             fontSize: 17,
//           }}
//         >
//           <View>
//             <Text
//               style={{
//                 width: 40,

//                 textAlign: "center",
//                 fontSize: 30,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//               onPress={() =>
//                 decreaseCount(item?.product?.productItemID)
//               }
//             >
//               -
//             </Text>
//           </View>

//           <Text
//             style={{
//               width: 24,
//               textAlign: "center",
//               fontSize: 14,
//             }}
//           >
//             {item.product.count}
//           </Text>

//           <View>
//             <Text
//               style={{
//                 width: 40,

//                 textAlign: "center",
//                 fontSize: 18,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//               onPress={() =>
//                 increaseCount(item?.product?.productItemID)
//               }
//             >
//               +
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   </View>
// </View>
