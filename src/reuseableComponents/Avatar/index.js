import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { ButtonView } from '../../reuseableComponents';
import { Images, Metrics } from '../../theme';
import styles from './styles';
import FastImage from 'react-native-fast-image'

const index = (props) => {

  const {
    source, style, imageStyle,
    size, onPress,
    showPlusSign, plusSign,
    disabled, imgSize,
    cache, resizeMode
  } = props

  const _overflow = showPlusSign ? 'visible' : 'hidden'
  const _imgSize = imgSize ?? size

  return (
    <ButtonView
      style={[
        styles.container,
        style,
        {
          height: Metrics.heightRatio(size),
          width: Metrics.heightRatio(size),
          borderRadius: Metrics.heightRatio(size) / 2,
          overflow: _overflow
        }
      ]}
      disabled={disabled}
      onPress={onPress}>
      {
        showPlusSign &&
        <View style={styles.plusSign}>
          <Image
            source={plusSign}
          />
        </View>
      }

      {
        cache && typeof source == 'object' ?
          <FastImage
            source={source}
            resizeMode={resizeMode}
            style={[
              imageStyle,
              {
                height: Metrics.heightRatio(_imgSize),
                width: Metrics.heightRatio(_imgSize),
                borderRadius: Metrics.heightRatio(_imgSize) / 2,
                overflow: 'hidden'
              }
            ]}

          />
          :
          <Image
            source={source}
            resizeMode={resizeMode}
            style={[
              imageStyle,
              {
                height: Metrics.heightRatio(_imgSize),
                width: Metrics.heightRatio(_imgSize),
                borderRadius: Metrics.heightRatio(_imgSize) / 2,
                overflow: 'hidden'
              }
            ]}
          />
      }
    </ButtonView>
  )

}

export default index;

index.defaultProps = {
  source: require('./img/default.png'),
  plusSign: require('./img/icPlusSign.png'),
  size: Metrics.heightRatio(34),
  imageStyle: {},
  style: {},
  onPress: () => { },
  disabled: false,
  resizeMode: 'cover'
}
