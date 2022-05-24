//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  View,
  StyleSheet
} from "react-native";

import utility from "../../utility";

let disableClick = false;
const debounceTime = Platform.select({
  ios: 200,
  android: 700
});

export default class ButtonView extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    children: PropTypes.node.isRequired,
    borderless: PropTypes.bool,
    disableRipple: PropTypes.bool,
    enableClick: PropTypes.bool,
    onPress: PropTypes.func
  };

  static defaultProps = {
    style: {},
    borderless: false,
    disableRipple: false,
    enableClick: false
  };

  _onPress = () => {
    if (this.props.enableClick && this.props.onPress) {
      this.props.onPress();
    } else if (!disableClick) {
      disableClick = true;
      if (this.props.onPress) {
        this.props.onPress();
      }

      setTimeout(() => {
        disableClick = false;
      }, debounceTime);
    }
  };

  render() {
    const {
      style,
      children,
      borderless,
      disableRipple,
      disabled,
      ...rest
    } = this.props;

    const _style = StyleSheet.flatten(style)

    if (utility.isPlatformAndroid()) {
      let background = TouchableNativeFeedback.Ripple("rgba(255,255,255,0.3)", borderless)

      if (disableRipple) {
        background = TouchableNativeFeedback.Ripple("transparent");
      }
      return (
        // <View style={[
        //   style,
        //   styles.container,
        //   { borderRadius: _style.borderRadius ?? 0 }
        // ]}>
        <TouchableNativeFeedback
          background={background}
          {...rest}
          disabled={disabled}
          useForeground={true}
          onPress={this._onPress}>

          <View style={[styles.wrapper, style]}>
            {this.props.children}
          </View>

        </TouchableNativeFeedback>
        // </View>
      );
    }

    const opacity = this.props.disableRipple ? 1 : 0.5;
    return (
      <TouchableOpacity
        style={style}
        {...rest}
        disabled={disabled}
        onPress={this._onPress}
        activeOpacity={opacity}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  wrapper: {
    overflow: 'hidden',
    // alignSelf: 'stretch',
    // marginLeft: 0,
    // marginRight: 0,
    // marginTop: 0,
    // marginBottom: 0,
  }
})