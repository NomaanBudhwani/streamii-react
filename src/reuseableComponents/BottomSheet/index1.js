import React, {
  forwardRef, memo, useImperativeHandle, useRef
} from 'react';
import { StyleSheet } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors, Metrics } from "../../theme";

const index = forwardRef((props, ref) => {

  const { children, onBsClose, height } = props
  const innerRef = useRef();

  useImperativeHandle(ref, () => ({
    show: () => innerRef.current.open(),
    hide: () => innerRef.current.close(),
  }));

  return (
    <RBSheet
      height={Metrics.heightRatio(height)}
      ref={innerRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={styles}
      animationType='fade'
      onClose={onBsClose}
      keyboardAvoidingViewEnabled={false}
    >
      {children}
    </RBSheet>
  )
})

index.defaultProps = {
  height: 260
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