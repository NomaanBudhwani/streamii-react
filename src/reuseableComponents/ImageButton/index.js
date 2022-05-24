//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Image, ViewPropTypes, StyleSheet } from "react-native";
import ButtonView from "../ButtonView";

const ImageButton = (props) => {

  const [state, setState] = useState({
    height: 0,
    width: 0
  })
  const {
    source,
    onPress,
    style,
    imageStyle,
    round,
    noPadding,
    ...rest
  } = props

  const handleImageLayout = ({ nativeEvent: { layout } }) => {
    setState({ ...state, width: layout.width, height: layout.height })
  }

  const PADDING = noPadding ? 1 : 6

  return (
    <ButtonView
      {...rest}
      // backgroundColor='transparent'
      onPress={onPress}
      // borderless={true}
      style={[
        styles.container,
        style,
        {
          padding: PADDING,
          borderRadius: round ? (state.height) + (PADDING * 2) / 2 : 0
        },
      ]}>
      <Image
        onLayout={handleImageLayout}
        source={source}
        resizeMode="contain"
        style={imageStyle}
      />
    </ButtonView>
  )
}


ImageButton.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  source: PropTypes.number.isRequired
};

ImageButton.defaultProps = {
  style: {},
  imageStyle: {},
  onPress: () => { }
};

export default memo(ImageButton)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: 'red'
    // alignSelf: 'baseline'
  }
});
