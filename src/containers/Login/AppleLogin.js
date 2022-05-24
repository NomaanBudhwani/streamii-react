import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import { ImageButton } from '../../reuseableComponents';
import { Images, Metrics } from '../../theme';
import { deviceId } from '../../reuseableFunctions';

export default function RootComponent(props) {
  const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
  const { onSignin } = props
  let user = null;
  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      global.log('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);

  async function fetchAndUpdateCredentialState() {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  async function onAppleButtonPress() {
    global.log('Beginning Apple Authentication');

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const { user, fullName: { givenName, familyName }, email } = appleAuthRequestResponse;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );

      global.log(`Apple Authentication Completed, ${user}, ${email}`);

      const fname = givenName ?? ''
      const lname = familyName ? ` ${familyName}` : ''
      const payload = {
        name: fname + lname,
        email: email,
        platform_id: user,
        platform_type: 'apple',
        device_type: Platform.OS,
        device_token: deviceId(),
        image_url: null,
      }
      onSignin(payload)
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        global.log('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }


  if (!appleAuth.isSupported) {
    return null
  }

  return (
    <ImageButton
      round
      source={Images.icApple}
      style={{ marginLeft: Metrics.baseMargin }}
      onPress={onAppleButtonPress}
    />
  );
}
