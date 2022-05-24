import React, { useCallback, useRef } from 'react';
import { useMergeState } from '../../hooks';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Avatar,
  ButtonView,
  FlatListHandler,
  IconWithBadge,
  Separator,
} from '../../reuseableComponents';
import { Paragraph, Title } from '../../reuseableComponents/Typography';
import { AppStyles, Images, Colors, Fonts, Metrics } from '../../theme';
import styles from './styles';
import { notification } from '../../data';
import { navigate } from '../../services/NavigationService';
import { NotificationListCell } from '../../components';

const index = props => {
  const { } = props;

  const _renderItem = useCallback(({ item, index }) => {
    return (
      <NotificationListCell item={item} />
    )
  }, [])

  return (
    <View style={styles.mainContainer}>
      <ButtonView
        onPress={() => navigate('FollowRequest')}
        style={styles.subcontainerFR}>
        <IconWithBadge
          iconstyle={styles.avatarFR}
          source={Images.icFollowRequest}
          badgeCount={8}
        />
        <View>
          <Title color={Colors.white}>{'Follow Request'}</Title>
          <Paragraph color={Colors.inactive}>
            {'Approve or ignore requests'}
          </Paragraph>
        </View>
      </ButtonView>
      <Separator />
      <FlatListHandler
        data={notification}
        renderItem={_renderItem}
        style={{ paddingTop: 15 }}
      />
    </View>
  );
};

export default index;
