import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function SortPage({ navigation, closeBottomSheet }) {
  const [selected, setSelected] = useState(-1);

  const handlePress = (index) => {
    setSelected(index === selected ? -1 : index);
  };

  const ApplySort = () => {
    if (selected === 0) {
      closeBottomSheet(false, "ascending");
    } else if (selected === 1) {
      closeBottomSheet(false, "descending");
    }
  };

  const resetSort = () => {
    closeBottomSheet(false, undefined);
  };

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
      <View>
        <TouchableOpacity onPress={() => handlePress(0)}>
          <View style={{ padding: 12 }}>
            <Text
              style={{
                backgroundColor: selected === 0 ? "rgb(0,53,96)" : "white",
                color: selected === 0 ? "white" : "rgb(0,53,96)",
                borderColor: "black",
                borderWidth: 1,
                padding: 10,
                textAlign: "center",
                borderRadius: 8,
                fontWeight: "900",
              }}
            >
              Price low to high
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(1)}>
          <View style={{ padding: 12 }}>
            <Text
              style={{
                backgroundColor: selected === 1 ? "rgb(0,53,96)" : "white",
                color: selected === 1 ? "white" : "rgb(0,53,96)",
                borderColor: "black",
                borderWidth: 1,
                padding: 10,
                textAlign: "center",
                borderRadius: 8,
                fontWeight: "900",
              }}
            >
              Price high to low
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", bottom: 0 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignSelf: "center",
            padding: 18,
            width: screenWidth,
            backgroundColor: "#f9f9f9",
            borderColor: "rgb(0,53,96)",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderColor: "rgb(0,53,96)",
              borderWidth: 1,
              width: screenWidth / 2.3,
              padding: 12,
              borderRadius: 20,
            }}
            onPress={resetSort}
          >
            <Text
              style={{
                fontWeight: "600",
                color: "rgb(0,53,96)",
                marginLeft: 2,
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(0,53,96)",
              borderColor: "rgb(0,53,96)",
              borderWidth: 1,
              width: screenWidth / 2.3,
              padding: 12,
              borderRadius: 20,
            }}
            onPress={ApplySort}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default SortPage;
