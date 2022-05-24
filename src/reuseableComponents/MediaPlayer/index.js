import React, { useCallback, memo, forwardRef } from 'react'
import { Metrics } from '../../theme'
import Video from 'react-native-fast-video';

const MediaPlayer = forwardRef((props, ref) => {

  const {
    source, onEnd, style,
    muted, paused, height, width,
    onBuffer, onReady, resizeMode, ...rest
  } = props

  return (
    <Video
      {...rest}
      ref={ref}
      source={{ uri: source }}
      paused={paused}
      repeat={true}
      muted={muted}
      volume={1.0}
      onEnd={onEnd}
      onBuffer={onBuffer}
      onReadyForDisplay={onReady}
      resizeMode={resizeMode}
      style={[style, { height, width }]}
    />
  )
})

const propsAreEqual = (prevProps, nextProps) => {
  if (prevProps.muted != nextProps.muted ||
    prevProps.paused != nextProps.paused ||
    prevProps.source != nextProps.source
  ) {
    return false
  }

  return true
}

MediaPlayer.defaultProps = {
  height: Metrics.heightRatio(255),
  resizeMode: 'contain'
}

export default memo(MediaPlayer, propsAreEqual)
