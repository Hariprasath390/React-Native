import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Aboutus = () => {
  return (
    <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false} >
      <View style={{ }}>
        <Text style={{ fontWeight: "bold", textAlign: "center", padding: 10 , fontSize: 15}}>
        OUR STORY
        </Text>

        <Text style={{ fontWeight: "bold", padding: 10, fontSize: 16 }}>
          INTRODUCTION
        </Text>
        <Text
          style={{
            fontWeight: "300",
            marginHorizontal: 10,
            fontSize: 16,
            marginVertical: 3,
          }}
        >
          Welcome to our revolutionary clothing Myunde shopping app! We are more
          than just a platform for buying clothes; we are a fashion destination
          that is dedicated to helping you express your unique style and
          individuality.
        </Text>
        <Text
          style={{
            fontWeight: "300",
            marginHorizontal: 10,
            fontSize: 16,
            marginVertical: 3,
          }}
        >
          We are a fashion destination for anyone looking to update their
          wardrobe with the latest trends and styles. Our collections feature a
          diverse range of clothing for men , from casual everyday wear to
          formal attire for special occasions.
        </Text>
      </View>
      <View>
        <Text style={{ fontWeight: "bold", padding: 10, fontSize: 16 }}>
          WHAT WE GIVE
        </Text>
        <Text
          style={{
            fontWeight: "300",
            marginHorizontal: 10,
            fontSize: 16,
            marginVertical: 3,
          }}
        >
          As a online shopping platform, we are not just selling clothes, we are
          creating opportunities and making a difference in people's lives.
        </Text>
        <Text
          style={{
            fontWeight: "300",
            marginHorizontal: 10,
            fontSize: 16,
            marginVertical: 3,
          }}
        >
          At our online shopping platform, we believe that fashion should be
          accessible to everyone and that everyone should have the opportunity
          to express themselves through their clothing choices. With every
          purchase, our customers can feel good knowing that they are not just
          buying a piece of clothing, but also making a difference in the world.
        </Text>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontWeight: "bold", padding: 10, fontSize: 16 }}>
          INFO
        </Text>
        <Text
          style={{
            fontWeight: "300",
            marginHorizontal: 10,
            fontSize: 16,
            marginVertical: 3,
          }}
        >
          Founded in 2022, Myunde's mission is to make solutionwear for modern
          men. We specialize in making comfortable underwear, loungewear, and
          athleisure with an emphasis on technology and innovation. Our unique
          fabric blends provide proper fit and support both physically and
          emotionally throughout your day and throughout your life. More than
          just stylish and comfortable, our clothing is Made To Live In.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Aboutus;

const styles = StyleSheet.create({});
