//
//  AppStyles.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:42 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { StyleSheet } from 'react-native';
import Metrics from './Metrics';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  htmlContainer: {
    marginTop: -Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  txtCenter: {
    textAlign: 'center',
  },
  centerAligned: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent100: {
    width: '100%',
    height: '100%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  iconTabBar: {
    width: 28,
    height: 28,
  },
  listStyle: {
    paddingBottom: 50,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  justiFyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  headerTopMargin: {
    marginTop: Metrics.navBarHeight,
  },
  hSmallMargin: {
    marginHorizontal: Metrics.smallMargin,
  },
  hBaseMargin: {
    marginHorizontal: Metrics.baseMargin,
  },
  vSmallMargin: {
    marginVertical: Metrics.smallMargin,
  },
  vBaseMargin: {
    marginVertical: Metrics.baseMargin,
  },
  hBasePadding: {
    paddingHorizontal: Metrics.baseMargin,
  },
  vBasePadding: {
    paddingVertical: Metrics.baseMargin,
  },
  hSmallPadding: {
    paddingHorizontal: Metrics.smallMargin,
  },
  vSmallPadding: {
    paddingVertical: Metrics.smallMargin,
  },
  txtButton: {
    padding: Metrics.heightRatio(5),
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMargin: {
    marginRight: Metrics.baseMargin,
  },
  leftMargin10: {
    marginLeft: Metrics.heightRatio(10),
  },
  rightMargin10: {
    marginRight: Metrics.heightRatio(10),
  },
  error: {
    marginTop: 5
  }
});
