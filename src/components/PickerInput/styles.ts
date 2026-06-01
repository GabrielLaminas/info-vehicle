import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8
  },
  label: {
    color: "#76777D",
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    lineHeight: 15,
    textTransform: "uppercase"
  },
  labelValid: {
    color: "#3980F4"
  },
});

const sharedInput = {
  minHeight: 56,
  height: 56,
  paddingHorizontal: 16,
  fontSize: 16,
  fontFamily: "Manrope_400Regular",
  color: "#45464D",
  borderWidth: 1,
  borderColor: "#D0D5DD",
  borderRadius: 12,
}

const sharedInputStyle = {
  ...sharedInput,
  backgroundColor: "#FFFFFF",
};

const sharedInputStyleInactive = {
  ...sharedInput,
  backgroundColor: "#FFFFFF",
  opacity: 0.5
}

export const pickerSelect = {
  iconContainer: {
    top: 18,
    right: 36,
  },
  placeholder: {
    color: "#667085",
  },
  viewContainer: {
    width: "100%",
    opacity: 0.2
  } as ViewStyle,
}

export const pickerSelectStylesActive = StyleSheet.create({
  inputIOS: sharedInputStyle as TextStyle,
  inputAndroid: sharedInputStyle as TextStyle,
  inputWeb: sharedInputStyle as TextStyle,
  ...pickerSelect
});

export const pickerSelectStylesInactive = StyleSheet.create({
  inputIOS: sharedInputStyleInactive as TextStyle,
  inputAndroid: sharedInputStyleInactive as TextStyle,
  inputWeb: sharedInputStyleInactive as TextStyle,
  ...pickerSelect
});
