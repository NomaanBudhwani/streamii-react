import React, {
  forwardRef, memo, useEffect, useImperativeHandle, useRef
} from 'react';
import { StyleSheet } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { PostProfileOptions, ReportOptions } from '../../components';
import { useMergeState } from '../../hooks';
import { subscribeBusEvent } from '../../reuseableFunctions';
import { Colors, Metrics } from "../../theme";
import { BS_CONTENT_TYPES, BUS_EVENTS } from '../../theme/String';

const {
  POST_PROFILE_OPTIONS,
  REPORT_OPTIONS
} = BS_CONTENT_TYPES

const INITIAL_STATE = {
  visible: false,
  contentType: null,
  type: null, //post or profile
  data: null,
  height: 180
}

const index = forwardRef((props, ref) => {

  const { children, onBsClose, height } = props
  const innerRef = useRef();
  const mountRef = useRef(false)
  const stateRef = useRef()

  const [state, setState] = useMergeState(INITIAL_STATE)

  useEffect(() => {
    if (!mountRef.current) {
      //on mount
      mountRef.current = true
      subscribeBusEvent(BUS_EVENTS.SHOW_BOTTOM_SHEET, showBs)
      subscribeBusEvent(BUS_EVENTS.CLOSE_BOTTOM_SHEET, hideBs)
    } else {
      if (state.visible) {
        innerRef.current.open()
      } else {
        innerRef.current.close()
      }
    }

  }, [state.visible])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useImperativeHandle(ref, () => ({
    show: () => innerRef.current.open(),
    hide: () => innerRef.current.close(),
  }));

  const showBs = (args) => {
    setState({
      ...args,
      visible: true
    })
  }

  const hideBs = (reset) => {
    if (stateRef.current.visible) {
      let newState = { visible: false }
      if (reset) {
        newState = { ...INITIAL_STATE }
      }
      setState(newState)
    }
  }

  const renderContent = () => {
    const { contentType, data, type } = state

    switch (contentType) {
      case POST_PROFILE_OPTIONS:
        return (
          <PostProfileOptions
            type={type}
            post={data}
            user={data}
          />
        )
      case REPORT_OPTIONS:
        return (
          <ReportOptions
            post={data} // post or user
            user={data}
          />
        )
      default:
        return null;
    }
  }

  return (

    <RBSheet
      height={Metrics.heightRatio(state.height)}
      ref={innerRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={styles}
      animationType='fade'
      keyboardAvoidingViewEnabled={false}
      onClose={hideBs}>

      {renderContent()}
    </RBSheet>

  )
})

index.defaultProps = {
  height: 180
}

const propsAreEqual = (prevProps, nextProps) => {

  if (prevProps.height !== nextProps.height) {

    return false
  }

  return true
}

export default memo(index, propsAreEqual)


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.shark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wrapper: {
    backgroundColor: Colors.backdrop,
  },
  draggableIcon: {
    backgroundColor: Colors.grey
  }
})