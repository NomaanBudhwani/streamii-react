import _ from "lodash";
import SplashScreen from "react-native-splash-screen";
import { loggedInUser } from "../data";
import { BUS_EVENTS, USER_TYPES } from "../theme/String";
import { EventBusSingleton } from 'light-event-bus';
import singleton from '../singleton'
import { defaultAction, success } from "../actions/ServiceAction";
import { GENERAL_POSTS, PAUSE_AUDIO, PAUSE_VIDEO, PLAY_AUDIO, POST_COMMENT, POST_DISLIKED, POST_LIKED, SET_VIDEO_TO_PLAY } from "../actions/ActionTypes";
import DeviceInfo from 'react-native-device-info';
import DocumentPicker, { types } from 'react-native-document-picker'
import ImagePicker from 'react-native-image-crop-picker';
import { normalize, schema } from 'normalizr';

const callback = (response) => global.log({ response });

export const callDispatch = (request) => {
  const dispatch = singleton.storeRef.dispatch
  dispatch(request)
}

const deviceId = () => {
  return DeviceInfo.getUniqueId()
}

const hideSplash = () => {
  setTimeout(() => {
    SplashScreen.hide();
  }, 3000)
}

const updateByIndex = (data, index, keyValueObj = {}) => {
  const _data = [...data]
  const item = _data[index]
  _data[index] = { ...item, ...keyValueObj }

  return _data
}

const updateMultiSelect = (selectedData, selectedDataIds, newData) => {
  const _selectedDataIds = [...selectedDataIds]
  const _selectedData = [...selectedData]

  const index = _.indexOf(_selectedDataIds, newData.id)

  if (index == -1) {
    _selectedDataIds.push(newData.id)
    _selectedData.push(newData)
  } else {
    _selectedDataIds.splice(index, 1)
    _selectedData.splice(index, 1)
  }

  return {
    updatedIds: _selectedDataIds,
    updatedData: _selectedData
  }
}

const isFan = () => {
  const user = singleton.storeRef.getState().user.data
  return user?.user_type === USER_TYPES.FAN.id
}

const subscribeBusEvent = (eventName = '', callback) => {
  return EventBusSingleton.subscribe(eventName, callback)
}

const publishBusEvent = (eventName = '', args = {}) => {
  EventBusSingleton.publish(eventName, args)
}

const showBottomSheet = (args = {}) => {
  publishBusEvent(BUS_EVENTS.SHOW_BOTTOM_SHEET, args)
}

const closeBottomSheet = (reset = false) => {
  publishBusEvent(BUS_EVENTS.CLOSE_BOTTOM_SHEET, reset)
}

const showAlert = (args = {}) => {
  publishBusEvent(BUS_EVENTS.SHOW_ALERT, args)
}

const closeAlert = (reset = false) => {
  publishBusEvent(BUS_EVENTS.CLOSE_ALERT, { reset })
}

const playVideo = (name, id, lastId) => {

  callDispatch(
    defaultAction(SET_VIDEO_TO_PLAY, {
      name,
      currentId: id,
      previousId: lastId,
    }),
  );
}

const pauseVideo = (name, id) => {
  const { videoReducer } = singleton.storeRef.getState()

  if (videoReducer.data) {
    callDispatch(defaultAction(PAUSE_VIDEO, { name, id }))
  }

}

const playAudio = (name, id) => {
  callDispatch(defaultAction(PLAY_AUDIO, { name, id }))
}

const pauseAudio = (name, id) => {
  const { audioReducer } = singleton.storeRef.getState()

  if (audioReducer.data) {
    callDispatch(defaultAction(PAUSE_AUDIO, { name, id }))
  }
}

const pickAudio = async () => {
  try {
    const audio = await DocumentPicker.pickSingle({
      type: types.audio,
    })
    const meta_data = { size: audio.size }
    return {
      url: audio.uri,
      type: audio.type,
      ext: audio.name?.split('.').pop() ?? 'mp3',
      meta_data: JSON.stringify(meta_data)
    }
  } catch (error) {
    global.log({ error });
  }
}

const pickImage = async () => {
  try {
    const image = await ImagePicker.openPicker({
      mediaType: 'photo'
    })

    return {
      url: image.path,
      type: image.mime,
      ext: image.filename?.split('.').pop() ?? 'jpg'
    }
  } catch (error) {
    global.log({ error });
  }
}

const pickVideo = async () => {
  try {
    const video = await ImagePicker.openPicker({
      mediaType: 'video'
    })
    const meta_data = { height: video.height, width: video.width, size: video.size }

    return {
      url: video.path,
      type: video.mime,
      ext: video.filename?.split('.').pop() ?? 'mp4',
      meta_data: JSON.stringify(meta_data)
    }
  } catch (error) {
    global.log({ error });
  }
}

const normalizePosts = (posts) => {
  const eventSchema = new schema.Entity('posts');
  const postsSchema = [eventSchema];
  const normalizedPosts = normalize(posts, postsSchema);

  callDispatch(success(GENERAL_POSTS, normalizedPosts.entities.posts));

  return normalizedPosts.result
}

const normalizeComments = (comments) => {
  const eventSchema = new schema.Entity('comments');
  const commentsSchema = [eventSchema];
  const normalizedComments = normalize(comments, commentsSchema);


  return {
    comments: normalizedComments.entities.comments,
    commentIds: normalizedComments.result
  }
}

const getPostById = (postId) => {
  const post = singleton.storeRef.getState().generalPosts.data?.[postId]
  if (!post) return null

  return post
}

const getLoggedInUser = () => {
  return singleton.storeRef.getState().user.data
}

const likeAPost = (postId) => {
  callDispatch(
    defaultAction(POST_LIKED, { postId })
  )
}

const dislikeAPost = (postId) => {
  callDispatch(
    defaultAction(POST_DISLIKED, { postId })
  )
}

const commentOnAPost = (postId) => {
  callDispatch(
    defaultAction(POST_COMMENT, { postId })
  )
}

export {
  hideSplash,
  deviceId,
  updateByIndex,
  updateMultiSelect,
  subscribeBusEvent,
  publishBusEvent,
  isFan,
  showBottomSheet,
  closeBottomSheet,
  showAlert,
  closeAlert,
  playVideo,
  pauseVideo,
  playAudio,
  pauseAudio,
  pickAudio,
  pickImage,
  pickVideo,
  normalizePosts,
  normalizeComments,
  getPostById,
  getLoggedInUser,
  likeAPost,
  dislikeAPost,
  commentOnAPost
};

