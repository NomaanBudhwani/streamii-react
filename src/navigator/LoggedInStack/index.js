import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Chat,
  Home,
  Profile,
  Notifications,
  Tokens,
  FanProfile,
  Comments,
  Reacted,
  CreatePost,
  TagPeople,
  AddLocation,
  Search,
  FollowRequest,
  Settings,
  FAQs,
  TermsAndCondition,
  PrivacyPolicy,
  ChangePassword,
  BlockedUsers,
  NotificationSettings,
  EditProfile,
  FollowersAndFollowing,
  Support,
  ChatRoom,
  SupportArtist,
  BuyTokens,
  PostDetail,
  NewMessage,
} from '../../containers';
import { screenOptions, tabBarOptions, tabOptions } from './options';
import {
  headerBorderStyle,
  title,
  commonNavigatorConfig,
  removeHeaderTitle,
  removeBorder,
  headerTransparent,
} from '../navigatorHelper';
import { CreatePostModal } from '../../components';
import { LoginContext } from '../../contexts';
import { linkedAccounts } from '../CommonScreens';
import { navigate } from '../../services/NavigationService';
import { loggedInUser } from '../../data';
import { useSelector } from 'react-redux';
import { USER_TYPES } from '../../theme/String';
import singleton from '../../singleton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ArtistTabNav = () => {
  const { showPostModal } = useContext(LoginContext);
  return (
    <Tab.Navigator
      lazy={true}
      screenOptions={({ route }) => screenOptions(route)}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name="PostModal"
        component={CreatePostModal}
        options={{
          tabBarLabel: () => null,
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            showPostModal();
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigate('Profile');
          },
        })}
        options={{
          tabBarLabel: 'My Profile',
          title: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const FanTabNav = () => (
  <Tab.Navigator
    lazy={true}
    screenOptions={({ route }) => screenOptions(route)}
    tabBarOptions={tabBarOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="Tokens"
      component={BuyTokens}
      options={{
        tabBarLabel: 'Tokens',
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Notifications}
      options={{
        tabBarLabel: 'Notifications',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      listeners={() => ({
        tabPress: e => {
          e.preventDefault();
          navigate('Profile');
        },
      })}
      options={{
        tabBarLabel: 'My Profile',
      }}
    />
  </Tab.Navigator>
);

export default TabStack = ({ navigation }) => {
  const user = useSelector(({ user }) => user.data)
  return (
    <Stack.Navigator
      screenOptions={{
        ...commonNavigatorConfig,
        headerStyle: headerBorderStyle,
      }}>
      {
        user?.user_type == USER_TYPES.FAN.id ?
          <Stack.Screen
            name="FanTabNav"
            component={FanTabNav}
            options={tabOptions}
          />
          :
          <Stack.Screen
            name="ArtistTabNav"
            component={ArtistTabNav}
            options={tabOptions}
          />
      }
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          ...title('Comments'),
        }}
      />
      <Stack.Screen
        name="Reacted"
        component={Reacted}
        options={{
          ...title('People who reacted'),
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={({ route }) => ({
          ...title(route.params.title ?? 'New Post'),
        })}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{
          ...title('Add Location'),
        }}
      />
      <Stack.Screen
        name="TagPeople"
        component={TagPeople}
        options={{
          ...title('Tag People'),
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          ...removeHeaderTitle,
          headerTitleContainerStyle: { flex: 1, left: 15 },
          headerStyle: { ...removeBorder },
        }}
      />
      <Stack.Screen
        name="FollowRequest"
        component={FollowRequest}
        options={{
          ...title('Follow Requests'),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          ...title('Settings'),
        }}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{
          ...removeHeaderTitle,
          ...headerTransparent,
          ...removeBorder,
        }}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={{
          ...title('Terms And Condition'),
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          ...title('Privacy Policy'),
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          ...title('Change Password'),
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{
          ...title('Notifications'),
        }}
      />
      <Stack.Screen
        name="BlockedUsers"
        component={BlockedUsers}
        options={{
          ...title('Blocked Users'),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          ...title('Edit Profile'),
        }}
      />
      <Stack.Screen
        name="FollowersAndFollowing"
        component={FollowersAndFollowing}
        options={({ route }) => ({
          ...title(route.params.title ?? ''),
        })}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          ...removeHeaderTitle,
        }}
      />
      <Stack.Screen
        name="OtherProfile"
        component={Profile}
        options={{
          ...removeHeaderTitle,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ route }) => ({
          ...title(route.params?.title ?? ''),
        })}
      />
      <Stack.Screen
        name="BuyTokens"
        component={BuyTokens}
        options={({ route }) => ({
          headerTransparent: true,
          ...removeHeaderTitle,
          headerStyle: { ...removeBorder },
        })}
      />
      <Stack.Screen
        name="SupportArtist"
        component={SupportArtist}
        options={{
          ...title('Support Artist'),
          headerStyle: { ...removeBorder },
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          ...title('Post'),
        }}
      />
      <Stack.Screen
        name="NewMessage"
        component={NewMessage}
        options={{
          ...title('New Message'),
        }}
      />
      {linkedAccounts(
        'Linked Account',
        {},
        { showAccOnly: true }
      )}
    </Stack.Navigator>
  );
};
