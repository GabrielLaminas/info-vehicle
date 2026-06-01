import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#E0E3E5"
  },
  containerSelected: {
    borderColor: "#3980F4"
  },
  box: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECEEF0",
    borderRadius: "100%",
  },
  boxSelected: {
    backgroundColor: "rgba(57, 128, 244, 0.1)"
  },
  icon: {
    color: "#515F74"
  },
  iconSelected: {
    color: "#3980F4"
  },
  textlabel: {
    color: "#45464D",
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    lineHeight: 16
  },
  textSelected: {
    color: "#191C1E",
  }
});