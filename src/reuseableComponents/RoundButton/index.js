import React, { useCallback, useRef, memo } from 'react';
import { View } from 'react-native';
import ButtonView from '../ButtonView';
import styles from './styles';
import { Text } from '../Typography';

const index = props => {
  const { title, outlined, onPress, style } = props;

  const styling = outlined ? styles.outlined : {};

  return (
    <ButtonView
      style={[styles.button, styling, style]}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </ButtonView>
  );
};

export default memo(index);
