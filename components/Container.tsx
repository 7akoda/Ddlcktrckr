import React from "react";
import { ColorValue, DimensionValue, View, useColorScheme } from "react-native";

type Props = {
  children?: React.ReactNode;
  height?: DimensionValue;
  width?: DimensionValue;
  
};

export const Container = ({ children, height = "100%", width = "100%", }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", 
      }} 
    >
      {children}
    </View>
  );
};
