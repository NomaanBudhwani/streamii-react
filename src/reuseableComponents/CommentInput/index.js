import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageButton } from '..';
import { useKeyboard } from '../../hooks';
import { Colors, Images } from '../../theme';
import utility from '../../utility';
import styles from './styles';

const index = forwardRef((props, ref) => {

  const { placeholder, onChangeText, onSend } = props
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  const [isSendEnabled, setIsSendEnabled] = useState(false);
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    inputRef: inputRef.current
  }));

  const _onChangeText = (text) => {

    onChangeText?.(text)

    if (text.trim().length > 0 && !isSendEnabled) {
      setIsSendEnabled(true)
    } else if (text.trim().length == 0) {
      setIsSendEnabled(false)
    }
  }

  const _onSend = () => {
    onSend?.()
    setIsSendEnabled(false)
    inputRef.current.clear()
  }

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: utility.isPlatformIOS() && keyboard.visible ? keyboard.height : insets.bottom
        }
      ]}
    >
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={'white'}
        style={styles.input}
        autoCompleteType={"off"}
        autoCorrect={false}
        returnKeyType='send'
        onSubmitEditing={_onSend}
        onChangeText={_onChangeText}
        enablesReturnKeyAutomatically={true}
      />
      <ImageButton
        round
        disabled={!isSendEnabled}
        source={Images.icSend}
        style={styles.btnSend}
        onPress={_onSend}
        imageStyle={{ tintColor: isSendEnabled ? Colors.theme : Colors.inactive }}
      />
    </View>
  )
})

export default index
