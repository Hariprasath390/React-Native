import {
  Text,
  Platform,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import { onGoogleButtonPress } from "../NavPages/component/Google";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const LoginPage = ({ navigation, GoogleLogin }) => {
  return (
    <View style={{}}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{
          borderBottomLeftRadius: 90,
          width: screenWidth,
          height: screenHeight / 2.5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EvilIcons name="user" size={100} color={"white"} />
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              width: 250,
            }}
          >
            Login to become a part of MYUNDE
          </Text>
        </View>
      </LinearGradient>
      <View style={{ padding: 20, paddingHorizontal: 40 }}>
        <View style={{ height: 50, marginVertical: 20 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              backgroundColor: "white",
            }}
            onPress={() => {
              GoogleLogin();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 35, height: 35 }}
                source={require("../images/google.png")}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "400",
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                oogle Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 50, marginVertical: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OtpLogin");
            }}
            style={{
              flex: 1,
              borderRadius: 10,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="phone" size={25} color="rgba(0,0,0,0.7)" />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "400",
                  marginLeft: 4,
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                OTP login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {Platform.OS === "ios" && (
          <View style={{ height: 50, marginVertical: 20 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 10,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="logo-apple" size={25} color="black" />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: "400",
                    marginLeft: 4,
                    color: "rgba(0,0,0,0.7)",
                  }}
                >
                  Apple login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default LoginPage;
