import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    marginVertical: Metrics.baseMargin,
    ...AppStyles.flexRow,
    ...AppStyles.centerAligned,
    flexWrap: 'wrap'
  },
  btn: {
    marginTop: Metrics.heightRatio(22)
  },
  avatar: {
    marginTop: Metrics.heightRatio(34),
    marginBottom: Metrics.heightRatio(27),
    alignSelf: 'center'
  },
})