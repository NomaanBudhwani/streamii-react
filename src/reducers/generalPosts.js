//
//  serviceReducer.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:22:21 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {
  GENERAL_POSTS,
  POST_DISLIKED,
  POST_LIKED,
  POST_COMMENT
} from "../actions/ActionTypes";
import _ from "lodash";
const initialState = {
  isFetching: false,
  failure: false,
  errorMessage: "",
  data: {},
  meta: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_POSTS.SUCCESS:
      return {
        ...state,
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: { ...state.data, ...action.data },
      };
    case POST_LIKED:

      const postId = action.data.postId;
      const likedPost = { ...state.data[postId] };

      if (!!likedPost.is_user_like) { // undo like
        likedPost.is_user_like = 0;
        likedPost.total_like--
      } else { // like
        likedPost.is_user_like = 1;
        likedPost.total_like++;
      }

      if (!!likedPost.is_user_dislike) {
        likedPost.is_user_dislike = 0;
        likedPost.total_dislike--
      }

      state.data[postId] = likedPost // just updating liked post object here and not the entire state object
      return state

    case POST_DISLIKED:

      const _postId = action.data.postId;
      const dislikedPost = { ...state.data[_postId] };

      if (!!dislikedPost.is_user_dislike) { // undo dislike
        dislikedPost.is_user_dislike = 0;
        dislikedPost.total_dislike--
      } else { // dislike
        dislikedPost.is_user_dislike = 1;
        dislikedPost.total_dislike++
      }

      if (!!dislikedPost.is_user_like) {
        dislikedPost.is_user_like = 0;
        dislikedPost.total_like--
      }

      state.data[_postId] = dislikedPost // just updating liked post object here and not the entire state object
      return state

    case POST_COMMENT:

      const commentPost = { ...state.data[action.data.postId] }
      commentPost.total_comment++
      state.data[action.data.postId] = commentPost
      return state
    default:
      return state;
  }
};