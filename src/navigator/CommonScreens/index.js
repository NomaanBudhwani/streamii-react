import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LinkedAccounts } from '../../containers';
import { title } from '../navigatorHelper';

const Stack = createStackNavigator();

export const linkedAccounts = (headerTitle = 'Linked Account', options = {}, params) => (
  <Stack.Screen
    initialParams={params}
    name="LinkedAccounts"
    component={LinkedAccounts}
    options={{
      ...title(headerTitle),
      ...options
    }}
  />
)

