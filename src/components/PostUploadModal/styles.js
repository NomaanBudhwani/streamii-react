import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  modal: {
    ...AppStyles.centerAligned,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.darkGrey,
    alignItems: 'center',
    padding: Metrics.baseMargin,
    borderRadius: 5
  },
})