import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ProfilePage = ({ navigation, GoogleSignOut, user2 }) => {
  // console.log(user2, "++++++++++++++++++++++++>>>>>>>>>>>>>>>>>>");
  const [user, setUser] = useState(null);

  // console.log(user, "||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((storedUser) => {
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // "user" item not found
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("user2")
      .then((storedUser) => {
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // "user" item not found
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("user");
    GoogleSignOut();
    navigation.navigate("Home");
  };

  return (
    <>
      <ScrollView style={{}}>
        <LinearGradient
          colors={["#3572a4", "#1c4b71", "rgb(0,53,96)"]}
          style={{
            justifyContent: "space-evenly",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            overflow: "hidden",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            margin: 10,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EvilIcons name="user" size={80} color={"white"} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 20,

                  color: "white",
                }}
              >
                {user ? user?._tokenResponse?.displayName : user2?.displayName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "600",
                  color: "white",
                  marginVertical: 3,
                }}
              >
                {user ? user?._tokenResponse?.email : user2?.email}
              </Text>
              <Text
                style={{
                  fontWeight: "600",

                  color: "white",
                }}
              >
                {user ? user.phoneNumber : user2?.phoneNumber}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EvilIcons name="pencil" size={24} color="#192f6a" />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={{}}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              padding: 12,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("EditAddress")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "rgb(0,53,96)",
                    marginBottom: 10,
                  }}
                >
                  ADDRESS
                </Text>
                <View
                  style={{
                    backgroundColor: "rgba(0,53,96,0.8)",
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EvilIcons name="pencil" size={24} color="white" />
                </View>
              </View>
              <View>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      textTransform: "uppercase",
                      fontSize: 12,
                      marginVertical: 3,
                    }}
                  >
                    12 ,
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      textTransform: "uppercase",
                      fontSize: 12,
                      marginVertical: 3,
                    }}
                  >
                    sjfg asdghfk sahdf kjasdh fkjh,
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      textTransform: "uppercase",
                      fontSize: 12,
                      marginVertical: 3,
                    }}
                  >
                    sdfasf , saghsdfasd ,
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      textTransform: "uppercase",
                      fontSize: 12,
                      marginVertical: 3,
                    }}
                  >
                    342544 .
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              padding: 5,
              margin: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("MyOrders")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="inbox" size={24} color="rgba(0,53,96,0.8)" />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    My orders
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("TrackOrder")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EvilIcons
                    name="location"
                    size={34}
                    color="rgba(0,53,96,0.8)"
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    Track order
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Aboutus")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 20,
                      resizeMode: "stretch",
                    }}
                    source={require("../images/LOG.png")}
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    About us
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("DeleteAccount")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EvilIcons name="trash" size={30} color="rgba(0,53,96,0.8)" />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    Delete account
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("TermsAndConditions")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="ios-documents-outline"
                    size={24}
                    color="rgba(0,53,96,0.8)"
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    Terms & Conditions
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="policy"
                    size={24}
                    color="rgba(0,53,96,0.8)"
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    Privacy policy
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("ShippingCancellation")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="credit-card-refund-outline"
                    size={24}
                    color="rgba(0,53,96,0.8)"
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    Cancel & Refund policy
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Delivery")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color="rgba(0,53,96,0.8)"
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    Delivery
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("FAQ")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    margin: 10,
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name="question"
                    size={24}
                    color="rgba(0,53,96,0.8)"
                  />
                </View>

                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 18,
                      color: "rgb(0,53,96)",
                    }}
                  >
                    FAQs
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <EvilIcons name="chevron-right" size={35} color="black" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "rgb(0, 53, 96)",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "rgb(0, 53, 96)",
            padding: 10,
            marginHorizontal: 20,
            alignItems: "center",
            width: screenWidth - 38,
          }}
          onPress={() => handleLogOut()}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Ionicons name="exit-outline" size={24} color="white" />

            <View style={{}}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  marginLeft: 5,
                  color: "white",
                }}
              >
                Log out
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({});
