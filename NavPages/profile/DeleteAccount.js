import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { CheckBox } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("screen").height;

const DeleteAccount = () => {
  const { control } = useForm();
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.popToTop();
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          {/* <Image source={require("../../images/DeleteAccount.webp")} style={{ width: screenWidth , height: ScreenHeight /3   }}  resizeMode="contain"/> */}
          <Image
            source={require("../../images/DeleteAccount.webp")}
            style={{ width: screenWidth, height: screenWidth }}
          />
        </View>

        <View style={{ margin: 12 }}>
          <Text style={{ fontWeight: "bold", padding: 10, fontSize: 16 }}>
            Do you really want to Break up ? Are you sure you don't want to talk
            things out ?
          </Text>
          <Text style={{ fontWeight: "bold", padding: 10, fontSize: 13 }}>
            * You'will lose your order history, saved details, myunde credits
            and benefits
          </Text>
          <Text
            style={{
              fontWeight: "300",
              marginHorizontal: 10,
              fontSize: 13,
              marginVertical: 3,
            }}
          >
            Any account related benefits will be forfeited once the account is
            deleted and will no longer be available to you. you cannot however
            you can always create a new account. By deleting your account, you
            are acknowledging that you have read our.
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 10,
                fontSize: 13,
                color: "grey",
                textAlign: "center",
                paddingLeft: 10,
              }}
            >
              Privacy Policy...
            </Text>
          </Text>
          <Text style={{ fontWeight: "bold", padding: 10, fontSize: 13 }}>
            * Any pending orders, exchanges, returns or refunds will no longer
            be accessible via your account
          </Text>
          <Text style={{ fontWeight: "bold", padding: 10, fontSize: 13 }}>
            * Myunde may not extend New User coupon if an account is created
            with the same mobile number or email id
          </Text>
          <Text style={{ fontWeight: "bold", padding: 10, fontSize: 13 }}>
            * Myunde may refuse or delay deletion in case there are any pending
            grievances related to orders, shipments, cancellations or any other
            services offered by Myunde.
          </Text>
        </View>

        <View style={{ marginBottom: 30, margin: 12 }}>
          <Controller
            control={control}
            name="DefaultAddress"
            defaultValue={false}
            backgroundColor="white"
            render={({ field: { onChange, value } }) => (
              <CheckBox
                checked={value}
                onPress={() => onChange(!value)}
                title={"I agree to terms and conditions"}
                checkedIcon={
                  <MaterialCommunityIcons
                    name="checkbox-outline"
                    size={24}
                    color="rgb(0,53,96)"
                  />
                }
                uncheckedIcon={
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={24}
                    color="rgb(0,53,96)"
                  />
                }
              />
            )}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              padding: 10,
              zIndex: 1,
              backgroundColor: "white",

              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "rgb(0,53,96)",
                color: "white",
                borderRadius: 5,
                padding: 15,
                flexGrow: 1,
              }}
            >
              DELETE ANYWAY
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePress}>
          <View
            style={{
              padding: 10,
              zIndex: 1,

              backgroundColor: "white",

              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "rgb(0,53,96)",
                color: "white",
                borderRadius: 5,
                padding: 15,
                flexGrow: 1,
              }}
            >
              KEEP ACCOUNT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
