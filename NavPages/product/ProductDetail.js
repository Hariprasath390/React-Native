import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ToastAndroid,
  Platform,
  Modal,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { AntDesign } from "@expo/vector-icons";

import {
  Feather,
  EvilIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStoreHook, useDispatch, useSelector } from "react-redux";
import {
  getProductItemByProductId,
  getProductItemImages,
  getRelatedProducts,
} from "../../reducers/productReducer";
import { getReviews } from "../../reducers/ReviewReducer";
import { Controller, useForm } from "react-hook-form";
import { addToCart, listCartDataBase } from "../../reducers/cartReducers";

const { width } = Dimensions.get("window");
const width2 = Dimensions.get("window").width - 130;

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: { width, height: 480, justifyContent: "center" },
  text: { fontSize: 100, textAlign: "center" },
});

const styles = StyleSheet.create({
  circle: {
    height: 50,
    width: 50,
    borderRadius: 150 / 2,

    overflow: "hidden",
    marginLeft: 2,
    marginHorizontal: 10,

    borderWidth: 2,
  },
  circleImage: {
    height: 50,
    width: 50,
  },
  qu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    width: 100,
    justifyContent: "space-evenly",
    fontSize: 17,
  },
  total: {
    fontSize: 25,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  tprice: {
    fontWeight: "900",
    fontSize: 25,
  },
  tp: {
    backgroundColor: "#f3f3f3",
    flexDirection: "row",
  },
  tdiv: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 18,
    width: width2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  butt: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  unselected: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: "#747b86",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  outOfStock: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: "#747b86",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  selected: {
    width: 50,
    display: "flex",
    height: 50,
    color: "white",
    borderRadius: 150 / 2,
    backgroundColor: "rgb(0,53,96)",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#003560",
  },
  unselected1: {
    height: 50,
    width: 50,
    borderRadius: 150 / 2,

    overflow: "hidden",
    marginLeft: 2,
    marginHorizontal: 10,
    borderColor: "grey",
    borderWidth: 1,
  },
  selected1: {
    height: 50,
    width: 50,
    borderRadius: 150 / 2,
    borderColor: "black",
    overflow: "hidden",
    marginLeft: 2,
    marginHorizontal: 10,
    color: "rgba(0,0,0,0.3)",
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

function ProductDetail({ route: { params }, navigation }) {
  const { colorId, ProductId, CategoryId } = params;

  const sizeIds = [];

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateSize, setStateSize] = useState(null);
  const [statecolor, setStatecolor] = useState();
  const [loading2, setLoading2] = useState(false);
  const [cartStack, setCartStack] = useState([]);
  const didMount = useRef(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { ProductsById, RelatedProducts, ProductItemImages, ProductByItem } =
    useSelector((state) => state.ProductList);

  const { Colors, Sizes } = useSelector((state) => state.FilterList);
  const { productOffers } = useSelector((state) => state.Home);

  const { Reviews } = useSelector((state) => state.Review);

  const offerProductIds = productOffers.map((map) => map.product);

  const PrimaryImage = ProductByItem?.filter(
    (item) =>
      item.color === Number(statecolor ?? colorId) && item.active === true
  )[0];

  let itemimage = ProductItemImages?.filter(
    (item) => item.color === statecolor
  );

  const images = PrimaryImage ? [PrimaryImage, ...itemimage] : itemimage;

  const Zoom = images.map((map) => map.image);

  const fetchData = async (product_id, Category_id) => {
    setLoading(true);
    dispatch(getReviews(product_id));
    dispatch(getProductItemImages(product_id));
    dispatch(getProductItemByProductId(product_id));
    await dispatch(
      getRelatedProducts({
        CatId: Category_id,
        ProductId: product_id,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    toRelatedProduct(ProductId, colorId, CategoryId);
  }, []);

  const toRelatedProduct = (product_id, color_id, Category_id) => {
    fetchData(product_id, Category_id);
    setStatecolor(color_id);
  };

  const productSize = Array.from(
    new Set(
      ProductByItem?.filter(
        (productitem) =>
          Number(productitem.color) === Number(statecolor ?? colorId) &&
          Number(productitem?.quantity) !== 0
      ).map((size) => {
        return size.size;
      })
    )
  );

  const ForColor = Colors.filter((col) =>
    ProductByItem.map((id) => id.color).includes(col.id)
  );

  const ForSize = Sizes.filter((siz) =>
    ProductByItem.map((id) => id.size).includes(siz.id)
  );

  const ForSelectSize = (
    <View style={{ marginTop: -18 }}>
      {productSize?.length === 0 ? (
        <View>
          <Text
            style={{
              color: "rgb(168,1,1)",
            }}
          >
            This product is currently unavailable
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              color: "#424553",
            }}
          >
            Selecт Sιze
          </Text>
        </View>
      )}

      <ScrollView
        style={{
          flexDirection: "row",
          marginVertical: 17,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {ForSize.map((size, i) => {
          if (sizeIds.includes(size.id)) {
            return;
          } else {
            sizeIds.push(size.id);
            const outOfStock = !productSize.includes(size.id);
            return (
              <View key={i}>
                <>
                  <TouchableOpacity
                    onPress={() => setStateSize(size.id)}
                    key={i}
                    disabled={outOfStock ? true : false}
                  >
                    <View
                      style={
                        size.id === stateSize && !outOfStock
                          ? styles.selected
                          : outOfStock
                          ? styles.outOfStock
                          : styles.unselected
                      }
                    >
                      <Text
                        style={
                          outOfStock
                            ? {
                                textDecorationLine: "line-through",
                                textDecorationStyle: "solid",
                                paddingHorizontal: 5,
                              }
                            : size.id === stateSize
                            ? { color: "white" }
                            : ""
                        }
                      >
                        {size.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );

  const ForSelectColor = (
    <View style={{ height: 150 }}>
      <Text
        style={{
          fontWeight: "900",
          fontSize: 20,
          color: "#424553",
        }}
      >
        Avαιlвle colorѕ
      </Text>

      <ScrollView
        style={{
          flexDirection: "row",
          marginVertical: 17,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {ForColor.map((color, i) => {
          return (
            <TouchableOpacity
              // setStateColor(color.id)

              key={i}
              onPress={() => {
                setStatecolor(color.id);
                setStateSize(null);
                // setColid(color.id);
              }}
            >
              <View
                style={
                  color.id === statecolor
                    ? styles.selected1
                    : styles.unselected1
                }
              >
                {color.image ? (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <Image
                      source={{ uri: color.image }}
                      style={{
                        width: 50,
                        height: 50,
                      }}
                    />

                    {color.id === statecolor ? (
                      <Feather
                        name="check"
                        size={35}
                        color="black"
                        style={{
                          position: "absolute",
                          backgroundColor: "rgba(255,255,255,0.3)",
                          padding: 8,
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </View>
                ) : (
                  <Text
                    style={{
                      ...styles.circle,
                      backgroundColor: color.code,
                    }}
                  ></Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const showToastWithGravity = (data) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        data,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      Alert.alert(data);
    }
  };

  const starIcons = [];

  for (let j = 0; j < 5; j++) {
    starIcons.push(<FontAwesome name="star" size={15} color="#f7ba00" />);
  }

  const [isAvailable, setIsAvailable] = useState({});

  const onSubmit = async (data) => {
    setLoading2(true);
    const response = await fetch(
      `https://myunde.com/api/shipping/shipping-availability/${data.pincode}`
    );
    const availability = await response.json();
    setLoading2(false);
    setIsAvailable(JSON.parse(availability));
  };

  // const saveCartItem = () => {
  //   const cartStackLoop = async (index) => {
  //     const { productData, productItemData, offer } = cartStack[index];
  //     const ColorImage = Colors.filter(
  //       (col) => col.id === productItemData.color
  //     )[0];
  //     const sizeName = Sizes.filter(
  //       (size) => size.id === productItemData.size
  //     )[0];

  //     const product = {
  //       ...productData,
  //       name: productData.name,
  //       price: productData.price,
  //       mrp: productData.mrp,
  //       id: productData.id,
  //       image: productItemData.image,
  //       productItemID: productItemData.id,
  //       color: ColorImage,
  //       size: sizeName,
  //       count: 1,
  //     };

  //     const cartItem = { product };

  //     const cartItems = await AsyncStorage.getItem("CartItems");
  //     const existCartItems = JSON.parse(cartItems) ?? [];

  //     await AsyncStorage.setItem(
  //       "CartItems",
  //       JSON.stringify([...existCartItems, cartItem]),
  //       () => {
  //         index += 1;
  //         if (index < cartStack.length) {
  //           cartStackLoop(index);
  //         } else {
  //           setCartStack([]);
  //         }
  //       }
  //     );
  //   };

  //   cartStackLoop(0);
  //   showToastWithGravity(`${cartStack[0].productData.name} added to cart`);
  // };

  // const cartkeeper = async (data, offer) => {
  //   const cartItems = await AsyncStorage.getItem("CartItems");
  //   const existCartItems = JSON.parse(cartItems) ?? [];

  //   const ProductItemForCart = ProductByItem.find(
  //     (pro) => pro.color === statecolor && pro.size === stateSize
  //   );

  //   if (ProductItemForCart !== undefined) {
  //     const isAlreadyExist = existCartItems?.filter(
  //       (value) => value.product.productItemID === ProductItemForCart.id
  //     );

  //     if (isAlreadyExist.length > 0) {
  //       showToastWithGravity("Item already exists in cart");
  //     } else {
  //       setCartStack((prev) => {
  //         return [
  //           ...prev,
  //           {
  //             productData: data,
  //             productItemData: ProductItemForCart,
  //             offer,
  //           },
  //         ];
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //     return;
  //   }

  //   const lastIndex = cartStack.length - 1;

  //   if (cartStack.length >= 1 && cartStack[lastIndex].offer) {
  //     setModalVisible(true);
  //   } else if (cartStack.length >= 1) {
  //     setModalVisible(false);
  //     saveCartItem();
  //   }
  // }, [cartStack]);

  const { cartItems } = useSelector((state) => state.cartPage);

  const userInfo = false;

  let cartItemsDBorLS = userInfo ? cartItemsDataBase : cartItems;

  const AddToCart = async (productname) => {
    if (!stateSize) {
      showToastWithGravity("select size");
      return;
    }

    const ProductItemForCart = ProductByItem.find(
      (pro) => pro.color === statecolor && pro.size === stateSize
    );
    console.log(ProductItemForCart, " <------------------");

    if (
      cartItemsDBorLS
        .map((Car) => Car.product_item)
        .includes(ProductItemForCart[0]?.id) === true
    ) {
      showToastWithGravity("Item already exists in cart");
    } else {
      if (ProductItemForCart !== undefined) {
        // AddToCartAlert(productname?.slice(0, 20));
        showToastWithGravity(productname?.slice(0, 20));

        if (userInfo) {
          dispatch(CartDataBaseAdd(ProductItemForCart?.id, 1)).then(() => {
            dispatch(listCartDataBase(userInfo?.id, ""));
          });
        } else {
          const data = { productItemId: ProductItemForCart?.id, qty: 1 };
          await dispatch(addToCart(data)).then((data) => {
            const dataCart = { userId: 0, cartProductItem: [data.payload] };
            dispatch(listCartDataBase(dataCart)).then((data) =>
              console.log(data, "========================")
            );
          });
        }
      }
    }
  };

  const addToWishList = (productItem) => {
    if (userInfo) {
      dispatch(WishDataBaseAdd(productItem?.id)).then((data) => {
        if (data === "success") {
          dispatch(listWishDataBase(userInfo?.id));
        }
      });
      if (
        wishItemsDataBase?.filter((i) => i?.product_item === productItem?.id)[0]
          ?.product_item ||
        wishItemsDataBase
          ?.map((i) => i?.product_item.id)
          .includes(productItem?.id)
      ) {
        alreadyInWishAlert(product?.name);
      } else {
        addToWishAlert(product?.name);
      }
    } else {
      forLogin();
    }
  };

  return (
    <>
      <View style={styles2.container}>
        <ScrollView>
          <SwiperFlatList
            autoplay
            autoplayDelay={4}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor={"rgb(0,53,96)"}
            keyExtractor={(item) => `${item.id}`}
            paginationStyleItem={{
              width: 6,
              height: 6,
              marginHorizontal: 2,
            }}
            paginationStyle={{ position: "relative" }}
            data={images}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ImageZoom", {
                    Zoom,
                  })
                }
                style={[styles2.child]}
                key={index}
              >
                <Image
                  resizeMode="contain"
                  source={{ uri: item.image }}
                  style={styles2.child}
                />
              </TouchableOpacity>
            )}
          />

          {ProductsById.products
            ?.filter((datas) => datas.id === ProductByItem[0]?.product)
            .map((detail) => {
              return (
                <ScrollView key={detail.id}>
                  <View>
                    <View>
                      <ScrollView style={{ marginHorizontal: 10 }}>
                        <View>
                          <View>
                            <Text
                              style={{
                                fontWeight: "700",
                                fontSize: 20,
                                color: "#424553",
                              }}
                            >
                              {detail.name}
                            </Text>
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "500",
                                    fontSize: 14,
                                    fontWeight: "200",
                                  }}
                                >
                                  MRP
                                  <Text
                                    style={{
                                      textDecorationLine: "line-through",
                                      fontWeight: "200",
                                    }}
                                  >
                                    {detail.mrp}
                                  </Text>
                                </Text>
                                <View
                                  style={{
                                    borderRadius: 10,

                                    width: 70,
                                    height: 30,
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      display: "flex",
                                      textAlign: "center",

                                      fontWeight: "900",
                                    }}
                                  >
                                    {detail.price}
                                  </Text>
                                </View>

                                <Text
                                  style={{
                                    fontWeight: "500",
                                    fontSize: 14,
                                    color: "rgb(0,53,96)",
                                  }}
                                >
                                  ({detail.percentage} % OFF)
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 10,
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 10,
                                  backgroundColor: " rgba(0,0,0,0.2)",
                                  width: 100,
                                  height: 30,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 14,
                                    display: "flex",
                                    textAlign: "center",

                                    fontWeight: "500",
                                  }}
                                >
                                  4566 sold
                                </Text>
                              </View>

                              <MaterialIcons
                                name="star-half"
                                size={24}
                                color={"rgb(255,182,0)"}
                              />
                              <Text
                                style={{
                                  fontWeight: "500",
                                  fontSize: 14,
                                  width: 40,
                                }}
                              >
                                4.6
                              </Text>
                              <Text style={{ fontWeight: "500", fontSize: 14 }}>
                                6388 reviews
                              </Text>
                            </View>
                          </View>

                          {offerProductIds.includes(detail.id) && (
                            <View
                              style={{
                                backgroundColor: "white",
                                marginVertical: 30,
                                padding: 10,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: "black",
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: "lightgrey",
                                  justifyContent: "space-between",
                                  padding: 10,
                                  borderRadius: 5,
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text style={{ fontWeight: "bold" }}>
                                  Offer applicable for this product
                                </Text>
                                <Text
                                  style={{
                                    backgroundColor: "grey",
                                    color: "white",
                                    fontSize: 11,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    padding: 5,
                                    borderRadius: 5,
                                  }}
                                >
                                  Applied
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    marginVertical: 10,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {productOffers[0]?.offer?.value}
                                </Text>
                                <Text>
                                  Select any 2 products for the price of 1
                                  product
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",

                                    marginVertical: 10,
                                  }}
                                >
                                  <Text
                                    style={{
                                      textDecorationLine: "line-through",
                                      fontWeight: "400",
                                    }}
                                  >
                                    ₹
                                    {(
                                      Number(detail.mrp) + Number(detail.mrp)
                                    ).toFixed(2)}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      display: "flex",
                                      textAlign: "center",
                                      marginLeft: 10,
                                      fontWeight: "900",
                                    }}
                                  >
                                    ₹ {detail.price}
                                  </Text>
                                  <Text
                                    style={{
                                      fontWeight: "500",
                                      fontSize: 14,
                                      color: "rgb(0,53,96)",
                                      marginLeft: 10,
                                    }}
                                  >
                                    ({detail.percentage + detail.percentage} %
                                    OFF)
                                  </Text>
                                </View>
                              </View>
                            </View>
                          )}
                          {ForSelectColor}
                          <Modal
                            animationType="fade"
                            visible={modalVisible}
                            transparent
                            onRequestClose={() => {
                              Alert.alert("Modal has been closed.");
                              setModalVisible(!modalVisible);
                            }}
                          >
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                {ForSelectColor}
                                <View style={{ height: 120 }}>
                                  {ForSelectSize}
                                </View>
                                <TouchableOpacity
                                  style={[styles.button, styles.buttonClose]}
                                  onPress={() => {
                                    cartkeeper(detail, false);
                                  }}
                                >
                                  <Text style={styles.textStyle}>
                                    Add free product
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </Modal>

                          {ForSelectSize}
                        </View>

                        <View style={{ marginVertical: 10 }}>
                          <Text
                            style={{
                              fontWeight: "700",
                              fontSize: 20,
                              marginBottom: 10,
                              color: "#424553",
                            }}
                          >
                            Deѕcrιpтιoɴ
                          </Text>
                          <Text
                            style={{
                              fontWeight: "400",
                              fontSize: 13,
                              fontStyle: "normal",
                              fontWeight: "500",
                              paddingLeft: 10,
                            }}
                          >
                            {detail.description}
                          </Text>
                        </View>
                      </ScrollView>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                        justifyContent: "space-evenly",
                        display: "flex",
                        shadowColor: "#d4d5d9",
                        elevation: 5,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: width / 2.2,

                          borderWidth: 1,
                          borderColor: "grey",

                          height: 50,

                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          fontWeight: "900",
                          borderRadius: 5,
                          color: "rgb(0,53,96)",
                        }}
                        // onPress={() => AddtoWishlist(detail)}
                      >
                        <Text>WISHLIST </Text>
                        <EvilIcons name="heart" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: width / 2.2,

                          backgroundColor: "grey",
                          borderWidth: 1,
                          borderColor: "grey",

                          height: 50,

                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          fontWeight: "900",
                          borderRadius: 5,
                          color: "rgba(0,0,0,0.9)",
                        }}
                        onPress={() => {
                          AddToCart(detail.name);
                        }}
                      >
                        <Text> ADD TO BAG </Text>
                        <EvilIcons name="cart" size={24} color="black" />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        backgroundColor: "white",
                        marginVertical: 10,
                        padding: 15,
                      }}
                    >
                      <Text style={{ fontWeight: "700", fontSize: 18 }}>
                        Check Delivery
                      </Text>

                      <Text
                        style={{
                          fontWeight: "300",
                          color: "grey",
                          marginVertical: 5,
                        }}
                      >
                        Enter PIN code to check service availability
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Controller
                          control={control}
                          rules={{
                            required: "This field is required",
                            minLength: {
                              value: 6,
                              message: "Minimum length is 6 characters",
                            },
                            maxLength: {
                              value: 6,
                              message: "Maximum length is 6 characters",
                            },
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ marginVertical: 10 }}>
                              <TextInput
                                style={{
                                  height: 50,
                                  width: screenWidth / 1.5,
                                  marginRight: 5,
                                  borderWidth: 1,
                                  borderRadius: 10,
                                  padding: 10,
                                  borderColor: "#c9cacf",
                                }}
                                maxLength={6}
                                placeholder="Pin Code*"
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                  onChange(value);
                                }}
                                value={value}
                              />
                            </View>
                          )}
                          name="pincode"
                          defaultValue=""
                        />
                        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                          <View
                            style={{
                              width: 80,
                              height: 50,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "rgb(0,53,96)",
                              borderRadius: 10,
                            }}
                          >
                            {loading2 ? (
                              <View
                                style={{
                                  justifyContent: "center",
                                  flex: 1,
                                  alignItems: "center",
                                }}
                              >
                                <ActivityIndicator size={30} color={"white"} />
                              </View>
                            ) : (
                              <Text
                                style={{
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                ok
                              </Text>
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>

                      {isAvailable?.status === 200 ? (
                        <View>
                          <Text
                            style={{
                              color: "green",
                              margin: 4,
                              fontWeight: "900",
                              fontSize: 15,
                            }}
                          >
                            Delivery service Available
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                            {isAvailable.message}
                          </Text>
                        </View>
                      )}
                      {errors.pincode && (
                        <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                          Enter a valid Pincode
                        </Text>
                      )}
                    </View>
                  </View>
                </ScrollView>
              );
            })}

          {Reviews?.reviews && Reviews?.reviews[0]?.reviews?.length >= 1 && (
            <View style={{}}>
              <Text
                style={{
                  textAlign: "center",
                  padding: 5,

                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Customer Reviews
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    margin: 10,
                    backgroundColor: "white",
                    width: screenWidth - 150,
                    borderRadius: 30,
                    shadowColor: "grey",
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}
                >
                  {starIcons}
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "400",
                      color: "grey",
                    }}
                  >
                    ({Reviews?.reviews[0]?.reviews?.length}) verified customer
                  </Text>
                </View>
              </View>

              <ScrollView
                style={{
                  flexDirection: "row",
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {Reviews?.reviews?.length >= 1 && (
                  <>
                    {Reviews?.reviews[0]?.reviews?.slice(0, 4)?.map((item) => {
                      const diffInMs = new Date() - new Date(item?.createdAt);
                      const diffInDays = Math.floor(
                        diffInMs / (1000 * 60 * 60 * 24)
                      );

                      const starIcons = [];
                      for (let j = 0; j < item?.rating; j++) {
                        starIcons.push(
                          <FontAwesome
                            name="star"
                            size={15}
                            color="#f7ba00"
                            key={j}
                          />
                        );
                      }

                      const reviewImage = Reviews?.reviews[0]?.images?.filter(
                        (img) => img?.review === item?.id
                      );

                      return (
                        <View
                          style={{
                            padding: 10,
                            width: screenWidth - 20,
                            height: 200,
                            backgroundColor: "white",
                            margin: 10,
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
                          }}
                          key={item.id}
                        >
                          <View
                            style={{
                              flexDirection: "row",

                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                width: 40,
                                height: 40,
                                marginRight: 10,
                                borderRadius: 50,
                                backgroundColor: "lightgrey",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Text style={{ textAlign: "center" }}>
                                {item?.name?.slice(0, 1)}
                              </Text>
                            </View>
                            <View style={{}}>
                              <Text
                                style={{ color: "grey", fontWeight: "800" }}
                              >
                                {item.name}
                              </Text>

                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "75%",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    color: "grey",
                                    fontWeight: "800",
                                    marginVertical: 2,
                                  }}
                                >
                                  {starIcons?.length >= 1 && starIcons}(
                                  {starIcons?.length})
                                </Text>
                                <Text
                                  style={{
                                    color: "grey",
                                    fontWeight: "500",
                                    marginVertical: 2,
                                  }}
                                >
                                  {diffInDays === 0
                                    ? " Yesterday"
                                    : diffInDays === 1
                                    ? `${diffInDays} day ago`
                                    : `${diffInDays} days ago`}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={{}}>
                            <Text
                              numberOfLines={4}
                              style={{
                                fontWeight: "300",
                                marginVertical: 10,
                                paddingLeft: 20,
                              }}
                            >
                              {item?.comment}
                            </Text>
                          </View>
                          {reviewImage?.length >= 1 && (
                            <View
                              style={{
                                flexDirection: "row",
                                alignSelf: "flex-end",
                                alignItems: "flex-end",
                              }}
                            >
                              {reviewImage?.map((img, i) => {
                                const Zoom = reviewImage.map(
                                  (map) => map.image
                                );
                                return (
                                  <TouchableOpacity
                                    style={{ margin: 5 }}
                                    key={i}
                                    onPress={() =>
                                      navigation.navigate("ImageZoom", {
                                        Zoom,
                                      })
                                    }
                                  >
                                    <Image
                                      source={{ uri: img?.image }}
                                      style={{ width: 50, height: 50 }}
                                    />
                                  </TouchableOpacity>
                                );
                              })}
                            </View>
                          )}
                        </View>
                      );
                    })}
                    {Reviews?.reviews[0]?.reviews?.length >= 3 && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Reviews")}
                      >
                        <View
                          style={{
                            padding: 10,
                            width: screenWidth - 20,
                            height: 200,
                            backgroundColor: "white",
                            margin: 10,
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
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text> View more</Text>
                          <AntDesign name="plus" size={24} color="black" />
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </ScrollView>
            </View>
          )}

          {RelatedProducts?.length >= 1 && (
            <View style={{ margin: 10, marginBottom: 30 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  marginBottom: 20,
                  color: "#424553",
                }}
              >
                Similiar Products
              </Text>
              {loading ? (
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size={50} color={"black"} />
                </View>
              ) : (
                <FlatList
                  data={RelatedProducts}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        margin: 2,
                        borderColor: "rgba(0,0,0,0.1)",
                        padding: 5,
                      }}
                      key={index}
                      onPress={() =>
                        toRelatedProduct(
                          item.product.id,
                          item.color,
                          item.product.category
                        )
                      }
                    >
                      {offerProductIds.includes(item.product.id) && (
                        <View
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 1,
                            zIndex: 1,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "grey",
                              paddingTop: 4,
                              paddingBottom: 7,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 11,
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {productOffers[0]?.offer?.value}
                            </Text>
                          </View>
                        </View>
                      )}

                      <Image
                        style={{
                          width: screenWidth / 2.1,
                          height: screenHeight / 3.5,
                          margin: 1,
                          alignItems: "center",
                          flex: 1,
                          position: "relative",
                        }}
                        source={{ uri: item.image }}
                        alt="img"
                      />

                      <View style={styles.details}>
                        <Text
                          style={{
                            width: 160,
                            fontWeight: "400",
                            color: "#424656",
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.product.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "900",
                              color: "#121212",
                            }}
                          >
                            ₹ {item.product.price}
                          </Text>
                          <Text
                            style={{
                              fontWeight: "400",
                              color: "grey",
                              textDecorationLine: "line-through",
                              marginLeft: 6,
                            }}
                          >
                            ₹ {item.product.mrp}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <MaterialIcons
                            name="star-half"
                            size={20}
                            color={"rgb(255,182,0)"}
                          />
                          <Text style={{ color: "#686b78" }}> 4.6 </Text>
                          <Text style={{ color: "#686b78" }}> | </Text>
                          <Text style={{ color: "#686b78" }}> 8,477 sold </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                ></FlatList>
              )}
            </View>
          )}
        </ScrollView>

        {/* <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "space-evenly",
          display: "flex",
          shadowColor: "#d4d5d9",
          elevation: 5,
        }}
      >
        <Text
          style={{
            width: width / 2.3,
            textAlign: "center",
            borderColor: "#d4d5d9",
            borderWidth: 1,
            padding: 3,
            margin: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "900",
            paddingTop: 12,
            borderRadius: 5,
            color: "#ff6060",
          }}
        >
          WISHLIST
          <Icon
            size={20}
            color="rgb(255, 62, 108)"
            name="heart-o"
            style={{ alignSelf: "end" }}
          ></Icon>
        </Text>
        <Text
          style={{
            width: width / 2,
            textAlign: "center",
            backgroundColor: "grey",
            borderWidth: 1,
            borderColor: "grey",
            padding: 3,
            height: 50,
            alignItems: "center",
            margin: 3,
            justifyContent: "center",
            fontWeight: "900",
            borderRadius: 5,
            paddingTop: 12,
            color: "rgba(0,0,0,0.9)",
          }}
        >
          ADD TO BAG
          <Icon
            size={20}
            name="shopping-bag"
            style={{
              width: 40,
              alignItems: "center",
              textAlign: "center",
            }}
          ></Icon>
        </Text>
      </View> */}
      </View>
    </>
  );
}

export default ProductDetail;
