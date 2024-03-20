import { Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Offer from "./Tabbarpages/OfferPage";
import Categories from "./Tabbarpages/Categories";
import Headericon from "./NavPages/component/Headericon";
import HomePage from "./Tabbarpages/HomePage";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import Google from "./NavPages/component/Google";

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 120,
        height: 40,
        overflow: "hidden",
      }}
    >
      <Image
        style={{ width: 120, height: 70, marginLeft: 8, resizeMode: "stretch" }}
        source={require("./images/logo.png")}
      />
    </View>
  );
}

function TabBar({ navigation }) {
  const ProfileComponent = (props) => <Google {...props} />;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "rgb(0,53,96)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={({ navigation }) => ({
          headerTitle: "",
          tabBarLabel: ({ color, size }) =>
            color === "rgb(0,53,96)" ? (
              <View>
                <Text style={{ fontSize: 10, color: "rgb(0,53,96)" }}>
                  Myunde
                </Text>
              </View>
            ) : (
              ""
            ),

          headerStyle: {
            backgroundColor: "white",
          },

          tabBarIcon: ({ color, size }) =>
            color === "rgb(0,53,96)" ? (
              <Image
                style={{
                  width: 27,
                  height: 20,
                  resizeMode: "stretch",
                }}
                source={require("./images/LOG.png")}
              />
            ) : (
              <Image
                style={{
                  width: 50,
                  height: 50,

                  resizeMode: "stretch",
                  tintColor: color,
                }}
                source={require("./images/Myu.png")}
              />
            ),

          headerLeft: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Headericon navigation={navigation} hideSearch={true} />
          ),
        })}
      />
      <Tab.Screen
        name="Cαтeɢвrαɴds"
        component={Categories}
        options={{
          tabBarLabel: ({ color, size }) =>
            color === "rgb(0,53,96)" ? (
              <View>
                <Text style={{ fontSize: 10, color: "rgb(0,53,96)" }}>
                  Cαтeɢorιeѕ
                </Text>
              </View>
            ) : (
              ""
            ),

          headerRight: () => (
            <Headericon navigation={navigation} hideSearch={false} />
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Offer Products"
        component={Offer}
        options={{
          tabBarLabel: ({ color, size }) =>
            color === "rgb(0,53,96)" ? (
              <View>
                <Text style={{ fontSize: 10, color: "rgb(0,53,96)" }}>
                  Offer
                </Text>
              </View>
            ) : (
              ""
            ),
          headerTitle: "Oғғer Pαɢe",

          headerRight: () => (
            <Headericon navigation={navigation} hideSearch={false} />
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="tagso" size={size + 2} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Proғιle"
        component={ProfileComponent}
        options={({ navigation }) => ({
          tabBarLabel: ({ color, size }) =>
            color === "rgb(0,53,96)" ? (
              <View>
                <Text style={{ fontSize: 10, color: "rgb(0,53,96)" }}>
                  Profile
                </Text>
              </View>
            ) : (
              ""
            ),
          headerTitle: "",
          headerLeft: () => (
            <View>
              <Text style={{ fontSize: 20, marginLeft: 10 }}>My Proғιle</Text>
            </View>
          ),
          headerRight: () => (
            <Headericon navigation={navigation} hideSearch={false} />
          ),
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="user" size={size + 12} color={color} />
          ),
        })}
      />
      {/* ) : (
        <Tab.Screen
          name="Login"
          component={LoginPage}
          options={{
            tabBarLabel: ({ color, size }) =>
              color === "rgb(0,53,96)" ? (
                <View>
                  <Text style={{ fontSize: 10, color: "rgb(0,53,96)" }}>
                    Login
                  </Text>
                </View>
              ) : (
                ""
              ),
            headerTitle: "",
            headerLeft: () => (
              <View>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>LOGIN</Text>
              </View>
            ),
            headerRight: () => (
              <Headericon navigation={navigation} hideSearch={false} />
            ),
            tabBarIcon: ({ color, size }) => (
              <EvilIcons name="user" size={size + 12} color={color} />
            ),
          }}
        />
      )} */}
    </Tab.Navigator>
  );
}

export default TabBar;
