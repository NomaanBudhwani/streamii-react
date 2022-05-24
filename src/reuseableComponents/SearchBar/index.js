import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import styles from './styles';
import { Colors, Images, Metrics } from '../../theme';
import _ from 'lodash';

const index = forwardRef((props, ref) => {
  const {
    placeholder,
    style,
    inputStyle,
    onChangeText,
    showImage
  } = props;

  const isMounted = useRef(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isMounted.current) {
      const timeoutId = setTimeout(() => {
        onChangeText?.(value)
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      isMounted.current = true
    }
  }, [value]);

  const _onChangeText = text => {
    setValue(text);
  };

  return (
    <View style={[styles.container, style]}>
      {showImage && <Image source={Images.icSearch} style={styles.imgSearch} />}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          inputStyle,
          {
            paddingLeft: showImage ? Metrics.widthRatio(40) : Metrics.widthRatio(15),
          }
        ]}
        placeholder={placeholder ?? 'Search'}
        placeholderTextColor={Colors.white}
        maxLength={50}
        onChangeText={_onChangeText}
        autoCompleteType={'off'}
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='done'
      />
    </View>
  );
});

index.defaultProps = {
  showImage: true
}
export default index;
