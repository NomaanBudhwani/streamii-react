import React, { useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { Image, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { request } from '../../actions/ServiceAction'
import constants from '../../constants'
import { useMergeState } from '../../hooks'
import {
  ButtonView, Chip, FlashMessage, ImageButton,
  MediaPlayer, Separator
} from '../../reuseableComponents'
import { Paragraph } from '../../reuseableComponents/Typography'
import { normalizePosts, pickAudio, pickVideo, publishBusEvent, updateMultiSelect } from '../../reuseableFunctions'
import { navigate } from '../../services/NavigationService'
import { AppStyles, Colors, Images } from '../../theme'
import { BUS_EVENTS } from '../../theme/String'
import utility from '../../utility'
import styles from './styles'

const CreatePost = (props) => {

  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user.data)
  const { navigation, route, } = props
  const { post, postType } = route.params
  const stateRef = useRef(null)
  const isEdit = useRef(post ? true : false).current
  const inputRef = useRef('')

  const [state, setState] = useMergeState({
    media: null,
    tagUsers: [],
    tagUserIds: [],
    location: null,
    mediaChanged: false
  })

  useLayoutEffect(() => {
    navigation.setParams({ title: isEdit ? 'Edit Post' : 'New Post' })
    navigation.setOptions({
      headerRight: renderHeaderRight
    })
  }, [])

  useEffect(() => {
    if (isEdit) {
      inputRef.current = post.title;
      const tagUserIds = post.post_tagusers.map((user) => user.id);
      setState({
        media: { url: post.media_file },
        location: utility.isEmpty(post.address) || post.address == "null" ? null : post.address,
        tagUsers: post.post_tagusers,
        tagUserIds,
      })
    }
  }, [])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    if (route.params?.selectedUser) {
      setState({
        tagUsers: route.params.selectedUser,
        tagUserIds: route.params.selectedUserIds,
      })
    }
  }, [route.params?.selectedUser])

  useEffect(() => {
    if (route.params?.address) {
      setState({
        location: route.params.address,
      })
    }
  }, [route.params?.address])

  const renderHeaderRight = () => {
    return (
      <ImageButton
        source={isEdit ? Images.icSave : Images.icPost}
        style={AppStyles.headerMargin}
        onPress={submit}
      />
    )
  }

  const submit = useCallback(() => {
    const { media, location, tagUserIds, mediaChanged } = stateRef.current
    if (media) {

      let url = constants.post
      const payload = new FormData()

      if (isEdit) {
        url = url + '/' + post.slug
        payload.append('_method', 'PUT')
      }

      payload.append('user_id', user.id)
      mediaChanged && payload.append('post_meta_data', media.meta_data)
      mediaChanged && payload.append('media_file',
        {
          uri: media.url,
          name: `${postType}.${media.ext}`,
          type: media.type,
        }
      )
      mediaChanged && payload.append('media_type', postType)
      // !utility.isEmpty(inputRef.current) &&
      payload.append('title', inputRef.current)
      // !utility.isEmpty(location) &&
      payload.append('address', location)
      payload.append('post_type', postType)
      tagUserIds.forEach((id) => {
        payload.append('tag_user_id[]', id)
      })

      global.log({ payload });
      publishBusEvent(BUS_EVENTS.SHOW_UPLOAD_MODAL)
      dispatch(
        request(
          url,
          constants.serviceTypes.POST,
          payload,
          null,
          false,
          true,
          cbOnSuccess,
          cbOnFailure,
          true // for upload progress
        )
      )
    } else {
      const fileType = postType === 'audio' ? 'an audio' : 'a video'
      FlashMessage({
        message: `Please select ${fileType} file`
      })
    }
  }, [])

  const cbOnSuccess = (post) => {
    normalizePosts([post])
    publishBusEvent(BUS_EVENTS.CLOSE_UPLOAD_MODAL)
    setTimeout(() => {
      navigate('Home', { post })
    }, 300)
  }

  const cbOnFailure = () => {
    publishBusEvent(BUS_EVENTS.CLOSE_UPLOAD_MODAL)
  }

  const onTitleChange = (text) => {
    inputRef.current = text
  }

  const addLocation = () => navigate('AddLocation', { location: state.location })

  const tagUser = () => {
    navigate(
      'TagPeople',
      {
        selectedIds: state.tagUserIds,
        selectedUsers: state.tagUsers
      }
    )
  }

  const removeTagUser = (user) => () => {
    const { tagUsers, tagUserIds } = state
    const { updatedIds, updatedData } = updateMultiSelect(tagUsers, tagUserIds, user)
    setState({
      tagUsers: updatedData,
      tagUserIds: updatedIds
    })
  }

  const selectMedia = async () => {

    let media = null;
    if (postType === 'audio') {
      media = await pickAudio()
    } else if (postType === 'video') {
      media = await pickVideo()
    }

    media && setState({ media, mediaChanged: true })
  }

  const removeLocation = () => setState({ location: null })

  return (
    <View style={AppStyles.flex}>
      <View style={styles.postContainer}>
        {
          state.media && postType == 'video' ?
            <ButtonView
              onPress={selectMedia}
              style={AppStyles.centerAligned}>
              <MediaPlayer
                source={state.media.url}
                paused={true}
                muted={true}
                height={60}
                width={60}
                resizeMode='cover'
                style={styles.btnAdd}
              />
              <Image source={Images.icVideoRecorder} style={{ position: 'absolute' }} />
            </ButtonView>
            :
            <ImageButton
              onPress={selectMedia}
              source={
                state.media && postType == 'audio' ?
                  Images.icAudioPlay : Images.icPlus
              }
              imageStyle={{ resizeMode: 'cover' }}
              style={styles.btnAdd}
            />
        }
        <TextInput
          placeholder='Write something about your post'
          defaultValue={inputRef.current}
          placeholderTextColor={Colors.white}
          onChangeText={onTitleChange}
          multiline={true}
          autoCompleteType="off"
          autoCorrect={false}
          style={styles.input}
        />
      </View>
      <ButtonView style={styles.btnContainer} onPress={addLocation}>
        <View style={styles.btnWrapper}>
          <Paragraph color={Colors.white}>
            Add Location
          </Paragraph>
          <ImageButton
            round
            source={Images.icChevronsRight}
            onPress={addLocation}
          />
        </View>
        {
          state.location &&
          <View style={styles.locationContainer}>
            <Image source={Images.icLocation} />
            {state.location &&
              <>
                <Paragraph
                  numberOfLines={1}
                  color={Colors.link}
                  style={[AppStyles.hSmallMargin, { flex: 1 }]}
                  size={13}>
                  {state.location}
                </Paragraph>
                <ImageButton
                  round
                  source={Images.icCross}
                  onPress={removeLocation}
                  imageStyle={{ tintColor: Colors.inactive }}
                />
              </>
            }
          </View>
        }
      </ButtonView>
      <Separator color={Colors.shark} />
      <ButtonView style={styles.btnContainer} onPress={tagUser}>
        <View style={styles.btnWrapper}>
          <Paragraph color={Colors.white}>
            Tag People
          </Paragraph>
          <ImageButton
            round
            source={Images.icChevronsRight}
            onPress={addLocation}
          />
        </View>
      </ButtonView>
      {
        state.tagUsers.length ?
          <View style={styles.tagContainer}>
            {state.tagUsers.map((user) => (
              <Chip
                key={user.id + ''}
                title={user.name}
                style={styles.chip}
                onClose={removeTagUser(user)}
              />
            ))}
          </View>
          : null
      }
      <Separator color={Colors.shark} />
    </View>
  )
}

export default CreatePost
