import React, { useEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Image2 from "react-native-scalable-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "../NavPages/component/CheckBox";

import {
  Button,
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampainImages,
  getCategory,
  getProductOffers,
} from "../reducers/homepageReducer";
import {
  getProductItemByProductId,
  getProductItemImages,
  getProductItems,
  getProducts,
  getProductsById,
  getRelatedProducts,
} from "../reducers/productReducer";
import { getBrand, getColor, getSize } from "../reducers/FilterReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Campaighn from "../Campaighn";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,

    borderRadius: 150 / 2,
    backgroundColor: "lightblue",
    marginLeft: 2,
    marginTop: 2,
  },
  qu: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 18,
    width: 100,
    justifyContent: "space-evenly",

    fontSize: 17,
    padding: 8,
  },
  button: {
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 18,
    width: width - 130,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },

  image: { width: 60, height: 60 },
  catimg: {
    borderColor: " rgba(0,0,0,0.4)",
    borderWidth: 1,
    borderRadius: 100,

    padding: 3,
    backgroundColor: " rgba(50,100,0,0.1)",
  },
  catname: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 5,
  },

  cat: {
    margin: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const styles2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: { width, height: 500, justifyContent: "center" },
  text: { fontSize: 100, textAlign: "center" },
});

function HomePage({ navigation }) {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.Home);
  const { campaignImage } = useSelector((state) => state.Home);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
    dispatch(getCampainImages());
    dispatch(getProducts());
    dispatch(getProductItems());
    dispatch(getProductOffers());
    dispatch(getColor());
    dispatch(getSize());
  }, []);

  function groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array?.length; i++) {
      if (!hash[array[i][property]]) hash[array[i][property]] = [];
      hash[array[i][property]].push(array[i]);
    }
    return hash;
  }

  const slideMobile = campaignImage?.filter(
    (desktop) => desktop.img_position === "mobileSliderImages"
  );

  const BodyImages = Object.values(
    groupBy(
      campaignImage
        ?.filter((desktop) => desktop.img_position === "mobileBodyImages")
        .sort((a, b) => a.img_index - b.img_index),
      "campaign"
    )
  );

  const { Products } = useSelector((state) => state.ProductList);

  const { ProductItemImages } = useSelector((state) => state.ProductList);

  const ToProductList = (Item) => {
    navigation.navigate("ProductPage", { Category_id: Item.id });
  };

  const NavigateFromCampaignImage = async (brandOffer, productOffer) => {
    if (brandOffer === null) {
      const categoryId = Products.filter(
        (pro) => pro.id === productOffer.product
      )[0];

      dispatch(getProductItemImages(productOffer.product));
      dispatch(getProductItemByProductId(productOffer.product));
      dispatch(
        getProductsById({
          categoryId: categoryId.category,
        })
      );
      dispatch(
        getRelatedProducts({
          CatId: categoryId.category,
          ProductId: productOffer.product,
        })
      );

      navigation.navigate("Details", { colorId: ProductItemImages[0].color });
    } else if (productOffer === null) {
      if (brandOffer.category !== null) {
        navigation.navigate("ProductPage", {
          Category_id: brandOffer?.category,
        });
      } else {
        navigation.navigate("ProductPage", { brand_id: brandOffer?.brand });
      }
    } else {
      Alert.alert("no Offer available");
    }
  };

  return (
    <View>
      <ScrollView>
        <FlatList
          data={category}
          style={{
            flexDirection: "row",
            height: 105,
            backgroundColor: "white",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cat}
              onPress={() => ToProductList(item)}
            >
              <View style={styles.catimg}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View>
                <Text style={{ fontSize: 10, color: "rgb(0,53,96)" }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
        {/* <View style={{ position: "relative" }}>
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
            paginationStyle={{
              paddingTop: 14,
            }}
            data={slideMobile}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  NavigateFromCampaignImage(
                    item.brand_offer,
                    item.product_offer
                  )
                }
              >
                <Image2
                  width={Dimensions.get("window").width}
                  source={
                    item.image
                      ? { uri: item.image }
                      : require("../images/myunde.png")
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>  */}
        {/* <ScrollView>
          <ScrollView style={{ flex: 1 }}>
            {BodyImages.map((image, i) => {
              if (image.length === 1) {
                return (
                  <View key={i} style={{ flexDirection: "row" }}>
                    {image.map((img, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            NavigateFromCampaignImage(
                              img.brand_offer,
                              img.product_offer
                            )
                          }
                        >
                          <View style={{ flex: 1 }} key={i}>
                            <Image2
                              width={Dimensions.get("window").width} // height will be calculated automatically
                              source={
                                img.image
                                  ? { uri: img.image }
                                  : require("../images/myunde.png")
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              } else if (image.length === 2) {
                return (
                  <View style={{ flexDirection: "row" }} key={i}>
                    {image.map((img, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            NavigateFromCampaignImage(
                              img.brand_offer,
                              img.product_offer
                            )
                          }
                        >
                          <View
                            style={{ flex: 1, alignItems: "center" }}
                            key={i}
                          >
                            <Image2
                              width={Dimensions.get("window").width / 2} // height will be calculated automatically
                              source={
                                img.image
                                  ? { uri: img.image }
                                  : require("../images/myunde.png")
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              } else if (image.length === 3) {
                return (
                  <View key={i} style={{ flexDirection: "row" }}>
                    {image.map((img, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            NavigateFromCampaignImage(
                              img.brand_offer,
                              img.product_offer
                            )
                          }
                        >
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              position: "relative",
                            }}
                            key={i}
                          >
                            <Image2
                              width={Dimensions.get("window").width / 3} // height will be calculated automatically
                              source={
                                img.image
                                  ? { uri: img.image }
                                  : require("../images/myunde.png")
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              } else if (image.length === 4) {
                return (
                  <View style={{ flexDirection: "row" }} key={i}>
                    {image.map((img, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            NavigateFromCampaignImage(
                              img.brand_offer,
                              img.product_offer
                            )
                          }
                        >
                          <View
                            style={{ flex: 1, alignItems: "center" }}
                            key={i}
                          >
                            <Image2
                              width={Dimensions.get("window").width / 4} // height will be calculated automatically
                              source={
                                img.image
                                  ? { uri: img.image }
                                  : require("../images/myunde.png")
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              }
            })}
          </ScrollView>
        </ScrollView> */}
      </ScrollView>
    </View>
  );
}

export default HomePage;
