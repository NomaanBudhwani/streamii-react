import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  headline: {
    marginTop: Metrics.heightRatio(30),
    ...AppStyles.txtCenter
  },
  btn: {
    marginTop: Metrics.heightRatio(22)
  },
  agree: {
    fontSize: 13
  },
  bgImage: {
    height: Metrics.heightRatio(272),
    width: '100%',
    ...AppStyles.centerAligned
  },
})