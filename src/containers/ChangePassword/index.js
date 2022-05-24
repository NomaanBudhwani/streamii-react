import React, { useCallback, useRef } from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { request } from '../../actions/ServiceAction'
import constant from '../../constants'
import { AppButton, FormHandler, Textfield } from '../../reuseableComponents'
import { INPUT_TYPES } from '../../reuseableComponents/FormHandler/constants'
import { showAlert } from '../../reuseableFunctions'
import { pop } from '../../services/NavigationService'
import { AppStyles } from '../../theme'
import styles from './styles'

const index = (props) => {

  const { } = props
  const formRef = useRef()
  const dispatch = useDispatch()

  const onSubmit = () => {
    const formdata = formRef.current.submitForm()
    global.log({ formdata });
    if (formdata) {
      const payload = {
        current_password: formdata.password,
        new_password: formdata.newpassword,
        confirm_password: formdata.confirmpassword
      }
      dispatch(
        request(
          constant.changePassword,
          constant.serviceTypes.POST,
          payload,
          null,
          true,
          false,
          cbOnSuccess
        )
      )
    }
  }

  const cbOnSuccess = (res, meta, message) => {
    showAlert({
      title: 'Success',
      message: 'Your password changed successfully',
      canChoose: false,
      onRightPress: () => pop()
    })
  }

  return (
    <View style={styles.mainContainer}>
      <FormHandler ref={formRef}>
        <Textfield
          label="Password"
          identifier="password"
          type={INPUT_TYPES.PASSWORD}
          error="Old Password is required"
        />
        <Textfield
          label="New Password"
          identifier="newpassword"
          type={INPUT_TYPES.PASSWORD}
          error="New Password is required"
        />
        <Textfield
          label="Confirm Password"
          identifier="confirmpassword"
          type={INPUT_TYPES.CONFIRM_PASSWORD}
        />
      </FormHandler>
      <AppButton title="Save" style={styles.btn} onPress={onSubmit} />
    </View>
  )
}

export default index
