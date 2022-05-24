import { Colors, Metrics, Fonts, AppStyles } from '../../theme';
import { StyleSheet } from 'react-native';
import utility from '../../utility';

export default StyleSheet.create({
  mainContainer: {
    ...AppStyles.flex,
  },
  normalCellMainView: {
    // paddingVertical: Metrics.heightRatio(20),
    ...AppStyles.hBasePadding,
  },
  switchCellMainView: {
    ...AppStyles.flexRow,
    ...AppStyles.alignCenter,
    justifyContent: 'space-evenly',
    ...AppStyles.hBaseMargin,
    borderBottomWidth: 1,
    borderBottomColor: utility.alphaColor(Colors.white, 0.11),
  },
  switchCellSubView: {
    paddingVertical: Metrics.heightRatio(20),
    ...AppStyles.flex,
  },
});
