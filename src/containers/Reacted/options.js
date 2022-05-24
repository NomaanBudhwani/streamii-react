import React, { useCallback, useRef } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import { Text } from '../../reuseableComponents/Typography';

export const screenOptions = (route) => ({
  tabBarIcon: ({ focused, color, size }) => {
    const { name } = route;
    const _source = name == 'Likes' ? (focused ? Images.icLiked : Images.icUnliked) :
      (focused ? Images.icDisliked : Images.icUnDisliked)

    return (<Image source={_source} />)
  }
})

export const tabBarOptions = {
  showIcon: true,
  labelStyle: {
    textTransform: 'none',
    ...Fonts.font(
      Fonts.FontFamily.default,
      Fonts.Type.SemiBold,
      12,
    ),
  },
  tabStyle: { flexDirection: 'row' },
  inactiveTintColor: Colors.inactive
}

const styles = StyleSheet.create({
  title: {
    ...Fonts.SemiBold(12),
    ...AppStyles.leftMargin10
  }
})
