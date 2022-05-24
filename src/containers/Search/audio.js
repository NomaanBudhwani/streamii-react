import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { PostList } from '../../components'
import { pauseAudio, subscribeBusEvent } from '../../reuseableFunctions'
import { AppStyles } from '../../theme'
import { BUS_EVENTS } from '../../theme/String'
import _ from 'lodash'
import { getPosts } from '../../CommonApis'

const name = "searchAudio"

const Audio = (props) => {

  const { navigation, route: { params } } = props

  useEffect(() => {

    const unsubBlur = navigation.addListener('blur', () => {
      pauseAudio(name)
    });

    return unsubBlur

  }, [])

  const getAudios = (isConcat, params, cbOnSuccess, cbOnFailure) => {
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
        name={name}
        fetchRequest={getAudios}
        searching={true}
        tabName='audio'
      />
    </View>
  )
}

export default Audio
