//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:13:09 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const constant = {
  //App Constants
  socketIP: "192.34.60.217",
  socketPort: "1233",
  baseURL: "https://streammiiqa.retrocubedev.com/api", //QA
  // baseURL: "https://streammii.retrocubedev.com/api/", //dev
  baseImageURL: "https://retrocubedev.com/dev/case_book/public/api/",
  applicationToken: "api.Pd*!(5675",
  //Services Constants
  user: 'user',
  login: "user/login",
  socialLogin: 'user/social-login',
  forgotPassword: 'user/forgot-password',
  changePassword: 'user/change-password',
  logout: 'user/logout',
  artistTypes: 'artist-types',
  musicTypes: 'music-genres',
  post: 'post',
  follower: 'follower',
  blockUnblockUser: 'user-block',
  report: 'user-report',
  reportOptions: 'user-report-type',
  like: 'like',
  dislike: 'dislike',
  comment: 'comment',
  reactedUsers: 'like-dislike-post-user',

  GOOGLE_API_KEY: "AIzaSyCqjlwf6EYUKNbOKbqpndM7SyGXCe3Jejs",

  serviceTypes: {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
  },
  serviceMeta: {
    "current_page": 1,
    "from": 1,
    "last_page": 0,
    "to": 0,
    "total": 0
  },
};

export default constant;
