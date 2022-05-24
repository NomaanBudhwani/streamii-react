import React, { memo, useCallback } from 'react'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostActions from './PostActions'
import { PostContext } from '../../contexts'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash'

const postSelector = createSelector(
  (state) => state.generalPosts?.data,
  (_, postId) => postId,
  (posts, postId) => {
    global.log({ posts, postId });
    return posts[postId]
  }
)

const index = (props) => {

  const {
    name,
    postId,
    onLike,
    onDislike,
    onComment,
    onToken,
    onShowReacted,
    onShowComments,
    onPostOptions
  } = props

  // postSelector(state, postId)
  const post = useSelector(
    (state) => state.generalPosts?.data?.[postId],
    (prev, next) => _.isEqual(prev, next)
    // prev == next
  )

  if (!post) return null;

  // global.log({ [name]: postId });

  return (
    <PostContext.Provider value={post}>
      {
        post.type != 'support' &&
        <PostHeader
          onPostOptions={onPostOptions}
        />
      }
      <PostContent
        name={name}
        onShowReacted={onShowReacted}
        onShowComments={onShowComments}
        onPostOptions={onPostOptions}
      />
      <PostActions
        onLike={onLike}
        onDislike={onDislike}
        onComment={onComment}
        onToken={onToken}
      />
    </ PostContext.Provider>
  )
}

const propsAreEqual = (prevProps, nextProps) => _.isEqual(prevProps, nextProps)

export default memo(index, propsAreEqual)
