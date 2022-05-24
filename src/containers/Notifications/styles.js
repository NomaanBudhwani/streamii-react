import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, AppStyles } from '../../theme';

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
    paddingVertical: Metrics.smallMargin,
  },
  switchCellMainView: {
    ...AppStyles.flexRow,
    ...AppStyles.alignCenter,
    justifyContent: 'space-evenly',
  },
  switchCellSubView: {
    paddingVertical: Metrics.heightRatio(20),
    ...AppStyles.flex,
  },
});
