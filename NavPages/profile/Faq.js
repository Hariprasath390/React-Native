import React from "react";
import { View } from "react-native";
import MultiAccordion from "./MultiAccordion";

const Faq = () => {
  const accordionItems = [
    {
      title: "Do I need to create an account on Myunde to place an order? ",
      content: "Yes, you need to register on the site to place an order.",
      contentHeight: 50,
      key: 1,
    },
    {
      title:
        "What are the payment options that I can avail of while placing an order?",
      content:
        "Currently, the following payment options are enabled. Credit Cards ( Visa / Master), Net Banking across Banks, Debit Cards (Visa / Master), American Express ",
      contentHeight: 80,
      key: 2,
    },
    {
      title: "where can i find you ?",
      content:
        "No:2 , first floor , Mk plaza, Thoppu thottam solipalayam road , 15 velampalayam Tirupur , 641652 - Tamilnadu",
      contentHeight: 60,
      key: 3,
    },
    {
      title: "How might I get in touch with you?",
      content: "follow us on our social media platforms",
      contentHeight: 40,
      key: 4,
    },
    {
      title: "What materials and fabrics do you use ?",
      content: "fabrics mentioned in filter",
      contentHeight: 40,
      key: 5,
    },
    {
      title: "How do u know what size to get ?",
      content:
        "we have size chart you can see on prouct screen and also we have how to measuring yourself which is very helful to you",
      contentHeight: 60,
      key: 6,
    },
    {
      title: "Can i cancel my order ?",
      content: "Nope, once you ordered you cant cancel any orders",
      contentHeight: 50,
      key: 7,
    },
    {
      title: "What are you selling?",
      content: "UnderGarments",
      contentHeight: 50,
      key: 8,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MultiAccordion items={accordionItems} />
    </View>
  );
};

export default Faq;
