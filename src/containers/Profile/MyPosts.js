import React, { useEffect } from 'react'
import { View } from 'react-native'
import { getPosts } from '../../CommonApis'
import { PostList } from '../../components'
import { loggedInUser, myPosts, supportPosts } from '../../data'
import { isFan, pauseVideo } from '../../reuseableFunctions'
import { AppStyles } from '../../theme'
import { USER_TYPES } from '../../theme/String'

const name = "MyPost"

const MyPosts = (props) => {

  const {
    navigation,
    route: { params }
  } = props

  useEffect(() => {

    const unsubBlur = navigation.addListener('blur', () => {
      pauseVideo(params.name)
    });

    return unsubBlur

  }, [])

  const getMyPosts = (isConcat, payload, cbOnSuccess, cbOnFailure) => {
    let _payload = { ...payload, user_id: params?.user.id }
    getPosts(
      isConcat,
      _payload,
      cbOnSuccess,
      cbOnFailure
    )
  }

  return (
    <View style={AppStyles.flex}>
      <PostList
        fetchRequest={getMyPosts}
        name={params.name}
      />
    </View>
  )
}

export default MyPosts
