import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, AppStyles } from '../../theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.shark,
  },
  input: {
    height: 35,
    paddingRight: Metrics.widthRatio(15),
    ...Fonts.Regular(14),
    backgroundColor: Colors.shark,
    borderRadius: 8,
  },
  imgSearch: {
    position: 'absolute',
    left: Metrics.baseMargin,
    zIndex: 99,
    resizeMode: 'contain',
  }

});
