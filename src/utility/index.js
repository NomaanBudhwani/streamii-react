//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:49:50 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { Alert, Linking } from 'react-native';
import Color from 'color';
import moment from 'moment';
import _ from 'lodash'

class utility {
  EdgePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  isPlatformAndroid = () => Platform.OS === 'android';
  isPlatformIOS = () => Platform.OS === 'ios';

  validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };

  alerts = (title, description, onPress) => {
    Alert.alert(
      title,
      description,
      [
        { text: 'OK', onPress: onPress },
        { text: 'Cancel', onPress: () => { } },
      ],
      {
        cancelable: false,
      },
    );
  };

  alphaColor = (color, alpha) => {
    return Color(color).alpha(alpha).rgb().string();
  };

  dateFormat = (date, format) => moment(date).format(format);
  timeFromNow = givenDate => moment(givenDate).fromNow();
  isEmpty = (value) => _.isEmpty(value)
}

export default new utility();
