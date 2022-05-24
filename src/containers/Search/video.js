import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { PostList } from '../../components'
import { pauseVideo, subscribeBusEvent } from '../../reuseableFunctions'
import { AppStyles } from '../../theme'
import { BUS_EVENTS } from '../../theme/String'
import _ from 'lodash'
import { getPosts } from '../../CommonApis'

const name = "searchVideo"

const Video = (props) => {

  const { navigation, route: { params } } = props;

  useEffect(() => {

    const unsubBlur = navigation.addListener('blur', () => {
      pauseVideo(name)
    });

    return unsubBlur

  }, [])

  const getVideos = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    getPosts(
      isConcat,
      params,
      cbOnSuccess,
      cbOnFailure,
    )
  }

  return (
    <View style={AppStyles.flex}>
      <PostList
        fetchRequest={getVideos}
        name={name}
        searching={true}
        tabName='video'
      />
    </View>
  )
}

export default Video
