import _ from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useMergeState } from '../../hooks'
import { Avatar, TextButton, TextImageButton } from '../../reuseableComponents'
import { Paragraph, Title } from '../../reuseableComponents/Typography'
import { AppStyles, Colors, Images } from '../../theme'
import utility from '../../utility'
import styles from './styles'
import { like, dislike } from '../../CommonApis'
const index = (props) => {

  const {
    comment: {
      id,
      parent_id,
      comment,
      image_url,
      username,
      is_user_like,
      is_user_dislike,
      total_like,
      total_dislike,
      created_at,
    },
    onReply,
    // onLike,
    // onDislike,
    style
  } = props

  const [state, setState] = useMergeState({
    isLiked: is_user_like,
    isDisliked: is_user_dislike,
    likeCount: total_like ?? 0,
    dislikeCount: total_dislike ?? 0
  })

  // global.log({ comment: id });
  const likeStyle = useMemo(() => state.isLiked ?
    {
      source: Images.icLiked,
      titleColor: Colors.like
    } :
    {
      source: Images.icUnliked,
      titleColor: Colors.inactive
    },
    [state.isLiked]
  );

  const dislikeStyle = useMemo(() => state.isDisliked ?
    {
      source: Images.icDisliked,
      titleColor: Colors.dislike
    } :
    {
      source: Images.icUnDisliked,
      titleColor: Colors.inactive
    },
    [state.isDisliked]
  );

  const onLike = useCallback(() => {

    like({ module: 'user_comments', module_id: id })

    let newState = { ...state }

    if (state.isLiked) {
      newState['likeCount']--;
    } else {
      newState['likeCount']++;
    }

    newState['isLiked'] = !state.isLiked;

    if (state.isDisliked) {
      newState['isDisliked'] = false;
      newState['dislikeCount']--;
    }

    setState(newState)
  }, [])

  const onDislike = useCallback(() => {

    dislike({ module: 'user_comments', module_id: id })

    let newState = { ...state }

    if (state.isDisliked) {
      newState['dislikeCount']--;
    } else {
      newState['dislikeCount']++;
    }

    newState['isDisliked'] = !state.isDisliked;

    if (state.isLiked) {
      newState['isLiked'] = false;
      newState['likeCount']--;
    }

    setState(newState)
  }, [])

  return (
    <View style={style}>
      <View style={styles.container}>
        <Avatar
          source={{ uri: image_url }}
        />
        <View style={AppStyles.flex}>
          <View style={[AppStyles.flexRow, AppStyles.leftMargin10]}>
            <Title
              size={13}
              numberOfLines={1}
              style={styles.title}
            >
              {username}
            </Title>
            <Paragraph size={11}>
              {utility.timeFromNow(created_at)}
            </Paragraph>
          </View>
          <Paragraph
            size={14}
            color={Colors.white}
            style={styles.comment}>
            {comment}
          </Paragraph>
          <View style={styles.actionContainer}>
            <TextButton
              onPress={() => onReply(id, parent_id)}
              title='Reply'
              textColor={Colors.theme}
            />
            <View style={[AppStyles.flexRow]}>
              <TextImageButton
                onPress={onLike}
                title={state.likeCount ?? 0}
                {...likeStyle}
              />
              <TextImageButton
                onPress={onDislike}
                title={state.dislikeCount ?? 0}
                {...dislikeStyle}
              />
            </View>
          </View>
        </View>
      </View>
      {/* {children} */}
    </View>
  )
}

const propsAreEqual = (prevProps, nextProps) => _.isEqual(prevProps.comment, nextProps.comment)

export default memo(index, propsAreEqual)
