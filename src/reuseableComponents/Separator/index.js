import React, {useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Paragraph} from '../Typography';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

const index = props => {
  const {title, style, width, color} = props;

  return (
    <View
      style={[
        styles.container,
        {
          width,
        },
        style,
      ]}>
      <View style={[styles.separator, {backgroundColor: color}]} />
      {title && <Paragraph style={styles.text}>{title}</Paragraph>}
      <View style={[styles.separator, {backgroundColor: color}]} />
    </View>
  );
};

export default index;

index.defaultProps = {
  color: Colors.separator,
};

const styles = StyleSheet.create({
  container: {
    ...AppStyles.flexRow,
    alignItems: 'center',
    width: '100%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.separator,
  },
  text: {
    marginVertical: 0,
    ...AppStyles.hBaseMargin,
  },
});
