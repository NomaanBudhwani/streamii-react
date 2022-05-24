import { StyleSheet } from 'react-native';
import { AppStyles, Metrics } from '../../theme';

export default StyleSheet.create({
  containerOne: {
    flex: 1.2,
    marginBottom: 30,
    height: 250,
  },
  containerTwo: {
    flex: 2,
  },
  mainBg: {
    justifyContent: 'flex-end',
    ...AppStyles.percent100,
  },
  blurImage: {
    position: 'absolute',
    bottom: -35,
    right: -15,
  },
  btn: {
    marginTop: Metrics.heightRatio(30),
    marginBottom: Metrics.heightRatio(20),
    marginHorizontal: 20,
  },
  link: {
    marginBottom: 60,
    marginTop: 20,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
