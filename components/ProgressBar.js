import React from "react";
import { View } from "react-native";

const ProgressBar = ({ width, progress, color, unfilledColor }) => {
  const filledWidth = progress * width;

  return (
    <View
      style={{
        width: width,
        height: 13,
        backgroundColor: unfilledColor,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          width: filledWidth,
          height: "100%",
          backgroundColor: color,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default ProgressBar;
