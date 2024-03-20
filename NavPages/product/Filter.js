import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { borderWidth } from "styled-system";
import CheckBox from "../component/CheckBox";
import { Octicons } from "@expo/vector-icons";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Filter = ({ route: { params } }) => {
  const { catID } = params;

  const [state, setState] = React.useState({
    color: [],
    size: [],
    category: [],
    brand: [],
    style: [],
    fabric: [],
  });

  const update = ({ target: { checked, value, name } }) => {
    if (name === "color") {
      if (checked) {
        setState(({ color }) => ({ ...state, color: [...color, value] }));
      } else if (!checked) {
        setState(({ color }) => ({
          ...state,
          color: color.filter((e) => e !== value),
        }));
      }
    } else if (name === "size") {
      if (checked) {
        setState(({ size }) => ({ ...state, size: [...size, value] }));
      } else if (!checked) {
        setState(({ size }) => ({
          ...state,
          size: size.filter((e) => e !== value),
        }));
      }
    } else if (name === "category") {
      if (checked) {
        setState(({ category }) => ({
          ...state,
          category: [...category, value],
        }));
      } else if (!checked) {
        setState(({ category }) => ({
          ...state,
          category: category.filter((e) => e !== value),
        }));
      }
    } else if (name === "brand") {
      if (checked) {
        setState(({ brand }) => ({ ...state, brand: [...brand, value] }));
      } else if (!checked) {
        setState(({ brand }) => ({
          ...state,
          brand: brand.filter((e) => e !== value),
        }));
      }
    } else if (name === "style") {
      if (checked) {
        const styleValue = [];
        styles
          .filter((style) => style.name === value)
          .map((style) => {
            return styleValue.push(style.id);
          });
        setState(({ style }) => ({ ...state, style: [...style, styleValue] }));
      } else if (!checked) {
        const styleValuefilter = [];
        styles
          .filter((style) => style.name === value)
          .map((style) => {
            return styleValuefilter.push(style.id);
          });
        setState(({ style }) => ({
          ...state,
          style:
            Array.isArray(style) && style.length > 1
              ? style[0].filter((s) => !styleValuefilter.includes(s))
              : "",
        }));
      }
    } else if (name === "fabric") {
      if (checked) {
        setState(({ fabric }) => ({ ...state, fabric: [...fabric, value] }));
      } else if (!checked) {
        setState(({ fabric }) => ({
          ...state,
          fabric: fabric.filter((e) => e !== value),
        }));
      }
    }
  };
  const [data2, setData2] = useState([aa]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({
    size: true,
    color: false,
    Packof: false,
    fabric: false,
    style: false,
    brand: false,
    price: false,
  });

  console.log(catID, "0000000000000");

  const fetchData = async () => {
    const resp = await fetch(
      `https://myunde.com/base/api/filter?categoryId=${Number(catID)}`
    );
    const data = await resp.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [music, setMusic] = useState(false);

  console.log(data, "////////////////////////////////");

  const Size = data.size;
  const Style = data.style;
  const Fabric = data.fabric;
  const Packof = data.pack_of;
  const Brand = data.brand;
  const Color = data.color;

  //   const newArray = Packof.map((item) => ({ [item] : true}));

  const newArray = Packof?.map((item, index) => ({ [index]: item }));

  const [cat, setCat] = useState(3); //size
  const [bnd, setBnd] = useState(0); // color
  const [clr, setClr] = useState(3); // brand
  const [fab, setFab] = useState(0); // fabric
  const [pak, setPak] = useState(3); //pack
  const [stl, setStl] = useState(0); // style
  const [pri, setPri] = useState(0);

  const setColorCat = () => {
    setCat(3);
    setBnd(0);
    setClr(0);
    setFab(0);
    setPak(0);
    setStl(0);
    setPri(0);
    setStl(0);
  };

  const setColorBar = () => {
    setCat(0);
    setBnd(1);
    setClr(0);
    setFab(0);
    setPak(0);
    setStl(0);
    setPri(0);
  };

  const setColorBand = () => {
    setCat(0);
    setBnd(0);
    setClr(1);
    setFab(0);
    setPak(0);
    setStl(0);
    setPri(0);
    setStl(2);
  };
  const setColorFab = () => {
    setCat(0);
    setBnd(0);
    setClr(0);
    setFab(1);
    setPak(0);
    setStl(0);
    setPri(0);
  };
  const setColorpack = () => {
    setCat(0);
    setBnd(0);
    setClr(0);
    setFab(0);
    setPak(1);
    setStl(0);
    setPri(0);
  };

  const setColorstyle = () => {
    setCat(0);
    setBnd(0);
    setClr(0);
    setFab(0);
    setPak(0);
    setStl(1);
    setPri(0);
  };

  const setColorPrice = () => {
    setCat(0);
    setBnd(0);
    setClr(0);
    setFab(0);
    setPak(0);
    setStl(0);
    setPri(1);
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          width: screenWidth,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "white",
            width: screenWidth / 2,
            fontWeight: "700",
            fontSize: 17,
            color: "grey",
          }}
        >
          productv Filter is sn
        </Text>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 13,
            color: "#ff3e6c",
            backgroundColor: "white",

            textAlign: "right",
          }}
        >
          CLEAR ALL
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: screenWidth / 3,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              backgroundColor: cat == 3 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: true,
                color: false,
                Packof: false,
                fabric: false,
                style: false,
                brand: false,
                price: false,
              }),
                setColorCat();
            }}
          >
            Size
          </Text>
          <Text
            style={{
              backgroundColor: bnd == 1 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
              marginVertical: 1,
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: false,
                color: true,
                Packof: false,
                fabric: false,
                style: false,
                brand: false,
                price: false,
              }),
                setColorBar();
            }}
          >
            Color
          </Text>
          <Text
            style={{
              backgroundColor: clr == 1 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
              marginVertical: 1,
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: false,
                color: false,
                Packof: false,
                fabric: false,
                style: false,
                brand: true,
                price: false,
              }),
                setColorBand();
            }}
          >
            Brands
          </Text>
          <Text
            style={{
              backgroundColor: fab == 1 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
              marginVertical: 1,
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: false,
                color: false,
                Packof: false,
                fabric: true,
                style: false,
                brand: false,
                price: false,
              }),
                setColorBar(),
                setColorFab();
            }}
            c
          >
            Fabric
          </Text>
          <Text
            style={{
              backgroundColor: pak == 1 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
              marginVertical: 1,
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: false,
                color: false,
                Packof: true,
                fabric: false,
                style: false,
                brand: false,
                price: false,
              }),
                setColorpack();
            }}
          >
            Pack
          </Text>
          <Text
            style={{
              backgroundColor: stl == 1 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
              marginVertical: 1,
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: false,
                color: false,
                Packof: false,
                fabric: false,
                style: true,
                brand: false,
                price: false,
              }),
                setColorstyle();
            }}
          >
            Style
          </Text>
          <Text
            style={{
              backgroundColor: pri == 1 ? "white" : "rgba(0,0,0,0.2) ",
              width: screenWidth / 3,
              padding: 17,
              fontWeight: "700",
              marginVertical: 1,
            }}
            onPress={() => {
              setOpen({
                ...open,
                size: false,
                color: false,
                Packof: false,
                fabric: false,
                style: false,
                brand: false,
                price: true,
              }),
                setColorPrice();
            }}
          >
            Price
          </Text>
        </View>
        <ScrollView>
          <View>
            <View style={{ padding: 10 }}>
              <CheckBox
                style={{ width: 300 }}
                onPress={() => setMusic(!music)}
                title="Select All (12)"
                isChecked={music}
              />
            </View>
            {open.size &&
              Size?.map((size) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",
                      width: screenWidth / 5,
                      justifyContent: "space-between",
                    }}
                    onPress={() => setColorCat()}
                  >
                    <View style={{ width: screenWidth / 9 }}>
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text style={{ fontWeight: "900", color: "grey" }}>
                      {size.name}
                    </Text>
                  </View>
                );
              })}

            {open.style &&
              Style?.map((style) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",
                      width: screenWidth / 3,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: screenWidth / 9 }}>
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "grey",
                        backgroundColor: "white",
                        width: screenWidth / 2.2,
                      }}
                    >
                      {style.name}
                    </Text>
                  </View>
                );
              })}
            {/* 
            {open.fabric &&
              Fabric?.map((fabric) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",
                      width: screenWidth / 1.6,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{width:100 }}>
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text style={{ fontWeight: "900", color: "grey" }}>
                      {fabric.name}
                    </Text>
                  </View>
                );
              })} */}
            {open.fabric &&
              Fabric?.map((fabric) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",
                      width: screenWidth / 3,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: screenWidth / 9 }}>
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "grey",
                        backgroundColor: "white",
                        width: screenWidth / 2.2,
                      }}
                    >
                      {fabric.name}
                    </Text>
                  </View>
                );
              })}

            {open.brand &&
              Brand?.map((size) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",

                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: screenWidth / 9,
                        backgroundColor: "white",
                      }}
                    >
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "grey",
                        backgroundColor: "white",
                        width: screenWidth,
                      }}
                    >
                      {size.name}
                    </Text>
                  </View>
                );
              })}

            {open.color &&
              Color?.map((size) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",

                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: screenWidth / 9 }}>
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "grey",
                        textAlign: "left",
                        width: screenWidth,
                      }}
                    >
                      {size.name}
                    </Text>
                  </View>
                );
              })}

            {open.Packof &&
              newArray?.map((color, i) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 10,
                      alignItems: "center",

                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <CheckBox
                        onPress={() => setMusic(!music)}
                        title={`Pack of ${color[i]}`}
                        isChecked={music}
                      />
                    </View>
                  </View>
                );
              })}

            {open.price &&
              Brand?.map((price) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 17,
                      alignItems: "center",

                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: screenWidth / 9,
                        backgroundColor: "white",
                      }}
                    >
                      <Octicons name="check" size={24} color="black" />
                    </View>
                    <Text
                      style={{
                        fontWeight: "900",
                        color: "grey",
                        backgroundColor: "white",
                        width: screenWidth,
                      }}
                    >
                      {price.name}
                    </Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "space-evenly",
          display: "flex",
          shadowColor: "#d4d5d9",
          elevation: 5,
          bottom: 0,
        }}
      >
        <Text
          style={{
            width: screenWidth / 2.3,
            textAlign: "center",
            borderColor: "#d4d5d9",
            borderWidth: 1,
            padding: 3,
            margin: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "900",
            paddingTop: 12,
            borderRadius: 5,
            color: "#ff6060",
          }}
        >
          CLOSE
        </Text>
        <Text
          style={{
            width: screenWidth / 2,
            textAlign: "center",
            backgroundColor: "grey",
            borderWidth: 1,
            borderColor: "grey",
            padding: 3,
            height: 50,

            margin: 3,
            justifyContent: "center",
            fontWeight: "900",
            borderRadius: 5,
            paddingTop: 12,
            color: "rgba(0,0,0,0.9)",
          }}
        >
          APPLY
        </Text>
      </View>
    </View>
  );
};

export default Filter;
