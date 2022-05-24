import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { AppStyles, Colors } from '../../theme';
import { screenOptions, tabBarOptions } from './options';
import ReactedList from './ReactedList';

const Tab = createMaterialTopTabNavigator();

const ReactedTabs = (props) => {

  const { route: { params } } = props
  const routeName = getFocusedRouteNameFromRoute(props.route) ?? 'Likes'
  const _color = routeName == 'Likes' ? Colors.like : Colors.dislike

  global.log({ params });
  return (
    <View style={AppStyles.flex}>
      <Tab.Navigator
        screenOptions={({ route }) => screenOptions(route)}
        tabBarOptions={{
          ...tabBarOptions,
          activeTintColor: _color,
          indicatorStyle: { backgroundColor: _color }
        }}>
        <Tab.Screen
          name="Likes"
          component={ReactedList}
          initialParams={{
            postId: params.postId,
            type: 'like'
          }}
          options={{
            tabBarLabel: params.likeCount + ''
          }}
        />
        <Tab.Screen
          name="Dislikes"
          component={ReactedList}
          initialParams={{
            postId: params.postId,
            type: 'dislike'
          }}
          options={{
            tabBarLabel: params.dislikeCount + ''
          }}
        />
      </Tab.Navigator>
    </View>
  );
}



export default ReactedTabs
