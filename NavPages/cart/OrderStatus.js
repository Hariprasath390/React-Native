import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EvilIcons, Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderStatus = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ margin: 10 }}>
            <Text
              style={{ textAlign: "left", fontSize: 16, fontWeight: "600" }}
            >
              ORDER TRACKING
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: "600",
                color: "grey",
              }}
            >
              #5464545454
            </Text>
          </View>
          {/* <View style={{ margin: 10 }}>
            <Text
              style={{ textAlign: "right", fontSize: 18, fontWeight: "600" }}
            >
              Date
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: "600",
                color: "grey",
              }}
            >
              23/34/2323
            </Text>
          </View> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                width: 40,
                height: 40,

                borderRadius: 50,
              }}
            ></Text>

            <Feather
              name="check"
              size={25}
              color="white"
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "#003560",
                padding: 8,
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          </View>
          <Text style={{ fontWeight: "900", color: "lightgrey" }}>----</Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            ></Text>

            <EvilIcons
              name="calendar"
              size={30}
              color="white"
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: 50,
                elevation: 3,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "lightgrey",
                padding: 8,
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          </View>
          <Text style={{ fontWeight: "900", color: "lightgrey" }}>----</Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                width: 40,
                height: 40,

                borderRadius: 50,
              }}
            ></Text>
            <MaterialCommunityIcons
              name="truck-outline"
              size={25}
              color="white"
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: 50,

                elevation: 3,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "lightgrey",
                padding: 8,
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          </View>
          <Text style={{ fontWeight: "900", color: "lightgrey" }}>----</Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                width: 40,
                height: 40,

                borderRadius: 50,
              }}
            ></Text>

            <Fontisto
              name="motorcycle"
              size={25}
              color="white"
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: 50,

                elevation: 3,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "lightgrey",
                padding: 8,
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          </View>
          <Text style={{ fontWeight: "900", color: "lightgrey" }}>----</Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            ></Text>

            <Ionicons
              name="home"
              size={22}
              color="white"
              style={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: 50,

                elevation: 3,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                backgroundColor: "lightgrey",
                padding: 8,
                justifyContent: "center",
                textAlign: "center",
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alighnItems: "center",
            paddingTop: 50,
          }}
        >
          <Image
            source={require("../../images/orderplaced.jpg")}
            style={{ width: 150, height: 150 }}
          />
        </View>
        <Text style={{ textAlign: "center", fontWeight: "600", color: "grey" }}>
          Your order has been placed successfully
        </Text>
        <Text style={{ textAlign: "center", fontWeight: "600", color: "grey" }}>
          Ordered Date : 23/12/2023
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            paddingTop: 100,
            color: "grey",
          }}
        >
          Estimated time : 6days
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              padding: 15,

              width: ScreenWidth - 10,
              backgroundColor: "rgb(0,53,96)",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",

                color: "white",
                borderRadius: 5,

                flexGrow: 1,
              }}
            >
              ORDER DETAILS
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OrderStatus;
