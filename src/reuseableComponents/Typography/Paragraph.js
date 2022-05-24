import React, { useCallback, useRef } from 'react'
import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
import Text from './Text'
import utility from '../../utility';

const Paragraph = (props) => (
  <Text
    {...props}
    style={[
      styles.text,
      props.style,
      {
        color: props.color ?? utility.alphaColor(Colors.white, 0.6),
        fontSize: Metrics.generatedFontSize(props.size ?? 15),
      },
    ]}
  />
)

export default Paragraph

const styles = StyleSheet.create({
  text: {
    marginVertical: 2,
    ...Fonts.Regular(15),
  },
});
