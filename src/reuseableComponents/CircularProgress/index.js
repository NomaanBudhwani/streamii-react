import React, { useRef, useEffect } from 'react'
import { View, Animated, Image } from 'react-native'
import { Images } from '../../theme'
import styles from './styles'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector } from 'react-redux';

const index = (props) => {

  const { progress } = props


  return (
    <AnimatedCircularProgress
      size={36}
      width={3}
      fill={progress}
      rotation={0}
      tintColor="#0A94FF"
      backgroundColor="#51525A"
    />
  )
}

export default index
