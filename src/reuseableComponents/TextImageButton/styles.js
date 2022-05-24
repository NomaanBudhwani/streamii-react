import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Metrics.heightRatio(4),
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  text: {
    marginLeft: Metrics.heightRatio(4),
    ...Fonts.SemiBold(12),
  }

})