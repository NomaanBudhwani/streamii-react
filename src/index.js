import _ from 'lodash';
import React, { Component, createRef } from "react";
import { StatusBar, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import Spinner from "react-native-globalspinner";
import KeyboardManager from 'react-native-keyboard-manager';
import Reachability from "react-native-reachability-popup";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CreatePostModal, PostUploadModal } from "./components";
import constant from "./constants";
import { LoginContext } from './contexts';
import RootNavigator from "./navigator";
import { Alert, BottomSheet } from "./reuseableComponents";
import { deviceId } from "./reuseableFunctions";
import HttpServiceManager from "./services/HttpServiceManager";
import { navigatorRef } from "./services/NavigationService";
import singleton from "./singleton";
import { persistor, store } from "./store";
import { Colors } from "./theme";
import utility from "./utility";
import { getArtistTypes, getMusicTypes } from './CommonApis'
export default class App extends Component {

  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.postModalRef = createRef()
    this.state = {
      isLogin: false,
      setLogin: this.setLogin,
      isReduxLoaded: false,
      showPostModal: this.showPostModal
    }
  }

  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {
      token: deviceId()
    });

    if (utility.isPlatformIOS()) {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
  }

  setLogin = (isLogin = true) => this.setState({ isLogin })

  showPostModal = () => {
    this.postModalRef.current.show()
  }

  onBeforeLift = () => {
    singleton.storeRef = store;

    getArtistTypes()
    getMusicTypes()

    const user = store.getState().user.data
    let isLogin = false;
    if (!_.isEmpty(user)) {
      isLogin = true
      HttpServiceManager.getInstance().userToken = user.api_token;
    }

    this.setState({
      isReduxLoaded: true,
      isLogin
    });
  };

  render() {

    const { isReduxLoaded } = this.state

    return (
      <Provider store={store}>

        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.greenishBlack}
        />

        <PersistGate
          onBeforeLift={this.onBeforeLift}
          persistor={persistor}>

          {
            isReduxLoaded ?
              <LoginContext.Provider value={this.state} >
                <RootNavigator
                  ref={navigatorRef}
                />
              </LoginContext.Provider>
              :
              <View />
          }

        </PersistGate>

        <FlashMessage position="top" />

        <Spinner color={Colors.white} type='MaterialIndicator' size={36} />

        <Reachability />

        <CreatePostModal
          ref={this.postModalRef}
        />

        <Alert />

        <BottomSheet />

        <PostUploadModal />
      </Provider>
    );
  }
}
