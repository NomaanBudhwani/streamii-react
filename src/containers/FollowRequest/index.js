import React from 'react';
import { View } from 'react-native';
import { UserList } from '../../components';
import { users } from '../../data';
import { useMergeState } from '../../hooks';
import { AppStyles } from '../../theme';
import { USER_LIST_TYPES } from '../../theme/String';

const index = props => {
  const { } = props;

  const [state, setState] = useMergeState({
    requests: users,
  });

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        users={state.requests}
        listType={USER_LIST_TYPES.FOLLOW_REQUEST}
      />
    </View>
  );
};

export default index;
