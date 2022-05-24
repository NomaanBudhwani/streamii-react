import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  headerContainer: {
    // alignSelf: 'stretch',
    padding: Metrics.baseMargin,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.shark
  },
  countWrapper: {
    flex: 1,
    marginLeft: Metrics.widthRatio(24),
  },
  countContainer: {
    ...AppStyles.centerAligned,
    marginHorizontal: Metrics.baseMargin,
  },
  counts: {
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  countText: {
    ...Fonts.Bold(18)
  },
  button: {
    flex: 1,
    // height: Metrics.heightRatio(26),
    // paddingVertical: Metrics.heightRatio(6),
    // flex: 1
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: Metrics.heightRatio(20),
    marginBottom: Metrics.smallMargin,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
  },
  socialIcon: {
    height: 22,
    width: 22
  }
})