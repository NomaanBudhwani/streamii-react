//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:10 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes } from "react-native";
import ButtonView from "../ButtonView";
import { AppStyles, Colors, Fonts } from "../../theme";
import { Text } from '../Typography'

export default class AppButton extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    title: "Click",
    onPress: () => { },
    style: {},
    textStyle: {},
    ripple: true
  };

  render() {
    const { style, title, onPress, textStyle, ripple } = this.props;
    return (
      <ButtonView
        style={[styles.container, style]}
        onPress={onPress}>
        <Text style={[styles.title, textStyle]}>
          {title}
        </Text>
      </ButtonView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 45 / 2,
    backgroundColor: Colors.theme
  },
  title: {
    ...Fonts.Regular(16),
    textAlign: 'center'
  }
});
