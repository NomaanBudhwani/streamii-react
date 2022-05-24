
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo
} from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { AppStyles, Colors } from '../../theme';
import { Paragraph, Text } from '../Typography';
import styles, { blurStyle, errorStyle } from './styles'

const index = forwardRef((props, ref) => {

  const {
    data,
    onChangeValue,
    defaultValue,
    renderItem
  } = props

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(props.error ?? 'Please Select');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setError: (val, err = error) => {
      setIsError(val)
      setError(err)
    }
  }));

  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])

  useEffect(() => {
    if (defaultValue?.id) {
      setValue(defaultValue.id) //dropdown lib only sets value
    }
  }, [defaultValue])

  const renderError = () => {

    if (isError) {
      return (
        <Paragraph color={Colors.error} size={12} style={AppStyles.error}>
          {error}
        </Paragraph>
      )
    }
  }

  const selectedStyle = value ? styles.selected : {}
  const styling = isError ? errorStyle : blurStyle

  return (
    <View>
      {value && <Text style={[styles.label, styling.label]}>{props.placeholder}</Text>}
      <DropDownPicker
        {...props}
        open={open}
        value={value}
        onChangeValue={onChangeValue}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        containerStyle={styles.container}
        style={[
          styles.wrapper,
          styling.wrapper
        ]}
        textStyle={[styles.textStyle, styling.label, selectedStyle]}
        listItemLabelStyle={styles.listItemLabelStyle}
        selectedItemLabelStyle={styles.selectedItemLabelStyle}
        arrowIconStyle={[styles.arrowIconStyle, styling.arrow]}
        tickIconStyle={styles.tickIconStyle}
        listMode="MODAL"
        modalProps={{
          animationType: 'slide'
        }}
        modalContentContainerStyle={styles.modal}
        flatListProps={{
          contentContainerStyle: styles.scroll
        }}
        closeIconStyle={{
          tintColor: Colors.lynch
        }}
        searchContainerStyle={{
          borderBottomColor: Colors.lynch
        }}
        renderListItem={renderItem}
      />
      {renderError()}
    </View>
  )
})

const propsAreEqual = (prevProps, nextProps) => {

  if (prevProps.data != nextProps.data ||
    prevProps.defaultValue != nextProps.defaultValue) {
    return false
  }
  return true
}

export default memo(index, propsAreEqual)


