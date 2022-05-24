import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";
import utility from "../../utility";

const EMPTY_COLOR = Colors.greenishBlack;
const PROGRESS_COLOR = utility.alphaColor('#37C40D', 0.21);

const CircleBase = {
  width: 34,
  height: 34,
  borderRadius: 34 / 2,
  borderWidth: 34 / 10
}

export default StyleSheet.create({
  empty: {
    ...CircleBase,
    borderColor: EMPTY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: "-45deg" }]
  },
  indicator: {
    ...CircleBase,
    position: 'absolute',
    borderLeftColor: PROGRESS_COLOR,
    borderTopColor: PROGRESS_COLOR,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  cover: {
    ...CircleBase,
    position: 'absolute',
    borderLeftColor: EMPTY_COLOR,
    borderTopColor: EMPTY_COLOR,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  }
})