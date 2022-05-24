import _ from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  SafeAreaView, ScrollView, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { updateUser } from '../../CommonApis';
import { gender as genders } from '../../data';
import { useMergeState } from '../../hooks';
import {
  Avatar,
  DateTimePicker,
  FormHandler,
  ImageButton,
  Textfield
} from '../../reuseableComponents';
import Dropdown from '../../reuseableComponents/Dropdown';
import { INPUT_TYPES } from '../../reuseableComponents/FormHandler/constants';
import { pickImage } from '../../reuseableFunctions';
import { pop } from '../../services/NavigationService';
import { AppStyles, Images } from '../../theme';
import { artistForm, fanForm } from './formValues';
import styles from './styles';

const index = props => {

  const { navigation, route: { params } } = props;
  const { artistTypes, musicTypes, user } = useSelector((state) => state)
  const formRef = useRef()
  const stateRef = useRef()

  const [state, setState] = useMergeState({
    renderForm: false,
    image: null,
    name: '',
    username: '',
    email: '',
    phone: '',
    countryCode: params.countryCode,
    artistType: null,
    musicGenre: null,
    gender: null,
    dob: null,
    bio: '',
    artistTypes: artistTypes.data ?? [],
    musicTypes: musicTypes.data ?? [],
    genders,
    imageChanged: false
  })

  useEffect(() => {
    populateEditForm()
    navigation.setOptions({ headerRight: renderSaveButton })
  }, [])

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const form = useMemo(() => {

    if (user.data.user_type == 'fan') {
      return fanForm
    }
    return artistForm
  }, [user.data.user_type])

  const populateEditForm = () => {
    const { image_url, name, username, email,
      mobile_no, artist_type, music_genre,
      gender, date_of_birth, bio } = user.data

    const _gender = _.find(genders, ['title', gender])

    setState({
      renderForm: true,
      image: { url: image_url },
      name,
      username,
      email,
      phone: mobile_no ? mobile_no.split('-')[1] : '',
      artistType: artist_type,
      musicGenre: music_genre,
      gender: _gender,
      dob: date_of_birth,
      bio
    })
  }

  const renderSaveButton = () => {
    return (
      <ImageButton
        noPadding
        source={Images.icSave}
        style={[AppStyles.headerMargin]}
        onPress={onSubmit}
      />
    )
  }

  const onSubmit = () => {
    const formdata = formRef.current.submitForm()
    const payload = new FormData()
    const { image, imageChanged } = stateRef.current

    global.log({ formdata });
    if (formdata) {
      imageChanged && payload.append('image_url', {
        uri: image.url,
        name: `image.${image.ext}`,
        type: image.type,
      })
      payload.append('name', formdata.name)
      payload.append('username', formdata.username)
      payload.append('email', formdata.email)
      payload.append('mobile_no', formdata.phone.value)
      payload.append('music_genre_id', formdata.musicGenre)
      payload.append('artist_type_id', formdata.artistType)
      !_.isEmpty(formdata.gender) && payload.append('gender',
        (formdata.gender).charAt(0).toUpperCase() + (formdata.gender).slice(1))
      !_.isEmpty(formdata.dob) && payload.append('date_of_birth', formdata.dob)
      !_.isEmpty(formdata.bio) && payload.append('bio', formdata.bio)

      updateUser(user.data.slug, payload, () => pop())
    }


  };

  const pickAvatar = async () => {
    const image = await pickImage()
    image &&
      setState({
        image,
        imageChanged: true
      })
  }

  const renderForm = (item, index) => {
    const value = state[item.identifier]
    if (item.type == INPUT_TYPES.SELECTABLE) {
      return (
        <Dropdown
          key={item.identifier}
          identifier={item.identifier}
          placeholder={item.label}
          data={state[item.data]}
          schema={item.schema}
          type={item.type}
          error={item.error}
          defaultValue={value}
          optional={item.optional}
          disabled={item.disabled}
        />
      );
    }
    else if (item.type == INPUT_TYPES.DATETIME) {
      return (
        <DateTimePicker
          key={item.identifier}
          identifier={item.identifier}
          type={item.type}
          placeholder={item.label}
          defaultValue={value}
          optional={item.optional}
          disabled={item.disabled}
        />
      );
    }

    return (
      <Textfield
        key={item.identifier}
        value={value}
        countryCode={state.countryCode ?? 'US'}
        label={item.label}
        identifier={item.identifier}
        type={item.type}
        maxLength={item.length}
        error={item.error}
        height={item.height}
        multiline={item.multiline}
        optional={item.optional}
        disabled={value ? item.disabled : false}
      />
    );
  }

  return (
    <SafeAreaView style={AppStyles.flex}>
      <View style={[AppStyles.flex, AppStyles.hBaseMargin]}>
        <ScrollView
          contentContainerStyle={AppStyles.listStyle}
          showsVerticalScrollIndicator={false}>
          {
            <Avatar
              showPlusSign
              source={
                state.image ?
                  { uri: state.image.url } :
                  Images.pickerPlaceholder
              }
              size={90}
              imgSize={state.image ? undefined : 42}
              style={styles.avatar}
              onPress={pickAvatar}
            />
          }
          {state.renderForm &&
            <FormHandler ref={formRef} values={state.username}>
              {form.map(renderForm)}
            </FormHandler>
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default index;
