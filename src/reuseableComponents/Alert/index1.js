import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { ButtonView } from '..';
import { AppStyles, Colors } from '../../theme';
import { Paragraph, Title } from '../Typography';
import styles from './styles'
import Modal from 'react-native-modal';

export class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      message: props.message
    }
  }

  setMessage = (message) => {
    this.setState({
      message
    })
  }

  show = () => {
    setTimeout(() => {
      this.setState({
        isVisible: true,
      })
    }, 300); // timeout to avoid clash on ios

  }

  hide = () => {
    this.setState({ isVisible: false })
  }

  _onConfirm = () => {
    if (!this.props.isChoiceAlert) {
      this.hide()
    }
    this.props.onConfirm?.()
  }

  render() {
    const { isVisible, message } = this.state
    const {
      onConfirm, title,
      btnPositiveText, isChoiceAlert
    } = this.props

    return (
      <Modal isVisible={isVisible} style={{ ...AppStyles.centerAligned }}>
        <View style={styles.container}>

          <Title style={styles.title} color={Colors.white}>
            {title}
          </Title>
          <Paragraph style={styles.message} color={Colors.white}>
            {message}
          </Paragraph>
          <View style={styles.btnContainer}>
            {isChoiceAlert &&
              <>
                <ButtonView style={styles.btn} onPress={this.hide}>
                  <Text
                    style={[
                      styles.btnText,
                      { color: '#FF0000' }
                    ]}>
                    No
                  </Text>
                </ButtonView>
                <View style={styles.seprator} />
              </>
            }
            <ButtonView style={styles.btn} onPress={this._onConfirm}>
              <Text
                style={styles.btnText}>
                {btnPositiveText}
              </Text>
            </ButtonView>
          </View>
        </View>
      </Modal>
    )
  }
}

export default index

index.defaultProps = {
  title: 'Alert!',
  message: '',
  btnPositiveText: 'Yes',
  isChoiceAlert: true
}


