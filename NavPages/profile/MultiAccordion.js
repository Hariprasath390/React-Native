import { AntDesign } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MultiAccordion = ({ items }) => {
  const rotateValue = useRef(items.map(() => new Animated.Value(0))).current;
  const [isRotated, setIsRotated] = useState({});

  const handlePress = (index) => {
    const toValue = isRotated[index] ? 0 : 180;

    Animated.timing(rotateValue[index], {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsRotated((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (index) => {
    let newExpandedItems = [...expandedItems];
    if (expandedItems.includes(index)) {
      newExpandedItems = newExpandedItems.filter((item) => item !== index);
    } else {
      newExpandedItems.push(index);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fbfaf5" }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginVertical: 10,
          color: "#013660",
        }}
      >
        Frequently Asked Questions
      </Text>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            margin: 10,
            backgroundColor: "rgba(0,0,0,0.04)",
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleItem(index), handlePress(index);
            }}
            style={{ flexDirection: "row", width: screenWidth }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#2f597a",
                width: screenWidth / 1.2,
              }}
            >
              {item.title}
            </Text>

            <TouchableOpacity
              onPress={() => {
                toggleItem(index), handlePress(index);
              }}
            >
              <View>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: rotateValue[index].interpolate({
                          inputRange: [0, 180],
                          outputRange: ["0deg", "180deg"],
                        }),
                      },
                    ],
                  }}
                >
                  <AntDesign name="plus" size={24} color="#1d4b71" />
                </Animated.View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          {expandedItems.includes(index) && (
            <Animated.View
              style={{
                height: item.contentHeight,
                marginVertical: 10,
                padding: 2,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "#1d4b71",
                  width: screenWidth / 1.2,
                }}
              >
                {item.content}
              </Text>
            </Animated.View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default MultiAccordion;

const styles = StyleSheet.create({
  stylee: {
    fontWeight: "bold",
  },
});
