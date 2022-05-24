import React from 'react';
import {View} from 'react-native';
import {Avatar, Separator, ButtonView} from '../../reuseableComponents';
import {Paragraph, Headline} from '../../reuseableComponents/Typography';
import {Colors} from '../../theme';
import styles from './styles';
import utility from '../../utility';
import {navigate} from '../../services/NavigationService';

const index = props => {
  const {data} = props;
  return (
    <>
      <ButtonView
        onPress={() => navigate('ChatRoom', {user: {name: data.name}})}
        style={styles.container}>
        <Avatar style={styles.avatar} size={46} source={{url: data.image}} />
        <View>
          <Headline size={16}>{data.name}</Headline>
          <Paragraph size={13} color={Colors.inactive}>
            {data.message}
          </Paragraph>
        </View>
        <Paragraph style={styles.date} size={13} color={Colors.inactive}>
          {utility.timeFromNow(data.created_at)}
        </Paragraph>
        {data.isRead && <View style={styles.unread} />}
      </ButtonView>
      <Separator />
    </>
  );
};

export default index;
