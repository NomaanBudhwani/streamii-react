import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  headline: {
    marginTop: Metrics.heightRatio(40),
    ...AppStyles.txtCenter
  },
  txtWelcome: {
    marginTop: Metrics.smallMargin,
    ...AppStyles.txtCenter,
  },
  socialContainer: {
    ...AppStyles.flexRow,
    ...AppStyles.centerAligned,
    marginVertical: Metrics.heightRatio(38),
  },
  separator: {
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: Metrics.heightRatio(22),
  },
  forgot: {
    marginVertical: Metrics.smallMargin,
    alignSelf: 'flex-end',
    ...AppStyles.txtButton
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  signupContainer: {
    marginVertical: Metrics.baseMargin,
    ...AppStyles.flexRow,
    ...AppStyles.centerAligned,
    flexWrap: 'wrap'
  }
})