import React from 'react';
import { View, Image, Text } from 'react-native';
import { Fonts } from '../../theme'
const ListEmpty = (props) => (
  <View style={styles.container}>
    {/* <Image source={require('./icons/list_empty.png')} style={styles.icon} /> */}
    <Text style={styles.description}>
      {props.message ?? 'No data found'}
    </Text>
  </View>
);

const styles = {
  icon: { width: 120, height: 120, resizeMode: 'contain', tintColor: '#A2A9B7' },
  container: {
    // padding: 64,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  description: {
    marginTop: 80,
    ...Fonts.Regular(20),
  },
};

export default ListEmpty;
