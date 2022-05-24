import { Colors, Fonts } from "../../theme";

export const tabBarOptions = {

  labelStyle: {
    textTransform: 'none',
    ...Fonts.font(
      Fonts.FontFamily.default,
      Fonts.Type.Regular,
      14,
    ),
  },
  activeColor: Colors.theme,
  inactiveTintColor: Colors.white,
  indicatorStyle: { backgroundColor: Colors.theme },
  style: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.shark
  }
}