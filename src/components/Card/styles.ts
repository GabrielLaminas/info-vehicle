import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textTitle: {
    color: "#45464D",
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    lineHeight: 16,
    textTransform: "uppercase"
  },
  textBody: {
    color: "#191C1E",
    fontSize: 20,
    fontFamily: "Manrope_600SemiBold",
    lineHeight: 28
  },
  card: {
    flex: 1,
    gap: 4,
    padding: 16,
    backgroundColor: "#F2F4F6",
    borderRadius: 12,
    borderStyle: "solid",
    borderColor: "#ECEEF0",
    borderWidth: 1
  },
  cardMoreDetails: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2F4F6",
    borderRadius: 12,
    borderStyle: "solid",
    borderColor: "#ECEEF0",
    borderWidth: 1
  },
  cardMoreDetailsContainer: {
    gap: 4.5,
    marginBottom: 8
  },
  textBodyMoreDetails: {
    color: "#3980F4",
    fontSize: 32,
    fontFamily: "Manrope_800ExtraBold",
    lineHeight: 40
  },
  textBodyReference: {
    color: "#45464D",
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    lineHeight: 20
  }
});