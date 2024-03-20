import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Delivery = () => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView style={{ margin: 10 }} showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontWeight: "900",
                textAlign: "center",
                fontSize: 17,
                color: "#1f4d72",
              }}
            >
              Delivery And Shipping
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 10,
              }}
            >
              For International buyers, orders are shipped and delivered through
              registered international courier companies and/or International
              speed post only. For domestic buyers, orders are shipped through
              registered domestic courier companies and /or speed post only.
              Orders are shipped within 0-2 days or as per the delivery date
              agreed at the time of order confirmation and delivering of the
              shipment subject to Courier Company / post office norms.
            </Text>

            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              WEBTEK FASHION PVT LTD is not liable for any delay in delivery by
              the courier company / postal authorities and only guarantees to
              hand over the consignment to the courier company or postal
              authorities within 0-2 days from the date of the order and payment
              or as per the delivery date agreed at the time of order
              confirmation. Delivery of all orders will be to the address
              provided by the buyer.
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              Delivery of our services will be confirmed on your mail ID as
              specified during registration. For any issues in utilizing our
              services you may contact our helpdesk on 9514100444 or
              myunde.com@gmail.com
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              All purchases are shipped from our own or third-party warehouses
              from various locations across India. We do not ship to any other
              country at the moment. Our endeavor is to make the products reach
              you within a reasonable period varying from 1- 15 days from
              receipt of order and completion of successful payment. Delivery
              period may be affected by the address for delivery.
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              Goods received need to be acknowledged upon delivery at the given
              address. We take no responsibility for the acknowledgment given by
              any alternative person other than the person ordering the product
              at the address mentioned while placing the order.
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              Since the transactions are authorized by the cardholder, we do not
              take responsibility for incorrect addresses provided at the time
              of placing the order.
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              We are not responsible for damage of products once the products
              have been delivered.
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "#4f738f",
                marginVertical: 5,
              }}
            >
              All claims, if any, for shortages or damages must be reported to
              customer service within a day of delivery through the contact us
              page on the web store.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Delivery;

const styles = StyleSheet.create({});
