import { constant } from "lodash";
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";
import constants from './constants'

export default StyleSheet.create({
  wrapper: {
    marginTop: Metrics.baseMargin,
  },
  container: {
    borderWidth: 0.5,
    borderRadius: 5,
    height: constants.HEIGHT,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: constants.HEIGHT,
  },
  labelContainer: {
    position: 'absolute'
  },
  leftContainer: {
    marginRight: Metrics.smallMargin,
  },
  textfield: {
    ...Fonts.Regular(17),
    height: constants.HEIGHT,
    padding: constants.SPACING,
    flex: 1,
  },
  label: {
    ...Fonts.Regular(17),
  },
  phoneContainer: {
    backgroundColor: 'transparent',
    height: constants.HEIGHT,
    paddingLeft: constants.SPACING,
    width: '100%',
  },
  phoneInputWrapper: {
    ...Fonts.Regular(17),
    backgroundColor: 'transparent',
    paddingLeft: 0,
  },
  phoneInput: {
    ...Fonts.Regular(17),
    height: constants.HEIGHT,
  },
  codeTextStyle: {
    ...Fonts.Regular(17),
    fontWeight: 'normal',
  },
  flagButtonStyle: {
    width: Metrics.widthRatio(55),
    justifyContent: 'flex-start'
  }
})

export const focusStyles = {
  container: {
    borderWidth: 1.5,
    borderColor: constants.FOCUS_COLOR
  },
  label: {
    color: constants.FOCUS_COLOR
  }
}

export const blurStyle = {
  container: {
    borderWidth: 0.5,
    borderColor: constants.BLUR_COLOR
  },
  label: {
    color: constants.BLUR_COLOR
  }
}

export const errorStyle = {
  container: {
    borderWidth: 1.5,
    borderColor: constants.ERROR_COLOR
  },
  label: {
    color: constants.ERROR_COLOR
  }
}