import React, { useCallback, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import Metrics from '../../theme/Metrics';
import styles from './styles';

const index = (props) => {

  const { } = props

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}>
      <View style={{ margin: Metrics.baseMargin }}>
        <Text
          style={styles.txtContent}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
          }
        </Text>
        <Text
          style={styles.txtContent}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
          }
        </Text>
        <Text
          style={styles.txtContent}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
          }
        </Text>
        <Text
          style={styles.txtContent}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
          }
        </Text>
      </View>
    </ScrollView>
  );
}

export default index
