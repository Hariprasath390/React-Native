import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CheckBox } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ShippingPage({ navigation }) {
  const [data, setData] = useState([]);
  const [getPin, setGetPin] = useState();
  const [Default, setDefault] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

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
    } else if (data[0]?.Status === "404" || data[0]?.Status === "Error") {
      setValue("city");
      setValue("state");
      setData(data);
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    navigation.navigate("AdressDetail", { Address: data });
    if (data.DefaultAddress) {
      AsyncStorage.setItem("shippingAdress", JSON.stringify([data]));
    }
  };

  useEffect(() => {
    getData();
    if (Default.length >= 1) {
      setValue("city", Default[0].city);
      setValue("state", Default[0].state);
      setValue("name", Default[0].name);
      setValue("number", Default[0].number);
      setValue("address", Default[0].address);
      setValue("houseNo", Default[0].houseNo);
      setValue("pincode", Default[0].pincode);
    }
  }, []);

  const getData = async () => {
    await AsyncStorage.getItem("shippingAdress")
      .then((value) => {
        if (value) {
          setDefault(JSON.parse(value));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ClearAddress = () => {
    setDefault([]);
    reset();
    handleSubmit(onSubmit);
  };

  return (
    <>
      <ScrollView style={{ padding: 20, backgroundColor: "rgb(255,255,255)" }}>
        <View>
          <Text
            style={{
              fontWeight: "700",

              marginBottom: 12,

              color: "#1f3f54",
            }}
          >
            CONTACT DETAIL
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
                  maxLength={10}
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
        </View>
        <View>
          <View>
            <Text
              style={{
                fontWeight: "700",
                marginVertical: 12,
                color: "#1f3f54",
              }}
            >
              ADDRESS
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
        </View>

        <View style={{ marginBottom: 30 }}>
          <Controller
            control={control}
            name="DefaultAddress"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <CheckBox
                checked={value}
                onPress={() => onChange(!value)}
                title={"Mark as my default adress"}
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
        {Default.length >= 1 && (
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View
              style={{
                padding: 10,
                zIndex: 1,
                backgroundColor: "white",
                borderRadius: 10,

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
                  borderRadius: 10,
                  padding: 15,
                  flexGrow: 1,
                }}
              >
                Use this Adresss
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={Default.length >= 1 ? ClearAddress : handleSubmit(onSubmit)}
        >
          <View
            style={{
              padding: 10,
              zIndex: 1,

              backgroundColor: "white",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Default.length >= 1 ? (
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
                Add new Address
              </Text>
            ) : (
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
                Continue to checkout
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ShippingPage;
