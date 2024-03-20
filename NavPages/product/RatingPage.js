import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { Rating } from "react-native-ratings";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const RatingPage = ({ handleCloseSheet }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handlePostReview();
    setTimeout(() => {
      handleCloseSheet();
    }, 2000);
    reset();
  };

  const handlePostReview = () => {
    Toast.show({
      type: "success",
      text1: "Review Posted!",
      text2: "Thank you for your feedback.",
    });
  };

  const handleImagePicker = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    if (!result.canceled) {
      setValue("image", result.assets[0].uri);
    } else {
      setValue("image", null);
    }
  };

  return (
    <>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.titleStyle}>How's your order ?</Text>
          <Text style={{ color: "grey" }}>
            please leave your rating & review !
          </Text>
          <Controller
            control={control}
            name={"rating"}
            defaultValue={5}
            render={({ field: { onChange, value } }) => (
              <Rating
                showRating
                onFinishRating={onChange}
                style={{ margin: 10, marginBottom: -5 }}
                startingValue={value}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{}}>
              <Text
                style={{ fontSize: 15, marginBottom: 5, fontWeight: "500" }}
              >
                Comment :
              </Text>
              <TextInput
                style={{
                  height: 70,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  borderColor: errors.comment ? "rgb(168,1,1)" : "#c9cacf",
                }}
                placeholder="write your comment here *"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              {errors.comment && (
                <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                  {errors.comment.message}
                </Text>
              )}
            </View>
          )}
          name="comment"
          defaultValue=""
        />
        <Controller
          control={control}
          name="image"
          defaultValue={null}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginVertical: 20 }}>
              <TouchableOpacity
                onPress={handleImagePicker}
                style={{
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 10,
                  borderColor: "#c9cacf",
                  backgroundColor: "lightgrey",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {value ? (
                    <Image
                      source={{ uri: value }}
                      style={{ width: 60, height: 50, margin: 5 }}
                    />
                  ) : (
                    <FontAwesome name="photo" size={50} color="grey" />
                  )}
                  <Text
                    style={{
                      fontSize: 20,
                      margin: 5,
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    Choose Image
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
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
              onPress={() => handleCloseSheet()}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: "rgb(0,53,96)",
                  marginLeft: 2,
                }}
              >
                Cancel
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
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ fontWeight: "600", color: "white" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 100,
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonStyle: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RatingPage;
