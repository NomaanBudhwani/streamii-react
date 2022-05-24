import React, { useCallback, useRef, memo } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { Avatar, ButtonView, RoundButton, Separator } from '../../reuseableComponents';
import { AppStyles, Colors, Images, Metrics } from '../../theme';
import { Paragraph } from '../../reuseableComponents/Typography';
import { USER_LIST_TYPES } from '../../theme/String'
import { useMergeState } from '../../hooks';
import _ from 'lodash'

const {
  DEFAULT,
  FOLLOW,
  FOLLOWERS,
  FOLLOWING,
  FOLLOW_REQUEST,
  REACTED,
  BLOCKED,
  SELECTION
} = USER_LIST_TYPES

const index = props => {

  const {
    user, style,
    disabled, onPress,
    listType, isSelected,
    onFollow,
    onUnblock,
    onRemoveFollower,
    onRemoveFollowing,
    onConfirmFollowReq,
    onCancelFollowReq,
  } = props;

  const [state, setState] = useMergeState({
    isFollowing: false,
  })

  const renderRight = () => {
    switch (listType) {
      case SELECTION:
        return (
          isSelected ? <Image source={Images.icSelected} /> : null
        )
      case FOLLOW:
        return (
          <RoundButton
            title={user.following ? 'Following' : 'Follow'}
            outlined={user.following}
            onPress={onFollow}
          />
        )
      case FOLLOWERS:
        return (
          <RoundButton
            title={'Remove'}
            outlined={true}
            onPress={onRemoveFollower}
          />
        )
      case FOLLOWING:
        return (
          <RoundButton
            title={'Following'}
            outlined={true}
            onPress={onRemoveFollowing}
          />
        )
      case BLOCKED:
        return (
          <RoundButton
            title={'Unblock'}
            outlined={true}
            onPress={onUnblock}
          />
        )
      case FOLLOW_REQUEST:
        return (
          <>
            <RoundButton title={'Follow'} outlined={false} onPress={onConfirmFollowReq} />
            <RoundButton
              title={'Cancel'}
              style={{ marginLeft: Metrics.smallMargin }}
              outlined={true}
              onPress={onCancelFollowReq}
            />
          </>
        )
      case REACTED:
      case DEFAULT:
      default:
        return null;
    }
  }

  return (
    <ButtonView onPress={onPress} disabled={disabled} style={style}>
      <View style={styles.wrapper}>
        <Avatar source={{ uri: user.image_url }} size={34} disabled={true} />
        <Paragraph
          numberOfLines={1}
          size={14}
          color={Colors.white}
          style={[AppStyles.flex, AppStyles.hBaseMargin]}>
          {user.name}
        </Paragraph>
        {renderRight()}
      </View>
      <Separator />
    </ButtonView>
  );
};

index.defaultProps = {
  disabled: true,
  listType: DEFAULT,
  schema: {
    title: 'name',
  },
};

const propsAreEqual = (prevProps, nextProps) => _.isEqual(prevProps, nextProps)

export default memo(index, propsAreEqual);
