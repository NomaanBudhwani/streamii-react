import React, { useCallback, useRef } from 'react'
import { View, Text } from 'react-native'
import { PostList } from '../../components'
import { posts } from '../../data'
import { AppStyles } from '../../theme'

const name = "postDetail"

const index = (props) => {

  const { route: { params } } = props

  const post = posts.filter((post) => post.user.name === params?.user.name)

  return (
    <View style={AppStyles.flex}>
      <PostList
        posts={post ?? []}
        scrollEnabled={false}
        name={name}
      />
    </View>
  )
}

export default index
