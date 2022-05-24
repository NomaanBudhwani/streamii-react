import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { INPUT_TYPES } from './constants';
import {
  getError,
  getKeyboardType,
  isSecureTextEntry,
  validate
} from './Utils';

class index extends Component {

  constructor(props) {
    super(props);

    this.length = props.children.length
    this.childrenRefs = props.children.map(() => React.createRef())
    this.childrenProps = []
    this.formdata = null
  }

  validateChildrens = () => {

    let isValid = true
    this.formdata = {} //reset formdata before validation

    for (let i = 0; i < this.length; i++) {

      const isOptional = this.childrenProps[i]?.optional

      const ref = this.childrenRefs[i]?.current
      const value = ref.getValue?.()
      const type = this.childrenProps[i]?.type

      const password = type == INPUT_TYPES.CONFIRM_PASSWORD ?
        this.childrenRefs[i - 1]?.current?.getValue?.() : ''

      if (!isOptional && !validate(value, type, password)) {
        const error = this.childrenProps[i]?.error
        const errorMessage = getError(type, value, error)
        ref.setError?.(true, errorMessage)
        isValid = false
      } else {
        const identifier = this.childrenProps[i]?.identifier
        this.formdata[identifier] = value
      }
    }

    return isValid
  }

  submitForm = () => {
    return this.validateChildrens() ? this.formdata : undefined;
  };

  _onSubmitEditing = (index) => ev => {
    const i = index
    if (i < this.length) {
      const nextChild = this.childrenRefs[i + 1]?.current
      const nextChildProps = this.childrenProps[i + 1]
      if (nextChild?.setFocus && !nextChildProps.disabled) {
        this.childrenRefs[i + 1].current.setFocus()
      } else {
        this._onSubmitEditing(i + 1)() // recurssion until find set focus
      }
    }
  }

  returnKeyAndBlurOnSubmit = (index) => {
    if (!this.childrenProps[index].multiline) {
      if (index < (this.length - 1)) {
        return { returnKeyType: 'next', blurOnSubmit: false }
      }
      return { returnKeyType: 'done', blurOnSubmit: true }
    }
  }

  collectChildProps = (props, index) => {

    this.childrenProps.push({
      identifier: props.identifier ?? `child_${index}`,
      type: props.type ?? INPUT_TYPES.TEXT,
      error: props.error ?? '',
      optional: props.optional ?? false,
      disabled: props.disabled ?? false,
      multiline: props.multiline ?? false
    })
  }

  render() {

    const _childrens = []
    const { children } = this.props

    React.Children.map(children, (child, index) => {

      this.collectChildProps(child.props, index)

      _childrens.push(
        React.cloneElement(
          child,
          {
            key: index + '',
            ref: this.childrenRefs[index],
            onSubmitEditing: this._onSubmitEditing(index),
            keyboardType: getKeyboardType(child.props),
            secureTextEntry: isSecureTextEntry(child.props),
            ...this.returnKeyAndBlurOnSubmit(index)
          }
        )
      )
    })

    return _childrens

  }
}

export default index
