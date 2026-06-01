import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 56,
    paddingHorizontal: 20,
    gap: 12,
    backgroundColor: "#F7F9FB",
  },
  flexContainerRow: {
    flexDirection: "row",
    gap: 12,
  },
  flexContainerColumn: {
    gap: 12,
  },
  flexContent: {
    flex: 1,
    gap: 12,
  },
  headerBarChart: {
    marginBottom: 32,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerBarChartTitle: {
    color: "#191C1E",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Manrope_600SemiBold",
    textAlign: "left"
  },
  headerBarChartText: {
    color: "#3980F4",
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
  }
});
