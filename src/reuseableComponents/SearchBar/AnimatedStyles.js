import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    position: 'absolute',
    right: Metrics.baseMargin,
    // height: 44,
    ...AppStyles.centerAligned,
    zIndex: 15,
    backgroundColor: '#452D46',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: "#452D46",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textinput: {
    backgroundColor: '#452D46',
    paddingLeft: Metrics.baseMargin,
    borderRadius: 5,
    ...Fonts.Regular(15),
  },
  btnSearch: {
    // backgroundColor: '#452D46',
    position: 'absolute',
    right: 15,
    zIndex: 16,
    elevation: 16,
    height: 45,
    width: 45,
    ...AppStyles.centerAligned
  },
  btnImage: {
    tintColor: 'white',
    height: 24,
    width: 24,
    alignSelf: 'center'
  }
})