import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';
import utility from '../../utility';

export default StyleSheet.create({
  modal: {
    backgroundColor: Colors.backdrop,
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    // height: Metrics.heightRatio(199),
    width: Metrics.widthRatio(324),
    borderRadius: 12,
    backgroundColor: Colors.shark,
  },
  btnContainer: {
    // height: Metrics.heightRatio(60),
    alignItems: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderTopWidth: 0.5,
    borderTopColor: Colors.inactive,
  },
  btn: {
    ...AppStyles.centerAligned,
    height: Metrics.heightRatio(60),
    flex: 1,
  },
  seprator: {
    height: Metrics.heightRatio(60),
    width: 0.5,
    backgroundColor: Colors.inactive,
  },
  title: {
    marginTop: Metrics.heightRatio(45),
    ...Fonts.SemiBold(20),
  },
  message: {
    ...Fonts.Regular(14),
    color: Colors.white,
    marginHorizontal: Metrics.widthRatio(38),
    marginTop: Metrics.heightRatio(19),
    marginBottom: Metrics.heightRatio(24),
    textAlign: 'center',
    lineHeight: 20,
  },
  btnText: {
    ...Fonts.Regular(15),
    color: Colors.theme,
  },
});
