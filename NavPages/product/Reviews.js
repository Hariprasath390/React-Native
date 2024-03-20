import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Reviews = () => {
  const { Reviews } = useSelector((state) => state.Review);

  const starIcons = [];

  for (let j = 0; j < 5; j++) {
    starIcons.push(<FontAwesome name="star" size={15} color="#f7ba00" />);
  }

  return (
    <ScrollView>
      {Reviews?.reviews && Reviews?.reviews[0]?.reviews?.length >= 1 && (
        <View style={{}}>
          <Text
            style={{
              textAlign: "center",
              padding: 5,

              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Customer Reviews
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                margin: 10,
                backgroundColor: "white",
                width: screenWidth - 150,
                borderRadius: 30,
                shadowColor: "grey",
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              {starIcons}
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",

                  color: "grey",
                }}
              >
                ({Reviews?.reviews[0]?.reviews?.length}) verified customer
              </Text>
            </View>
          </View>

          {/* <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text> 5 star </Text>
                  <Progress.Bar
                    progress={1}
                    color="#f7ba00"
                    height={12}
                    width={screenWidth - 120}
                    style={{ margin: 10 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text> 4 star </Text>
                  <Progress.Bar
                    progress={0.8}
                    color="#f7ba00"
                    height={12}
                    width={screenWidth - 120}
                    style={{ margin: 10 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text> 3 star </Text>
                  <Progress.Bar
                    progress={0.5}
                    color="#f7ba00"
                    height={12}
                    width={screenWidth - 120}
                    style={{ margin: 10 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text> 2 star </Text>
                  <Progress.Bar
                    progress={0.3}
                    color="#f7ba00"
                    height={12}
                    width={screenWidth - 120}
                    style={{ margin: 10 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text> 1 star </Text>
                  <Progress.Bar
                    progress={0}
                    color="#f7ba00"
                    height={12}
                    width={screenWidth - 120}
                    style={{ margin: 10 }}
                  />
                </View>
              </View> */}

          <View>
            {Reviews?.reviews?.length >= 1 && (
              <>
                {Reviews?.reviews[0]?.reviews?.map((item, i) => {
                  const diffInMs = new Date() - new Date(item?.createdAt);
                  const diffInDays = Math.floor(
                    diffInMs / (1000 * 60 * 60 * 24)
                  );

                  const starIcons = [];
                  for (let j = 0; j < item?.rating; j++) {
                    starIcons.push(
                      <FontAwesome name="star" size={15} color="#f7ba00" />
                    );
                  }

                  const reviewImage = Reviews?.reviews[0]?.images?.filter(
                    (img) => img?.review === item?.id
                  );

                  return (
                    <View
                      style={{
                        padding: 10,
                        width: screenWidth - 20,
                        height: 200,
                        backgroundColor: "white",
                        margin: 10,
                        borderRadius: 10,
                        shadowColor: "grey",
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                      }}
                      key={i}
                    >
                      <View
                        style={{
                          flexDirection: "row",

                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                            borderRadius: 50,
                            backgroundColor: "lightgrey",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ textAlign: "center" }}>
                            {item?.name?.slice(0, 1)}
                          </Text>
                        </View>
                        <View style={{}}>
                          <Text style={{ color: "grey", fontWeight: "800" }}>
                            {item.name}
                          </Text>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "75%",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "grey",
                                fontWeight: "800",
                                marginVertical: 2,
                              }}
                            >
                              {starIcons?.length >= 1 && starIcons}(
                              {starIcons?.length})
                            </Text>
                            <Text
                              style={{
                                color: "grey",
                                fontWeight: "500",
                                marginVertical: 2,
                              }}
                            >
                              {diffInDays === 0
                                ? " Yesterday"
                                : diffInDays === 1
                                ? `${diffInDays} day ago`
                                : `${diffInDays} days ago`}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{}}>
                        <Text
                          numberOfLines={4}
                          style={{
                            fontWeight: "300",
                            marginVertical: 10,
                            paddingLeft: 20,
                          }}
                        >
                          {item?.comment}
                        </Text>
                      </View>
                      {reviewImage?.length >= 1 && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          {reviewImage?.map((img, i) => {
                            return (
                              <View style={{ margin: 5 }} key={i}>
                                <Image
                                  source={{ uri: img?.image }}
                                  style={{ width: 50, height: 50 }}
                                />
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  );
                })}
              </>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
