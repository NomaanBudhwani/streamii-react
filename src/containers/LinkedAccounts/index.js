import React, {
  forwardRef, useCallback, useEffect,
  useImperativeHandle, useRef, useState
} from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView } from 'react-native';
import {
  AppButton,
  Avatar,
  FormHandler,
  TextButton,
  Textfield,
} from '../../reuseableComponents';
import { AppStyles, Colors, Images, Metrics } from '../../theme';
import styles from './styles';
import accountTypes from './accountTypes';
import { Headline } from '../../reuseableComponents/Typography';
import { INPUT_TYPES } from '../../reuseableComponents/FormHandler/constants';
import { navigate, pop } from '../../services/NavigationService';
import { useDispatch } from 'react-redux';
import { request } from '../../actions/ServiceAction';
import constants from '../../constants'
import { useSelector } from 'react-redux';
import { USER } from '../../actions/ActionTypes';
import { updateUser } from '../../CommonApis';
import { useMergeState } from '../../hooks';
import { hideSplash, pickImage } from '../../reuseableFunctions';
import _ from 'lodash';

const index = props => {
  const { navigation } = props;
  const formRef = useRef(null);
  const user = useSelector(({ user }) => user.data)
  const showAccOnly = props.route.params?.showAccOnly
  const bioRef = useRef()

  const [state, setState] = useMergeState({
    image: user?.image_url ? { url: user.image_url } : null,
    imageChanged: false
  })

  useEffect(() => {
    hideSplash()
    if (!showAccOnly) {
      updateUser(user.slug, { is_first_login: 1 }, undefined, false)
      navigation.setOptions({ headerRight: renderHeaderRight })
    }

  }, [])

  const renderHeaderRight = () => {
    return (
      <TextButton
        title={'Skip'}
        style={AppStyles.headerMargin}
        onPress={() => navigate('Follow')}
        textColor={Colors.theme}
      />
    )
  }

  const pickAvatar = async () => {
    const image = await pickImage()
    image &&
      setState({
        image,
        imageChanged: true
      })
  }

  const onSubmit = () => {
    const { image, imageChanged } = state
    global.log({ bioRef });
    const bio = bioRef?.current?.getValue()
    const {
      facebook, instagram, twitter, snapchat,
      youtube, weblink
    } = formRef.current.submitForm()
    const payload = new FormData();

    imageChanged && payload.append('image_url', {
      uri: image.url,
      name: `image.${image.ext}`,
      type: image.type,
    })
    !_.isEmpty(bio) && payload.append('bio', bio)
    !_.isEmpty(facebook) && payload.append('facebook_url', facebook)
    !_.isEmpty(instagram) && payload.append('instagram_url', instagram)
    !_.isEmpty(twitter) && payload.append('twitter_url', twitter)
    !_.isEmpty(snapchat) && payload.append('snapchat_url', snapchat)
    !_.isEmpty(youtube) && payload.append('youtube_url', youtube)
    !_.isEmpty(weblink) && payload.append('weblink_url', weblink)

    if (payload._parts.length) {
      updateUser(user.slug, payload, cbOnSuccess)
    } else {
      cbOnSuccess()
    }

  };

  const cbOnSuccess = () => {
    if (showAccOnly) {
      pop()
    } else {
      navigate('Follow');
    }
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBaseMargin]}>
      <ScrollView contentContainerStyle={AppStyles.listStyle}>
        {!showAccOnly && (
          <>
            <Avatar
              showPlusSign
              source={
                state.image ?
                  { uri: state.image.url }
                  :
                  Images.pickerPlaceholder
              }
              size={90}
              onPress={pickAvatar}
              style={styles.avatar}
            />
            <Textfield ref={bioRef} height={135} multiline label="Bio" />
          </>
        )}
        <View style={AppStyles.vBaseMargin}>
          {!showAccOnly && (<Headline size={14}>Linked Accounts</Headline>)}
          <View style={[AppStyles.vBaseMargin, AppStyles.flexRow]}>
            <View style={{ justifyContent: 'space-between' }}>
              {accountTypes.map(account => (
                <Avatar
                  key={account.image + ''}
                  source={account.image}
                  size={35}
                  style={styles.icons}
                />
              ))}
            </View>
            <View style={[AppStyles.flex, { justifyContent: 'space-between' }]}>
              <FormHandler ref={formRef}>
                {accountTypes.map(account => (
                  <Input
                    identifier={account.identifier}
                    optional={true}
                    type={INPUT_TYPES.TEXT}
                    key={account.identifier}
                    placeholder={account.placeholder}
                  />
                ))}
              </FormHandler>
            </View>
          </View>
        </View>

        <AppButton title="Save" onPress={onSubmit} />
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

export default index;

const Input = forwardRef((props, ref) => {
  const [value, setvalue] = useState(props.value ?? '');
  const innerRef = useRef();

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setFocus: () => innerRef.current.focus(),
  }));

  return (
    <TextInput
      {...props}
      ref={innerRef}
      placeholder={props.placeholder}
      placeholderTextColor={Colors.white}
      onChangeText={text => setvalue(text)}
      autoCapitalize={'none'}
      autoCompleteType={'off'}
      style={styles.textinput}
    />
  );
});
