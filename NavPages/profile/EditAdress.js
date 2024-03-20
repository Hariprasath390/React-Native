import { StyleSheet, Text, TextInput, View,TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");





const EditAdress = ({navigation}) => {


  const [data, setData] = useState([]);
  const [getPin, setGetPin] = useState();

  const [loading, setLoading] = useState(false);


  

  const fetchData = async () => {
    setLoading(true);
    const resp = await fetch(`https://api.postalpincode.in/pincode/${getPin}`);
    const data = await resp.json();
    if (data[0].Status === "Success") {
      setValue("city", data[0].PostOffice[0].Block);
      setValue("state", data[0].PostOffice[0].State);
      clearErrors(["city", "state"]);
      setData(data);
      setLoading(false);
    } else if (data[0]?.Status === "404" || data[0]?.Status === "Error" ) {
      setValue("city", );
      setValue("state", );
      setData(data);
      setLoading(false);
    }
  };


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
                marginVertical: 12,
                color: "#1f3f54",
              }}
            >
             ADD ADDRESS
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
                    placeholder="House No *"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                  {errors.houseNo && (
                    <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                      {errors.houseNo.message}
                    </Text>
                  )}
                </View>
              )}
              name="houseNo"
              defaultValue=""
            />
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
                    placeholder="Address (Building, Street, Area)*"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                  {errors.address && (
                    <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                      {errors.address.message}
                    </Text>
                  )}
                </View>
              )}
              name="address"
              defaultValue=""
            />
            <View>
              <Text
                style={{
                  color: "#1f3f54",
                  fontWeight: "500",
                  marginVertical: 12,
                }}
              >
                Enter pincode to auto fill state and city
              </Text>
            </View>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Minimum length is 6 characters",
                },
                maxLength: {
                  value: 6,
                  message: "Maximum length is 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginVertical: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={{
                        height: 50,
                        flexGrow: 1,
                        marginRight: 5,
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 10,
                        borderColor: "#c9cacf",
                      }}
                      maxLength={6}
                      placeholder="Pin Code*"
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={(value) => {
                        setGetPin(value);
                        onChange(value);
                      }}
                      value={value}
                    />

                    <TouchableOpacity onPress={() => fetchData()}>
                      <View
                        style={{
                          width: 80,
                          height: 50,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgb(0,53,96)",
                          borderRadius: 10,
                        }}
                      >
                        {loading ? (
                          <View
                            style={{
                              justifyContent: "center",
                              flex: 1,
                              alignItems: "center",
                            }}
                          >
                            <ActivityIndicator size={30} color={"white"} />
                          </View>
                        ) : (
                          <Text style={{ color: "white", textAlign: "center" }}>
                            ok
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>

                  {(errors.pincode || data[0]?.Status === "404") && (
                    <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                      Enter a valid Pincode
                    </Text>
                  )}
                  {data[0]?.Status === "Error" && (
                    <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                      Invalid pincode
                    </Text>
                  )}
                </View>
              )}
              name="pincode"
              defaultValue=""
            />
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
                    placeholder="City / Town*"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                  {errors.city && (
                    <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                      {errors.city.message}
                    </Text>
                  )}
                </View>
              )}
              name="city"
              defaultValue=""
            />

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
                    placeholder="State*"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                  {errors.state && (
                    <Text style={{ color: "rgb(168,1,1)", margin: 4 }}>
                      {errors.state.message}
                    </Text>
                  )}
                </View>
              )}
              name="state"
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
              Save Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  
    </>
  );
};

export default EditAdress;

const styles = StyleSheet.create({});
