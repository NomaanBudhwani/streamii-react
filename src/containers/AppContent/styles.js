import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    height: Metrics.heightRatio(210),
    width: undefined,
    ...AppStyles.centerAligned
  },
  txtBg: {
    ...Fonts.SemiBold(29),
    color: Colors.white,
    width: Metrics.widthRatio(220),
    textAlign: 'center',
    marginTop: Metrics.navBarHeight
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    alignItems: 'center'
  },
  topQs: {
    ...Fonts.SemiBold(21),
  },
  cellWrapper: {
    paddingHorizontal: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin
  },
  btnQuestion: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Metrics.baseMargin,
  },
  question: {
    ...Fonts.Regular(16),
    color: Colors.inactive,
    marginRight: Metrics.smallMargin,
    flex: 1
  },
  answerContainer: {
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.baseMargin,
  },
  answer: {
    ...Fonts.Regular(16),
  },
  content: {
    marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  txtContent: {
    ...Fonts.Regular(14),
    color: Colors.white,
    marginBottom: Metrics.doubleBaseMargin,
  }
})