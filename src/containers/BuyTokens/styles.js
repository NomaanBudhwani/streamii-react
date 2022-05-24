// import { StyleSheet } from 'react-native';
// import { AppStyles, Metrics, Colors } from '../../theme';

// export default StyleSheet.create({
//   containerOne: {
//     flex: 1.2,
//     marginBottom: 30,
//     height: 330,
//   },
//   containerTwoText: {
//     flex: 2,
//     marginTop: -70,
//   },
//   containerTwoCard: {
//     flex: 2,
//   },
//   mainBgText: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...AppStyles.percent100,
//   },
//   mainBgCard: {
//     justifyContent: 'flex-end',
//     ...AppStyles.percent100,
//   },
//   subBg: {
//     width: Metrics.widthRatio(305),
//     height: Metrics.heightRatio(180),
//     alignSelf: 'center',
//   },
//   contentCon: {
//     padding: 20,
//   },
//   head: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   days: {
//     textAlign: 'right',
//   },
//   daysValue: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tokenCoins: {
//     marginLeft: 10,
//   },
//   blurImage: {
//     position: 'absolute',
//     bottom: -35,
//     right: -15,
//   },
//   btn: {
//     marginTop: Metrics.heightRatio(30),
//     marginHorizontal: 20,
//   },
//   note: {
//     marginBottom: 60,
//     marginTop: 20,
//     alignSelf: 'center',
//     width: '90%',
//     textAlign: 'center',
//     lineHeight: 15,
//   },
//   para: {
//     // width: '70%',
//     textAlign: 'center',
//   },
//   title: {
//     textAlign: 'center',
//     marginTop: 80,
//     marginBottom: 20,
//   },
// });
import { StyleSheet } from 'react-native';
import { AppStyles, Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  containerOne: {
    flex: 1.2,
    marginBottom: 30,
    height: 330,
  },
  containerTwoText: {
    // backgroundColor: 'red',
    marginTop: Metrics.heightRatio(89)
    // flex: 2,
    // marginTop: -70,
  },
  containerTwoCard: {
    backgroundColor: Colors.greenishBlack,
    paddingTop: Metrics.baseMargin
    // flex: 2,
  },
  mainBgText: {
    justifyContent: 'center',
    alignItems: 'center',
    ...AppStyles.percent100,
  },
  mainBgCard: {
    justifyContent: 'flex-end',
    ...AppStyles.percent100,
  },
  subBg: {
    width: Metrics.widthRatio(305),
    height: Metrics.heightRatio(180),
    alignSelf: 'center',
  },
  contentCon: {
    padding: 20,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  days: {
    textAlign: 'right',
  },
  daysValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenCoins: {
    marginLeft: 10,
  },
  blurImage: {
    position: 'absolute',
    bottom: -35,
    right: -15,
  },
  btn: {
    marginTop: Metrics.heightRatio(47),
    marginHorizontal: Metrics.baseMargin,
  },
  note: {
    marginBottom: 60,
    marginTop: 20,
    alignSelf: 'center',
    width: '90%',
    textAlign: 'center',
    lineHeight: 15,
  },
  para: {
    // width: '70%',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: Metrics.navBarHeight + Metrics.heightRatio(65),
    marginBottom: Metrics.heightRatio(20),
  },
  tokenDetail: {
    marginTop: Metrics.heightRatio(84)
  }
});
