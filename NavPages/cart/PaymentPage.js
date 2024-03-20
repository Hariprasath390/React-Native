import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Payment = () => {
  const [iconAnimation] = useState(new Animated.Value(0));
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [textOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    startIconAnimation();
  }, []);

  const startIconAnimation = () => {
    Animated.timing(iconAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setOrderConfirmed(true);
      startTextAnimation();
    });
  };

  const startTextAnimation = () => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrapper, { opacity: iconAnimation }]}>
        <View style={styles.icon}>
          <View style={styles.checkmarkWrapper}>
            <Feather name="check" size={24} color="black" />
          </View>
        </View>
      </Animated.View>
      {orderConfirmed && (
        <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>Thank you for your order.</Text>
          <Text style={styles.subtitle}>Your order number is 123456.</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 15,
    height: 15,
    borderWidth: 2,
    transform: [{ rotate: "-45deg" }],
  },
  textWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Payment;
