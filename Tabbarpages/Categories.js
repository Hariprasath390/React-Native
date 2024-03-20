import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useSelector } from "react-redux";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Categories = ({ navigation }) => {
  const { category } = useSelector((state) => state.Home);
  const { brand } = useSelector((state) => state.FilterList);

  const [tabState, setTabState] = useState({
    index: 0,
    routes: [
      { key: "first", title: "ᴄᴀᴛᴇɢᴏʀɪᴇs" },
      { key: "second", title: "ʙʀᴀɴᴅs" },
    ],
  });

  const renderScene = SceneMap({
    first: () => (
      <ScrollView>
        {category.map((item, i) => {
          return (
            <LinearGradient
              colors={["#ffffff", "#ffffff", "rgb(0,53,96)"]}
              style={{ flex: 1, margin: 10, borderRadius: 10 }}
              key={i}
            >
              <TouchableOpacity
                style={{
                  overflow: "hidden",
                }}
                key={i}
                onPress={() =>
                  navigation.navigate("ProductPage", {
                    Category_id: item.id,
                  })
                }
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    borderRadius: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.1)",
                  }}
                >
                  <Image
                    source={{ uri: item?.image }}
                    style={{
                      width: screenWidth / 2.5,
                      height: screenHeight / 5,
                    }}
                    alt="img"
                  />

                  <View>
                    <Text
                      style={{
                        marginRight: 10,
                        fontWeight: "700",
                        fontSize: 25,
                        color: "grey",
                        fontStyle: "italic",
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </ScrollView>
    ),
    second: () => (
      <ScrollView>
        {brand.map((items, i) => {
          return (
            <TouchableOpacity
              style={{
                margin: 10,
                borderRadius: 10,
                overflow: "hidden",
              }}
              key={i}
              onPress={() =>
                navigation.navigate("ProductPage", {
                  brand_id: items.id,
                })
              }
            >
              <Image
                source={{ uri: items?.image }}
                style={{ width: screenWidth, height: screenHeight / 5 }}
                alt="img"
              />
              <View>
                <Text
                  style={{
                    marginRight: 10,
                    fontWeight: "700",
                    fontSize: 25,
                    color: "rgb(0,53,96)",
                    fontStyle: "italic",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {items.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    ),
  });

  return (
    <TabView
      navigationState={tabState}
      renderScene={renderScene}
      onIndexChange={(index) => setTabState({ ...tabState, index })}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "white" }}
          indicatorStyle={{ backgroundColor: "rgb(0,53,96)" }}
          renderLabel={({ route, focused, color }) => (
            <Text
              style={{
                color: "rgb(0,53,96)",
                margin: 2,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};

export default Categories;
