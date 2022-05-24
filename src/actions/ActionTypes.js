//
//  ActionTypes.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:06:43 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL, CREATE, UPDATE, DELETE].forEach(
    type => {
      res[type] = `${base}_${type}`;
    }
  );
  return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = "GENERAL_ACTION";
export const GENERAL_ACTION_MULTIPLE_REQUEST =
  "GENERAL_ACTION_MULTIPLE_REQUEST";
export const NO_INTERNET = "NO_INTERNET";
//SOCKET DEFAULT ACTIONS
export const SOCKET_INFO = createRequestTypes("SOCKET_INFO");
export const SOCKET_DUMP = createRequestTypes("SOCKET_DUMP");
export const SOCKET_WRITE = "SOCKET_WRITE";
//NETWORK DEFAULT ACTION
export const NETWORK_INFO = "NETWORK_INFO";
//LOCATION ACTIONS
export const USER_LOCATION = createRequestTypes("USER_LOCATION");
//APP GENERAL ACTIONS
export const USER = createRequestTypes("USER");
export const GENERAL_POSTS = createRequestTypes("GENERAL_POSTS");
export const NORMALIZE_POSTS = createRequestTypes('NORMALIZE_POSTS');
export const HOME_POSTS = createRequestTypes('HOME_POSTS');
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");
export const ARTIST_TYPES = createRequestTypes("ARTIST_TYPES");
export const MUSIC_TYPES = createRequestTypes("MUSIC_TYPES");
export const USER_REPORT_OPTIONS = createRequestTypes("USER_REPORT_OPTIONS");
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_VIDEO_TO_PLAY = "SET_VIDEO_TO_PLAY";
export const PAUSE_VIDEO = "PAUSE_VIDEO";
export const PLAY_AUDIO = "PLAY_AUDIO";
export const PAUSE_AUDIO = "PAUSE_AUDIO";
export const LOGOUT = "LOGOUT";
export const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const SET_SEARCH_TAB = "SET_SEARCH_TAB";
export const POST_LIKED = "POST_LIKED";
export const POST_DISLIKED = "POST_DISLIKED";
export const POST_COMMENT = "POST_COMMENT";

//APP RELATED ACTIONS
//ADD HERE
