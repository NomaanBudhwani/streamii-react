import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  avatar: {
    marginTop: Metrics.heightRatio(34),
    marginBottom: Metrics.heightRatio(27),
    alignSelf: 'center'
  },
  bio: {
    height: Metrics.heightRatio(135)
  },
  icons: {
    marginBottom: Metrics.doubleBaseMargin,
    marginRight: Metrics.baseMargin,
    borderWidth: 1
  },
  textinput: {
    backgroundColor: Colors.shark,
    marginRight: Metrics.baseMargin,
    height: 35,
    marginBottom: Metrics.doubleBaseMargin,
    borderRadius: 6,
    ...Fonts.Regular(14),
    paddingLeft: Metrics.smallMargin
  }
})