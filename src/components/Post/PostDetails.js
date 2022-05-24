import React, { useCallback, useRef } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { AppStyles, Images } from '../../theme'
import styles from './styles'
import { Paragraph } from '../../reuseableComponents/Typography'
import { TextButton } from '../../reuseableComponents'
const PostDetails = (props) => {

  const {
    likes,
    dislikes,
    comments,
    onShowReacted,
    onShowComments
  } = props

  return (
    <ImageBackground
      source={Images.bgFade}
      style={styles.bgFade}
    >
      <View style={styles.detailsContainer}>
        <TextButton
          onPress={onShowReacted}
          title={`${likes} likes - ${dislikes} dislikes`}
          textSize={13}
        />

        <TextButton
          onPress={onShowComments}
          title={`${comments} Comments`}
          textSize={13}
        />
      </View>
    </ImageBackground>
  )
}

export default PostDetails
