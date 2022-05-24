import React, { useCallback, useRef } from 'react'
import { View, Text, Image } from 'react-native'
import { loggedInUser } from '../../data'
import { ImageButton } from '../../reuseableComponents'
import { Paragraph } from '../../reuseableComponents/Typography'
import { navigate, push } from '../../services/NavigationService'
import { AppStyles, Colors, Images } from '../../theme'
import styles from './styles'

const SupportContent = (props) => {

  const { style, sender, receiver, token, onPostOptions } = props

  const showPost = () => {
    navigate('PostDetail', { user: receiver })
  }

  const showArtistProfile = () => {
    push('OtherProfile', { user: receiver })
  }

  const showFanProfile = () => {
    push('OtherProfile', { user: sender })
  }

  return (
    <View style={[styles.supportContainer, style]}>
      <Image source={Images.coins} />
      <Paragraph style={styles.supportText}>
        <Paragraph color='white' onPress={showFanProfile}>
          {
            loggedInUser.id == sender.id ?
              'You '
              :
              sender.name + ' '
          }
        </Paragraph>
        support
        <Paragraph color='white' onPress={showArtistProfile}>
          {' ' + receiver.name + ' '}
        </Paragraph>
        with {token} tokens {' '}
        <Paragraph
          color={Colors.theme}
          onPress={showPost}>
          View Post
        </Paragraph>
      </Paragraph>
      <ImageButton
        source={Images.icVerticalDots}
        onPress={onPostOptions}
      />
    </View>
  )
}

export default SupportContent
