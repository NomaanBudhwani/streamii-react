import React, { useCallback, useRef } from 'react'
import { View, Text, Image } from 'react-native'
import { AppStyles, Colors, Images } from '../../theme'
import ImageButton from '../ImageButton'
import { Paragraph } from '../Typography'
import styles from './styles'

const index = (props) => {

  const {
    title, style, onClose,
    image, bordered
  } = props

  return (
    <View>
      <View
        style={[
          styles.container,
          style,
          {
            borderWidth: bordered ? 1 : 0,
            borderColor: Colors.border
          }
        ]}>
        {image && <Image source={image} />}
        <Paragraph
          color={Colors.white}
          size={12}
          style={AppStyles.hSmallMargin}>
          {title}
        </Paragraph>
        {onClose &&
          <ImageButton
            source={Images.icCross}
            onPress={onClose}
          />}
      </View>
    </View>
  )
}

export default index
