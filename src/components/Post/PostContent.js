import React, { memo, useContext } from 'react'
import { View, Text } from 'react-native'
import { PostContext } from '../../contexts'
import { AudioPlayer, VideoPlayer } from '../../reuseableComponents'
import { Paragraph } from '../../reuseableComponents/Typography'
import { AppStyles, Colors } from '../../theme'
import utility from '../../utility'
import PostDetails from './PostDetails'
import styles from './styles'
import SupportContent from './SupportContent'

const PostContent = (props) => {

  const { onShowReacted, onShowComments, onPostOptions, name, } = props
  const {
    id, post_type, media_file, media_thumbnail_url,
    total_like, total_dislike, total_comment,
    title, sender, receiver, supportValue
  } = useContext(PostContext)

  const renderPostMessage = () => {
    if (utility.isEmpty(title)) return null

    return (
      <Paragraph
        size={13}
        color={Colors.white}
        style={styles.message}>
        {title}
      </Paragraph>
    )
  }

  const renderContent = () => {

    switch (post_type) {
      case 'video':
        return (
          <VideoPlayer
            id={id}
            name={name}
            source={media_file}
            poster={media_thumbnail_url}
          />
        );
      case 'audio':
        return (
          <AudioPlayer
            id={id}
            name={name}
            source={media_file}
            style={styles.contentMargin}
          />
        );
      case 'support':
        return (
          <SupportContent
            id={id}
            onPostOptions={onPostOptions}
            token={supportValue}
            sender={sender}
            receiver={receiver}
            style={styles.contentMargin}
          />
        );
      default:
        return <View />
    }
  }

  return (
    <View style={styles.contentContainer}>
      {renderPostMessage()}
      <View style={styles.contentWrapper}>
        {renderContent()}
      </View>
      <PostDetails
        likes={total_like}
        dislikes={total_dislike}
        comments={total_comment}
        onShowReacted={onShowReacted}
        onShowComments={onShowComments}
      />
    </View>
  )
}



export default PostContent
