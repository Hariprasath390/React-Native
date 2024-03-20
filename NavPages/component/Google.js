import { StyleSheet, Text, View, Image, Button } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import LoginPage from "../../Tabbarpages/LoginPage";
import ProfilePage from "../../Tabbarpages/ProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG7wVymueziFD61O_K8aaIaBoOn1ywNSY",
  authDomain: "myundeproject.firebaseapp.com",
  databaseURL: "https://myundeproject.firebaseio.com",
  projectId: "myundeproject",
  storageBucket: "myundeproject.appspot.com",
  messagingSenderId: "698499522005",
  appId: "1:698499522005:android:108bdd2920bf12256cb15c",
  //   measurementId: "G-4H948LR6NW",
};

initializeApp(firebaseConfig);

const auth = getAuth();

export default function Google({ navigation }) {
  const saveUserDatainDataBase = async () => {
    try {
      const response = await axios.post(
        "https://your-backend-api-url/api/user",
        user
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((storedUser) => {
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // "user" item not found
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  GoogleSignin.configure({
    webClientId:
      "698499522005-5a0qq9nbjo0vei9ka5vfs3tjh4pkte7u.apps.googleusercontent.com",
  });

  function onAuthStateChanged(data) {
    setUser(data);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = GoogleAuthProvider.credential(idToken);

    const user_sign_in = signInWithCredential(auth, googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user, "_++++++++++++++");
        AsyncStorage.setItem("user", JSON.stringify(user));

        saveUserDatainDataBase(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  if (initializing) return null;

  return (
    <View>
      {!user ? (
        <LoginPage GoogleLogin={onGoogleButtonPress} navigation={navigation} />
      ) : (
        <ProfilePage
          GoogleSignOut={signOut}
          user2={user}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
