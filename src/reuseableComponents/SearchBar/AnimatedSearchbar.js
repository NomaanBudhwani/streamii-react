import React, { Component } from 'react'
import { Animated, Easing, TextInput } from 'react-native'
import Metrics from '../../theme/Metrics';
import { ImageButton } from '../../reuseableComponents'
import { AppStyles, Colors, Images } from '../../theme';
import styles from './AnimatedStyles'
import _ from 'lodash'

const SCREEN_WIDTH = Metrics.screenWidth
const WIDTH = SCREEN_WIDTH - Metrics.heightRatio(32)
const AnimatedTextinput = Animated.createAnimatedComponent(TextInput)

export class AnimatedSearchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isExpanded: false,
      width: new Animated.Value(0),
      height: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }
  }

  _unexpandView = () => {
    this.textinput.blur()

    Animated.parallel([
      Animated.timing(this.state.width, {
        toValue: 0,
        duration: 200,
        easing: Easing.cubic,
        useNativeDriver: false
      }),
      Animated.timing(this.state.height, {
        toValue: 0,
        duration: 200,
        easing: Easing.back(2),
        useNativeDriver: false
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }),
    ]).start(() => {
      // this.textinput.clear()
      this.setState({ isExpanded: false })
    })

  }

  _expandView = () => {

    this.textinput.focus()
    Animated.parallel([
      Animated.timing(this.state.width, {
        toValue: this.props.width ?? WIDTH,
        duration: 300,
        easing: Easing.cubic,
        useNativeDriver: false
      }),
      Animated.timing(this.state.height, {
        toValue: 45,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }),
    ]).start(() => this.setState({ isExpanded: true }))
  }

  _onPress = () => {
    this.state.isExpanded ? this._unexpandView() : this._expandView()
  }

  _debounceChangeText = _.debounce((text) => {
    this.props.onChangeText?.(text)
  }, 1000)

  _onChangeText = (text) => {
    this.setState({ text })
    this._debounceChangeText(text)
  }


  render() {

    const { width, height, opacity, isExpanded, text } = this.state
    const { style, textinputStyle } = this.props

    return (
      <>
        <ImageButton
          source={
            isExpanded ? Images.icCancelMedium :
              Images.icSearch
          }
          onPress={this._onPress}
          style={styles.btnSearch}
          imgStyle={styles.btnImage}
        />
        <Animated.View
          style={[
            styles.container,
            {
              width,
              height,
              opacity
            },
            style
          ]}>

          <AnimatedTextinput
            ref={ref => this.textinput = ref}
            placeholder='Search here...'
            value={text}
            placeholderTextColor={Colors.white}
            onChangeText={this._onChangeText}
            autoCompleteType={'off'}
            autoCorrect={false}
            style={[
              styles.textinput,
              {
                width,
                height,
                opacity
              },
              textinputStyle
            ]}
          />

        </Animated.View>
      </>
    )
  }
}

export default AnimatedSearchbar


AnimatedSearchbar.defaultProps = {
  right: true
}