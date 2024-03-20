import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

const CardWidth = Dimensions.get("window").width - 150;

const PlaceOrderpage = ({ route: { params }, navigation }) => {
  const { Address } = params;

  const [redeemCode, setRedeemCode] = useState("");

  const handleRedeemCodeChange = (value) => {
    setRedeemCode(value);
  };

  const handleRedeemCodeSubmit = () => {
    // TODO: Add your redeem code verification logic here
    if (redeemCode === "HA12-HA12") {
      Alert.alert("Redeem code verified successfully");
    } else {
      Alert.alert("Invalid redeem code");
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
            padding: 12,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 17,
              color: "rgb(0,53,96)",
            }}
          >
            Shipping Details
          </Text>

          <View>
            <Text style={{ fontWeight: "500" }}>{Address.name} </Text>
            <Text style={{ fontWeight: "500" }}>{Address.number} </Text>
            <Text style={{ fontWeight: "500" }}>{Address.houseNo} ,</Text>
            <Text style={{ fontWeight: "500" }}>{Address.address} ,</Text>
            <Text style={{ fontWeight: "500" }}>
              {Address.city} , {Address.state} ,
            </Text>
            <Text style={{ fontWeight: "500" }}>{Address.pincode} . </Text>
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
            padding: 10,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 17,
              color: "rgb(0,53,96)",
            }}
          >
            Gift Voucher
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
          >
            <TextInput
              style={{
                height: 40,
                flexGrow: 1,
                marginRight: 5,
                borderWidth: 1,
                borderRadius: 10,
                padding: 8,
                borderColor: "#c9cacf",
              }}
              placeholder="Enter redeem code"
              keyboardType="default"
              onChangeText={handleRedeemCodeChange}
              value={redeemCode}
            />
            {/* <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                margin: 10,
                width: "80%",
              }}
              placeholder="Enter redeem code"
              
            /> */}
            {/* <Button title="Redeem" onPress={handleRedeemCodeSubmit} /> */}

            <TouchableOpacity onPress={handleRedeemCodeSubmit}>
              <View
                style={{
                  width: 70,
                  height: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(0,53,96)",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Apply
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ margin: 10, fontSize: 15 }}>
            Vouchers are not appilcable on promotional and offered products
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
              fontSize: 17,
              color: "rgb(0,53,96)",
            }}
          >
            Order Total
          </Text>

          <View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}> Total Mrp : </Text>
              <Text> 5467 </Text>
            </View>

            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}> Delivery : </Text>
              <Text> Free </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}> Saving on Mrp :</Text>
              <Text> ₹978 </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}> Promotion Applied : </Text>
              <Text> ₹757 </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800" }}> Total : </Text>
              <Text> ₹6757 </Text>
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
              fontSize: 17,
              color: "rgb(0,53,96)",
            }}
          >
            Order summary
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

              <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                Size :<Text>l</Text>
              </Text>
              <View>
                <Text style={{ marginVertical: 5, fontWeight: "500" }}>
                  Price : 565
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 10,
          zIndex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "rgb(0,53,96)",
            color: "white",
            borderRadius: 10,
            padding: 15,
            flexGrow: 1,
          }}
        >
          Proceed to payment
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default PlaceOrderpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    width: "80%",
  },
});
