import * as React from "react";
import { useEffect, useState, useRef } from "react";

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductItemsById,
  getProductsById,
} from "../../reducers/productReducer";
import RBSheet from "react-native-raw-bottom-sheet";
import FilterPage from "./FilterPage";
import { getFilter } from "../../reducers/FilterReducer";
import SortPage from "./SortPage";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    containe: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },
    likeButton: {
      backgroundColor: "white",
      borderRadius: 50,
      padding: 10,
    },
    flex: 1,
    // backgroundColor: "rgb(243,243,243)",
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#3E92CC",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  draggableIcon: {
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    margin: 1,
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  idiv: {
    flex: 2,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row",
    margin: 1,
  },
  Productcard: {
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.1)",
    margin: 3,
    width: screenWidth / 2.1,
    height: screenHeight / 2.4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  details: {
    backgroundColor: "rgb(248,249,249)",

    padding: 6,
  },
  drawerButtom: {
    borderRadius: 40,
  },
  bookmarkRibbon: {
    position: "absolute",
    top: 1,
    right: 15,
    // backgroundColor: "rgba(0, 53, 96, 0.9)",
    color: "white",

    textAlign: "center",
    zIndex: 1,
  },

  buyOneGetOne: {
    paddingHorizontal: 4,
    width: 40,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

function ProductPage({ route: { params }, navigation }) {
  const [animation] = useState(new Animated.Value(1));
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const interpolateScale = animation.interpolate({
    inputRange: [1, 1.5],
    outputRange: [1, 1.5],
  });

  const animatedStyles = {
    transform: [{ scale: interpolateScale }],
  };

  const [filterData, setFilterData] = useState({
    size: [],
    color: [],
    fabric: [],
    style: [],
    packof: [],
    brand: [],
  });
  const [Product, setProduct] = useState([]);

  const [loading, setLoading] = useState(false);

  const bottomSheetRefForFilter = useRef();
  const bottomSheetRefForSort = useRef();

  const { Category_id, brand_id } = params;

  const dispatch = useDispatch();

  const { ProductsById, ProductItemsById } = useSelector(
    (state) => state.ProductList
  );

  const { productOffers } = useSelector((state) => state.Home);

  const { Sizes } = useSelector((state) => state.FilterList);

  const openBottomSheet = (bool) => {
    if (bool) {
      bottomSheetRefForFilter.current.open();
    } else {
      bottomSheetRefForSort.current.open();
    }
  };

  const sortProducts = (value) => {
    const sorted =
      value === "ascending"
        ? [...Product].sort((a, b) => (a.price > b.price ? 1 : -1))
        : [...Product].sort((a, b) => (a.price > b.price ? -1 : 1));

    return setProduct(sorted);
  };

  const closeBottomSheet = (bool, value) => {
    if (bool) {
      bottomSheetRefForFilter.current.close();
    } else {
      bottomSheetRefForSort.current.close();
      if (value !== undefined) {
        sortProducts(value);
      }
    }
  };

  const ForColorFilter = (data) => {
    const ProductFilteredByColor = data.filter((pro) =>
      filterData.color.includes(pro.color)
    );

    const ProductFilteredBySize = Sizes.filter((pro) =>
      filterData.size.includes(pro.name)
    );

    const ids = ProductFilteredBySize.map((item) => item.id);

    const ProductFilteredforSize = data.filter((pro) => ids.includes(pro.size));

    console.log(ids, ProductFilteredforSize, "ProductFilteredforSize");

    if (ProductFilteredByColor.length > 0) {
      setProduct(ProductFilteredByColor);
    } else {
      setProduct(data);
    }
  };

  const offerProductIds = productOffers.map((map) => map.product);

  const fetchData = async (id) => {
    setLoading(true);

    await dispatch(
      getProductsById({
        brandId: id,
        categoryId: Category_id,
      })
    ).then(({ payload }) => {
      dispatch(getProductItemsById(payload?.productsId.join(","))).then(() =>
        setLoading(false)
      );
    });
    await dispatch(
      getFilter(
        id ? { query: { brandId: id } } : { query: { categoryId: Category_id } }
      )
    );
  };

  useEffect(() => {
    fetchData(brand_id);
  }, []);

  useEffect(() => {
    if (ProductsById.products && ProductItemsById.length) {
      const data = ProductItemsById.map((proItem) => {
        const currentProduct = ProductsById.products.find(
          (product) => product.id === proItem.product
        );

        return {
          productId: proItem.product,
          image: proItem.image,
          Itemid: proItem.id,
          color: proItem.color,
          size: proItem.size,
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          mrp: currentProduct.mrp,
          brandName: currentProduct.brand.name,
          category: currentProduct.category.id,
        };
      });
      ForColorFilter(data);
    }
  }, [ProductItemsById]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <ActivityIndicator size={50} color={"black"} />
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.idiv}>
              {Product.map((dataForDetail, i) => {
                const OfferAvailableProduct = productOffers.filter(
                  (off) => off.product === dataForDetail?.id
                );

                return (
                  <TouchableOpacity
                    style={styles.Productcard}
                    key={dataForDetail.Itemid}
                    onPress={() => {
                      navigation.navigate("Details", {
                        colorId: dataForDetail.color,
                        ProductId: dataForDetail.productId,
                        CategoryId: dataForDetail.category,
                      });
                    }}
                  >
                    {offerProductIds.includes(dataForDetail.id) && (
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
                            {OfferAvailableProduct[0]?.offer.value}
                          </Text>
                        </View>
                      </View>
                    )}

                    <Image
                      style={styles.image}
                      source={{ uri: dataForDetail.image }}
                      alt="img"
                    />

                    <View style={styles.details}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontWeight: "900", color: "grey" }}>
                          {dataForDetail.brandName}
                        </Text>
                        <View style={{ marginRight: 5 }}>
                          {/* <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Wishlist", {
                                colorId: dataForDetail.color,
                                ProductId: dataForDetail.productId,
                                CategoryId: dataForDetail.category,
                              })
                            }
                          >
                            <View style={styles.containe}>
                              <TouchableOpacity onPress={handlePress}>
                                <Animated.View
                                  style={[styles.likeButton, animatedStyles]}
                                >
                                  <Ionicons
                                    name={liked ? "heart" : "heart-outline"}
                                    size={24}
                                    color="red"
                                  />
                                </Animated.View>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity> */}
                          <View style={styles.containe}>
                            <TouchableOpacity onPress={handlePress}>
                              <Animated.View
                                style={[styles.likeButton, animatedStyles]}
                              >
                                <Ionicons
                                  name={liked ? "heart" : "heart-outline"}
                                  size={24}
                                  color="#870000"
                                />
                              </Animated.View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <Text
                        style={{
                          width: 160,
                          fontWeight: "400",
                          color: "#424656",
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {dataForDetail.name}
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
                          ₹ {dataForDetail.price}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "grey",
                            textDecorationLine: "line-through",
                            marginLeft: 6,
                          }}
                        >
                          ₹ {dataForDetail.mrp}
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
                        <Text style={{ color: "#686b78" }}>8,477 sold</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                padding: 10,

                borderTopWidth: 1,
                borderTopColor: "rgba(0,0,0,0.1)",
              }}
            >
              <TouchableOpacity
                style={{
                  width: screenWidth / 2.1,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRightColor: "rgba(0,0,0,0.1)",
                  borderRightWidth: 1,
                }}
                onPress={() => openBottomSheet(false)}
              >
                <MaterialCommunityIcons name="sort" size={22} color="grey" />
                <Text
                  style={{
                    fontWeight: "600",
                    color: "grey",
                    marginLeft: 2,
                    fontSize: 17,
                  }}
                >
                  SORT
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: screenWidth / 2,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => openBottomSheet(true)}
              >
                <AntDesign name="filter" size={22} color="grey" />
                <Text
                  style={{ fontWeight: "600", color: "grey", fontSize: 17 }}
                  // onPress={() =>
                  //   navigation.navigate("Filter", { catID: Number(Category_id) })
                  // }
                >
                  FILTER
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <RBSheet
            ref={bottomSheetRefForFilter}
            height={600}
            dragFromTopOnly={true}
            closeOnDragDown={true}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0,0,0,0.6)",
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <FilterPage
              categoryId={Category_id}
              closeBottomSheet={closeBottomSheet}
              brand_id={brand_id}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </RBSheet>

          <RBSheet
            ref={bottomSheetRefForSort}
            height={250}
            dragFromTopOnly={true}
            closeOnDragDown={true}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0,0,0,0.6)",
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <SortPage
              navigation={navigation}
              closeBottomSheet={closeBottomSheet}
            />
          </RBSheet>
        </>
      )}
    </View>
  );
}

export default ProductPage;
