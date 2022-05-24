import React from 'react';
import { View } from 'react-native';
import { Avatar, Separator, ButtonView } from '../../reuseableComponents';
import { Paragraph, Headline } from '../../reuseableComponents/Typography';
import { AppStyles, Colors } from '../../theme';
import styles from './styles';
import utility from '../../utility';
import { navigate } from '../../services/NavigationService';

const index = props => {
  const {
    chat: { user, message, created_at, isRead },
  } = props;

  return (
    <>
      <ButtonView
        onPress={() => navigate('ChatRoom', { user: { name: user.name } })}
        style={styles.container}>
        <Avatar style={styles.avatar} size={46} source={{ uri: user.image }} />
        <View style={styles.wrapper}>
          <View style={[AppStyles.flexRow]}>
            <Headline numberOfLines={1} size={16} style={AppStyles.flex}>
              {user.name}
            </Headline>
            <Paragraph style={styles.date} size={13} color={Colors.inactive}>
              {utility.timeFromNow(created_at)}
            </Paragraph>
          </View>
          <View style={[AppStyles.flexRow]}>
            <Paragraph size={13} color={Colors.inactive} style={AppStyles.flex}>
              {message}
            </Paragraph>
            {isRead && <View style={styles.unread} />}
          </View>
        </View>
      </ButtonView>
      <Separator />
    </>
  );
};

export default index;
