import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    ...AppStyles.centerAligned,
    backgroundColor: Colors.darkGrey
  },
  plusSign: {
    height: 28,
    width: 28,
    position: 'absolute',
    zIndex: 99,
    right: -10,
    bottom: 22,
    elevation: 100
  },
  selectedView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 99,
    ...AppStyles.centerAligned
  }
})