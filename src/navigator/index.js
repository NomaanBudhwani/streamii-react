//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, { forwardRef, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginContext } from '../contexts';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import LoggedInStack from './LoggedInStack';
import {
  commonNavigatorConfig,
  removeHeader,
} from './navigatorHelper';

import { Colors } from '../theme';
import StickyFlatlist from '../../StickyFlatlist';

const Stack = createStackNavigator();

const rootNavigator = forwardRef((props, ref) => {

  const { isLogin } = useContext(LoginContext);
  const animationTypeForReplace = isLogin ? 'push' : 'pop'

  return (
    <NavigationContainer
      ref={ref}
      theme={{ colors: { background: Colors.greenishBlack } }}
    >
      <Stack.Navigator
        screenOptions={commonNavigatorConfig}>
        {
          isLogin ?
            <Stack.Screen
              name="LoggedInStack"
              component={LoggedInStack}
              options={{
                animationTypeForReplace,
                ...removeHeader
              }}
            />
            :
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{
                animationTypeForReplace,
                ...removeHeader
              }}
            />

        }
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default rootNavigator;
