//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:21:40 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { combineReducers } from "redux";
import {
  ARTIST_TYPES, GENERAL_POSTS, HOME_POSTS, LOGOUT, MUSIC_TYPES,
  NORMALIZE_POSTS, USER, USER_REPORT_OPTIONS
} from "../actions/ActionTypes";
import audioReducer from "./audioReducer";
import serviceReducer from "./serviceReducer";
import uploadProgress from './uploadProgress';
import userLocation from "./userLocation";
import userType from "./userType";
import videoReducer from "./videoReducer";
import searchReducer from "./searchReducer";
import generalPosts from "./generalPosts";

const appReducer = combineReducers({
  user: serviceReducer(USER),
  generalPosts,
  // serviceReducer(GENERAL_POSTS),
  normalizePosts: serviceReducer(NORMALIZE_POSTS),
  homePosts: serviceReducer(HOME_POSTS),
  artistTypes: serviceReducer(ARTIST_TYPES),
  musicTypes: serviceReducer(MUSIC_TYPES),
  userReportOptions: serviceReducer(USER_REPORT_OPTIONS),
  userType,
  userLocation,
  videoReducer,
  audioReducer,
  uploadProgress,
  searchReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    let newState = {};
    for (let key of Object.keys(state)) {
      let _data = state[key].data

      if (key != 'artistTypes' && key != 'musicTypes') {
        _data = Array.isArray(state[key].data) ? [] : null
      }

      newState[key] = {
        ...state[key],
        data: _data,
        meta: { current_page: 0, last_page: 0 }
      };
    }
    state = {
      ...newState
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
