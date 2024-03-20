import React, { useEffect } from "react";
import Image2 from "react-native-scalable-image";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native"; 
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

let { width2: screenWidth, height: screenHeight } = Dimensions.get("window");
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

function Like({ route: { params }, navigation }) {
  const { colorId, ProductId, CategoryId } = params;
  console.log(colorId, 111111111);
  console.log(ProductId, 222222222);
  console.log(CategoryId, 33333333);

  const decreaseCount = async (id) => {
    const oneDataIndex1 = cart.findIndex((v) => v.product.productItemID === id);
    const dataCopy1 = [...cart];
    if (dataCopy1[oneDataIndex1].product.count > 1) {
      dataCopy1[oneDataIndex1].product.count--;
    }
    setCart(dataCopy1); 

    await AsyncStorage.setItem("CartItems", JSON.stringify(dataCopy1));
  };

  const increaseCount = async (id) => {
    const oneDataIndex = cart.findIndex((v) => v.product.productItemID === id);

    const dataCopy = [...cart];
    dataCopy[oneDataIndex].product.count++;
    setCart(dataCopy);

    await AsyncStorage.setItem("CartItems", JSON.stringify(dataCopy));
  };

  const toCheckout = () => {
    navigation.navigate("checkout");
  };

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // const fetchCart = async () => {
  //   const resp = await fetch("https://myunde.com/base/api/product-depth");
  //   const data = await resp.json();

  //   if (id) {
  //     const filteredData = cart?.filter(
  //       (val) => val.id === id && val.id === color.id && val.id === size.id
  //     );

  //     setCart(filteredData);
  //   } else {
  //   }

  //   // const newData = data.slice(1, 10).map((v) => ({ ...v, count: 1 }));
  //   // setData(newData);
  // };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await AsyncStorage.getItem("CartItems")
      .then((value) => {
        if (value) {
          setCart(JSON.parse(value));
          setLoading(false);
        }
      })

      .catch((error) => {});
    setLoading(false);
  };

  removeCartItem = async (productItemId, name) => {
    const existingData = await AsyncStorage.getItem("CartItems");
    const newData = JSON.parse(existingData).filter(
      (value) => value.product.productItemID !== productItemId
    );

    setCart(newData);
    await AsyncStorage.setItem("CartItems", JSON.stringify(newData));
    showToastWithGravity(`${name} removed in cart`);
  };

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
          {cart?.length ? (
            <ScrollView style={{ padding: 5 }}>
              {cart?.map((item, i) => {
                return (
                  <View style={styles.card} key={i}>
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
                        source={{ uri: item?.product?.image }}
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
                              item.product.productItemID,
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
                        {item?.product.color?.image ? (
                          <Image
                            source={{ uri: item?.product.color?.image }}
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
                              backgroundColor: item?.product.color?.code,
                            }}
                          ></Text>
                        )}
                      </View>

                      <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                        Size :
                        <Text>
                          {" "}
                          {item?.product?.size?.name === "FREE SIZE"
                            ? "FS"
                            : item?.product?.size?.name}
                        </Text>
                      </Text>
                      <View>
                        <Text style={{ marginVertical: 5, fontWeight: "500" }}>
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
                            item?.product?.count * item?.product?.price
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
                            {item.product.count}
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
                                increaseCount(item?.product?.productItemID)
                              }
                            >
                              +
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        margin: 1,
                      }}
                    ></View>
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
              ₹{cart.reduce((x, y) => x + y.product.price * y.product.count, 0)}
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

export default Like;
