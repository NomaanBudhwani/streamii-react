import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { View, Text } from 'react-native'
import { useMergeState } from '../../hooks'
import { AppStyles, Colors, Images } from '../../theme'
import Slider from '@react-native-community/slider';

const index = forwardRef((props, ref) => {

  const { style, onSeekComplete, onSeek } = props
  const innerRef = useRef()
  const [state, setState] = useMergeState({
    seekPosition: 0,
    duration: 0,
  })

  useImperativeHandle(ref, () => ({
    setProgress: (progress) => setState({ seekPosition: progress }),
    setDuration: (duration) => setState({ duration }),
    getInnerRef: () => innerRef.current
  }));

  return (
    <View style={[AppStyles.flex, style]}>
      <Slider
        ref={innerRef}
        style={AppStyles.flex}
        minimumValue={0}
        value={state.seekPosition}
        maximumValue={state.duration}
        onSlidingStart={onSeek}
        onSlidingComplete={onSeekComplete}
        minimumTrackTintColor={Colors.theme}
        maximumTrackTintColor={Colors.inactive}
        thumbImage={Images.icAudioThumb}
      />
    </View>
  )
})

export default index
