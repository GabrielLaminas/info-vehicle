import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 20,
    backgroundColor: "#F7F9FB",
  },
  tab: {
    flex: 1,
    padding: 12,
    justifyContent: "center"
  },
  tabActive: {
    borderWidth: 3.5,
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#3980F4",
    position: "relative",
    zIndex: 3
  },
  tabInactive: {
    borderWidth: 0,
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#E0E3E5",
  },
  tabActiveText: {
    color: "#3980F4",
    textAlign: "center",
    fontFamily: "Manrope_700Bold"
  },
  tabInactiveText: {
    color: "#45464D",
    textAlign: "center",
    fontFamily: "Manrope_600SemiBold"
  },
  header: {
    paddingVertical: 4, 
    paddingHorizontal: 20, 
    flex: 1, 
    flexDirection: "row", 
    gap: 24, 
    alignItems: "center", 
    justifyContent: "space-between", backgroundColor: "#FFF", 
    borderRadius: 12
  },
  headerText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
  },
  strong: {
    fontFamily: "Manrope_700Bold"
  }
});