import { StyleSheet, Text, View, Image, Button } from "react-native";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9zM8d9k-Z8JDq0nw_l4ZyaTHUqQ2n-Ps",
  authDomain: "myunde-gl.firebaseapp.com",
  databaseURL: "https://myunde-gl.firebaseio.com",
  projectId: "myunde-gl",
  storageBucket: "myunde-gl.appspot.com",
  messagingSenderId: "606974293659",
  appId: "1:606974293659:android:033c49229706acb59db83e",
  //   measurementId: "G-4H948LR6NW",
};

initializeApp(firebaseConfig);

const auth = getAuth();

export default function GoogleLogin() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "606974293659-scnml2j5b3fqhctbj18kuarc5gtor43s.apps.googleusercontent.com",
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // create a google credentials with a token
    const googleCredential = GoogleAuthProvider.credential(idToken);

    const user_sign_in = signInWithCredential(auth, googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton onPress={onGoogleButtonPress} />
      </View>
    );
  }
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        welcome : {user.displayName}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        welcome : {user.email}
      </Text>
      <Image
        source={{ uri: user.photoURL }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <Button title="Sign out" onPress={signOut} />
      {console.log(signOut, "1111")}
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
