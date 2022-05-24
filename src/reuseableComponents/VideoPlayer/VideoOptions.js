import React, { useCallback, useRef } from 'react'
import { View, Text } from 'react-native'
import { Images } from '../../theme'
import ImageButton from '../ImageButton'
import styles from './styles'

const VideoOptions = (props) => {

  const { onMute, muted } = props

  return (
    <View style={styles.optionsContainer}>
      <ImageButton
        source={muted ? Images.icMute : Images.icVolume}
        onPress={onMute}
      />
    </View>
  )
}

export default VideoOptions
