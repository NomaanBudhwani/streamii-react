import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Headline, Paragraph } from '../../reuseableComponents/Typography';
import { AppStyles, Images, Metrics } from '../../theme';
import loginStyles from '../Login/styles';
import { AppButton, FormHandler, Textfield } from '../../reuseableComponents';
import { INPUT_TYPES } from '../../reuseableComponents/FormHandler/constants';
import { pop } from '../../services/NavigationService';
import utility from '../../utility';
import { useDispatch } from 'react-redux';
import { request } from '../../actions/ServiceAction';
import constants from '../../constants'
import { showAlert } from '../../reuseableFunctions';

const index = props => {
  const { } = props;
  const emailRef = useRef();
  const dispatch = useDispatch()

  const cbOnSuccess = (data, meta, message) => {
    showAlert({
      title: 'Success',
      message,
      canChoose: false,
      onRightPress: () => pop()
    })
  }

  const onSubmit = () => {
    emailRef.current?.getInnerRef()?.current?.blur()
    const email = emailRef.current.getValue()

    if (utility.isEmpty(email)) {
      emailRef.current.setError(true, 'Email is required')
    } else if (!utility.validateEmail(email)) {
      emailRef.current.setError(true, 'Enter valid email')
    } else {
      dispatch(
        request(
          constants.forgotPassword,
          constants.serviceTypes.POST,
          { email },
          null,
          true,
          false,
          cbOnSuccess
        )
      )
    }

  };

  return (
    <ImageBackground source={Images.bg} style={AppStyles.percent100}>
      <View
        style={[
          AppStyles.headerTopMargin,
          AppStyles.flex,
          AppStyles.hBaseMargin,
        ]}>
        <Headline style={loginStyles.headline}>Forgot Password?</Headline>
        <Paragraph style={[AppStyles.txtCenter, AppStyles.vBaseMargin]}>
          {'Enter the email address associated with \nyour account.'}
        </Paragraph>
        <View style={[AppStyles.flex, AppStyles.justiFyCenter]}>
          <Textfield
            ref={emailRef}
            label="Your Email"
            identifier="email"
            type={INPUT_TYPES.EMAIL}
          />
          <AppButton title="Submit" style={styles.btn} onPress={onSubmit} />
        </View>
        <Paragraph style={[AppStyles.txtCenter, styles.txtReset]}>
          {'We will email you a link to reset your \npassword.'}
        </Paragraph>
        <SafeAreaView />
      </View>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  txtReset: {
    marginBottom: Metrics.heightRatio(40),
  },
  btn: {
    marginTop: Metrics.heightRatio(30),
  },
});
