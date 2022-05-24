import { Platform } from "react-native";
import { ARTIST_TYPES, MUSIC_TYPES, USER } from "../actions/ActionTypes";
import { request } from "../actions/ServiceAction";
import constants from '../constants';
import { callDispatch } from "../reuseableFunctions";
import { SORT_PARAMS } from "../theme/String";

// =============================================================================
// USER
// =============================================================================

export const getUser = (slug, cbSuccess) => {
  callDispatch(
    request(
      constants.user + `/${slug}`,
      constants.serviceTypes.GET,
      null,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

export const updateUser = (slug, params = {}, cbSuccess, loading = true) => {
  if (params instanceof FormData) {
    params.append('_method', 'PUT')
  } else {
    params['_method'] = 'PUT'
  }
  callDispatch(
    request(
      constants.user + `/${slug}`,
      constants.serviceTypes.POST,
      params,
      USER,
      loading,
      false,
      cbSuccess
    )
  )
}

export const getUsers = (isConcat, params = {}, cbSuccess, cbFailure, reducer = null) => {
  callDispatch(
    request(
      constants.user,
      constants.serviceTypes.GET,
      {
        page: 1,
        ...params
      },
      reducer,
      false,
      isConcat,
      cbSuccess,
      cbFailure
    )
  )
}

export const blockUser = (userId, cbSuccess) => {
  callDispatch(
    request(
      constants.blockUnblockUser,
      constants.serviceTypes.POST,
      { target_id: userId },
      null,
      false,
      false,
      cbSuccess
    )
  )
}

export const unblockUser = (userId, cbSuccess) => {
  callDispatch(
    request(
      constants.blockUnblockUser + '/' + userId,
      constants.serviceTypes.DELETE,
      null,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

export const getArtistTypes = (isConcat, params = {}, cbSuccess) => {
  callDispatch(
    request(
      constants.artistTypes,
      constants.serviceTypes.GET,
      {
        page: 1,
        ...SORT_PARAMS,
        ...params
      },
      ARTIST_TYPES,
      false,
      isConcat,
      cbSuccess
    )
  )
}

export const getMusicTypes = (isConcat, params = {}, cbSuccess) => {
  callDispatch(
    request(
      constants.musicTypes,
      constants.serviceTypes.GET,
      {
        page: 1,
        ...SORT_PARAMS,
        ...params
      },
      MUSIC_TYPES,
      false,
      isConcat,
      cbSuccess
    )
  )
}

// =============================================================================
// FOLLOW, FOLLOWERS, FOLLOWING
// =============================================================================

export const followUser = (params = {}, cbSuccess) => {
  let _params = { ...params, list_type: 'following' }
  callDispatch(
    request(
      constants.follower,
      constants.serviceTypes.POST,
      _params,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

export const getFollowersFollowing = (isConcat, params = {}, cbSuccess) => {
  callDispatch(
    request(
      constants.follower,
      constants.serviceTypes.GET,
      {
        page: 1,
        ...params
      },
      null,
      false,
      isConcat,
      cbSuccess,
    )
  )
}

export const deleteFollowRequest = (id, cbSuccess) => {
  callDispatch(
    request(
      constants.follower + `/${id}`,
      constants.serviceTypes.DELETE,
      null,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

// =============================================================================
// POST
// =============================================================================

export const getPosts = (isConcat, params = {}, cbSuccess, cbFailure) => {
  callDispatch(
    request(
      constants.post,
      constants.serviceTypes.GET,
      {
        page: 1,
        ...params
      },
      null,
      false,
      isConcat,
      cbSuccess,
      cbFailure,
    )
  )
}

export const deletePost = (slug, cbSuccess) => {
  callDispatch(
    request(
      constants.post + `/${slug}`,
      constants.serviceTypes.DELETE,
      null,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

// =============================================================================
// LIKE, DISLIKE
// =============================================================================

export const like = (params = {}, cbSuccess) => {
  params['device_type'] = Platform.OS
  callDispatch(
    request(
      constants.like,
      constants.serviceTypes.POST,
      params,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

export const dislike = (params = {}, cbSuccess) => {
  params['device_type'] = Platform.OS
  callDispatch(
    request(
      constants.dislike,
      constants.serviceTypes.POST,
      params,
      null,
      false,
      false,
      cbSuccess
    )
  )
}

export const getReactedUsers = (isConcat, params = {}, cbSuccess) => {
  callDispatch(
    request(
      constants.reactedUsers,
      constants.serviceTypes.GET,
      {
        page: 1,
        ...params
      },
      null,
      false,
      isConcat,
      cbSuccess,
    )
  )
}

// =============================================================================
// COMMENT
// =============================================================================
export const getComments = (isConcat, params = {}, cbSuccess, cbFailure) => {
  callDispatch(
    request(
      constants.comment,
      constants.serviceTypes.GET,
      {
        page: 1,
        module: 'posts',
        ...params
      },
      null,
      false,
      isConcat,
      cbSuccess,
      cbFailure
    )
  )
}