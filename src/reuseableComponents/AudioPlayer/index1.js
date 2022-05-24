import React, { useEffect, useState, memo } from 'react';
import { View, Image } from 'react-native';
import { AppStyles, Colors, Images } from '../../theme';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import { ButtonView } from '..';
import Slider from '@react-native-community/slider';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const AudioPlayer = props => {
  const [play, setPlay] = useState(false);
  const { position, duration } = useProgress();
  const { id, source, style } = props;

  useEffect(async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: id,
      url: source,
      artist: '',
      title: '',
    });
  }, []);
  // stop playing audio when blur screen.
  useFocusEffect(
    React.useCallback(() => {
      return () => reset();
    }, []),
  );

  useEffect(() => {
    if (duration && position.toFixed(1) == duration.toFixed(1)) {
      reset();
    }
  }, [position, duration]);

  const reset = async () => {
    await TrackPlayer.reset();
    pauseTrack();
  };

  const start = async () => {
    global.log({ id });
    await TrackPlayer.play();
  };

  const playTrack = () => {
    setPlay(true);
    start();
  };

  const pauseTrack = async () => {
    setPlay(false);
    await TrackPlayer.pause();
  };

  return (
    <View style={[styles.container, style]}>
      <ButtonView borderless={true} onPress={play ? pauseTrack : playTrack}>
        <Image
          source={play ? Images.icAudioPause : Images.icAudioPlay}
          style={styles.image}
        />
      </ButtonView>
      <Slider
        style={styles.slider}
        minimumValue={0}
        value={position}
        maximumValue={duration}
        onValueChange={seconds => TrackPlayer.seekTo(seconds)}
        minimumTrackTintColor={Colors.theme}
        maximumTrackTintColor={Colors.inactive}
        thumbImage={Images.icAudioThumb}
      />
    </View>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return true;
};

export default AudioPlayer
  // memo(AudioPlayer, propsAreEqual);
