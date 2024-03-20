import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import {
  getProductItemsById,
  getProductsById,
} from "../../reducers/productReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { EvilIcons } from "@expo/vector-icons";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const FilterPage = ({
  categoryId,
  closeBottomSheet,
  brand_id,
  setFilterData,
  filterData,
}) => {
  // const [filterData, setFilterData] = useState({
  //   size: [],
  //   color: [],
  //   fabric: [],
  //   style: [],
  //   packof: [],
  //   brand: [],
  // });

  const onChange = (key, id) => {
    if (filterData[key]?.includes(id)) {
      setFilterData({
        ...filterData,
        [key]: filterData[key].filter((value) => value !== id),
      });
    } else {
      setFilterData({ ...filterData, [key]: [...filterData[key], id] });
    }
  };

  const { filter } = useSelector((state) => state.FilterList);

  let uniqueArray = filter.size
    .map((val) => val.name)
    .filter((value, index, array) => array.indexOf(value) === index);

  const dispatch = useDispatch();

  const applyFilter = () => {
    dispatch(
      getProductsById({
        brandId: brand_id ?? filterData.brand.join(","),
        categoryId: categoryId,
        sizeIds: undefined,
        colorIds: undefined,
        styleIds: filterData.style.join(","),
        fabricIds: filterData.fabric.join(","),
        priceRange: [minValue, maxValue].join(","),
        packOF: filterData.packof.join(","),
      })
    ).then(({ payload }) => {
      dispatch(getProductItemsById(payload.productsId.join(",")));
    });
    closeBottomSheet(true);
  };

  const resetFilter = () => {
    AsyncStorage.removeItem("filterData");
    setFilterData({
      size: [],
      color: [],
      fabric: [],
      style: [],
      packof: [],
      brand: [],
    });
    dispatch(
      getProductsById({
        brandId: brand_id ?? filterData.brand.join(","),
        categoryId: categoryId,
      })
    ).then(({ payload }) => {
      dispatch(getProductItemsById(payload.productsId.join(",")));
    });
    closeBottomSheet(true);
  };

  useEffect(() => {
    AsyncStorage.getItem("filterData").then((value) => {
      if (value) {
        setFilterData(JSON.parse(value));
      }
    });
  }, []);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [values, setValues] = useState([minValue, maxValue]);
  const [showMore, setShowMore] = useState(false);

  const handleValuesChange = (values) => {
    setValues(values);
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  useEffect(() => {
    AsyncStorage.setItem("filterData", JSON.stringify(filterData));
  }, [filterData]);

  return (
    <>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <View>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Color :
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {(!showMore ? filter?.color.slice(0, 10) : filter?.color)?.map(
              (color, i) => (
                <TouchableOpacity
                  onPress={() => onChange("color", color.id)}
                  key={i}
                >
                  {color.image ? (
                    <ImageBackground
                      source={
                        filterData["color"].includes(color.id)
                          ? { uri: color.image }
                          : require("../../images/WHITE.jpg")
                      }
                      resizeMode="cover"
                      style={{
                        paddingHorizontal: 15,
                        margin: 5,
                        height: 40,
                        borderRadius: 100,
                        borderWidth: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Text
                        style={{
                          color: filterData["color"].includes(color.id)
                            ? "white"
                            : "rgb(0,53,96)",
                        }}
                      >
                        {color.name}
                      </Text>
                    </ImageBackground>
                  ) : (
                    <View
                      style={{
                        paddingHorizontal: 15,
                        margin: 5,
                        height: 40,
                        borderRadius: 100,
                        borderWidth: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: filterData["color"].includes(color.id)
                          ? color.code
                          : "white",
                      }}
                    >
                      <Text
                        style={{
                          color: filterData["color"].includes(color.id)
                            ? "white"
                            : "rgb(0,53,96)",
                        }}
                      >
                        {color.name}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            )}
            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <View
                style={{
                  paddingHorizontal: 5,
                  margin: 5,
                  height: 40,
                 
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                 
                }}
              >
                {/* <EvilIcons name= {showMore ? "minus" : "plus"} size={24} color="black" /> */}
                <Text
                  style={{
                    
                  }}
                >
                  {showMore ? "Show less" : "Show more"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Size :
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {filter?.size?.map((size, i) => (
              <TouchableOpacity
                onPress={() => onChange("size", size.name)}
                key={i}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    margin: 5,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: filterData["size"].includes(size.name)
                      ? "rgb(0,53,96)"
                      : "white",
                  }}
                >
                  <Text
                    style={{
                      color: filterData["size"].includes(size.name)
                        ? "white"
                        : "rgb(0,53,96)",
                    }}
                  >
                    {size.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Brand:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {filter?.brand?.map((brand, i) => (
              <TouchableOpacity
                onPress={() => onChange("brand", brand.id)}
                key={i}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    margin: 5,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: filterData["brand"].includes(brand.id)
                      ? "rgb(0,53,96)"
                      : "white",
                  }}
                >
                  <Text
                    style={{
                      color: filterData["brand"].includes(brand.id)
                        ? "white"
                        : "rgb(0,53,96)",
                    }}
                  >
                    {brand?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Style:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {filter?.style?.map((style, i) => (
              <TouchableOpacity
                onPress={() => onChange("style", style.id)}
                key={i}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    margin: 5,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: filterData["style"].includes(style.id)
                      ? "rgb(0,53,96)"
                      : "white",
                  }}
                >
                  <Text
                    style={{
                      color: filterData["style"].includes(style.id)
                        ? "white"
                        : "rgb(0,53,96)",
                    }}
                  >
                    {style?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Fabric:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {filter?.fabric?.map((fabric, i) => (
              <TouchableOpacity
                onPress={() => onChange("fabric", fabric.id)}
                key={i}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    margin: 5,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: filterData["fabric"].includes(fabric.id)
                      ? "rgb(0,53,96)"
                      : "white",
                  }}
                >
                  <Text
                    style={{
                      color: filterData["fabric"].includes(fabric.id)
                        ? "white"
                        : "rgb(0,53,96)",
                    }}
                  >
                    {fabric?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{}}>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Pack Of:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {filter?.pack_of?.map((packof, i) => (
              <TouchableOpacity
                onPress={() => onChange("packof", packof)}
                key={i}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    margin: 5,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: filterData["packof"].includes(packof)
                      ? "rgb(0,53,96)"
                      : "white",
                  }}
                >
                  <Text
                    style={{
                      color: filterData["packof"].includes(packof)
                        ? "white"
                        : "rgb(0,53,96)",
                    }}
                  >
                    Pack of {packof}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{}}>
          <Text style={{ fontSize: 20, margin: 5, fontWeight: "600" }}>
            Price Range:
          </Text>
          <MultiSlider
            values={values}
            sliderLength={screenWidth - 40}
            trackStyle={{ height: 10, borderRadius: 50 }}
            onValuesChange={handleValuesChange}
            min={100}
            max={700}
            step={1}
            allowOverlap={false}
            snapped
            selectedStyle={{ backgroundColor: "rgb(0,53,96)" }}
            unselectedStyle={{ backgroundColor: "silver" }}
            markerStyle={{
              backgroundColor: "rgb(0,53,96)",
              height: 20,
              width: 20,
              marginTop: 8,
            }}
            containerStyle={{
              height: 30,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 100,
              margin: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "rgb(0,53,96)",
              }}
            >
              ₹ {minValue.toFixed(2)}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "rgb(0,53,96)",
              }}
            >
              ₹ {maxValue.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView>
        <View style={{ position: "absolute", bottom: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignSelf: "center",
              padding: 18,
              width: screenWidth,
              backgroundColor: "#f9f9f9",
              borderColor: "rgb(0,53,96)",
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                borderColor: "rgb(0,53,96)",
                borderWidth: 1,
                width: screenWidth / 2.3,
                padding: 12,
                borderRadius: 20,
              }}
              onPress={resetFilter}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: "rgb(0,53,96)",
                  marginLeft: 2,
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(0,53,96)",
                borderColor: "rgb(0,53,96)",
                borderWidth: 1,
                width: screenWidth / 2.3,
                padding: 12,
                borderRadius: 20,
              }}
              onPress={() => applyFilter()}
            >
              <Text style={{ fontWeight: "600", color: "white" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FilterPage;
