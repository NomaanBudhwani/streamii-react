import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginLeft: 0,  //margin 0 to avoid margin of pressable. 
    marginBottom: 0, //they share same style prop
    marginTop: 0,
    marginRight: 0
  },
})