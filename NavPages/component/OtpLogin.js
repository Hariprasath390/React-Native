import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import ProfilePage from "../../Tabbarpages/ProfilePage";
import LoginPage from "../../Tabbarpages/LoginPage";

const firebaseConfig = {
  apiKey: "AIzaSyBG7wVymueziFD61O_K8aaIaBoOn1ywNSY",
  authDomain: "myundeproject.firebaseapp.com",
  databaseURL: "https://myundeproject.firebaseio.com",
  projectId: "myundeproject",
  storageBucket: "myundeproject.appspot.com",
  messagingSenderId: "698499522005",
  appId: "1:698499522005:android:108bdd2920bf12256cb15c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function OtpLogin({ navigation }) {
  const [user, setUser] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [code, setCode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  function onAuthStateChanged(user) {
    console.log(user, "++++++++++++++");
    if (user) {
      setLoggedIn(true);
      setUser(user);
      AsyncStorage.setItem("user2", JSON.stringify(user));
    } else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function sendOtp() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      setError(error.message);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      setError("Invalid code.");
    }
  }

  async function logout() {
    try {
      await auth().signOut();
      setLoggedIn(false);
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  }

  if (loggedIn) {
    return (
      // <View>
      //   <ProfilePage
      //     GoogleSignOut={logout}
      //     user2={user}
      //     navigation={navigation}
      //   />
      // </View>

      <View>
        {!user ? (
          <LoginPage navigation={navigation} />
        ) : (
          <ProfilePage
            GoogleSignOut={logout}
            user2={user}
            navigation={navigation}
          />
        )}
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "white" }}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "black",
            marginVertical: 20,
          }}
        >
          OTP verification
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 14,
              width: ScreenWidth / 1.3,
              marginBottom: 50,
              color: "grey",
            }}
          >
            We will send you on{" "}
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 16,
                marginHorizontal: 10,
              }}
            >
              One Time Password{" "}
            </Text>
            on this mobile number
          </Text>
        </View>

        <Text style={{ textAlign: "center", fontWeight: "600", color: "grey" }}>
          Enter Mobile Number
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
          style={{
            borderBottomWidth: 2,
            borderColor: "black",
            padding: 5,
            margin: 10,
            width: ScreenWidth / 2.3,
            fontWeight: "900",
            borderBottomColor: "rgb(0,53,96)",
          }}
          textAlign="center"
        />
      </View>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      {confirm ? (
        <View>
          <Text
            style={{ textAlign: "center", fontWeight: "400", color: "grey" }}
          >
            Enter the{" "}
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 16,
                marginHorizontal: 10,
              }}
            >
              OTP{" "}
            </Text>
            sent to {phoneNumber}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <TextInput
              value={code}
              onChangeText={(text) => setCode(text)}
              keyboardType="numeric"
              style={{
                ScreenWidth: 1,
                textAlign: "center",
                margin: 10,
                width: ScreenWidth / 2.3,
                fontWeight: "900",
                borderBottomColor: "rgb(0,53,96)",
                borderBottomWidth: 2,
              }}
            />
          </View>
          <TouchableOpacity onPress={confirmCode}>
            <View>
              <Text
                style={{
                  backgroundColor: "rgb(0,53,96)",
                  margin: 10,
                  textAlign: "center",
                  fontWeight: "900",
                  color: "white",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                CONFIRM OTP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={sendOtp}>
          <View>
            <Text
              style={{
                backgroundColor: "rgb(0,53,96)",
                margin: 10,
                textAlign: "center",
                fontWeight: "900",
                color: "white",
                padding: 10,
                borderRadius: 8,
              }}
            >
              SEND OTP
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default OtpLogin;
