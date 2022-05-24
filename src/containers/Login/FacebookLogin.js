import React, { useCallback, useRef } from 'react'
import { View, Text, Platform } from 'react-native'
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import { ImageButton } from '../../reuseableComponents';
import { deviceId } from '../../reuseableFunctions';
import { Images, Metrics } from '../../theme';

const FacebookSignIn = (props) => {

  const { onSignin } = props

  fbSignIn = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
        } else {

          AccessToken.getCurrentAccessToken().then((data) => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
              } else {
                const payload = {
                  name: result.first_name + ' ' + result.last_name,
                  email: result.email,
                  platform_id: result.id,
                  'platform_type': 'facebook',
                  device_type: Platform.OS,
                  device_token: deviceId(),
                  image_url: result.picture?.data?.url ?? null
                }
                onSignin(payload)
                LoginManager.logOut(); //logout fb
              }
            };
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string:
                      'email,name,first_name,middle_name,last_name,picture.type(large)',
                  },
                },
              },
              responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        global.log('Login failed with error: ' + error);
      },
    );
  };

  return (
    <ImageButton
      round
      source={Images.icFb}
      style={{ marginRight: Metrics.smallMargin }}
      onPress={fbSignIn}
    />
  )
}

export default FacebookSignIn
