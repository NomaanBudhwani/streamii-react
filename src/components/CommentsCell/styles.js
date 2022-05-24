import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    marginBottom: 2,
  },
  title: {
    flex: 1,
    ...AppStyles.rightMargin10,
  },
  comment: {
    ...AppStyles.leftMargin10,
    ...AppStyles.rightMargin10,
    marginTop: Metrics.heightRatio(4)
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Metrics.heightRatio(5),
  }
})