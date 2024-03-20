// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";

const SearchBar = ({ navigation }) => {
  // const [value, setValue] = useState([]);
  // const [textValue, setTextValue] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [masterDataSource, setMasterDataSource] = useState([]);

  //   https://jsonplaceholder.typicode.com/posts

  const fetchData = async () => {
    console.log(search, "77777777777777777");
    const resp = await fetch(
      `https://myunde.com/api/products/?keyword=${search}`
    );
    const data = await resp.json();

    console.log(data, "909090999999999990");

    setData(data);
  };

  useEffect(() => {
    fetch("https://myunde.com/base/api/categories")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(
          responseJson.filter((value) => value.name.includes(search))
        );
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchData();
  }, [search]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // const ItemView = ({ item }) => {
  //   return (
  //     // Flat List Item
  //     <Text
  //       style={styles.itemStyle}
  //       onPress={() => {
  //         setSearch(item),
  //           navigation.navigate("ProductPage", { CatItem: item });
  //       }}
  //     >
  //       {item.name.toUpperCase()}
  //     </Text>
  //   );
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search for brands and products"
          // returnKeyType={search}
          keyboardType="default"
          returnKeyType="done"
          onSubmitEditing={() =>
            navigation.navigate("ProductPage", {
              Category_id: data?.products[0]?.category.id,
            })
          }
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 0.3,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("ProductPage", { Category_id: item.id })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>
                  <EvilIcons name="search" size={24} color="black" />
                </Text>
                <Text style={{ marginLeft: 10 }}> {item.name}</Text>
              </View>
              <Feather name="arrow-up-left" size={24} color="black" />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
    paddingLeft: 25,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "grey",
    backgroundColor: "#FFFFFF",
  },
});

export default SearchBar;
