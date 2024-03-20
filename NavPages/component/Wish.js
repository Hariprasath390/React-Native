import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import WishSize from "./WishSize";
const width = Dimensions.get("window").width - 130;
let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Wish = ({ route: { params }, navigation }) => {
  const { colorId, ProductId, CategoryId } = params ?? [];
  console.log(colorId, 111111111);
  console.log(ProductId, 222222222);
  console.log(CategoryId, 33333333);

  const bottomSheetRef = useRef();
  const [Wish, setWish] = useState(true);

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  return (
    <View>
      {Wish ? (
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <Text
              style={{ fontWeight: "500", color: "grey", paddingVertical: 5 }}
            >
              MY WISHLIST ( 1 ITEMS )
            </Text>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </View>
          <Text
            style={{
              borderBottomWidth: 1,
              borderColor: "black",
              marginHorizontal: 10,
              marginTop: -16,
            }}
          ></Text>
          <View
            style={{
              flexWrap: "wrap",
              justifyContent: "space-between",
              flexDirection: "row",
              margin: 1,
            }}
          >
            <View>
              <View>
                <Image
                  source={require("../../images/01.jpg")}
                  alt="img"
                  style={{
                    width: screenWidth / 2.3,
                    height: screenWidth / 1.7,
                    marginHorizontal: 10,
                    marginTop: 30,
                    borderRadius: 5,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginLeft: 5,
                    marginTop: 25,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 25,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",

                      borderColor: "grey",
                      borderWidth: 1,
                      margin: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "500",
                        color: "black",
                        flexDirection: "row",
                        justifyContent: "center",
                        justifyContent: "space-around",
                        marginBottom: 2,
                      }}
                    >
                      x
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 10,

                    width: screenWidth / 2.3,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                      paddingLeft: 10,
                      marginVertical: 3,
                      position: "relative",
                    }}
                  >
                    Basic brief unberf
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                      paddingLeft: 10,
                      marginVertical: 3,
                    }}
                  >
                    gsjdfjgfj jgufgu dtyutyu
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginRight: 50,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "400",
                        paddingLeft: 10,
                        marginVertical: 3,
                      }}
                    >
                      Price : ₹400
                    </Text>
                    <Text
                      style={{
                        fontWeight: "300",
                        color: "grey",
                        fontSize: 11,
                        textDecorationLine: "line-through",
                      }}
                    >
                      ₹ 585
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={openBottomSheet}>
                  <Text
                    style={{
                      marginHorizontal: 10,

                      width: screenWidth / 2.3,
                      borderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: "rgba(0,0,0,0.1)",
                      textAlign: "center",
                      fontWeight: "bold",
                      padding: 10,
                      borderRadius: 5,
                      marginTop: -3,
                    }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>

              <RBSheet
                ref={bottomSheetRef}
                height={200}
                dragFromTopOnly={true}
                closeOnDragDown={true}
                customStyles={{
                  wrapper: {
                    backgroundColor: "rgba(0,0,0,0.6)",
                  },
                  container: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  },
                  draggableIcon: {
                    backgroundColor: "#000",
                  },
                }}
              >
                <WishSize />
              </RBSheet>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: screenWidth,
            height: screenHeight,
          }}
        >
          <Image
            source={require("../../images/wish.webp")}
            style={{
              resizeMode: "contain",
              width: screenWidth,
              height: screenHeight,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Wish;

const styles = StyleSheet.create({});

{
  /* <View>
{Wish ? (
  <ScrollView>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <Text
        style={{ fontWeight: "500", color: "grey", paddingVertical: 5 }}
      >
        MY WISHLIST ( 1 ITEMS )
      </Text>
      <Entypo name="dots-three-vertical" size={20} color="black" />
    </View>
    <Text
      style={{
        borderBottomWidth: 1,
        borderColor: "black",
        marginHorizontal: 10,
        marginTop: -16,
      }}
    ></Text>
    <View
      style={{
        flexWrap: "wrap",
        justifyContent: "space-between",
        flexDirection: "row",
        margin: 1,
      }}
    >
      <View>
        <View>
          <Image
            source={require("../../images/01.jpg")}
            alt="img"
            style={{
              width: screenWidth / 2.3,
              height: screenWidth / 1.7,
              marginHorizontal: 10,
              marginTop: 30,
              borderRadius: 5,
            }}
          />

          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginLeft: 5,
              marginTop: 25,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 25,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",

                borderColor: "grey",
                borderWidth: 1,
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "500",
                  color: "black",
                  flexDirection: "row",
                  justifyContent: "center",
                  justifyContent: "space-around",
                  marginBottom: 2,
                }}
              >
                x
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 10,

              width: screenWidth / 2.3,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                paddingLeft: 10,
                marginVertical: 3,
                position: "relative",
              }}
            >
              Basic brief unberf
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "400",
                paddingLeft: 10,
                marginVertical: 3,
              }}
            >
              gsjdfjgfj jgufgu dtyutyu
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "400",
                  paddingLeft: 10,
                  marginVertical: 3,
                }}
              >
                Price : ₹400
              </Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: "grey",
                  fontSize: 11,
                  textDecorationLine: "line-through",
                }}
              >
                ₹ 585
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginHorizontal: 10,

              width: screenWidth / 2.3,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              textAlign: "center",
              fontWeight: "bold",
              padding: 10,
              borderRadius: 5,
              marginTop: -3,
            }}
          >
            Add to Cart
          </Text>
        </View>
      </View>
    </View>
  </ScrollView>
) : (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      width: screenWidth,
      height: screenHeight,
    }}
  >
    <Image
      source={require("../../images/wish.webp")}
      style={{
        resizeMode: "contain",
        width: screenWidth,
        height: screenHeight,
      }}
    />
  </View>
)}
</View> */
}
