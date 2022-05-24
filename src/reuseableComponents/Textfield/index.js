import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  memo,
  useImperativeHandle,
} from 'react';
import { View, Text, TextInput, Animated, Easing, Image } from 'react-native';
import styles, { focusStyles, blurStyle, errorStyle } from './styles';
import { calculateLabelPosistion, calculateLabelTopPosition } from './helper';
import constants from './constants';
import ImageButton from '../ImageButton';
import { AppStyles, Colors, Images } from '../../theme';
import { useMergeState } from '../../hooks';
import { INPUT_TYPES } from '../FormHandler/constants';
import PropTypes from 'prop-types';
import _ from 'lodash';
import PhoneInput from 'react-native-phone-number-input';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Paragraph } from '../Typography';
import utility from '../../utility';

const index = forwardRef((props, ref) => {
  const {
    style,
    inputStyle,
    label,
    secureTextEntry,
    right,
    type,
    height,
    multiline,
    value,
    error,
    disabled,
    autoFocus,
  } = props;

  const innerRef = useRef(null);
  const phoneRef = useRef(null);
  const labelPositionY = useRef(new Animated.Value(0)).current;
  const [state, setState] = useMergeState({
    focused: false,
    value: value,
    secureTextEntry: secureTextEntry,
    error: error,
    isError: false,
    countryCode: props.countryCode ?? 'US',
    containerLayout: {
      width: 0,
      height: 0,
    },
    labelLayout: {
      measured: false,
      width: 0,
      height: 0,
    },
  });

  useEffect(() => {
    if (!_.isEmpty(value)) {
      minimizeLabel();
      setState({ value });
    }
  }, [value]);

  useEffect(() => {
    setState({ secureTextEntry });
  }, [secureTextEntry]);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      if (type == INPUT_TYPES.PHONE) {
        return {
          value: '+' + phoneRef.current.getCallingCode() + '-' + state.value,
          isValid: phoneRef.current.isValidNumber(state.value)
        }
      }
      return state.value
    },
    setError: (val, error = state.error) =>
      setState({ isError: val, error }),
    setFocus: () => innerRef.current.focus(),
    getInnerRef: () => innerRef,
  }));

  const _height = height;

  const _labelHeight = state.labelLayout?.height ?? 0;
  const _labelWidth = state.labelLayout?.width;

  const minimizeLabel = () => {
    Animated.timing(labelPositionY, {
      toValue: 1,
      duration: constants.FOCUS_ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const maximizeLabel = () => {
    Animated.timing(labelPositionY, {
      toValue: 0,
      duration: constants.BLUR_ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const _handleFocus = () => {
    setState({ focused: true });
    _.isEmpty(state.value) && minimizeLabel();
  };

  const _handleBlur = () => {
    setState({ focused: false });
    _.isEmpty(state.value) && maximizeLabel();
  };

  const _handleChangeText = text => {
    setState({ value: text, isError: false });
  };

  const _handleLabelLayout = ({ nativeEvent: { layout } }) => {
    const { height, width } = state.labelLayout;

    if (height != layout.height || width != layout._labelWidth) {
      setState({
        labelLayout: {
          ...state.labelLayout,
          width: layout.width,
          height: layout.height,
          measured: true,
        },
      });
    }
  };

  const handleSecureTextEntry = () => {
    setState({ secureTextEntry: !state.secureTextEntry });
  };

  const renderRight = () => {
    if (
      type === INPUT_TYPES.PASSWORD ||
      type === INPUT_TYPES.CONFIRM_PASSWORD ||
      right
    ) {
      return (
        <View style={styles.leftContainer}>
          <ImageButton
            rounded
            source={state.secureTextEntry ? Images.icEyeSecure : Images.icEye}
            imageStyle={{ tintColor: state.isError ? constants.ERROR_COLOR : Colors.inactive }}
            onPress={handleSecureTextEntry}
          />
        </View>
      );
    }
  };

  const renderError = () => {
    if (state.isError) {
      return (
        <Paragraph color={constants.ERROR_COLOR} size={12} style={AppStyles.error}>
          {state.error}
        </Paragraph>
      )
    }
  }

  const labelBasePosition = calculateLabelPosistion(_height, _labelHeight);
  const labelScaleSize =
    constants.FOCUS_LABEL_FONTSIZE / constants.BLUR_LABEL_FONTSIZE;
  const labelTopPositionX =
    (_labelWidth * labelScaleSize) / 2 - _labelWidth / 2 + constants.SPACING;

  const labelScale = {
    transform: [
      {
        // Make label smaller
        scale: labelPositionY.interpolate({
          inputRange: [0, 1],
          outputRange: [1, labelScaleSize],
        }),
      },
    ],
  };

  const labelStyle = {
    transform: [
      {
        // Move label
        translateY: labelPositionY.interpolate({
          inputRange: [0, 1],
          outputRange: [labelBasePosition, constants.LABEL_TOP_POSITION],
        }),
      },
      {
        // Move label
        translateX: labelPositionY.interpolate({
          inputRange: [0, 1],
          outputRange: [constants.SPACING, labelTopPositionX],
        }),
      },
    ],
  };

  const styling = state.isError
    ? errorStyle
    : state.focused
      ? focusStyles
      : blurStyle;

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.container,
      styling.container,
      {
        height,
      }]}>
        {type == INPUT_TYPES.PHONE ? (
          <PhoneInput
            ref={phoneRef}
            defaultValue={state.value}
            defaultCode={state.countryCode}
            layout="first"
            onChangeText={_handleChangeText}
            countryPickerProps={{ withAlphaFilter: true }}
            disabled={disabled}
            autoFocus={autoFocus}
            renderDropdownImage={<Image source={Images.icChevron} />}
            placeholder={label}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneInputWrapper}
            flagButtonStyle={styles.flagButtonStyle}
            codeTextStyle={[
              styles.codeTextStyle,
              {
                color: state.isError ? constants.ERROR_COLOR : Colors.white
              }
            ]}
            textInputStyle={[
              styles.phoneInput,
              {
                color: disabled ? Colors.disable : Colors.white
              }
            ]}
            textInputProps={{
              ...props,
              ref: innerRef,
              value: state.value,
              placeholderTextColor: state.isError ? constants.ERROR_COLOR : constants.BLUR_COLOR,
              onFocus: _handleFocus,
              onBlur: _handleBlur,
              selectionColor: Colors.white,
            }}
          />
        ) : (
          <>
            <View style={[styles.inputContainer, { height }]}>
              <TextInput
                {...props}
                ref={innerRef}
                value={state.value}
                onChangeText={_handleChangeText}
                onFocus={_handleFocus}
                onBlur={_handleBlur}
                autoCorrect={false}
                secureTextEntry={state.secureTextEntry}
                multiline={multiline ?? false}
                editable={!disabled}
                style={[
                  styles.textfield,
                  inputStyle,
                  {
                    height,
                    color: disabled ? Colors.disable : Colors.white,
                    paddingTop:
                      constants.LABEL_TOP_POSITION +
                      _labelHeight +
                      constants.SPACING / 2,
                  },
                ]}
              />

              {renderRight()}
            </View>
            <Animated.View
              pointerEvents="none"
              style={[styles.labelContainer, labelStyle]}>
              <Animated.Text
                onLayout={_handleLabelLayout}
                numberOfLines={1}
                style={[styles.label, labelScale, styling.label]}>
                {label}
              </Animated.Text>
            </Animated.View>
          </>
        )}
      </View>
      {renderError()}
    </View>
  );
});

index.propTypes = {
  height: PropTypes.number.isRequired,
};

index.defaultProps = {
  height: 66,
  value: '',
  error: '',
  secureTextEntry: false,
};
export default memo(index);
