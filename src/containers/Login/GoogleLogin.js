import React, { useCallback, useEffect, useRef } from 'react'
import { View, Text, Platform } from 'react-native'
import { ImageButton } from '../../reuseableComponents'
import { AppStyles, Images, Metrics } from '../../theme'
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import utility from '../../utility'
import { deviceId } from '../../reuseableFunctions';
const GoogleSignIn = (props) => {

  const { onSignin } = props

  useEffect(() => {
    GoogleSignin.configure();
  }, [])

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      const payload = {
        name: user.givenName + ' ' + user.familyName,
        email: user.email,
        platform_id: user.id,
        'platform_type': 'google',
        device_type: Platform.OS,
        device_token: deviceId(),
        image_url: user.photo ?? null
      }
      onSignin(payload)
    } catch (error) {
      global.log({ error });
    }
  }

  return (
    <ImageButton
      round
      source={Images.icGoogle}
      style={{ marginLeft: Metrics.smallMargin }}
      onPress={googleSignIn}
    />
  )
}

export default GoogleSignIn
