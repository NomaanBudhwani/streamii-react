import React from 'react';
import { ImageBackground, View, Image, StyleSheet } from 'react-native';
import { Paragraph } from '../../reuseableComponents/Typography';
import { Metrics, Colors, Images } from '../../theme';
import utility from '../../utility';

const Index = props => {
  const { data } = props;
  return (
    <ImageBackground
      source={Images.tokenCard}
      resizeMode="stretch"
      style={styles.subBg}>
      <View style={styles.contentCon}>
        <View style={styles.head}>
          <Paragraph size={24} color={Colors.white}>
            StreamMii
          </Paragraph>
          <View>
            <Paragraph size={12} color={Colors.white}>
              Last updated
            </Paragraph>
            <Paragraph style={styles.days} size={12} color={Colors.white}>
              {utility.timeFromNow(data.updated_at)}
            </Paragraph>
          </View>
        </View>
        <View style={styles.daysValue}>
          <Paragraph size={40} color={Colors.white}>
            {data.token}
          </Paragraph>
          <Image source={Images.tokenCoins} style={styles.tokenCoins} />
        </View>
        <Paragraph size={14} color={Colors.white}>
          Current Tokens
        </Paragraph>
      </View>
      {/* <Image source={Images.bgFade} /> */}
    </ImageBackground>
  );
};

export default Index;

const styles = StyleSheet.create({
  subBg: {
    marginHorizontal: Metrics.heightRatio(35)
  },
  contentCon: {
    padding: 20,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  days: {
    textAlign: 'right',
  },
  daysValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenCoins: {
    marginLeft: 10,
  },
});
