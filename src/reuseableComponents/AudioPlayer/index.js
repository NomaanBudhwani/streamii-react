import React, { memo, useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useMergeState } from '../../hooks';
import { pauseAudio, playAudio } from '../../reuseableFunctions';
import { AppStyles, Colors, Images } from '../../theme';
import ImageButton from '../ImageButton';
import MediaPlayer from './../MediaPlayer';
import Seekbar from './../Seekbar';
import styles from './styles';

const AudioPlayer = props => {

  const [state, setState] = useMergeState({
    paused: true,
    seekPosition: 0,
    duration: 0,
    buffering: false
  })
  const audioRef = useRef()
  const seekRef = useRef()
  const { id, source, style, name } = props;
  const audio = useSelector(({ audioReducer }) => audioReducer.data?.[name]?.[id])

  useEffect(() => {
    if (audio) {
      if (audio.paused) {
        updateState({ paused: true })
      } else {
        updateState({ paused: false })
      }
    }
  }, [audio])

  const updateState = (newValues) => {
    setState({ ...state, ...newValues })
  }

  const playTrack = () => {
    playAudio(name, id)
  }

  const pauseTrack = () => {
    pauseAudio(name, id)
  }

  const _onLoad = ({ duration }) => {
    seekRef?.current?.setDuration(duration)
  }

  const onProgressChange = (progress) => {
    seekRef?.current?.setProgress(progress.currentTime)
  }

  const seekTo = (seconds) => {
    audioRef.current.seek(seconds)
    updateState({ paused: false })
  }

  const _onEnd = () => {
    updateState({
      paused: true,
      seekPosition: 0
    })
  }

  const _onBuffer = (buffer) => {
    if (!state.paused && state.buffering != buffer.isBuffering) {
      global.log('buffer');
      updateState({
        buffering: buffer.isBuffering
      })
    }

  }

  return (

    <View style={[styles.container, style]}>
      {
        state.buffering ?
          <ActivityIndicator color={Colors.white} size='large' style={AppStyles.hSmallMargin} />
          :
          <ImageButton
            round
            source={state.paused ? Images.icAudioPlay : Images.icAudioPause}
            onPress={state.paused ? playTrack : pauseTrack}
          />
      }
      <Seekbar
        style={styles.slider}
        ref={seekRef}
        onSeek={pauseTrack}
        onSeekComplete={seekTo}
      />
      <MediaPlayer
        ref={audioRef}
        paused={state.paused}
        poster={''}
        audioOnly={true}
        repeat={true}
        source={source}
        onLoad={_onLoad}
        onEnd={_onEnd}
        // onBuffer={_onBuffer}
        onProgress={onProgressChange}
      />
    </View>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return true;
};

export default memo(AudioPlayer, propsAreEqual);
