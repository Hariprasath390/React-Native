import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const fuck = () => { 
setData
  }

  const datas = [
    {
      productName: brief,
      brandname: myunde,
      Number: "9898989898",
    },
    {
      productName: vest,
      brandname: myunde,
      Number: "9898989898",
    },
    {
      productName: tshirt,
      brandname: myunde,
      Number: "9898989898",
    },
    {
      productName: blueShirt,
      brandName: winfinch,
      Number: "44444444444444",
    },
    {
      productName: mnifgi,
      brandName: iudhfihhi,
      Number: "555555555555555555555",
    },
  ];

  return (
    <View>
      {datas.map((map, i) => {
        console.log(map);
        return <Text key={i}>{datas.productName} </Text>;
      })}
      <View></View>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </View>
  );
};

export default AuthProvider;
