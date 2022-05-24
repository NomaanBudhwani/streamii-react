import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.shark,
    padding: Metrics.baseMargin,
    alignItems: 'center',
  },
  btnAdd: {
    height: 60,
    width: 60,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.shark,
    marginRight: 5
  },
  input: {
    flex: 1,
    ...Fonts.Regular(13),
    padding: 10,
    marginLeft: 2,
    maxHeight: 200,
  },
  btnContainer: {
    paddingHorizontal: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
    paddingVertical: Metrics.heightRatio(10),
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.smallMargin,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: Metrics.baseMargin,
    paddingBottom: Metrics.smallMargin,
  },
  chip: {
    marginRight: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
  },

})