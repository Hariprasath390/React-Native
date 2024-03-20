import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import BottomSheet from "react-native-raw-bottom-sheet";

const ProductPage = () => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      <BottomSheet
        ref={bottomSheetRef}
        height={200}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            Bottom Sheet Content
          </Text>
          <Button
            title="Close Bottom Sheet"
            onPress={() => bottomSheetRef.current.close()}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProductPage;
