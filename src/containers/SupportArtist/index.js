import React, {useCallback, useRef, useState} from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import {TokenCard, TokenDetailsCard} from '../../components';
import {
  Alert,
  AppButton,
  ButtonView,
  TextButton,
} from '../../reuseableComponents';
import {Paragraph} from '../../reuseableComponents/Typography';
import {navigate} from '../../services/NavigationService';
import {AppStyles, Colors, Images} from '../../theme';
import {DATA, TOKEN_DETAILS} from './mock_data';
import styles from './styles.js';

const Index = props => {
  const {
    route: {params},
  } = props;
  const [selected, setSelected] = useState('');
  const alertRef = useRef();
  const onSelect = value => {
    setSelected(value);
  };

  const _renderItem = useCallback(
    data => {
      return (
        <TokenCard
          key={data.id}
          active={selected}
          onPress={onSelect}
          data={data}
        />
      );
    },
    [selected],
  );

  const onSupportArtist = async () => {
    let data = await DATA.find(item => item.id === selected);
    if (TOKEN_DETAILS.token >= data.value) {
      alertRef.current.setMessage(
        `You have successfully supported “${params.user.name}” with ${data.value} tokens`,
      );
      global.log('===== chck', alertRef);
      alertRef.current.show();
    } else {
      navigate('BuyTokens', {isBuyToken: true});
    }
  };

  return (
    <ScrollView contentContainerStyle={AppStyles.listStyle}>
      <View style={styles.containerOne}>
        <ImageBackground source={Images.bgTokenScreen} style={styles.mainBg}>
          <TokenDetailsCard data={TOKEN_DETAILS} />
          <View>
            <Image style={styles.blurImage} source={Images.blurToken} />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.containerTwo}>
        {DATA.map(_renderItem)}
        <AppButton
          title="Support Artist"
          style={styles.btn}
          onPress={onSupportArtist}
        />
        <TextButton
          underline
          title="Buy More Tokens"
          textColor={Colors.theme}
          style={{alignSelf: 'center'}}
          onPress={() => navigate('BuyTokens', {isBuyToken: true})}
        />
      </View>
      <Alert title="Thank you" isChoiceAlert={false} ref={alertRef} />
    </ScrollView>
  );
};

export default Index;
