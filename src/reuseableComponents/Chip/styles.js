import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
    borderRadius: 20,
    paddingVertical: Metrics.heightRatio(5),
    paddingHorizontal: Metrics.smallMargin,
  },
  title: {
    marginRight: Metrics.smallMargin
  },
})