import React, { useState, useEffect } from "react";

import { View, Text, TextInput } from "react-native";

const Screen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [color, setcolor] = useState([]);
  const [textValue, setTextValue] = useState([]);
  console.log(textValue, "7777777777777");

  const fetchData = async () => {
    const resp = await fetch(
      `https://myunde.com/api/products/?keyword=${textValue}`
    );
    const data = await resp.json();

    console.log(data, "909090999999999990");
    // const newData = data.slice(1, 10).map((v) => ({ ...v, count: 1 }))

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [textValue]);

  return (
    <View>
      <TextInput
        style={{ width: 250, height: 40 }}
        placeholder="search for brands and products"
        keyboardType="default"
        onChangeText={(text) => setTextValue(text)}
      ></TextInput>
    </View>
  );
};

export default Screen;
