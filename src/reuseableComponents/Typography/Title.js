import React, { useCallback, useRef } from 'react'
import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';
import Text from './Text'

const Title = (props) => (
  <Text
    {...props}
    style={[
      styles.text,
      props.style,
      {
        fontSize: Metrics.generatedFontSize(props.size ?? 16),
      }
    ]}
  />
);

export default Title;

const styles = StyleSheet.create({
  text: {
    marginVertical: 2,
    ...Fonts.SemiBold(16),
  },
});