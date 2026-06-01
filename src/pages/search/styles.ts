import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 56,
    paddingHorizontal: 20,
    gap: 32,
    backgroundColor: "#F7F9FB",
  },
  sectionIntro: {
    gap: 8,
  },
  heading: {
    color: "#191C1E",
    fontSize: 24,
    fontFamily: "Manrope_700Bold",
    lineHeight: 32,
  },
  bodyText: {
    color: "#45464D",
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    lineHeight: 20,
  },
  sectionVehicleType: {
    gap: 12,
  },
  sectionVehicleTypeHeading: {
    color: "#57657B",
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    lineHeight: 16,
    textTransform: "uppercase",
  },
  sectionPicker: {
    gap: 16,
  },
});
