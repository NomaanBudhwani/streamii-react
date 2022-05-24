import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Switch, FlatList } from 'react-native';
import { ButtonView, Separator } from '../../reuseableComponents';
import { LoginContext } from '../../contexts';
import { Paragraph } from '../../reuseableComponents/Typography';
import { AppStyles, Colors, Metrics } from '../../theme';
import styles from './styles';
import settingRoutes from './settingRoutes';
import { navigate } from '../../services/NavigationService';
import { logout } from '../../actions/ServiceAction';
import utility from '../../utility';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager } from 'react-native-fbsdk-next'

const googleSignOut = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    global.log('error: ', error)
  }
};

const fbSignout = async () => {
  try {
    await LoginManager.logOut();
  } catch (error) {
    global.log('error: ', error)
  }
};

const index = props => {
  const { } = props;
  const [isPrivate, setPrivate] = useState(false);
  const { setLogin } = useContext(LoginContext);
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.data)

  const setPrivateValue = (value) => {
    setPrivate(value)
  }

  const _onPressItem = (item) => {
    if (item.title === 'Logout') {
      global.log('logout');
      setLogin(false);
      if (user.platform_type == 'facebook') {
        fbSignout()
      } else if (user.platform_type == 'google') {
        googleSignOut()
      }
    } else {
      navigate(item.route);
    }
  }

  const renderRouteCell = (item) => {

    return (
      <ButtonView
        style={styles.normalCellMainView}
        onPress={() => _onPressItem(item)}>
        <View style={AppStyles.vBasePadding}>
          <Paragraph size={14} color={Colors.white}>
            {item.title}
          </Paragraph>
          {item.info ? (
            <Paragraph size={14} color={Colors.inactive}>
              {item.info}
            </Paragraph>
          ) : null}
        </View>
        <Separator color={utility.alphaColor(Colors.white, 0.11)} />
      </ButtonView>
    );
  }

  const renderSwitch = (item) => {
    return (
      <View style={styles.switchCellMainView}>
        <View style={styles.switchCellSubView}>
          <Paragraph size={14} color={Colors.white}>
            {item.title}
          </Paragraph>
          {item.info && (
            <Paragraph size={14} color={Colors.inactive}>
              {item.info}
            </Paragraph>
          )}
        </View>
        <Switch
          trackColor={{
            true: Colors.theme,
            false: Colors.inactive,
          }}
          thumbColor={Colors.white}
          onValueChange={setPrivateValue}
          value={isPrivate}
        />
      </View>
    )
  }

  const _renderItem = ({ item, index }) => {
    return (
      item.title != 'Private Account'
        ? renderRouteCell(item)
        : renderSwitch(item)
    )
  }

  const footerComponent = () => {
    return renderRouteCell({
      title: 'Logout',
      info: user?.email,
      route: '',
    })
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={settingRoutes}
        renderItem={_renderItem}
        scrollEnabled={false}
        keyExtractor={(item, index) => index + ''}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};

export default index;
