import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Images, Colors, Metrics } from '../../theme';
import { Paragraph, Title } from '../../reuseableComponents/Typography';
import { ButtonView } from '../../reuseableComponents';

const Index = props => {
  const { data, onPress, active } = props;
  return (
    <View style={styles.container}>
      <ButtonView
        onPress={() => onPress(data.id)}
        style={[styles.btn, data.id === active ? styles.activeContainer : {}]}>
        <Image source={Images.buyToken} />
        <Title style={styles.text} size={22} color={Colors.white}>
          {`${data.label} Tokens \n $${data.price}`}
        </Title>
        <Paragraph size={18} color={Colors.white}></Paragraph>
      </ButtonView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginRight: 30,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.darkGrey,
    height: 290,
    borderRadius: 40,
    width: 256,
    // width: '70%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 20,
  },
  activeContainer: {
    borderWidth: 1,
    borderColor: Colors.token,
  },
  text: {
    lineHeight: 25,
    textAlign: 'center',
  },
});
