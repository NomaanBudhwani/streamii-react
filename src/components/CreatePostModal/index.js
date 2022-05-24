import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  useState,
  forwardRef
} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, AppStyles, Images } from "../../theme";
import Modal from 'react-native-modal';
import { TextImageButton } from '../../reuseableComponents'
import { navigate } from '../../services/NavigationService'

const index = forwardRef((props, ref) => {

  const { } = props
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  const _onPress = (postType) => {
    setVisible(false)
    navigate('CreatePost', { postType })
  }

  return (
    <Modal
      onBackdropPress={() => setVisible(false)}
      isVisible={visible}
      style={styles.modal}>
      <View style={AppStyles.flexRow}>
        <TextImageButton
          onPress={() => _onPress('audio')}
          source={Images.icAudio}
          title='Audio'
          style={[styles.btn, { marginRight: Metrics.heightRatio(40) }]}
          titleStyle={styles.title}
        />
        <TextImageButton
          onPress={() => _onPress('video')}
          source={Images.icVideo}
          title='Video'
          style={styles.btn}
          titleStyle={styles.title}
        />
      </View>
    </Modal>
  )
})

export default index


const styles = StyleSheet.create({
  modal: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    margin: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btn: {
    flexDirection: 'column',
  },
  title: {
    ...Fonts.Regular(13),
    marginTop: Metrics.smallMargin
  }
})