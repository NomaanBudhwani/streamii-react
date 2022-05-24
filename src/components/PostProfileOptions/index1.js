import React, {
  forwardRef,
  memo, useEffect, useImperativeHandle,
  useRef
} from 'react';
import { StyleSheet, View } from 'react-native';
import { ReportOptions } from '..';
import { useMergeState } from '../../hooks';
import { BottomSheet, Separator, TextButton } from '../../reuseableComponents';
import { navigate } from '../../services/NavigationService';
import { Colors, Metrics } from "../../theme";
import { BS_CONTENT_TYPES, POST_TYPES } from '../../theme/String';

const { REPORT_OPTIONS, POST_PROFILE_OPTIONS } = BS_CONTENT_TYPES

const index = forwardRef((props, ref) => {

  const {
    isMyPost, onBlock, onReport,
    onEdit, onRemove, post, user
  } = props
  const mountRef = useRef(false)
  const [state, setState] = useMergeState({
    visible: false,
    height: 180,
    type: POST_PROFILE_OPTIONS
  })

  const bsRef = useRef()

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true
    } else {
      if (state.visible) {
        bsRef.current.show()
      }
      else {
        bsRef.current.hide()
      }
    }
  }, [state.visible])

  useImperativeHandle(ref, () => ({
    show: (height = 180) => {
      setState({ ...state, height, visible: true })
    },
    hide: () => {
      setState({ visible: false })
    }
  }));

  const closeBs = () => {
    if (state.visible) {
      let _state = {}
      if (state.type != POST_PROFILE_OPTIONS) {
        _state = { type: POST_PROFILE_OPTIONS, height: 180, }
      }
      setState({ ..._state, visible: false })
    }
  }

  const editPost = () => {
    setState({ visible: false })
    navigate('CreatePost', { post })
  }

  const removePost = () => {
    setState({ visible: false })
  }

  const confirmBlock = () => {
    setState({ visible: false })
  }

  const block = () => {
    global.log('block');
  }

  const submitReport = (data) => {
    setState({ visible: false })
    global.log({ data });
  }

  const showReportOptions = () => {
    setState({ visible: false })
    setTimeout(() => {
      setState({ height: 522, type: REPORT_OPTIONS, visible: true })
    }, 300)
  }

  const renderOptions = () => {
    return (
      <View style={styles.container}>
        {
          isMyPost && post?.type == POST_TYPES.SUPPORT ? null :
            <>
              <TextButton
                onPress={isMyPost ? editPost : showReportOptions}
                style={styles.btn}
                title={isMyPost ? 'Edit' : 'Report'}
              />
              <Separator color={Colors.inactive} />
            </>
        }
        <TextButton
          onPress={isMyPost ? removePost : onBlock}
          style={styles.btn}
          title={isMyPost ? 'Remove' : 'Block'}
        />
      </View>
    )
  }

  const renderReportOptions = () => {
    return (
      <ReportOptions
        onSubmit={submitReport}
      />
    )
  }

  return (
    <BottomSheet
      ref={bsRef}
      height={state.height}
      onBsClose={closeBs}>

      {
        state.type === POST_PROFILE_OPTIONS ?
          renderOptions() : renderReportOptions()
      }

    </BottomSheet>
  )
})


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.baseMargin
  },
  btn: {
    alignItems: 'flex-start',
    paddingVertical: Metrics.heightRatio(18),
  }
})
export default memo(index)

