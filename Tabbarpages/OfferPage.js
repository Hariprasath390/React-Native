import React from "react";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductItemByProductId,
  getProductItemImages,
  getProductsById,
  getRelatedProducts,
} from "../reducers/productReducer";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: screenWidth / 2.04,
    height: screenWidth / 1.8,
    margin: 1,
    alignItems: "center",
    flex: 1,
    position: "relative",
    resizeMode: "cover",
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
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  details: {
    backgroundColor: "white",
    borderRightColor: "rgba(0,0,0,0.1)",
    borderRightWidth: 1,

    borderLeftWidth: 1,
    borderLeftColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgb(248,249,249)",

    padding: 6,
  },
  drawerButtom: {
    borderRadius: "40px",
  },
});

const Offer = ({ navigation }) => {
  const { productOffers } = useSelector((state) => state.Home);

  const { brand } = useSelector((state) => state.FilterList);

  const { Products, ProductItems } = useSelector((state) => state.ProductList);

  const filteredData = Products.filter((product) => {
    const matchingOffer = productOffers.find(
      (offer) => offer.product === product.id
    );
    return matchingOffer !== undefined;
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.idiv}>
          {filteredData?.map((item, i) => {
            const ForImage = ProductItems.filter(
              (items) => items.product === item.id
            )[0];

            const brandName = brand?.filter(
              (brands) => brands?.id === item?.brand
            )[0];

            return (
              <TouchableOpacity
                style={styles.Productcard}
                key={i}
                onPress={() => {
                  dispatch(
                    getRelatedProducts({
                      CatId: item.category,
                      ProductId: item.id,
                    })
                  );
                  dispatch(getProductItemImages(item.id));
                  dispatch(
                    getProductsById({
                      categoryId: item.category,
                    })
                  );
                  dispatch(getProductItemByProductId(item.id));
                  navigation.navigate("Details", {
                    colorId: ForImage.color,
                  });
                }}
              >
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
                      {productOffers[0]?.offer.value}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: ForImage?.image }}
                    alt="img"
                  />
                </View>
                <View style={styles.details}>
                  <View>
                    <Text style={{ fontWeight: "900", color: "grey" }}>
                      {brandName.name}
                    </Text>
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
                    {item.name}
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
                      ₹{item.price}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        color: "grey",
                        textDecorationLine: "line-through",
                        marginLeft: 6,
                      }}
                    >
                      ₹{item.mrp}
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
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Offer;
