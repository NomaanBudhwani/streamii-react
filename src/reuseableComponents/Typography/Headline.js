import React, { useCallback, useRef } from 'react'
import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';
import Text from './Text'

const Headline = (props) => (
  <Text
    {...props}
    style={[
      styles.text,
      props.style,
      {
        fontSize: Metrics.generatedFontSize(props.size ?? 24),
      }
    ]}
  />
);

export default Headline;

const styles = StyleSheet.create({
  text: {
    marginVertical: 2,
    ...Fonts.SemiBold(24)
  },
});