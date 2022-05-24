import React, {
  forwardRef, memo, useEffect, useImperativeHandle, useState
} from 'react';
import { Image, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Images } from '../../theme';
import utility from '../../utility';
import ButtonView from '../ButtonView';
import { Text } from '../Typography';
import styles from './styles';
import _ from 'lodash'

const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 13))

const index = forwardRef((props, ref) => {

  const {
    placeholder,
    defaultValue
  } = props

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      const date = new Date(defaultValue)
      setValue(date)
    }
  }, [defaultValue])

  useImperativeHandle(ref, () => ({
    getValue: () => _.isDate(value) && utility.dateFormat(value, 'YYYY-MM-DD'),
    // setError: (val, error = state.error) => this.setState({ isError: val, error })
  }));

  const showPicker = () => {
    setOpen(true);
  };

  const hidePicker = () => {
    setOpen(false);
  };

  const handleConfirm = (date) => {
    setValue(date)
    hidePicker();
  };

  const selectedStyle = value ? styles.selected : {}

  return (
    <View style={styles.container}>
      {value && <Text style={styles.label}>{props.placeholder}</Text>}
      <ButtonView style={styles.button} onPress={showPicker}>
        <Text style={[styles.value, selectedStyle]}>
          {value ? utility.dateFormat(value, 'DD-MM-YYYY') : placeholder}
        </Text>
        <Image source={Images.icCalendar} />
      </ButtonView>
      <DateTimePickerModal
        isVisible={open}
        date={value ?? maxDate}
        maximumDate={maxDate}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </View>
  )
})

export default memo(index)
