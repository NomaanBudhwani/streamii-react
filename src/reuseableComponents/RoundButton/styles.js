import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";
import utility from "../../utility";

export default StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: Colors.theme,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    ...AppStyles.centerAligned
  },
  title: {
    ...Fonts.Regular(12),
  },
  outlined: {
    backgroundColor: Colors.darkGrey,
    borderWidth: 1,
    borderColor: Colors.border
  }
})