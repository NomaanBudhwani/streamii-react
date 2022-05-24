import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  mainContainer: {
    ...AppStyles.hBaseMargin,
    ...AppStyles.flex,
  },
  avatarFR: {
    marginRight: Metrics.smallMargin,
  },
  subcontainerFR: {
    ...AppStyles.flexRow,
    ...AppStyles.alignCenter,
    marginVertical: Metrics.heightRatio(20),
  },
  notiCellMainview: {
    ...AppStyles.flexRow,
    marginBottom: Metrics.heightRatio(20),
    flex: 1,
  },
  notiCellSubview1: {
    ...AppStyles.flexRow,
    flex: 1,
    marginRight: Metrics.widthRatio(30)
  },
})