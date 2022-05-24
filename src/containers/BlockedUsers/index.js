import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { request } from '../../actions/ServiceAction';
import { UserList } from '../../components';
import constant from '../../constants';
import { AppStyles } from '../../theme';
import { USER_LIST_TYPES } from '../../theme/String';

const index = (props) => {

  const { } = props
  const dispatch = useDispatch()

  const getBlockedUsers = (isConcat, params, cbOnSuccess, cbOnFailure) => {
    dispatch(
      request(
        constant.blockUnblockUser,
        constant.serviceTypes.GET,
        params,
        null,
        false,
        isConcat,
        cbOnSuccess,
        cbOnFailure
      )
    )
  }

  return (
    <View style={[AppStyles.flex, AppStyles.hBasePadding]}>
      <UserList
        fetchRequest={getBlockedUsers}
        listType={USER_LIST_TYPES.BLOCKED}
        hideSearch={true}
      />
    </View>
  )
}

export default index
