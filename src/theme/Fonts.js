//
//  Fonts.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:26 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import Metrics from './Metrics';
import Colors from './Colors';

export default class Fonts {
  static FontFamily = {
    default: 'Gibson',
  };

  static Type = {
    BoldItalic: 'BoldItalic',
    Regular: 'Regular',
    SemiBoldItalic: 'SemiBoldItalic',
    Italic: 'Italic',
    Bold: 'Bold',
    LightItalic: 'LightItalic',
    SemiBold: 'SemiBold',
    Light: 'Light',
  };

  static Size = {
    xxxSmall: 11,
    xxSmall: 13,
    xSmall: 14,
    small: 15,
    normal: 17,
    medium: 19,
    large: 21,
    xLarge: 23,
    xxLarge: 28,
    xxxLarge: 31,
    huge: 34,
    xhuge: 37,
    xxhuge: 40,
    xxxhuge: 43,
  };

  static font = (
    fontFamily = Fonts.FontFamily.default,
    type = Fonts.Type.Regular,
    size = Fonts.Size.medium,
  ) => {
    return {
      fontFamily: fontFamily + '-' + type,
      fontSize:
        // size
        Metrics.generatedFontSize(size),
    };
  };

  static SemiBold = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.SemiBold, size),
      color: Colors.white,
    };
  };

  static Regular = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Regular, size),
      color: Colors.white,
    };
  };

  static Light = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Light, size),

      color: Colors.white,
    };
  };

  static Bold = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Bold, size),
      color: Colors.white,
    };
  };
}
