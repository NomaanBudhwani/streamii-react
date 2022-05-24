import React, { useEffect } from 'react'
import { View } from 'react-native'
import { getPosts } from '../../CommonApis'
import { PostList } from '../../components'
import { pauseVideo } from '../../reuseableFunctions'
import { AppStyles } from '../../theme'

const TaggedPosts = (props) => {

  const { navigation,
    route: { params }
  } = props

  useEffect(() => {

    const unsubBlur = navigation.addListener('blur', () => {
      pauseVideo(params.name)
    });

    return unsubBlur

  }, [])

  const getTaggedPosts = (isConcat, payload, cbOnSuccess, cbOnFailure) => {
    let _payload = {
      ...payload,
      check_post_type: 'tag_posts',
      tag_user_id: params?.user.id
    }
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
        fetchRequest={getTaggedPosts}
        name={params.name}
      />
    </View>
  )
}

export default TaggedPosts
