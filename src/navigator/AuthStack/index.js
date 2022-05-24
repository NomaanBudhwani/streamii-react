import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ArtistType, Follow, ForgotPassword, Login, Signup, UserType } from '../../containers';
import {
  commonNavigatorConfig,
  headerTransparent,
  removeHeaderTitle
} from '../navigatorHelper';
import { linkedAccounts } from '../CommonScreens';

const Stack = createStackNavigator();

export default AuthStack = ({ navigation }) => (
  <Stack.Navigator
    // initialRouteName="LinkedAccounts"
    screenOptions={{
      ...commonNavigatorConfig,
    }}>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        ...headerTransparent,
        ...removeHeaderTitle,
        headerLeft: null
      }}
    />
    <Stack.Screen
      name="UserType"
      component={UserType}
      options={{
        ...headerTransparent,
        ...removeHeaderTitle,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        ...headerTransparent,
        ...removeHeaderTitle
      }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        ...headerTransparent,
        ...removeHeaderTitle
      }}
    />
    <Stack.Screen
      name="Follow"
      component={Follow}
      options={{
        ...removeHeaderTitle,
        headerLeft: null
      }}
    />
    {linkedAccounts(
      'Complete Your Profile ',
      { headerLeft: null },
    )}
  </Stack.Navigator>
)