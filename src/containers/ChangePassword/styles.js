import { Colors, Metrics, Fonts, AppStyles } from '../../theme';
import { StyleSheet } from 'react-native';


export default StyleSheet.create({

   txtReset: {
      marginBottom: Metrics.heightRatio(40),
   },
   btn: {
      marginTop: Metrics.heightRatio(30),
   },
   mainContainer: {
      ...AppStyles.flex,
      ...AppStyles.hBaseMargin,
      ...AppStyles.flex,
   },

})