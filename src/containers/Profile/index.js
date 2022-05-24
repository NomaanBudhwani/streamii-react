import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ImageButton, Loader } from '../../reuseableComponents';
import { showBottomSheet } from '../../reuseableFunctions';
import { AppStyles, Images } from '../../theme';
import { BS_CONTENT_TYPES } from '../../theme/String';
import Header from './header';
import MyPosts from './MyPosts';
import { screenOptions, tabBarOptions } from './options';
import TaggedPosts from './TaggedPosts';
import { useMergeState } from '../../hooks'
import { useSelector } from 'react-redux';
import { getUser } from '../../CommonApis';

const Tab = createMaterialTopTabNavigator();
let userForHeaderRight = null;

const index = props => {
  //user id required to fetch user
  const { route: { params, name }, navigation } = props;
  const profileType = name == 'Profile' ? 'own' : 'other'
  const loggedInUser = useSelector(({ user }) => user.data)

  const [state, setState] = useMergeState({
    user: null
  });

  useEffect(() => {
    let userSlug = null
    if (profileType == 'other') {
      userSlug = params.userSlug
    } else {
      userSlug = loggedInUser.slug
    }

    getUser(userSlug, (user) => {
      userForHeaderRight = user
      setState({ user })
      if (profileType == 'other') {
        navigation.setOptions({ headerRight: renderHeaderRight })
      }
    })
  }, [])

  useEffect(() => {
    if (loggedInUser && profileType == 'own') {
      setState({ user: loggedInUser })
    }
  }, [loggedInUser])

  const renderHeaderRight = () => {
    return (
      <ImageButton
        source={Images.icVerticalDots}
        style={AppStyles.headerMargin}
        onPress={showProfileOptions}
      />
    )
  }

  const renderHeader = () => {
    return (
      <Header
        user={state.user}
        profileType={profileType}
      />
    );
  };

  const showProfileOptions = () => {
    showBottomSheet({
      contentType: BS_CONTENT_TYPES.POST_PROFILE_OPTIONS,
      data: userForHeaderRight,
      type: 'user',
      height: 180
    })
  }

  return (
    <SafeAreaView style={[AppStyles.flex]}>
      {
        state.user ?
          <>
            {renderHeader()}
            <Tab.Navigator
              lazy={true}
              screenOptions={screenOptions}
              tabBarOptions={tabBarOptions}>
              <Tab.Screen
                name="MyPosts"
                component={MyPosts}
                initialParams={{
                  user: state.user,
                  name: `${profileType}MyPost`
                }}
              />
              <Tab.Screen
                name="TaggedPosts"
                component={TaggedPosts}
                initialParams={{
                  user: state.user,
                  name: `${profileType}TaggedPosts`
                }} />
            </Tab.Navigator>
          </>
          :
          <Loader />
      }
    </SafeAreaView>
  );
};

export default index;
