//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import { Images, Metrics, AppStyles, Colors, Fonts } from "../theme";
import { Image, TouchableOpacity } from "react-native";
import { ImageButton } from '../reuseableComponents';
import { HeaderBackButton } from '@react-navigation/stack';
import utility from '../utility';
import { pop } from '../services/NavigationService';

const headerColor = {
  headerStyle: {
    backgroundColor: Colors.azure,
    borderBottomWidth: 0
  }
};
const removeBorder = {
  borderBottomWidth: 0,
  shadowColor: 'transparent',
  shadowOpacity: 0,
  elevation: 0,
};
const removeHeader = {
  headerShown: false
}

const removeHeaderTitle = {
  headerTitle: null
}

const headerTransparent = {
  headerTransparent: true
};

const title = title => ({
  title,
  headerTitleStyle: {
    ...Fonts.Regular(18),
    fontWeight: "400"
  }
});

const backImage = (tintColor = Colors.azure) => {
  return {
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={Images.icBack}
        style={{
          backgroundColor: 'red',
          marginLeft: Metrics.baseMargin,
          padding: 24,
          //tintColor: tintColor
        }}
      />
    )
  };
};

const backButton = () => (
  <HeaderBackButton
    backImage={() => <Image source={Images.icBack} resizeMode="contain" />}
    labelVisible={false}
    onPress={() => pop()}
    style={{
      height: 30,
      width: 30,
      ...AppStyles.centerAligned,
      paddingHorizontal: utility.isPlatformAndroid() ? 0 : 16,
      marginLeft: utility.isPlatformAndroid() ? undefined : 8,
    }}
  />
)

const commonNavigatorConfig = {
  headerLeft: backButton,
  ...removeBorder,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center'
}

const headerBorderStyle = {
  borderBottomWidth: 1.5,
  borderBottomColor: Colors.shark
}
export {
  headerColor,
  removeBorder,
  headerTransparent,
  backImage,
  title,
  backButton,
  removeHeaderTitle,
  removeHeader,
  commonNavigatorConfig,
  headerBorderStyle
};
