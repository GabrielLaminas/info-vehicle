import { StyleSheet, TextStyle, ViewStyle } from "react-native";

const button = {
  flex: 1,
  minHeight: 50,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
  borderWidth: 2,
  borderStyle: "solid",
} as ViewStyle;

const text = {
  fontSize: 16,
  fontFamily: "Manrope_800ExtraBold",
  textTransform: "uppercase",
  textAlign: "center",
} as TextStyle;

export const variants = StyleSheet.create({
  fill: {
    backgroundColor: "#3980F4",
    borderColor: "#3980F4",
    ...button,
  },
  outline: {
    color: "#3980F4",
    borderColor: "#3980F4",
    ...button,
  },
  disabled: {
    backgroundColor: "rgb(81, 95, 116, 0.3)",
    borderColor: "transparent",
    ...button,
  },
});

export const variantsText = StyleSheet.create({
  fill: {
    color: "#FFFFFF",
    ...text,
  },
  outline: {
    color: "#3980F4",
    ...text,
  },
  disabled: {
    color: "#FFFFFF",
    ...text,
  },
});
