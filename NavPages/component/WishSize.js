import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";


let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const size = ["S", "L", "M", "XL", "XXL"];

const WishSize = () => {
  const { filter } = useSelector((state) => state.FilterList);

  return (
    <>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
          select size :
        </Text>

        {/* {ForSize.map((size, i) => {
          if (sizeIds.includes(size.id)) {
            return;
          } else {
            sizeIds.push(size.id);

            const outOfStock = !productSize.includes(size.id);

            return (
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
            );
          }
        })} */}
      </View>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            padding: 18,
            width: screenWidth,
            backgroundColor: "#f9f9f9",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(0,53,96)",
              borderColor: "rgb(0,53,96)",
              borderWidth: 1,
              width: screenWidth - 20,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default WishSize;
