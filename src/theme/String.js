//
//  String.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:49:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.

import Images from "./Images";

//
const PLACEHOLDER = {};
const TITLES = {};
const LABEL = {};
const VALIDATION = {};
const API_SUCCESS_MESSAGE = {};

export default {
  PLACEHOLDER,
  LABEL,
  TITLES,
  VALIDATION,
  API_SUCCESS_MESSAGE
};


export const USER_TYPES = {
  FAN: {
    id: 'fan',
  },
  ARTIST: {
    id: 'artist'
  },
}

export const BS_CONTENT_TYPES = {
  POST_PROFILE_OPTIONS: 'post_profile_options',
  REPORT_OPTIONS: 'report_options',
}

export const USER_LIST_TYPES = {
  DEFAULT: 'default',
  FOLLOW: 'follow',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
  REACTED: 'reacted',
  FOLLOW_REQUEST: 'follow_request',
  BLOCKED: 'blocked',
  SELECTION: 'SELECTION'
}

export const BUS_EVENTS = {
  SHOW_ALERT: 'show_alert',
  CLOSE_ALERT: 'close_alert',
  SHOW_BOTTOM_SHEET: 'show_bottom_sheet',
  CLOSE_BOTTOM_SHEET: 'close_bottom_sheet',
  SHOW_UPLOAD_MODAL: 'show_upload_modal',
  CLOSE_UPLOAD_MODAL: 'close_upload_modal',
  SEARCH_TEXT_CHANGE: 'search_text_change',
  POST_DELETE: 'post_deleted'
}

export const POST_TYPES = {
  AUDIO: 'audio',
  VIDEO: 'video',
  SUPPORT: 'support'
}

export const SORT_PARAMS = {
  sort_column: 'id',
  sort_order: 'asc'
}

export const SOCIAL_TYPES = [
  {
    image: Images.icFacebook,
    key: 'facebook_url',
  },
  {
    image: Images.icTwitter,
    key: 'twitter_url',
  },
  {
    image: Images.icInstagram,
    key: 'instagram_url',
  },
  {
    image: Images.icSnapchat,
    key: 'snapchat_url',
  },
  {
    image: Images.icYoutube,
    key: 'youtube_url',
  },
  {
    image: Images.icWeblink,
    key: 'weblink_url'
  },
]
