import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    backgroundColor: "#F0F2F4",
    justifyContent: "center",
    alignItems: "center"
  },
  textBody: {
    marginVertical: 16,
    textAlign: "center",
    color: "#191C1E",
    fontSize: 16,
    fontFamily: "Manrope_400Regular",
    lineHeight: 24
  },
  buttonContainer: {
    flex: 0, 
    width: "100%", 
    height: "auto"
  }
});