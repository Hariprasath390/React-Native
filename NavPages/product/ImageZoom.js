import React, { useRef } from "react";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { MaterialIcons } from "@expo/vector-icons";

const renderImage = ({ item }) => (
  <Image source={{ uri: item.url ?? item.image }} style={{ width: "100%", height: "100%" }} />
);

const ImageZoom = ({ route: { params } }) => {
  
  const { Zoom } = params;


  console.log( Zoom , "34545656677788867563423")


  const swiperRef = useRef(null);
  const images = Zoom.map((url) => ({ url }));



  const renderArrow = (direction) => (
    <TouchableOpacity
      onPress={() => {
        if (direction === "left") {
          swiperRef.current.scrollToIndex({
            index: swiperRef.current.currentIndex - 1,
          });
        } else {
          swiperRef.current.scrollToIndex({
            index: swiperRef.current.currentIndex + 1,
          });
        }
      }}
      style={{
        position: "absolute",
        top: "50%",
        [direction]: 0,
        zIndex: 1,
      }}
    >
      <MaterialIcons name="keyboard-arrow-left" size={32} color="grey" />
    </TouchableOpacity>
  );



  return (
    <View style={{ flex: 1, margin: 2 }}>
      <ImageViewer
        imageUrls={images}
        renderIndicator={() => null}
        enableSwipeDown={true}
        onSwipeDown={() => console.log("onSwipeDown")}
        backgroundColor="#f6f6f6"
      >
        <SwiperFlatList
          ref={swiperRef}
          data={images}
          renderItem={renderImage}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          removeClippedSubviews={false}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          shouldOptimizeUpdates={false}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={2}
          useNativeDriver={true}
          renderArrow={renderArrow}
        />
      </ImageViewer>
    </View>
  );
};

export default ImageZoom;
