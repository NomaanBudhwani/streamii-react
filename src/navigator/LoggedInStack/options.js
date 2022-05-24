import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { Images, Colors, Metrics, Fonts, AppStyles } from '../../theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Headline } from '../../reuseableComponents/Typography';
import { headerTransparent, removeHeaderTitle, title } from '../navigatorHelper';
import { ImageButton } from '../../reuseableComponents';
import { navigate } from '../../services/NavigationService';

export const screenOptions = route => ({
  tabBarIcon: ({ focused, color, size }) => {
    const { name } = route;
    return (
      <Image
        style={{ tintColor: name == 'PostModal' ? undefined : color }}
        resizeMode="contain"
        source={Images[name]}
      />
    );
  },
});

export const tabBarOptions = {
  labelStyle: {
    ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Regular, 12),
  },
  style: {
    borderTopColor: Colors.lynch
  },
  activeTintColor: Colors.theme,
  inactiveTintColor: Colors.inactive,
  keyboardHidesTabBar: true,
};

export const tabOptions = ({ route, navigation }) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return {
        headerLeft: () => <Headline style={styles.title}>StreamMii</Headline>,
        headerRight: () => (
          <ImageButton
            noPadding
            source={Images.icSearchWithBg}
            style={AppStyles.headerMargin}
            onPress={() => navigate('Search')}
            round
          />
        ),
        ...removeHeaderTitle,
      };
    case 'Tokens':
      return {
        ...title('Tokens'),
        headerLeft: () => null,
        ...headerTransparent
      }
    case 'Chat':
      return {
        ...title('Chat'),
        headerLeft: () => null,
        headerRight: () => (
          <ImageButton
            noPadding
            round
            source={Images.icEditBlue}
            style={AppStyles.headerMargin}
            onPress={() => navigate('NewMessage')}
          />
        ),
      };
    case 'Notifications':
      return {
        ...title('Notifications'),
        headerLeft: () => null,
      };
    case 'Profile':
      return {
        headerLeft: () => <Headline style={styles.title}>StreamMii</Headline>,
        headerRight: () => (
          <ImageButton
            noPadding
            source={Images.icSettings}
            style={AppStyles.headerMargin}
            onPress={() => navigate('Settings')}
            round
          />
        ),
        ...removeHeaderTitle,
      };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  title: {
    marginLeft: Metrics.baseMargin,
  },
});
