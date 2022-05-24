import React, { useEffect } from 'react'
import { View, } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabBarOptions } from './options';
import { AppStyles } from '../../theme';
import Followers from './Followers'
import Following from './Following'

const Tab = createMaterialTopTabNavigator();

const FollowersFollowingTabs = (props) => {
  const { navigation, route: { params } } = props

  useEffect(() => {
    navigation.setParams({ title: params.user.name })
  }, [])

  return (
    <View style={AppStyles.flex}>
      <Tab.Navigator
        lazy={true}
        tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name="Followers"
          component={Followers}
          options={{
            tabBarLabel: `${params.user.no_of_followers} Followers`
          }}
        />
        <Tab.Screen
          name="Following"
          component={Following}
          options={{
            tabBarLabel: `${params.user.no_of_following} Following`
          }}
        />
      </Tab.Navigator>
    </View>
  );
}



export default FollowersFollowingTabs
