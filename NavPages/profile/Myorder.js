import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

const CardWidth = Dimensions.get("window").width - 150;

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Myorder = ({ navigation }) => {
  const [order, setOrders] = useState(true);

  return (
    <View>
      {order ? (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            padding: 12,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 13,
              color: "rgb(0,53,96)",
            }}
          >
            ORDER DETAILS
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              flexDirection: "row",
              backgroundColor: "white",
              position: "relative",
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
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
                source={require("../../images/n8.png")}
                alt="img"
              />
            </View>
            <View style={{ width: CardWidth }}>
              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  Order ID : #47886889696
                </Text>
              </View>
              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  Order Date : 12-03-2023
                </Text>
              </View>

              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  Order Items : 1
                </Text>
              </View>

              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  Price : ₹565
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("OrderInfo")}
              >
                <Text
                  style={{
                    marginVertical: 5,
                    fontWeight: "500",
                    fontSize: 13,
                    textAlign: "center",
                    color: "grey",
                    backgroundColor: "white",
                    width: 235,
                    padding: 1,
                  }}
                >
                  ( View Order Details )
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: screenWidth,
            height: screenHeight,
          }}
        >
          <Image
            source={require("../../images/order.webp")}
            style={{
              resizeMode: "contain",
              width: screenWidth,
              height: screenHeight,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Myorder;

const styles = StyleSheet.create({});
