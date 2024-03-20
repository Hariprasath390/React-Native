import React, { useEffect, useState } from "react";
import { Pressable, View, Image } from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Headericon({ navigation }) {
  
  const [cart, setCart] = useState([]);

  const getData = async () => {
    await AsyncStorage.getItem("CartItems")
      .then((value) => {
        if (value) {
          setCart(JSON.parse(value));
        }
      })

      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, [cart]);

  return (
    <View
      style={{
        marginRight: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 140,
      }}
    >
      <Pressable onPress={() => navigation.navigate("SearchBar")}>
        <EvilIcons name="search" size={30} color="black" />
      </Pressable>
      <EvilIcons
        name="heart"
        size={30}
        color="black"
        onPress={() => navigation.navigate("Wishlist")}
      />
      <Pressable onPress={() => navigation.navigate("Cart")}>
        <Badge
          status="success"
          value={cart?.length}
          containerStyle={{
            position: "absolute",
            top: -4,
            right: -4,
            zIndex: 1,
          }}
        />

        <EvilIcons name="cart" size={30} color="black" />
      </Pressable>
    </View>
  );
}

export default Headericon;
