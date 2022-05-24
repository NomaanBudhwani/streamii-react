import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    borderColor: Colors.lynch,
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: Metrics.baseMargin,
  },
  button: {
    height: 66,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  value: {
    ...Fonts.Regular(17),
    color: Colors.lynch,
  },
  label: {
    position: 'absolute',
    left: 14,
    top: 7,
    ...Fonts.Regular(12),
    color: Colors.lynch,
  },
  selected: {
    marginTop: 18,
    color: Colors.white
  },
})