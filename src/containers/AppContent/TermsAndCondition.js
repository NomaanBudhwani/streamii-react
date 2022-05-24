import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Metrics, Fonts, Colors } from '../../theme';

const index = (props) => {

   const { } = props

   const _renderLabel = (text) => {
      return (
         <Text style={{
            marginVertical: Metrics.baseMargin,
            ...Fonts.SemiBold(18),
            color: Colors.white
         }}>
            {text}
         </Text>
      )
   }

   const _renderText = () => {
      return (
         <Text style={{ ...Fonts.Regular(16), color: Colors.inactive }}>
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "}
         </Text>
      )
   }

   return (
      <View style={[styles.container, { paddingHorizontal: Metrics.baseMargin }]}>
         {_renderLabel("Current version: 1.0")}
         {_renderText()}
         {_renderLabel("Registration")}
         {_renderText()}
         {_renderLabel("Cookies")}
         {_renderText()}
         {_renderLabel("Security")}
         {_renderText()}
      </View>
   )
}

export default index
