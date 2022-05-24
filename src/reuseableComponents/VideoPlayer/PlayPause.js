import React from 'react'
import { View, Text } from 'react-native'
import { ImageButton } from '..';
import { Images } from '../../theme';
import styles from './styles'

const PlayPause = (props) => {

  const {
    isPaused, onPlay, onPause,
  } = props

  return (
    <View style={styles.playPauseContainer}>
      <View style={styles.playPauseView}>
        <ImageButton
          source={isPaused ? Images.icPlay : Images.icPause}
          onPress={isPaused ? onPlay : onPause}
        />
      </View>
    </View>
  )
}

export default PlayPause
