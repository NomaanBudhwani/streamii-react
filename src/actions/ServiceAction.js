//
//  ServiceAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:24 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {
  GENERAL_ACTION,
  GENERAL_ACTION_MULTIPLE_REQUEST,
  LOGOUT,
  NO_INTERNET
} from "./ActionTypes";
import {
  isNetworkReachable,
  isConnected
} from "react-native-reachability-popup";

callback = () => { };

Request = {
  url: String, //Service url
  method: String, //Web Service type 'post,get,put,delete....'
  data: Object, //Paramter for request
  actionType: Object
};
export function request(
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  actionType = null, //Action Type
  showHud = true, //Show spinner
  isConcat = false, //merge pagination data
  successCB = callback,
  failureCB = callback,
  progress = false
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET
    };
  }
  return {
    type: GENERAL_ACTION,
    actionType,
    url,
    method,
    data,
    showHud,
    isConcat,
    successCB,
    failureCB,
    progress
  };
}
export function multipleRequest(
  requestArray: [Request],
  showHud = true,
  successCB = callback,
  failureCB = callback
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET
    };
  }
  return {
    type: GENERAL_ACTION_MULTIPLE_REQUEST,
    requestArray,
    showHud,
    successCB,
    failureCB
  };
}
export function requestAction(types) {
  return {
    type: types.REQUEST
  };
}

export function success(types, data, meta, isConcat) {
  return {
    data,
    meta,
    type: types.SUCCESS,
    isConcat
  };
}

export function failure(types, errorMessage) {
  return {
    errorMessage,
    type: types.FAILURE
  };
}
export function defaultAction(type, data) {
  return {
    type,
    data
  };
}
export function logout() {
  return {
    type: LOGOUT
  };
}
