import React from 'react'
import { AppStyles, Colors } from '../../theme'
import ButtonView from '../ButtonView'
import { Paragraph } from '../Typography'

const TextButton = (props) => {

  const {
    onPress,
    style,
    textStyle,
    textColor,
    textSize,
    underline,
    title
  } = props

  return (
    <ButtonView
      onPress={onPress}
      style={[AppStyles.txtButton, style]}>
      <Paragraph
        color={textColor}
        size={textSize}
        style={[textStyle,
          { textDecorationLine: underline ? 'underline' : 'none' }
        ]}>
        {title}
      </Paragraph>
    </ButtonView>
  )
}

TextButton.defaultProps = {
  title: 'Text Button',
  style: {},
  textStyle: {},
  textColor: Colors.white,
  underline: false
}
export default TextButton
