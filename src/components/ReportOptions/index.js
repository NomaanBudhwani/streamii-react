import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../actions/ServiceAction';
import constant from '../../constants';
import { AppButton, ImageButton } from '../../reuseableComponents';
import { Paragraph, Title } from '../../reuseableComponents/Typography';
import { closeBottomSheet } from '../../reuseableFunctions';
import { AppStyles, Colors, Fonts, Images, Metrics } from "../../theme";
import utility from '../../utility';

const index = (props) => {

  const { post, user } = props
  global.log({ post });
  const options = useSelector(({ userReportOptions }) => userReportOptions.data)
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const reasonRef = useRef();

  const onSelect = (option, index) => {
    setSelected(option)
    setIsError(false)
  }

  const renderOptions = (option, index) => {
    return (
      <View style={styles.option} key={option.title}>
        <Paragraph color={Colors.white}>
          {option.title}
        </Paragraph>
        <ImageButton
          round
          onPress={() => onSelect(option, index)}
          source={selected?.id == option.id ? Images.icSelected : Images.icUnselected}
        />
      </View>
    )
  }

  const renderError = () => {

    if (isError) {
      return (
        <Paragraph color={Colors.error} size={12} style={AppStyles.error}>
          {error}
        </Paragraph>
      )
    }
  }

  const onChangeText = (text) => { reasonRef.current = text }

  const onSubmit = () => {

    let reason = '';

    if (utility.isEmpty(selected)) {
      setIsError(true);
      setError('Please select a reason')
      return;
    }
    else if (selected.title == "Other" && utility.isEmpty(reasonRef.current)) {
      setIsError(true);
      setError('Please write a reason')
      return;
    } else {
      reason = reasonRef.current;
    }


    dispatch(
      request(
        constant.report,
        constant.serviceTypes.POST,
        { module: 'user', module_id: user.id, report_type_id: selected.id, reason },
        null,
        false,
      )
    )
    closeBottomSheet(true) //reset
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <Title size={14} style={styles.title}>
        Why are you reporting this account?
      </Title>
      <View style={AppStyles.vSmallMargin}>
        {
          options.map(renderOptions)
        }
      </View>
      <View style={{ marginBottom: Metrics.baseMargin }}>
        <TextInput
          placeholder='Write your reason here..'
          placeholderTextColor={Colors.white}
          style={styles.input}
          onChangeText={onChangeText}
          multiline={true}
        />
        {renderError()}
      </View>
      <AppButton
        onPress={onSubmit}
        title='Submit'
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.inactive,
    height: Metrics.heightRatio(55)
  },
  title: {
    textAlign: 'center',
    marginBottom: Metrics.baseMargin
  },
  input: {
    height: 78,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lynch,
    ...Fonts.Regular(13),

    paddingLeft: 15,
    paddingTop: 10
  }
})