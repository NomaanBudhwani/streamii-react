import React, { useCallback, useRef } from 'react'
import { Image } from 'react-native'
import ButtonView from '../ButtonView'
import { Text } from '../Typography'
import styles from './styles'

const index = (props) => {

  const {
    source,
    title,
    onPress,
    disabled,
    titleColor,
    titleStyle,
    imageStyle,
    style
  } = props

  return (
    <ButtonView
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}>
      <Image
        source={source}
        style={imageStyle}
      />
      <Text
        style={[
          styles.text,
          { color: titleColor },
          titleStyle
        ]}
      >
        {title}
      </Text>
    </ButtonView>
  )
}

export default index
