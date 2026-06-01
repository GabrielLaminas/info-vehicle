import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12
  },
  header: {
    flexDirection: "row", 
    gap: 16, 
    justifyContent: "space-between"
  },
  headerView: {
    marginBottom: 8
  },
  headerBrand: {
    fontSize: 12,
    textTransform: "uppercase",
    fontFamily: "Manrope_400Regular"
  },
  headerModel: {
    fontSize: 20,
    fontFamily: "Manrope_600SemiBold"
  },
  viewDetails: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 24
  },
  viewDetailsContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8
  },
  viewDetailsText: {
    color: "#45464D", 
    fontSize: 16,
    fontFamily: "Manrope_400Regular"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E3E5",
    marginVertical: 16
  },
  footer: {
    flexDirection: "row", 
    gap: 32
  },
  footerValue: {
    fontSize: 12, 
    fontFamily: "Manrope_400Regular",
    color: "#45464D"
  },
  footerPrice: {
    fontSize: 24, 
    fontFamily: "Manrope_700Bold",
    color: "#3980F4"
  }
});