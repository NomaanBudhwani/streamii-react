import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  bgImage: {
    height: Metrics.heightRatio(272),
    width: '100%',
    ...AppStyles.centerAligned
  },
  title: {
    ...Fonts.SemiBold(24)
  }
})