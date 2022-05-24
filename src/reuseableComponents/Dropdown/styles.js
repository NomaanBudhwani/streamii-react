import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    marginTop: Metrics.baseMargin,
  },
  wrapper: {
    height: 66,
    backgroundColor: "transparent",
    borderColor: Colors.lynch,
    borderWidth: 0.5,
  },
  dropDownContainerStyle: {
    borderColor: Colors.lynch,
    backgroundColor: Colors.greenishBlack,
  },
  modal: {
    backgroundColor: Colors.greenishBlack,
  },
  textStyle: {
    ...Fonts.Regular(17),
    color: Colors.lynch,
    marginLeft: 4,
  },
  listItemLabelStyle: {
    ...Fonts.Regular(17),
    color: Colors.lynch
  },
  selectedItemLabelStyle: {
    // ...Fonts.SemiBold(17),
    // color: Colors.lynch
  },
  arrowIconStyle: {
    tintColor: Colors.lynch,
    marginRight: 4
  },
  tickIconStyle: {
    tintColor: Colors.lynch,
  },
  scroll: {
    paddingVertical: 20,
  },
  selected: {
    marginTop: 18,
    color: Colors.white
  },
  label: {
    position: 'absolute',
    left: 14,
    top: 26,
    ...Fonts.Regular(12),
    color: Colors.lynch,
  }
})

export const blurStyle = {
  wrapper: {
    borderWidth: 0.5,
    borderColor: Colors.lynch
  },
  label: {
    color: Colors.lynch
  },
  arrow: {
    tintColor: Colors.lynch
  }
}

export const errorStyle = {
  wrapper: {
    borderWidth: 1.5,
    borderColor: Colors.error
  },
  label: {
    color: Colors.error
  },
  arrow: {
    tintColor: Colors.error
  }
}
