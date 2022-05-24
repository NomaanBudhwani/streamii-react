import React, { useCallback, useState } from 'react';
import { ImageBackground, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { Images, Colors, AppStyles, Metrics } from '../../theme';
import styles from './styles.js';
import { DATA, TOKEN_DETAILS } from './mock_data';
import { BuyTokenCard, TokenDetailsCard } from '../../components';
import { Paragraph, Title } from '../../reuseableComponents/Typography';
import { AppButton } from '../../reuseableComponents';

const Index = props => {
  const { route } = props;
  const [selected, setSelected] = useState('');
  const onSelect = value => {
    setSelected(value);
  };

  const _renderItem = useCallback(data => {
    return (
      <BuyTokenCard
        key={data.id}
        active={selected}
        onPress={onSelect}
        data={data}
      />
    );
  }, [selected]);

  const isBuyToken = route.params?.isBuyToken ?? null

  return (
    <ScrollView contentContainerStyle={AppStyles.listStyle}>
      <ImageBackground
        source={Images.tokenBg}
        resizeMode='stretch'
        style={[AppStyles.percent100,
        { marginTop: isBuyToken ? 0 : Metrics.navBarHeight, }
        ]}>
        {isBuyToken ?
          <>
            <Title size={20} color={Colors.white} style={styles.title}>
              Buy Tokens
            </Title>
            <Paragraph size={15} style={styles.para}>
              {"Buy tokens to support your favourite \nartist"}
            </Paragraph>
          </>
          :
          <View style={styles.tokenDetail}>
            <TokenDetailsCard data={TOKEN_DETAILS} />
            <View>
              <Image style={styles.blurImage} source={Images.blurToken} />
            </View>
          </View>
        }
        <View
          style={isBuyToken ? styles.containerTwoText : styles.containerTwoCard}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ paddingLeft: 50 }}
            showsHorizontalScrollIndicator={false}>
            {DATA.map(_renderItem)}
          </ScrollView>
          <AppButton title="Pay Now" style={styles.btn} onPress={() => null} />
          {isBuyToken &&
            <Paragraph style={styles.note} size={12} color={Colors.lynch}>
              Subscriptions billed as one-time payments. Reccurring billing. Cancel
              anytime.
            </Paragraph>
          }
        </View>

      </ImageBackground>
    </ScrollView>

  );
};

export default Index;