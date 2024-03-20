import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";
const CardWidth = Dimensions.get("window").width - 150;

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TrackOrder = ({ navigation }) => {
  return (
    <>
      <View style={{ backgroundColor: "white", paddingBottom: 5, flex: 1 }}>
        <View>
          <TextInput
            style={{
              height: 50,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              borderColor: "#c9cacf",
              margin: 10,
              backgroundColor: "white",
              marginVertical: 20,
            }}
            placeholder="Enter your order id*"
          />
          <TouchableOpacity
            style={{
              borderRadius: 5,
              borderColor: "#c9cacf",
              margin: 10,
              backgroundColor: "rgb(0,53,96)",
              marginVertical: 5,
              padding: 12,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Track with order id
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ padding: 5 }}>
          <View>
            <Text style={{ padding: 12, fontWeight: "bold", fontSize: 18 }}>
              Order Detail :
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
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
              padding: 8,
              margin: 10,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 130,
                  marginRight: 4,

                  alignItems: "center",

                  borderRadius: 10,
                }}
                source={require("../../images/01.jpg")}
                alt="img"
              />
            </View>

            <View style={{ width: CardWidth }}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "500" }}>ORDER ID : #894658965</Text>
              </View>

              <Text style={{ marginVertical: 2, fontWeight: "500" }}>
                ORDER DATE : 03/12/2023
              </Text>
              <View>
                <Text style={{ marginVertical: 2, fontWeight: "500" }}>
                  ORDER ITEMS : 1
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "500", marginVertical: 2 }}>
                  TOTAL PRICE : ₹677
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  borderRadius: 5,
                  backgroundColor: "rgb(0,53,96)",
                }}
                onPress={() => navigation.navigate("OrderStatus")}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Track this order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* {trackOrder ? (
        <View>
          <TextInput
            placeholder="Input 1"
            value={input1}
            onChangeText={handleInput1Change}
          />
          <TextInput
            placeholder="Input 2"
            value={input2}
            onChangeText={handleInput2Change}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: screenWidth,
            height: screenHeight - 100,
          }}
        >
          <Image
            source={require("../../images/Track.webp")}
            style={{
              resizeMode: "contain",
              width: screenWidth,
              height: screenHeight,
            }}
          />
        </View>
      )} */}
    </>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({});
