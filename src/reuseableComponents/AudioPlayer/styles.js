import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrey,
    height: Metrics.heightRatio(73),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  slider: {
    marginRight: 20,
  },
})