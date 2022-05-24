import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Metrics } from '../../theme';
import styles from './styles';
import padStart from 'lodash/padStart'

export class Seekbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      seekerWidth: 0,
      seekerPosition: 0,
      currentTime: 0,
      duration: 0
    }
  }

  calculateTime() {
    const time = this.state.duration - this.state.currentTime;
    return `-${this.formatTime(time)}`;
  }

  formatTime(time = 0) {
    time = Math.min(Math.max(time, 0), this.state.duration);

    const formattedMinutes = padStart(Math.floor(time / 60).toFixed(0), 2, 0);
    const formattedSeconds = padStart(Math.floor(time % 60).toFixed(0), 2, 0);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  calculateSeekerPosition() {
    const percent = this.state.currentTime / this.state.duration;
    return this.state.seekerWidth * percent;
  }

  setSeekerPosition(position = 0) {
    let state = this.state;
    position = this.constrainToSeekerMinMax(position);
    state.progress = position;
    state.seekerPosition = position;

    this.setState(state);
  }

  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.state.seekerWidth) {
      return this.state.seekerWidth;
    }
    return val;
  }

  setProgress = (data) => {
    let state = this.state
    state.currentTime = data.currentTime;

    const position = this.calculateSeekerPosition();
    this.setSeekerPosition(position);

    this.setState(state)
  }

  setDuration = (data) => {
    let state = this.state;
    state.duration = data.duration;

    this.setState(state)
  }

  onLayout = (event) => {
    this.setState({ seekerWidth: event.nativeEvent.layout.width })
  }

  render() {
    const { progress, currentTime } = this.state

    return (
      <View style={styles.bottomView}>
        <View style={styles.timeCont}>
          <Text style={styles.txtTime}>{this.formatTime(currentTime)}</Text>
          <Text style={styles.txtTime}>{this.calculateTime()}</Text>
        </View>
        <View style={styles.seekbarCont} onLayout={this.onLayout}>
          <View style={[styles.seekbar, { width: progress }]} />
          <View style={[styles.seekbarPin, { left: progress }]} />
        </View>
      </View>
    )
  }
}

export default Seekbar
