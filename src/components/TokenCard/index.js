import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Images, Colors} from '../../theme';
import {Paragraph} from '../../reuseableComponents/Typography';
import {ButtonView} from '../../reuseableComponents';

const Index = props => {
  const {data, onPress, active} = props;
  return (
    <ButtonView
      onPress={() => onPress(data.id)}
      style={[
        styles.container,
        data.id === active ? styles.activeContainer : {},
      ]}>
      <Paragraph size={18} color={Colors.white}>
        {data.label} Tokens
      </Paragraph>
      <Image source={Images.supportCoin} />
    </ButtonView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 83,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  activeContainer: {
    borderWidth: 1,
    borderColor: Colors.token,
  },
});
