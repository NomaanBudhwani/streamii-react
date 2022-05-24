import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useMergeState } from '../../hooks';
import { ButtonView } from '../../reuseableComponents';
import { subscribeBusEvent } from '../../reuseableFunctions';
import { AppStyles, Colors } from '../../theme';
import { BUS_EVENTS } from '../../theme/String';
import { Paragraph, Title } from '../Typography';
import styles from './styles';

const index = forwardRef((props, ref) => {
  const [state, setState] = useMergeState({
    visible: false,
    title: 'Alert!',
    message: '',
    rightPressText: 'Yes',
    onRightPress: null,
    leftPressText: 'No',
    onLeftPress: null,
    canChoose: true,
    isRightNegative: false,
  });

  useEffect(() => {
    subscribeBusEvent(BUS_EVENTS.SHOW_ALERT, show);
    subscribeBusEvent(BUS_EVENTS.CLOSE_ALERT, hide);
  }, []);

  const show = args => {
    setState({
      ...args,
      visible: true,
    });
  };

  const hide = () => {
    setState({ visible: false });
    !state.canChoose && state.onRightPress?.()
  };

  const setMessage = message => {
    setState({ message });
  };

  useImperativeHandle(ref, () => ({
    show,
    hide,
    setMessage,
  }));

  return (
    <Modal isVisible={state.visible} style={{ ...AppStyles.centerAligned }}>
      <View style={styles.container}>
        <Title style={styles.title} color={Colors.white}>
          {state.title}
        </Title>
        <Paragraph style={styles.message} color={Colors.white}>
          {state.message}
        </Paragraph>
        <View style={styles.btnContainer}>
          {state.canChoose && (
            <>
              <ButtonView
                onPress={state.onLeftPress ?? hide}
                style={styles.btn}>
                <Text
                  style={[
                    styles.btnText,
                    { color: state.isRightNegative ? Colors.theme : '#FF0000' },
                  ]}>
                  {state.leftPressText}
                </Text>
              </ButtonView>
              <View style={styles.seprator} />
            </>
          )}
          <ButtonView
            onPress={
              !state.canChoose || !state.onRightPress
                ? hide
                : state.onRightPress
            }
            style={styles.btn}>
            <Text
              style={[
                styles.btnText,
                { color: state.isRightNegative ? '#FF0000' : Colors.theme },
              ]}>
              {state.canChoose ? state.rightPressText : 'Ok'}
            </Text>
          </ButtonView>
        </View>
      </View>
    </Modal>
  );
});

export default index;
