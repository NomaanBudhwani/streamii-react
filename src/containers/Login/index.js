import React, { useCallback, useContext, useEffect, useRef } from 'react';
import {
  ImageBackground, Platform, SafeAreaView, ScrollView, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../actions/ActionTypes';
import { logout, request } from '../../actions/ServiceAction';
import constants from '../../constants';
import { LoginContext } from '../../contexts';
import { useKeyboard } from '../../hooks';
import {
  AppButton, FormHandler, Separator, TextButton, Textfield
} from '../../reuseableComponents';
import { INPUT_TYPES } from '../../reuseableComponents/FormHandler/constants';
import { Headline, Paragraph } from '../../reuseableComponents/Typography';
import { deviceId, hideSplash } from '../../reuseableFunctions';
import { navigate } from '../../services/NavigationService';
import { AppStyles, Colors, Images, Metrics } from '../../theme';
import utility from '../../utility';
import AppleLogin from './AppleLogin';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import styles from './styles';
import HttpServiceManager from '../../services/HttpServiceManager'

const index = props => {
  const { } = props;
  const formRef = useRef(null);
  const keyboard = useKeyboard();
  const { setLogin } = useContext(LoginContext)
  const dispatch = useDispatch()
  const userType = useSelector(({ userType }) => userType.userType)

  useEffect(() => {
    hideSplash()
    dispatch(logout())
  }, [])

  const onSocialLogin = (payload) => {
    global.log({ social: payload });
    dispatch(
      request(
        constants.socialLogin,
        constants.serviceTypes.POST,
        {
          ...payload,
          user_type: userType?.id ?? 'fan',
          latitude: 123456,
          longitude: 123456,
        },
        USER,
        true,
        false,
        cbOnSuccess
      )
    )
  };

  const renderSocialButtons = () => {
    return (
      <>
        <FacebookLogin
          onSignin={onSocialLogin}
        />
        <GoogleLogin
          onSignin={onSocialLogin}
        />
        {
          utility.isPlatformIOS() &&
          <AppleLogin
            onSignin={onSocialLogin}
          />
        }
      </>
    );
  };

  const renderTextfields = useCallback(() => {
    return (
      <FormHandler ref={formRef}>
        <Textfield
          label="Your Email"
          identifier="email"
          type={INPUT_TYPES.EMAIL}
        />
        <Textfield
          label="Enter Password"
          identifier="password"
          type={INPUT_TYPES.PASSWORD}
        />
      </FormHandler>
    );
  }, []);

  const login = () => {
    const formdata = formRef.current.submitForm()
    if (formdata) {
      const payload = {
        email: formdata.email,
        password: formdata.password,
        device_type: Platform.OS,
        device_token: deviceId(),
      }
      dispatch(
        request(
          constants.login,
          constants.serviceTypes.POST,
          payload,
          USER,
          true,
          false,
          cbOnSuccess
        )
      )
    }
  }

  const cbOnSuccess = (user) => {
    HttpServiceManager.getInstance().userToken = user.api_token;
    if (user.is_first_login == "0") {
      navigate('LinkedAccounts')
    } else {
      global.log('login');
      setLogin(true)
    }
  }

  return (
    <ImageBackground source={Images.bgLogin} style={AppStyles.percent100}>
      <View
        style={[
          AppStyles.headerTopMargin,
          AppStyles.flex,
          AppStyles.hBaseMargin,
        ]}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={keyboard.visible}>
          <Headline style={styles.headline}>Log in to StreamMii</Headline>
          <Paragraph style={styles.txtWelcome}>
            {
              'Welcome! Sign in using your social account \nor email to continue'
            }
          </Paragraph>
          <View style={styles.socialContainer}>{renderSocialButtons()}</View>
          <Separator
            title="OR"
            width={Metrics.widthRatio(263)}
            style={styles.separator}
          />

          <View style={styles.inputContainer}>{renderTextfields()}</View>

          <TextButton
            onPress={() => navigate('ForgotPassword')}
            title="Forgot Password"
            textColor={Colors.white}
            style={styles.forgot}
          />

          <SafeAreaView style={styles.bottomContainer}>
            <AppButton title="Login" onPress={login} />
            <View style={styles.signupContainer}>
              <Paragraph color={Colors.white}>
                {`Don’t have an account? `}
              </Paragraph>
              <TextButton
                onPress={() => navigate('UserType')}
                title="Sign Up"
                textColor={Colors.link}
                underline
              />
            </View>
          </SafeAreaView>

        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default index;
