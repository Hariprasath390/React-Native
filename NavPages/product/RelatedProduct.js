import React, { useState, useEffect } from "react";
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  ToastAndroid,
  Platform,
  Modal,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { Feather, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductItemByProductId,
  getProductItemImages,
  getRelatedProducts,
} from "../../reducers/productReducer";

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
    borderWidth: 2,
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
    borderWidth: 3,
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
    borderWidth: 3,
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

function RelatedProduct({ route: { params }, navigation }) {
  const { colorId, ProductId, CategoryId } = params;

  const sizeIds = [];

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateSize, setStateSize] = useState(null);
  const [statecolor, setStatecolor] = useState();

  const dispatch = useDispatch();

  const { ProductsById, RelatedProducts, ProductItemImages, ProductByItem } =
    useSelector((state) => state.ProductList);

  const { Colors, Sizes } = useSelector((state) => state.FilterList);
  const { productOffers } = useSelector((state) => state.Home);

  const offerProductIds = productOffers.map((map) => map.product);

  const PrimaryImage = ProductByItem.filter(
    (item) =>
      item.color === Number(statecolor ?? colorId) && item.active === true
  )[0];

  let itemimage = ProductItemImages?.filter(
    (item) => item.color === statecolor
  );

  const images = PrimaryImage ? [PrimaryImage, ...itemimage] : itemimage;

  console.log(colorId, ProductId, CategoryId);

  const fetchData = async () => {
    dispatch(getProductItemImages(ProductId));
    dispatch(getProductItemByProductId(ProductId));
    setLoading(true);
    await dispatch(
      getRelatedProducts({
        CatId: CategoryId,
        ProductId: ProductId,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setStatecolor(colorId);
  }, []);

  const saveData = async (Item) => {
    const existData = await AsyncStorage.getItem("CartItems");

    const ProductItemForCart = ProductByItem.filter(
      (pro) => pro.color === statecolor && pro.size === stateSize
    )[0];

    const ColorImage = Colors.filter(
      (col) => col.id === ProductItemForCart.color
    )[0];
    const sizeName = Sizes.filter(
      (size) => size.id === ProductItemForCart.size
    )[0];

    const product = {
      ...Item,
      name: Item.name,
      price: Item.price,
      mrp: Item.mrp,
      id: Item.id,
      image: ProductItemForCart.image,
      productItemID: ProductItemForCart.id,
      color: ColorImage,
      size: sizeName,
      count: 1,
    };

    const cartItem = { product };

    if (existData) {
      const newData = JSON.parse(existData);

      const isAlreadyExist = newData.filter(
        (value) => value.product.productItemID === ProductItemForCart.id
      );

      if (isAlreadyExist.length >= 1) {
        return showToastWithGravity("This item is Already in your Cart.");
      }
      newData.push(cartItem);
      await AsyncStorage.setItem("CartItems", JSON.stringify(newData));
    } else {
      await AsyncStorage.setItem("CartItems", JSON.stringify([cartItem]));
    }
    showToastWithGravity(`${Item.name} added to cart`);
    // await AsyncStorage.clear()
  };

  const ForColor = Colors.filter((col) =>
    ProductByItem.map((id) => id.color).includes(col.id)
  );

  const ForSize = Sizes.filter((siz) =>
    ProductByItem.map((id) => id.size).includes(siz.id)
  );

  const ForSelectSize = (
    <View style={{ marginTop: -18 }}>
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
            return (
              <TouchableOpacity onPress={() => setStateSize(size.id)} key={i}>
                <View
                  style={
                    size.id === stateSize ? styles.selected : styles.unselected
                  }
                >
                  <Text style={size.id === stateSize ? { color: "white" } : ""}>
                    {size.name}
                  </Text>
                </View>
              </TouchableOpacity>
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

  const offerProductToCart = ({ data, offer }) => {
    if (offer) {
      saveData(data);
      setModalVisible(!modalVisible);
    } else {
      saveData(data);
      setModalVisible(false);
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
            renderItem={({ item }) => (
              <View style={[styles2.child]}>
                <Image
                  resizeMode="contain"
                  source={{ uri: item.image }}
                  style={styles2.child}
                />
              </View>
            )}
          />

          {ProductsById.filter(
            (datas) => datas.id === ProductByItem[0]?.product
          ).map((detail) => {
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
                                {" "}
                                {productOffers[0]?.offer?.value}
                              </Text>
                              <Text>
                                Select any 2 products for the price of 1 product
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
                                  ₹{" "}
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

                        {/* <View style={{ marginVertical: 10 }}>
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
                              <Pressable
                                // setStateColor(color.id)

                                key={i}
                                onPress={() => {
                                  setStatecolor(color.id);
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
                                            backgroundColor:
                                              "rgba(255,255,255,0.3)",
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
                              </Pressable>
                            );
                          })}
                        </ScrollView>
                      </View> */}
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
                                onPress={() =>
                                  offerProductToCart({
                                    data: detail,
                                    offer: false,
                                  })
                                }
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
                        if (stateSize) {
                          offerProductToCart({
                            data: detail,
                            offer: offerProductIds.includes(detail.id)
                              ? true
                              : false,
                          });
                        } else {
                          showToastWithGravity("select size");
                        }
                      }}
                    >
                      <Text> ADD TO BAG </Text>
                      <EvilIcons name="cart" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            );
          })}

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
                      onPress={() =>
                        navigation.navigate("Details", {
                          colorId: item.color,
                          ProductId: item.product.id,
                          CategoryId: item.product.category,
                        })
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
                        {/* <View>
                  <Text style={{ fontWeight: "900", color: "grey" }}>
                    {brandName?.name}
                  </Text>
                </View> */}
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

export default RelatedProduct;
