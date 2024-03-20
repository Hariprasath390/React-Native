import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BottomDrawer from "react-native-bottom-drawer-view";
// import LottieView from "lottie-react-native";

import {
  View,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const width = Dimensions.get("window").width - 130;
let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(243,243,243)",
  },
  image: {
    width: screenWidth / 2.04,
    height: screenWidth / 1.5,
    margin: 1,
    alignItems: "center",

    flex: 1,
    position: "relative",
  },
  idiv: {
    flex: 2,
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 1,
  },
  Productcard: { overflow: "hidden", backgroundColor: "rgba(0,0,0,0.1)" },
  details: {
    backgroundColor: "white",
    borderRightColor: "rgba(0,0,0,0.1)",
    borderRightWidth: 1,

    borderLeftWidth: 1,
    borderLeftColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgb(248,249,249)",

    padding: 6,
  },
  drawerButtom: {
    borderRadius: "40px",
  },
});

function Spage({ route: { params }, navigation }) {
  const { CatItem, items, search } = params;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [color, setcolor] = useState([]);

  const fetchData = async () => {
    const resp = await fetch("http://myunde.com/base/api/product-depth");
    const data = await resp.json();

    // console.log(data);
    // const newData = data.slice(1, 10).map((v) => ({ ...v, count: 1 }))
    if (items) {
      const filteredData = data.filter((val) => val.brand.id === items.id);
      setData(filteredData);
    } else {
      const filteredData = data.filter((val) => val.category.id === CatItem.id);
      setData(filteredData);
    }

    setLoading(false);

    // setcolor(filteredColor);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colorID = data.map((val) => val?.product_item[0]?.color?.id);

  // const animation = useRef(new Animated.Value(0));

  // useEffect(() => {
  //   Animated.timing(animation.current, {
  //     toValue: 1,
  //     duration: 20000,
  //     start: 19,

  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start();
  // }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <ActivityIndicator size={50} color={"black"} />
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.idiv}>
              {data.map((item, i) => {
                return (
                  <Pressable
                    style={styles.Productcard}
                    key={i}
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.id,
                        colorId: colorID[i],
                      })
                    }
                  >
                    <View>
                      <Image
                        style={styles.image}
                        source={{ uri: item?.product_item[0]?.image }}
                        alt="img"
                      />
                      {/* <View
                      style={{
                        position: "absolute",
                        width: 30,
                        height: 30,
                        borderRadius: 100 / 2,

                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                     

                      <Icon
                        size={20}
                        color="#003560"
                        name="heart-o"
                      
                      ></Icon>
                    </View> */}
                    </View>
                    <View style={styles.details}>
                      <View>
                        <Text style={{ fontWeight: "900", color: "grey" }}>
                          {item.brand.name}
                        </Text>
                      </View>
                      <Text
                        style={{
                          width: 160,
                          fontWeight: "400",
                          color: "#424656",
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",

                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "900",
                            color: "#121212",
                          }}
                        >
                          ₹{item.price}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "grey",
                            textDecorationLine: "line-through",
                            marginLeft: 6,
                          }}
                        >
                          ₹{item.mrp}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",

                          alignItems: "center",
                        }}
                      >
                        <Icon
                          size={20}
                          color={"rgb(255,182,0)"}
                          name="star-half-full"
                        ></Icon>
                        <Text style={{ color: "#686b78" }}> 4.6 </Text>
                        <Text style={{ color: "#686b78" }}> | </Text>
                        <Text style={{ color: "#686b78" }}> 8,477 sold </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
          {/* 
          730640 */}
          {/* <BottomDrawer
            containerHeight={799}
            startUp={false}
            downDisplay={660}
            shadow={true}
            roundedEdges={true}
            panResponder={false}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                height: 50,
                borderTopWidth: 1,
                borderTopColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Pressable
                style={{
                  width: screenWidth / 2.1,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRightColor: "rgba(0,0,0,0.1)",
                  borderRightWidth: 1,
                }}
              >
                <MaterialCommunityIcons name="sort" size={18} color="grey" />
                <Text
                  style={{ fontWeight: "600", color: "grey", marginLeft: 2 }}
                >
                  SORT
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: screenWidth / 2,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="filter" size={18} color="grey" />
                <Text style={{ fontWeight: "600", color: "grey" }}>FILTER</Text>
              </Pressable>
            </View>
          </BottomDrawer> */}
        </>
      )}
    </View>
  );
}

export default Spage;
