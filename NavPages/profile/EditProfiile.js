import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const EditProfiile = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("hello");
    console.log(data);
  };

  return (
    <>
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <Text
            style={{
              fontWeight: "700",
              marginVertical: 20,
              color: "#1f3f54",
            }}
          >
            Edit Your Profile Details :
          </Text>
          <Controller
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginVertical: 10 }}>
                <TextInput
                  style={{
                    height: 50,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: "#c9cacf",
                  }}
                  placeholder="Name *"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                {errors.name && (
                  <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
            name="name"
            defaultValue=""
          />
          <Controller
            control={control}
            rules={{
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Minimum length is 10 characters",
              },
              maxLength: {
                value: 10,
                message: "Maximum length is 10 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginVertical: 10 }}>
                <TextInput
                  style={{
                    height: 50,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: "#c9cacf",
                  }}
                  placeholder="Mobile No* "
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                {errors.number && (
                  <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                    {errors.number.message}
                  </Text>
                )}
              </View>
            )}
            name="number"
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{
              required: "Email Address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginVertical: 10 }}>
                <TextInput
                  style={{
                    height: 50,

                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: "#c9cacf",
                  }}
                  placeholder="Email* "
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                {errors.email && (
                  <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
            )}
            name="email"
            defaultValue=""
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Proғιle")}
            style={{
              width: screenWidth / 2.6,
              height: 40,
              borderRadius: 10,
              backgroundColor: "rgb(0,53,96)",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",

                color: "white",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              width: screenWidth / 2.6,
              height: 40,
              backgroundColor: "rgb(0,53,96)",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",

                color: "white",
              }}
            >
              Save Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default EditProfiile;

const styles = StyleSheet.create({});
