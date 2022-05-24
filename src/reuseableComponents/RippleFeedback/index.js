import React, { Component, cloneElement } from 'react'
import {
  View, Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'
import Color from 'color'
import styles from './styles'

class RippleFeedback extends Component {

  constructor(props) {
    super(props);

    this.maxOpacity = Color(props.rippleColor).isDark() ? 0.12 : 0.3;
    this.longPressed = false
    this.rippleScale = new Animated.Value(0)
    this.rippleOpacity = new Animated.Value(this.maxOpacity)
    this.bgOpacity = new Animated.Value(0)
    this.state = {
      rippleSize: 0,
      duration: 0,
      rippleColor: props.rippleColor,
      pressX: 0,
      pressY: 0
    }
  }

  _onLayout = ({ nativeEvent: { layout } }) => {
    const { width, height } = layout;
    const rippleSize = Math.max(width, height) * 2
    let duration = Math.min(rippleSize * 1.5, 350)
    // this.props.ripple ? 350 : 200
    // if (rippleSize < 100 || ) {
    //   duration = 350
    // } else {
    //   duration = rippleSize * 1.5
    // }


    // const duration = Math.min(rippleSize * 1.5, 350)
    // 

    this.setState({
      rippleSize,
      duration
    })
  }

  _onPressIn = event => {
    this.props.onPressIn?.()
    // because we need ripple effect to be displayed exactly from press point
    this.setState({
      pressX: event.nativeEvent.locationX,
      pressY: event.nativeEvent.locationY,
    });

  };

  _onPress = (e) => {
    this.rippleEffect()
    this.props.onPress?.()
  }

  _onLongPress = (e) => {
    this.props.onLongPress?.()
    this.longPressed = true
    Animated.timing(this.bgOpacity, {
      toValue: this.maxOpacity / 2,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  _onPressOut = () => {
    this.props.onPressOut?.()

    if (this.longPressed) {
      this.longPressed = false;
      const { rippleSize } = this.state
      Animated.parallel([
        // Hide opacity background layer, slowly. It has to be done later than ripple
        // effect
        Animated.timing(this.bgOpacity, {
          toValue: 0,
          duration: 200 + rippleSize,
          useNativeDriver: true,
        }),
        // Opacity of ripple effect starts on maxOpacity and goes to 0
        Animated.timing(this.rippleOpacity, {
          toValue: 0,
          duration: 125 + rippleSize,
          useNativeDriver: true,
        }),
        // Scale of ripple effect starts at 0 and goes to 1
        Animated.timing(this.rippleScale, {
          toValue: 1,
          duration: 125 + rippleSize,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(this.resetAnimationValues);
    }
  }

  resetAnimationValues = () => {
    this.rippleOpacity.setValue(this.maxOpacity)
    this.rippleScale.setValue(0)
  }

  rippleEffect = () => {
    const { duration } = this.state

    Animated.parallel([
      Animated.timing(this.bgOpacity, {
        toValue: this.maxOpacity / 2,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      // Opacity of ripple effect starts on maxOpacity and goes to 0
      Animated.timing(this.rippleOpacity, {
        toValue: 0,
        duration: duration,
        // easing: Easing.linear,
        useNativeDriver: true,
      }),
      // Scale of ripple effect starts at 0 and goes to 1
      Animated.timing(this.rippleScale, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(
      () => {
        Animated.timing(this.bgOpacity, {
          toValue: 0,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

        this.resetAnimationValues();
      }
    )
  }

  renderOpacity = () => {
    return (
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: this.props.underlayColor,
            opacity: this.bgOpacity
          }
        ]}
      />
    )
  }

  renderRipple = () => {
    const { pressY, pressX, rippleSize, rippleColor } = this.state

    return (
      <Animated.View
        key="ripple-view"
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: (pressY) - rippleSize / 2,
            left: (pressX) - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            transform: [{ scale: this.rippleScale }],
            opacity: this.rippleOpacity,
            backgroundColor: rippleColor,
            zIndex: 1,
          },
        ]}
      />
    )
  }

  render() {

    const {
      children,
      style,
      ripple,
      disabled
    } = this.props

    return (
      <Pressable
        onLayout={this._onLayout}
        onPress={this._onPress}
        onPressIn={this._onPressIn}
        onLongPress={this._onLongPress}
        onPressOut={this._onPressOut}
        disabled={disabled}
        style={style}>

        {children}

        <View
          style={[style, styles.container]}
          pointerEvents="none">

          {this.renderOpacity()}
          {ripple && this.renderRipple()}

        </View>
      </Pressable>
    )
  }
}

RippleFeedback.defaultProps = {
  backgroundColor: 'transparent',
  rippleColor: '#FFF',
  underlayColor: '#FFF',
  disabled: false,
  ripple: true
}

export default RippleFeedback
