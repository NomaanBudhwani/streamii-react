import React, { useEffect } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { UPLOAD_PROGRESS } from '../../actions/ActionTypes'
import { defaultAction } from '../../actions/ServiceAction'
import { useMergeState } from '../../hooks'
import { CircularProgress } from '../../reuseableComponents'
import { Title } from '../../reuseableComponents/Typography'
import { subscribeBusEvent } from '../../reuseableFunctions'
import { pop } from '../../services/NavigationService'
import { AppStyles } from '../../theme'
import { BUS_EVENTS } from '../../theme/String'
import styles from './styles'
import { Colors } from '../../theme'
const index = (props) => {

  const { onUploadComplete } = props
  const [state, setState] = useMergeState({
    visible: false
  })
  const progress = useSelector(({ uploadProgress }) => uploadProgress.progress)

  const dispatch = useDispatch()
  useEffect(() => {
    subscribeBusEvent(BUS_EVENTS.SHOW_UPLOAD_MODAL, show);
    subscribeBusEvent(BUS_EVENTS.CLOSE_UPLOAD_MODAL, hide);
  }, []);

  const show = (args) => {
    setState({
      ...args,
      visible: true
    })
  }

  const hide = () => {
    setState({ visible: false });
  }

  const _onModalHide = () => {
    dispatch(defaultAction(UPLOAD_PROGRESS, { progress: 0 }))
  }

  return (
    <Modal
      onModalHide={_onModalHide}
      animationIn="zoomIn"
      animationOut="fadeOut"
      backdropColor={Colors.greenishBlack}
      isVisible={state.visible}
      style={styles.modal}>
      <View style={styles.container}>
        <CircularProgress
          progress={progress}
        />
        <Title style={AppStyles.leftMargin10}>
          Posting...
        </Title>
      </View>
    </Modal>
  )
}

export default index
