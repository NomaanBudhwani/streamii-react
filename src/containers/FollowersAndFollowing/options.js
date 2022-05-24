import { AppStyles, Colors, Fonts, } from '../../theme';

export const tabBarOptions = {
  labelStyle: {
    textTransform: 'none',
    ...Fonts.font(
      Fonts.FontFamily.default,
      Fonts.Type.Regular,
      14,
    ),
  },
  indicatorStyle: { backgroundColor: Colors.theme },
  activeTintColor: Colors.theme,
  inactiveTintColor: Colors.white,
  style: { borderBottomWidth: 2, borderBottomColor: Colors.shark }
}

