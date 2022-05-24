import React, { memo, useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { CommentsCell } from '../../components'
import { useMergeState } from '../../hooks'
import { CommentInput, FlatListHandler, Separator } from '../../reuseableComponents'
import { comments } from '../../data'
import { AppStyles, Metrics } from '../../theme'
import utility from '../../utility'
import KeyboardManager from 'react-native-keyboard-manager';
import { getComments } from '../../CommonApis'
import constant from '../../constants'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { request } from '../../actions/ServiceAction'
import { commentOnAPost, normalizeComments } from '../../reuseableFunctions'

let parentId = 0;

const _keyExtractor = (item) => item + ''

const pageSize = 10;

// =============================================================================
// post id is required to fetch comments
// =============================================================================
const index = (props) => {

  const { route: { params } } = props
  const mountRef = useRef(false);
  const commentInputRef = useRef();
  const commentRef = useRef('');
  const dispatch = useDispatch();

  const [state, setState] = useMergeState({
    comments: {},
    commentIds: [],
    isFetching: false,
    meta: constant.serviceMeta,
  });

  useEffect(() => {

    fetchComments();

    if (!mountRef.current) {
      mountRef.current = true;
    }

    if (utility.isPlatformIOS()) {
      KeyboardManager.setEnable(false);
      KeyboardManager.setEnableAutoToolbar(false);
    }

    return () => {
      mountRef.current = false;
      if (utility.isPlatformIOS()) {
        KeyboardManager.setEnable(true);
        KeyboardManager.setEnableAutoToolbar(true);
      }
    }

  }, [])

  const updateState = (state = {}) => {
    if (mountRef.current) {
      setState(state);
    }
  };

  const fetchComments = (isConcat = false, payload = {}) => {

    payload['module_id'] = params.postId;
    payload['limit'] = pageSize;
    setState({ isFetching: true })
    getComments(
      isConcat,
      payload,
      (comments, meta) => cbOnSuccess(comments, meta, isConcat),
      cbOnFailure
    )
  }

  const cbOnSuccess = (comments, meta, isConcat) => {

    if (!comments.length) {
      updateState({ isFetching: false })
      return
    }

    const normalizedComments = normalizeComments(comments);

    let _comments = { ...state.comments, ...normalizedComments.comments };
    let commentIds = normalizedComments.commentIds;

    if (isConcat) {
      commentIds = _.concat(state.commentIds, commentIds)
    }

    updateState({ comments: _comments, commentIds, meta, isFetching: false })
  }

  const cbOnFailure = () => {
    updateState({ isFetching: false })
  }

  const onCommentTextChange = (text) => {
    commentRef.current = text
  }

  const onSendComment = () => {
    commentInputRef.current.inputRef.blur()
    dispatch(
      request(
        constant.comment,
        constant.serviceTypes.POST,
        {
          module: 'posts',
          module_id: params.postId,
          comment: commentRef.current,
          parent_id: parentId,
        },
        null,
        false,
        false,
        cbOnCommentSuccess
      )
    )
  }

  const cbOnCommentSuccess = (comment) => {

    commentOnAPost(params.postId);

    if (comment.parent_id) {
      updateState({
        comments: {
          ...state.comments,
          [comment.parent_id]: {
            ...state.comments[comment.parent_id],
            child: [
              ...state.comments[comment.parent_id].child,
              comment
            ]
          }
        }
      })
    } else {
      updateState({
        commentIds: [...state.commentIds, comment.id],
        comments: {
          ...state.comments,
          [comment.id]: comment
        }
      })
    }

    parentId = 0;

  }

  const onReply = (id, parent_id) => {
    commentInputRef.current.inputRef.focus()
    parentId = parent_id ? parent_id : id
  }

  const _renderItem = ({ item, index }) => {

    const comment = state.comments[item]

    return (
      <View>
        <CommentsCell
          key={item}
          comment={comment}
          onReply={onReply}
        // onLike={onLike}
        // onDislike={onDislike}
        />
        {
          comment.child.map((item, index) => (
            <CommentsCell
              key={item.id}
              comment={item}
              onReply={onReply}
              // onLike={onLike}
              // onDislike={onDislike}
              style={{ marginLeft: Metrics.heightRatio(48) }}
            />
          ))
        }
        <Separator />
      </View>
    )
  }

  return (
    <View style={AppStyles.flex}>
      <FlatListHandler
        data={state.commentIds}
        renderItem={_renderItem}
        fetchRequest={fetchComments}
        meta={state.meta}
        isFetching={state.isFetching}
        keyExtractor={_keyExtractor}
        pageSize={pageSize}
      />
      <CommentInput
        ref={commentInputRef}
        placeholder='Add Comment'
        onChangeText={onCommentTextChange}
        onSend={onSendComment}
      />
    </View>
  )
}

export default memo(index)
