import React, { useEffect } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { SET_USER_TYPE } from '../../actions/ActionTypes'
import { defaultAction } from '../../actions/ServiceAction'
import { loggedInUser } from '../../data'
import { navigate } from '../../services/NavigationService'
import { Images } from '../../theme'
import { USER_TYPES } from '../../theme/String'
import styles from './styles'

const index = (props) => {

  const { } = props
  const dispatch = useDispatch()

  const onPress = (type) => {
    loggedInUser.userType = type
    dispatch(defaultAction(SET_USER_TYPE, type))
    navigate('Signup')
  }

  return (

    <ImageBackground source={Images.usertype} style={styles.bgImage}>
      <TouchableOpacity
        style={{ flex: 1, opacity: 1 }}
        onPress={() => onPress(USER_TYPES.FAN)}
      />
      <TouchableOpacity
        style={{ flex: 1, opacity: 1 }}
        onPress={() => onPress(USER_TYPES.ARTIST)}
      />
    </ImageBackground>
  )
}

export default index
