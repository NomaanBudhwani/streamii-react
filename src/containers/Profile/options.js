import React, { useCallback, useRef } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { AppStyles, Colors, Fonts, Images } from '../../theme';
import { Text } from '../../reuseableComponents/Typography';

export const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    const { name } = route;
    const _source = name == 'MyPosts' ? Images.icGrid : Images.icTagPerson

    return (<Image source={_source} style={{ tintColor: color }} />)
  }
})

export const tabBarOptions = {
  showIcon: true,
  showLabel: false,
  inactiveTintColor: Colors.inactive,
  activeTintColor: Colors.white,
  indicatorStyle: { backgroundColor: Colors.white },
  style: { borderBottomWidth: 2, borderBottomColor: Colors.shark }
}

const styles = StyleSheet.create({
  title: {
    ...Fonts.SemiBold(12),
    ...AppStyles.leftMargin10
  }
})
