import React, { useEffect, useRef } from 'react';
import {
  ImageBackground, Platform, SafeAreaView, ScrollView, View
} from 'react-native';
import { useSelector } from 'react-redux';
import loginStyles from '../../containers/Login/styles';
import {
  AppButton,
  FormHandler,
  TextButton,
  Textfield
} from '../../reuseableComponents';
import Dropdown from '../../reuseableComponents/Dropdown';
import { INPUT_TYPES } from '../../reuseableComponents/FormHandler/constants';
import { Headline, Paragraph } from '../../reuseableComponents/Typography';
import { navigate, pop } from '../../services/NavigationService';
import { AppStyles, Colors, Images } from '../../theme';
import { USER_TYPES } from '../../theme/String';
import { artistForm, fanForm } from './formValues';
import styles from './styles';
import { useMergeState } from '../../hooks'
import { deviceId, showAlert } from '../../reuseableFunctions';
import { useDispatch } from 'react-redux';
import { request } from '../../actions/ServiceAction';
import constants from '../../constants'
import { USER } from '../../actions/ActionTypes';

const index = props => {
  const { } = props;
  const formRef = useRef(null)
  const { userType: { userType }, artistTypes, musicTypes } = useSelector((state) => state)
  const [state, setState] = useMergeState({
    form: userType.id === USER_TYPES.ARTIST.id ? artistForm : fanForm
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (userType.id === USER_TYPES.ARTIST.id) {
      const _form = state.form
      _form[4] = { ..._form[4], data: musicTypes.data }
      _form[5] = { ..._form[5], data: artistTypes.data }
      setState({
        form: _form
      })
    }
  }, [musicTypes.data, artistTypes.data])

  const onSubmit = () => {
    const formdata = formRef.current.submitForm()

    if (formdata) {
      const payload = {
        name: formdata.fName,
        username: formdata.uName,
        email: formdata.email,
        mobile_no: formdata.phoneNum.value,
        password: formdata.password,
        confirm_password: formdata.cPassword,
        device_type: Platform.OS,
        device_token: deviceId(),
        artist_type_id: formdata.artistType,
        music_genre_id: formdata.musicGenre,
        user_type: userType.id,
      }
      dispatch(
        request(
          constants.user,
          constants.serviceTypes.POST,
          payload,
          null,
          true,
          false,
          cbOnSuccess
        )
      )
    }

  };

  const cbOnSuccess = (data, meta, message) => {
    showAlert({
      title: 'Success',
      message,
      canChoose: false,
      onRightPress: () => navigate('Login')
    })
  }

  const renderForm = (item, index) => {
    if (item.type == INPUT_TYPES.SELECTABLE) {
      return (
        <Dropdown
          key={item.identifier}
          identifier={item.identifier}
          placeholder={item.label}
          data={item.data}
          schema={item.schema}
          type={item.type}
          error={item.error}
        />
      );
    }
    return (
      <Textfield
        key={item.identifier}
        label={item.label}
        identifier={item.identifier}
        type={item.type}
        maxLength={item.length}
        error={item.error}
      />
    );
  };

  return (
    <ImageBackground source={Images.bg} style={AppStyles.percent100}>
      <View
        style={[
          AppStyles.headerTopMargin,
          AppStyles.flex,
          AppStyles.hBaseMargin,
        ]}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={AppStyles.listStyle}
            showsVerticalScrollIndicator={false}>
            <Headline style={styles.headline}>Sign up with Email</Headline>
            <Paragraph style={[AppStyles.txtCenter, AppStyles.vBaseMargin]}>
              Let’s get started
            </Paragraph>
            <FormHandler ref={formRef}>
              {state.form.map(renderForm)}
            </FormHandler>

            <AppButton
              title="Create an account"
              style={styles.btn}
              onPress={onSubmit}
            />
            <View style={loginStyles.signupContainer}>
              <Paragraph style={styles.agree}>
                {`By signing up you agree to our`}
              </Paragraph>
              <TextButton
                title="Privacy Policy"
                textColor={Colors.link}
                textStyle={styles.agree}
                underline
              />
              <Paragraph>and</Paragraph>
              <TextButton
                title="Terms"
                textColor={Colors.link}
                textStyle={styles.agree}
                underline
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default index;
