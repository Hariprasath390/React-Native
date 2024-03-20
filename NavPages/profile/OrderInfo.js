import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import RatingPage from "../product/RatingPage";

const CardWidth = Dimensions.get("window").width - 180;

const OrderInfo = ({ navigation }) => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "#f3f3f3", padding: 5 }}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            padding: 10,
            margin: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              color: "rgb(0,53,96)",
              textAlign: "center",
              marginVertical: 5,
              color: "black",
            }}
          >
            ORDER STATUS
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              color: "rgb(0,53,96)",
              marginVertical: 5,
            }}
          >
            ORDER ID : #7889576894576
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              color: "rgb(0,53,96)",
              marginVertical: 5,
            }}
          >
            ORDER DATE : 6789-09-12
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            padding: 12,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 14,
              color: "rgb(0,53,96)",
            }}
          >
            ORDERED ITEMS
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              flexDirection: "row",
              backgroundColor: "white",
              position: "relative",
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 130,
                  margin: 10,
                  alignItems: "center",
                  flex: 1,
                  borderRadius: 10,
                }}
                source={require("../../images/n8.png")}
                alt="img"
              />
            </View>
            <View style={{ width: CardWidth }}>
              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  brand
                </Text>
              </View>
              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  product name
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: 60,
                  marginVertical: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "500" }}>Color : </Text>
                <Text>red </Text>
              </View>
              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  Price : ₹565
                </Text>
              </View>
              <Text
                style={{ fontWeight: "bold", textAlign: "right" }}
                onPress={openBottomSheet}
              >
                ( Give a rating )
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            padding: 12,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 14,
              color: "rgb(0,53,96)",
            }}
          >
            DELIVERY LOCATION
          </Text>

          <View style={{ marginVertical: 1 }}>
            <View style={{}}>
              <Text style={{ fontWeight: "500" }}>ViratKohli</Text>
            </View>

            <View style={{}}>
              <Text style={{ fontWeight: "500" }}>093459067054 </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontWeight: "500" }}>4, hgsgfug sfjag </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontWeight: "500" }}>Uiduyfuiehfbg</Text>
            </View>
            <View style={{}}>
              <Text style={{ fontWeight: "500" }}>bufsguyofg </Text>
            </View>
            <View style={{}}>
              <Text style={{ fontWeight: "500" }}>642146 </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            padding: 12,
            margin: 10,
            marginVertical: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 14,
              color: "rgb(0,53,96)",
            }}
          >
            PAYMENT
          </Text>

          <View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Items total price: </Text>
              <Text> 546.00 </Text>
            </View>

            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Shipping price : </Text>
              <Text> 39.00 </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Total paid amount :</Text>
              <Text> ₹978.00 </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Paid date : </Text>
              <Text> 2023-03-12</Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}>Payment method: </Text>
              <Text>Prepaid</Text>
            </View>
          </View>
          <RBSheet
            ref={bottomSheetRef}
            height={500}
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
            <RatingPage handleCloseSheet={closeBottomSheet} />
          </RBSheet>
        </View>
      </ScrollView>
    </>
  );
};

export default OrderInfo;
